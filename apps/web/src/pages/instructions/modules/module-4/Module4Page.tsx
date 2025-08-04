import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  path: string;
}

const Module4Page: React.FC = () => {
  const location = useLocation();
  
  const lessons: Lesson[] = [
    { id: '4.1', title: 'Function Calling', path: '/instructions/module-4/4.1' },
    { id: '4.2', title: 'Model Context Protocol (MCP)', path: '/instructions/module-4/4.2' },
    { id: '4.3', title: 'Building Custom Tools', path: '/instructions/module-4/4.3' },
    { id: '4.4', title: 'Understanding GPTs', path: '/instructions/module-4/4.4' },
    { id: '4.5', title: 'AI Agents', path: '/instructions/module-4/4.5' },
    { id: '4.6', title: 'MCP Servers', path: '/instructions/module-4/4.6' },
  ];

  const currentLessonIndex = lessons.findIndex(lesson => location.pathname.endsWith(lesson.id));
  const prevLesson = currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < lessons.length - 1 ? lessons[currentLessonIndex + 1] : null;

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <Outlet />
      </main>
      
      <footer className="bg-gray-900 border-t border-gray-800 p-4 mt-auto">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto">
          <div>
            {prevLesson && (
              <Link 
                to={prevLesson.path}
                className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-2" /> 
                <span className="hidden md:inline">Previous:</span>
                <span className="ml-2">{prevLesson.title}</span>
              </Link>
            )}
          </div>
          
          <div>
            {nextLesson ? (
              <Link 
                to={nextLesson.path}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors"
              >
                <span className="hidden md:inline">Next:</span> 
                <span className="ml-2">{nextLesson.title}</span>
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            ) : (
              <Link 
                to="/instructions/module-5/5.1"
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-500 transition-colors"
              >
                <span>Multi-Turn Conversation</span>
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Module4Page;
