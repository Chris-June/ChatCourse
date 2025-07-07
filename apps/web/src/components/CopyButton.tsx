import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@chat/ui';

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton = ({ textToCopy }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <Button
      onClick={handleCopy}
      variant="ghost"
      size="icon"
      className="absolute top-2 right-2 h-8 w-8"
    >
      {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
};

export default CopyButton;
