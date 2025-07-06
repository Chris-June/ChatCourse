/**
 * @file models.ts
 * @description Defines the available OpenAI models with their pricing and context window information.
 */

export interface Model {
  id: string;
  family: string;
  name: string;
  context: string;
  inputCost: number;
  outputCost: number;
  description: string;
  isPreview?: boolean;
}

export const modelFamilies = [
  'GPT-4.1',
  'GPT-4o',
  'O-Series',
  'Legacy & Misc',
  'Preview',
];

export const models: Model[] = [
  // GPT-4.1
  {
    id: 'gpt-4.1',
    family: 'GPT-4.1',
    name: 'GPT-4.1',
    context: '128k',
    inputCost: 2.00,
    outputCost: 8.00,
    description: 'Flagship accuracy & vision',
  },
  {
    id: 'gpt-4.1-mini',
    family: 'GPT-4.1',
    name: 'GPT-4.1 Mini',
    context: '128k',
    inputCost: 0.40,
    outputCost: 1.60,
    description: 'Mid-tier cost/quality',
  },
  {
    id: 'gpt-4.1-nano',
    family: 'GPT-4.1',
    name: 'GPT-4.1 Nano',
    context: '128k',
    inputCost: 0.10,
    outputCost: 0.40,
    description: 'Ultra-cheap, low-latency',
  },

  // GPT-4o
  {
    id: 'gpt-4o',
    family: 'GPT-4o',
    name: 'GPT-4o',
    context: '128k',
    inputCost: 2.50,
    outputCost: 10.00,
    description: 'Real-time, multimodal',
  },
  {
    id: 'gpt-4o-mini',
    family: 'GPT-4o',
    name: 'GPT-4o Mini',
    context: '128k',
    inputCost: 0.15,
    outputCost: 0.60,
    description: 'Cheapest “4-class” model',
  },

  // O-Series
  {
    id: 'o3',
    family: 'O-Series',
    name: 'o3',
    context: '200k',
    inputCost: 2.00,
    outputCost: 8.00,
    description: 'Top reasoning/math/coding',
  },
  {
    id: 'o3-mini',
    family: 'O-Series',
    name: 'o3 Mini',
    context: '200k',
    inputCost: 0.25,
    outputCost: 1.00,
    description: 'Lightweight reasoning',
  },
  {
    id: 'o4-mini',
    family: 'O-Series',
    name: 'o4 Mini',
    context: '200k',
    inputCost: 1.10,
    outputCost: 4.40,
    description: 'Fast reasoning on a budget',
  },

  // Legacy & Misc
  {
    id: 'gpt-4-turbo',
    family: 'Legacy & Misc',
    name: 'GPT-4 Turbo',
    context: '128k',
    inputCost: 10.00,
    outputCost: 30.00,
    description: 'Legacy Turbo model',
  },
  {
    id: 'gpt-4',
    family: 'Legacy & Misc',
    name: 'GPT-4',
    context: '8k',
    inputCost: 30.00,
    outputCost: 60.00,
    description: 'Legacy 4 accuracy',
  },
  {
    id: 'gpt-3.5-turbo',
    family: 'Legacy & Misc',
    name: 'GPT-3.5 Turbo',
    context: '16k',
    inputCost: 0.50,
    outputCost: 1.50,
    description: 'Fast and cheap chat model',
  },
  {
    id: 'codex-mini-latest',
    family: 'Legacy & Misc',
    name: 'Codex Mini',
    context: '16k',
    inputCost: 0.10,
    outputCost: 0.40,
    description: 'Code generation model',
  },

  // Preview
  {
    id: 'gpt-4.5-preview',
    family: 'Preview',
    name: 'GPT-4.5 Preview',
    context: '256k',
    inputCost: 75.00,
    outputCost: 75.00,
    description: 'Experimental creative model',
    isPreview: true,
  },
  {
    id: 'o1-preview',
    family: 'Preview',
    name: 'o1 Preview',
    context: '200k',
    inputCost: 15.00,
    outputCost: 60.00,
    description: 'Next-gen reasoning',
    isPreview: true,
  },
  {
    id: 'o1-mini',
    family: 'Preview',
    name: 'o1 Mini',
    context: '200k',
    inputCost: 3.00,
    outputCost: 12.00,
    description: 'Lighter o1 variant',
    isPreview: true,
  },
  {
    id: 'o3-deep-research',
    family: 'Preview',
    name: 'o3 Deep Research',
    context: '200k',
    inputCost: 4.00,
    outputCost: 16.00,
    description: 'Deep research capabilities',
    isPreview: true,
  },
  {
    id: 'o4-mini-deep-research',
    family: 'Preview',
    name: 'o4 Mini Deep Research',
    context: '200k',
    inputCost: 2.20,
    outputCost: 8.80,
    description: 'Deep research for mini model',
    isPreview: true,
  },
  {
    id: 'gpt-4o-mini-search-preview',
    family: 'Preview',
    name: 'GPT-4o Mini Search',
    context: '128k',
    inputCost: 0.30,
    outputCost: 1.20,
    description: 'Search-enabled mini model',
    isPreview: true,
  },
  {
    id: 'gpt-4o-search-preview',
    family: 'Preview',
    name: 'GPT-4o Search',
    context: '128k',
    inputCost: 5.00,
    outputCost: 10.00,
    description: 'Search-enabled model',
    isPreview: true,
  },
];
