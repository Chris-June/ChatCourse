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
    <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-blue-300">A Practical Example</h2>
        <div className="flex items-center space-x-2 bg-gray-900 p-1 rounded-lg">
          <button 
            onClick={() => setShowFailureCase(false)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${!showFailureCase ? 'bg-green-600 text-white' : 'bg-transparent text-gray-300 hover:bg-gray-700'}`}>
              Success
          </button>
          <button 
            onClick={() => setShowFailureCase(true)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${showFailureCase ? 'bg-red-600 text-white' : 'bg-transparent text-gray-300 hover:bg-gray-700'}`}>
              Failure
          </button>
        </div>
      </div>
      <div className="bg-gray-900 p-4 rounded-lg">
          <p className="text-gray-400 mb-3">Imagine this conversation flow:</p>
          <div className="space-y-3">
              {!showFailureCase && (
                <div className="relative">
                    <CopyButton textToCopy={conversation.user1} />
                    <p className="p-2 bg-gray-700 rounded-md pr-10"><strong className="text-cyan-400">You:</strong> {conversation.user1}</p>
                </div>
              )}
              {!showFailureCase && (
                <div className="relative">
                    <CopyButton textToCopy={conversation.ai1} />
                    <p className="p-2 bg-gray-700 rounded-md pr-10"><strong className="text-green-400">AI:</strong> {conversation.ai1}</p>
                </div>
              )}
              <div className="relative">
                  <CopyButton textToCopy={conversation.user2} />
                  <p className="p-2 bg-gray-700 rounded-md pr-10"><strong className="text-cyan-400">You:</strong> {conversation.user2}</p>
              </div>
              <div className="relative">
                  <CopyButton textToCopy={showFailureCase ? conversation.failureResponse : conversation.successResponse} />
                  <p className="p-2 bg-gray-700 rounded-md pr-10"><strong className="text-green-400">AI:</strong> {showFailureCase ? conversation.failureResponse : conversation.successResponse}</p>
              </div>
              {showFailureCase && (
                <div className="p-3 bg-red-900/30 border border-red-700 rounded-md">
                  <p className="text-red-300 text-sm">
                    <strong>AI:</strong> Sure I can help with that! What is the second one?
                  </p>
                </div>
              )}
          </div>
          <div className={`mt-4 p-3 rounded-lg border ${showFailureCase ? 'bg-red-900/30 border-red-700' : 'bg-blue-900/30 border-blue-700'}`}>
            <p className={`${showFailureCase ? 'text-red-200' : 'text-blue-200'} text-sm`}>
              <span className="font-bold">Key Insight:</span> 
              {showFailureCase 
                ? 'Because the first message was \'forgotten\' (out of context), the AI has no idea what "the second one" refers to and must ask for clarification.'
                : 'The AI knows "the second one" refers to scrambled eggs with spinach <strong>only because the previous turn is still in the context window.</strong>'
              }
            </p>
          </div>
      </div>
    </section>
  );
};

export default ContextExample;
