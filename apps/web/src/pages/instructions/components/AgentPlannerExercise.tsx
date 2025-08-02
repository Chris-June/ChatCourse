import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Sparkles, Loader } from 'lucide-react';

interface AgentPlannerExerciseProps {
  goal: string;
  initialPlan: string;
  aiFeedback: {
    suggestion: string;
    reasoning: string;
  };
}

const AgentPlannerExercise: React.FC<AgentPlannerExerciseProps> = ({ goal, initialPlan, aiFeedback }) => {
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
    <div className="bg-gray-900/70 p-6 rounded-xl my-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white text-center mb-1">Exercise: Plan an Agent's Actions</h3>
      <p className="text-center text-gray-400 text-sm mb-4">Based on the agent's goal, write a plan using the Observe-Think-Act framework.</p>

      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <p className="text-sm font-semibold text-white">Agent's Goal:</p>
        <p className="text-lg text-blue-300 font-mono">{goal}</p>
      </div>

      <textarea
        value={planText}
        onChange={(e) => setPlanText(e.target.value)}
        className="w-full p-3 bg-gray-900 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap min-h-[150px] focus:ring-2 focus:ring-blue-500 focus:outline-none border border-gray-700"
        placeholder="Example:&#10;1. (Observe) The goal is to create a GitHub issue.&#10;2. (Think) I need the 'create_issue' tool from the 'github' server.&#10;3. (Act) Call github.create_issue(...)"
      />

      <div className="mt-4 text-center">
        <button
          onClick={handleGetFeedback}
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors font-semibold flex items-center justify-center mx-auto disabled:bg-gray-500 disabled:cursor-not-allowed shadow-lg"
        >
          {isLoading ? (
            <><Loader className="w-4 h-4 mr-2 animate-spin" /> Analyzing Plan...</>
          ) : (
            <><Sparkles className="w-4 h-4 mr-2" /> Get Tutor Feedback</>
          )}
        </button>
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-gray-800/50 p-4 rounded-lg border border-yellow-500/30"
          >
            <div className="flex items-start">
              <Lightbulb className="w-6 h-6 text-yellow-400 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-yellow-300">Tutor Feedback</h4>
                <p className="text-gray-300 mt-2">{aiFeedback.suggestion}</p>
                <div className="mt-3 bg-gray-900/50 p-3 rounded-md border-l-2 border-yellow-500/50">
                    <p className="text-sm font-semibold text-gray-400">Reasoning:</p>
                    <p className="text-sm text-gray-300">{aiFeedback.reasoning}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgentPlannerExercise;
