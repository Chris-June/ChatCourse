import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Settings, Lightbulb, ShieldCheck } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';


const Lesson5_2: React.FC = () => {
  const { completeLesson } = useProgressStore();
  const studentProfile = {
    name: "Maria",
    grade: 10,
    subjects: ["Biology", "History"],
    learning_style: "visual",
    goal: "Get help with homework for her upcoming Biology exam on cell division.",
  };

  const systemPrompt = `You are an expert AI tutor specializing in biology and history. You are speaking to a student named ${studentProfile.name}, who is in grade ${studentProfile.grade}. Their learning style is ${studentProfile.learning_style}, so try to use visual descriptions or analogies. Their current goal is: "${studentProfile.goal}". Be encouraging and tailor your explanation to their needs.`;
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">5.2: Personalization at Scale</h1>
        <div className="flex items-center space-x-4">
          <Link
            to="/instructions/module-5/5.1"
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link
            to="/instructions/module-5/5.3"
            onClick={() => completeLesson(5, 2)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Personalization at scale means tailoring an AI's behavior and responses to individual users. This is achieved by giving the AI specific context about the user it's interacting with, making the conversation feel more personal, relevant, and useful.
      </p>

      {/* How it Works */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Settings className="w-7 h-7 mr-3 text-cyan-400" />
          Technical Implementation: Dynamic System Prompts
        </h2>
        <p className="text-gray-300 mb-4">
          The most common method for personalization is to dynamically construct a `system` prompt using stored user data. Before starting a conversation, your application fetches the user's profile and injects it into a template.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Example: Generating a System Prompt</h3>
          <p className="text-gray-400 mb-2 text-sm">Given a user profile object:</p>
          <div className="bg-gray-700 p-3 rounded-md mb-4">
            <code className="block whitespace-pre-wrap break-words font-mono text-xs text-gray-200">
{`const userProfile = {
  name: "Alex",
  profession: "Data Scientist",
  expertise: ["Python", "Machine Learning", "SQL"],
  goal: "Find novel ways to visualize time-series data."
};`}
            </code>
          </div>
          <p className="text-gray-400 mb-2 text-sm">Your application would generate this system prompt:</p>
          <div className="bg-gray-700 p-3 rounded-md">
            <code className="block whitespace-pre-wrap break-words font-mono text-xs text-gray-200">
{`You are an expert AI assistant talking to Alex, a Data Scientist.
Their expertise includes Python, Machine Learning, and SQL.
Their current goal is to find novel ways to visualize time-series data.
Provide technical, precise answers. When providing code, use Python.`}
            </code>
          </div>
        </div>
      </section>

      {/* Static vs Dynamic */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Static vs. Dynamic Personalization</h2>
        <p className="text-gray-300 mb-4">
          It's helpful to distinguish between two approaches to personalization:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 border-blue-400 p-2 text-blue-300">Type</th>
                <th className="border-b-2 border-blue-400 p-2 text-blue-300">Description</th>
                <th className="border-b-2 border-blue-400 p-2 text-blue-300">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-900/50">
                <td className="border-b border-gray-700 p-2 align-top"><strong>Static</strong></td>
                <td className="border-b border-gray-700 p-2 align-top">User-provided, general instructions that apply to all conversations.</td>
                <td className="border-b border-gray-700 p-2 align-top">A user setting "Always respond in a friendly, informal tone" in their profile.</td>
              </tr>
              <tr>
                <td className="border-b border-gray-700 p-2 align-top"><strong>Dynamic</strong></td>
                <td className="border-b border-gray-700 p-2 align-top">Application-driven context injected based on the current task or data.</td>
                <td className="border-b border-gray-700 p-2 align-top">An e-commerce bot being told "The user is currently viewing a size 10 red shoe."</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Ethical Considerations */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <ShieldCheck className="w-7 h-7 mr-3 text-red-400" />
          Ethical Considerations: Data Privacy
        </h2>
        <p className="text-gray-300 mb-4">
          Personalization is powerful, but it requires handling user data, which carries significant ethical responsibilities. Always prioritize user privacy by being transparent about what data you collect and how you use it. Provide users with clear control over their information.
        </p>
      </section>

      {/* Conceptual Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Your Turn: Interact with a Personalized Tutor
        </h2>
        <p className="text-gray-300 mb-4">
          Let's see personalization in action. The AI in the chat window below has been given a dynamic system prompt based on the following student profile:
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700 mb-4">
          <div className="bg-gray-700 p-3 rounded-md">
            <code className="block whitespace-pre-wrap break-words font-mono text-xs text-gray-200">
{`const studentProfile = {
  name: "Maria",
  grade: 10,
  subjects: ["Biology", "History"],
  learning_style: "visual",
  goal: "Get help with homework for her upcoming Biology exam on cell division."
};`}
            </code>
          </div>
        </div>
        <p className="text-gray-300 mb-4">
          Pretend you are Maria. Ask for help with your biology homework and see how the AI responds. Notice if it mentions your learning style or tries to be encouraging.
        </p>
        <InlineChat 
          moduleId="module-5.2-personalized-tutor"
          maxAttempts={10}
          placeholder='Try asking: "Can you help me understand mitosis?"' 
          systemPrompt={systemPrompt}
        />
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link
          to="/instructions/module-5/5.1"
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Multi-Turn Conversations
        </Link>
        <Link
          to="/instructions/module-5/5.3"
          onClick={() => completeLesson(5, 2)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Performance Optimization <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson5_2;