
import OpenAI from 'openai';
import { getApiName, DEFAULT_MODEL } from '../handler.js';
import { buildPairProgrammingSystemPrompt } from '../prompts/pairProgramming.js';

/**
 * Handler for PairProgrammingSimulator
 */
export const handlePairProgramming = async (req: any, res: any): Promise<void> => {
  const { messages, code, role, apiKey } = req.body;

  if (!messages) {
    res.status(400).json({ error: 'Messages are required.' });
    return;
  }

  const headerKey = (() => {
    const h = req.headers.authorization;
    return h && h.startsWith('Bearer ') ? h.substring(7) : null;
  })();
  const bodyKey = typeof apiKey === 'string' ? apiKey : null;
  const requireUserKey = process.env.REQUIRE_USER_API_KEY === 'true';
  const allowServerKeyInProd = process.env.ALLOW_SERVER_KEY_IN_PROD === 'true';
  const canUseServerKey = !requireUserKey && (process.env.NODE_ENV !== 'production' || allowServerKeyInProd);
  const resolvedKey = headerKey || bodyKey || (canUseServerKey ? process.env.OPENAI_API_KEY : undefined);
  if (!resolvedKey) {
    res.status(401).json({ error: 'API key is required. Provide it in the Authorization header as: Bearer <YOUR_KEY>' });
    return;
  }

  const openai = new OpenAI({ apiKey: resolvedKey });

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
