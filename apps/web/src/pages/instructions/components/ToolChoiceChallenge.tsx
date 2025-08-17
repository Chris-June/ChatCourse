import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import InteractiveHeader from '@/components/InteractiveHeader';

const challengeData = {
  userPrompt: "Can you find my flight confirmation for my trip to Hawaii next week?",
  choices: [
    {
      id: 'A',
      name: 'search_documents',
      description: 'Performs a semantic search across a user\'s personal documents.',
    },
    {
      id: 'B',
      name: 'get_flight_info',
      description: 'Retrieves flight details like confirmation number, gate, and time for a given flight ID.',
    },
    {
      id: 'C',
      name: 'search_emails',
      description: 'Searches the user\'s email inbox for a specific query, with optional date filters.',
    },
  ],
  correctChoiceId: 'C',
  explanation: 'The `search_emails` function is the best choice because the user is asking to find a *confirmation*, which is most likely in their email. `get_flight_info` requires a flight ID which we don\'t have, and `search_documents` is too generic.'
};

const ToolChoiceChallenge: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedId) {
      setSubmitted(true);
    }
  };

  const getBorderColor = (id: string) => {
    if (!submitted) {
      return selectedId === id ? 'border-primary' : 'border';
    }
    if (id === challengeData.correctChoiceId) {
      return 'border-emerald-500';
    }
    if (id === selectedId) {
      return 'border-red-500';
    }
    return 'border';
  };

  return (
    <div className="bg-card border rounded-lg p-6 space-y-4">
      <InteractiveHeader title="Interactive Tool Choice" subtitle="Select the best tool for the job" icon={Wrench} />
      <h3 className="text-xl font-bold text-foreground">Challenge: Pick the Right Tool</h3>
      <div className="p-4 bg-muted rounded-lg border">
        <p className="text-muted-foreground text-sm mb-1">User Prompt:</p>
        <p className="text-foreground italic">"{challengeData.userPrompt}"</p>
      </div>

      <div className="space-y-3">
        {challengeData.choices.map(choice => (
          <div
            key={choice.id}
            onClick={() => !submitted && setSelectedId(choice.id)}
            className={cn(
              'p-4 rounded-lg border-2 cursor-pointer transition-all bg-background',
              getBorderColor(choice.id),
              !submitted && 'hover:border-primary'
            )}
          >
            <p className="font-mono text-sm text-foreground">{choice.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{choice.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center pt-2">
        <Button onClick={handleSubmit} disabled={!selectedId || submitted}>
          Submit Answer
        </Button>
      </div>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn('p-4 rounded-lg mt-4 text-center bg-muted border')}
            role="status" aria-live="polite"
          >
            <div className="flex items-center justify-center mb-2">
              <span aria-hidden="true">{selectedId === challengeData.correctChoiceId ? (
                <CheckCircle className="w-6 h-6 mr-2 text-emerald-500" />
              ) : (
                <XCircle className="w-6 h-6 mr-2 text-red-500" />
              )}</span>
              <h4 className="text-lg font-bold text-foreground">
                {selectedId === challengeData.correctChoiceId ? 'Correct!' : 'Not Quite'}
              </h4>
            </div>
            <p className="text-sm text-muted-foreground">{challengeData.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToolChoiceChallenge;
