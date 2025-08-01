import React from 'react';
import { Repeat, Anchor, AlertTriangle } from 'lucide-react';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import Accordion from '../../../components/Accordion';
import SummarizationChallenge from '../../../components/SummarizationChallenge';
import ExplicitReferencesTabs from '../../../components/ExplicitReferencesTabs';
import ContextContaminationDemo from '../../../components/ContextContaminationDemo';
import InstructionPriming from '../../../components/InstructionPriming';
import CommonPitfalls from '../../../components/CommonPitfalls';
import InlineChat from '../../../../../components/InlineChat';

const initialConversation = [
  {
    role: 'user' as const,
    content: 'You are a marketing copywriter for a tech startup. Write an engaging \'About Us\' page for a new company called \'Innovate Inc.\' that builds AI-powered productivity tools. Focus on our mission to eliminate tedious tasks and unlock human creativity. Keep the tone inspiring and forward-looking.'
  },
  {
    role: 'assistant' as const,
    content: `At Innovate Inc., we believe your potential is limitless. But the reality is, tedious, repetitive tasks can stifle the very creativity that drives progress. That\'s why we\'re here.\n\nOur mission is to build intelligent tools that melt away the mundane. We create AI-powered productivity software that automates the boring, streamlines the complex, and liberates you to focus on what truly matters: the big ideas, the game-changing strategies, and the creative breakthroughs that only you can deliver.\n\nWe\'re not just building apps; we\'re crafting a future where technology serves as a true partner in your success, clearing the path for you to innovate, create, and achieve the extraordinary. Welcome to the future of productivity. Welcome to Innovate Inc.`
  }
];

const challengeChecklist = [
  { text: 'Summarize the initial marketing copy in your own words.', completed: false },
  { text: 'Ask for three alternative headlines based on the summary.', completed: false },
  { text: 'Reference the mission to \'unlock human creativity\' in a follow-up question.', completed: false },
];

const quizQuestions = [
  {
    questionText: 'What is the main purpose of the \'Summarize and Re-center\' technique?',
    options: [
      'To make the conversation longer.',
      'To test the AI\'s reading comprehension.',
      'To reinforce the most important context and guide the AI\'s next response.',
      'To get a written record of the chat.'
    ],
    correctAnswer: 'To reinforce the most important context and guide the AI\'s next response.',
    explanation: 'Summarizing helps you re-focus the AI on the key details, especially in a long conversation where earlier context might be lost.'
  },
  {
    questionText: 'Using an \'explicit reference\' like \'Based on the second headline you suggested...\' is effective because it:',
    options: [
      'Is more polite than just giving a command.',
      'Directs the AI\'s attention to a specific piece of information in the context window.',
      'Makes your prompt sound more professional.',
      'Confuses the AI with too much detail.'
    ],
    correctAnswer: 'Directs the AI\'s attention to a specific piece of information in the context window.',
    explanation: 'Explicit references act like anchors, helping the AI pinpoint the exact information you want it to use from the previous conversation.'
  },
  {
    questionText: 'When is it a good idea to start a fresh conversation?',
    options: [
      'After every three messages.',
      'When the AI makes a minor spelling mistake.',
      'When the conversation has become confused or \'contaminated\' with irrelevant details.',
      'Whenever you change the topic slightly.'
    ],
    correctAnswer: 'When the conversation has become confused or \'contaminated\' with irrelevant details.',
    explanation: 'If the AI is consistently misunderstanding or bringing in wrong information, the context is likely polluted. Starting fresh is often the fastest way to get back on track.'
  },
  {
    questionText: 'What is \'Instruction Priming\'? ',
    options: [
      'Giving the AI a pep talk before you start.',
      'Telling the AI about your instructions multiple times.',
      'Setting up the AI\'s role, goal, and constraints at the very beginning of a conversation.',
      'Asking the AI to summarize your instructions.'
    ],
    correctAnswer: 'Setting up the AI\'s role, goal, and constraints at the very beginning of a conversation.',
    explanation: 'Priming sets the stage for the entire conversation, ensuring the AI has the foundational context it needs to perform its role effectively from the start.'
  },
  {
    questionText: 'A common pitfall in long conversations is assuming the AI remembers everything. What technique directly helps prevent this?',
    options: [
      'Using shorter sentences.',
      'Typing in all caps.',
      'Periodically summarizing key points to keep them in the active context window.',
      'Asking the AI if it is tired.'
    ],
    correctAnswer: 'Periodically summarizing key points to keep them in the active context window.',
    explanation: 'Because the context window is finite, you can\'t assume early details are still remembered. Summarizing brings important information back into the AI\'s short-term memory.'
  }
];

const Lesson2_2: React.FC = () => {
  return (
    <LessonTemplate
      moduleNumber={2}
      lessonNumber={2}
      title="2.2: Keeping Conversations Coherent"
      subtitle="Learn to actively manage the AI's context to prevent confusion and keep your conversations on track."
      quizQuestions={quizQuestions}
    >
      <div className="space-y-8">
        <p className="text-lg text-gray-300">
          Now that you understand the AI's "memory" is a finite context window, let's learn how to actively manage it. Context contamination happens when irrelevant or conflicting details from earlier in the conversation start to confuse the AI, leading to off-topic or incorrect responses. These techniques will help you keep your conversations on track, even when tackling complex, multi-step problems.
        </p>

        <InstructionPriming />

        <Accordion 
          title="Technique 1: Summarize and Re-center"
          icon={<Repeat className="w-7 h-7 mr-3 text-blue-400" />}
          isInitiallyOpen
        >
          <SummarizationChallenge />
        </Accordion>

        <Accordion 
          title="Technique 2: Use Explicit References"
          icon={<Anchor className="w-7 h-7 mr-3 text-blue-400" />}
        >
          <ExplicitReferencesTabs />
        </Accordion>

        <Accordion 
          title="Technique 3: Know When to Start Fresh"
          icon={<AlertTriangle className="w-7 h-7 mr-3 text-yellow-400" />}
        >
          <ContextContaminationDemo />
        </Accordion>

        <CommonPitfalls />

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">Putting It All Together: Final Challenge</h2>
          <p className="text-gray-300 mb-4">
            Now, apply all the techniques you've learned. Start by summarizing the goal regularly to keep the AI focused on your objective. Use explicit references to direct the AI to specific details, like saying 'Make the second headline you suggested more inspiring by focusing on the mission to unlock human creativity' instead of 'Make it better.' Build on previous ideas by referencing them explicitly, and start fresh when the conversation becomes confused or off-track.
          </p>
          <InlineChat 
            moduleId="module-2.2-final-challenge"
            initialMessages={initialConversation} 
            placeholder="Practice all context management techniques..." 
            challengeChecklist={challengeChecklist}
            maxFollowUps={5}
            simulatedResponse="Excellent work! You've successfully guided the conversation using all the key techniques. You summarized the goal, used explicit references to ask for alternatives, and built upon the context to refine the final output."
          />
        </div>
      </div>
    </LessonTemplate>
  );
};

export default Lesson2_2;
