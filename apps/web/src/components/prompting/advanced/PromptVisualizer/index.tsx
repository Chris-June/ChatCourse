import React, { useState } from 'react';

import CopyButton from '../../../CopyButton';

interface PromptElement {
  id: string;
  type: 'role' | 'task' | 'context' | 'constraints' | 'format' | 'examples' | 'tone';
  label: string;
  description: string;
  value: string;
  weight: number;
  impact: {
    clarity: number;
    specificity: number;
    creativity: number;
    conciseness: number;
  };
}

/**
 * PromptVisualizer
 * 
 * An interactive tool that visualizes how different elements of a prompt
 * affect the AI's response quality in real-time.
 * 
 * @component
 * @example
 * return (
 *   <PromptVisualizer />
 * )
 */
const PromptVisualizer: React.FC = () => {
  const [promptElements, setPromptElements] = useState<PromptElement[]>([
    {
      id: 'role',
      type: 'role',
      label: 'Role',
      description: 'The persona or expertise the AI should adopt',
      value: 'helpful assistant',
      weight: 0.3,
      impact: { clarity: 8, specificity: 7, creativity: 3, conciseness: 2 }
    },
    {
      id: 'task',
      type: 'task',
      label: 'Task',
      description: 'The main action you want the AI to perform',
      value: 'explain a concept',
      weight: 0.4,
      impact: { clarity: 9, specificity: 8, creativity: 2, conciseness: 5 }
    },
    {
      id: 'context',
      type: 'context',
      label: 'Context',
      description: 'Background information or constraints',
      value: 'to a beginner',
      weight: 0.2,
      impact: { clarity: 6, specificity: 7, creativity: 5, conciseness: 3 }
    },
    {
      id: 'format',
      type: 'format',
      label: 'Format',
      description: 'How the response should be structured',
      value: 'step-by-step explanation',
      weight: 0.15,
      impact: { clarity: 7, specificity: 6, creativity: 4, conciseness: 7 }
    },
    {
      id: 'tone',
      type: 'tone',
      label: 'Tone',
      description: 'The style or voice of the response',
      value: 'friendly and professional',
      weight: 0.1,
      impact: { clarity: 5, specificity: 4, creativity: 6, conciseness: 3 }
    }
  ]);

  const [activeElement, setActiveElement] = useState<string | null>(null);
  const [metrics, setMetrics] = useState({
    clarity: 0,
    specificity: 0,
    creativity: 0,
    conciseness: 0
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const response = await fetch('/api/chat/visualize-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ elements: promptElements, apiKey: localStorage.getItem('openai_api_key') }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      setMetrics(data.metrics);
      setGeneratedPrompt(data.prompt);

    } catch (error) {
      console.error('Failed to visualize prompt:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleElementChange = (id: string, value: string) => {
    setPromptElements(prev =>
      prev.map(el => (el.id === id ? { ...el, value } : el))
    );
  };

  const getMetricColor = (value: number) => {
    if (value >= 8) return 'text-green-400';
    if (value >= 5) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getMetricLabel = (value: number) => {
    if (value >= 8) return 'Excellent';
    if (value >= 5) return 'Good';
    if (value >= 3) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="bg-gray-900 text-white p-6 sm:p-8 rounded-2xl border border-gray-700/50 shadow-2xl shadow-blue-500/10">
      <header className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
          Interactive Prompt Visualizer
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
          Adjust the components of your prompt and see how they impact key quality metrics in real-time.
        </p>
      </header>

      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/2 px-4">
          <form onSubmit={handleSubmit}>
            <h3 className="text-lg font-semibold mb-3">Prompt Components</h3>
            <div className="space-y-4">
              {promptElements.map(element => (
                <div key={element.id} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                  <label htmlFor={element.id} className="block text-sm font-medium text-gray-300 mb-1.5">
                    {element.label}
                  </label>
                  <input
                    type="text"
                    id={element.id}
                    value={element.value}
                    onChange={(e) => handleElementChange(element.id, e.target.value)}
                    onFocus={() => setActiveElement(element.id)}
                    onBlur={() => setActiveElement(null)}
                    placeholder={element.description}
                    className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                  
                  {activeElement === element.id && (
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <h4 className="text-xs font-medium text-gray-400 mb-2">Impact on:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {Object.entries(element.impact).map(([key, value]) => (
                          <div key={key} className="flex items-center">
                            <div className="w-20 text-xs text-gray-400 capitalize">{key}</div>
                            <div className="flex-1 bg-gray-700 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${value * 10}%` }}></div>
                            </div>
                            <div className="w-8 text-right text-xs text-gray-400">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  'Generate Prompt'
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="w-full lg:w-1/2 px-4 mt-8 lg:mt-0">
          <div className="space-y-6 sticky top-8">
            <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Quality Metrics</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {Object.entries(metrics).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm text-gray-300 capitalize">{key}</span>
                      <span className={`text-lg font-bold ${getMetricColor(value)}`}>{value.toFixed(1)}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
                      <div className={`${getMetricColor(value).replace('text', 'bg')} h-2.5 rounded-full`} style={{ width: `${value * 10}%` }}></div>
                    </div>
                    <div className={`text-xs text-right mt-1 ${getMetricColor(value)}`}>{getMetricLabel(value)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">Generated Prompt</h3>
              <div className="relative">
                <div className={`min-h-[120px] p-4 bg-gray-900/50 rounded-lg border border-gray-700 overflow-auto transition-opacity ${isGenerating ? 'opacity-50' : ''}`}>
                  {isGenerating && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  )}
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap">{generatedPrompt || 'Click "Generate Prompt" to see the result...'}</pre>
                </div>
                {!isGenerating && generatedPrompt && <CopyButton textToCopy={generatedPrompt} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptVisualizer;