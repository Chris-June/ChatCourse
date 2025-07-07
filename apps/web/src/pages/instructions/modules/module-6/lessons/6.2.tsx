import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users, TestTube2, MessageSquare } from 'lucide-react';

const Lesson6_2: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">6.2: Design Thinking with AI</h1>
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
        Design thinking is a human-centered approach to innovation. When combined with AI, it allows us to create solutions that are not only technologically powerful but also genuinely useful and intuitive for people.
      </p>

      {/* Core Concepts */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Key Stages of AI-Powered Design</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <Users className="w-8 h-8 mx-auto mb-3 text-green-400" />
            <h4 className="font-bold text-lg text-white text-center">1. User Experience (UX)</h4>
            <p className="text-sm text-gray-400 mt-2">Focus on the end-user's journey. How will they interact with the AI? What makes the experience feel natural and helpful, not robotic or frustrating?</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <TestTube2 className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
            <h4 className="font-bold text-lg text-white text-center">2. Prototyping</h4>
            <p className="text-sm text-gray-400 mt-2">Quickly build and test low-fidelity versions of your idea. Use simple tools to simulate the AI interaction and gather initial impressions before writing complex code.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <MessageSquare className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
            <h4 className="font-bold text-lg text-white text-center">3. Gathering Feedback</h4>
            <p className="text-sm text-gray-400 mt-2">Show your prototype to real users. Listen to their feedback, observe where they struggle, and use their insights to refine your design.</p>
          </div>
        </div>
      </section>

      {/* Design Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Exercise: Prototype a Feature</h2>
        <p className="text-gray-300 mb-4">
          Let's go back to the 'Chef Assistant' idea from the previous lesson. Your task is to design the user interaction for the "Menu Planning" feature.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Your Design Task:</h3>
          <p className="text-gray-300 mb-4">Describe the user flow. What does the user see first? What questions does the AI ask to get the necessary information (e.g., dietary needs, desired cuisine)? How is the final menu presented?</p>
          <p className="text-gray-400 mt-2">For example: "The user clicks 'Plan My Week'. A chat interface appears. The AI asks: 'Any dietary restrictions?'..."</p>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-6/6.1" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Idea Generation
        </Link>
        <Link 
          to="/instructions/module-6/6.3" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Iterative Improvement <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson6_2;
