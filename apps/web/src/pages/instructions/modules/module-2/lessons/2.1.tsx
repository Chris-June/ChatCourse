import React from 'react';
import { BrainCircuit, MessageSquare } from 'lucide-react';
import ContextExample from '../../../components/ContextExample';
import KeyTakeaways from '../../../components/KeyTakeaways';
import RollingWhiteboard from '../../../components/RollingWhiteboard';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';

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

  return (
    <LessonTemplate
      moduleNumber={2}
      lessonNumber={1}
      title="2.1: The Power of Context in AI"
      subtitle="Mastering the AI's 'working memory' is the key to unlocking complex, multi-step conversations."
      quizQuestions={quizQuestions}
    >
      <div className="space-y-8">
        <p className="text-lg text-gray-300 max-w-prose">
          Have you ever had a conversation where you had to keep repeating yourself? It's frustrating. The same is true when talking to an AI. The key to a smooth, intelligent conversation is understanding and managing its 'memory'—what we call the <strong>context window</strong>.
        </p>

        <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
            <BrainCircuit className="w-7 h-7 mr-3 text-blue-400" />
            What is a Context Window?
          </h2>
          <p className="text-gray-300 mb-4 max-w-prose">
            Think of the context window as the AI's short-term memory. It's a finite space that holds the recent back-and-forth of your conversation, measured in <strong>tokens</strong>, which are the basic units of text that the AI processes. A token can be a single word, part of a word, or even a single character. Every new message you send, and every response the AI gives, gets added to this window. When the window gets full, the oldest messages are 'forgotten' to make room for new ones.
          </p>
          <RollingWhiteboard />
        </section>

        <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
            <MessageSquare className="w-7 h-7 mr-3 text-purple-400" />
            Why It's Your Most Powerful Tool
          </h2>
          <p className="text-gray-300 mb-4 max-w-prose">
            Mastering the context window is the single most important skill for moving beyond simple, one-off questions. It's how you can have deep, multi-step conversations and guide the AI through complex tasks. For example, if you're building a marketing campaign, you can give the AI your brand guidelines in one message, your target audience in another, and your product details in a third. Without context, the AI would lose track of these details. With good context management, it uses all of this information to create a cohesive campaign.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-semibold text-green-400 mb-2">Effective Context Management Leads To:</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                      <li>Coherent, logical follow-up responses.</li>
                      <li>The ability to build on previous ideas.</li>
                      <li>Not having to repeat instructions.</li>
                      <li>AI adapting its tone and style to the conversation.</li>
                      <li>Successful completion of complex, multi-part tasks.</li>
                  </ul>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-semibold text-red-400 mb-2">Poor Context Management Leads To:</h4>
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

        <ContextExample />

        <KeyTakeaways points={[
          'The AI has a limited "working memory" (context window) that fills up like a whiteboard',
          'When memory is full, the oldest parts of your conversation are "forgotten"',
          'You can manage this by summarizing important details in long conversations',
          'Short conversations (under ~10 messages) rarely have memory issues',
          'If the AI seems confused, gently remind it of key details from earlier'
        ]} />
      </div>
    </LessonTemplate>
  );
};

export default Lesson2_1;
