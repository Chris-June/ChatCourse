import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Check, X, HelpCircle } from 'lucide-react';
import LessonHeader from '../../../../../components/layouts/LessonHeader';
import LessonFooter from '../../../../../components/layouts/LessonFooter';
import { useProgressStore } from '../../../../../store/progressStore';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

// A new, self-contained interactive component for the Hallucination Game
const HallucinationGame: React.FC = () => {
  const statements = [
    {
      text: 'The Eiffel Tower is located in Paris, France and was completed in 1889.',
      isHallucination: false,
      explanation: 'This is a well-known, verifiable fact. The Eiffel Tower was indeed completed in March 1889 for the World\'s Fair.',
    },
    {
      text: 'The first person to walk on the moon was Neil Armstrong, who famously said, \'That\'s one small step for a man, one giant leap for mankind.\'',
      isHallucination: false,
      explanation: 'This is a correct historical fact and a famous quote from the Apollo 11 mission in 1969.',
    },
    {
      text: 'The Golden Gate Bridge in San Francisco is famous for its reddish-orange color, which is known as \'International Orange\' and was originally chosen to make it more visible in the city\'s dense fog.',
      isHallucination: false,
      explanation: 'This is true. The color was selected specifically for visibility and has become iconic.',
    },
    {
      text: 'The best way to treat a jellyfish sting is to urinate on it, as the ammonia in urine neutralizes the venom.',
      isHallucination: true,
      explanation: 'This is a common myth popularized by TV shows. Urinating on a sting can actually make it worse by causing the stingers to release more venom. The recommended treatment is rinsing with vinegar or hot water.',
    },
    {
      text: 'The inventor of the telephone, Alexander Graham Bell, made the first-ever phone call to his assistant, Thomas Watson, who was in the next room.',
      isHallucination: false,
      explanation: 'This is a historically accurate account of the first telephone call made in March 1876.',
    },
    {
      text: 'Penguins are found in the Arctic and are the primary predators of polar bears.',
      isHallucination: true,
      explanation: 'This is a complete fabrication. Penguins live almost exclusively in the Southern Hemisphere (Antarctica), while polar bears live in the Arctic (Northern Hemisphere). They would never meet in the wild.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState<'fact' | 'hallucination' | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentStatement = statements[currentIndex];

  const handleGuess = (userGuess: 'fact' | 'hallucination') => {
    setGuess(userGuess);
    setShowResult(true);
  };

  const handleNext = () => {
    setShowResult(false);
    setGuess(null);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % statements.length);
  };

  const isCorrect = guess !== null && (guess === 'fact' ? !currentStatement.isHallucination : currentStatement.isHallucination);

  return (
    <div className="bg-gray-900 border border-purple-500/30 p-6 rounded-lg my-6">
      <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center"><HelpCircle className="mr-3"/>The Hallucination Game</h3>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-lg text-gray-300 bg-gray-800 p-4 rounded-md min-h-[100px]">"{currentStatement.text}"</p>
        </motion.div>
      </AnimatePresence>

      {!showResult ? (
        <div className="flex justify-center space-x-4 mt-4">
          <button onClick={() => handleGuess('fact')} className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105">Fact</button>
          <button onClick={() => handleGuess('hallucination')} className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105">Hallucination</button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <div className={`p-4 rounded-lg flex items-start space-x-4 ${isCorrect ? 'bg-green-900/50 border border-green-500/50' : 'bg-red-900/50 border border-red-500/50'}`}>
            {isCorrect ? <Check className="w-8 h-8 text-green-400 flex-shrink-0"/> : <X className="w-8 h-8 text-red-400 flex-shrink-0"/>}
            <div>
              <h4 className="font-bold text-lg">{isCorrect ? 'Correct!' : 'Not Quite.'} This is {currentStatement.isHallucination ? 'a hallucination' : 'a fact'}.</h4>
              <p className="text-gray-300 mt-1">{currentStatement.explanation}</p>
            </div>
          </div>
          <button onClick={handleNext} className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">Next Statement</button>
        </motion.div>
      )}
    </div>
  );
};

const Lesson1_3: React.FC = () => {
  const { completeLesson } = useProgressStore();

  const quizQuestions = [
    {
      questionText: 'What is an AI \'hallucination\'?',
      options: [
        'A deliberately false statement made by the AI.',
        'A feature that allows the AI to create images.',
        'A confident-sounding but incorrect or nonsensical statement made by the AI.',
        'A secret message hidden in the AI\'s response.'
      ],
      correctAnswer: 'A confident-sounding but incorrect or nonsensical statement made by the AI.',
      explanation: 'Hallucinations happen because the AI is a prediction engine. It strings together plausible-sounding tokens, but it doesn\'t have a true understanding or fact-checker, so it can sometimes invent facts, sources, or details that are incorrect.'
    },
    {
      questionText: 'Why do AI hallucinations occur?',
      options: [
        'Because the AI is trying to be creative.',
        'Because the AI has a bad sense of humor.',
        'Because the AI is predicting the next word based on patterns, not facts, and can sometimes generate plausible but untrue information.',
        'Because the user asked a trick question.'
      ],
      correctAnswer: 'Because the AI is predicting the next word based on patterns, not facts, and can sometimes generate plausible but untrue information.',
      explanation: 'The AI\'s goal is to create a statistically likely sequence of words. If the patterns in its training data lead to an incorrect statement that seems plausible, it will generate it. It lacks a ground truth or fact-checking mechanism.'
    }
  ];

  return (
    <div className="space-y-6 p-4 md:p-6 bg-gray-900 text-white">
      <LessonHeader 
        title="1.3: When AI Gets It Wrong (Hallucinations)"
        subtitle="Understanding and identifying AI-generated misinformation."
      />

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-purple-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-purple-400" />
          The Confident Robot Problem
        </h2>
        <p className="text-gray-300 mb-4">
          You've seen that AI is a powerful prediction engine. But what happens when its predictions go wrong? This leads to one of the most important and sometimes frustrating concepts in AI: <strong>hallucinations</strong>.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-purple-500/50">
          <p className="text-lg text-center font-semibold text-purple-200">
            An AI hallucination is a response that is nonsensical or factually incorrect, but delivered with complete confidence.
          </p>
        </div>
        <p className="text-gray-300 mt-4">
          Think of it this way: the AI doesn't 'know' things. It only knows which words are likely to follow other words. Sometimes, the most 'likely' path leads to a dead end of made-up facts, fake statistics, or invented stories. Because it has no concept of 'truth,' it can't tell you it's making something up. It just keeps predicting.
        </p>
      </div>

      <HallucinationGame />

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-green-300">Key Takeaways</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start">
            <Check className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
            <span><strong>Always Verify:</strong> Never trust an AI's factual claims without checking them from a reliable source, especially for important information.</span>
          </li>
          <li className="flex items-start">
            <Check className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
            <span><strong>It's a Feature, Not a Bug:</strong> Hallucinations are a natural side effect of how LLMs work. They aren't 'lying' because they don't understand the concept of truth.</span>
          </li>
           <li className="flex items-start">
            <Check className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
            <span><strong>Your Prompts Matter:</strong> Providing clear context and constraints in your prompts can help reduce the likelihood of hallucinations, but cannot eliminate them entirely.</span>
          </li>
        </ul>
      </div>

      <ModuleQuizzes questions={quizQuestions} />

      <LessonFooter 
        prevLessonPath="/instructions/module-1/1.2"
        prevLessonTitle="1.2: The I.N.S.Y.N.C. Framework"
        nextLessonPath="/instructions/module-1/1.4"
        nextLessonTitle="1.4: The Art of the Ask (Intro to Prompting)"
        onNextClick={() => completeLesson(1, 3)}
      />
    </div>
  );
};

export default Lesson1_3;
