import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Module3Page: React.FC = () => {
  const location = useLocation();
  
  const lessons = [
    {
      id: '3.1',
      title: 'Dynamic Content Generation',
      path: '/instructions/module-3/3.1',
      description: 'Create varied, engaging, and structured content on demand.',
    },
    {
      id: '3.2',
      title: 'Logic and Problem Solving',
      path: '/instructions/module-3/3.2',
      description: 'Use AI for step-by-step reasoning, calculations, and decision making.',
    },
    {
      id: '3.3',
      title: 'Interactive Features',
      path: '/instructions/module-3/3.3',
      description: 'Design conversational flows and feedback loops for dynamic applications.',
    },
  ];

  const currentLesson = lessons.find(lesson => location.pathname.endsWith(lesson.id));
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Module 3: AI in Action - Real-World Applications</h1>
        <p className="text-gray-400">
          Explore practical applications of AI, from content generation to interactive problem-solving.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-gray-800 rounded-lg p-4 sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Lessons</h2>
            <nav className="space-y-2">
              {lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={lesson.path}
                  className={`flex items-start p-2 rounded ${
                    location.pathname.endsWith(lesson.id)
                      ? 'bg-blue-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <ChevronRight className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium">{lesson.title}</div>
                    <div className="text-xs text-gray-400">{lesson.description}</div>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <div className="md:col-span-3">
          {currentLesson ? (
            <div className="bg-gray-800 rounded-lg p-6">
              <Outlet />
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Welcome to Module 3</h2>
              <p className="text-gray-300 mb-6">
                In this module, you'll move from theory to practice, applying AI to generate dynamic content, solve logical problems, and build interactive features.
              </p>
              
              <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-blue-300 mb-2">What You'll Learn</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                  <li>Techniques for generating creative and structured text.</li>
                  <li>How to guide AI through complex, multi-step reasoning.</li>
                  <li>Methods for designing and implementing conversational user experiences.</li>
                  <li>Applying AI to practical, real-world tasks.</li>
                </ul>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    to={lesson.path}
                    className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition-colors group"
                  >
                    <h3 className="font-medium text-blue-300 mb-2 group-hover:text-blue-200">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-400">{lesson.description}</p>
                    <div className="mt-3 text-xs text-blue-400 flex items-center">
                      Start Lesson
                      <ChevronRight className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>

               <div className="mt-8 pt-6 border-t border-gray-700">
                <h3 className="text-lg font-medium text-gray-200 mb-3">Prerequisites</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Ensure you are comfortable with the concepts of context management and multi-turn conversations from Module 2.
                </p>
                <Link
                  to="/instructions/module-2"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm"
                >
                  <span>Review Module 2</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Module3Page;
