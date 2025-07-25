import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Bot, Database, FileBarChart, Presentation } from 'lucide-react';

const AgentCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 text-center w-full">
    <div className="text-blue-400 mb-2 flex justify-center">{icon}</div>
    <h4 className="font-bold text-md text-white">{title}</h4>
    <p className="text-xs text-gray-400 mt-1">{description}</p>
  </div>
);

const HierarchicalAgentDiagram: React.FC = () => {
  return (
    <div className="my-6 p-6 bg-gray-900 rounded-lg flex flex-col items-center">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <AgentCard 
          icon={<Bot size={32} />} 
          title="Master Agent"
          description="Receives high-level goal & delegates tasks"
        />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <ArrowDown className="text-gray-500 my-4" size={32} />
      </motion.div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <AgentCard 
            icon={<Database size={28} />} 
            title="Data Prep Agent"
            description="Cleans & formats raw data"
          />
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <AgentCard 
            icon={<FileBarChart size={28} />} 
            title="Analysis Agent"
            description="Performs statistical analysis"
          />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
          <AgentCard 
            icon={<Presentation size={28} />} 
            title="Reporting Agent"
            description="Generates summaries & charts"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HierarchicalAgentDiagram;
