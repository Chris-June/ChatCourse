import { BarChart2, Beaker, RefreshCw } from 'lucide-react';
import LessonTemplate from '@/components/layouts/LessonTemplate';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import InlineChat, { ChallengeChecklistItem } from '@/components/InlineChat';
import MetricSorter from '@/pages/instructions/components/MetricSorter';
import PromptABTester from '@/pages/instructions/components/PromptABTester';

export default function Lesson6_3() {
  const quizQuestions = [
    {
      questionText: 'Which of the following is considered a \'high-signal\' metric for an AI summarization tool?',
      options: [
        'Number of daily active users.',
        'Number of summaries generated.',
        'The rate at which users accept or copy the generated summary.',
        'The color of the summarize button.'
      ],
      correctAnswer: 'The rate at which users accept or copy the generated summary.',
      explanation: 'This is a high-signal metric because it directly indicates that the user found the AI\'s output valuable and useful for their task, unlike vanity metrics like usage counts.'
    },
    {
      questionText: 'What is the primary reason for A/B testing system prompts?',
      options: [
        'To make the code more complicated.',
        'To scientifically measure whether a change to a prompt leads to a better, more desirable AI output.',
        'To randomly change the user experience.',
        'To increase the number of daily active users.'
      ],
      correctAnswer: 'To scientifically measure whether a change to a prompt leads to a better, more desirable AI output.',
      explanation: 'A/B testing provides data-driven evidence, allowing you to move beyond guessing and know for sure if a prompt change is a genuine improvement.'
    },
    {
      questionText: 'A well-formed hypothesis for an AI experiment should ideally follow what structure?',
      options: [
        '\'If we build it, they will come.\'',
        '\'By changing X, we will improve Y, because Z.\'',
        '\'Let\'s try changing the prompt and see what happens.\'',
        '\'We need to get more users next month.\''
      ],
      correctAnswer: '\'By changing X, we will improve Y, because Z.\'',
      explanation: 'This structure creates a clear, testable statement that identifies the change (X), the expected outcome (Y), and the reasoning behind it (Z).'
    },
    {
      questionText: 'The iterative improvement cycle described in the lesson is best summarized as:',
      options: [
        'Build, launch, and forget.',
        'Guess, change, and hope for the best.',
        'Measure, test, learn, and adapt.',
        'Design, build, and ship.'
      ],
      correctAnswer: 'Measure, test, learn, and adapt.',
      explanation: 'This cycle emphasizes a continuous process of gathering data (measure), running experiments (test), gaining insights (learn), and using those insights to make the product better (adapt).'
    },
    {
      questionText: 'Why is it often effective to start with A/B testing the system prompt?',
      options: [
        'Because it requires rewriting the entire application.',
        'Because it is often the slowest and most expensive change to make.',
        'Because it is a fast, low-cost way to significantly influence the AI\'s behavior and user experience.',
        'Because system prompts have no effect on the AI\'s output.'
      ],
      correctAnswer: 'Because it is a fast, low-cost way to significantly influence the AI\'s behavior and user experience.',
      explanation: 'Changing the prompt is a high-leverage activity; small text changes can produce dramatic improvements without requiring complex code changes.'
    }
  ];

  const hypothesisAssistantPrompt = `
    You are an expert AI Experimentation Coach. Your goal is to help me, a student, formulate a strong, testable hypothesis to improve an AI feature.

    When I describe a feature, guide me through these steps:
    1.  **Identify the Goal:** First, ask me what I want to improve. Is it user satisfaction? Engagement? Task success rate? Help me define a clear goal.
    2.  **Define a Metric:** Next, help me choose a *single, high-signal metric* that represents that goal. For an article summarizer, a good metric might be 'the percentage of times a user copies the summary to their clipboard.' A bad metric would be 'number of summaries generated.'
    3.  **Formulate the Hypothesis:** Guide me to create a hypothesis in the format: "By making [CHANGE X], we will improve [METRIC Y], because [REASON Z]."
        -   *Example:* "By adding the sentence 'Summarize this in three bullet points for a busy executive' to the system prompt, we will increase the summary copy rate, because it will produce more concise and scannable outputs."
    4.  **Design the A/B Test:** Finally, ask me how I would set up the A/B test.
        -   Prompt me to define the 'control' (the current prompt) and the 'variant' (the new prompt).
        -   Ask what I would measure to determine a winner.

    Keep your tone encouraging and Socratic. Ask questions to lead me to the answers rather than just giving them to me.
  `;

  const hypothesisChecklist: ChallengeChecklistItem[] = [
    { id: 'item-1', text: 'I have identified a clear goal for my improvement.', completed: false },
    { id: 'item-2', text: 'I have chosen a single, high-signal metric to measure success.', completed: false },
    { id: 'item-3', text: 'I have formulated a testable hypothesis in the correct format.', completed: false },
    { id: 'item-4', text: 'I have described the control and variant for my A/B test.', completed: false }
  ];

  return (
    <LessonTemplate
      moduleNumber={6}
      lessonNumber={3}
      title="The Chef's Secret: Iterative Improvement"
      subtitle="How to measure, test, and refine your AI to turn a good product into a great one."
      quizQuestions={quizQuestions}
    >
      <div className="space-y-6">
        <p className="text-lg text-gray-300">
          A Michelin-star chef doesn't perfect a dish on the first try. They taste, tweak, and test relentlessly. Building a great AI product follows the same principle. It's an iterative cycle of measuring, testing, and refining your 'recipe' based on real-world feedback.
        </p>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center">
                <BarChart2 className="w-6 h-6 mr-3 text-green-400" />
                Choosing the Right Ingredients to Measure
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-gray-300">
                <p>A chef doesn't measure success by how many plates they serve (a 'vanity metric'). They measure what matters: Are the plates clean? Are customers smiling? For your AI, you need 'high-signal' metrics that prove users are getting real value. This interactive exercise will help you learn to spot them.</p>
                <MetricSorter />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div className="flex items-center">
                <Beaker className="w-6 h-6 mr-3 text-orange-400" />
                The A/B Taste Test
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-gray-300">
                <p>How does a chef know if adding saffron will improve a dish? They do a taste test. A/B testing is your taste test for AI. The easiest 'ingredient' to change is the system prompt. This simulation shows how a small prompt tweak—your new ingredient—can be scientifically tested to see if it truly improves the final dish.</p>
                <PromptABTester />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <div className="flex items-center">
                <RefreshCw className="w-6 h-6 mr-3 text-cyan-400" />
                Refining the Recipe Based on Feedback
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-gray-300">
                <p>If diners consistently leave the garnish, the chef removes it. If they ask for more spice, the chef adds it. The data from your metrics and A/B tests is your customer feedback. Use it to refine your recipe. This continuous cycle of tasting, testing, and adapting is what turns a good product into a great one.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
            <Beaker className="w-7 h-7 mr-3 text-yellow-400" />
            Your Turn: Form an Improvement Hypothesis
          </h2>
          <p className="text-gray-300 mb-4">
            A good experiment starts with a clear hypothesis. Use the chat window below to improve an AI feature. Describe the feature, and the AI will help you formulate a testable hypothesis, define a key metric, and create an A/B test to see if your change works.
          </p>
          <InlineChat 
            moduleId="module-6.3-hypothesis-testing"
            maxAttempts={5}
            maxFollowUps={4}
            placeholder="Try: Let's improve an AI that summarizes articles." 
            systemPrompt={hypothesisAssistantPrompt}
            initialMessages={[
              {
                role: 'assistant' as const,
                content: 'Welcome to the Hypothesis Testing Workshop! I\'ll help you design an experiment to improve an AI feature.\n\nTo get started, describe an AI feature you\'d like to improve. For example: "I want to improve an AI that generates code documentation."\n\nI\'ll guide you through creating a testable hypothesis, defining success metrics, and designing an A/B test.'
              }
            ]}
            challengeChecklist={hypothesisChecklist}
          />
        </section>
      </div>
    </LessonTemplate>
  );
}
