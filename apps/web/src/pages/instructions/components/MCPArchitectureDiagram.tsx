import React from 'react';
import { ArrowRight, Bot, Server, Github, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

const MCPArchitectureDiagram: React.FC = () => {
  const boxStyle = "bg-muted p-4 rounded-lg flex flex-col items-center justify-center text-center border";
  const labelStyle = "text-xs text-muted-foreground mt-1";

  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle className="text-center text-base md:text-lg">MCP Architecture Flow</CardTitle>
        <p className="text-center text-sm text-muted-foreground">Visualizing how an agent uses MCP to securely interact with external tools.</p>
      </CardHeader>
      <CardContent>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* 1. Agent Side (Client) */}
        <div className={`${boxStyle} w-56`}>
          <Bot className="w-10 h-10 text-primary mb-2" aria-hidden="true" />
          <p className="font-semibold text-foreground">AI Agent</p>
          <p className={labelStyle}>Initiates request based on its goal. Only knows the tool's name and parameters, not its secrets.</p>
        </div>

        {/* Arrow 1 */}
        <div className="flex flex-col items-center mx-4">
          <p className="text-sm font-medium text-foreground mb-1">1. Standardized Tool Call</p>
          <ArrowRight className="text-muted-foreground" size={40} aria-hidden="true" />
          <p className="text-xs text-muted-foreground mt-1 w-40 text-center">e.g., github.create_issue(...)</p>
        </div>

        {/* 2. Secure Backend */}
        <div className="bg-muted p-4 rounded-lg border-2 border-dashed border-primary/40 flex-grow">
          <p className="text-center font-semibold text-primary mb-4">Secure Backend</p>
          <div className="flex items-center justify-center gap-4">
            <div className={`${boxStyle} w-56`}>
              <Server className="w-10 h-10 text-primary mb-2" aria-hidden="true" />
              <p className="font-semibold text-foreground">MCP Server</p>
              <p className={labelStyle}>Acts as a secure proxy. It discovers tools, validates requests, and manages credentials.</p>
            </div>

            {/* Arrow 2 */}
            <div className="flex flex-col items-center mx-4">
              <p className="text-sm font-medium text-foreground mb-1">2. Direct API Call</p>
              <ArrowRight className="text-muted-foreground" size={40} aria-hidden="true" />
              <p className="text-xs text-primary/80 mt-1">(Uses stored API keys)</p>
            </div>

            <div className="flex flex-col space-y-2">
              <p className="font-semibold text-foreground text-center mb-2">External Tools</p>
              <div className="bg-card p-2 rounded-lg flex items-center border">
                <Github className="w-6 h-6 text-green-500 mr-2" aria-hidden="true" />
                <span className="text-sm text-foreground">GitHub API</span>
              </div>
              <div className="bg-card p-2 rounded-lg flex items-center border">
                <Database className="w-6 h-6 text-cyan-500 mr-2" aria-hidden="true" />
                <span className="text-sm text-foreground">Internal Database</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      </CardContent>
    </Card>
  );
};

export default MCPArchitectureDiagram;
