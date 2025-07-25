import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ChevronRight } from 'lucide-react';

interface EdgeCase {
  scenario: string;
  outcome: string;
}

interface EdgeCaseExplorerProps {
  cases: EdgeCase[];
}

const EdgeCaseExplorer: React.FC<EdgeCaseExplorerProps> = ({ cases }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="my-6 flex flex-col md:flex-row gap-6 bg-gray-900 p-6 rounded-lg">
      <div className="md:w-1/3 border-r border-gray-700 pr-4">
        <h4 className="text-lg font-bold text-white mb-3 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
          Select a Scenario:
        </h4>
        <ul className="space-y-2">
          {cases.map((edgeCase, index) => (
            <li key={index}>
              <button 
                onClick={() => setActiveIndex(index)}
                className={`w-full text-left p-2 rounded-md transition-colors text-sm flex justify-between items-center ${activeIndex === index ? 'bg-blue-600/50 text-white' : 'hover:bg-gray-700/50 text-gray-300'}`}>
                {edgeCase.scenario}
                <ChevronRight size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="md:w-2/3 pl-4">
        <AnimatePresence mode="wait">
          {activeIndex !== null && (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h5 className="font-bold text-yellow-300 mb-2">Potential Outcome:</h5>
              <p className="text-gray-300">{cases[activeIndex].outcome}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EdgeCaseExplorer;
