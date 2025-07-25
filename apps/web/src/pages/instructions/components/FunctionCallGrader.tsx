import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle, XCircle, Loader } from 'lucide-react';

interface FunctionCallGraderProps {
  functionSchema: any; // Using any for simplicity in this example
  initialPrompt: string;
  evaluationCriteria: {
    triggerWords: string[];
    requiredParams: string[];
  };
}

const FunctionCallGrader: React.FC<FunctionCallGraderProps> = ({ functionSchema, initialPrompt, evaluationCriteria }) => {
  const [promptText, setPromptText] = useState(initialPrompt);
  const [feedback, setFeedback] = useState<{ score: number; feedback: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getGradeColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getGradeIcon = (score: number) => {
    if (score >= 85) return <CheckCircle className="w-6 h-6 mr-2" />;
    return <XCircle className="w-6 h-6 mr-2" />;
  };

  const handleGradePrompt = async () => {
    setIsLoading(true);
    setFeedback(null);

    // Simulate API call for grading
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Client-side simulated grading logic for function calls
    let score = 20;
    let feedbackText = 'Needs improvement. The prompt should clearly state the intent to use the tool.';
    const lowerCasePrompt = promptText.toLowerCase();

    // 1. Check for trigger words
    const hasTriggerWord = evaluationCriteria.triggerWords.some(word => lowerCasePrompt.includes(word));
    if (hasTriggerWord) {
      score += 40;
      feedbackText = 'Good! The prompt clearly signals the intent to get the weather.';
    } else {
      feedbackText = 'Your prompt is ambiguous. Try using words like \"weather\", \"forecast\", or \"temperature\" to make the intent clear.';
      setFeedback({ score, feedback: feedbackText });
      setIsLoading(false);
      return;
    }

    // 2. Check for required parameters
    const missingParams: string[] = [];
    evaluationCriteria.requiredParams.forEach(param => {
      // This is a naive check; a real implementation would be more robust
      if (!lowerCasePrompt.includes(param)) {
        missingParams.push(param);
      }
    });

    if (missingParams.length === 0) {
      score += 40;
      feedbackText = 'Excellent! All required information (like the location) is provided.';
    } else {
      score -= missingParams.length * 20;
      feedbackText = `Getting closer! The prompt is missing values for the following required parameters: ${missingParams.join(', ')}.`;
    }
    
    if (score > 90) {
        feedbackText = 'Perfect! This prompt is specific, unambiguous, and provides all the necessary information to call the function correctly.';
    }

    setFeedback({ score: Math.max(0, score), feedback: feedbackText });
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-900/50 p-6 rounded-lg border border-dashed border-gray-700 my-6">
      <div className="mb-4">
        <h4 className="font-bold text-white mb-2">Your Target Function Schema:</h4>
        <pre className="p-3 bg-gray-800 rounded-md font-mono text-xs text-gray-300 whitespace-pre-wrap">
          {JSON.stringify(functionSchema, null, 2)}
        </pre>
      </div>

      <textarea
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)}
        className="w-full p-3 bg-gray-800 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Write a prompt to trigger the function above..."
      />

      <div className="mt-4 text-center">
        <button
          onClick={handleGradePrompt}
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-semibold flex items-center justify-center mx-auto disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <><Loader className="w-4 h-4 mr-2 animate-spin" /> Grading...</>
          ) : (
            <><Sparkles className="w-4 h-4 mr-2" /> Grade My Prompt</>
          )}
        </button>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-gray-800 p-4 rounded-lg border border-gray-700"
          >
            <div className="flex items-center mb-2">
              {getGradeIcon(feedback.score)}
              <h4 className={`font-bold text-lg ${getGradeColor(feedback.score)}`}>
                Score: {feedback.score} / 100
              </h4>
            </div>
            <p className="text-gray-300 italic ml-8">{feedback.feedback}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FunctionCallGrader;
