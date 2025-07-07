import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Scale, ShieldCheck, Lightbulb } from 'lucide-react';

const Lesson8_1: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">8.1: Bias and Fairness</h1>
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
        AI models learn from data. If the data reflects existing societal biases, the model will learn and potentially amplify them. Ensuring fairness is a critical challenge in AI development.
      </p>

      {/* Sources of Bias */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Where Does Bias Come From?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <Scale className="w-8 h-8 mx-auto mb-3 text-red-400" />
            <h4 className="font-bold text-lg text-white text-center">Data Bias</h4>
            <p className="text-sm text-gray-400 mt-2">The training data may underrepresent certain groups or contain stereotypes. For example, a model trained mostly on images of male doctors might associate the profession exclusively with men.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <ShieldCheck className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
            <h4 className="font-bold text-lg text-white text-center">Algorithmic Bias</h4>
            <p className="text-sm text-gray-400 mt-2">The design of the algorithm itself can introduce bias. For example, an optimization goal to maximize ad clicks could lead to discriminatory ad targeting, even if the data was perfectly balanced.</p>
          </div>
        </div>
      </section>

      {/* Conceptual Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Exercise: Identifying Potential Bias
        </h2>
        <p className="text-gray-300 mb-4">
          Imagine you are developing an AI system to help with hiring by screening resumes. The goal is to identify the most qualified candidates for a software engineering role.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Your Task:</h3>
          <p className="text-gray-300 mb-4">Brainstorm potential sources of bias in this system:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Data:</strong> What kind of historical data would be used for training? How could it be biased? (e.g., resumes from past hires)</li>
            <li><strong>Features:</strong> What features from a resume might correlate with gender, race, or socioeconomic status? (e.g., names, university prestige)</li>
            <li><strong>Impact:</strong> What would be the real-world impact if the system unfairly favored certain groups?</li>
          </ul>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-7/7.3" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Fine-Tuning Models
        </Link>
        <Link 
          to="/instructions/module-8/8.2" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Transparency & Explainability <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson8_1;
