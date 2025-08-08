import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckSquare, Square, Send, Bot, User, ClipboardCopy } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChecklistItem {
  text: string;
  completed: boolean;
}

interface SocraticTutorProjectProps {
  challengeChecklist: ChecklistItem[];
  systemPrompt: string;
}

const SocraticTutorProject: React.FC<SocraticTutorProjectProps> = ({ challengeChecklist, systemPrompt }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>(challengeChecklist);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const checkCompletion = (userText: string, assistantText: string) => {
    const lowerUser = userText.toLowerCase();
    const lowerAssistant = assistantText.toLowerCase();
    
    const newChecklist = checklist.map(item => {
      if (item.completed) return item;
      const text = item.text.toLowerCase();

      if (text.includes('gnosi') && lowerAssistant.includes('gnosi')) return { ...item, completed: true };
      if (text.includes('guiding questions') && !lowerAssistant.includes('?')) return { ...item, completed: false }; // Heuristic
      if (text.includes('re-center') && lowerUser.includes('remember')) return { ...item, completed: true };
      if (text.includes('think deeper') && lowerAssistant.split('?').length > 2) return { ...item, completed: true }; // Multiple questions

      return item;
    });
    setChecklist(newChecklist);
  };

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const currentMessages = messages.length === 0 ? [{ role: 'system', content: systemPrompt }, userMessage] : [...messages, userMessage];
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: currentMessages }),
      });

      if (!response.ok || !response.body) throw new Error('Stream failed');

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
      checkCompletion(userMessage.content, botResponse);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'An error occurred.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 bg-card p-4 rounded-lg border">
      <div className="w-full md:w-1/3">
        <h3 className="text-lg font-semibold text-foreground mb-2">Project Checklist</h3>
        <div className="bg-muted p-4 rounded-lg space-y-3 border">
          {checklist.map((item, index) => (
            <motion.li key={index} className="flex items-center text-muted-foreground list-none">
              {item.completed ? <CheckSquare className="w-5 h-5 mr-3 text-green-500" aria-hidden="true" /> : <Square className="w-5 h-5 mr-3 text-muted-foreground" aria-hidden="true" />}
              <span className="text-foreground/90">{item.text}</span>
            </motion.li>
          ))}
        </div>
        <div className="mt-4">
            <button 
                onClick={() => setInput(systemPrompt)} 
                className='w-full flex items-center justify-center gap-2 p-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-colors'>
                <ClipboardCopy size={16} aria-hidden="true"/> Load System Prompt
            </button>
        </div>
      </div>
      <div className="w-full md:w-2/3 flex flex-col h-[500px]">
        <div 
          ref={chatContainerRef} 
          className="flex-grow bg-background rounded-lg p-4 overflow-y-auto mb-4 border"
          role="log" 
          aria-live="polite"
        >
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div key={index} layout className={`flex items-start gap-3 my-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && <Bot className="w-6 h-6 text-primary" aria-hidden="true" />}
                <div className={`max-w-md px-4 py-2 rounded-lg border ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                  <span className="whitespace-pre-wrap break-words">{msg.content}</span>
                </div>
                {msg.role === 'user' && <User className="w-6 h-6 text-emerald-500" aria-hidden="true" />}
              </motion.div>
            ))}
            {isLoading && (
                <motion.div layout className="flex items-start gap-3 my-4" role="status" aria-live="polite">
                  <Bot className="w-6 h-6 text-primary" aria-hidden="true" />
                  <div className="max-w-xs px-4 py-2 rounded-lg bg-muted border">
                      <div className="flex items-center justify-center space-x-1" aria-hidden="true">
                          <span className="h-2 w-2 bg-primary/70 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                          <span className="h-2 w-2 bg-primary/70 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="h-2 w-2 bg-primary/70 rounded-full animate-bounce"></span>
                      </div>
                  </div>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center bg-background rounded-lg px-2 border">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Begin your dialogue with Gnosi..."
            className="w-full bg-transparent p-3 focus:outline-none text-foreground placeholder:text-muted-foreground"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading} aria-busy={isLoading} className="p-2 text-muted-foreground hover:text-primary disabled:opacity-50">
            <Send className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocraticTutorProject;
