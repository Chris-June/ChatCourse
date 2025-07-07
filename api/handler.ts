/**
 * @file Express server handler for the Chat API.
 * @description This file sets up an Express server to handle real-time chat streaming.
 * It receives user messages, sends them to the OpenAI API, and streams the AI's response
 * back to the client using Server-Sent Events (SSE).
 */

import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';
import { get_encoding } from 'tiktoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pricing map (cost per 1 million tokens in USD)
const PRICING_MAP: Record<string, { input: number; output: number }> = {
      'gpt-4.1-2025-04-14': { input: 0.50, output: 8.00 },
      'gpt-4.1-mini-2025-04-14': { input: 0.10, output: 1.60 },
      'gpt-4.1-nano-2025-04-14': { input: 0.025, output: 0.40 },
      'gpt-4.5-preview-2025-02-27': { input: 37.50, output: 150.00 },
      'gpt-4o-2024-08-06': { input: 1.25, output: 10.00 },
      'gpt-4o-audio-preview-2024-12-17': { input: 0, output: 10.00 },
      'gpt-4o-realtime-preview-2025-06-03': { input: 2.50, output: 20.00 },
      'gpt-4o-mini-2024-07-18': { input: 0.075, output: 0.60 },
      'gpt-4o-mini-audio-preview-2024-12-17': { input: 0, output: 0.60 },
      'gpt-4o-mini-realtime-preview-2024-12-17': { input: 0.30, output: 2.40 },
      'o1-2024-12-17': { input: 7.50, output: 60.00 },
      'o1-pro-2025-03-19': { input: 0, output: 600.00 },
      'o3-pro-2025-06-10': { input: 0, output: 80.00 },
      'o3-2025-04-16': { input: 0.50, output: 8.00 },
      'o3-deep-research-2025-06-26': { input: 2.50, output: 40.00 },
      'o4-mini-2025-04-16': { input: 0.275, output: 4.40 },
      'o4-mini-deep-research-2025-06-26': { input: 0.50, output: 8.00 },
      'o3-mini-2025-01-31': { input: 0.55, output: 4.40 },
      'o1-mini-2024-09-12': { input: 0.55, output: 4.40 },
      'codex-mini-latest': { input: 0.375, output: 6.00 },
      'gpt-4o-mini-search-preview-2025-03-11': { input: 0, output: 0.60 },
      'gpt-4o-search-preview-2025-03-11': { input: 0, output: 10.00 },
};

const getApiName = (model: string): string => {
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
};

const getPricing = (model: string) => {
    const apiName = getApiName(model);
    return PRICING_MAP[apiName] || PRICING_MAP['gpt-4.1-nano-2025-04-14'];
}
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const app = express();


// Middleware
app.use(express.json());
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const ALLOWED_MODELS = [
  'gpt-4.1',
  'gpt-4.1-mini',
  'gpt-4.1-nano',
  'gpt-4.5-preview',
  'gpt-4o',
  'gpt-4o-audio-preview',
  'gpt-4o-realtime-preview',
  'gpt-4o-mini',
  'gpt-4o-mini-audio-preview',
  'gpt-4o-mini-realtime-preview',
  'o1',
  'o1-pro',
  'o3-pro',
  'o3',
  'o3-deep-research',
  'o4-mini',
  'o4-mini-deep-research',
  'o3-mini',
  'o1-mini',
  'codex-mini-latest',
  'gpt-4o-mini-search-preview',
  'gpt-4o-search-preview',
];

app.post('/api/chat', async (req, res) => {
  const { messages, model: requestedModel, customInstructions, temperature, top_p, apiKey } = req.body;

  if (!messages) {
    return res.status(400).json({ error: { message: 'Messages are required.' } });
  }

  if (!apiKey && !process.env.OPENAI_API_KEY) {
    return res.status(400).json({ 
      error: { 
        message: 'No API key provided. Please provide your OpenAI API key in the settings.' 
      } 
    });
  }

  const model = requestedModel && ALLOWED_MODELS.includes(requestedModel) 
      ? requestedModel 
      : 'gpt-4.1-nano';

  const encoding = get_encoding('cl100k_base');

  const BASE_SYSTEM_PROMPT = "You are Intelli-Chat, a helpful and friendly AI assistant. Your responses should be concise, informative, and aim to assist the user with their requests.";
  const combinedInstructions = [BASE_SYSTEM_PROMPT, customInstructions].filter(Boolean).join('\n\n');
  const systemMessage = combinedInstructions ? [{ role: 'system', content: combinedInstructions }] : [];
  
  const messagesForAPI = [...systemMessage, ...messages];
  
  const promptTokens = messagesForAPI.reduce((acc, msg) => {
      return acc + encoding.encode(msg.content).length;
  }, 0);

  const openai = new OpenAI({
    apiKey: apiKey || process.env.OPENAI_API_KEY,
  });

  try {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const apiName = getApiName(model);

    const stream = await openai.chat.completions.create({
      model: apiName,
      messages: messagesForAPI,
      stream: true,
      temperature: temperature !== undefined && temperature >= 0 && temperature <= 2 ? temperature : parseFloat(process.env.DEFAULT_TEMPERATURE || '0.7'),
      top_p: top_p !== undefined && top_p >= 0 && top_p <= 1 ? top_p : parseFloat(process.env.DEFAULT_TOP_P || '0.9'),
      max_tokens: parseInt(process.env.MAX_TOKENS || '512'),
    });

    let completionText = '';
    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content || '';
      if (delta) {
        completionText += delta;
        res.write(`data: ${JSON.stringify({ delta })}\n\n`);
      }
    }

    const completionTokens = encoding.encode(completionText).length;
    encoding.free(); // free up memory

    const { input: inputCost, output: outputCost } = getPricing(model);
    const promptCost = (promptTokens / 1_000_000) * inputCost;
    const completionCost = (completionTokens / 1_000_000) * outputCost;
    const totalCost = promptCost + completionCost;

    const metadata = {
      promptTokens,
      completionTokens,
      totalTokens: promptTokens + completionTokens,
      promptCost,
      completionCost,
      totalCost,
    };

    res.write(`event: metadata\ndata: ${JSON.stringify(metadata)}\n\n`);
    res.write('data: [DONE]\n\n');

  } catch (error: any) {
    console.error('Error streaming from OpenAI:', error);
    res.write(`data: ${JSON.stringify({ error: { message: 'Error streaming response.' } })}\n\n`);
  } finally {
    res.end();
  }
});

// Start the server for local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`API server listening on port ${PORT}`);
  });
}


export default app;
