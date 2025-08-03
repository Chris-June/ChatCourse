import React, { useState, useMemo } from 'react';
import { ShieldCheck } from 'lucide-react';
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
    if (score >= 80) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 space-y-6">
      <h4 className="font-semibold text-white mb-2 text-lg flex items-center">
        <ShieldCheck className="w-6 h-6 mr-3 text-green-400" />
        Interactive Trust Calculator
      </h4>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Stakes Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Task Stakes</label>
            <p className='text-xs text-gray-500 mb-2'>How critical is it for the AI to be right? (0=Low, 100=High)</p>
            <Slider
              value={[stakes]}
              onValueChange={(value) => setStakes(value[0])}
              max={100}
              step={1}
            />
          </div>

          {/* Transparency Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-300">AI Transparency</label>
            <p className='text-xs text-gray-500 mb-2'>Can the user see why the AI decided something? (0=Opaque, 100=Explained)</p>
            <Slider
              value={[transparency]}
              onValueChange={(value) => setTransparency(value[0])}
              max={100}
              step={1}
            />
          </div>

          {/* Correctability Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Correctability</label>
            <p className='text-xs text-gray-500 mb-2'>How easily can a user fix the AI’s mistakes? (0=Impossible, 100=Easy)</p>
            <Slider
              value={[correctability]}
              onValueChange={(value) => setCorrectability(value[0])}
              max={100}
              step={1}
            />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center">
          <h5 className="font-semibold text-blue-300 mb-2">Calculated User Trust Score:</h5>
          <p className={`text-6xl font-bold ${getScoreColor(trustScore)}`}>
            {trustScore}
          </p>
          <p className='text-xs text-gray-500 mt-2 text-center'>A measure of how likely a user is to trust and rely on the AI.</p>
        </div>
      </div>
    </div>
  );
};

export default AiTrustMeter;
