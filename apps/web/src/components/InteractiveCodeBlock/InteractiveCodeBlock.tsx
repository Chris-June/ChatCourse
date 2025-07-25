import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlayIcon, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

interface InteractiveCodeBlockProps {
  code: string;
  language: string;
}

export const InteractiveCodeBlock: React.FC<InteractiveCodeBlockProps> = ({ code, language }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    setError(null);

    try {
      const result = await api.post('/api/execute', { code, language });
      setOutput(result.output);
    } catch (err: any) {
      setError(err.message || 'Failed to execute code');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="code-block-container my-4 rounded-md border">
      <div className="code-header bg-muted text-muted-foreground flex items-center justify-between p-2 border-b">
        <span className="text-sm">{language}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRunCode}
          disabled={isRunning}
        >
          {isRunning ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <PlayIcon className="mr-2 h-4 w-4" />
          )}
          Run
        </Button>
      </div>
      <div className="code-content p-4 bg-background">
        <pre><code className={`language-${language}`}>{code}</code></pre>
      </div>
      {output && (
        <div className="output-container border-t p-4">
          <h4 className="text-sm font-semibold mb-2">Output:</h4>
          <pre className="text-sm bg-muted rounded-md p-2">{output}</pre>
        </div>
      )}
      {error && (
        <div className="error-container border-t p-4">
          <h4 className="text-sm font-semibold text-destructive mb-2">Error:</h4>
          <pre className="text-sm text-destructive bg-destructive/10 rounded-md p-2">{error}</pre>
        </div>
      )}
    </div>
  );
};