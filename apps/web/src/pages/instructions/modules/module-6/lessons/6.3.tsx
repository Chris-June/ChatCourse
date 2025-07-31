import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BarChart2, Beaker, RefreshCw } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import MetricSorter from '@/pages/instructions/components/MetricSorter';
import PromptABTester from '@/pages/instructions/components/PromptABTester';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

const Lesson6_3: React.FC = () => {
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

  const { completeLesson } = useProgressStore();
  const hypothesisAssistantPrompt = `You are an expert AI Product Manager specializing in experimentation. Your goal is to help users improve an AI feature by creating a structured experiment. When a user describes a feature they want to improve, guide them through the following steps:
1. **Hypothesis Formulation**: Help them state a clear, testable hypothesis (e.g., "By changing X, we will improve Y, because Z.").
2. **Metric Definition**: Help them define a single, key metric to measure the change (e.g., "User satisfaction score," "Correction rate," "Task completion time").
3. **A/B Test Design**: Help them outline a simple A/B test (e.g., "Group A gets the old prompt, Group B gets the new prompt. We will compare the key metric between the two groups after 1,000 interactions.").
Be encouraging and help them think critically about their ideas.`;

  const hypothesisChecklist: Array<{text: string, completed: boolean}> = [
    { text: 'I have described an AI feature I want to improve', completed: false },
    { text: 'I have formulated a clear, testable hypothesis', completed: false },
    { text: 'I have defined a key metric to measure success', completed: false },
    { text: 'I have outlined a simple A/B test design', completed: false },
    { text: 'I have received feedback on my experimental design', completed: false }
  ];
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">6.3 Iterative Improvement</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-6/6.2" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Design Thinking
          </Link>
          <Link 
            to="/instructions/module-7/7.1" 
            onClick={() => completeLesson(6, 3)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next: Function Calling <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Building an AI product isn't a one-time event; it's a continuous cycle of learning and refinement. Iterative improvement is the process of using data and user feedback to make your product better over time.
      </p>

      {/* Core Concepts */}
      <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-full space-y-4">
        <AccordionItem value="item-1" className="bg-gray-800/50 border-gray-700 border rounded-lg">
          <AccordionTrigger className="hover:no-underline p-4 text-xl font-semibold">
            <div className="flex items-center">
              <BarChart2 className="w-6 h-6 mr-3 text-green-400" />
              Step 1: Measure What Matters
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4 pt-0">
            <div className="space-y-4 text-gray-300 border-t border-gray-700 pt-4">
              <p>Don't just track clicks. For AI products, you need to measure what truly signals quality and trust. A "High Signal" metric is directly tied to the user's success and the AI's performance. A "Low Signal" or "Vanity" metric might look good on a dashboard but doesn't tell you if the product is actually working well.</p>
              <p>Try it yourself. Can you sort these common metrics into the right buckets?</p>
              <MetricSorter />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="bg-gray-800/50 border-gray-700 border rounded-lg">
          <AccordionTrigger className="hover:no-underline p-4 text-xl font-semibold">
            <div className="flex items-center">
              <Beaker className="w-6 h-6 mr-3 text-yellow-400" />
              Step 2: A/B Test Your Prompts
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4 pt-0">
            <div className="space-y-4 text-gray-300 border-t border-gray-700 pt-4">
              <p>The easiest and fastest thing to change in an AI product is the system prompt. Even small tweaks can lead to big differences in the AI's output. A/B testing is how you measure which changes are actually improvements.</p>
              <p>Run the simulation below to see how a more specific prompt can lead to a better outcome.</p>
              <PromptABTester />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="bg-gray-800/50 border-gray-700 border rounded-lg">
          <AccordionTrigger className="hover:no-underline p-4 text-xl font-semibold">
            <div className="flex items-center">
              <RefreshCw className="w-6 h-6 mr-3 text-cyan-400" />
              Step 3: Learn and Adapt
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4 pt-0">
            <div className="space-y-4 text-gray-300 border-t border-gray-700 pt-4">
              <p>Use the data from your measurements and tests to make decisions. If users constantly correct the AI's tone, your prompt needs to be more specific. If a feature isn't being used, maybe it's not as useful as you thought. This data-driven cycle is your guide to what to build or refine next.</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Improvement Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Beaker className="w-7 h-7 mr-3 text-yellow-400" />
          Your Turn: Form an Improvement Hypothesis
        </h2>
        <p className="text-gray-300 mb-4">
          A good experiment starts with a clear hypothesis. Use the chat window below to improve an AI feature. Describe the feature, and the AI will help you formulate a testable hypothesis, define a key metric, and create an A/B test to see if your change works.
        </p>
        {/* InlineChat for hypothesis testing exercise */}
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

      {/* Validation Quiz */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Check Your Understanding</h2>
        <ModuleQuizzes questions={quizQuestions} />
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-6/6.2" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Design Thinking with AI
        </Link>
        <Link 
          to="/instructions/module-7/7.1" 
          onClick={() => completeLesson(6, 3)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next Module <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson6_3;
