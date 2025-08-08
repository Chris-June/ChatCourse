import { useState, useMemo } from 'react';

const APPROX_CHARS_PER_TOKEN = 4;
const MAX_TOKENS = 4096; // A common context window size for demonstration

const ContextWindowVisualizer = () => {
  const [text, setText] = useState('');

  const charCount = text.length;
  const tokenCount = useMemo(() => {
    return Math.ceil(charCount / APPROX_CHARS_PER_TOKEN);
  }, [charCount]);

  const percentage = useMemo(() => {
    const p = (tokenCount / MAX_TOKENS) * 100;
    return Math.min(p, 100); // Cap at 100%
  }, [tokenCount]);

  const getBarColor = () => {
    if (percentage > 90) return 'bg-destructive';
    if (percentage > 75) return 'bg-secondary';
    return 'bg-primary';
  };

  return (
    <div className="p-4 bg-card text-card-foreground rounded-lg border">
      <h3 className="text-lg font-semibold text-foreground mb-2">Context Window Visualizer</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Paste or type text below to see how it might fill a model's context window. This is a simple approximation where 1 token ≈ 4 characters.
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="Prompt or conversation input"
        className="w-full h-32 p-2 bg-background border rounded-md text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none"
        placeholder="Enter your prompt or conversation history here..."
      />
      <div className="mt-4">
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-1">
          <span>Character Count: {charCount}</span>
          <span>Estimated Tokens: {tokenCount} / {MAX_TOKENS}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all duration-300 ease-in-out ${getBarColor()}`}
            role="progressbar"
            aria-label="Context window usage"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.floor(percentage)}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ContextWindowVisualizer;
