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
    // Personalization
    profileName,
    setProfileName,
    roleTitle,
    setRoleTitle,
    industry,
    setIndustry,
    region,
    setRegion,
    units,
    setUnits,
    tone,
    setTone,
    expertise,
    setExpertise,
    audience,
    setAudience,
    temperature,
    setTemperature,
    top_p,
    setTopP,
    reasoningEffort,
    setReasoningEffort,
    verbosity,
    setVerbosity,
    toolMode,
    setToolMode,
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
        className="bg-card border-border text-card-foreground w-[95vw] sm:max-w-[720px] max-h-[85vh] overflow-hidden"
        aria-describedby="settings-description"
      >
        <DialogDescription id="settings-description" className="sr-only">
          Application settings dialog. Use tab to navigate between form controls.
        </DialogDescription>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[65vh] px-2">
        <div className="py-4 space-y-4">
          {/* Personalization */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">Personalization</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="profileName" className="text-sm font-medium text-muted-foreground">Your name</Label>
                <Input id="profileName" value={profileName} onChange={(e) => setProfileName(e.target.value)} className="bg-input border-input h-9 w-full md:w-[320px]" placeholder="Jane Doe" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="roleTitle" className="text-sm font-medium text-muted-foreground">Role / Title</Label>
                <Input id="roleTitle" value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} className="bg-input border-input h-9 w-full md:w-[320px]" placeholder="Founder, Product Manager" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="industry" className="text-sm font-medium text-muted-foreground">Industry</Label>
                <Input id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} className="bg-input border-input h-9 w-full md:w-[320px]" placeholder="SaaS, Retail, Healthcare" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="region" className="text-sm font-medium text-muted-foreground">Region / Locale</Label>
                <Input id="region" value={region} onChange={(e) => setRegion(e.target.value)} className="bg-input border-input h-9 w-full md:w-[320px]" placeholder="US, CA, EU; en-US" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-muted-foreground">Units</Label>
                <Select value={units} onValueChange={(v) => setUnits(v as any)}>
                  <SelectTrigger className="bg-input border-input h-9 w-full md:w-[320px]"><SelectValue placeholder="Units" /></SelectTrigger>
                  <SelectContent className="bg-card border-border text-card-foreground">
                    <SelectItem value="metric">Metric</SelectItem>
                    <SelectItem value="imperial">Imperial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-muted-foreground">Tone</Label>
                <Select value={tone} onValueChange={(v) => setTone(v as any)}>
                  <SelectTrigger className="bg-input border-input h-9 w-full md:w-[320px]"><SelectValue placeholder="Tone" /></SelectTrigger>
                  <SelectContent className="bg-card border-border text-card-foreground">
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="concise">Concise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-muted-foreground">Expertise</Label>
                <Select value={expertise} onValueChange={(v) => setExpertise(v as any)}>
                  <SelectTrigger className="bg-input border-input h-9 w-full md:w-[320px]"><SelectValue placeholder="Expertise" /></SelectTrigger>
                  <SelectContent className="bg-card border-border text-card-foreground">
                    <SelectItem value="novice">Novice</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="audience" className="text-sm font-medium text-muted-foreground">Target audience</Label>
              <Input id="audience" value={audience} onChange={(e) => setAudience(e.target.value)} className="bg-input border-input h-9 w-full md:w-[660px]" placeholder="e.g., investors, technical team, customers" />
              <p className="text-xs text-muted-foreground">Used to tailor explanations and terminology.</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="model-select" className="text-sm font-medium text-muted-foreground">
              Model
            </label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger id="model-select" className="w-[320px] bg-input border-input">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border text-card-foreground max-h-[400px]">
                {modelFamilies.map((family) => (
                  <SelectGroup key={family}>
                    <SelectLabel className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">{family}</SelectLabel>
                    {models
                      .filter((m) => m.family === family)
                      .map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          <div className="flex items-center justify-between w-full">
                            <span className="whitespace-nowrap">{m.name}</span>
                            <span className="text-xs text-muted-foreground ml-4 whitespace-nowrap">
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
            <Label htmlFor="custom-instructions" className="text-sm font-medium text-muted-foreground">
              Custom Instructions
            </Label>
            <Textarea
              id="custom-instructions"
              placeholder="Enter custom instructions to guide the AI's behavior..."
              value={customInstructions}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCustomInstructions(e.target.value)}
              className="bg-input border-input focus:ring-ring"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="temperature-slider" className="text-sm font-medium text-muted-foreground">
                Temperature
              </Label>
              <span className="text-sm text-muted-foreground">{temperature.toFixed(1)}</span>
            </div>
            <Slider
              id="temperature-slider"
              min={0}
              max={2}
              step={0.1}
              value={[temperature]}
              onValueChange={(value) => setTemperature(value[0])}
            />
            <p className="text-xs text-muted-foreground">
              Lower values for temperature result in more consistent outputs, while higher values generate more diverse and creative results. Stick to a range of 0 to 1 for most use cases.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="top_p-slider" className="text-sm font-medium text-muted-foreground">
                Top P
              </Label>
              <span className="text-sm text-muted-foreground">{top_p.toFixed(1)}</span>
            </div>
            <Slider
              id="top_p-slider"
              min={0}
              max={1}
              step={0.1}
              value={[top_p]}
              onValueChange={(value) => setTopP(value[0])}
            />
            <p className="text-xs text-muted-foreground">
              Top P is an alternative to temperature that selects from the highest probability tokens. A lower value narrows the selection to more likely tokens.
            </p>
          </div>

          {/* GPT-5 Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Reasoning Effort</Label>
              <Select value={reasoningEffort} onValueChange={(v) => setReasoningEffort(v as any)}>
                <SelectTrigger className="bg-input border-input">
                  <SelectValue placeholder="Select effort" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border text-card-foreground">
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Trade-off depth of chain-of-thought style reasoning vs speed/cost.</p>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Verbosity</Label>
              <Select value={verbosity} onValueChange={(v) => setVerbosity(v as any)}>
                <SelectTrigger className="bg-input border-input">
                  <SelectValue placeholder="Select verbosity" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border text-card-foreground">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Controls length/detail of responses.</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">Tool Mode</Label>
            <Select value={toolMode} onValueChange={(v) => setToolMode(v as any)}>
              <SelectTrigger className="bg-input border-input w-full md:w-[320px]">
                <SelectValue placeholder="Tool usage" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border text-card-foreground">
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="required">Required</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Auto lets the model decide when to call tools; Required forces tool use before responding.</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="apiKey">OpenAI API Key</Label>
              <a 
                href="https://platform.openai.com/api-keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-primary hover:text-primary/90 underline"
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
              className="bg-input border-input text-foreground flex-1"
            />
            <p className="text-xs text-muted-foreground">
              Your API key is stored locally in your browser and never sent to our servers. For testing purposes, you will need to add a payment option to your OpenAI account. We find that most testers spend less than $10.00 in API Credits for this project.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-muted-foreground">
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
        </div>

        <div className="flex justify-end gap-2 pt-4 px-1">
          <Button 
            variant="outline"
            size="sm"
            onClick={() => setLocalApiKey('')}
            disabled={!localApiKey}
          >
            Clear
          </Button>
          <Button 
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="gap-2 px-3"
          >
            <Save className="h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
