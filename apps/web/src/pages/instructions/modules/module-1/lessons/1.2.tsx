import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, AlertCircle, Zap, BarChart, RefreshCw } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';

// Prompt Builder Component
const PromptBuilder = () => {
  const [role, setRole] = useState('helpful assistant');
  const [task, setTask] = useState('explain a concept');
  const [context, setContext] = useState('to a beginner');
  const [format, setFormat] = useState('step-by-step explanation');
  const [tone, setTone] = useState('friendly and professional');
  
  const generatedPrompt = `You are a ${role}. ${task} ${context}. Present the information as a ${format} in a ${tone} tone.`;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-gray-700 rounded px-3 py-2 text-white"
            placeholder="e.g., expert tutor, marketing specialist"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Task</label>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full bg-gray-700 rounded px-3 py-2 text-white"
            placeholder="e.g., explain, generate, analyze"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Context</label>
          <input
            type="text"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            className="w-full bg-gray-700 rounded px-3 py-2 text-white"
            placeholder="e.g., for a beginner, for a technical audience"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Format</label>
          <input
            type="text"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full bg-gray-700 rounded px-3 py-2 text-white"
            placeholder="e.g., step-by-step, bullet points"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Tone</label>
          <input
            type="text"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full bg-gray-700 rounded px-3 py-2 text-white"
            placeholder="e.g., professional, casual, enthusiastic"
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
    
    // Simulate API call
    setTimeout(() => {
      const clarity = Math.floor(Math.random() * 3) + 3; // 3-5
      const specificity = Math.floor(Math.random() * 3) + 3; // 3-5
      const effectiveness = Math.floor(Math.random() * 3) + 3; // 3-5
      const avgScore = Math.round((clarity + specificity + effectiveness) / 3 * 10) / 10;
      
      const feedbackText = `
**Clarity**: ${clarity}/5 - Your prompt is ${clarity >= 4 ? 'clear' : 'somewhat unclear'}.
**Specificity**: ${specificity}/5 - It's ${specificity >= 4 ? 'specific' : 'vague'}.
**Effectiveness**: ${effectiveness}/5 - Overall, it's ${effectiveness >= 4 ? 'effective' : 'could be improved'}.

**Suggestions**: Try to be more specific about what you're looking for and provide relevant context.`;
      
      setScore(avgScore);
      setFeedback(feedbackText);
      onGrade(avgScore, feedbackText);
      setIsGrading(false);
    }, 1500);
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

const Lesson1_2: React.FC = () => {
  const { completeLesson } = useProgressStore();
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">1.2 Crafting Effective Prompts</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-1/1.1" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Intro to AI
          </Link>
          <Link 
            to="/instructions/module-1/1.3" 
            onClick={() => completeLesson(1, 2)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next: Advanced Techniques <ChevronRight className="w-5 h-5 ml-2" />
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
          You can achieve a lot with simple prompts, but the quality of results depends on how much information you provide and how well-crafted the prompt is. A prompt can include instructions, context, inputs, or examples to guide the model more effectively.
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
          <p className="text-gray-400 mb-3">With chat models like GPT-3.5 or GPT-4, you can structure prompts using different roles:</p>
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
            <h3 className="font-bold text-lg text-green-400 mb-2">Good Prompt</h3>
            <CopyButton textToCopy="You are a patient programming tutor who excels at explaining complex concepts with simple analogies. Explain the concept of closures in JavaScript. My audience is a beginner developer who understands functions and scope. Provide a simple code example and then explain it line-by-line using a real-world analogy, like a backpack or a toolbox." />
            <div className="font-mono text-gray-300 space-y-1 pr-10">
                <p><span className="text-yellow-400">You are a patient programming tutor</span> who excels at explaining complex concepts with simple analogies.</p>
                <p><span className="text-cyan-400">Explain the concept of closures in JavaScript.</span></p>
                <p><span className="text-green-400">My audience is a beginner developer who understands functions and scope. Provide a simple code example and then explain it line-by-line using a real-world analogy, like a backpack or a toolbox.</span></p>
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
        </p>
        <div className="mb-4 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
          <h4 className="font-semibold text-white mb-2 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-blue-400" />
            Pro Tip
          </h4>
          <p className="text-blue-200 text-sm">
            Try using the Prompt Builder above to create a well-structured prompt, then test it here. Remember to include:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>A clear role for the AI</li>
              <li>Specific instructions</li>
              <li>Desired format and tone</li>
              <li>Any necessary context</li>
            </ul>
          </p>
        </div>
        <InlineChat 
          moduleId="module-1.2"
          maxAttempts={15}
          placeholder="Craft your prompt for Innovate Inc. here..."
        />
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-1/1.1" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous
        </Link>
        <Link 
          to="/instructions/module-1/1.3" 
          onClick={() => completeLesson(1, 2)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Advanced Prompting<ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson1_2;
