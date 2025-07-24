import React, { useState, useEffect, useCallback } from 'react';
import { Send, Loader, Sparkles, Clipboard, X, AlertCircle } from 'lucide-react';
import { useChatStore } from '../store/chat';

type RateLimitStatus = {
  count: number;
  lastReset: number;
};

interface InlineChatProps {
  className?: string;
  initialMessages?: { role: 'user' | 'assistant'; content: string }[];
  placeholder?: string;
  simulatedResponse?: string;
  systemPrompt?: string;
  moduleId?: string; // Unique identifier for rate limiting per module
  maxAttempts?: number; // Maximum number of attempts allowed
  promptTemplates?: Array<{
    title: string;
    description: string;
    template: string;
  }>;
}

const RATE_LIMIT_RESET_HOURS = 24; // Reset rate limit every 24 hours
const DEFAULT_MAX_ATTEMPTS = 10; // Default max attempts if not specified

const InlineChat: React.FC<InlineChatProps> = ({
  className,
  initialMessages = [],
  placeholder,
  simulatedResponse,
  systemPrompt,
  moduleId = 'default',
  maxAttempts = DEFAULT_MAX_ATTEMPTS
}) => {
  const apiKey = useChatStore((state) => state.apiKey);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<any[]>(initialMessages);
  const [feedbackText, setFeedbackText] = useState('');
  const [betterPrompt, setBetterPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingFeedback, setIsFetchingFeedback] = useState(false);
  const [attempts, setAttempts] = useState<number>(0);
  const [rateLimited, setRateLimited] = useState<boolean>(false);
  const [rateLimitResetTime, setRateLimitResetTime] = useState<Date | null>(null);

  // Load rate limit state from localStorage on component mount
  useEffect(() => {
    loadRateLimitState();
  }, [moduleId]);

  const loadRateLimitState = useCallback(() => {
    try {
      const rateLimitKey = `rateLimit_${moduleId}`;
      const savedState = localStorage.getItem(rateLimitKey);
      
      if (savedState) {
        const { count, lastReset } = JSON.parse(savedState) as RateLimitStatus;
        const now = Date.now();
        const hoursSinceReset = (now - lastReset) / (1000 * 60 * 60);
        
        if (hoursSinceReset >= RATE_LIMIT_RESET_HOURS) {
          // Reset rate limit if time has passed
          localStorage.removeItem(rateLimitKey);
          setAttempts(0);
          setRateLimited(false);
          setRateLimitResetTime(null);
        } else {
          setAttempts(count);
          setRateLimited(count >= maxAttempts);
          if (count >= maxAttempts) {
            const resetTime = new Date(lastReset + (RATE_LIMIT_RESET_HOURS * 60 * 60 * 1000));
            setRateLimitResetTime(resetTime);
          }
        }
      }
    } catch (error) {
      console.error('Error loading rate limit state:', error);
    }
  }, [moduleId, maxAttempts]);

  const updateRateLimit = useCallback((increment = true) => {
    try {
      const rateLimitKey = `rateLimit_${moduleId}`;
      const now = Date.now();
      let newCount = increment ? attempts + 1 : attempts;
      const isLimited = newCount >= maxAttempts;
      
      const newState: RateLimitStatus = {
        count: newCount,
        lastReset: now
      };
      
      localStorage.setItem(rateLimitKey, JSON.stringify(newState));
      
      setAttempts(newCount);
      setRateLimited(isLimited);
      
      if (isLimited) {
        const resetTime = new Date(now + (RATE_LIMIT_RESET_HOURS * 60 * 60 * 1000));
        setRateLimitResetTime(resetTime);
      }
      
      return !isLimited;
    } catch (error) {
      console.error('Error updating rate limit:', error);
      return true; // Allow submission if there's an error
    }
  }, [attempts, maxAttempts, moduleId]);

  const handleClear = () => {
    setPrompt('');
    setMessages(initialMessages);
    setFeedbackText('');
    setBetterPrompt('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading || rateLimited) return;

    // Check rate limit before proceeding
    if (attempts >= maxAttempts) {
      setRateLimited(true);
      return;
    }

    // Update rate limit
    const canProceed = updateRateLimit();
    if (!canProceed) {
      setRateLimited(true);
      return;
    }

    setIsLoading(true);
    setFeedbackText('');
    setBetterPrompt('');

    let newMessages: { role: 'user' | 'assistant' | 'system'; content: string }[] = [
      ...messages,
      { role: 'user', content: prompt },
    ];

    if (systemPrompt) {
      newMessages = [
        { role: 'system', content: systemPrompt },
        ...newMessages,
      ];
    }

    // If a simulated response is provided, use it and skip API calls
    if (simulatedResponse) {
      setMessages([...newMessages, { role: 'assistant', content: simulatedResponse }]);
      setIsLoading(false);
      return; // End execution here
    }

    setMessages([...newMessages, { role: 'assistant', content: '' }]);

    // Step 1: Get the primary response
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, apiKey }),
      });

      if (!res.body) throw new Error('Response body is null');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n\n');
        for (const line of lines) {
          if (line.startsWith('data:')) {
            const data = line.substring(5).trim();
            if (data === '[DONE]') break;
            try {
              const { delta } = JSON.parse(data);
              if (delta) {
                setMessages(prev => {
                  const lastMsgIndex = prev.length - 1;
                  const updatedMessages = [...prev];
                  updatedMessages[lastMsgIndex] = {
                    ...updatedMessages[lastMsgIndex],
                    content: updatedMessages[lastMsgIndex].content + delta,
                  };
                  return updatedMessages;
                });
              }
            } catch {}
          }
        }
      }
    } catch (error) {
      console.error('Error fetching chat response:', error);
      const errorMsg = 'Sorry, something went wrong. Please check the console for details.';
      setMessages(prev => [...prev.slice(0, -1), { role: 'assistant', content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }

    // Step 2: Get the prompt feedback
    setIsFetchingFeedback(true);
    const feedbackPrompt = `
      You are an expert prompt engineering tutor. Your goal is to help users improve their prompts based on best practices.
      
      **Task:**
      1. Analyze the user's prompt below (enclosed in ---)
      2. Provide structured feedback in the following format:
         - **Clarity** (1-5): [rating]/5 - [brief explanation]
         - **Specificity** (1-5): [rating]/5 - [brief explanation]
         - **Effectiveness** (1-5): [rating]/5 - [brief explanation]
         - **Overall Feedback**: [2-3 sentences of constructive feedback]
      
      **User's Prompt:**
      ---
      ${prompt}
      ---
      
      **Improved Prompt:**
      [Provide a significantly improved version of the user's prompt here. Make it specific, clear, and actionable. Include any necessary context or constraints that would make it more effective.]
      
      **Explanation of Improvements:**
      [Explain the key improvements made to the prompt and why they make it more effective. Focus on clarity, specificity, and how the improved prompt would yield better results.]
    `;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: feedbackPrompt }], model: 'gpt-4.1-nano', apiKey }),
      });

      if (!res.body) throw new Error('Response body is null');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n\n');
        for (const line of lines) {
          if (line.startsWith('data:')) {
            const data = line.substring(5).trim();
            if (data === '[DONE]') break;
            try {
              const { delta } = JSON.parse(data);
              if (delta) {
        setFeedbackText((prev) => prev + delta);
      }
            } catch {}
          }
        }
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setIsFetchingFeedback(false);
      setFeedbackText(prev => {
        const parts = prev.split('**Better Prompt:**');
        if (parts.length > 1) {
          setBetterPrompt(parts[1].trim());
          return parts[0].replace('**Prompt Feedback:**', '').trim();
        }
        return prev.replace('**Prompt Feedback:**', '').trim();
      });
    }
  };

  return (
    <div className={`bg-gray-900 p-4 rounded-lg border-2 border-dashed border-gray-600 space-y-4 ${className}`}>
      <h3 className="font-semibold text-white mb-2 flex items-center">Practice Your Prompting Skills</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {rateLimited && rateLimitResetTime && (
          <div className="flex items-center p-3 bg-yellow-900/50 border border-yellow-700 rounded-md text-yellow-300 text-sm">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            <span>
              You've reached the maximum of {maxAttempts} practice attempts for this module. 
              You can try again after {rateLimitResetTime.toLocaleTimeString()} on {rateLimitResetTime.toLocaleDateString()}.
            </span>
          </div>
        )}
        
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholder}
            className={`w-full p-3 bg-gray-800 border ${rateLimited ? 'border-red-700' : 'border-gray-700'} rounded-md text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none pr-16`}
            rows={4}
            disabled={isLoading || rateLimited}
          />
          {maxAttempts > 0 && (
            <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-gray-900/80 px-2 py-1 rounded">
              {maxAttempts - attempts} of {maxAttempts} attempts remaining
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading || !prompt.trim() || rateLimited}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
          title={rateLimited ? 'Daily attempt limit reached' : 'Submit your prompt'}
        >
          {isLoading ? (
            <><Loader className="w-5 h-5 mr-2 animate-spin" /> Sending...</>
          ) : rateLimited ? (
            <><X className="w-5 h-5 mr-2" /> Attempt Limit Reached</>
          ) : (
            <><Send className="w-5 h-5 mr-2" /> Get Response</>
          )}
        </button>
        <button
          type="button"
          onClick={handleClear}
          disabled={!prompt.trim() && messages.length === initialMessages.length}
          className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          <X className="w-5 h-5 mr-2" /> Clear
        </button>
      </form>
      {messages.map((msg, index) => (
        <div key={index} className={`p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-900/50' : 'bg-gray-700/50'}`}>
          <p className="text-white whitespace-pre-wrap">{msg.content}</p>
        </div>
      ))}
      {(isFetchingFeedback || feedbackText) && (
        <div className="bg-gray-800 p-4 rounded-md border border-gray-700 mt-4 space-y-4">
          {isFetchingFeedback && !feedbackText && (
            <div className="flex items-center text-sm text-gray-400">
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              <span>Generating detailed feedback on your prompt...</span>
            </div>
          )}
          
          {feedbackText && !isFetchingFeedback && (
            <div className="space-y-4">
              <div className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-yellow-400 flex-shrink-0" />
                <h4 className="font-semibold text-white">Detailed Prompt Analysis</h4>
              </div>
              
              {/* Parse and display the structured feedback */}
              <div className="text-sm text-gray-300 space-y-3">
                {feedbackText.split('\n').map((line, index) => {
                  // Format ratings with color coding
                  if (line.match(/\*\*.*\(\d\/5\)\*\*/)) {
                    const ratingMatch = line.match(/(\d)\/5/);
                    const rating = ratingMatch ? parseInt(ratingMatch[1]) : 0;
                    let ratingClass = 'text-red-400';
                    
                    if (rating > 3) ratingClass = 'text-green-400';
                    else if (rating > 2) ratingClass = 'text-yellow-400';
                    
                    return (
                      <div key={index} className="flex items-baseline">
                        <span className="font-medium text-gray-400 w-32 flex-shrink-0">
                          {line.split(':')[0].replace('**', '').trim()}:
                        </span>
                        <span className={ratingClass}>
                          {line.split(':').slice(1).join(':').trim()}
                        </span>
                      </div>
                    );
                  }
                  
                  // Format section headers
                  if (line.match(/\*\*.*\*\*/)) {
                    return (
                      <h5 key={index} className="font-semibold text-white mt-4 mb-2">
                        {line.replace(/\*\*/g, '')}
                      </h5>
                    );
                  }
                  
                  // Regular text
                  return <p key={index} className="text-gray-400">{line}</p>;
                })}
              </div>
            </div>
          )}
          
          {betterPrompt && !isFetchingFeedback && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-white">Improved Prompt</h4>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(betterPrompt);
                    // Optional: Add a toast notification here
                  }}
                  className="text-xs flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  aria-label="Copy improved prompt"
                >
                  <Clipboard className="w-3.5 h-3.5 mr-1" />
                  Copy
                </button>
              </div>
              <div className="bg-gray-900 p-3 rounded-md">
                <code className="text-sm text-cyan-300 font-mono whitespace-pre-wrap">{betterPrompt}</code>
              </div>
              
              <div className="mt-3 text-xs text-gray-500">
                <p>Attempts used: {attempts} of {maxAttempts}</p>
                {rateLimitResetTime && (
                  <p>Resets: {rateLimitResetTime.toLocaleString()}</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InlineChat;
