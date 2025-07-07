import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Bot, Briefcase, BookOpen, Users } from 'lucide-react';

const Lesson4_5: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">4.5: Introduction to AI Agents</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-4/4.4" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-4/4.6" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        An AI Agent is more than just a chatbot. It's an autonomous system that can perceive its environment, make decisions, and take actions to achieve specific goals. Agents can use tools, access information, and even collaborate with other agents.
      </p>

      {/* Core Concepts */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">The Agentic Mindset</h2>
        <p className="text-gray-300 mb-4">
          The key difference is proactivity. While a standard model waits for your command, an agent operates on a loop:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-gray-300">
          <li><strong>Observe:</strong> Gather information about the current state.</li>
          <li><strong>Think:</strong> Decide on the next best action to move closer to its goal.</li>
          <li><strong>Act:</strong> Execute the action, often by using a tool (like running code or searching the web).</li>
        </ol>
      </section>

      {/* Use Cases */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Agent Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Use Case */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Bot className="w-8 h-8 mr-3 text-green-400" />
              <h4 className="font-bold text-lg text-white">Personal Assistant</h4>
            </div>
            <p className="text-sm text-gray-400">An agent that manages your calendar, automatically scheduling meetings based on your priorities and finding times that work for everyone, without you needing to intervene.</p>
          </div>

          {/* Business Use Case */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Briefcase className="w-8 h-8 mr-3 text-yellow-400" />
              <h4 className="font-bold text-lg text-white">Automated Data Analyst</h4>
            </div>
            <p className="text-sm text-gray-400">An agent that can connect to a company's sales database, autonomously generate a quarterly performance report, identify key trends, and email the summary to stakeholders.</p>
          </div>

          {/* Education Use Case */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <BookOpen className="w-8 h-8 mr-3 text-cyan-400" />
              <h4 className="font-bold text-lg text-white">Personalized Tutor</h4>
            </div>
            <p className="text-sm text-gray-400">An agent that tracks a student's progress, identifies areas of weakness, and generates custom practice problems and explanations to help them master difficult concepts.</p>
          </div>

          {/* Social Improvement Use Case */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Users className="w-8 h-8 mr-3 text-pink-400" />
              <h4 className="font-bold text-lg text-white">Disaster Response Coordinator</h4>
            </div>
            <p className="text-sm text-gray-400">An agent that monitors social media and news feeds for disaster events, automatically identifies areas of greatest need, and helps coordinate the dispatch of resources and volunteers.</p>
          </div>
        </div>
      </section>

      {/* When to Use Agents */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">When to Use an Agent</h2>
        <p className="text-gray-300 mb-4">
          Use an agent when you have a complex, multi-step goal that requires dynamic decision-making and interaction with external systems. If the task involves more than just generating text or answering a single question, an agent is likely the right choice.
        </p>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-4/4.4" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Understanding GPTs
        </Link>
        <Link 
          to="/instructions/module-4/4.6" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: MCP Servers <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson4_5;
