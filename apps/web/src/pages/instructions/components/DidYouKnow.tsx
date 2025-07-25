import React from 'react';
import { Info } from 'lucide-react';

interface DidYouKnowProps {
  children: React.ReactNode;
}

const DidYouKnow: React.FC<DidYouKnowProps> = ({ children }) => {
  return (
    <div className="bg-gray-900 border-l-4 border-yellow-400 p-4 my-6 rounded-r-lg">
      <div className="flex items-start">
        <Info className="w-6 h-6 text-yellow-400 mr-4 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-bold text-yellow-300">Did You Know?</h4>
          <p className="text-gray-300">{children}</p>
        </div>
      </div>
    </div>
  );
};

export default DidYouKnow;
