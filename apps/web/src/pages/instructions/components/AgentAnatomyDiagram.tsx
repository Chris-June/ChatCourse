import React from 'react';
import { BrainCircuit, Cpu, Database, Wrench, ArrowRight } from 'lucide-react';

const AnatomyCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col items-center text-center h-full">
    <div className="text-blue-400 mb-3">{icon}</div>
    <h3 className="font-bold text-md text-white mb-2">{title}</h3>
    <p className="text-xs text-gray-400">{description}</p>
  </div>
);

const AgentAnatomyDiagram: React.FC = () => {
  return (
    <div className="my-6 p-6 bg-gray-900 rounded-lg">
      <h3 className="text-xl font-bold text-center text-white mb-6">Agent Anatomy: The Core Components</h3>
      <div className="grid grid-cols-1 md:grid-cols-9 gap-4 items-center">
        
        <div className="md:col-span-2">
          <AnatomyCard 
            icon={<BrainCircuit size={32} />} 
            title="Planner"
            description="The 'brain' of the agent. It analyzes the goal and creates a step-by-step plan."
          />
        </div>

        <div className="hidden md:flex justify-center items-center">
          <ArrowRight className="text-gray-500" size={24} />
        </div>

        <div className="md:col-span-2">
          <AnatomyCard 
            icon={<Cpu size={32} />} 
            title="Executor"
            description="The 'hands' of the agent. It executes the plan by calling the necessary tools."
          />
        </div>

        <div className="hidden md:flex justify-center items-center">
          <ArrowRight className="text-gray-500" size={24} />
        </div>

        <div className="md:col-span-3 grid grid-cols-1 gap-4">
          <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 flex items-center">
            <Database size={24} className="text-purple-400 mr-3" />
            <div>
              <h4 className="font-bold text-sm text-white">Memory</h4>
              <p className="text-xs text-gray-400">Stores past actions and observations to inform future steps.</p>
            </div>
          </div>
          <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 flex items-center">
            <Wrench size={24} className="text-green-400 mr-3" />
            <div>
              <h4 className="font-bold text-sm text-white">Toolset</h4>
              <p className="text-xs text-gray-400">The specific skills (APIs, functions) the agent can use.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AgentAnatomyDiagram;
