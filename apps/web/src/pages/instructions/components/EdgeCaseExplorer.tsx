import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import InteractiveHeader from '@/components/InteractiveHeader';

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
    <div className="my-6 flex flex-col md:flex-row gap-6 bg-card text-card-foreground p-6 rounded-lg border">
      <InteractiveHeader title="Edge Case Explorer" icon={AlertTriangle} className="mb-4" />
      <div className="md:w-1/3 border-r border-border pr-4">
        <h4 className="text-lg font-bold text-foreground mb-3 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" aria-hidden="true" />
          Select a Scenario:
        </h4>
        <ul className="space-y-2">
          {cases.map((edgeCase, index) => (
            <li key={index}>
              <button
                onClick={() => setActiveIndex(index)}
                aria-pressed={activeIndex === index}
                aria-label={`scenario ${index + 1}: ${edgeCase.scenario}`}
                className={`w-full text-left p-2 rounded-md transition-colors text-sm flex justify-between items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                  activeIndex === index
                    ? 'bg-primary/15 text-foreground ring-1 ring-primary'
                    : 'hover:bg-muted text-muted-foreground'
                }`}
              >
                {edgeCase.scenario}
                <ChevronRight size={16} aria-hidden="true" />
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
              <h5 className="font-bold text-foreground mb-2">Potential Outcome:</h5>
              <p className="text-muted-foreground">{cases[activeIndex].outcome}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EdgeCaseExplorer;
