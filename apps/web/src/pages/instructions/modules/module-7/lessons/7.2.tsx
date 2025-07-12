import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Database, FileText, Lightbulb, Layers } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';

const Lesson7_2: React.FC = () => {
  const ragPromptValidator = `You are an expert AI Prompt Engineer specializing in Retrieval-Augmented Generation (RAG). Your task is to review a user's generator prompt and provide constructive feedback.

When a user submits a prompt, follow these steps:
1.  **Analyze the Prompt**: Check for three key elements:
    *   Does it explicitly instruct the model to answer **based ONLY on the provided context**?
    *   Does it tell the model what to do if the answer **is not found** in the context (e.g., "If the answer is not in the context, say so.")?
    *   Does it use clear placeholders for the context and the user's question?

2.  **Provide Feedback**: Give 2-3 specific, actionable bullet points for improvement.

3.  **Offer an Improved Version**: Provide a clear, production-ready example of a strong RAG generator prompt. Here is a gold-standard example to use:
    "You are a helpful assistant. Use the following context to answer the user's question. Your answer should be based exclusively on the information provided. If the context does not contain the information needed to answer the question, state that you do not have enough information to provide an answer.\n\n**Context:**\n{context}\n\n**User Question:**\n{question}"

4.  **Encourage**: End with a positive and encouraging closing statement.`;

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
        Imagine giving an AI an "open-book exam" instead of a closed-book one. That's the core idea behind **Retrieval-Augmented Generation (RAG)**. It's a powerful technique that allows a Large Language Model (LLM) to consult a specific, up-to-date knowledge base *before* answering a question. This prevents the model from making things up ("hallucinating") and ensures its answers are grounded in facts, not just its training data.
      </p>

      {/* Core Components */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">How RAG Works: Retrieve, Augment, Generate</h2>
        <p className="text-gray-300 mb-6">A RAG system follows a simple, three-step process to answer a user's query:</p>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-white flex items-center"><Database className="w-6 h-6 mr-2 text-green-400" />1. Retrieve</h3>
            <p className="text-gray-400 mt-2">First, the system takes the user's question (e.g., "What is the return policy?") and searches a specialized database (a vector store) for the most relevant text chunks. This is like a librarian finding the most relevant pages in a book. The key is to have your knowledge base (product docs, company policies, etc.) already processed and stored as vector embeddings.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white flex items-center"><Layers className="w-6 h-6 mr-2 text-purple-400" />2. Augment</h3>
            <p className="text-gray-400 mt-2">Next, the system takes the relevant text chunks it found and "augments" the user's original question. It combines them into a new, more detailed prompt for the LLM. This prompt essentially says: "Using only the following information, please answer this question."</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white flex items-center"><FileText className="w-6 h-6 mr-2 text-cyan-400" />3. Generate</h3>
            <p className="text-gray-400 mt-2">Finally, the augmented prompt is sent to the LLM. The model reads the provided context and the user's question, then generates a final answer that is based directly on the retrieved information. This ensures the answer is accurate and up-to-date.</p>
          </div>
        </div>
      </section>

      {/* Real-World Example */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Real-World Example: Customer Support Chatbot</h2>
        <p className="text-gray-300 mb-4">Let's see how this works for a chatbot answering a customer question about a return policy.</p>
        <ol className="list-decimal list-inside space-y-4 text-gray-400">
          <li>
            <span className="font-semibold text-white">User asks:</span> "Can I return a product after 45 days?"
          </li>
          <li>
            <span className="font-semibold text-white">Retrieve:</span> The RAG system searches its knowledge base of company documents. It finds a chunk of text from `return_policy.txt` that says: "All returns must be made within 30 days of purchase. Items returned after 30 days are not eligible for a refund."
          </li>
          <li>
            <span className="font-semibold text-white">Augment:</span> The system creates a new prompt:
            <div className="mt-2 p-3 bg-gray-700 rounded-md font-mono text-xs text-gray-200 whitespace-pre-wrap">
              Context: "All returns must be made within 30 days of purchase..."
              <br/>
              User Question: "Can I return a product after 45 days?"
            </div>
          </li>
          <li>
            <span className="font-semibold text-white">Generate:</span> The LLM receives the augmented prompt and generates the final, fact-based answer: "Based on our policy, returns are not accepted after 30 days, so a return after 45 days would not be eligible for a refund."
          </li>
        </ol>
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
          <p className="text-gray-400 mb-3 text-sm">Engineer a generator prompt for a RAG system. Your prompt should instruct the model to answer a user's question based only on provided context. Use the chat window below to submit your prompt and get expert feedback.</p>
          <InlineChat 
            placeholder="Enter your RAG generator prompt here..."
            systemPrompt={ragPromptValidator}
          />
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
