/**
 * Serverless API shim for Vercel when the project Root Directory is set to `apps/web`.
 * This forwards requests to the Express-based handler defined in `apps/api/handler.ts`.
 *
 * Why: Some Vercel setups run functions from `apps/web`. Having a shim here guarantees
 * the function is discovered without duplicating implementation.
 */

// Load the Express handler via CommonJS require to avoid ESM cross-root resolution issues
// eslint-disable-next-line @typescript-eslint/no-var-requires
const handlerFromApi = require('../../api/handler').default as (req: any, res: any) => any;
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Explicit default export avoids TS transform that can emit CommonJS `exports.*`.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  return handlerFromApi(req, res);
}
