import React from 'react';
import CopyButton from '../../../components/CopyButton';

const refinedText = "Write a one-paragraph summary of 'Moby Dick', focusing on Captain Ahab's obsession and its consequences. Write it in a dramatic and suspenseful tone.";

const IterativeRefinement: React.FC = () => {
  return (
    <div className="bg-card p-6 rounded-xl border border-border">
        <h3 className="font-semibold text-card-foreground mb-2">Example: Iterative Refinement</h3>
        <p className="text-muted-foreground mb-3">
          Iterative refinement is the process of starting with a simple prompt and making small, controlled changes to systematically improve the AI's output. It's a conversation, not a one-shot command.
        </p>
        <p className="text-muted-foreground mb-4">
          By observing the AI's response at each step, you can diagnose issues and add the necessary detail or constraints to guide it toward the perfect result.
        </p>
        <div className="relative bg-muted p-4 rounded-md">
            <CopyButton textToCopy={refinedText} />
            <div className="text-foreground font-mono text-sm pr-10">
                <p className='mb-2'><strong className='text-gray-500'>V1 (Initial):</strong> "Write a summary of 'Moby Dick'."</p>
                <p><strong className='text-green-400'>V2 (Refined):</strong> "Write a one-paragraph summary of 'Moby Dick', <span className='underline'>focusing on Captain Ahab's obsession and its consequences</span>. Write it in a <span className='underline'>dramatic and suspenseful tone</span>."</p>
            </div>
        </div>
        <p className="text-muted-foreground text-xs mt-2">
          <strong>Pro tip:</strong> Don't be afraid to tell the AI what you *don't* want. For example, add "...and do not include any spoilers about the ending."
        </p>
    </div>
  );
};

export default IterativeRefinement;
