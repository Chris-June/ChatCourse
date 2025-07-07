import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Zap, ChevronsRight, SlidersHorizontal } from 'lucide-react';

const Lesson5_3: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">5.3: Performance Optimization</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-5/5.2" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-6/6.1" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Module <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        In interactive applications, performance is critical. A slow, lagging AI feels frustrating to use. Optimizing performance involves improving both the actual response time (latency) and the user's perception of speed.
      </p>

      {/* Response Streaming */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <ChevronsRight className="w-7 h-7 mr-3 text-cyan-400" />
          Improving Perceived Performance with Streaming
        </h2>
        <p className="text-gray-300 mb-4">
          Instead of waiting for the entire AI response to be generated, you can stream it to the user token by token. This is what you see in action in this chat application. The text appears gradually, as it's being generated.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Why Streaming Matters:</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Immediate Feedback:</strong> The user sees that the system is working and processing their request right away.
            </li>
            <li><strong>Reduced Wait Time:</strong> Users can start reading the beginning of the response while the rest is still being generated.
            </li>
            <li><strong>Better Engagement:</strong> A responsive, streaming interface feels more dynamic and conversational.
            </li>
          </ul>
        </div>
      </section>

      {/* Model Trade-offs */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <SlidersHorizontal className="w-7 h-7 mr-3 text-green-400" />
          Choosing the Right Model: Speed vs. Power
        </h2>
        <p className="text-gray-300 mb-4">
          Not all tasks require the most powerful (and often slowest) AI model. There is a constant trade-off between a model's capability, its speed, and its cost.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="font-bold text-lg text-white">Smaller, Faster Models</h4>
            <p className="text-sm text-gray-400 mt-2">Best for simple, routine tasks like classification, data extraction, or simple Q&A. They are quicker and cheaper.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="font-bold text-lg text-white">Larger, Powerful Models</h4>
            <p className="text-sm text-gray-400 mt-2">Necessary for complex reasoning, creative writing, or multi-step problem-solving. They are slower and more expensive.</p>
          </div>
        </div>
      </section>

      {/* Conceptual Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Zap className="w-7 h-7 mr-3 text-yellow-400" />
          Exercise: Pick the Right Tool for the Job
        </h2>
        <p className="text-gray-300 mb-4">
          For each scenario below, decide whether a smaller, faster model or a larger, more powerful model would be more appropriate. Discuss the reasoning behind your choice.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700 space-y-3">
          <p className="text-gray-300"><strong>Scenario 1:</strong> A customer service chatbot that answers frequently asked questions based on a knowledge base.</p>
          <p className="text-gray-300"><strong>Scenario 2:</strong> An AI assistant that helps a scientist analyze complex research papers and generate novel hypotheses.</p>
          <p className="text-gray-300"><strong>Scenario 3:</strong> A tool that categorizes incoming emails into 'Important,' 'Spam,' and 'Promotions.'</p>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-5/5.2" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Personalization at Scale
        </Link>
        <Link 
          to="/instructions/module-6/6.1" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Introduction to AI Agents <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson5_3;
