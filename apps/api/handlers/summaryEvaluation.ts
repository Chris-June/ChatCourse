import { Request, Response } from 'express';
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

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      res.status(500).json({ error: 'OpenAI API key not configured' });
      return;
    }

    const openai = new OpenAI({
      apiKey: openaiApiKey,
    });

    const evaluationPrompt = `Evaluate this summary prompt based on the provided conversation:\n\nConversation:\n${conversation.map((msg: any) => `${msg.speaker}: ${msg.text}`).join('\n')}\n\nUser Summary Prompt:\n${userSummary}\n\nPlease provide a constructive evaluation that:\n1. Assesses how well the summary captures the key points\n2. Identifies any missing important context\n3. Suggests specific improvements\n4. Gives an overall quality rating\n\nKeep the evaluation concise and actionable.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert prompt evaluator. Provide constructive, specific feedback on how well the user\'s summary prompt captures the conversation context. Be encouraging and educational.'
        },
        {
          role: 'user',
          content: evaluationPrompt
        }
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
