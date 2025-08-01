import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { useProgressStore } from '../../../../../store/progressStore';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

// Mock API call for chat response
const getMockResponse = (prompt: string): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`This is a mock response to your prompt: "${prompt.substring(0, 50)}..." It demonstrates how the AI would reply based on the I.N.S.Y.N.C. framework you provided.`);
    }, 1000);
  });
};

const PromptBuilder: React.FC<{ onPromptSubmit: (prompt: string) => void }> = ({ onPromptSubmit }) => {
  const [intent, setIntent] = useState('');
  const [nuance, setNuance] = useState('');
  const [style, setStyle] = useState('');
  const [youAsNarrative, setYouAsNarrative] = useState('');
  const [context, setContext] = useState('');

  const constructPrompt = () => {
    // A real implementation would be more sophisticated
    return `Intent: ${intent}\nNuance: ${nuance}\nStyle: ${style}\nYou-as-Narrative: ${youAsNarrative}\nContext: ${context}`;
  };

  const handleSubmit = () => {
    onPromptSubmit(constructPrompt());
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-4">
      <h3 className="text-xl font-semibold text-white">I.N.S.Y.N.C. Prompt Builder</h3>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">I - Intent (What do you want?)</label>
        <input type="text" value={intent} onChange={e => setIntent(e.target.value)} className="w-full bg-gray-700 rounded p-2 text-white" placeholder="e.g., Write an email to my team" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">N - Nuance (Add specific constraints or details)</label>
        <input type="text" value={nuance} onChange={e => setNuance(e.target.value)} className="w-full bg-gray-700 rounded p-2 text-white" placeholder="e.g., Announce the project deadline is Friday" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">S - Style (Define the tone or format)</label>
        <input type="text" value={style} onChange={e => setStyle(e.target.value)} className="w-full bg-gray-700 rounded p-2 text-white" placeholder="e.g., Formal and encouraging tone" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Y - You-as-Narrative (Define the AI's persona)</label>
        <input type="text" value={youAsNarrative} onChange={e => setYouAsNarrative(e.target.value)} className="w-full bg-gray-700 rounded p-2 text-white" placeholder="e.g., You are a project manager" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">C - Context (Provide background information)</label>
        <textarea value={context} onChange={e => setContext(e.target.value)} className="w-full bg-gray-700 rounded p-2 text-white" placeholder="e.g., The project is codenamed 'Phoenix'..."></textarea>
      </div>
      <button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
        <Send className="w-4 h-4 mr-2" /> Test This Prompt
      </button>
    </div>
  );
};

const InlineChat: React.FC<{ prompt: string }> = ({ prompt }) => {
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (prompt) {
      setIsLoading(true);
      getMockResponse(prompt).then(res => {
        setResponse(res);
        setIsLoading(false);
      });
    }
  }, [prompt]);

  if (!prompt) return null;

  return (
    <div className="mt-6 bg-gray-900 p-4 rounded-lg border border-gray-700">
      <h4 className="text-lg font-semibold text-gray-300 mb-2">AI Response</h4>
      {isLoading ? (
        <p className="text-gray-400">Generating response...</p>
      ) : (
        <p className="text-white whitespace-pre-wrap">{response}</p>
      )}
    </div>
  );
};

const Lesson1_2: React.FC = () => {
  const { completeLesson } = useProgressStore();
  const [submittedPrompt, setSubmittedPrompt] = useState('');

  useEffect(() => {
    completeLesson(1, 2);
  }, [completeLesson]);

  const quizQuestions = [
    {
      questionText: 'What does \'Intent\' in the I.N.S.Y.N.C. framework refer to?',
      options: [
        'The AI\'s hidden agenda',
        'The core goal or task you want the AI to accomplish',
        'The emotional tone of the prompt',
        'The background information for the prompt'
      ],
      correctAnswer: 'The core goal or task you want the AI to accomplish',
      explanation: 'Correct! Intent is the primary verb—the action you want the AI to take.'
    },
    {
      questionText: 'Which part of I.N.S.Y.N.C. would you use to tell the AI to act as a specific character?',
      options: ['Style', 'Nuance', 'You-as-Narrative', 'Context'],
      correctAnswer: 'You-as-Narrative',
      explanation: 'Exactly! You-as-Narrative sets the persona for the AI, like \'You are a helpful assistant\' or \'You are a skeptical pirate.\''
    }
  ];

  return (
    <div className="space-y-8 p-6 bg-gray-900 text-white">
      <header>
        <h1 className="text-4xl font-bold text-white mb-2">1.2 The I.N.S.Y.N.C. Framework</h1>
        <p className="text-lg text-gray-400">A structured approach to predictable results.</p>
      </header>

      <section>
        <p className="text-gray-300 mb-4">
          Vague prompts lead to vague answers. To get high-quality, predictable results from an AI, you need to provide high-quality, structured input. The I.N.S.Y.N.C. framework is a mental model for building better prompts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div className="bg-gray-800 p-4 rounded-lg"><b>I</b>ntent</div>
          <div className="bg-gray-800 p-4 rounded-lg"><b>N</b>uance</div>
          <div className="bg-gray-800 p-4 rounded-lg"><b>S</b>tyle</div>
          <div className="bg-gray-800 p-4 rounded-lg"><b>Y</b>ou-as-Narrative</div>
          <div className="bg-gray-800 p-4 rounded-lg col-span-1 md:col-span-2"><b>C</b>ontext</div>
        </div>
      </section>

      <PromptBuilder onPromptSubmit={setSubmittedPrompt} />
      <InlineChat prompt={submittedPrompt} />

      <section>
        <ModuleQuizzes questions={quizQuestions} />
      </section>

      <div className="flex justify-between pt-4">
        <Link to="/instructions/module-1/1.1" className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: What is an AI?
        </Link>
        <Link to="/instructions/module-1/1.3" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
          Next: When AI Gets It Wrong <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson1_2;
