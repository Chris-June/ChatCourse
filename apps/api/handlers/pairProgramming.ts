import { Request, Response } from 'express';
import OpenAI from 'openai';

// This helper should ideally be in a shared utility file, but for now, we'll keep it here.
function getApiName(model: string): string {
    const mapping: Record<string, string> = {
        'gpt-4.1': 'gpt-4.1-2025-04-14',
        'gpt-4.1-mini': 'gpt-4.1-mini-2025-04-14',
        'gpt-4.1-nano': 'gpt-4.1-nano-2025-04-14',
        'gpt-4.5-preview': 'gpt-4.5-preview-2025-02-27',
        'gpt-4o': 'gpt-4o-2024-08-06',
        'gpt-4o-audio-preview': 'gpt-4o-audio-preview-2024-12-17',
        'gpt-4o-realtime-preview': 'gpt-4o-realtime-preview-2025-06-03',
        'gpt-4o-mini': 'gpt-4o-mini-2024-07-18',
        'gpt-4o-mini-audio-preview': 'gpt-4o-mini-audio-preview-2024-12-17',
        'gpt-4o-mini-realtime-preview': 'gpt-4o-mini-realtime-preview-2024-12-17',
        'o1': 'o1-2024-12-17',
        'o1-pro': 'o1-pro-2025-03-19',
        'o3-pro': 'o3-pro-2025-06-10',
        'o3': 'o3-2025-04-16',
        'o3-deep-research': 'o3-deep-research-2025-06-26',
        'o4-mini': 'o4-mini-2025-04-16',
        'o4-mini-deep-research': 'o4-mini-deep-research-2025-06-26',
        'o3-mini': 'o3-mini-2025-01-31',
        'o1-mini': 'o1-mini-2024-09-12',
        'codex-mini-latest': 'codex-mini-latest',
        'gpt-4o-mini-search-preview': 'gpt-4o-mini-search-preview-2025-03-11',
        'gpt-4o-search-preview': 'gpt-4o-search-preview-2025-03-11',
    };
    return mapping[model] || 'gpt-4.1-nano-2025-04-14'; // Default
}

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

  const systemPrompt = `You are an expert pair programming assistant. Your role is ${role}. You will be given a conversation history and the current code. Your task is to respond as the specified role, providing helpful, concise, and educational feedback or code.\n\nThe current code in the editor is:\n${code}\n\nThe conversation history is:\n${messages.map((m: { role: string, content: string }) => `${m.role}: ${m.content}`).join('\n')}\n\nYour response should be conversational. IMPORTANT: When you provide code, you MUST wrap it with a special separator like this: __CODE_SEPARATOR__function newCode() { ... }__CODE_SEPARATOR__. Do NOT use markdown code fences. Use ONLY the separator.`;

  try {
    const response = await openai.chat.completions.create({
      model: getApiName('gpt-4o-mini'),
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
