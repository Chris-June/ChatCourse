/**
 * @file models.ts
 * @description Defines the available OpenAI models with their pricing and context window information. Always verify the model name and pricing from the OpenAI API.
 * https://platform.openai.com/docs/pricing
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
  'GPT-5',
];

export const models: Model[] = [
  // GPT-5 family only (Aug 8, 2025)
  {
    id: 'gpt-5',
    family: 'GPT-5',
    name: 'GPT-5',
    context: '200k',
    inputCost: 1.25,
    outputCost: 10.00,
    description: 'Flagship GPT-5 model',
  },
  {
    id: 'gpt-5-mini',
    family: 'GPT-5',
    name: 'GPT-5 Mini',
    context: '200k',
    inputCost: 0.25,
    outputCost: 2.00,
    description: 'Balanced cost/quality',
  },
  {
    id: 'gpt-5-nano',
    family: 'GPT-5',
    name: 'GPT-5 Nano',
    context: '200k',
    inputCost: 0.05,
    outputCost: 0.40,
    description: 'Ultra-cheap, high throughput',
  },
];
