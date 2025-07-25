import React, { useState, useMemo } from 'react';
import { ShieldCheck } from 'lucide-react';

const sliderConfig = {
  stakes: {
    label: 'Task Stakes',
    description: 'How critical is it for the AI to be right?',
    options: ['Low (e.g., music recommendation)', 'Medium (e.g., email summary)', 'High (e.g., medical diagnosis)'],
    weights: [1, 0.6, 0.2],
  },
  transparency: {
    label: 'AI Transparency',
    description: "Can the user see *why* the AI made its decision?",
    options: ['Opaque (a black box)', 'Some Insight (shows sources)', 'Fully Explained (shows reasoning)'],
    weights: [0.4, 0.7, 1],
  },
  correctability: {
    label: 'Correctability',
    description: 'How easily can a user fix the AI’s mistakes?',
    options: ['Impossible to fix', 'Difficult (manual override)', 'Easy (one-click correction)'],
    weights: [0.2, 0.6, 1],
  },
};

const AiTrustMeter: React.FC = () => {
  const [values, setValues] = useState({ stakes: 1, transparency: 1, correctability: 1 });

  const handleSliderChange = (key: keyof typeof values, value: string) => {
    setValues(prev => ({ ...prev, [key]: parseInt(value) }));
  };

  const trustScore = useMemo(() => {
    const stakesWeight = sliderConfig.stakes.weights[values.stakes];
    const transparencyWeight = sliderConfig.transparency.weights[values.transparency];
    const correctabilityWeight = sliderConfig.correctability.weights[values.correctability];
    
    // A weighted average to calculate the score
    const score = Math.round(((stakesWeight * 0.5) + (transparencyWeight * 0.25) + (correctabilityWeight * 0.25)) * 100);
    return Math.min(100, score);
  }, [values]);

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
          {Object.entries(sliderConfig).map(([key, config]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-300">{config.label}</label>
              <p className='text-xs text-gray-500 mb-2'>{config.description}</p>
              <input 
                type="range" 
                min="0" 
                max={config.options.length - 1}
                step="1"
                value={values[key as keyof typeof values]}
                onChange={(e) => handleSliderChange(key as keyof typeof values, e.target.value)}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-xs text-center mt-1 text-gray-400">{config.options[values[key as keyof typeof values]]}</div>
            </div>
          ))}
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
