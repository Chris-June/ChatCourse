import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const DiagramBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 flex flex-col h-full">
    <h3 className="font-semibold text-lg text-center text-gray-300 mb-3">{title}</h3>
    <div className="text-sm text-gray-300 space-y-2 flex-grow">{children}</div>
  </div>
);

const Question = ({ text }: { text: string }) => (
  <p><span className="font-bold text-gray-400">Q:</span> {text}</p>
);

const Answer = ({ text, output, correct }: { text: string; output?: string; correct?: boolean }) => (
  <div>
    <p><span className="font-bold text-gray-400">A:</span> {text}</p>
    {output && (
      <div className="mt-2 bg-gray-900/70 p-3 rounded-md border border-gray-600/50">
        <p className="flex items-center">
          <span className="italic mr-2">(Output)</span>
          <span className="flex-1">{output}</span>
          {correct === true && <CheckCircle className="w-5 h-5 text-green-500 ml-2 flex-shrink-0" />}
          {correct === false && <XCircle className="w-5 h-5 text-red-500 ml-2 flex-shrink-0" />}
        </p>
      </div>
    )}
  </div>
);

const ZeroCotDiagram: React.FC = () => {
  return (
    <div className="my-6 grid md:grid-cols-2 gap-4 text-sm">
      {/* (a) Few-shot - Like showing flashcards */}
      <DiagramBox title="(a) Few-shot - Examples Only">
        <div className="text-xs text-gray-400 mb-2">Like showing someone 2-3 examples of a task</div>
        <Question text="Roger has 5 tennis balls. He buys 2 more cans of tennis balls. Each can has 3 tennis balls. How many tennis balls does he have now?" />
        <Answer text="The answer is 11." />
        <hr className="border-gray-600 my-3" />
        <Question text="A juggler can juggle 16 balls. Half of the balls are golf balls, and half of the golf balls are blue. How many blue golf balls are there?" />
        <Answer text="" output="The answer is 8." correct={false} />
        <div className="text-xs text-red-400 mt-2">❌ Failed - gave wrong answer (8 instead of 4)</div>
      </DiagramBox>

      {/* (b) Few-shot-CoT - Examples with reasoning */}
      <DiagramBox title="(b) Few-shot-CoT - Examples with Steps">
        <div className="text-xs text-gray-400 mb-2">Like showing examples AND explaining the thinking process</div>
        <Question text="Roger has 5 tennis balls. He buys 2 more cans of tennis balls. Each can has 3 tennis balls. How many tennis balls does he have now?" />
        <Answer text="Roger started with 5 balls. 2 cans of 3 tennis balls each is 6 tennis balls. 5 + 6 = 11. The answer is 11." />
        <hr className="border-gray-600 my-3" />
        <Question text="A juggler can juggle 16 balls. Half of the balls are golf balls, and half of the golf balls are blue. How many blue golf balls are there?" />
        <Answer text="" output="The juggler can juggle 16 balls. Half of the balls are golf balls. So there are 16 / 2 = 8 golf balls. Half of the golf balls are blue. So there are 8 / 2 = 4 blue golf balls. The answer is 4." correct={true} />
        <div className="text-xs text-green-400 mt-2">✅ Success - correct reasoning and answer</div>
      </DiagramBox>

      {/* (c) Zero-shot - Direct instruction */}
      <DiagramBox title="(c) Zero-shot - No Examples">
        <div className="text-xs text-gray-400 mb-2">Like giving instructions without demonstrations</div>
        <Question text="A juggler can juggle 16 balls. Half of the balls are golf balls, and half of the golf balls are blue. How many blue golf balls are there?" />
        <Answer text="The answer (arabic numerals) is" output="8" correct={false} />
        <div className="text-xs text-red-400 mt-2">❌ Failed - gave wrong answer without showing work</div>
      </DiagramBox>

      {/* (d) Zero-shot-CoT - Reasoning prompt */}
      <DiagramBox title="(d) Zero-shot-CoT - Think Step by Step">
        <div className="text-xs text-gray-400 mb-2">Like asking someone to "show their work"</div>
        <Question text="A juggler can juggle 16 balls. Half of the balls are golf balls, and half of the golf balls are blue. How many blue golf balls are there?" />
        <Answer text="Let's think step by step." output="There are 16 balls in total. Half of the balls are golf balls. That means that there are 8 golf balls. Half of the golf balls are blue. That means that there are 4 blue golf balls." correct={true} />
        <div className="text-xs text-green-400 mt-2">✅ Success - correct step-by-step reasoning</div>
      </DiagramBox>
    </div>
  );
};

export default ZeroCotDiagram;
