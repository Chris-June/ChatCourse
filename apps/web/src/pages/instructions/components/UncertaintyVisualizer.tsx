import React, { useState, useMemo } from 'react';
import { Percent } from 'lucide-react';
import InteractiveHeader from '@/components/InteractiveHeader';

const UncertaintyVisualizer: React.FC = () => {
  const [confidence, setConfidence] = useState(95);

  const visualData = useMemo(() => {
    if (confidence >= 90) {
      return { text: 'Highly Confident', color: 'bg-emerald-500', textColor: 'text-emerald-50' };
    }
    if (confidence >= 70) {
      return { text: 'Confident', color: 'bg-primary', textColor: 'text-primary-foreground' };
    }
    if (confidence >= 40) {
      return { text: 'Uncertain', color: 'bg-amber-500', textColor: 'text-amber-50' };
    }
    return { text: 'Low Confidence Guess', color: 'bg-destructive', textColor: 'text-destructive-foreground' };
  }, [confidence]);

  return (
    <div className="bg-card p-6 rounded-lg border space-y-6">
      <InteractiveHeader title="Interactive Uncertainty Visualizer" subtitle="Adjust confidence and see UI changes" icon={Percent} />
      <h4 className="font-semibold text-foreground mb-2 text-lg flex items-center">
        <Percent className="w-6 h-6 mr-3 text-primary" aria-hidden="true" />
        Visualizing AI Confidence
      </h4>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Adjust AI Confidence Score: {confidence}%</label>
          <input 
            type="range" 
            min="10" 
            max="99" 
            value={confidence}
            onChange={(e) => setConfidence(parseInt(e.target.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Example UI Representation:</p>
          <div className="bg-muted p-4 rounded-lg border">
            <p className="text-foreground mb-2">AI Suggestion: <span className='italic'>"Based on the symptoms, the diagnosis is likely pneumonia."</span></p>
            <div className={`w-full ${visualData.color} rounded-full p-2 text-center`} role="status" aria-live="polite">
              <p className={`font-semibold text-sm ${visualData.textColor}`}>{visualData.text} ({confidence}%)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UncertaintyVisualizer;
