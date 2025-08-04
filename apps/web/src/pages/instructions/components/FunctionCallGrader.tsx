import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle, XCircle, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EvaluationCriterion {
  id: string;
  label: string;
  description: string;
  passes: (prompt: string) => boolean;
  weight: number;
}

interface FunctionCallGraderProps {
  functionSchema: any;
  initialPrompt: string;
  evaluationCriteria: EvaluationCriterion[];
}

const FunctionCallGrader: React.FC<FunctionCallGraderProps> = ({
  functionSchema,
  initialPrompt,
  evaluationCriteria,
}) => {
  const [promptText, setPromptText] = useState(initialPrompt);
  const [feedback, setFeedback] = useState<{
    score: number;
    feedback: string;
    results: { label: string; passes: boolean }[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getGradeColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const handleGradePrompt = async () => {
    setIsLoading(true);
    setFeedback(null);

    await new Promise((resolve) => setTimeout(resolve, 750));

    let totalScore = 0;
    const feedbackResults: { label: string; passes: boolean }[] = [];
    let feedbackSummary = '';

    evaluationCriteria.forEach((criterion) => {
      const passes = criterion.passes(promptText);
      if (passes) {
        totalScore += criterion.weight;
      }
      feedbackResults.push({ label: criterion.label, passes });
    });

    if (totalScore >= 95) {
      feedbackSummary =
        'Excellent! The prompt is clear, specific, and provides all necessary information.';
    } else if (totalScore >= 70) {
      feedbackSummary =
        'Good job! The prompt is mostly effective but could be slightly clearer.';
    } else {
      feedbackSummary =
        'Needs improvement. The prompt is missing key information or is ambiguous.';
    }

    setFeedback({
      score: totalScore,
      feedback: feedbackSummary,
      results: feedbackResults,
    });
    setIsLoading(false);
  };

  return (
    <div className="p-6 bg-card border border-border rounded-lg my-6">
      <div className="mb-4">
        <h4 className="font-bold text-foreground mb-2">
          Your Target Function Schema:
        </h4>
        <pre className="p-3 bg-muted rounded-md font-mono text-xs text-muted-foreground whitespace-pre-wrap">
          {JSON.stringify(functionSchema, null, 2)}
        </pre>
      </div>

      <textarea
        value={promptText}
        onChange={(e) => setPromptText(e.target.value)}
        className="w-full p-3 bg-input rounded-md font-mono text-sm text-foreground whitespace-pre-wrap min-h-[100px] focus:ring-2 focus:ring-primary focus:outline-none"
        placeholder="Write a prompt to trigger the function above..."
      />

      <div className="mt-4 text-center">
        <Button
          onClick={handleGradePrompt}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" /> Grading...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" /> Grade My Prompt
            </>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-muted/50 rounded-lg border border-border"
          >
            <div className="flex items-center mb-3">
              <h4
                className={`font-bold text-lg flex-grow ${getGradeColor(
                  feedback.score
                )}`}
              >
                Score: {feedback.score} / 100
              </h4>
            </div>
            <div className="space-y-2">
              {feedback.results.map((result, index) => (
                <div key={index} className="flex items-center text-sm">
                  {result.passes ? (
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2 text-red-500 flex-shrink-0" />
                  )}
                  <span className="text-muted-foreground">{result.label}</span>
                </div>
              ))}
            </div>
            <p className="text-foreground italic mt-4 pt-3 border-t border-border">
              {feedback.feedback}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FunctionCallGrader;
