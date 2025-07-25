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
        <div key={index} className="bg-gray-800/60 p-4 rounded-lg border border-gray-700">
          <div className="flex items-start mb-2">
            <Wrench className="w-5 h-5 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h5 className="font-semibold text-yellow-300">Problem:</h5>
              <p className="text-gray-300">{item.problem}</p>
            </div>
          </div>
          <div className="flex items-start border-t border-gray-700 pt-3 mt-3">
            <Lightbulb className="w-5 h-5 text-green-400 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h5 className="font-semibold text-green-300">Solution:</h5>
              <p className="text-gray-300">{item.solution}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TroubleshootingClinic;
