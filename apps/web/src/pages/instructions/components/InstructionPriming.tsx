import React from 'react';

import CopyButton from '../../../components/CopyButton';

const instructionText = "You are a senior editor. The following is a draft of a blog post about the benefits of remote work. Read through it and then provide three specific, actionable suggestions to improve its introduction. Focus on making the hook more compelling.";

const InstructionPriming: React.FC = () => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
        <h3 className="font-semibold text-white mb-2">Example: Priming the AI</h3>
        <p className="text-gray-400 mb-4">
            Notice how the core command is placed at the very end. This focuses the AI on the most critical part of the task right before it starts generating a response.
        </p>
        <div className="relative bg-gray-800 p-4 rounded-md">
            <CopyButton textToCopy={instructionText} />
            <p className="text-gray-300 font-mono text-sm pr-10">
                "You are a senior editor. The following is a draft of a blog post about the benefits of remote work. [Blog post text would go here]. Read through it and then <strong className='text-yellow-300'>provide three specific, actionable suggestions to improve its introduction. Focus on making the hook more compelling.</strong>"
            </p>
        </div>
    </div>
  );
};

export default InstructionPriming;
