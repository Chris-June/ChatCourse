import React from 'react';
import { AlertTriangle } from 'lucide-react';

const pitfalls = [
  {
    title: 'Implicit Persona Change',
    description: 'You start with a "Marketing Guru" persona, then later ask it to act as a "Python Developer" without restating the new role. The AI may still use the marketing tone. Instead, explicitly state: "Now act as a Python Developer" to reset the context.'
  },
  {
    title: 'Burying the Lead',
    description: 'Writing a long paragraph with the main question in the middle. The AI might miss it. Instead, put your main instruction at the beginning or end, or use clear formatting like "Main task: [your instruction]."'
  },
  {
    title: 'Compound Questions',
    description: 'Asking multiple unrelated questions at once. This often leads to incomplete answers. Instead, break complex requests into separate messages, or use clear numbering: "Question 1:... Question 2:..."'
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
