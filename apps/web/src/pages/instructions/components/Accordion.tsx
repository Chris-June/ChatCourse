import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface AccordionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  isInitiallyOpen?: boolean;
  isDisabled?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, icon, children, isInitiallyOpen = false, isDisabled = false }) => {
  const [isOpen, setIsOpen] = useState(isInitiallyOpen && !isDisabled);

  return (
    <div className={`bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 ${isDisabled ? 'opacity-60' : ''}`}>
      <button
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
        disabled={isDisabled}
        className="w-full flex justify-between items-center p-4 text-left bg-gray-900/50 hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:hover:bg-gray-900/50"
      >
        <div className="flex items-center">
          {icon && <div className="mr-3 text-blue-400">{icon}</div>}
          <h2 className={`text-xl font-semibold ${isDisabled ? 'text-gray-500' : 'text-blue-300'}`}>{title}</h2>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className={`w-6 h-6 ${isDisabled ? 'text-gray-600' : 'text-gray-400'}`} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && !isDisabled && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="p-6">
              {children}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
