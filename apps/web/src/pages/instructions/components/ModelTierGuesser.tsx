import { useState } from 'react';
import { Cpu, Gauge, CheckCircle2, XCircle } from 'lucide-react';
import InteractiveHeader from '@/components/InteractiveHeader';
import { Button } from '@chat/ui';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

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
    <div className="bg-card p-6 rounded-xl border my-6">
      <InteractiveHeader title="Interactive Model Tier Guesser" subtitle="Guess the model tier from clues" icon={Gauge} />
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Cpu className="w-5 h-5 mr-2 text-primary" />
        Interactive: Model Tier Guesser
      </h3>
      <Card className="my-8">
        <CardHeader>
          <CardTitle className="text-center text-base md:text-lg">Interactive Exercise: Guess the Model Tier</CardTitle>
          <p className="text-sm text-center text-muted-foreground">Read the scenario and choose the most appropriate model.</p>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-lg text-center border mb-4">
            <p className="text-foreground font-medium">{scenario.task}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {tiers.map((tier) => (
              <Button key={tier} variant={selectedTier === tier ? 'default' : 'secondary'} onClick={() => handleSelectTier(tier)}>
                {tier}
              </Button>
            ))}
          </div>

          {selectedTier !== null && (
            <div className={`mt-4 p-4 rounded-lg flex items-start border ${isCorrect ? 'bg-green-500/10 border-green-500/40' : 'bg-red-500/10 border-red-500/40'}`} role="status" aria-live="polite">
              {isCorrect ? <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" aria-hidden="true" /> : <XCircle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" aria-hidden="true" />}
              <div>
                <h5 className={`font-semibold ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{isCorrect ? 'Correct!' : 'Good Try!'}</h5>
                <p className="text-muted-foreground mt-1">{scenario.explanation}</p>
              </div>
            </div>
          )}

          <div className="text-center mt-6">
            <Button onClick={handleNext} disabled={selectedTier === null}>
              Next Scenario →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
