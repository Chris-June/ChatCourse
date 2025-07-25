import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BarChart2, Beaker, RefreshCw } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import MetricSorter from '@/pages/instructions/components/MetricSorter';
import PromptABTester from '@/pages/instructions/components/PromptABTester';

const Lesson6_3: React.FC = () => {
  const { completeLesson } = useProgressStore();
  const hypothesisAssistantPrompt = `You are an expert AI Product Manager specializing in experimentation. Your goal is to help users improve an AI feature by creating a structured experiment. When a user describes a feature they want to improve, guide them through the following steps:
1. **Hypothesis Formulation**: Help them state a clear, testable hypothesis (e.g., "By changing X, we will improve Y, because Z.").
2. **Metric Definition**: Help them define a single, key metric to measure the change (e.g., "User satisfaction score," "Correction rate," "Task completion time").
3. **A/B Test Design**: Help them outline a simple A/B test (e.g., "Group A gets the old prompt, Group B gets the new prompt. We will compare the key metric between the two groups after 1,000 interactions.").
Be encouraging and help them think critically about their ideas.`;
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
        <InlineChat 
          moduleId="module-6.3-hypothesis-testing"
          maxAttempts={10}
          placeholder="Try: &quot;Let's improve an AI that summarizes articles.&quot;" 
          systemPrompt={hypothesisAssistantPrompt}
        />
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
