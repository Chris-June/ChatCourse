import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Slider } from '../../../components/ui/slider';
import { Textarea } from '../../../components/ui/textarea';

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
    <Card className="mt-8 bg-gray-900 border-gray-700 text-white">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-purple-900/50 rounded-lg">
            <Wand2 className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <CardTitle className="text-2xl text-white">Build Your Own Personalized Agent</CardTitle>
            <CardDescription className="text-gray-400">
              Mini-Challenge: Create a custom AI persona by defining its core instructions and tuning its behavior.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="agent-name" className="text-gray-300">Agent Name</Label>
            <Input 
              id="agent-name" 
              placeholder="e.g., 'Socratic Tutor' or 'Marketing Whiz'"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="system-prompt" className="text-gray-300">System Prompt</Label>
          <Textarea
            id="system-prompt"
            placeholder="Define the AI's role, personality, and instructions..."
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white min-h-[120px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="space-y-3">
            <Label className="text-gray-300">Temperature: <span className="font-mono text-purple-400">{temperature[0].toFixed(2)}</span></Label>
            <Slider 
              min={0} 
              max={2} 
              step={0.1} 
              value={temperature} 
              onValueChange={setTemperature} 
            />
            <p className="text-xs text-gray-500">Controls randomness. Higher is more creative.</p>
          </div>
          <div className="space-y-3">
            <Label className="text-gray-300">Top P: <span className="font-mono text-purple-400">{topP[0].toFixed(2)}</span></Label>
            <Slider 
              min={0} 
              max={1} 
              step={0.05} 
              value={topP} 
              onValueChange={setTopP} 
            />
            <p className="text-xs text-gray-500">Controls nucleus sampling. Filters token diversity.</p>
          </div>
          <div className="space-y-3">
            <Label className="text-gray-300">Frequency Penalty: <span className="font-mono text-purple-400">{frequencyPenalty[0].toFixed(2)}</span></Label>
            <Slider 
              min={-2} 
              max={2} 
              step={0.1} 
              value={frequencyPenalty} 
              onValueChange={setFrequencyPenalty} 
            />
            <p className="text-xs text-gray-500">Reduces repetition of the same tokens.</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-500 text-white w-full md:w-auto">
          Save Agent
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PersonalizedAgentBuilder;
