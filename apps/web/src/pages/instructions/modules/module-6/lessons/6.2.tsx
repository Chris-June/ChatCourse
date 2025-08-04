import {
  TestTube2,
  ShieldCheck,
  Percent,
  Scale,
  Users,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import LessonTemplate from '@/components/layouts/LessonTemplate';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import InlineChat, {
  ChallengeChecklistItem,
  InlineChatHandle,
} from '@/components/InlineChat';
import AiTrustMeter from '@/pages/instructions/components/AiTrustMeter';
import UncertaintyVisualizer from '@/pages/instructions/components/UncertaintyVisualizer';
import BiasExplorer from '@/pages/instructions/components/BiasExplorer';
import { Link } from 'react-router-dom';
import ModuleQuizzes from '@/pages/instructions/modules/ModuleQuizzes/ModuleQuizzes';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

export default function Lesson6_2() {
  const inlineChatRef = useRef<InlineChatHandle>(null);

  const quizQuestions = [
    {
      questionText:
        "The principle of 'designing for collaboration, not command' encourages us to...",
      options: [
        'Make the AI give orders to the user.',
        'Create a partnership where the user feels in control and the AI acts as a helpful assistant.',
        "Hide the AI's capabilities from the user.",
        'Ensure the AI always makes the final decision.',
      ],
      correctAnswer:
        'Create a partnership where the user feels in control and the AI acts as a helpful assistant.',
      explanation:
        "A well-trained guide dog doesn't just follow orders; it collaborates with its owner to navigate the world safely. Your AI should do the same. The goal is a partnership where the user feels in control, and the AI provides helpful guidance.",
    },
    {
      questionText:
        'Which of the following best builds user trust through transparency and control?',
      options: [
        "Hiding all of the AI's reasoning.",
        'Providing an explanation for *why* the AI made a suggestion and allowing the user to correct it.',
        'Never allowing the user to disagree with the AI.',
        "Making the AI's responses as mysterious as possible.",
      ],
      correctAnswer:
        'Providing an explanation for *why* the AI made a suggestion and allowing the user to correct it.',
      explanation:
        "You trust a service animal because you understand its training and can guide it. The same goes for AI. Build trust by being transparent—show users *why* the AI made a suggestion and give them control to offer corrections.",
    },
    {
      questionText: 'Why is it important to design for uncertainty in AI?',
      options: [
        "To make the AI seem more human by being unsure.",
        'Because AI is probabilistic, and communicating its confidence level helps users decide how much to rely on its output.',
        'To make the user interface more complex.',
        'Because all AIs are always 100% certain about their answers.',
      ],
      correctAnswer:
        'Because AI is probabilistic, and communicating its confidence level helps users decide how much to rely on its output.',
      explanation:
        "A good trainer knows the difference between a confident bark and a nervous whimper. Your AI needs to communicate its own uncertainty. Is it 95% sure or 55% sure? Clearly showing the AI's confidence level helps users decide how much to trust a specific suggestion.",
    },
  ];

  const designCritiquePrompt = `
    You are an expert AI Design Critic. Your goal is to help me, a student, improve the design of an AI feature I propose. Use the principles from the lesson to guide your critique.

    When I describe my feature, ask me clarifying questions based on these four principles:

    1.  **Collaboration vs. Command:** Ask me how the user and AI will work together. Is the AI a tool the user controls, or a boss giving orders? How does the user give feedback?
        -   *Example Question:* "How does the user stay in control in your design? Can they ignore or modify the AI's suggestions?"

    2.  **Trust and Transparency:** Ask me how the design builds user trust. How does it explain its reasoning? Is it clear what the AI can and cannot do?
        -   *Example Question:* "How would your design explain *why* it recommended a particular movie? What happens if it's wrong?"

    3.  **Designing for Uncertainty:** Ask me how the interface communicates the AI's confidence. Is it clear when the AI is making a confident guess versus a wild stab in the dark?
        -   *Example Question:* "How will the user know how confident the AI is in its movie suggestion? Will it show a percentage, or use different language?"

    4.  **Fairness and Bias:** Ask me to consider potential biases. What data would the AI need? Could that data lead to unfair outcomes for certain groups of people?
        -   *Example Question:* "What kind of biases could a movie recommendation AI have? How could you design it to recommend a diverse and inclusive set of films?"

    Keep your tone constructive and inquisitive. Your goal is to help me think more deeply about my own design.`;

  const designCritiqueChecklist: ChallengeChecklistItem[] = [
    {
      id: 'collaboration',
      text: "Did the AI critic ask about the user's goal (collaboration)?",
      completed: false,
    },
    {
      id: 'trust',
      text: 'Did the critic explore how to build trust (transparency/control)?',
      completed: false,
    },
    {
      id: 'fairness',
      text: 'Did the critic check for potential fairness issues (bias)?',
      completed: false,
    },
    {
      id: 'constructive',
      text: 'Was the critique constructive and helpful?',
      completed: false,
    },
  ];

  return (
    <LessonTemplate
      moduleNumber={6}
      lessonNumber={2}
      title="Training Your AI Companion"
      subtitle="Principles for Designing Collaborative and Trustworthy AI"
    >
      <div className="space-y-6 text-card-foreground">
        <p className="text-muted-foreground">
          Building an AI is like training a powerful, intelligent animal. It's
          not just about teaching it tricks; it's about building a relationship
          based on trust, communication, and clear boundaries. This lesson
          covers the core principles of Human-Computer Interaction (HCI) for AI,
          ensuring your creation is a helpful partner, not an unpredictable
          beast.
        </p>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Collaboration, Not Command
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                A well-trained guide dog doesn't just follow orders; it
                collaborates with its owner to navigate the world safely. Your
                AI should do the same. The goal is a partnership where the user
                feels in control, and the AI provides helpful guidance.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <ShieldCheck className="w-5 h-5 mr-2 text-primary" />
                The 'Good Boy!' Principle: Building Trust
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                You trust a service animal because you understand its training
                and can guide it. The same goes for AI. Build trust by being
                transparent—show users *why* the AI made a suggestion. Give
                them control to offer corrections.
              </p>
              <AiTrustMeter />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <Percent className="w-5 h-5 mr-2 text-primary" />
                Reading the Cues: Is Its Tail Wagging or Tucked?
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                A good trainer knows the difference between a confident bark and
                a nervous whimper. Your AI needs to communicate its own
                uncertainty. Is it 95% sure or 55% sure? Clearly showing the
                AI's confidence level helps users decide how much to trust a
                specific suggestion.
              </p>
              <UncertaintyVisualizer />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <Scale className="w-5 h-5 mr-2 text-primary" />
                Ensuring the Animal is Friendly to Everyone
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                You would never train a service animal to be aggressive towards
                certain types of people. Similarly, an AI trained on biased
                data can produce unfair or harmful outcomes. Designing for
                fairness is an ethical responsibility.
              </p>
              <BiasExplorer />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="p-6 bg-card border border-border rounded-lg">
          <div className="flex items-center mb-4">
            <TestTube2 className="w-6 h-6 mr-3 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">
              Your Turn: Get a Design Critique
            </h3>
          </div>
          <p className="text-muted-foreground mb-6">
            Now it's your turn to be the designer. Think of an AI feature (e.g.,
            an AI that suggests vacation spots). Describe how the user would
            interact with it in the chat below. Your AI Design Critic will ask
            you questions to help you improve your design.
          </p>
          <InlineChat
            ref={inlineChatRef}
            moduleId="module-6.2-design-critique"
            placeholder="Start by describing your AI feature..."
            systemPrompt={designCritiquePrompt}
            initialMessages={[
              {
                role: 'assistant',
                content:
                  "Welcome to your AI Design Critique session! To get started, describe your AI feature in detail. I'll ask questions to help you think through the user experience, trust factors, and potential biases in your design.",
              },
            ]}
            challengeChecklist={designCritiqueChecklist}
          />
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
            Test your understanding of these design principles.
          </p>
          <ModuleQuizzes questions={quizQuestions} />
        </div>

        <div className="flex justify-between pt-4">
          <Button asChild variant="outline">
            <Link to="/instructions/module-6/6.1">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button asChild>
            <Link to="/instructions/module-6/6.3">
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </LessonTemplate>
  );
}
