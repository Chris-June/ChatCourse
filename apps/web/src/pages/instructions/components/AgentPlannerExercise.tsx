import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Sparkles, Loader } from 'lucide-react';

interface AgentPlannerExerciseProps {
  initialPlan: string;
  aiFeedback: {
    suggestion: string;
    reasoning: string;
  };
}

const AgentPlannerExercise: React.FC<AgentPlannerExerciseProps> = ({ initialPlan, aiFeedback }) => {
  const [planText, setPlanText] = useState(initialPlan);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetFeedback = async () => {
    setIsLoading(true);
    setShowFeedback(false);
    // Simulate API call for feedback
    await new Promise(resolve => setTimeout(resolve, 1200));
    setShowFeedback(true);
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-900/50 p-6 rounded-lg border border-dashed border-gray-700 my-6">
      <textarea
        value={planText}
        onChange={(e) => setPlanText(e.target.value)}
        className="w-full p-3 bg-gray-800 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap min-h-[150px] focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Outline your agent's Observe-Think-Act steps here..."
      />

      <div className="mt-4 text-center">
        <button
          onClick={handleGetFeedback}
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-semibold flex items-center justify-center mx-auto disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <><Loader className="w-4 h-4 mr-2 animate-spin" /> Analyzing Plan...</>
          ) : (
            <><Sparkles className="w-4 h-4 mr-2" /> Get Feedback</>
          )}
        </button>
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-gray-800 p-4 rounded-lg"
          >
            <div className="flex items-start">
              <Lightbulb className="w-6 h-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-yellow-300">AI Suggestion</h4>
                <p className="text-gray-300 italic">{aiFeedback.suggestion}</p>
                <p className="text-xs text-gray-400 mt-2"><strong>Reasoning:</strong> {aiFeedback.reasoning}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgentPlannerExercise;
