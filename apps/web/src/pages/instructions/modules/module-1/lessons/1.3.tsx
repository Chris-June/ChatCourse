import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Beaker, Zap } from 'lucide-react';

const Lesson1_3: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">1.3 Hands-on Exploration: Putting Theory into Practice</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-1/1.2" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-2" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Module <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Knowledge is powerful, but applied knowledge is transformative. This lesson is all about getting your hands dirty. You'll move from theory to practice, experimenting with prompts and seeing the direct impact of your choices.
      </p>

      {/* Pattern Recognition and Iteration */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Beaker className="w-7 h-7 mr-3 text-blue-400" />
          Pattern Recognition and Iteration
        </h2>
        <p className="text-gray-300 mb-4">
          The best way to learn is by doing. Your goal here is to develop an intuition for what makes a prompt work. This involves trying something, seeing the result, and refining your approach.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border-2 border-dashed border-gray-600">
          <h3 className="font-semibold text-white mb-2">Exercise: The Iterative Loop</h3>
          <p className="text-gray-400 mb-3">Open a new chat and follow these steps:</p>
          <ol className="list-decimal list-inside text-gray-300 space-y-3">
            <li>
              <strong>Initial Prompt (Vague):</strong> Ask the AI to <span className="font-mono text-cyan-300">"write some code for a button."</span> Observe the generic output.
            </li>
            <li>
              <strong>Second Prompt (Add Context):</strong> Now, get more specific. <span className="font-mono text-cyan-300">"You are a React developer using Tailwind CSS. Write the code for a primary action button. It should be blue, have white text, and rounded corners."</span> Note the improvement.
            </li>
            <li>
              <strong>Third Prompt (Refine and Constrain):</strong> Let's perfect it. <span className="font-mono text-cyan-300">"Building on the last response, add a hover effect that slightly lightens the blue background. Also, add a subtle box-shadow. Ensure the component accepts an 'onClick' prop and 'children' for the button text."</span>
            </li>
          </ol>
          <p className="text-yellow-300 mt-4 text-sm"><strong>Reflection:</strong> How did the AI's response change with each iteration? You guided it from a generic concept to a specific, functional component. This is the core loop of AI collaboration.</p>
        </div>
      </section>

      {/* Sandbox */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Zap className="w-7 h-7 mr-3 text-purple-400" />
          Creative Sandbox: Go Wild!
        </h2>
        <p className="text-gray-300 mb-4">
          Now it's time for free exploration. There are no right or wrong answers here. The goal is to experiment and build your confidence. Try to get the AI to do something interesting, useful, or funny.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-white mb-2">Challenge Ideas:</h4>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                    <li>Have it write a short story in the style of your favorite author.</li>
                    <li>Ask it to create a recipe based on ingredients you have in your fridge.</li>
                    <li>Get it to generate a workout plan or a travel itinerary.</li>
                    <li>Have it explain a complex scientific topic (like quantum physics) to a five-year-old.</li>
                    <li>Ask it to write a Python script to rename all files in a directory.</li>
                </ul>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h4 className="font-semibold text-white mb-2">Things to Try:</h4>
                <ul className="list-disc list-inside text-gray-400 space-y-1">
                    <li>Use different tones (formal, sarcastic, enthusiastic).</li>
                    <li>Ask for different formats (a table, a JSON object, a poem).</li>
                    <li>Give it a very specific, weird persona to adopt.</li>
                    <li>Intentionally give it a bad prompt, then try to fix it.</li>
                    <li>See if you can get it to refuse a request (ethically!).</li>
                </ul>
            </div>
        </div>
      </section>

      {/* Module Wrap-up */}
      <section className="bg-blue-900/30 p-6 rounded-lg shadow-lg border border-blue-700">
        <h2 className="text-2xl font-semibold mb-3 text-white">Module 1 Complete!</h2>
        <p className="text-blue-200 mb-4">
          Congratulations! You've taken the first and most important step. You now understand what an LLM is, how to communicate with it effectively through prompting, and how to iterate on its responses to achieve your goals.
        </p>
        <p className="text-blue-200 font-semibold">
          The skills you've practiced here—assigning roles, defining tasks, providing context, and iterating—are the foundation for everything that comes next.
        </p>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-1/1.2" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: The Art of the Prompt
        </Link>
        <Link 
          to="/instructions/module-2" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          On to Module 2! <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson1_3;
