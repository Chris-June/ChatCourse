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
    <div className="p-4 bg-card rounded-lg border mt-4">
      <h3 className="text-lg font-semibold text-foreground mb-2">Role-Based Scripting Sandbox</h3>
      <p className="text-sm text-muted-foreground mb-4">Construct a conversation script below. The tool will provide feedback on common structural errors.</p>
      
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <select 
          value={currentRole}
          onChange={(e) => setCurrentRole(e.target.value as any)}
          className="bg-background border rounded-md px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
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
          className="flex-grow bg-background border rounded-md px-3 py-2 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
        />
        <button onClick={handleAddMessage} className="flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-colors">
          <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
          Add
        </button>
      </div>

      {error && (
        <div className="flex items-center p-2 mb-4 text-sm text-red-400 bg-red-900/30 rounded-lg" role="alert" aria-live="polite">
          <AlertCircle className="w-5 h-5 mr-2" aria-hidden="true" />
          <span className="text-foreground">{error}</span>
        </div>
      )}

      <div className="bg-muted p-4 rounded-md font-mono text-xs text-foreground/90 min-h-[100px] border">
        <pre className="whitespace-pre-wrap break-words">{JSON.stringify(messages, null, 2)}</pre>
      </div>

      <button onClick={() => { setMessages([]); setError(null); }} className="flex items-center justify-center mt-4 px-3 py-1 text-sm bg-destructive text-destructive-foreground rounded-md hover:opacity-90 transition-colors">
        <Trash2 className="w-4 h-4 mr-2" aria-hidden="true" />
        Reset
      </button>
    </div>
  );
};

export default RoleScriptingSandbox;
