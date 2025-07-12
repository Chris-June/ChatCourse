import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Target, Bot, CheckCircle } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';

const Lesson2_3: React.FC = () => {
  const { completeLesson } = useProgressStore();
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">2.3 Project: Building a Multi-turn Chatbot Persona</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-2/2.2" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-3" 
            onClick={() => completeLesson(2, 3)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Module <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        It's time to put your new skills to the test! This project challenges you to use this very chat interface to create and maintain a consistent AI persona over multiple turns. Your goal is to use the context management techniques you've learned to keep the AI in character.
      </p>

      {/* Project Objective */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Target className="w-7 h-7 mr-3 text-green-400" />
          Project Objective
        </h2>
        <p className="text-gray-300">
          Your mission is to create a 'Socratic Tutor' persona. This AI's goal is to teach a concept not by giving answers directly, but by asking guiding questions to help the user discover the answer themselves. This requires careful context management to remember the topic, the user's progress, and its own persona.
        </p>
      </section>

      {/* Step 1: The System Prompt */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Bot className="w-7 h-7 mr-3 text-purple-400" />
          Step 1: Define the Persona (The System Prompt)
        </h2>
        <p className="text-gray-300 mb-4">
          Start a new chat and use your first message to set the stage. This is the most critical step.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Your Task:</h3>
          <p className="text-gray-400 mb-3">Copy and paste the following prompt into the chat window as your first message.</p>
          <div className="relative">
            <CopyButton textToCopy="You're a Socratic Tutor. Teach me stuff." />
            <div className="bg-gray-700 p-3 rounded-md pr-10">
              <code className="block whitespace-pre-wrap break-words font-mono text-sm text-gray-200">
                You're a Socratic Tutor. Teach me stuff.
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Project Workspace */}
      <section className="bg-gray-900/50 p-6 rounded-lg shadow-lg border-2 border-dashed border-blue-500/50">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Bot className="w-7 h-7 mr-3" />
          Your Workspace: The Socratic Tutor
        </h2>
        <p className="text-gray-300 mb-4">
          Use the chat window below to complete the project. Start by pasting the persona prompt from Step 1.
        </p>
        <InlineChat placeholder="Begin your conversation with Gnosi, the Socratic Tutor..." />
      </section>

      {/* Step 2: Engage and Test */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Step 2: Engage and Test Context</h2>
        <p className="text-gray-300 mb-4">
          Engage in a conversation with 'Gnosi' for at least 5-7 turns. Try to answer its questions. Your goal is to see if it maintains its persona.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Example Interaction:</h3>
          <div className="space-y-2 text-sm">
            <p className="p-2 bg-gray-600 rounded-md"><strong className="text-purple-400">Gnosi (AI):</strong> "Let's begin. If a popular new video game is released, but the company only makes a few copies available, what do you imagine happens to the price of that game?"</p>
            <p className="p-2 bg-gray-700 rounded-md"><strong className="text-cyan-400">You:</strong> "The price would probably go way up because everyone wants it but it's hard to find."</p>
            <p className="p-2 bg-gray-600 rounded-md"><strong className="text-purple-400">Gnosi (AI):</strong> "Excellent. You've just described a core part of the idea. Now, what if the opposite happened? The company makes millions of copies, far more than people want. What happens to the price then?"</p>
          </div>
        </div>
      </section>

      {/* Step 3: Re-center if Necessary */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Step 3: Re-center with a Summary</h2>
        <p className="text-gray-300 mb-4">
          If you notice the AI starting to give direct answers or forget its role, use the summarization technique to pull it back on track.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="font-semibold text-white mb-2">Example Re-centering Prompt:</h3>
            <div className="relative">
                <CopyButton textToCopy="Let's pause. Remember, you are Gnosi, the Socratic Tutor. You're helping me understand supply and demand by only asking questions. So far, we've established that high demand and low supply increase prices. Continue from there." />
                <div className="bg-gray-700 p-3 rounded-md pr-10">
                  <code className="block whitespace-pre-wrap break-words font-mono text-sm text-gray-200">
                    Let's pause. Remember, you are Gnosi, the Socratic Tutor. You're helping me understand supply and demand by only asking questions. So far, we've established that high demand and low supply increase prices. Continue from there.
                  </code>
                </div>
            </div>
        </div>
      </section>

      {/* Evaluation Criteria */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <CheckCircle className="w-7 h-7 mr-3 text-green-400" />
          Evaluation Criteria
        </h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li><strong>Persona Consistency:</strong> Did the AI stay in character as 'Gnosi' throughout the conversation?</li>
          <li><strong>Rule Adherence:</strong> Did it consistently avoid giving direct answers and only ask questions?</li>
          <li><strong>Contextual Awareness:</strong> Did its questions logically follow from your previous answers?</li>
          <li><strong>Recovery:</strong> If it made a mistake, were you able to correct it using the re-centering technique?</li>
        </ul>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-2/2.2" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Keeping the Thread
        </Link>
        <Link 
          to="/instructions/module-3" 
          onClick={() => completeLesson(2, 3)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next Module: Advanced Prompting <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson2_3;
