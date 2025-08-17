import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle, XCircle, Loader } from 'lucide-react';
import { Button, Textarea } from '@chat/ui';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import InteractiveHeader from '@/components/InteractiveHeader';

interface LivePromptGraderProps {
  functionSchema: object;
  initialPrompt: string;
}

const LivePromptGrader: React.FC<LivePromptGraderProps> = ({ functionSchema, initialPrompt }) => {
  const [promptText, setPromptText] = useState(initialPrompt);
  const [feedback, setFeedback] = useState<{ score: number; feedback: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getGradeColor = (score: number) => {
    if (score >= 85) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getGradeIcon = (score: number) => {
    if (score >= 85) return <CheckCircle className="w-6 h-6 mr-2" aria-hidden="true" />;
    return <XCircle className="w-6 h-6 mr-2" aria-hidden="true" />;
  };

  const handleGradePrompt = async () => {
    setIsLoading(true);
    setFeedback(null);

    try {
      const resp = await fetch('/api/chat/grade-function-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ promptText, functionSchema }),
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Failed to grade prompt: ${resp.status} ${text}`);
      }

      const data: { score?: number; feedback?: string } = await resp.json();
      if (typeof data.score === 'number' && typeof data.feedback === 'string') {
        setFeedback({ score: data.score, feedback: data.feedback });
      } else {
        throw new Error('Invalid response payload.');
      }
    } catch (err) {
      console.error(err);
      setFeedback({
        score: 0,
        feedback: 'We could not grade your prompt at this time. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="my-6">
      <InteractiveHeader title="Interactive Prompt Grader" subtitle="Score and iterate on your function call prompt" icon={Sparkles} />
      <CardHeader>
        <CardTitle className="text-base md:text-lg">Live Prompt Grader</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h4 className="font-semibold text-foreground mb-2">Function Schema:</h4>
          <pre
            className="p-3 rounded-md font-mono text-xs text-muted-foreground whitespace-pre-wrap border bg-muted"
            role="region"
            aria-label="Function schema JSON"
          >
            {JSON.stringify(functionSchema, null, 2)}
          </pre>
        </div>

        <Textarea
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          className="font-mono text-sm min-h-[100px]"
          placeholder="Write your prompt here..."
          aria-label="Prompt text"
        />

        <div className="mt-4 text-center">
          <Button
            onClick={handleGradePrompt}
            disabled={isLoading}
            className="font-semibold mx-auto"
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" /> Grading...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" /> Grade My Prompt
              </>
            )}
          </Button>
        </div>

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 rounded-lg border bg-card p-4"
              role="status"
              aria-live="polite"
            >
              <div className="flex items-center mb-2">
                {getGradeIcon(feedback.score)}
                <h4 className={`font-bold text-lg ${getGradeColor(feedback.score)}`}>
                  Score: {feedback.score} / 100
                </h4>
              </div>
              <p className="text-muted-foreground italic ml-8">{feedback.feedback}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default LivePromptGrader;
