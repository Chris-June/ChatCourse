import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Check, Clipboard } from 'lucide-react';
import { useChatStore } from '@/store/chat';



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
    <div className="bg-card p-6 rounded-xl border border-border shadow-sm my-6">
      <div className="bg-muted p-4 rounded-xl border border-border mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">The Scenario</h3>
        <p className="text-muted-foreground mt-2">
          You are a marketing assistant at a startup launching a new AI-powered productivity app called 'CogniFlow'. Your manager has asked you to generate three distinct social media posts (for Twitter, LinkedIn, and a blog) announcing the launch. The posts must be tailored to each platform's audience and style, highlight specific features, and avoid making unrealistic claims.
        </p>
      </div>

      <h3 className="text-lg font-semibold text-card-foreground mb-2">Your Prompt:</h3>
      <textarea 
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
        placeholder="Craft a single, comprehensive prompt to generate all three posts..."
        rows={8}
        className="w-full p-2 bg-background text-foreground border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground"
      />

      <div className="text-center mt-4">
        <button onClick={handleSubmit} disabled={isLoading || !userPrompt} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
          {isLoading ? (
            <>
              <span className="animate-spin inline-block mr-2">...</span> Evaluating...
            </>
          ) : (
            <>
              <Award className="inline w-5 h-5 mr-2"/>
              Evaluate My Prompt
            </>
          )}
        </button>
      </div>

      <AnimatePresence>
        {evaluationResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 space-y-6"
          >
            <div className="bg-card p-6 rounded-xl border border-border">
              <h4 className="font-bold text-xl text-card-foreground mb-4">Evaluation Feedback</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {evaluationResult.feedback && Object.entries(evaluationResult.feedback).map(([key, value]: [string, any]) => (
                  <div key={key} className="bg-muted p-4 rounded-xl">
                    <p className="font-bold capitalize text-card-foreground">{key}</p>
                    <p className="text-muted-foreground mt-1"><strong>Score:</strong> {value.score}/5</p>
                    <p className="text-muted-foreground mt-1"><strong>Comment:</strong> {value.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card p-4 rounded-xl border border-border">
              <h4 className="font-bold text-lg text-card-foreground mb-2 flex justify-between items-center">
                Expert-Level Prompt
                <button onClick={() => handleCopy(evaluationResult.expertPrompt)} className="p-1.5 bg-muted hover:bg-muted/80 border border-border rounded-md">
                  {copied ? <Check className="w-5 h-5 text-green-400" /> : <Clipboard className="w-5 h-5 text-muted-foreground" />}
                </button>
              </h4>
              <pre className="whitespace-pre-wrap text-foreground text-sm font-mono bg-muted p-3 rounded-md">{evaluationResult.expertPrompt}</pre>
            </div>
            <div className="bg-card p-4 rounded-xl border border-border">
              <h4 className="font-bold text-lg text-card-foreground mb-2">Example Output</h4>
              <pre className="whitespace-pre-wrap text-foreground text-sm bg-muted p-3 rounded-md">
                {typeof evaluationResult.expertOutput === 'string' 
                  ? evaluationResult.expertOutput 
                  : JSON.stringify(evaluationResult.expertOutput, null, 2)}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Module1FinalChallenge;
