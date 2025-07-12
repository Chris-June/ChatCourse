import React, { useState } from 'react';
import { Send, Loader, Sparkles, Clipboard, X } from 'lucide-react';
import { useChatStore } from '../store/chat';

interface InlineChatProps {
  className?: string;
  initialMessages?: { role: 'user' | 'assistant'; content: string }[];
  placeholder?: string;
  simulatedResponse?: string;
  systemPrompt?: string;
}

const InlineChat: React.FC<InlineChatProps> = ({ className, initialMessages = [], placeholder, simulatedResponse, systemPrompt }) => {
  const apiKey = useChatStore((state) => state.apiKey);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<any[]>(initialMessages);
  const [feedbackText, setFeedbackText] = useState('');
  const [betterPrompt, setBetterPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingFeedback, setIsFetchingFeedback] = useState(false);

  const handleClear = () => {
    setPrompt('');
    setMessages(initialMessages);
    setFeedbackText('');
    setBetterPrompt('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

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
      Analyze the following user's prompt surrounded by ---:
      ---
      ${prompt}
      ---
      First, provide a short, helpful, and encouraging feedback in a single paragraph. Start with a bolded "**Prompt Feedback:**". Do not repeat the user's prompt.
      Second, provide an improved version of the prompt that a user could use. Start this on a new line, bolded "**Better Prompt:**". This prompt should be a concrete example that is ready to be used.
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
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
          rows={4}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <><Loader className="w-5 h-5 mr-2 animate-spin" /> Sending...</>
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
              <span>Generating feedback on your prompt...</span>
            </div>
          )}
          {feedbackText && !isFetchingFeedback && (
            <div>
              <h4 className="font-semibold text-white flex items-center mb-2">
                <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
                Prompt Feedback
              </h4>
              <p className="text-sm text-gray-400 whitespace-pre-wrap">{feedbackText}</p>
            </div>
          )}
          {betterPrompt && !isFetchingFeedback && (
            <div>
              <h4 className="font-semibold text-white mb-2">Suggested Prompt:</h4>
              <div className="bg-gray-900 p-3 rounded-md flex items-center justify-between">
                <code className="text-sm text-cyan-300 font-mono break-all">{betterPrompt}</code>
                <button 
                  onClick={() => navigator.clipboard.writeText(betterPrompt)}
                  className="p-2 rounded-md hover:bg-gray-700 transition-colors"
                  aria-label="Copy suggested prompt"
                >
                  <Clipboard className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InlineChat;
