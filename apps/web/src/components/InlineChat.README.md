# InlineChat Component Documentation

## Overview
The `InlineChat` component provides an interactive chat interface for AI-assisted learning experiences. It's designed to be embedded within course content to demonstrate and practice AI interactions, particularly around function calling and tool usage.

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `moduleId` | `string` | Yes | Unique identifier for the chat session (used for persistence) |
| `systemPrompt` | `string` | Yes | The system message that sets the AI's behavior and instructions |
| `initialMessages` | `Array<{role: 'user'|'assistant', content: string}>` | No | Initial messages to start the conversation |
| `challengeChecklist` | `Array<{text: string, completed: boolean}>` | No | Learning objectives to track during the interaction |
| `simulatedResponse` | `string` | No | Predefined response for demo purposes |
| `placeholder` | `string` | No | Placeholder text for the input field |
| `maxAttempts` | `number` | No | Maximum number of attempts allowed (default: 3) |
| `maxFollowUps` | `number` | No | Maximum number of follow-up messages allowed (default: 2) |

## System Prompt Guidelines

### Best Practices
1. **Be Specific**: Clearly define the AI's role and capabilities
2. **Set Boundaries**: Specify what the AI can and cannot do
3. **Provide Examples**: Include sample inputs and expected outputs
4. **Be Concise**: Keep instructions clear and to the point

### Example
```types
const systemPrompt = `You are a helpful assistant that demonstrates tool usage. 
- When asked about the weather, use the 'get_weather' tool
- Explain the JSON structure of your responses
- Guide users through the process`;
```

## Challenge Checklists

### Structure
Each checklist item should be:
- Action-oriented
- Specific and measurable
- Ordered logically
- Tied to learning objectives

### Example
```types
const challengeChecklist = [
  { text: 'Identify the function name', completed: false },
  { text: 'List required parameters', completed: false },
  { text: 'Formulate a valid function call', completed: false }
];
```

## Implementation Example

```tsx
<InlineChat
  moduleId="module-4.1-stock-price"
  systemPrompt="You are a helpful assistant that demonstrates stock price lookups..."
  initialMessages={[
    {
      role: 'assistant',
      content: 'I can help you look up stock prices. Try asking about a company like Apple or Google.'
    }
  ]}
  challengeChecklist={stockPriceChecklist}
  maxAttempts={3}
  maxFollowUps={2}
  placeholder="Ask about a stock price..."
/>
```

## Error Handling
- Invalid inputs are caught and user-friendly messages are displayed
- The component handles API errors gracefully
- Users are guided on how to correct their inputs

## Styling
- Uses Tailwind CSS for styling
- Responsive design works on all screen sizes
- Follows the application's design system

## Accessibility
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly

## Testing
1. Verify all props are working as expected
2. Test error handling scenarios
3. Validate accessibility
4. Check mobile responsiveness
