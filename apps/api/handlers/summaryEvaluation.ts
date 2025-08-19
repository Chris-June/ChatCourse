import { Request, Response } from 'express';
import { buildSummaryEvaluationSystemPrompt, buildSummaryEvaluationUserPrompt } from '../prompts/summaryEvaluation';
import OpenAI from 'openai';

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

    // Use OpenAI SDK Chat Completions for reliable text output
    const client = new OpenAI({ apiKey: openaiApiKey });
    const chatModel = 'gpt-5-mini'; // more capable for evaluation text
    const resp = await client.chat.completions.create({
      model: chatModel,
      messages: [
        { role: 'system', content: buildSummaryEvaluationSystemPrompt() },
        { role: 'user', content: evaluationPrompt },
      ],
    });
    const evaluationText = resp.choices?.[0]?.message?.content?.trim() || '';

    res.json({
      evaluation: evaluationText || 'I could not retrieve a model response. Try again in a moment, or refine your summary with specific details from the conversation (name, rustic style, warm/handmade feel).'
    });

  } catch (error) {
    console.error('Error in summary evaluation handler:', error);
    const message = error instanceof Error ? error.message : 'Failed to evaluate summary';
    res.status(500).json({ error: 'Failed to evaluate summary', detail: message });
  }
};
