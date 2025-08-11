import { ChallengeChecklistItem } from '@/components/InlineChat';

export const securityGuardrailsChecklist: ChallengeChecklistItem[] = [
  { id: 'polp', text: 'Propose a guardrail based on the Principle of Least Privilege.', completed: false },
  { id: 'output-filtering', text: 'Suggest Output Filtering/Redaction to prevent PII leakage.', completed: false },
  { id: 'input-sanitization', text: 'Describe a method for Input Sanitization to block malicious prompts.', completed: false },
];
