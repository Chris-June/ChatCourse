/**
 * @file SideMenu.tsx
 * @description A reusable side menu component for navigation and settings.
 * This component will house session history and provide access to application settings.
 * It is designed to be expandable and collapsible.
 */

import { motion } from 'framer-motion';
import { Button } from '@chat/ui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Settings, PlusCircle, Edit, Trash2, Home, BookOpen } from 'lucide-react';
import { ChatSession } from '../store/chat';

interface SideMenuProps {
  isOpen: boolean;

  sessions: ChatSession[];
  activeSessionId: string | null;
  onSwitchSession: (sessionId: string) => void;
  onNewSession: () => void;
  onRenameSession: (sessionId: string, newTopic: string) => void;
  onDeleteSession: (sessionId: string) => void;
  onOpenSettings: () => void;
}

const SideMenu = ({
  isOpen,

  sessions,
  activeSessionId,
  onSwitchSession,
  onNewSession,
  onRenameSession,
  onDeleteSession,
  onOpenSettings,
}: SideMenuProps) => {
  const navigate = useNavigate();
  const [hoveredSessionId, setHoveredSessionId] = useState<string | null>(null);
  return (
    <motion.div
      initial={false}
      animate={{ width: isOpen ? '18rem' : '0rem' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-full bg-zinc-900/90 backdrop-blur-lg border-r border-zinc-800 flex-shrink-0 overflow-hidden"
    >
      <div className="w-72 h-full p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">History</h2>
        </div>

        <Button
          variant="outline"
          className="w-full mb-4 bg-zinc-800 border-zinc-700 hover:bg-zinc-700 rounded-md"
          onClick={() => {
            onNewSession();
          }}
        >
          <PlusCircle size={16} className="mr-2" />
          New Chat
        </Button>

        <div className="flex-1 space-y-2 overflow-y-auto pr-2">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="relative group"
              onMouseEnter={() => setHoveredSessionId(session.id)}
              onMouseLeave={() => setHoveredSessionId(null)}
            >
              <Button
                variant={session.id === activeSessionId ? 'secondary' : 'ghost'}
                className="w-full justify-start truncate pr-16 rounded-md"
                onClick={() => {
                  onSwitchSession(session.id);
                }}
              >
                <History size={14} className="mr-2 shrink-0" />
                <span className="truncate">
                  {session.topic || session.messages[0]?.content || 'New Chat'}
                </span>
              </Button>
              {hoveredSessionId === session.id && (
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center bg-inherit">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      const newTopic = prompt('Enter new session name:', session.topic);
                      if (newTopic) {
                        onRenameSession(session.id, newTopic);
                      }
                    }}
                  >
                    <Edit size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-red-500/80 hover:text-red-500 rounded-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to delete this session?')) {
                        onDeleteSession(session.id);
                      }
                    }}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-auto space-y-2 pt-4 border-t border-zinc-800">
          <Button variant="ghost" className="w-full justify-start rounded-md" onClick={() => navigate('/')}>
            <Home size={16} className="mr-2" />
            Home
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start rounded-md"
            onClick={() => navigate('/instructions/setup/project-setup')}
          >
            <BookOpen size={16} className="mr-2" />
            Course
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start rounded-md"
            onClick={onOpenSettings}
          >
            <Settings size={16} className="mr-2" />
            Settings
          </Button>

          <p className="text-xs text-gray-500 px-3 pt-2">IntelliSync v0.5</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SideMenu;
