import React from 'react';
import { Link } from 'react-router-dom';
import { PartyPopper, BrainCircuit, Rocket, Home } from 'lucide-react';

const Conclusion: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6 text-center">
      <div className="flex flex-col items-center">
        <PartyPopper className="w-24 h-24 text-yellow-400 mb-4" />
        <h1 className="text-4xl font-bold text-green-400">Congratulations!</h1>
        <p className="text-xl text-gray-300 mt-2">You've completed the AI Product Development Course.</p>
      </div>

      <p className="text-lg text-gray-300 max-w-3xl mx-auto">
        You have journeyed from the fundamentals of prompt engineering to the complexities of building autonomous agents and ensuring your creations are responsible and secure. You now possess a powerful toolkit for building the next generation of AI-powered products.
      </p>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6 text-blue-300 flex items-center justify-center"><BrainCircuit className="w-8 h-8 mr-3" />Key Skills You've Mastered</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="font-bold text-lg text-white">Advanced Prompting</h4>
            <p className="text-sm text-gray-400 mt-1">Crafting precise and effective prompts for complex tasks.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="font-bold text-lg text-white">Function Calling & Tools</h4>
            <p className="text-sm text-gray-400 mt-1">Connecting LLMs to external systems and APIs.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="font-bold text-lg text-white">RAG Systems</h4>
            <p className="text-sm text-gray-400 mt-1">Building applications that reason over private data.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="font-bold text-lg text-white">Fine-Tuning</h4>
            <p className="text-sm text-gray-400 mt-1">Specializing models for specific domains and tasks.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="font-bold text-lg text-white">AI Agents</h4>
            <p className="text-sm text-gray-400 mt-1">Designing autonomous systems that can reason and act.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="font-bold text-lg text-white">Responsible AI</h4>
            <p className="text-sm text-gray-400 mt-1">Ensuring fairness, transparency, and security.</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center justify-center"><Rocket className="w-8 h-8 mr-3" />What's Next?</h2>
        <p className="text-gray-300">
          Your journey doesn't end here. Continue to build, experiment, and learn. Consider contributing to open-source AI projects, starting a new personal project, or sharing what you've learned with others. The field is moving fast, and the best way to keep up is to stay engaged.
        </p>
      </section>

      <div className="flex justify-center pt-4">
        <Link 
          to="/instructions"
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-lg"
        >
          <Home className="w-6 h-6 mr-2" /> Back to Course Overview
        </Link>
      </div>
    </div>
  );
};

export default Conclusion;
