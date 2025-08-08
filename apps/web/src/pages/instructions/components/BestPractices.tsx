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
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <h4 className="text-lg font-bold text-card-foreground flex items-center mb-3">
          <CheckCircle className="w-6 h-6 mr-2 text-emerald-400" />
          Do
        </h4>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          {dos.map((item, index) => <li key={`do-${index}`}>{item}</li>)}
        </ul>
      </div>

      {/* Don'ts Column */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <h4 className="text-lg font-bold text-card-foreground flex items-center mb-3">
          <XCircle className="w-6 h-6 mr-2 text-destructive" />
          Don't
        </h4>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          {donts.map((item, index) => <li key={`dont-${index}`}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default BestPractices;
