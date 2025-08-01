/**
 * @file I.N.S.Y.N.C. Framework Utilities
 * @description Provides the core logic, criteria, and evaluation functions for the
 * I.N.S.Y.N.C. prompt engineering framework.
 */

export interface PromptElement {
  id: string;
  value: string;
}

export interface InsyncCriteria {
  intent: boolean;
  nuance: boolean;
  style: boolean;
  youAsNarrative: boolean;
  context: boolean;
}

export interface InsyncEvaluation {
  criteria: InsyncCriteria;
  score: number;
  feedback: string;
}

const CRITERIA_DEFINITIONS = {
  intent: {
    pass: 'Clear Intent: The prompt has a well-defined goal.',
    fail: 'Unclear Intent: The prompt lacks a specific goal. What should the AI do?',
  },
  nuance: {
    pass: 'Sufficient Nuance: The prompt includes constraints and details.',
    fail: 'Lacks Nuance: The prompt is too broad. Add constraints like tone, format, or length.',
  },
  style: {
    pass: 'Defined Style: The prompt specifies a clear tone or writing style.',
    fail: 'Undefined Style: The prompt does not specify a tone or style (e.g., formal, friendly, professional).',
  },
  youAsNarrative: {
    pass: 'Effective Persona: The prompt assigns a clear role or persona to the AI.',
    fail: 'No Persona: The prompt does not assign a role to the AI (e.g., "Act as an expert marketer").',
  },
  context: {
    pass: 'Sufficient Context: The prompt provides necessary background information.',
    fail: 'Lacks Context: The prompt is missing background information the AI needs to succeed.',
  },
};

/**
 * Evaluates a given prompt against the I.N.S.Y.N.C. framework.
 * @param {string} promptText The text of the prompt to evaluate.
 * @returns {InsyncEvaluation} The evaluation result, including criteria, score, and feedback.
 */
/**
 * Validates that the core I.N.S.Y.N.C. elements are present.
 * @param {PromptElement[]} elements The elements to validate.
 * @returns {{valid: boolean, errors: string[]}} Validation result.
 */
export const validateINSYNCElements = (elements: PromptElement[]): { valid: boolean; errors: string[] } => {
  const requiredIds = ['intent', 'nuance', 'style', 'youAs', 'narrativeFormat', 'context'];
  const providedIds = new Set(elements.map(e => e.id));
  const errors: string[] = [];

  for (const id of requiredIds) {
    if (!providedIds.has(id)) {
      errors.push(`Missing required I.N.S.Y.N.C. element: ${id}`);
    }
  }

  return { valid: errors.length === 0, errors };
};

/**
 * Constructs a formatted I.N.S.Y.N.C. prompt from individual elements.
 * @param {PromptElement[]} elements The elements to construct the prompt from.
 * @returns {string} The formatted prompt string.
 */
export const constructINSYNCPrompt = (elements: PromptElement[]): string => {
  const elementMap = new Map(elements.map(e => [e.id, e.value]));
  return `
--- I.N.S.Y.N.C. PROMPT ---

[INTENT]: ${elementMap.get('intent') || ''}

[NUANCE]: ${elementMap.get('nuance') || ''}

[STYLE]: ${elementMap.get('style') || ''}

[YOU AS...]: ${elementMap.get('youAs') || ''}

[NARRATIVE FORMAT]: ${elementMap.get('narrativeFormat') || ''}

[CONTEXT]: ${elementMap.get('context') || ''}

--- END PROMPT ---
`.trim();
};

export const evaluatePrompt = (promptText: string): InsyncEvaluation => {
  const lowerCasePrompt = promptText.toLowerCase();
  const criteria: InsyncCriteria = {
    intent: [/goal is to/, /objective is/, /i want you to/, /your task is/].some(p => p.test(lowerCasePrompt)),
    nuance: [/format:/, /tone:/, /length:/, /max words/, /must include/, /do not include/].some(p => p.test(lowerCasePrompt)),
    style: [/style:/, /tone is/, /writing style/].some(p => p.test(lowerCasePrompt)),
    youAsNarrative: [/act as/, /you are a/, /your role is/, /persona:/].some(p => p.test(lowerCasePrompt)),
    context: [/context:/, /background:/, /information:/, /scenario:/].some(p => p.test(lowerCasePrompt)),
  };

  const score = Object.values(criteria).filter(Boolean).length * 20;
  let feedback = 'I.N.S.Y.N.C. Analysis:\n';

  (Object.keys(criteria) as Array<keyof InsyncCriteria>).forEach(key => {
    feedback += ` - ${criteria[key] ? CRITERIA_DEFINITIONS[key].pass : CRITERIA_DEFINITIONS[key].fail}\n`;
  });

  return { criteria, score, feedback };
};
