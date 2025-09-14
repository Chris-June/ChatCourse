/**
 * Serverless API shim for Vercel when the project Root Directory is set to `apps/web`.
 * This forwards requests to the Express-based handler defined in `apps/api/handler.ts`.
 *
 * Why: Some Vercel setups run functions from `apps/web`. Having a shim here guarantees
 * the function is discovered without duplicating implementation.
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

// Explicit default export avoids TS transform that can emit CommonJS `exports.*`.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Dynamically import to avoid top-level cross-root ESM resolution issues
  type ApiHandler = (req: VercelRequest, res: VercelResponse) => Promise<void> | void;
  const mod = await import('../../api/handler.js') as { default: ApiHandler };
  return mod.default(req, res);
}
