import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface QuizProps {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

const CheckpointQuiz: React.FC<QuizProps> = ({ question, options, correctAnswerIndex, explanation }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const optionRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (isAnswered) return;
    const max = options.length - 1;
    let next = index;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      next = index === max ? 0 : index + 1;
      e.preventDefault();
      optionRefs.current[next]?.focus();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      next = index === 0 ? max : index - 1;
      e.preventDefault();
      optionRefs.current[next]?.focus();
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleSelect(index);
    }
  };

  return (
    <div className="bg-card border p-6 rounded-xl my-6 text-card-foreground">
      <h4 className="font-bold text-lg text-foreground mb-4">Checkpoint Quiz</h4>
      <p className="text-muted-foreground mb-4">{question}</p>
      <div
        className="space-y-3"
        role="radiogroup"
        aria-label="Quiz options"
      >
        {options.map((option, index) => {
          const isCorrect = index === correctAnswerIndex;
          const isSelected = selectedAnswer === index;
          let buttonClass = 'w-full text-left p-3 rounded-xl transition-colors border bg-muted hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ';
          if (isAnswered) {
            if (isCorrect) {
              buttonClass += ' bg-emerald-500/10 border-emerald-500/30';
            } else if (isSelected) {
              buttonClass += ' bg-destructive/10 border-destructive/30';
            } else {
              buttonClass += ' opacity-60';
            }
          } else {
            // default styles already applied in base class
          }

          return (
            <button
              key={index}
              ref={(el) => { optionRefs.current[index] = el; }}
              onClick={() => handleSelect(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={buttonClass}
              disabled={isAnswered}
              role="radio"
              aria-checked={isSelected}
              tabIndex={index === 0 ? 0 : -1}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {isAnswered && isSelected && (
                  isCorrect ? <Check className="h-5 w-5 text-emerald-500" aria-hidden="true" /> : <X className="h-5 w-5 text-destructive" aria-hidden="true" />
                )}
              </div>
            </button>
          );
        })}
      </div>
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-muted rounded-xl text-muted-foreground"
          aria-live="polite"
        >
          <strong className={selectedAnswer === correctAnswerIndex ? 'text-emerald-600' : 'text-destructive'}>
            {selectedAnswer === correctAnswerIndex ? 'Correct!' : 'Not quite.'}
          </strong>{' '}
          {explanation}
        </motion.div>
      )}
    </div>
  );
};

export default CheckpointQuiz;
