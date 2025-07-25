import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Repeat, Anchor, AlertTriangle } from 'lucide-react';
import { useProgressStore } from '../../../../../store/progressStore';

// Interactive Lesson Components
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

const Lesson2_2: React.FC = () => {
  const { completeLesson } = useProgressStore();
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">2.2 Maintaining Coherent Conversations</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-2/2.1" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Context in AI
          </Link>
          <Link 
            to="/instructions/module-2/2.3" 
            onClick={() => completeLesson(2, 2)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next: Practical Exercises <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Now that you understand the AI's "memory" is a finite context window, let's learn how to actively manage it. These techniques will help you keep your conversations on track, even when tackling complex, multi-step problems.
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
          Now, apply all the techniques you've learned. Use the chat below to guide the AI through a multi-step task. Remember to summarize, use explicit references, and maintain a coherent conversation.
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


      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-2/2.1" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: How AI Remembers
        </Link>
        <Link 
          to="/instructions/module-2/2.3" 
          onClick={() => completeLesson(2, 2)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Your First Project <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson2_2;
