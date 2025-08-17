import { Request, Response } from 'express';
import OpenAI from 'openai';
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

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      res.status(500).json({ error: 'OpenAI API key not configured' });
      return;
    }

    const openai = new OpenAI({
      apiKey: openaiApiKey,
    });

    const evaluationPrompt = buildSummaryEvaluationUserPrompt({ conversation, userSummary });

    const completion = await openai.chat.completions.create({
      model: getApiName(DEFAULT_MODEL),
      messages: [
        { role: 'system', content: buildSummaryEvaluationSystemPrompt() },
        { role: 'user', content: evaluationPrompt },
      ],
      temperature: 0.4,
      max_tokens: 512,
    });

    res.json({ evaluation: completion.choices[0].message.content });

  } catch (error) {
    console.error('Error in summary evaluation handler:', error);
    res.status(500).json({ error: 'Failed to evaluate summary' });
  }
};
