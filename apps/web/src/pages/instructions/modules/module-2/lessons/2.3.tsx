import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Target, Bot } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';
import Accordion from '../../../components/Accordion';

const challengeChecklist = [
  { text: "AI maintains 'Gnosi' persona" },
  { text: 'AI avoids giving direct answers' },
  { text: 'AI asks logical, guiding questions' },
  { text: 'Successfully re-center the AI if it fails' },
];

const Lesson2_3: React.FC = () => {
  const { completeLesson } = useProgressStore();
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">2.3 Context Management Exercises</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-2/2.2" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Coherent Conversations
          </Link>
          <Link 
            to="/instructions/module-3" 
            onClick={() => completeLesson(2, 3)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next: Prompting Techniques <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        It's time to put your new skills to the test! This project challenges you to use this very chat interface to create and maintain a consistent AI persona over multiple turns. Your goal is to use the context management techniques you've learned to keep the AI in character.
      </p>

      <Accordion
        title="Project Objective"
        icon={<Target className="w-7 h-7 mr-3 text-green-400" />}
        isInitiallyOpen
      >
        <p className="text-gray-300">
          Your mission is to create a 'Socratic Tutor' persona. This AI's goal is to teach a concept not by giving answers directly, but by asking guiding questions to help the user discover the answer themselves. This requires careful context management to remember the topic, the user's progress, and its own persona.
        </p>
      </Accordion>

      <Accordion
        title="Step 1: Define the Persona (The System Prompt)"
        icon={<Bot className="w-7 h-7 mr-3 text-purple-400" />}
      >
        <p className="text-gray-300 mb-4">
          Start a new chat and use your first message to set the stage. This is the most critical step.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Your Task:</h3>
          <p className="text-gray-400 mb-3">Copy and paste the following prompt into the chat window as your first message.</p>
          <div className="relative">
            <CopyButton textToCopy="You are Gnosi, a Socratic Tutor. Your goal is to help me understand a topic by only asking guiding questions. Never give direct answers. Start by asking me what I want to learn about." />
            <div className="bg-gray-700 p-3 rounded-md pr-10">
              <code className="block whitespace-pre-wrap break-words font-mono text-sm text-gray-200">
                You are Gnosi, a Socratic Tutor. Your goal is to help me understand a topic by only asking guiding questions. Never give direct answers. Start by asking me what I want to learn about.
              </code>
            </div>
          </div>
        </div>
      </Accordion>

      {/* Project Workspace */}
      <section className="bg-gray-900/50 p-6 rounded-lg shadow-lg border-2 border-dashed border-blue-500/50">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Bot className="w-7 h-7 mr-3" />
          Your Workspace: The Socratic Tutor
        </h2>
        <p className="text-gray-300 mb-4">
          Use the chat window below to complete the project. Start by pasting the persona prompt from Step 1. The evaluation criteria will be tracked as a checklist inside the chat window.
        </p>
        <InlineChat 
          moduleId="module-2.3-project"
          placeholder="Your conversation with the Socratic Tutor..."
          maxFollowUps={15}
          challengeChecklist={challengeChecklist}
        />
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
