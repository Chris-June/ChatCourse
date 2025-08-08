import React from 'react';
import { Book, Scissors, ClipboardList, ArrowRight, Search, Brain } from 'lucide-react';

const RagChunkingDiagram: React.FC = () => {
  return (
    <div className="bg-card p-6 rounded-lg border border-dashed">
      <h3 className="text-lg font-semibold text-foreground mb-2 text-center">Building Your AI's Library: The Art of RAG Chunking</h3>
      <p className="text-xs text-muted-foreground text-center mb-6">Think of it like a master librarian organizing a vast, chaotic library into a perfect card catalog.</p>

      {/* Main Process Flow */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center mb-6">
        
        {/* Step 1: Original Document */}
        <div className="text-center col-span-2">
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 h-full">
            <Book className="w-8 h-8 text-red-400 mx-auto mb-2" aria-hidden="true" />
            <h4 className="font-semibold text-red-300 mb-1">The Unwieldy Tome</h4>
            <p className="text-xs text-muted-foreground">A massive, single document (e.g., a 200-page PDF).</p>
            <div className="mt-2 bg-red-800/50 rounded p-2 border border-red-700/60">
              <p className="text-xs text-red-200">Impossible to search quickly or find specific details.</p>
            </div>
          </div>
        </div>

        {/* Arrow 1 */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <p className="text-xs text-blue-300 mb-1 font-semibold">The Librarian</p>
            <Scissors className="w-6 h-6 text-blue-400 mb-1" aria-hidden="true" />
            <ArrowRight className="w-6 h-6 text-muted-foreground" aria-hidden="true" />
          </div>
        </div>

        {/* Step 2: Chunked Documents */}
        <div className="text-center col-span-2">
          <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 h-full">
            <ClipboardList className="w-8 h-8 text-green-400 mx-auto mb-2" aria-hidden="true" />
            <h4 className="font-semibold text-green-300 mb-1">The Card Catalog</h4>
            <p className="text-xs text-muted-foreground">The tome is broken down into small, context-rich index cards.</p>
            <div className="mt-2 bg-green-800/50 rounded p-2 border border-green-700/60">
              <p className="text-xs text-green-200">Each card is perfectly organized, labeled, and easy to find.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
          <h4 className="font-semibold text-red-300 mb-2 flex items-center">
            <Search className="w-4 h-4 mr-2" aria-hidden="true" />
            Searching the Tome
          </h4>
          <ul className="text-xs text-red-200 space-y-1 list-disc pl-4">
            <li>Slow, frustrating manual search</li>
            <li>Returns entire, irrelevant chapters</li>
            <li>Loses the context of the query</li>
            <li>High mental (and computational) load</li>
          </ul>
        </div>

        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
          <h4 className="font-semibold text-green-300 mb-2 flex items-center">
            <Brain className="w-4 h-4 mr-2" aria-hidden="true" />
            Using the Card Catalog
          </h4>
          <ul className="text-xs text-green-200 space-y-1 list-disc pl-4">
            <li>Instant, targeted retrieval</li>
            <li>Pulls the exact, most relevant 'card'</li>
            <li>Preserves precise context</li>
            <li>Efficient and highly accurate</li>
          </ul>
        </div>
      </div>

      {/* Technical Details */}
      <div className="mt-4 text-center">
        <div className="bg-muted rounded-lg p-3">
          <p className="text-xs text-muted-foreground">
            <strong>Key Insight:</strong> A better card catalog (smaller, smarter chunks) allows your AI to find the perfect reference instantly, leading to smarter, more accurate answers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RagChunkingDiagram;
