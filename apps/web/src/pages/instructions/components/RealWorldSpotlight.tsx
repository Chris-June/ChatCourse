import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

interface SpotlightProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  takeaway: string;
}

const RealWorldSpotlight: React.FC<SpotlightProps> = ({ icon, title, children, takeaway }) => {
  return (
    <motion.div 
      className="bg-card p-6 rounded-xl my-6 border border-dashed shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0 text-blue-400 bg-blue-900/50 p-3 rounded-full mr-4" aria-hidden="true">
          {icon}
        </div>
        <h4 className="font-bold text-xl text-foreground">{title}</h4>
      </div>
      <div className="text-foreground/90 space-y-3 mb-4">
        {children}
      </div>
      <div className="bg-muted p-3 rounded-lg flex items-center" role="status" aria-live="polite">
        <Lightbulb className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" aria-hidden="true" />
        <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Key Takeaway:</span> {takeaway}</p>
      </div>
    </motion.div>
  );
};

export default RealWorldSpotlight;
