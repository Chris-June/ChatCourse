import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Lightbulb, ClipboardCheck, TrendingUp } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';

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
          Exercise: From Idea to Prioritization
        </h2>
        <p className="text-gray-300 mb-4">
          Now, it's your turn. Pick a profession or a hobby you know well. Brainstorm one AI-powered feature for it, and then run it through the framework we just discussed.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Your Task:</h3>
          <p className="text-gray-400 mb-3 text-sm">Copy the template below and fill it out in your favorite notes app or text editor. This will help solidify your understanding of the innovation framework.</p>
          <div className="relative p-3 bg-gray-700 rounded-md font-mono text-xs text-gray-200 whitespace-pre-wrap">
            <CopyButton textToCopy={`## AI Idea Analysis ##\n\n**1. The Idea:**\n   - [Briefly describe your AI feature]\n\n**2. Job to be Done (JTBD):**\n   - When I..., I want to..., so I can...\n\n**3. Feasibility Checklist:**\n   - Technical Feasibility: [High/Medium/Low - Why?]\n   - Data Availability: [High/Medium/Low - Why?]\n   - Model Reliability: [What's the required accuracy?]\n\n**4. Prioritization:**\n   - Impact: [High/Low]\n   - Effort: [High/Low]\n   - Category: [Quick Win / Major Project / Fill-in / Avoid]`} />
            <p className="text-white">
              ## AI Idea Analysis ##<br/><br/>
              <strong>1. The Idea:</strong><br/>- [Briefly describe your AI feature]<br/><br/>
              <strong>2. Job to be Done (JTBD):</strong><br/>- When I..., I want to..., so I can...<br/><br/>
              <strong>3. Feasibility Checklist:</strong><br/>- Technical Feasibility: [High/Medium/Low - Why?]<br/>- Data Availability: [High/Medium/Low - Why?]<br/>- Model Reliability: [What's the required accuracy?]<br/><br/>
              <strong>4. Prioritization:</strong><br/>- Impact: [High/Low]<br/>- Effort: [High/Low]<br/>- Category: [Quick Win / Major Project / Fill-in / Avoid]
            </p>
          </div>
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
