import React, { useState } from 'react';
import { Check, X, HelpCircle } from 'lucide-react';
import InteractiveHeader from '@/components/InteractiveHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

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
    <Card className="my-6">
      <InteractiveHeader title="Interactive Challenge" subtitle="Critique this prompt" icon={HelpCircle} />
      <CardHeader>
        <CardTitle className="text-base md:text-lg flex items-center">
          <HelpCircle className="w-6 h-6 mr-3 text-primary" aria-hidden="true" />
          Interactive Challenge: Critique This Prompt!
        </CardTitle>
        <p className="text-sm text-muted-foreground">Analyze the prompt below. Check the boxes for all the I.N.S.Y.N.C. elements you think are <span className='font-bold text-destructive'>missing</span>.</p>
      </CardHeader>
      <CardContent>
      <div className="bg-muted p-4 rounded-md border mb-4">
        <p className="text-lg text-center font-mono text-foreground/90 italic">"{promptToCritique.text}"</p>
      </div>

      <div className="space-y-3">
        {(Object.keys(promptToCritique.elements) as ElementKey[]).map(key => {
          const element = promptToCritique.elements[key];
          const isCorrect = guesses[key] === !element.present;
          return (
            <div key={key} className={`p-3 rounded-md transition-all duration-200 border ${submitted ? (isCorrect ? 'bg-green-600/10' : 'bg-red-600/10') : 'bg-muted'}`}>
              <label className="flex items-center cursor-pointer text-foreground">
                <input 
                  type="checkbox" 
                  checked={guesses[key]} 
                  onChange={() => handleGuessChange(key)}
                  disabled={submitted}
                  className="w-5 h-5 rounded border mr-4"
                />
                <span>{element.label}</span>
                {submitted && (
                  isCorrect ? <Check className="w-5 h-5 text-green-600 ml-auto" aria-hidden="true" /> : <X className="w-5 h-5 text-red-600 ml-auto" aria-hidden="true" />
                )}
              </label>
              {submitted && <p className='text-sm text-muted-foreground mt-2 pl-9'>{element.explanation}</p>}
            </div>
          );
        })}
      </div>
      {!submitted ? (
        <Button onClick={() => setSubmitted(true)} className="w-full mt-4">
          Check My Answers
        </Button>
      ) : (
        <div className='text-center mt-4 p-3 bg-muted rounded-md border' role="status" aria-live="polite">
            <p className='font-bold'>You found {getScore()} out of 5 correctly!</p>
            <Button
              onClick={() => { setSubmitted(false); setGuesses({ intent: false, nuance: false, style: false, youAsNarrative: false, context: false }); }}
              variant="secondary"
              size="sm"
              className="mt-2"
            >
              Try Again
            </Button>
        </div>
      )}
      </CardContent>
    </Card>
  );
};

export default PromptCritiquer;
