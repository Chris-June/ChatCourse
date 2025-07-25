import React from 'react';

interface GlossaryTermProps {
  term: string;
  definition: string;
}

const GlossaryTerm: React.FC<GlossaryTermProps> = ({ term, definition }) => {
  return (
    <span className="relative group">
      <span className="font-semibold text-blue-300 underline decoration-dotted cursor-help">{term}</span>
      <div className="absolute bottom-full mb-2 w-72 p-3 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
        <strong className="block text-white mb-1">{term}</strong>
        {definition}
      </div>
    </span>
  );
};

export default GlossaryTerm;
