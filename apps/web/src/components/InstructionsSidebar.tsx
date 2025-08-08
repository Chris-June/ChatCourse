/**
 * @file InstructionsSidebar.tsx
 * @description A sidebar component for navigating through course modules and lessons.
 * This component provides navigation between different modules and their respective pages.
 */

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, ChevronDown, ChevronRight, Rocket, Lightbulb, Bot, Lock } from 'lucide-react';
import { useProgressStore } from '../store/progressStore';
import { Button } from '@chat/ui';

interface InstructionsSidebarProps {
  isOpen: boolean;
}

const moduleData = [
  {
    id: 'module-1',
    title: '1. Prompt Engineering Fundamentals',
    lessons: [
      { id: '1.1', title: 'What is Generative AI?', path: '/instructions/module-1/1.1' },
      { id: '1.2', title: 'The "Next-Word" Predictor', path: '/instructions/module-1/1.2' },
      { id: '1.3', title: 'The Power of Specificity', path: '/instructions/module-1/1.3' },
      { id: '1.4', title: 'Intro to Prompting', path: '/instructions/module-1/1.4' },
      { id: '1.5', title: 'The I.N.S.Y.N.C. Framework', path: '/instructions/module-1/1.5' },
      { id: '1.6', title: 'I.N.S.Y.N.C. Workshop', path: '/instructions/module-1/1.6' },
      { id: '1.7', title: 'Advanced Prompting', path: '/instructions/module-1/1.7' },
      { id: '1.8', title: 'Module 1 Challenge', path: '/instructions/module-1/1.8' },
    ],
  },
  {
    id: 'module-2',
    title: '2. Context Management',
    lessons: [
      { id: '2.1', title: 'The Power of Context in AI', path: '/instructions/module-2/2.1' },
      { id: '2.2', title: 'Maintaining Coherent Conversations', path: '/instructions/module-2/2.2' },
      { id: '2.3', title: 'Practical Context Exercises', path: '/instructions/module-2/2.3' },
    ],
  },
  {
    id: 'module-3',
    title: '3. Prompting Techniques',
    lessons: [
      { id: '3.1', title: 'Zero-shot and Few-shot Prompting', path: '/instructions/module-3/3.1' },
      { id: '3.2', title: 'Chain-of-Thought Prompting', path: '/instructions/module-3/3.2' },
      { id: '3.3', title: 'Advanced Prompt Patterns', path: '/instructions/module-3/3.3' },
    ],
  },
  {
    id: 'module-4',
    title: '4. AI Capabilities & Tools',
    lessons: [
      { id: '4.1', title: 'Function Calling', path: '/instructions/module-4/4.1' },
      { id: '4.2', title: 'Model Context Protocol (MCP)', path: '/instructions/module-4/4.2' },
      { id: '4.3', title: 'Building Custom Tools', path: '/instructions/module-4/4.3' },
      { id: '4.4', title: 'Understanding GPTs', path: '/instructions/module-4/4.4' },
      { id: '4.5', title: 'AI Agents', path: '/instructions/module-4/4.5' },
      { id: '4.6', title: 'MCP Servers', path: '/instructions/module-4/4.6' },
    ],
  },
  {
    id: 'module-5',
    title: '5. Advanced Interactions',
    lessons: [
      { id: '5.1', title: 'Multi-Turn Conversations', path: '/instructions/module-5/5.1' },
      { id: '5.2', title: 'Personalization', path: '/instructions/module-5/5.2' },
      { id: '5.3', title: 'Performance Optimization', path: '/instructions/module-5/5.3' },
    ],
  },
  {
    id: 'module-6',
    title: '6. Development with AI',
    lessons: [
      { id: '6.1', title: 'Idea Generation', path: '/instructions/module-6/6.1' },
      { id: '6.2', title: 'Design Thinking', path: '/instructions/module-6/6.2' },
      { id: '6.3', title: 'Iterative Development', path: '/instructions/module-6/6.3' },
    ],
  },
  {
    id: 'module-7',
    title: '7. Advanced Techniques',
    lessons: [
      { id: '7.1', title: 'Function Calling', path: '/instructions/module-7/7.1' },
      { id: '7.2', title: 'RAG Systems', path: '/instructions/module-7/7.2' },
      { id: '7.3', title: 'Model Fine-Tuning', path: '/instructions/module-7/7.3' },
    ],
  },
  {
    id: 'module-8',
    title: '8. Responsible AI',
    lessons: [
      { id: '8.1', title: 'Bias and Fairness', path: '/instructions/module-8/8.1' },
      { id: '8.2', title: 'Explainability', path: '/instructions/module-8/8.2' },
      { id: '8.3', title: 'Security & Privacy', path: '/instructions/module-8/8.3' },
    ],
  },
];

const InstructionsSidebar: React.FC<InstructionsSidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLessonUnlocked } = useProgressStore();
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  // Testing bypass: mirror ProtectedRoute behavior
  let disableGating = false;
  try {
    const params = new URLSearchParams(location.search);
    const unlockParam = params.get('unlock') === '1';
    const flag = typeof window !== 'undefined' && window.localStorage?.getItem('disable-gating') === '1';
    disableGating = unlockParam || flag;
    // Dev auto-bypass: always disable gating in development
    if (import.meta && import.meta.env && import.meta.env.DEV) {
      disableGating = true;
    }
  } catch {}

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
      className="h-full bg-background/90 backdrop-blur-lg border-r border-border flex-shrink-0 overflow-hidden"
    >
      <div className="w-72 h-full p-4 flex flex-col text-foreground">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Course Modules</h2>
        </div>

        <nav className="flex-1 overflow-y-auto pr-2 space-y-4">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate('/chat')}
            >
              <Bot className="w-4 h-4 mr-3" />
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
            <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
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
                    <div className="ml-4 mt-1 space-y-1 border-l border-border pl-2">
                      {module.lessons.map((lesson) => {
                        const moduleNumber = parseInt(module.id.split('-')[1]);
                        const lessonNumber = parseInt(lesson.id.split('.')[1]);
                        const isLocked = !disableGating && !isLessonUnlocked(moduleNumber, lessonNumber);

                        return (
                          <Button
                            key={lesson.id}
                            variant={location.pathname === lesson.path ? 'secondary' : 'ghost'}
                            className={`w-full justify-start text-left h-auto whitespace-normal flex items-center rounded-md ${isLocked ? 'text-muted-foreground' : ''}`}
                            onClick={() => !isLocked && navigate(lesson.path)}
                            disabled={isLocked}
                          >
                            {isLocked ? (
                              <Lock className="w-3 h-3 mr-2 flex-shrink-0" />
                            ) : (
                              <div className="w-3 h-3 mr-2 flex-shrink-0" /> // Placeholder for alignment
                            )}
                            <span className="whitespace-normal">{lesson.id} {lesson.title}</span>
                          </Button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Resources
            </h3>
            <div className="mt-2 space-y-1">
                <Button
                  variant={location.pathname.startsWith('/instructions/ai-feature-ideas') ? 'secondary' : 'ghost'}
                  className='w-full justify-start'
                  onClick={() => navigate('/instructions/ai-feature-ideas')}
                >
                  <Lightbulb className="w-4 h-4 mr-3" />
                  AI Feature Ideas
                </Button>
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

        <div className="pt-4 mt-auto border-t border-border">
          <div className="text-xs text-muted-foreground text-center">
            IntelliSync Solutions
          </div>
        </div>
      </div>
    </motion.div>
  );
};

                

export default InstructionsSidebar;
