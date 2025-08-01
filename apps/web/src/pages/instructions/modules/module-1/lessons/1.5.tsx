import React, { useState } from 'react';
import { Lightbulb, Send } from 'lucide-react';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import InlineChat from '../../../../../components/InlineChat';
import KeyTakeaways from '../../../components/KeyTakeaways';

const Lesson1_5: React.FC = () => {
  const frameworkComponents = [
    { letter: 'I', name: 'Intent', description: 'The core goal. What do you want the AI to do?', example: 'Write a summary of the provided article.' },
    { letter: 'N', name: 'Nuance', description: 'Specific details and constraints. What to include or avoid.', example: 'The summary must be under 150 words and avoid technical jargon.' },
    { letter: 'S', name: 'Style', description: 'The desired tone and voice.', example: 'Use a professional and authoritative tone.' },
    { letter: 'Y', name: 'You as...', description: 'The persona or role for the AI.', example: 'Act as a senior editor for a scientific journal.' },
    { letter: 'N', name: 'Narrative Format', description: 'The structure of the output.', example: 'Format the output as a single paragraph.' },
    { letter: 'C', name: 'Context', description: 'Background information the AI needs.', example: 'The article is about quantum computing and the target audience is high school students.' },
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

  const [submittedPrompt, setSubmittedPrompt] = useState('');

  return (
    <LessonTemplate
      moduleNumber={1}
      lessonNumber={5}
      title="1.5: The I.N.S.Y.N.C. Framework"
      subtitle="A powerful, memorable system for building high-quality prompts."
      quizQuestions={quizQuestions}
    >
      <div className="space-y-8 text-gray-200">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
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

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
            <Lightbulb className="w-7 h-7 mr-3 text-blue-400" />
            The I.N.S.Y.N.C. Framework: Our Proprietary Structure for Success
          </h2>
          <p className="text-gray-300 mb-4">
            While a simple question can get a simple answer, complex tasks require a more structured approach. A well-structured prompt is the difference between a generic response and a masterpiece tailored perfectly to your needs.
          </p>
          <div className="bg-gray-900 p-4 rounded-lg border border-blue-500/50">
            <p className="text-lg text-center font-semibold text-blue-200">
              The I.N.S.Y.N.C. framework is a powerful, memorable system for building high-quality prompts by breaking them down into six clear components.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {frameworkComponents.map((item, index) => (
            <div key={index} className="bg-gray-800 p-5 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold text-blue-300"><span className="text-4xl font-black text-blue-500 mr-2">{item.letter}</span> - {item.name}</h3>
              <p className="text-gray-400 mt-1 ml-12">{item.description}</p>
              <p className="text-sm text-gray-500 mt-2 ml-12 italic"><strong>Example:</strong> "{item.example}"</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-green-300">Your Turn: Build a Prompt</h2>
          <p className="text-gray-300 mb-4">
            Now it's your turn to use the framework. Fill out the fields below to construct your own prompt and see what the AI creates. Try to be as specific as possible!
          </p>
          <PromptBuilder onPromptSubmit={setSubmittedPrompt} />
          {submittedPrompt && (
            <div className="mt-4">
              <InlineChat 
                moduleId="lesson-1.5-builder"
                systemPrompt="You are a helpful AI assistant. Execute the user's instructions exactly."
                initialMessages={[{ role: 'user', content: submittedPrompt }]}
                key={submittedPrompt} // Force re-render when prompt changes
              />
            </div>
          )}
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-green-300">Putting It All Together</h2>
          <p className="text-gray-300 mb-4">
            When you combine these elements, you create a comprehensive set of instructions that leaves no room for ambiguity. Let's see an example.
          </p>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h4 className="font-bold text-lg text-blue-300 mb-2">Interactive Example:</h4>
            <p className="text-gray-400 mb-4">This is a high-quality, structured prompt. Click send to see the excellent result it produces.</p>
            <InlineChat 
              moduleId="lesson-1.5-example"
              systemPrompt="You are a helpful AI assistant. Execute the user's instructions exactly."
              initialMessages={[{
                role: 'user',
                content: 'Act as an expert travel blogger. Write a short, exciting paragraph for a blog post about visiting Tokyo. Use an enthusiastic and adventurous tone. Mention the contrast between modern technology and ancient temples. Do not mention food. Format it as a single paragraph, approximately 100 words. The blog post is for young adults aged 18-25 who are interested in budget travel.'
              }]}
            />
          </div>
        </div>

        <KeyTakeaways
            points={[
              "A prompt is the instruction, question, or input you give to an AI.",
              "Clear and specific prompts lead to better quality responses.",
              "Providing a persona helps shape the AI's tone, style, and expertise.",
              "Prompt design is crucial for getting the AI to perform tasks effectively.",
          ]}
        />
      </div>
    </LessonTemplate>
  );
};

const PromptBuilder: React.FC<{ onPromptSubmit: (prompt: string) => void }> = ({ onPromptSubmit }) => {
  const [intent, setIntent] = useState('');
  const [nuance, setNuance] = useState('');
  const [style, setStyle] = useState('');
  const [youAs, setYouAs] = useState('');
  const [narrativeFormat, setNarrativeFormat] = useState('');
  const [context, setContext] = useState('');

  const constructPrompt = () => {
    let prompt = '';
    if (youAs) prompt += `[YOU AS...]: ${youAs}\n`;
    if (intent) prompt += `[INTENT]: ${intent}\n`;
    if (style) prompt += `[STYLE]: ${style}\n`;
    if (nuance) prompt += `[NUANCE]: ${nuance}\n`;
    if (narrativeFormat) prompt += `[NARRATIVE FORMAT]: ${narrativeFormat}\n`;
    if (context) prompt += `[CONTEXT]: ${context}`;
    return prompt.trim();
  };

  const handleSubmit = () => {
    const prompt = constructPrompt();
    if (prompt) {
      onPromptSubmit(prompt);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">I - Intent</label>
          <input type="text" value={intent} onChange={e => setIntent(e.target.value)} className="w-full bg-gray-700 rounded p-2 text-white" placeholder="e.g., Write an email..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">N - Nuance</label>
          <input type="text" value={nuance} onChange={e => setNuance(e.target.value)} className="w-full bg-gray-700 rounded p-2 text-white" placeholder="e.g., Max 100 words..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">S - Style</label>
          <input type="text" value={style} onChange={e => setStyle(e.target.value)} className="w-full bg-gray-700 rounded p-2 text-white" placeholder="e.g., Formal tone..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Y - You as...</label>
          <input type="text" value={youAs} onChange={e => setYouAs(e.target.value)} className="w-full bg-gray-700 rounded p-2 text-white" placeholder="e.g., Act as a pirate..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">N - Narrative Format</label>
          <input type="text" value={narrativeFormat} onChange={e => setNarrativeFormat(e.target.value)} className="w-full bg-gray-700 rounded p-2 text-white" placeholder="e.g., A bulleted list..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">C - Context</label>
          <input type="text" value={context} onChange={e => setContext(e.target.value)} className="w-full bg-gray-700 rounded p-2 text-white" placeholder="e.g., The project is due..." />
        </div>
      </div>
      <button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
        <Send className="w-4 h-4 mr-2" /> Construct & Test Prompt
      </button>
    </div>
  );
};

export default Lesson1_5;
