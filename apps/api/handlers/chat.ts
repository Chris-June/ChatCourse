/**
 * @file Chat handler for the real-time streaming endpoint.
 * @description This module contains the logic for handling chat requests,
 * streaming responses from the AI model, and calculating token usage.
 */

import express from 'express';
import { get_encoding } from 'tiktoken';
import { getApiKey, getApiName, getPricing, ALLOWED_MODELS, DEFAULT_MODEL } from '../handler'; // Exported from handler
import { sanitizeInput, redactOutput } from '../guardrails';

// --- Simple tool registry (server-executed) ---
type ToolArgs = Record<string, any>;
type ToolOutput = string; // textual tool output returned to the model

const toolsRegistry: Record<string, (args: ToolArgs) => Promise<ToolOutput>> = {
  'math.calculate': async (args: ToolArgs) => {
    const { expression } = args as { expression: string };
    // Very basic, sandboxed arithmetic evaluator (digits + ops only)
    if (typeof expression !== 'string') throw new Error('expression must be a string');
    if (!/^[-+*/()\d\s\.]+$/.test(expression)) throw new Error('unsupported characters in expression');
    // eslint-disable-next-line no-new-func
    const result = Function(`"use strict"; return (${expression})`)();
    if (typeof result === 'number' && Number.isFinite(result)) return String(result);
    throw new Error('calculation failed');
  },
  'time.now': async (_args: ToolArgs) => {
    const now = new Date();
    return JSON.stringify({ iso: now.toISOString(), locale: now.toLocaleString() });
  },
  'text.extract_urls': async (args: ToolArgs) => {
    const { text } = args as { text: string };
    if (typeof text !== 'string') throw new Error('text must be a string');
    const urls = Array.from(text.matchAll(/https?:\/\/[^\s)]+/g)).map((m) => m[0]);
    return JSON.stringify({ urls });
  },
};

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
    // Build Responses API base payload
    const input = messagesForAPI.map((m) => ({
      role: m.role,
      content: [{ type: 'text', text: m.content }],
    }));

    const base: Record<string, any> = {
      model: apiName,
      stream: true,
      temperature: temperature !== undefined && temperature >= 0 && temperature <= 2 ? temperature : parseFloat(process.env.DEFAULT_TEMPERATURE || '0.7'),
      top_p: top_p !== undefined && top_p >= 0 && top_p <= 1 ? top_p : parseFloat(process.env.DEFAULT_TOP_P || '0.9'),
      max_output_tokens: parseInt(process.env.MAX_TOKENS || '512'),
    };
    if (reasoning_effort) base.reasoning = { effort: reasoning_effort };
    if (verbosity) base.verbosity = verbosity;
    if (Array.isArray(tools) && tools.length) base.tools = tools;
    if (tool_choice) base.tool_choice = tool_choice;

    const decoder = new TextDecoder();
    let completionText = '';
    let responseId: string | null = null;

    // Helper to stream a request to /responses and collect tool calls
    const streamOnce = async (body: any) => {
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
      let sseBuffer = '';
      const pendingToolCalls: { id?: string; name: string; args: any }[] = [];

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        sseBuffer += decoder.decode(value, { stream: true });
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
              if (!responseId) {
                // Try capture id from created or similar event shapes
                responseId = payload.response_id || payload.id || payload.response?.id || responseId;
              }
              if (type === 'response.output_text.delta' && typeof payload.delta === 'string') {
                const delta: string = payload.delta;
                completionText += delta;
                res.write(`data: ${JSON.stringify({ delta: redactOutput(delta) })}\n\n`);
              } else if (type === 'response.output_text.chunk' && typeof payload.text === 'string') {
                const delta: string = payload.text;
                completionText += delta;
                res.write(`data: ${JSON.stringify({ delta: redactOutput(delta) })}\n\n`);
              } else if (type === 'response.tool_call' && payload.name) {
                // A compact event form: name + arguments
                pendingToolCalls.push({ id: payload.id, name: payload.name, args: payload.arguments || payload.input || {} });
              } else if (payload.tool && payload.tool.name) {
                // Fallback for other shapes that embed tool info
                pendingToolCalls.push({ id: payload.tool.id, name: payload.tool.name, args: payload.tool.arguments || {} });
              }
            } catch (e) {
              // ignore
            }
          }
        }
      }

      return pendingToolCalls;
    };

    // 1) Initial run with user input
    let pendingCalls = await streamOnce({ ...base, input });

    // 2) Handle tool calls in a loop until none are pending
    const maxToolLoops = 3;
    let loops = 0;
    while (pendingCalls.length && loops < maxToolLoops) {
      loops++;
      const outputs: { tool_call_id?: string; output: string; name?: string }[] = [];
      for (const call of pendingCalls) {
        const runner = toolsRegistry[call.name];
        if (!runner) {
          outputs.push({ tool_call_id: call.id, output: `Tool ${call.name} not found`, name: call.name });
          continue;
        }
        try {
          const out = await runner(call.args || {});
          outputs.push({ tool_call_id: call.id, output: out, name: call.name });
        } catch (err: any) {
          outputs.push({ tool_call_id: call.id, output: `Error: ${err?.message || 'tool failed'}`, name: call.name });
        }
      }

      // Send tool outputs to continue the same response
      const nextBody: any = {
        ...base,
        response_id: responseId,
        tool_outputs: outputs.map((o) => ({ tool_call_id: o.tool_call_id, output: o.output })),
      };
      pendingCalls = await streamOnce(nextBody);
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
