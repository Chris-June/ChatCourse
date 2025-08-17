import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Cpu, MessageSquare, ArrowRight } from 'lucide-react';
import InteractiveHeader from '@/components/InteractiveHeader';
import { Button } from '@/components/ui/button';

const steps = [
  {
    name: 'User Query',
    icon: MessageSquare,
    color: 'text-blue-400',
    bgColor: 'bg-blue-900/50',
    description: 'A user asks a question, like "What are the benefits of the Pro plan?"',
  },
  {
    name: 'Vector Search',
    icon: Search,
    color: 'text-teal-400',
    bgColor: 'bg-teal-900/50',
    description: 'The system searches a specialized vector database for documents semantically related to the query.',
  },
  {
    name: 'Retrieve Documents',
    icon: FileText,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-900/50',
    description: 'The most relevant document chunks are retrieved from the knowledge base.',
  },
  {
    name: 'Augment Prompt',
    icon: Cpu,
    color: 'text-amber-400',
    bgColor: 'bg-amber-900/50',
    description: 'The retrieved documents are combined with the original query into a new, context-rich prompt for the LLM.',
  },
  {
    name: 'Generate Answer',
    icon: MessageSquare,
    color: 'text-green-400',
    bgColor: 'bg-green-900/50',
    description: 'The LLM generates an answer based *only* on the provided context, ensuring it is factual and relevant.',
  },
];

const RagFlowVisualizer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleNext = () => {
    setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < steps.length) {
        setCurrentStep(step);
      } else {
        clearInterval(interval);
        setIsPlaying(false);
      }
    }, 1500);
  };

  const activeStep = steps[currentStep];

  return (
    <div className="bg-card border rounded-xl p-6 space-y-6">
      <InteractiveHeader title="RAG Workflow" icon={Search} />
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h3 className="text-xl font-bold text-foreground">RAG Workflow Visualizer</h3>
        <div className="flex items-center gap-2">
          <Button onClick={handlePlay} disabled={isPlaying} size="sm">{isPlaying ? 'Playing...' : 'Play All'}</Button>
          <Button onClick={handlePrev} disabled={currentStep === 0 || isPlaying} variant="outline" size="sm">Prev</Button>
          <Button onClick={handleNext} disabled={currentStep === steps.length - 1 || isPlaying} variant="outline" size="sm">Next</Button>
          <Button onClick={handleReset} variant="ghost" size="sm">Reset</Button>
        </div>
      </div>

      <div className="relative flex items-center justify-center md:justify-between flex-wrap gap-4 p-4 min-h-[120px]">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <motion.div
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all duration-300 ${
                index === currentStep ? `${step.bgColor} border-current ${step.color}` : 'border-border text-muted-foreground'
              }`}
              animate={{ scale: index === currentStep ? 1.1 : 1, y: index === currentStep ? -5 : 0 }}
            >
              <step.icon className="w-8 h-8" aria-hidden="true" />
              <span className="text-xs font-semibold text-center">{step.name}</span>
            </motion.div>
            {index < steps.length - 1 && (
              <motion.div
                className="hidden md:block text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: index < currentStep ? 1 : 0.3 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ArrowRight className="w-8 h-8" aria-hidden="true" />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-muted rounded-lg p-4 min-h-[100px] flex items-center justify-center" role="region" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <h4 className={`text-lg font-bold ${activeStep.color}`}>{activeStep.name}</h4>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">{activeStep.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RagFlowVisualizer;
