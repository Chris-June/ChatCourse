import {
  BarChart2,
  Beaker,
  RefreshCw,
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
import InlineChat, { InlineChatHandle } from '@/components/InlineChat';
import MetricSorter from '@/pages/instructions/components/MetricSorter';
import PromptABTester from '@/pages/instructions/components/PromptABTester';
import ModuleQuizzes from '@/pages/instructions/modules/ModuleQuizzes/ModuleQuizzes';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import { useProgressStore } from '@/store/progressStore';
import { hypothesisAssistantPrompt, hypothesisChecklist } from '@/prompts';

export default function Lesson6_3() {
  const inlineChatRef = useRef<InlineChatHandle>(null);
  const navigate = useNavigate();
  const { completeLessonWithScore } = useProgressStore();

  const quizQuestions = [
    {
      questionText:
        "Which of the following is considered a 'high-signal' metric for an AI summarization tool?",
      options: [
        'Number of daily active users.',
        'Number of summaries generated.',
        'The rate at which users accept or copy the generated summary.',
        'The color of the summarize button.',
      ],
      correctAnswer:
        'The rate at which users accept or copy the generated summary.',
      explanation:
        "This is a high-signal metric because it directly indicates that the user found the AI's output valuable and useful for their task, unlike vanity metrics like usage counts.",
    },
    {
      questionText: 'What is the primary reason for A/B testing system prompts?',
      options: [
        'To make the code more complicated.',
        'To scientifically measure whether a change to a prompt leads to a better, more desirable AI output.',
        'To randomly change the user experience.',
        'To increase the number of daily active users.',
      ],
      correctAnswer:
        'To scientifically measure whether a change to a prompt leads to a better, more desirable AI output.',
      explanation:
        'A/B testing provides data-driven evidence, allowing you to move beyond guessing and know for sure if a prompt change is a genuine improvement.',
    },
    {
      questionText:
        'A well-formed hypothesis for an AI experiment should ideally follow what structure?',
      options: [
        "'If we build it, they will come.'",
        "'By changing X, we will improve Y, because Z.'",
        "'Let's try changing the prompt and see what happens.'",
        "'We need to get more users next month.'",
      ],
      correctAnswer: "'By changing X, we will improve Y, because Z.'",
      explanation:
        'This structure creates a clear, testable statement that identifies the change (X), the expected outcome (Y), and the reasoning behind it (Z).',
    },
    {
      questionText:
        'The iterative improvement cycle described in the lesson is best summarized as:',
      options: [
        'Build, launch, and forget.',
        'Guess, change, and hope for the best.',
        'Measure, test, learn, and adapt.',
        'Design, build, and ship.',
      ],
      correctAnswer: 'Measure, test, learn, and adapt.',
      explanation:
        'This cycle emphasizes a continuous process of gathering data (measure), running experiments (test), gaining insights (learn), and using those insights to make the product better (adapt).',
    },
    {
      questionText:
        'Why is it often effective to start with A/B testing the system prompt?',
      options: [
        'Because it requires rewriting the entire application.',
        'Because it is often the slowest and most expensive change to make.',
        'Because it is a fast, low-cost way to significantly influence the AI\'s behavior and user experience.',
        "Because system prompts have no effect on the AI's output.",
      ],
      correctAnswer:
        "Because it is a fast, low-cost way to significantly influence the AI's behavior and user experience.",
      explanation:
        'Changing the prompt is a high-leverage activity; small text changes can produce dramatic improvements without requiring complex code changes.',
    },
  ]

  

  return (
    <LessonTemplate
      moduleNumber={6}
      lessonNumber={3}
      title="The Chef's Secret: Iterative Improvement"
      subtitle="How to measure, test, and refine your AI to turn a good product into a great one."
    >
      <div className="space-y-6 text-card-foreground">
        <div className="bg-muted/30 border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-2">Estimated time: 12–16 minutes</p>
          <h3 className="font-semibold text-foreground mb-2">What you'll learn</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Setting goals and metrics for AI improvement</li>
            <li>Forming testable hypotheses and A/B designs</li>
            <li>Running iterative experiments with clear readouts</li>
          </ul>
        </div>
        {/* Myth vs Reality */}
        <section className="bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">Myth vs. Reality</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-background border border-border rounded-lg p-3">
              <h4 className="font-semibold text-destructive mb-1">Myth</h4>
              <p className="text-sm text-muted-foreground">“More usage always means the product is better.”</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-3">
              <h4 className="font-semibold text-success mb-1">Reality</h4>
              <p className="text-sm text-muted-foreground">High‑signal metrics (e.g., accept/copy rate) matter more than vanity metrics. A/B tests validate real improvements.</p>
            </div>
          </div>
        </section>
        <p className="text-muted-foreground">
          A great AI product is like a Michelin-star dish. It doesn't just
          appear fully formed. It's the result of countless small adjustments—a
          pinch more salt, a little less heat. This process of iterative
          improvement is what separates good AI from truly great AI. This lesson
          will teach you how to be the master chef of your own AI.
        </p>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <BarChart2 className="w-5 h-5 mr-2 text-primary" />
                Choosing the Right Ingredients to Measure
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                A chef doesn't measure success by how many plates they serve (a
                'vanity metric'). They measure what matters: Are the plates
                clean? Are customers smiling? For your AI, you need 'high-signal'
                metrics that prove users are getting real value.
              </p>
              <MetricSorter />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <Beaker className="w-5 h-5 mr-2 text-primary" />
                The A/B Taste Test
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                How does a chef know if adding saffron will improve a dish? They
                do a taste test. A/B testing is your taste test for AI. The
                easiest 'ingredient' to change is the system prompt. This
                simulation shows how a small prompt tweak can be scientifically
                tested.
              </p>
              <PromptABTester />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <RefreshCw className="w-5 h-5 mr-2 text-primary" />
                Refining the Recipe Based on Feedback
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                If diners consistently leave the garnish, the chef removes it.
                The data from your metrics and A/B tests is your customer
                feedback. Use it to refine your recipe. This continuous cycle of
                tasting, testing, and adapting is what turns a good product into
                a great one.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="p-6 bg-card border border-border rounded-lg">
          <div className="flex items-center mb-4">
            <Beaker className="w-6 h-6 mr-3 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">
              Your Turn: Form an Improvement Hypothesis
            </h3>
          </div>
          <p className="text-muted-foreground mb-6">
            A good experiment starts with a clear hypothesis. Use the chat
            window below. Describe an AI feature, and the AI will help you
            formulate a testable hypothesis, define a key metric, and create an
            A/B test.
          </p>
          <InlineChat
            ref={inlineChatRef}
            moduleId="module-6.3-hypothesis-testing"
            placeholder="Try: Let's improve an AI that summarizes articles."
            systemPrompt={hypothesisAssistantPrompt}
            initialMessages={[
              {
                role: 'assistant',
                content:
                  "Welcome to the Hypothesis Testing Workshop! I'll help you design an experiment to improve an AI feature.\n\nTo get started, describe an AI feature you'd like to improve. For example: \"I want to improve an AI that generates code documentation.\"",
              },
            ]}
            challengeChecklist={hypothesisChecklist}
          />
        </div>

        <div className="bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-2">You can now…</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Define a clear goal and single high-signal metric</li>
            <li>Write a hypothesis and outline control vs. variant</li>
            <li>Plan quick iterations and measure results responsibly</li>
          </ul>
        </div>

        {/* Mini‑Glossary */}
        <section className="bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">Mini‑Glossary</h3>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li><strong>High‑Signal Metric:</strong> A metric closely tied to user value (e.g., accept rate) rather than vanity counts.</li>
            <li><strong>A/B Test:</strong> An experiment that compares a control and a variant to measure causal impact.</li>
            <li><strong>Hypothesis:</strong> A testable statement linking change (X) to an outcome (Y) with a reason (Z).</li>
          </ul>
        </section>

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
            Test your understanding of these experimentation principles.
          </p>
          <ModuleQuizzes
            questions={quizQuestions}
            onComplete={(score, total) => {
              completeLessonWithScore(6, 3, score, total);
              navigate('/instructions/module-7/7.1');
            }}
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button asChild variant="outline">
            <Link to="/instructions/module-6/6.2">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Link>
          </Button>
          <Button asChild>
            <Link to="/instructions/module-7/7.1">
              Next Module
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </LessonTemplate>
  );
}
