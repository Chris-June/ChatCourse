import React from 'react';
import { ShieldAlert } from 'lucide-react';

interface SecuritySpotlightProps {
  scenario: string;
  guidelines: string[];
}

const SecuritySpotlight: React.FC<SecuritySpotlightProps> = ({ scenario, guidelines }) => {
  return (
    <div className="bg-card border p-6 rounded-lg my-6">
      <div className="flex items-start">
        <ShieldAlert className="w-8 h-8 text-destructive mr-4 mt-1 flex-shrink-0" aria-hidden="true" />
        <div>
          <h4 className="text-xl font-bold text-foreground mb-2">Security & Ethics Spotlight</h4>
          <p className="text-muted-foreground mb-4 italic"><span className="font-semibold text-foreground">Scenario:</span> {scenario}</p>
          <h5 className="font-semibold text-foreground mb-2">Best Practices to Prevent This:</h5>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
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
