import { Request, Response } from 'express';
import OpenAI from 'openai';

// Helper function to get the correct API name
function getApiName(model: string): string {
  const mapping: Record<string, string> = {
    'gpt-4o-mini': 'gpt-4o-mini-2024-07-18',
    // Add other model mappings as needed
  };
  return mapping[model] || 'gpt-4o-mini-2024-07-18'; // Default fallback
}

/**
 * Handler for PromptRefinementWorkbench - refine prompt
 */
export const handleRefinePrompt = async (req: Request, res: Response): Promise<void> => {
  const { prompt, apiKey } = req.body;

  if (!prompt) {
    res.status(400).json({ error: 'Prompt is required.' });
    return;
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

    const analysis = JSON.parse(response.choices[0].message.content || '{}');
    res.json(analysis);
  } catch (error) {
    console.error('Error in refine-prompt handler:', error);
    res.status(500).json({ error: 'Failed to analyze prompt.' });
  }
};

/**
 * Handler for I.N.S.Y.N.C. prompt grading
 */
export const handleGradePrompt = async (req: Request, res: Response): Promise<void> => {
  const { prompt, apiKey } = req.body;

  if (!prompt) {
    res.status(400).json({ error: 'Prompt is required.' });
    return;
  }

  const openai = new OpenAI({
    apiKey: apiKey || process.env.OPENAI_API_KEY,
  });

  const evaluationPrompt = `
    You are an expert prompt engineer specializing in the I.N.S.Y.N.C. framework. Analyze the following prompt and provide detailed, constructive feedback.

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
    }
  `;

  try {
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
    console.error('Error in grade-prompt handler:', error);
    res.status(500).json({ error: 'Failed to grade prompt.' });
  }
};
