import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BrainCircuit, Building, GraduationCap, HeartHandshake } from 'lucide-react';


const Lesson4_4: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">4.4: Understanding GPTs</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-4/4.3" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-4/4.5" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        GPTs (Generative Pre-trained Transformers) are a type of large language model (LLM) that can be customized for specific tasks or domains. Think of them as specialized versions of a general AI, tailored with custom instructions, knowledge, and capabilities.
      </p>

      {/* Core Concepts */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">What Makes a GPT?</h2>
        <p className="text-gray-300 mb-4">
          A GPT combines a powerful base model (like GPT-4) with three key ingredients:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li><strong>Custom Instructions:</strong> A detailed prompt that defines the GPT's persona, goals, and constraints.</li>
          <li><strong>Expanded Knowledge:</strong> Additional files and data you provide to give the GPT specific expertise it wouldn't otherwise have.</li>
          <li><strong>Custom Actions:</strong> The ability to connect to external APIs and tools, allowing it to perform tasks in the real world.</li>
        </ul>
      </section>

      {/* Use Cases */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Use Cases Across Different Domains</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Use Case */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <BrainCircuit className="w-8 h-8 mr-3 text-green-400" />
              <h4 className="font-bold text-lg text-white">Personal Productivity</h4>
            </div>
            <p className="text-sm text-gray-400">A 'Meeting Master' GPT that can take your raw meeting notes, identify action items, and draft follow-up emails in your personal style.</p>
          </div>

          {/* Business Use Case */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Building className="w-8 h-8 mr-3 text-yellow-400" />
              <h4 className="font-bold text-lg text-white">Business Operations</h4>
            </div>
            <p className="text-sm text-gray-400">A 'Support Sentinel' GPT trained on company documentation to provide instant, accurate answers to customer support queries, reducing response times.</p>
          </div>

          {/* Education Use Case */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <GraduationCap className="w-8 h-8 mr-3 text-cyan-400" />
              <h4 className="font-bold text-lg text-white">Education</h4>
            </div>
            <p className="text-sm text-gray-400">A 'History Helper' GPT that acts as a specific historical figure, allowing students to ask questions and receive answers in character, making learning more interactive.</p>
          </div>

          {/* Social Improvement Use Case */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <HeartHandshake className="w-8 h-8 mr-3 text-pink-400" />
              <h4 className="font-bold text-lg text-white">Social Improvement</h4>
            </div>
            <p className="text-sm text-gray-400">A 'Grant Writer' GPT trained on successful grant proposals to help non-profits draft compelling applications for funding, leveling the playing field for smaller organizations.</p>
          </div>
        </div>
      </section>

      {/* When to Use GPTs */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">When to Use a Custom GPT</h2>
        <p className="text-gray-300 mb-4">
          Choose a custom GPT when you need to repeatedly perform a specific, complex task that requires specialized knowledge or a particular style of interaction. If you find yourself using the same long prompt over and over, that's a perfect candidate for a GPT.
        </p>
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
          to="/instructions/module-4/4.5" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: AI Agents <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson4_4;
