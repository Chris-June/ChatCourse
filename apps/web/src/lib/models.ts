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
  'GPT-4o (Omni)',
  'GPT-4 “Turbo & classic”',
  'GPT-3.5',
  'High-reasoning “o-series”',
  'Preview / research',
];

export const models: Model[] = [
  // GPT-4.1
  {
    id: 'gpt-4.1',
    family: 'GPT-4.1',
    name: 'GPT-4.1',
    context: '1M',
    inputCost: 2.00,
    outputCost: 8.00,
    description: 'Flagship accuracy & vision',
  },
  {
    id: 'gpt-4.1-mini',
    family: 'GPT-4.1',
    name: 'GPT-4.1 Mini',
    context: '1M',
    inputCost: 0.40,
    outputCost: 1.60,
    description: 'Mid-tier cost/quality',
  },
  {
    id: 'gpt-4.1-nano',
    family: 'GPT-4.1',
    name: 'GPT-4.1 Nano',
    context: '1M',
    inputCost: 0.10,
    outputCost: 0.40,
    description: 'Ultra-cheap, low-latency',
  },
  // GPT-4o (Omni)
  {
    id: 'gpt-4o',
    family: 'GPT-4o (Omni)',
    name: 'GPT-4o',
    context: '128k',
    inputCost: 5.00,
    outputCost: 20.00,
    description: 'Real-time, multimodal',
  },
  {
    id: 'gpt-4o-mini',
    family: 'GPT-4o (Omni)',
    name: 'GPT-4o Mini',
    context: '128k',
    inputCost: 0.60,
    outputCost: 2.40,
    description: 'Cheapest “4-class” model',
  },
  // GPT-4 “Turbo & classic”
  {
    id: 'gpt-4-turbo-128k',
    family: 'GPT-4 “Turbo & classic”',
    name: 'GPT-4 Turbo',
    context: '128k',
    inputCost: 10.00,
    outputCost: 30.00,
    description: 'Long docs, cheaper than 4 classic',
  },
  {
    id: 'gpt-4',
    family: 'GPT-4 “Turbo & classic”',
    name: 'GPT-4',
    context: '8k',
    inputCost: 30.00,
    outputCost: 60.00,
    description: 'Legacy 4 accuracy',
  },
  {
    id: 'gpt-4-32k',
    family: 'GPT-4 “Turbo & classic”',
    name: 'GPT-4 32k',
    context: '32k',
    inputCost: 60.00,
    outputCost: 120.00,
    description: 'Huge prompts, legacy',
  },
  // GPT-3.5
  {
    id: 'gpt-3.5-turbo',
    family: 'GPT-3.5',
    name: 'GPT-3.5 Turbo',
    context: '4k',
    inputCost: 1.50,
    outputCost: 2.00,
    description: 'Volume chat, fine-tuning base',
  },
  {
    id: 'gpt-3.5-turbo-16k',
    family: 'GPT-3.5',
    name: 'GPT-3.5 Turbo 16k',
    context: '16k',
    inputCost: 3.00,
    outputCost: 4.00,
    description: 'Longer context cheap',
  },
  // High-reasoning “o-series”
  {
    id: 'o3',
    family: 'High-reasoning “o-series”',
    name: 'o3',
    context: '200k',
    inputCost: 2.00,
    outputCost: 8.00,
    description: 'Top reasoning/math/coding',
  },
  {
    id: 'o4-mini',
    family: 'High-reasoning “o-series”',
    name: 'o4-mini',
    context: '200k',
    inputCost: 1.10,
    outputCost: 4.40,
    description: 'Fast reasoning on a budget',
  },
  // Preview / research
  {
    id: 'o1-preview',
    family: 'Preview / research',
    name: 'o1-preview',
    context: '??',
    inputCost: 15.00,
    outputCost: 60.00,
    description: 'Next-gen reasoning (limited access)',
    isPreview: true,
  },
  {
    id: 'o1-mini',
    family: 'Preview / research',
    name: 'o1-mini',
    context: '??',
    inputCost: 3.00,
    outputCost: 12.00,
    description: 'Lighter o1 variant',
    isPreview: true,
  },
  {
    id: 'gpt-4.5-preview',
    family: 'Preview / research',
    name: 'GPT-4.5 Preview',
    context: '??',
    inputCost: 75.00,
    outputCost: 75.00,
    description: 'Experimental “creative” 4.5',
    isPreview: true,
  },
];
