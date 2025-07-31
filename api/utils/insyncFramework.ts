/**
 * I.N.S.Y.N.C. Framework Utilities
 * Provides shared functionality for I.N.S.Y.N.C. prompt analysis
 */

export interface INSYNCElement {
  id: string;
  label: string;
  description: string;
  prompt: string;
}

export interface INSYNCFramework {
  [key: string]: INSYNCElement;
}

export interface PromptElement {
  id: string;
  value: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * I.N.S.Y.N.C. Framework Elements Definition
 */
export const INSYNC_ELEMENTS: INSYNCFramework = {
  intent: {
    id: 'intent',
    label: 'Intent',
    description: 'Clear goal and purpose definition',
    prompt: 'What specific goal do you want to achieve?'
  },
  nuance: {
    id: 'nuance',
    label: 'Nuance',
    description: 'Specific details, constraints, and requirements',
    prompt: 'What specific details, constraints, or requirements should be considered?'
  },
  style: {
    id: 'style',
    label: 'Style',
    description: 'Desired tone, voice, and communication style',
    prompt: 'What tone, voice, or communication style should be used?'
  },
  youAs: {
    id: 'youAs',
    label: 'You as...',
    description: 'AI role, persona, or expertise specification',
    prompt: 'What role, persona, or expertise should the AI adopt?'
  },
  narrativeFormat: {
    id: 'narrativeFormat',
    label: 'Narrative Format',
    description: 'Output structure and format requirements',
    prompt: 'What structure or format should the output follow?'
  },
  context: {
    id: 'context',
    label: 'Context',
    description: 'Relevant background information and constraints',
    prompt: 'What background information or context is important?'
  }
};

/**
 * Validate I.N.S.Y.N.C. prompt elements
 */
export function validateINSYNCElements(elements: PromptElement[]): ValidationResult {
  if (!Array.isArray(elements)) {
    return { valid: false, errors: ['Elements must be an array'] };
  }

  const requiredElements = Object.keys(INSYNC_ELEMENTS);
  const providedElements = elements.map(e => e.id);
  const missingElements = requiredElements.filter(id => !providedElements.includes(id));

  if (missingElements.length > 0) {
    return {
      valid: false,
      errors: [`Missing required elements: ${missingElements.join(', ')}`]
    };
  }

  return { valid: true, errors: [] };
}

/**
 * Construct I.N.S.Y.N.C. prompt from elements
 */
export function constructINSYNCPrompt(elements: PromptElement[]): string {
  const elementMap: Record<string, string> = {};
  elements.forEach(element => {
    elementMap[element.id] = element.value || '';
  });

  return `**Intent**: ${elementMap.intent || 'explain a concept'}

**Nuance**: ${elementMap.nuance || 'with clear examples'}

**Style**: ${elementMap.style || 'professional and clear'}

**You as...**: ${elementMap.youAs || 'expert assistant'}

**Narrative Format**: ${elementMap.narrativeFormat || 'structured explanation'}

**Context**: ${elementMap.context || 'for general audience'}`;
}

/**
 * Generate evaluation prompt for I.N.S.Y.N.C. framework
 */
export function generateEvaluationPrompt(prompt: string, framework: string = 'INSYNC'): string {
  return `Evaluate this prompt using the ${framework} framework:

Prompt: ${prompt}

Analyze each ${framework} element:
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
}
