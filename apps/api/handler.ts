/**
 * @file Express server handler for the Chat API.
 * @description This file sets up an Express server to handle real-time chat streaming,
 * prompt evaluation, and other course-related functionalities. It uses modular handlers
 * for better organization and maintainability.
 */

import express from 'express';





import { handlePromptVisualization, handleChallengeEvaluation, handleFinalChallengeEvaluation } from './handlers/promptEvaluation';
import { handleGetPatterns } from './handlers/promptPatterns';
import { handleRefinePrompt, handleGradePrompt } from './handlers/promptRefinement';
import { handlePairProgramming } from './handlers/pairProgramming';
import { handleSummaryEvaluation } from './handlers/summaryEvaluation';
console.log('[handler.ts] Module start');
import { handleChat } from './handlers/chat';
console.log('[handler.ts] All handlers imported successfully.');



// Environment variables are loaded by Vercel in production.

// --- Constants and Helper Functions ---

// All previous models before Aug 8th, 2025 are deprecated.
// GPT-5 family is the only allowed set.
export const DEFAULT_MODEL = 'gpt-5-nano';

const PRICING_MAP: Record<string, { input: number; output: number }> = {
  // Prices are per 1M tokens (input/output)
  // Source: OpenAI docs/screens (Aug 8, 2025)
  'gpt-5': { input: 1.25, output: 10.00 },
  'gpt-5-mini': { input: 0.25, output: 2.00 },
  'gpt-5-nano': { input: 0.05, output: 0.40 },
};

export const getApiName = (model: string): string => {
  // Identity mapping for GPT-5 family. Default to nano.
  const allowed: Record<string, string> = {
    'gpt-5': 'gpt-5',
    'gpt-5-mini': 'gpt-5-mini',
    'gpt-5-nano': 'gpt-5-nano',
  };
  return allowed[model] || DEFAULT_MODEL;
};

export const getPricing = (model: string) => {
  const apiName = getApiName(model);
  return PRICING_MAP[apiName] || PRICING_MAP[DEFAULT_MODEL];
};

export const getApiKey = (req: express.Request): string | null => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
};

// --- Express App Setup ---

const app = express();
console.log('[handler.ts] Express app created.');

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
    'https://www.intellisync.academy'
  ];
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Middleware for JSON parsing
app.use(express.json());
console.log('[handler.ts] Middleware configured.');

export const ALLOWED_MODELS = [
  'gpt-5',
  'gpt-5-mini',
  'gpt-5-nano',
];

// --- Modular API Endpoints ---
console.log('[handler.ts] Configuring API endpoints...');

// INSYNC Framework & Prompt Evaluation
app.post('/api/chat/visualize-prompt', handlePromptVisualization);
app.post('/api/chat/evaluate-challenge', handleChallengeEvaluation);
app.post('/api/chat/evaluate-final-challenge', handleFinalChallengeEvaluation);
app.post('/api/chat/grade-prompt', handleGradePrompt);
app.post('/api/chat/refine-prompt', handleRefinePrompt);

// Prompt Pattern Library
app.get('/api/chat/get-patterns', handleGetPatterns);

// --- Core Logic Endpoints ---

// Main chat streaming endpoint
app.post('/api/chat', handleChat);

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

console.log('[handler.ts] Endpoints configured. Exporting app.');

export default app;
