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
    <div className="bg-card text-card-foreground p-4 rounded-xl border">
      <ul className="space-y-3" aria-label="Common pitfalls">
        {pitfalls.map((pitfall, index) => (
          <li key={index} className="flex items-start text-sm">
            <AlertTriangle className="h-5 w-5 mr-3 text-amber-500 flex-shrink-0 mt-1" aria-hidden="true" />
            <div>
              <h4 className="font-semibold text-foreground">{pitfall.title}</h4>
              <p className="text-muted-foreground">{pitfall.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommonPitfalls;
