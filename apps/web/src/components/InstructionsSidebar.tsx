/**
 * @file InstructionsSidebar.tsx
 * @description A sidebar component for navigating through course modules and lessons.
 * This component provides navigation between different modules and their respective pages.
 */

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, ChevronDown, ChevronRight, Rocket } from 'lucide-react';
import { Button } from '@chat/ui';

interface InstructionsSidebarProps {
  isOpen: boolean;
}

const moduleData = [
  {
    id: 'module-1',
    title: '1. The Heart of the Matter - Understanding AI Models',
    lessons: [
      { id: '1.1', title: 'Demystifying AI: What Exactly Are We Working With?', path: '/instructions/module-1/1.1' },
      { id: '1.2', title: 'The Art of the Prompt', path: '/instructions/module-1/1.2' },
      { id: '1.3', title: 'Hands-on Exploration', path: '/instructions/module-1/1.3' },
    ],
  },
  {
    id: 'module-2',
    title: '2. Guiding the Conversation - Prompts & Instructions',
    lessons: [
      { id: '2.1', title: 'System Prompts: Setting the Stage', path: '/instructions/module-2/2.1' },
      { id: '2.2', title: 'Custom Instructions: Personalization', path: '/instructions/module-2/2.2' },
      { id: '2.3', title: 'Practical Application', path: '/instructions/module-2/2.3' },
    ],
  },
  {
    id: 'module-3',
    title: '3. AI in Action - Real-World Applications',
    lessons: [
      { id: '3.1', title: 'Dynamic Content Generation', path: '/instructions/module-3/3.1' },
      { id: '3.2', title: 'Logic and Problem Solving', path: '/instructions/module-3/3.2' },
      { id: '3.3', title: 'Interactive Features', path: '/instructions/module-3/3.3' },
    ],
  },
  {
    id: 'module-4',
    title: '4. Expanding Capabilities - Tools and Integrations',
    lessons: [
      { id: '4.1', title: 'Function Calling', path: '/instructions/module-4/4.1' },
      { id: '4.2', title: 'Model Context Protocol (MCP)', path: '/instructions/module-4/4.2' },
      { id: '4.3', title: 'Building Custom Tools', path: '/instructions/module-4/4.3' },
      { id: '4.4', title: 'Understanding GPTs', path: '/instructions/module-4/4.4' },
      { id: '4.5', title: 'Introduction to AI Agents', path: '/instructions/module-4/4.5' },
      { id: '4.6', title: 'Leveraging MCP Servers', path: '/instructions/module-4/4.6' },
    ],
  },
  {
    id: 'module-5',
    title: '5. Advanced Interaction Patterns',
    lessons: [
      { id: '5.1', title: 'Multi-Turn Conversations', path: '/instructions/module-5/5.1' },
      { id: '5.2', title: 'Personalization at Scale', path: '/instructions/module-5/5.2' },
      { id: '5.3', title: 'Performance Optimization', path: '/instructions/module-5/5.3' },
    ],
  },
  {
    id: 'module-6',
    title: '6. The Collaborative Development Process',
    lessons: [
      { id: '6.1', title: 'Idea Generation', path: '/instructions/module-6/6.1' },
      { id: '6.2', title: 'Design Thinking with AI', path: '/instructions/module-6/6.2' },
      { id: '6.3', title: 'Iterative Improvement', path: '/instructions/module-6/6.3' },
    ],
  },
  {
    id: 'module-7',
    title: '7. Real-World Applications',
    lessons: [
      { id: '7.1', title: 'Industry-Specific Solutions', path: '/instructions/module-7/7.1' },
      { id: '7.2', title: 'Ethical Considerations', path: '/instructions/module-7/7.2' },
      { id: '7.3', title: 'Future-Proofing', path: '/instructions/module-7/7.3' },
    ],
  },
  {
    id: 'module-8',
    title: '8. Capstone Project',
    lessons: [
      { id: '8.1', title: 'Project Planning', path: '/instructions/module-8/8.1' },
      { id: '8.2', title: 'Implementation', path: '/instructions/module-8/8.2' },
      { id: '8.3', title: 'Presentation and Review', path: '/instructions/module-8/8.3' },
    ],
  },
];

const InstructionsSidebar = ({ isOpen }: InstructionsSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const currentModuleId = location.pathname.split('/')[2];
    return { [currentModuleId]: true };
  });

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? '18rem' : '0rem' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-full bg-zinc-900/90 backdrop-blur-lg border-r border-zinc-800 flex-shrink-0 overflow-hidden"
    >
      <div className="w-72 h-full p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Course Modules</h2>
        </div>

        <nav className="flex-1 overflow-y-auto pr-2 space-y-4">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate('/')}
            >
              <Home className="w-4 h-4 mr-3" />
              Back to Chat
            </Button>
            <Button
              variant={location.pathname.startsWith('/instructions/setup') ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => navigate('/instructions/setup/project-setup')}
            >
              <Rocket className="w-4 h-4 mr-3" />
              Project Set-up
            </Button>
            <Button
              variant={location.pathname === '/instructions' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => navigate('/instructions')}
            > 
              <BookOpen className="w-4 h-4 mr-3" />
              Getting Started
            </Button>
          </div>

          <div className="space-y-1">
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Course Content
            </h3>
            <div className="mt-2 space-y-1">
              {moduleData.map((module) => (
                <div key={module.id}>
                  <Button
                    variant='ghost'
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex items-center justify-between text-sm h-auto text-left"
                  >
                    <span className="whitespace-normal">{module.title}</span>
                    {expandedModules[module.id] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </Button>
                  
                  {expandedModules[module.id] && (
                    <div className="ml-4 mt-1 space-y-1 border-l border-zinc-700 pl-2">
                      {module.lessons.map((lesson) => (
                        <Button
                          key={lesson.id}
                          variant={location.pathname === lesson.path ? 'secondary' : 'ghost'}
                          className='w-full justify-start text-left h-auto whitespace-normal'
                          onClick={() => navigate(lesson.path)}
                        >
                          <span>{lesson.id} {lesson.title}</span>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Resources
            </h3>
            <div className="mt-2 space-y-1">
                <Button
                  variant={location.pathname.startsWith('/instructions/appendices') ? 'secondary' : 'ghost'}
                  className='w-full justify-start'
                  onClick={() => navigate('/instructions/appendices')}
                >
                  <BookOpen className="w-4 h-4 mr-3" />
                  Appendices
                </Button>
            </div>
          </div>
        </nav>

        <div className="pt-4 mt-auto border-t border-zinc-800">
          <div className="text-xs text-gray-500 text-center">
            IntelliSync Solutions
          </div>
        </div>
      </div>
    </motion.div>
  );
};

                

export default InstructionsSidebar;
