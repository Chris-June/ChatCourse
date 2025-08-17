import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Sparkles, Loader, ListChecks } from 'lucide-react';
import InteractiveHeader from '@/components/InteractiveHeader';

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
    <div className="bg-card text-card-foreground p-4 md:p-6 rounded-xl my-6 border shadow-sm">
      <InteractiveHeader title="Exercise: Agent Planner" icon={ListChecks} className="mb-4" />
      <h3 className="text-lg font-semibold text-foreground text-center mb-1">Exercise: Plan an Agent's Actions</h3>
      <p className="text-center text-muted-foreground text-sm mb-4">Based on the agent's goal, write a plan using the Observe-Think-Act framework.</p>

      <div className="bg-muted p-4 rounded-lg mb-4 border">
        <p className="text-sm font-semibold text-foreground">Agent's Goal:</p>
        <p className="text-lg text-primary font-mono break-words">{goal}</p>
      </div>

      <textarea
        value={planText}
        onChange={(e) => setPlanText(e.target.value)}
        className="w-full p-3 bg-background text-foreground rounded-md font-mono text-sm whitespace-pre-wrap min-h-[150px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring border"
        placeholder="Example:&#10;1. (Observe) The goal is to create a GitHub issue.&#10;2. (Think) I need the 'create_issue' tool from the 'github' server.&#10;3. (Act) Call github.create_issue(...)"
        aria-label="Agent plan text area"
      />

      <div className="mt-4 text-center">
        <button
          onClick={handleGetFeedback}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-semibold mx-auto disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background shadow-sm"
        >
          {isLoading ? (
            <><Loader className="h-4 w-4 animate-spin" aria-hidden="true" /> Analyzing Plan...</>
          ) : (
            <><Sparkles className="h-4 w-4" aria-hidden="true" /> Get Tutor Feedback</>
          )}
        </button>
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-muted p-4 rounded-lg border"
            aria-live="polite"
          >
            <div className="flex items-start">
              <Lightbulb className="h-5 w-5 text-primary mr-4 mt-1 flex-shrink-0" aria-hidden="true" />
              <div>
                <h4 className="font-semibold text-primary">Tutor Feedback</h4>
                <p className="text-foreground mt-2">{aiFeedback.suggestion}</p>
                <div className="mt-3 bg-background p-3 rounded-md border-l-2 border-primary/50">
                    <p className="text-sm font-semibold text-muted-foreground">Reasoning:</p>
                    <p className="text-sm text-foreground">{aiFeedback.reasoning}</p>
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
