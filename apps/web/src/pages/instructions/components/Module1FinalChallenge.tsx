import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Check, Clipboard } from 'lucide-react';
import { useChatStore } from '@/store/chat';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button, Textarea } from '@chat/ui';



const Module1FinalChallenge: React.FC = () => {
  const { apiKey } = useChatStore();
  const [userPrompt, setUserPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    if (!userPrompt || !apiKey) return;

    setIsLoading(true);
    setEvaluationResult(null);

    try {
      const response = await fetch('/api/chat/evaluate-final-challenge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ userPrompt }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      setEvaluationResult(data);

    } catch (error) {
      console.error('Failed to evaluate final challenge:', error);
      // Optionally, set an error state here to show in the UI
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle className="text-base md:text-lg">Final Challenge</CardTitle>
        <p className="text-sm text-muted-foreground">Craft a prompt and get automated feedback with improvement suggestions.</p>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-4 rounded-xl border mb-4">
          <h3 className="text-lg font-semibold text-foreground">The Scenario</h3>
          <p className="text-muted-foreground mt-2">
            You are a marketing assistant at a startup launching a new AI-powered productivity app called 'CogniFlow'. Your manager has asked you to generate three distinct social media posts (for Twitter, LinkedIn, and a blog) announcing the launch. The posts must be tailored to each platform's audience and style, highlight specific features, and avoid making unrealistic claims.
          </p>
        </div>

        <label htmlFor="final-prompt" className="text-sm font-medium text-foreground">Your Prompt</label>
        <p id="final-prompt-hint" className="text-xs text-muted-foreground mb-2">Write a single, comprehensive prompt to generate all three posts.</p>
        <Textarea
          id="final-prompt"
          aria-describedby="final-prompt-hint"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="Craft a single, comprehensive prompt to generate all three posts..."
          rows={8}
          className="mb-4"
        />

        <div className="text-center">
          <Button onClick={handleSubmit} disabled={isLoading || !userPrompt} aria-busy={isLoading}>
            {isLoading ? (
              <>
                <span className="animate-spin inline-block mr-2" aria-hidden="true">…</span> Evaluating...
              </>
            ) : (
              <>
                <Award className="inline w-5 h-5 mr-2" aria-hidden="true" />
                Evaluate My Prompt
              </>
            )}
          </Button>
        </div>

        <AnimatePresence>
          {evaluationResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 space-y-6"
              role="status"
              aria-live="polite"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Evaluation Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {evaluationResult.feedback && Object.entries(evaluationResult.feedback).map(([key, value]: [string, any]) => (
                      <div key={key} className="bg-muted p-4 rounded-xl border">
                        <p className="font-semibold capitalize text-foreground">{key}</p>
                        <p className="text-muted-foreground mt-1"><strong>Score:</strong> {value.score}/5</p>
                        <p className="text-muted-foreground mt-1"><strong>Comment:</strong> {value.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">Expert-Level Prompt</CardTitle>
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => handleCopy(evaluationResult.expertPrompt)}
                      aria-label={copied ? 'Copied' : 'Copy expert prompt'}
                    >
                      {copied ? <Check className="w-5 h-5 text-green-500" aria-hidden="true" /> : <Clipboard className="w-5 h-5" aria-hidden="true" />}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap text-sm font-mono bg-card p-3 rounded-md border">{evaluationResult.expertPrompt}</pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Example Output</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="whitespace-pre-wrap text-sm bg-card p-3 rounded-md border">
                    {typeof evaluationResult.expertOutput === 'string' 
                      ? evaluationResult.expertOutput 
                      : JSON.stringify(evaluationResult.expertOutput, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default Module1FinalChallenge;
