import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Target, Wrench, ListChecks, Lightbulb } from 'lucide-react';

const Lesson6_2: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">6.2: The Agentic Mindset</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-6/6.1" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-6/6.3" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Building effective agents requires a shift in thinking. Instead of just prompting for an answer, you must think like a project manager: define a goal, provide the right tools, and break the project down into manageable steps. This is the agentic mindset.
      </p>

      {/* Core Principles */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          Key Principles of Agentic Thinking
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <Target className="w-8 h-8 mx-auto mb-3 text-green-400" />
            <h4 className="font-bold text-lg text-white text-center">1. Goal-Oriented</h4>
            <p className="text-sm text-gray-400 mt-2">Start with a clear, specific, and achievable goal. What is the final outcome you want the agent to accomplish?</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <Wrench className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
            <h4 className="font-bold text-lg text-white text-center">2. Tool-Aware</h4>
            <p className="text-sm text-gray-400 mt-2">Identify what capabilities the agent needs. What information does it have to access? What actions must it be able to take?</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <ListChecks className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
            <h4 className="font-bold text-lg text-white text-center">3. Step-Based</h4>
            <p className="text-sm text-gray-400 mt-2">Break down the goal into a sequence of smaller, logical steps. The agent will tackle these one by one.</p>
          </div>
        </div>
      </section>

      {/* Conceptual Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Exercise: Plan a Research Agent
        </h2>
        <p className="text-gray-300 mb-4">
          Let's apply the agentic mindset. Your goal is to create an agent that can write a short report on the history of the internet.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Your Task:</h3>
          <p className="text-gray-300 mb-4">Using the principles above, outline a plan for this agent. Don't write the report itself, but answer these questions:</p>
          <ul className="list-decimal pl-5 space-y-2 text-gray-300">
            <li><strong>Goal:</strong> How would you phrase the final objective for the agent?</li>
            <li><strong>Tools:</strong> What specific tools would it need? (e.g., `web_search`, `read_file`, `write_report`).</li>
            <li><strong>Steps:</strong> What are the high-level steps the agent should follow? (e.g., "1. Search for key events in internet history. 2. Synthesize findings... 3. Write the final report.")</li>
          </ul>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-6/6.1" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Introduction to AI Agents
        </Link>
        <Link 
          to="/instructions/module-6/6.3" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Multi-Agent Systems <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson6_2;
