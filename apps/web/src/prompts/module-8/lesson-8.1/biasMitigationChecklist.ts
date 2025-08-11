import { ChallengeChecklistItem } from '@/components/InlineChat';

export const biasMitigationChecklist: ChallengeChecklistItem[] = [
  {
    id: 'identify-bias-type',
    text: 'Correctly identify the primary type of bias (Historical Bias).',
    completed: false,
  },
  {
    id: 'propose-data-solution',
    text: 'Propose a data-level solution (e.g., auditing, augmentation, re-weighting).',
    completed: false,
  },
  {
    id: 'propose-model-solution',
    text: 'Propose a model-level solution (e.g., adversarial debiasing, fairness constraints).',
    completed: false,
  },
  {
    id: 'define-fairness-metric',
    text: 'Define a specific fairness metric to measure success (e.g., demographic parity).',
    completed: false,
  },
  {
    id: 'mention-inclusive-process',
    text: 'Mention the importance of an inclusive, human-in-the-loop process.',
    completed: false,
  },
];
