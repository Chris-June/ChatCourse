import React, { useState, useMemo } from 'react';
import { ShieldCheck } from 'lucide-react';
import InteractiveHeader from '@/components/InteractiveHeader';
import { Slider } from '@/components/ui/slider';

const AiTrustMeter: React.FC = () => {
  const [stakes, setStakes] = useState(50);
  const [transparency, setTransparency] = useState(50);
  const [correctability, setCorrectability] = useState(50);

  const trustScore = useMemo(() => {
    // Invert stakes: higher stakes (100) should result in a lower trust score contribution.
    const weightedStakes = (100 - stakes) * 0.5;
    const weightedTransparency = transparency * 0.25;
    const weightedCorrectability = correctability * 0.25;

    const score = Math.round(weightedStakes + weightedTransparency + weightedCorrectability);
    return Math.min(100, Math.max(0, score)); // Clamp score between 0 and 100
  }, [stakes, transparency, correctability]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-card text-card-foreground p-4 md:p-6 rounded-xl border shadow-sm space-y-6">
      <InteractiveHeader title="Interactive Trust Calculator" subtitle="Adjust sliders to see trust score" icon={ShieldCheck} />
      <h4 className="font-semibold text-foreground text-lg flex items-center">
        <ShieldCheck className="h-5 w-5 mr-3 text-primary" />
        Interactive Trust Calculator
      </h4>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Stakes Slider */}
          <div>
            <label htmlFor="stakes-slider" className="block text-sm font-medium text-foreground">Task Stakes</label>
            <p id="stakes-description" className='text-xs text-muted-foreground mb-2'>How critical is it for the AI to be right? (0=Low, 100=High)</p>
            <Slider
              id="stakes-slider"
              value={[stakes]}
              onValueChange={(value) => setStakes(value[0])}
              max={100}
              step={1}
              aria-describedby="stakes-description"
            />
          </div>

          {/* Transparency Slider */}
          <div>
            <label htmlFor="transparency-slider" className="block text-sm font-medium text-foreground">AI Transparency</label>
            <p id="transparency-description" className='text-xs text-muted-foreground mb-2'>Can the user see why the AI decided something? (0=Opaque, 100=Explained)</p>
            <Slider
              id="transparency-slider"
              value={[transparency]}
              onValueChange={(value) => setTransparency(value[0])}
              max={100}
              step={1}
              aria-describedby="transparency-description"
            />
          </div>

          {/* Correctability Slider */}
          <div>
            <label htmlFor="correctability-slider" className="block text-sm font-medium text-foreground">Correctability</label>
            <p id="correctability-description" className='text-xs text-muted-foreground mb-2'>How easily can a user fix the AI’s mistakes? (0=Impossible, 100=Easy)</p>
            <Slider
              id="correctability-slider"
              value={[correctability]}
              onValueChange={(value) => setCorrectability(value[0])}
              max={100}
              step={1}
              aria-describedby="correctability-description"
            />
          </div>
        </div>
        <div className="bg-muted border rounded-lg flex flex-col items-center justify-center p-4">
          <h5 className="font-semibold text-primary mb-2">Calculated User Trust Score:</h5>
          <p className={`text-6xl font-bold ${getScoreColor(trustScore)}`} aria-live="polite" aria-atomic="true">
            {trustScore}
          </p>
          <p className='text-xs text-muted-foreground mt-2 text-center'>A measure of how likely a user is to trust and rely on the AI.</p>
        </div>
      </div>
    </div>
  );
};

export default AiTrustMeter;
