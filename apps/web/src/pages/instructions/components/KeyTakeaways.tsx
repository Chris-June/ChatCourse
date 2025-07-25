import React from 'react';
import { CheckCircle } from 'lucide-react';

interface KeyTakeawaysProps {
  points: string[];
}

const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({ points }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-blue-800">
      <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
        <CheckCircle className="w-7 h-7 mr-3 text-green-400" />
        Key Takeaways
      </h2>
      <ul className="space-y-2">
        {points.map((point, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="w-5 h-5 mr-3 text-green-400 flex-shrink-0 mt-1" />
            <span className="text-gray-300">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyTakeaways;
