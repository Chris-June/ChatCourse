import { Request, Response } from 'express';
import { getApiName, DEFAULT_MODEL } from '../handler';
import { buildPromptAnalysisPrompt, buildInsyncEvaluationPrompt, SYSTEM_INSYNC_EXPERT, INSYNC_RUBRIC } from '../prompts/promptRefinement';

/**
 * Handler for PromptRefinementWorkbench - refine prompt
 */
export const handleRefinePrompt = async (req: Request, res: Response): Promise<void> => {
  const { prompt } = req.body;
  const headerApiKey = (() => {
    const h = req.headers.authorization;
    return h && h.startsWith('Bearer ') ? h.substring(7) : null;
  })();
  const bodyApiKey = typeof req.body?.apiKey === 'string' ? (req.body.apiKey as string) : null;

  if (!prompt) {
    res.status(400).json({ error: 'Prompt is required.' });
    return;
  }

  const resolvedKey = headerApiKey || bodyApiKey || process.env.OPENAI_API_KEY || '';

  const analysisPrompt = buildPromptAnalysisPrompt(prompt);

  try {
    const model = getApiName(DEFAULT_MODEL);
    const supportsSampling = model === 'gpt-5';
    const resp = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resolvedKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        ...(supportsSampling ? { temperature: 0.4, top_p: 0.9 } : {}),
        input: [
          { role: 'user', content: [{ type: 'input_text', text: analysisPrompt }] },
        ],
      }),
    });
    if (!resp.ok) {
      const txt = await resp.text();
      throw new Error(`OpenAI responses error: ${resp.status} ${txt}`);
    }
    const json: any = await resp.json();
    const outPieces: string[] = [];
    const content = json?.output || [];
    if (Array.isArray(content)) {
      for (const c of content) {
        if (Array.isArray(c?.content)) {
          for (const item of c.content) {
            if (item?.type === 'output_text' && typeof item?.text === 'string') outPieces.push(item.text);
          }
        }
      }
    }
    const merged = outPieces.join('');
    const analysis = JSON.parse(merged || '{}');
    res.json(analysis);
  } catch (error) {
    console.error('Error in refine-prompt handler:', error);
    res.status(500).json({ error: 'Failed to analyze prompt.' });
  }
};

/**
 * Handler for I.N.S.Y.N.C. prompt grading
 */
const getApiKey = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
};

/**
 * Handler for I.N.S.Y.N.C. prompt grading
 */
export const handleGradePrompt = async (req: Request, res: Response): Promise<void> => {
  const { prompt } = req.body;
  const apiKey = getApiKey(req) || process.env.OPENAI_API_KEY || '';

  if (!prompt) {
    res.status(400).json({ error: 'Prompt is required.' });
    return;
  }

  const model = getApiName(DEFAULT_MODEL);
  const supportsSampling = model !== 'gpt-5-nano';
  const evaluationPrompt = buildInsyncEvaluationPrompt(prompt);

  try {
    // Step 1: Evaluation as JSON (non-streaming)
    const evalHTTP = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        ...(supportsSampling ? { temperature: 0.3, top_p: 0.9 } : {}),
        input: [
          { role: 'system', content: [{ type: 'input_text', text: SYSTEM_INSYNC_EXPERT }] },
          { role: 'user', content: [{ type: 'input_text', text: evaluationPrompt }] },
        ],
      }),
    });
    if (!evalHTTP.ok) {
      const t = await evalHTTP.text();
      throw new Error(`OpenAI responses error: ${evalHTTP.status} ${t}`);
    }
    const evalJson: any = await evalHTTP.json();
    const evalPieces: string[] = [];
    const evalContent = evalJson?.output || [];
    if (Array.isArray(evalContent)) {
      for (const c of evalContent) {
        if (Array.isArray(c?.content)) {
          for (const item of c.content) {
            if (item?.type === 'output_text' && typeof item?.text === 'string') evalPieces.push(item.text);
          }
        }
      }
    }
    const evaluation = JSON.parse(evalPieces.join('') || '{}');

    // Normalize fields to ensure 'comment' exists and scores are consistent
    const norm = (obj: any) => {
      if (!obj) return { score: 0, comment: 'No evaluation available', example: '' };
      const score5 = typeof obj.score === 'number' ? obj.score : 0;
      return {
        // scale element score to /10 for UI
        score: Math.max(0, Math.min(10, Math.round(score5 * 2))),
        // prefer 'comment', fallback to 'feedback'
        comment: typeof obj.comment === 'string' ? obj.comment : (typeof obj.feedback === 'string' ? obj.feedback : ''),
        example: typeof obj.example === 'string' ? obj.example : ''
      };
    };

    const normalized = {
      intent: norm(evaluation.intent),
      nuance: norm(evaluation.nuance),
      style: norm(evaluation.style),
      youAs: norm(evaluation.youAs),
      narrativeFormat: norm(evaluation.narrativeFormat),
      context: norm(evaluation.context),
      // keep totalScore in 0–30 domain based on raw 0–5 scores
      totalScore: typeof evaluation.totalScore === 'number' ? evaluation.totalScore : [
        typeof evaluation.intent?.score === 'number' ? evaluation.intent.score : 0,
        typeof evaluation.nuance?.score === 'number' ? evaluation.nuance.score : 0,
        typeof evaluation.style?.score === 'number' ? evaluation.style.score : 0,
        typeof evaluation.youAs?.score === 'number' ? evaluation.youAs.score : 0,
        typeof evaluation.narrativeFormat?.score === 'number' ? evaluation.narrativeFormat.score : 0,
        typeof evaluation.context?.score === 'number' ? evaluation.context.score : 0,
      ].reduce((a,b)=>a+b,0),
      improvedPrompt: typeof evaluation.improvedPrompt === 'string' ? evaluation.improvedPrompt : '',
      overallFeedback: typeof evaluation.overallFeedback === 'string' ? evaluation.overallFeedback : '',
      rubricUsed: evaluation.rubricUsed || 'INSYNC_RUBRIC_V1',
    };

    // Step 2: Direct response to the user's prompt (non-streaming)
    const replyHTTP = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        ...(supportsSampling ? { temperature: 0.7, top_p: 0.9 } : {}),
        input: [
          { role: 'user', content: [{ type: 'input_text', text: prompt }] },
        ],
      }),
    });
    if (!replyHTTP.ok) {
      const t = await replyHTTP.text();
      throw new Error(`OpenAI responses error: ${replyHTTP.status} ${t}`);
    }
    const replyJson: any = await replyHTTP.json();
    const replyPieces: string[] = [];
    const replyContent = replyJson?.output || [];
    if (Array.isArray(replyContent)) {
      for (const c of replyContent) {
        if (Array.isArray(c?.content)) {
          for (const item of c.content) {
            if (item?.type === 'output_text' && typeof item?.text === 'string') replyPieces.push(item.text);
          }
        }
      }
    }
    const directResponse = replyPieces.join('') || 'No response generated.';

    res.json({
      response: directResponse,
      feedback: normalized,
      rubric: INSYNC_RUBRIC,
    });
  } catch (error) {
    console.error('Error in grade-prompt handler:', error);
    res.status(500).json({ error: 'Failed to grade prompt.' });
  }
};
