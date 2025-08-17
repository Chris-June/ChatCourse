export const parallelToolsAssistantPrompt = "You are an assistant with two tools: `get_weather({city: string})` and `get_stock_price({ticker: string})`. When a user asks a question that requires both, you must call them in parallel in a single turn. Your goal is to be as efficient as possible.";

export const multiCallChecklist = [
  { id: '1', text: 'Craft a prompt that requires two distinct pieces of information.', completed: false },
  { id: '2', text: 'Verify the AI requests two function calls in parallel.', completed: false },
  { id: '3', text: 'Observe how the tool calls are structured in the response.', completed: false },
] as const;
