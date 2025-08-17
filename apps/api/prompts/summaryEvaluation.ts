export function buildSummaryEvaluationSystemPrompt(): string {
  return "You are an expert prompt evaluator. Provide constructive, specific feedback on how well the user's summary prompt captures the conversation context. Be encouraging and educational.";
}

export function buildSummaryEvaluationUserPrompt(params: {
  conversation: Array<{ speaker: string; text: string }>;
  userSummary: string;
}): string {
  const { conversation, userSummary } = params;
  const convo = conversation
    .map((msg) => `${msg.speaker}: ${msg.text}`)
    .join('\n');
  return `Evaluate this summary prompt based on the provided conversation:\n\nConversation:\n${convo}\n\nUser Summary Prompt:\n${userSummary}\n\nPlease provide a constructive evaluation that:\n1. Assesses how well the summary captures the key points\n2. Identifies any missing important context\n3. Suggests specific improvements\n4. Gives an overall quality rating\n\nKeep the evaluation concise and actionable.`;
}
