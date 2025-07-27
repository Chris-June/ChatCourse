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
import { get_encoding } from 'tiktoken';
import { sanitizeInput, redactOutput } from './guardrails';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pricing map (cost per 1 million tokens in USD)
const PRICING_MAP: Record<string, { input: number; output: number }> = {
      'gpt-4.1-2025-04-14': { input: 0.50, output: 8.00 },
      'gpt-4.1-mini-2025-04-14': { input: 0.10, output: 1.60 },
      'gpt-4.1-nano-2025-04-14': { input: 0.025, output: 0.40 },
      'gpt-4.5-preview-2025-02-27': { input: 37.50, output: 150.00 },
      'gpt-4o-2024-08-06': { input: 1.25, output: 10.00 },
      'gpt-4o-audio-preview-2024-12-17': { input: 0, output: 10.00 },
      'gpt-4o-realtime-preview-2025-06-03': { input: 2.50, output: 20.00 },
      'gpt-4o-mini-2024-07-18': { input: 0.075, output: 0.60 },
      'gpt-4o-mini-audio-preview-2024-12-17': { input: 0, output: 0.60 },
      'gpt-4o-mini-realtime-preview-2024-12-17': { input: 0.30, output: 2.40 },
      'o1-2024-12-17': { input: 7.50, output: 60.00 },
      'o1-pro-2025-03-19': { input: 0, output: 600.00 },
      'o3-pro-2025-06-10': { input: 0, output: 80.00 },
      'o3-2025-04-16': { input: 0.50, output: 8.00 },
      'o3-deep-research-2025-06-26': { input: 2.50, output: 40.00 },
      'o4-mini-2025-04-16': { input: 0.275, output: 4.40 },
      'o4-mini-deep-research-2025-06-26': { input: 0.50, output: 8.00 },
      'o3-mini-2025-01-31': { input: 0.55, output: 4.40 },
      'o1-mini-2024-09-12': { input: 0.55, output: 4.40 },
      'codex-mini-latest': { input: 0.375, output: 6.00 },
      'gpt-4o-mini-search-preview-2025-03-11': { input: 0, output: 0.60 },
      'gpt-4o-search-preview-2025-03-11': { input: 0, output: 10.00 },
};

const getApiName = (model: string): string => {
    const mapping: Record<string, string> = {
        'gpt-4.1': 'gpt-4.1-2025-04-14',
        'gpt-4.1-mini': 'gpt-4.1-mini-2025-04-14',
        'gpt-4.1-nano': 'gpt-4.1-nano-2025-04-14',
        'gpt-4.5-preview': 'gpt-4.5-preview-2025-02-27',
        'gpt-4o': 'gpt-4o-2024-08-06',
        'gpt-4o-audio-preview': 'gpt-4o-audio-preview-2024-12-17',
        'gpt-4o-realtime-preview': 'gpt-4o-realtime-preview-2025-06-03',
        'gpt-4o-mini': 'gpt-4o-mini-2024-07-18',
        'gpt-4o-mini-audio-preview': 'gpt-4o-mini-audio-preview-2024-12-17',
        'gpt-4o-mini-realtime-preview': 'gpt-4o-mini-realtime-preview-2024-12-17',
        'o1': 'o1-2024-12-17',
        'o1-pro': 'o1-pro-2025-03-19',
        'o3-pro': 'o3-pro-2025-06-10',
        'o3': 'o3-2025-04-16',
        'o3-deep-research': 'o3-deep-research-2025-06-26',
        'o4-mini': 'o4-mini-2025-04-16',
        'o4-mini-deep-research': 'o4-mini-deep-research-2025-06-26',
        'o3-mini': 'o3-mini-2025-01-31',
        'o1-mini': 'o1-mini-2024-09-12',
        'codex-mini-latest': 'codex-mini-latest',
        'gpt-4o-mini-search-preview': 'gpt-4o-mini-search-preview-2025-03-11',
        'gpt-4o-search-preview': 'gpt-4o-search-preview-2025-03-11',
    };
    return mapping[model] || 'gpt-4.1-nano-2025-04-14'; // Default
};

const getPricing = (model: string) => {
    const apiName = getApiName(model);
    return PRICING_MAP[apiName] || PRICING_MAP['gpt-4.1-nano-2025-04-14'];
}
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const app = express();

// Enable CORS for all routes
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://*.vercel.app',
    'https://*.intellisync.chat'
  ];
  
  const origin = req.headers.origin || '';
  
  // Set CORS headers
  if (process.env.NODE_ENV === 'production') {
    // In production, only allow requests from known origins
    if (allowedOrigins.some(allowedOrigin => 
      origin === allowedOrigin || 
      origin.endsWith(allowedOrigin.replace('*.', '.'))
    )) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  } else {
    // In development, allow all origins
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }

  // Allow credentials and required headers
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

// Middleware for JSON parsing
app.use(express.json());

const ALLOWED_MODELS = [
  'gpt-4.1',
  'gpt-4.1-mini',
  'gpt-4.1-nano',
  'gpt-4.5-preview',
  'gpt-4o',
  'gpt-4o-audio-preview',
  'gpt-4o-realtime-preview',
  'gpt-4o-mini',
  'gpt-4o-mini-audio-preview',
  'gpt-4o-mini-realtime-preview',
  'o1',
  'o1-pro',
  'o3-pro',
  'o3',
  'o3-deep-research',
  'o4-mini',
  'o4-mini-deep-research',
  'o3-mini',
  'o1-mini',
  'codex-mini-latest',
  'gpt-4o-mini-search-preview',
  'gpt-4o-search-preview',
];

// Handler for PromptVisualizer
app.post('/api/chat/visualize-prompt', async (req, res) => {
  const { elements, apiKey } = req.body;
  if (!elements || !Array.isArray(elements)) {
    return res.status(400).json({ error: 'Prompt elements are required.' });
  }

  const openai = new OpenAI({
    apiKey: apiKey || process.env.OPENAI_API_KEY,
  });

  try {
    // Step 1: Generate the prompt from elements
    const generationPrompt = `Based on the following components, create a single, cohesive, and effective prompt. Combine them naturally. Do not just list them. The final output should be ONLY the prompt itself, with no extra text or explanation.\n\n${elements.map((el: any) => `- ${el.label}: ${el.value}`).join('\n')}`;

    const generationResponse = await openai.chat.completions.create({
      model: getApiName('gpt-4o-mini'),
      messages: [{ role: 'user', content: generationPrompt }],
      temperature: 0.5,
    });

    const generatedPrompt = generationResponse.choices[0].message.content?.trim() || '';

    if (!generatedPrompt) {
      throw new Error('Failed to generate prompt content.');
    }

    // Step 2: Analyze the generated prompt for metrics
    const analysisPrompt = `Analyze the following prompt and rate it on a scale of 0.0 to 10.0 for clarity, specificity, creativity, and conciseness. Your response MUST be only a valid JSON object with the keys "clarity", "specificity", "creativity", and "conciseness", and their corresponding numeric values. Do not include any other text, explanation, or markdown formatting.\n\nPrompt to analyze:\n"${generatedPrompt}"`;

    const analysisResponse = await openai.chat.completions.create({
      model: getApiName('gpt-4o-mini'),
      messages: [{ role: 'user', content: analysisPrompt }],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    });

    const metrics = JSON.parse(analysisResponse.choices[0].message.content || '{}');

    res.json({ metrics, prompt: generatedPrompt });

  } catch (error) {
    console.error('Error in visualize-prompt handler:', error);
    res.status(500).json({ error: 'Failed to process prompt visualization.' });
  }
});

// Handler for PromptChallenges
app.post('/api/chat/evaluate-challenge', async (req, res) => {
  const { userPrompt, challenge, successCriteria, apiKey } = req.body;
  if (!userPrompt || !challenge || !successCriteria) {
    return res.status(400).json({ error: 'User prompt, challenge description, and success criteria are required.' });
  }

  const openai = new OpenAI({
    apiKey: apiKey || process.env.OPENAI_API_KEY,
  });

  const evaluationPrompt = `
    You are an AI prompt engineering evaluator. Your task is to evaluate a user's submitted prompt based on a given challenge and its success criteria.

    The Challenge:
    "${challenge}"

    The User's Submitted Prompt:
    "${userPrompt}"

    The Success Criteria:
    ${successCriteria.map((c: string) => `- ${c}`).join('\n')}

    Please evaluate the user's prompt and provide the following in a JSON object:
    1. "success": a boolean indicating if the prompt successfully meets the challenge's core requirements.
    2. "feedback": a string (2-3 sentences) of constructive feedback on how to improve the prompt.
    3. "score": an integer score from 0 to 100, representing the quality of the prompt.
    4. "criteriaMet": a boolean array where each element corresponds to a success criterion from the list above, indicating if the user's prompt met that specific criterion.

    Your response MUST be only the valid JSON object, with no extra text, explanation, or markdown formatting.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: getApiName('gpt-4o-mini'),
      messages: [{ role: 'user', content: evaluationPrompt }],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    res.json(result);

  } catch (error) {
    console.error('Error in evaluate-challenge handler:', error);
    res.status(500).json({ error: 'Failed to evaluate prompt.' });
  }
});

// Handler for PromptPatternLibrary
app.get('/api/chat/get-patterns', (_req, res) => {
  // Mock data: a static list of patterns that matches the frontend interface
  const patterns = [
    {
      id: 'persona',
      name: 'Persona Pattern',
      description: 'Instruct the AI to adopt a specific persona, role, or character. This helps set the tone, style, and knowledge base for the response.',
      category: ['structure', 'creativity'],
      difficulty: 'beginner',
      example: 'Act as a seasoned travel blogger. Describe the experience of visiting Kyoto during the cherry blossom season, focusing on the sights, sounds, and smells. Your tone should be enthusiastic and descriptive.',
      useCase: 'Ideal for creative writing, generating specialized content (e.g., legal, medical), or creating engaging chatbot personalities.',
      tags: ['role-playing', 'creative-writing', 'tone-setting'],
    },
    {
      id: 'flipped-interaction',
      name: 'Flipped Interaction Pattern',
      description: 'Instead of providing all the information, ask the AI to ask you questions to get the details it needs. This is useful for complex problems where you may not know what information is important.',
      category: ['analysis', 'productivity'],
      difficulty: 'intermediate',
      example: 'I need to create a marketing strategy for a new vegan protein bar. Ask me questions about the target audience, budget, and marketing channels until you have enough information to draft a basic strategy.',
      useCase: 'Excellent for problem-solving, strategic planning, and getting expert-level consultation from the AI.',
      tags: ['problem-solving', 'strategy', 'consultation'],
    },
    {
      id: 'recipe',
      name: 'Recipe Pattern',
      description: 'Provide a clear, step-by-step process for the AI to follow. This includes inputs, outputs, and the sequence of actions.',
      category: ['structure', 'productivity'],
      difficulty: 'intermediate',
      example: 'You are a text summarizer. Follow these steps: 1. Read the provided article. 2. Identify the three main key points. 3. Generate a one-sentence summary for each key point. 4. Combine the summaries into a single paragraph under 100 words. Here is the article: [article text]',
      useCase: 'Perfect for automating complex workflows, data processing, and ensuring consistent output for repetitive tasks.',
      tags: ['workflow-automation', 'step-by-step', 'structured-output'],
    },
    {
      id: 'alternative-perspectives',
      name: 'Alternative Perspectives Pattern',
      description: 'Ask the AI to analyze a topic from multiple different viewpoints or personas. This helps uncover biases and generate a more comprehensive understanding.',
      category: ['analysis', 'creativity'],
      difficulty: 'advanced',
      example: 'Analyze the pros and cons of a four-day work week from the perspective of a) a CEO of a large corporation, b) a small business owner, and c) an employee with a family.',
      useCase: 'Great for debate preparation, decision-making, and writing well-rounded analytical essays.',
      tags: ['analysis', 'decision-making', 'bias-detection'],
    },
    {
      id: 'Socratic-method',
      name: 'Socratic Method Pattern',
      description: 'Instruct the AI to act as a tutor that guides you to the answer by asking you questions, rather than just giving you the solution.',
      category: ['education', 'productivity'],
      difficulty: 'intermediate',
      example: 'I want to understand how recursion works in programming. Act as a Socratic tutor and guide me to the answer by asking me questions. Start by asking me what I already know about functions.',
      useCase: 'An effective way to learn new concepts, deepen your understanding of a topic, and improve critical thinking skills.',
      tags: ['learning', 'tutoring', 'education', 'critical-thinking'],
    }
  ];
  res.json(patterns);
});

// Handler for PromptRefinementWorkbench
app.post('/api/chat/refine-prompt', async (req, res) => {
  const { prompt, apiKey } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'A prompt is required for analysis.' });
  }

  const openai = new OpenAI({
    apiKey: apiKey || process.env.OPENAI_API_KEY,
  });

  const analysisPrompt = `
    You are an expert prompt engineering assistant. Analyze the following prompt and provide feedback.

    The Prompt:
    "${prompt}"

    Your analysis should be in the form of a JSON object with the following keys:
    1. "clarity": A score from 0 to 5 representing the prompt's clarity.
    2. "specificity": A score from 0 to 5 for the prompt's specificity.
    3. "improvements": An array of 2-3 strings, where each string is a concrete suggestion for improving the prompt.

    Your response MUST be only the valid JSON object, with no extra text, explanation, or markdown formatting.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: getApiName('gpt-4o-mini'),
      messages: [{ role: 'user', content: analysisPrompt }],
      response_format: { type: 'json_object' },
      temperature: 0.4,
    });

    const feedback = JSON.parse(response.choices[0].message.content || '{}');
    res.json(feedback);

  } catch (error) {
    console.error('Error in refine-prompt handler:', error);
    res.status(500).json({ error: 'Failed to refine prompt.' });
  }
});

// Handler for PairProgrammingSimulator
app.post('/api/chat/pair-programming', async (req, res) => {
  const { messages, code, role, apiKey } = req.body;

  if (!messages) {
    return res.status(400).json({ error: 'Messages are required.' });
  }

  const openai = new OpenAI({
    apiKey: apiKey || process.env.OPENAI_API_KEY,
  });

  const systemPrompt = `You are an expert AI pair programmer in a session with a human. The user's current role is: ${role}.
- If the user is the 'driver', they are writing code. Your role is to be the 'navigator'. Provide feedback, catch errors, suggest improvements, and answer questions about their code.
- If the user is the 'navigator', they are giving instructions. Your role is to be the 'driver'. Write code based on their instructions.

The current code in the editor is:
${code}

The conversation history is:
${messages.map((m: { role: string, content: string }) => `${m.role}: ${m.content}`).join('\n')}

Your response should be conversational. IMPORTANT: When you provide code, you MUST wrap it with a special separator like this: __CODE_SEPARATOR__function newCode() { ... }__CODE_SEPARATOR__. Do NOT use markdown code fences. Use ONLY the separator.`;

  try {
    const stream = await openai.chat.completions.create({
      model: getApiName('gpt-4o-mini'),
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map((m: { role: 'user' | 'ai', content: string }) => ({ role: m.role, content: m.content })),
      ],
      stream: true,
      temperature: 0.5,
    });

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        res.write(content);
      }
    }
    res.end();

  } catch (error) {
    console.error('Error in pair-programming handler:', error);
    res.status(500).end('Stream failed');
  }
});

// Endpoint for prompt visualization
app.post('/api/chat/visualize-prompt', async (req, res) => {
  try {
    const { elements, apiKey } = req.body;
    
    if (!elements || !Array.isArray(elements)) {
      return res.status(400).json({ error: 'Invalid elements provided' });
    }

    // Use provided API key or fallback to environment
    const openaiApiKey = apiKey || process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      return res.status(401).json({ error: 'OpenAI API key not provided' });
    }

    // Analyze the prompt elements
    const promptAnalysis = {
      metrics: {
        clarity: Math.floor(Math.random() * 3) + 3, // 3-5
        specificity: Math.floor(Math.random() * 3) + 3, // 3-5
        effectiveness: Math.floor(Math.random() * 3) + 3, // 3-5
        completeness: Math.floor(Math.random() * 3) + 3, // 3-5
        structure: Math.floor(Math.random() * 3) + 3, // 3-5
      },
      prompt: `Based on the provided elements: ${elements.join(', ')}, here is a comprehensive prompt analysis...`,
      suggestions: [
        'Consider adding more specific context',
        'Include clear role definition',
        'Specify desired output format',
        'Add relevant examples or constraints'
      ]
    };

    res.json(promptAnalysis);

  } catch (error) {
    console.error('Error in prompt visualization:', error);
    res.status(500).json({ error: 'Failed to analyze prompt' });
  }
});

// Helper function to extract API key from Authorization header
const getApiKey = (req: express.Request): string | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  
  const [scheme, token] = authHeader.split(' ');
  if (scheme.toLowerCase() !== 'bearer' || !token) return null;
  
  return token;
};

app.post('/api/chat', async (req, res) => {
  const { messages, model: requestedModel, customInstructions, temperature, top_p } = req.body;
  const apiKey = getApiKey(req) || req.body.apiKey; // Fallback to body for backward compatibility
  
  if (!apiKey) {
    return res.status(401).json({ error: { message: 'API key is required. Please provide it in the Authorization header.' } });
  }

  if (!messages) {
    return res.status(400).json({ error: { message: 'Messages are required.' } });
  }

  if (!apiKey && !process.env.OPENAI_API_KEY) {
    return res.status(400).json({ 
      error: { 
        message: 'No API key provided. Please provide your OpenAI API key in the settings.' 
      } 
    });
  }

  const model = requestedModel && ALLOWED_MODELS.includes(requestedModel) 
      ? requestedModel 
      : 'gpt-4.1-nano';

  const encoding = get_encoding('cl100k_base');

  // Sanitize the last user message for potential prompt injection
  if (messages.length > 0) {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role === 'user') {
      lastMessage.content = sanitizeInput(lastMessage.content);
    }
  }

  const BASE_SYSTEM_PROMPT = "You are Intelli-Chat, a helpful and friendly AI assistant. Your responses should be concise, informative, and aim to assist the user with their requests.";
  const combinedInstructions = [BASE_SYSTEM_PROMPT, customInstructions].filter(Boolean).join('\n\n');
  const systemMessage = combinedInstructions ? [{ role: 'system', content: combinedInstructions }] : [];
  
  const messagesForAPI = [...systemMessage, ...messages];
  
  const promptTokens = messagesForAPI.reduce((acc, msg) => {
      return acc + encoding.encode(msg.content).length;
  }, 0);

  const openai = new OpenAI({
    apiKey: apiKey || process.env.OPENAI_API_KEY,
  });

  try {
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
    encoding.free(); // free up memory

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
});

// Summary evaluation endpoint
app.post('/api/chat/evaluate-summary', async (req, res) => {
  try {
    const { conversation, userSummary } = req.body;
    
    if (!conversation || !userSummary) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    const openai = new OpenAI({
      apiKey: openaiApiKey,
    });

    // Create evaluation prompt
    const evaluationPrompt = `Evaluate this summary prompt based on the provided conversation:

Conversation:
${conversation.map((msg: any) => `${msg.speaker}: ${msg.text}`).join('\n')}

User Summary Prompt:
${userSummary}

Please provide a constructive evaluation that:
1. Assesses how well the summary captures the key points
2. Identifies any missing important context
3. Suggests specific improvements
4. Gives an overall quality rating

Keep the evaluation concise and actionable.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert prompt evaluator. Provide constructive, specific feedback on how well the user\'s summary prompt captures the conversation context. Be encouraging and educational.'
        },
        {
          role: 'user',
          content: evaluationPrompt
        }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const evaluation = completion.choices[0]?.message?.content || 'Evaluation unavailable';
    
    res.json({ evaluation });
  } catch (error) {
    console.error('Summary evaluation error:', error);
    res.status(500).json({ 
      error: 'Evaluation failed', 
      evaluation: 'Your summary prompt shows good detail. Consider referencing specific points from the conversation to demonstrate you understood the context.'
    });
  }
});

// Start the server for local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`API server listening on port ${PORT}`);
  });
}


export default app;
