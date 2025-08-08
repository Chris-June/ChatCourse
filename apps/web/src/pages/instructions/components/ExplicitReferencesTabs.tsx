import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CopyButton from '../../../components/CopyButton';

const VagueTab: React.FC = () => (
  <div className="bg-card text-card-foreground p-4 rounded-b-xl border-t-0 border relative">
    <h4 className="font-semibold text-destructive mb-2">Less Effective (Vague):</h4>
    <CopyButton textToCopy="Let's go with the second option. Write the code for it." />
    <p className="text-muted-foreground font-mono text-sm pr-10 mb-2">"Let's go with the second option. Write the code for it."</p>
    <p className="text-destructive text-xs italic">AI might ask: "Which second option are you referring to?"</p>
    <p className="text-muted-foreground text-xs mt-2">Think of it like giving directions: "turn left at the second house" is less clear than "turn left at the red house."</p>
  </div>
);

const SpecificTab: React.FC = () => (
  <div className="bg-card text-card-foreground p-4 rounded-b-xl border-t-0 border relative">
    <h4 className="font-semibold text-emerald-500 mb-2">More Effective (Specific):</h4>
    <CopyButton textToCopy="Let's use the 'Scrambled Eggs with Spinach' idea. Please write a simple recipe for it." />
    <p className="text-muted-foreground font-mono text-sm pr-10 mb-2">"Let's use the 'Scrambled Eggs with Spinach' idea. Please write a simple recipe for it."</p>
    <p className="text-emerald-500 text-xs italic">AI will proceed with the correct information.</p>
    <p className="text-muted-foreground text-xs mt-2">Explicit references act like anchors, helping the AI pinpoint exactly which information to use.</p>
  </div>
);

const ExplicitReferencesTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vague' | 'specific'>('specific');

  return (
    <div>
      <div className="flex border-b border-border" role="tablist" aria-label="Explicit References Tabs">
        <button
          onClick={() => setActiveTab('specific')}
          role="tab"
          aria-selected={activeTab === 'specific'}
          aria-controls="specific-panel"
          id="specific-tab"
          className={`px-4 py-2 text-sm font-semibold transition-colors rounded-t-xl -mb-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
            activeTab === 'specific'
              ? 'border border-b-0 bg-card text-emerald-500'
              : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          Specific
        </button>
        <button
          onClick={() => setActiveTab('vague')}
          role="tab"
          aria-selected={activeTab === 'vague'}
          aria-controls="vague-panel"
          id="vague-tab"
          className={`px-4 py-2 text-sm font-semibold transition-colors rounded-t-xl -mb-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
            activeTab === 'vague'
              ? 'border border-b-0 bg-card text-destructive'
              : 'text-muted-foreground hover:bg-muted'
          }`}
        >
          Vague
        </button>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'specific' ? (
            <div id="specific-panel" role="tabpanel" aria-labelledby="specific-tab">
              <SpecificTab />
            </div>
          ) : (
            <div id="vague-panel" role="tabpanel" aria-labelledby="vague-tab">
              <VagueTab />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ExplicitReferencesTabs;
