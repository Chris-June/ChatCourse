import React from 'react';
import { ArrowRight, Bot, Server, Github, Database } from 'lucide-react';

const MCPArchitectureDiagram: React.FC = () => {
  const boxStyle = "bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center text-center border border-gray-700 shadow-lg";
  const labelStyle = "text-xs text-gray-400 mt-1";

  return (
    <div className="bg-gray-900/70 p-6 rounded-xl my-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white text-center mb-1">MCP Architecture Flow</h3>
      <p className="text-center text-gray-400 text-sm mb-6">Visualizing how an agent uses MCP to securely interact with external tools.</p>
      
      <div className="flex items-center justify-between">
        {/* 1. Agent Side (Client) */}
        <div className={`${boxStyle} w-48`}>
          <Bot className="w-10 h-10 text-blue-400 mb-2" />
          <p className="font-bold text-white">AI Agent</p>
          <p className={labelStyle}>Initiates request based on its goal. Only knows the tool's name and parameters, not its secrets.</p>
        </div>

        {/* Arrow 1 */}
        <div className="flex flex-col items-center mx-4">
          <p className="text-sm font-medium text-white mb-1">1. Standardized Tool Call</p>
          <ArrowRight className="text-gray-500" size={40} />
          <p className="text-xs text-gray-400 mt-1 w-32 text-center">e.g., `github.create_issue(...)`</p>
        </div>

        {/* 2. Secure Backend */}
        <div className="bg-gray-800/50 p-4 rounded-lg border-2 border-dashed border-yellow-500/50 flex-grow">
          <p className="text-center font-bold text-yellow-400 mb-4">Secure Backend</p>
          <div className="flex items-center justify-center">
            <div className={`${boxStyle} w-48`}>
              <Server className="w-10 h-10 text-yellow-400 mb-2" />
              <p className="font-bold text-white">MCP Server</p>
              <p className={labelStyle}>Acts as a secure proxy. It discovers tools, validates requests, and manages credentials.</p>
            </div>

            {/* Arrow 2 */}
            <div className="flex flex-col items-center mx-4">
              <p className="text-sm font-medium text-white mb-1">2. Direct API Call</p>
              <ArrowRight className="text-gray-500" size={40} />
              <p className="text-xs text-green-400 mt-1">(Uses stored API keys)</p>
            </div>

            <div className="flex flex-col space-y-2">
              <p className="font-bold text-white text-center mb-2">External Tools</p>
              <div className="bg-gray-900 p-2 rounded-lg flex items-center border border-gray-700">
                <Github className="w-6 h-6 text-green-400 mr-2" />
                <span className="text-sm text-white">GitHub API</span>
              </div>
              <div className="bg-gray-900 p-2 rounded-lg flex items-center border border-gray-700">
                <Database className="w-6 h-6 text-cyan-400 mr-2" />
                <span className="text-sm text-white">Internal Database</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MCPArchitectureDiagram;
