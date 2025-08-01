import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Check, X, HelpCircle } from 'lucide-react';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';

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
          <button onClick={() => handleGuess('fact')} className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105">Fact</button>
          <button onClick={() => handleGuess('hallucination')} className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105">Hallucination</button>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`mt-4 p-4 rounded-lg text-center ${isCorrect ? 'bg-green-900/50 border border-green-500' : 'bg-red-900/50 border border-red-500'}`}>
          <h4 className="font-bold text-lg flex items-center justify-center">
            {isCorrect ? <Check className="mr-2 text-green-400"/> : <X className="mr-2 text-red-400"/>}
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </h4>
          <p className="text-sm text-gray-300 mt-2">{currentStatement.explanation}</p>
          <button onClick={handleNext} className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-1 px-4 rounded-full text-sm">Next Statement</button>
        </motion.div>
      )}
    </div>
  );
};

const Lesson1_3: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What is an AI \'hallucination\'',
      options: [
        'A creative story generated by the AI.',
        'A factual error or nonsensical statement presented as fact.',
        'A feature that allows the AI to see images.',
        'A type of computer virus.'
      ],
      correctAnswer: 'A factual error or nonsensical statement presented as fact.',
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
    },
    {
      questionText: 'How can you best mitigate or reduce AI hallucinations?',
      options: [
        'Asking the AI to be more creative.',
        'Providing specific context and grounding data in the prompt.',
        'Using shorter prompts.',
        'Typing in all caps.'
      ],
      correctAnswer: 'Providing specific context and grounding data in the prompt.',
      explanation: 'Grounding the AI with real data, like a document or transcript, forces it to base its answers on provided facts rather than making things up from patterns.'
    },
    {
      questionText: 'Which of the following is a common example of an AI hallucination?',
      options: [
        'The AI refusing to answer a question.',
        'The AI providing a correct summary of a long article.',
        'The AI inventing a fake academic paper or URL to support its claims.',
        'The AI asking for clarification.'
      ],
      correctAnswer: 'The AI inventing a fake academic paper or URL to support its claims.',
      explanation: 'This is a classic hallucination. The AI predicts what a citation *should* look like but invents the details because it does not have access to a real one.'
    },
    {
      questionText: 'True or False: If an AI sounds confident, its answer is more likely to be factually correct.',
      options: [
        'True',
        'False'
      ],
      correctAnswer: 'False',
      explanation: 'An AI\'s tone is just another part of its prediction. It can generate highly confident-sounding prose for completely fabricated information. Always verify critical information from a primary source.'
    }
  ];

  return (
    <LessonTemplate
      moduleNumber={1}
      lessonNumber={3}
      title="1.3: When AI Gets It Wrong (Hallucinations)"
      subtitle="Understanding and identifying AI-generated misinformation."
      quizQuestions={quizQuestions}
    >
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
        <h2 className="text-2xl font-semibold mb-4 text-orange-300 flex items-center">
          Why Do They Really Happen?
        </h2>
        <p className="text-gray-300 mb-4">
          Hallucinations are a direct side effect of the AI's core function: predicting the next word. The AI isn't consulting a knowledge base; it's weaving together words based on statistical patterns from its training data.
        </p>
        <p className="text-gray-300">
          Imagine an actor who forgets their lines but is determined to keep the play going. Instead of stopping, they improvise something that sounds plausible in the context of the scene. The AI does the same—it fills in gaps with what's statistically likely, which isn't always what's factually true.
        </p>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-teal-300 flex items-center">
          How to Mitigate Hallucinations
        </h2>
        <p className="text-gray-300 mb-4">
          You can't eliminate hallucinations entirely, but you can significantly reduce their likelihood with good prompting habits:
        </p>
        <ul className="space-y-3 text-gray-300 list-disc list-inside">
          <li><strong>Ask for Sources:</strong> Add phrases like "Cite your sources" or "Provide URLs for your claims." While the AI can hallucinate sources too, this often forces it to ground its response in more factual data.</li>
          <li><strong>Provide Grounding Context:</strong> Use the 'C' in the I.N.S.Y.N.C. framework. By giving the AI the specific text, data, or background information it needs, you anchor its predictions to your facts, not its own.</li>
          <li><strong>Request a Confidence Score:</strong> Ask the AI to "rate its confidence in this answer on a scale of 1 to 10." This can sometimes give you a signal about how speculative the response is.</li> 
          <li><strong>Use Structured Responses:</strong> While hallucinations are true, there have been many improvements such as "Structured Responses" that correct hallucinations including other mechanisms we will discuss later in this course.</li>
        </ul>
      </div>

      <div className="bg-yellow-900/50 border border-yellow-600/50 p-4 rounded-lg text-center">
        <h4 className="font-bold text-yellow-300">Pro-Tip: Healthy Skepticism</h4>
        <p className="text-yellow-200/80 mt-1">Treat AI responses like a helpful starting point from a brilliant but sometimes unreliable intern. Always verify critical information yourself.</p>
      </div>

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
    </LessonTemplate>
  );
};

export default Lesson1_3;
