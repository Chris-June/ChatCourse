import React, { useState } from 'react';
import { TestTube2, Sparkles } from 'lucide-react';
import InlineChat from '../../../components/InlineChat';
import InteractiveHeader from '@/components/InteractiveHeader';

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
    <div className="bg-card p-6 rounded-lg border space-y-4">
      <InteractiveHeader title="Interactive System Prompt Lab" subtitle="Modify system prompts and see changes live" icon={TestTube2} />
      <div className="flex items-center space-x-3">
        <TestTube2 className="w-6 h-6 text-primary" aria-hidden="true" />
        <h4 className="font-semibold text-foreground text-lg">System Prompt Lab</h4>
      </div>
      <p className="text-muted-foreground text-sm">
        The <code className="bg-muted p-1 rounded border">system</code> prompt sets the personality and rules for the AI. Modify the prompt below and see how it changes the AI's behavior in the chat.
      </p>

      <div className="space-y-2">
        <label htmlFor="system-prompt-textarea" className="font-semibold text-foreground">System Prompt:</label>
        <textarea
          id="system-prompt-textarea"
          value={systemPrompt}
          onChange={handlePromptChange}
          className="w-full p-2 bg-background border rounded-md font-mono text-sm text-foreground focus:ring-2 focus:ring-primary"
          rows={4}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-muted-foreground">Presets:</span>
          {presets.map(p => (
            <button key={p.name} onClick={() => setSystemPrompt(p.prompt)} className="px-3 py-1 text-xs bg-muted text-foreground rounded-full hover:opacity-90 border">
              {p.name}
            </button>
          ))}
        </div>
        <button 
          onClick={applyPrompt}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 flex items-center space-x-2"
        >
          <Sparkles className="w-5 h-5" aria-hidden="true" />
          <span>Apply & Reset Chat</span>
        </button>
      </div>

      <div className="mt-4 border-t pt-4">
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
