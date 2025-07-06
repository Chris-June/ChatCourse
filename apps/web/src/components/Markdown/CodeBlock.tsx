import { FC, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, CheckCheck } from 'lucide-react';

interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const CodeBlock: FC<CodeBlockProps> = ({ inline, className, children }) => {
  const [isCopied, setIsCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const code = String(children || '').replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (inline || !match) {
    return <code className={className}>{children}</code>;
  }

  return (
    <div className="relative text-sm bg-[#3a404d] rounded-md font-sans">
      <div className="flex items-center justify-between px-4 py-2 border-b border-b-black/20">
        <span className="text-xs text-gray-200 lowercase">{match[1]}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-gray-200 hover:text-white transition-colors"
        >
          {isCopied ? (
            <>
              <CheckCheck size={14} /> Copied!
            </>
          ) : (
            <>
              <Copy size={14} /> Copy code
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        style={atomDark}
        language={match[1]}
        PreTag="div"
        customStyle={{ margin: 0, borderRadius: '0 0 0.375rem 0.375rem', background: 'transparent' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
