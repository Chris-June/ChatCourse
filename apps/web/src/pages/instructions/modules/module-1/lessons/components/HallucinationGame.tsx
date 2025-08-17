import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, HelpCircle } from 'lucide-react';

const HallucinationGame: React.FC = () => {
  const statements = [
    {
      text: 'The Eiffel Tower is located in Paris, France and was completed in 1889.',
      isHallucination: false,
      explanation: "This is a well-known, verifiable fact. The Eiffel Tower was indeed completed in March 1889 for the World's Fair.",
    },
    {
      text: "The first person to walk on the moon was Neil Armstrong, who famously said, 'That's one small step for a man, one giant leap for mankind.'",
      isHallucination: false,
      explanation: 'This is a correct historical fact and a famous quote from the Apollo 11 mission in 1969.',
    },
    {
      text: "The Golden Gate Bridge in San Francisco is famous for its reddish-orange color, which is known as 'International Orange' and was originally chosen to make it more visible in the city's dense fog.",
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

  const isCorrect =
    guess !== null && (guess === 'fact' ? !currentStatement.isHallucination : currentStatement.isHallucination);

  return (
    <div className="bg-card p-6 rounded-xl my-6 border border-border">
      <h3 className="text-xl font-bold text-card-foreground mb-4 flex items-center">
        <HelpCircle className="w-6 h-6 mr-3 text-sky-400" />The Hallucination Game
      </h3>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-lg text-muted-foreground bg-muted p-4 rounded-md min-h-[100px]">"{currentStatement.text}"</p>
        </motion.div>
      </AnimatePresence>

      {!showResult ? (
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => handleGuess('fact')}
            className="bg-success hover:bg-success/90 text-success-foreground font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Fact
          </button>
          <button
            onClick={() => handleGuess('hallucination')}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Hallucination
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`mt-4 p-4 rounded-lg text-center ${
            isCorrect ? 'bg-success/10 border-success/20' : 'bg-destructive/10 border-destructive/20'
          } border`}
          role="status"
          aria-live="polite"
        >
          <h4 className="font-bold text-lg flex items-center justify-center">
            {isCorrect ? <Check className="mr-2 text-success" /> : <X className="mr-2 text-destructive" />}
            <span className={isCorrect ? 'text-success' : 'text-destructive'}>{isCorrect ? 'Correct!' : 'Incorrect'}</span>
          </h4>
          <p className="text-muted-foreground mt-2">{currentStatement.explanation}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Verification tip: Cross-check with a primary or authoritative source (e.g., official site, encyclopedia, scholarly database).
          </p>
          <button
            onClick={handleNext}
            className="mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
          >
            Next Statement
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default HallucinationGame;
