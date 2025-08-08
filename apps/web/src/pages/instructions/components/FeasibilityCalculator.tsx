import React, { useState, useMemo } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const FeasibilityCalculator: React.FC = () => {
  const [risk, setRisk] = useState(50);
  const [data, setData] = useState(50);
  const [reliability, setReliability] = useState(50);

  const viabilityScore = useMemo(() => {
    const riskWeight = (100 - risk) / 100;
    const dataWeight = data / 100;
    const reliabilityWeight = reliability / 100;
    return Math.round(((riskWeight + dataWeight + reliabilityWeight) / 3) * 100);
  }, [risk, data, reliability]);

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-emerald-500';
    if (score >= 40) return 'text-yellow-500';
    return 'text-destructive';
  };

  return (
    <div className="bg-card p-6 rounded-lg border space-y-6 text-card-foreground">
      <div>
        <h4 className="font-semibold mb-3 text-lg flex items-center">
          <SlidersHorizontal className="w-6 h-6 mr-3 text-primary" aria-hidden="true" />
          Feasibility Calculator
        </h4>
        <p className="text-muted-foreground text-sm mb-4">Adjust the sliders to see how different factors affect an idea's viability.</p>
        
        <div className="space-y-5">
          {/* Technical Risk Slider */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted-foreground mb-1">Technical Risk (0 = Low, 100 = High)</label>
            <Slider
              value={[risk]}
              onValueChange={(value) => setRisk(value[0])}
              max={100}
              step={1}
            />
          </div>

          {/* Data Availability Slider */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted-foreground mb-1">Data Availability (0 = None, 100 = Abundant)</label>
            <Slider
              value={[data]}
              onValueChange={(value) => setData(value[0])}
              max={100}
              step={1}
            />
          </div>

          {/* Model Reliability Slider */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-muted-foreground mb-1">Required Reliability (0 = Low, 100 = Perfect)</label>
            <Slider
              value={[reliability]}
              onValueChange={(value) => setReliability(value[0])}
              max={100}
              step={1}
            />
          </div>
        </div>
      </div>

      <div className="bg-muted p-4 rounded-lg border text-center" role="status" aria-live="polite">
        <h5 className="font-semibold text-primary mb-2">Calculated Viability Score:</h5>
        <p className={`text-5xl font-bold ${getScoreColor(viabilityScore)}`}>
          {viabilityScore}
        </p>
      </div>
    </div>
  );
};

export default FeasibilityCalculator;
