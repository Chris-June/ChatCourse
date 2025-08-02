import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, BookOpen, Send } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

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
    <Card className="mt-6 bg-gray-900 border-gray-700 text-white overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center text-xl text-white">
          <BookOpen className="w-6 h-6 mr-3 text-blue-400" />
          Context Window Simulator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 mb-4">
          This simulation shows how a conversation fits into an AI's limited "context window." Here, the AI can only remember the last <strong>{CONTEXT_WINDOW_SIZE}</strong> messages.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Conversation History */}
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-3 flex items-center"><MessageSquare className="w-5 h-5 mr-2"/>Full Conversation</h4>
            <div className="space-y-3 h-64 overflow-y-auto pr-2">
              <AnimatePresence initial={false}>
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`p-3 rounded-lg max-w-[90%] ${msg.role === 'user' ? 'bg-blue-900/70 ml-auto' : 'bg-gray-700/80 mr-auto'}`}>
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
                className="bg-gray-800 border-gray-600 text-white"
              />
              <Button onClick={handleSend} className="ml-2 bg-blue-600 hover:bg-blue-500">
                <Send className="w-4 h-4"/>
              </Button>
            </div>
          </div>

          {/* Context Window View */}
          <div className="bg-green-900/20 border border-green-700/50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-300 mb-3">AI's Context Window (Memory)</h4>
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
                    className={`p-3 rounded-lg border text-sm ${msg.role === 'user' ? 'border-blue-700 bg-blue-900/30' : 'border-gray-600 bg-gray-700/40'}`}>
                    <span className="font-bold mr-2 capitalize">{msg.role}:</span>
                    <span>{msg.content}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {messages.length > CONTEXT_WINDOW_SIZE && (
              <p className="text-xs text-yellow-400/80 mt-4 p-2 bg-yellow-900/20 rounded border border-yellow-700/30">
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
