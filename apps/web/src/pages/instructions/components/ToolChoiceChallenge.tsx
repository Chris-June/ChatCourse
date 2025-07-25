import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      return selectedId === id ? 'border-blue-500' : 'border-gray-700';
    }
    if (id === challengeData.correctChoiceId) {
      return 'border-green-500';
    }
    if (id === selectedId) {
      return 'border-red-500';
    }
    return 'border-gray-700';
  };

  return (
    <div className="bg-gray-900/70 border border-gray-700 rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-white">Challenge: Pick the Right Tool</h3>
      <div className="p-4 bg-gray-800 rounded-lg">
        <p className="text-gray-400 text-sm mb-1">User Prompt:</p>
        <p className="text-white italic">"{challengeData.userPrompt}"</p>
      </div>

      <div className="space-y-3">
        {challengeData.choices.map(choice => (
          <div
            key={choice.id}
            onClick={() => !submitted && setSelectedId(choice.id)}
            className={cn(
              'p-4 rounded-lg border-2 cursor-pointer transition-all',
              getBorderColor(choice.id),
              !submitted && 'hover:border-blue-400'
            )}
          >
            <p className="font-mono text-sm text-white">{choice.name}</p>
            <p className="text-xs text-gray-400 mt-1">{choice.description}</p>
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
            className={cn(
              'p-4 rounded-lg mt-4 text-center',
              selectedId === challengeData.correctChoiceId ? 'bg-green-900/50' : 'bg-red-900/50'
            )}
          >
            <div className="flex items-center justify-center mb-2">
              {selectedId === challengeData.correctChoiceId ? (
                <CheckCircle className="w-6 h-6 mr-2 text-green-400" />
              ) : (
                <XCircle className="w-6 h-6 mr-2 text-red-400" />
              )}
              <h4 className="text-lg font-bold text-white">
                {selectedId === challengeData.correctChoiceId ? 'Correct!' : 'Not Quite'}
              </h4>
            </div>
            <p className="text-sm text-gray-300">{challengeData.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToolChoiceChallenge;
