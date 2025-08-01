import React, { useState, useMemo } from 'react';
import { Check, ArrowRight } from 'lucide-react';

const promptElements = {
  intent: { label: 'Intent', text: 'Write a short, professional email', color: 'bg-blue-500' },
  nuance: { label: 'Nuance', text: 'to my team announcing that the project deadline has been moved to this Friday at 5 PM', color: 'bg-indigo-500' },
  style: { label: 'Style', text: 'in an encouraging and confident tone', color: 'bg-purple-500' },
  youAsNarrative: { label: 'Persona', text: 'acting as the project manager', color: 'bg-pink-500' },
  context: { label: 'Context', text: 'and mention that the client requested this change due to their new marketing launch', color: 'bg-teal-500' },
};

type ElementKey = keyof typeof promptElements;

const InteractiveInsync: React.FC = () => {
  const [activeElements, setActiveElements] = useState<ElementKey[]>(['intent']);

  const toggleElement = (key: ElementKey) => {
    if (key === 'intent') return; // Intent is always active
    setActiveElements(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const finalPrompt = useMemo(() => {
    const order: ElementKey[] = ['intent', 'nuance', 'style', 'youAsNarrative', 'context'];
    return order
      .filter(key => activeElements.includes(key))
      .map(key => promptElements[key].text)
      .join(', ');
  }, [activeElements]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-dashed border-gray-600 my-6">
      <h3 className="text-xl font-semibold text-white mb-3">I.N.S.Y.N.C. in Action</h3>
      <p className="text-gray-400 mb-4">Click the buttons below to add or remove elements from the prompt. See how a vague request transforms into a precise instruction.</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {(Object.keys(promptElements) as ElementKey[]).map(key => (
          <button
            key={key}
            onClick={() => toggleElement(key)}
            disabled={key === 'intent'}
            className={`px-3 py-1.5 text-sm font-medium rounded-full flex items-center gap-2 transition-all duration-200 ${activeElements.includes(key) ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}>
            {activeElements.includes(key) && <Check className="w-4 h-4" />}
            {promptElements[key].label}
          </button>
        ))}
      </div>

      <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
        <h4 className="font-semibold text-gray-300 mb-2">Live Prompt Preview:</h4>
        <div className="text-white p-3 bg-gray-800 rounded-md min-h-[100px]">
          {activeElements.map(key => (
            <span key={key} className={`px-1.5 py-0.5 rounded-md mr-1.5 mb-1.5 inline-block text-sm ${promptElements[key].color}`}>
              {promptElements[key].text}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center text-center mt-6">
          <div className="p-3 bg-red-900/50 rounded-lg">
              <p className="text-red-300 font-semibold">Vague Prompt</p>
              <p className="text-sm text-gray-400 mt-1">'write an email'</p>
          </div>
          <ArrowRight className="w-8 h-8 mx-4 text-gray-500 flex-shrink-0" />
          <div className="p-3 bg-green-900/50 rounded-lg">
              <p className="text-green-300 font-semibold">I.N.S.Y.N.C. Prompt</p>
              <p className="text-sm text-gray-400 mt-1">{finalPrompt.substring(0, 40)}...</p>
          </div>
      </div>
    </div>
  );
};

export default InteractiveInsync;
