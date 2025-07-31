/**
 * @file SettingsModal.tsx
 * @description A modal component for displaying and managing user settings.
 */

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  Label,
  Textarea,
  Slider,
  Input,
  Button,
} from '@chat/ui';
import { Sun, Moon, Save } from 'lucide-react';
import { useChatStore } from '../store/chat';
import { models, modelFamilies } from '@/lib/models';



const SettingsModal = () => {
  const { 
    isSettingsOpen, 
    toggleSettings, 
    model, 
    setModel, 
    customInstructions, 
    setCustomInstructions,
    temperature,
    setTemperature,
    top_p,
    setTopP,
    apiKey,
    setApiKey,
    theme,
    toggleTheme,
  } = useChatStore();
  
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [isSaving, setIsSaving] = useState(false);
  
  // Update local state when apiKey changes
  useEffect(() => {
    setLocalApiKey(apiKey);
  }, [apiKey]);
  
  const handleSave = () => {
    setIsSaving(true);
    // Update the API key in the store
    setApiKey(localApiKey);
    
    // Show success toast
    toast.success('Settings saved successfully!', {
      description: 'Your API key and preferences have been saved.',
      duration: 3000,
    });
    
    // Close the settings after a short delay
    setTimeout(() => {
      setIsSaving(false);
      toggleSettings();
    }, 1000);
  };

    return (
    <Dialog open={isSettingsOpen} onOpenChange={toggleSettings}>
      <DialogContent 
        className="bg-zinc-900 border-zinc-800 text-gray-100 max-w-2xl"
        aria-describedby="settings-description"
      >
        <DialogDescription id="settings-description" className="sr-only">
          Application settings dialog. Use tab to navigate between form controls.
        </DialogDescription>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="model-select" className="text-sm font-medium text-gray-300">
              Model
            </label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger id="model-select" className="w-[320px] bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700 text-gray-100 max-h-[400px]">
                {modelFamilies.map((family) => (
                  <SelectGroup key={family}>
                    <SelectLabel className="px-2 py-1.5 text-xs font-semibold text-gray-400">{family}</SelectLabel>
                    {models
                      .filter((m) => m.family === family)
                      .map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          <div className="flex items-center justify-between w-full">
                            <span className="whitespace-nowrap">{m.name}</span>
                            <span className="text-xs text-gray-400 ml-4 whitespace-nowrap">
                              {m.context} | In: ${m.inputCost.toFixed(2)} Out: ${m.outputCost.toFixed(2)}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="custom-instructions" className="text-sm font-medium text-gray-300">
              Custom Instructions
            </Label>
            <Textarea
              id="custom-instructions"
              placeholder="Enter custom instructions to guide the AI's behavior..."
              value={customInstructions}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCustomInstructions(e.target.value)}
              className="bg-zinc-800 border-zinc-700 focus:ring-zinc-600"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature-slider" className="text-sm font-medium text-gray-300">
                Temperature
              </Label>
              <span className="text-sm text-gray-400">{temperature.toFixed(1)}</span>
            </div>
            <Slider
              id="temperature-slider"
              min={0}
              max={2}
              step={0.1}
              value={[temperature]}
              onValueChange={(value) => setTemperature(value[0])}
            />
            <p className="text-xs text-gray-400">
              Lower values for temperature result in more consistent outputs, while higher values generate more diverse and creative results. Stick to a range of 0 to 1 for most use cases.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="top_p-slider" className="text-sm font-medium text-gray-300">
                Top P
              </Label>
              <span className="text-sm text-gray-400">{top_p.toFixed(1)}</span>
            </div>
            <Slider
              id="top_p-slider"
              min={0}
              max={1}
              step={0.1}
              value={[top_p]}
              onValueChange={(value) => setTopP(value[0])}
            />
            <p className="text-xs text-gray-400">
              Top P is an alternative to temperature that selects from the highest probability tokens. A lower value narrows the selection to more likely tokens.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="apiKey">OpenAI API Key</Label>
              <a 
                href="https://platform.openai.com/api-keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 underline"
              >
                Get your API key
              </a>
            </div>
            <Input
              id="apiKey"
              type="password"
              placeholder="sk-..."
              value={localApiKey || ''}
              onChange={(e) => setLocalApiKey(e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-white flex-1"
            />
            <p className="text-xs text-gray-400">
              Your API key is stored locally in your browser and never sent to our servers. For testing purposes, you will need to add a payment option to your OpenAI account. We find that most testers spend less than $10.00 in API Credits for this project.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-gray-300">
              Theme
            </Label>
            <Button variant="ghost" className="w-full justify-start" onClick={toggleTheme}>
            {theme === 'dark' ? (
              <Sun size={16} className="mr-2" />
            ) : (
              <Moon size={16} className="mr-2" />
            )}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </Button>
          </div>
        </div>


      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
