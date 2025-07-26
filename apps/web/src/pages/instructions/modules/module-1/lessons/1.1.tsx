import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, Check, X, AlertTriangle, Info, Clock, Zap, Cpu, Brain, AlertCircle, ThumbsUp, ThumbsDown, CheckCircle, XCircle } from 'lucide-react';
import { useProgressStore } from '../../../../../store/progressStore';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

// Simple tokenizer function for demonstration
const tokenizeText = (text: string): string[] => {
  // This is a simplified tokenizer for demonstration
  // In a real app, you'd want to use the same tokenizer as your LLM
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
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mt-4">
      <h3 className="font-semibold text-lg text-cyan-300 mb-3">Try It: Tokenization Demo</h3>
      <p className="text-gray-400 mb-4">
        Type some text below to see how it gets broken down into tokens. Notice how punctuation and spaces are handled!
      </p>
      
      <div className="mb-4">
        <textarea
          value={inputText}
          onChange={handleInputChange}
          className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows={3}
          placeholder="Type something here..."
        />
      </div>

      <div className="mb-2 flex items-center">
        <span className="text-sm text-gray-400">Token Count: </span>
        <span className="ml-2 px-2 py-1 bg-blue-900/50 text-blue-300 rounded text-sm">
          {tokens.length} tokens
        </span>
        <button
          onClick={animateTokens}
          className="ml-4 flex items-center text-sm text-blue-400 hover:text-blue-300"
        >
          <Sparkles className="w-4 h-4 mr-1" /> Animate
        </button>
      </div>

      <div className="flex flex-wrap gap-2 min-h-[60px] p-3 bg-gray-800/50 rounded-lg border border-dashed border-gray-600">
        {tokens.length > 0 ? (
          tokens.map((token, index) => (
            <span
              key={index}
              className={`px-2 py-1 bg-cyan-900/40 text-cyan-300 rounded text-sm transition-all duration-300 ${
                isAnimating ? 'animate-pulse' : ''
              }`}
              style={{
                animationDelay: isAnimating ? `${index * 50}ms` : '0s',
              }}
            >
              {token}
            </span>
          ))
        ) : (
          <span className="text-gray-500 text-sm">No tokens to display</span>
        )}
      </div>
      
      <p className="mt-3 text-xs text-gray-500">
        <strong>Note:</strong> This is a simplified demonstration. Actual tokenization in LLMs is more complex.
      </p>
    </div>
  );
};

const Lesson1_1: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What is the fundamental way Large Language Models (LLMs) work?',
      options: [
        'By searching a database of facts',
        'By predicting the next most likely word (or token) in a sequence',
        'By executing a pre-written script',
        'By understanding human emotions'
      ],
      correctAnswer: 'By predicting the next most likely word (or token) in a sequence',
      explanation: 'LLMs are probabilistic models that generate text by predicting the next token based on the patterns they learned from vast amounts of training data.'
    },
    {
      questionText: 'What is a \"token\" in the context of an LLM?',
      options: [
        'A special password for accessing the AI',
        'A complete sentence or paragraph',
        'A common piece of a word or a whole word',
        'A unit of memory the AI uses'
      ],
      correctAnswer: 'A common piece of a word or a whole word',
      explanation: 'Tokenization breaks text down into smaller units (tokens), which can be words or parts of words, that the model can process.'
    },
    {
      questionText: 'Which of the following is a common limitation of AI, as discussed in the lesson?',
      options: [
        'It cannot perform calculations',
        'It can \"hallucinate\" or make up incorrect information',
        'It cannot write code',
        'It is always 100% objective and free of bias'
      ],
      correctAnswer: 'It can \"hallucinate\" or make up incorrect information',
      explanation: 'AI can confidently present false or nonsensical information as if it were factual. This is a key limitation to be aware of.'
    },
    {
      questionText: 'What is a good strategy for identifying AI-generated text?',
      options: [
        'It always contains spelling mistakes',
        'It is always very short and concise',
        'Looking for overly formal, generic, or repetitive language',
        'It never uses complex vocabulary'
      ],
      correctAnswer: 'Looking for overly formal, generic, or repetitive language',
      explanation: 'While not foolproof, AI-generated text can sometimes lack the specific details, personal voice, and nuance of human writing.'
    },
    {
      questionText: 'According to the lesson, what is the most likely impact of AI on jobs?',
      options: [
        'AI will replace all human jobs within 5 years',
        'AI will have no impact on the job market',
        'AI will augment human capabilities, changing jobs rather than eliminating them',
        'AI will only create jobs, not displace any'
      ],
      correctAnswer: 'AI will augment human capabilities, changing jobs rather than eliminating them',
      explanation: 'The lesson emphasizes that AI is a tool that will likely change how we work, making the combination of human skills and AI tools highly valuable.'
    }
  ];

  const { completeLesson } = useProgressStore();
  // AI vs Human comparison data
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

  // State for AI vs Human comparison exercise
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const handleSelectAnswer = (id: number) => setShowAnswer(id);

  // Hallucination spotting game data
  const hallucinationExamples = [
    {
      id: 1,
      statement: "The study published in Nature last week showed that drinking coffee makes you live 10 years longer.",
      isHallucination: true,
      explanation: "This is likely a hallucination because it makes a specific claim about a study in Nature but doesn't provide a citation. The claim about living 10 years longer is also an extraordinary claim that would require extraordinary evidence.",
      source: "AI-generated text about health benefits of coffee"
    },
    {
      id: 2,
      statement: "The capital of France is Paris, which is located in the northern part of the country along the Seine River.",
      isHallucination: false,
      explanation: "This is a factual statement that can be verified. Paris is indeed the capital of France and is located in the northern part of the country along the Seine River.",
      source: "Basic geography fact"
    },
    {
      id: 3,
      statement: "According to renowned physicist Dr. Sarah Chen, the universe is actually a simulation created by an advanced alien civilization.",
      isHallucination: true,
      explanation: "This appears to be a hallucination because it attributes a specific, extraordinary claim to a specific person without providing any verifiable source. While the simulation hypothesis is a real theory, attributing it to a specific person without evidence is problematic.",
      source: "AI-generated text about theoretical physics"
    },
    {
      id: 4,
      statement: "The human body contains 206 bones, with the smallest being the stapes in the ear and the largest being the femur.",
      isHallucination: false,
      explanation: "This is a factual statement about human anatomy that can be verified in medical literature. The numbers and names are accurate.",
      source: "Basic human anatomy fact"
    }
  ];

  const [currentHallucinationIndex, setCurrentHallucinationIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const currentExample = hallucinationExamples[currentHallucinationIndex];

  const handleHallucinationAnswer = (isHallucination: boolean) => {
    setUserAnswer(isHallucination);
    setShowExplanation(true);
    
    if (isHallucination === currentExample.isHallucination) {
      setScore(prev => prev + 1);
    }
  };

  const nextHallucination = () => {
    if (currentHallucinationIndex < hallucinationExamples.length - 1) {
      setCurrentHallucinationIndex(prev => prev + 1);
      setUserAnswer(null);
      setShowExplanation(false);
    } else {
      setGameComplete(true);
    }
  };

  const resetHallucinationGame = () => {
    setCurrentHallucinationIndex(0);
    setUserAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setGameComplete(false);
  };

  // Reset function for the comparison exercise
  const resetExercise = () => {
    setShowAnswer(null);
  };

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">1.1 Introduction to AI and Prompts</h1>
        <Link 
          to="/instructions/module-1/1.2" 
          onClick={() => completeLesson(1, 1)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Crafting Effective Prompts <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>

      <p className="text-lg text-gray-300">
        Welcome to the start of your AI journey! In this first lesson, we'll pull back the curtain on what AI, especially the kind we'll be using, really is. We'll explore how it's different from the software you're used to, what it's good at, and where it falls short.
      </p>

      {/* AI vs. Traditional Programming */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">AI vs. Traditional Programming</h2>
        <p className="text-gray-300 mb-4">
          The most fundamental shift to understand is how AI-driven development differs from writing code in a traditional sense.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="font-bold text-lg text-white mb-2">Traditional Programming</h3>
            <p className="text-gray-400">You write <span className="text-green-400 font-mono">explicit, step-by-step instructions</span> (code). The computer follows these rules precisely. If you want to sort a list, you write or use a sorting algorithm.</p>
            <p className="mt-2 text-sm text-gray-500"><strong>Analogy:</strong> A detailed recipe. Follow it exactly, and you get the same cake every time.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="font-bold text-lg text-white mb-2">AI Development</h3>
            <p className="text-gray-400">You provide a <span className="text-yellow-400 font-mono">goal and data</span>. The AI model <span className="text-yellow-400 font-mono">learns patterns</span> from the data to figure out how to achieve the goal. You don't tell it *how* to sort; you show it many sorted lists and it learns what "sorted" means.</p>
            <p className="mt-2 text-sm text-gray-500"><strong>Analogy:</strong> Teaching a chef by letting them taste thousands of cakes. They learn the "essence" of a good cake and can create new ones.</p>
          </div>
        </div>

        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">AI or Human? A Comparison Exercise</h2>
          <p className="text-gray-300 mb-6">
            One way to understand AI's capabilities is to compare its outputs with human writing. 
            Read each statement below and guess whether it was written by a human or an AI. 
            Click on your choice to see the answer and explanation.
          </p>
          
          <div className="space-y-6">
            {comparisonExamples.map((example) => (
              <div key={example.id} className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                <p className="text-gray-200 italic mb-4">"{example.text}"</p>
                
                <div className="flex flex-wrap gap-3 mb-3">
                  <button
                    onClick={() => handleSelectAnswer(example.id)}
                    disabled={showAnswer === example.id}
                    className={`px-4 py-2 rounded-lg flex items-center ${
                      showAnswer === example.id
                        ? example.source === 'human'
                          ? 'bg-green-900/50 text-green-300 border border-green-800'
                          : 'bg-red-900/50 text-red-300 border border-red-800'
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    } transition-colors`}
                  >
                    {showAnswer === example.id && example.source === 'human' ? (
                      <Check className="w-4 h-4 mr-2" />
                    ) : showAnswer === example.id ? (
                      <X className="w-4 h-4 mr-2" />
                    ) : null}
                    Human-Written
                  </button>
                  
                  <button
                    onClick={() => handleSelectAnswer(example.id)}
                    disabled={showAnswer === example.id}
                    className={`px-4 py-2 rounded-lg flex items-center ${
                      showAnswer === example.id
                        ? example.source === 'ai'
                          ? 'bg-green-900/50 text-green-300 border border-green-800'
                          : 'bg-red-900/50 text-red-300 border border-red-800'
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    } transition-colors`}
                  >
                    {showAnswer === example.id && example.source === 'ai' ? (
                      <Check className="w-4 h-4 mr-2" />
                    ) : showAnswer === example.id ? (
                      <X className="w-4 h-4 mr-2" />
                    ) : null}
                    AI-Generated
                  </button>
                </div>
                
                {showAnswer === example.id && (
                  <div className="mt-2 p-3 bg-gray-800/50 rounded-lg border-l-4 border-blue-500">
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold">This is {example.source === 'ai' ? 'AI-generated' : 'human-written'}.</span> {example.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {showAnswer !== null && (
            <button
              onClick={resetExercise}
              className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center mx-auto"
            >
              Try Again
            </button>
          )}
        </div>
      </section>

      {/* Large Language Models 101 */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Large Language Models 101</h2>
        <p className="text-gray-300 mb-4">
          The "AI" we'll be collaborating with is a Large Language Model (LLM). These are complex systems trained on a massive amount of text and code from the internet.
        </p>
        <p className="text-gray-300">
          At their core, LLMs are incredibly sophisticated <span className="text-cyan-400 font-semibold">pattern-matching machines</span>. Their primary function is to predict the next most likely word (or "token") in a sequence. When you ask a question, it's predicting the sequence of words that forms the most probable answer based on everything it has learned.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Key Concepts:</h3>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li><span className="font-semibold text-cyan-300">Tokens:</span> The building blocks of text for an LLM. A token can be a word, a part of a word, or punctuation. "Hello world!" might be three tokens: "Hello", " world", "!".
              <InteractiveTokenizer />
            </li>
            <li><span className="font-semibold text-cyan-300">Parameters:</span> Think of these as the "knowledge" the model has learned. They are the internal variables adjusted during training. Models like GPT-4 have trillions of them.</li>
            <li><span className="font-semibold text-cyan-300">Training:</span> The process of feeding the model vast datasets and having it adjust its parameters to get better at predicting text.</li>
          </ul>
        </div>
      </section>

      {/* Capabilities and Limitations */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Capabilities and Limitations</h2>
        <p className="text-gray-300 mb-4">
          Understanding what AI excels at and where it struggles is crucial for effective collaboration.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="font-bold text-lg text-green-400 mb-2">Strengths (Capabilities)</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li>Generating creative text, code, and ideas.</li>
              <li>Summarizing and explaining complex topics.</li>
              <li>Translating languages.</li>
              <li>Brainstorming and exploring possibilities.</li>
              <li>Performing repetitive text-based tasks quickly.</li>
            </ul>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="font-bold text-lg text-red-400 mb-2">Weaknesses (Limitations)</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              <li><span className="font-semibold">Hallucinations:</span> Confidently making up facts.</li>
              <li>Lack of real-world, real-time knowledge.</li>
              <li>Inconsistent logical reasoning.</li>
              <li>Can reflect biases from its training data.</li>
              <li>Struggles with precise, multi-step math.</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-700">
          <p className="text-blue-200"><span className="font-bold">Key Takeaway:</span> Treat the AI as a brilliant, incredibly fast, but sometimes unreliable intern. Your job as the collaborator is to guide it, verify its work, and leverage its strengths while mitigating its weaknesses.</p>
        </div>
      </section>

      {/* Hallucination Spotting Game */}
      <section className="mt-6 bg-gray-900/70 p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-semibold text-amber-400 mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" /> Hallucination Spotting Game
        </h3>
        
        {!gameComplete ? (
          <div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-amber-900/50 mb-4">
              <p className="text-gray-300 italic">"{currentExample.statement}"</p>
              <p className="text-xs text-gray-500 mt-2">Source: {currentExample.source}</p>
            </div>
            
            <div className="space-y-3">
              <p className="text-gray-300">Is this statement a hallucination?</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => handleHallucinationAnswer(true)}
                  disabled={userAnswer !== null}
                  className={`px-4 py-2 rounded-lg flex-1 ${
                    userAnswer === true
                      ? currentExample.isHallucination
                        ? 'bg-green-900/50 text-green-300 border border-green-800'
                        : 'bg-red-900/50 text-red-300 border border-red-800'
                      : 'bg-amber-900/30 hover:bg-amber-800/30 text-amber-200 border border-amber-800/50'
                  } transition-colors`}
                >
                  Yes, it's a hallucination
                </button>
                <button
                  onClick={() => handleHallucinationAnswer(false)}
                  disabled={userAnswer !== null}
                  className={`px-4 py-2 rounded-lg flex-1 ${
                    userAnswer === false
                      ? !currentExample.isHallucination
                        ? 'bg-green-900/50 text-green-300 border border-green-800'
                        : 'bg-red-900/50 text-red-300 border border-red-800'
                      : 'bg-amber-900/30 hover:bg-amber-800/30 text-amber-200 border border-amber-800/50'
                  } transition-colors`}
                >
                  No, it's factual
                </button>
              </div>
            </div>
            
            {showExplanation && (
              <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border-l-4 border-amber-500">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {userAnswer === currentExample.isHallucination ? (
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-300">
                      {userAnswer === currentExample.isHallucination
                        ? 'Correct! '
                        : 'Not quite. '}
                      {currentExample.explanation}
                    </p>
                    <div className="mt-4">
                      <button
                        onClick={nextHallucination}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-500 transition-colors"
                      >
                        {currentHallucinationIndex < hallucinationExamples.length - 1
                          ? 'Next Example'
                          : 'See Results'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <h4 className="text-xl font-semibold text-gray-200 mb-2">Game Complete!</h4>
            <p className="text-gray-400 mb-6">
              Your score: {score} out of {hallucinationExamples.length}
            </p>
            <button
              onClick={resetHallucinationGame}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-500 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}
      </section>

      {/* Historical Timeline of AI Development */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-blue-300">
          <Clock className="inline-block w-6 h-6 mr-2 -mt-1" />
          A Brief History of AI Development
        </h2>
        
        <p className="text-gray-300 mb-6">
          Understanding the evolution of AI helps contextualize today's technology. 
          Here are some key milestones in AI development:
        </p>

        <div className="space-y-8 relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-500/30"></div>
          
          {/* Timeline Item 1 */}
          <div className="relative pl-12">
            <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white -ml-4">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-semibold text-white">1950s: The Birth of AI</h3>
            <p className="text-gray-400 text-sm">
              Alan Turing proposes the "Turing Test" and the term "Artificial Intelligence" is coined at the Dartmouth Conference (1956).
            </p>
          </div>
          
          {/* Timeline Item 2 */}
          <div className="relative pl-12">
            <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white -ml-4">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-semibold text-white">1980s-90s: Expert Systems & Machine Learning</h3>
            <p className="text-gray-400 text-sm">
              Rise of expert systems and the first machine learning algorithms. Backpropagation algorithm revolutionizes neural networks.
            </p>
          </div>
          
          {/* Timeline Item 3 */}
          <div className="relative pl-12">
            <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white -ml-4">
              <Brain className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-semibold text-white">2010s: Deep Learning Revolution</h3>
            <p className="text-gray-400 text-sm">
              Breakthroughs in deep learning lead to superhuman performance in image recognition, natural language processing, and game playing (e.g., AlphaGo).
            </p>
          </div>
          
          {/* Timeline Item 4 */}
          <div className="relative pl-12">
            <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white -ml-4">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-semibold text-white">2020s: Large Language Models</h3>
            <p className="text-gray-400 text-sm">
              Models like GPT-3 and beyond demonstrate remarkable language understanding and generation capabilities, transforming how we interact with AI.
            </p>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
          <p className="text-blue-200 text-sm">
            <span className="font-semibold">Note:</span> This timeline is simplified. AI development has involved thousands of researchers and many more milestones than shown here.
          </p>
        </div>
      </section>

      {/* Common Misconceptions Debunked */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-blue-300">
          <AlertCircle className="inline-block w-6 h-6 mr-2 -mt-1" />
          Common Misconceptions About AI
        </h2>
        
        <p className="text-gray-300 mb-6">
          There are many myths and misunderstandings about AI. Let's clarify some of the most common ones:
        </p>

        <div className="space-y-6">
          {/* Misconception 1 */}
          <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-700">
            <div className="flex items-start">
              <div className="bg-red-500/20 p-2 rounded-lg mr-4">
                <ThumbsDown className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-2">Myth: AI is sentient or conscious</h3>
                <p className="text-gray-400">
                  <span className="text-green-400 font-medium">Reality:</span> Current AI, including LLMs, are not sentient. They don't have consciousness, self-awareness, or understanding. They're sophisticated pattern recognizers that predict the next word based on their training data.
                </p>
              </div>
            </div>
          </div>

          {/* Misconception 2 */}
          <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-700">
            <div className="flex items-start">
              <div className="bg-red-500/20 p-2 rounded-lg mr-4">
                <ThumbsDown className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-2">Myth: AI is 100% objective and unbiased</h3>
                <p className="text-gray-400">
                  <span className="text-green-400 font-medium">Reality:</span> AI models can reflect and even amplify biases present in their training data. They don't have inherent moral reasoning and can produce biased or harmful outputs.
                </p>
              </div>
            </div>
          </div>

          {/* Misconception 3 */}
          <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-700">
            <div className="flex items-start">
              <div className="bg-green-500/20 p-2 rounded-lg mr-4">
                <ThumbsUp className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">Fact: AI can be a powerful tool for creativity</h3>
                <p className="text-gray-400">
                  While AI doesn't "create" in the human sense, it can be an excellent tool for brainstorming, generating ideas, and overcoming creative blocks when used effectively.
                </p>
              </div>
            </div>
          </div>

          {/* Misconception 4 */}
          <div className="bg-gray-900/50 p-5 rounded-lg border border-gray-700">
            <div className="flex items-start">
              <div className="bg-red-500/20 p-2 rounded-lg mr-4">
                <ThumbsDown className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-2">Myth: AI will replace all human jobs</h3>
                <p className="text-gray-400">
                  <span className="text-green-400 font-medium">Reality:</span> While AI will change the job market, it's more likely to augment human capabilities than replace them entirely. The most valuable skills will be those that combine AI tools with human judgment, creativity, and emotional intelligence.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
          <p className="text-blue-200 text-sm">
            <span className="font-semibold">Remember:</span> AI is a tool, and like any tool, its value comes from how we use it. Understanding its limitations is just as important as understanding its capabilities.
          </p>
        </div>
      </section>

      {/* Lesson Summary */}
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
                AI processes information differently from traditional programming
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                Large Language Models (LLMs) work by predicting the next token
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                AI has both impressive capabilities and important limitations
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Key Skills</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                Identifying AI-generated content
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                Recognizing AI limitations and potential errors
              </li>
              <li className="flex items-start">
                <Check className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                Understanding how to interact effectively with AI systems
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
          <p className="text-blue-200">
            <span className="font-semibold">Remember:</span> This lesson is just the beginning. In the next lesson, you'll learn how to craft effective prompts to get the most out of AI systems.
          </p>
        </div>
      </section>

      {/* Validation Quiz */}
      <section className="mt-8">
        <ModuleQuizzes questions={quizQuestions} />
      </section>

      {/* Navigation */}
      <div className="flex justify-end pt-4">
        <Link 
          to="/instructions/module-1/1.2" 
          onClick={() => completeLesson(1, 1)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Crafting Effective Prompts <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson1_1;
