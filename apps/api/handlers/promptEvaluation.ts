import { buildFinalChallengeMasterPrompt } from '../prompts/promptEvaluation';
import OpenAI from 'openai';
import { Request, Response } from 'express';

import { constructINSYNCPrompt, validateINSYNCElements, PromptElement } from '../utils/insyncFramework';
import { getApiName, DEFAULT_MODEL } from '../handler';

const getApiKey = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
};

// getApiName is imported from ../handler; DEFAULT_MODEL is 'gpt-5-nano'



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
      model: getApiName(DEFAULT_MODEL),
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
      model: getApiName(DEFAULT_MODEL),
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
      model: getApiName(DEFAULT_MODEL),
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

    const masterSystemPrompt = buildFinalChallengeMasterPrompt();

    const response = await openai.chat.completions.create({
      model: getApiName(DEFAULT_MODEL),
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
