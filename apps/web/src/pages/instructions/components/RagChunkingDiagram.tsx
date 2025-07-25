import React from 'react';
import { FileText, Search, Layers, ArrowRight, FileCode, Brain } from 'lucide-react';

const RagChunkingDiagram: React.FC = () => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4 text-center">RAG Document Chunking Process</h3>
      
      {/* Main Process Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        
        {/* Step 1: Original Document */}
        <div className="text-center">
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
            <FileText className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <h4 className="font-semibold text-red-300 mb-1">Original Document</h4>
            <p className="text-xs text-gray-400">Large PDF</p>
            <p className="text-xs text-gray-400">200+ pages</p>
            <div className="mt-2 bg-red-800/50 rounded p-2">
              <p className="text-xs text-red-200">Hard to search</p>
              <p className="text-xs text-red-200">Slow retrieval</p>
            </div>
          </div>
        </div>

        {/* Arrow 1 */}
        <div className="flex justify-center">
          <ArrowRight className="w-6 h-6 text-gray-400" />
        </div>

        {/* Step 2: Chunking Process */}
        <div className="text-center">
          <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
            <Layers className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <h4 className="font-semibold text-blue-300 mb-1">Chunking Process</h4>
            <p className="text-xs text-gray-400">Intelligent splitting</p>
            <div className="mt-2 space-y-1">
              <div className="bg-blue-800/50 rounded p-1">
                <p className="text-xs text-blue-200">By topic</p>
              </div>
              <div className="bg-blue-800/50 rounded p-1">
                <p className="text-xs text-blue-200">By section</p>
              </div>
              <div className="bg-blue-800/50 rounded p-1">
                <p className="text-xs text-blue-200">By context</p>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow 2 */}
        <div className="flex justify-center">
          <ArrowRight className="w-6 h-6 text-gray-400" />
        </div>
      </div>

      {/* Chunked Documents Visualization */}
      <div className="mt-6">
        <h4 className="font-semibold text-white mb-3 text-center">Result: Optimized Chunks</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          
          {/* Chunk 1 */}
          <div className="bg-green-900/30 border border-green-700 rounded-lg p-3">
            <FileCode className="w-6 h-6 text-green-400 mx-auto mb-1" />
            <p className="text-xs text-green-300 font-semibold">Chunk 1</p>
            <p className="text-xs text-gray-400">Introduction</p>
            <p className="text-xs text-gray-500">2-3 pages</p>
          </div>

          {/* Chunk 2 */}
          <div className="bg-green-900/30 border border-green-700 rounded-lg p-3">
            <FileCode className="w-6 h-6 text-green-400 mx-auto mb-1" />
            <p className="text-xs text-green-300 font-semibold">Chunk 2</p>
            <p className="text-xs text-gray-400">Core Concepts</p>
            <p className="text-xs text-gray-500">3-4 pages</p>
          </div>

          {/* Chunk 3 */}
          <div className="bg-green-900/30 border border-green-700 rounded-lg p-3">
            <FileCode className="w-6 h-6 text-green-400 mx-auto mb-1" />
            <p className="text-xs text-green-300 font-semibold">Chunk 3</p>
            <p className="text-xs text-gray-400">Implementation</p>
            <p className="text-xs text-gray-500">4-5 pages</p>
          </div>

          {/* Chunk 4 */}
          <div className="bg-green-900/30 border border-green-700 rounded-lg p-3">
            <FileCode className="w-6 h-6 text-green-400 mx-auto mb-1" />
            <p className="text-xs text-green-300 font-semibold">Chunk 4</p>
            <p className="text-xs text-gray-400">Best Practices</p>
            <p className="text-xs text-gray-500">2-3 pages</p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
          <h4 className="font-semibold text-red-300 mb-2 flex items-center">
            <Search className="w-4 h-4 mr-2" />
            Before Chunking
          </h4>
          <ul className="text-xs text-red-200 space-y-1">
            <li>• Slow search across 200+ pages</li>
            <li>• Irrelevant results</li>
            <li>• High computational cost</li>
            <li>• Poor context understanding</li>
          </ul>
        </div>

        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
          <h4 className="font-semibold text-green-300 mb-2 flex items-center">
            <Brain className="w-4 h-4 mr-2" />
            After Chunking
          </h4>
          <ul className="text-xs text-green-200 space-y-1">
            <li>• Fast, targeted searches</li>
            <li>• Highly relevant results</li>
            <li>• Lower computational cost</li>
            <li>• Better context retention</li>
          </ul>
        </div>
      </div>

      {/* Technical Details */}
      <div className="mt-4 text-center">
        <div className="bg-gray-800 rounded-lg p-3">
          <p className="text-xs text-gray-400">
            <strong>Key Insight:</strong> Smaller chunks = better semantic search = more accurate RAG responses
          </p>
        </div>
      </div>
    </div>
  );
};

export default RagChunkingDiagram;
