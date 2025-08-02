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
  const [isLoading, setIsLoading] = useState(false);

  const handleServerSelect = (server: typeof servers[0]) => {
    setIsLoading(true);
    setSelectedServer(server);
    // Simulate network delay for fetching tools
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="bg-gray-900/70 p-6 rounded-xl my-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white text-center mb-1">Interactive Demo: MCP Server Explorer</h3>
        <p className="text-center text-gray-400 text-sm mb-6">Click on a server to simulate an agent discovering its available tools.</p>
        <div className="flex space-x-6">
        {/* Server List */}
        <div className="w-1/3">
          <h4 className="font-semibold text-white mb-3">Available Servers</h4>
          <div className="space-y-2">
            {servers.map((server) => (
              <button
                key={server.name}
                onClick={() => handleServerSelect(server)}
                className={`w-full flex items-center p-3 rounded-lg text-left transition-colors duration-200 ${
                  selectedServer.name === server.name
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}>
                {server.icon}
                <span className="flex-grow font-semibold">{server.name}</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-200" />
              </button>
            ))}
          </div>
        </div>

        {/* Tool List */}
        <div className="w-2/3 bg-gray-800 p-4 rounded-lg relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loader"
                className="absolute inset-0 flex items-center justify-center bg-gray-800/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className='text-white'>Querying server...</p>
              </motion.div>
            ) : (
              <motion.div
                key={selectedServer.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center mb-3">
                  {selectedServer.icon}
                  <h4 className="text-xl font-bold text-white">{selectedServer.name} Tools</h4>
                </div>
                <p className="text-sm text-gray-400 mb-4">{selectedServer.description}</p>
                <div className="space-y-3">
                  {selectedServer.tools.map((tool) => (
                    <div key={tool.name} className="bg-gray-900 p-3 rounded-md border border-gray-700/50">
                      <div className="flex items-center">
                        <Wrench className="w-4 h-4 mr-2 text-blue-400 flex-shrink-0" />
                        <p className="font-mono text-sm text-blue-300">{tool.name}</p>
                      </div>
                      <p className="text-xs text-gray-400 ml-6 mb-2">{tool.description}</p>
                      <div className="ml-6 mt-2 border-l-2 border-gray-700 pl-3">
                        <p className='text-xs font-semibold text-gray-500'>Example Call:</p>
                        <p className="font-mono text-xs text-green-400 bg-gray-800/50 p-1 rounded">{`${selectedServer.name}.${tool.name}(...)`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MCPServerExplorer;
