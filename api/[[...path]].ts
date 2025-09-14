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
// Use CommonJS require to avoid NodeNext ESM extension issues
// eslint-disable-next-line @typescript-eslint/no-var-requires
const app = require('../apps/api/handler').default as (req: any, res: any) => any;

/**
 * Default export for Vercel serverless function.
 * We simply pass the request/response through to the Express app.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  return app(req as any, res as any);
}
