import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users, TestTube2, MessageSquare, Wand2 } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';

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
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Designing for AI: Key Principles</h2>
        <p className="text-gray-300 mb-6">Designing for AI has unique challenges. Users need to understand what the AI can (and can't) do. The experience should feel collaborative, not magical or frustrating.</p>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center"><Users className="w-5 h-5 mr-2 text-green-400" />Set Clear Expectations</h3>
            <p className="text-gray-400 mt-1">Clearly communicate the AI's capabilities and limitations. If your AI summarizes legal documents, state that it is not a substitute for a lawyer.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center"><Wand2 className="w-5 h-5 mr-2 text-purple-400" />Provide an 'Undo' or 'Correction' Path</h3>
            <p className="text-gray-400 mt-1">AI makes mistakes. Give users an easy way to correct the AI's understanding or undo its actions. This builds trust and makes the system more robust.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center"><MessageSquare className="w-5 h-5 mr-2 text-cyan-400" />Show, Don't Just Tell</h3>
            <p className="text-gray-400 mt-1">When an AI makes a decision, briefly explain its reasoning if possible. For example, a movie recommender could say, "Because you enjoyed 'Blade Runner,' you might like 'Dune.'"</p>
          </div>
        </div>
      </section>

      {/* Design Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <TestTube2 className="w-7 h-7 mr-3 text-yellow-400" />
          Prototyping with the "Wizard of Oz" Method
        </h2>
        <p className="text-gray-300 mb-4">
          You don't need a working AI to test an AI idea. In a "Wizard of Oz" prototype, a human (the "wizard") manually simulates the AI's responses. This lets you test the user experience and conversation flow before writing a single line of code.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Exercise: Write a Wizard's Script</h3>
          <p className="text-gray-400 mb-3 text-sm">Imagine you are the wizard for the 'Chef Assistant' menu planner. A user wants a week of healthy, low-carb lunches. Write out the conversation script you would follow. What questions would you ask? How would you present the final menu?</p>
          <div className="relative p-3 bg-gray-700 rounded-md font-mono text-xs text-gray-200 whitespace-pre-wrap">
            <CopyButton textToCopy={`**User:** I need help planning my lunches for the week.\n\n**Wizard (as AI):** I can help with that! To get started, do you have any dietary preferences or restrictions?\n\n**User:** Yes, I'm looking for low-carb options.\n\n**Wizard (as AI):** Great! How about a mix of salads, wraps using lettuce instead of tortillas, and some lean protein bowls? For example, Monday could be a grilled chicken salad...`} />
            <p className="text-white">
              <strong>User:</strong> I need help planning my lunches for the week.<br/><br/>
              <strong>Wizard (as AI):</strong> I can help with that! To get started, do you have any dietary preferences or restrictions?<br/><br/>
              <strong>User:</strong> Yes, I'm looking for low-carb options.<br/><br/>
              <strong>Wizard (as AI):</strong> Great! How about a mix of salads, wraps using lettuce instead of tortillas, and some lean protein bowls? For example, Monday could be a grilled chicken salad...
            </p>
          </div>
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
