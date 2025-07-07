import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';

const Lesson7_1: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">7.1: Function Calling & Tool Use</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-6/6.3" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-7/7.2" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Function calling allows LLMs to break out of their text-only limitations and interact with the real world. By giving a model access to a set of 'tools' (functions), it can retrieve live data, interact with APIs, or perform actions.
      </p>

      {/* How it Works */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">The Function Calling Workflow</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 rounded-full"><p className="text-white font-bold">1</p></div>
            <p className="ml-4 text-gray-300">You define a set of functions (tools) your application can execute, including their names, parameters, and descriptions.</p>
          </div>
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 rounded-full"><p className="text-white font-bold">2</p></div>
            <p className="ml-4 text-gray-300">You send a prompt to the LLM, along with the list of available functions.</p>
          </div>
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 rounded-full"><p className="text-white font-bold">3</p></div>
            <p className="ml-4 text-gray-300">The LLM analyzes the prompt and, if it decides a tool is needed, it responds with a JSON object containing the name of the function to call and the arguments to use.</p>
          </div>
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 rounded-full"><p className="text-white font-bold">4</p></div>
            <p className="ml-4 text-gray-300">Your application parses this JSON, runs the actual function with the provided arguments, and gets a result.</p>
          </div>
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 rounded-full"><p className="text-white font-bold">5</p></div>
            <p className="ml-4 text-gray-300">You send the result of the function call back to the LLM, which then uses that information to formulate its final, user-facing response.</p>
          </div>
        </div>
      </section>

      {/* Conceptual Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Exercise: Design a Weather Tool
        </h2>
        <p className="text-gray-300 mb-4">
          Let's design a function that would allow an AI to fetch the current weather for a given location. This is a classic example of giving an AI access to live, external data.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Your Task:</h3>
          <p className="text-gray-300 mb-4">Define the key components of a `get_current_weather` function. What would you specify for each of the following?</p>
          <ul className="list-disc pl-5 space-y-3 text-gray-300">
            <li><strong>Function Name:</strong> What would you call the function? (e.g., `get_current_weather`)</li>
            <li><strong>Parameters:</strong> What information does the function need to do its job? Think about what the user might ask. (e.g., `location`, `units`).</li>
            <li><strong>Return Value:</strong> What information should the function send back to the AI after it runs? (e.g., a JSON object with `temperature`, `condition`, `humidity`).</li>
          </ul>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-6/6.3" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Multi-Agent Systems
        </Link>
        <Link 
          to="/instructions/module-7/7.2" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Building RAG Systems <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson7_1;
