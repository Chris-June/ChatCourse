import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BrainCircuit, Lightbulb } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';

const Lesson3_2: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">3.2: Chain-of-Thought Prompting</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-3/3.1" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-3/3.3" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Large Language Models often struggle with complex reasoning. They can make simple math errors or fail logic puzzles because they try to answer too quickly. Chain-of-Thought (CoT) prompting solves this by forcing the AI to 'show its work.'
      </p>

      {/* What is Chain-of-Thought? */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <BrainCircuit className="w-7 h-7 mr-3 text-blue-300" />
          What is Chain-of-Thought Prompting?
        </h2>
        <p className="text-gray-300 mb-4">
          It's a technique where you explicitly ask the AI to break down a problem into a series of intermediate steps before giving a final answer. By simply adding a phrase like <strong className="text-yellow-300">"Let's think step-by-step"</strong> to your prompt, you can significantly improve the AI's ability to reason through complex problems.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Analogy: Math Class</h3>
          <p className="text-gray-400">
            Think of it like a math teacher who won't give you credit unless you show your work. Forcing yourself to write down each step makes you less likely to make a mistake. CoT does the same for the AI.
          </p>
        </div>
      </section>

      {/* Example: Before and After CoT */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Example: The Logic Puzzle</h2>
        <p className="text-gray-300 mb-4">
          Let's look at a classic logic puzzle where models often fail without CoT.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Without CoT */}
          <div className="bg-red-900/20 p-4 rounded-lg border border-red-700">
            <h3 className="font-semibold text-red-300 mb-2">Without CoT (Often Incorrect)</h3>
            <div className="relative mb-4">
              <CopyButton textToCopy={'A bat and a ball cost $1.10. The bat costs $1.00 more than the ball. How much does the ball cost?'} />
              <pre className="p-3 bg-gray-700 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap pr-10">
                <code>
                  <span className="text-gray-400">// Prompt</span>
                  A bat and a ball cost $1.10. The bat costs $1.00 more than the ball. How much does the ball cost?
                </code>
              </pre>
            </div>
            <h4 className="font-semibold text-red-200 mb-2">AI's quick (and wrong) answer:</h4>
            <pre className="p-3 bg-gray-900 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap">
              <code>The ball costs $0.10.</code>
            </pre>
          </div>

          {/* With CoT */}
          <div className="bg-green-900/20 p-4 rounded-lg border border-green-700">
            <h3 className="font-semibold text-green-300 mb-2">With CoT (Correct)</h3>
            <div className="relative mb-4">
              <CopyButton textToCopy={"A bat and a ball cost $1.10. The bat costs $1.00 more than the ball. How much does the ball cost? Let's think step-by-step."} />
              <pre className="p-3 bg-gray-700 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap pr-10">
                <code>
                  <span className="text-gray-400">// Prompt</span>
                  A bat and a ball cost $1.10. The bat costs $1.00 more than the ball. How much does the ball cost? Let's think step-by-step.
                </code>
              </pre>
            </div>
            <h4 className="font-semibold text-green-200 mb-2">AI's reasoned answer:</h4>
            <pre className="p-3 bg-gray-900 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap">
              <code>
                1. Let A be the cost of the bat and B be the cost of the ball.
                2. A + B = 1.10
                3. A = B + 1.00
                4. (B + 1.00) + B = 1.10
                5. 2B + 1.00 = 1.10
                6. 2B = 0.10
                7. B = 0.05
                The ball costs $0.05.
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* When to use CoT */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">When to Use Chain-of-Thought</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          <li><strong>Math & Word Problems:</strong> For any task involving calculations or multiple steps.</li>
          <li><strong>Logic Puzzles:</strong> When there are multiple constraints or conditions to consider.</li>
          <li><strong>Complex Instruction Following:</strong> If you give the AI a multi-step task, asking it to think step-by-step can ensure it doesn't miss any parts.</li>
          <li><strong>Code Generation:</strong> To plan out the logic of a function before writing the code.</li>
        </ul>
      </section>

      {/* Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Your Turn: Plan a Trip
        </h2>
        <p className="text-gray-300 mb-4">Try this in the chat. Give the AI the following prompt. Notice how adding the CoT phrase helps it structure the answer and calculate correctly.</p>
        <div className="relative">
          <CopyButton textToCopy={"I want to drive from Chicago to New York, which is about 800 miles. My car gets 25 miles per gallon, and gas costs $4.00 per gallon. I also want to stop for one night in a hotel that costs $150. What is the total cost of the trip? Let's think step-by-step."} />
          <pre className="p-3 bg-gray-700 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap pr-10">
            <code>
              I want to drive from Chicago to New York, which is about 800 miles. My car gets 25 miles per gallon, and gas costs $4.00 per gallon. I also want to stop for one night in a hotel that costs $150. What is the total cost of the trip? Let's think step-by-step.
            </code>
          </pre>
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
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Structuring Outputs <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson3_2;
