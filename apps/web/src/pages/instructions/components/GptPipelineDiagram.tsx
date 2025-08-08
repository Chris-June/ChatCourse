import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, FileText, Database, BrainCircuit, Zap, MessageSquare } from 'lucide-react';

const pipelineSteps = [
  { 
    icon: User,
    label: '1. User Prompt',
    description: 'Everything begins here. The user provides an instruction, question, or task, setting the entire process in motion. This is the raw input that the AI needs to interpret.'
  },
  { 
    icon: FileText,
    label: '2. Custom Instructions',
    description: "The AI first consults its 'Origin Story'—the custom instructions that define its persona, tone, and core directives. This ensures every response is in character and follows its guiding principles."
  },
  { 
    icon: Database,
    label: '3. Knowledge Retrieval (RAG)',
    description: "If the query requires specific information not in its core training, the AI accesses its 'Superpowers'—external documents or databases—to fetch relevant facts and context, like consulting a specialized encyclopedia."
  },
  { 
    icon: BrainCircuit,
    label: '4. Core Model Reasoning',
    description: 'This is the thinking step. The core LLM synthesizes the user prompt, custom instructions, and any retrieved knowledge. It analyzes the combined information to decide on the best course of action.'
  },
  { 
    icon: Zap,
    label: '5. Tool Execution',
    description: "If the plan requires interacting with the outside world, the AI uses its 'Utility Belt' of tools. It might call an API to get weather data, search for flights, or create a calendar event, turning decisions into actions."
  },
  { 
    icon: MessageSquare,
    label: '6. Final Response',
    description: 'Finally, the AI assembles all the information—the reasoning, the tool outputs, and its persona—into a single, coherent, and helpful response, delivering it to the user in a natural language format.'
  },
];

const GptPipelineDiagram: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="bg-card p-6 rounded-lg my-6 border text-card-foreground">
      <h4 className="text-xl font-bold text-center">Anatomy of a GPT Response</h4>
      <p className="text-center text-muted-foreground text-sm mb-6">Click on each step to see how your prompt travels through the AI's mind.</p>
      <div className="flex justify-between items-center mb-6 p-4 bg-muted rounded-lg flex-wrap">
        {pipelineSteps.map((step, index) => (
          <React.Fragment key={index}>
            <motion.div
              className="flex flex-col items-center text-center cursor-pointer w-24 mx-1 my-2"
              onClick={() => setActiveIndex(index)}
              animate={{ scale: activeIndex === index ? 1.1 : 1, y: activeIndex === index ? -5 : 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div
                className={`p-3 rounded-full transition-colors duration-300 ${activeIndex === index ? 'bg-primary shadow-lg shadow-primary/30' : 'bg-muted'}`}
                whileHover={{ scale: 1.15 }}
              >
                <step.icon className="w-7 h-7 text-primary-foreground" aria-hidden="true" />
              </motion.div>
              <p className={`mt-2 text-xs font-semibold transition-colors duration-300 ${activeIndex === index ? 'text-primary' : 'text-muted-foreground'}`}>
                {step.label}
              </p>
            </motion.div>
            {index < pipelineSteps.length - 1 && (
              <div className="flex-1 h-0.5 bg-border mx-2 hidden md:block"></div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="text-center bg-muted p-4 rounded-lg min-h-[110px] flex items-center justify-center border" role="status" aria-live="polite">
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm">{pipelineSteps[activeIndex].description}</p>
      </div>
    </div>
  );
};

export default GptPipelineDiagram;
