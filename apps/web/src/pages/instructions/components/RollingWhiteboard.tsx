import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, PanelsTopLeft } from 'lucide-react';
import InteractiveHeader from '@/components/InteractiveHeader';

const MAX_MESSAGES = 4;

const RollingWhiteboard: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    setMessages(prev => {
      const newMessages = [...prev, inputValue.trim()];
      if (newMessages.length > MAX_MESSAGES) {
        return newMessages.slice(1);
      }
      return newMessages;
    });

    setInputValue('');
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-card p-4 rounded-xl border border-border shadow-sm">
      <InteractiveHeader title="Rolling Whiteboard" icon={PanelsTopLeft} />
      <h3 className="font-semibold text-card-foreground mb-2">Analogy: A Rolling Whiteboard</h3>
      <p className="text-muted-foreground mb-4">
        This interactive whiteboard demonstrates how AI memory works. Each message you type is like writing on a whiteboard with limited space. When the board is full (typically 4,000-8,000 words), the oldest messages get erased to make room for new ones. This is why the AI might "forget" details from earlier in a long conversation.
      </p>
      <div className="bg-muted p-4 rounded-xl h-64 flex flex-col">
        <div ref={listRef} className="flex-grow overflow-y-auto space-y-2 pr-2">
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => (
              <motion.div
                key={index} // Note: Using index as key is okay here because the list order is stable.
                layout
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, transition: { duration: 0.2 } }}
                className={`p-2 rounded-xl ${messages.length > MAX_MESSAGES && index === 0 ? 'bg-destructive/10' : 'bg-primary/10'}`}
              >
                <p className="text-foreground">{msg}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <form onSubmit={handleSendMessage} className="mt-4 flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow bg-background text-foreground placeholder:text-muted-foreground rounded-xl p-2 border border-border focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
          />
          <button type="submit" className="bg-primary text-primary-foreground p-2 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" disabled={!inputValue.trim()}>
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="text-muted-foreground mt-2 text-sm">
          <strong>Practical tip:</strong> In real conversations, you can "refresh" the whiteboard by summarizing important details when the conversation gets long.
        </p>
      </div>
    </div>
  );
};

export default RollingWhiteboard;
