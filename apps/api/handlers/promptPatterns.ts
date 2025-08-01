import { Request, Response } from 'express';

const promptPatterns = [
  {
    name: 'The Persona Pattern',
    description: 'Assign a specific role or persona to the AI to guide its tone and knowledge base.',
    example: 'Act as a seasoned travel blogger. Write a captivating introduction to a post about visiting Kyoto, Japan.'
  },
  {
    name: 'The Flipped Interaction Pattern',
    description: 'Instead of you asking the AI questions, have the AI ask you questions to gather the information it needs.',
    example: 'I need to write a marketing email for a new productivity app. Ask me questions about the target audience, key features, and desired tone until you have enough information to draft it.'
  },
  {
    name: 'The Chain of Thought Pattern',
    description: 'Ask the AI to explain its reasoning step-by-step before giving the final answer. This improves accuracy for complex problems.',
    example: 'Question: A juggler has 16 balls. He drops 4, gives half of the rest to a friend, and then buys 2 more. How many balls does he have? Explain your reasoning step-by-step.'
  },
  {
    name: 'The Refinement Pattern',
    description: 'Provide a piece of text and ask the AI to improve it based on specific criteria like clarity, tone, or conciseness.',
    example: 'Refine the following paragraph to be more persuasive and professional: \"Our new software is really good. You should probably buy it because it will help your team. It has lots of features and is easy to use.\"'
  }
];

/**
 * Handles retrieving the library of prompt patterns.
 */
export const handleGetPatterns = (_req: Request, res: Response) => {
  res.json(promptPatterns);
};
