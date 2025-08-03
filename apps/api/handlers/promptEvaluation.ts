import OpenAI from 'openai';
import { Request, Response } from 'express';

import { constructINSYNCPrompt, validateINSYNCElements, PromptElement } from '../utils/insyncFramework';

const getApiKey = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
};

// Helper function to get the correct API name
function getApiName(model: string): string {
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
    'gpt-4o-mini-realtime-preview': 'gpt-4o-mini-realtime-preview-2025-06-03',
    'o1': 'o1-2024-12-17',
    'o1-pro': 'o1-pro-2024-12-17',
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
  return mapping[model] || 'gpt-4o-mini-2024-07-18'; // Default fallback
}



interface EvaluationRequest {
  elements?: PromptElement[];
  prompt?: string;
  framework?: string;
  apiKey?: string;
  challenge?: string;
  successCriteria?: string[];
  userPrompt?: string;
}

/**
 * Handle I.N.S.Y.N.C. prompt visualization requests
 */
export async function handlePromptVisualization(req: Request, res: Response): Promise<void> {
  try {
    const { elements } = req.body as EvaluationRequest;
    const apiKey = getApiKey(req);
    
    if (!elements || !Array.isArray(elements)) {
      res.status(400).json({ error: 'Invalid elements provided' });
      return;
    }

    const openai = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY,
    });

    // Validate elements
    console.log('Validating I.N.S.Y.N.C. elements...');
    const validation = validateINSYNCElements(elements);
    console.log('Validation complete. Result:', validation);
    if (!validation.valid) {
      res.status(400).json({ error: validation.errors[0] });
      return;
    }

    // Construct I.N.S.Y.N.C. prompt using utility
    console.log('Constructing I.N.S.Y.N.C. prompt...');
    const insyncPrompt = constructINSYNCPrompt(elements);
    console.log('Prompt constructed successfully.');

    // Analyze the prompt using AI
    const analysisPrompt = `Analyze this I.N.S.Y.N.C. prompt and provide quality metrics:

${insyncPrompt}

Return JSON with:
{
  "metrics": {
    "clarity": 1-5,
    "specificity": 1-5,
    "effectiveness": 1-5,
    "completeness": 1-5,
    "structure": 1-5
  },
  "suggestions": ["improvement suggestions"],
  "strengths": ["what's working well"]
}`;

    const response = await openai.chat.completions.create({
      model: getApiName('gpt-4o-mini'),
      messages: [
        {
          role: 'system',
          content: 'You are an expert prompt analyzer. Evaluate the I.N.S.Y.N.C. prompt quality and provide detailed feedback.'
        },
        {
          role: 'user',
          content: analysisPrompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const content = response.choices[0]?.message?.content;
    console.log('OpenAI response for visualization:', content); // Log the raw response

    let analysis;
    try {
      analysis = JSON.parse(content || '{}');
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      console.error('Raw content received:', content);
      res.status(500).json({ error: 'Failed to process AI response. The response was not valid JSON.', rawContent: content });
      return;
    }

    res.json({
      metrics: analysis.metrics || {
        clarity: 4,
        specificity: 4,
        effectiveness: 4,
        completeness: 4,
        structure: 4
      },
      prompt: insyncPrompt,
      suggestions: analysis.suggestions || [
        'Consider adding more specific details to the Nuance section',
        'Clarify the Style for better tone consistency',
        'Expand the Context for more relevant background'
      ],
      strengths: analysis.strengths || [
        'Good Intent definition',
        'Clear Narrative Format specification'
      ]
    });

  } catch (error) {
    console.error('Error in prompt visualization:', error);
    res.status(500).json({ error: 'Failed to analyze prompt' });
  }
}

/**
 * Handle I.N.S.Y.N.C. prompt evaluation requests
 */
export async function handlePromptEvaluation(req: Request, res: Response): Promise<void> {
  try {
    const { prompt, framework } = req.body as EvaluationRequest;
    const apiKey = getApiKey(req);
    
    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    if (framework !== 'INSYNC') {
      res.status(400).json({ error: 'Only INSYNC framework is supported' });
      return;
    }

    const openai = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY,
    });

    const evaluationPrompt = `Analyze this prompt using the I.N.S.Y.N.C. framework:

Prompt: ${prompt}

Evaluate each I.N.S.Y.N.C. element:
- Intent: Clear goal definition
- Nuance: Specific details and constraints
- Style: Desired tone and voice
- You as...: AI role/persona specification
- Narrative Format: Output structure requirements
- Context: Background information

Return JSON with:
{
  "intent": {"score": 0-5, "feedback": "...", "example": "..."},
  "nuance": {"score": 0-5, "feedback": "...", "example": "..."},
  "style": {"score": 0-5, "feedback": "...", "example": "..."},
  "youAs": {"score": 0-5, "feedback": "...", "example": "..."},
  "narrativeFormat": {"score": 0-5, "feedback": "...", "example": "..."},
  "context": {"score": 0-5, "feedback": "...", "example": "..."},
  "totalScore": 0-30,
  "improvedPrompt": "...",
  "overallFeedback": "..."
}`;

    const response = await openai.chat.completions.create({
      model: getApiName('gpt-4o-mini'),
      messages: [
        {
          role: 'system',
          content: 'You are an expert prompt engineer specializing in the I.N.S.Y.N.C. framework. Analyze prompts and provide detailed, constructive feedback.'
        },
        {
          role: 'user',
          content: evaluationPrompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const evaluation = JSON.parse(response.choices[0]?.message?.content || '{}');
    
    // Convert to 10-point scale for consistency
    const scaledScore = Math.round((evaluation.totalScore / 30) * 10 * 10) / 10;
    
    res.json({
      ...evaluation,
      scaledScore,
      framework: 'INSYNC'
    });

  } catch (error) {
    console.error('Error in prompt evaluation:', error);
    res.status(500).json({ error: 'Failed to evaluate prompt' });
  }
}

/**
 * Handle challenge evaluation requests
 */
export async function handleChallengeEvaluation(req: Request, res: Response): Promise<void> {
  try {
    const { userPrompt, challenge, successCriteria } = req.body as EvaluationRequest;
    const apiKey = getApiKey(req);

    if (!userPrompt || !challenge || !successCriteria) {
      res.status(400).json({ error: 'Missing required parameters' });
      return;
    }

    const openai = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY,
    });

    const evaluationPrompt = `Evaluate this prompt against the challenge criteria using I.N.S.Y.N.C. principles:

Challenge: ${challenge}
User Prompt: ${userPrompt}
Success Criteria: ${successCriteria.join(', ')}

Analyze how well the prompt incorporates I.N.S.Y.N.C. elements:
- Intent: Clear goal definition
- Nuance: Specific details and constraints
- Style: Appropriate tone and voice
- You as...: AI role/persona specification
- Narrative Format: Output structure requirements
- Context: Relevant background information

Return JSON with:
{
  "success": true/false,
  "score": 0-100,
  "feedback": "detailed feedback",
  "criteriaEvaluation": [
    {
      "criteria": "criteria name",
      "met": true/false,
      "feedback": "specific feedback for this criterion"
    }
  ],
  "insyncAnalysis": {
    "intent": {"score": 0-5, "feedback": "..."},
    "nuance": {"score": 0-5, "feedback": "..."},
    "style": {"score": 0-5, "feedback": "..."},
    "youAs": {"score": 0-5, "feedback": "..."},
    "narrativeFormat": {"score": 0-5, "feedback": "..."},
    "context": {"score": 0-5, "feedback": "..."}
  }
}`;

    const response = await openai.chat.completions.create({
      model: getApiName('gpt-4o-mini'),
      messages: [
        {
          role: 'system',
          content: 'You are an expert prompt engineering evaluator. Analyze prompts against challenges using I.N.S.Y.N.C. framework principles.'
        },
        {
          role: 'user',
          content: evaluationPrompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const evaluation = JSON.parse(response.choices[0]?.message?.content || '{}');
    res.json(evaluation);

  } catch (error) {
    console.error('Error in challenge evaluation:', error);
    res.status(500).json({ error: 'Failed to evaluate challenge' });
  }
}

/**
 * Handle Module 1 Final Challenge evaluation requests
 */
export async function handleFinalChallengeEvaluation(req: Request, res: Response): Promise<void> {
  try {
    const { userPrompt } = req.body as EvaluationRequest;
    const apiKey = getApiKey(req);

    if (!userPrompt) {
      res.status(400).json({ error: 'Missing userPrompt' });
      return;
    }

    const openai = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY,
    });

    const masterSystemPrompt = `
      You are an expert AI educator and prompt engineering master, specializing in the I.N.S.Y.N.C. framework.
      Your task is to evaluate a user's prompt for the Module 1 Final Challenge.

      **The Challenge Scenario:**
      The user was asked to create a single, comprehensive prompt to generate three distinct social media posts for a new AI-powered productivity app called "CogniFlow." The posts should target LinkedIn (professional), Twitter (witty/engaging), and Instagram (visually-driven), each with a unique tone and call-to-action.

      **Your Evaluation Criteria:**
      You must evaluate the user's prompt based on all concepts taught in Module 1:
      1.  **I.N.S.Y.N.C. Framework:** Assess each of the 6 elements.
      2.  **Clarity vs. Vagueness:** How specific and unambiguous is the prompt?
      3.  **Advanced Techniques:** Did the user apply concepts like providing examples (instructional priming) or asking for a specific format?

      **Response Format:**
      You MUST return your evaluation in a valid JSON object with the following structure. Do not include any text outside of the JSON object.

      {
        "feedback": {
          "intent": { "score": number, "comment": "string" },
          "nuance": { "score": number, "comment": "string" },
          "style": { "score": number, "comment": "string" },
          "youAs": { "score": number, "comment": "string" },
          "narrativeFormat": { "score": number, "comment": "string" },
          "context": { "score": number, "comment": "string" },
          "advancedTechniques": { "score": number, "comment": "string" }
        },
        "overallScore": number, // A score out of 35
        "strengths": ["string"],
        "suggestions": ["string"],
        "expertPrompt": "string", // An exemplary prompt that perfectly solves the challenge
        "expertOutput": "string" // The output generated from the expert prompt
      }

      **Scoring Guide (0-5 for each):**
      - **Intent:** 5 = Perfectly clear goal. 1 = Vague or missing.
      - **Nuance:** 5 = Rich, specific details for each platform. 1 = Generic request.
      - **Style:** 5 = Distinct, appropriate styles defined for all three platforms. 1 = No style mentioned.
      - **You As...:** 5 = A well-defined, expert persona for the AI. 1 = No persona.
      - **Narrative Format:** 5 = Clear, structured format for all outputs. 1 = No format requested.
      - **Context:** 5 = Essential background on CogniFlow and its target audience. 1 = Missing context.
      - **Advanced Techniques:** 5 = Excellent use of priming or other advanced methods. 1 = Basic prompt structure.

      Now, evaluate the following user prompt.
    `;

    const response = await openai.chat.completions.create({
      model: getApiName('gpt-4o-mini'),
      messages: [
        { role: 'system', content: masterSystemPrompt },
        { role: 'user', content: `User Prompt: "${userPrompt}"` }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    });

    const evaluation = JSON.parse(response.choices[0]?.message?.content || '{}');
    res.json(evaluation);

  } catch (error) {
    console.error('Error in final challenge evaluation:', error);
    res.status(500).json({ error: 'Failed to evaluate final challenge' });
  }
}
