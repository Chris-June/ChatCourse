import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageSquare, BrainCircuit, Lightbulb } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';


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
          The Structure of a Conversation
        </h2>
                <p className="text-gray-300 mb-4">
          Behind the scenes, the conversation is just a list of message objects, each with a `role` and `content`. This entire list is sent to the model with every request.
        </p>
        <div className="bg-gray-900 p-3 rounded-md">
          <code className="block whitespace-pre-wrap break-words font-mono text-sm text-gray-200">
{`[
  {
    "role": "user",
    "content": "What is the capital of France?"
  },
  {
    "role": "assistant",
    "content": "The capital of France is Paris."
  },
  {
    "role": "user",
    "content": "What is its population?"
  }
]`}
          </code>
        </div>
        <p className="text-gray-400 mt-4">
          When the model receives this array, it can see that the user's latest question about "its population" refers to Paris from the previous turn.
        </p>
      </section>

      {/* Exercise */}
            {/* Understanding Roles */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Understanding Roles</h2>
        <p className="text-gray-300 mb-4">
          The `role` is crucial for helping the model understand the flow of dialogue:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li><strong>`user`</strong>: Represents messages from the person interacting with the AI.</li>
          <li><strong>`assistant`</strong>: Represents the AI's own previous responses.</li>
          <li><strong>`system`</strong>: (Optional) A high-level instruction that sets the persona and rules for the AI throughout the conversation (e.g., "You are a helpful assistant who always responds in rhyme.").</li>
        </ul>
      </section>

      {/* Pro Tip: Context Window */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Pro Tip: The Context Window</h2>
        <p className="text-gray-300 mb-4">
          Models have a limited "context window," which is the maximum amount of text (history + new prompt) they can process at once. If a conversation becomes too long, the oldest messages will be dropped, and the AI will start to "forget" the beginning of the dialogue.
        </p>
        <p className="text-gray-400">Managing conversation history is a key challenge in building robust chat applications. Common strategies include summarizing earlier parts of the conversation or using more advanced techniques like vector databases for long-term memory.</p>
      </section>

      {/* Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Your Turn: Test the Context
        </h2>
        <p className="text-gray-300 mb-4">
          Use the chat window below to see conversation memory in action. First, ask the AI about a topic. Then, ask a follow-up question using a pronoun like "it" or "they" to see how it uses the previous turn as context.
        </p>
        <InlineChat placeholder='Try asking: "What are the two largest moons of Mars?"' />
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-4/4.5" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Introduction to AI Agents
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
