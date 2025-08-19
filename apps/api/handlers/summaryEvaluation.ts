import { Request, Response } from 'express';
import { getApiName, DEFAULT_MODEL } from '../handler';
import { buildSummaryEvaluationSystemPrompt, buildSummaryEvaluationUserPrompt } from '../prompts/summaryEvaluation';

/**
 * Handler for Summary Evaluation endpoint
 */
export const handleSummaryEvaluation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { conversation, userSummary } = req.body;

    if (!conversation || !userSummary) {
      res.status(400).json({ error: 'Missing required parameters' });
      return;
    }

    const headerKey = (() => {
      const h = req.headers.authorization;
      return h && h.startsWith('Bearer ') ? h.substring(7) : null;
    })();
    const bodyKey = typeof (req.body?.apiKey) === 'string' ? (req.body.apiKey as string) : null;
    const openaiApiKey = headerKey || bodyKey || process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      res.status(500).json({ error: 'OpenAI API key not configured' });
      return;
    }

    const evaluationPrompt = buildSummaryEvaluationUserPrompt({ conversation, userSummary });

    const model = getApiName(DEFAULT_MODEL);
    const supportsSampling = model === 'gpt-5';

    const http = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        ...(supportsSampling ? { temperature: 0.4, top_p: 0.9 } : {}),
        max_output_tokens: 512,
        input: [
          { role: 'system', content: [{ type: 'input_text', text: buildSummaryEvaluationSystemPrompt() }] },
          { role: 'user', content: [{ type: 'input_text', text: evaluationPrompt }] },
        ],
      }),
    });
    if (!http.ok) {
      const t = await http.text();
      throw new Error(`OpenAI responses error: ${http.status} ${t}`);
    }
    const json: any = await http.json();
    const pieces: string[] = [];
    const out = json?.output || [];
    if (Array.isArray(out)) {
      for (const o of out) {
        if (Array.isArray(o?.content)) {
          for (const ci of o.content) {
            if (ci?.type === 'output_text' && typeof ci?.text === 'string') pieces.push(ci.text);
          }
        }
      }
    }
    const evaluationText = pieces.join('') || '';

    res.json({ evaluation: evaluationText });

  } catch (error) {
    console.error('Error in summary evaluation handler:', error);
    res.status(500).json({ error: 'Failed to evaluate summary' });
  }
};
