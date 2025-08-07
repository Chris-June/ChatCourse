import React, { useState } from 'react';
import CopyButton from '../../../components/CopyButton';

const ContextExample: React.FC = () => {
  const [showFailureCase, setShowFailureCase] = useState(false);

  const conversation = {
    user1: 'Give me three ideas for a healthy breakfast.',
    ai1: '1. Oatmeal with berries. 2. Scrambled eggs with spinach. 3. Greek yogurt with nuts.',
    user2: 'I like the second one. Can you give me a simple recipe?',
    successResponse: 'Of course! For simple scrambled eggs with spinach, you\'ll need 2 eggs, a handful of spinach, a splash of milk, and a pinch of salt and pepper. Just whisk the eggs and milk, wilt the spinach in a pan, then add the egg mixture and scramble to your liking.',
    failureResponse: 'I can help with that! Which of the three breakfast ideas are you referring to?'
  };

  return (
    <section className="bg-card p-6 rounded-xl border border-border shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-card-foreground">A Practical Example</h2>
        <div className="flex items-center space-x-2 bg-muted p-1 rounded-xl border border-border">
          <button 
            onClick={() => setShowFailureCase(false)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${!showFailureCase ? 'bg-primary text-primary-foreground' : 'bg-transparent text-muted-foreground hover:bg-muted'}`}>
              Success
          </button>
          <button 
            onClick={() => setShowFailureCase(true)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${showFailureCase ? 'bg-destructive text-destructive-foreground' : 'bg-transparent text-muted-foreground hover:bg-muted'}`}>
              Failure
          </button>
        </div>
      </div>
      <div className="bg-card p-4 rounded-xl border border-border">
          <p className="text-muted-foreground mb-3">Imagine this conversation flow:</p>
          <div className="space-y-3">
              {!showFailureCase && (
                <div className="relative">
                    <CopyButton textToCopy={conversation.user1} />
                    <p className="p-2 bg-muted rounded-md pr-10 text-foreground"><strong className="text-primary">You:</strong> {conversation.user1}</p>
                </div>
              )}
              {!showFailureCase && (
                <div className="relative">
                    <CopyButton textToCopy={conversation.ai1} />
                    <p className="p-2 bg-muted rounded-md pr-10 text-foreground"><strong className="text-success">AI:</strong> {conversation.ai1}</p>
                </div>
              )}
              <div className="relative">
                  <CopyButton textToCopy={conversation.user2} />
                  <p className="p-2 bg-muted rounded-md pr-10 text-foreground"><strong className="text-primary">You:</strong> {conversation.user2}</p>
              </div>
              <div className="relative">
                  <CopyButton textToCopy={showFailureCase ? conversation.failureResponse : conversation.successResponse} />
                  <p className="p-2 bg-muted rounded-md pr-10 text-foreground"><strong className="text-success">AI:</strong> {showFailureCase ? conversation.failureResponse : conversation.successResponse}</p>
              </div>
              {showFailureCase && (
                <div className="p-3 bg-destructive/10 border border-destructive rounded-xl">
                  <p className="text-destructive text-sm">
                    <strong>AI:</strong> Sure I can help with that! What is the second one?
                  </p>
                </div>
              )}
          </div>
          <div className={`${showFailureCase ? 'bg-destructive/10 border-destructive' : 'bg-primary/10 border-primary'} mt-4 p-3 rounded-xl border`}>
            <p className={`${showFailureCase ? 'text-destructive' : 'text-primary'} text-sm`}>
              <span className="font-bold">Key Insight:</span> 
              {showFailureCase 
                ? 'The AI has forgotten your earlier conversation because its "working memory" (the context window) became full. Just like a whiteboard that gets erased when full, the AI can no longer see your first message asking for breakfast ideas.'
                : 'The AI remembers your breakfast ideas because this conversation is short enough to fit in its working memory. All the important context is still "visible" to the AI.'
              }
            </p>
          </div>
      </div>
    </section>
  );
};

export default ContextExample;
