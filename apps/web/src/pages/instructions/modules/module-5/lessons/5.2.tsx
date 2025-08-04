import { Bot, Scale, Puzzle, Package, BookOpen } from 'lucide-react';
import LessonTemplate from '@/components/layouts/LessonTemplate';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import InlineChat, {
  ChallengeChecklistItem,
} from '@/components/InlineChat';
import KeyTakeaways from '@/pages/instructions/components/KeyTakeaways';
import BestPractices from '@/pages/instructions/components/BestPractices';
import ModuleQuizzes from '@/pages/instructions/modules/ModuleQuizzes/ModuleQuizzes';
import PromptPersonalizationSandbox from '@/pages/instructions/components/PromptPersonalizationSandbox';
import PersonalizationComparison from '@/pages/instructions/components/PersonalizationComparison';
import ContextDecisionGame from '@/pages/instructions/components/ContextDecisionGame';
import TokenBudgetGuide from '@/pages/instructions/components/TokenBudgetGuide';
import ContextUpdateSimulator from '@/pages/instructions/components/ContextUpdateSimulator';
import EthicalDilemma from '@/pages/instructions/components/EthicalDilemma';
import BestPracticesAudit from '@/pages/instructions/components/BestPracticesAudit';
import PersonalizedAgentBuilder from '@/pages/instructions/components/PersonalizedAgentBuilder';

export default function Lesson5_2() {
  const quizQuestions = [
    {
      questionText:
        "What is the most common technical method for personalizing an AI's responses?",
      options: [
        'Using a larger AI model.',
        'Dynamically constructing a `system` prompt using user data.',
        'Speaking to the AI in a different language.',
        'Hard-coding responses for every possible user.',
      ],
      correctAnswer:
        'Dynamically constructing a `system` prompt using user data.',
      explanation:
        "The lesson explains that injecting user profile information into a system prompt template is the primary way to tailor the AI's behavior at scale.",
    },
    {
      questionText:
        'What is the key difference between `static` and `dynamic` context in personalization?',
      options: [
        'Static context changes with every message, while dynamic context does not.',
        'Static context is general and user-defined (e.g., tone preference), while dynamic context is task-specific and injected by the application (e.g., current item being viewed).',
        'Static context is for the user, and dynamic context is for the assistant.',
        'There is no difference; the terms are interchangeable.',
      ],
      correctAnswer:
        'Static context is general and user-defined (e.g., tone preference), while dynamic context is task-specific and injected by the application (e.g., current item being viewed).',
      explanation:
        'Static context provides broad, reusable instructions based on user preferences, whereas dynamic context provides immediate, situational information for the current task.',
    },
  ];

  const systemPrompt = `You are an expert Biology tutor. The student's name is Maria, a 10th grader who is a visual learner. Your goal is to help her with her homework on cell division for an upcoming exam. Be encouraging and use visual descriptions or analogies where possible.`;

  const checklistItems: ChallengeChecklistItem[] = [
    {
      id: '1',
      text: 'AI addressed me by my name, Maria.',
      completed: false,
    },
    {
      id: '2',
      text: 'AI acknowledged that I am a visual learner.',
      completed: false,
    },
    {
      id: '3',
      text: 'AI used a visual analogy to explain a concept.',
      completed: false,
    },
    {
      id: '4',
      text: 'AI maintained an encouraging and helpful tone.',
      completed: false,
    },
  ];

  return (
    <LessonTemplate
      moduleNumber={5}
      lessonNumber={2}
      title="Personalizing the Prompt"
      subtitle="From One-Size-Fits-All to Tailor-Made"
    >
      <div className="space-y-6 text-card-foreground">
        <p className="text-muted-foreground">
          A generic AI is useful, but a personalized AI is a game-changer.
          Personalization transforms a general-purpose tool into a bespoke
          assistant that understands a user's unique needs, preferences, and
          context. This lesson explores how to achieve this by dynamically
          crafting the system prompt.
        </p>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <Bot className="w-5 h-5 mr-2 text-primary" />
                The Blueprint for Personalization
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                Personalization isn't magic; it's just-in-time context. We use
                a template for the{' '}
                <code className="font-mono bg-muted p-1 rounded">system</code>{' '}
                prompt and inject user-specific data right before making the API
                call. This creates a unique set of instructions for every
                interaction.
              </p>
              <PromptPersonalizationSandbox />
              <PersonalizationComparison />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <Scale className="w-5 h-5 mr-2 text-primary" />
                Static vs. Dynamic Context
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                Effective personalization often involves two types of context:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Static Context:</strong>{' '}
                  General, user-defined data that rarely changes (e.g., name,
                  preferred language, communication style).
                </li>
                <li>
                  <strong className="text-foreground">Dynamic Context:</strong>{' '}
                  Task-specific, situational data injected by the application
                  (e.g., the current document being edited, the item in a
                  shopping cart).
                </li>
              </ul>
              <ContextDecisionGame />
              <TokenBudgetGuide />
              <ContextUpdateSimulator />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <Puzzle className="w-5 h-5 mr-2 text-primary" />
                Your Turn: Interact with a Personalized Tutor
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                Let's see personalization in action. The AI below has been given
                a dynamic system prompt based on a student profile. Pretend you
                are Maria. Ask for help with your biology homework and see how
                the AI responds.
              </p>
              <InlineChat
                moduleId="module-5.2-personalized-tutor"
                systemPrompt={systemPrompt}
                challengeChecklist={checklistItems}
                placeholder='Try asking: "Can you help me understand mitosis?"'
                initialMessages={[
                  {
                    role: 'assistant',
                    content: `Hi Maria! I'm here to help you with your Biology exam on cell division. Since you're a visual learner, I'll include diagrams and analogies to help you understand better. What specific topic would you like to review first?`,
                  },
                ]}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <KeyTakeaways
          points={[
            'Personalization is primarily achieved by dynamically constructing a `system` prompt with user data.',
            'Static context is general and user-defined (e.g., tone preference), while dynamic context is task-specific (e.g., current item being viewed).',
            'Data privacy and user control are critical ethical considerations for personalization.',
            'The goal of personalization is to make AI responses more relevant, useful, and adapted to the individual.',
          ]}
        />

        <div className="p-6 bg-muted border border-border rounded-lg mt-6">
          <div className="flex items-center mb-4">
            <Package className="w-6 h-6 mr-3 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">
              Best Practices & Ethical Considerations
            </h3>
          </div>
          <p className="text-muted-foreground mb-6">
            With great power comes great responsibility. Personalization
            requires a commitment to user privacy and ethical data handling.
          </p>
          <BestPractices
            dos={[
              'Be transparent about what data you collect and why.',
              'Provide clear, accessible settings for users to manage their data.',
              'Securely protect all user data.',
            ]}
            donts={[
              "Don't collect more data than is necessary for the personalization feature.",
              "Don't use personal data in ways the user hasn't consented to.",
              "Don't make it difficult for users to opt-out of personalization.",
            ]}
          />
          <EthicalDilemma />
          <BestPracticesAudit />
        </div>

        <PersonalizedAgentBuilder />

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
            Test your understanding of prompt personalization.
          </p>
          <ModuleQuizzes questions={quizQuestions} />
        </div>
      </div>
    </LessonTemplate>
  );
}