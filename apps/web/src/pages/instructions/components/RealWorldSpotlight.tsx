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
      className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl my-6 border border-dashed border-blue-400/30 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0 text-blue-400 bg-blue-900/50 p-3 rounded-full mr-4">
          {icon}
        </div>
        <h4 className="font-bold text-blue-300 text-xl">{title}</h4>
      </div>
      <div className="text-gray-300 space-y-3 mb-4">
        {children}
      </div>
      <div className="bg-gray-800/70 p-3 rounded-lg flex items-center">
        <Lightbulb className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0" />
        <p className="text-sm text-yellow-200/90"><span className="font-semibold">Key Takeaway:</span> {takeaway}</p>
      </div>
    </motion.div>
  );
};

export default RealWorldSpotlight;
