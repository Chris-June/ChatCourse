import React from 'react';
import { motion } from 'framer-motion';
import { User, FileText, Database, Cpu, Wrench, MessageSquare, ArrowRight } from 'lucide-react';

const pipelineSteps = [
  { icon: <User />, label: 'User Prompt' },
  { icon: <FileText />, label: 'Custom Instructions' },
  { icon: <Database />, label: 'RAG Knowledge' },
  { icon: <Cpu />, label: 'Model Call' },
  { icon: <Wrench />, label: 'Tool Action' },
  { icon: <MessageSquare />, label: 'Final Response' },
];

const GptPipelineDiagram: React.FC = () => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg my-6">
      <h4 className="text-xl font-bold text-center text-white mb-6">The Journey of a Prompt</h4>
      <div className="flex items-center justify-center flex-wrap">
        {pipelineSteps.map((step, index) => (
          <React.Fragment key={index}>
            <motion.div
              className="flex flex-col items-center text-center mx-2 md:mx-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="bg-gray-800 border border-gray-700 rounded-full w-16 h-16 flex items-center justify-center text-blue-400">
                {React.cloneElement(step.icon, { size: 32 })}
              </div>
              <span className="mt-2 text-xs md:text-sm text-gray-300 w-20">{step.label}</span>
            </motion.div>
            {index < pipelineSteps.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.1 }}
                className="hidden md:block text-gray-500 mx-2"
              >
                <ArrowRight size={24} />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default GptPipelineDiagram;
