/**
 * @file Express server handler for the Chat API.
 * @description This file sets up an Express server to handle real-time chat streaming,
 * prompt evaluation, and other course-related functionalities. It uses modular handlers
 * for better organization and maintainability.
 */

import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';
import { get_encoding } from 'tiktoken';
import { sanitizeInput, redactOutput } from './guardrails';
import { handlePromptVisualization, handleChallengeEvaluation } from './handlers/promptEvaluation';
import { handleGetPatterns } from './handlers/promptPatterns';
import { handleRefinePrompt, handleGradePrompt } from './handlers/promptRefinement';
import { handlePairProgramming } from './handlers/pairProgramming';
import { handleSummaryEvaluation } from './handlers/summaryEvaluation';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

// --- Constants and Helper Functions ---

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
};

const getApiKey = (req: express.Request): string | null => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
};

// --- Express App Setup ---

const app = express();

// Middleware for CORS
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:5173',
    'https://prompt-foundry.vercel.app',
    'https://intelli-sync.vercel.app',
    'https://intelli-sync-dev.vercel.app',
    'https://intelli-sync-git-main-intellisync.vercel.app/',
    'https://www.intellisync.academy',
    'https://chat-dlvm2mvuz-chris-junes-projects-c32d49c9.vercel.app',
    'https://*.vercel.app',
    'https://*.intellisync.chat',
  ];

  const origin = req.headers.origin;

  if (process.env.NODE_ENV !== 'production') {
    // In development, allow any origin
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  } else if (origin) {
    // In production, validate against the allowed list
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (allowedOrigin.startsWith('*.')) {
        // Handle wildcard domain *.example.com
        return origin.endsWith(allowedOrigin.substring(1));
      }
      // Handle exact domain match
      return origin === allowedOrigin;
    });

    if (isAllowed) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Length,Content-Range');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});

// Middleware for JSON parsing
app.use(express.json());

const ALLOWED_MODELS = Object.keys(getApiName);

// --- Modular API Endpoints ---

// INSYNC Framework & Prompt Evaluation
app.post('/api/chat/visualize-prompt', handlePromptVisualization);
app.post('/api/chat/evaluate-challenge', handleChallengeEvaluation);
app.post('/api/chat/grade-prompt', handleGradePrompt);
app.post('/api/chat/refine-prompt', handleRefinePrompt);

// Prompt Pattern Library
app.get('/api/chat/get-patterns', handleGetPatterns);

// --- Core Logic Endpoints ---

// Main chat streaming endpoint
app.post('/api/chat/stream', async (req, res) => {
  try {
    const { messages, model, temperature, top_p } = req.body;
    const apiKey = getApiKey(req) || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(401).json({ error: 'API key is required.' });
    }
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages are required.' });
    }
    if (model && !ALLOWED_MODELS.includes(model)) {
      return res.status(400).json({ error: `Model ${model} is not allowed.` });
    }

    const openai = new OpenAI({ apiKey });

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === 'user') {
      lastMessage.content = sanitizeInput(lastMessage.content);
    }

    const messagesForAPI = messages.map((msg: { role: 'user' | 'assistant' | 'system', content: string }) => ({
      role: msg.role,
      content: msg.content,
    }));

    const encoding = get_encoding('cl100k_base');
    const promptTokens = messagesForAPI.reduce((acc, msg) => acc + encoding.encode(msg.content).length, 0);

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
        const redactedDelta = redactOutput(delta);
        res.write(`data: ${JSON.stringify({ delta: redactedDelta })}\n\n`);
      }
    }

    const completionTokens = encoding.encode(completionText).length;
    encoding.free();

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

// Pair Programming Simulator
app.post('/api/chat/pair-programming', handlePairProgramming);

// Summary evaluation endpoint
app.post('/api/chat/evaluate-summary', handleSummaryEvaluation);

// --- Server Start ---

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`API server listening on port ${PORT}`);
  });
}

export default app;
