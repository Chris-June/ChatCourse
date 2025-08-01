import React, { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

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
    <div className="bg-gray-800 p-6 rounded-lg border border-dashed border-gray-600 my-6">
      <h3 className="text-xl font-semibold text-white mb-3">Interactive Game: Predict the Next Token!</h3>
      <p className="text-gray-400 mb-4">An LLM's main job is to predict the next word. Try it yourself! Which word is most likely to come next?</p>
      
      <div className="bg-gray-900 p-4 rounded-md">
        <p className="text-lg text-center font-mono text-gray-300">
          {sentence} <span className="bg-blue-600 text-blue-600 animate-pulse rounded">__</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption !== null}
            className={`p-3 rounded-md text-center font-semibold transition-all duration-200 
              ${selectedOption === null ? 'bg-gray-700 hover:bg-blue-700' : ''}
              ${selectedOption === option && isCorrect ? 'bg-green-600 ring-2 ring-green-400' : ''}
              ${selectedOption === option && !isCorrect ? 'bg-red-600 ring-2 ring-red-400' : ''}
              ${selectedOption !== null && selectedOption !== option ? 'bg-gray-700 opacity-50' : ''}
            `}
          >
            {option}
          </button>
        ))}
      </div>

      {selectedOption && (
        <div className={`p-4 rounded-md mt-4 flex items-start gap-4 ${isCorrect ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
          {isCorrect ? <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" /> : <XCircle className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" />}
          <div>
            <h4 className={`font-bold ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
              {isCorrect ? 'Correct!' : 'Less Likely'}
            </h4>
            <p className="text-sm text-gray-300 mt-1">{explanation}</p>
            <button onClick={handleNext} className="mt-3 px-3 py-1 text-sm bg-gray-600 hover:bg-gray-500 rounded-md">
              Next Example
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictTheNextToken;
