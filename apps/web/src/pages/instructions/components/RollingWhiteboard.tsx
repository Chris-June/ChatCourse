import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';

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
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
      <h3 className="font-semibold text-white mb-2">Analogy: A Rolling Whiteboard</h3>
      <p className="text-gray-400 mb-4">
        Add messages to the board. When more than {MAX_MESSAGES} messages are on the board, the oldest one gets erased to make room. This is how a context window works.
      </p>
      <div className="bg-gray-800 p-4 rounded-lg h-64 flex flex-col">
        <div ref={listRef} className="flex-grow overflow-y-auto space-y-2 pr-2">
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => (
              <motion.div
                key={index} // Note: Using index as key is okay here because the list order is stable.
                layout
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, transition: { duration: 0.2 } }}
                className={`p-2 rounded-lg ${messages.length > MAX_MESSAGES && index === 0 ? 'bg-red-900/50' : 'bg-blue-900/50'}`}
              >
                <p className="text-white">{msg}</p>
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
            className="flex-grow bg-gray-700 text-white placeholder-gray-400 rounded-md p-2 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed" disabled={!inputValue.trim()}>
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default RollingWhiteboard;
