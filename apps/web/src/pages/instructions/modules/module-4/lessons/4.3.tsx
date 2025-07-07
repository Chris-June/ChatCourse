import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Wrench, FileCode, Lightbulb } from 'lucide-react';

const Lesson4_3: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">4.3: Building Custom Tools</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-4/4.2" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-5/5.1" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        The true power of AI is unlocked when you give it the ability to act. Building custom tools allows you to connect the AI to your unique data, APIs, and workflows, creating a system that can solve problems specific to your needs.
      </p>

      {/* Step 1: Define the Tool's Purpose */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Wrench className="w-7 h-7 mr-3 text-orange-400" />
          Step 1: Define the Tool's Purpose
        </h2>
        <p className="text-gray-300 mb-4">
          Before writing any code, clearly define what your tool will do. A good tool has a single, well-defined responsibility. This makes it easier for the AI to understand when and how to use it.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Example: A `create_ticket` Tool</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Purpose:</strong> To create a new support ticket in a project management system (like Jira or Asana).</li>
            <li><strong>Inputs:</strong> It will need a `title` for the ticket and a `description` of the issue.</li>
            <li><strong>Output:</strong> It will return the unique ID of the newly created ticket.</li>
          </ul>
        </div>
      </section>

      {/* Step 2: Provide a Schema */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <FileCode className="w-7 h-7 mr-3 text-green-400" />
          Step 2: Provide a Schema
        </h2>
        <p className="text-gray-300 mb-4">
          The schema is the most important part. It's a detailed description that the AI uses to understand your tool. It includes the function's name, a description of what it does, and a list of its parameters with their types and descriptions.
        </p>
        <pre className="p-3 bg-gray-700 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap">
          <code>
{`{
  "name": "create_ticket",
  "description": "Creates a new support ticket in the project management system.",
  "parameters": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "description": "The title of the support ticket."
      },
      "description": {
        "type": "string",
        "description": "A detailed description of the issue."
      }
    },
    "required": ["title", "description"]
  }
}`}
          </code>
        </pre>
      </section>

      {/* Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Exercise: Design a Tool Schema
        </h2>
        <p className="text-gray-300 mb-4">
          Imagine you want to build a tool called `send_email`. Its purpose is to send an email to a specified recipient.
        </p>
        <p className="text-gray-300 mb-2">In the chat, try to write a prompt that asks the AI to create the JSON schema for this tool. Think about what parameters it would need (e.g., `recipient`, `subject`, `body`).</p>
        <pre className="p-3 bg-gray-700 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap">
          <code>
            Create a JSON schema for a function called 'send_email'. It should have parameters for the recipient's email address, the subject line, and the body of the email. All parameters should be required.
          </code>
        </pre>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-4/4.2" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Model Context Protocol (MCP)
        </Link>
        <Link 
          to="/instructions/module-5/5.1" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Multi-Turn Conversations <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson4_3;
