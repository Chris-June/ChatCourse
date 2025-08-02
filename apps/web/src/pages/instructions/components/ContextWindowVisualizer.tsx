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
    if (percentage > 90) return 'bg-red-600';
    if (percentage > 75) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-2">Context Window Visualizer</h3>
      <p className="text-sm text-gray-400 mb-4">
        Paste or type text below to see how it might fill a model's context window. This is a simple approximation where 1 token ≈ 4 characters.
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-32 p-2 bg-gray-800 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Enter your prompt or conversation history here..."
      />
      <div className="mt-4">
        <div className="flex justify-between items-center text-sm text-gray-300 mb-1">
          <span>Character Count: {charCount}</span>
          <span>Estimated Tokens: {tokenCount} / {MAX_TOKENS}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div
            className={`h-4 rounded-full transition-all duration-300 ease-in-out ${getBarColor()}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ContextWindowVisualizer;
