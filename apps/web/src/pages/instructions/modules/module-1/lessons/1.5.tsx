import React, { useState } from 'react';
import { Lightbulb, Send } from 'lucide-react';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import { useChatStore } from '@/store/chat';
import KeyTakeaways from '../../../components/KeyTakeaways';
import PredictTheNextToken from '@/pages/instructions/components/PredictTheNextToken';

const Lesson1_5: React.FC = () => {
  const apiKey = useChatStore(state => state.apiKey);
  // State for the prompt builder inputs
  const [promptParts, setPromptParts] = useState({
    intent: '',
    nuance: '',
    style: '',
    youAs: '',
    narrativeFormat: '',
    context: '',
  });

  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPromptParts(prev => ({ ...prev, [name]: value }));
  };

  const handleEvaluatePrompt = async () => {
    setIsLoading(true);
    setEvaluationResult(null);

    if (!apiKey) {
      setEvaluationResult({ error: 'OpenAI API Key not found. Please set it in the settings panel.' });
      setIsLoading(false);
      return;
    }

    const constructedPrompt = Object.values(promptParts).filter(p => p.trim() !== '').join(' \n\n');

    if (!constructedPrompt) {
      setEvaluationResult({ error: 'Please fill out at least one part of the prompt to evaluate.' });
      setIsLoading(false);
      return;
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL || ''}/api/chat/grade-prompt`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ prompt: constructedPrompt }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      setEvaluationResult(data);
    } catch (error) {
      console.error('Failed to evaluate prompt:', error);
      setEvaluationResult({ error: error instanceof Error ? error.message : 'An unknown error occurred.' });
    } finally {
      setIsLoading(false);
    }
  };

  const frameworkComponents = [
    { letter: 'I', name: 'Intent', description: 'The core goal. What do you want the AI to do?', examples: ['Write a summary of the provided article.', 'Generate 5 creative names for a new coffee shop.', 'Translate this English sentence to French.'] },
    { letter: 'N', name: 'Nuance', description: 'Specific details and constraints. What to include or avoid.', examples: ['The summary must be under 150 words and avoid technical jargon.', 'The names should be modern and appeal to a young, urban audience.', 'The translation must be formal and suitable for a business contract.'] },
    { letter: 'S', name: 'Style', description: 'The desired tone and voice.', examples: ['Use a professional and authoritative tone.', 'The names should be playful and witty.', 'Adopt a friendly and conversational tone.'] },
    { letter: 'Y', name: 'You as...', description: 'The persona or role for the AI.', examples: ['Act as a senior editor for a scientific journal.', 'You are a branding expert specializing in catchy, modern names.', 'You are a professional translator with expertise in legal documents.'] },
    { letter: 'N', name: 'Narrative Format', description: 'The structure of the output.', examples: ['Format the output as a single paragraph.', 'Provide the names as a numbered list, each with a brief explanation.', 'Present the translation in a table with English and French side-by-side.'] },
    { letter: 'C', name: 'Context', description: 'Background information the AI needs.', examples: ['The article is about quantum computing for high school students.', 'The coffee shop is in a trendy neighborhood and will serve specialty single-origin coffees.', 'The sentence is part of a binding legal agreement between two companies.'] },
  ];

  const quizQuestions = [
    {
      questionText: 'Which I.N.S.Y.N.C. element defines the persona or role for the AI?',
      options: ['Style', 'Intent', 'You as...', 'Context'],
      correctAnswer: 'You as...',
      explanation: 'The \'You as...\' element is where you tell the AI who to be, like \'Act as an expert historian\' or \'You are a friendly tour guide\'.'
    },
    {
      questionText: 'Telling the AI to format its response as a JSON object falls under which category?',
      options: ['Nuance', 'Narrative Format', 'Style', 'Intent'],
      correctAnswer: 'Narrative Format',
      explanation: 'Narrative Format dictates the structure of the output, whether it\'s a list, table, JSON, or a simple paragraph.'
    },
    {
      questionText: 'Why is providing Context important in a prompt?',
      options: [
        'It makes the prompt longer.',
        'It gives the AI the necessary background information to complete the task accurately.',
        'It tells the AI what tone to use.',
        'It\'s only for creative writing prompts.'
      ],
      correctAnswer: 'It gives the AI the necessary background information to complete the task accurately.',
      explanation: 'Without proper context, the AI is guessing. Providing background ensures the response is relevant and tailored to your specific situation.'
    },
    {
      questionText: 'What is the primary purpose of the \'Intent\' element?',
      options: [
        'To specify the tone of voice.',
        'To define the core goal or task for the AI.',
        'To provide background information.',
        'To set the output structure.'
      ],
      correctAnswer: 'To define the core goal or task for the AI.',
      explanation: 'Intent is all about clearly stating what you want the AI to DO—whether that\'s writing, summarizing, translating, or coding.'
    },
    {
      questionText: 'If you ask the AI to \'write in a witty and sarcastic tone,\' which element are you defining?',
      options: ['Nuance', 'Style', 'Intent', 'Context'],
      correctAnswer: 'Style',
      explanation: 'Style refers to the personality, voice, and tone of the response. Nuance is about specific constraints like word count or what to include/exclude.'
    }
  ];

  const constructedPrompt = Object.values(promptParts).filter(p => p.trim() !== '').join(' \n\n');

  return (
    <LessonTemplate
      moduleNumber={1}
      lessonNumber={5}
      title="The I.N.S.Y.N.C. Framework"
      subtitle="A powerful, memorable system for building high-quality prompts."
      quizQuestions={quizQuestions}
    >
      <div className="space-y-8 text-gray-200">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-purple-300 flex items-center">
            <Lightbulb className="w-7 h-7 mr-3 text-purple-400" />
            Common Prompting Frameworks
          </h2>
          <p className="text-gray-300 mb-6">
            Before diving into our proprietary I.N.S.Y.N.C. method, it's useful to understand a few other popular frameworks. These can help structure your thoughts, especially for common tasks.
          </p>
          <div className="space-y-6">
            {[
              {
                name: 'C.R.A.F.T.',
                useWhen: 'You want a well-rounded response with structure, tone, and clear action.',
                points: [
                  { letter: 'Context', description: 'What background should the AI know?' },
                  { letter: 'Role', description: 'Who should the AI pretend to be?' },
                  { letter: 'Action', description: 'What task should it perform?' },
                  { letter: 'Format', description: 'How should the output be structured?' },
                  { letter: 'Tone', description: 'What tone or voice should it use?' },
                ],
              },
              {
                name: 'P.A.R.A.M.',
                useWhen: 'You need parameterized output, like for structured data, reports, or summaries.',
                points: [
                  { letter: 'Purpose', description: 'Define the overarching reason or use-case.' },
                  { letter: 'Audience', description: 'Who is this for? Tailor output accordingly.' },
                  { letter: 'Requirements', description: 'Specifics, constraints, dos and don’ts.' },
                  { letter: 'Assets', description: 'What reference material should it use?' },
                  { letter: 'Mode', description: 'Preferred delivery style: list, narrative, etc.' },
                ],
              },
              {
                name: 'R.E.A.C.T.',
                useWhen: 'You want the AI to think step-by-step or simulate decision-making.',
                points: [
                  { letter: 'Reason', description: 'Encourage reasoning before responding.' },
                  { letter: 'Execution', description: 'Carry out actions or sub-tasks logically.' },
                  { letter: 'Action', description: 'Explicitly perform tasks or respond.' },
                  { letter: 'Check', description: 'Evaluate or reflect on the output.' },
                  { letter: 'Tool', description: 'Use tools, functions, or retrieval if available.' },
                ],
              },
              {
                name: 'G.R.A.S.P.',
                useWhen: 'You’re exploring or brainstorming and want depth + variety.',
                points: [
                  { letter: 'Goal', description: 'What’s the big-picture outcome?' },
                  { letter: 'Research', description: 'Pull from known sources or simulate analysis.' },
                  { letter: 'Angles', description: 'Generate multiple perspectives or options.' },
                  { letter: 'Structure', description: 'Organize the results clearly.' },
                  { letter: 'Presentation', description: 'Refine for polish or delivery.' },
                ],
              },
              {
                name: 'S.O.A.R.',
                useWhen: 'You want reflective, coaching-style or problem-solving content.',
                points: [
                  { letter: 'Situation', description: 'Describe the current state or problem.' },
                  { letter: 'Obstacle', description: 'What’s standing in the way?' },
                  { letter: 'Action', description: 'Suggest clear, specific steps or strategies.' },
                  { letter: 'Result', description: 'Explain the outcome or expected impact.' },
                ],
              },
            ].map(fw => (
              <div key={fw.name} className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-purple-200">{fw.name}</h3>
                <p className="text-sm text-gray-400 italic mb-3"><b>Use When:</b> {fw.useWhen}</p>
                <ul className="space-y-1 text-gray-300">
                  {fw.points.map(p => (
                    <li key={p.letter}><strong>{p.letter[0]}</strong> - {p.description}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

  <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
            <Lightbulb className="w-7 h-7 mr-3 text-blue-400" />
            The I.N.S.Y.N.C. Framework: Our Proprietary Structure for Success
          </h2>
          <p className="text-gray-300 mb-4">
            While a simple question can get a simple answer, complex tasks require a more structured approach. A well-structured prompt is the difference between a generic response and a masterpiece tailored perfectly to your needs.
          </p>
    <div className="bg-gray-900 p-4 rounded-xl border border-blue-500/50">
            <p className="text-lg text-center font-semibold text-blue-200">
              The I.N.S.Y.N.C. framework is a powerful, memorable system for building high-quality prompts by breaking them down into six clear components.
            </p>
          </div>
        </div>

        <div className="space-y-4">
        {frameworkComponents.map((item, index) => (
          <div key={index} className="bg-gray-800 p-5 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold text-blue-300"><span className="text-4xl font-black text-blue-500 mr-2">{item.letter}</span> - {item.name}</h3>
              <p className="text-gray-400 mt-1 ml-12">{item.description}</p>
              <div className="mt-2 ml-12">
                <p className="text-sm text-gray-400 font-semibold">Examples:</p>
                <ul className="list-disc list-inside text-sm text-gray-500 italic mt-1 space-y-1">
                  {item.examples.map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div id="prompt-builder" className="mt-12 p-6 bg-gray-800/50 rounded-xl border border-gray-700">
          <h3 className="text-2xl font-bold text-indigo-300 mb-4">I.N.S.Y.N.C. Prompt Builder</h3>
          <p className="text-gray-400 mb-6">Use the fields below to construct a prompt piece-by-piece. When you're ready, evaluate it to see how the AI responds and get feedback on your prompt's quality.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {frameworkComponents.map(comp => (
              <div key={comp.name}>
                <label htmlFor={comp.name} className="block text-sm font-medium text-gray-300 mb-1">{comp.letter}: {comp.name}</label>
                <textarea
                  id={comp.name}
                  name={comp.name.toLowerCase().replace(' as...', 'As')}
                  rows={3}
                  value={promptParts[comp.name.toLowerCase().replace(' as...', 'As') as keyof typeof promptParts]}
                  onChange={handleInputChange}
                  className="w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm p-2 text-white focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder={comp.examples[0]}
                />
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={handleEvaluatePrompt}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isLoading ? <><Send className="animate-spin mr-2"/> Evaluating...</> : 'Build & Evaluate Prompt'}
            </button>
          </div>

          {evaluationResult && (
            <div className="mt-8 p-4 bg-gray-900 rounded-lg">
              <h4 className="text-xl font-bold text-green-300 mb-4">Evaluation Results</h4>
              <div>
                <h5 className="font-bold text-gray-300">Constructed Prompt:</h5>
                <p className="text-gray-400 whitespace-pre-wrap p-2 bg-gray-800 rounded-md">{constructedPrompt}</p>
              </div>
              <div className="mt-4">
                <h5 className="font-bold text-gray-300">AI Response:</h5>
                <p className="text-gray-400 p-2 bg-gray-800 rounded-md whitespace-pre-wrap">{evaluationResult.response}</p>
              </div>

              {evaluationResult.feedback && (
                <div className="mt-6">
                  <h5 className="font-bold text-gray-300 mb-3">I.N.S.Y.N.C. Feedback:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {Object.entries(evaluationResult.feedback).map(([key, value]: [string, any]) => (
                      <div key={key} className="bg-gray-800 p-3 rounded-lg">
                        <p className="font-bold capitalize text-indigo-300">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="text-gray-400 mt-1"><strong>Score:</strong> {value.score}/10</p>
                        <p className="text-gray-400 mt-1"><strong>Comment:</strong> {value.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {evaluationResult.error && (
                <div className="mt-4 p-3 bg-red-900/50 border border-red-500/50 rounded-lg">
                    <p className="text-red-300 font-bold">An Error Occurred</p>
                    <p className="text-red-400 text-sm mt-1">{evaluationResult.error}</p>
                </div>
              )}
            </div>
          )}

          {/* Interactive: Understand next-token prediction */}
          <section className="mt-10">
            <PredictTheNextToken />
          </section>
        </div>

        <KeyTakeaways
            points={[
              "The I.N.S.Y.N.C. framework provides a structured way to build high-quality prompts.",
              "Each element (Intent, Nuance, Style, You as..., Narrative Format, Context) plays a specific role.",
              "A well-structured prompt significantly increases the chances of getting the desired output.",
              "Iterating on each part of the framework can help you refine your prompts effectively.",
          ]}
        />
      </div>
    </LessonTemplate>
  );
};



export default Lesson1_5;
