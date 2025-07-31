import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import CopyButton from '../../../CopyButton';
import { api } from '@/lib/api';

interface INSYNCElement {
  score: number;
  feedback: string;
  example: string;
}

interface PromptVersion {
  id: number;
  prompt: string;
  feedback: {
    intent: INSYNCElement;
    nuance: INSYNCElement;
    style: INSYNCElement;
    youAs: INSYNCElement;
    narrativeFormat: INSYNCElement;
    context: INSYNCElement;
    totalScore: number;
    overallFeedback: string;
    improvedPrompt: string;
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

      if (!result) {
        console.error('API call failed: No response received');
        return;
      }

      const feedback = result;

      // Ensure the feedback has the expected INSYNC structure
      const formattedFeedback = {
        intent: feedback.intent || { score: 0, feedback: 'No evaluation available', example: '' },
        nuance: feedback.nuance || { score: 0, feedback: 'No evaluation available', example: '' },
        style: feedback.style || { score: 0, feedback: 'No evaluation available', example: '' },
        youAs: feedback.youAs || { score: 0, feedback: 'No evaluation available', example: '' },
        narrativeFormat: feedback.narrativeFormat || { score: 0, feedback: 'No evaluation available', example: '' },
        context: feedback.context || { score: 0, feedback: 'No evaluation available', example: '' },
        totalScore: feedback.totalScore || 0,
        overallFeedback: feedback.overallFeedback || 'No feedback available',
        improvedPrompt: feedback.improvedPrompt || ''
      };

      const newVersion: PromptVersion = {
        prompt: currentPrompt,
        feedback: formattedFeedback,
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
              <div className="absolute top-1 right-1 flex space-x-2">
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
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-900/50 p-3 rounded text-center">
                  <div className="text-sm text-gray-400 mb-1">Total Score</div>
                  <div className="text-2xl font-bold text-blue-400">
                    {versions[0].feedback.totalScore}/30
                  </div>
                </div>
                <div className="bg-gray-900/50 p-3 rounded text-center">
                  <div className="text-sm text-gray-400 mb-1">Grade</div>
                  <div className="text-2xl font-bold text-emerald-400">
                    {Math.round((versions[0].feedback.totalScore / 30) * 100)}%
                  </div>
                </div>
                <div className="bg-gray-900/50 p-3 rounded text-center">
                  <div className="text-sm text-gray-400 mb-1">Level</div>
                  <div className="text-2xl font-bold text-purple-400">
                    {versions[0].feedback.totalScore >= 25 ? 'Expert' : 
                     versions[0].feedback.totalScore >= 20 ? 'Advanced' : 
                     versions[0].feedback.totalScore >= 15 ? 'Intermediate' : 'Beginner'}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <h4 className="font-medium text-white text-sm mb-3">I.N.S.Y.N.C. Elements</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-blue-400">Intent</span>
                      <span className={`text-sm ${versions[0].feedback.intent.score >= 4 ? 'text-green-400' : versions[0].feedback.intent.score >= 3 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {versions[0].feedback.intent.score}/5
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-green-400">Nuance</span>
                      <span className={`text-sm ${versions[0].feedback.nuance.score >= 4 ? 'text-green-400' : versions[0].feedback.nuance.score >= 3 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {versions[0].feedback.nuance.score}/5
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-purple-400">Style</span>
                      <span className={`text-sm ${versions[0].feedback.style.score >= 4 ? 'text-green-400' : versions[0].feedback.style.score >= 3 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {versions[0].feedback.style.score}/5
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-orange-400">You as...</span>
                      <span className={`text-sm ${versions[0].feedback.youAs.score >= 4 ? 'text-green-400' : versions[0].feedback.youAs.score >= 3 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {versions[0].feedback.youAs.score}/5
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-pink-400">Narrative Format</span>
                      <span className={`text-sm ${versions[0].feedback.narrativeFormat.score >= 4 ? 'text-green-400' : versions[0].feedback.narrativeFormat.score >= 3 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {versions[0].feedback.narrativeFormat.score}/5
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-yellow-400">Context</span>
                      <span className={`text-sm ${versions[0].feedback.context.score >= 4 ? 'text-green-400' : versions[0].feedback.context.score >= 3 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {versions[0].feedback.context.score}/5
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 p-4 rounded-lg">
                  <h4 className="font-medium text-white text-sm mb-3">Detailed Feedback</h4>
                  <div className="space-y-3 text-sm text-gray-300">
                    <div className="border-l-2 border-gray-600 pl-3">
                      <div className="font-medium">Intent</div>
                      <div className="text-gray-400">{versions[0].feedback.intent.feedback}</div>
                    </div>
                    <div className="border-l-2 border-gray-600 pl-3">
                      <div className="font-medium">Nuance</div>
                      <div className="text-gray-400">{versions[0].feedback.nuance.feedback}</div>
                    </div>
                    <div className="border-l-2 border-gray-600 pl-3">
                      <div className="font-medium">Style</div>
                      <div className="text-gray-400">{versions[0].feedback.style.feedback}</div>
                    </div>
                    <div className="border-l-2 border-gray-600 pl-3">
                      <div className="font-medium">You as...</div>
                      <div className="text-gray-400">{versions[0].feedback.youAs.feedback}</div>
                    </div>
                    <div className="border-l-2 border-gray-600 pl-3">
                      <div className="font-medium">Narrative Format</div>
                      <div className="text-gray-400">{versions[0].feedback.narrativeFormat.feedback}</div>
                    </div>
                    <div className="border-l-2 border-gray-600 pl-3">
                      <div className="font-medium">Context</div>
                      <div className="text-gray-400">{versions[0].feedback.context.feedback}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-white text-sm mb-2">Improved Prompt</h4>
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-600">
                  <div className="text-sm text-gray-300 whitespace-pre-wrap">
                    {versions[0].feedback.improvedPrompt}
                  </div>
                  <div className="mt-2">
                    <CopyButton textToCopy={versions[0].feedback.improvedPrompt} />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-white text-sm mb-2">Overall Feedback</h4>
                <div className="text-sm text-gray-300">
                  {versions[0].feedback.overallFeedback}
                </div>
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
