import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

const challengeConversation = [
  { speaker: 'You', text: 'I need to create a logo for my new coffee shop, "The Daily Grind".' },
  { speaker: 'AI', text: 'Great! What\'s the general vibe you\'re going for? Modern, rustic, minimalist?' },
  { speaker: 'You', text: 'Definitely rustic. I want it to feel warm and handmade.' },
  { speaker: 'AI', text: 'Understood. Rustic and warm. Should it include any specific imagery, like a coffee bean or a mug?' },
];

const idealSummary = "Recap: We are designing a logo for my coffee shop, 'The Daily Grind'. The key requirements are a rustic, warm, and handmade feel. We are currently deciding on specific imagery.";

const SummarizationChallenge: React.FC = () => {
  const [userSummary, setUserSummary] = useState('');
  const [showIdeal, setShowIdeal] = useState(false);

  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
      <h3 className="font-semibold text-white mb-2">Challenge: Write a Summary</h3>
      <div className="space-y-2 mb-4">
        {challengeConversation.map((msg, index) => (
          <p key={index} className={`p-2 rounded-md text-sm ${msg.speaker === 'You' ? 'bg-gray-700' : 'bg-gray-600'}`}>
            <strong className={msg.speaker === 'You' ? 'text-cyan-400' : 'text-purple-400'}>{msg.speaker}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <textarea
        value={userSummary}
        onChange={(e) => setUserSummary(e.target.value)}
        className="w-full bg-gray-800 text-white p-2 rounded-md border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder="Your summary prompt here... e.g., 'Okay, let's recap...'"
        rows={3}
      />
      <button
        onClick={() => setShowIdeal(true)}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
      >
        Compare with Ideal Summary
      </button>

      {showIdeal && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-blue-900/30 rounded-lg border border-blue-700"
        >
          <h4 className="font-semibold text-blue-200 mb-2 flex items-center">
            <Lightbulb className="w-5 h-5 mr-2" />
            Ideal Summary
          </h4>
          <p className="text-blue-200">{idealSummary}</p>
        </motion.div>
      )}
    </div>
  );
};

export default SummarizationChallenge;
