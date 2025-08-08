import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type LucideIcon, ArrowRight, ChefHat, Bot, BookCopy, CookingPot } from 'lucide-react';

type Step = {
  id: 'planner' | 'executor' | 'memory' | 'toolset';
  Icon: LucideIcon;
  title: string;
  description: string;
  analogy: string;
};

const anatomySteps: Step[] = [
  {
    id: 'planner',
    Icon: ChefHat,
    title: 'The Planner (Head Chef)',
    description: 'Designs the high-level strategy to achieve the goal.',
    analogy:
      'The Head Chef receives an order for a "five-course meal" (the user\'s goal). It doesn\'t cook; it designs the menu, sequences the dishes, and writes the recipes (the plan) for the kitchen staff to follow.'
  },
  {
    id: 'executor',
    Icon: Bot,
    title: 'The Executor (Robo-Sous-Chef)',
    description: 'Carries out the plan by using tools.',
    analogy:
      'This is the tireless robotic Sous-Chef. It reads the recipes from the Head Chef and operates the kitchen appliances (the tools) to chop, mix, and cook the ingredients exactly as instructed.'
  },
  {
    id: 'memory',
    Icon: BookCopy,
    title: 'Memory (Recipe Book & Pantry Log)',
    description: 'Retains information from past steps.',
    analogy:
      "This is the kitchen's shared knowledge base. It's a recipe book of what has worked before, a log of which ingredients have been used (short-term memory), and a pantry inventory of all available resources (long-term knowledge)."
  },
  {
    id: 'toolset',
    Icon: CookingPot,
    title: 'The Toolset (Kitchen Appliances)',
    description: 'The specific skills the agent can use.',
    analogy:
      'These are the specialized appliances the Sous-Chef can operate: a high-tech oven (for running code), a blender (for data analysis), or a direct line to the grocery store (an API call). Each tool does one thing perfectly.'
  }
];

const AgentAnatomyDiagram: React.FC = () => {
  const [activeId, setActiveId] = useState<Step['id']>('planner');
  const activeStep = anatomySteps.find((s) => s.id === activeId) ?? anatomySteps[0];

  const order: Step['id'][] = anatomySteps.map((s) => s.id);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const idx = order.indexOf(activeId);
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = order[(idx + 1) % order.length];
      setActiveId(next);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = order[(idx - 1 + order.length) % order.length];
      setActiveId(prev);
    }
  };

  return (
    <div className="my-6 p-4 md:p-6 bg-card text-card-foreground rounded-xl border shadow-sm">
      <h3 className="text-lg md:text-xl font-semibold text-center text-foreground mb-2">An Agent is an Autonomous Chef</h3>
      <p className="text-center text-muted-foreground text-sm mb-6">Click each component to understand its role in the automated kitchen.</p>
      
      <div
        className="flex flex-col md:flex-row justify-center items-center gap-4"
        role="radiogroup"
        aria-label="Agent anatomy steps"
        onKeyDown={onKeyDown}
      >
        {anatomySteps.map((step, index) => {
          const isActive = activeId === step.id;
          const Icon = step.Icon;
          return (
            <React.Fragment key={step.id}>
              <motion.button
                type="button"
                onClick={() => setActiveId(step.id)}
                className={
                  `w-full md:w-48 h-48 inline-flex flex-col items-center justify-center rounded-lg border text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background ${
                    isActive
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'bg-muted border-transparent text-muted-foreground hover:bg-muted/80'
                  }`
                }
                role="radio"
                aria-checked={isActive}
              >
                <Icon className="h-8 w-8 mb-3" aria-hidden="true" />
                <h4 className="font-semibold text-sm md:text-base text-foreground text-center">
                  {step.title}
                </h4>
              </motion.button>
              {index < anatomySteps.length - 1 && (
                <div className="hidden md:flex">
                  <ArrowRight className="text-muted-foreground mx-2 h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep.id}
          className="mt-6 p-4 bg-muted rounded-lg border text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="font-semibold text-primary mb-2">Analogy: {activeStep.title}</h4>
          <p className="text-foreground">{activeStep.analogy}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AgentAnatomyDiagram;
