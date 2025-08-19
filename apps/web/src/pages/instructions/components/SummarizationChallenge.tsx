import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import InteractiveHeader from '@/components/InteractiveHeader';

const challengeConversation = [
  { speaker: 'You', text: 'I need to create a logo for my new coffee shop, "The Daily Grind".' },
  { speaker: 'AI', text: 'Great! What\'s the general vibe you\'re going for? Modern, rustic, minimalist?' },
  { speaker: 'You', text: 'Definitely rustic. I want it to feel warm and handmade.' },
  { speaker: 'AI', text: 'Understood. Rustic and warm. Should it include any specific imagery, like a coffee bean or a mug?' },
];

const SummarizationChallenge: React.FC = () => {
  const [userSummary, setUserSummary] = useState('');
  const [evaluation, setEvaluation] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEvaluate = async () => {
    if (!userSummary.trim()) {
      setError('Please enter a summary prompt');
      return;
    }

    setIsEvaluating(true);
    setError(null);
    setEvaluation(null);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL === '/api' 
        ? '' 
        : import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const endpoint = apiBaseUrl 
        ? `${apiBaseUrl}${apiBaseUrl.endsWith('/') ? '' : '/'}api/chat/evaluate-summary`
        : '/api/chat/evaluate-summary';

      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      const devKey = import.meta.env.VITE_OPENAI_KEY as string | undefined;
      if (devKey) headers['Authorization'] = `Bearer ${devKey}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          conversation: challengeConversation,
          userSummary: userSummary,
          context: 'summarization-challenge',
          ...(devKey ? { apiKey: devKey } : {})
        }),
      });

      if (!response.ok) {
        const detail = await response.text().catch(() => '');
        throw new Error(`Evaluation failed: ${response.status}${detail ? ` - ${detail}` : ''}`);
      }

      const data = await response.json();
      setEvaluation(data.evaluation);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Evaluation failed');
      
      // Fallback evaluation
      setEvaluation(`Your summary prompt shows ${userSummary.length > 50 ? 'good' : 'limited'} detail. Consider referencing specific points from the conversation to demonstrate you understood the context.`);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="bg-card p-4 rounded-xl border">
      <InteractiveHeader title="Interactive Summarization Challenge" subtitle="Practice the summarize-and-recenter technique" icon={Lightbulb} />
      <h3 className="font-semibold text-foreground mb-2">Challenge: Write a Summary</h3>
      <p className="text-muted-foreground mb-3">
        This demonstrates the "Summarize and Re-center" technique. When conversations get long, the AI's working memory fills up. By summarizing, you bring the most important details back into focus—like highlighting key points on your whiteboard before adding new ones.
      </p>
      
      <div className="space-y-2 mb-4">
        {challengeConversation.map((msg, index) => (
          <p key={index} className={`p-2 rounded-xl text-sm ${msg.speaker === 'You' ? 'bg-muted' : 'bg-muted'} border`}>
            <strong className="text-foreground">{msg.speaker}:</strong> {msg.text}
          </p>
        ))}
      </div>
      
      <textarea
        value={userSummary}
        onChange={(e) => {
          setUserSummary(e.target.value);
          setEvaluation(null);
          setError(null);
        }}
        className="w-full bg-background text-foreground p-2 rounded-xl border focus:ring-2 focus:ring-primary focus:outline-none"
        placeholder="Your summary prompt here... e.g., 'Okay, let's recap...'"
        rows={3}
      />
      <p className="text-muted-foreground text-xs mt-1">
        Write a summary that captures the key points: coffee shop name, rustic style, and warm feel. This helps the AI remember what's important when you ask for the next steps.
      </p>
      
      <button
        onClick={handleEvaluate}
        disabled={isEvaluating || !userSummary.trim()}
        className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isEvaluating ? 'Evaluating...' : 'Get AI Evaluation'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-900/30 rounded-xl border border-red-700" role="alert" aria-live="polite">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      )}

      {evaluation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-muted rounded-xl border" role="status" aria-live="polite"
        >
          <h4 className="font-semibold text-foreground mb-2 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-primary" aria-hidden="true" />
            AI Evaluation
          </h4>
          <p className="text-muted-foreground">{evaluation}</p>
        </motion.div>
      )}
    </div>
  );
};

export default SummarizationChallenge;
