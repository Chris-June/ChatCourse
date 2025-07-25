import React from 'react';
import { ExternalLink } from 'lucide-react';

interface GlossaryItem {
  term: string;
  definition: string;
  link?: string;
}

interface GlossarySectionProps {
  items: GlossaryItem[];
}

const GlossarySection: React.FC<GlossarySectionProps> = ({ items }) => {
  return (
    <div className="my-4 space-y-4">
      {items.map((item, index) => (
        <div key={index} className="bg-gray-800/50 p-4 rounded-lg">
          <h5 className="font-bold text-white">{item.term}</h5>
          <p className="text-gray-300 mt-1 mb-2">{item.definition}</p>
          {item.link && (
            <a 
              href={item.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-400 hover:text-blue-300 inline-flex items-center transition-colors"
            >
              Learn More <ExternalLink size={14} className="ml-1.5" />
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default GlossarySection;
