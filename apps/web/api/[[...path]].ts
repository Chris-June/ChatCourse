/**
 * Serverless API shim for Vercel when the project Root Directory is set to `apps/web`.
 * This forwards requests to the Express-based handler defined in `apps/api/handler.ts`.
 *
 * Why: Some Vercel setups run functions from `apps/web`. Having a shim here guarantees
 * the function is discovered without duplicating implementation.
 */

// Import the handler (ESM import to align with `type: module` in apps/web)
import handlerFromApi from '../../api/vercel';

// Explicit default export avoids TS transform that can emit CommonJS `exports.*`.
export default async function handler(req: any, res: any) {
  return handlerFromApi(req, res);
}
