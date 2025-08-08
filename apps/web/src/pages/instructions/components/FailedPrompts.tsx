import { AlertTriangle } from 'lucide-react';

interface MessageBoxProps {
  role: string;
  content: string;
  bgColor: string;
}

const MessageBox = ({ role, content, bgColor }: MessageBoxProps) => (
  <div className={`p-2 rounded ${bgColor} font-mono text-xs`}>
    <span className="font-bold text-muted-foreground capitalize">{role}:</span>
    <p className="text-foreground whitespace-pre-wrap">{content}</p>
  </div>
);

const FailedPrompts = () => {
  return (
    <div className="p-4 bg-card text-card-foreground rounded-lg border mt-4">
      <h3 className="text-lg font-semibold mb-2">Real-World Failures: Role Mismanagement</h3>
      <p className="text-sm text-muted-foreground mb-4">Failure is a great teacher. These examples show how simple structural errors can confuse the AI.</p>
      <div className="space-y-4" role="group" aria-labelledby="failures-heading">

        <div>
          <h4 id="failures-heading" className="font-semibold text-destructive flex items-center mb-2"><AlertTriangle className="w-4 h-4 mr-2" aria-hidden="true" />Failure Case 1: The Confused Director</h4>
          <div className="space-y-2">
            <MessageBox role="system" content="What is the capital of Spain?" bgColor="bg-red-900/50" />
            <MessageBox role="user" content="You are a helpful travel agent." bgColor="bg-red-900/50" />
          </div>
          <p className="text-xs text-muted-foreground mt-2"><strong>Why it fails:</strong> The roles are inverted. The high-level instruction ('You are a helpful travel agent') belongs in the `system` role, while the specific question belongs in the `user` role. This script confuses the AI about its persona and its task.</p>
        </div>

        <div>
          <h4 className="font-semibold text-destructive flex items-center mb-2"><AlertTriangle className="w-4 h-4 mr-2" aria-hidden="true" />Failure Case 2: The AI Talks to Itself</h4>
          <div className="space-y-2">
            <MessageBox role="user" content="Suggest three names for a pet dog." bgColor="bg-muted" />
            <MessageBox role="assistant" content="Max, Buddy, Rocky." bgColor="bg-red-900/50" />
            <MessageBox role="assistant" content="Which one do you like best?" bgColor="bg-red-900/50" />
          </div>
          <p className="text-xs text-muted-foreground mt-2"><strong>Why it fails:</strong> The conversation history must alternate between `user` and `assistant`. Here, the AI appears to reply to its own message, breaking the conversational flow. The model expects the next message after its response to come from the `user`.</p>
        </div>

      </div>
    </div>
  );
};

export default FailedPrompts;
