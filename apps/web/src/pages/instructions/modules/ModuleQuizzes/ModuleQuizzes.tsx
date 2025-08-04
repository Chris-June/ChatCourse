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
  onComplete?: (score: number, total: number) => void;
}

const ModuleQuizzes: React.FC<ModuleQuizzesProps> = ({ questions, onComplete }) => {
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
      onComplete?.(calculatedScore, questions.length);
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
        return 'border-success bg-success/10';
      }
      if (selected && selected !== correct) {
        return 'border-destructive bg-destructive/10';
      }
      return 'border';
    };

    return (
      <div className="bg-card p-6 rounded-xl border mt-8 relative"> 
        {passed && showConfetti && 
          <ReactConfetti 
            recycle={false} 
            numberOfPieces={200}
            onConfettiComplete={() => setShowConfetti(false)}
          />
        }
                <h2 className="text-2xl font-bold mb-4 text-primary">Quiz Results</h2>
                <p className="text-lg mb-4 text-foreground">You scored {score} out of {questions.length} ({percentage.toFixed(0)}%)</p>
        {passed ? (
                    <p className="text-success font-bold flex items-center"><CheckCircle className="w-5 h-5 mr-2" />Congratulations! You passed the validation test.</p>
        ) : (
                    <p className="text-destructive font-bold flex items-center"><XCircle className="w-5 h-5 mr-2" />You did not pass. Please review the material and try again.</p>
        )}

        <div className="mt-6">
                    <h3 className="text-xl font-bold mb-2 text-foreground">Review Answers:</h3>
          {questions.map((question, index) => {
            const isCorrect = selectedAnswers[index] === question.correctAnswer;
            return (
              <div key={index} className={`mb-4 p-4 border rounded-md ${getAnswerClasses(question, index)}`}>
                <div className="flex items-start">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 mr-3 mt-1 text-success flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 mr-3 mt-1 text-destructive flex-shrink-0" />
                  )}
                  <div className="flex-grow">
                    <p className="font-semibold text-foreground">{question.questionText}</p>
                    <p className={`mt-2 ${isCorrect ? 'text-success' : 'text-destructive'}`}>
                      Your answer: {selectedAnswers[index] || 'Not answered'}
                    </p>
                    {!isCorrect && (
                      <p className="text-success">Correct answer: {question.correctAnswer}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-2 bg-muted p-2 rounded-md">Explanation: {question.explanation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!passed && (
                        <button onClick={handleRetry} className="mt-4 flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                                <RefreshCw className="w-4 h-4 mr-2" />Retry Quiz
            </button>
        )}
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="bg-card p-6 rounded-xl border mt-8">
                  <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-primary flex items-center">
          <HelpCircle className="w-7 h-7 mr-3"/>
          Validation of Learning
        </h2>
        <span className="text-sm font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full">
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
          <p className="text-lg font-semibold text-foreground">{currentQuestion.questionText}</p>
          <div className="flex flex-col mt-2">
            {currentQuestion.options.map((option, index) => (
              <label key={index} className={`flex items-center p-3 my-2 border rounded-lg cursor-pointer transition-all duration-200 ${selectedAnswers[currentQuestionIndex] === option ? 'bg-primary/10 border-primary' : 'border hover:bg-muted hover:border-primary'}`}>
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  checked={selectedAnswers[currentQuestionIndex] === option}
                  onChange={() => handleAnswerSelect(option)}
                  className="hidden"
                />
                <span className={`w-5 h-5 mr-3 border-2 rounded-full flex-shrink-0 ${selectedAnswers[currentQuestionIndex] === option ? 'bg-primary border-primary' : 'border-muted-foreground'}`}></span>
                <span className="text-muted-foreground">{option}</span>
              </label>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      
      {currentQuestionIndex < questions.length - 1 ? (
        <button onClick={handleNextQuestion} className="px-4 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors">
          Next
        </button>
      ) : (
        <button onClick={handleSubmit} className="px-4 py-2 bg-success text-success-foreground rounded-full hover:bg-success/90 transition-colors">
          Submit
        </button>
      )}
    </div>
  );
};

export default ModuleQuizzes;
