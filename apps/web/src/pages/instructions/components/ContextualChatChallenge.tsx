import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare, Square, Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChecklistItem {
  text: string;
  completed: boolean;
}

interface ContextualChatChallengeProps {
  initialMessages: Message[];
  challengeChecklist: ChecklistItem[];
}

const ContextualChatChallenge: React.FC<ContextualChatChallengeProps> = ({ initialMessages, challengeChecklist }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(challengeChecklist);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const checkCompletion = (text: string) => {
    const lowercasedText = text.toLowerCase();
    const newChecklist = checklist.map(item => {
      if (item.completed) return item;

      const keywords = item.text.toLowerCase().match(/\b(summarize|alternative headlines|mission|unlock human creativity)\b/g) || [];
      if (keywords.every(kw => lowercasedText.includes(kw))) {
        return { ...item, completed: true };
      }
      return item;
    });
    setChecklist(newChecklist);
  };

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    checkCompletion(input);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to get response stream.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botResponse = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        botResponse += chunk;
        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].content = botResponse;
          return newMsgs;
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I had an issue. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 bg-card text-card-foreground p-4 rounded-xl border shadow-sm">
      <div className="w-full md:w-1/3">
        <h3 className="text-lg font-semibold text-foreground mb-2">Your Checklist</h3>
        <div className="bg-muted border p-4 rounded-lg">
          <ul className="space-y-3">
            {checklist.map((item, index) => (
              <motion.li key={index} className="flex items-center text-foreground">
                {item.completed ? (
                  <CheckSquare className="w-5 h-5 mr-3 text-emerald-500" aria-hidden="true" />
                ) : (
                  <Square className="w-5 h-5 mr-3 text-muted-foreground" aria-hidden="true" />
                )}
                <span>{item.text}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full md:w-2/3 flex flex-col h-[500px]">
        <div
          ref={chatContainerRef}
          className="flex-grow bg-muted rounded-lg p-4 overflow-y-auto mb-4 border"
          role="log"
          aria-live="polite"
          aria-relevant="additions"
        >
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div key={index} layout className={`flex items-start gap-3 my-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && <Bot className="w-6 h-6 text-primary" aria-hidden="true" />}
                <div className={`max-w-md px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                  {msg.content}
                </div>
                {msg.role === 'user' && <User className="w-6 h-6 text-emerald-500" aria-hidden="true" />}
              </motion.div>
            ))}
             {isLoading && (
                <motion.div layout className="flex items-start gap-3 my-4">
                    <Bot className="w-6 h-6 text-primary" aria-hidden="true" />
                    <div className="max-w-xs px-4 py-2 rounded-lg bg-muted text-foreground">
                        <div className="flex items-center justify-center space-x-1">
                            <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center bg-background border rounded-lg px-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Practice context management..."
            className="w-full bg-transparent p-3 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            aria-label="Send message"
            className="p-2 text-muted-foreground hover:text-primary disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary/40 rounded-full"
          >
            <Send className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContextualChatChallenge;
