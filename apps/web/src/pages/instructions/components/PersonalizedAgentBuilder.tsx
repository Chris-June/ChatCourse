import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Slider } from '../../../components/ui/slider';
import { Textarea } from '../../../components/ui/textarea';
import InteractiveHeader from '@/components/InteractiveHeader';

const PersonalizedAgentBuilder = () => {
  const [name, setName] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful assistant.');
  const [temperature, setTemperature] = useState([0.8]);
  const [topP, setTopP] = useState([1]);
  const [frequencyPenalty, setFrequencyPenalty] = useState([0]);

  const handleSave = () => {
    const agentConfig = {
      name,
      systemPrompt,
      temperature: temperature[0],
      topP: topP[0],
      frequencyPenalty: frequencyPenalty[0],
    };
    console.log('Saving Agent:', agentConfig);
    // In a real app, this would save to Zustand/backend and trigger a preview.
    alert('Agent configuration saved! Check the console for the agent object.');
  };

  return (
    <Card className="mt-8">
      <InteractiveHeader title="Personalized Agent Builder" icon={Wand2} />
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-muted rounded-lg">
            <Wand2 className="w-8 h-8 text-primary" aria-hidden="true" />
          </div>
          <div>
            <CardTitle className="text-2xl">Build Your Own Personalized Agent</CardTitle>
            <CardDescription>
              Mini-Challenge: Create a custom AI persona by defining its core instructions and tuning its behavior.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="agent-name">Agent Name</Label>
            <Input 
              id="agent-name" 
              placeholder="e.g., 'Socratic Tutor' or 'Marketing Whiz'"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="system-prompt">System Prompt</Label>
          <Textarea
            id="system-prompt"
            placeholder="Define the AI's role, personality, and instructions..."
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="min-h-[120px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="space-y-3">
            <Label>Temperature: <span className="font-mono">{temperature[0].toFixed(2)}</span></Label>
            <Slider 
              min={0} 
              max={2} 
              step={0.1} 
              value={temperature} 
              onValueChange={setTemperature}
              aria-label="Temperature"
            />
            <p className="text-xs text-muted-foreground">Controls randomness. Higher is more creative.</p>
          </div>
          <div className="space-y-3">
            <Label>Top P: <span className="font-mono">{topP[0].toFixed(2)}</span></Label>
            <Slider 
              min={0} 
              max={1} 
              step={0.05} 
              value={topP} 
              onValueChange={setTopP}
              aria-label="Top P"
            />
            <p className="text-xs text-muted-foreground">Controls nucleus sampling. Filters token diversity.</p>
          </div>
          <div className="space-y-3">
            <Label>Frequency Penalty: <span className="font-mono">{frequencyPenalty[0].toFixed(2)}</span></Label>
            <Slider 
              min={-2} 
              max={2} 
              step={0.1} 
              value={frequencyPenalty} 
              onValueChange={setFrequencyPenalty}
              aria-label="Frequency Penalty"
            />
            <p className="text-xs text-muted-foreground">Reduces repetition of the same tokens.</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="w-full md:w-auto" aria-label="Save agent configuration">
          Save Agent
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PersonalizedAgentBuilder;
