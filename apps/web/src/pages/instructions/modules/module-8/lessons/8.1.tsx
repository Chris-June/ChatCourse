import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Target, Box, Calendar } from 'lucide-react';

const Lesson8_1: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">8.1: Project Planning</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-7/7.3" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-8/8.2" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        A successful project starts with a solid plan. For our capstone, this means clearly defining what we want to achieve, what's included (and what's not), and setting a realistic timeline.
      </p>

      {/* Key Planning Components */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Core Components of Your Plan</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <Target className="w-8 h-8 mr-4 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-lg text-white">Defining Objectives</h4>
              <p className="text-gray-400">What is the primary goal of your project? What does success look like? Your objectives should be specific, measurable, achievable, relevant, and time-bound (SMART).</p>
            </div>
          </div>
          <div className="flex items-start">
            <Box className="w-8 h-8 mr-4 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-lg text-white">Scope Definition</h4>
              <p className="text-gray-400">Clearly outline the features and functionality that are 'in scope' (will be built) and 'out of scope' (will not be built). This prevents 'scope creep' and keeps the project focused.</p>
            </div>
          </div>
          <div className="flex items-start">
            <Calendar className="w-8 h-8 mr-4 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-lg text-white">Timeline and Milestones</h4>
              <p className="text-gray-400">Break the project down into smaller, manageable milestones. Assign deadlines to each milestone to track progress and ensure the project stays on schedule. (e.g., Week 1: Finalize UI design, Week 2: Implement core logic).</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Exercise: Draft Your Project Plan</h2>
        <p className="text-gray-300 mb-4">
          For your capstone project idea, create a simple project plan. Use the concepts above to guide you.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Your Task:</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Objective:</strong> Write a one-sentence goal for your project.</li>
            <li><strong>Scope:</strong> List 3-5 key features that are in scope, and 1-2 that are out of scope.</li>
            <li><strong>Milestones:</strong> Define at least three major milestones with target completion dates.</li>
          </ul>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-7/7.3" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Future-Proofing
        </Link>
        <Link 
          to="/instructions/module-8/8.2" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Implementation <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson8_1;
