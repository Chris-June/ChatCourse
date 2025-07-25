import React from 'react';
import { ArrowRight, Bot, Server, Github, Database } from 'lucide-react';

const MCPArchitectureDiagram: React.FC = () => {
  const boxStyle = "bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center text-center border border-gray-700";
  const arrowStyle = "text-gray-500 mx-4 self-center";

  return (
    <div className="bg-gray-900/50 p-6 rounded-lg my-6">
      <div className="flex items-stretch justify-center">
        {/* Agent Box */}
        <div className={boxStyle}>
          <Bot className="w-10 h-10 text-blue-400 mb-2" />
          <p className="font-bold text-white">AI Agent</p>
          <p className="text-xs text-gray-400">Goal-oriented</p>
        </div>

        <ArrowRight className={arrowStyle} size={40} />

        {/* MCP Server Box */}
        <div className={boxStyle}>
          <Server className="w-10 h-10 text-yellow-400 mb-2" />
          <p className="font-bold text-white">MCP Server</p>
          <p className="text-xs text-gray-400">The "App Store"</p>
        </div>

        <ArrowRight className={arrowStyle} size={40} />

        {/* External Tools Box */}
        <div className="flex flex-col space-y-2">
          <div className="bg-gray-800 p-2 rounded-lg flex items-center border border-gray-700">
            <Github className="w-6 h-6 text-green-400 mr-2" />
            <span className="text-sm text-white">GitHub API</span>
          </div>
          <div className="bg-gray-800 p-2 rounded-lg flex items-center border border-gray-700">
            <Database className="w-6 h-6 text-cyan-400 mr-2" />
            <span className="text-sm text-white">Internal Database</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCPArchitectureDiagram;
