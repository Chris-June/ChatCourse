import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Sparkles } from 'lucide-react';
import CopyButton from '../../../components/CopyButton';

interface InteractivePromptExerciseProps {
  initialPrompt: string;
  aiFeedback: {
    suggestion: string;
    reasoning: string;
  };
}

const InteractivePromptExercise: React.FC<InteractivePromptExerciseProps> = ({ initialPrompt, aiFeedback }) => {
  const [promptText, setPromptText] = useState(initialPrompt);
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <div className="bg-card p-6 rounded-lg border my-6 text-card-foreground">
      <div className="relative">
        <CopyButton textToCopy={promptText} />
        <textarea
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          className="w-full p-3 bg-muted rounded-md font-mono text-sm text-foreground whitespace-pre-wrap min-h-[150px] border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        />
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={() => setShowFeedback(true)}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center mx-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
          Get AI Feedback
        </button>
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-6 bg-muted p-4 rounded-lg border"
            role="region" aria-live="polite" aria-label="AI suggestion"
          >
            <div className="flex items-start">
              <Lightbulb className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" aria-hidden="true" />
              <div>
                <h4 className="font-bold">AI Suggestion</h4>
                <p className="text-foreground italic">{aiFeedback.suggestion}</p>
                <p className="text-xs text-muted-foreground mt-2"><strong>Reasoning:</strong> {aiFeedback.reasoning}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractivePromptExercise;
