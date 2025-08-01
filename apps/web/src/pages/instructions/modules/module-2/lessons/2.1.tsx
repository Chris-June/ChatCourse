import React from 'react';
import { BrainCircuit } from 'lucide-react';
import { useProgressStore } from '../../../../../store/progressStore';
import KeyTakeaways from '../../../components/KeyTakeaways';
import ContextExplorer from '../../../components/ContextExplorer';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';
import LessonHeader from '../../../../../components/layouts/LessonHeader';
import LessonFooter from '../../../../../components/layouts/LessonFooter';

const Lesson2_1: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What does the AI\'s \'context window\' primarily represent?',
      options: [
        'The total knowledge the AI has about the world.',
        'The AI\'s short-term memory for the current conversation.',
        'The physical size of the chat window on your screen.',
        'A list of pre-approved questions you can ask.'
      ],
      correctAnswer: 'The AI\'s short-term memory for the current conversation.',
      explanation: 'The context window is like the AI\'s working memory. It holds the recent back-and-forth to understand what you\'re talking about right now.'
    },
    {
      questionText: 'How is the size of a context window measured?',
      options: [
        'In minutes and seconds.',
        'By the number of messages.',
        'In tokens (pieces of words).',
        'In megabytes (MB).'
      ],
      correctAnswer: 'In tokens (pieces of words).',
      explanation: 'AI models break text down into tokens. The context window has a fixed limit on how many tokens of the recent conversation it can hold.'
    },
    {
      questionText: 'What typically happens when a conversation gets too long and exceeds the context window?',
      options: [
        'The AI crashes and you have to restart.',
        'The AI asks you to pay for more memory.',
        'The oldest messages are \'forgotten\' to make room for new ones.',
        'The AI automatically summarizes the entire conversation.'
      ],
      correctAnswer: 'The oldest messages are \'forgotten\' to make room for new ones.',
      explanation: 'This is a crucial concept. The window has a fixed size, so to add new information, the oldest information must be dropped. This is why an AI might forget things from the beginning of a long chat.'
    },
    {
      questionText: 'Which of these is a direct result of POOR context management?',
      options: [
        'The AI builds on your previous ideas.',
        'The AI forgets what you told it just a few messages ago.',
        'The AI maintains a consistent personality.',
        'The AI successfully completes a complex, multi-step task.'
      ],
      correctAnswer: 'The AI forgets what you told it just a few messages ago.',
      explanation: 'When important context is lost, the AI loses the thread of the conversation, leading to frustrating situations where it seems to have amnesia.'
    },
    {
      questionText: 'Why is mastering the context window considered a powerful skill?',
      options: [
        'It allows you to have deep, multi-step conversations and guide the AI through complex tasks.',
        'It makes the AI respond faster.',
        'It unlocks a secret, more intelligent version of the AI.',
        'It is not a useful skill.'
      ],
      correctAnswer: 'It allows you to have deep, multi-step conversations and guide the AI through complex tasks.',
      explanation: 'By understanding the context window, you can ensure the AI has the right information at the right time to perform complex tasks and have coherent, meaningful conversations.'
    }
  ];

  const { completeLesson } = useProgressStore();
  return (
    <div className="space-y-8 p-4 md:p-6">
      <LessonHeader 
        title="2.1: The Power of Context in AI"
        subtitle="Mastering the AI's 'working memory' is the key to unlocking complex, multi-step conversations."
      />

      <p className="text-lg text-gray-300 max-w-prose">
        Have you ever had a conversation where you had to keep repeating yourself? It's frustrating. The same is true when talking to an AI. The key to a smooth, intelligent conversation is understanding and managing its 'memory'—what we call the <strong>context window</strong>.
      </p>

      {/* What is a Context Window? */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <BrainCircuit className="w-7 h-7 mr-3 text-blue-400" />
          What is a Context Window?
        </h2>
        <p className="text-gray-300 mb-4 max-w-prose">
          Think of the context window as the AI's short-term memory. It's a finite space that holds the recent back-and-forth of your conversation. Every time you send a message, the entire history is sent to the AI. This history is called the 'context'.
        </p>
        <p className="text-gray-300 mb-4 max-w-prose">
          Below is a live AI chat. As you interact with it, you can see the 'Live Context' on the right update in real-time. This is the actual array of messages being sent to the AI with every single request. This is the AI's 'memory' of your conversation. The more you chat, the larger this context grows.
        </p>
        <ContextExplorer />
      </section>

      <KeyTakeaways points={[
        'The AI has a limited "working memory" (context window) that fills up like a whiteboard',
        'When memory is full, the oldest parts of your conversation are "forgotten"',
        'You can manage this by summarizing important details in long conversations',
        'Short conversations (under ~10 messages) rarely have memory issues',
        'If the AI seems confused, gently remind it of key details from earlier'
      ]} />

      {/* Validation Quiz */}
      <section className="mt-8">
        <ModuleQuizzes questions={quizQuestions} />
      </section>

      {/* Navigation */}
      <LessonFooter 
        prevLessonPath="/instructions/module-1/1.8"
        prevLessonTitle="1.8: Module 1 Challenge"
        nextLessonPath="/instructions/module-2/2.2"
        nextLessonTitle="2.2: Keeping Conversations Coherent"
        onNextClick={() => completeLesson(2, 1)}
      />
    </div>
  );
};

export default Lesson2_1;
