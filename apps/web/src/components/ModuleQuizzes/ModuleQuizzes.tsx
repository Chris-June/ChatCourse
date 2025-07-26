import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactConfetti from 'react-confetti';

// Define the types for our quiz data
interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface ModuleQuizzesProps {
  questions: Question[];
}

const ModuleQuizzes: React.FC<ModuleQuizzesProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((question, index) => {
      if (question.correctAnswer === selectedAnswers[index]) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setShowResults(true);

    const percentage = (calculatedScore / questions.length) * 100;
    if (percentage >= 80) {
      setShowConfetti(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  if (showResults) {
    const percentage = (score / questions.length) * 100;
        const passed = percentage >= 80;

    const getAnswerClasses = (question: Question, index: number) => {
      const selected = selectedAnswers[index];
      const correct = question.correctAnswer;
      if (selected === correct) {
        return 'border-green-500 bg-green-900/20';
      }
      if (selected && selected !== correct) {
        return 'border-red-500 bg-red-900/20';
      }
      return 'border-gray-700';
    };

    return (
      <div className="bg-gray-900/50 p-6 rounded-lg border border-cyan-700/50 mt-8 relative"> 
        {passed && showConfetti && 
          <ReactConfetti 
            recycle={false} 
            numberOfPieces={200}
            onConfettiComplete={() => setShowConfetti(false)}
          />
        }
                <h2 className="text-2xl font-bold mb-4 text-cyan-300">Quiz Results</h2>
                <p className="text-lg mb-4 text-gray-200">You scored {score} out of {questions.length} ({percentage.toFixed(0)}%)</p>
        {passed ? (
                    <p className="text-green-400 font-bold flex items-center"><CheckCircle className="w-5 h-5 mr-2" />Congratulations! You passed the validation test.</p>
        ) : (
                    <p className="text-red-400 font-bold flex items-center"><XCircle className="w-5 h-5 mr-2" />You did not pass. Please review the material and try again.</p>
        )}

        <div className="mt-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-200">Review Answers:</h3>
          {questions.map((question, index) => {
            const isCorrect = selectedAnswers[index] === question.correctAnswer;
            return (
              <div key={index} className={`mb-4 p-4 border rounded-md ${getAnswerClasses(question, index)}`}>
                <div className="flex items-start">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 mr-3 mt-1 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 mr-3 mt-1 text-red-500 flex-shrink-0" />
                  )}
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-200">{question.questionText}</p>
                    <p className={`mt-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                      Your answer: {selectedAnswers[index] || 'Not answered'}
                    </p>
                    {!isCorrect && (
                      <p className="text-green-400">Correct answer: {question.correctAnswer}</p>
                    )}
                    <p className="text-sm text-gray-400 mt-2 bg-gray-800/50 p-2 rounded-md">Explanation: {question.explanation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!passed && (
                        <button onClick={handleRetry} className="mt-4 flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
                                <RefreshCw className="w-4 h-4 mr-2" />Retry Quiz
            </button>
        )}
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-gray-900/50 p-6 rounded-lg border border-cyan-700/50 mt-8">
                  <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-cyan-300 flex items-center">
          <HelpCircle className="w-7 h-7 mr-3"/>
          Validation of Learning
        </h2>
        <span className="text-sm font-semibold text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
          {currentQuestionIndex + 1} / {questions.length}
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <p className="text-lg font-semibold text-gray-200">{currentQuestion.questionText}</p>
          <div className="flex flex-col mt-2">
            {currentQuestion.options.map((option, index) => (
              <label key={index} className={`flex items-center p-3 my-2 border rounded-lg cursor-pointer transition-all duration-200 ${selectedAnswers[currentQuestionIndex] === option ? 'bg-blue-900/50 border-blue-500' : 'border-gray-700 hover:bg-gray-800 hover:border-cyan-500'}`}>
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  checked={selectedAnswers[currentQuestionIndex] === option}
                  onChange={() => handleAnswerSelect(option)}
                  className="hidden"
                />
                <span className={`w-5 h-5 mr-3 border-2 rounded-full flex-shrink-0 ${selectedAnswers[currentQuestionIndex] === option ? 'bg-blue-500 border-blue-400' : 'border-gray-500'}`}></span>
                <span className="text-gray-300">{option}</span>
              </label>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      
      {currentQuestionIndex < questions.length - 1 ? (
                <button onClick={handleNextQuestion} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
          Next
        </button>
      ) : (
                <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors">
          Submit
        </button>
      )}
    </div>
  );
};

export default ModuleQuizzes;
