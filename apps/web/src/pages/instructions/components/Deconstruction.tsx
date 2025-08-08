import React from 'react';
import CopyButton from '../../../components/CopyButton';

const deconstructedText = "As a social media marketer, write a witty Instagram post targeted at college students to announce our new AI-powered grammar checker. Include a clear call to action to sign up for the beta.";

const Deconstruction: React.FC = () => {
  return (
    <div className="bg-card text-card-foreground p-4 rounded-lg border">
        <h3 id="deconstruction-heading" className="font-semibold text-foreground mb-2">Example: Deconstructing a Prompt</h3>
        <p className="text-muted-foreground mb-3">
          Deconstruction is the art of breaking a complex request into its core building blocks. Instead of writing one long sentence, you identify each specific instruction you're giving the AI.
        </p>
        <p className="text-muted-foreground mb-4">
          This helps you spot weaknesses. Is the 'Tone' clear? Is the 'Audience' specific enough? It turns prompt engineering from guesswork into a systematic process.
        </p>
        <div className="relative bg-muted p-4 rounded-md border" role="group" aria-labelledby="deconstruction-heading">
            <CopyButton textToCopy={deconstructedText} />
            <p className="text-muted-foreground font-mono text-sm pr-10">
                <strong>Role:</strong> Social Media Marketer<br/>
                <strong>Task:</strong> Write an Instagram post<br/>
                <strong>Product:</strong> AI-powered grammar checker<br/>
                <strong>Tone:</strong> Witty<br/>
                <strong>Audience:</strong> College students<br/>
                <strong>Action:</strong> Call to action to sign up for beta
            </p>
        </div>
        <p className="text-muted-foreground text-xs mt-2">
          <strong>Pro tip:</strong> Before writing a complex prompt, list out the deconstructed components first. This ensures you don't miss any key details.
        </p>
    </div>
  );
};

export default Deconstruction;
