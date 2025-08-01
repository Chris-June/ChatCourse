import React, { useState, useMemo } from 'react';
import { Check, ArrowRight } from 'lucide-react';

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
    <div className="bg-gray-800 p-6 rounded-lg border border-dashed border-gray-600 my-6">
      <h3 className="text-xl font-semibold text-white mb-3">Interactive Prompt Builder</h3>
      <p className="text-gray-400 mb-4">Click the buttons to add specificity to a vague prompt and see how it improves.</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {(Object.keys(promptAdditions) as AdditionKey[]).map(key => (
          <button
            key={key}
            onClick={() => toggleAddition(key)}
            className={`px-3 py-1.5 text-sm font-medium rounded-full flex items-center gap-2 transition-all duration-200 ${activeAdditions.includes(key) ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}>
            {activeAdditions.includes(key) && <Check className="w-4 h-4" />}
            {promptAdditions[key].label}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center text-center mt-6 gap-4">
          <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg w-full md:w-1/2">
              <p className="text-red-300 font-semibold">Vague Prompt</p>
              <p className="text-sm text-gray-200 mt-2 font-mono bg-gray-900 p-3 rounded min-h-[60px] flex items-center justify-center">'{initialPrompt}'</p>
          </div>
          <ArrowRight className="w-8 h-8 text-gray-500 flex-shrink-0 hidden md:block" />
          <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg w-full md:w-1/2">
              <p className="text-green-300 font-semibold">Improved Prompt</p>
              <p className="text-sm text-gray-200 mt-2 font-mono bg-gray-900 p-3 rounded min-h-[60px] flex items-center justify-center">'{finalPrompt}'</p>
          </div>
      </div>
    </div>
  );
};

export default PromptImprover;
