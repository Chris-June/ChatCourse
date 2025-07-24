import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';

const Lesson1_2: React.FC = () => {
  const { completeLesson } = useProgressStore();
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">1.2 The Art of the Prompt</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-1/1.1" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-1/1.3" 
            onClick={() => completeLesson(1, 2)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        If the AI is the engine, the prompt is the steering wheel. Learning to write effective prompts is the single most important skill for collaborating with an AI. It's the difference between getting a generic, unhelpful response and a targeted, brilliant one.
      </p>

      {/* Basics of Prompting */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">The Basics of Prompting</h2>
        <p className="text-gray-300 mb-4">
          You can achieve a lot with simple prompts, but the quality of results depends on how much information you provide and how well-crafted the prompt is. A prompt can include instructions, context, inputs, or examples to guide the model more effectively.
        </p>
        
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 mb-6">
          <h3 className="font-bold text-lg text-white mb-2">Basic Prompt Example</h3>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-gray-300">The sky is</p>
              <p className="text-gray-400 mt-2">The model might respond with: <span className="text-gray-200">blue during the day and dark at night.</span></p>
            </div>
            <CopyButton textToCopy="The sky is" />
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-bold text-lg text-white mb-2">Structured Prompt Example</h3>
          <p className="text-gray-400 mb-3">With chat models like GPT-3.5 or GPT-4, you can structure prompts using different roles:</p>
          <div className="space-y-2">
            <div className="flex items-start">
              <span className="text-green-400 font-mono mr-2">System:</span>
              <p className="text-gray-300">You are a helpful assistant that explains technical concepts clearly.</p>
            </div>
            <div className="flex items-start">
              <span className="text-blue-400 font-mono mr-2">User:</span>
              <p className="text-gray-300">Explain what prompt engineering is in simple terms.</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-3">The system message sets the behavior, while the user message contains the instruction.</p>
        </div>
      </section>

      {/* Prompt Formatting */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Prompt Formats</h2>
        <p className="text-gray-300 mb-4">
          There are several ways to structure your prompts. The format you choose depends on your specific needs and the task at hand.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-900 p-4 rounded-lg border border-cyan-700">
            <h3 className="font-bold text-lg text-cyan-300 mb-2">Zero-Shot Prompting</h3>
            <p className="text-gray-300 font-mono mb-3">What is prompt engineering?</p>
            <p className="text-gray-400">Directly asking a question without examples. Works well for straightforward tasks where the model has relevant knowledge.</p>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg border border-purple-700">
            <h3 className="font-bold text-lg text-purple-300 mb-2">Few-Shot Prompting</h3>
            <div className="space-y-2">
              <p className="text-gray-300 font-mono">This is awesome! // Positive</p>
              <p className="text-gray-300 font-mono">This is bad! // Negative</p>
              <p className="text-gray-300 font-mono">What a horrible show! //</p>
            </div>
            <p className="text-gray-400 mt-3">Providing examples helps the model understand the pattern or format you want.</p>
          </div>
        </div>
        
        <div className="bg-gray-900 p-4 rounded-lg border border-green-700">
          <h3 className="font-bold text-lg text-green-300 mb-2">Structured Prompt</h3>
          <div className="space-y-2">
            <p className="text-gray-300">Q: What is the capital of France?</p>
            <p className="text-gray-300">A: Paris</p>
            <p className="text-gray-300">Q: What is the capital of Japan?</p>
            <p className="text-gray-300">A: Tokyo</p>
            <p className="text-gray-300">Q: What is the capital of Brazil?</p>
            <p className="text-gray-300">A: </p>
          </div>
          <p className="text-gray-500 text-sm mt-3">This QA format is particularly effective for teaching the model specific patterns or tasks.</p>
        </div>
      </section>

      {/* Core Principles of Prompting */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">The Core Principles of Prompting</h2>
        <p className="text-gray-300 mb-4">
          A great prompt clearly defines three things: the AI's <span className="font-bold text-yellow-400">Role</span>, the <span className="font-bold text-cyan-400">Task</span> you want it to perform, and the <span className="font-bold text-green-400">Context</span> it needs to succeed.
        </p>
        <div className="space-y-4">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="font-bold text-lg text-white mb-2">1. Assign a Role</h3>
            <p className="text-gray-400">Tell the AI what persona it should adopt. This sets the tone and perspective of the response.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="font-bold text-lg text-white mb-2">2. Define the Task</h3>
            <p className="text-gray-400">Be explicit about what you want the AI to do. Use clear action verbs.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="font-bold text-lg text-white mb-2">3. Provide Context</h3>
            <p className="text-gray-400">This is where you provide the necessary details, constraints, examples, and desired output format. The more relevant context you give, the better the result.</p>
          </div>
        </div>
      </section>

      {/* Example Breakdown */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Example: From Vague to Valuable</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 relative">
            <h3 className="font-bold text-lg text-red-400 mb-2">Bad Prompt</h3>
            <CopyButton textToCopy="Explain closures in JavaScript." />
            <p className="font-mono text-gray-300 pr-10">"Explain closures in JavaScript."</p>
            <p className="text-gray-400 mt-2">This might give you a correct but generic, academic definition. Not very practical.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 relative">
            <h3 className="font-bold text-lg text-green-400 mb-2">Good Prompt</h3>
            <CopyButton textToCopy="You are a patient programming tutor who excels at explaining complex concepts with simple analogies. Explain the concept of closures in JavaScript. My audience is a beginner developer who understands functions and scope. Provide a simple code example and then explain it line-by-line using a real-world analogy, like a backpack or a toolbox." />
            <div className="font-mono text-gray-300 space-y-1 pr-10">
                <p><span className="text-yellow-400">You are a patient programming tutor</span> who excels at explaining complex concepts with simple analogies.</p>
                <p><span className="text-cyan-400">Explain the concept of closures in JavaScript.</span></p>
                <p><span className="text-green-400">My audience is a beginner developer who understands functions and scope. Provide a simple code example and then explain it line-by-line using a real-world analogy, like a backpack or a toolbox.</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Your Turn: Practice Prompting</h2>
        <p className="text-gray-300 mb-4">
          Now it's time to practice. Use the interactive chat box below to craft a prompt for generating an "About Us" page for a fictional startup called "Innovate Inc." that builds AI-powered productivity tools.
        </p>
        <p className="text-gray-400 mb-4">
          Remember to include a role, a clear task, and sufficient context to get the best results.
        </p>
        <InlineChat 
          moduleId="module-1.2"
          maxAttempts={15}
          placeholder="Craft a prompt for Innovate Inc. here..."
        />
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-1/1.1" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous
        </Link>
        <Link 
          to="/instructions/module-1/1.3" 
          onClick={() => completeLesson(1, 2)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Hands-on Exploration <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson1_2;
