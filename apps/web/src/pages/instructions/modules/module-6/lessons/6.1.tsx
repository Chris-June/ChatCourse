import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Lightbulb, ClipboardCheck, TrendingUp } from 'lucide-react';

const Lesson6_1: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">6.1: Idea Generation</h1>
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
        The journey of building a great AI-powered product begins with a great idea. In this lesson, we'll explore how to brainstorm innovative concepts, assess their feasibility, and prioritize what to build first.
      </p>

      {/* Core Concepts */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">The Foundations of a Good Idea</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <Lightbulb className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
            <h4 className="font-bold text-lg text-white text-center">1. Brainstorming</h4>
            <p className="text-sm text-gray-400 mt-2">Generate a wide range of ideas without initial judgment. Think about user problems, industry gaps, and creative ways AI can provide a solution.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <ClipboardCheck className="w-8 h-8 mx-auto mb-3 text-green-400" />
            <h4 className="font-bold text-lg text-white text-center">2. Feasibility Assessment</h4>
            <p className="text-sm text-gray-400 mt-2">Evaluate your ideas against technical reality. Is the necessary data available? Can current AI models perform the required tasks reliably?</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <TrendingUp className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
            <h4 className="font-bold text-lg text-white text-center">3. Prioritization</h4>
            <p className="text-sm text-gray-400 mt-2">Decide which ideas to pursue. Consider factors like user impact, development effort, and business value to select the most promising concepts.</p>
          </div>
        </div>
      </section>

      {/* Brainstorming Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Exercise: Brainstorm an AI Assistant
        </h2>
        <p className="text-gray-300 mb-4">
          Let's brainstorm an AI assistant for a specific profession. Choose a profession (e.g., doctor, lawyer, chef) and list three potential tasks the AI could help them with.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Example for a 'Chef':</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Menu Planning:</strong> Generate weekly menus based on seasonal ingredients and dietary restrictions.</li>
            <li><strong>Inventory Management:</strong> Track kitchen stock and suggest grocery lists.</li>
            <li><strong>Creative Inspiration:</strong> Suggest new dish ideas based on a core ingredient.</li>
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
          Next: Design Thinking with AI <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson6_1;
