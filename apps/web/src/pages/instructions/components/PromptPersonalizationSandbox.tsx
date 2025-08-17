import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TestTube2, Sparkles } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Textarea } from '../../../components/ui/textarea';
import { Input } from '../../../components/ui/input';

const personas: Record<string, string> = {
  "Pirate Captain": "You are a salty pirate captain. All your responses must be in pirate speak, full of 'arrrs' and references to the sea.",
  "Haiku Poet": "You are a poet who only responds in haikus (5-7-5 syllables). Your tone is serene and observant.",
  "Sarcastic Teenager": "You are a bored, sarcastic teenager from the 2000s. You answer questions begrudgingly, using slang like 'whatever' and 'as if'.",
};

const simulateResponse = (prompt: string, question: string): string => {
  if (prompt.toLowerCase().includes('pirate')) {
    return `Arrr, ye ask about '${question}'? Shiver me timbers, that be a question for the ages! The sea holds many secrets, but the treasure ye seek is knowledge!`;
  }
  if (prompt.toLowerCase().includes('haiku')) {
    return `You ask me a thing,\nAn answer forms like a cloud,\nHere is my wisdom.`;
  }
  if (prompt.toLowerCase().includes('sarcastic')) {
    return `Ugh, seriously? You're asking me about '${question}'? As if. I guess I'll answer, but like, don't expect me to be happy about it.`;
  }
  return `As a helpful assistant, my response to your query about '${question}' would be direct and informative, shaped by the custom instructions you have provided.`;
};

const PromptPersonalizationSandbox = () => {
  const [systemPrompt, setSystemPrompt] = useState(personas['Pirate Captain']);
  const [userInput, setUserInput] = useState('the meaning of life');
  const [aiResponse, setAiResponse] = useState('');

  const handleGenerate = () => {
    const response = simulateResponse(systemPrompt, userInput);
    setAiResponse(response);
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center text-base md:text-lg">
          <TestTube2 className="w-6 h-6 mr-3 text-primary" aria-hidden="true" />
          Prompt-Building Sandbox
        </CardTitle>
        <CardDescription>
          See how changing the System Prompt alters the AI's personality and response style.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="font-semibold mb-2 block">1. Choose a Persona (or write your own!)</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {Object.keys(personas).map(name => (
              <Button
                key={name}
                variant="outline"
                size="sm"
                aria-pressed={systemPrompt === personas[name]}
                className={systemPrompt === personas[name] ? 'bg-accent' : ''}
                onClick={() => setSystemPrompt(personas[name])}
              >
                {name}
              </Button>
            ))}
          </div>
          <Textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="min-h-[100px] font-mono text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="md:col-span-2 space-y-2">
            <label htmlFor="user-input" className="font-semibold">2. Ask a Question</label>
            <Input
              id="user-input"
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              className=""
            />
          </div>
          <Button onClick={handleGenerate} className="h-10" aria-live="polite">
            <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
            Generate Response
          </Button>
        </div>

        <AnimatePresence>
          {aiResponse && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="!mt-6">
              <label className="font-semibold mb-2 block">3. AI's Response</label>
              <div className="p-4 bg-muted border rounded-lg text-muted-foreground italic" role="status" aria-live="polite">
                {aiResponse}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default PromptPersonalizationSandbox;
