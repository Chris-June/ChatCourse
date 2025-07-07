import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Book, Link2, Wrench } from 'lucide-react';

const appendixSections = [
  { id: 'glossary', title: 'Glossary of Terms', icon: Book },
  { id: 'further-reading', title: 'Further Reading', icon: Link2 },
  { id: 'tools-resources', title: 'Tools & Resources', icon: Wrench },
];

const AppendicesPage: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Sidebar for appendix sections */}
      <aside className="w-full md:w-64 bg-gray-800 p-4 md:p-6 md:border-r md:border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-blue-400">Appendices</h2>
        <nav>
          <ul>
            {appendixSections.map((section) => (
              <li key={section.id}>
                <NavLink
                  to={`/instructions/appendices/${section.id}`}
                  className={({ isActive }) =>
                    `flex items-center p-3 my-1 rounded-lg transition-colors text-sm ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`
                  }
                >
                  <section.icon className="w-4 h-4 mr-3" />
                  {section.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content for the selected section */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AppendicesPage;
