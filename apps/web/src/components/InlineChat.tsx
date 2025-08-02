import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Send, Loader, X, AlertCircle, CheckCircle, Circle as CircleIcon } from 'lucide-react';

type RateLimitStatus = {
  count: number;
  lastReset: number;
};

export interface ChallengeChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface InlineChatHandle {
  setPromptText: (text: string) => void;
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

const InlineChat = forwardRef<InlineChatHandle, InlineChatProps>(
  (
    {
      moduleId,
      initialMessages = [],
      maxAttempts = DEFAULT_MAX_ATTEMPTS,
      placeholder,
      systemPrompt,
      challengeChecklist,
      maxFollowUps,
    },
    ref
  ) => {
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
    const userFollowUps = messages.filter((m) => m.role === 'user').length - initialMessages.filter((m) => m.role === 'user').length;

    useImperativeHandle(ref, () => ({
      setPromptText: (text: string) => {
        setPrompt(text);
      },
    }));

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
        setChecklist(challengeChecklist.map((item) => ({ ...item, completed: false })));
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
        setChecklist(challengeChecklist.map((item) => ({ ...item, completed: false })));
      }
    };

    const checkChecklistCompletion = (text: string) => {
      if (!challengeChecklist) return;

      const newChecklist = [...checklist];
      let itemCompleted = false;

      const allMessages = [...messages, { role: 'user', content: text }];
      const conversationText = allMessages.map((m) => m.content).join('\n').toLowerCase();

      newChecklist.forEach((item, index) => {
        if (!item.completed) {
          const itemText = item.text.toLowerCase();
          const keyPhrases = [
            itemText,
            ...itemText.split(/[,.]?\s+/).filter((phrase) => phrase.length >= 3),
          ];

          const isCompleted = keyPhrases.some(
            (phrase) => phrase.length >= 3 && conversationText.includes(phrase)
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

      const rateLimitKey = `rateLimit_${moduleId}`;
      let currentCount = 0;

      try {
        const savedState = localStorage.getItem(rateLimitKey);
        if (savedState) {
          const { count, lastReset } = JSON.parse(savedState) as RateLimitStatus;
          const now = Date.now();
          const hoursSinceReset = (now - lastReset) / (1000 * 60 * 60);

          if (hoursSinceReset < RATE_LIMIT_RESET_HOURS) {
            if (count >= maxAttempts) {
              setRateLimited(true);
              return;
            }
            currentCount = count;
          }
        }
      } catch (error) {
        console.error('Error reading rate limit state:', error);
      }

      setIsLoading(true);
      const newMessages: Message[] = [...messages, { role: 'user', content: prompt }];
      setMessages(newMessages);
      checkChecklistCompletion(prompt);
      setPrompt('');

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages: newMessages, systemPrompt }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'An unknown error occurred');
        }

        const data = await response.json();
        const assistantMessage = data.choices[0].message.content;

        setMessages((prev) => [...prev, { role: 'assistant', content: assistantMessage }]);
        checkChecklistCompletion(assistantMessage);

        try {
          const newState: RateLimitStatus = {
            count: currentCount + 1,
            lastReset: Date.now(),
          };
          localStorage.setItem(rateLimitKey, JSON.stringify(newState));
          if (newState.count >= maxAttempts) {
            setRateLimited(true);
          }
        } catch (error) {
          console.error('Error saving rate limit state:', error);
        }
      } catch (error) {
        let errorMessage = "I apologize, but I'm having trouble connecting to the AI service.";

        if (error instanceof Error) {
          if (error.message.includes('API key')) {
            errorMessage = 'API key error: ' + error.message;
          } else if (error.message.includes('network')) {
            errorMessage = 'Network error: Unable to connect to the server. Please check your internet connection.';
          } else {
            errorMessage = error.message || errorMessage;
          }
        }

        setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${errorMessage}` }]);
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
                <li
                  key={index}
                  className={`flex items-center text-sm transition-colors ${
                    item.completed ? 'text-green-400' : 'text-gray-400'
                  }`}>
                  {item.completed ? (
                    <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  ) : (
                    <CircleIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                  )}
                  <span className={item.completed ? 'line-through' : ''}>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-4 mb-4">
          {messages.map(
            (msg, index) =>
              msg.role !== 'system' && (
                <div key={index} className={`p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-900/50' : 'bg-gray-700/50'}`}>
                  <p className="text-white whitespace-pre-wrap">{msg.content}</p>
                </div>
              )
          )}
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
              aria-label="Send message">
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
  }
);

export default InlineChat;
