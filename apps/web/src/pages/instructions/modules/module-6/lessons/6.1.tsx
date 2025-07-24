import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Lightbulb, ClipboardCheck, TrendingUp } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';

const Lesson6_1: React.FC = () => {
  const { completeLesson } = useProgressStore();
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">6.1 Real-world Applications</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-5/5.3" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Performance Optimization
          </Link>
          <Link 
            to="/instructions/module-6/6.2" 
            onClick={() => completeLesson(6, 1)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next: Design Thinking <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        The journey of building a great AI-powered product begins with a great idea. In this lesson, we'll explore how to brainstorm innovative concepts, assess their feasibility, and prioritize what to build first.
      </p>

      {/* Core Concepts */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Framework for AI Innovation</h2>
        <p className="text-gray-300 mb-6">A structured approach can turn a simple idea into a viable product. We'll use a three-part framework: Brainstorming with a focus on user needs, assessing feasibility, and prioritizing for impact.</p>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-white flex items-center"><Lightbulb className="w-6 h-6 mr-2 text-yellow-400" />1. Brainstorming with "Jobs to be Done"</h3>
            <p className="text-gray-400 mt-2">Instead of thinking "What can AI do?", ask "What job does my user need to get done?" The "Jobs to be Done" (JTBD) framework focuses on user problems, not features. An AI product should be a 'hireable' solution for a specific job.</p>
            <p className="text-gray-400 mt-2"><strong>Example JTBD:</strong> "When I'm planning my weekly meals, I want to find recipes that use ingredients I already have, so I can save money and reduce food waste."</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white flex items-center"><ClipboardCheck className="w-6 h-6 mr-2 text-green-400" />2. Feasibility Checklist</h3>
            <p className="text-gray-400 mt-2">Once you have an idea, perform a quick reality check:</p>
            <ul className="list-disc pl-5 mt-2 text-gray-300 space-y-1">
              <li><strong>Technical Feasibility:</strong> Does the core task rely on proven AI capabilities (e.g., summarization, classification) or something experimental?</li>
              <li><strong>Data Availability:</strong> Do you need proprietary data? Can you acquire it? Is public data sufficient?</li>
              <li><strong>Model Reliability:</strong> How accurate does the model need to be? Is a 90% success rate acceptable, or does it need to be 99.9%?</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white flex items-center"><TrendingUp className="w-6 h-6 mr-2 text-cyan-400" />3. Prioritization with an Impact/Effort Matrix</h3>
            <p className="text-gray-400 mt-2">Categorize your feasible ideas on a simple 2x2 matrix to decide what to build first:</p>
            <ul className="list-disc pl-5 mt-2 text-gray-300 space-y-1">
              <li><strong>High Impact, Low Effort (Quick Wins):</strong> Do these first.</li>
              <li><strong>High Impact, High Effort (Major Projects):</strong> Plan for these carefully.</li>
              <li><strong>Low Impact, Low Effort (Fill-ins):</strong> Tackle if you have free time.</li>
              <li><strong>Low Impact, High Effort (Avoid):</strong> Don't do these.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Brainstorming Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Your Turn: Brainstorm an AI Idea
        </h2>
        <p className="text-gray-300 mb-4">
          Now, it's your turn. Use the chat window below as an AI brainstorming partner. Describe an idea for an AI product or feature. The AI will help you analyze it using the framework from this lesson: Job to be Done, Feasibility, and Prioritization.
        </p>
        <InlineChat 
          moduleId="module-6.1-idea-generation"
          maxAttempts={10}
          placeholder='Try starting with: "I have an idea for an AI that helps with..."' 
        />
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
          onClick={() => completeLesson(6, 1)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Design Thinking with AI <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson6_1;
