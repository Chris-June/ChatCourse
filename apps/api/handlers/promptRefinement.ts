import { Request, Response } from 'express';
import OpenAI from 'openai';
import { getApiName, DEFAULT_MODEL } from '../handler';
import { buildPromptAnalysisPrompt, buildInsyncEvaluationPrompt, SYSTEM_INSYNC_EXPERT } from '../prompts/promptRefinement';

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

  const analysisPrompt = buildPromptAnalysisPrompt(prompt);

  try {
    const response = await openai.chat.completions.create({
      model: getApiName(DEFAULT_MODEL),
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
const getApiKey = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
};

/**
 * Handler for I.N.S.Y.N.C. prompt grading
 */
export const handleGradePrompt = async (req: Request, res: Response): Promise<void> => {
  const { prompt } = req.body;
  const apiKey = getApiKey(req);

  if (!prompt) {
    res.status(400).json({ error: 'Prompt is required.' });
    return;
  }

  const openai = new OpenAI({
    apiKey: apiKey || process.env.OPENAI_API_KEY,
  });

  const evaluationPrompt = buildInsyncEvaluationPrompt(prompt);

  try {
    const response = await openai.chat.completions.create({
      model: getApiName(DEFAULT_MODEL),
      messages: [
        { role: 'system', content: SYSTEM_INSYNC_EXPERT },
        {
          role: 'user',
          content: evaluationPrompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const evaluation = JSON.parse(response.choices[0]?.message?.content || '{}');

    // Step 2: Get a direct response to the user's prompt
    const modelResponse = await openai.chat.completions.create({
      model: getApiName(DEFAULT_MODEL),
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const directResponse = modelResponse.choices[0]?.message?.content || 'No response generated.';

    // Step 3: Combine evaluation and response
    res.json({
      response: directResponse,
      feedback: evaluation
    });

  } catch (error) {
    console.error('Error in grade-prompt handler:', error);
    res.status(500).json({ error: 'Failed to grade prompt.' });
  }
};
