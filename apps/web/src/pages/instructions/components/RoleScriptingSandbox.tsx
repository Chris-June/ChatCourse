import { useState } from 'react';
import { Plus, Trash2, AlertCircle } from 'lucide-react';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const RoleScriptingSandbox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentRole, setCurrentRole] = useState<'system' | 'user' | 'assistant'>('system');
  const [currentContent, setCurrentContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAddMessage = () => {
    // Basic validation
    if (!currentContent.trim()) {
      setError('Content cannot be empty.');
      return;
    }
    if (currentRole === 'system' && messages.some(m => m.role === 'system')) {
      setError('Only one system message is allowed, typically at the start.');
      return;
    }
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === currentRole && currentRole !== 'assistant') {
        setError(`Cannot add two '${currentRole}' messages in a row.`);
        return;
    }

    setMessages([...messages, { role: currentRole, content: currentContent }]);
    setCurrentContent('');
    setError(null);
    // Suggest next logical role
    setCurrentRole(currentRole === 'user' ? 'assistant' : 'user');
  };

  return (
    <div className="p-4 bg-gray-900 rounded-lg border border-gray-700 mt-4">
      <h3 className="text-lg font-semibold text-white mb-2">Role-Based Scripting Sandbox</h3>
      <p className="text-sm text-gray-400 mb-4">Construct a conversation script below. The tool will provide feedback on common structural errors.</p>
      
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <select 
          value={currentRole}
          onChange={(e) => setCurrentRole(e.target.value as any)}
          className="bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="system">system</option>
          <option value="user">user</option>
          <option value="assistant">assistant</option>
        </select>
        <input 
          type="text"
          value={currentContent}
          onChange={(e) => setCurrentContent(e.target.value)}
          placeholder="Enter message content..."
          className="flex-grow bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button onClick={handleAddMessage} className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add
        </button>
      </div>

      {error && (
        <div className="flex items-center p-2 mb-4 text-sm text-red-400 bg-red-900/30 rounded-lg">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      <div className="bg-gray-800 p-4 rounded-md font-mono text-xs text-gray-200 min-h-[100px]">
        <pre className="whitespace-pre-wrap break-words">{JSON.stringify(messages, null, 2)}</pre>
      </div>

      <button onClick={() => { setMessages([]); setError(null); }} className="flex items-center justify-center mt-4 px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
        <Trash2 className="w-4 h-4 mr-2" />
        Reset
      </button>
    </div>
  );
};

export default RoleScriptingSandbox;
