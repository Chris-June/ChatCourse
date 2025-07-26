import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageSquare, BrainCircuit, Lightbulb, AlertTriangle, Star, TestTube2 } from 'lucide-react';
import Accordion from '../../../components/Accordion';
import ContextExplorer from '../../../components/ContextExplorer';
import DebuggingChallenge from '../../../components/DebuggingChallenge';
import SystemPromptLab from '../../../components/SystemPromptLab';
import { useProgressStore } from '../../../../../store/progressStore';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';


const Lesson5_1: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What is the primary purpose of sending the conversation history with each new user message?',
      options: [
        'To make the AI\'s response slower.',
        'To provide the AI with \'context\' or short-term memory.',
        'To log the user\'s data for advertising.',
        'To check for spelling errors.'
      ],
      correctAnswer: 'To provide the AI with \'context\' or short-term memory.',
      explanation: 'The history allows the AI to understand follow-up questions and maintain a coherent dialogue, acting as its memory for the current conversation.'
    },
    {
      questionText: 'In the standard conversation structure, what are the three main `role` types?',
      options: [
        '`human`, `robot`, `observer`',
        '`input`, `output`, `error`',
        '`user`, `assistant`, `system`',
        '`client`, `server`, `database`'
      ],
      correctAnswer: '`user`, `assistant`, `system`',
      explanation: 'These three roles define who is speaking: the end-user, the AI itself, and a high-level instruction that guides the AI\'s behavior.'
    },
    {
      questionText: 'What is the function of the `system` role in a conversation?',
      options: [
        'It represents the last message sent by the user.',
        'It provides a high-level instruction to set the AI\'s persona and rules for the entire conversation.',
        'It indicates an error message from the server.',
        'It is the AI\'s final response.'
      ],
      correctAnswer: 'It provides a high-level instruction to set the AI\'s persona and rules for the entire conversation.',
      explanation: 'The system prompt is a powerful tool for guiding the AI\'s tone, personality, and constraints throughout the dialogue (e.g., \'You are a pirate\').'
    },
    {
      questionText: 'What does the term \'context window\' refer to?',
      options: [
        'The pop-up window where the chat appears.',
        'The maximum amount of text (history + new prompt) that a model can process at one time.',
        'The time limit for a user to respond.',
        'The physical size of the monitor.'
      ],
      correctAnswer: 'The maximum amount of text (history + new prompt) that a model can process at one time.',
      explanation: 'All models have a finite limit to their short-term memory. If a conversation becomes too long, older messages must be dropped, which can lead to the AI \'forgetting\' earlier parts of the dialogue.'
    },
    {
      questionText: 'The principle of \'Garbage In, Garbage Out\' means that...',
      options: [
        'The AI will always give a bad response.',
        'The quality of the AI\'s response is directly impacted by the quality and accuracy of the conversation history provided.',
        'The AI can fix any errors in the conversation history.',
        'You should not use a system prompt.'
      ],
      correctAnswer: 'The quality of the AI\'s response is directly impacted by the quality and accuracy of the conversation history provided.',
      explanation: 'If the context sent to the model is messy, incomplete, or contains errors, the model\'s subsequent response will likely be flawed as well.'
    }
  ];

  const { completeLesson } = useProgressStore();
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">5.1: Multi-Turn Conversations & Context</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-4/4.6" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-5/5.2" 
            onClick={() => completeLesson(5, 1)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next: Personalization <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        A multi-turn conversation is a dialogue that spans multiple exchanges between a user and an AI. This is the foundation of building truly interactive and intelligent systems, as it allows the AI to remember previous parts of the conversation and use that information as context for future responses.
      </p>

      <Accordion title="The Power of Context" icon={<BrainCircuit />} isInitiallyOpen>
        <p className="text-gray-300 mb-4">
          Without memory, an AI would treat every message as a brand new, isolated request. It wouldn't be able to answer follow-up questions, understand pronouns like "it" or "they," or build upon previously discussed ideas. Maintaining context is what separates a simple command-response system from a genuine conversational partner.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Analogy: A Short-Term Memory</h3>
          <p className="text-gray-300">
            Think of the conversation history as the AI's short-term memory. With each new message you send, you are also sending the previous messages along with it. This allows the model to see the full picture and provide a response that is relevant, coherent, and intelligent.
          </p>
        </div>
      </Accordion>

      <Accordion title="The Structure of a Conversation" icon={<MessageSquare />}>
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
        <p className="text-gray-300 mt-4 mb-2">The `role` is crucial for helping the model understand the flow of dialogue:</p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li><strong>`user`</strong>: Represents messages from the person interacting with the AI.</li>
          <li><strong>`assistant`</strong>: Represents the AI's own previous responses.</li>
          <li><strong>`system`</strong>: (Optional) A high-level instruction that sets the persona and rules for the AI throughout the conversation (e.g., "You are a helpful assistant who always responds in rhyme.").</li>
        </ul>
      </Accordion>

      <Accordion title="Interactive Exercise: The Debugging Challenge" icon={<AlertTriangle />}>
        <p className="text-gray-300 mb-4">
          Reading about pitfalls is one thing; fixing them is another. In this challenge, you'll be presented with broken conversation histories. Your task is to identify the bug.
        </p>
        <DebuggingChallenge />
      </Accordion>

      <Accordion title="Interactive Demo: The Context Explorer" icon={<Lightbulb />}>
        <p className="text-gray-300 mb-4">
          This interactive demo visualizes the concept of conversation history. On the left, you have a standard chat interface. On the right, you can see the actual array of message objects that gets sent to the model with every turn. Watch how it grows as you interact with the bot!
        </p>
        <ContextExplorer />
      </Accordion>

      <Accordion title="Hands-on: The System Prompt Lab" icon={<TestTube2 />}>
        <p className="text-gray-300 mb-4">
          The <code className='bg-gray-700 p-1 rounded'>system</code> prompt is the most powerful tool for guiding an AI. This lab lets you experiment with different system prompts to see their effect on the AI's personality and responses. Try one of the presets or write your own!
        </p>
        <SystemPromptLab />
      </Accordion>

      <Accordion title="Key Takeaways" icon={<Star />}>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li><strong>Context is King:</strong> A conversation's history is sent with every new message, acting as the AI's short-term memory.</li>
          <li><strong>Roles Define the Flow:</strong> The `user`, `assistant`, and `system` roles are essential for the model to understand the dialogue structure.</li>
          <li><strong>Manage the Window:</strong> All models have a finite context window. You must have a strategy to handle long conversations to prevent information loss.</li>
          <li><strong>Garbage In, Garbage Out:</strong> The quality of your conversation history directly impacts the quality of the AI's responses. Errors in the history will lead to errors in the output.</li>
        </ul>
      </Accordion>

      {/* Validation Quiz */}
      <section className="mt-8">
        <ModuleQuizzes questions={quizQuestions} />
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-4/4.6" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous
        </Link>
        <Link 
          to="/instructions/module-5/5.2" 
          onClick={() => completeLesson(5, 1)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Personalization <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson5_1;
