/**
 * @file Chat handler for the real-time streaming endpoint.
 * @description This module contains the logic for handling chat requests,
 * streaming responses from the AI model, and calculating token usage.
 */

import express from 'express';
import { get_encoding } from 'tiktoken';
import { getApiKey, getApiName, getPricing, ALLOWED_MODELS, DEFAULT_MODEL } from '../handler'; // Exported from handler
import { sanitizeInput, redactOutput } from '../guardrails';

export const handleChat = async (req: express.Request, res: express.Response) => {
  try {
    const { messages, model, temperature, top_p, reasoning_effort, verbosity, tools, tool_choice } = req.body;
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

    // Using direct fetch to Responses API; OpenAI SDK streaming not used here

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

    // Determine selected model with safe default
    const selectedModel = (model && ALLOWED_MODELS.includes(model)) ? model : DEFAULT_MODEL;
    const apiName = getApiName(selectedModel);
    // Build Responses API payload
    const input = messagesForAPI.map((m) => ({
      role: m.role,
      content: [{ type: 'text', text: m.content }],
    }));

    const body: Record<string, any> = {
      model: apiName,
      input,
      stream: true,
      temperature: temperature !== undefined && temperature >= 0 && temperature <= 2 ? temperature : parseFloat(process.env.DEFAULT_TEMPERATURE || '0.7'),
      top_p: top_p !== undefined && top_p >= 0 && top_p <= 1 ? top_p : parseFloat(process.env.DEFAULT_TOP_P || '0.9'),
      max_output_tokens: parseInt(process.env.MAX_TOKENS || '512'),
    };
    if (reasoning_effort) body.reasoning = { effort: reasoning_effort };
    if (verbosity) body.verbosity = verbosity;
    if (Array.isArray(tools) && tools.length) body.tools = tools;
    if (tool_choice) body.tool_choice = tool_choice;

    const resp = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!resp.ok || !resp.body) {
      const txt = await resp.text();
      throw new Error(`OpenAI responses error: ${resp.status} ${txt}`);
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let completionText = '';
    let sseBuffer = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      sseBuffer += decoder.decode(value, { stream: true });

      // Split into SSE events by double newlines
      const events = sseBuffer.split('\n\n');
      sseBuffer = events.pop() || '';
      for (const evt of events) {
        const lines = evt.split('\n');
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const dataStr = trimmed.slice(5).trim();
          if (!dataStr || dataStr === '[DONE]') continue;
          try {
            const payload = JSON.parse(dataStr);
            const type: string | undefined = payload.type;
            // Handle text deltas
            if (type === 'response.output_text.delta' && typeof payload.delta === 'string') {
              const delta: string = payload.delta;
              completionText += delta;
              res.write(`data: ${JSON.stringify({ delta: redactOutput(delta) })}\n\n`);
            } else if (type === 'response.output_text.chunk' && typeof payload.text === 'string') {
              const delta: string = payload.text;
              completionText += delta;
              res.write(`data: ${JSON.stringify({ delta: redactOutput(delta) })}\n\n`);
            }
          } catch (e) {
            // Ignore non-JSON lines
          }
        }
      }
    }

    const completionTokens = encoding.encode(completionText).length;
    encoding.free();

    const { input: inputCost, output: outputCost } = getPricing(selectedModel);
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
