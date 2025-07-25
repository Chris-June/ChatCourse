import React from 'react';

interface SpotlightProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const RealWorldSpotlight: React.FC<SpotlightProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-blue-400/30 flex items-start space-x-4">
      <div className="flex-shrink-0 text-blue-400 mt-1">{icon}</div>
      <div>
        <h4 className="font-bold text-blue-300 text-lg">{title}</h4>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default RealWorldSpotlight;
