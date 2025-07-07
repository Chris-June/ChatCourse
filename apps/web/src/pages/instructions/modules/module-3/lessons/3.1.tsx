import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';

const Lesson3_1: React.FC = () => {
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
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        One of the most powerful concepts in prompt engineering is understanding how to 'teach' the AI what you want. You can control the specificity and quality of its response by changing the number of examples you provide in your prompt. Let's explore the three main ways to do this.
      </p>

      {/* Zero-shot Prompting */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">1. Zero-shot Prompting: The Basic Request</h2>
        <p className="text-gray-300 mb-4">
          This is the simplest form of prompting. You ask the AI to perform a task without giving it any examples. You are relying entirely on its vast pre-existing knowledge.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Analogy: The Generalist Chef</h3>
          <p className="text-gray-400 mb-3">
            It's like asking a chef, "Make me a tasty pasta dish." You trust their general skills to come up with something good without a recipe.
          </p>
          <div className="p-3 bg-gray-700 rounded-md font-mono text-sm text-gray-200">
            <p className="text-gray-400">// Zero-shot example</p>
            <p>Classify the sentiment of this review: "This was an amazing experience!"</p>
          </div>
        </div>
        <p className="text-sm text-yellow-300 mt-4"><strong>Best for:</strong> Simple, common tasks that the AI is already well-trained on, like general classification, summarization, or translation.</p>
      </section>

      {/* One-shot Prompting */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">2. One-shot Prompting: Providing a Single Example</h2>
        <p className="text-gray-300 mb-4">
          Here, you provide a single example of the input and desired output. This gives the AI a clear template to follow, dramatically improving accuracy for specific formats.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Analogy: The Recipe Card</h3>
          <p className="text-gray-400 mb-3">
            This is like giving the chef a single recipe card. They now know the exact style, format, and key ingredients you want.
          </p>
          <pre className="p-3 bg-gray-700 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap">
            <code>
              <span className="text-gray-400">// One-shot example</span>
              Extract the main product from the sentence.
              
              Sentence: "I need to buy some fresh apples."
              Product: "apples"
              
              Sentence: "Can you find a new laptop for me?"
              Product: 
            </code>
          </pre>
        </div>
        <p className="text-sm text-yellow-300 mt-4"><strong>Best for:</strong> Tasks that require a specific output format, like data extraction or simple code generation.</p>
      </section>

      {/* Few-shot Prompting */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">3. Few-shot Prompting: The Masterclass</h2>
        <p className="text-gray-300 mb-4">
          This is the most powerful technique. You provide several examples (2-5 is common) that demonstrate the pattern you want the AI to follow. This is essential for complex or nuanced tasks.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Analogy: The Cooking Lesson</h3>
          <p className="text-gray-400 mb-3">
            You're not just giving one recipe; you're showing the chef how to make several different dishes to teach them your specific culinary style.
          </p>
          <pre className="p-3 bg-gray-700 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap">
            <code>
              <span className="text-gray-400">// Few-shot example for correcting grammar</span>
              
              Original: "She no go to the store."
              Corrected: "She did not go to the store."
              
              Original: "We is happy."
              Corrected: "We are happy."

              Original: "He drive fastly."
              Corrected:
            </code>
          </pre>
        </div>
        <p className="text-sm text-yellow-300 mt-4"><strong>Best for:</strong> Complex classification, nuanced tasks, code generation following a specific pattern, or correcting for common AI mistakes.</p>
      </section>
      
      {/* Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Your Turn: See the Difference
        </h2>
        <p className="text-gray-300 mb-4">Try this in the chat. Ask the AI to turn a sentence into a JSON object using each method:</p>
        <ul className="list-decimal list-inside text-gray-300 space-y-2">
          <li><strong>Zero-shot:</strong> "Turn the following sentence into a JSON object: 'The user, John Doe, is 30 years old.'"</li>
          <li><strong>One-shot:</strong> Add an example to your prompt showing how you want the JSON structured.</li>
          <li><strong>Few-shot:</strong> Add a couple more examples to handle different types of sentences.</li>
        </ul>
        <p className="text-gray-400 mt-3">Notice how the reliability and consistency of the JSON output improves as you provide more examples.</p>
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
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Chain-of-Thought <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson3_1;
