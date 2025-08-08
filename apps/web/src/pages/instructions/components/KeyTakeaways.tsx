import React from 'react';
import { CheckCircle } from 'lucide-react';

interface KeyTakeawaysProps {
  points: string[];
}

const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ points }) => {
  return (
    <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
      <h2 className="text-2xl font-semibold mb-4 text-card-foreground flex items-center">
        <CheckCircle className="w-7 h-7 mr-3 text-emerald-400" />
        Key Takeaways
      </h2>
      <ul className="space-y-2">
        {points.map((point, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="w-5 h-5 mr-3 text-emerald-400 flex-shrink-0 mt-1" />
            <span className="text-muted-foreground">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyTakeaways;
