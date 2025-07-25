import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';

const ContaminatedChat = () => (
  <div className="bg-gray-900 p-4 rounded-lg border border-red-700 h-full">
    <h4 className="font-semibold text-red-400 mb-2 flex items-center">
      <XCircle className="w-5 h-5 mr-2" />
      With Contaminated Context
    </h4>
    <div className="space-y-2 text-sm">
      <p className="p-2 rounded-md bg-gray-700"><strong className="text-cyan-400">You:</strong> ...and that's why our new marketing slogan should be 'Innovate, Integrate, Inspire'.</p>
      <p className="p-2 rounded-md bg-gray-600"><strong className="text-purple-400">AI:</strong> That's a strong, memorable slogan. I like it.
      </p>
      <p className="p-2 rounded-md bg-gray-700"><strong className="text-cyan-400">You:</strong> Great. Now write a python script to parse a CSV file.</p>
      <p className="p-2 rounded-md bg-red-900/50"><strong className="text-purple-400">AI:</strong> Of course. Here is a Python script that will parse a CSV file for marketing slogans titled 'Innovate, Integrate, Inspire'...</p>
    </div>
  </div>
);

const CleanChat = () => (
  <div className="bg-gray-900 p-4 rounded-lg border border-green-700 h-full">
    <h4 className="font-semibold text-green-400 mb-2 flex items-center">
      <CheckCircle className="w-5 h-5 mr-2" />
      With a Fresh Context
    </h4>
    <div className="space-y-2 text-sm">
      <p className="p-2 rounded-md bg-gray-700 italic text-gray-400">[New Chat Started]</p>
      <p className="p-2 rounded-md bg-gray-700"><strong className="text-cyan-400">You:</strong> Write a python script to parse a CSV file.</p>
      <p className="p-2 rounded-md bg-green-900/50"><strong className="text-purple-400">AI:</strong> Certainly. Here is a standard Python script using the `csv` module to parse a CSV file. You'll need to provide the file path...</p>
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
