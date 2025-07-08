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

      <div className="bg-gray-800 p-4 rounded-lg shadow-inner">
        <p className="text-gray-400">
          In the previous lesson, we learned how AI models can use <strong>Function Calling</strong> to execute predefined tools with specific inputs. 
          Now, we’re scaling that idea with <strong>MCP</strong>, which acts like a toolchain protocol — allowing AI to dynamically discover and interact with entire libraries of tools through a consistent interface.
        </p>
      </div>

      {/* MCP vs Function Calling */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Share2 className="w-7 h-7 mr-3 text-cyan-400" />
          MCP vs. Function Calling
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-3 text-left font-semibold text-white">Concept</th>
                <th className="p-3 text-left font-semibold text-white">Function Calling</th>
                <th className="p-3 text-left font-semibold text-white">MCP</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr>
                <td className="p-3 border-t border-gray-700">Tools Defined By</td>
                <td className="p-3 border-t border-gray-700">Developer inside the app</td>
                <td className="p-3 border-t border-gray-700">External MCP Server</td>
              </tr>
              <tr>
                <td className="p-3 border-t border-gray-700">Discovery Method</td>
                <td className="p-3 border-t border-gray-700">Predefined in code</td>
                <td className="p-3 border-t border-gray-700">Dynamic via <code className="text-purple-400">list_resources</code></td>
              </tr>
              <tr>
                <td className="p-3 border-t border-gray-700">Tool Scope</td>
                <td className="p-3 border-t border-gray-700">Static / per session</td>
                <td className="p-3 border-t border-gray-700">Modular, server-managed</td>
              </tr>
              <tr>
                <td className="p-3 border-t border-gray-700">Execution</td>
                <td className="p-3 border-t border-gray-700">Direct function call</td>
                <td className="p-3 border-t border-gray-700">HTTP-style RPC over MCP</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Server className="w-7 h-7 mr-3 text-green-400" />
          The MCP Interaction Flow
        </h2>
        <p className="text-gray-300 mb-4">The AI follows a clear, three-step process to use an MCP resource:</p>
        <ol className="list-decimal pl-5 space-y-2 text-gray-300">
            <li><strong>Discovery:</strong> The AI asks an MCP server what resources it has using <code className="text-purple-400">list_resources</code>.</li>
            <li><strong>Inspection:</strong> To understand a tool's purpose and parameters, the AI reads its schema with <code className="text-purple-400">read_resource</code>.</li>
            <li><strong>Execution:</strong> The AI calls the resource with the required arguments, which triggers the tool on the server.</li>
        </ol>
        
        <h3 className="text-xl font-semibold text-white mt-6 mb-4">Resource Descriptor Example</h3>
        <p className="text-gray-300 mb-2">When the AI inspects a resource, it receives a JSON descriptor like this:</p>
        <pre className="p-3 bg-gray-900 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap"><code>{`{
  "name": "get_employee_email",
  "description": "Retrieves the email for a given employee.",
  "parameters": {
    "type": "object",
    "properties": {
      "employee_name": { "type": "string" }
    },
    "required": ["employee_name"]
  }
}`}</code></pre>
      </section>

      {/* Interactive Prompt Example */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Database className="w-7 h-7 mr-3 text-yellow-400" />
          AI Reasoning Trace
        </h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <p className="font-mono text-green-400">Prompt: “What’s Jane Doe’s email?”</p>
          <div className="mt-4 pl-4 border-l-2 border-gray-600 space-y-2 text-gray-300">
            <p>1. <strong>Discovery:</strong> AI checks available MCP servers and finds `company_db`.</p>
            <p>2. <strong>Inspection:</strong> AI calls <code className="text-purple-400">list_resources</code> on `company_db` and finds a promising tool: `get_employee_email`.</p>
            <p>3. <strong>Preparation:</strong> AI prepares the tool call based on the resource's schema.</p>
            <pre className="p-2 bg-gray-800 rounded-md text-sm"><code>{`{
  "tool": "get_employee_email",
  "arguments": { "employee_name": "Jane Doe" }
}`}</code></pre>
            <p>4. <strong>Execution & Response:</strong> The tool returns <code className="text-green-400">"jane.doe@example.com"</code>. The AI formulates the final answer.</p>
          </div>
          <p className="mt-4 font-mono text-green-400">Final Response: “Jane Doe’s email is jane.doe@example.com.”</p>
        </div>
      </section>

      {/* Best Practices */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">Best Practices</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li><strong>Clear Naming:</strong> Use descriptive, unambiguous names for resources and parameters.</li>
              <li><strong>Structured Responses:</strong> Return predictable JSON objects from your tools, not just raw strings.</li>
              <li><strong>Handle Errors:</strong> Implement robust error handling for failed calls or invalid arguments.</li>
              <li><strong>Rich Descriptions:</strong> The better your resource descriptions, the better the model can reason about when to use them.</li>
          </ul>
      </section>

      <details className="mt-4 text-sm text-gray-400 bg-gray-800 p-4 rounded-lg">
        <summary className="cursor-pointer font-semibold text-blue-300">Advanced: Chaining Resources</summary>
        <p className="mt-2">MCP also supports workflows where the output of one resource feeds into another. For example, a model might retrieve a user's email, then use it to fetch their calendar availability — all via separate resources on one or more MCP servers.</p>
      </details>

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
