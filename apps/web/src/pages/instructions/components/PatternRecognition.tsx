import React from 'react';
import CopyButton from '../../../components/CopyButton';

const patternText = "You are a seasoned travel blogger specializing in budget travel. Create a 3-day itinerary for Lisbon, Portugal. Format it as a daily blog post, including money-saving tips.";

const PatternRecognition: React.FC = () => {
  return (
    <div className="bg-card p-6 rounded-xl border border-border">
        <h3 className="font-semibold text-card-foreground mb-2">Example: Applying a Prompt Pattern</h3>
        <p className="text-muted-foreground mb-3">
          Prompt patterns are reusable recipes for success. Instead of starting from scratch, you apply a proven structure to your task. The most common is the 'Persona Pattern'.
        </p>
        <p className="text-muted-foreground mb-4">
          This pattern provides a reliable framework that can be adapted to many different tasks to produce consistent, high-quality outcomes. It turns prompting from an art into a science.
        </p>
        <div className="relative bg-muted p-4 rounded-md">
            <CopyButton textToCopy={patternText} />
            <p className="text-foreground font-mono text-sm pr-10">
                <strong className='text-cyan-300'>[Persona]</strong> + <strong className='text-green-300'>[Task]</strong> + <strong className='text-yellow-300'>[Format]</strong><br/><br/>
                <span className='text-cyan-400'>"You are a seasoned travel blogger specializing in budget travel."</span> <span className='text-green-400'>"Create a 3-day itinerary for Lisbon, Portugal."</span> <span className='text-yellow-400'>"Format it as a daily blog post, including money-saving tips."</span>
            </p>
        </div>
        <p className="text-muted-foreground text-xs mt-2">
          <strong>Pro tip:</strong> Start a personal library of effective prompt patterns you discover. This will dramatically speed up your workflow.
        </p>
    </div>
  );
};

export default PatternRecognition;
