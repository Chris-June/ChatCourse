import React from 'react';

interface ComparisonCardProps {
  title: string;
  icon: React.ReactNode;
  points: string[];
  bgColorClass: string;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ title, icon, points, bgColorClass }) => {
  const titleId = React.useId();
  return (
    <div role="group" aria-labelledby={titleId} className={`flex-1 p-6 rounded-xl border shadow-sm bg-card text-card-foreground ${bgColorClass}`}>
      <div className="flex items-center mb-4">
        <div className="mr-4 text-primary">{icon}</div>
        <h3 id={titleId} className="text-2xl font-bold text-foreground">{title}</h3>
      </div>
      <ul className="space-y-3 text-muted-foreground" aria-label={`Comparison points for ${title}`}>
        {points.map((point, index) => (
          <li key={index} className="flex items-start">
            <svg className="h-4 w-4 text-emerald-500 mr-2 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
            <span dangerouslySetInnerHTML={{ __html: point }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComparisonCard;
