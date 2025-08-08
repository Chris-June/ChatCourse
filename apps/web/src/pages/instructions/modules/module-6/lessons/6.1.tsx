import {
  ClipboardCheck,
  TrendingUp,
  TestTube2,
  UserCheck,
  BookOpen,
  Rocket,
} from 'lucide-react';
import LessonTemplate from '@/components/layouts/LessonTemplate';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import InlineChat, {
  InlineChatHandle,
  ChallengeChecklistItem,
} from '@/components/InlineChat';
import JtbdBuilder from '@/pages/instructions/components/JtbdBuilder';
import FeasibilityCalculator from '@/pages/instructions/components/FeasibilityCalculator';
import ImpactEffortMatrix from '@/pages/instructions/components/ImpactEffortMatrix';
import ModuleQuizzes from '@/pages/instructions/modules/ModuleQuizzes/ModuleQuizzes';
import { useRef } from 'react';

export default function Lesson6_1() {
  const inlineChatRef = useRef<InlineChatHandle>(null);

  const quizQuestions = [
    {
      questionText:
        "What is the primary goal of the 'Jobs to be Done' (JTBD) framework?",
      options: [
        'To focus on technology features first.',
        "To focus on solving a specific user problem or 'job'.",
        'To choose the cheapest AI model available.',
        'To build a prototype as quickly as possible.',
      ],
      correctAnswer: "To focus on solving a specific user problem or 'job'.",
      explanation:
        "JTBD forces you to start with the user's need, not the technology, leading to more valuable and successful products.",
    },
    {
      questionText:
        'Which of the following is NOT one of the key feasibility dimensions discussed in the lesson?',
      options: [
        'Technical Feasibility (Can we build it?)',
        'Data Requirements (Do we have the right data?)',
        'Marketing Strategy (How will we advertise it?)',
        'Reliability Needs (How perfect does it need to be?)',
      ],
      correctAnswer: 'Marketing Strategy (How will we advertise it?)',
      explanation:
        'While marketing is important for a product, the feasibility assessment in this context focuses on the technical and ethical viability of building the AI itself.',
    },
    {
      questionText: 'What is the main purpose of an Impact/Effort matrix?',
      options: [
        'To calculate the exact cost of a project.',
        'To help prioritize ideas by identifying quick wins and planning for major projects.',
        'To test the user interface of an application.',
        'To choose which programming language to use.',
      ],
      correctAnswer:
        'To help prioritize ideas by identifying quick wins and planning for major projects.',
      explanation:
        'The matrix provides a visual way to categorize ideas, helping teams make strategic decisions on what to work on next based on potential value versus required effort.',
    },
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
    {
      id: 'jtbd',
      text: "Did the AI coach ask me about the 'Job to be Done' first?",
      completed: false,
    },
    {
      id: 'feasibility',
      text: 'Did the coach guide me through technical feasibility and data requirements?',
      completed: false,
    },
    {
      id: 'impact',
      text: 'Did the coach ask about the potential impact and effort of my idea?',
      completed: false,
    },
    {
      id: 'tone',
      text: 'Was the tone of the AI helpful and conversational, like a real coach?',
      completed: false,
    },
  ];

  return (
    <LessonTemplate
      moduleNumber={6}
      lessonNumber={1}
      title="From Idea to Blueprint"
      subtitle="A structured framework for turning a raw idea into a viable product."
    >
      <div className="space-y-6 text-card-foreground">
        <div className="bg-muted/30 border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-2">Estimated time: 12–16 minutes</p>
          <h3 className="font-semibold text-foreground mb-2">What you'll learn</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Turning problems into product ideas using JTBD</li>
            <li>Assessing feasibility and data needs early</li>
            <li>Prioritizing with simple impact/effort thinking</li>
          </ul>
        </div>
        <p className="text-muted-foreground">
          Every great AI product starts not with a model, but with a problem.
          This lesson introduces a structured framework for turning a raw idea
          into a viable product blueprint. We'll cover how to define the
          user's need, assess feasibility, prioritize effectively, and test
          your concept before writing a single line of AI code.
        </p>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <ClipboardCheck className="w-5 h-5 mr-2 text-primary" />
                The Foundation: 'Jobs to be Done'
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                People don't buy products; they 'hire' them to do a 'job'. The
                'Jobs to be Done' (JTBD) framework forces you to focus on the
                user's goal, not your features. What progress is the user
                trying to make? What problem are they trying to solve? Start
                here, always.
              </p>
              <JtbdBuilder />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                The Reality Check: Feasibility Assessment
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                Once you know the 'job', you need to determine if you can
                actually build a solution. This isn't just about code; it's
                about data, reliability, and ethics. A quick feasibility check
                now can save you months of wasted effort later.
              </p>
              <FeasibilityCalculator />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <Rocket className="w-5 h-5 mr-2 text-primary" />
                The Blueprint: Impact/Effort Matrix
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                A skyscraper isn't built all at once. You prioritize the
                foundation, then the frame, then the floors. An Impact/Effort
                matrix helps you plan this construction. Identify the 'quick
                wins' (high impact, low effort) to build momentum and plan for
                the 'major projects' that will form your core structure.
              </p>
              <ImpactEffortMatrix />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <TestTube2 className="w-5 h-5 mr-2 text-primary" />
                The Scale Model: 'Wizard of Oz' Prototyping
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                Architects build scale models before ordering steel. The
                'Wizard of Oz' method is your scale model. You can test your
                entire product concept by having a human manually 'power' the
                AI behind the scenes. This is the fastest, cheapest way to see
                if people actually want your product before you break ground.
              </p>
              <div className="p-4 bg-muted border border-border rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">
                  Case Study: "AI Meeting Summarizer"
                </h4>
                <p className="text-sm text-muted-foreground">
                  A startup wanted to build an AI that summarizes meeting
                  notes. Instead of building a complex model, they had an
                  intern listen to meeting recordings and manually write
                  summaries. They used this to test different summary formats
                  and see if users actually found the service valuable. The
                  feedback they gathered was crucial for building the real
                  product.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="p-6 bg-card border border-border rounded-lg">
          <div className="flex items-center mb-4">
            <UserCheck className="w-6 h-6 mr-3 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">
              Your Turn: Get Coached on Your AI Idea
            </h3>
          </div>
          <p className="text-muted-foreground mb-6">
            Now, it's your turn. Use the chat window below to brainstorm with
            your AI Product Coach. Describe an idea for an AI product or
            feature, and the coach will guide you through the frameworks from
            this lesson.
          </p>
          <InlineChat
            ref={inlineChatRef}
            moduleId="module-6.1-idea-generation"
            placeholder='Try starting with: "I have an idea for an AI that helps with..."'
            systemPrompt={ideaGenerationSystemPrompt}
            initialMessages={[
              {
                role: 'assistant',
                content:
                  "Welcome to your AI Product Coaching session! I'm here to help you develop your AI product idea using the frameworks from this lesson. To get started, tell me about your idea.",
              },
            ]}
            challengeChecklist={ideaGenerationChecklist}
          />
        </div>

        <div className="bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-2">You can now…</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Apply JTBD to clarify the user problem</li>
            <li>Outline feasibility and data requirements</li>
            <li>Use impact vs effort to prioritize next steps</li>
          </ul>
        </div>

        <div
          id="knowledge-check"
          className="p-6 bg-muted border border-border rounded-lg mt-6"
        >
          <div className="flex items-center mb-4">
            <BookOpen className="w-6 h-6 mr-3 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">
              Knowledge Check
            </h3>
          </div>
          <p className="text-muted-foreground mb-6">
            Test your understanding of product discovery frameworks.
          </p>
          <ModuleQuizzes questions={quizQuestions} />
        </div>
      </div>
    </LessonTemplate>
  );
}
