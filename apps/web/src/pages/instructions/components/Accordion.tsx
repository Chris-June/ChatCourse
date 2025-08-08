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
    <div className={`bg-card rounded-xl shadow-sm overflow-hidden border border-border ${isDisabled ? 'opacity-60' : ''}`}>
      <button
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
        disabled={isDisabled}
        className="w-full flex justify-between items-center p-4 text-left bg-muted hover:bg-muted/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:hover:bg-muted"
      >
        <div className="flex items-center">
          {icon && <div className="mr-3 text-primary">{icon}</div>}
          <h2 className={`text-xl font-semibold ${isDisabled ? 'text-muted-foreground' : 'text-card-foreground'}`}>{title}</h2>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className={`w-6 h-6 ${isDisabled ? 'text-muted-foreground/60' : 'text-muted-foreground'}`} />
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
