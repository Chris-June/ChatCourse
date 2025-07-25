import React from 'react';
import { AlertTriangle } from 'lucide-react';

const pitfalls = [
  {
    title: 'Implicit Persona Change',
    description: 'You start a chat with a \'Marketing Guru\' persona, then later ask it to act as a \'Python Developer\' without restating the new persona. The AI may still carry over the marketing tone.'
  },
  {
    title: 'Burying the Lead',
    description: 'Writing a long paragraph of context and putting the main question or instruction somewhere in the middle. The AI might miss it or give it less weight.'
  },
  {
    title: 'Compound Questions',
    description: 'Asking multiple, unrelated questions in a single prompt. This often confuses the AI, leading to incomplete or merged answers. Ask one thing at a time.'
  }
];

const CommonPitfalls: React.FC = () => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-yellow-700">
      <ul className="space-y-3">
        {pitfalls.map((pitfall, index) => (
          <li key={index} className="flex items-start text-sm">
            <AlertTriangle className="w-5 h-5 mr-3 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-yellow-300">{pitfall.title}</h4>
              <p className="text-gray-400">{pitfall.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommonPitfalls;
