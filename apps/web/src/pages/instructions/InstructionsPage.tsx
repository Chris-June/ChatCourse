import React, { useState } from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import { Menu, Home, BookOpen, Shield, PenSquare, DatabaseZap, Rocket } from 'lucide-react';
import InstructionsSidebar from '../../components/InstructionsSidebar';
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

const InstructionsPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Default content for the instructions page
  const DefaultContent = () => (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <BookOpen className="mx-auto h-16 w-16 text-blue-400" />
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">AI Collaboration Course</h1>
        <p className="mt-6 text-xl leading-8 text-gray-300">
          Learn how to effectively collaborate with AI through practical lessons and hands-on exercises.
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
          <Link
            to="module-1/1.1"
            className="group relative bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-200 border border-gray-700 hover:border-blue-500"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500/10 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">Module 1: The Heart of the Matter - Understanding AI Models</h3>
                <p className="mt-1 text-sm text-gray-400">Learn the fundamentals of AI models and how to interact with them effectively.</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-400 group-hover:text-blue-300">
              <span>Start Module</span>
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
          
          <Link
            to="module-2/2.1"
            className="group relative bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-200 border border-gray-700 hover:border-blue-500"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500/10 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">Module 2: Guiding the Conversation - Prompts & Instructions</h3>
                <p className="mt-1 text-sm text-gray-400">Master the art of prompting and providing custom instructions.</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-400 group-hover:text-blue-300">
              <span>Start Module</span>
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            to="module-3/3.1"
            className="group relative bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-200 border border-gray-700 hover:border-blue-500"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500/10 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">Module 3: AI in Action - Real-World Applications</h3>
                <p className="mt-1 text-sm text-gray-400">See how AI can be applied to dynamic content, logic, and interactive features.</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-400 group-hover:text-blue-300">
              <span>Start Module</span>
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            to="module-4/4.1"
            className="group relative bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-200 border border-gray-700 hover:border-blue-500"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500/10 p-3 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">Module 4: Advanced AI Collaboration</h3>
                <p className="mt-1 text-sm text-gray-400">Plan, develop, and refine projects with an AI pair programmer.</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-400 group-hover:text-blue-300">
              <span>Start Module</span>
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            to="module-5/5.1"
            className="group relative bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-200 border border-gray-700 hover:border-blue-500"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500/10 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">Module 5: Advanced Interaction Patterns</h3>
                <p className="mt-1 text-sm text-gray-400">Explore multi-turn conversations, personalization, and performance optimization.</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-400 group-hover:text-blue-300">
              <span>Start Module</span>
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            to="module-6/6.1"
            className="group relative bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-200 border border-gray-700 hover:border-blue-500"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500/10 p-3 rounded-lg">
                <PenSquare className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">Module 6: The Collaborative Development Process</h3>
                <p className="mt-1 text-sm text-gray-400">Learn about idea generation, design thinking, and iterative improvement with AI.</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-400 group-hover:text-blue-300">
              <span>Start Module</span>
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            to="module-7/7.1"
            className="group relative bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-200 border border-gray-700 hover:border-blue-500"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500/10 p-3 rounded-lg">
                <DatabaseZap className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">Module 7: Real-World Applications</h3>
                <p className="mt-1 text-sm text-gray-400">Explore industry-specific solutions, ethical considerations, and future-proofing.</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-400 group-hover:text-blue-300">
              <span>Start Module</span>
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            to="module-8/8.1"
            className="group relative bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-200 border border-gray-700 hover:border-blue-500"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500/10 p-3 rounded-lg">
                <Rocket className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white">Module 8: Capstone Project</h3>
                <p className="mt-1 text-sm text-gray-400">Plan, implement, and present your own AI-assisted project.</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-400 group-hover:text-blue-300">
              <span>Start Module</span>
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-zinc-50">
      <header className="flex items-center p-4 border-b border-zinc-800 flex-shrink-0">
        <Button onClick={toggleSidebar} variant="ghost" size="icon" className="mr-4">
          <Menu />
        </Button>
        <h1 className="text-xl font-semibold">AI Collaboration Course</h1>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <InstructionsSidebar isOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route path="module-1/*" element={<Module1Routes />} />
            <Route path="module-2/*" element={<Module2Routes />} />
            <Route path="module-3/*" element={<Module3Routes />} />
            <Route path="module-4/*" element={<Module4Routes />} />
            <Route path="module-5/*" element={<Module5Routes />} />
            <Route path="module-6/*" element={<Module6Routes />} />
            <Route path="module-7/*" element={<Module7Routes />} />
            <Route path="module-8/*" element={<Module8Routes />} />
            <Route path="appendices/*" element={<AppendicesRoutes />} />
            <Route index element={<DefaultContent />} />
            <Route path="*" element={<Navigate to="/instructions" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default InstructionsPage;