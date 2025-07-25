import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CotDiagram from '../../../components/CotDiagram';
import AutoDemosDiagram from '../../../components/AutoDemosDiagram';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';
import Accordion from '../../../components/Accordion';

const zeroShotCoTChallengeChecklist = [
  { text: 'Pose a multi-step reasoning problem to the AI', completed: false },
  { text: 'Append the phrase "Let\'s think step by step" to your prompt', completed: false },
  { text: 'Confirm the AI outputs a step-by-step breakdown', completed: false },
  { text: 'Verify the final answer is logical and correct', completed: false },
];

const Lesson3_2: React.FC = () => {
  const { completeLesson } = useProgressStore();
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">3.2 Chain of Thought Prompting</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-3/3.1" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Advanced Techniques
          </Link>
          <Link 
            to="/instructions/module-3/3.3" 
            onClick={() => completeLesson(3, 2)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next: Prompting Exercises <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Introduced in Wei et al. (2022), chain-of-thought (CoT) prompting enables complex reasoning capabilities through intermediate reasoning steps. You can combine it with few-shot prompting to get better results on more complex tasks that require reasoning before responding.
      </p>

      <Accordion title="Chain-of-Thought Prompting" isInitiallyOpen>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm">
          <p className="font-mono text-gray-200">Prompt:</p>
          <div className="bg-gray-800 p-2 rounded mt-1">
            <code className="block whitespace-pre-wrap break-words font-mono text-gray-300">{`The odd numbers in this group add up to an even number: 4, 8, 9, 15, 12, 2, 1.\nA: Adding all the odd numbers (9, 15, 1) gives 25. The answer is False.\n\nThe odd numbers in this group add up to an even number: 17,  10, 19, 4, 8, 12, 24.\nA: Adding all the odd numbers (17, 19) gives 36. The answer is True.\n\nThe odd numbers in this group add up to an even number: 16,  11, 14, 4, 8, 13, 24.\nA: Adding all the odd numbers (11, 13) gives 24. The answer is True.\n\nThe odd numbers in this group add up to an even number: 17,  9, 10, 12, 13, 4, 2.\nA: Adding all the odd numbers (17, 9, 13) gives 39. The answer is False.\n\nThe odd numbers in this group add up to an even number: 15, 32, 5, 13, 82, 7, 1.\nA:`}</code>
          </div>
          <p className="font-mono text-gray-200 mt-3">Output:</p>
          <div className="bg-gray-800 p-2 rounded mt-1">
            <code className="block whitespace-pre-wrap break-words font-mono text-green-400">Adding all the odd numbers (15, 5, 13, 7, 1) gives 41. The answer is False.</code>
          </div>
        </div>
        <p className="text-gray-300 my-4">
          Wow! We can see a perfect result when we provided the reasoning step. In fact, we can solve this task by providing even fewer examples, i.e., just one example seems enough.
        </p>
      </Accordion>

      <Accordion title="Zero-Shot CoT">
        <p className="text-gray-300 mb-4">
          One of the more recent and exciting prompting techniques is zero-shot CoT (Kojima et al. 2022) that essentially involves adding "Let's think step by step" to the original prompt. Let's try a simple problem to see how this works in practice.
        </p>
        <div className="my-4">
          <CotDiagram />
          <p className="text-center text-sm text-gray-500 mt-2">Image Source: Kojima et al. (2022)</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm">
          <p className="font-mono text-gray-200">Prompt:</p>
          <div className="bg-gray-800 p-2 rounded mt-1">
            <code className="block whitespace-pre-wrap break-words font-mono text-gray-300">{`I went to the market and bought 10 apples. I gave 2 apples to the neighbor and 2 to the repairman. I then bought 5 more apples and ate 1. How many apples did I remain with?\n\nLet's think step by step.`}</code>
          </div>
          <p className="font-mono text-gray-200 mt-3">Output:</p>
          <div className="bg-gray-800 p-2 rounded mt-1">
            <code className="block whitespace-pre-wrap break-words font-mono text-green-400">{`First, you started with 10 apples.\nYou gave away 2 apples to the neighbor and 2 to the repairman, so you had 6 apples left.\nThen you bought 5 more apples, so now you had 11 apples.\nFinally, you ate 1 apple, so you would remain with 10 apples.`}</code>
          </div>
        </div>
        <p className="text-gray-300 mt-4">
          It's impressive that this simple prompt is effective at this task. This is particularly useful where you don't have too many examples to use in the prompt.
        </p>

        <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border-2 border-dashed border-blue-500/50">
          <h3 className="font-semibold text-white mb-2">Your Turn: Zero-Shot CoT</h3>
          <p className="text-gray-400 mb-4">Use the "Let's think step by step" technique on a new problem to see if you can elicit a reasoned response from the model without providing examples.</p>
          <InlineChat 
            moduleId="module-3.2-zeroshot-cot"
            placeholder="Ask a question and end with 'Let's think step by step.'" 
            challengeChecklist={zeroShotCoTChallengeChecklist}
          />
        </div>
      </Accordion>

      <Accordion title="Automatic Chain-of-Thought (Auto-CoT)">
        <p className="text-gray-300 mb-4">
          When applying chain-of-thought prompting with demonstrations, the process involves hand-crafting effective and diverse examples. This manual effort could lead to suboptimal solutions. Zhang et al. (2022) propose an approach to eliminate manual efforts by leveraging LLMs with "Let's think step by step" prompt to generate reasoning chains for demonstrations one by one. This automatic process can still end up with mistakes in generated chains. To mitigate the effects of the mistakes, the diversity of demonstrations matter. This work proposes Auto-CoT, which samples questions with diversity and generates reasoning chains to construct the demonstrations.
        </p>
        <AutoDemosDiagram />
        <p className="text-center text-sm text-gray-500 mt-2">Image Source: Zhang et al. (2022)</p>
      </Accordion>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-3/3.1" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Shot Prompting
        </Link>
        <Link 
          to="/instructions/module-3/3.3" 
          onClick={() => completeLesson(3, 2)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Structuring Outputs <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson3_2;
