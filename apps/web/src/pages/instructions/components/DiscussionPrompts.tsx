import React from 'react';
import { MessageSquareQuote } from 'lucide-react';

interface DiscussionPromptsProps {
  prompts: string[];
}

const DiscussionPrompts: React.FC<DiscussionPromptsProps> = ({ prompts }) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-dashed border-gray-600 my-6">
      <div className="flex items-start">
        <MessageSquareQuote className="w-8 h-8 text-purple-400 mr-4 mt-1 flex-shrink-0" />
        <div>
          <h4 className="text-xl font-bold text-purple-300 mb-3">Peer Review & Discussion</h4>
          <p className="text-gray-300 mb-4">Share your agent design with a peer and discuss the following:</p>
          <ul className="list-decimal pl-5 space-y-2 text-gray-300">
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
