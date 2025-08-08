import React, { useState } from 'react';
import { Wrench, ChevronRight, Github, Database, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '@chat/ui';

const servers = [
  {
    name: 'github',
    icon: <Github className="w-5 h-5 mr-3 text-green-500" aria-hidden="true" />,
    description: 'For interacting with GitHub repositories.',
    tools: [
      { name: 'create_issue', description: 'Creates a new issue in a repo.' },
      { name: 'list_repos', description: 'Lists all repositories for the user.' },
      { name: 'get_pull_request', description: 'Retrieves details of a PR.' },
    ],
  },
  {
    name: 'internal_db',
    icon: <Database className="w-5 h-5 mr-3 text-cyan-500" aria-hidden="true" />,
    description: 'For querying the company\'s internal database.',
    tools: [
      { name: 'query_inventory', description: 'Checks stock levels for a product.' },
      { name: 'get_user_data', description: 'Fetches customer information by ID.' },
    ],
  },
  {
    name: 'google_calendar',
    icon: <Calendar className="w-5 h-5 mr-3 text-yellow-500" aria-hidden="true" />,
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
    <Card className="my-6">
      <CardHeader>
        <CardTitle className="text-base md:text-lg text-center">Interactive Demo: MCP Server Explorer</CardTitle>
        <p className="text-center text-sm text-muted-foreground">Click on a server to simulate an agent discovering its available tools.</p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-6">
        {/* Server List */}
        <div className="lg:w-1/3">
          <h4 className="font-semibold text-foreground mb-3">Available Servers</h4>
          <div className="space-y-2">
            {servers.map((server) => (
              <Button
                key={server.name}
                onClick={() => handleServerSelect(server)}
                variant={selectedServer.name === server.name ? 'default' : 'secondary'}
                className="w-full justify-start"
                aria-pressed={selectedServer.name === server.name}
              >
                {server.icon}
                <span className="flex-grow font-semibold">{server.name}</span>
                <ChevronRight className="w-5 h-5 transition-transform duration-200" aria-hidden="true" />
              </Button>
            ))}
          </div>
        </div>

        {/* Tool List */}
        <div className="lg:w-2/3 bg-muted p-4 rounded-lg relative overflow-hidden border">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loader"
                className="absolute inset-0 flex items-center justify-center bg-background/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                role="status"
                aria-live="polite"
                aria-busy="true"
              >
                <p className='text-foreground'>Querying server...</p>
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
                  <h4 className="text-xl font-semibold text-foreground">{selectedServer.name} Tools</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{selectedServer.description}</p>
                <div className="space-y-3">
                  {selectedServer.tools.map((tool) => (
                    <div key={tool.name} className="bg-card p-3 rounded-md border">
                      <div className="flex items-center">
                        <Wrench className="w-4 h-4 mr-2 text-primary flex-shrink-0" aria-hidden="true" />
                        <p className="font-mono text-sm text-foreground">{tool.name}</p>
                      </div>
                      <p className="text-xs text-muted-foreground ml-6 mb-2">{tool.description}</p>
                      <div className="ml-6 mt-2 border-l-2 border-muted-foreground/20 pl-3">
                        <p className='text-xs font-semibold text-muted-foreground'>Example Call:</p>
                        <p className="font-mono text-xs text-primary bg-muted p-1 rounded">{`${selectedServer.name}.${tool.name}(...)`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      </CardContent>
    </Card>
  );
};

export default MCPServerExplorer;
