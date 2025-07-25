/**
 * @file ChatInterface.tsx
 * @description The main chat interface component, now with an expandable side menu.
 * This component connects to the backend, streams responses, and manages state using Zustand.
 */

import { useEffect, useRef, useState } from 'react';
import { Button, Input } from '@chat/ui';
import { Plus, Send, Mic, Smile, Bot, User, Menu, Square, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useChatStore, Message } from '@/store/chat';
import SideMenu from '../SideMenu';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import CodeBlock from '../Markdown/CodeBlock';

const ChatInterface = () => {
  const {
    input,
    isStreaming,
    addMessage,
    setInput,
    setStreaming,
    updateLastMessage,
    updateLastMessageMetadata,
    setMessages,
    sessions,
    activeSessionId,
    startNewSession,
    setActiveSession,
    getActiveSession,
    renameSession,
    deleteSession,
    model,
    toggleSettings,
    customInstructions,
    temperature,
    top_p,
    theme,
    apiKey,
  } = useChatStore();

  const activeSession = getActiveSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!activeSession) {
      if (sessions.length > 0) {
        // If there are sessions but none is active, activate the most recent one.
        setActiveSession(sessions[sessions.length - 1].id);
      } else {
        // If there are no sessions at all, create a new one.
        startNewSession();
      }
    }
  }, [activeSession, sessions, startNewSession, setActiveSession]);

  useEffect(() => {
    scrollToBottom();
  }, [activeSession?.messages]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const executeChatRequest = async (messages: Message[]) => {
    setStreaming(true);
    abortControllerRef.current = new AbortController();

    try {
      // Use empty string as base URL if VITE_API_BASE_URL is '/api' to prevent double /api
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL === '/api' 
        ? '' 
        : import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const endpoint = `${apiBaseUrl}${apiBaseUrl && !apiBaseUrl.endsWith('/') ? '/' : ''}api/chat`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortControllerRef.current.signal,
        body: JSON.stringify({
          messages,
          model,
          customInstructions,
          temperature,
          top_p,
          apiKey,
        }),
      });

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage: Message = { role: 'assistant', content: '' };
      addMessage(assistantMessage);

      let buffer = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const sseMessages = buffer.split('\n\n');
        buffer = sseMessages.pop() || ''; // Keep potential partial message

        for (const sseMessage of sseMessages) {
          if (!sseMessage) continue;

          if (sseMessage.startsWith('event: metadata')) {
            const dataLine = sseMessage.split('\n').find(l => l.startsWith('data: '));
            if (dataLine) {
              const data = dataLine.substring(6);
              try {
                const metadata = JSON.parse(data);
                updateLastMessageMetadata(metadata);
              } catch (e) {
                console.error('Failed to parse metadata:', e);
              }
            }
          } else if (sseMessage.startsWith('data: ')) {
            const data = sseMessage.substring(6);
            if (data === '[DONE]') {
              // End of stream
              break;
            }
            try {
              const { delta } = JSON.parse(data);
              if (delta) {
                updateLastMessage(prev => prev + delta);
              }
            } catch (e) {
              // It might not be JSON, which is fine, just log it.
              console.error('Failed to parse delta chunk:', data, e);
            }
          }
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Fetch aborted by user.');
        updateLastMessage((prev: string) => prev + ' [Stopped]');
      } else {
        console.error('Error fetching chat response:', error);
        updateLastMessage('\n\nError: Could not fetch response.');
      }
    } finally {
      setStreaming(false);
      inputRef.current?.focus();
      abortControllerRef.current = null;
    }
  };

      const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isStreaming || !activeSession) return;

    const userMessage: Message = { role: 'user', content: input };
    addMessage(userMessage);
    setInput('');

    const messages = [...activeSession.messages, userMessage];
    await executeChatRequest(messages);
  };

  const handleRegenerate = async () => {
    if (!activeSession || isStreaming || activeSession.messages.length === 0) return;

    let lastUserMessageIndex = -1;
    for (let i = activeSession.messages.length - 1; i >= 0; i--) {
      if (activeSession.messages[i].role === 'user') {
        lastUserMessageIndex = i;
        break;
      }
    }

    if (lastUserMessageIndex === -1) return;

    const messagesToResubmit = activeSession.messages.slice(
      0,
      lastUserMessageIndex + 1
    );

    setMessages(messagesToResubmit);

    await executeChatRequest(messagesToResubmit);
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-black text-gray-100 flex">
      <SideMenu
        isOpen={isMenuOpen}
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSwitchSession={setActiveSession}
        onNewSession={startNewSession}
        onRenameSession={renameSession}
        onDeleteSession={deleteSession}
        onOpenSettings={toggleSettings}
      />

      <div className="flex-1 flex flex-col h-full bg-black min-w-0">
        <header className="flex items-center justify-between p-4 border-b border-zinc-800 shrink-0">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!isMenuOpen)}>
              <Menu size={20} />
            </Button>
            <div className="flex items-center space-x-2">
              <img 
                src="/Logo.png" 
                alt="Chat App Logo" 
                className="h-12 w-12 object-contain" 
                onError={(e) => {
                  // Fallback to relative path if absolute path fails
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'Logo.png';
                }}
              />
              <h1 className="text-xl font-bold">
                {model.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h1>
            </div>
          </div>
          <div className="w-8" /> {/* Spacer to balance the header */}
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
          {/* Semi-transparent logo overlay */}
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-40">
            <img 
              src="/Logo.png" 
              alt="Chat App Logo" 
              className="h-80 w-80 object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = 'Logo.png';
              }}
            />
          </div>
          {(activeSession?.messages || []).map((msg, index) => (
            <div key={index} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`flex items-end w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && <Bot className="w-6 h-6 text-purple-400 mr-2 shrink-0" />}
                {msg.role === 'assistant' ? (
                  <div className="prose prose-sm max-w-full text-white">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm, remarkMath]}
                      rehypePlugins={[rehypeKatex]}
                      components={{
                        code: CodeBlock,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`rounded-2xl px-4 py-2 max-w-[75%] ${msg.role === 'user' ? 'bg-zinc-700 text-white' : 'bg-transparent text-gray-100'}`}
                  >
                    {msg.content}
                  </motion.div>
                )}
                {msg.role === 'user' && <User className="w-6 h-6 text-emerald-400 ml-2 shrink-0" />}
              </div>
              {msg.role === 'assistant' && index === (activeSession?.messages?.length ?? 0) - 1 && !isStreaming && (
                <div className="mt-2 flex items-center justify-start ml-8">
                  <Button onClick={handleRegenerate} size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                    <RefreshCw size={16} className="mr-2" />
                    Regenerate
                  </Button>
                </div>
              )}
              {msg.role === 'assistant' && msg.metadata && (
                <div className="text-xs text-zinc-500 mt-1 ml-8 px-2 py-0.5 rounded-full bg-zinc-900/50 border border-zinc-800">
                  <span>{msg.metadata.totalTokens} tokens</span>
                  <span className="mx-1">·</span>
                  <span>${msg.metadata.totalCost.toFixed(6)}</span>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="px-4 py-4 bg-black/90 backdrop-blur shrink-0">
          <div className="relative">
                        <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isStreaming}
              className="pl-10 pr-28 py-4 rounded-full bg-zinc-800 text-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={isStreaming}
              className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white disabled:opacity-50"
            >
              <Plus size={20} />
            </Button>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2">
              {isStreaming ? (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleStopStreaming}
                  className="text-white bg-red-600 hover:bg-red-700 rounded-full px-4 py-2 flex items-center"
                >
                  <Square size={16} className="mr-2" />
                  Stop
                </Button>
              ) : (
                <>
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    disabled={!input.trim()}
                    className="text-gray-300 hover:text-white disabled:opacity-50"
                  >
                    <Send size={18} />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="text-gray-300 hover:text-white disabled:opacity-50">
                    <Mic size={18} />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="text-gray-300 hover:text-white disabled:opacity-50">
                    <Smile size={18} />
                  </Button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
