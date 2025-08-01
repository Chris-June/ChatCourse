import React from 'react';
import CopyButton from '../../../components/CopyButton';

const deconstructedText = "As a social media marketer, write a witty Instagram post targeted at college students to announce our new AI-powered grammar checker. Include a clear call to action to sign up for the beta.";

const Deconstruction: React.FC = () => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
        <h3 className="font-semibold text-white mb-2">Example: Deconstructing a Prompt</h3>
        <p className="text-gray-400 mb-3">
          Deconstruction is the art of breaking a complex request into its core building blocks. Instead of writing one long sentence, you identify each specific instruction you're giving the AI.
        </p>
        <p className="text-gray-400 mb-4">
          This helps you spot weaknesses. Is the 'Tone' clear? Is the 'Audience' specific enough? It turns prompt engineering from guesswork into a systematic process.
        </p>
        <div className="relative bg-gray-800 p-4 rounded-md">
            <CopyButton textToCopy={deconstructedText} />
            <p className="text-gray-300 font-mono text-sm pr-10">
                <strong>Role:</strong> Social Media Marketer<br/>
                <strong>Task:</strong> Write an Instagram post<br/>
                <strong>Product:</strong> AI-powered grammar checker<br/>
                <strong>Tone:</strong> Witty<br/>
                <strong>Audience:</strong> College students<br/>
                <strong>Action:</strong> Call to action to sign up for beta
            </p>
        </div>
        <p className="text-gray-400 text-xs mt-2">
          <strong>Pro tip:</strong> Before writing a complex prompt, list out the deconstructed components first. This ensures you don't miss any key details.
        </p>
    </div>
  );
};

export default Deconstruction;
