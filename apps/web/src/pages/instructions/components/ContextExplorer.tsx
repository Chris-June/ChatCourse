import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const initialMessages: Message[] = [
  {
    role: 'assistant',
    content: "Hi there! I'm a demo bot. Ask me a question, and then a follow-up, to see how our conversation history is built.",
  },
];

const simulatedResponses = [
  "That's a great question! The capital of Brazil is Brasília.",
  "It's located in the central-western region of the country.",
  "It was founded in 1960 to serve as the new national capital.",
  "Interesting! I'm not sure about that, but I can tell you that the primary language is Portuguese.",
];

const ContextExplorer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const botResponse: Message = {
        role: 'assistant',
        content: simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)],
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 bg-gray-800 p-4 rounded-lg border border-gray-700 h-[600px]">
      {/* Left Side: Chat Interface */}
      <div className="w-full md:w-1/2 flex flex-col h-full">
        <h3 className="text-lg font-semibold text-white mb-2 text-center">Chat Interface</h3>
        <div ref={chatContainerRef} className="flex-grow bg-gray-900 rounded-lg p-4 overflow-y-auto mb-4">
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-3 my-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && <Bot className="w-6 h-6 text-blue-400 flex-shrink-0" />}
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                  {msg.content}
                </div>
                {msg.role === 'user' && <User className="w-6 h-6 text-green-400 flex-shrink-0" />}
              </motion.div>
            ))}
            {isLoading && (
                <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3 my-4">
                    <Bot className="w-6 h-6 text-blue-400 flex-shrink-0" />
                    <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-700 text-gray-200">
                        <div className="flex items-center justify-center space-x-1">
                            <span className="h-2 w-2 bg-blue-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="h-2 w-2 bg-blue-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="h-2 w-2 bg-blue-300 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center bg-gray-900 rounded-lg px-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="w-full bg-transparent p-3 text-gray-200 placeholder-gray-500 focus:outline-none"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading} className="p-2 text-gray-400 hover:text-blue-400 disabled:text-gray-600 transition-colors rounded-full">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Right Side: Context Viewer */}
      <div className="w-full md:w-1/2 flex flex-col h-full">
        <h3 className="text-lg font-semibold text-white mb-2 text-center">Live Context (Message Array)</h3>
        <div className="flex-grow bg-gray-900 rounded-lg p-4 overflow-y-auto font-mono text-xs text-gray-300">
          <pre><code>{
`[
${messages.map(msg => 
`  {
    "role": "${msg.role}",
    "content": "${msg.content.replace(/"/g, '\"')}"
  }`
).join(',\n')}
]`
          }</code></pre>
        </div>
      </div>
    </div>
  );
};

export default ContextExplorer;
