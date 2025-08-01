import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Check, X, Info, Cpu, Brain, AlertCircle } from 'lucide-react';
import { useProgressStore } from '../../../../../store/progressStore';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

const Lesson1_1: React.FC = () => {
  const { completeLesson } = useProgressStore();

  const quizQuestions = [
    {
      questionText: 'What is the most fundamental job of a Large Language Model (LLM)?',
      options: [
        'To understand human feelings',
        'To search the internet like a search engine',
        'To predict the next most likely word in a sentence',
        'To follow a strict set of programmed rules'
      ],
      correctAnswer: 'To predict the next most likely word in a sentence',
      explanation: 'Correct! At their core, LLMs are powerful prediction engines that calculate the most probable next word based on patterns from their training data.'
    },
    {
      questionText: 'The lesson compares an LLM to a \'Master Pattern-Matcher\' rather than a \'Master Chef\'. What does this analogy highlight?',
      options: [
        'That AIs are not creative at all',
        'That AIs generate responses based on learned patterns, not true understanding',
        'That AIs can only follow one recipe at a time',
        'That AIs taste-test their own creations'
      ],
      correctAnswer: 'That AIs generate responses based on learned patterns, not true understanding',
      explanation: 'Exactly. The AI knows what a recipe should look like based on seeing millions of examples, but it doesn\'t understand the chemistry of cooking. It\'s all about matching patterns.'
    },
    {
      questionText: 'What is the best way to think about AI in the workplace, according to the lesson?',
      options: [
        'As a tool that will replace all human jobs',
        'As a tool that has no real impact on work',
        'As a tool that can augment human skills, making people more effective',
        'As a tool that only works for programmers'
      ],
      correctAnswer: 'As a tool that can augment human skills, making people more effective',
      explanation: 'That\'s the key takeaway. AI is a powerful tool. The most valuable skill is learning how to use that tool effectively in combination with your own human judgment and creativity.'
    }
  ];

  const comparisonExamples = [
    {
      id: 1,
      text: "The cat sat on the mat, its tail flicking lazily in the afternoon sun.",
      source: 'human',
      explanation: 'Vivid sensory details and specific observations are often hallmarks of human writing.'
    },
    {
      id: 2,
      text: "Based on the available information, the feline domesticus positioned itself in a resting posture upon the textile floor covering.",
      source: 'ai',
      explanation: 'Overly formal language and unnecessary technical terms are common AI giveaways.'
    },
    {
      id: 3,
      text: "I remember when my grandmother taught me to bake her famous apple pie. The kitchen would fill with the scent of cinnamon and butter.",
      source: 'human',
      explanation: 'Personal anecdotes and emotional connections are typically human traits.'
    },
    {
      id: 4,
      text: "To bake an apple pie, one must first procure apples, flour, sugar, and butter. The process involves several steps that must be followed precisely.",
      source: 'ai',
      explanation: 'Generic, instructional tone without personal connection suggests AI generation.'
    },
  ];

  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const handleSelectAnswer = (id: number) => setShowAnswer(id);
  const resetExercise = () => setShowAnswer(null);

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
        <p className="text-lg text-gray-400 mt-2">Lesson 1.1: What is an AI, Really?</p>
      </header>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 animate-fade-in">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
          <Brain className="inline-block w-6 h-6 mr-2 -mt-1" />
          The Big Secret: AI is a Super-Predictor
        </h2>
        <p className="text-gray-300 mb-4">
          Forget the sci-fi movies for a moment. The most important thing to understand about the AI you'll be using is simple: at its core, it's a giant prediction machine. It doesn't 'think' or 'understand' like a human. Instead, it has been trained on a massive amount of text from the internet, books, and more. From that data, it learns patterns.
        </p>
        <p className="text-gray-300 font-semibold text-lg text-center py-4 px-6 bg-gray-900 rounded-lg">
          Its main job is to answer the question: <strong className="text-yellow-300">"Based on everything I've read, what word most likely comes next?"</strong>
        </p>
        <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
          <p className="text-blue-200 text-sm">
            <span className="font-semibold">Real-World Analogy:</span> It's like the autocomplete on your phone's keyboard, but on a massive, super-powered scale. Your phone suggests the next word in your text; an LLM suggests the next word, then the next, and the next, to form entire paragraphs.
          </p>
        </div>
      </section>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
          <Cpu className="inline-block w-6 h-6 mr-2 -mt-1" />
          Analogy: A Recipe Follower vs. a Master Pattern-Matcher
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-green-400 mb-2">Traditional Programming (The Recipe Follower)</h3>
            <p className="text-gray-400">
              Imagine a cook who can only follow a recipe exactly as written. If you tell them to add 1 teaspoon of salt, they will do it perfectly. But they can't invent a new dish or substitute an ingredient. They have no creativity; they just follow instructions.
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-purple-400 mb-2">AI / LLMs (The Master Pattern-Matcher)</h3>
            <p className="text-gray-400">
              Now, imagine someone who has read every recipe book in the world. They don't understand the chemistry of cooking, but they know that 'flour, sugar, eggs' is often followed by 'mix until smooth'. They can generate a recipe for a chocolate cake that sounds perfect because they've seen thousands of them. They are masters of pattern, not masters of understanding.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
          <Info className="inline-block w-6 h-6 mr-2 -mt-1" />
          Can You Tell the Difference?
        </h2>
        <p className="text-gray-300 mb-4">
          Sometimes, AI-generated text can feel a bit... off. It might be too formal, too generic, or lack a personal touch. See if you can guess which of these snippets were written by a human and which by an AI.
        </p>
        <div className="space-y-4">
          {comparisonExamples.map(ex => (
            <div key={ex.id} className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <p className="text-gray-300 italic">"{ex.text}"</p>
              {showAnswer === ex.id ? (
                <div className={`mt-3 p-3 rounded-lg ${ex.source === 'human' ? 'bg-green-900/30' : 'bg-purple-900/30'}`}>
                  <p className="font-bold text-lg mb-1">This was written by a <span className={`${ex.source === 'human' ? 'text-green-400' : 'text-purple-400'}`}>{ex.source.toUpperCase()}</span>.</p>
                  <p className="text-sm text-gray-400">{ex.explanation}</p>
                </div>
              ) : (
                <div className="mt-3 flex gap-3">
                  <button onClick={() => handleSelectAnswer(ex.id)} className="text-sm text-blue-400 hover:underline">Show Answer</button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button onClick={resetExercise} className="text-sm text-gray-500 hover:text-gray-400">Reset</button>
        </div>
      </section>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
          <AlertCircle className="inline-block w-6 h-6 mr-2 -mt-1" />
          Myths vs. Reality
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="flex items-start">
              <X className="w-8 h-8 text-red-400 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-2">Myth: AI understands what it's saying</h3>
                <p className="text-gray-400">
                  <span className="text-green-400 font-medium">Reality:</span> As we've learned, AI is a pattern-matcher, not a thinker. It doesn't have beliefs, consciousness, or intent. It's just calculating the next most probable word.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="flex items-start">
              <X className="w-8 h-8 text-red-400 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-2">Myth: AI will replace all human jobs</h3>
                <p className="text-gray-400">
                  <span className="text-green-400 font-medium">Reality:</span> While AI will change the job market, it's more likely to augment human capabilities than replace them entirely. The most valuable skills will be those that combine AI tools with human judgment, creativity, and emotional intelligence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-blue-300">
          <Info className="inline-block w-6 h-6 mr-2 -mt-1" />
          Lesson Summary
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Key Concepts</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                LLMs work by predicting the next most likely word.
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                They are pattern-matchers, not conscious thinkers.
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Key Skills</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                Distinguishing between AI and human-like understanding.
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                Identifying common traits of AI-generated text.
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
          <p className="text-blue-200">
            <span className="font-semibold">Next Up:</span> Now that you know what an AI is, let's look at how it 'reads' your words. 
          </p>
        </div>
      </section>

      <section className="mt-8">
        <ModuleQuizzes questions={quizQuestions} />
      </section>

      <div className="flex justify-end pt-4">
        <Link 
          to="/instructions/module-1/1.2" 
          onClick={() => completeLesson(1, 1)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: The AI's Language (Tokens) <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson1_1;