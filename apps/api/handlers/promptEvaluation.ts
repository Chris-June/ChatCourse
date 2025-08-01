import { Request, Response } from 'express';
import { evaluatePrompt, InsyncCriteria } from '../utils/insyncFramework';

/**
 * Handles the visualization of a prompt's I.N.S.Y.N.C. score.
 */
export const handlePromptVisualization = (req: Request, res: Response) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt text is required.' });
  }
  const evaluation = evaluatePrompt(prompt);
  res.json(evaluation);
};

// Mock data for challenge success criteria
const challengeSuccessCriteria: Record<string, Partial<InsyncCriteria>> = {
  '1': { intent: true, youAsNarrative: true },
  '2': { context: true, nuance: true },
  '3': { style: true, nuance: true },
  '4': { intent: true, context: true, youAsNarrative: true },
  '5': { intent: true, nuance: true, style: true, youAsNarrative: true, context: true },
};

/**
 * Handles the evaluation of a user's prompt against a specific challenge's criteria.
 */
export const handleChallengeEvaluation = (req: Request, res: Response) => {
  const { prompt, challengeId } = req.body;

  if (!prompt || !challengeId) {
    return res.status(400).json({ error: 'Prompt and challengeId are required.' });
  }

  const successCriteria = challengeSuccessCriteria[challengeId];
  if (!successCriteria) {
    return res.status(404).json({ error: 'Challenge not found.' });
  }

  const evaluation = evaluatePrompt(prompt);
  const passed = (Object.keys(successCriteria) as Array<keyof InsyncCriteria>).every(
    key => evaluation.criteria[key] === successCriteria[key]
  );

  res.json({ ...evaluation, passed });
};
