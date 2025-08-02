import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { DollarSign, Zap, BrainCircuit } from 'lucide-react';

const modelTiers = {
  'Tier 1: Fast & Light': {
    costPerMillionTokens: 0.15, // e.g., GPT-4o-mini
    icon: <Zap className="w-5 h-5 text-green-400" />,
  },
  'Tier 2: Balanced': {
    costPerMillionTokens: 5.00, // e.g., GPT-4o
    icon: <BrainCircuit className="w-5 h-5 text-blue-400" />,
  },
  'Tier 3: Max Power': {
    costPerMillionTokens: 10.00, // e.g., GPT-4 Turbo
    icon: <DollarSign className="w-5 h-5 text-purple-400" />,
  },
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export default function ApiCostEstimator() {
  const [requestsPerDay, setRequestsPerDay] = useState(1000);
  const [avgTokens, setAvgTokens] = useState(1500);

  const totalTokensPerDay = requestsPerDay * avgTokens;

  return (
    <div className="my-8 p-6 bg-gray-900/50 border border-gray-700 rounded-xl">
      <h4 className="text-lg font-semibold text-center mb-6 text-white">API Cost Estimator</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div>
          <label htmlFor="requests-slider" className="block text-sm font-medium text-gray-300 mb-2">
            Requests per Day: <span className="font-bold text-cyan-400">{requestsPerDay.toLocaleString()}</span>
          </label>
          <Slider
            id="requests-slider"
            min={100}
            max={50000}
            step={100}
            value={[requestsPerDay]}
            onValueChange={(value) => setRequestsPerDay(value[0])}
          />
        </div>
        <div>
          <label htmlFor="tokens-slider" className="block text-sm font-medium text-gray-300 mb-2">
            Average Tokens per Request: <span className="font-bold text-cyan-400">{avgTokens.toLocaleString()}</span>
          </label>
          <Slider
            id="tokens-slider"
            min={50}
            max={4000}
            step={50}
            value={[avgTokens]}
            onValueChange={(value) => setAvgTokens(value[0])}
          />
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(modelTiers).map(([name, { costPerMillionTokens, icon }]) => {
          const dailyCost = (totalTokensPerDay / 1_000_000) * costPerMillionTokens;
          const monthlyCost = dailyCost * 30;
          return (
            <div key={name} className="p-4 bg-gray-800/60 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3">{icon}</div>
                <span className="font-semibold text-white">{name}</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-400">{formatCurrency(monthlyCost)}<span className="text-sm font-normal text-gray-400">/mo</span></p>
                <p className="text-xs text-gray-500">({formatCurrency(dailyCost)}/day)</p>
              </div>
            </div>
          );
        })}
      </div>
       <p className="text-center text-xs text-gray-500 mt-6">
        *Estimates are for illustrative purposes. Actual costs depend on specific models, usage, and provider pricing.
      </p>
    </div>
  );
}
