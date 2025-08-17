import React, { useState, useEffect } from 'react';
import { tokenizeText } from '../utils/tokenizeText';

const InteractiveTokenizer: React.FC = () => {
  const [inputText, setInputText] = useState('Hello world! This is a test.');
  const [tokens, setTokens] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setTokens(tokenizeText(inputText));
  }, [inputText]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const animateTokens = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000); // Animation duration
  };

  return (
    <div className="bg-card p-6 rounded-xl border border-border mb-6 my-8">
      <h4 className="text-lg font-semibold text-card-foreground mb-4">Interactive Tokenizer Demo</h4>
      <p className="text-muted-foreground mb-4 text-sm">
        Type in the box below to see how your text gets broken down into tokens. This is a fundamental step in how LLMs process language.
      </p>
      <label htmlFor="tokenizer-input" className="block text-xs font-medium text-muted-foreground mb-2">
        Enter text to tokenize
      </label>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        id="tokenizer-input"
        className="w-full h-24 bg-muted border border-input rounded-md p-3 text-foreground focus:ring-2 focus:ring-primary transition"
        placeholder="Enter text to tokenize..."
      />
      <div className="flex justify-end mt-3">
        <button
          onClick={animateTokens}
          className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-primary/90 transition-colors"
        >
          Visualize Tokenization
        </button>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <h5 className="text-base font-medium text-card-foreground mb-3">Tokens:</h5>
        <div className="flex flex-wrap gap-2">
          {tokens.map((token, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-md text-sm ${isAnimating ? 'animate-pulse bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
              style={{ animationDelay: isAnimating ? `${index * 50}ms` : '0ms' }}
            >
              {token}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3" role="status" aria-live="polite">Token Count: {tokens.length}</p>
      </div>
    </div>
  );
};

export default InteractiveTokenizer;
