import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Database, Search, FileText, Lightbulb } from 'lucide-react';

const Lesson7_2: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">7.2: Building RAG Systems</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-7/7.1" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-7/7.3" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Retrieval-Augmented Generation (RAG) is a powerful technique that grounds an LLM's responses in external knowledge. Instead of relying solely on its training data, the model can pull in relevant, up-to-date information from a specified source before generating an answer.
      </p>

      {/* Core Components */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">The Components of a RAG System</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <Database className="w-8 h-8 mx-auto mb-3 text-green-400" />
            <h4 className="font-bold text-lg text-white text-center">1. Knowledge Base</h4>
            <p className="text-sm text-gray-400 mt-2">A collection of documents (e.g., PDFs, text files, database records) that contains the information you want the AI to use. This data is converted into numerical representations called embeddings.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <Search className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
            <h4 className="font-bold text-lg text-white text-center">2. Retriever</h4>
            <p className="text-sm text-gray-400 mt-2">When a user asks a question, the retriever searches the knowledge base to find the most relevant chunks of text. This is often done using a vector database.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <FileText className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
            <h4 className="font-bold text-lg text-white text-center">3. Generator</h4>
            <p className="text-sm text-gray-400 mt-2">The original prompt and the retrieved text are combined and sent to the LLM, which generates a final answer that is grounded in the retrieved facts.</p>
          </div>
        </div>
      </section>

      {/* Conceptual Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Exercise: Design a Documentation Helper
        </h2>
        <p className="text-gray-300 mb-4">
          Imagine you want to build a chatbot that can answer questions about your company's internal software. The chatbot should only use the official documentation to answer questions.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Your Task:</h3>
          <p className="text-gray-300 mb-4">Describe the high-level plan for building this RAG system:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Knowledge Base:</strong> What documents would you include? (e.g., user manuals, API guides, tutorials).</li>
            <li><strong>Retriever:</strong> How would the system find relevant information when a user asks, "How do I reset my password?"</li>
            <li><strong>Generator:</strong> How would the final answer be constructed to be helpful and accurate?</li>
          </ul>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-7/7.1" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Function Calling & Tool Use
        </Link>
        <Link 
          to="/instructions/module-7/7.3" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Fine-Tuning Models <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson7_2;
