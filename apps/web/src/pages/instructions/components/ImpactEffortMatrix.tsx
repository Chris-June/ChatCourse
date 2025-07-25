import React, { useState } from 'react';
import { Move } from 'lucide-react';

type Idea = {
  id: string;
  text: string;
};

type Quadrant = 'quick-wins' | 'major-projects' | 'fill-ins' | 'avoid';

const initialIdeas: Idea[] = [
  { id: 'idea-1', text: 'AI to summarize meeting transcripts' },
  { id: 'idea-2', text: 'AI to generate personalized email marketing campaigns' },
  { id: 'idea-3', text: 'AI to predict quarterly sales with 99% accuracy' },
  { id: 'idea-4', text: 'AI to suggest replies to customer support tickets' },
  { id: 'idea-5', text: 'AI to automatically categorize user feedback' },
  { id: 'idea-6', text: 'AI to design a new company logo from scratch' },
];

const ImpactEffortMatrix: React.FC = () => {
  const [ideas, setIdeas] = useState<Record<string, Quadrant | 'unassigned'>>(() => {
    const state: Record<string, Quadrant | 'unassigned'> = {};
    initialIdeas.forEach(idea => {
      state[idea.id] = 'unassigned';
    });
    return state;
  });

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, ideaId: string) => {
    e.dataTransfer.setData('ideaId', ideaId);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, quadrant: Quadrant) => {
    e.preventDefault();
    const ideaId = e.dataTransfer.getData('ideaId');
    if (ideaId) {
      setIdeas(prev => ({ ...prev, [ideaId]: quadrant }));
    }
    e.currentTarget.classList.remove('border-blue-400');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('border-blue-400');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('border-blue-400');
  };

  const getQuadrantIdeas = (quadrant: Quadrant | 'unassigned') => {
    return initialIdeas.filter(idea => ideas[idea.id] === quadrant);
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 mb-6">
        {/* Quadrants */}
        <div onDrop={(e) => handleDrop(e, 'quick-wins')} onDragOver={handleDragOver} onDragLeave={handleDragLeave} className="bg-gray-900/70 p-4 rounded-lg border-2 border-dashed border-gray-600 min-h-[150px] transition-colors duration-200">
          <h4 className="font-bold text-green-400">Quick Wins</h4>
          <p className="text-xs text-gray-400 mb-2">(High Impact, Low Effort)</p>
          {getQuadrantIdeas('quick-wins').map(idea => (
            <div key={idea.id} className="bg-gray-700 p-2 rounded text-sm text-white mt-2">{idea.text}</div>
          ))}
        </div>
        <div onDrop={(e) => handleDrop(e, 'major-projects')} onDragOver={handleDragOver} onDragLeave={handleDragLeave} className="bg-gray-900/70 p-4 rounded-lg border-2 border-dashed border-gray-600 min-h-[150px] transition-colors duration-200">
          <h4 className="font-bold text-blue-400">Major Projects</h4>
          <p className="text-xs text-gray-400 mb-2">(High Impact, High Effort)</p>
          {getQuadrantIdeas('major-projects').map(idea => (
            <div key={idea.id} className="bg-gray-700 p-2 rounded text-sm text-white mt-2">{idea.text}</div>
          ))}
        </div>
        <div onDrop={(e) => handleDrop(e, 'fill-ins')} onDragOver={handleDragOver} onDragLeave={handleDragLeave} className="bg-gray-900/70 p-4 rounded-lg border-2 border-dashed border-gray-600 min-h-[150px] transition-colors duration-200">
          <h4 className="font-bold text-yellow-400">Fill-ins</h4>
          <p className="text-xs text-gray-400 mb-2">(Low Impact, Low Effort)</p>
          {getQuadrantIdeas('fill-ins').map(idea => (
            <div key={idea.id} className="bg-gray-700 p-2 rounded text-sm text-white mt-2">{idea.text}</div>
          ))}
        </div>
        <div onDrop={(e) => handleDrop(e, 'avoid')} onDragOver={handleDragOver} onDragLeave={handleDragLeave} className="bg-gray-900/70 p-4 rounded-lg border-2 border-dashed border-gray-600 min-h-[150px] transition-colors duration-200">
          <h4 className="font-bold text-red-400">Avoid</h4>
          <p className="text-xs text-gray-400 mb-2">(Low Impact, High Effort)</p>
          {getQuadrantIdeas('avoid').map(idea => (
            <div key={idea.id} className="bg-gray-700 p-2 rounded text-sm text-white mt-2">{idea.text}</div>
          ))}
        </div>
      </div>

      {/* Unassigned Ideas */}
      <div>
        <h4 className="font-semibold text-white mb-3">Draggable Ideas</h4>
        <div className="flex flex-wrap gap-3">
          {getQuadrantIdeas('unassigned').map(idea => (
            <div 
              key={idea.id} 
              draggable 
              onDragStart={(e) => handleDragStart(e, idea.id)}
              className="flex items-center bg-gray-700 p-3 rounded-lg cursor-grab active:cursor-grabbing hover:bg-gray-600 transition-colors"
            >
              <Move className="w-5 h-5 mr-2 text-gray-400" />
              <span className="text-white text-sm">{idea.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpactEffortMatrix;
