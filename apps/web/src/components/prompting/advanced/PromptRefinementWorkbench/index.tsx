import React, { useState } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import CopyButton from '../../../CopyButton';
import { api } from '@/lib/api';

interface PromptVersion {
  id: number;
  prompt: string;
  feedback: {
    clarity: number;
    specificity: number;
    improvements: string[];
  };
  timestamp: Date;
}

/**
 * PromptRefinementWorkbench
 * 
 * A component that helps users iteratively refine their prompts with AI-powered feedback.
 * Provides version history and visual feedback on prompt quality.
 * 
 * @component
 * @example
 * return (
 *   <PromptRefinementWorkbench />
 * )
 */
const PromptRefinementWorkbench: React.FC = () => {
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [versions, setVersions] = useState<PromptVersion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!currentPrompt.trim()) return;

    setIsAnalyzing(true);

    try {
      const result = await api.post('/api/chat/refine-prompt', { 
        prompt: currentPrompt,
        apiKey: localStorage.getItem('openai_api_key'),
      });

      if (!result.ok) {
        // Handle error appropriately in a real app
        console.error('API call failed');
        return;
      }

      const feedback = await result.json();

      const newVersion: PromptVersion = {
        prompt: currentPrompt,
        feedback,
        id: versions.length + 1,
        timestamp: new Date(),
      };

      setVersions([newVersion, ...versions]);
    } catch (error) {
      console.error('Failed to analyze prompt:', error);
      // Optionally, show an error message to the user
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="prompt-input" className="block text-sm font-medium text-gray-300 mb-1">
              Your Prompt
            </label>
            <div className="relative">
              <textarea
                id="prompt-input"
                className="w-full h-48 p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={currentPrompt}
                onChange={(e) => setCurrentPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                disabled={isAnalyzing}
              />
              <div className="absolute bottom-2 right-2 flex space-x-2">
                <CopyButton textToCopy={currentPrompt} />
              </div>
            </div>
          </div>
          
          <button
            onClick={handleAnalyze}
            disabled={!currentPrompt.trim() || isAnalyzing}
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              'Analyze & Refine'
            )}
          </button>
        </div>

        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-4">Feedback & Suggestions</h3>
          
          {versions.length > 0 ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/50 p-3 rounded">
                  <div className="text-sm text-gray-400 mb-1">Clarity</div>
                  <div className="text-2xl font-bold text-blue-400">
                    {versions[0].feedback.clarity}/5
                  </div>
                </div>
                <div className="bg-gray-900/50 p-3 rounded">
                  <div className="text-sm text-gray-400 mb-1">Specificity</div>
                  <div className="text-2xl font-bold text-purple-400">
                    {versions[0].feedback.specificity}/5
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-white text-sm mb-2">Suggested Improvements</h4>
                <ul className="space-y-2">
                  {versions[0].feedback.improvements.map((improvement, idx) => (
                    <li key={idx} className="flex items-start">
                      <AlertCircle className="w-4 h-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-sm h-full flex items-center justify-center py-8">
              Submit a prompt to see analysis and suggestions
            </div>
          )}
        </div>
      </div>

      {versions.length > 0 && (
        <div className="mt-8">
          <h3 className="font-semibold text-white mb-3">Version History</h3>
          <div className="space-y-3">
            {versions.map((version) => (
              <div 
                key={version.id} 
                className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors cursor-pointer"
                onClick={() => setCurrentPrompt(version.prompt)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-white">
                      Version {version.id}
                      {version.id === 1 && ' (Latest)'}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {version.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <CopyButton textToCopy={version.prompt} />
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-400 line-clamp-2">
                  {version.prompt}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptRefinementWorkbench;
