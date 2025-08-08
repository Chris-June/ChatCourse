import React from 'react';
import { Wrench, Lightbulb } from 'lucide-react';

interface ClinicItem {
  problem: string;
  solution: string;
}

interface TroubleshootingClinicProps {
  items: ClinicItem[];
}

const TroubleshootingClinic: React.FC<TroubleshootingClinicProps> = ({ items }) => {
  return (
    <div className="space-y-6 my-4">
      {items.map((item, index) => (
        <div key={index} className="bg-card p-4 rounded-lg border">
          <div className="flex items-start mb-2">
            <Wrench className="w-5 h-5 text-amber-500 mr-3 mt-1 flex-shrink-0" aria-hidden="true" />
            <div>
              <h5 className="font-semibold text-foreground">Problem:</h5>
              <p className="text-muted-foreground">{item.problem}</p>
            </div>
          </div>
          <div className="flex items-start border-t pt-3 mt-3">
            <Lightbulb className="w-5 h-5 text-emerald-500 mr-3 mt-1 flex-shrink-0" aria-hidden="true" />
            <div>
              <h5 className="font-semibold text-foreground">Solution:</h5>
              <p className="text-muted-foreground">{item.solution}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TroubleshootingClinic;
