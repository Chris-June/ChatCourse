import { FC, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, CheckCheck, Play, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// List of languages that can be executed by the backend.
// This prevents showing the 'Run' button for non-executable languages like 'html' or 'css'.
const EXECUTABLE_LANGUAGES = ['javascript', 'python', 'js', 'py', 'typescript', 'ts'];

const CodeBlock: FC<CodeBlockProps> = ({ inline, className, children }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1].toLowerCase() : '';
  const code = String(children || '').replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRunCode = async () => {
    if (!language) return;
    setIsRunning(true);
    setOutput(null);
    setError(null);

    try {
      const result = await api.post<{ output: string }>('/api/execute', { code, language });
      setOutput(result.output);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to execute code';
      setError(message);
    } finally {
      setIsRunning(false);
    }
  };

  if (inline) {
    return <code className={className}>{children}</code>;
  }

  const isExecutable = EXECUTABLE_LANGUAGES.includes(language);

  return (
    <div className="code-block-container my-4 rounded-md border bg-[#3a404d] font-sans text-sm">
      <div className="flex items-center justify-between px-4 py-2 border-b border-b-black/20">
        <span className="text-xs text-gray-200 lowercase">{language || 'text'}</span>
        <div className="flex items-center gap-3">
          {isExecutable && (
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="flex items-center gap-1.5 text-xs text-gray-200 hover:text-white transition-colors disabled:opacity-50"
            >
              {isRunning ? (
                <><Loader2 size={14} className="animate-spin" /> Running...</>
              ) : (
                <><Play size={14} /> Run</>
              )}
            </button>
          )}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-gray-200 hover:text-white transition-colors"
          >
            {isCopied ? (
              <><CheckCheck size={14} /> Copied!</>
            ) : (
              <><Copy size={14} /> Copy code</>
            )}
          </button>
        </div>
      </div>
      <SyntaxHighlighter
        style={atomDark}
        language={language}
        PreTag="div"
        customStyle={{ margin: 0, borderRadius: '0 0 0.375rem 0.375rem', background: 'transparent' }}
      >
        {code}
      </SyntaxHighlighter>
      {output && (
        <div className="output-container border-t border-t-black/20 p-4">
          <h4 className="text-xs font-semibold mb-2 text-gray-200">Output:</h4>
          <pre className="text-xs bg-black/20 rounded-md p-2 text-white whitespace-pre-wrap">{output}</pre>
        </div>
      )}
      {error && (
        <div className="error-container border-t border-t-black/20 p-4">
          <h4 className="text-xs font-semibold text-red-400 mb-2">Error:</h4>
          <pre className="text-xs bg-red-900/50 rounded-md p-2 text-white whitespace-pre-wrap">{error}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeBlock;
