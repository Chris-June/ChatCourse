import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Beaker, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

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
    <Card className="space-y-6">
      <CardHeader>
        <CardTitle className="text-base md:text-lg">Prompt A/B Tester</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Prompt A */}
        <div className="bg-muted p-4 rounded-lg border">
          <h4 className="text-sm font-semibold text-foreground mb-2">Prompt A (Control)</h4>
          <p className="text-sm text-muted-foreground font-mono bg-background p-3 rounded-md border whitespace-pre-wrap">{PromptA}</p>
        </div>

        {/* Prompt B */}
        <div className="bg-muted p-4 rounded-lg border">
          <h4 className="text-sm font-semibold text-foreground mb-2">Prompt B (Variant)</h4>
          <p className="text-sm text-muted-foreground font-mono bg-background p-3 rounded-md border whitespace-pre-wrap">{PromptB}</p>
        </div>
      </div>

      <div className="text-center">
        <Button onClick={handleRunTest} disabled={testRun} variant="default" aria-busy={testRun} aria-live="polite">
          <Beaker className="w-5 h-5 mr-2" aria-hidden="true" />
          {testRun ? 'Running Test...' : 'Run A/B Test'}
        </Button>
      </div>

      <AnimatePresence>
        {winner && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 rounded-lg text-center bg-muted border"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-6 h-6 mr-2 text-primary" aria-hidden="true" />
              <h4 className="text-base md:text-lg font-bold text-foreground">Test Complete!</h4>
            </div>
            <p className="text-foreground">Prompt B resulted in a <strong>17% higher response rate</strong> from clients.</p>
            <p className="text-sm text-muted-foreground mt-1">This suggests that being more specific and adding a sense of urgency improves the desired outcome.</p>
          </motion.div>
        )}
      </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default PromptABTester;

