/**
 * @file api/[[...path]].ts
 * @description Vercel catch-all serverless function that delegates all /api/*
 * requests to our existing Express app defined in `apps/api/handler.ts`.
 *
 * This avoids relying on `vercel.json` custom routing and uses Vercel's
 * filesystem-based routing for serverless functions, which is more
 * conventional and reliable for monorepos.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import app from '../apps/api/handler.js';

/**
 * Default export for Vercel serverless function.
 * We simply pass the request/response through to the Express app.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Ensure Express sees the '/api/...' prefix. Vercel functions under /api
  // often receive paths like '/chat' instead of '/api/chat'. Our Express
  // routes are registered as '/api/...', so we normalize here.
  try {
    const originalUrl = (req as any).url as string;
    if (typeof originalUrl === 'string' && !originalUrl.startsWith('/api/')) {
      (req as any).url = originalUrl.startsWith('/') ? `/api${originalUrl}` : `/api/${originalUrl}`;
    }
  } catch {
    // no-op normalization failure, continue
  }
  return (app as any)(req as any, res as any);
}

