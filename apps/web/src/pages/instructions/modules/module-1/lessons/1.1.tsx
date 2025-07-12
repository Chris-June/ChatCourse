import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useProgressStore } from '../../../../../store/progressStore';

const Lesson1_1: React.FC = () => {
  const { completeLesson } = useProgressStore();
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">1.1 Demystifying AI: What Exactly Are We Working With?</h1>
        <Link 
          to="/instructions/module-1/1.2" 
          onClick={() => completeLesson(1, 1)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>

      <p className="text-lg text-gray-300">
        Welcome to the start of your AI journey! In this first lesson, we'll pull back the curtain on what AI, especially the kind we'll be using, really is. We'll explore how it's different from the software you're used to, what it's good at, and where it falls short.
      </p>

      {/* AI vs. Traditional Programming */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">AI vs. Traditional Programming</h2>
        <p className="text-gray-300 mb-4">
          The most fundamental shift to understand is how AI-driven development differs from writing code in a traditional sense.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="font-bold text-lg text-white mb-2">Traditional Programming</h3>
            <p className="text-gray-400">You write <span className="text-green-400 font-mono">explicit, step-by-step instructions</span> (code). The computer follows these rules precisely. If you want to sort a list, you write or use a sorting algorithm.</p>
            <p className="mt-2 text-sm text-gray-500"><strong>Analogy:</strong> A detailed recipe. Follow it exactly, and you get the same cake every time.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="font-bold text-lg text-white mb-2">AI Development</h3>
            <p className="text-gray-400">You provide a <span className="text-yellow-400 font-mono">goal and data</span>. The AI model <span className="text-yellow-400 font-mono">learns patterns</span> from the data to figure out how to achieve the goal. You don't tell it *how* to sort; you show it many sorted lists and it learns what "sorted" means.</p>
            <p className="mt-2 text-sm text-gray-500"><strong>Analogy:</strong> Teaching a chef by letting them taste thousands of cakes. They learn the "essence" of a good cake and can create new ones.</p>
          </div>
        </div>
      </section>

      {/* Large Language Models 101 */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Large Language Models 101</h2>
        <p className="text-gray-300 mb-4">
          The "AI" we'll be collaborating with is a Large Language Model (LLM). These are complex systems trained on a massive amount of text and code from the internet.
        </p>
        <p className="text-gray-300">
          At their core, LLMs are incredibly sophisticated <span className="text-cyan-400 font-semibold">pattern-matching machines</span>. Their primary function is to predict the next most likely word (or "token") in a sequence. When you ask a question, it's predicting the sequence of words that forms the most probable answer based on everything it has learned.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Key Concepts:</h3>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li><span className="font-semibold text-cyan-300">Tokens:</span> The building blocks of text for an LLM. A token can be a word, a part of a word, or punctuation. "Hello world!" might be three tokens: "Hello", " world", "!".</li>
            <li><span className="font-semibold text-cyan-300">Parameters:</span> Think of these as the "knowledge" the model has learned. They are the internal variables adjusted during training. Models like GPT-4 have trillions of them.</li>
            <li><span className="font-semibold text-cyan-300">Training:</span> The process of feeding the model vast datasets and having it adjust its parameters to get better at predicting text.</li>
          </ul>
        </div>
      </section>

      {/* Capabilities and Limitations */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Capabilities and Limitations</h2>
        <p className="text-gray-300 mb-4">
          Understanding what AI excels at and where it struggles is crucial for effective collaboration.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="font-bold text-lg text-green-400 mb-2">Strengths (Capabilities)</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Generating creative text, code, and ideas.</li>
              <li>Summarizing and explaining complex topics.</li>
              <li>Translating languages.</li>
              <li>Brainstorming and exploring possibilities.</li>
              <li>Performing repetitive text-based tasks quickly.</li>
            </ul>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="font-bold text-lg text-red-400 mb-2">Weaknesses (Limitations)</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><span className="font-semibold">Hallucinations:</span> Confidently making up facts.</li>
              <li>Lack of real-world, real-time knowledge.</li>
              <li>Inconsistent logical reasoning.</li>
              <li>Can reflect biases from its training data.</li>
              <li>Struggles with precise, multi-step math.</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-700">
            <p className="text-blue-200"><span className="font-bold">Key Takeaway:</span> Treat the AI as a brilliant, incredibly fast, but sometimes unreliable intern. Your job as the collaborator is to guide it, verify its work, and leverage its strengths while mitigating its weaknesses.</p>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-end pt-4">
        <Link 
          to="/instructions/module-1/1.2" 
          onClick={() => completeLesson(1, 1)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: The Art of the Prompt <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson1_1;
