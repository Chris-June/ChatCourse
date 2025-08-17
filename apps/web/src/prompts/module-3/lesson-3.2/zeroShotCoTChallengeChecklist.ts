export const zeroShotCoTChallengeChecklist = [
  { id: 'cot-1', text: 'Pose a multi-step reasoning problem to the AI', completed: false },
  { id: 'cot-2', text: "Append the phrase \"Let's think step by step\" to your prompt", completed: false },
  { id: 'cot-3', text: 'Confirm the AI outputs a step-by-step breakdown', completed: false },
  { id: 'cot-4', text: 'Verify the final answer is logical and correct', completed: false },
] as const;
