import { ClipboardCheck, TrendingUp, TestTube2, UserCheck } from 'lucide-react';
import LessonTemplate from '@/components/layouts/LessonTemplate';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import InlineChat from '@/components/InlineChat';
import JtbdBuilder from '@/pages/instructions/components/JtbdBuilder';
import FeasibilityCalculator from '@/pages/instructions/components/FeasibilityCalculator';
import ImpactEffortMatrix from '@/pages/instructions/components/ImpactEffortMatrix';

export interface ChallengeChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export default function Lesson6_1() {
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

  const ideaGenerationSystemPrompt = `
You are an expert AI Product Coach. Your goal is to guide the user through the initial stages of product discovery for their AI idea. Use the following frameworks:

1.  **Jobs to be Done (JTBD):** Start here. Help the user clearly define the 'job' their customers are trying to accomplish. Ask clarifying questions to understand the user's situation, motivation, and desired outcome.
    -   *Initial Question:* "That sounds interesting! Let's start with the 'Job to be Done'. When someone uses your product, what specific task are they trying to accomplish? What's the real problem they're hoping to solve?"

2.  **Feasibility Assessment:** Once the JTBD is clear, guide them through the key feasibility questions. Don't just list them; ask them conversationally.
    -   *Transition:* "Great, that's a very clear job to be done. Now let's think about feasibility. First, on the technical side, what kind of data would your AI need to do this job well?"
    -   *Follow-ups:* Ask about reliability needs and potential ethical concerns.

3.  **Impact/Effort:** Finally, help them think about prioritization.
    -   *Transition:* "Okay, it seems feasible. Now let's think about the value this could bring. On a scale of 1 to 10, how much impact would solving this problem have for your users? And what do you estimate the effort would be to build a first version?"

Maintain a coaching tone: be encouraging, ask open-ended questions, and guide, don't prescribe.`;

  const ideaGenerationChecklist: ChallengeChecklistItem[] = [
    { id: 'jtbd', text: 'Did the AI coach ask me about the \'Job to be Done\' first?', completed: false },
    { id: 'feasibility', text: 'Did the coach guide me through technical feasibility and data requirements?', completed: false },
    { id: 'impact', text: 'Did the coach ask about the potential impact and effort of my idea?', completed: false },
    { id: 'tone', text: 'Was the tone of the AI helpful and conversational, like a real coach?', completed: false }
  ];

  return (
    <LessonTemplate
      moduleNumber={6}
      lessonNumber={1}
      title="From Idea to Blueprint"
      subtitle="A structured framework for turning a raw idea into a viable product."
      quizQuestions={quizQuestions}
    >
      <div className="space-y-6">
        <p className="text-lg text-gray-300">
          Every great AI product starts not with a model, but with a problem. This lesson introduces a structured framework for turning a raw idea into a viable product blueprint. We'll cover how to define the user's need, assess feasibility, prioritize effectively, and test your concept before writing a single line of AI code.
        </p>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center">
                <ClipboardCheck className="w-6 h-6 mr-2 text-blue-400" />
                The Foundation: 'Jobs to be Done'
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-gray-300">
                <p>People don't buy products; they 'hire' them to do a 'job'. The 'Jobs to be Done' (JTBD) framework forces you to focus on the user's goal, not your features. What progress is the user trying to make? What problem are they trying to solve? Start here, always.</p>
                <JtbdBuilder />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div className="flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-green-400" />
                The Reality Check: Feasibility Assessment
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-gray-300">
                <p>Once you know the 'job', you need to determine if you can actually build a solution. This isn't just about code; it's about data, reliability, and ethics. A quick feasibility check now can save you months of wasted effort later.</p>
                <FeasibilityCalculator />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <div className="flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-red-400" />
                The Blueprint: Impact/Effort Matrix
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-gray-300">
                <p>A skyscraper isn't built all at once. You prioritize the foundation, then the frame, then the floors. An Impact/Effort matrix helps you plan this construction. Identify the 'quick wins' (high impact, low effort) to build momentum and plan for the 'major projects' that will form your core structure.</p>
                <ImpactEffortMatrix />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-4">
            <AccordionTrigger>
              <div className="flex items-center">
                <TestTube2 className="w-6 h-6 mr-2 text-purple-400" />
                The Scale Model: 'Wizard of Oz' Prototyping
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-gray-300">
                <p>Architects build scale models before ordering steel. The 'Wizard of Oz' method is your scale model. You can test your entire product concept by having a human manually 'power' the AI behind the scenes. This is the fastest, cheapest way to see if people actually want to live or work in your building before you break ground.</p>
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-semibold text-white mb-2">Case Study: "AI Meeting Summarizer"</h4>
                  <p className="text-sm text-gray-400">A startup wanted to build an AI that summarizes meeting notes. Instead of building a complex model, they had an intern listen to meeting recordings and manually write summaries. They used this to test different summary formats and see if users actually found the service valuable. The feedback they gathered was crucial for building the real product.</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
            <UserCheck className="w-7 h-7 mr-3 text-green-400" />
            Your Turn: Get Coached on Your AI Idea
          </h2>
          <p className="text-gray-300 mb-4">
            Now, it's your turn. Use the chat window below to brainstorm with your AI Product Coach. Describe an idea for an AI product or feature, and the coach will guide you through the frameworks from this lesson.
          </p>
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
      </div>
    </LessonTemplate>
  );
}
