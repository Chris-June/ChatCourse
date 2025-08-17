import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Lightbulb, Database, Settings, CheckCircle, XCircle, Target } from 'lucide-react';
import InteractiveHeader from '@/components/InteractiveHeader';

const questions = [
  {
    scenario: 'You need to build a chatbot that can answer questions about your company\'s internal documents, which are updated daily.',
    options: ['Prompt Engineering', 'RAG', 'Fine-Tuning'],
    correctAnswer: 'RAG',
    explanation: 'RAG is perfect here because it can access fresh, up-to-date information from an external knowledge base without needing to retrain the model every day.',
  },
  {
    scenario: 'You want your AI to adopt a very specific personality and tone for a creative writing assistant—like sounding exactly like Shakespeare.',
    options: ['Prompt Engineering', 'RAG', 'Fine-Tuning'],
    correctAnswer: 'Fine-Tuning',
    explanation: 'Fine-tuning is the best way to teach a model a new style or behavior. It alters the model\'s internal weights to consistently produce a specific tone.',
  },
  {
    scenario: 'You need to quickly summarize a single, long article. The task is a one-off requirement.',
    options: ['Prompt Engineering', 'RAG', 'Fine-Tuning'],
    correctAnswer: 'Prompt Engineering',
    explanation: 'A well-crafted prompt is sufficient for a one-time task. Setting up RAG or fine-tuning would be overkill and not cost-effective.',
  },
  {
    scenario: 'A legal firm wants an AI to answer questions by citing specific paragraphs from a static, 20,000-page legal code.',
    options: ['Prompt Engineering', 'RAG', 'Fine-Tuning'],
    correctAnswer: 'RAG',
    explanation: 'RAG excels at retrieving specific information from a large, dense corpus of documents. It can provide answers and cite the exact source.',
  },
];

const StrategyQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const getIcon = (option: string) => {
    if (option === 'Prompt Engineering') return <Lightbulb className="w-5 h-5 mr-2" />;
    if (option === 'RAG') return <Database className="w-5 h-5 mr-2" />;
    if (option === 'Fine-Tuning') return <Settings className="w-5 h-5 mr-2" />;
  };

  return (
    <div className="bg-card border rounded-xl p-6">
      <InteractiveHeader title="Interactive Strategy Quiz" subtitle="Choose the right technique for the scenario" icon={Target} />
      <h3 className="text-xl font-bold text-foreground mb-4">When to Use Which Technique?</h3>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-muted-foreground mb-4 font-semibold">Scenario {currentQuestionIndex + 1}/{questions.length}:</p>
          <p className="text-lg text-foreground mb-6 min-h-[60px]">{currentQuestion.scenario}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentQuestion.options.map((option) => (
              <Button
                key={option}
                onClick={() => handleAnswer(option)}
                disabled={showExplanation}
                variant={selectedAnswer === option ? (isCorrect ? 'default' : 'destructive') : 'outline'}
                className={`h-auto py-3 text-base justify-start`}>
                <span aria-hidden="true">{getIcon(option)}</span>
                {option}
              </Button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 p-4 rounded-lg bg-muted border"
          >
            <div className="flex items-center gap-3">
              <span aria-hidden="true">{isCorrect ? (
                <CheckCircle className="w-8 h-8 text-green-500" />
              ) : (
                <XCircle className="w-8 h-8 text-red-500" />
              )}</span>
              <div>
                <h4 className="font-bold text-lg text-foreground">{isCorrect ? 'Correct!' : 'Not Quite'} The best choice is {currentQuestion.correctAnswer}.</h4>
                <p className="text-muted-foreground mt-1">{currentQuestion.explanation}</p>
              </div>
            </div>
            <Button onClick={handleNext} className="w-full mt-4">Next Scenario</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StrategyQuiz;
