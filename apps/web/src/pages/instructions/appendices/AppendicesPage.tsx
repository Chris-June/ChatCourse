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
      <aside className="w-full md:w-[260px] bg-muted/30 p-4 md:p-6 md:border-r border-border">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Appendices</h2>
        <nav>
          <ul>
            {appendixSections.map((section) => (
              <li key={section.id}>
                <NavLink
                  to={`/instructions/appendices/${section.id}`}
                  className={({ isActive }) =>
                    `group flex items-center p-3 my-1 rounded-lg border transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background ${
                      isActive
                        ? 'bg-primary/10 text-primary border-primary'
                        : 'text-muted-foreground hover:bg-muted/40 border-transparent'
                    }`
                  }
                >
                  <section.icon className="w-4 h-4 mr-3 text-muted-foreground group-[aria-current=page]:text-primary" />
                  {section.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content for the selected section */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AppendicesPage;

