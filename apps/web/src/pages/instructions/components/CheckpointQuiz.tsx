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

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
  };

  return (
    <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl my-6">
      <h4 className="font-bold text-lg text-white mb-4">Checkpoint Quiz</h4>
      <p className="text-gray-300 mb-4">{question}</p>
      <div className="space-y-3">
        {options.map((option, index) => {
          const isCorrect = index === correctAnswerIndex;
          const isSelected = selectedAnswer === index;
          let buttonClass = 'w-full text-left p-3 rounded-xl transition-colors ';
          if (isAnswered) {
            if (isCorrect) {
              buttonClass += 'bg-green-800/50 border border-green-600';
            } else if (isSelected) {
              buttonClass += 'bg-red-800/50 border border-red-600';
            } else {
              buttonClass += 'bg-gray-800 opacity-60';
            }
          } else {
            buttonClass += 'bg-gray-800 hover:bg-gray-700';
          }

          return (
            <button key={index} onClick={() => handleSelect(index)} className={buttonClass} disabled={isAnswered}>
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {isAnswered && isSelected && (
                  isCorrect ? <Check className="text-green-400" /> : <X className="text-red-400" />
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
          className="mt-4 p-3 bg-gray-800 rounded-xl text-gray-300"
        >
          <strong className={selectedAnswer === correctAnswerIndex ? 'text-green-400' : 'text-red-400'}>
            {selectedAnswer === correctAnswerIndex ? 'Correct!' : 'Not quite.'}
          </strong>{' '}
          {explanation}
        </motion.div>
      )}
    </div>
  );
};

export default CheckpointQuiz;
