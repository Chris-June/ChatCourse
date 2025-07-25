import React, { useState, useCallback } from 'react';
import InlineChat from '../../../components/InlineChat';
import { RotateCcw } from 'lucide-react';

const DEFAULT_SYSTEM_PROMPT = 'You are a helpful assistant. Be concise and clear.';

const SystemPromptLab: React.FC = () => {
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);
  const [chatKey, setChatKey] = useState(Date.now());

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSystemPrompt(e.target.value);
  };

  const resetAndReloadChat = useCallback(() => {
    setSystemPrompt(DEFAULT_SYSTEM_PROMPT);
    setChatKey(Date.now());
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Side: Prompt Editor */}
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-white">System Prompt Editor</h3>
            <button 
              onClick={resetAndReloadChat}
              className="flex items-center text-xs text-gray-400 hover:text-blue-300 transition-colors"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </button>
          </div>
          <textarea
            value={systemPrompt}
            onChange={handlePromptChange}
            className="w-full h-48 md:h-full bg-gray-900 text-gray-200 p-3 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your system prompt here..."
          />
        </div>

        {/* Right Side: Chat Interface */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-2">Chat Window</h3>
          <div className="h-full w-full">
            <InlineChat
              key={chatKey} // Force re-mount when prompt changes
              systemPrompt={systemPrompt}
              moduleId={`system-prompt-lab-${chatKey}`}
              maxAttempts={10}
              placeholder="Test your prompt here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemPromptLab;
