import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';

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
  const [submittedPrompt, setSubmittedPrompt] = useState('');

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
    <LessonTemplate
      moduleNumber={1}
      lessonNumber={2}
      title="1.2 The I.N.S.Y.N.C. Framework"
      subtitle="A structured approach to predictable results."
      quizQuestions={quizQuestions}
    >
      <section>
        <p className="text-gray-300 mb-4">
          Vague prompts lead to vague answers. To get high-quality, predictable results from an AI, you need to provide high-quality, structured input. The I.N.S.Y.N.C. framework is a mental model for building better prompts.
        </p>
        <div className="space-y-2">
          <Accordion title="I - Intent">The core goal or task. What, specifically, do you want the AI to do? (e.g., 'Write', 'Summarize', 'Translate', 'Generate code').</Accordion>
          <Accordion title="N - Nuance">The specific constraints, details, or rules. This is where you add negative constraints ('do not mention X') or specific details ('the deadline is Friday at 5 PM').</Accordion>
          <Accordion title="S - Style">The tone, format, or voice of the output. (e.g., 'Use a formal and encouraging tone', 'Format the output as a JSON object', 'Write in the style of a pirate').</Accordion>
          <Accordion title="Y - You-as-Narrative (Persona)">Define the AI's role or character. This is one of the most powerful ways to shape the output. (e.g., 'You are a senior software engineer', 'You are a helpful tutor').</Accordion>
          <Accordion title="C - Context">Provide relevant background information, examples, or data that the AI needs to complete the task successfully. (e.g., 'Here is the article to summarize: ...', 'My company's brand guidelines are...').</Accordion>
        </div>
      </section>

<<<<<<< HEAD
      <PromptBuilder onPromptSubmit={setSubmittedPrompt} />
      <InlineChat prompt={submittedPrompt} />
    </LessonTemplate>
=======
      <InteractiveInsync />

      <section>
        <ModuleQuizzes questions={quizQuestions} />
      </section>

      <LessonFooter 
        prevLessonPath="/instructions/module-1/1.1"
        prevLessonTitle="1.1: What is an AI, Really?"
        nextLessonPath="/instructions/module-1/1.3"
        nextLessonTitle="1.3: When AI Gets It Wrong (Hallucinations)"
        onNextClick={() => completeLesson(1, 2)}
      />
    </div>
>>>>>>> origin/main
  );
};

export default Lesson1_2;
