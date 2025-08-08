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
    <div className="my-4 space-y-4 bg-card border rounded-lg p-4 text-card-foreground" role="list">
      {items.map((item, index) => (
        <div key={index} className="bg-muted p-4 rounded-lg border" role="listitem">
          <h5 className="font-bold text-foreground">{item.term}</h5>
          <p className="text-muted-foreground mt-1 mb-2">{item.definition}</p>
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline inline-flex items-center transition-colors"
            >
              Learn More <ExternalLink size={14} className="ml-1.5" aria-hidden="true" />
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default GlossarySection;
