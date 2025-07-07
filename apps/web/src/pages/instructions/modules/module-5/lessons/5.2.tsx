import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, User, Settings, Lightbulb } from 'lucide-react';

const Lesson5_2: React.FC = () => {
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
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Personalization at scale means tailoring an AI's behavior and responses to individual users, even if you have thousands or millions of them. This is achieved by giving the AI specific context about the user it's interacting with, making the conversation feel more personal, relevant, and useful.
      </p>

      {/* How it Works */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <User className="w-7 h-7 mr-3 text-cyan-400" />
          Using User Profiles and Preferences
        </h2>
        <p className="text-gray-300 mb-4">
          The key to personalization is data. By storing user preferences, you can inject them into the AI's context (often via the system prompt or custom instructions). This guides the model to produce outputs that align with that specific user's needs.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Examples of Personalization Data:</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Role or Profession:</strong> "You are assisting a senior software engineer. Provide technical, concise answers."
            </li>
            <li><strong>Language Preference:</strong> "The user prefers all responses in Spanish."
            </li>
            <li><strong>Interests:</strong> "The user is interested in history. Try to include historical context in your explanations."
            </li>
             <li><strong>Saved Information:</strong> "The user's company is named 'Innovate Inc.' When they mention 'my company,' refer to it by its name."
            </li>
          </ul>
        </div>
      </section>

      {/* Custom Instructions */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Settings className="w-7 h-7 mr-3 text-green-400" />
          The Role of Custom Instructions
        </h2>
        <p className="text-gray-300 mb-4">
          As we covered in Module 2, custom instructions are a powerful tool for personalization. They allow a user to provide standing orders that apply to every conversation. This is a simple yet effective way to implement personalization without complex backend systems.
        </p>
        <p className="text-gray-400">
          For example, a developer could set a custom instruction to "Always provide code examples in Python using the pandas library." The AI will remember and apply this preference in all future interactions with that user.
        </p>
      </section>

      {/* Conceptual Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Exercise: Design a Personalized Assistant
        </h2>
        <p className="text-gray-300 mb-4">
          Imagine you are designing a personalized AI assistant for students. What kind of information would you want to store about each student to make the assistant as helpful as possible?
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Brainstorming Ideas:</h3>
          <p className="text-gray-300 text-sm">Think about and discuss what fields you would include in a student's user profile. Some ideas to get you started: grade level, favorite subjects, learning style (e.g., visual, auditory), and academic goals. How would you use this data to tailor the AI's explanations and exercises?</p>
        </div>
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
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Performance Optimization <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson5_2;
