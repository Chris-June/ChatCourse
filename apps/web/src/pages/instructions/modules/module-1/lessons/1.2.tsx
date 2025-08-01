import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, Info, Puzzle } from 'lucide-react';
import { useProgressStore } from '../../../../../store/progressStore';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

// A simple, client-side tokenizer for demonstration purposes.
const simpleTokenize = (text: string): string[] => {
  if (!text) return [];
  // This is a simplified tokenizer. It splits by spaces and punctuation.
  // It's not how real tokenizers work, but illustrates the concept.
  const tokens = text.match(/\w+|[.,!?;:]|\s/g) || [];
  return tokens.map(token => token.replace(/ /g, ' ')); // Make spaces visible
};

const InteractiveTokenizer: React.FC = () => {
  const [text, setText] = useState('Hello world! This is a test.');
  const [tokens, setTokens] = useState<string[]>([]);

  useEffect(() => {
    setTokens(simpleTokenize(text));
  }, [text]);

  const tokenColors = [
    'bg-blue-500/20 text-blue-300',
    'bg-green-500/20 text-green-300',
    'bg-yellow-500/20 text-yellow-300',
    'bg-purple-500/20 text-purple-300',
    'bg-pink-500/20 text-pink-300',
  ];

  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 my-6">
      <h3 className="text-lg font-semibold text-cyan-300 mb-2">Try It Yourself</h3>
      <p className="text-gray-400 mb-4 text-sm">Type in the box below to see how your words are broken down into tokens. Notice how words, punctuation, and even spaces can be separate tokens.</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
      />
      <div className="mt-4 p-4 bg-gray-800 rounded-md">
        <h4 className="text-sm font-semibold text-gray-300 mb-2">Tokens ({tokens.length}):</h4>
        <div className="flex flex-wrap gap-1">
          {tokens.map((token, index) => (
            <span key={index} className={`px-2 py-1 rounded-md text-sm font-mono ${tokenColors[index % tokenColors.length]}`}>
              {token === ' ' ? '[space]' : token}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Lesson1_2: React.FC = () => {
  const { completeLesson } = useProgressStore();

  const quizQuestions = [
    {
      questionText: 'What is a \'token\' in the context of an LLM?',
      options: [
        'A special password to use the AI',
        'A piece of a word, a whole word, or punctuation that the AI processes',
        'A type of cryptocurrency',
        'A command to the AI'
      ],
      correctAnswer: 'A piece of a word, a whole word, or punctuation that the AI processes',
      explanation: 'Correct! Tokens are the basic building blocks of text that an AI uses to read, understand, and generate language.'
    },
    {
      questionText: 'Why is understanding tokens important for prompting?',
      options: [
        'It helps you write shorter prompts.',
        'It explains why AI responses can sometimes feel unnatural or have strange errors.',
        'It allows you to bypass the AI\'s safety filters.',
        'It is not important at all.'
      ],
      correctAnswer: 'It explains why AI responses can sometimes feel unnatural or have strange errors.',
      explanation: 'Exactly. Knowing that the AI thinks in tokens helps you understand its limitations and quirks, like misspelling words or getting confused by complex punctuation.'
    },
  ];

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fadeIn 0.5s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white font-sans">
      
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-400">Module 1: The Art of the Prompt</h1>
        <p className="text-lg text-gray-400 mt-2">Lesson 1.2: The AI's Language (Tokens)</p>
      </header>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 animate-fade-in">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
          <Puzzle className="inline-block w-6 h-6 mr-2 -mt-1" />
          Breaking It Down: Thinking in Tokens
        </h2>
        <p className="text-gray-300 mb-4">
          You and I see words and sentences. An AI sees something different: <strong className='text-yellow-300'>tokens</strong>. A token is a chunk of text, which could be a whole word, part of a word, a punctuation mark, or even a space.
        </p>
        <p className="text-gray-300 mb-4">
          For example, the phrase "prompt engineering is fun!" might be broken down into these tokens:
        </p>
        <div className="flex flex-wrap gap-2 justify-center bg-gray-900 p-4 rounded-lg">
          <span className='px-3 py-1 rounded-md text-sm font-mono bg-blue-500/20 text-blue-300'>prompt</span>
          <span className='px-3 py-1 rounded-md text-sm font-mono bg-green-500/20 text-green-300'>engineering</span>
          <span className='px-3 py-1 rounded-md text-sm font-mono bg-yellow-500/20 text-yellow-300'>is</span>
          <span className='px-3 py-1 rounded-md text-sm font-mono bg-purple-500/20 text-purple-300'>fun</span>
          <span className='px-3 py-1 rounded-md text-sm font-mono bg-pink-500/20 text-pink-300'>!</span>
        </div>
        <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
          <p className="text-blue-200 text-sm">
            <span className="font-semibold">Why this matters:</span> The AI doesn't predict the next 'word'; it predicts the next 'token'. This is why AIs sometimes misspell complex words or create new, non-existent ones—it's just stringing together the most probable tokens it knows.
          </p>
        </div>
      </section>

      <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <InteractiveTokenizer />
      </section>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
          <Info className="inline-block w-6 h-6 mr-2 -mt-1" />
          Lesson Summary
        </h2>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start">
            <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
            AI models read and write using 'tokens', not words.
          </li>
          <li className="flex items-start">
            <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
            Tokens can be words, parts of words, or punctuation.
          </li>
           <li className="flex items-start">
            <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
            Understanding tokens helps explain some of the AI's strange behaviors and limitations.
          </li>
        </ul>
        <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
          <p className="text-blue-200">
            <span className="font-semibold">Next Up:</span> What happens when the AI's pattern-matching goes wrong? Let's talk about hallucinations.
          </p>
        </div>
      </section>

      <section className="mt-8">
        <ModuleQuizzes questions={quizQuestions} />
      </section>

      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-1/1.1" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: What is an AI?
        </Link>
        <Link 
          to="/instructions/module-1/1.3" 
          onClick={() => completeLesson(1, 2)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: When AI Gets It Wrong <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson1_2;
