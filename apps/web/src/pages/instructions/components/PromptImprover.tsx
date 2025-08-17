import React, { useState, useMemo } from 'react';
import { Check, ArrowRight, Settings2 } from 'lucide-react';
import InteractiveHeader from '@/components/InteractiveHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

const promptAdditions = {
  topic: { label: 'Topic: Black Holes', text: 'the concept of a black hole', color: 'bg-blue-500' },
  audience: { label: 'Audience: 12-year-old', text: 'to a 12-year-old', color: 'bg-indigo-500' },
  format: { label: 'Format: 3 Paragraphs', text: 'in three simple paragraphs', color: 'bg-purple-500' },
};

type AdditionKey = keyof typeof promptAdditions;

const PromptImprover: React.FC = () => {
  const [activeAdditions, setActiveAdditions] = useState<AdditionKey[]>([]);

  const toggleAddition = (key: AdditionKey) => {
    setActiveAdditions(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const finalPrompt = useMemo(() => {
    const base = 'Explain';
    const order: AdditionKey[] = ['topic', 'audience', 'format'];
    const activeOrdered = order.filter(key => activeAdditions.includes(key));
    
    if (activeOrdered.length === 0) {
        return "Tell me about space.";
    }

    const parts = activeOrdered.map(key => promptAdditions[key].text);
    return `${base} ${parts.join(' ')}.`;

  }, [activeAdditions]);

  const initialPrompt = "Tell me about space.";

  return (
    <Card className="my-6">
      <InteractiveHeader title="Interactive Prompt Builder" subtitle="Click chips to refine the prompt" icon={Settings2} />
      <CardHeader>
        <CardTitle className="text-base md:text-lg">Interactive Prompt Builder</CardTitle>
        <p className="text-sm text-muted-foreground">Click the chips to add specificity to a vague prompt and see how it improves.</p>
      </CardHeader>
      <CardContent>
      <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Prompt additions">
        {(Object.keys(promptAdditions) as AdditionKey[]).map(key => (
          <button
            key={key}
            onClick={() => toggleAddition(key)}
            aria-pressed={activeAdditions.includes(key)}
            className={`px-3 py-1.5 text-sm font-medium rounded-full flex items-center gap-2 transition-all duration-200 border 
              ${activeAdditions.includes(key) ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-accent'}`}>
            {activeAdditions.includes(key) && <Check className="w-4 h-4" aria-hidden="true" />}
            {promptAdditions[key].label}
          </button>
        ))}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center text-center mt-6 gap-4">
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg w-full md:w-1/2">
              <p className="text-destructive font-semibold">Vague Prompt</p>
              <p className="text-sm text-muted-foreground mt-2 font-mono bg-background p-3 rounded border min-h-[60px] flex items-center justify-center">'{initialPrompt}'</p>
          </div>
          <ArrowRight className="w-8 h-8 text-muted-foreground flex-shrink-0 hidden md:block" aria-hidden="true" />
          <div className="p-4 bg-green-600/10 border border-green-500/30 rounded-lg w-full md:w-1/2">
              <p className="text-green-700 dark:text-green-400 font-semibold">Improved Prompt</p>
              <p className="text-sm text-foreground mt-2 font-mono bg-background p-3 rounded border min-h-[60px] flex items-center justify-center">'{finalPrompt}'</p>
          </div>
      </div>
      </CardContent>
    </Card>
  );
};

export default PromptImprover;
