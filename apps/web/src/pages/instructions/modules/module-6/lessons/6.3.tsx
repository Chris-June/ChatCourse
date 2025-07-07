import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users, Share2, ShieldCheck, Lightbulb } from 'lucide-react';

const Lesson6_3: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">6.3: Multi-Agent Systems</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-6/6.2" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-7/7.1" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Module <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Why use one agent when you can use a team? Multi-agent systems involve multiple agents working together to solve a problem that would be difficult or impossible for a single agent to handle alone. This collaborative approach is one of the most powerful concepts in modern AI.
      </p>

      {/* Core Concepts */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Why Use Multiple Agents?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <Users className="w-8 h-8 mx-auto mb-3 text-green-400" />
            <h4 className="font-bold text-lg text-white text-center">Specialization</h4>
            <p className="text-sm text-gray-400 mt-2">Assign different roles to each agent. One agent can be a researcher, another a writer, and a third a critic, each excelling at its specific task.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <Share2 className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
            <h4 className="font-bold text-lg text-white text-center">Parallelism</h4>
            <p className="text-sm text-gray-400 mt-2">Multiple agents can work on different parts of a problem simultaneously, drastically speeding up the overall process.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <ShieldCheck className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
            <h4 className="font-bold text-lg text-white text-center">Robustness</h4>
            <p className="text-sm text-gray-400 mt-2">If one agent fails or produces a poor result, another can take over or provide feedback, leading to more reliable outcomes.</p>
          </div>
        </div>
      </section>

      {/* Conceptual Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Exercise: Design a Vacation Planning Team
        </h2>
        <p className="text-gray-300 mb-4">
          Imagine you are building a multi-agent system to help a user plan their perfect vacation. The overall goal is to produce a complete travel itinerary.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Your Task:</h3>
          <p className="text-gray-300 mb-4">Define the roles for at least three different agents on this team. What is each agent's specific responsibility?</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Example Agent 1: Research Agent</strong> - Searches for flights, hotels, and activities based on user criteria (budget, dates, interests).</li>
            <li><strong>Example Agent 2: Booking Agent</strong> - Handles the process of booking the selected flights and accommodations.</li>
            <li><strong>Example Agent 3: Itinerary Agent</strong> - Takes all the booked items and organizes them into a day-by-day schedule.</li>
          </ul>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-6/6.2" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: The Agentic Mindset
        </Link>
        <Link 
          to="/instructions/module-7/7.1" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next Module: Advanced Techniques <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson6_3;
