import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Beaker, Code, BookOpen, BarChart3, Sparkles, Layers, Zap } from 'lucide-react';
import { useProgressStore } from '../../../../../store/progressStore';

// Import our advanced prompting components
import {
  PromptRefinementWorkbench,
  PairProgrammingSimulator,
  PromptChallenges,
  PromptPatternLibrary,
  PromptVisualizer
} from '../../../../../components/prompting/advanced';

// Tab component for the lesson navigation
const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-2 rounded-t-lg transition-colors ${
      active 
        ? 'bg-gray-800 text-blue-400 border-b-2 border-blue-500' 
        : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
    }`}
  >
    <span className="mr-2">{icon}</span>
    {label}
  </button>
);

// Add fade-in animation styles
const addAnimationStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
    }
  `;
  document.head.appendChild(style);
};

const Lesson1_3: React.FC = () => {
  const { completeLesson } = useProgressStore();
  const [activeTab, setActiveTab] = useState<'visualizer' | 'challenges' | 'patterns' | 'refinement' | 'pairing'>('visualizer');

  useEffect(() => {
    addAnimationStyles();
  }, []);

  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-blue-400">1.3 Advanced Prompting Techniques</h1>
          <p className="text-lg text-gray-300 mt-2">
            Take your prompt engineering skills to the next level with these advanced techniques and tools.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-1/1.2" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-2" 
            onClick={() => completeLesson(1, 3)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next: Context Management <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-700">
        <div className="flex flex-wrap -mb-px">
          <TabButton
            active={activeTab === 'visualizer'}
            onClick={() => setActiveTab('visualizer')}
            icon={<BarChart3 className="w-5 h-5" />}
            label="Prompt Visualizer"
          />
          <TabButton
            active={activeTab === 'challenges'}
            onClick={() => setActiveTab('challenges')}
            icon={<Sparkles className="w-5 h-5" />}
            label="Prompt Challenges"
          />
          <TabButton
            active={activeTab === 'patterns'}
            onClick={() => setActiveTab('patterns')}
            icon={<Layers className="w-5 h-5" />}
            label="Pattern Library"
          />
          <TabButton
            active={activeTab === 'refinement'}
            onClick={() => setActiveTab('refinement')}
            icon={<Beaker className="w-5 h-5" />}
            label="Refinement Workbench"
          />
          <TabButton
            active={activeTab === 'pairing'}
            onClick={() => setActiveTab('pairing')}
            icon={<Code className="w-5 h-5" />}
            label="Pair Programming"
          />
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-gray-800/50 rounded-b-lg rounded-tr-lg p-6 border border-t-0 border-gray-700 min-h-[60vh]">
        {activeTab === 'visualizer' && (
          <div className="animate-fade-in">
            <div className="flex items-center mb-6">
              <BarChart3 className="w-8 h-8 text-blue-400 mr-3" />
              <div>
                <h2 className="text-2xl font-bold text-white">Prompt Visualizer</h2>
                <p className="text-gray-400">See how different elements of your prompt affect the AI's response quality in real-time.</p>
              </div>
            </div>
            <PromptVisualizer />
          </div>
        )}
        {activeTab === 'challenges' && (
          <div className="animate-fade-in">
            <div className="flex items-center mb-6">
              <Sparkles className="w-8 h-8 text-purple-400 mr-3" />
              <div>
                <h2 className="text-2xl font-bold text-white">Prompt Engineering Challenges</h2>
                <p className="text-gray-400">Test and improve your prompt engineering skills with these structured exercises.</p>
              </div>
            </div>
            <PromptChallenges />
          </div>
        )}
        {activeTab === 'patterns' && (
          <div className="animate-fade-in">
            <div className="flex items-center mb-6">
              <Layers className="w-8 h-8 text-emerald-400 mr-3" />
              <div>
                <h2 className="text-2xl font-bold text-white">Prompt Pattern Library</h2>
                <p className="text-gray-400">Explore a collection of effective prompt patterns you can use in your own work.</p>
              </div>
            </div>
            <PromptPatternLibrary />
          </div>
        )}
        {activeTab === 'refinement' && (
          <div className="animate-fade-in">
            <div className="flex items-center mb-6">
              <Beaker className="w-8 h-8 text-amber-400 mr-3" />
              <div>
                <h2 className="text-2xl font-bold text-white">Prompt Refinement Workbench</h2>
                <p className="text-gray-400">Iteratively improve your prompts with AI-powered feedback and version control.</p>
              </div>
            </div>
            <PromptRefinementWorkbench />
          </div>
        )}
        {activeTab === 'pairing' && (
          <div className="animate-fade-in">
            <div className="flex items-center mb-6">
              <Code className="w-8 h-8 text-rose-400 mr-3" />
              <div>
                <h2 className="text-2xl font-bold text-white">AI Pair Programming</h2>
                <p className="text-gray-400">Collaborate with an AI pair programmer, switching between driver and navigator roles.</p>
              </div>
            </div>
            <PairProgrammingSimulator />
          </div>
        )}
      </div>

      {/* Key Concepts Section */}
      <section className="bg-gray-800/30 p-6 rounded-lg border border-gray-700 mt-6">
        <h2 className="text-xl font-semibold text-white mb-4">Key Concepts in Advanced Prompting</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div className="bg-blue-500/10 w-10 h-10 rounded-full flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-medium text-white mb-1">Prompt Engineering</h3>
            <p className="text-sm text-gray-400">The art and science of crafting effective prompts to get the best results from AI models.</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div className="bg-purple-500/10 w-10 h-10 rounded-full flex items-center justify-center mb-3">
              <Layers className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-medium text-white mb-1">Pattern Recognition</h3>
            <p className="text-sm text-gray-400">Identifying and applying successful prompt patterns for different use cases.</p>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div className="bg-emerald-500/10 w-10 h-10 rounded-full flex items-center justify-center mb-3">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="font-medium text-white mb-1">Iterative Refinement</h3>
            <p className="text-sm text-gray-400">The process of gradually improving prompts through testing and iteration.</p>
          </div>
        </div>
      </section>

      {/* Learning Resources */}
      <section className="bg-gradient-to-r from-indigo-900/20 to-blue-900/20 p-6 rounded-lg border border-gray-700 mt-6">
        <h2 className="text-xl font-semibold text-white mb-4">Learning Resources</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
            <h3 className="font-medium text-white mb-3 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
              Recommended Reading
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://platform.openai.com/docs/guides/prompt-engineering" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 hover:underline flex items-start"
                >
                  <span className="mr-2">•</span>
                  <span>OpenAI's Prompt Engineering Guide</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://learnprompting.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 hover:underline flex items-start"
                >
                  <span className="mr-2">•</span>
                  <span>Learn Prompting - Free Prompt Engineering Course</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/dair-ai/Prompt-Engineering-Guide" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 hover:underline flex items-start"
                >
                  <span className="mr-2">•</span>
                  <span>Prompt Engineering Guide by DAIR.AI</span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-800/50 p-5 rounded-lg border border-gray-700">
            <h3 className="font-medium text-white mb-3 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" />
              Quick Tips
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <span className="text-gray-300">Be specific about what you want, but avoid unnecessary complexity</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <span className="text-gray-300">Use clear separators between instructions and examples</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <span className="text-gray-300">Start with a simple prompt and iteratively add more details</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">•</span>
                <span className="text-gray-300">Experiment with different prompt structures to see what works best</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Module Wrap-up */}
      <section className="bg-blue-900/30 p-6 rounded-lg shadow-lg border border-blue-700 mt-6">
        <h2 className="text-2xl font-semibold mb-3 text-white">Module 1 Complete!</h2>
        <p className="text-blue-200 mb-4">
          Congratulations! You've successfully navigated advanced prompting techniques.
        </p>
        <p className="text-blue-200 font-semibold">
          You are now equipped with the foundational skills for sophisticated AI interaction.
        </p>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-1/1.2" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous
        </Link>
        <Link 
          to="/instructions/module-2" 
          onClick={() => completeLesson(1, 3)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          On to Module 2! <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default Lesson1_3;
