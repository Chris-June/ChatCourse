/**
 * @file Chat handler for the real-time streaming endpoint.
 * @description This module contains the logic for handling chat requests,
 * streaming responses from the AI model, and calculating token usage.
 */

import express from 'express';
import OpenAI from 'openai';
import { get_encoding } from 'tiktoken';
import { getApiKey, getApiName, getPricing, ALLOWED_MODELS } from '../handler'; // Assuming these are exported from handler
import { sanitizeInput, redactOutput } from '../guardrails';

export const handleChat = async (req: express.Request, res: express.Response) => {
  try {
    const { messages, model, temperature, top_p } = req.body;
    const apiKey = getApiKey(req) || process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(401).json({ error: 'API key is required.' });
    }
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages are required.' });
    }
    if (model && !ALLOWED_MODELS.includes(model)) {
      return res.status(400).json({ error: `Model ${model} is not allowed.` });
    }

    const openai = new OpenAI({ apiKey });

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === 'user') {
      lastMessage.content = sanitizeInput(lastMessage.content);
    }

    const messagesForAPI = messages.map((msg: { role: 'user' | 'assistant' | 'system', content: string }) => ({
      role: msg.role,
      content: msg.content,
    }));

    const encoding = get_encoding('cl100k_base');
    const promptTokens = messagesForAPI.reduce((acc, msg) => acc + encoding.encode(msg.content).length, 0);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const apiName = getApiName(model);
    const stream = await openai.chat.completions.create({
      model: apiName,
      messages: messagesForAPI,
      stream: true,
      temperature: temperature !== undefined && temperature >= 0 && temperature <= 2 ? temperature : parseFloat(process.env.DEFAULT_TEMPERATURE || '0.7'),
      top_p: top_p !== undefined && top_p >= 0 && top_p <= 1 ? top_p : parseFloat(process.env.DEFAULT_TOP_P || '0.9'),
      max_tokens: parseInt(process.env.MAX_TOKENS || '512'),
    });

    let completionText = '';
    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content || '';
      if (delta) {
        completionText += delta;
        const redactedDelta = redactOutput(delta);
        res.write(`data: ${JSON.stringify({ delta: redactedDelta })}\n\n`);
      }
    }

    const completionTokens = encoding.encode(completionText).length;
    encoding.free();

    const { input: inputCost, output: outputCost } = getPricing(model);
    const promptCost = (promptTokens / 1_000_000) * inputCost;
    const completionCost = (completionTokens / 1_000_000) * outputCost;
    const totalCost = promptCost + completionCost;

    const metadata = {
      promptTokens,
      completionTokens,
      totalTokens: promptTokens + completionTokens,
      promptCost,
      completionCost,
      totalCost,
    };

    res.write(`event: metadata\ndata: ${JSON.stringify(metadata)}\n\n`);
    res.write('data: [DONE]\n\n');

  } catch (error: any) {
    console.error('Error streaming from OpenAI:', error);
    res.write(`data: ${JSON.stringify({ error: { message: 'Error streaming response.' } })}\n\n`);
  } finally {
    res.end();
  }
};
