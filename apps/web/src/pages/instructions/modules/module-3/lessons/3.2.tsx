import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import zeroShotCotImage from '../../../../../assets/images/cot1.webp';
import autoCotImage from '../../../../../assets/images/auto-cot3.webp';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';

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

      {/* Chain-of-Thought Prompting Example */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Chain-of-Thought Prompting</h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm">
          <p className="font-mono text-gray-200">Prompt:</p>
          <div className="bg-gray-800 p-2 rounded mt-1">
            <code className="block whitespace-pre-wrap break-words font-mono text-gray-300">{`The odd numbers in this group add up to an even number: 4, 8, 9, 15, 12, 2, 1.
A: Adding all the odd numbers (9, 15, 1) gives 25. The answer is False.

The odd numbers in this group add up to an even number: 17,  10, 19, 4, 8, 12, 24.
A: Adding all the odd numbers (17, 19) gives 36. The answer is True.

The odd numbers in this group add up to an even number: 16,  11, 14, 4, 8, 13, 24.
A: Adding all the odd numbers (11, 13) gives 24. The answer is True.

The odd numbers in this group add up to an even number: 17,  9, 10, 12, 13, 4, 2.
A: Adding all the odd numbers (17, 9, 13) gives 39. The answer is False.

The odd numbers in this group add up to an even number: 15, 32, 5, 13, 82, 7, 1.
A:`}</code>
          </div>
          <p className="font-mono text-gray-200 mt-3">Output:</p>
          <div className="bg-gray-800 p-2 rounded mt-1">
            <code className="block whitespace-pre-wrap break-words font-mono text-green-400">Adding all the odd numbers (15, 5, 13, 7, 1) gives 41. The answer is False.</code>
          </div>
        </div>
        <p className="text-gray-300 my-4">
          Wow! We can see a perfect result when we provided the reasoning step. In fact, we can solve this task by providing even fewer examples, i.e., just one example seems enough:
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm">
          <p className="font-mono text-gray-200">Prompt:</p>
          <div className="bg-gray-800 p-2 rounded mt-1">
            <code className="block whitespace-pre-wrap break-words font-mono text-gray-300">{`The odd numbers in this group add up to an even number: 4, 8, 9, 15, 12, 2, 1.
A: Adding all the odd numbers (9, 15, 1) gives 25. The answer is False.

The odd numbers in this group add up to an even number: 15, 32, 5, 13, 82, 7, 1.
A:`}</code>
          </div>
          <p className="font-mono text-gray-200 mt-3">Output:</p>
          <div className="bg-gray-800 p-2 rounded mt-1">
            <code className="block whitespace-pre-wrap break-words font-mono text-green-400">Adding all the odd numbers (15, 5, 13, 7, 1) gives 41. The answer is False.</code>
          </div>
        </div>
        <p className="text-gray-300 mt-4">
          Keep in mind that the authors claim that this is an emergent ability that arises with sufficiently large language models.
        </p>

        <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border-2 border-dashed border-blue-500/50">
          <h3 className="font-semibold text-white mb-2">Your Turn: Chain-of-Thought</h3>
          <p className="text-gray-400 mb-4">Try to solve a reasoning problem by providing the model with a chain-of-thought example. Remember to show the intermediate steps.</p>
          <InlineChat 
            moduleId="module-3.2-cot-example"
            maxAttempts={10}
            placeholder="Provide a full CoT example here..." 
          />
        </div>
      </section>

      {/* Zero-shot CoT Prompting */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Zero-shot CoT Prompting</h2>
        <div className="my-4">
          <img src={zeroShotCotImage} alt="Zero-shot CoT diagram" className="rounded-lg mx-auto" />
          <p className="text-center text-sm text-gray-500 mt-2">Image Source: Kojima et al. (2022)</p>
        </div>
        <p className="text-gray-300 mb-4">
          One recent idea that came out more recently is the idea of zero-shot CoT (Kojima et al. 2022) that essentially involves adding "Let's think step by step" to the original prompt. Let's try a simple problem and see how the model performs:
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 font-mono text-sm text-gray-200">
          <p>Prompt:</p>
          <pre className="whitespace-pre-wrap">{`I went to the market and bought 10 apples. I gave 2 apples to the neighbor and 2 to the repairman. I then went and bought 5 more apples and ate 1. How many apples did I remain with?`}</pre>
          <br />
          <p>Output:</p>
          <pre className="whitespace-pre-wrap">11 apples</pre>
        </div>
        <p className="text-gray-300 my-4">
          The answer is incorrect! Now Let's try with the special prompt.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm">
          <p className="font-mono text-gray-200">Prompt:</p>
          <div className="bg-gray-800 p-2 rounded mt-1">
            <code className="block whitespace-pre-wrap break-words font-mono text-gray-300">{`I went to the market and bought 10 apples. I gave 2 apples to the neighbor and 2 to the repairman. I then went and bought 5 more apples and ate 1. How many apples did I remain with?
Let's think step by step.`}</code>
          </div>
          <p className="font-mono text-gray-200 mt-3">Output:</p>
          <div className="bg-gray-800 p-2 rounded mt-1">
            <code className="block whitespace-pre-wrap break-words font-mono text-green-400">{`First, you started with 10 apples.
You gave away 2 apples to the neighbor and 2 to the repairman, so you had 6 apples left.
Then you bought 5 more apples, so now you had 11 apples.
Finally, you ate 1 apple, so you would remain with 10 apples.`}</code>
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
            maxAttempts={10}
            placeholder="Ask a question and end with 'Let's think step by step.'" 
          />
        </div>
      </section>

      {/* Automatic Chain-of-Thought */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Automatic Chain-of-Thought (Auto-CoT)</h2>
        <p className="text-gray-300 mb-4">
          When applying chain-of-thought prompting with demonstrations, the process involves hand-crafting effective and diverse examples. This manual effort could lead to suboptimal solutions. Zhang et al. (2022) propose an approach to eliminate manual efforts by leveraging LLMs with "Let's think step by step" prompt to generate reasoning chains for demonstrations one by one. This automatic process can still end up with mistakes in generated chains. To mitigate the effects of the mistakes, the diversity of demonstrations matter. This work proposes Auto-CoT, which samples questions with diversity and generates reasoning chains to construct the demonstrations.
        </p>
        <p className="text-gray-300 mb-4">
          Auto-CoT consists of two main stages:
        </p>
        <ol className="list-decimal list-inside text-gray-400 space-y-2 mb-4">
          <li><strong>Question Clustering:</strong> partition questions of a given dataset into a few clusters</li>
          <li><strong>Demonstration Sampling:</strong> select a representative question from each cluster and generate its reasoning chain using Zero-Shot-CoT with simple heuristics</li>
        </ol>
        <p className="text-gray-300 mb-4">
          The simple heuristics could be length of questions (e.g., 60 tokens) and number of steps in rationale (e.g., 5 reasoning steps). This encourages the model to use simple and accurate demonstrations.
        </p>
        <div className="my-4">
          <img src={autoCotImage} alt="Auto-CoT diagram" className="rounded-lg mx-auto" />
          <p className="text-center text-sm text-gray-500 mt-2">Image Source: Zhang et al. (2022)</p>
        </div>
      </section>

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
