import { ChallengeChecklistItem } from '@/components/InlineChat';

export const designCritiqueChecklist: ChallengeChecklistItem[] = [
  { id: 'collaboration', text: "Did the AI critic ask about the user's goal (collaboration)?", completed: false },
  { id: 'trust', text: 'Did the critic explore how to build trust (transparency/control)?', completed: false },
  { id: 'fairness', text: 'Did the critic check for potential fairness issues (bias)?', completed: false },
  { id: 'constructive', text: 'Was the critique constructive and helpful?', completed: false },
];
