import React from 'react';
import { Target, Bot } from 'lucide-react';
import SocraticTutorProject from '../../../components/SocraticTutorProject';
import { useProgressStore } from '../../../../../store/progressStore';
import Accordion from '../../../components/Accordion';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';
import LessonHeader from '../../../../../components/layouts/LessonHeader';
import LessonFooter from '../../../../../components/layouts/LessonFooter';

const challengeChecklist = [
  { text: "AI maintains 'Gnosi' persona (responds as a tutor named Gnosi)", completed: false },
  { text: "AI avoids giving direct answers (only asks guiding questions)", completed: false },
  { text: "AI asks logical, guiding questions that help you think deeper", completed: false },
  { text: "Successfully re-center the AI when it gives answers instead of questions", completed: false },
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
      <LessonHeader 
        title="2.3: Project: The Socratic Tutor"
        subtitle="Apply your context management skills to build and maintain a consistent AI persona."
      />

      <p className="text-lg text-gray-300">
        It's time to put your new skills to the test! This project challenges you to use this very chat interface to create and maintain a consistent AI persona over multiple turns. This is about practicing context management: the skill of deliberately guiding the AI by providing, reinforcing, and clarifying information to keep the conversation coherent and on-task.
      </p>

      

      <Accordion
        title="Project Objective"
        icon={<Target className="w-7 h-7 mr-3 text-green-400" />}
        isInitiallyOpen
      >
        <p className="text-gray-300">
          Your mission is to create a 'Socratic Tutor' persona. This AI's goal is to teach a concept not by giving answers directly, but by asking guiding questions to help you discover the answer yourself. This requires careful context management to remember the topic, your progress, and its own persona.
        </p>
      </Accordion>

      <Accordion
        title="Step 1: Define the Persona (The System Prompt)"
        icon={<Bot className="w-7 h-7 mr-3 text-purple-400" />}
      >
        <p className="text-gray-300 mb-4">
          Start a new chat and use your first message to set the stage. This first message is called a system prompt. It's the foundational instruction that the AI will refer back to throughout the entire conversation to remember its role and rules. This is the most critical step.
        </p>
        <p className="text-gray-300 mb-4">
          Your first message to the AI is critical. It sets the 'persona' and rules for the entire conversation. Use the "Load System Prompt" button in the project workspace below to load the starting prompt.
        </p>
      </Accordion>

      {/* Project Workspace */}
      <section className="bg-gray-900/50 p-6 rounded-lg shadow-lg border-2 border-dashed border-blue-500/50">
        <p className="text-gray-300 mb-4">
        <strong>Project Objective:</strong> Create a Socratic tutor persona that guides users through learning concepts by asking thoughtful questions rather than providing direct answers. Your system prompt should establish this role clearly and provide specific instructions on how to respond.
      </p>
      
      <p className="text-gray-300 mb-4">
          <strong>Your Challenge:</strong> Use the project workspace below to complete the exercise. Start by loading the system prompt, then guide the AI to teach you a topic of your choice. Your goal is to keep the AI in its Socratic persona. The checklist will track your progress in managing the AI's context.
        </p>
        <SocraticTutorProject 
          challengeChecklist={challengeChecklist}
          systemPrompt="You are Gnosi, a Socratic Tutor. Your goal is to help me understand a topic by only asking guiding questions. Never give direct answers. Start by asking me what I want to learn about."
        />
      </section>

      {/* Validation Quiz */}
      <section className="mt-8">
        <ModuleQuizzes questions={quizQuestions} />
      </section>

      {/* Navigation */}
      <LessonFooter 
        prevLessonPath="/instructions/module-2/2.2"
        prevLessonTitle="2.2: Keeping Conversations Coherent"
        nextLessonPath="/instructions/module-3"
        nextLessonTitle="Module 3: Advanced Prompting Techniques"
        onNextClick={() => completeLesson(2, 3)}
      />
    </div>
  );
};

export default Lesson2_3;
