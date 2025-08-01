import { Request, Response } from 'express';
import { evaluatePrompt } from '../utils/insyncFramework';

/**
 * Simulates refining a prompt based on I.N.S.Y.N.C. evaluation.
 * In a real scenario, this would involve a call to an LLM.
 */
const getRefinedPrompt = (prompt: string): string => {
  const evaluation = evaluatePrompt(prompt);
  if (evaluation.score === 100) {
    return prompt; // No refinement needed
  }

  let refinedPrompt = prompt;
  if (!evaluation.criteria.youAsNarrative) {
    refinedPrompt = `Act as an expert in your field.\n${refinedPrompt}`;
  }
  if (!evaluation.criteria.context) {
    refinedPrompt += '\n\nContext: [Provide necessary background information here.]';
  }
  if (!evaluation.criteria.intent) {
    refinedPrompt += '\n\nGoal: [Clearly state the desired outcome or task.]';
  }
  if (!evaluation.criteria.nuance) {
    refinedPrompt += '\n\nConstraints: [Add any rules, format, or tone requirements here.]';
  }

  return refinedPrompt;
};

/**
 * Handles refining a user's prompt.
 */
export const handleRefinePrompt = (req: Request, res: Response) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt text is required.' });
  }
  const refinedPrompt = getRefinedPrompt(prompt);
  res.json({ refinedPrompt });
};

/**
 * Handles grading a prompt based on I.N.S.Y.N.C. criteria.
 */
export const handleGradePrompt = (req: Request, res: Response) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt text is required.' });
  }
  const evaluation = evaluatePrompt(prompt);
  res.json(evaluation);
};
