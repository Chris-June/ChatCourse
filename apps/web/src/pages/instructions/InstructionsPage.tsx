import React, { useState } from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import { Menu, Home, Shield, BookOpen, PenSquare, DatabaseZap, Rocket, Lock } from 'lucide-react';
import InstructionsSidebar from '../../components/InstructionsSidebar';
import { useProgressStore } from '../../store/progressStore';
import { Button } from '@chat/ui';
import Module1Routes from './modules/module-1';
import Module2Routes from './modules/module-2';
import Module3Routes from './modules/module-3';
import Module4Routes from './modules/module-4';
import Module5Routes from './modules/module-5';
import Module6Routes from './modules/module-6';
import Module7Routes from './modules/module-7';
import Module8Routes from './modules/module-8';
import AppendicesRoutes from './appendices';
import SetupRoutes from './setup';
import AIFeatureIdeasRoutes from './ai-feature-ideas';
import Conclusion from './conclusion';

const InstructionsPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isLessonUnlocked } = useProgressStore();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isModuleUnlocked = (moduleNumber: number) => {
    // Module 1 is always unlocked.
    // For other modules, check if the first lesson is unlocked.
    return moduleNumber === 1 || isLessonUnlocked(moduleNumber, 1);
  };

  // Default content for the instructions page
  const DefaultContent = () => {
    const modules = [
      { number: 1, title: 'Prompt Engineering Fundamentals', description: 'Master the art of crafting effective prompts to optimize AI model outputs.', icon: BookOpen },
      { number: 2, title: 'Context Management', description: 'Learn how to effectively manage and utilize context in AI conversations.', icon: PenSquare },
      { number: 3, title: 'Prompting Techniques', description: 'Explore various advanced techniques for creating effective prompts.', icon: Shield },
      { number: 4, title: 'AI Capabilities & Tools', description: 'Discover the full range of AI capabilities and tools available for your projects.', icon: Rocket },
      { number: 5, title: 'Advanced Interactions', description: 'Learn to create sophisticated AI interactions and workflows.', icon: DatabaseZap },
      { number: 6, title: 'Development with AI', description: 'Integrate AI into your development workflow and applications.', icon: PenSquare },
      { number: 7, title: 'Advanced Techniques', description: 'Master advanced techniques for working with AI systems.', icon: DatabaseZap },
      { number: 8, title: 'Responsible AI', description: 'Understand and implement responsible AI practices and considerations.', icon: Rocket },
    ];

    return (
      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <img 
            src="/Logo.png" 
            alt="IntelliSync Logo" 
            className="mx-auto h-32 w-32 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'Logo.png';
            }}
          />
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">The I.N.S.Y.N.C. Framework</h1>
          <p className="mt-6 text-xl leading-8 text-gray-300">
            Master the I.N.S.Y.N.C. framework to elevate your AI collaboration from basic commands to sophisticated, human-like interactions.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="module-1/1.1" 
              className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Start Learning
            </Link>
            <Link to="/" className="text-sm font-semibold leading-6 text-gray-300 hover:text-white">
              <span className="flex items-center">
                <Home className="mr-1 h-4 w-4" /> Back to Home
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Course Modules</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {modules.map(module => {
              const unlocked = isModuleUnlocked(module.number);
              const Icon = module.icon;
              return (
                <Link
                  key={module.number}
                  to={unlocked ? `module-${module.number}/${module.number}.1` : '#'}
                  className={`group relative bg-gray-800 p-6 rounded-lg transition-colors duration-200 border border-gray-700 ${unlocked ? 'hover:bg-gray-700 hover:border-blue-500' : 'opacity-50 cursor-not-allowed'}`}
                  onClick={(e) => !unlocked && e.preventDefault()}
                  aria-disabled={!unlocked}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-500/10 p-3 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-white flex items-center">
                        {!unlocked && <Lock className="w-4 h-4 mr-2 flex-shrink-0" />}
                        Module {module.number}: {module.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-400">{module.description}</p>
                    </div>
                  </div>
                  {unlocked && (
                    <div className="mt-4 flex items-center text-sm text-blue-400 group-hover:text-blue-300">
                      <span>Start Module</span>
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-zinc-50">
      <header className="flex items-center p-4 border-b border-zinc-800 flex-shrink-0">
        <Button onClick={toggleSidebar} variant="ghost" size="icon" className="mr-4">
          <Menu />
        </Button>
        <h1 className="text-xl font-semibold">AI Framework Course</h1>
      </header>
      <div className="flex flex-1 overflow-hidden min-h-0">
        <InstructionsSidebar isOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto overscroll-contain p-8 min-h-0">
          <Routes>
            <Route path="setup/*" element={<SetupRoutes />} />
            <Route path="module-1/*" element={<Module1Routes />} />
            <Route path="module-2/*" element={<Module2Routes />} />
            <Route path="module-3/*" element={<Module3Routes />} />
            <Route path="module-4/*" element={<Module4Routes />} />
            <Route path="module-5/*" element={<Module5Routes />} />
            <Route path="module-6/*" element={<Module6Routes />} />
            <Route path="module-7/*" element={<Module7Routes />} />
            <Route path="module-8/*" element={<Module8Routes />} />
            <Route path="appendices/*" element={<AppendicesRoutes />} />
            <Route path="ai-feature-ideas/*" element={<AIFeatureIdeasRoutes />} />
            <Route path="conclusion" element={<Conclusion />} />
            <Route index element={<DefaultContent />} />
            <Route path="*" element={<Navigate to="/instructions" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default InstructionsPage;