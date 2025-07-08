import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Database, FileText, Lightbulb, Layers, Combine } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';

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
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">The RAG Pipeline: A Deeper Look</h2>
        <p className="text-gray-300 mb-6">A production-ready RAG system involves more than just a database and a prompt. It's a multi-stage pipeline focused on preparing, retrieving, and synthesizing information effectively.</p>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-white flex items-center"><Database className="w-6 h-6 mr-2 text-green-400" />1. The Ingestion Pipeline</h3>
            <p className="text-gray-400 mt-2">Before you can retrieve anything, you must prepare your knowledge. This involves a three-step process: loading documents, splitting them into chunks, and converting those chunks into vector embeddings for storage.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white flex items-center"><Layers className="w-6 h-6 mr-2 text-purple-400" />2. Chunking Strategy</h3>
            <p className="text-gray-400 mt-2">How you split your documents (chunking) is critical. If chunks are too small, you lose context. If they're too large, you add noise. A common strategy is <span className="font-semibold text-purple-300">Recursive Character Text Splitting</span>, which tries to split on meaningful separators (like paragraphs or sentences) first.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white flex items-center"><Combine className="w-6 h-6 mr-2 text-yellow-400" />3. Retrieval with Hybrid Search</h3>
            <p className="text-gray-400 mt-2">Simple vector search isn't always enough. <span className="font-semibold text-yellow-300">Hybrid Search</span> combines semantic (vector) search with traditional keyword search (like BM25). This approach is powerful because it can find documents that are conceptually related (via vectors) and those that contain exact keyword matches.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white flex items-center"><FileText className="w-6 h-6 mr-2 text-cyan-400" />4. Generation with Context</h3>
            <p className="text-gray-400 mt-2">This is the final step where the LLM shines. The user's original question is combined with the retrieved text chunks into a new, comprehensive prompt. The LLM is then instructed to answer the question *based only on the provided context*.</p>
          </div>
        </div>
      </section>

      {/* Conceptual Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Exercise: Engineer the Generator Prompt
        </h2>
        <p className="text-gray-300 mb-4">
          The final prompt sent to the LLM is the most important part of a RAG system. It must clearly instruct the model to use the provided context and nothing else. Your task is to design this prompt.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Your Task:</h3>
          <p className="text-gray-400 mb-3 text-sm">Complete the prompt template below. The goal is to create a clear and concise set of instructions for the LLM to generate a helpful, fact-based answer.</p>
          <div className="relative p-3 bg-gray-700 rounded-md font-mono text-xs text-gray-200 whitespace-pre-wrap">
            <CopyButton textToCopy={`You are an expert assistant for our internal software. Answer the user's question based ONLY on the following context. If the context does not contain the answer, say so.\n\n**Context:**\n---CONTEXT_CHUNK_1---\n---CONTEXT_CHUNK_2---\n\n**User Question:**\n---USER_QUESTION---`} />
            <p className="text-white">
              You are an expert assistant for our internal software. Answer the user's question based ONLY on the following context. If the context does not contain the answer, say so.<br/><br/>
              <strong>Context:</strong><br/>
              ---CONTEXT_CHUNK_1---<br/>
              ---CONTEXT_CHUNK_2---<br/><br/>
              <strong>User Question:</strong><br/>
              ---USER_QUESTION---
            </p>
          </div>
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
