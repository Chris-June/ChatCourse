import React from 'react';
import { Zap, GitMerge, Lightbulb } from 'lucide-react';
import Accordion from '../../../components/Accordion';
import InlineChat from '../../../../../components/InlineChat';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import KeyTakeaways from '../../../components/KeyTakeaways';
import BestPractices from '../../../components/BestPractices';

const multiCallChecklist = [
  { id: '1', text: 'Craft a prompt that requires two distinct pieces of information.', completed: false },
  { id: '2', text: 'Verify the AI requests two function calls in parallel.', completed: false },
  { id: '3', text: 'Observe how the tool calls are structured in the response.', completed: false },
];

const Lesson4_2: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What is the main advantage of parallel function calling?',
      options: [
        'It makes the AI\'s responses slower.',
        'It allows the AI to request multiple actions at once, reducing latency.',
        'It only works for weather-related functions.',
        'It requires more complex prompts from the user.',
      ],
      correctAnswer: 'It allows the AI to request multiple actions at once, reducing latency.',
      explanation: 'Parallel function calling is more efficient because it bundles multiple tool calls into a single turn, reducing the number of back-and-forth rounds between your application and the model.',
    },
    {
      questionText: 'When would sequential function calling be necessary?',
      options: [
        'When the output of one function is required as the input for another function.',
        'When you want the fastest possible response.',
        'When you only need to call one function.',
        'Sequential calling is never necessary.',
      ],
      correctAnswer: 'When the output of one function is required as the input for another function.',
      explanation: 'If one tool depends on the results of another (e.g., finding a user\'s ID to then fetch their order history), the calls must be made sequentially.',
    },
    {
      questionText: 'When an AI model requests parallel function calls, what does your application typically receive?',
      options: [
        'A single JSON object for the first function.',
        'A string of concatenated function names.',
        'An array of JSON objects, where each object represents a function to be called.',
        'An error message.',
      ],
      correctAnswer: 'An array of JSON objects, where each object represents a function to be called.',
      explanation: 'The API response for parallel calls is structured as an array, with each element being a separate tool call object. Your code must be prepared to iterate through this array.',
    },
    {
      questionText: 'What is a potential downside of a workflow with many sequential function calls?',
      options: [
        'It\'s always more secure.',
        'It significantly increases latency and cost due to multiple round trips.',
        'It uses less memory.',
        'It\'s the only way to handle independent tasks.',
      ],
      correctAnswer: 'It significantly increases latency and cost due to multiple round trips.',
      explanation: 'Each step in a sequential chain requires a separate API call, which adds time and cost. It\'s best to use parallel calls for independent tasks to improve efficiency.',
    },
    {
      questionText: 'If an AI decides to call two functions in parallel, who is responsible for executing the actual code for those functions?',
      options: [
        'The AI model executes the code on its own servers.',
        'The user\'s web browser executes the code automatically.',
        'Your application\'s backend or client-side code is responsible for executing them.',
        'The functions are executed by the operating system directly.',
      ],
      correctAnswer: 'Your application\'s backend or client-side code is responsible for executing them.',
      explanation: 'The AI only *requests* the function calls by providing structured JSON. It is always up to your application to interpret that JSON and run the corresponding code securely.',
    },
  ];

  return (
    <LessonTemplate
      moduleNumber={4}
      lessonNumber={2}
      title="Multiple & Parallel Function Calls"
      subtitle="Orchestrating complex workflows by calling multiple tools in sequence or at the same time."
      quizQuestions={quizQuestions}
    >
      <div className="space-y-8 p-4 md:p-6">
        <p className="text-lg text-gray-300">
          Simple tasks might need one tool, but complex queries often require a coordinated effort. Imagine asking an assistant to book a flight and reserve a rental car. This requires two different tools. Modern AI can handle this by calling multiple functions in a single turn, making workflows much more powerful and efficient.
        </p>

        <Accordion title="Why This Matters: Building Smarter Agents" icon={<Lightbulb />}>
          <p className="text-gray-300 mb-2">
            Handling multiple functions is the difference between a simple command-line tool and a true digital assistant. It's a fundamental step towards creating autonomous agents.
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li><strong>Better User Experience:</strong> Parallel calls drastically reduce waiting time. A user asking for weather and traffic gets both at once, which feels fast and responsive.</li>
            <li><strong>Complex Problem Solving:</strong> Many real-world problems require multiple, independent steps. A trip-planning agent needs to book flights, hotels, and rental cars—all of which can be requested in parallel to build a complete itinerary faster.</li>
            <li><strong>Increased Autonomy:</strong> By enabling an AI to decide which tools it needs and call them, you move from a simple Q&A bot to an agent that can take multi-step actions to accomplish a goal.
            </li>
          </ul>
        </Accordion>

        <Accordion title="How It Works: Sequential vs. Parallel" icon={<GitMerge />} isInitiallyOpen>
          <p className="text-gray-300 mb-4">
            Think of it like cooking. If you need to chop vegetables before you can sauté them, that's a **sequential** process. If you can preheat the oven while you chop vegetables, that's a **parallel** process. The AI decides which approach to use based on the user's request and the tools available.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <h4 className="font-semibold text-white mb-2">Sequential Calling (Step-by-Step)</h4>
              <p className="text-sm text-gray-400 mb-2">Needed when the output of one tool is the input for another. It's a multi-step conversation with the AI.</p>
              <code className="block whitespace-pre-wrap break-words font-mono text-xs text-gray-200">{'// Step 1: Get User ID\nAI → call: `getUser(name: \'Chris\')`\n// Step 2: App returns User ID\nApp → return: `{ tool_call_id: ..., result: { id: 123 } }`\n// Step 3: AI uses ID to get orders\nAI → call: `getOrders(userId: 123)`'}</code>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <h4 className="font-semibold text-white mb-2">Parallel Calling (All at Once)</h4>
              <p className="text-sm text-gray-400 mb-2">Used for independent tasks. The AI requests all tools in a single turn, and your app receives an array of calls.</p>
              <code className="block whitespace-pre-wrap break-words font-mono text-xs text-gray-200">{'// User: "Book a flight to JFK and a hotel in Brooklyn"\nAI → calls: [\n  `book_flight(destination: \'JFK\')`,\n  `book_hotel(area: \'Brooklyn\')`\n]'}</code>
            </div>
          </div>
        </Accordion>

        <Accordion title="Handling Failures & Edge Cases" icon={<Zap />}>
          <p className="text-gray-300 mb-4">What happens if one of your parallel calls fails? For example, the flight booking succeeds but the hotel API times out. Your application should handle this gracefully.</p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li><strong>Report Partial Success:</strong> Your application should execute all tool calls it can and report both the successful results and the errors back to the model in the next turn.</li>
            <li><strong>Let the Model Decide:</strong> By providing the full context (what worked, what failed, and why), the AI can then decide on the best next step: retry the failed call, ask the user for clarification, or suggest an alternative.</li>
            <li><strong>Example Response to AI:</strong> Your app would send back an array of results, like <code className="font-mono text-sm bg-gray-700 p-1 rounded">{'[{tool_call_id: \'flight1\', result: {...}}, {tool_call_id: \'hotel1\', error: \'API timeout\'}]'}</code>.</li>
          </ul>
        </Accordion>

        <Accordion title="Challenge: Trigger a Parallel Call" icon={<Zap />}>
          <p className="text-gray-300 mb-4">Your goal is to write a single prompt that makes the AI use both the `get_weather` and `get_stock_price` tools in the same turn. The AI has access to both tools. Try it in the chat window below!</p>
           <InlineChat 
              moduleId="module-4.2-parallel-call"
              placeholder='Try asking for weather and a stock price...'
              systemPrompt="You are an assistant with two tools: `get_weather({city: string})` and `get_stock_price({ticker: string})`. When a user asks a question that requires both, you must call them in parallel in a single turn. Your goal is to be as efficient as possible."
              initialMessages={[
                {
                  role: 'assistant',
                  content: 'I can get weather and stock prices simultaneously. What would you like to know?'
                }
              ]}
              simulatedResponse={`Okay, I need to get two pieces of information. I will call both tools in parallel to be efficient.\n\n<tool_code>\n[\n  {\n    "name": "get_weather",\n    "arguments": { "city": "the city you asked for" }\n  },\n  {\n    "name": "get_stock_price",\n    "arguments": { "ticker": "the ticker you asked for" }\n  }\n]\n</tool_code>\n`}
              challengeChecklist={multiCallChecklist}
              maxAttempts={3}
              maxFollowUps={2}
            />
        </Accordion>

        <KeyTakeaways
          points={[
            'Parallel function calling allows an AI to request multiple tools in a single turn, reducing latency.',
            'Sequential calling is necessary when one tool\'s output is another tool\'s input.',
            'Your application code must be able to handle receiving an array of tool calls from the model.',
            'This capability allows for much more complex and efficient workflows.',
          ]}
        />

        <BestPractices
          dos={[
            'Design your application to handle both single and multiple (array) tool calls from the API.',
            'Provide clear function descriptions so the model can easily distinguish between tools.',
            'For sequential calls, ensure you send the result of the first call back to the model so it can proceed.',
          ]}
          donts={[
            'Don\'t assume the model will always call functions in the order they appear in your prompt.',
            'Avoid creating tools with overlapping functionality, as this can confuse the model.',
            'Don\'t build a workflow that requires too many sequential steps, as this increases latency and cost.',
          ]}
        />

      </div>
    </LessonTemplate>
  );
};

export default Lesson4_2;
