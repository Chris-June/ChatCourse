import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, AlertCircle, Zap, BarChart, RefreshCw } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

// Prompt Builder Component
const PromptBuilder = () => {
  const [intent, setIntent] = useState('explain JavaScript closures');
  const [nuance, setNuance] = useState('using simple analogies and step-by-step examples');
  const [style, setStyle] = useState('friendly, patient, and encouraging');
  const [youAs, setYouAs] = useState('experienced JavaScript tutor');
  const [narrativeFormat, setNarrativeFormat] = useState('structured explanation with code examples');
  const [context, setContext] = useState('for a beginner programmer with basic JS knowledge');
  
  const generatedPrompt = `**Intent**: ${intent}

**Nuance**: ${nuance}

**Style**: ${style}

**You as...**: ${youAs}

**Narrative Format**: ${narrativeFormat}

**Context**: ${context}`;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Intent</label>
          <input
            type="text"
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            className="w-full bg-gray-700 rounded px-3 py-2 text-white"
            placeholder="What you want to achieve"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Nuance</label>
          <input
            type="text"
            value={nuance}
            onChange={(e) => setNuance(e.target.value)}
            className="w-full bg-gray-700 rounded px-3 py-2 text-white"
            placeholder="Specific details and constraints"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Style</label>
          <input
            type="text"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full bg-gray-700 rounded px-3 py-2 text-white"
            placeholder="Desired tone and voice"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">You as...</label>
          <input
            type="text"
            value={youAs}
            onChange={(e) => setYouAs(e.target.value)}
            className="w-full bg-gray-700 rounded px-3 py-2 text-white"
            placeholder="AI's role or persona"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Narrative Format</label>
          <input
            type="text"
            value={narrativeFormat}
            onChange={(e) => setNarrativeFormat(e.target.value)}
            className="w-full bg-gray-700 rounded px-3 py-2 text-white"
            placeholder="Desired output structure"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Context</label>
          <input
            type="text"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="w-full bg-gray-700 rounded px-3 py-2 text-white"
            placeholder="Background information"
          />
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-400">Generated Prompt</label>
          <CopyButton textToCopy={generatedPrompt} />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <p className="text-gray-300 whitespace-pre-wrap">{generatedPrompt}</p>
        </div>
      </div>
    </div>
  );
};

// Prompt Grader Component
const PromptGrader = ({ onGrade }: { onGrade: (score: number, feedback: string) => void }) => {
  const [prompt, setPrompt] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState<number | null>(null);

  const gradePrompt = async () => {
    if (!prompt.trim()) return;
    
    setIsGrading(true);
    setFeedback('');
    setScore(null);
    
    try {
      const response = await fetch('http://localhost:3000/api/chat/grade-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          framework: 'INSYNC',
          moduleId: 'module-1.5'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to grade prompt');
      }

      const data = await response.json();
      
      setScore(data.totalScore / 6 * 10); // Convert to 10-point scale
      setFeedback(data.feedback);
      onGrade(data.totalScore / 6 * 10, data.feedback);
    } catch (error) {
      console.error('Error grading prompt:', error);
      setScore(0);
      setFeedback(`**Error**: Unable to grade prompt. Please try again.`);
      onGrade(0, 'Error grading prompt');
    } finally {
      setIsGrading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Enter your prompt to grade</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 bg-gray-700 rounded px-3 py-2 text-white"
            placeholder="Type your prompt here..."
            disabled={isGrading}
          />
          <button
            onClick={gradePrompt}
            disabled={!prompt.trim() || isGrading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50 flex items-center"
          >
            {isGrading ? <RefreshCw className="w-4 h-4 animate-spin mr-2" /> : <BarChart className="w-4 h-4 mr-2" />}
            {isGrading ? 'Grading...' : 'Grade'}
          </button>
        </div>
      </div>
      
      {score !== null && (
        <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-white">Prompt Analysis</h4>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              score >= 4 ? 'bg-green-900/50 text-green-400' : 
              score >= 3 ? 'bg-yellow-900/50 text-yellow-400' : 
              'bg-red-900/50 text-red-400'
            }`}>
              {score}/5
            </div>
          </div>
          <div className="text-sm text-gray-300 space-y-2">
            {feedback.split('\n').map((line, i) => (
              <p key={i} className={line.startsWith('**') ? 'font-medium' : ''}>
                {line.replace(/\*\*/g, '')}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Lesson1_5: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What is the primary goal of effective prompt engineering?',
      options: [
        'To make the AI\'s response as long as possible',
        'To guide the AI to produce a desired, specific, and high-quality output',
        'To test the AI\'s knowledge of random facts',
        'To confuse the AI with complex language'
      ],
      correctAnswer: 'To guide the AI to produce a desired, specific, and high-quality output',
      explanation: 'Prompt engineering is about crafting precise instructions to control the AI\'s output and ensure it meets your requirements for quality and relevance.'
    },
    {
      questionText: 'Which of the following is NOT a key component of a well-structured prompt, as shown in the Prompt Builder?',
      options: [
        'Role',
        'Task',
        'Ambiguity',
        'Tone'
      ],
      correctAnswer: 'Ambiguity',
      explanation: 'A good prompt aims for clarity and specificity, not ambiguity. The key components help structure the prompt to be as clear as possible.'
    },
    {
      questionText: 'Why is providing \'Context\' important in a prompt?',
      options: [
        'It makes the prompt look more professional',
        'It is a required field that doesn\'t affect the output',
        'It helps the AI understand the target audience and the situation for the response',
        'It tells the AI which programming language to use'
      ],
      correctAnswer: 'It helps the AI understand the target audience and the situation for the response',
      explanation: 'Context gives the AI crucial background information, helping it tailor the response to be more relevant and appropriate for the intended purpose.'
    },
    {
      questionText: 'In the \'Prompt Grader\' exercise, what does a high score for \'Specificity\' indicate?',
      options: [
        'The prompt is very vague and open-ended',
        'The prompt includes clear, detailed instructions and constraints',
        'The prompt uses a lot of technical jargon',
        'The prompt is written in a friendly tone'
      ],
      correctAnswer: 'The prompt includes clear, detailed instructions and constraints',
      explanation: 'Specificity is about providing precise details that leave little room for misinterpretation, leading to a more accurate and relevant AI response.'
    },
    {
      questionText: 'What is the purpose of defining a \'Role\' for the AI in a prompt (e.g., \'You are an expert tutor\')?',
      options: [
        'It\'s just a fun greeting for the AI',
        'It primes the AI to adopt a specific persona, knowledge base, and communication style',
        'It limits the AI\'s creativity',
        'It is only used for generating code'
      ],
      correctAnswer: 'It primes the AI to adopt a specific persona, knowledge base, and communication style',
      explanation: 'Assigning a role helps focus the AI\'s response, making it more consistent and aligned with the desired style and expertise for the task.'
    }
  ];

  const { completeLesson } = useProgressStore();
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-purple-400">1.5: The I.N.S.Y.N.C. Framework</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-1/1.4" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-1/1.6" 
            onClick={() => completeLesson(1, 5)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        If the AI is the engine, the prompt is the steering wheel. Learning to write effective prompts is the single most important skill for collaborating with an AI. It's the difference between getting a generic, unhelpful response and a targeted, brilliant one.
      </p>

      {/* Basics of Prompting */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">The Basics of Prompting</h2>
        <p className="text-gray-300 mb-4">
          You can achieve a lot with simple prompts, but the quality of results depends on how much information or "context" you provide and how well-crafted the prompt is. A prompt can include instructions, context, inputs, or examples to guide the model more effectively.
        </p>
        
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 mb-6">
          <h3 className="font-bold text-lg text-white mb-2">Basic Prompt Example</h3>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-gray-300">The sky is</p>
              <p className="text-gray-400 mt-2">The model might respond with: <span className="text-gray-200">blue during the day and dark at night.</span></p>
            </div>
            <CopyButton textToCopy="The sky is" />
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-bold text-lg text-white mb-2">Structured Prompt Example</h3>
          <p className="text-gray-400 mb-3">With chat models like GPT-4 and other AI models, you can structure prompts using different roles:</p>
          <div className="space-y-2">
            <div className="flex items-start">
              <span className="text-green-400 font-mono mr-2">System:</span>
              <p className="text-gray-300">You are a helpful assistant that explains technical concepts clearly.</p>
            </div>
            <div className="flex items-start">
              <span className="text-blue-400 font-mono mr-2">User:</span>
              <p className="text-gray-300">Explain what prompt engineering is in simple terms.</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-3">The system message sets the behavior, while the user message contains the instruction.</p>
        </div>
      </section>

      {/* Prompt Formatting */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Prompt Formats</h2>
        <p className="text-gray-300 mb-4">
          There are several ways to structure your prompts. The format you choose depends on your specific needs and the task at hand.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-900 p-4 rounded-lg border border-cyan-700">
            <h3 className="font-bold text-lg text-cyan-300 mb-2">Zero-Shot Prompting</h3>
            <p className="text-gray-300 font-mono mb-3">What is prompt engineering?</p>
            <p className="text-gray-400">Directly asking a question without examples. Works well for straightforward tasks where the model has relevant knowledge.</p>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg border border-purple-700">
            <h3 className="font-bold text-lg text-purple-300 mb-2">Few-Shot Prompting</h3>
            <div className="space-y-2">
              <p className="text-gray-300 font-mono">This is awesome! // Positive</p>
              <p className="text-gray-300 font-mono">This is bad! // Negative</p>
              <p className="text-gray-300 font-mono">What a horrible show! //</p>
            </div>
            <p className="text-gray-400 mt-3">Providing examples helps the model understand the pattern or format you want.</p>
          </div>
        </div>
        
        <div className="bg-gray-900 p-4 rounded-lg border border-green-700">
          <h3 className="font-bold text-lg text-green-300 mb-2">Structured Prompt</h3>
          <div className="space-y-2">
            <p className="text-gray-300">Q: What is the capital of France?</p>
            <p className="text-gray-300">A: Paris</p>
            <p className="text-gray-300">Q: What is the capital of Japan?</p>
            <p className="text-gray-300">A: Tokyo</p>
            <p className="text-gray-300">Q: What is the capital of Brazil?</p>
            <p className="text-gray-300">A: </p>
          </div>
          <p className="text-gray-500 text-sm mt-3">This QA format is particularly effective for teaching the model specific patterns or tasks.</p>
        </div>

        <div className="mt-8 space-y-6">
          <h3 className="text-xl font-bold text-white mb-4">Advanced Prompt Techniques</h3>
          
          <div className="bg-gray-900 p-4 rounded-lg border border-orange-700">
            <h4 className="font-bold text-lg text-orange-300 mb-2">1. ROLE Framework</h4>
            <p className="text-gray-400 mb-2"><strong>R</strong>ole, <strong>O</strong>bjective, <strong>L</strong>anguage, <strong>E</strong>xpectations</p>
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-gray-300 font-mono text-sm">You are a friendly barista (Role) who helps customers choose drinks (Objective). Use casual, warm language (Language) and always recommend a popular seasonal option (Expectations).</p>
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg border border-indigo-700">
            <h4 className="font-bold text-lg text-indigo-300 mb-2">2. C.R.A.F.T.</h4>
            <p className="text-gray-400 mb-2"><strong>C</strong>ontext, <strong>R</strong>ole, <strong>A</strong>ction, <strong>F</strong>ormat, <strong>T</strong>one</p>
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-gray-300 font-mono text-sm">Context: For a corporate blog post<br/>
              Role: Act as a professional content writer<br/>
              Action: Write a 500-word article about AI in HR<br/>
              Format: Use intro/body/conclusion<br/>
              Tone: Informative and optimistic</p>
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg border border-pink-700">
            <h4 className="font-bold text-lg text-pink-300 mb-2">3. T.A.P.E.</h4>
            <p className="text-gray-400 mb-2"><strong>T</strong>ask, <strong>A</strong>ssumptions, <strong>P</strong>ersona, <strong>E</strong>xamples</p>
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-gray-300 font-mono text-sm">Task: Summarize a legal document<br/>
              Assumptions: Audience is a non-lawyer<br/>
              Persona: A legal educator<br/>
              Examples: Provide a bulleted summary with definitions of legal jargon</p>
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg border border-teal-700">
            <h4 className="font-bold text-lg text-teal-300 mb-2">4. M.A.R.K.</h4>
            <p className="text-gray-400 mb-2"><strong>M</strong>odel, <strong>A</strong>udience, <strong>R</strong>esponse, <strong>K</strong>nowledge</p>
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-gray-300 font-mono text-sm">Use GPT-4 (Model) to write a guide for new parents (Audience) that explains the basics of infant sleep cycles (Response), using insights from pediatric sleep studies (Knowledge).</p>
            </div>
          </div>

          <div className="bg-gray-900 p-4 rounded-lg border border-red-700">
            <h4 className="font-bold text-lg text-red-300 mb-2">5. R.I.D.E.</h4>
            <p className="text-gray-400 mb-2"><strong>R</strong>ole, <strong>I</strong>nstruction, <strong>D</strong>etails, <strong>E</strong>xamples</p>
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-gray-300 font-mono text-sm">Role: You are a tax accountant<br/>
              Instruction: Help a user understand RRSP vs. TFSA<br/>
              Details: User is 35, single, self-employed<br/>
              Examples: Include financial scenarios for each option</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-900 to-pink-900 p-6 rounded-lg border-2 border-purple-400 shadow-xl">
            <h4 className="font-bold text-2xl text-purple-300 mb-3">🧠 I.N.S.Y.N.C. Prompt Framework</h4>
            <p className="text-gray-300 mb-4 text-sm">The IntelliSync-approved way to craft elite prompts.</p>
            <p className="text-purple-300 mb-4 italic text-sm">Pronounced: "in-sync" — because when your prompt is in sync, your AI delivers the goods.</p>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-800 p-3 rounded border-l-4 border-purple-400">
                <h5 className="font-bold text-purple-300">🔹 Intent</h5>
                <p className="text-gray-300 text-sm">What is the core goal of this prompt?</p>
                <p className="text-gray-400 text-xs mt-1">E.g., "Summarize this policy," "Generate a business plan," "Draft an email"</p>
              </div>

              <div className="bg-gray-800 p-3 rounded border-l-4 border-purple-400">
                <h5 className="font-bold text-purple-300">🔹 Nuance</h5>
                <p className="text-gray-300 text-sm">Add critical details the AI should consider</p>
                <p className="text-gray-400 text-xs mt-1">E.g., "Targeted at beginners," "Use Canadian tax law," "Keep it under 500 words"</p>
              </div>

              <div className="bg-gray-800 p-3 rounded border-l-4 border-purple-400">
                <h5 className="font-bold text-purple-300">🔹 Style</h5>
                <p className="text-gray-300 text-sm">What tone or voice should the response have?</p>
                <p className="text-gray-400 text-xs mt-1">E.g., Friendly, professional, persuasive, witty</p>
              </div>

              <div className="bg-gray-800 p-3 rounded border-l-4 border-purple-400">
                <h5 className="font-bold text-purple-300">🔹 You as… (Role Assignment)</h5>
                <p className="text-gray-300 text-sm">Define the AI's role to shape its mindset</p>
                <p className="text-gray-400 text-xs mt-1">E.g., "You are a senior marketing strategist," "You are a helpful customer service agent"</p>
              </div>

              <div className="bg-gray-800 p-3 rounded border-l-4 border-purple-400">
                <h5 className="font-bold text-purple-300">🔹 Narrative Format</h5>
                <p className="text-gray-300 text-sm">What format should the response follow?</p>
                <p className="text-gray-400 text-xs mt-1">E.g., Bullet points, step-by-step guide, blog article, JSON schema</p>
              </div>

              <div className="bg-gray-800 p-3 rounded border-l-4 border-purple-400">
                <h5 className="font-bold text-purple-300">🔹 Context</h5>
                <p className="text-gray-300 text-sm">Provide additional background info</p>
                <p className="text-gray-400 text-xs mt-1">E.g., "The company is a Canadian startup," "The user is 65 and new to online banking"</p>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h5 className="font-bold text-purple-300 mb-2">🧪 Example Prompt using I.N.S.Y.N.C.</h5>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300"><strong>Intent:</strong> Create a homepage headline</p>
                <p className="text-gray-300"><strong>Nuance:</strong> Focus on automation benefits for small businesses</p>
                <p className="text-gray-300"><strong>Style:</strong> Bold and inspiring</p>
                <p className="text-gray-300"><strong>You as…:</strong> A conversion-optimized copywriter</p>
                <p className="text-gray-300"><strong>Narrative Format:</strong> Short headline + subheading</p>
                <p className="text-gray-300"><strong>Context:</strong> The product is IntelliSync — a no-code AI platform for automating workflows</p>
              </div>
              
              <div className="mt-4 p-3 bg-gray-900 rounded">
                <p className="text-gray-300 font-mono text-sm">
                  You are a conversion-optimized copywriter. Write a bold homepage headline and subheading for IntelliSync — a no-code AI platform that helps small business owners automate workflows. Focus on the benefits of saving time and scaling smarter. Keep the tone inspiring and confident.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles of Prompting */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">The Core Principles of Prompting</h2>
        <p className="text-gray-300 mb-4">
          A great prompt clearly defines three things: the AI's <span className="font-bold text-yellow-400">Role</span>, the <span className="font-bold text-cyan-400">Task</span> you want it to perform, and the <span className="font-bold text-green-400">Context</span> it needs to succeed.
        </p>
        <div className="space-y-4">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="font-bold text-lg text-white mb-2">1. Assign a Role</h3>
            <p className="text-gray-400">Tell the AI what persona it should adopt. This sets the tone and perspective of the response.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="font-bold text-lg text-white mb-2">2. Define the Task</h3>
            <p className="text-gray-400">Be explicit about what you want the AI to do. Use clear action verbs.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="font-bold text-lg text-white mb-2">3. Provide Context</h3>
            <p className="text-gray-400">This is where you provide the necessary details, constraints, examples, and desired output format. The more relevant context you give, the better the result.</p>
          </div>
        </div>
      </section>

      {/* Example Breakdown */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Example: From Vague to Valuable</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 relative">
            <h3 className="font-bold text-lg text-red-400 mb-2">Bad Prompt</h3>
            <CopyButton textToCopy="Explain closures in JavaScript." />
            <p className="font-mono text-gray-300 pr-10">"Explain closures in JavaScript."</p>
            <p className="text-gray-400 mt-2">This might give you a correct but generic, academic definition. Not very practical.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 relative">
            <h3 className="font-bold text-lg text-green-400 mb-2">I.N.S.Y.N.C. Prompt</h3>
            <CopyButton textToCopy={`You are a patient programming tutor with a gift for turning complex technical concepts into beginner-friendly explanations using simple analogies.

Your task is to explain the concept of closures in JavaScript to an audience that understands functions and scope but struggles with abstract ideas.

Use a clear step-by-step breakdown, include a simple code example, and walk through it line-by-line using a relatable real-world analogy (like a backpack or toolbox). The tone should be friendly, slow-paced, and confidence-building.

Context: This is for a beginner developer taking an online JavaScript course who is currently feeling overwhelmed by inner function access patterns.`} />
            <div className="font-mono text-gray-300 space-y-1 pr-10">
              <p><span className="text-yellow-400">You are a patient programming tutor</span> with a gift for turning complex technical concepts into beginner-friendly explanations using simple analogies.</p>
              <p><span className="text-cyan-400">Your task is to explain the concept of closures in JavaScript</span> to an audience that understands functions and scope but struggles with abstract ideas.</p>
              <p><span className="text-green-400">Use a clear step-by-step breakdown, include a simple code example, and walk through it line-by-line using a relatable real-world analogy (like a backpack or toolbox). The tone should be friendly, slow-paced, and confidence-building.</span></p>
              <p><span className="text-purple-400">Context: This is for a beginner developer taking an online JavaScript course who is currently feeling overwhelmed by inner function access patterns.</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Prompt Builder */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-yellow-400" />
          Interactive Prompt Builder
        </h2>
        <p className="text-gray-300 mb-6">
          Use this tool to construct effective prompts by defining key components. The builder will help you create well-structured prompts that yield better results.
        </p>
        <PromptBuilder />
      </section>

      {/* Prompt Grader */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <BarChart className="w-6 h-6 mr-2 text-green-400" />
          Prompt Grader
        </h2>
        <p className="text-gray-300 mb-6">
          Test the effectiveness of your prompts with our AI grader. Get instant feedback on clarity, specificity, and overall quality.
        </p>
        <PromptGrader onGrade={(score, feedback) => {
          // This could be used to track user progress or provide additional feedback
          console.log(`Prompt scored ${score}/5`, feedback);
        }} />
      </section>

      {/* Practice Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Sparkles className="w-6 h-6 mr-2 text-purple-400" />
          Practice Prompting
        </h2>
        <p className="text-gray-300 mb-4">
          Now it's time to practice. Use the interactive chat box below to craft a prompt for generating an "About Us" page for a fictional startup called "Innovate Inc." that builds AI-powered productivity tools.
          Try using the <strong className="text-purple-300">I.N.S.Y.N.C.</strong> framework to guide your structure:
        </p>
        <div className="mb-4 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
          <h4 className="font-semibold text-white mb-2 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-blue-400" />
            Pro Tip
          </h4>
          <div className="text-blue-200 text-sm">
            Try using the Prompt Builder above to create a well-structured prompt, then test it here. Remember the <strong className="text-purple-300">I.N.S.Y.N.C.</strong> fields:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Intent</strong> – What is the goal of the About Us page?</li>
              <li><strong>Nuance</strong> – What details matter? Audience, tone, constraints?</li>
              <li><strong>Style</strong> – Should the voice be casual, inspiring, technical?</li>
              <li><strong>You as...</strong> – What role should the AI take? (e.g., copywriter)</li>
              <li><strong>Narrative Format</strong> – Paragraphs, bullet points, slogan + mission?</li>
              <li><strong>Context</strong> – Who is Innovate Inc.? What’s their product & story?</li>
            </ul>
          </div>
        </div>
       <InlineChat 
          moduleId="module-1.5"
          maxAttempts={15}
          placeholder="Craft your prompt for Innovate Inc. here..."
          systemPrompt={`You are an expert prompt engineer and AI educator. Your job is to help users master the I.N.S.Y.N.C. prompt framework, which includes:

1. **Intent** – What is the goal of the prompt?
2. **Nuance** – Are key details, preferences, and constraints included?
3. **Style** – Is the desired tone or voice clear?
4. **You as...** – Has the AI’s role been clearly defined?
5. **Narrative Format** – Is the output structure specified?
6. **Context** – Is relevant background information provided?

Your task is to score and provide feedback on each element of I.N.S.Y.N.C., then offer a total score and an improved version of the prompt.

Return your evaluation in this exact format:

**I.N.S.Y.N.C. Prompt Evaluation**
- Intent: [Score]/5 – [Brief explanation]
- Nuance: [Score]/5 – [Brief explanation]
- Style: [Score]/5 – [Brief explanation]
- You as...: [Score]/5 – [Brief explanation]
- Narrative Format: [Score]/5 – [Brief explanation]
- Context: [Score]/5 – [Brief explanation]

**Total Score: [XX/30]**

**Strengths:**
• [List strengths]

**Suggestions for Improvement:**
• [List improvements]

**Revised Prompt Example:**
"""
[Provide an improved version of the user’s prompt using the full I.N.S.Y.N.C. structure]
"""

**Generated Output Example:**
[Generate a sample “About Us” page using the revised prompt]

Be constructive, specific, and encouraging.`}
        />
      </section>

      {/* Validation Quiz */}
      <section className="mt-8">
        <ModuleQuizzes questions={quizQuestions} />
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-1/1.4" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous
        </Link>
        <Link 
          to="/instructions/module-1/1.6" 
          onClick={() => completeLesson(1, 5)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: I.N.S.Y.N.C. Workshop<ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson1_5;
