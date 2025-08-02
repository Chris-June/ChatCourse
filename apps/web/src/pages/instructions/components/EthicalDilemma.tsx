import { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';

interface Feedback {
  title: string;
  text: string;
  style: string;
}

const feedbacks: Record<string, Feedback> = {
  A: {
    title: 'The Profit-Driven Approach',
    text: 'This is a common business stance, but it risks long-term user trust. Regulatory bodies are increasingly scrutinizing such practices, and negative public perception can be costly.',
    style: 'bg-yellow-900/30 border-yellow-700/50 text-yellow-300',
  },
  B: {
    title: 'The Empathetic Safeguard',
    text: 'This approach prioritizes user well-being and builds brand loyalty. It\'s a hallmark of responsible AI development, though it may slightly reduce short-term conversion rates.',
    style: 'bg-green-900/30 border-green-700/50 text-green-300',
  },
  C: {
    title: 'The Neutral Stance',
    text: 'While seemingly fair, this approach places the burden entirely on the user. Many argue that platforms have a responsibility to protect vulnerable users, not just provide tools.',
    style: 'bg-blue-900/30 border-blue-700/50 text-blue-300',
  },
};

const EthicalDilemma = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <Card className="mt-6 bg-gray-900 border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="flex items-center text-xl text-white">
          <Scale className="w-6 h-6 mr-3 text-red-400" />
          'What Would You Do?' Ethical Dilemma
        </CardTitle>
        <CardDescription className="text-gray-400">
          Personalization is powerful, but it can be a double-edged sword. Consider the following scenario.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-gray-800/50 rounded-lg mb-4">
          <p className="text-gray-300">
            An e-commerce site's new AI personal shopper has access to a user's purchase history, browsing habits, and even sentiment from chat logs. It identifies a user who frequently makes impulsive purchases late at night, especially when their chat messages indicate they feel stressed. The AI is now perfectly capable of pushing 'limited time offers' for high-margin items to this user at the exact moment they are most vulnerable.
          </p>
        </div>

        <h4 className="font-semibold text-white mb-3">As the lead developer, what do you do?</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-auto whitespace-normal justify-start p-4 border-gray-600 hover:bg-gray-700" onClick={() => setSelectedOption('A')}>
            <strong>A:</strong> Maximize engagement. The AI is doing its job by personalizing offers. It's the user's responsibility to manage their own spending.
          </Button>
          <Button variant="outline" className="h-auto whitespace-normal justify-start p-4 border-gray-600 hover:bg-gray-700" onClick={() => setSelectedOption('B')}>
            <strong>B:</strong> Implement safeguards. Program the AI to recognize signs of distress and avoid sending promotional content during these times, perhaps offering a 'cool-down' period instead.
          </Button>
          <Button variant="outline" className="h-auto whitespace-normal justify-start p-4 border-gray-600 hover:bg-gray-700" onClick={() => setSelectedOption('C')}>
            <strong>C:</strong> Provide opt-outs. Don't change the AI's core logic, but add a complex settings page where users can manually disable this type of targeting if they can find it.
          </Button>
        </div>

        {selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-4 rounded-lg ${feedbacks[selectedOption].style}`}>
            <h5 className="font-bold mb-2">{feedbacks[selectedOption].title}</h5>
            <p>{feedbacks[selectedOption].text}</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default EthicalDilemma;
