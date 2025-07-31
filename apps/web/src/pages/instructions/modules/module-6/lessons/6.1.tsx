import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Lightbulb, ClipboardCheck, TrendingUp, TestTube2, UserCheck } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';
import Accordion from '../../../components/Accordion';
import JtbdBuilder from '../../../components/JtbdBuilder';
import FeasibilityCalculator from '../../../components/FeasibilityCalculator';
import ImpactEffortMatrix from '../../../components/ImpactEffortMatrix';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

const Lesson6_1: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What is the primary goal of the \'Jobs to be Done\' (JTBD) framework?',
      options: [
        'To focus on technology features first.',
        'To focus on solving a specific user problem or \'job\'.',
        'To choose the cheapest AI model available.',
        'To build a prototype as quickly as possible.'
      ],
      correctAnswer: 'To focus on solving a specific user problem or \'job\'.',
      explanation: 'JTBD forces you to start with the user\'s need, not the technology, leading to more valuable and successful products.'
    },
    {
      questionText: 'Which of the following is NOT one of the key feasibility dimensions discussed in the lesson?',
      options: [
        'Technical Feasibility (Can we build it?)',
        'Data Requirements (Do we have the right data?)',
        'Marketing Strategy (How will we advertise it?)',
        'Reliability Needs (How perfect does it need to be?)'
      ],
      correctAnswer: 'Marketing Strategy (How will we advertise it?)',
      explanation: 'While marketing is important for a product, the feasibility assessment in this context focuses on the technical and ethical viability of building the AI itself.'
    },
    {
      questionText: 'What is the main purpose of an Impact/Effort matrix?',
      options: [
        'To calculate the exact cost of a project.',
        'To help prioritize ideas by identifying quick wins and planning for major projects.',
        'To test the user interface of an application.',
        'To choose which programming language to use.'
      ],
      correctAnswer: 'To help prioritize ideas by identifying quick wins and planning for major projects.',
      explanation: 'The matrix provides a visual way to categorize ideas, helping teams make strategic decisions on what to work on next based on potential value versus required effort.'
    },
    {
      questionText: 'The \'Wizard of Oz\' prototyping method involves...',
      options: [
        'Building a fully functional AI model for testing.',
        'Manually faking the AI\'s responses to test a product idea with users before building the technology.',
        'Hiring an intern to write the code for you.',
        'Using a magical AI that can build any product instantly.'
      ],
      correctAnswer: 'Manually faking the AI\'s responses to test a product idea with users before building the technology.',
      explanation: 'This technique allows you to get valuable user feedback on an idea\'s usefulness and user experience with minimal upfront investment in engineering.'
    },
    {
      questionText: 'According to the lesson, what is the best starting point for brainstorming a new AI product?',
      options: [
        'Finding the biggest available dataset.',
        'Starting with the user\'s problem (Jobs to be Done).',
        'Listing all the features of the latest AI model.',
        'Copying a competitor\'s product.'
      ],
      correctAnswer: 'Starting with the user\'s problem (Jobs to be Done).',
      explanation: 'The core principle of the lesson is that successful products are built to solve real user needs, not just to showcase technology.'
    }
  ];

  const { completeLesson } = useProgressStore();

  const ideaGenerationSystemPrompt = `
    You are an AI Product Coach. Your goal is to help me, a student, think through a new AI product idea using the frameworks from this lesson. 

    When I propose an idea, guide me through the following three steps:

    1.  **Jobs to be Done (JTBD):** Ask me to frame the idea as a JTBD statement. Help me refine it by asking clarifying questions about the user's situation, motivation, and desired outcome. Nudge me to be specific.

    2.  **Feasibility:** Ask me to consider the technical feasibility, data requirements, and necessary reliability. Prompt me with questions like, "What existing AI models could power this?", "Where would you get the data for this, and is it ethical to use?", and "How critical is it that the AI is 100% correct? What's the cost of a mistake?"

    3.  **Prioritization:** Once we've fleshed out the idea, ask me where I think it would fall on an Impact/Effort matrix and why. Encourage me to think about both user impact and business impact.

    Keep your responses encouraging, concise, and focused on coaching. End each response with a question to keep the conversation moving.
  `;

  const ideaGenerationChecklist = [
    { text: 'I have a clear Jobs to be Done statement that follows the "When... I want to... so I can..." format', completed: false },
    { text: 'I have considered the technical feasibility of my idea', completed: false },
    { text: 'I have thought about the data requirements and ethical considerations', completed: false },
    { text: 'I have evaluated where my idea falls on the Impact/Effort matrix', completed: false },
    { text: 'I have received feedback on how to improve my idea', completed: false }
  ];

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white flex items-center">
          <Lightbulb className="w-10 h-10 mr-4 text-yellow-400" />
          Lesson 6.1: Blueprint to Skyscraper
        </h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-5/5.1" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Debugging & Iteration
          </Link>
          <Link 
            to="/instructions/module-6/6.2" 
            onClick={() => completeLesson(6, 1)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next: Design Thinking <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        You don't build a skyscraper by just stacking bricks. You start with a blueprint. This lesson is your architectural guide to building AI products, taking you from a foundational idea to a validated prototype. We'll cover the essential stages: defining the building's purpose (Jobs to be Done), checking the ground conditions (Feasibility), planning the construction phases (Prioritization), and building a scale model (Prototyping).
      </p>

      <Accordion title="1. Brainstorming with 'Jobs to be Done'" icon={<Lightbulb className="w-6 h-6 mr-2 text-yellow-400" />} isInitiallyOpen>
        <div className="space-y-4 text-gray-300">
          <p>Instead of starting with "What cool thing can AI do?", the best products start by asking, "What job does my user need to get done?" This is the core of the "Jobs to be Done" (JTBD) framework. It forces you to focus on user problems, not just technology features. A successful AI product is a 'hireable' solution for a specific, painful job.</p>
          <p>A good JTBD statement has a clear structure: <strong>When... I want to... so I can...</strong></p>
          <JtbdBuilder />
        </div>
      </Accordion>

      <Accordion title="The Blueprint: What 'Job' is Your Skyscraper For?" icon={<ClipboardCheck className="w-6 h-6 mr-2 text-green-400" />} isInitiallyOpen>
        <div className="space-y-4 text-gray-300">
          <p>Before laying a foundation, an architect must know if they're designing a hospital, an office, or a home. The 'Jobs to be Done' framework is about defining that purpose. What 'job' are users 'hiring' your AI product to do? This interactive tool will help you craft a clear JTBD statement.</p>
          <JtbdBuilder />
        </div>
      </Accordion>

      <Accordion title="The Ground Conditions: Assessing Feasibility" icon={<ClipboardCheck className="w-6 h-6 mr-2 text-orange-400" />} isInitiallyOpen>
        <div className="space-y-4 text-gray-300">
          <p>You can't build a skyscraper on a swamp. A feasibility check is your geological survey. Do you have the right materials (data)? Is the technology strong enough (technical feasibility)? How safe does it need to be (reliability)? Use this calculator to assess the viability of your idea.</p>
          <FeasibilityCalculator />
        </div>
      </Accordion>

      <Accordion title="Construction Phases: What to Build First?" icon={<TrendingUp className="w-6 h-6 mr-2 text-cyan-400" />} isInitiallyOpen>
        <div className="space-y-4 text-gray-300">
          <p>A skyscraper isn't built all at once. You prioritize the foundation, then the frame, then the floors. An Impact/Effort matrix helps you plan this construction. Identify the 'quick wins' (high impact, low effort) to build momentum and plan for the 'major projects' that will form your core structure.</p>
          <ImpactEffortMatrix />
        </div>
      </Accordion>

      <Accordion title="The Scale Model: 'Wizard of Oz' Prototyping" icon={<TestTube2 className="w-6 h-6 mr-2 text-purple-400" />} isInitiallyOpen>
        <div className="space-y-4 text-gray-300">
          <p>Architects build scale models before ordering steel. The 'Wizard of Oz' method is your scale model. You can test your entire product concept by having a human manually 'power' the AI behind the scenes. This is the fastest, cheapest way to see if people actually want to live or work in your building before you break ground.</p>
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-white mb-2">Case Study: "AI Meeting Summarizer"</h4>
            <p className="text-sm text-gray-400">A startup wanted to build an AI that summarizes meeting notes. Instead of building a complex model, they had an intern listen to meeting recordings and manually write summaries. They used this to test different summary formats and see if users actually found the service valuable. The feedback they gathered was crucial for building the real product.</p>
          </div>
        </div>
      </Accordion>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <UserCheck className="w-7 h-7 mr-3 text-green-400" />
          Your Turn: Get Coached on Your AI Idea
        </h2>
        <p className="text-gray-300 mb-4">
          Now, it's your turn. Use the chat window below to brainstorm with your AI Product Coach. Describe an idea for an AI product or feature, and the coach will guide you through the frameworks from this lesson.
        </p>
        {/* InlineChat for AI-powered product idea coaching */}
        <InlineChat 
          moduleId="module-6.1-idea-generation"
          maxAttempts={5}
          maxFollowUps={4}
          placeholder='Try starting with: "I have an idea for an AI that helps with..."'
          systemPrompt={ideaGenerationSystemPrompt}
          initialMessages={[
            {
              role: 'assistant',
              content: 'Welcome to your AI Product Coaching session! I\'m here to help you develop your AI product idea using the frameworks from this lesson.\n\nTo get started, tell me about your idea. You can start with something like: "I have an idea for an AI that helps with..."\n\nI\'ll guide you through refining your idea using the Jobs to be Done framework, assessing its feasibility, and helping you prioritize it.'
            }
          ]}
          challengeChecklist={ideaGenerationChecklist}
        />
      </section>

      {/* Validation Quiz */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Check Your Understanding</h2>
        <ModuleQuizzes questions={quizQuestions} />
      </section>

      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-5/5.3" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Race Car Engineering
        </Link>
        <Link 
          to="/instructions/module-6/6.2" 
          onClick={() => completeLesson(6, 1)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Design Thinking <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson6_1;
