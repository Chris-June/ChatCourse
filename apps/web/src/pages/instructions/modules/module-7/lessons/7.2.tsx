import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';
import RagFlowVisualizer from '../../../components/RagFlowVisualizer';
import RagUseCases from '../../../components/RagUseCases';
import RagPlayground from '../../../components/RagPlayground';

const Lesson7_2: React.FC = () => {
  const { completeLesson } = useProgressStore();
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
    <div className="space-y-12 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">7.2 Understanding RAG</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-7/7.1" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Advanced Function Calling
          </Link>
          <Link 
            to="/instructions/module-7/7.3" 
            onClick={() => completeLesson(7, 2)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next: Model Fine-Tuning <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <section>
        <p className="text-lg text-gray-300">
          Imagine giving an AI an "open-book exam" instead of a closed-book one. That's the core idea behind **Retrieval-Augmented Generation (RAG)**. It's a powerful technique that allows a Large Language Model (LLM) to consult a specific, up-to-date knowledge base *before* answering a question. This prevents the model from making things up ("hallucinating") and ensures its answers are grounded in facts, not just its training data.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">How RAG Works: An Animated Guide</h2>
        <p className="text-gray-300 mb-4">The RAG process has three core steps: Retrieve, Augment, and Generate. Use the visualizer below to see how a user's query is transformed into a fact-based answer.</p>
        <RagFlowVisualizer />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Common Use Cases for RAG</h2>
        <p className="text-gray-300 mb-4">RAG is incredibly versatile. It's used to build everything from customer support bots to personal assistants. Explore some of the common applications below.</p>
        <RagUseCases />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Hands-On: The RAG Playground</h2>
        <p className="text-gray-300 mb-4">Now it's your turn. We've set up a mini-RAG system with a small knowledge base about a fictional company. Ask it questions to see the retrieval and generation process for yourself.</p>
        <RagPlayground />
      </section>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Final Challenge: Engineer the Generator Prompt
        </h2>
        <p className="text-gray-300 mb-4">
          The final prompt sent to the LLM is the most important part of a RAG system. It must clearly instruct the model to use the provided context and nothing else. Your task is to design this prompt.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Your Task:</h3>
          <p className="text-gray-400 mb-3 text-sm">Engineer a generator prompt for a RAG system. Your prompt should instruct the model to answer a user's question based only on provided context. Use the chat window below to submit your prompt and get expert feedback.</p>
          <InlineChat 
            moduleId="module-7.2-rag-prompt"
            maxAttempts={10}
            placeholder="Enter your RAG generator prompt here..."
            systemPrompt={ragPromptValidator}
          />
        </div>
      </section>

      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-7/7.1" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Advanced Function Calling
        </Link>
        <Link 
          to="/instructions/module-7/7.3" 
          onClick={() => completeLesson(7, 2)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Model Fine-Tuning <ChevronRight className="w-5 h-5 ml-2" />
          Next: Fine-Tuning Models <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson7_2;
