import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface SecuritySpotlightProps {
  scenario: string;
  guidelines: string[];
}

const SecuritySpotlight: React.FC<SecuritySpotlightProps> = ({ scenario, guidelines }) => {
  return (
    <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-lg my-6">
      <div className="flex items-start">
        <ShieldAlert className="w-8 h-8 text-red-400 mr-4 mt-1 flex-shrink-0" />
        <div>
          <h4 className="text-xl font-bold text-red-300 mb-2">Security & Ethics Spotlight</h4>
          <p className="text-gray-300 mb-4 italic"><strong>Scenario:</strong> {scenario}</p>
          <h5 className="font-semibold text-white mb-2">Best Practices to Prevent This:</h5>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            {guidelines.map((guideline, index) => (
              <li key={index}>{guideline}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SecuritySpotlight;
