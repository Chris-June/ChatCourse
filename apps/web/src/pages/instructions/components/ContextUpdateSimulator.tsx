import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, BookOpen, Send } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import InteractiveHeader from '@/components/InteractiveHeader';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: number;
}

const initialMessages: Message[] = [
  { role: 'user', content: 'What\'s the capital of France?', id: 1 },
  { role: 'assistant', content: 'The capital of France is Paris.', id: 2 },
];

const CONTEXT_WINDOW_SIZE = 4; // Simulate a context window of 4 messages

const ContextUpdateSimulator = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [contextWindow, setContextWindow] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    // Update the context window whenever messages change
    const newContext = messages.slice(-CONTEXT_WINDOW_SIZE);
    setContextWindow(newContext);
  }, [messages]);

  const handleSend = () => {
    if (!userInput.trim()) return;

    const newUserMessage: Message = { role: 'user', content: userInput, id: Date.now() };
    const assistantResponse: Message = {
      role: 'assistant',
      content: `I'm a simulated assistant. My response to "${userInput}" is just a placeholder. The key is to watch the context window! `,
      id: Date.now() + 1,
    };

    setMessages(prev => [...prev, newUserMessage, assistantResponse]);
    setUserInput('');
  };

  return (
    <Card className="mt-6 bg-card border text-card-foreground overflow-hidden">
      <InteractiveHeader title="Context Window Simulator" icon={BookOpen} />
      <CardHeader>
        <CardTitle className="flex items-center text-xl text-foreground">
          <BookOpen className="h-6 w-6 mr-3 text-primary" aria-hidden="true" />
          Context Window Simulator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          This simulation shows how a conversation fits into an AI's limited "context window." Here, the AI can only remember the last <strong>{CONTEXT_WINDOW_SIZE}</strong> messages.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Conversation History */}
          <div className="bg-muted border p-4 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3 flex items-center"><MessageSquare className="h-5 w-5 mr-2" aria-hidden="true"/>Full Conversation</h4>
            <div className="space-y-3 h-64 overflow-y-auto pr-2" role="log" aria-live="polite" aria-relevant="additions">
              <AnimatePresence initial={false}>
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`p-3 rounded-lg max-w-[90%] ${msg.role === 'user' ? 'bg-primary text-primary-foreground ml-auto' : 'bg-muted text-foreground mr-auto'}`}>
                    <p className="text-sm">{msg.content}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <div className="flex mt-4">
              <Input 
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="Type a message..."
                className="bg-background border text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
              />
              <Button onClick={handleSend} aria-label="Send message" className="ml-2">
                <Send className="h-4 w-4" aria-hidden="true"/>
              </Button>
            </div>
          </div>

          {/* Context Window View */}
          <div className="bg-accent border p-4 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">AI's Context Window (Memory)</h4>
            <div className="space-y-3">
              <AnimatePresence>
                {contextWindow.map(msg => (
                  <motion.div 
                    key={msg.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`p-3 rounded-lg border text-sm ${msg.role === 'user' ? 'border-primary/40 bg-primary/10' : 'border-muted-foreground/30 bg-muted'}`}>
                    <span className="font-bold mr-2 capitalize">{msg.role}:</span>
                    <span>{msg.content}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {messages.length > CONTEXT_WINDOW_SIZE && (
              <p className="text-xs mt-4 p-2 bg-muted text-muted-foreground rounded border">
                Notice how the oldest messages have been pushed out of the context window. The AI no longer "remembers" them.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContextUpdateSimulator;
