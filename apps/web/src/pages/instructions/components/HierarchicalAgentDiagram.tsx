import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ChefHat, Soup, PieChart, ClipboardCheck, Play } from 'lucide-react';

type AgentCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  isActive: boolean;
};

const agents = {
  manager: {
    id: 'manager',
    icon: <ChefHat size={32} />,
    title: 'Executive Chef (Manager)',
    description: 'Delegates high-level goals',
  },
  workers: [
    { id: 'data', icon: <Soup size={28} />, title: 'Ingredient Prep Crew', description: 'Gathers & prepares data' },
    { id: 'analysis', icon: <PieChart size={28} />, title: 'Recipe Analytics Team', description: 'Analyzes flavor profiles' },
    { id: 'reporting', icon: <ClipboardCheck size={28} />, title: 'Menu Presentation Unit', description: 'Creates the final report' },
  ]
};

const AgentCard: React.FC<AgentCardProps> = ({ icon, title, description, isActive }) => (
  <motion.div className={`p-4 rounded-lg border text-center w-full transition-all duration-300 ${isActive ? 'bg-blue-900/60 border-blue-500 shadow-lg' : 'bg-gray-800 border-gray-700'}`}>
    <div className={`mb-2 flex justify-center ${isActive ? 'text-blue-300' : 'text-blue-400'}`}>{icon}</div>
    <h4 className="font-bold text-md text-white">{title}</h4>
    <p className="text-xs text-gray-400 mt-1">{description}</p>
  </motion.div>
);

const HierarchicalAgentDiagram: React.FC = () => {
  const [status, setStatus] = useState('idle'); // idle -> delegating -> working -> done
  const [activeWorker, setActiveWorker] = useState<number | null>(null);

  const runSimulation = () => {
    if (status !== 'idle' && status !== 'done') return;
    setStatus('delegating');
    setActiveWorker(null);
    setTimeout(() => {
      setStatus('working');
      setActiveWorker(0);
    }, 1000);
  };

  useEffect(() => {
    if (status === 'working' && typeof activeWorker === 'number') {
      if (activeWorker < agents.workers.length - 1) {
        const timer = setTimeout(() => {
          setActiveWorker(activeWorker + 1);
        }, 1500);
        return () => clearTimeout(timer);
      } else if (activeWorker === agents.workers.length - 1) {
        const timer = setTimeout(() => {
          setStatus('done');
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [status, activeWorker]);

  return (
    <div className="my-6 p-4 md:p-6 bg-gray-900 rounded-lg flex flex-col items-center border border-gray-700">
      <h3 className="text-xl font-bold text-center text-white mb-2">The Automated Restaurant Chain</h3>
      <p className="text-center text-gray-400 text-sm mb-6">An Executive Chef delegates a goal to specialized kitchens.</p>
      
      <AgentCard {...agents.manager} isActive={status !== 'idle'} />

      <div className="my-4 h-8 flex items-center">
        <AnimatePresence>
          {status === 'delegating' && <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><ArrowDown className="text-blue-400 animate-pulse" size={32} /></motion.div>}
          {status === 'done' && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><ArrowDown className="text-green-400" size={32} /></motion.div>}
        </AnimatePresence>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-start">
        {agents.workers.map((agent, index) => (
          <AgentCard key={agent.id} {...agent} isActive={status === 'working' && typeof activeWorker === 'number' && activeWorker >= index} />
        ))}
      </div>

      <div className="mt-6 text-center">
        <button onClick={runSimulation} disabled={status === 'delegating' || status === 'working'} className="px-6 py-2 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center gap-2 transition-all">
          {status === 'idle' || status === 'done' ? <><Play size={16} /> Start Goal: "Launch New Soup"</> : 'Simulation Running...'}
        </button>
        {status === 'done' && (
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="mt-4 p-3 bg-green-900/50 border border-green-700 rounded-lg text-green-300 text-sm">
              <strong>Goal Complete:</strong> The "Spicy Tomato" soup recipe and marketing plan is ready!
            </motion.div>
        )}
      </div>
    </div>
  );
};

export default HierarchicalAgentDiagram;
