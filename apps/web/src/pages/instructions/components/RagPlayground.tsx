import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Bot } from 'lucide-react';

const knowledgeBase = [
  {
    id: 'doc1',
    content: 'The IntelliSync Pro plan costs $49 per month and includes unlimited projects, advanced analytics, and priority support. It is designed for power users and small teams.',
    keywords: ['pro', 'plan', 'price', 'cost', 'support', 'analytics'],
  },
  {
    id: 'doc2',
    content: 'Our Free plan is available for individual use. It includes up to 3 projects and standard email support. It is a great way to get started with our platform.',
    keywords: ['free', 'plan', 'projects', 'support', 'start'],
  },
  {
    id: 'doc3',
    content: 'IntelliSync offers enterprise solutions with custom pricing, dedicated infrastructure, and a named account manager. Contact sales for a personalized quote.',
    keywords: ['enterprise', 'sales', 'quote', 'custom', 'account'],
  },
  {
    id: 'doc4',
    content: 'You can cancel your subscription at any time from your account dashboard. Refunds are processed for annual plans if cancelled within 30 days of purchase.',
    keywords: ['cancel', 'subscription', 'refund', 'dashboard', 'policy'],
  },
];

// A very simple keyword-based retrieval function
const retrieveDocuments = (query: string) => {
  const queryWords = query.toLowerCase().split(/\s+/);
  if (!query.trim()) return [];

  const scores = knowledgeBase.map(doc => {
    const matchScore = doc.keywords.reduce((score, keyword) => {
      return score + (queryWords.some(qw => keyword.includes(qw)) ? 1 : 0);
    }, 0);
    return { ...doc, score: matchScore };
  });

  return scores.filter(doc => doc.score > 0).sort((a, b) => b.score - a.score).slice(0, 2);
};

const RagPlayground: React.FC = () => {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState('');

  const retrievedDocs = useMemo(() => retrieveDocuments(submittedQuery), [submittedQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    
    setIsLoading(true);
    setSubmittedQuery(query);
    setAnswer('');

    // Simulate LLM call
    setTimeout(() => {
      const context = retrievedDocs.map(d => d.content).join('\n\n');
      if (retrievedDocs.length > 0) {
        setAnswer(`Based on the retrieved information, here is an answer to your question: "${query}"\n\nContext: ${context}`);
      } else {
        setAnswer('I could not find any relevant information in the knowledge base to answer your question.');
      }
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="bg-card border rounded-xl p-6 space-y-4">
      <h3 className="text-xl font-bold text-foreground">Interactive RAG Playground</h3>
      <p className="text-sm text-muted-foreground">Ask a question about our plans or policies to see RAG in action. Try: "What is the price of the pro plan?" or "How do I cancel?"</p>
      
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question..."
          className="bg-background"
        />
        <Button type="submit" disabled={isLoading || !query} aria-busy={isLoading}>Ask</Button>
      </form>

      <AnimatePresence>
        {submittedQuery && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4 pt-4">
            <div>
              <h4 className="font-semibold text-teal-400 flex items-center gap-2"><Search className="w-5 h-5" aria-hidden="true" /> Retrieved Documents</h4>
              <div className="mt-2 space-y-2">
                {retrievedDocs.length > 0 ? (
                  retrievedDocs.map(doc => (
                    <motion.div key={doc.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-muted p-3 rounded-lg border text-sm text-foreground/90">
                      <p className="font-mono text-xs text-indigo-400">{doc.id}.txt</p>
                      <p>{doc.content}</p>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No relevant documents found.</p>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-green-400 flex items-center gap-2"><Bot className="w-5 h-5" aria-hidden="true" /> Generated Answer</h4>
              <div className="mt-2 bg-muted p-4 rounded-lg border text-foreground whitespace-pre-wrap min-h-[100px]" role="status" aria-live="polite">
                {isLoading ? <span className="animate-pulse">Generating...</span> : answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RagPlayground;
