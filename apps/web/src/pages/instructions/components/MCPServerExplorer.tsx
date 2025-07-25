import React, { useState } from 'react';
import { Wrench, ChevronRight, Github, Database, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const servers = [
  {
    name: 'github',
    icon: <Github className="w-5 h-5 mr-3 text-green-400" />,
    description: 'For interacting with GitHub repositories.',
    tools: [
      { name: 'create_issue', description: 'Creates a new issue in a repo.' },
      { name: 'list_repos', description: 'Lists all repositories for the user.' },
      { name: 'get_pull_request', description: 'Retrieves details of a PR.' },
    ],
  },
  {
    name: 'internal_db',
    icon: <Database className="w-5 h-5 mr-3 text-cyan-400" />,
    description: 'For querying the company\'s internal database.',
    tools: [
      { name: 'query_inventory', description: 'Checks stock levels for a product.' },
      { name: 'get_user_data', description: 'Fetches customer information by ID.' },
    ],
  },
  {
    name: 'google_calendar',
    icon: <Calendar className="w-5 h-5 mr-3 text-yellow-400" />,
    description: 'For managing calendar events.',
    tools: [
      { name: 'create_event', description: 'Schedules a new event.' },
      { name: 'list_upcoming_events', description: 'Shows events for the next 7 days.' },
    ],
  },
];

const MCPServerExplorer: React.FC = () => {
  const [selectedServer, setSelectedServer] = useState(servers[0]);

  return (
    <div className="flex space-x-6 bg-gray-900/50 p-6 rounded-lg border border-dashed border-gray-700 my-6">
      {/* Server List */}
      <div className="w-1/3">
        <h3 className="font-bold text-white mb-3">Available Servers</h3>
        <div className="space-y-2">
          {servers.map((server) => (
            <button
              key={server.name}
              onClick={() => setSelectedServer(server)}
              className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                selectedServer.name === server.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}>
              {server.icon}
              <span className="flex-grow font-semibold">{server.name}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>

      {/* Tool List */}
      <div className="w-2/3 bg-gray-800 p-4 rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedServer.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center mb-3">
              {selectedServer.icon}
              <h3 className="text-xl font-bold text-white">{selectedServer.name}</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">{selectedServer.description}</p>
            <div className="space-y-3">
              {selectedServer.tools.map((tool) => (
                <div key={tool.name} className="bg-gray-900 p-3 rounded-md">
                  <div className="flex items-center">
                    <Wrench className="w-4 h-4 mr-2 text-blue-400" />
                    <p className="font-mono text-sm text-blue-300">{tool.name}</p>
                  </div>
                  <p className="text-xs text-gray-400 ml-6">{tool.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MCPServerExplorer;
