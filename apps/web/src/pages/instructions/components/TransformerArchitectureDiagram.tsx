import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Puzzle, LocateFixed, ArrowRight, BrainCircuit } from 'lucide-react';

const steps = [
  {
    title: 'Input Tokens',
    description: 'First, your input text (e.g., "Hello world") is broken down into smaller pieces called tokens.',
    icon: Puzzle,
  },
  {
    title: 'Embeddings',
    description: 'Each token is converted into a high-dimensional numerical vector (an embedding) that captures its semantic meaning.',
    icon: Layers,
  },
  {
    title: 'Positional Encoding',
    description: 'To understand word order, a positional vector is added to each token\'s embedding. Now the model knows *what* each word means and *where* it is.',
    icon: LocateFixed,
  },
  {
    title: 'Transformer Blocks',
    description: 'The data flows through multiple layers where Self-Attention calculates how important each word is to every other word, creating a rich contextual understanding.',
    icon: BrainCircuit,
  },
  {
    title: 'Final Output',
    description: 'After processing, the model generates a probability distribution over its vocabulary and picks the most likely next token, which is then converted back to text.',
    icon: ArrowRight,
  },
];

const TransformerArchitectureDiagram: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-dashed border-gray-700 my-6">
      <h3 className="text-xl font-bold text-center text-white mb-6">Under the Hood: A Simplified Transformer</h3>
      <div className="flex justify-between items-center mb-6 p-4 bg-gray-900 rounded-lg">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <motion.div
              className="flex flex-col items-center text-center cursor-pointer w-24" // Added fixed width
              onClick={() => setActiveIndex(index)}
              animate={{ scale: activeIndex === index ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div
                className={`p-3 rounded-full ${activeIndex === index ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-gray-600'}`}
                whileHover={{ scale: 1.15 }}
              >
                <step.icon className="w-6 h-6 text-white" />
              </motion.div>
              <p className={`mt-2 text-xs font-semibold ${activeIndex === index ? 'text-blue-300' : 'text-gray-400'}`}>
                {step.title}
              </p>
            </motion.div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-gray-600 mx-2"></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="text-center bg-gray-900/50 p-4 rounded-lg min-h-[80px] flex items-center justify-center">
        <p className="text-gray-300 max-w-2xl mx-auto">{steps[activeIndex].description}</p>
      </div>
    </div>
  );
};

export default TransformerArchitectureDiagram;
