import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Code, Bug, Book } from 'lucide-react';

const Lesson8_2: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">8.2: Implementation</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-8/8.1" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-8/8.3" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        This is where your plan turns into reality. The implementation phase is about building your project, solving problems as they arise, and keeping a record of your work.
      </p>

      {/* Key Implementation Steps */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">The Building Process</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <Code className="w-8 h-8 mr-4 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-lg text-white">Guided Development</h4>
              <p className="text-gray-400">Follow your project plan and milestones. Work step-by-step, building one feature at a time. Use AI as your collaborative partner to write code, generate assets, and solve small problems.</p>
            </div>
          </div>
          <div className="flex items-start">
            <Bug className="w-8 h-8 mr-4 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-lg text-white">Troubleshooting</h4>
              <p className="text-gray-400">You will encounter challenges. When you get stuck, describe the problem to the AI. Provide the error message, the code you're using, and what you've already tried. Iteratively work with the AI to find a solution.</p>
            </div>
          </div>
          <div className="flex items-start">
            <Book className="w-8 h-8 mr-4 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-lg text-white">Documentation</h4>
              <p className="text-gray-400">Keep a simple log of your progress. Write down what you built, the challenges you faced, and how you solved them. This is invaluable for your final presentation and for anyone who wants to understand your project.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Exercise: Start Building</h2>
        <p className="text-gray-300 mb-4">
          Begin working on the first milestone of your capstone project. As you work, practice the skills above.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Your Task:</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Implement:</strong> Build the first feature from your project plan.</li>
            <li><strong>Troubleshoot:</strong> When you hit a snag, formulate a question for an AI to help you solve it.</li>
            <li><strong>Document:</strong> Write a short entry in your developer log about what you accomplished and any problems you solved.</li>
          </ul>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-8/8.1" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Project Planning
        </Link>
        <Link 
          to="/instructions/module-8/8.3" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Presentation & Review <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson8_2;
