import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

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

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversation: challengeConversation,
          userSummary: userSummary,
          context: 'summarization-challenge'
        }),
      });

      if (!response.ok) {
        throw new Error(`Evaluation failed: ${response.status}`);
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
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
      <h3 className="font-semibold text-white mb-2">Challenge: Write a Summary</h3>
      <p className="text-gray-400 mb-3">
        This demonstrates the "Summarize and Re-center" technique. When conversations get long, the AI's working memory fills up. By summarizing, you bring the most important details back into focus—like highlighting key points on your whiteboard before adding new ones.
      </p>
      
      <div className="space-y-2 mb-4">
        {challengeConversation.map((msg, index) => (
          <p key={index} className={`p-2 rounded-md text-sm ${msg.speaker === 'You' ? 'bg-gray-700' : 'bg-gray-600'}`}>
            <strong className={msg.speaker === 'You' ? 'text-cyan-400' : 'text-purple-400'}>{msg.speaker}:</strong> {msg.text}
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
        className="w-full bg-gray-800 text-white p-2 rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Your summary prompt here... e.g., 'Okay, let's recap...'"
        rows={3}
      />
      <p className="text-gray-400 text-xs mt-1">
        Write a summary that captures the key points: coffee shop name, rustic style, and warm feel. This helps the AI remember what's important when you ask for the next steps.
      </p>
      
      <button
        onClick={handleEvaluate}
        disabled={isEvaluating || !userSummary.trim()}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isEvaluating ? 'Evaluating...' : 'Get AI Evaluation'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-900/30 rounded-lg border border-red-700">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {evaluation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-blue-900/30 rounded-lg border border-blue-700"
        >
          <h4 className="font-semibold text-blue-200 mb-2 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2" />
            AI Evaluation
          </h4>
          <p className="text-blue-200">{evaluation}</p>
        </motion.div>
      )}
    </div>
  );
};

export default SummarizationChallenge;
