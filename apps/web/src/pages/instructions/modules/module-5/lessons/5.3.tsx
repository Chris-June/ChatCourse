import { Zap, Sliders, Rocket, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LessonTemplate from '@/components/layouts/LessonTemplate';
import { useRef } from 'react';
import InlineChat, {
  InlineChatHandle,
  ChallengeChecklistItem,
} from '@/components/InlineChat';
import KeyTakeaways from '@/pages/instructions/components/KeyTakeaways';
import BestPractices from '@/pages/instructions/components/BestPractices';
import LatencyFlowInfographic from '@/pages/instructions/components/LatencyFlowInfographic';
import StreamingVisualizer from '@/pages/instructions/components/StreamingVisualizer';
import ModelTierGuesser from '@/pages/instructions/components/ModelTierGuesser';
import ApiCostEstimator from '@/pages/instructions/components/ApiCostEstimator';
import ParameterSliders from '@/pages/instructions/components/ParameterSliders';
import ModuleQuizzes from '@/pages/instructions/modules/ModuleQuizzes/ModuleQuizzes';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Lesson5_3() {
  const inlineChatRef = useRef<InlineChatHandle>(null);

  const handleExampleClick = (text: string) => {
    inlineChatRef.current?.setPromptText(text);
  };

  const classificationAgentPrompt = `
  You are an expert AI software consultant. Your job is to recommend the best language model tier for a user's task.

  Model Tiers:
  - Tier 1 (Fast & Light): GPT-4o-mini. Cost: $0.15/M tokens. Best for simple, high-volume tasks like classification, extraction, or chatbots where speed is critical and reasoning is minimal.
  - Tier 2 (Balanced): GPT-4.1-mini. Cost: $1/M tokens. A good default for most tasks requiring solid reasoning, summarization, and multi-step instructions without needing maximum power.
  - Tier 3 (Powerful): GPT-4.1. Cost: $5/M tokens. The most powerful model for complex reasoning, deep analysis, and tasks requiring near-human-level understanding, like legal analysis or advanced code generation.

  When a user describes their task, first, clarify any ambiguities. Then, recommend a tier and JUSTIFY your choice based on the task's complexity, required speed, and cost implications. Be concise and clear.
`;

  const modelSelectionChecklist: ChallengeChecklistItem[] = [
    {
      id: '1',
      text: 'Ask about a task requiring high accuracy (e.g., legal analysis).',
      completed: false,
    },
    {
      id: '2',
      text: 'Ask about a task requiring high speed (e.g., real-time transcription).',
      completed: false,
    },
    {
      id: '3',
      text: 'Ask about a task that is very cost-sensitive (e.g., a free hobby project).',
      completed: false,
    },
  ];

  const quizQuestions = [
    {
      questionText:
        "What is the main benefit of streaming an AI's response token by token?",
      options: [
        'It makes the model generate the full response faster.',
        "It improves the user's *perception* of speed by showing activity immediately.",
        'It uses fewer tokens overall.',
        'It guarantees a more accurate response.',
      ],
      correctAnswer:
        "It improves the user's *perception* of speed by showing activity immediately.",
      explanation:
        'Streaming gives the user immediate feedback, making the application feel much more responsive, even if the total generation time is the same.',
    },
    {
      questionText:
        'For which of the following tasks would the most powerful (and expensive) model like GPT-4.1 be most appropriate?',
      options: [
        'Extracting keywords from a user review.',
        'Powering a simple customer service chatbot.',
        'Analyzing a complex legal contract for potential risks.',
        'Checking for spelling and grammar in an email.',
      ],
      correctAnswer:
        'Analyzing a complex legal contract for potential risks.',
      explanation:
        'High-stakes, complex reasoning tasks like legal analysis justify the cost and latency of the most powerful models. Using them for simple tasks is inefficient.',
    },
  ];

  return (
    <LessonTemplate
      moduleNumber={5}
      lessonNumber={3}
      title="Performance, Latency, and Cost"
      subtitle="Balancing Speed and Spend in AI Applications"
    >
      <div className="space-y-6 text-card-foreground">
        <div className="bg-muted/30 border border-muted rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-2">Estimated time: 12–16 minutes</p>
          <h3 className="font-semibold text-foreground mb-2">What you'll learn</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>How streaming improves perceived latency</li>
            <li>Choosing the right model tier for the job</li>
            <li>Cost-aware design: caching and request strategies</li>
          </ul>
        </div>
        <p className="text-muted-foreground">
          A brilliant AI that's too slow or too expensive is a failed product.
          In the real world, performance is a feature. This lesson covers the
          critical trade-offs between model capability, response speed
          (latency), and API cost, giving you the framework to build practical,
          production-ready AI applications.
        </p>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <Zap className="w-5 h-5 mr-2 text-primary" />
                The Need for Speed: Latency & Streaming
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                Users expect instant feedback. Waiting several seconds for a
                response is a poor experience. The single most important
                technique to combat this is{' '}
                <strong className="text-foreground">streaming</strong>. By
                sending back the response token-by-token as it's generated, the
                app feels alive and responsive.
              </p>
              <LatencyFlowInfographic />
              <StreamingVisualizer />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <Sliders className="w-5 h-5 mr-2 text-primary" />
                Choosing Your Engine: Model Tiers
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                Not all tasks are created equal. Using a top-tier model for a
                simple job is like using a sledgehammer to crack a nut—slow,
                expensive, and unnecessary. Matching the model to the task is
                key to managing cost and latency.
              </p>
              {/* Sampling parameter education UI */}
              <ParameterSliders />
              <ModelTierGuesser />
              <ApiCostEstimator />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <Rocket className="w-5 h-5 mr-2 text-primary" />
                Your Turn: Pick the Right Engine
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                Now you're the consultant. Describe a task for an AI, and our
                specialized agent will recommend the best model tier. Pay
                attention to its reasoning.
              </p>
              <div className="flex flex-wrap gap-2 my-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleExampleClick(
                      'I need to summarize a 5-page legal document. Which model is best?'
                    )
                  }
                >
                  Summarize Legal Doc
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleExampleClick(
                      'Draft a friendly, short marketing email for a new product launch.'
                    )
                  }
                >
                  Draft Marketing Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleExampleClick(
                      "I'm building a customer service chatbot that needs to handle 10,000 queries per day. What's my best option?"
                    )
                  }
                >
                  High-Volume Chatbot
                </Button>
              </div>
              <InlineChat
                ref={inlineChatRef}
                moduleId="module-5.3-model-selection"
                placeholder="Ask for a model recommendation for your task..."
                systemPrompt={classificationAgentPrompt}
                challengeChecklist={modelSelectionChecklist}
                initialMessages={[
                  {
                    role: 'assistant',
                    content:
                      "Welcome! Describe a task, and I'll recommend the best model tier, considering speed, cost, and capability. What are you trying to build?",
                  },
                ]}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="bg-muted/30 border border-muted rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-2">You can now…</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Enable streaming to improve UX without changing total time</li>
            <li>Select an appropriate model tier for a given task</li>
            <li>Reduce latency and cost with caching and batching strategies</li>
          </ul>
        </div>

        <KeyTakeaways
          points={[
            "Streaming responses token-by-token dramatically improves the user's perception of speed.",
            "Choosing the right model tier for the task is crucial; don't use a powerful, slow model for a simple job.",
            'Caching responses for common questions is a highly effective way to reduce both latency and cost.',
            'Performance is a key part of the user experience in AI applications.',
          ]}
        />

        <BestPractices
          dos={[
            'Stream responses whenever possible to provide immediate feedback.',
            "Match the model to the task\'s complexity (e.g., use light models for classification).",
            'Implement a caching layer for frequent, identical requests.',
          ]}
          donts={[
            "Don't make users wait for a full response when you could be streaming.",
            "Don't use an expensive, high-power model for a simple task.",
            "Don't regenerate answers to the same question repeatedly.",
          ]}
        />

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
            Test your understanding of performance, latency, and cost.
          </p>
          <ModuleQuizzes questions={quizQuestions} />
        </div>
      </div>
    </LessonTemplate>
  );
}
