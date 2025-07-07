import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';

const Lesson1_2: React.FC = () => {
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
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        If the AI is the engine, the prompt is the steering wheel. Learning to write effective prompts is the single most important skill for collaborating with an AI. It's the difference between getting a generic, unhelpful response and a targeted, brilliant one.
      </p>

      {/* Core Principles of Prompting */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">The Core Principles of Prompting</h2>
        <p className="text-gray-300 mb-4">
          A great prompt clearly defines three things: the AI's <span className="font-bold text-yellow-400">Role</span>, the <span className="font-bold text-cyan-400">Task</span> you want it to perform, and the <span className="font-bold text-green-400">Context</span> it needs to succeed.
        </p>
        <div className="space-y-4">
          <div className="bg-gray-900 p-4 rounded-lg border border-yellow-700">
            <h3 className="font-bold text-lg text-yellow-300 mb-2">1. Assign a Role</h3>
            <p className="text-gray-400">Tell the AI who it should be. This frames its knowledge and response style. Instead of just asking a question, tell it: "You are a senior software architect..." or "You are a marketing expert specializing in social media..."</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-cyan-700">
            <h3 className="font-bold text-lg text-cyan-300 mb-2">2. Define the Task</h3>
            <p className="text-gray-400">Be explicit about what you want the AI to do. Use action verbs. "<span className="font-mono">Write</span> a function," "<span className="font-mono">Summarize</span> this article," "<span className="font-mono">Generate</span> three alternative headlines," "<span className="font-mono">Critique</span> this code for bugs."</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-green-700">
            <h3 className="font-bold text-lg text-green-300 mb-2">3. Provide Context</h3>
            <p className="text-gray-400">This is where you provide the necessary details, constraints, examples, and desired output format. The more relevant context you give, the better the result.</p>
          </div>
        </div>
      </section>

      {/* Example Breakdown */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Example: From Vague to Valuable</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-900/30 p-4 rounded-lg border border-red-700 relative">
            <h3 className="font-bold text-lg text-red-300 mb-2">Vague Prompt</h3>
            <CopyButton textToCopy="Explain closures in JavaScript." />
            <p className="font-mono text-gray-300 pr-10">"Explain closures in JavaScript."</p>
            <p className="text-gray-400 mt-2">This might give you a correct but generic, academic definition. Not very practical.</p>
          </div>
          <div className="bg-green-900/30 p-4 rounded-lg border border-green-700 relative">
            <h3 className="font-bold text-lg text-green-300 mb-2">Effective Prompt</h3>
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
          Let's practice. Imagine you want to create a simple "About Us" page for a fictional startup called "Innovate Inc." that builds AI-powered productivity tools.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border-2 border-dashed border-gray-600">
          <h3 className="font-semibold text-white mb-2 flex items-center"><Lightbulb className="w-5 h-5 mr-2 text-yellow-400"/> Exercise: Craft a Prompt</h3>
          <p className="text-gray-400 mb-2">In a new chat, try to write a prompt to generate this "About Us" text. Make sure to include:</p>
          <ul className="list-disc list-inside text-gray-400 space-y-1">
            <li>A <span className="font-bold text-yellow-400">Role</span> for the AI (e.g., a professional copywriter).</li>
            <li>A clear <span className="font-bold text-cyan-400">Task</span> (e.g., write 3 paragraphs).</li>
            <li>Sufficient <span className="font-bold text-green-400">Context</span> (e.g., company name, mission, target audience, desired tone - maybe professional yet inspiring?).</li>
          </ul>
          <p className="text-gray-500 mt-3 text-sm">Try it out and see how the quality of the response changes as you add more detail to your prompt!</p>
        </div>
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
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Hands-on Exploration <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson1_2;
