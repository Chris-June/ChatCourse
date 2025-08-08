import React, { useState, useMemo } from 'react';

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@chat/ui';
import { Label } from '@chat/ui';

const parts = ['when', 'want', 'so'] as const;
type Part = typeof parts[number];
type Options = Record<Part, string[]>;

const options: Options = {
  when: [
    'planning my weekly meals',
    'working on a complex project',
    'learning a new skill',
    'managing my personal finances',
  ],
  want: [
    'find recipes that use ingredients I already have',
    'get a high-level summary of a long document',
    'practice with interactive exercises',
    'track my spending automatically',
  ],
  so: [
    'save money and reduce food waste',
    'quickly understand the key points',
    'reinforce my knowledge effectively',
    'see where my money is going without manual entry',
  ],
};

const JtbdBuilder: React.FC = () => {
  const [selections, setSelections] = useState<Record<Part, string>>({
    when: options.when[0],
    want: options.want[0],
    so: options.so[0],
  });

  const handleSelect = (part: Part, value: string) => {
    setSelections(prev => ({ ...prev, [part]: value }));
  };

  const fullStatement = useMemo(() => {
    return `When ${selections.when}, I want to ${selections.want}, so I can ${selections.so}.`;
  }, [selections]);

  return (
    <div className="bg-card p-6 rounded-lg border space-y-6 text-card-foreground">
      <div>
        <h4 className="font-semibold mb-3 text-lg">Build a "Job to be Done" Statement</h4>
        <p className="text-muted-foreground text-sm mb-4">Select an option from each category to construct a user-centric problem statement.</p>
        <fieldset className="grid md:grid-cols-3 gap-4">
          <legend className="sr-only">JTBD parts</legend>
          {parts.map((part) => {
            const triggerId = `${part}-select`;
            const hintId = `${part}-hint`;
            const items = options[part];
            return (
              <div key={part}>
                <Label htmlFor={triggerId} className="block text-sm font-medium text-foreground mb-1 capitalize">
                  {part}
                </Label>
                <Select value={selections[part]} onValueChange={(val) => handleSelect(part, val)}>
                  <SelectTrigger id={triggerId} aria-describedby={hintId} className="h-10">
                    <SelectValue placeholder={`Select ${part}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {items.map((option) => (
                      <SelectItem value={option} key={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <small id={hintId} className="text-xs text-muted-foreground mt-1 block">
                  {part === 'when' && 'Choose the context in which the job happens.'}
                  {part === 'want' && 'Choose the desired action or outcome.'}
                  {part === 'so' && 'Choose the underlying goal or benefit.'}
                </small>
              </div>
            );
          })}
        </fieldset>
      </div>

      <div className="bg-muted p-4 rounded-lg border" role="status" aria-live="polite">
        <h5 className="font-semibold mb-2">Your Completed Statement:</h5>
        <p className="text-foreground italic">"{fullStatement}"</p>
      </div>
    </div>
  );
};

export default JtbdBuilder;
