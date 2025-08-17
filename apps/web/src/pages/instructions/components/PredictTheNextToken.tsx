import React, { useState } from 'react';
import { CheckCircle, XCircle, Target } from 'lucide-react';
import InteractiveHeader from '@/components/InteractiveHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

const scenarios = [
  {
    sentence: 'The sun is shining and the sky is',
    options: ['blue', 'green', 'heavy'],
    correct: 'blue',
    explanation: 'Based on countless examples of text, \'blue\' is the most statistically likely word to follow \'the sky is...\'.'
  },
  {
    sentence: 'To bake a cake, you first need to mix the flour, sugar, and',
    options: ['eggs', 'concrete', 'water'],
    correct: 'eggs',
    explanation: '\'Eggs\' is a very common ingredient in cake recipes, making it a high-probability next token in this context.'
  },
  {
    sentence: 'The lion is the king of the',
    options: ['jungle', 'ocean', 'office'],
    correct: 'jungle',
    explanation: 'The phrase \'king of the jungle\' is a very strong and common association in language, making it the most predictable choice.'
  }
];

const PredictTheNextToken: React.FC = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const { sentence, options, correct, explanation } = scenarios[currentScenarioIndex];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsCorrect(option === correct);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setCurrentScenarioIndex((prevIndex) => (prevIndex + 1) % scenarios.length);
  };

  return (
    <Card className="my-6">
      <InteractiveHeader title="Interactive Game" subtitle="Predict the next token" icon={Target} />
      <CardHeader>
        <CardTitle className="text-base md:text-lg">Interactive Game: Predict the Next Token!</CardTitle>
        <p className="text-sm text-muted-foreground">An LLM's main job is to predict the next word. Try it yourself—pick the most likely continuation.</p>
      </CardHeader>
      <CardContent>
      <div className="bg-muted p-4 rounded-md border">
        <p className="text-lg text-center font-mono text-foreground/90">
          {sentence} <span className="bg-primary/80 text-transparent animate-pulse rounded px-1">__</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4" role="group" aria-label="Options">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption !== null}
            aria-pressed={selectedOption === option}
            className={`p-3 rounded-md text-center font-semibold transition-all duration-200 border 
              ${selectedOption === null ? 'bg-muted hover:bg-accent' : ''}
              ${selectedOption === option && isCorrect ? 'bg-green-600 text-white ring-2 ring-green-400' : ''}
              ${selectedOption === option && !isCorrect ? 'bg-red-600 text-white ring-2 ring-red-400' : ''}
              ${selectedOption !== null && selectedOption !== option ? 'bg-muted opacity-60' : ''}
            `}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedOption && (
        <div className={`p-4 rounded-md mt-4 flex items-start gap-4 border`} role="status" aria-live="polite">
          {isCorrect ? <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" aria-hidden="true" /> : <XCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" aria-hidden="true" />}
          <div>
            <h4 className={`font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? 'Correct!' : 'Less Likely'}
            </h4>
            <p className="text-sm text-muted-foreground mt-1">{explanation}</p>
            <Button onClick={handleNext} variant="secondary" size="sm" className="mt-3">
              Next Example
            </Button>
          </div>
        </div>
      )}
      </CardContent>
    </Card>
  );
};

export default PredictTheNextToken;
