import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Globe, Code, Database, BookOpen } from 'lucide-react';

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

      <p className="text-lg text-gray-300">
        MCP (Model Context Protocol) Servers are specialized backends that provide AI models and agents with access to external tools, data, and services. They act as a secure and standardized bridge between the AI and the outside world.
      </p>

      {/* Core Concepts */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Why Use an MCP Server?</h2>
        <p className="text-gray-300 mb-4">
          MCP Servers solve several key challenges when building with AI:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li><strong>Standardization:</strong> Provides a consistent way for an AI to discover and use tools, regardless of the underlying API.</li>
          <li><strong>Security:</strong> Manages API keys and authentication, so they are never exposed to the model or the end-user.</li>
          <li><strong>Discoverability:</strong> Allows an agent to ask the server what tools are available and how to use them, enabling dynamic functionality.</li>
        </ul>
      </section>

      {/* Use Cases */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">MCP Server Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Use Case */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Globe className="w-8 h-8 mr-3 text-green-400" />
              <h4 className="font-bold text-lg text-white">Connecting Personal APIs</h4>
            </div>
            <p className="text-sm text-gray-400">An MCP server that securely connects to your personal Google Calendar and Spotify accounts, allowing an agent to schedule events and create playlists for you.</p>
          </div>

          {/* Business Use Case */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Database className="w-8 h-8 mr-3 text-yellow-400" />
              <h4 className="font-bold text-lg text-white">Internal Data Access</h4>
            </div>
            <p className="text-sm text-gray-400">An MCP server that provides an AI agent with secure, read-only access to a company's internal product database, enabling it to answer complex inventory questions for employees.</p>
          </div>

          {/* Education Use Case */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <BookOpen className="w-8 h-8 mr-3 text-cyan-400" />
              <h4 className="font-bold text-lg text-white">Academic Research Tool</h4>
            </div>
            <p className="text-sm text-gray-400">An MCP server that connects to academic APIs like arXiv and PubMed, allowing a research agent to find, summarize, and cross-reference scientific papers on a given topic.</p>
          </div>

          {/* Social Improvement Use Case */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Code className="w-8 h-8 mr-3 text-pink-400" />
              <h4 className="font-bold text-lg text-white">Open-Source Contribution</h4>
            </div>
            <p className="text-sm text-gray-400">An MCP server that wraps the GitHub API. An agent could use it to find 'good first issues' in open-source projects, analyze the codebase, and even draft a pull request to fix the bug.</p>
          </div>
        </div>
      </section>

      {/* When to Use MCP Servers */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">When to Use an MCP Server</h2>
        <p className="text-gray-300 mb-4">
          You should use an MCP Server whenever your AI agent needs to interact with external services, especially when security and standardization are important. It is the backbone of any robust, tool-using agent.
        </p>
      </section>

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
