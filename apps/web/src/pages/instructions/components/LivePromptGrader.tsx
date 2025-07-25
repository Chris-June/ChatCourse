import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle, XCircle, Loader } from 'lucide-react';

interface LivePromptGraderProps {
  functionSchema: object;
  initialPrompt: string;
}

const LivePromptGrader: React.FC<LivePromptGraderProps> = ({ functionSchema, initialPrompt }) => {
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

    // TODO: Replace simulated API call with a real one to a new `/api/chat/grade-function-prompt` endpoint.
    // The endpoint should accept `promptText` and `functionSchema` and return a score and feedback.

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulated, rule-based feedback
    let score = 50;
    let feedbackText = 'Your prompt is a bit too generic. Try being more specific about the date and time.';

    if (promptText.match(/\d{1,2}(am|pm)/i)) {
      score += 25;
      feedbackText = 'Good job specifying a time! Now, can you add a specific date instead of a relative one like \'today\' or \'tomorrow\'?';
    }

    if (promptText.includes('check-in') || promptText.includes('sync')) {
      score += 25;
      feedbackText = 'Excellent work including a clear topic for the meeting!';
    }
    
    if (score > 90) {
        feedbackText = 'This is a great prompt! It is clear, specific, and provides all the necessary information for the function call.'
    }

    setFeedback({ score, feedback: feedbackText });
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-900/50 p-6 rounded-lg border border-dashed border-gray-700 my-6">
      <div className="mb-4">
        <h4 className="font-bold text-white mb-2">Function Schema:</h4>
        <pre className="p-3 bg-gray-800 rounded-md font-mono text-xs text-gray-300 whitespace-pre-wrap">
          {JSON.stringify(functionSchema, null, 2)}
        </pre>
      </div>

      <textarea
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)}
        className="w-full p-3 bg-gray-800 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap min-h-[100px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Write your prompt here..."
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

export default LivePromptGrader;
