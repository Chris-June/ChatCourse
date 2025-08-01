/**
 * @file Vercel serverless function entry point
 * @description This file serves as the entry point for Vercel serverless functions
 */

// Import the Express app from handler.ts
import app from './handler';

// Export the Vercel serverless function
export default async function handler(req: any, res: any) {
  // Log the incoming request for debugging
  console.log('Incoming request:', {
    method: req.method,
    path: req.url,
    headers: req.headers,
    body: req.body
  });

  // Call the Express app's request handler
  return app(req, res);
}

// Export the Express app as a named export
export { app };
