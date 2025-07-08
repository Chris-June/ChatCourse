import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, SlidersHorizontal, Lightbulb, GitCompareArrows, BookCopy } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';

const Lesson7_3: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">7.3: Fine-Tuning Models</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-7/7.2" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-8"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Module <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Fine-tuning is the process of taking a pre-trained model and further training it on a smaller, domain-specific dataset. This adapts the model to specialize in a particular task, style, or knowledge domain.
      </p>

      {/* When to Fine-Tune */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center"><GitCompareArrows className="w-7 h-7 mr-3" />RAG vs. Fine-Tuning</h2>
        <p className="text-gray-300 mb-4">Choosing between RAG and fine-tuning is a critical architectural decision. Here’s a breakdown of their strengths:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg border border-green-500">
            <h4 className="font-bold text-lg text-green-300 text-center">Choose RAG for...</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400 mt-3">
              <li><strong>Factual Accuracy:</strong> Grounding responses in external, verifiable documents to reduce hallucinations.</li>
              <li><strong>Fresh Data:</strong> Answering questions about recent events or rapidly changing information.</li>
              <li><strong>Lower Cost:</strong> Avoiding expensive training runs; the main cost is in vector database hosting.</li>
            </ul>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-yellow-500">
            <h4 className="font-bold text-lg text-yellow-300 text-center">Choose Fine-Tuning for...</h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400 mt-3">
              <li><strong>Teaching Style/Format:</strong> Forcing a model to adopt a specific persona or output structure.</li>
              <li><strong>Embedding Niche Knowledge:</strong> When the knowledge is vast and hard to retrieve (e.g., a specific coding style).</li>
              <li><strong>Improving Reliability:</strong> Guiding the model's reasoning process on complex, multi-step tasks.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center"><BookCopy className="w-7 h-7 mr-3" />Preparing Data for Fine-Tuning</h2>
        <p className="text-gray-300 mb-4">High-quality data is the secret to successful fine-tuning. The standard format is a collection of prompt-completion pairs, typically in a JSONL file where each line is a JSON object.</p>
        <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm text-gray-300">
          <p>{`{"prompt": "User: What's the status of order #123?", "completion": "Assistant: Order #123 has shipped and is expected to arrive on Tuesday."}`}</p>
          <p>{`{"prompt": "User: How do I return an item?", "completion": "Assistant: You can start a return by visiting your order history and clicking 'Return Item'."}`}</p>
        </div>
        <p className="text-sm text-gray-400 mt-4">You typically need hundreds, if not thousands, of high-quality examples for the model to learn a new behavior effectively.</p>
      </section>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center"><SlidersHorizontal className="w-7 h-7 mr-3" />Modern Fine-Tuning: PEFT and LoRA</h2>
        <p className="text-gray-300">Full fine-tuning (retraining all of a model's weights) is incredibly expensive. <span className="font-semibold text-purple-300">Parameter-Efficient Fine-Tuning (PEFT)</span> methods solve this. The most popular technique, <span className="font-semibold text-purple-300">LoRA (Low-Rank Adaptation)</span>, freezes the original model weights and injects small, trainable 'adapter' layers. This reduces memory usage by over 90% and makes fine-tuning accessible on consumer hardware.</p>
      </section>

      {/* Conceptual Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Exercise: Format a Fine-Tuning Dataset
        </h2>
        <p className="text-gray-300 mb-4">
          Your task is to convert a raw conversation into the correct JSONL format for fine-tuning. This is a common and critical data preparation step.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Your Task:</h3>
          <p className="text-gray-400 mb-3 text-sm">Take the raw text below and structure it as a single JSON object with `prompt` and `completion` keys. Copy the target format to guide your work.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="text-white font-semibold">Raw Conversation:</h4>
              <div className="p-3 bg-gray-700 rounded-md text-xs text-gray-200 mt-2 whitespace-pre-wrap">
                User: Hey, can you help me write a SQL query? I need to get all users from the 'customers' table who signed up in the last 30 days.
                
                Assistant: Of course. You can use this query: SELECT * FROM customers WHERE signup_date = NOW() - INTERVAL '30 days';
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold">Target JSONL Format:</h4>
              <div className="relative p-3 bg-gray-700 rounded-md font-mono text-xs text-gray-200 mt-2 whitespace-pre-wrap">
                <CopyButton textToCopy={`{"prompt": "User: Hey, can you help me write a SQL query? I need to get all users from the 'customers' table who signed up in the last 30 days.", "completion": "Assistant: Of course. You can use this query: SELECT * FROM customers WHERE signup_date >= NOW() - INTERVAL '30 days';"}`}/>
                <p>{'{"prompt": "...", "completion": "..."}'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-7/7.2" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Building RAG Systems
        </Link>
        <Link 
          to="/instructions/module-8"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next Module: Responsible AI <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson7_3;
