import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CopyButton from '../../../components/CopyButton';

const VagueTab: React.FC = () => (
  <div className="bg-gray-900 p-4 rounded-b-lg border-t-0 border border-red-700 relative">
    <h4 className="font-semibold text-red-400 mb-2">Less Effective (Vague):</h4>
    <CopyButton textToCopy="Let's go with the second option. Write the code for it." />
    <p className="text-gray-300 font-mono text-sm pr-10 mb-2">"Let's go with the second option. Write the code for it."</p>
    <p className="text-red-300 text-xs italic">AI might ask: "Which second option are you referring to?"</p>
    <p className="text-gray-400 text-xs mt-2">Think of it like giving directions: "turn left at the second house" is less clear than "turn left at the red house."</p>
  </div>
);

const SpecificTab: React.FC = () => (
  <div className="bg-gray-900 p-4 rounded-b-lg border-t-0 border border-green-700 relative">
    <h4 className="font-semibold text-green-400 mb-2">More Effective (Specific):</h4>
    <CopyButton textToCopy="Let's use the 'Scrambled Eggs with Spinach' idea. Please write a simple recipe for it." />
    <p className="text-gray-300 font-mono text-sm pr-10 mb-2">"Let's use the 'Scrambled Eggs with Spinach' idea. Please write a simple recipe for it."</p>
    <p className="text-green-300 text-xs italic">AI will proceed with the correct information.</p>
    <p className="text-gray-400 text-xs mt-2">Explicit references act like anchors, helping the AI pinpoint exactly which information to use.</p>
  </div>
);

const ExplicitReferencesTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vague' | 'specific'>('specific');

  return (
    <div>
      <div className="flex border-b border-gray-700">
        <button 
          onClick={() => setActiveTab('specific')}
          className={`px-4 py-2 text-sm font-semibold transition-colors rounded-t-lg -mb-px ${activeTab === 'specific' ? 'border border-b-0 border-green-700 bg-gray-900 text-green-400' : 'text-gray-400 hover:bg-gray-800'}`}>
            Specific
        </button>
        <button 
          onClick={() => setActiveTab('vague')}
          className={`px-4 py-2 text-sm font-semibold transition-colors rounded-t-lg -mb-px ${activeTab === 'vague' ? 'border border-b-0 border-red-700 bg-gray-900 text-red-400' : 'text-gray-400 hover:bg-gray-800'}`}>
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
          {activeTab === 'specific' ? <SpecificTab /> : <VagueTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ExplicitReferencesTabs;
