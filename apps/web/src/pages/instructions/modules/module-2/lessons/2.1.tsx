import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BrainCircuit, MessageSquare } from 'lucide-react';

const Lesson2_1: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">2.1 The Power of Context: How AI Remembers</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-1/1.3" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-2/2.2" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Have you ever had a conversation where you had to keep repeating yourself? It's frustrating. The same is true when talking to an AI. The key to a smooth, intelligent conversation is understanding and managing its 'memory'—what we call the <strong>context window</strong>.
      </p>

      {/* What is a Context Window? */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <BrainCircuit className="w-7 h-7 mr-3 text-blue-400" />
          What is a Context Window?
        </h2>
        <p className="text-gray-300 mb-4">
          Think of the context window as the AI's short-term memory. It's a finite space that holds the recent back-and-forth of your conversation. Every new message you send, and every response the AI gives, gets added to this window. When the window gets full, the oldest messages are 'forgotten' to make room for new ones.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Analogy: A Rolling Whiteboard</h3>
          <p className="text-gray-400">
            Imagine you're collaborating with someone using a whiteboard. You write down notes from your conversation. As you run out of space, you have to erase the oldest notes at the top to write new ones at the bottom. The context window works just like that whiteboard. Information outside that visible space is lost.
          </p>
        </div>
      </section>

      {/* Why It's Your Most Powerful Tool */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <MessageSquare className="w-7 h-7 mr-3 text-purple-400" />
          Why It's Your Most Powerful Tool
        </h2>
        <p className="text-gray-300 mb-4">
          Mastering the context window is the single most important skill for moving beyond simple, one-off questions. It's how you can have deep, multi-step conversations and guide the AI through complex tasks.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-900/30 p-4 rounded-lg border border-green-700">
                <h4 className="font-semibold text-green-300 mb-2">Effective Context Management Leads To:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Coherent, logical follow-up responses.</li>
                    <li>The ability to build on previous ideas.</li>
                    <li>Not having to repeat instructions.</li>
                    <li>AI adapting its tone and style to the conversation.</li>
                    <li>Successful completion of complex, multi-part tasks.</li>
                </ul>
            </div>
            <div className="bg-red-900/30 p-4 rounded-lg border border-red-700">
                <h4 className="font-semibold text-red-300 mb-2">Poor Context Management Leads To:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>The AI forgetting what you just told it.</li>
                    <li>Repetitive or contradictory answers.</li>
                    <li>Irrelevant or off-topic responses.</li>
                    <li>Frustration and wasted time.</li>
                    <li>Failure to complete the task correctly.</li>
                </ul>
            </div>
        </div>
      </section>

      {/* Practical Example */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">A Practical Example</h2>
          <div className="bg-gray-900 p-4 rounded-lg">
              <p className="text-gray-400 mb-3">Imagine this conversation flow:</p>
              <div className="space-y-3">
                  <p className="p-2 bg-gray-700 rounded-md"><strong className="text-cyan-400">You:</strong> "Give me three ideas for a healthy breakfast."</p>
                  <p className="p-2 bg-gray-600 rounded-md"><strong className="text-purple-400">AI:</strong> "1. Oatmeal with berries. 2. Scrambled eggs with spinach. 3. Greek yogurt with nuts."</p>
                  <p className="p-2 bg-gray-700 rounded-md"><strong className="text-cyan-400">You:</strong> "I like the second one. Can you give me a simple recipe?"</p>
              </div>
              <p className="mt-4 text-yellow-300 text-sm">The AI knows "the second one" refers to scrambled eggs with spinach <strong>only because the previous turn is still in the context window.</strong> If the conversation were too long, it would have forgotten the list and asked for clarification.</p>
          </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-1/1.3" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Back to Module 1
        </Link>
        <Link 
          to="/instructions/module-2/2.2" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Keeping the Thread <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson2_1;
