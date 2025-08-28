/**
 * Serverless API shim for Vercel when the project Root Directory is set to `apps/web`.
 * This re-exports the existing Express-based handler defined in `apps/api/vercel.ts`,
 * ensuring routes like `/api/chat` are available in production.
 *
 * Rationale:
 * - Some Vercel configurations execute builds/functions from `apps/web` only.
 * - Placing this file under `apps/web/api/` guarantees function discovery.
 * - Keeping the real implementation in `apps/api/handler.ts` preserves modularity.
 */

// Re-export the serverless handler from the API package.
// Path from `apps/web/api/[[...path]].ts` to `apps/api/vercel.ts`:
//   ../../api/vercel
export { default } from "../../api/vercel";
