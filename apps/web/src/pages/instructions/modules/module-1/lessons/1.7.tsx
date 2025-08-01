import React, { useState, useEffect } from 'react';
import { Beaker, Code, BookOpen, BarChart3, Sparkles, Layers, Zap } from 'lucide-react';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';

// Import our advanced prompting components
import {
  PromptRefinementWorkbench,
  PairProgrammingSimulator,
  PromptChallenges,
  PromptPatternLibrary,
  PromptVisualizer,
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

const Lesson1_7: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What is the primary benefit of iteratively refining a prompt?',
      options: [
        'It makes the prompt longer, which is always better.',
        'It allows you to make small, controlled changes to systematically improve the AI\'s output.',
        'It guarantees the AI will respond faster.',
        'It helps you find more spelling errors in your prompt.',
      ],
      correctAnswer: 'It allows you to make small, controlled changes to systematically improve the AI\'s output.',
      explanation: 'Iterative refinement is the process of making small, deliberate adjustments to a prompt and observing the effect, which is key to achieving a precise and high-quality result.',
    },
    {
      questionText: 'In advanced prompting, what is the main advantage of using a \'pattern\' (e.g., the Persona Pattern)?',
      options: [
        'It provides a single, perfect prompt that works for every situation.',
        'It offers a proven, reusable structure for solving a common type of problem reliably.',
        'It forces the AI to use a specific vocabulary.',
        'It is the only way to get the AI to generate creative content.',
      ],
      correctAnswer: 'It offers a proven, reusable structure for solving a common type of problem reliably.',
      explanation: 'Prompt patterns are like strategic blueprints. They provide a reliable framework that can be adapted to many different tasks to produce consistent, high-quality outcomes.',
    },
    {
      questionText: 'When using an AI as a collaborative partner (e.g., for pair programming), what is a crucial skill humans require?',
      options: [
        'Accepting the AI\'s first answer without question.',
        'Using very short, one-word commands.',
        'Clearly articulating your goal and providing specific feedback to guide the AI.',
        'Letting the AI do all the work independently.',
      ],
      correctAnswer: 'Clearly articulating your goal and providing specific feedback to guide the AI.',
      explanation: 'Effective collaboration with an AI requires clear communication. You must define the goal and then guide the AI with feedback, just as you would with a human partner.',
    },
    {
      questionText: 'Why is it helpful to deconstruct a complex prompt into its core components (e.g., role, task, context)?',
      options: [
        'It makes the prompt harder for the AI to understand.',
        'It is a required step by all AI models.',
        'It helps you identify which part of the prompt needs adjustment to improve the output.',
        'It only works for generating code.',
      ],
      correctAnswer: 'It helps you identify which part of the prompt needs adjustment to improve the output.',
      explanation: 'Deconstruction allows you to diagnose problems. If the AI\'s tone is wrong, you adjust the \'Style\' or \'You as...\' part. If the output is inaccurate, you might need to improve the \'Context\'.',
    },
    {
      questionText: 'What is a core principle of moving from basic to advanced prompt engineering?',
      options: [
        'Using more complex and obscure words.',
        'Writing the longest prompt possible.',
        'Applying structured techniques and iterative testing to gain more precise control over the AI.',
        'Memorizing a list of magic keywords.',
      ],
      correctAnswer: 'Applying structured techniques and iterative testing to gain more precise control over the AI.',
      explanation: 'Advanced prompting is about being deliberate and systematic. It involves using proven structures (patterns) and continuously refining your instructions to achieve a specific goal.',
    },
  ];

  const [activeTab, setActiveTab] = useState('workbench');

  useEffect(() => {
    addAnimationStyles();
  }, []);

  const renderContent = () => {
    const components: { [key: string]: React.ReactNode } = {
    visualizer: <PromptVisualizer />,   
    challenges: <PromptChallenges />,
    library: <PromptPatternLibrary />,
    workbench: <PromptRefinementWorkbench />,
    simulator: <PairProgrammingSimulator />,
    };
    return <div className="animate-fade-in p-4 md:p-6 bg-gray-800 rounded-b-lg">{components[activeTab]}</div>;
  };

  return (
    <LessonTemplate
      moduleNumber={1}
      lessonNumber={7}
      title="1.7: Advanced Prompting Techniques"
      subtitle="Unlock the full potential of AI with sophisticated strategies."
      quizQuestions={quizQuestions}
    >
      <div className="max-w-7xl mx-auto">
        {/* Intro Section */}
        <section className="text-center my-8">
          <h2 className="text-3xl font-bold text-white">Beyond the Basics</h2>
          <p className="text-lg text-gray-400 mt-2 max-w-3xl mx-auto">
            You've mastered the I.N.S.Y.N.C. framework. Now, it's time to explore the techniques that separate casual users from professional prompt engineers. These tools and methods will help you tackle complex tasks, achieve greater precision, and collaborate with AI more effectively.
          </p>
        </section>

        {/* Interactive Tabs */}
        <div className="bg-gray-900/70 backdrop-blur-sm rounded-lg border border-gray-700/50 shadow-2xl">
          <div className="flex border-b border-gray-700 overflow-x-auto">

            <TabButton
              active={activeTab === 'visualizer'}
              onClick={() => setActiveTab('visualizer')}
              icon={<Layers className="w-5 h-5" />}
              label="Prompt Visualizer"
            />  
            
            <TabButton
              active={activeTab === 'challenges'}
              onClick={() => setActiveTab('challenges')}
              icon={<Zap className="w-5 h-5" />}
              label="Challenges"
            />

             <TabButton
              active={activeTab === 'library'}
              onClick={() => setActiveTab('library')}
              icon={<BookOpen className="w-5 h-5" />}
              label="Pattern Library"
            /> 
            
            <TabButton
              active={activeTab === 'workbench'}
              onClick={() => setActiveTab('workbench')}
              icon={<Beaker className="w-5 h-5" />}
              label="Refinement Workbench"
            /> 
            <TabButton
              active={activeTab === 'simulator'}
              onClick={() => setActiveTab('simulator')}
              icon={<Code className="w-5 h-5" />}
              label="Pair Programming"
            />
           
          </div>
          {renderContent()}
        </div>

        {/* Core Concepts Section */}
        <section className="max-w-7xl mx-auto mt-12">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Core Advanced Concepts</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Concept Card 1 */}
            <div className="bg-purple-500/10 border border-purple-500/30 p-5 rounded-lg text-center">
              <div className="bg-purple-500/10 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="font-medium text-white mb-1">Prompt Chaining</h3>
              <p className="text-sm text-gray-400">Breaking a complex task into smaller sub-prompts and feeding the output of one into the next.</p>
            </div>
            {/* Concept Card 2 */}
            <div className="bg-blue-500/10 border border-blue-500/30 p-5 rounded-lg text-center">
              <div className="bg-blue-500/10 w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <Layers className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="font-medium text-white mb-1">Instructional Priming</h3>
              <p className="text-sm text-gray-400">Providing clear, high-level instructions and examples before the main prompt to guide the AI's behavior.</p>
            </div>
            {/* Concept Card 3 */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-5 rounded-lg text-center">
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
      </div>
    </LessonTemplate>
  );
};

export default Lesson1_7;
