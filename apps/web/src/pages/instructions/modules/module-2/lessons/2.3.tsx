import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Target, Bot } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';
import Accordion from '../../../components/Accordion';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

const challengeChecklist = [
  { text: "AI maintains 'Gnosi' persona", completed: false },
  { text: 'AI avoids giving direct answers', completed: false },
  { text: 'AI asks logical, guiding questions', completed: false },
  { text: 'Successfully re-center the AI if it fails', completed: false },
];

const Lesson2_3: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What is the primary goal of the \'Socratic Tutor\' persona you are asked to create?',
      options: [
        'To provide the most accurate and direct answers possible.',
        'To teach a concept by asking guiding questions instead of giving answers.',
        'To act as a friendly chatbot for casual conversation.',
        'To summarize long texts into bullet points.'
      ],
      correctAnswer: 'To teach a concept by asking guiding questions instead of giving answers.',
      explanation: 'The core of the Socratic method is guiding someone to their own conclusion. The AI must avoid giving direct answers to succeed.'
    },
    {
      questionText: 'What is the most critical step for establishing the AI\'s persona in this exercise?',
      options: [
        'Using a friendly tone in all your messages.',
        'The first prompt you send, which defines the AI\'s role and rules (the system prompt).',
        'Asking the AI very difficult questions.',
        'Correcting the AI\'s spelling mistakes.'
      ],
      correctAnswer: 'The first prompt you send, which defines the AI\'s role and rules (the system prompt).',
      explanation: 'This initial instruction, or system prompt, is the foundation of the entire interaction. It sets the context that the AI will refer back to.'
    },
    {
      questionText: 'If the \'Socratic Tutor\' AI starts giving you direct answers, what is the correct action to take?',
      options: [
        'Start a completely new chat immediately.',
        'Accept the answer and move on.',
        'Gently remind it of its role, for example: \'Remember, you are a Socratic tutor who only asks questions.\'',
        'Ask the same question again, but louder.'
      ],
      correctAnswer: 'Gently remind it of its role, for example: \'Remember, you are a Socratic tutor who only asks questions.\'',
      explanation: 'This is an act of re-centering the context. You are reinforcing the initial instructions to guide the AI back to its intended persona.'
    },
    {
      questionText: 'Fundamentally, what is \'context management\' when interacting with an AI?',
      options: [
        'The skill of deliberately guiding the AI by providing, reinforcing, and clarifying information to keep the conversation coherent and on-task.',
        'The act of clearing the chat history after every message.',
        'A feature that automatically corrects your grammar and spelling.',
        'The process of typing as fast as the AI can respond.'
      ],
      correctAnswer: 'The skill of deliberately guiding the AI by providing, reinforcing, and clarifying information to keep the conversation coherent and on-task.',
      explanation: 'Context management is the active process of controlling what\'s in the AI\'s short-term memory to achieve a specific goal, rather than just passively having a conversation.'
    },
    {
      questionText: 'Why is creating a consistent AI persona a good way to practice context management?',
      options: [
        'It forces you to be mindful of keeping specific rules and instructions in the AI\'s active context.',
        'Personas make the AI more creative.',
        'It\'s the only way to make an AI useful.',
        'It isn\'t a good way to practice.'
      ],
      correctAnswer: 'It forces you to be mindful of keeping specific rules and instructions in the AI\'s active context.',
      explanation: 'Maintaining a persona is a great test of your ability to use techniques like priming and re-centering to ensure the AI doesn\'t lose track of its core goal.'
    }
  ];

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

      {/* Validation Quiz */}
      <section className="mt-8">
        <ModuleQuizzes questions={quizQuestions} />
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
