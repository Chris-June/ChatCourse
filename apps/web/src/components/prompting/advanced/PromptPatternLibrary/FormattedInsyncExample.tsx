import React from 'react';

interface FormattedInsyncExampleProps {
  example: string;
}

const insyncColors: { [key: string]: string } = {
  'Intent': 'text-blue-400',
  'Nuance': 'text-purple-400',
  'Style': 'text-teal-400',
  'You as...': 'text-amber-400',
  'Narrative Format': 'text-orange-400',
  'Context': 'text-gray-400',
};

const FormattedInsyncExample: React.FC<FormattedInsyncExampleProps> = ({ example }) => {
  const lines = example.split('\n').filter(line => line.trim() !== '');

  return (
    <div className="space-y-2.5 text-sm font-sans">
      {lines.map((line, index) => {
        const match = line.match(/^\*\*([\s\S]+?)\*\*:(.*)/);
        if (match) {
          const key = match[1].trim();
          const value = match[2].trim();
          const color = insyncColors[key] || 'text-gray-300';

          return (
            <div key={index}>
              <span className={`font-semibold ${color}`}>{key}:</span>
              <span className="ml-2 text-gray-300">{value}</span>
            </div>
          );
        }
        return (
          <div key={index} className="text-gray-300">
            {line}
          </div>
        );
      })}
    </div>
  );
};

export default FormattedInsyncExample;
