import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageSquare, BrainCircuit, Lightbulb } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';

const Lesson5_1: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">5.1: Multi-Turn Conversations</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-4/4.3" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-5/5.2" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        A multi-turn conversation is a dialogue that spans multiple exchanges between a user and an AI. This is the foundation of building truly interactive and intelligent systems, as it allows the AI to remember previous parts of the conversation and use that information as context for future responses.
      </p>

      {/* Why it Matters */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <BrainCircuit className="w-7 h-7 mr-3 text-cyan-400" />
          The Power of Context
        </h2>
        <p className="text-gray-300 mb-4">
          Without memory, an AI would treat every message as a brand new, isolated request. It wouldn't be able to answer follow-up questions, understand pronouns like "it" or "they," or build upon previously discussed ideas. Maintaining context is what separates a simple command-response system from a genuine conversational partner.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Analogy: A Short-Term Memory</h3>
          <p className="text-gray-300">
            Think of the conversation history as the AI's short-term memory. With each new message you send, you are also sending the previous messages along with it. This allows the model to see the full picture and provide a response that is relevant, coherent, and intelligent.
          </p>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <MessageSquare className="w-7 h-7 mr-3 text-green-400" />
          How Context is Maintained
        </h2>
        <p className="text-gray-300 mb-4">
          In this application, every time you send a message, the entire chat history (both your messages and the AI's responses) is sent to the model. This history provides the necessary context.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>User:</strong> "What is the capital of France?"</li>
            <li><strong>AI:</strong> "The capital of France is Paris."</li>
            <li><strong>User:</strong> "What is its population?" <em>(The AI knows "it" refers to Paris because of the history).</em></li>
        </ul>
        <p className="text-gray-400 mt-4">
            This is why you can ask follow-up questions and have a natural-feeling conversation. The AI isn't just responding to your last message; it's responding to the entire dialogue.
        </p>
      </section>

      {/* Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Exercise: Test the AI's Memory
        </h2>
        <p className="text-gray-300 mb-4">
          Let's test this concept. Go to the main chat interface and try the following two-step conversation:
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <ol className="list-decimal pl-5 space-y-2 text-gray-300 text-sm">
            <li className="relative pr-10"><strong>First Prompt:</strong> "Tell me three interesting facts about the planet Jupiter."<CopyButton textToCopy={"Tell me three interesting facts about the planet Jupiter."} /></li>
            <li className="relative pr-10"><strong>Second Prompt:</strong> "Which of those is the most surprising?"<CopyButton textToCopy={"Which of those is the most surprising?"} /></li>
          </ol>
          <p className="text-gray-400 mt-3">Notice how the AI can answer the second question without you having to mention Jupiter again. It's using the context from the first turn to understand your follow-up.</p>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-4/4.3" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Building Custom Tools
        </Link>
        <Link 
          to="/instructions/module-5/5.2" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Personalization at Scale <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson5_1;
