import React from 'react';

import CopyButton from '../../../components/CopyButton';

const instructionText = "You are a senior editor. The following is a draft of a blog post about the benefits of remote work. Read through it and then provide three specific, actionable suggestions to improve its introduction. Focus on making the hook more compelling.";

const InstructionPriming: React.FC = () => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
        <h3 className="font-semibold text-white mb-2">Example: Priming the AI</h3>
        <p className="text-gray-400 mb-3">
          Priming works like setting the stage before a performance. By placing the core instruction at the end, you're ensuring it's the last thing the AI "remembers" before responding—like the final note that stays in someone's mind.
        </p>
        <p className="text-gray-400 mb-4">
          This technique leverages the AI's attention mechanism. The final instruction acts as a spotlight, making sure the AI focuses on your most critical requirement right before generating a response.
        </p>
        <div className="relative bg-gray-800 p-4 rounded-md">
            <CopyButton textToCopy={instructionText} />
            <p className="text-gray-300 font-mono text-sm pr-10">
                "You are a senior editor. The following is a draft of a blog post about the benefits of remote work. [Blog post text would go here]. Read through it and then <strong className='text-yellow-300'>provide three specific, actionable suggestions to improve its introduction. Focus on making the hook more compelling.</strong>"
            </p>
        </div>
        <p className="text-gray-400 text-xs mt-2">
          <strong>Pro tip:</strong> Use this technique when you have multiple requirements—place the most important one last.
        </p>
    </div>
  );
};

export default InstructionPriming;
