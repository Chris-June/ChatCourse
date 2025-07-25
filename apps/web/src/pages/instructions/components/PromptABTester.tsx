import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Beaker, CheckCircle } from 'lucide-react';

const PromptA = `You are an email assistant. Write a professional email to the client asking for the signed documents.`;

const PromptB = `You are a friendly but firm email assistant. Your goal is to get the client to send the signed documents back today. Write a polite but urgent email reminding them that the project is blocked until they send the documents.`;

const PromptABTester: React.FC = () => {
  const [testRun, setTestRun] = useState(false);
  const [winner, setWinner] = useState<'A' | 'B' | null>(null);

  const handleRunTest = () => {
    setTestRun(true);
    // Simulate a result after a short delay
    setTimeout(() => {
      setWinner('B');
    }, 1000);
  };

  return (
    <div className="bg-gray-900/70 border border-gray-700 rounded-lg p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Prompt A */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-blue-300 mb-2">Prompt A (Control)</h4>
          <p className="text-sm text-gray-400 font-mono bg-gray-900 p-3 rounded-md whitespace-pre-wrap">{PromptA}</p>
        </div>

        {/* Prompt B */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-yellow-300 mb-2">Prompt B (Variant)</h4>
          <p className="text-sm text-gray-400 font-mono bg-gray-900 p-3 rounded-md whitespace-pre-wrap">{PromptB}</p>
        </div>
      </div>

      <div className="text-center">
        <Button onClick={handleRunTest} disabled={testRun} className="bg-green-600 hover:bg-green-500">
          <Beaker className="w-5 h-5 mr-2" />
          {testRun ? 'Running Test...' : 'Run A/B Test'}
        </Button>
      </div>

      <AnimatePresence>
        {winner && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-900/50 border border-green-500 text-green-300 p-4 rounded-lg text-center"
          >
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-6 h-6 mr-2" />
              <h4 className="text-xl font-bold">Test Complete!</h4>
            </div>
            <p>Prompt B resulted in a <strong className="text-white">17% higher response rate</strong> from clients.</p>
            <p className="text-sm text-green-400 mt-1">This suggests that being more specific and adding a sense of urgency improves the desired outcome.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PromptABTester;

