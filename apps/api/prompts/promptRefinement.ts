export const SYSTEM_INSYNC_EXPERT = 'You are an expert prompt engineer specializing in the I.N.S.Y.N.C. framework. Analyze prompts and provide detailed, constructive feedback.';

export function buildPromptAnalysisPrompt(userPrompt: string): string {
  return `
    You are an expert prompt engineering assistant. Analyze the following prompt and provide feedback.

    The Prompt:
    "${userPrompt}"

    Your analysis should be in the form of a JSON object with the following keys:
    1. "clarity": A score from 0 to 5 representing the prompt's clarity.
    2. "specificity": A score from 0 to 5 for the prompt's specificity.
    3. "improvements": An array of 2-3 strings, where each string is a concrete suggestion for improving the prompt.

    Your response MUST be only the valid JSON object, with no extra text, explanation, or markdown formatting.
  `;
}

export function buildInsyncEvaluationPrompt(userPrompt: string): string {
  return `
    You are an expert prompt engineer specializing in the I.N.S.Y.N.C. framework. Analyze the following prompt and provide detailed, constructive feedback.

    Prompt: ${userPrompt}

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
}
