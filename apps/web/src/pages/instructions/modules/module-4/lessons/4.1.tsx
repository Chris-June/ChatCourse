import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Zap, Terminal, Lightbulb } from 'lucide-react';


const Lesson4_1: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">4.1: Function Calling</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-3/3.3" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-4/4.2" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Function calling bridges the gap between conversational AI and the real world. It allows the AI to use external tools, databases, and APIs to answer questions and perform actions, moving beyond its training data.
      </p>

      {/* What is Function Calling? */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Zap className="w-7 h-7 mr-3 text-yellow-400" />
          What is Function Calling?
        </h2>
        <p className="text-gray-300 mb-4">
          Function calling is a mechanism that allows a large language model (LLM) to request the execution of a specific function you've defined in your code. The AI doesn't run the function itself; instead, it generates a structured JSON object telling your application which function to run and with what arguments.
        </p>
        
        <div className="my-4">
          {/* Placeholder for a visual diagram */}
          <div className="bg-gray-900 p-4 rounded-lg border-2 border-dashed border-gray-600 text-center">
            <p className="text-gray-400">[Visual Diagram: Prompt → Function Call JSON → Server Call → Response → Final Message]</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-white mt-6 mb-4">Defining a Function Schema</h3>
        <p className="text-gray-300 mb-4">To use function calling, you must first describe your functions to the model. This is done by providing a JSON schema that details the function's name, description, and parameters.</p>
        
        <h4 className="font-semibold text-white mb-2">TypeScript Interface</h4>
        <p className="text-gray-300 mb-2">First, you might define the data structure in your application code:</p>
        <pre className="p-3 bg-gray-900 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap"><code>{`interface CreateReminder {
  task: string;
  due_date: string;
}`}</code></pre>

        <h4 className="font-semibold text-white mt-4 mb-2">OpenAI-style Function Schema</h4>
        <p className="text-gray-300 mb-2">Then, you describe it to the model using a specific JSON format:</p>
        <pre className="p-3 bg-gray-900 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap"><code>{`{
  "name": "create_reminder",
  "description": "Creates a reminder for a task with a due date",
  "parameters": {
    "type": "object",
    "properties": {
      "task": { "type": "string" },
      "due_date": { "type": "string" }
    },
    "required": ["task", "due_date"]
  }
}`}</code></pre>
      </section>

      {/* Why is it a Game-Changer? */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Terminal className="w-7 h-7 mr-3 text-green-400" />
          Why is it a Game-Changer?
        </h2>
        
        <h3 className="text-xl font-semibold text-white mt-6 mb-4">Real-World Examples by Industry</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li><strong>🏥 Healthcare:</strong> Look up prescriptions, schedule follow-up appointments.</li>
          <li><strong>🛠️ Field Service:</strong> Fetch service history for a device, update a job's status.</li>
          <li><strong>📊 Finance:</strong> Pull real-time portfolio performance, trigger trade alerts.</li>
          <li><strong>🧠 Education:</strong> Generate lesson summaries, schedule study reminders for students.</li>
        </ul>

        <h3 className="text-xl font-semibold text-white mt-6 mb-4">Security Considerations</h3>
        <p className="text-gray-300 mb-2">Never blindly execute functions based on model output. Always:</p>
        <ul className="list-disc pl-5 space-y-2 text-red-400">
          <li><strong>Validate Arguments:</strong> Ensure the arguments provided by the model are of the correct type and within expected ranges.</li>
          <li><strong>Confirm Actions:</strong> For sensitive operations (e.g., sending an email, deleting data), ask the user for confirmation before executing the function.</li>
        </ul>
      </section>

      {/* NEW SECTION: Implementation Patterns */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Implementation Patterns</h2>
        <h3 className="text-xl font-semibold text-white mb-2">Function Router Pattern</h3>
        <p className="text-gray-300 mb-4">To handle multiple functions, create a dispatcher that maps the function name from the model to your actual backend logic.</p>
        <pre className="p-3 bg-gray-900 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap"><code>{`// Example of a simple function router
const availableFunctions = {
  create_reminder: createReminder, // your actual function
  get_weather: getWeather,       // your actual function
};

const functionName = modelResponse.function_call.name;
const functionToCall = availableFunctions[functionName];

if (functionToCall) {
  const functionArgs = JSON.parse(modelResponse.function_call.arguments);
  const functionResult = await functionToCall(functionArgs);
  // ... send result back to model
}`}</code></pre>

        <h3 className="text-xl font-semibold text-white mt-6 mb-4">Best Practices</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li><strong>Always Validate Input:</strong> Sanitize and validate all arguments from the model before execution.</li>
          <li><strong>Keep Functions Atomic:</strong> Each function should have a single, well-defined purpose.</li>
          <li><strong>Use Semantic Naming:</strong> Use short, descriptive names for functions and arguments to help the model understand their purpose.</li>
        </ul>
      </section>

      {/* Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Conceptual Exercise: Guess the Call
        </h2>
        
        <div className="mb-6">
          <h3 className="font-semibold text-white mb-2">Easy</h3>
          <p className="text-gray-300 mb-2">Prompt: "Schedule a team check-in for next Monday at 10am"</p>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-white mb-2">Expected JSON Output:</h4>
            <pre className="p-3 bg-gray-700 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap"><code>{`{
  "name": "schedule_meeting",
  "arguments": {
    "topic": "Team check-in",
    "datetime": "next Monday 10am"
  }
}`}</code></pre>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-2">Reverse Challenge</h3>
          <p className="text-gray-300 mb-2">What prompt do you think caused this JSON output?</p>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <pre className="p-3 bg-gray-700 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap"><code>{`{
  "name": "get_stock_price",
  "arguments": { "ticker": "AAPL" }
}`}</code></pre>
          </div>
        </div>
      </section>

      <div className="bg-blue-900/20 text-center p-6 rounded-lg shadow-lg border border-blue-700">
          <p className="text-2xl font-bold text-blue-300 italic">“Function calling is where AI stops just talking and starts doing.”</p>
      </div>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">Coming Soon</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>A 2-minute walkthrough video explaining function calling in practice.</li>
              <li>A mini-project to build your own “Weather Bot” or “Task Scheduler”.</li>
          </ul>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-3/3.3" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Structuring Outputs
        </Link>
        <Link 
          to="/instructions/module-4/4.2" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Model Context Protocol (MCP) <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson4_1;
