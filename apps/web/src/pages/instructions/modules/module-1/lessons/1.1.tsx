import React, { useState, useEffect } from 'react';
import { Lightbulb, BrainCircuit, Puzzle } from 'lucide-react';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';

// This component is specific to Lesson 1.1
const tokenizeText = (text: string): string[] => {
  // This is a simplified tokenizer for demonstration.
  // It splits by word boundaries or grabs any non-whitespace character.
  return text.match(/\b\w+\b|\S/g) || [];
};

const InteractiveTokenizer = () => {
  const [inputText, setInputText] = useState('Hello world! This is a test.');
  const [tokens, setTokens] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setTokens(tokenizeText(inputText));
  }, [inputText]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const animateTokens = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000); // Animation duration
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mt-4">
      <h4 className="text-lg font-semibold text-white mb-4">Interactive Tokenizer Demo</h4>
      <p className="text-gray-400 mb-4 text-sm">
        Type in the box below to see how your text gets broken down into tokens. This is a fundamental step in how LLMs process language.
      </p>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        className="w-full h-24 bg-gray-800 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-blue-500 transition"
        placeholder="Enter text to tokenize..."
      />
      <div className="flex justify-end mt-3">
        <button
          onClick={animateTokens}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-500 transition-colors"
        >
          Visualize Tokenization
        </button>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700">
        <h5 className="text-base font-medium text-white mb-3">Tokens:</h5>
        <div className="flex flex-wrap gap-2">
          {tokens.map((token, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-md text-sm ${isAnimating ? 'animate-pulse' : ''}`}
              style={{
                backgroundColor: isAnimating ? '#4F46E5' : '#374151',
                color: 'white',
                animationDelay: isAnimating ? `${index * 50}ms` : '0ms',
              }}
            >
              {token}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">Token Count: {tokens.length}</p>
      </div>
    </div>
  );
};

const Lesson1_1: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What is the most fundamental job of a Large Language Model (LLM)?',
      options: [
        'To understand human emotions',
        'To browse the internet and find facts',
        'To predict the next most likely word in a sentence',
        'To translate languages with perfect accuracy',
      ],
      correctAnswer: 'To predict the next most likely word in a sentence',
      explanation: 'Correct! LLMs are sophisticated pattern-matching systems designed to predict the next token (word or part of a word) based on the input they receive.',
    },
    {
      questionText: 'What does it mean to \'tokenize\' text for an AI?',
      options: [
        'To check for spelling and grammar errors',
        'To break the text down into smaller units (words or sub-words)',
        'To encrypt the text for security',
        'To summarize the text into key points',
      ],
      correctAnswer: 'To break the text down into smaller units (words or sub-words)',
      explanation: 'Exactly! Tokenization is the process of converting a sequence of text into a sequence of tokens, which are the basic building blocks the model works with.',
    },
  ];

  return (
    <LessonTemplate
      moduleNumber={1}
      lessonNumber={1}
      title="1.1 What is an AI, Really?"
      subtitle="Beyond the hype, let's build a real foundation."
      quizQuestions={quizQuestions}
    >
      <section className="space-y-6">
        <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <Lightbulb className="w-6 h-6 mr-3 text-yellow-400" />
            The Core Idea: It's All About Prediction
          </h2>
          <p className="text-gray-300 mb-4">
            Forget robots taking over the world for a moment. At its core, a Large Language Model (LLM) like the one powering this course has a surprisingly simple primary job:
          </p>
          <blockquote className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-900/20 text-blue-200">
            <p className="font-medium">
              Given a sequence of text, an LLM is trained to predict the next most likely word (or token).
            </p>
          </blockquote>
          <p className="text-gray-300 mt-4">
            That's it. All the amazing things they can do—write stories, answer questions, generate code—emerge from this single, powerful capability. They are masters of recognizing and recreating patterns from the vast amount of text data they were trained on.
          </p>
        </div>

        <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <BrainCircuit className="w-6 h-6 mr-3 text-purple-400" />
            How Do They 'Think'? Tokens and Probability
          </h2>
          <p className="text-gray-300 mb-4">
            AI doesn't understand text like a human does. Instead, it breaks everything down into smaller pieces called <strong>tokens</strong>. A token can be a whole word, a part of a word, or even just a punctuation mark.
          </p>
          <p className="text-gray-300 mb-4">
            For example, the phrase <code className="bg-gray-700 px-1 py-0.5 rounded">"Prompt engineering is cool"</code> might be tokenized into:
            <code className="bg-gray-700 px-1 py-0.5 rounded">[Prompt]</code>, <code className="bg-gray-700 px-1 py-0.5 rounded">[ engineering]</code>, <code className="bg-gray-700 px-1 py-0.5 rounded">[ is]</code>, <code className="bg-gray-700 px-1 py-0.5 rounded">[ cool]</code>.
          </p>
          <p className="text-gray-300">
            The model then uses complex mathematical calculations (think of it as a giant probability map) to determine the most likely token to come next. When you give it a prompt, you're giving it a starting point on this map.
          </p>
        </div>

        <InteractiveTokenizer />

        <div className="p-6 bg-gray-800 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
            <Puzzle className="w-6 h-6 mr-3 text-green-400" />
            Why This Matters for Prompting
          </h2>
          <p className="text-gray-300">
            Understanding this core mechanic is your secret weapon in prompt engineering. Your job is to provide the AI with a starting sequence of tokens (your prompt) that makes your desired output the most probable next sequence. You are essentially guiding the AI through its probability map to the exact destination you want.
          </p>
        </div>
      </section>
    </LessonTemplate>
  );
};

export default Lesson1_1;