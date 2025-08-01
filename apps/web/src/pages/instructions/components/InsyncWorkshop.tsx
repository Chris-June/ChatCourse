import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Sparkles, Clipboard, Check } from 'lucide-react';

const insyncFields = {
  intent: { label: 'Intent', placeholder: 'e.g., Create a 3-day travel itinerary for Tokyo' },
  nuance: { label: 'Nuance', placeholder: 'e.g., Focus on anime, technology, and temples. Budget is $150/day.' },
  style: { label: 'Style', placeholder: 'e.g., Write in an enthusiastic and friendly tone.' },
  youAsNarrative: { label: 'Persona', placeholder: 'e.g., Act as an expert local guide who has lived in Tokyo for 20 years.' },
  narrativeFormat: { label: 'Format', placeholder: 'e.g., A day-by-day schedule with morning, afternoon, and evening activities.' },
  context: { label: 'Context', placeholder: 'e.g., I am a solo traveler in my late 20s and enjoy photography.' },
};

type FieldKey = keyof typeof insyncFields;

const InsyncWorkshop: React.FC = () => {
  const [formState, setFormState] = useState<Record<FieldKey, string>>({ intent: '', nuance: '', style: '', youAsNarrative: '', narrativeFormat: '', context: '' });
  const [showOutput, setShowOutput] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name as FieldKey]: value }));
  };

  const fullPrompt = useMemo(() => {
    return (Object.keys(insyncFields) as FieldKey[])
      .map(key => formState[key] ? `[${insyncFields[key].label.toUpperCase()}]: ${formState[key]}` : '')
      .filter(Boolean)
      .join('\n');
  }, [formState]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-3 flex items-center"><Lightbulb className="w-6 h-6 mr-2 text-yellow-300"/>Build Your Prompt</h3>
          <div className="space-y-3">
            {(Object.keys(insyncFields) as FieldKey[]).map(key => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-300 mb-1">{insyncFields[key].label}</label>
                <textarea
                  name={key}
                  value={formState[key]}
                  onChange={handleInputChange}
                  placeholder={insyncFields[key].placeholder}
                  rows={2}
                  className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-200"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="sticky top-24 h-full">
          <h3 className="text-xl font-semibold text-white mb-3 flex items-center"><Sparkles className="w-6 h-6 mr-2 text-blue-300"/>Live Prompt Preview</h3>
          <div className="bg-gray-900 p-4 rounded-md h-full min-h-[300px] border border-gray-700 relative">
            <AnimatePresence>
              {fullPrompt ? (
                <motion.pre 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="whitespace-pre-wrap text-gray-300 text-sm font-mono">
                    {fullPrompt}
                </motion.pre>
              ) : (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-gray-500 text-center absolute inset-0 flex items-center justify-center">
                    Your prompt will appear here as you type.
                </motion.p>
              )}
            </AnimatePresence>
            {fullPrompt && (
              <button onClick={handleCopy} className="absolute top-2 right-2 p-1.5 bg-gray-700 hover:bg-gray-600 rounded-md">
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Clipboard className="w-5 h-5 text-gray-400" />}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 text-center">
        <button onClick={() => setShowOutput(true)} className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
          Generate Itinerary
        </button>
      </div>
      <AnimatePresence>
        {showOutput && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 bg-gray-900 p-6 rounded-lg border border-green-500/50 overflow-hidden">
            <h3 className="text-xl font-bold text-green-300">Example Output:</h3>
            <div className="prose prose-invert prose-sm mt-2 text-gray-300">
              <h4>Your Unforgettable 3-Day Tokyo Adventure!</h4>
              <p>Get ready for a whirlwind tour of Tokyo, blending futuristic marvels with serene traditions. Here’s a jam-packed itinerary perfect for a curious solo traveler!</p>
              <h5>Day 1: Modern Marvels & Electric Nights</h5>
              <ul>
                <li><strong>Morning:</strong> Dive into the digital art world at teamLab Borderless in Odaiba. A truly mind-bending experience for any photographer!</li>
                <li><strong>Afternoon:</strong> Explore the trendy streets of Harajuku, from the bustling Takeshita Street to the chic boutiques of Omotesando.</li>
                <li><strong>Evening:</strong> Witness the iconic Shibuya Crossing, the world's busiest intersection, then explore the vibrant nightlife and grab a bite in the area.</li>
              </ul>
              <h5>Day 2: Culture, Crafts & Calm</h5>
              <ul>
                <li><strong>Morning:</strong> Visit the historic Senso-ji Temple in Asakusa, Tokyo's oldest temple. A perfect spot for stunning photos.</li>
                <li><strong>Afternoon:</strong> Immerse yourself in anime and manga culture in Akihabara, the electric town. Explore multi-story arcades and shops.</li>
                <li><strong>Evening:</strong> Enjoy a relaxing evening in Ueno Park, perhaps visiting the Tokyo National Museum if time permits.</li>
              </ul>
              <h5>Day 3: Imperial Grandeur & Lasting Memories</h5>
              <ul>
                <li><strong>Morning:</strong> Stroll through the serene Meiji Jingu Shrine, dedicated to Emperor Meiji and Empress Shoken. A peaceful oasis in the city.</li>
                <li><strong>Afternoon:</strong> Explore the East Garden of the Imperial Palace, the former site of Edo Castle.</li>
                <li><strong>Evening:</strong> Enjoy a final panoramic view of the city from the Tokyo Metropolitan Government Building in Shinjuku—it's free!</li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InsyncWorkshop;
