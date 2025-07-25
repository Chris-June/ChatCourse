import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Wrench, FileCode, Lightbulb, ChefHat, CheckSquare } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';
import Accordion from '../../../components/Accordion';

const weatherChecklist = [
  { text: 'My goal is to find the weather in a specific city.', completed: false },
  { text: 'I have a tool called `get_weather` that takes a `city`.', completed: false },
  { text: 'I will call that tool with the city name provided.', completed: false },
  { text: 'The tool will return the temperature, which I can give to the user.', completed: false },
];

const Lesson4_3: React.FC = () => {
  const { completeLesson } = useProgressStore();
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">4.3 Building Your First AI Tool</h1>
        <div className="flex items-center space-x-4">
          <Link
            to="/instructions/module-4/4.2"
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Real-world Apps
          </Link>
          <Link
            to="/instructions/module-5/5.1"
            onClick={() => completeLesson(4, 3)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next: Understanding GPTs <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <Accordion title="The Big Idea: Writing a Recipe for the AI" icon={<ChefHat />} isInitiallyOpen>
        <p className="text-gray-300 mb-4">
          Giving an AI a new tool is like teaching it a new recipe. You are the chef, the tool is the dish, and the schema is the recipe card.
        </p>
        <p className="text-gray-300">
          The AI doesn't know how to cook, but it's an expert at following instructions. Your job is to write a recipe card that is so clear, the AI can't get it wrong.
        </p>
      </Accordion>

      <Accordion title="Step 1: Decide What to Cook (Define the Purpose)" icon={<Wrench />}>
        <p className="text-gray-300 mb-4">
          First, decide on a single, clear task for your tool. A good tool does one thing well.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Example: An `order_pizza` Tool</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Purpose:</strong> To order a pizza from a delivery service.</li>
            <li><strong>Ingredients (Inputs):</strong> It needs a `size` (e.g., "large") and a list of `toppings` (e.g., ["pepperoni", "mushrooms"]).</li>
            <li><strong>Result (Output):</strong> It should return a `confirmation_number`.</li>
          </ul>
        </div>
      </Accordion>

      <Accordion title="Step 2: Write the Recipe Card (Provide a Schema)" icon={<FileCode />}>
        <p className="text-gray-300 mb-4">
          This is the most important step. The schema is the recipe card that tells the AI exactly what ingredients (`parameters`) it needs and what to expect. The more detailed your descriptions, the better the AI can follow them.
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
          Let's apply this. Imagine we've built a simple `get_weather` tool. Its "recipe card" tells the AI it needs one ingredient: a `city`.
        </p>
        <p className="text-gray-300 mb-4">
          Use the chat window below to ask for the weather in any city. Watch how the AI uses the tool you designed. Follow the checklist to track the AI's reasoning.
        </p>
        <InlineChat 
          moduleId="module-4.3-get-weather"
          placeholder='Try: "What is the weather like in London?"' 
          simulatedResponse={`Okay, you want the weather. I will use the 'get_weather' tool.\n\n<tool_code>\n{\n  "name": "get_weather",\n  "arguments": {\n    "city": "the city you asked for"\n  }\n}\n</tool_code>\n\nIt is 75°F and sunny.`}
          challengeChecklist={weatherChecklist}
        />
      </Accordion>
      
      <Accordion title="Key Takeaways for Tool Building" icon={<CheckSquare />}>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li><strong>Be Specific:</strong> Your tool should do one thing well. This makes it easy for the AI to understand.</li>
              <li><strong>Describe Everything:</strong> The AI relies entirely on your text descriptions to work. The clearer your "recipe card," the better the result.</li>
              <li><strong>Think Inputs & Outputs:</strong> Every tool needs ingredients (parameters) and produces a result (output). Define them clearly.</li>
          </ul>
      </Accordion>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-4/4.2" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Real-world Apps
        </Link>
        <Link 
          to="/instructions/module-5/5.1" 
          onClick={() => completeLesson(4, 3)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Understanding GPTs <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson4_3;