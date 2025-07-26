import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Settings, Lightbulb, ShieldCheck } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';

import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

const Lesson5_2: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What is the most common technical method for personalizing an AI\'s responses?',
      options: [
        'Using a larger AI model.',
        'Dynamically constructing a `system` prompt using user data.',
        'Speaking to the AI in a different language.',
        'Hard-coding responses for every possible user.'
      ],
      correctAnswer: 'Dynamically constructing a `system` prompt using user data.',
      explanation: 'The lesson explains that injecting user profile information into a system prompt template is the primary way to tailor the AI\'s behavior at scale.'
    },
    {
      questionText: 'What is the key difference between `static` and `dynamic` context in personalization?',
      options: [
        'Static context changes with every message, while dynamic context does not.',
        'Static context is general and user-defined (e.g., tone preference), while dynamic context is task-specific and injected by the application (e.g., current item being viewed).',
        'Static context is for the user, and dynamic context is for the assistant.',
        'There is no difference; the terms are interchangeable.'
      ],
      correctAnswer: 'Static context is general and user-defined (e.g., tone preference), while dynamic context is task-specific and injected by the application (e.g., current item being viewed).',
      explanation: 'Static context provides broad, reusable instructions based on user preferences, whereas dynamic context provides immediate, situational information for the current task.'
    },
    {
      questionText: 'Why is data privacy a critical ethical consideration for personalization?',
      options: [
        'Because it makes the AI more expensive to run.',
        'Because personalization requires handling user data, which must be done responsibly.',
        'Because it can make the AI\'s responses less accurate.',
        'Because it limits the number of users who can use the AI.'
      ],
      correctAnswer: 'Because personalization requires handling user data, which must be done responsibly.',
      explanation: 'Using personal data to tailor experiences is powerful but requires transparency and giving users control over their information to protect their privacy.'
    },
    {
      questionText: 'In the AI Tutor example, what piece of information is used to personalize the interaction?',
      options: [
        'The student\'s name, grade, and learning style.',
        'The current time of day.',
        'The AI\'s own name.',
        'The user\'s IP address.'
      ],
      correctAnswer: 'The student\'s name, grade, and learning style.',
      explanation: 'The system prompt for the tutor is dynamically created using the student\'s profile to make the learning experience more personal and effective.'
    },
    {
      questionText: 'What is the main benefit of personalizing an AI assistant?',
      options: [
        'It guarantees the AI will never make a mistake.',
        'It makes the AI\'s responses feel more personal, relevant, and useful to the individual user.',
        'It reduces the cost of running the AI model.',
        'It allows the AI to work offline.'
      ],
      correctAnswer: 'It makes the AI\'s responses feel more personal, relevant, and useful to the individual user.',
      explanation: 'The goal of personalization is to move from a one-size-fits-all assistant to one that understands and adapts to the specific needs and context of each user.'
    }
  ];

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
            <ChevronLeft className="w-5 h-5 mr-2" /> Multi-Turn Conversations
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

      {/* Validation Quiz */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Check Your Understanding</h2>
        <ModuleQuizzes questions={quizQuestions} />
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