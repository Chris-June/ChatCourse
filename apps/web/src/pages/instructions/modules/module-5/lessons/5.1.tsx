import { MessageSquare, BrainCircuit, Lightbulb, AlertTriangle, TestTube2 } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import LessonTemplate from '@/components/layouts/LessonTemplate';
import ContextExplorer from '@/pages/instructions/components/ContextExplorer';
import DebuggingChallenge from '@/pages/instructions/components/DebuggingChallenge';
import SystemPromptLab from '@/pages/instructions/components/SystemPromptLab';
import ContextWindowVisualizer from '@/pages/instructions/components/ContextWindowVisualizer';
import ContextCaseStudies from '@/pages/instructions/components/ContextCaseStudies';
import RoleScriptingSandbox from '@/pages/instructions/components/RoleScriptingSandbox';
import FailedPrompts from '@/pages/instructions/components/FailedPrompts';
import KeyTakeaways from '../../../components/KeyTakeaways';
import BestPractices from '../../../components/BestPractices';
import CheckpointQuiz from '../../../components/CheckpointQuiz';

export default function Lesson5_1() {
  const keyTakeawaysData = [
    'Context is King: Conversation history provides the AI with short-term memory, which is essential for coherent dialogue.',
    'Defined Roles: Every message has a `role` (`system`, `user`, or `assistant`) to structure the conversation.',
    'The Director\'s Note: The `system` prompt sets the AI\'s persona and overarching instructions.',
    'Quality In, Quality Out: The AI\'s performance is directly tied to the clarity and accuracy of the context you provide.',
    'Finite Memory: Be mindful of the model\'s \'context window\'—the maximum amount of information it can process at once.',
  ];

  const bestPracticesData = {
    dos: [
      'Keep the conversation history clean and well-structured.',
      'Use the `system`, `user`, and `assistant` roles correctly and consistently.',
      'For long conversations, develop a strategy to summarize or trim the history to stay within the context window.',
    ],
    donts: [
      'Don\'t send corrupted or inaccurate data in the history; this will degrade performance.',
      'Don\'t mislabel roles, as this will confuse the model.',
      'Don\'t exceed the context window without a plan, as the model will \'forget\' early parts of the conversation.',
    ],
  };
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
                <p className="text-lg text-gray-300">
                  Before we dive into advanced prompting techniques, we must master the single most important concept in conversational AI: <strong>context</strong>. This isn't just a feature; it is the absolute foundation upon which all meaningful AI interaction is built. Without context, an AI has no memory, no understanding of nuance, and no ability to hold a coherent conversation. It becomes a simple, stateless tool that responds to one-off queries. Mastering context is the key to unlocking the true power of AI, transforming it from a glorified search engine into a dynamic, intelligent partner. The message of this entire lesson is simple: <strong>Context is EVERYTHING</strong>.
                </p>
                <p className="text-gray-300 mb-4">
                  Think of every conversation with an AI as a movie scene. The script is the conversation history. Without it, your lead actor (the AI) has severe short-term memory loss. It can only remember the very last line spoken and has no idea what the scene is about. By providing the full script—the entire back-and-forth—with every new line, you ensure the actor is always in character and the scene makes sense.
                </p>
                <p className="text-gray-300 mb-4">
                  This script is the bedrock of conversational intelligence. It's how an AI can answer a follow-up question like "Why?" or remember a user's preference mentioned five messages ago. Each turn of the conversation adds a new page to the script, enriching the context and allowing for increasingly nuanced and relevant interactions. Just as a director wouldn't film a scene out of order, you must provide a clean, chronological history to get a coherent performance from your AI.
                </p>
                <p className="text-gray-300 mb-4">
                  To put it bluntly: every advanced prompting technique you will learn—from chain-of-thought to complex agentic workflows—is fundamentally useless without a solid grasp of context management. An AI's value is not in its raw intelligence, but in its ability to apply that intelligence to the specific situation you provide. The quality of your context directly dictates the quality of the AI's output.
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-blue-300 mb-3">Advanced Topic: Production-Scale Context Management</h3>
                <p className="text-gray-300 mb-4">
                  In real-world applications, conversations often grow too large for the model's context window. Simply truncating the history (cutting off the oldest messages) is a crude solution that can cause the AI to lose critical information. Production systems use more sophisticated techniques:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li><strong>Summarization:</strong> As the conversation grows, a separate AI call can summarize the earlier parts of the dialogue. This compressed summary is then fed back into the context, preserving key information while saving space.</li>
                  <li><strong>Retrieval-Augmented Generation (RAG):</strong> For knowledge-intensive tasks, you don't stuff documents into the prompt. Instead, you use a database of information (vector store). When a user asks a question, the system first searches the database for relevant chunks of text and injects only those pieces into the context. This provides targeted, relevant knowledge without overwhelming the context window.</li>
                </ul>
                <ContextCaseStudies />
                <div className="mt-4">
                  <ContextWindowVisualizer />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="my-6">
          <CheckpointQuiz
            question={quizQuestions[0].questionText}
            options={quizQuestions[0].options}
            correctAnswerIndex={quizQuestions[0].options.findIndex(opt => opt === quizQuestions[0].correctAnswer)}
            explanation={quizQuestions[0].explanation}
          />
        </div>

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
              <p className="text-gray-300 mb-4">
                The <strong>`system`</strong> role is the most powerful player in this scene: the Director. This isn't just a line of dialogue; it's the core instruction that governs the entire performance. The director's note might be, "You are a cynical film noir detective from the 1940s," or "You are an enthusiastic science teacher who loves using analogies." This single prompt sets the AI's personality, its boundaries, and its objective for the whole conversation. It's the 'motivation' an actor receives before the cameras start rolling.
              </p>
              <p className="text-gray-300 mb-2">A well-structured script, guided by a clear director's note, ensures the AI actor never forgets its lines or motivation:</p>
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

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-blue-300 mb-3">System Prompt Styles: A Comparative Breakdown</h3>
                <p className="text-gray-300 mb-4">
                  The 'system' prompt is your most powerful tool for shaping the AI's personality and goals. The style you choose has a massive impact on its behavior. Consider these common archetypes:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li><strong>The Helper:</strong> Direct, clear, and focused on a specific task. (e.g., "You are a helpful assistant that translates technical jargon into plain English.")</li>
                  <li><strong>The Critic:</strong> Designed to challenge assumptions and provide constructive feedback. (e.g., "You are a skeptical editor. Your goal is to find logical fallacies and weak arguments in the user's text.")</li>
                  <li><strong>The Creative:</strong> Open-ended and encouraging of novel ideas. (e.g., "You are a brainstorming partner. No idea is too wild. Generate ten unconventional solutions to the user's problem.")</li>
                </ul>
                <RoleScriptingSandbox />
                <FailedPrompts />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="my-6">
          <CheckpointQuiz
            question={quizQuestions[1].questionText}
            options={quizQuestions[1].options}
            correctAnswerIndex={quizQuestions[1].options.findIndex(opt => opt === quizQuestions[1].correctAnswer)}
            explanation={quizQuestions[1].explanation}
          />
        </div>

        <p className="text-lg text-gray-300 font-semibold text-center p-4 my-6 bg-gray-800 rounded-lg border border-blue-800">
          Remember: An AI knows nothing outside of the context you provide. The more clear, relevant, and well-structured the context, the more valuable the AI becomes.
        </p>

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
              <p className="text-gray-300 mb-4">
                This structure is not just a suggestion; it's the blueprint for how the AI perceives the world. Getting it right is the key to unlocking complex, multi-turn behaviors.
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

        <KeyTakeaways points={keyTakeawaysData} />

        <BestPractices dos={bestPracticesData.dos} donts={bestPracticesData.donts} />



      </div>
    </LessonTemplate>
  );
}

