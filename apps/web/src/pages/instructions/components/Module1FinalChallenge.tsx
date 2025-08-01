import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clipboard, Award } from 'lucide-react';

const expertPrompt = `Act as a savvy social media marketer with a witty and professional voice.

Your task is to generate three announcements for the launch of a new AI-powered productivity app called 'CogniFlow'.

Generate one post for each of the following platforms: Twitter, LinkedIn, and a short blog post.

- The Twitter post should be concise (under 280 chars), use 2-3 relevant hashtags, and have a high-energy tone.
- The LinkedIn post should be professional, focus on productivity benefits for teams, and be around 3-4 sentences.
- The blog post should be a 3-paragraph announcement explaining what CogniFlow is, its top 3 features (intelligent sorting, task automation, and collaborative workspaces), and who it's for (students, professionals, and teams).

Ensure all posts are factual and avoid making exaggerated claims about the AI's capabilities.`;

const expertOutput = `
**Twitter:**
Say goodbye to clutter! 🚀 CogniFlow, the new AI-powered productivity app, is HERE! Intelligent sorting, task automation, and seamless collaboration will change the way you work. Level up your productivity today! #AI #Productivity #NewApp

---

**LinkedIn:**
In today's fast-paced environment, team alignment is everything. We're excited to launch CogniFlow, an AI-powered productivity hub designed to streamline your workflow. With intelligent sorting, task automation, and collaborative workspaces, your team can focus on what truly matters. Discover the future of productivity.

---

**Blog Post: Welcome to CogniFlow - Your New Productivity Partner**

We are thrilled to announce the official launch of CogniFlow, a next-generation productivity application designed to bring clarity and focus to your daily tasks. Built with a powerful AI at its core, CogniFlow is more than just a to-do list; it's an intelligent partner that helps you manage your work, so you can focus on doing it.

CogniFlow is built on three core pillars. First, our **intelligent sorting** automatically categorizes your tasks based on priority and context, ensuring you're always working on what's most important. Second, our **task automation** handles the repetitive work for you, from scheduling reminders to organizing files, freeing up your time for creative problem-solving. Finally, our **collaborative workspaces** provide a seamless environment for teams to share ideas, assign tasks, and track progress together in real-time.

Whether you're a student managing assignments, a professional juggling multiple projects, or a team striving for better alignment, CogniFlow is built for you. Our mission is to reduce the mental overhead of modern work and empower you to achieve your goals with less stress and more flow. Welcome to a smarter way to work.`;

const Module1FinalChallenge: React.FC = () => {
  const [userPrompt, setUserPrompt] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(expertPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg my-6 border border-yellow-500/30">
      <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 mb-4">
        <h3 className="text-lg font-semibold text-yellow-300">The Scenario</h3>
        <p className="text-gray-300 mt-2">
          You are a marketing assistant at a startup launching a new AI-powered productivity app called 'CogniFlow'. Your manager has asked you to generate three distinct social media posts (for Twitter, LinkedIn, and a blog) announcing the launch. The posts must be tailored to each platform's audience and style, highlight specific features, and avoid making unrealistic claims.
        </p>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">Your Prompt:</h3>
      <textarea 
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        placeholder="Craft a single, comprehensive prompt to generate all three posts..."
        rows={8}
        className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
      />

      {!showResult && (
        <div className="text-center mt-4">
          <button onClick={() => setShowResult(true)} className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
            <Award className="inline w-5 h-5 mr-2"/>
            Submit My Prompt & See Expert Solution
          </button>
        </div>
      )}

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 space-y-4 overflow-hidden"
          >
            <div className="bg-gray-900 p-4 rounded-lg">
              <h4 className="font-bold text-lg text-blue-300 mb-2 flex justify-between items-center">
                Expert-Level Prompt
                <button onClick={handleCopy} className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-md">
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Clipboard className="w-5 h-5 text-gray-400" />}
                </button>
              </h4>
              <pre className="whitespace-pre-wrap text-gray-300 text-sm font-mono bg-gray-950 p-3 rounded-md">{expertPrompt}</pre>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg">
              <h4 className="font-bold text-lg text-green-300 mb-2">Generated Output</h4>
              <pre className="whitespace-pre-wrap text-gray-300 text-sm bg-gray-950 p-3 rounded-md">{expertOutput}</pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Module1FinalChallenge;
