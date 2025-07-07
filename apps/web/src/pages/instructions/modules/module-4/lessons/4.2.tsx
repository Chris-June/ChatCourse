import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Server, Database, Share2 } from 'lucide-react';

const Lesson4_2: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">4.2: Model Context Protocol (MCP)</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-4/4.1" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-4/4.3" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        The Model Context Protocol (MCP) is a standardized way for AI models to interact with external tools and data sources. It creates a common language for an AI to discover, understand, and use tools, much like how APIs allow different software applications to communicate.
      </p>

      {/* What is MCP? */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Share2 className="w-7 h-7 mr-3 text-cyan-400" />
          What is MCP?
        </h2>
        <p className="text-gray-300 mb-4">
          Think of MCP as a universal adapter. Instead of building custom integrations for every single tool, developers can expose their tools via an "MCP Server." The AI can then connect to this server, see what "Resources" (tools) are available, and learn how to use them.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Core Concepts</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li>
              <strong>MCP Server:</strong> A service that exposes a collection of tools or data. For example, a `github` server could provide tools for interacting with repositories, issues, and pull requests.
            </li>
            <li>
              <strong>Resource:</strong> A specific tool or data entity provided by a server. A `github` server might offer resources like `create_pull_request` or `get_issue_details`.
            </li>
          </ul>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Server className="w-7 h-7 mr-3 text-green-400" />
          The MCP Interaction Flow
        </h2>
        <ol className="list-decimal pl-5 space-y-2 text-gray-300">
            <li><strong>Discovery:</strong> The AI asks an MCP server what resources it has (`list_resources`).</li>
            <li><strong>Inspection:</strong> The AI can read the details of a specific resource to understand what it does and what parameters it needs (`read_resource`).</li>
            <li><strong>Execution:</strong> The AI uses the resource, providing the necessary arguments, which is similar to a standard function call.</li>
        </ol>
        <p className="text-gray-400 mt-4">
            This protocol abstracts away the complexity. The AI doesn't need to know the underlying code of the tool, only how to interact with it through the standardized MCP interface.
        </p>
      </section>

      {/* Conceptual Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Database className="w-7 h-7 mr-3 text-yellow-400" />
          Conceptual Exercise
        </h2>
        <p className="text-gray-300 mb-4">
          Imagine an MCP server named `company_db` that provides access to an internal employee database. It offers a resource called `get_employee_email`.
        </p>
        <p className="text-gray-300 mb-2">If you asked the AI, "What is Jane Doe's email address?", what steps would the AI take using MCP?</p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Expected AI Logic:</h3>
          <ol className="list-decimal pl-5 space-y-2 text-gray-300 text-sm">
            <li><strong>Identify Tool:</strong> The AI determines it needs to find an employee's email. It recognizes the `company_db` server is the right place to look.</li>
            <li><strong>Call Resource:</strong> It constructs and executes a call to the resource it found.</li>
            <li><strong>Formulate Response:</strong> After receiving the email address from the tool, it would present it to you in a natural sentence.</li>
          </ol>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-4/4.1" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Function Calling
        </Link>
        <Link 
          to="/instructions/module-4/4.3" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Building Custom Tools <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson4_2;
