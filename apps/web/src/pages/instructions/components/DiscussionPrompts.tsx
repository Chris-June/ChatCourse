import React from 'react';
import { MessageSquareQuote } from 'lucide-react';

interface DiscussionPromptsProps {
  prompts: string[];
}

const DiscussionPrompts: React.FC<DiscussionPromptsProps> = ({ prompts }) => {
  const headingId = 'discussion-prompts-heading';
  return (
    <div className="bg-card text-card-foreground p-6 rounded-lg border border-dashed my-6" role="group" aria-labelledby={headingId}>
      <div className="flex items-start">
        <MessageSquareQuote className="w-8 h-8 text-purple-400 mr-4 mt-1 flex-shrink-0" aria-hidden="true" />
        <div>
          <h4 id={headingId} className="text-xl font-bold text-foreground mb-3">Peer Review & Discussion</h4>
          <p className="text-muted-foreground mb-4">Share your agent design with a peer and discuss the following:</p>
          <ul className="list-decimal pl-5 space-y-2 text-muted-foreground">
            {prompts.map((prompt, index) => (
              <li key={index}>{prompt}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DiscussionPrompts;
