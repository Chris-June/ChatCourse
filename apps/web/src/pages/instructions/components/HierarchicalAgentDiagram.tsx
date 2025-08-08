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
  <motion.div className={`p-4 rounded-lg border text-center w-full transition-all duration-300 ${isActive ? 'bg-primary/10 border-primary shadow-sm' : 'bg-muted'}`}>
    <div className={`mb-2 flex justify-center ${isActive ? 'text-primary' : 'text-muted-foreground'}`} aria-hidden="true">{icon}</div>
    <h4 className="font-bold text-md text-foreground">{title}</h4>
    <p className="text-xs text-muted-foreground mt-1">{description}</p>
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
    <div className="my-6 p-4 md:p-6 bg-card rounded-lg flex flex-col items-center border text-card-foreground">
      <h3 className="text-xl font-bold text-center mb-2">The Automated Restaurant Chain</h3>
      <p className="text-center text-muted-foreground text-sm mb-6">An Executive Chef delegates a goal to specialized kitchens.</p>
      
      <AgentCard {...agents.manager} isActive={status !== 'idle'} />

      <div className="my-4 h-8 flex items-center">
        <AnimatePresence>
          {status === 'delegating' && <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><ArrowDown className="text-primary animate-pulse" size={32} aria-hidden="true" /></motion.div>}
          {status === 'done' && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><ArrowDown className="text-primary" size={32} aria-hidden="true" /></motion.div>}
        </AnimatePresence>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-start">
        {agents.workers.map((agent, index) => (
          <AgentCard key={agent.id} {...agent} isActive={status === 'working' && typeof activeWorker === 'number' && activeWorker >= index} />
        ))}
      </div>

      <div className="mt-6 text-center">
        <button onClick={runSimulation} disabled={status === 'delegating' || status === 'working'} className="px-6 py-2 rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-muted-foreground/30 disabled:text-muted-foreground disabled:cursor-not-allowed flex items-center gap-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60">
          {status === 'idle' || status === 'done' ? <><Play size={16} aria-hidden="true" /> Start Goal: "Launch New Soup"</> : 'Simulation Running...'}
        </button>
        {status === 'done' && (
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="mt-4 p-3 bg-muted border rounded-lg text-sm" role="status" aria-live="polite">
              <strong>Goal Complete:</strong> The "Spicy Tomato" soup recipe and marketing plan is ready!
            </motion.div>
        )}
      </div>
    </div>
  );
};

export default HierarchicalAgentDiagram;
