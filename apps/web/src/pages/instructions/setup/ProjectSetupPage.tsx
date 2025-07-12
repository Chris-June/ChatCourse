import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import { Copy, Check } from 'lucide-react';

import 'highlight.js/styles/github-dark.css';

// Define a type for the props of the code element
type CodeProps = {
  className?: string;
  children?: React.ReactNode;
};

// Custom component to add a header with a copy button to code blocks
const CustomPre: React.FC<React.ComponentProps<'pre'>> = ({ children }) => {
  const [copied, setCopied] = useState(false);

  const codeElement = React.Children.toArray(children)[0] as React.ReactElement<CodeProps>;

  if (codeElement && codeElement.props) {
    const language = codeElement.props.className?.replace('language-', '') || 'shell';
    const codeString = String(codeElement.props.children).replace(/\n$/, '');

    const handleCopy = () => {
      navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="code-block-container">
        <div className="code-block-header">
          <span className="code-block-language">{language}</span>
          <button onClick={handleCopy} className="copy-button" title="Copy to clipboard">
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span className="sr-only">{copied ? 'Copied!' : 'Copy code'}</span>
          </button>
        </div>
        <pre>{children}</pre>
      </div>
    );
  }

  return <pre>{children}</pre>;
};

const ProjectSetupPage: React.FC = () => {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch('/SETUP_GUIDE.md');
        if (!response.ok) {
          throw new Error(`Failed to fetch setup guide: ${response.statusText}`);
        }
        const text = await response.text();
        setMarkdown(text);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, []);

  if (loading) {
    return <div className="p-6 text-zinc-400">Loading setup guide...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-400">Error: {error}</div>;
  }

  return (
    <div className="setup-guide-container p-6">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          pre: CustomPre,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

export default ProjectSetupPage;