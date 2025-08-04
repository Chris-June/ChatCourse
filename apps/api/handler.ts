/**
 * @file Express server handler for the Chat API.
 * @description This file sets up an Express server to handle real-time chat streaming,
 * prompt evaluation, and other course-related functionalities. It uses modular handlers
 * for better organization and maintainability.
 */

import express from 'express';
import dotenv from 'dotenv';

import path from 'path';
import { fileURLToPath } from 'url';


import { handlePromptVisualization, handleChallengeEvaluation, handleFinalChallengeEvaluation } from './handlers/promptEvaluation';
import { handleGetPatterns } from './handlers/promptPatterns';
import { handleRefinePrompt, handleGradePrompt } from './handlers/promptRefinement';
import { handlePairProgramming } from './handlers/pairProgramming';
import { handleSummaryEvaluation } from './handlers/summaryEvaluation';
import { handleChat } from './handlers/chat';

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

export const getApiName = (model: string): string => {
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

export const getPricing = (model: string) => {
  const apiName = getApiName(model);
  return PRICING_MAP[apiName] || PRICING_MAP['gpt-4.1-nano-2025-04-14'];
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

export const ALLOWED_MODELS = [
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

// --- Modular API Endpoints ---

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

export default app;
