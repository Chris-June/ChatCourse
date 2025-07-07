import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Bot, Wrench, BrainCircuit, Lightbulb } from 'lucide-react';

const Lesson6_1: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">6.1: Introduction to AI Agents</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-5/5.3" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-6/6.2" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        An AI Agent is more than just a chatbot. It's a system that uses an AI model as its core engine to reason, plan, and execute tasks to achieve a goal. Unlike a simple model that just responds to prompts, an agent can take actions.
      </p>

      {/* Core Components of an Agent */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Bot className="w-7 h-7 mr-3 text-cyan-400" />
          Core Components of an Agent
        </h2>
        <p className="text-gray-300 mb-4">
          Most AI agents are built from three fundamental components that work together:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <BrainCircuit className="w-8 h-8 mx-auto mb-3 text-green-400" />
            <h4 className="font-bold text-lg text-white text-center">1. Core Engine</h4>
            <p className="text-sm text-gray-400 mt-2">The Large Language Model (LLM) that powers the agent's reasoning and decision-making abilities.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <Wrench className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
            <h4 className="font-bold text-lg text-white text-center">2. Tools</h4>
            <p className="text-sm text-gray-400 mt-2">A set of functions or APIs the agent can use to interact with the outside world, like searching the web, reading files, or running code.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <Bot className="w-8 h-8 mx-auto mb-3 text-red-400" />
            <h4 className="font-bold text-lg text-white text-center">3. Memory</h4>
            <p className="text-sm text-gray-400 mt-2">A system for storing and retrieving information from past interactions, allowing the agent to learn and maintain context.</p>
          </div>
        </div>
      </section>

      {/* How Agents Work */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">The Agentic Loop</h2>
        <p className="text-gray-300 mb-4">
          Agents operate in a loop: they observe the situation, think about the next best action based on their goal, and then act using one of their tools. This is often called the Reason-Act (ReAct) loop.
        </p>
      </section>

      {/* Conceptual Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Exercise: Design a Simple Agent
        </h2>
        <p className="text-gray-300 mb-4">
          Imagine you want to create an agent whose goal is to tell you the current weather for any city.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Discussion Points:</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>What would be the agent's <strong>Core Engine</strong>? (e.g., a powerful model for understanding natural language)</li>
            <li>What specific <strong>Tool</strong> would this agent need? (Hint: How does one get real-time weather data?)</li>
            <li>What kind of <strong>Memory</strong> might be useful, if any?</li>
          </ul>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-5/5.3" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Performance Optimization
        </Link>
        <Link 
          to="/instructions/module-6/6.2" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: The Agentic Mindset <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson6_1;
