import React, { useState, useMemo } from 'react';
import { Percent } from 'lucide-react';

const UncertaintyVisualizer: React.FC = () => {
  const [confidence, setConfidence] = useState(95);

  const visualData = useMemo(() => {
    if (confidence >= 90) {
      return { text: 'Highly Confident', color: 'bg-green-500', textColor: 'text-green-100' };
    }
    if (confidence >= 70) {
      return { text: 'Confident', color: 'bg-blue-500', textColor: 'text-blue-100' };
    }
    if (confidence >= 40) {
      return { text: 'Uncertain', color: 'bg-yellow-500', textColor: 'text-yellow-100' };
    }
    return { text: 'Low Confidence Guess', color: 'bg-red-500', textColor: 'text-red-100' };
  }, [confidence]);

  return (
    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 space-y-6">
      <h4 className="font-semibold text-white mb-2 text-lg flex items-center">
        <Percent className="w-6 h-6 mr-3 text-purple-400" />
        Visualizing AI Confidence
      </h4>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Adjust AI Confidence Score: {confidence}%</label>
          <input 
            type="range" 
            min="10" 
            max="99" 
            value={confidence}
            onChange={(e) => setConfidence(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-2">Example UI Representation:</p>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-white mb-2">AI Suggestion: <span className='italic'>"Based on the symptoms, the diagnosis is likely pneumonia."</span></p>
            <div className={`w-full ${visualData.color} rounded-full p-2 text-center`}>
              <p className={`font-semibold text-sm ${visualData.textColor}`}>{visualData.text} ({confidence}%)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UncertaintyVisualizer;
