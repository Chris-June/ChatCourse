import React, { useState, useMemo } from 'react';

const options = {
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
  const [selections, setSelections] = useState<Record<string, string>>({
    when: options.when[0],
    want: options.want[0],
    so: options.so[0],
  });

  const handleSelect = (part: 'when' | 'want' | 'so', value: string) => {
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
        <div className="grid md:grid-cols-3 gap-4">
          {Object.keys(options).map(part => (
            <div key={part}>
              <label className="block text-sm font-medium text-foreground mb-1 capitalize">{part}</label>
              <select
                value={selections[part]}
                onChange={(e) => handleSelect(part as any, e.target.value)}
                className="w-full bg-muted text-foreground border rounded-lg p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition-shadow duration-200 text-sm"
              >
                {options[part as keyof typeof options].map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-muted p-4 rounded-lg border" role="status" aria-live="polite">
        <h5 className="font-semibold mb-2">Your Completed Statement:</h5>
        <p className="text-foreground italic">"{fullStatement}"</p>
      </div>
    </div>
  );
};

export default JtbdBuilder;
