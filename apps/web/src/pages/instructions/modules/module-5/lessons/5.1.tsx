import { MessageSquare, BrainCircuit, Lightbulb, AlertTriangle, Star, TestTube2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import LessonTemplate from '@/components/layouts/LessonTemplate';
import ContextExplorer from '@/pages/instructions/components/ContextExplorer';
import DebuggingChallenge from '@/pages/instructions/components/DebuggingChallenge';
import SystemPromptLab from '@/pages/instructions/components/SystemPromptLab';

export default function Lesson5_1() {
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

  return (
    <LessonTemplate
      moduleNumber={5}
      lessonNumber={1}
      title="The Director's Script: Mastering AI Conversation"
      subtitle="Think of every AI conversation as a movie scene. For the scene to make sense, the actors need a script to follow. In the world of AI, this 'script' is the conversation history."
      quizQuestions={quizQuestions}
    >
      <div className="space-y-8">
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center">
                <BrainCircuit className="w-5 h-5 mr-2" />
                The Power of Context
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-300 mb-4">
                Without memory, an AI would treat every message as a brand new, isolated request. It wouldn't be able to answer follow-up questions, understand pronouns like "it" or "they," or build upon previously discussed ideas. Maintaining context is what separates a simple command-response system from a genuine conversational partner.
              </p>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h3 className="font-semibold text-white mb-2">Analogy: A Short-Term Memory</h3>
                <p className="text-gray-300">
                  Think of the conversation history as the AI's short-term memory. With each new message you send, you are also sending the previous messages along with it. This allows the model to see the full picture and provide a response that is relevant, coherent, and intelligent.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                The Director's Script: Anatomy of a Conversation
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-300 mb-4">
                The conversation history is a structured script—an array of message objects. Each object has a `role` (who is speaking) and `content` (what was said). This script provides the full context for the AI's next line.
              </p>
              <p className="text-gray-300 mb-2">The cast of characters in our script includes:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300 mb-4">
                <li><strong>`user` (The Protagonist):</strong> The person driving the story forward.</li>
                <li><strong>`assistant` (The Co-Star):</strong> The AI's previous lines, essential for continuity.</li>
                <li><strong>`system` (The Director's Note):</strong> A powerful, high-level instruction that sets the scene. It tells the AI its motivation, personality, and the rules it must follow. For example: `"You are a cynical film noir detective from the 1940s."`</li>
              </ul>
              <p className="text-gray-300 mb-2">A well-structured script ensures the AI actor never forgets its lines or motivation:</p>
              <div className="bg-gray-900 p-4 rounded-md font-mono text-sm text-gray-200">
                <code className="block whitespace-pre-wrap break-words">
{`[
  {
    "role": "system",
    "content": "You are a helpful assistant who loves history."
  },
  {
    "role": "user",
    "content": "What is the capital of France?"
  },
  {
    "role": "assistant",
    "content": "Ah, Paris! A city rich with history. It's the capital of France."
  },
  {
    "role": "user",
    "content": "What is its population?"
  }
]`}
                </code>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                The Cutting Room Floor: A Debugging Challenge
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-300 mb-4">
                Even the best directors make mistakes. Sometimes, the script gets corrupted—roles are mislabeled, or lines are out of order. This is the "bad take." In this challenge, you're the editor. Find the continuity errors in these broken scripts and fix them.
              </p>
              <DebuggingChallenge />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-4">
            <AccordionTrigger>
              <div className="flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Live Rehearsal: The Context Explorer
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-300 mb-4">
                Watch the script get written in real-time! As you chat on the left, you'll see the raw message array—our script—being built on the right. This reveals exactly what the AI "sees" at every moment of the conversation. Notice how the script grows, and how every new line depends on the ones before it.
              </p>
              <ContextExplorer />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-5">
            <AccordionTrigger>
              <div className="flex items-center">
                <TestTube2 className="w-5 h-5 mr-2" />
                Director's Chair: The System Prompt Lab
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-300 mb-4">
                You are the director. The <code className='bg-gray-700 p-1 rounded'>system</code> prompt is your chance to give powerful, scene-setting instructions to your AI actor. Use this lab to experiment. Direct the AI to be a pirate, a scientist, or a poet. See how a single, well-crafted sentence can completely change the tone and direction of the entire performance.
              </p>
              <SystemPromptLab />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-6">
            <AccordionTrigger>
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                The Director's Golden Rules
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li><strong>The Script is Sacred:</strong> The conversation history is the AI's only source of truth. A clean, well-structured script leads to a great performance.</li>
                <li><strong>Every Role Matters:</strong> Use the `user`, `assistant`, and `system` roles correctly to build a coherent narrative for the AI.</li>
                <li><strong>Respect the Scroll's Length:</strong> Every model has a finite context window (the length of the script it can read). For long scenes, you'll need a strategy to summarize or trim the script to avoid the AI forgetting its opening lines.</li>
                <li><strong>Bad Takes Lead to Bad Scenes:</strong> The principle of "Garbage In, Garbage Out" is paramount. A corrupted script (e.g., with incorrect roles or content) will ruin the performance.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

      </div>
    </LessonTemplate>
  );
}


