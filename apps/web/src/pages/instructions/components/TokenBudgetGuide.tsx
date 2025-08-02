import { useState, useMemo } from 'react';
import { Coins } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Textarea } from '../../../components/ui/textarea';

// A simple approximation for token counting.
const estimateTokens = (text: string) => {
  return Math.ceil(text.length / 4);
};

const TOKEN_BUDGET = 2048;

const TokenBudgetGuide = () => {
  const [text, setText] = useState('Type or paste some text here to see how token counts work. Notice that a token is not the same as a word. It\'s often a part of a word, which is how the AI model processes language.');

  const tokenCount = useMemo(() => estimateTokens(text), [text]);
  const budgetUsage = Math.min((tokenCount / TOKEN_BUDGET) * 100, 100);

  return (
    <Card className="mt-6 bg-gray-900 border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center text-xl text-white">
          <Coins className="w-6 h-6 mr-3 text-yellow-400" />
          Token Budgeting Mini-Guide
        </CardTitle>
        <CardDescription className="text-gray-400">
          Understand how AI models "read" and budget their conversational memory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white min-h-[100px] text-base"
            placeholder="Type something here..."
          />
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-white">Estimated Token Count:</span>
              <span className={`font-mono text-lg ${tokenCount > TOKEN_BUDGET ? 'text-red-400' : 'text-yellow-400'}`}>
                {tokenCount} / {TOKEN_BUDGET}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all duration-300 ${budgetUsage >= 100 ? 'bg-red-600' : 'bg-yellow-500'}`}
                style={{ width: `${budgetUsage}%` }}
              />
            </div>
            {budgetUsage >= 100 && (
              <p className="text-red-400 text-sm mt-2 text-center">You've exceeded the token budget! In a real scenario, the AI would have to truncate the text.</p>
            )}
          </div>
          <div className="text-sm text-gray-400 p-4 bg-gray-800/50 rounded-lg">
            <p><strong>What's a token?</strong> An AI doesn't see words; it sees tokens. A token can be a whole word, or just a piece of one (e.g., `tokenization` might be `token` + `ization`). On average, 1 token is about 4 characters of text.</p>
            <p className="mt-2"><strong>Why does it matter?</strong> Every AI model has a maximum token limit (its "context window"). This includes your prompt and its response. Managing this budget is key for long conversations and controlling costs.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenBudgetGuide;
