import React, { useState } from 'react';
import { Layers, Zap, Target } from 'lucide-react';
import { 
  PromptChallenges, 
  PromptPatternLibrary, 
  PromptVisualizer 
} from '../../../components/prompting/advanced';

// Local TabButton component for encapsulation
const TabButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string; }> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${active ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
    {icon}
    <span>{label}</span>
  </button>
);

const AdvancedTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState('challenges');

  const renderContent = () => {
    switch (activeTab) {
      case 'visualizer':
        return <PromptVisualizer />;
      case 'patterns':
        return <PromptPatternLibrary />;
      case 'challenges':
        return <PromptChallenges />;
      default:
        return <PromptVisualizer />;
    }
  };

  return (
    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 my-6">
      <h3 className="text-lg font-semibold text-white mb-4">Advanced Tools Playground</h3>
      <div className="flex space-x-2 border-b border-gray-700 mb-4 pb-2">
        <TabButton
          active={activeTab === 'visualizer'}
          onClick={() => setActiveTab('visualizer')}
          icon={<Target className="w-5 h-5" />}
          label="Prompt Visualizer"
        />
        <TabButton
          active={activeTab === 'patterns'}
          onClick={() => setActiveTab('patterns')}
          icon={<Layers className="w-5 h-5" />}
          label="Pattern Library"
        />
        <TabButton
          active={activeTab === 'challenges'}
          onClick={() => setActiveTab('challenges')}
          icon={<Zap className="w-5 h-5" />}
          label="Prompt Challenges"
        />
      </div>
      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdvancedTools;
