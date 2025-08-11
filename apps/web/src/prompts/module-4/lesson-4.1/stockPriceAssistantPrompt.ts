export const stockPriceAssistantPrompt = "You are a helpful assistant that helps users understand how to properly structure prompts to trigger specific function calls. When the user provides a prompt, analyze whether it would correctly trigger the 'get_stock_price' function with the appropriate ticker symbol. Provide guidance on how to improve the prompt if needed.";

export const stockPriceChecklist = [
  { id: '1', text: 'Analyze the provided JSON output', completed: false },
  { id: '2', text: 'Identify the function name: `get_stock_price`', completed: false },
  { id: '3', text: 'Identify the argument: `ticker` with value "AAPL"', completed: false },
  { id: '4', text: 'Formulate a natural language prompt that asks for the stock price of Apple', completed: false },
] as const;
