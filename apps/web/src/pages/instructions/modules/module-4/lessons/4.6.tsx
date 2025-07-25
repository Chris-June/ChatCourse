import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Globe, Server, Lightbulb, ShieldCheck, ListChecks, Briefcase } from 'lucide-react';
import Accordion from '../../../components/Accordion';
import MCPArchitectureDiagram from '../../../components/MCPArchitectureDiagram';
import MCPServerExplorer from '../../../components/MCPServerExplorer';
import AgentPlannerExercise from '../../../components/AgentPlannerExercise';

const Lesson4_6: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">4.6: Leveraging MCP Servers</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-4/4.5" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-5/5.1" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Module <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <Accordion title="The Big Idea: An App Store for Agents" icon={<Server />} isInitiallyOpen>
        <p className="text-gray-300 mb-4">
          MCP (Model Context Protocol) Servers are like an App Store for your AI agent. Instead of the agent having to know the messy details of every API (like GitHub, Google Calendar, etc.), it just connects to the MCP Server. The server provides a clean, standardized list of available tools, handling all the security and authentication behind the scenes.
        </p>
        <MCPArchitectureDiagram />
        <p className="text-gray-300 mt-4">
          This architecture is powerful because it separates the agent's reasoning ability from the specific implementation of its tools. You can add, remove, or update tools on the server without ever having to change the agent's core logic.
        </p>
      </Accordion>

      <Accordion title="Why MCP? The Three Pillars" icon={<Server />}>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="font-bold text-blue-300">Standardization</h4>
            <p className="text-sm text-gray-400">Provides a consistent way for an agent to discover and use tools, regardless of the underlying API's complexity.</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="font-bold text-yellow-300">Security</h4>
            <p className="text-sm text-gray-400">Manages API keys and authentication, so they are never exposed to the model or the end-user, preventing leaks.</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h4 className="font-bold text-green-300">Discoverability</h4>
            <p className="text-sm text-gray-400">Allows an agent to dynamically ask what tools are available and how to use them, enabling flexible and powerful new behaviors.</p>
          </div>
        </div>
      </Accordion>

      <Accordion title="Interactive Demo: The Server Explorer" icon={<Globe />}>
        <p className="text-gray-300 mb-4">
          The magic of MCP is <strong>discoverability</strong>. An agent can ask a server, "What tools do you have?" and get a list back. Use the explorer below to simulate this process. Click on a server to see the tools it offers.
        </p>
        <MCPServerExplorer />
      </Accordion>

      <Accordion title="Real-World Use Cases" icon={<Briefcase />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h4 className="font-bold text-lg text-white mb-2">Internal Data Access</h4>
            <p className="text-sm text-gray-400">An MCP server provides an agent with secure, read-only access to a company's internal product database, enabling it to answer complex inventory questions for employees without exposing the database directly.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h4 className="font-bold text-lg text-white mb-2">Open-Source Contribution</h4>
            <p className="text-sm text-gray-400">An MCP server wraps the GitHub API. An agent could use it to find 'good first issues' in projects, analyze the codebase, and even draft a pull request to fix a bug, all through a standardized interface.</p>
          </div>
        </div>
      </Accordion>

      <Accordion title="Security Spotlight: The Protective Layer" icon={<ShieldCheck />}>
        <p className="text-gray-300 mb-4">
          Security is not just a feature; it's the primary reason MCP servers are essential for production-grade agents. By acting as a middleman, the server creates a protective barrier.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li><strong>Credential Isolation:</strong> Your sensitive API keys (e.g., for Stripe, AWS, Google) are stored securely on the server, never touching the client-side or the model itself.</li>
          <li><strong>Access Control:</strong> You can define granular permissions on the server, ensuring an agent can only perform approved actions (e.g., read-only access to a database).</li>
          <li><strong>Mitigating Prompt Injection:</strong> If a malicious user tries to trick the model into calling a dangerous function, the MCP server acts as a final checkpoint, validating the request and rejecting anything that violates its rules.</li>
        </ul>
      </Accordion>

      <Accordion title="Best Practices for Tool Design" icon={<ListChecks />}>
        <p className="text-gray-300 mb-4">
          When you expose tools through an MCP server, their design matters. A well-designed tool is easy for an agent to understand and use correctly.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li><strong>Be Descriptive:</strong> Use clear, unambiguous names and descriptions for your tools and their parameters. The model relies on this text to decide which tool to use.</li>
          <li><strong>Aim for Idempotency:</strong> An idempotent tool can be called multiple times with the same input and will produce the same result without causing issues. This makes your agent more reliable.</li>
          <li><strong>Handle Errors Gracefully:</strong> Your tool should return clear, informative error messages. Instead of just `Error`, return `Error: API key invalid` or `Error: User not found`. The agent can use this feedback to self-correct.</li>
        </ul>
      </Accordion>

      <Accordion title="Exercise: Plan an Agent's MCP Interaction" icon={<Lightbulb />}>
        <p className="text-gray-300 mb-4">
          Your agent's goal is: `Create a GitHub issue titled 'Fix login bug' in the 'acme-corp/website' repo.` Using the `github` MCP server from the explorer above, outline the steps your agent would take. Remember the <strong>Observe, Think, Act</strong> loop!
        </p>
        <AgentPlannerExercise 
          initialPlan={`Step 1 (Think): The goal is to create a GitHub issue. I see the 'github' MCP server has a 'create_issue' tool. I'll need the owner, repo, and title.\n(Act): Call github.create_issue(owner='acme-corp', repo='website', title='Fix login bug').`}
          aiFeedback={{
            suggestion: "Excellent! You've correctly identified the right tool and provided the necessary parameters. A more advanced agent might first use the 'list_repos' tool to confirm the repo exists, or 'get_issue' to check for duplicates before creating a new one. This prevents errors and duplicate work.",
            reasoning: "Thinking about pre-condition checks and potential edge cases is what separates a basic agent from a production-ready one. Building in these validation steps makes your agent more reliable and efficient."
          }}
        />
      </Accordion>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-4/4.5" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: MCP Servers
        </Link>
        <Link 
          to="/instructions/module-5/5.1" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next Module <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson4_6;
