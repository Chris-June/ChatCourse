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

// Real API call function using streaming
const generateRealResponse = async (messages: Message[], newMessage: string): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [...messages, { role: 'user', content: newMessage }],
        model: 'gpt-4o-mini',
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    // Read the streaming response
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body');
    }

    let fullResponse = '';
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;
          
          try {
            const parsed = JSON.parse(data);
            // Check for an error message from the backend
            if (parsed.error) {
              throw new Error(parsed.error.message || 'An unknown error occurred');
            }
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              fullResponse += content;
            }
          } catch (e) {
            console.error('Error parsing stream data:', e);
            // Re-throw the error to be caught by the outer catch block
            throw e;
          }
        }
      }
    }

    return fullResponse || "I'm having trouble connecting to the AI service. Please try again.";
  } catch (error) {
    console.error('API call error:', error);
    return "I'm experiencing technical difficulties. Please try again in a moment.";
  }
};

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

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateRealResponse([...messages, userMessage], input);
      const botResponse: Message = {
        role: 'assistant',
        content: response,
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorResponse: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorResponse]);
    }
    setIsLoading(false);
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
    "content": "${msg.content.replace(/"/g, '\\"')}"
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
