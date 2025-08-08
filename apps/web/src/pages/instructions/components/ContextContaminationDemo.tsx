import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';

const ContaminatedChat = () => (
  <div className="bg-card p-4 rounded-xl border border-border h-full">
    <h4 className="font-semibold text-destructive mb-2 flex items-center">
      <XCircle className="w-5 h-5 mr-2" />
      When Context Gets Confused
    </h4>
    <p className="text-muted-foreground text-xs mb-3">
      The AI is mixing up details from different topics because the conversation context has become cluttered.
    </p>
    <div className="space-y-2 text-sm">
      <p className="p-2 rounded-md bg-muted"><strong className="text-primary">You:</strong> ...and that's why our new marketing slogan should be 'Innovate, Integrate, Inspire'.</p>
      <p className="p-2 rounded-md bg-muted"><strong className="text-emerald-400">AI:</strong> That's a strong, memorable slogan. I like it.
      </p>
      <p className="p-2 rounded-md bg-muted"><strong className="text-primary">You:</strong> Great. Now write a python script to parse a CSV file.</p>
      <p className="p-2 rounded-md bg-destructive/10"><strong className="text-emerald-400">AI:</strong> Of course. Here is a Python script that will parse a CSV file for marketing slogans titled 'Innovate, Integrate, Inspire'...</p>
    </div>
  </div>
);

const CleanChat = () => (
  <div className="bg-card p-4 rounded-xl border border-border h-full">
    <h4 className="font-semibold text-emerald-400 mb-2 flex items-center">
      <CheckCircle className="w-5 h-5 mr-2" />
      With a Fresh Start
    </h4>
    <p className="text-muted-foreground text-xs mb-3">
      Starting fresh gives the AI a clean slate to focus only on your new request.
    </p>
    <div className="space-y-2 text-sm">
      <p className="p-2 rounded-md bg-muted italic text-muted-foreground">[New Chat Started]</p>
      <p className="p-2 rounded-md bg-muted"><strong className="text-primary">You:</strong> Write a python script to parse a CSV file.</p>
      <p className="p-2 rounded-md bg-emerald-900/10"><strong className="text-emerald-400">AI:</strong> Certainly. Here is a standard Python script using the `csv` module to parse a CSV file. You'll need to provide the file path...</p>
    </div>
  </div>
);

const ContextContaminationDemo: React.FC = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <ContaminatedChat />
      <CleanChat />
    </div>
  );
};

export default ContextContaminationDemo;
