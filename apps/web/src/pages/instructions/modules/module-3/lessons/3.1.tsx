import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import zeroCotImage from '../../../../../assets/images/zero-cot2.webp';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';

const Lesson3_1: React.FC = () => {
  const { completeLesson } = useProgressStore();
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">3.1: Zero-shot, One-shot, and Few-shot Prompting</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-2/2.3" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-3/3.2" 
            onClick={() => completeLesson(3, 1)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      {/* Zero-shot Prompting */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Zero-shot Prompting</h2>
        <div className="my-4">
          <img src={zeroCotImage} alt="Zero-shot COT diagram" className="rounded-lg mx-auto" />
        </div>
        <p className="text-gray-300 mb-4">
          Large language models (LLMs) today, such as GPT-3.5 Turbo, GPT-4, and Claude 3, are tuned to follow instructions and are trained on large amounts of data. Large-scale training makes these models capable of performing some tasks in a "zero-shot" manner. Zero-shot prompting means that the prompt used to interact with the model won't contain examples or demonstrations. The zero-shot prompt directly instructs the model to perform a task without any additional examples to steer it.
        </p>
        <p className="text-gray-300 mb-4">
          We tried a few zero-shot examples in the previous section. Here is one of the examples (i.e., text classification) we used:
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm">
          <p className="font-mono text-gray-200">Prompt:</p>
          <div className="bg-gray-800 p-2 rounded mt-1">
            <code className="block whitespace-pre-wrap break-words font-mono text-gray-300">{`Classify the text into neutral, negative or positive.
Text: I think the vacation is okay.
Sentiment:`}</code>
          </div>
          <p className="font-mono text-gray-200 mt-3">Output:</p>
          <div className="bg-gray-800 p-2 rounded mt-1">
            <code className="block whitespace-pre-wrap break-words font-mono text-green-400">Neutral</code>
          </div>
        </div>
        <p className="text-gray-300 my-4">
          Note that in the prompt above we didn't provide the model with any examples of text alongside their classifications, the LLM already understands "sentiment" -- that's the zero-shot capabilities at work.
        </p>
        <p className="text-gray-300">
          Instruction tuning has been shown to improve zero-shot learning. Instruction tuning is essentially the concept of finetuning models on datasets described via instructions. Furthermore, RLHF (reinforcement learning from human feedback) has been adopted to scale instruction tuning wherein the model is aligned to better fit human preferences. This recent development powers models like ChatGPT. We will discuss all these approaches and methods in upcoming sections.
        </p>
        <p className="text-gray-300 mt-4">
          When zero-shot doesn't work, it's recommended to provide demonstrations or examples in the prompt which leads to few-shot prompting. In the next section, we demonstrate few-shot prompting.
        </p>

        <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border-2 border-dashed border-blue-500/50">
          <h3 className="font-semibold text-white mb-2">Your Turn: Zero-Shot</h3>
          <p className="text-gray-400 mb-4">Try your own zero-shot prompt. Ask the model to perform a task without giving it any examples, like summarizing a paragraph or translating a sentence.</p>
          <InlineChat placeholder="Try a zero-shot prompt here..." />
        </div>
      </section>

      {/* Few-shot Prompting */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Few-shot Prompting</h2>
        <p className="text-gray-300 mb-4">
          While large-language models demonstrate remarkable zero-shot capabilities, they still fall short on more complex tasks when using the zero-shot setting. Few-shot prompting can be used as a technique to enable in-context learning where we provide demonstrations in the prompt to steer the model to better performance. The demonstrations serve as conditioning for subsequent examples where we would like the model to generate a response.
        </p>
        <p className="text-gray-300 mb-4">
          According to Touvron et al. 2023 few shot properties first appeared when models were scaled to a sufficient size (Kaplan et al., 2020).
        </p>
        <p className="text-gray-300 mb-4">
          Let's demonstrate few-shot prompting via an example that was presented in Brown et al. 2020. In the example, the task is to correctly use a new word in a sentence.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 font-mono text-sm text-gray-200">
          <p>Prompt:</p>
          <pre className="whitespace-pre-wrap">{`A "whatpu" is a small, furry animal native to Tanzania. An example of a sentence that uses the word whatpu is:
We were traveling in Africa and we saw these very cute whatpus.

To do a "farduddle" means to jump up and down really fast. An example of a sentence that uses the word farduddle is:`}</pre>
          <br />
          <p>Output:</p>
          <pre className="whitespace-pre-wrap">When we won the game, we all started to farduddle in celebration.</pre>
        </div>
        <p className="text-gray-300 my-4">
          We can observe that the model has somehow learned how to perform the task by providing it with just one example (i.e., 1-shot). For more difficult tasks, we can experiment with increasing the demonstrations (e.g., 3-shot, 5-shot, 10-shot, etc.).
        </p>
        <p className="text-gray-300 mb-4">
          Following the findings from Min et al. (2022), here are a few more tips about demonstrations/exemplars when doing few-shot:
        </p>
        <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
          <li>"the label space and the distribution of the input text specified by the demonstrations are both important (regardless of whether the labels are correct for individual inputs)"</li>
          <li>the format you use also plays a key role in performance, even if you just use random labels, this is much better than no labels at all.</li>
          <li>additional results show that selecting random labels from a true distribution of labels (instead of a uniform distribution) also helps.</li>
        </ul>
        <p className="text-gray-300 mb-4">
          Let's try out a few examples. Let's first try an example with random labels (meaning the labels Negative and Positive are randomly assigned to the inputs):
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm">
          <p className="font-mono text-gray-200">Prompt:</p>
          <div className="bg-gray-800 p-2 rounded mt-1">
            <code className="block whitespace-pre-wrap break-words font-mono text-gray-300">{`This is awesome! // Positive
This is bad! // Negative
Wow, this is amazing! // Positive
What a horrible show! //`}</code>
          </div>
          <p className="font-mono text-gray-200 mt-3">Output:</p>
          <div className="bg-gray-800 p-2 rounded mt-1">
            <code className="block whitespace-pre-wrap break-words font-mono text-green-400">Negative</code>
          </div>
        </div>

        <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border-2 border-dashed border-blue-500/50">
          <h3 className="font-semibold text-white mb-2">Your Turn: Few-Shot</h3>
          <p className="text-gray-400 mb-4">Construct your own few-shot prompt. Provide the model with a few examples to guide its response for a simple classification or transformation task.</p>
          <InlineChat placeholder="Construct a few-shot prompt with examples..." />
        </div>
      </section>

      {/* Limitations of Few-shot Prompting */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Limitations of Few-shot Prompting</h2>

        <p className="text-gray-300 mb-4">
          Standard few-shot prompting works well for many tasks but is still not a perfect technique, especially when dealing with more complex reasoning tasks. Let's demonstrate why this is the case. Do you recall the previous example where we provided the following task:
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm">
          <code className="block whitespace-pre-wrap break-words font-mono text-gray-300">{`The odd numbers in this group add up to an even number: 15, 32, 5, 13, 82, 7, 1.
A:`}</code>
        </div>
        <p className="text-gray-300 my-4">If we try this again, the model outputs the following:</p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm">
          <code className="block whitespace-pre-wrap break-words font-mono text-red-400">Yes, the odd numbers in this group add up to 107, which is an even number.</code>
        </div>
        <p className="text-gray-300 my-4">
          This is not the correct response, which not only highlights the limitations of these systems but that there is a need for more advanced prompt engineering.
        </p>
        <p className="text-gray-300 mb-4">
          Let's try to add some examples to see if few-shot prompting improves the results.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm">
          <p className="font-mono text-gray-200">Prompt:</p>
          <div className="bg-gray-800 p-2 rounded mt-1">
            <code className="block whitespace-pre-wrap break-words font-mono text-gray-300">{`The odd numbers in this group add up to an even number: 4, 8, 9, 15, 12, 2, 1.
A: The answer is False.

The odd numbers in this group add up to an even number: 17,  10, 19, 4, 8, 12, 24.
A: The answer is True.

The odd numbers in this group add up to an even number: 16,  11, 14, 4, 8, 13, 24.
A: The answer is True.

The odd numbers in this group add up to an even number: 17,  9, 10, 12, 13, 4, 2.
A: The answer is False.

The odd numbers in this group add up to an even number: 15, 32, 5, 13, 82, 7, 1.
A:`}</code>
          </div>
          <p className="font-mono text-gray-200 mt-3">Output:</p>
          <div className="bg-gray-800 p-2 rounded mt-1">
            <code className="block whitespace-pre-wrap break-words font-mono text-red-400">The answer is True.</code>
          </div>
        </div>
        <p className="text-gray-300 my-4">
          That didn't work. It seems like few-shot prompting is not enough to get reliable responses for this type of reasoning problem.
        </p>
        <p className="text-gray-300">
          Overall, it seems that providing examples is useful for solving some tasks. When zero-shot prompting and few-shot prompting are not sufficient, it might mean that whatever was learned by the model isn't enough to do well at the task. From here it is recommended to start thinking about fine-tuning your models or experimenting with more advanced prompting techniques.
        </p>

        <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border-2 border-dashed border-blue-500/50">
          <h3 className="font-semibold text-white mb-2">Your Turn: The Reasoning Challenge</h3>
          <p className="text-gray-400 mb-4">The model failed the reasoning task above. Can you get it to answer correctly using only few-shot prompting? Try different examples or rephrase the problem.</p>
          <InlineChat placeholder="Try to solve the reasoning problem..." />
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-2/2.3" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Module 2 Project
        </Link>
        <Link 
          to="/instructions/module-3/3.2" 
          onClick={() => completeLesson(3, 1)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Chain-of-Thought <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson3_1;
