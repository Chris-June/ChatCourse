import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, SlidersHorizontal, BrainCircuit, Lightbulb } from 'lucide-react';

const Lesson7_3: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">7.3: Fine-Tuning Models</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-7/7.2" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-8"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Module <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Fine-tuning is the process of taking a pre-trained model and further training it on a smaller, domain-specific dataset. This adapts the model to specialize in a particular task, style, or knowledge domain.
      </p>

      {/* When to Fine-Tune */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">When Should You Fine-Tune?</h2>
        <p className="text-gray-300 mb-4">Fine-tuning is powerful but not always necessary. Consider it when:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <BrainCircuit className="w-8 h-8 mx-auto mb-3 text-green-400" />
            <h4 className="font-bold text-lg text-white text-center">You need to teach a specific style or format.</h4>
            <p className="text-sm text-gray-400 mt-2">If you need the AI to consistently output text in a very specific format (e.g., a legal document, a particular JSON schema), fine-tuning on examples can be very effective.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <SlidersHorizontal className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
            <h4 className="font-bold text-lg text-white text-center">You have a unique, proprietary knowledge base.</h4>
            <p className="text-sm text-gray-400 mt-2">If your data is highly specialized and cannot be easily provided via RAG (e.g., medical research, internal company jargon), fine-tuning can embed this knowledge directly into the model.</p>
          </div>
        </div>
        <p className="text-sm text-gray-400 mt-4"><strong>Key takeaway:</strong> Start with prompt engineering and RAG first. Only move to fine-tuning if these methods fail to meet your performance requirements.</p>
      </section>

      {/* Conceptual Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Exercise: To Fine-Tune or Not to Fine-Tune?
        </h2>
        <p className="text-gray-300 mb-4">
          Consider the following scenario: You are building a customer support chatbot for an e-commerce store. The chatbot needs to answer questions about order status, return policies, and product details.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Your Task:</h3>
          <p className="text-gray-300 mb-4">Would you use RAG, fine-tuning, or a combination for this task? Justify your decision by considering:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Data Freshness:</strong> How often do product details or policies change?</li>
            <li><strong>Cost and Complexity:</strong> What are the development and maintenance costs of each approach?</li>
            <li><strong>Hallucination Risk:</strong> How critical is it that the chatbot provides factually accurate information from the store's knowledge base?</li>
          </ul>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-7/7.2" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Building RAG Systems
        </Link>
        <Link 
          to="/instructions/module-8"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Module 8 - Responsible AI <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson7_3;
