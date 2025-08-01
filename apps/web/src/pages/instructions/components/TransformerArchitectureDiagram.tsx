import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Puzzle, LocateFixed, ArrowRight, BrainCircuit } from 'lucide-react';

const steps = [
  {
    title: '1. Tokenization',
    description: 'Your sentence is shattered into LEGO bricks of meaning called tokens. This is the raw material the AI works with.',
    icon: Puzzle,
  },
  {
    title: '2. Embeddings',
    description: "Each token \'brick\' is given a unique GPS coordinate in a vast \'meaning space\'. Words with similar meanings get placed closer together. 'King' is near 'Queen', but far from 'Taco'.",
    icon: Layers,
  },
  {
    title: '3. Positional Encoding',
    description: "The AI needs to know the order of the words. Positional encoding is like stamping each \'brick\' with its sequence number. Now 'The cat sat on the mat' is different from 'The mat sat on the cat'.",
    icon: LocateFixed,
  },
  {
    title: '4. Transformer Blocks (Self-Attention)',
    description: "This is the heart of the machine. Imagine a series of boardroom meetings (layers). In each meeting, every word-token looks at every other word-token and decides how relevant it is. 'It' in 'The robot picked it up' pays close attention to 'robot'.",
    icon: BrainCircuit,
  },
  {
    title: '5. Final Output',
    description: 'After all the meetings, the AI has a deep understanding. It predicts the most probable next \'brick\' from its entire vocabulary, adds it to the sequence, and then converts the final chain of bricks back into human-readable text.',
    icon: ArrowRight,
  },
];

const TransformerArchitectureDiagram: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-dashed border-gray-700 my-6">
      <h3 className="text-xl font-bold text-center text-white">Under the Hood: How an LLM 'Thinks'</h3>
      <p className="text-center text-gray-400 text-sm mb-6">A simplified look at the Transformer Architecture</p>
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
                className={`p-3 rounded-full transition-colors duration-300 ${activeIndex === index ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-gray-600'}`}
                whileHover={{ scale: 1.15 }}
              >
                <step.icon className="w-6 h-6 text-white" />
              </motion.div>
              <p className={`mt-2 text-xs font-semibold transition-colors duration-300 ${activeIndex === index ? 'text-blue-300' : 'text-gray-400'}`}>
                {step.title}
              </p>
            </motion.div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 bg-gray-600 mx-2"></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="text-center bg-gray-900/50 p-4 rounded-lg min-h-[100px] flex items-center justify-center">
        <p className="text-gray-300 max-w-2xl mx-auto text-sm">{steps[activeIndex].description}</p>
      </div>
      <p className="text-center text-xs text-gray-500 mt-4 italic">Key Takeaway: Transformers are powerful because they weigh the importance of every word against every other word, creating deep contextual understanding.</p>
    </div>
  );
};

export default TransformerArchitectureDiagram;
