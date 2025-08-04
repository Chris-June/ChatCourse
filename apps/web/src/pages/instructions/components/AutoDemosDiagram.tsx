import React from 'react';
import { ArrowDown, GitCommitHorizontal } from 'lucide-react';

const Box = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-gray-800/60 border border-gray-700 rounded-xl p-3 text-sm text-gray-300 ${className}`}>
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
        <h3 className="text-center font-semibold text-lg text-blue-400 mb-4">Auto-CoT: AI Teaching Assistant</h3>
        <div className="text-xs text-gray-400 mb-4 text-center">Like having an AI teaching assistant that automatically creates diverse examples with step-by-step solutions</div>
        
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
            {/* Left Column: The Automation Process */}
            <div className="flex flex-col items-center space-y-3">
                <div className="text-xs text-gray-400 mb-2">Step 1: Collect diverse questions</div>
                <Box className="w-full">
                    <p>Q: While shopping for music online, Zoe bought 3 albums...</p>
                    <p className="text-center py-1">...</p>
                    <p>Q: A chef needs to cook 9 potatoes...</p>
                </Box>
                <ArrowDown className="w-6 h-6 text-gray-500" />
                <div className="text-xs text-gray-400 mb-1">Step 2: Group similar problems</div>
                <Box className="w-full text-center">Smart Clustering</Box>
                <ArrowDown className="w-6 h-6 text-gray-500" />
                <div className="text-xs text-gray-400 mb-1">Step 3: Generate step-by-step solutions</div>
                <LLMStep text="Auto Demo Construction" />
                <ArrowDown className="w-6 h-6 text-gray-500" />
                <div className="text-xs text-gray-400 mb-1">Step 4: Select best examples</div>
                <Box className="w-full">
                    <p>1. Q: Music shopping... A: <span className="text-pink-400">Let's think step by step...</span></p>
                    <p className="text-center py-1">...</p>
                    <p>k. Q: Cooking potatoes... A: <span className="text-pink-400">Let's think step by step...</span></p>
                    <p className="text-center text-xs text-gray-400 mt-2">Quality & Diversity Selection</p>
                </Box>
            </div>

            {/* Right Column: Live Examples */}
            <div className="flex flex-col space-y-4">
                <div className="text-xs text-gray-400 mb-2">Generated examples ready for use</div>
                <Box className="space-y-3 bg-gray-800/80">
                    <Example 
                        q="Music shopping: 3 country albums + 5 pop albums = ?"
                        a={<> <span className="text-pink-400">Let's break it down:</span> 3 albums × 3 songs each = 9 songs, 5 albums × 3 songs each = 15 songs, total = 24 songs</>}
                        color="border-green-500/70"
                    />
                     <Example 
                        q="Cooking time: 9 potatoes at 3 minutes each = ?"
                        a={<> <span className="text-pink-400">Step by step:</span> Already cooked 7 potatoes (21 minutes), 2 remaining potatoes need 6 more minutes, total = 27 minutes</>}
                        color="border-green-500/70"
                    />
                     <Example 
                        q="Pet store: 64 puppies, sold 28, 4 per cage = ?"
                        a={<> <span className="text-pink-400">Let's calculate:</span> 64 - 28 = 36 puppies left, 36 ÷ 4 = 9 cages needed</>}
                        color="border-green-500/70"
                    />
                </Box>
                
                <div className="flex flex-col items-center">
                    <p className="text-gray-400 text-xs border border-dashed border-gray-600 rounded-full px-2 py-0.5">Test Question</p>
                    <GitCommitHorizontal className="w-6 h-12 text-gray-500 -rotate-90" />
                    <LLMStep text="Apply Learned Reasoning" />
                    <ArrowDown className="w-6 h-6 text-gray-500" />
                    <Box className="w-full bg-gray-800">
                        <span className="text-green-400">✅</span> Using the step-by-step approach: 64 - 28 = 36, 36 ÷ 4 = 9 cages. The answer is 9.
                    </Box>
                </div>
            </div>
        </div>
    </div>
  );
};

export default AutoDemosDiagram;
