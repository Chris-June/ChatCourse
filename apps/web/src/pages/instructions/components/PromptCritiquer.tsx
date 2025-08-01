import React, { useState } from 'react';
import { Check, X, HelpCircle } from 'lucide-react';

const promptToCritique = {
  text: 'Write an email about the new project.',
  missing: ['nuance', 'style', 'youAsNarrative', 'context'],
  elements: {
    intent: { label: 'Intent', present: true, explanation: 'The prompt clearly states the main goal: \'Write an email\'.' },
    nuance: { label: 'Nuance', present: false, explanation: 'It lacks specifics. What project? What should the email say? Are there any constraints?' },
    style: { label: 'Style', present: false, explanation: 'The desired tone is missing. Should it be formal, casual, urgent, or encouraging?' },
    youAsNarrative: { label: 'Persona', present: false, explanation: 'The AI has not been given a role. Is it a manager, a colleague, or an assistant?' },
    context: { label: 'Context', present: false, explanation: 'There is no background information. The AI knows nothing about the project or the recipients.' },
  }
};

type ElementKey = keyof typeof promptToCritique.elements;

const PromptCritiquer: React.FC = () => {
  const [guesses, setGuesses] = useState<Record<ElementKey, boolean>>({ intent: false, nuance: false, style: false, youAsNarrative: false, context: false });
  const [submitted, setSubmitted] = useState(false);

  const handleGuessChange = (key: ElementKey) => {
    setGuesses(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getScore = () => {
    let correctGuesses = 0;
    for (const key in guesses) {
      if (guesses[key as ElementKey] === !promptToCritique.elements[key as ElementKey].present) {
        correctGuesses++;
      }
    }
    return correctGuesses;
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-dashed border-gray-600 my-6">
      <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
        <HelpCircle className="w-6 h-6 mr-3 text-blue-400" />
        Interactive Challenge: Critique This Prompt!
      </h3>
      <p className="text-gray-400 mb-4">Analyze the prompt below. Check the boxes for all the I.N.S.Y.N.C. elements you think are <span className='font-bold text-red-400'>missing</span>.</p>

      <div className="bg-gray-900 p-4 rounded-md border border-gray-700 mb-4">
        <p className="text-lg text-center font-mono text-gray-300 italic">"{promptToCritique.text}"</p>
      </div>

      <div className="space-y-3">
        {(Object.keys(promptToCritique.elements) as ElementKey[]).map(key => {
          const element = promptToCritique.elements[key];
          const isCorrect = guesses[key] === !element.present;
          return (
            <div key={key} className={`p-3 rounded-md transition-all duration-200 ${submitted ? (isCorrect ? 'bg-green-900/50' : 'bg-red-900/50') : 'bg-gray-700'}`}>
              <label className="flex items-center text-white cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={guesses[key]} 
                  onChange={() => handleGuessChange(key)}
                  disabled={submitted}
                  className="w-5 h-5 rounded bg-gray-600 border-gray-500 text-blue-500 focus:ring-blue-600 mr-4"
                />
                <span>{element.label}</span>
                {submitted && (
                  isCorrect ? <Check className="w-5 h-5 text-green-400 ml-auto" /> : <X className="w-5 h-5 text-red-400 ml-auto" />
                )}
              </label>
              {submitted && <p className='text-sm text-gray-300 mt-2 pl-9'>{element.explanation}</p>}
            </div>
          );
        })}
      </div>

      {!submitted ? (
        <button onClick={() => setSubmitted(true)} className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Check My Answers
        </button>
      ) : (
        <div className='text-center mt-4 p-3 bg-gray-900 rounded-md'>
            <p className='font-bold text-lg'>You found {getScore()} out of 5 correctly!</p>
            <button onClick={() => { setSubmitted(false); setGuesses({ intent: false, nuance: false, style: false, youAsNarrative: false, context: false }); }} className="mt-2 px-4 py-1 text-sm bg-gray-600 hover:bg-gray-500 rounded-md">
              Try Again
            </button>
        </div>
      )}
    </div>
  );
};

export default PromptCritiquer;
