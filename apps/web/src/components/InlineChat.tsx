import React, { useState, useEffect, useCallback } from 'react';
import { Send, Loader, X, AlertCircle, CheckCircle, Circle as CircleIcon } from 'lucide-react';

type RateLimitStatus = {
  count: number;
  lastReset: number;
};

interface ChallengeChecklistItem {
  text: string;
  completed: boolean;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface InlineChatProps {
  moduleId: string;
  initialMessages?: Message[];
  maxAttempts?: number;
  placeholder?: string;
  simulatedResponse?: string;
  systemPrompt?: string;
  challengeChecklist?: ChallengeChecklistItem[];
  maxFollowUps?: number;
}

const RATE_LIMIT_RESET_HOURS = 24;
const DEFAULT_MAX_ATTEMPTS = 10;

const InlineChat: React.FC<InlineChatProps> = ({
  moduleId,
  initialMessages = [],
  maxAttempts = DEFAULT_MAX_ATTEMPTS,
  placeholder,
  systemPrompt,
  challengeChecklist,
  maxFollowUps
}) => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>(() => {
    const baseMessages: Message[] = [...initialMessages];
    if (systemPrompt) {
      baseMessages.unshift({ role: 'system', content: systemPrompt });
    }
    return baseMessages;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimited, setRateLimited] = useState<boolean>(false);
  const [checklist, setChecklist] = useState<ChallengeChecklistItem[]>([]);
  const userFollowUps = messages.filter(m => m.role === 'user').length - initialMessages.filter(m => m.role === 'user').length;

  const loadRateLimitState = useCallback(() => {
    try {
      const rateLimitKey = `rateLimit_${moduleId}`;
      const savedState = localStorage.getItem(rateLimitKey);
      
      if (savedState) {
        const { count, lastReset } = JSON.parse(savedState) as RateLimitStatus;
        const now = Date.now();
        const hoursSinceReset = (now - lastReset) / (1000 * 60 * 60);
        
        if (hoursSinceReset >= RATE_LIMIT_RESET_HOURS) {
          localStorage.removeItem(rateLimitKey);
          setRateLimited(false);
        } else {
          setRateLimited(count >= maxAttempts);
        }
      }
    } catch (error) {
      console.error('Error loading rate limit state:', error);
    }
  }, [moduleId, maxAttempts]);

  useEffect(() => {
    if (challengeChecklist) {
      setChecklist(challengeChecklist.map(item => ({ ...item, completed: false })));
    }
    loadRateLimitState();
  }, [challengeChecklist, loadRateLimitState]);

  const handleClear = () => {
    setPrompt('');
    const baseMessages: Message[] = [...initialMessages];
    if (systemPrompt) {
      baseMessages.unshift({ role: 'system', content: systemPrompt });
    }
    setMessages(baseMessages);
    if (challengeChecklist) {
      setChecklist(challengeChecklist.map(item => ({ ...item, completed: false })));
    }
  };

  const checkChecklistCompletion = (text: string) => {
    if (!challengeChecklist) return;
    
    const newChecklist = [...checklist];
    let itemCompleted = false;

    // Check all messages, not just the current one
    const allMessages = [...messages, { role: 'user', content: text }];
    const conversationText = allMessages.map(m => m.content).join('\n').toLowerCase();

    newChecklist.forEach((item, index) => {
      if (!item.completed) {
        // Look for key phrases that might indicate completion
        const itemText = item.text.toLowerCase();
        const keyPhrases = [
          itemText,
          ...itemText.split(/[,.]?\s+/).filter(phrase => phrase.length >= 3) // Split into meaningful words
        ];
        
        // Check if any key phrase is present in the conversation
        const isCompleted = keyPhrases.some(phrase => 
          phrase.length >= 3 && conversationText.includes(phrase)
        );

        if (isCompleted) {
          newChecklist[index].completed = true;
          itemCompleted = true;
        }
      }
    });

    if (itemCompleted) {
      setChecklist(newChecklist);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading || rateLimited) return;

    if (maxFollowUps && userFollowUps >= maxFollowUps) {
      return; 
    }

    checkChecklistCompletion(prompt);

    const newMessages: Message[] = [...messages, { role: 'user', content: prompt }];
    setMessages(newMessages);
    setPrompt('');
    setIsLoading(true);

    try {

      // Use the same API endpoint as ChatInterface
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL === '/api' 
        ? '' 
        : import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const endpoint = apiBaseUrl 
        ? `${apiBaseUrl}${apiBaseUrl.endsWith('/') ? '' : '/'}api/chat`
        : '/api/chat';
      
      const headers: HeadersInit = { 
        'Content-Type': 'application/json'
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          messages: newMessages,
          model: 'gpt-4.1-nano', // Default model for inline chat
          customInstructions: systemPrompt,
          temperature: 0.7,
          top_p: 1
          // API key will be handled by the server using environment variables
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to get a response from the server');
      }

      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';
      
      // Add empty assistant message to start streaming
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      let buffer = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') {
              break;
            }
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.delta) {
                assistantMessage += parsed.delta;
              } else if (parsed.content) {
                assistantMessage += parsed.content;
              }
              
              // Update the last message with streaming content
              setMessages(prev => {
                const updated = [...prev];
                if (updated[updated.length - 1]?.role === 'assistant') {
                  updated[updated.length - 1].content = assistantMessage;
                }
                return updated;
              });
            } catch (e) {
              // Handle JSON parsing errors gracefully
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
      let errorMessage = 'I apologize, but I\'m having trouble connecting to the AI service.';
      
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          errorMessage = 'API key error: ' + error.message;
        } else if (error.message.includes('network')) {
          errorMessage = 'Network error: Unable to connect to the server. Please check your internet connection.';
        } else {
          errorMessage = error.message || errorMessage;
        }
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Error: ${errorMessage}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const isInteractionDisabled = isLoading || rateLimited || (maxFollowUps ? userFollowUps >= maxFollowUps : false);

  return (
    <div className={`bg-gray-800/50 p-4 rounded-lg border border-gray-700`}>
      {checklist && checklist.length > 0 && (
        <div className="mb-4 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
          <h4 className="font-semibold text-white mb-2">Challenge Checklist</h4>
          <ul className="space-y-2">
            {checklist.map((item, index) => (
              <li key={index} className={`flex items-center text-sm transition-colors ${item.completed ? 'text-green-400' : 'text-gray-400'}`}>
                {item.completed ? <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" /> : <CircleIcon className="w-4 h-4 mr-2 flex-shrink-0" />}
                <span className={item.completed ? 'line-through' : ''}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4 mb-4">
        {messages.map((msg, index) => (
          msg.role !== 'system' && (
            <div key={index} className={`p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-900/50' : 'bg-gray-700/50'}`}>
              <p className="text-white whitespace-pre-wrap">{msg.content}</p>
            </div>
          )
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholder || 'Type your message...'}
            className="w-full bg-gray-900 text-white border border-gray-600 rounded-lg p-3 pr-20 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow duration-200 text-sm"
            rows={3}
            disabled={isInteractionDisabled}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
          />
          <button 
            type="submit" 
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
            disabled={!prompt.trim() || isInteractionDisabled}
            aria-label="Send message"
          >
            {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <div className="flex justify-between items-center mt-2">
          <button type="button" onClick={handleClear} className="text-xs text-gray-400 hover:text-white flex items-center">
            <X className="w-4 h-4 mr-1" /> Clear
          </button>
          {maxFollowUps !== undefined && (
            <div className="text-xs text-gray-500">
              Follow-ups: {userFollowUps} / {maxFollowUps}
            </div>
          )}
        </div>
        {rateLimited && (
          <div className="mt-2 text-xs text-red-400 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1.5" />
            <span>You have reached the maximum number of attempts. Please try again later.</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default InlineChat;
