import React, { useState, useMemo } from 'react';
import { Check, ArrowRight, Joystick } from 'lucide-react';
import InteractiveHeader from '../../../components/InteractiveHeader';

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
    <div className="bg-card p-6 rounded-lg border my-6 text-card-foreground">
      <InteractiveHeader title="Interactive I.N.S.Y.N.C." subtitle="Toggle elements to craft the prompt" icon={Joystick} />
      <h3 className="text-xl font-semibold mb-3">I.N.S.Y.N.C. in Action</h3>
      <p className="text-muted-foreground mb-4">Click the buttons below to add or remove elements from the prompt. See how a vague request transforms into a precise instruction.</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {(Object.keys(promptElements) as ElementKey[]).map(key => (
          <button
            key={key}
            onClick={() => toggleElement(key)}
            disabled={key === 'intent'}
            aria-pressed={activeElements.includes(key)}
            className={`px-3 py-1.5 text-sm font-medium rounded-full flex items-center gap-2 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:opacity-60 ${activeElements.includes(key) ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80 text-foreground'}`}>
            {activeElements.includes(key) && <Check className="w-4 h-4" aria-hidden="true" />}
            {promptElements[key].label}
          </button>
        ))}
      </div>

      <div className="bg-muted p-4 rounded-lg border">
        <h4 className="font-semibold mb-2">Live Prompt Preview:</h4>
        <div className="text-foreground p-3 bg-card rounded-md min-h-[100px]">
          {activeElements.map(key => (
            <span key={key} className={`px-1.5 py-0.5 rounded-md mr-1.5 mb-1.5 inline-block text-sm bg-secondary text-secondary-foreground`}>
              {promptElements[key].text}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center text-center mt-6">
          <div className="p-3 bg-muted rounded-lg border">
              <p className="text-destructive font-semibold">Vague Prompt</p>
              <p className="text-sm text-muted-foreground mt-1">'write an email'</p>
          </div>
          <ArrowRight className="w-8 h-8 mx-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
          <div className="p-3 bg-muted rounded-lg border">
              <p className="text-foreground font-semibold">I.N.S.Y.N.C. Prompt</p>
              <p className="text-sm text-muted-foreground mt-1">{finalPrompt.substring(0, 40)}...</p>
          </div>
      </div>
    </div>
  );
};

export default InteractiveInsync;
