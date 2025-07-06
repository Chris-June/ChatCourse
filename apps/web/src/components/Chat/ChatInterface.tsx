/**
 * @file ChatInterface.tsx
 * @description The main chat interface component, now fully interactive.
 * This component connects to the backend, streams responses, and manages state using Zustand.
 */

import { useEffect, useRef } from 'react';
import { Button, Input } from '@chat/ui';
import { Plus, Send, Mic, Smile, Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChatStore, Message } from '@/store/chat';

const ChatInterface = () => {
  const {
    messages,
    input,
    isStreaming,
    addMessage,
    setInput,
    setStreaming,
    updateLastMessage,
  } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const newUserMessage: Message = { role: 'user', content: input };
    addMessage(newUserMessage);
    setInput('');

    const newAiMessage: Message = { role: 'assistant', content: '' };
    addMessage(newAiMessage);

    setStreaming(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, newUserMessage] }),
      });

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n\n').filter(Boolean);

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.substring(6);
            if (data === '[DONE]') {
              setStreaming(false);
              return;
            }
            try {
              const { delta } = JSON.parse(data);
              if (delta) {
                updateLastMessage(delta);
              }
            } catch (err) {
              console.error('Error parsing stream data:', err);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching chat response:', error);
      updateLastMessage('\n\nError: Could not fetch response.');
    } finally {
      setStreaming(false);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden relative bg-black text-gray-100 flex flex-col">
      <header className="flex items-center justify-between p-4 border-b border-zinc-800">
        <h1 className="text-xl font-bold">GPT-4.1-nano</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && <Bot className="w-6 h-6 text-purple-400 mr-2 shrink-0" />}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl px-4 py-2 max-w-[75%] ${msg.role === 'user' ? 'bg-zinc-700 text-white' : 'bg-zinc-800/70 text-gray-100'}`}>
              {msg.content}
            </motion.div>
            {msg.role === 'user' && <User className="w-6 h-6 text-emerald-400 ml-2 shrink-0" />}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-4 bg-black/90 backdrop-blur">
        <div className="relative">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isStreaming}
            className="pl-10 pr-28 py-4 rounded-full bg-zinc-800 text-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={isStreaming}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white disabled:opacity-50">
            <Plus size={20} />
          </Button>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2">
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              disabled={isStreaming || !input.trim()}
              className="text-gray-300 hover:text-white disabled:opacity-50">
              <Send size={18} />
            </Button>
            <Button type="button" variant="ghost" size="icon" disabled={isStreaming} className="text-gray-300 hover:text-white disabled:opacity-50">
              <Mic size={18} />
            </Button>
            <Button type="button" variant="ghost" size="icon" disabled={isStreaming} className="text-gray-300 hover:text-white disabled:opacity-50">
              <Smile size={18} />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
