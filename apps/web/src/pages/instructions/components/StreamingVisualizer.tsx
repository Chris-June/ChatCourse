import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Rabbit, Snail } from 'lucide-react';

const fullText = "In the realm of artificial intelligence, performance is not merely a feature; it is the bedrock of a positive user experience. A model that delivers brilliant insights but takes an eternity to do so will invariably lead to user frustration and abandonment. Therefore, optimizing for speed is a critical discipline for any AI developer.";
const words = fullText.split(' ');

export default function StreamingVisualizer() {
  const [isSimulating, setIsSimulating] = useState(false);
  const [nonStreamedText, setNonStreamedText] = useState('');
  const [streamedText, setStreamedText] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  const totalDuration = 2500; // 2.5 seconds

  const runSimulation = () => {
    setIsSimulating(true);
    setNonStreamedText('');
    setStreamedText('');
    setShowLoader(true);

    // Non-streamed simulation
    setTimeout(() => {
      setNonStreamedText(fullText);
      setShowLoader(false);
    }, totalDuration);

    // Streamed simulation
    let currentWordIndex = 0;
    const intervalTime = totalDuration / words.length;
    const streamInterval = setInterval(() => {
      if (currentWordIndex < words.length) {
        setStreamedText(prev => prev + words[currentWordIndex] + ' ');
        currentWordIndex++;
      } else {
        clearInterval(streamInterval);
        setIsSimulating(false);
      }
    }, intervalTime);
  };

  return (
    <div className="my-8 p-6 bg-card border rounded-xl">
      <div className="text-center mb-6">
        <h4 className="text-lg font-semibold text-foreground">Interactive Demo: Standard vs. Streamed Response</h4>
        <p className="text-sm text-muted-foreground">Click the button to see the difference in user experience.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Non-Streamed Column */}
        <div className="p-4 border rounded-lg bg-muted">
          <h5 className="font-bold text-foreground flex items-center mb-4"><Snail className="w-5 h-5 mr-2 text-destructive" aria-hidden="true"/>Standard Response</h5>
          <div className="h-48 text-muted-foreground overflow-y-auto p-2 bg-background rounded border" role="region" aria-live="polite">
            {showLoader && <div className="flex items-center justify-center h-full"><Loader2 className="w-8 h-8 animate-spin text-primary" aria-hidden="true" /></div>}
            {nonStreamedText}
          </div>
        </div>

        {/* Streamed Column */}
        <div className="p-4 border rounded-lg bg-muted">
          <h5 className="font-bold text-foreground flex items-center mb-4"><Rabbit className="w-5 h-5 mr-2 text-green-500" aria-hidden="true"/>Streamed Response</h5>
          <div className="h-48 text-muted-foreground overflow-y-auto p-2 bg-background rounded border" role="region" aria-live="polite">
            {streamedText}<span className="inline-block w-2 h-4 bg-primary animate-pulse ml-1" aria-hidden="true"></span>
          </div>
        </div>
      </div>
      <div className="text-center mt-6">
        <Button onClick={runSimulation} disabled={isSimulating} aria-busy={isSimulating}>
          {isSimulating ? 'Simulation in Progress...' : '► Run Simulation'}
        </Button>
      </div>
    </div>
  );
}
