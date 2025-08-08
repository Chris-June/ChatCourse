import React from 'react';
import { Info } from 'lucide-react';

interface DidYouKnowProps {
  children: React.ReactNode;
}

const DidYouKnow: React.FC<DidYouKnowProps> = ({ children }) => {
  const headingId = 'did-you-know-heading';
  return (
    <div className="bg-card text-card-foreground border-l-4 border-primary p-4 my-6 rounded-r-lg" role="note" aria-labelledby={headingId}>
      <div className="flex items-start">
        <Info className="w-6 h-6 text-primary mr-4 flex-shrink-0 mt-1" aria-hidden="true" />
        <div>
          <h4 id={headingId} className="font-bold text-foreground">Did You Know?</h4>
          <p className="text-muted-foreground">{children}</p>
        </div>
      </div>
    </div>
  );
};

export default DidYouKnow;
