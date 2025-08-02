import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Zap } from 'lucide-react';

const scenarios = [
  {
    task: 'You need to categorize 10,000 customer support emails into `Urgent`, `Technical Issue`, or `General Inquiry`.',
    correctTier: 'Tier 1: Fast & Light',
    explanation: 'This is a high-volume, simple classification task. Speed and cost are paramount, and deep reasoning is not required. Using a powerful model would be slow and expensive overkill.'
  },
  {
    task: 'A user wants to have a natural, helpful conversation to plan a detailed 2-week vacation itinerary to Japan, including booking links and budget considerations.',
    correctTier: 'Tier 2: Balanced',
    explanation: 'This requires good conversational ability and planning. A balanced model provides the necessary capability without the high cost and latency of a max-power model.'
  },
  {
    task: 'You are building an autonomous agent that analyzes a company\'s quarterly financial report, generates a slide deck, and writes a script for the CEO.',
    correctTier: 'Tier 3: Max Power',
    explanation: 'This is a highly complex, multi-step reasoning task that requires deep understanding and advanced content generation. Maximum capability is essential here.'
  }
];

const tiers = ['Tier 1: Fast & Light', 'Tier 2: Balanced', 'Tier 3: Max Power'];

export default function ModelTierGuesser() {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelectTier = (tier: string) => {
    setSelectedTier(tier);
    setIsCorrect(tier === scenarios[currentScenarioIndex].correctTier);
  };

  const handleNext = () => {
    setSelectedTier(null);
    setIsCorrect(null);
    setCurrentScenarioIndex((prevIndex) => (prevIndex + 1) % scenarios.length);
  };

  const scenario = scenarios[currentScenarioIndex];

  return (
    <div className="my-8 p-6 bg-gray-900/50 border border-gray-700 rounded-xl">
      <h4 className="text-lg font-semibold text-center mb-2 text-white">Interactive Exercise: Guess the Model Tier</h4>
      <p className="text-sm text-center text-gray-400 mb-6">Read the scenario and choose the most appropriate model.</p>
      
      <div className="bg-gray-800 p-4 rounded-lg text-center">
        <p className="text-cyan-300 font-medium">{scenario.task}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        {tiers.map(tier => (
          <Button 
            key={tier} 
            variant="outline" 
            onClick={() => handleSelectTier(tier)}
            disabled={selectedTier !== null}
            className={`p-4 h-full flex flex-col justify-center items-center text-center transition-all duration-200 ${selectedTier === tier ? (isCorrect ? 'bg-green-500/20 border-green-500' : 'bg-red-500/20 border-red-500') : 'hover:bg-gray-700'}`}>
            <Zap className="w-6 h-6 mb-2" />
            <span className="font-semibold">{tier}</span>
          </Button>
        ))}
      </div>

      {selectedTier !== null && (
        <div className={`p-4 rounded-lg flex items-start ${isCorrect ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
          {isCorrect ? <CheckCircle2 className="w-6 h-6 text-green-400 mr-3 flex-shrink-0" /> : <XCircle className="w-6 h-6 text-red-400 mr-3 flex-shrink-0" />}
          <div>
            <h5 className={`font-bold ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>{isCorrect ? 'Correct!' : 'Good Try!'}</h5>
            <p className="text-gray-300 mt-1">{scenario.explanation}</p>
          </div>
        </div>
      )}

      <div className="text-center mt-6">
        <Button onClick={handleNext} disabled={selectedTier === null}>
          Next Scenario →
        </Button>
      </div>
    </div>
  );
}
