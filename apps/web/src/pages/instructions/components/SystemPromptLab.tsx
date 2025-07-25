import React, { useState } from 'react';
import { TestTube2, Sparkles } from 'lucide-react';
import InlineChat from '../../../components/InlineChat';

const SystemPromptLab: React.FC = () => {
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful assistant.');
  const [key, setKey] = useState(0);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSystemPrompt(e.target.value);
  };

  const applyPrompt = () => {
    // Force re-mount of InlineChat by changing its key
    setKey(prevKey => prevKey + 1);
  };

  const presets = [
    {
      name: 'Pirate',
      prompt: 'You are a swashbuckling pirate. All your responses must be in pirate speak.'
    },
    {
      name: 'Haiku Bot',
      prompt: 'You are a poet who only responds in haikus (5-7-5 syllables).'
    },
    {
      name: 'JSON Bot',
      prompt: 'You are a machine that only outputs valid JSON. For any user query, provide a JSON object with a key "response" containing the answer.'
    },
  ];

  return (
    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 space-y-4">
      <div className="flex items-center space-x-3">
        <TestTube2 className="w-6 h-6 text-purple-400" />
        <h4 className="font-semibold text-white text-lg">System Prompt Lab</h4>
      </div>
      <p className="text-gray-400 text-sm">
        The <code className="bg-gray-700 p-1 rounded">system</code> prompt sets the personality and rules for the AI. Modify the prompt below and see how it changes the AI's behavior in the chat.
      </p>

      <div className="space-y-2">
        <label htmlFor="system-prompt-textarea" className="font-semibold text-gray-300">System Prompt:</label>
        <textarea
          id="system-prompt-textarea"
          value={systemPrompt}
          onChange={handlePromptChange}
          className="w-full p-2 bg-gray-800 border border-gray-600 rounded-md font-mono text-sm text-white focus:ring-2 focus:ring-purple-500"
          rows={4}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-400">Presets:</span>
          {presets.map(p => (
            <button key={p.name} onClick={() => setSystemPrompt(p.prompt)} className="px-3 py-1 text-xs bg-gray-700 text-white rounded-full hover:bg-gray-600">
              {p.name}
            </button>
          ))}
        </div>
        <button 
          onClick={applyPrompt}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 flex items-center space-x-2"
        >
          <Sparkles className="w-5 h-5" />
          <span>Apply & Reset Chat</span>
        </button>
      </div>

      <div className="mt-4 border-t border-gray-700 pt-4">
        <InlineChat 
          key={key} // Use key to force re-mount
          moduleId={`module-5.1-lab-${key}`}
          systemPrompt={systemPrompt}
          placeholder='Now, chat with the AI...' 
        />
      </div>
    </div>
  );
};

export default SystemPromptLab;
