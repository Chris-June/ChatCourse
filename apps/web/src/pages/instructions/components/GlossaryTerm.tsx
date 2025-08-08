import React from 'react';

interface GlossaryTermProps {
  term: string;
  definition: string;
}

const GlossaryTerm: React.FC<GlossaryTermProps> = ({ term, definition }) => {
  return (
    <span className="relative group inline-block">
      {/* Trigger is focusable and references tooltip via aria-describedby */}
      <button
        type="button"
        className="font-semibold text-primary underline decoration-dotted cursor-help focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded"
        aria-describedby={`tooltip-${term.replace(/\s+/g, '-').toLowerCase()}`}
      >
        {term}
      </button>
      {/* Tooltip */}
      <div
        id={`tooltip-${term.replace(/\s+/g, '-').toLowerCase()}`}
        role="tooltip"
        className="absolute bottom-full mb-2 w-72 p-3 bg-popover text-popover-foreground border rounded-lg text-sm opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none z-10 shadow"
      >
        <strong className="block text-foreground mb-1">{term}</strong>
        {definition}
      </div>
    </span>
  );
};

export default GlossaryTerm;
