import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface BestPracticesProps {
  dos: string[];
  donts: string[];
}

const BestPractices: React.FC<BestPracticesProps> = ({ dos, donts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      {/* Do's Column */}
      <div className="bg-muted p-4 rounded-xl border">
        <h4 className="text-lg font-semibold text-emerald-500 flex items-center mb-3">
          <CheckCircle className="h-5 w-5 mr-2" />
          Do
        </h4>
        <ul className="list-disc pl-5 space-y-2 text-foreground" aria-label="Do list">
          {dos.map((item, index) => <li key={`do-${index}`}>{item}</li>)}
        </ul>
      </div>

      {/* Don'ts Column */}
      <div className="bg-muted p-4 rounded-xl border">
        <h4 className="text-lg font-semibold text-red-500 flex items-center mb-3">
          <XCircle className="h-5 w-5 mr-2" />
          Don't
        </h4>
        <ul className="list-disc pl-5 space-y-2 text-foreground" aria-label="Don't list">
          {donts.map((item, index) => <li key={`dont-${index}`}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default BestPractices;
