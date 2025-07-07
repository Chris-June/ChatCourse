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
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">The Flow</h3>
          <ol className="list-decimal pl-5 space-y-2 text-gray-300">
            <li><strong>User Prompt:</strong> The user asks a question that requires external data (e.g., "What's the weather in London?").</li>
            <li><strong>AI Analysis:</strong> The AI recognizes that it needs to call a function (e.g., `get_weather`) to answer the prompt.</li>
            <li><strong>Function Call Request:</strong> The AI outputs a JSON object like <code>{`{"name": "get_weather", "arguments": {"city": "London"}}`}</code>.</li>
            <li><strong>Your Application:</strong> Your code parses the JSON, executes your actual `get_weather("London")` function, and gets the result (e.g., "15°C and cloudy").</li>
            <li><strong>Final Response:</strong> You send the result back to the AI, which then formulates a natural language response to the user.
            </li>
          </ol>
        </div>
      </section>

      {/* Why is it a Game-Changer? */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Terminal className="w-7 h-7 mr-3 text-green-400" />
          Why is it a Game-Changer?
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li><strong>Real-time Data:</strong> Access live information from APIs (weather, stocks, news).</li>
          <li><strong>Interactivity:</strong> Perform actions in the real world (send emails, create calendar events, control smart devices).</li>
          <li><strong>Data Retrieval:</strong> Connect to your private databases or knowledge bases to answer specific questions.</li>
          <li><strong>Structured Output:</strong> It's a reliable way to get structured data from the model, as the output format is defined by your function's signature.</li>
        </ul>
      </section>

      {/* Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Conceptual Exercise
        </h2>
        <p className="text-gray-300 mb-4">You don't need to write code for this. Just think about the prompt and the function call it would trigger. Imagine you have a function `create_reminder(task: string, due_date: string)`.</p>
        <p className="text-gray-300 mb-2">What function call JSON would you expect the AI to generate for the following prompt?</p>
        <pre className="p-3 bg-gray-700 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap">
          <code>
            Remind me to submit my project report by this Friday.
          </code>
        </pre>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Expected JSON Output:</h3>
          <pre className="p-3 bg-gray-700 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap">
            <code>
              {`{
  "name": "create_reminder",
  "arguments": {
    "task": "Submit project report",
    "due_date": "this Friday"
  }
}`}
            </code>
          </pre>
        </div>
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
