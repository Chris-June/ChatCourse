import React from 'react';
import { ArrowDown, GitCommitHorizontal } from 'lucide-react';

const Box = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-gray-800/60 border border-gray-700 rounded-lg p-3 text-sm text-gray-300 ${className}`}>
    {children}
  </div>
);

const LLMStep = ({ text }: { text: string }) => (
    <div className="flex items-center justify-center space-x-3">
        <Box className="bg-blue-500/20 text-blue-300 px-4 py-2">LLM</Box>
        <p className="text-gray-400 font-semibold">{text}</p>
    </div>
);

const Example = ({ q, a, color } : { q: string, a: React.ReactNode, color: string}) => (
    <div className={`p-2 border-l-4 ${color}`}>
        <p><span className="font-bold">Q:</span> {q}</p>
        <div className="mt-1"><span className="font-bold">A:</span> {a}</div>
    </div>
)

const AutoDemosDiagram: React.FC = () => {
  return (
    <div className="my-6 p-4 bg-gray-900/70 border border-gray-700 rounded-xl text-sm">
        <h3 className="text-center font-semibold text-lg text-blue-400 mb-4">Auto Demos One by One</h3>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            {/* Left Column: Main Flow */}
            <div className="flex flex-col items-center space-y-3">
                <Box className="w-full">
                    <p>Q: While shopping for music online, Zoe bought 3 ...</p>
                    <p className="text-center py-1">...</p>
                    <p>Q: A chef needs to cook 9 potatoes. He has already...</p>
                </Box>
                <ArrowDown className="w-6 h-6 text-gray-500" />
                <Box className="w-full text-center">Clustering</Box>
                <ArrowDown className="w-6 h-6 text-gray-500" />
                <LLMStep text="Demo Construction" />
                <ArrowDown className="w-6 h-6 text-gray-500" />
                 <Box className="w-full">
                    <p>1. Q: While shopping for music online ... A: <span className="text-pink-400">Let's ...</span></p>
                    <p className="text-center py-1">...</p>
                    <p>k. Q: A chef needs to cook 9 potatoes ... A: <span className="text-pink-400">Let's ...</span></p>
                    <p className="text-center text-xs text-gray-400 mt-1">Sampling by Selection Criteria</p>
                </Box>
            </div>

            {/* Right Column: Examples & Reasoning */}
            <div className="flex flex-col space-y-4">
                <Box className="space-y-3 bg-gray-800/80">
                    <Example 
                        q="While shopping for music online, Zoe bought 3 country albums and 5 pop albums. Each album came with a lyric sheet and had 3 songs. How many songs did Zoe buy total?"
                        a={<> <span className="text-pink-400">Let's think step by step.</span> Zoe bought 3 country albums. Each album has 3 songs. So she bought 3*3=9 songs from the country albums. Zoe bought 5 pop albums. Each album has 3 songs. So she bought 5*3=15 songs from the pop albums. Zoe bought 9+15=24 songs in total. The answer is 24.</>}
                        color="border-green-500/70"
                    />
                     <Example 
                        q="A chef needs to cook 9 potatoes. If each potato takes 3 minutes to cook, how long will it take him to cook the rest?"
                        a={<> <span className="text-pink-400">Let's think step by step.</span> The chef has already cooked 7 potatoes. That means it has taken him 7 * 3 minutes to cook those 7 potatoes. That means it will take him 3 more minutes to cook each of the remaining 2 potatoes ...</>}
                        color="border-green-500/70"
                    />
                     <Example 
                        q="A pet store had 64 puppies. In one day they sold 28 of them and put the rest into cages with 4 in each cage. How many cages did they use?"
                        a={<> <span className="text-pink-400">Let's think step by step.</span></>}
                        color="border-dashed border-red-500/70"
                    />
                </Box>
                
                <div className="flex flex-col items-center">
                    <p className="text-gray-400 text-xs border border-dashed border-gray-600 rounded-full px-2 py-0.5">Test Question</p>
                    <GitCommitHorizontal className="w-6 h-12 text-gray-500 -rotate-90" />
                    <LLMStep text="In-Context Reasoning" />
                    <ArrowDown className="w-6 h-6 text-gray-500" />
                    <Box className="w-full bg-gray-800">
                        The pet store had 64 puppies. They sold 28 of them. That means they have 36 puppies left. They put the rest into cages with 4 in each cage. That means they have 9 cages. The answer is 9.
                    </Box>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AutoDemosDiagram;
