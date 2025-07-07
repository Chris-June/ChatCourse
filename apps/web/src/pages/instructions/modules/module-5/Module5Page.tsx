import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Shield, Lock, Scale } from 'lucide-react';

const lessons = [
  { id: '5.1', title: 'Understanding Bias in AI', icon: Scale },
  { id: '5.2', title: 'Privacy & Data Security', icon: Lock },
  { id: '5.3', title: 'Responsible AI in Practice', icon: Shield },
];

const Module5Page: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Sidebar for lessons */}
      <aside className="w-full md:w-64 bg-gray-800 p-4 md:p-6 md:border-r md:border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-blue-400">Module 5: Ethical AI</h2>
        <nav>
          <ul>
            {lessons.map((lesson) => (
              <li key={lesson.id}>
                <NavLink
                  to={`/instructions/module-5/${lesson.id}`}
                  className={({ isActive }) =>
                    `flex items-center p-3 my-1 rounded-lg transition-colors text-sm ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`
                  }
                >
                  <lesson.icon className="w-4 h-4 mr-3" />
                  {lesson.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content for the selected lesson */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Module5Page;
