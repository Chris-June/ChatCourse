import React from 'react';
import { Check, X } from 'lucide-react';

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-blue-500/30 px-1 py-0.5 rounded">{children}</span>
);

const HighlightGreen = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-green-500/30 px-1 py-0.5 rounded">{children}</span>
  );

const PromptingColumn = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="flex flex-col space-y-4">
    <h3 className="text-xl font-semibold text-center text-gray-200">{title}</h3>
    {children}
  </div>
);

const Card = ({ title, titleColor, children }: { title: string; titleColor: string; children: React.ReactNode }) => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 h-full">
    <div className={`inline-block px-3 py-1 text-sm font-medium rounded-md mb-3 ${titleColor}`}>
      {title}
    </div>
    <div className="text-sm text-gray-300 space-y-3">{children}</div>
  </div>
);

const CotDiagram: React.FC = () => {
  return (
    <div className="my-6 grid md:grid-cols-2 gap-6">
      {/* Standard Prompting - Like a calculator */}
      <PromptingColumn title="Standard Prompting (Calculator Mode)">
        <div className="text-xs text-gray-400 mb-2 text-center">Like using a calculator - you get the answer without seeing the process</div>
        <Card title="Model Input" titleColor="bg-blue-500/20 text-blue-300">
          <p><span className="font-bold">Q:</span> Roger has 5 tennis balls. He buys 2 more cans of tennis balls. Each can has 3 tennis balls. How many tennis balls does he have now?</p>
          <p><span className="font-bold">A:</span> The answer is 11.</p>
          <hr className="border-gray-600/50" />
          <p><span className="font-bold">Q:</span> The cafeteria had 23 apples. If they used 20 to make lunch and bought 6 more, how many apples do they have?</p>
        </Card>
        <Card title="Model Output" titleColor="bg-green-500/20 text-green-300">
          <div className="flex items-center">
            <p className="flex-grow"><span className="font-bold">A:</span> The answer is 27.</p>
            <X className="w-6 h-6 text-red-500 ml-2" />
          </div>
          <div className="text-xs text-red-400 mt-2">❌ Wrong: 27 (should be 9)</div>
        </Card>
      </PromptingColumn>

      {/* Chain-of-Thought Prompting - Like a teacher */}
      <PromptingColumn title="Chain-of-Thought Prompting (Teacher Mode)">
        <div className="text-xs text-gray-400 mb-2 text-center">Like having a teacher who shows every step of the solution</div>
        <Card title="Model Input" titleColor="bg-blue-500/20 text-blue-300">
            <p><span className="font-bold">Q:</span> Roger has 5 tennis balls. He buys 2 more cans of tennis balls. Each can has 3 tennis balls. How many tennis balls does he have now? Think Step-by-step</p>
            <p><span className="font-bold">A:</span> <Highlight>Roger started with 5 balls. 2 cans of 3 tennis balls each is 6 tennis balls. 5 + 6 = 11.</Highlight> The answer is 11.</p>
            <hr className="border-gray-600/50" />
            <p><span className="font-bold">Q:</span> The cafeteria had 23 apples. If they used 20 to make lunch and bought 6 more, how many apples do they have?</p>
        </Card>
        <Card title="Model Output" titleColor="bg-green-500/20 text-green-300">
            <div className="flex items-center">
                <p className="flex-grow"><span className="font-bold">A:</span> <HighlightGreen>The cafeteria had 23 apples originally. They used 20 to make lunch. So they had 23 - 20 = 3. They bought 6 more apples, so now they have 3 + 6 = 9.</HighlightGreen> The answer is 9.</p>
                <Check className="w-6 h-6 text-green-400 ml-2" />
            </div>
            <div className="text-xs text-green-400 mt-2">✅ Success: Correct reasoning and answer</div>
        </Card>
      </PromptingColumn>
    </div>
  );
};

export default CotDiagram;
