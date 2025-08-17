import React, { useState } from 'react';
import { Lightbulb, Send, BookOpen, Layers, Link2, Braces, ListChecks, Sparkles, Gauge } from 'lucide-react';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import { useChatStore } from '@/store/chat';
import KeyTakeaways from '../../../components/KeyTakeaways';

// Types replacing explicit any usages
type FeedbackEntry = {
  score: number;
  comment: string;
};

type EvaluationResult = {
  response?: string;
  feedback?: Record<string, FeedbackEntry>;
  error?: string;
};

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

  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);
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

    // Resolve API URL robustly (support dev split ports)
    let url = '/api/chat/grade-prompt';
    if (process.env.NEXT_PUBLIC_API_URL) {
      url = `${process.env.NEXT_PUBLIC_API_URL}/api/chat/grade-prompt`;
    } else if (typeof window !== 'undefined') {
      const port = window.location.port;
      if (port === '3001') {
        url = 'http://localhost:3000/api/chat/grade-prompt';
      }
    }

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
        let detail = '';
        try {
          const maybeJson = await response.json();
          detail = typeof maybeJson?.error === 'string' ? maybeJson.error : JSON.stringify(maybeJson);
        } catch {
          detail = await response.text();
        }
        throw new Error(`API error: ${response.status} ${response.statusText} - ${detail}`);
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
    },
    {
      questionText: 'What is the primary focus of “Prompt Engineering”?',
      options: [
        'Designing the model architecture',
        'Crafting instructions, roles, and formats to steer outputs',
        'Fine‑tuning weights with new data',
        'Indexing documents for retrieval'
      ],
      correctAnswer: 'Crafting instructions, roles, and formats to steer outputs',
      explanation: 'Prompt engineering shapes how the model responds by constraining and guiding its next‑token probabilities.'
    },
    {
      questionText: 'What is the primary focus of “Context Engineering”?',
      options: [
        'Collecting, structuring, and supplying high‑signal information to the model',
        'Asking the model to imagine details',
        'Turning up the temperature for creativity',
        'Making prompts longer for completeness'
      ],
      correctAnswer: 'Collecting, structuring, and supplying high‑signal information to the model',
      explanation: 'Context engineering curates what the model sees so it has the right facts, constraints, and examples at the right time.'
    },
    {
      questionText: 'Which pairing best reduces hallucinations in this lesson’s scope?',
      options: [
        'Vague prompt + no context',
        'Structured prompt + rich, relevant context',
        'High temperature + short prompt',
        'Persona only + creative tone'
      ],
      correctAnswer: 'Structured prompt + rich, relevant context',
      explanation: 'Clear instructions plus high‑quality context narrows uncertainty and improves factuality.'
    },
    {
      questionText: 'Which INSYNC elements most directly act as context levers?',
      options: [
        'Intent and Style',
        'You‑as and Narrative Format',
        'Nuance and Context',
        'Send button and API key'
      ],
      correctAnswer: 'Nuance and Context',
      explanation: 'Nuance defines constraints/details; Context supplies background—the two strongest levers for context engineering.'
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
      <section className="mb-6 bg-muted/30 border border-muted rounded-xl p-4">
        <p className="text-xs text-muted-foreground mb-2">Estimated time: 10–14 minutes</p>
        <h4 className="text-sm font-semibold mb-2 text-foreground">What you'll learn</h4>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>How the I.N.S.Y.N.C. framework maps to real prompt parts</li>
          <li>Combining intent, nuance, style, persona, format, and context</li>
          <li>Assembling a complete prompt and evaluating it</li>
          <li>Interpreting AI feedback to refine a prompt</li>
        </ul>
      </section>
      <div className="space-y-8 text-foreground">
        <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="text-2xl font-semibold mb-4 text-card-foreground flex items-center">
            <Lightbulb className="w-6 h-6 mr-3 text-amber-400" />
            Common Prompting Frameworks
          </h2>
          <p className="text-muted-foreground mb-6">
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
              <div key={fw.name} className="bg-muted p-4 rounded-lg border border-border">
                <h3 className="text-xl font-bold text-card-foreground">{fw.name}</h3>
                <p className="text-sm text-muted-foreground italic mb-3"><b>Use When:</b> {fw.useWhen}</p>
                <ul className="space-y-1 text-muted-foreground">
                  {fw.points.map(p => (
                    <li key={p.letter}><strong>{p.letter[0]}</strong> - {p.description}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

  <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="text-2xl font-semibold mb-4 text-card-foreground flex items-center">
            <Lightbulb className="w-6 h-6 mr-3 text-amber-400" />
            The I.N.S.Y.N.C. Framework: Our Proprietary Structure for Success
          </h2>
          <p className="text-muted-foreground mb-4">
            While a simple question can get a simple answer, complex tasks require a more structured approach. A well-structured prompt is the difference between a generic response and a masterpiece tailored perfectly to your needs.
          </p>
    <div className="bg-muted p-4 rounded-xl border border-border">
            <p className="text-lg text-center font-semibold text-foreground">
              The I.N.S.Y.N.C. framework is a powerful, memorable system for building high-quality prompts by breaking them down into six clear components.
            </p>
          </div>
        </div>

        {/* Inserted: Context Engineering Content Blocks */}
        <div className="p-6 bg-card rounded-xl border mt-6">
          <h3 className="text-xl font-semibold text-card-foreground mb-2 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-indigo-400"/>
            Beyond Prompt Engineering: Context Engineering
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            <strong>Prompt engineering</strong> shapes <em>how</em> the model should respond (role, style, format). <strong>Context engineering</strong> shapes <em>what</em> the model sees (facts, constraints, examples). Together they determine the probability landscape the model samples from.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-md border p-4 bg-muted/30">
              <h4 className="text-sm font-semibold mb-1 flex items-center"><BookOpen className="w-4 h-4 mr-2"/> Prompt Engineering</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Role & tone (You‑as…)</li>
                <li>Task framing & acceptance criteria</li>
                <li>Output schemas & formatting</li>
                <li>Guardrails (ask 1 clarifying question, etc.)</li>
              </ul>
            </div>
            <div className="rounded-md border p-4 bg-muted/20">
              <h4 className="text-sm font-semibold mb-1 flex items-center"><Layers className="w-4 h-4 mr-2"/> Context Engineering</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Curate high‑signal facts & constraints</li>
                <li>Include few‑shot examples & counter‑examples</li>
                <li>Reference IDs, links, names, dates</li>
                <li>Minimize fluff to preserve token budget</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-6 bg-card rounded-xl border">
          <h3 className="text-xl font-semibold text-card-foreground mb-2 flex items-center"><Gauge className="w-5 h-5 mr-2"/> Why Context Quality Wins</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
            <li><strong>Relevance</strong>: Only what’s needed for the task at hand.</li>
            <li><strong>Recency</strong>: Prefer current details when time‑sensitive.</li>
            <li><strong>Reliability</strong>: Prefer primary sources and verifiable data.</li>
            <li><strong>Resolution</strong>: Specific names, IDs, and examples beat vague summaries.</li>
          </ul>
          <div className="rounded-md border p-3 bg-muted/40">
            <p className="text-xs text-muted-foreground">Rule of thumb: If a detail changes the output, it belongs in context. If it doesn’t, cut it.</p>
          </div>
        </div>

        <div className="p-6 bg-card rounded-xl border">
          <h3 className="text-xl font-semibold text-card-foreground mb-2 flex items-center"><Braces className="w-5 h-5 mr-2"/> Context Pack Template (Copy & Paste)</h3>
          <p className="text-sm text-muted-foreground mb-2">Paste a compact packet into the <em>Context</em> field of the builder:</p>
          <pre className="bg-muted text-muted-foreground p-3 rounded-md overflow-x-auto text-xs">
{`CONTEXT:\nproject: IntelliSync Onboarding Website\nobjective: Increase signups from local SMBs\nconstraints: tone=friendly, max_words=120, include CTA\ninputs:\n- audience: downtown professionals (25–45)\n- offer: free 30‑min consult\n- date: Sept 1 launch\nreferences:\n- url: https://intellisync.io/onboarding\n- contact: hello@intellisync.io\nexamples:\n- good_post: ">> sample copy here"\n- avoid: "corporate buzzwords"`}
          </pre>
          <p className="text-xs text-muted-foreground mt-2">Tight, atomic, verifiable. Use bullets, IDs, and links where helpful.</p>
        </div>

        <div className="p-6 bg-card rounded-xl border">
          <h3 className="text-xl font-semibold text-card-foreground mb-2 flex items-center"><ListChecks className="w-5 h-5 mr-2"/> Context Engineering Checklist</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Does the model have the <em>minimum sufficient</em> facts to answer?</li>
            <li>Are sources/IDs included for any critical claims?</li>
            <li>Did you include one good example and one anti‑example?</li>
            <li>Can you remove 20% of fluff without losing meaning?</li>
          </ul>
        </div>

        <div className="p-6 bg-muted/30 rounded-xl border">
          <h3 className="text-sm font-semibold mb-2">Pop Quiz (60s)</h3>
          <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
            <li>Rewrite your last prompt to separate <em>prompt</em> instructions from a <em>context pack</em>.</li>
            <li>Name two ways better context could reduce hallucinations.</li>
          </ol>
          <p className="text-xs text-muted-foreground mt-2">Tip: Ask the builder to grade your context on relevance, reliability, and resolution.</p>
        </div>

        <div className="space-y-4">
        {frameworkComponents.map((item, index) => (
          <div key={index} className="bg-muted p-5 rounded-xl border border-border">
              <h3 className="text-xl font-bold text-card-foreground"><span className="text-4xl font-black text-primary mr-2">{item.letter}</span> - {item.name}</h3>
              <p className="text-muted-foreground mt-1 ml-12">{item.description}</p>
              <div className="mt-2 ml-12">
                <p className="text-sm text-muted-foreground font-semibold">Examples:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground italic mt-1 space-y-1">
                  {item.examples.map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* INSYNC/Context mapping card */}
        <div className="p-4 bg-muted/20 rounded-md border mt-6">
          <h3 className="text-sm font-semibold mb-2 flex items-center"><Link2 className="w-4 h-4 mr-2"/> How I.N.S.Y.N.C. Powers Context</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li><strong>Intent</strong>: sharp task phrasing to bound scope.</li>
            <li><strong>Nuance</strong>: constraints, acceptance criteria, anti‑patterns.</li>
            <li><strong>Style</strong>: tone, vocabulary, audience alignment.</li>
            <li><strong>You‑as</strong>: domain lens/persona to adopt.</li>
            <li><strong>Narrative Format</strong>: schema that downstream tools can parse.</li>
            <li><strong>Context</strong>: facts, references, IDs, examples.</li>
          </ul>
        </div>

        <div id="prompt-builder" className="mt-12 p-6 bg-card rounded-xl border border-border">
          <h3 className="text-2xl font-bold text-card-foreground mb-4">I.N.S.Y.N.C. Prompt Builder</h3>
          <p className="text-muted-foreground mb-6">Use the fields below to construct a prompt piece-by-piece. When you're ready, evaluate it to see how the AI responds and get feedback on your prompt's quality.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {frameworkComponents.map(comp => (
              <div key={comp.name}>
                <label htmlFor={comp.name} className="block text-sm font-medium text-muted-foreground mb-1">{comp.letter}: {comp.name}</label>
                <textarea
                  id={comp.name}
                  name={comp.name.toLowerCase().replace(' as...', 'As')}
                  rows={3}
                  value={promptParts[comp.name.toLowerCase().replace(' as...', 'As') as keyof typeof promptParts]}
                  onChange={handleInputChange}
                  className="w-full bg-muted border border-input rounded-md p-2 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  placeholder={comp.examples[0]}
                />
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={handleEvaluatePrompt}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-6 py-3 rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <><Send className="animate-spin mr-2"/> Evaluating...</> : 'Build & Evaluate Prompt'}
            </button>
          </div>

          {evaluationResult && (
            <div className="mt-8 p-4 bg-card rounded-lg border border-border" role="status" aria-live="polite">
              <h4 className="text-xl font-bold text-card-foreground mb-4">Evaluation Results</h4>
              <div>
                <h5 className="font-bold text-muted-foreground">Constructed Prompt:</h5>
                <p className="text-foreground whitespace-pre-wrap p-2 bg-muted rounded-md border border-border">{constructedPrompt}</p>
              </div>
              <div className="mt-4">
                <h5 className="font-bold text-muted-foreground">AI Response:</h5>
                <p className="text-foreground p-2 bg-muted rounded-md whitespace-pre-wrap border border-border">{evaluationResult.response}</p>
              </div>

              {evaluationResult.feedback && (
                <div className="mt-6">
                  <h5 className="font-bold text-muted-foreground mb-3">I.N.S.Y.N.C. Feedback:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {Object.entries(evaluationResult.feedback).map(([key, value]: [string, FeedbackEntry]) => (
                      <div key={key} className="bg-muted p-3 rounded-lg border border-border">
                        <p className="font-bold capitalize text-muted-foreground">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="text-muted-foreground mt-1"><strong>Score:</strong> {value.score}/10</p>
                        <p className="text-muted-foreground mt-1"><strong>Comment:</strong> {value.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {evaluationResult.error && (
                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                    <p className="text-destructive font-bold">An Error Occurred</p>
                    <p className="text-destructive/80 text-sm mt-1">{evaluationResult.error}</p>
                </div>
              )}
            </div>
          )}

        </div>

        <section className="mt-6 bg-muted/30 border border-muted rounded-xl p-4">
          <h4 className="text-sm font-semibold mb-2 text-foreground">You can now…</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Use I.N.S.Y.N.C. to construct a clear, complete prompt</li>
            <li>Evaluate and iterate based on structured feedback</li>
            <li>Choose tone/persona and output format intentionally</li>
            <li>Differentiate prompt engineering from context engineering</li>
            <li>Assemble a compact, verifiable context pack for a task</li>
            <li>Use INSYNC as a context engine (Nuance + Context as primary levers)</li>
          </ul>
        </section>

        <KeyTakeaways
            points={[
              'INSYNC is both a prompt scaffold and a context engine—Intent/Style/You‑as steer behavior; Nuance/Context supply facts and constraints; Narrative Format structures output.',
              'Prompt engineering guides how the model responds; context engineering controls what it sees—both shape the probability landscape.',
              'Context quality (relevance, recency, reliability, resolution) predicts output quality more than prompt length.',
              'Compact context packs + clear schemas reduce hallucinations and speed iteration.',
          ]}
        />
      </div>
    </LessonTemplate>
  );
};



export default Lesson1_5;
