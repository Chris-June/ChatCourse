import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BarChart2, Beaker, RefreshCw } from 'lucide-react';

const Lesson6_3: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">6.3: Iterative Improvement</h1>
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
        Building an AI product isn't a one-time event; it's a continuous cycle of learning and refinement. Iterative improvement is the process of using data and user feedback to make your product better over time.
      </p>

      {/* Core Concepts */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">The Cycle of Improvement</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <BarChart2 className="w-8 h-8 mx-auto mb-3 text-green-400" />
            <h4 className="font-bold text-lg text-white text-center">1. Analytics & Metrics</h4>
            <p className="text-sm text-gray-400 mt-2">Measure how users are interacting with your product. Track key metrics like engagement, task success rates, and user satisfaction to identify areas for improvement.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <Beaker className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
            <h4 className="font-bold text-lg text-white text-center">2. A/B Testing</h4>
            <p className="text-sm text-gray-400 mt-2">Compare different versions of a feature or prompt to see which one performs better. This data-driven approach helps you make informed decisions.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <RefreshCw className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
            <h4 className="font-bold text-lg text-white text-center">3. Continuous Learning</h4>
            <p className="text-sm text-gray-400 mt-2">Use the insights from your data to evolve your product. This could mean refining prompts, adding new tools, or even retraining your model with new data.</p>
          </div>
        </div>
      </section>

      {/* Improvement Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Exercise: Suggest an A/B Test</h2>
        <p className="text-gray-300 mb-4">
          Consider an AI feature that summarizes long articles for users. The goal is to increase the number of users who rate the summary as "helpful."
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Your Task:</h3>
          <p className="text-gray-300 mb-4">Propose a simple A/B test you could run to improve the feature. What are the two different versions (A and B) you would test?</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Version A (Control):</strong> The current prompt, e.g., "Summarize this article."</li>
            <li><strong>Version B (Variant):</strong> A new prompt, e.g., "Summarize this article in three key bullet points."</li>
          </ul>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-6/6.2" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Design Thinking with AI
        </Link>
        <Link 
          to="/instructions/module-7/7.1" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next Module <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson6_3;
