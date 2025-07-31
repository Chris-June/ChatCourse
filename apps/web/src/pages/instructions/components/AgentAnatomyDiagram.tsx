import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChefHat, Bot, BookCopy, CookingPot } from 'lucide-react';

const anatomySteps = [
  {
    id: 'planner',
    icon: <ChefHat size={32} />,
    title: 'The Planner (Head Chef)',
    description: 'Designs the high-level strategy to achieve the goal.',
    analogy: 'The Head Chef receives an order for a "five-course meal" (the user\'s goal). It doesn\'t cook; it designs the menu, sequences the dishes, and writes the recipes (the plan) for the kitchen staff to follow.'
  },
  {
    id: 'executor',
    icon: <Bot size={32} />,
    title: 'The Executor (Robo-Sous-Chef)',
    description: 'Carries out the plan by using tools.',
    analogy: 'This is the tireless robotic Sous-Chef. It reads the recipes from the Head Chef and operates the kitchen appliances (the tools) to chop, mix, and cook the ingredients exactly as instructed.'
  },
  {
    id: 'memory',
    icon: <BookCopy size={32} />,
    title: 'Memory (Recipe Book & Pantry Log)',
    description: 'Retains information from past steps.',
    analogy: 'This is the kitchen\'s shared knowledge base. It\'s a recipe book of what has worked before, a log of which ingredients have been used (short-term memory), and a pantry inventory of all available resources (long-term knowledge).'
  },
  {
    id: 'toolset',
    icon: <CookingPot size={32} />,
    title: 'The Toolset (Kitchen Appliances)',
    description: 'The specific skills the agent can use.',
    analogy: 'These are the specialized appliances the Sous-Chef can operate: a high-tech oven (for running code), a blender (for data analysis), or a direct line to the grocery store (an API call). Each tool does one thing perfectly.'
  },
];

const AgentAnatomyDiagram: React.FC = () => {
  const [activeStep, setActiveStep] = useState(anatomySteps[0]);

  return (
    <div className="my-6 p-4 md:p-6 bg-gray-900 rounded-lg border border-gray-700">
      <h3 className="text-xl font-bold text-center text-white mb-2">An Agent is an Autonomous Chef</h3>
      <p className="text-center text-gray-400 text-sm mb-6">Click each component to understand its role in the automated kitchen.</p>
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        {anatomySteps.map((step, index) => (
          <React.Fragment key={step.id}>
            <motion.div
              onClick={() => setActiveStep(step)}
              className={`p-4 rounded-lg border cursor-pointer w-full md:w-48 h-48 flex flex-col items-center justify-center text-center transition-colors duration-300 ${activeStep.id === step.id ? 'bg-blue-900/50 border-blue-500' : 'bg-gray-800 border-gray-700 hover:bg-gray-700/80'}`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className={`mb-3 ${activeStep.id === step.id ? 'text-blue-400' : 'text-gray-400'}`}>{step.icon}</div>
              <h4 className="font-bold text-md text-white">{step.title}</h4>
            </motion.div>
            {index < anatomySteps.length - 1 && (
              <div className="hidden md:flex">
                <ArrowRight className="text-gray-500 mx-2" size={24} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep.id}
          className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="font-bold text-blue-300 mb-2">Analogy: {activeStep.title}</h4>
          <p className="text-gray-300">{activeStep.analogy}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AgentAnatomyDiagram;
