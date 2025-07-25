import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { User, Bot, Cog, Terminal, CheckSquare, Play, RefreshCw } from 'lucide-react';

const mockData = {
  userPrompt: "What's the weather like in Boston?",
  llmThought: "The user is asking for the weather. I should use the `get_current_weather` function.",
  functionCall: {
    name: 'get_current_weather',
    arguments: { location: 'Boston, MA' },
  },
  apiResponse: {
    temperature: '72',
    unit: 'fahrenheit',
    description: 'Sunny',
  },
  finalResponse: "The weather in Boston, MA is currently 72°F and sunny.",
};

interface FlowStepProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  isCode?: boolean;
}

const FlowStep: React.FC<FlowStepProps> = ({ icon, title, content, isCode = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700"
  >
    <div className="text-blue-400 mt-1">{icon}</div>
    <div className="flex-1">
      <h4 className="font-bold text-white">{title}</h4>
      {isCode ? (
        <pre className="mt-2 p-3 bg-gray-900 rounded-md font-mono text-xs text-green-300 whitespace-pre-wrap">
          <code>{content}</code>
        </pre>
      ) : (
        <p className="text-gray-300 mt-1">{content}</p>
      )}
    </div>
  </motion.div>
);

const FunctionCallFlowVisualizer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const steps = [
    { icon: <User />, title: 'User Prompt', content: mockData.userPrompt },
    { icon: <Bot />, title: 'LLM Thought Process', content: mockData.llmThought },
    { icon: <Cog />, title: 'Function Call Generated', content: JSON.stringify(mockData.functionCall, null, 2), isCode: true },
    { icon: <Terminal />, title: 'Tool Execution (API Call)', content: JSON.stringify(mockData.apiResponse, null, 2), isCode: true },
    { icon: <CheckSquare />, title: 'Final LLM Response', content: mockData.finalResponse },
  ];

  const startFlow = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStep(1);
    let step = 1;
    const interval = setInterval(() => {
      step++;
      if (step > steps.length) {
        clearInterval(interval);
        setIsRunning(false);
      } else {
        setCurrentStep(step);
      }
    }, 2000);
  };

  const resetFlow = () => {
    setCurrentStep(0);
    setIsRunning(false);
  }

  return (
    <div className="bg-gray-900/70 border border-gray-700 rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Function Call Lifecycle</h3>
        {currentStep === 0 ? (
            <Button onClick={startFlow} disabled={isRunning}>
                <Play className="w-4 h-4 mr-2" /> Run Flow
            </Button>
        ) : (
            <Button onClick={resetFlow} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" /> Reset
            </Button>
        )}
      </div>
      <div className="space-y-4">
        <AnimatePresence>
          {steps.slice(0, currentStep).map((step, index) => (
            <FlowStep key={index} {...step} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FunctionCallFlowVisualizer;
