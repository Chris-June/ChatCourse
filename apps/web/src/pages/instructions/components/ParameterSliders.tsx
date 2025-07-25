import React, { useState } from 'react';
import { Thermometer, BrainCircuit } from 'lucide-react';

const ParameterSliders: React.FC = () => {
  const [temperature, setTemperature] = useState(0.8);
  const [topP, setTopP] = useState(1.0);

  const getTempDescription = (value: number) => {
    if (value < 0.3) return 'Low temperature makes the output very deterministic and focused. Good for factual answers.';
    if (value < 1.0) return 'A balanced temperature. The model is creative but still follows instructions closely.';
    return 'High temperature increases randomness and creativity. Good for brainstorming, but may lead to less coherent text.';
  };

  const getTopPDescription = (value: number) => {
    if (value < 0.5) return 'Low Top-P limits the model to a small set of high-probability words. Output is very predictable.';
    if (value < 0.9) return 'A balanced Top-P. The model considers a reasonable range of likely words.';
    return 'High Top-P (like 1.0) means the model can choose from all words, allowing for more diversity and unexpectedness.';
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-dashed border-gray-700 my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="temperature" className="flex items-center text-lg font-semibold text-white mb-2">
            <Thermometer className="w-5 h-5 mr-2 text-red-400" />
            Temperature: {temperature.toFixed(2)}
          </label>
          <input
            id="temperature"
            type="range"
            min="0"
            max="2"
            step="0.01"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-sm text-gray-400 mt-2 min-h-[40px]">{getTempDescription(temperature)}</p>
        </div>
        <div>
          <label htmlFor="topP" className="flex items-center text-lg font-semibold text-white mb-2">
            <BrainCircuit className="w-5 h-5 mr-2 text-purple-400" />
            Top-P: {topP.toFixed(2)}
          </label>
          <input
            id="topP"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={topP}
            onChange={(e) => setTopP(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <p className="text-sm text-gray-400 mt-2 min-h-[40px]">{getTopPDescription(topP)}</p>
        </div>
      </div>
      <div className="mt-6 text-center bg-gray-900/50 p-4 rounded-lg">
        <h4 className="font-bold text-white">How they work together:</h4>
        <p className="text-gray-300 text-sm">The model first uses Top-P to create a smaller pool of likely words, then uses Temperature to pick from that pool. It's recommended to alter one at a time, not both.</p>
      </div>
    </div>
  );
};

export default ParameterSliders;
