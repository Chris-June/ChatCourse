export const SYSTEM_INSYNC_EXPERT = 'You are an expert prompt engineer specializing in the I.N.S.Y.N.C. framework. Analyze prompts and provide detailed, constructive feedback.';

/**
 * A concise rubric for scoring I.N.S.Y.N.C. elements consistently.
 * Scores are 0–5 with descriptors to guide comments.
 */
export const INSYNC_RUBRIC = `
Rubric (0–5 per element):
- 5 Excellent: Specific, complete, and directly actionable. No ambiguity.
- 4 Good: Mostly specific with minor gaps; clearly actionable.
- 3 Fair: Partially specific; some ambiguity; needs refinement.
- 2 Weak: Vague or underspecified; hard to follow without guessing.
- 1 Poor: Minimal signal; lacks required details.
- 0 Missing: Not present.

Element-level criteria:
- Intent: Clear task and success target.
- Nuance: Concrete constraints (limits, must/avoid, acceptance criteria).
- Style: Tone/voice matched to audience and task.
- YouAs: Appropriate role/persona giving domain lens.
- NarrativeFormat: Explicit structure/schema the model should output.
- Context: High-signal background facts, references, or examples.`;

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

    Use the following rubric to assign scores and to ground your comments:
    ${INSYNC_RUBRIC}

    Return JSON with:
    {
      "intent": {"score": 0-5, "comment": "why the score, per rubric", "example": "improved phrasing"},
      "nuance": {"score": 0-5, "comment": "why the score, per rubric", "example": "add concrete limits"},
      "style": {"score": 0-5, "comment": "why the score, per rubric", "example": "tone guidance"},
      "youAs": {"score": 0-5, "comment": "why the score, per rubric", "example": "role clarification"},
      "narrativeFormat": {"score": 0-5, "comment": "why the score, per rubric", "example": "structure/schema"},
      "context": {"score": 0-5, "comment": "why the score, per rubric", "example": "high-signal facts"},
      "totalScore": 0-30,
      "improvedPrompt": "...",
      "overallFeedback": "...",
      "rubricUsed": "INSYNC_RUBRIC_V1"
    }
  `;
}
