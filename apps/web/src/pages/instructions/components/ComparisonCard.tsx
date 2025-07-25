import React from 'react';

interface ComparisonCardProps {
  title: string;
  icon: React.ReactNode;
  points: string[];
  bgColorClass: string;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ title, icon, points, bgColorClass }) => {
  return (
    <div className={`flex-1 p-6 rounded-lg shadow-lg ${bgColorClass}`}>
      <div className="flex items-center mb-4">
        <div className="mr-4">{icon}</div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>
      <ul className="space-y-3 text-gray-200">
        {points.map((point, index) => (
          <li key={index} className="flex items-start">
            <span className="text-green-400 mr-2 mt-1">✓</span>
            <span dangerouslySetInnerHTML={{ __html: point }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComparisonCard;
