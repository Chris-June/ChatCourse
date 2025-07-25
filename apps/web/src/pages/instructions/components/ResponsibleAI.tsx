import React from 'react';
import { ShieldCheck, AlertTriangle, CalendarOff, BrainCircuit } from 'lucide-react';

const points = [
  {
    icon: AlertTriangle,
    title: 'Bias in, Bias out',
    text: 'LLMs are trained on vast amounts of internet text, which contains human biases. Always critically evaluate model outputs for fairness and be aware they can reflect and amplify existing societal biases.',
    color: 'text-yellow-400',
  },
  {
    icon: BrainCircuit,
    title: 'Confident Hallucinations',
    text: 'Models can generate incorrect or nonsensical information but present it with a confident, authoritative tone. Always fact-check critical information, especially when using the model for more than creative tasks.',
    color: 'text-orange-400',
  },
  {
    icon: CalendarOff,
    title: 'Knowledge Cutoff',
    text: 'A model\'s knowledge is frozen at the time its training data was collected. It is not a live search engine and will not know about events, data, or developments that occurred after its cutoff date.',
    color: 'text-red-400',
  },
];

const ResponsibleAI: React.FC = () => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-dashed border-gray-700 my-6">
      <h3 className="text-xl font-bold text-center text-white mb-6 flex items-center justify-center">
        <ShieldCheck className="w-6 h-6 mr-3 text-green-400" />
        A Developer's Guide to Responsible AI
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {points.map((point, index) => {
          const Icon = point.icon;
          return (
            <div key={index} className="bg-gray-900/50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Icon className={`w-5 h-5 mr-2 ${point.color}`} />
                <h4 className="font-bold text-white">{point.title}</h4>
              </div>
              <p className="text-sm text-gray-400">{point.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResponsibleAI;
