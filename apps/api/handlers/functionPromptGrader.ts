import { Request, Response } from 'express';
import { getApiName, DEFAULT_MODEL } from '../handler.js';

/**
 * Grades a free-form prompt against a provided function schema.
 * Expects body: { promptText: string, functionSchema: object, apiKey?: string }
 * Returns: { score: number, feedback: string }
 */
export const handleGradeFunctionPrompt = async (req: Request, res: Response): Promise<void> => {
  const { promptText, functionSchema } = req.body || {};
  const headerApiKey = (() => {
    const h = req.headers.authorization;
    return h && h.startsWith('Bearer ') ? h.substring(7) : null;
  })();
  const bodyApiKey = typeof req.body?.apiKey === 'string' ? (req.body.apiKey as string) : null;

  if (!promptText || !functionSchema) {
    res.status(400).json({ error: 'promptText and functionSchema are required.' });
    return;
  }

  const apiKey = headerApiKey || (process.env.NODE_ENV !== 'production' ? (bodyApiKey || process.env.OPENAI_API_KEY) : undefined);
  if (!apiKey) {
    res.status(401).json({ error: 'API key is required. Provide it in the Authorization header as: Bearer <YOUR_KEY>' });
    return;
  }
  const model = getApiName(DEFAULT_MODEL);
  const supportsSampling = model !== 'gpt-5-nano';

  const system = [
    'You are a strict prompt grader focused on function call readiness.',
    'Given a natural-language prompt and a JSON function schema (OpenAI-compatible),',
    'assess how well the prompt specifies the needed arguments for the function call.',
    'Output ONLY strict JSON: {"score": number (0-100), "feedback": string}.',
    'Scoring rubric:',
    '- 0-49: vague, missing critical params; not actionable.',
    '- 50-74: partially specified; some ambiguity remains.',
    '- 75-89: clear and mostly complete; minor gaps.',
    '- 90-100: precise, unambiguous, fully aligned to schema.',
    'Consider: presence of required parameters, specificity (exact dates/times/names),',
    'correct types and formats, avoidance of relative phrasing (e.g., "later", "sometime").',
  ].join(' ');

  const user = `PROMPT TO GRADE\n${promptText}\n\nFUNCTION SCHEMA (JSON)\n${JSON.stringify(functionSchema, null, 2)}\n\nReturn ONLY JSON.`;

  try {
    const resp = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        ...(supportsSampling ? { temperature: 0.2 } : {}),
        input: [
          { role: 'system', content: [{ type: 'input_text', text: system }] },
          { role: 'user', content: [{ type: 'input_text', text: user }] },
        ],
      }),
    });

    if (!resp.ok) {
      const t = await resp.text();
      throw new Error(`OpenAI responses error: ${resp.status} ${t}`);
    }

    const json: any = await resp.json();
    const pieces: string[] = [];
    const content = json?.output || [];
    if (Array.isArray(content)) {
      for (const c of content) {
        if (Array.isArray(c?.content)) {
          for (const item of c.content) {
            if (item?.type === 'output_text' && typeof item?.text === 'string') pieces.push(item.text);
          }
        }
      }
    }
    const merged = pieces.join('').trim();

    let parsed: { score: number; feedback: string } | null = null;
    try {
      parsed = JSON.parse(merged);
    } catch {
      // Attempt to salvage JSON from text
      const match = merged.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(match[0]);
      }
    }

    if (!parsed || typeof parsed.score !== 'number' || typeof parsed.feedback !== 'string') {
      res.status(502).json({ error: 'Model returned invalid grading payload.' });
      return;
    }

    // Clamp score to 0-100
    const score = Math.max(0, Math.min(100, Math.round(parsed.score)));
    res.json({ score, feedback: parsed.feedback });
  } catch (error) {
    console.error('Error in grade-function-prompt handler:', error);
    res.status(500).json({ error: 'Failed to grade function prompt.' });
  }
};
