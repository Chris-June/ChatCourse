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
    <Card className="mt-6 bg-card border text-foreground">
      <CardHeader>
        <CardTitle className="flex items-center text-xl text-foreground">
          <Coins className="w-6 h-6 mr-3 text-primary" aria-hidden="true" />
          Token Budgeting Mini-Guide
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Understand how AI models "read" and budget their conversational memory.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-background text-foreground min-h-[100px] text-base"
            placeholder="Type something here..."
          />
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-foreground">Estimated Token Count:</span>
              <span className={`font-mono text-lg ${tokenCount > TOKEN_BUDGET ? 'text-destructive' : 'text-primary'}`}>
                {tokenCount} / {TOKEN_BUDGET}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-4" aria-hidden="true">
              <div
                className={`h-4 rounded-full transition-all duration-300 ${budgetUsage >= 100 ? 'bg-destructive' : 'bg-primary'}`}
                style={{ width: `${budgetUsage}%` }}
              />
            </div>
            {budgetUsage >= 100 && (
              <p className="text-destructive text-sm mt-2 text-center" role="alert">You've exceeded the token budget! In a real scenario, the AI would have to truncate the text.</p>
            )}
          </div>
          <div className="text-sm text-muted-foreground p-4 bg-muted rounded-lg border">
            <p><strong className="text-foreground">What's a token?</strong> An AI doesn't see words; it sees tokens. A token can be a whole word, or just a piece of one (e.g., `tokenization` might be `token` + `ization`). On average, 1 token is about 4 characters of text.</p>
            <p className="mt-2"><strong className="text-foreground">Why does it matter?</strong> Every AI model has a maximum token limit (its "context window"). This includes your prompt and its response. Managing this budget is key for long conversations and controlling costs.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenBudgetGuide;
