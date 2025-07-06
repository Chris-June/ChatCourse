/**
 * @file Express server handler for the Chat API.
 * @description This file sets up an Express server to handle real-time chat streaming.
 * It receives user messages, sends them to the OpenAI API, and streams the AI's response
 * back to the client using Server-Sent Events (SSE).
 */

import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const app = express();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(express.json());
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const ALLOWED_MODELS = ['gpt-4.1-nano', 'gpt-4', 'gpt-3.5-turbo'];

app.post('/api/chat', async (req, res) => {
  const { messages, model: requestedModel, customInstructions } = req.body;

  if (!messages) {
    return res.status(400).json({ error: { message: 'Messages are required.' } });
  }

  try {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

        const model = requestedModel && ALLOWED_MODELS.includes(requestedModel) 
      ? requestedModel 
      : 'gpt-4.1-nano';

        const BASE_SYSTEM_PROMPT = "You are Intelli-Chat, a helpful and friendly AI assistant. Your responses should be concise, informative, and aim to assist the user with their requests.";
    const combinedInstructions = [BASE_SYSTEM_PROMPT, customInstructions].filter(Boolean).join('\n\n');
    const systemMessage = combinedInstructions ? [{ role: 'system', content: combinedInstructions }] : [];

    const stream = await openai.chat.completions.create({
      model,
      messages: [...systemMessage, ...messages],
      stream: true,
      temperature: parseFloat(process.env.DEFAULT_TEMPERATURE || '0.7'),
      top_p: parseFloat(process.env.DEFAULT_TOP_P || '0.9'),
      max_tokens: parseInt(process.env.MAX_TOKENS || '512'),
    });

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content || '';
      if (delta) {
        res.write(`data: ${JSON.stringify({ delta })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');

  } catch (error: any) {
    console.error('Error streaming from OpenAI:', error);
    res.write(`data: ${JSON.stringify({ error: { message: 'Error streaming response.' } })}\n\n`);
  } finally {
    res.end();
  }
});

// Start the server for local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`API server listening on port ${PORT}`);
  });
}

// This is required for Vercel to handle the serverless function
export default app;
