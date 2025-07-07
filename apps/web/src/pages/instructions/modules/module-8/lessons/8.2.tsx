import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Eye, MessageSquare, Lightbulb } from 'lucide-react';

const Lesson8_2: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">8.2: Transparency & Explainability</h1>
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
        For AI systems to be trusted, we need to understand how they work and why they make certain decisions. This is the core of transparency and explainability.
      </p>

      {/* Definitions */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Key Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <Eye className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
            <h4 className="font-bold text-lg text-white text-center">Transparency</h4>
            <p className="text-sm text-gray-400 mt-2">This refers to having insight into how a model was created, what data it was trained on, and the architecture of the model itself. It's about knowing the 'what' and 'how' of the system.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <MessageSquare className="w-8 h-8 mx-auto mb-3 text-green-400" />
            <h4 className="font-bold text-lg text-white text-center">Explainability (XAI)</h4>
            <p className="text-sm text-gray-400 mt-2">Also known as Explainable AI, this is the ability to describe, in human terms, why a model made a specific decision. If a loan application is denied by an AI, explainability provides the reasons.</p>
          </div>
        </div>
      </section>

      {/* Conceptual Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Exercise: Explaining a Decision
        </h2>
        <p className="text-gray-300 mb-4">
          Let's revisit the AI resume screener from the previous lesson. The system has just rejected a candidate's resume.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Your Task:</h3>
          <p className="text-gray-300 mb-4">How could you provide a transparent and explainable reason for the rejection to the hiring manager?</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>What information would be useful to show? (e.g., which key skills were missing, how the candidate's experience compares to the job description).</li>
            <li>How could you present this information without revealing sensitive or biased correlations the model might have learned?</li>
            <li>Why is providing this explanation important for the hiring manager's trust in the system?</li>
          </ul>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-8/8.1" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Bias and Fairness
        </Link>
        <Link 
          to="/instructions/module-8/8.3" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Privacy & Data Security <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson8_2;
