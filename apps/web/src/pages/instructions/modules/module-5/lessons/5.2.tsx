import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Settings, Lightbulb, ShieldCheck, User, Briefcase } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';
import ComparisonCard from '../../../components/ComparisonCard';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

import Accordion from '../../../components/Accordion';

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
  
  const personalizationChecklist = [
    { text: 'The AI addresses me by name (Maria)', completed: false },
    { text: 'The response considers my grade level (10th grade)', completed: false },
    { text: 'The explanation uses visual elements (my learning style)', completed: false },
    { text: 'The response relates to my goal (Biology exam on cell division)', completed: false }
  ];
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white flex items-center">
          <Settings className="w-10 h-10 mr-4 text-blue-400" />
          Lesson 5.2: The Personal Concierge
        </h1>
        <div className="flex items-center space-x-4">
          <Link
            to="/instructions/module-5/5.1"
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> The Director's Script
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
        A generic AI is like a hotel receptionist—helpful, but formal. A *personalized* AI is like a personal concierge who knows your preferences, remembers your past requests, and anticipates your needs. This lesson is about transforming your AI from a receptionist into a world-class concierge by mastering **static** and **dynamic context**.
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
      <Accordion title="The Concierge's Knowledge: Static vs. Dynamic Context" icon={<Settings />} isInitiallyOpen>
        <p className="text-gray-300 mb-6">
          Our concierge's expertise comes from two sources: a long-term preference card and in-the-moment briefings. 
        </p>
        <div className="flex flex-col md:flex-row gap-6">
          <ComparisonCard 
            icon={<User size={24} className="text-blue-300" />} 
            title="The Preference Card (Static Context)" 
            bgColorClass="bg-blue-900/50 border border-blue-700"
            points={[
              '<strong>Who the user is:</strong> Stored user profile data.',
              '<strong>What they like:</strong> General preferences (e.g., `tone: formal`).',
              '<strong>How they work:</strong> Custom instructions (e.g., `Always summarize in bullet points`).',
              '<strong>Changes rarely.</strong>',
            ]}
          />
          <ComparisonCard 
            icon={<Briefcase size={24} className="text-green-300" />} 
            title="The In-the-Moment Briefing (Dynamic Context)" 
            bgColorClass="bg-green-900/50 border border-green-700"
            points={[
              '<strong>What the user is doing now:</strong> Real-time application state.',
              '<strong>Example:</strong> `The user is viewing a product named \'X-12 Sneaker\'.`',
              '<strong>Why it matters:</strong> Provides immediate, situational relevance.',
              '<strong>Changes constantly.</strong>',
            ]}
          />
        </div>
      </Accordion>

      {/* Ethical Considerations */}
      <Accordion title="The Concierge's Code of Ethics" icon={<ShieldCheck />}>
        <p className="text-gray-300 mb-4">
          A great concierge is trustworthy. Personalization is built on user data, and handling that data responsibly is non-negotiable.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li><strong>Transparency is Key:</strong> Be upfront about what data you collect and why.</li>
          <li><strong>Give Users Control:</strong> Provide clear, accessible settings for users to manage their data and personalization preferences.</li>
          <li><strong>Security First:</strong> Protect user data as if it were your own.</li>
        </ul>
      </Accordion>

      {/* Conceptual Exercise */}
      <Accordion title="Meet Your Personal Tutor" icon={<Lightbulb />}>
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
        {/* InlineChat for demonstrating personalized tutoring with dynamic context */}
        <InlineChat 
          moduleId="module-5.2-personalized-tutor"
          maxAttempts={5}
          maxFollowUps={3}
          placeholder='Try asking: "Can you help me understand mitosis?"'
          systemPrompt={systemPrompt}
          initialMessages={[
            {
              role: 'assistant',
              content: `Hi Maria! I'm here to help you with your Biology exam on cell division. Since you're a visual learner, I'll include diagrams and analogies to help you understand better. What specific topic would you like to review first?`
            }
          ]}
          challengeChecklist={personalizationChecklist}
        />
      </Accordion>

      {/* Validation Quiz */}
      <div className="mt-8">
        <ModuleQuizzes questions={quizQuestions} />
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link
          to="/instructions/module-5/5.1"
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: The Director's Script
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