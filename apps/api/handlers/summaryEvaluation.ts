import { Request, Response } from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Handles the evaluation of a user-submitted summary against an original text.
 */
export const handleSummaryEvaluation = async (req: Request, res: Response) => {
  const { originalText, summaryText } = req.body;

  if (!originalText || !summaryText) {
    return res.status(400).json({ error: 'Original text and summary text are required.' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are an expert evaluator. Your task is to assess a user's summary of a given text. Evaluate the summary based on three criteria: 1. Accuracy (Does it correctly represent the original text?), 2. Conciseness (Is it brief and to the point?), and 3. Key Points (Does it cover the main ideas?). Provide a score from 0-100 for each criterion and a brief feedback statement. Respond in JSON format with the keys: accuracyScore, concisenessScore, keyPointsScore, and feedback.`,
        },
        {
          role: 'user',
          content: `Original Text: "${originalText}"\n\nSummary to Evaluate: "${summaryText}"`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const evaluation = JSON.parse(response.choices[0].message.content || '{}');
    res.json(evaluation);

  } catch (error) {
    console.error('Error during summary evaluation:', error);
    res.status(500).json({ error: 'Failed to evaluate summary.' });
  }
};
