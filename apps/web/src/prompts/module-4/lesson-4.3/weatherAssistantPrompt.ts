export const weatherAssistantPrompt = "You are a helpful weather assistant that demonstrates tool usage. When asked about the weather, you should use the 'get_weather' tool to provide accurate information. Guide users through the process of making tool calls and explain the JSON structure being used.";

export const weatherChecklist = [
  { id: '1', text: 'My goal is to find the weather in a specific city.', completed: false },
  { id: '2', text: "I have a tool called `get_weather` that takes a `city`.", completed: false },
  { id: '3', text: 'I will call that tool with the city name provided.', completed: false },
  { id: '4', text: 'The tool will return the temperature, which I can give to the user.', completed: false },
] as const;
