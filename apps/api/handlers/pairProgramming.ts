import { Request, Response } from 'express';
import OpenAI from 'openai';
import { getApiName, DEFAULT_MODEL } from '../handler';
import { buildPairProgrammingSystemPrompt } from '../prompts/pairProgramming';

/**
 * Handler for PairProgrammingSimulator
 */
export const handlePairProgramming = async (req: Request, res: Response): Promise<void> => {
  const { messages, code, role, apiKey } = req.body;

  if (!messages) {
    res.status(400).json({ error: 'Messages are required.' });
    return;
  }

  const openai = new OpenAI({
    apiKey: apiKey || process.env.OPENAI_API_KEY,
  });

  const systemPrompt = buildPairProgrammingSystemPrompt({ role, code, messages });

  try {
    const response = await openai.chat.completions.create({
      model: getApiName(DEFAULT_MODEL),
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: messages[messages.length - 1].content }
      ],
      temperature: 0.5,
      max_tokens: 1024,
    });

    res.json({ response: response.choices[0].message.content });
  } catch (error) {
    console.error('Error in pair-programming handler:', error);
    res.status(500).json({ error: 'Failed to get response from AI.' });
  }
};
