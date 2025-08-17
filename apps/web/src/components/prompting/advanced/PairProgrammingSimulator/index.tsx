import React, { useState } from 'react';
import { Code, RefreshCw, MessageSquare } from 'lucide-react';
import CopyButton from '../../../CopyButton';
import { API_BASE_URL } from '@/lib/api';

type Role = 'driver' | 'navigator';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const INITIAL_CODE = `// Welcome to Pair Programming Simulator!
// As the driver, you'll write code here.
// As the navigator, you'll provide instructions.

function greet(name) {
  // Your code here
}`;

/**
 * PairProgrammingSimulator
 * 
 * An interactive component that simulates pair programming with an AI.
 * Users can switch between driver (writing code) and navigator (giving instructions) roles.
 * 
 * @component
 * @example
 * return (
 *   <PairProgrammingSimulator />
 * )
 */
const PairProgrammingSimulator: React.FC = () => {
  const [role, setRole] = useState<Role>('driver');
  const [code, setCode] = useState(INITIAL_CODE);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Generate a unique ID for messages
  const generateId = () => Math.random().toString(36).substr(2, 9);

  // Get AI response from the backend API
  const getAiResponse = async (currentMessages: Message[]) => {
    setIsAiTyping(true);

    const response = await fetch(`${API_BASE_URL}/api/chat/pair-programming`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: currentMessages,
        role,
        code: role === 'driver' ? code : null,
        apiKey: localStorage.getItem('openai_api_key'),
      }),
    });

    if (!response.body) {
      setIsAiTyping(false);
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let fullResponse = '';
    let codeResponse = '';

    const aiMessageId = generateId();
    setMessages(prev => [...prev, { id: aiMessageId, role: 'ai', content: '', timestamp: new Date() }]);

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      const chunk = decoder.decode(value, { stream: true });
      
      // Simple parsing logic, assuming a separator
      // A more robust solution might use JSON streaming or SSE
      const parts = chunk.split('__CODE_SEPARATOR__');
      fullResponse += parts[0];
      if (parts.length > 1) {
        codeResponse += parts[1];
      }

      setMessages(prev => prev.map(msg => 
        msg.id === aiMessageId ? { ...msg, content: fullResponse } : msg
      ));

      if (codeResponse) {
        setCode(codeResponse);
      }
    }

    setIsAiTyping(false);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newMessage: Message = {
      id: generateId(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    
    // Get AI response
    getAiResponse([...messages, newMessage]);
  };

  const resetSimulation = () => {
    if (window.confirm('Are you sure you want to reset the simulation?')) {
      setCode(INITIAL_CODE);
      setMessages([]);
      setInput('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-x-2">
          <span className="text-sm font-medium text-gray-400">Role:</span>
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setRole('driver')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                role === 'driver'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Code className="w-4 h-4 mr-1 inline" />
              Driver (You Code)
            </button>
            <button
              type="button"
              onClick={() => setRole('navigator')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                role === 'navigator'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <MessageSquare className="w-4 h-4 mr-1 inline" />
              Navigator (AI Codes)
            </button>
          </div>
        </div>
        
        <button
          onClick={resetSimulation}
          className="inline-flex items-center px-3 py-1.5 text-sm text-gray-400 hover:text-white"
          title="Reset simulation"
        >
          <RefreshCw className="w-4 h-4 mr-1" />
          Reset
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-300">
              {role === 'driver' ? 'Your Code Editor' : 'AI-Generated Code'}
            </h3>
            <CopyButton textToCopy={code} />
          </div>
          <div className="relative
            after:absolute after:inset-0 after:bg-gradient-to-b after:from-transparent after:to-gray-900/80 after:pointer-events-none">
            <pre className="h-96 p-4 bg-gray-900 rounded-lg overflow-auto text-sm font-mono text-gray-300">
              <code>{code}</code>
            </pre>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-300">Conversation</h3>
          <div className="h-96 bg-gray-900 rounded-lg p-4 overflow-y-auto space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500 text-sm">
                {role === 'driver' 
                  ? 'Start coding! The AI will provide feedback and suggestions.'
                  : 'Provide instructions to the AI about what code you want it to write.'}
              </div>
            ) : (
              messages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-800 text-gray-200 rounded-bl-none'
                    }`}
                  >
                    <div className="text-xs text-gray-400 mb-1">
                      {msg.role === 'user' ? 'You' : 'AI'} • {msg.timestamp.toLocaleTimeString()}
                    </div>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              ))
            )}
            {isAiTyping && (
              <div className="flex items-center space-x-2 text-gray-500 text-sm">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                <span>AI is thinking...</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={role === 'driver' ? 'Ask for feedback on your code...' : 'Tell the AI what code to write...'}
              disabled={isAiTyping}
            />
            <button
              type="submit"
              disabled={!input.trim() || isAiTyping}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PairProgrammingSimulator;
