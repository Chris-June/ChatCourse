import React from 'react';
import { Wrench, FileCode, Lightbulb, CheckSquare } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';
import Accordion from '../../../components/Accordion';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';

const weatherChecklist = [
  { text: 'My goal is to find the weather in a specific city.', completed: false },
  { text: 'I have a tool called `get_weather` that takes a `city`.', completed: false },
  { text: 'I will call that tool with the city name provided.', completed: false },
  { text: 'The tool will return the temperature, which I can give to the user.', completed: false },
];

const Lesson4_3: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'In the lesson\'s analogy, what does the \'recipe card\' represent when building an AI tool?',
      options: [
        'The tool\'s schema (its name, description, and parameters).',
        'The AI model itself.',
        'The final output of the tool.',
        'The server where the tool is hosted.'
      ],
      correctAnswer: 'The tool\'s schema (its name, description, and parameters).',
      explanation: 'The schema is the detailed instruction set, or \'recipe\', that tells the AI exactly what the tool does, what it needs, and when to use it. Think of it as the detailed recipe card for your AI chef.'
    },
    {
      questionText: 'What is the most important reason to write very clear and detailed descriptions in your tool schema?',
      options: [
        'To make the code run faster.',
        'The AI relies entirely on these descriptions to understand the tool\'s purpose and how to use it correctly.',
        'To make the schema file larger.',
        'To hide the tool from other users.'
      ],
      correctAnswer: 'The AI relies entirely on these descriptions to understand the tool\'s purpose and how to use it correctly.',
      explanation: 'The AI doesn\'t understand code; it understands language. Your descriptions are the only guide it has to make smart decisions about your tool.'
    },
    {
      questionText: 'What is a key principle of good tool design?',
      options: [
        'The tool should perform as many different tasks as possible.',
        'The tool should have a very short name.',
        'The tool should do one thing well (be specific and atomic).',
        'The tool should not have any parameters.'
      ],
      correctAnswer: 'The tool should do one thing well (be specific and atomic).',
      explanation: 'Single-purpose tools are less ambiguous and more reliable, making it easier for the AI to choose the right tool for the job.'
    },
    {
      questionText: 'In the `order_pizza` tool example, what are the \'ingredients\' (inputs) the AI needs?',
      options: [
        'The oven temperature.',
        'A `confirmation_number`.',
        'The `size` and a list of `toppings`.',
        'The delivery driver\'s name.'
      ],
      correctAnswer: 'The `size` and a list of `toppings`.',
      explanation: 'These are the parameters defined in the schema that the AI must gather to successfully call the tool, just like a chef needs ingredients for a recipe.'
    },
    {
      questionText: 'Why don\'t you need to provide the actual code for your function in the schema?',
      options: [
        'The AI will write the code for you.',
        'The AI only needs to know *what* the tool does and *what arguments* to provide, not *how* it works.',
        'The code is sent in a separate file.',
        'You do need to provide the code.'
      ],
      correctAnswer: 'The AI only needs to know *what* the tool does and *what arguments* to provide, not *how* it works.',
      explanation: 'The schema is for the AI\'s decision-making process. The actual execution of the code happens in your application after the AI tells you which tool to run.'
    }
  ];

  return (
    <LessonTemplate
      moduleNumber={4}
      lessonNumber={3}
      title="Building Your First AI Tool"
      subtitle="From Idea to Actionable Function"
      quizQuestions={quizQuestions}
    >
      <div className="space-y-8 text-gray-300">
        <p className="text-lg">
          Building a tool for an AI is like creating a new appliance for a smart kitchen. The AI (the chef) needs to know what the appliance does, what ingredients it needs, and what it produces. Let's walk through the process of designing a tool from scratch.
        </p>

        <Accordion title="Step 1: Define the Job (The Concept)" icon={<Wrench />} isInitiallyOpen>
          <p className="text-gray-300 mb-4">
            Before you write any code, clearly define what your tool will do. Be specific. A tool to "handle food" is too vague. A tool to "order a pizza" is much better. It should have a single, well-defined purpose.
          </p>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="font-semibold text-white mb-2">Our Goal: The Pizza-Ordering Tool</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li><strong>Purpose:</strong> Order a pizza for delivery.</li>
              <li><strong>Ingredients (Inputs):</strong> It needs to know the `size` and `toppings`.</li>
              <li><strong>Result (Output):</strong> It should return a `confirmation_number`.</li>
            </ul>
          </div>
        </Accordion>

        <Accordion title="Step 2: Write the Recipe Card (Provide a Schema)" icon={<FileCode />}>
          <p className="text-gray-300 mb-4">
            Think of the schema as a detailed recipe card for your AI chef. Just like a recipe needs precise instructions ("add 2 cups of flour"), your tool schema needs crystal-clear descriptions for each parameter. The AI chef can't guess what "some flour" means - it needs exact measurements and specific instructions.
          </p>
          <div className="bg-gray-900 p-3 rounded-md">
            <code className="block whitespace-pre-wrap break-words font-mono text-sm text-gray-200">
{`{
  "name": "order_pizza",
  "description": "Orders a pizza for delivery.",
  "parameters": {
    "size": {
      "type": "string",
      "description": "The size of the pizza, e.g., 'small', 'medium', or 'large'."
    },
    "toppings": {
      "type": "array",
      "description": "A list of toppings for the pizza."
    }
  }
}`}
            </code>
          </div>
        </Accordion>

        <Accordion title="Your Turn: Use a Custom Weather Tool" icon={<Lightbulb />}>
          <p className="text-gray-300 mb-4">
            Let's test your new tool-building skills. Imagine you've created a weather-checking robot that needs one piece of information: which city to investigate. This robot (our `get_weather` tool) has been trained to understand your exact instructions and deliver precise weather reports.
          </p>
          <p className="text-gray-300 mb-4">
            Use the chat window below to ask for the weather in any city. Watch how the AI uses the tool you designed. Follow the checklist to track the AI's reasoning.
          </p>
          <InlineChat 
            moduleId="module-4.3-get-weather"
            placeholder='Try: "What is the weather like in London?"'
            systemPrompt="You are a helpful weather assistant that demonstrates tool usage. When asked about the weather, you should use the 'get_weather' tool to provide accurate information. Guide users through the process of making tool calls and explain the JSON structure being used."
            initialMessages={[
              {
                role: 'assistant',
                content: 'I can help you check the weather in any city. Try asking me something like: "What\'s the weather like in New York?" or "Is it going to rain in Tokyo tomorrow?"'
              }
            ]}
            simulatedResponse={`Okay, you want the weather. I will use the 'get_weather' tool.\n\n<tool_code>\n{\n  "name": "get_weather",\n  "arguments": {\n    "city": "the city you asked for"\n  }\n}\n</tool_code>\n\nIt is 75°F and sunny.`}
            challengeChecklist={weatherChecklist}
            maxAttempts={3}
            maxFollowUps={2}
          />
        </Accordion>
        
        <Accordion title="Key Takeaways for Tool Building" icon={<CheckSquare />}>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li><strong>Master Chef's Rule:</strong> Like a specialized kitchen tool (a garlic press vs a multi-tool), your AI tool should excel at one specific task rather than trying to do everything</li>
                <li><strong>Recipe Card Clarity:</strong> Your descriptions are the AI's only cookbook - make them so detailed that even someone who's never cooked could follow them perfectly</li>
                <li><strong>Ingredients & Results:</strong> Every tool needs precise ingredients (parameters) and clear expected results (outputs) - just like a recipe needs both ingredients and the final dish description</li>
            </ul>
        </Accordion>
      </div>
    </LessonTemplate>
  );
};

export default Lesson4_3;