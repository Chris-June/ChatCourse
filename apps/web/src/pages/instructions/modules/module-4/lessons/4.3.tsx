import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Wrench, FileCode, Lightbulb } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';

const Lesson4_3: React.FC = () => {
  const { completeLesson } = useProgressStore();
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">4.3 Advanced Exercises</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-4/4.2" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Model Context Protocol
          </Link>
          <Link 
            to="/instructions/module-5/5.1" 
            onClick={() => completeLesson(4, 3)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next: Understanding GPT's<ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-inner">
        <p className="text-gray-400">
          In the last lesson, we saw how the <strong>Model Context Protocol (MCP)</strong> allows AI to discover and use tools from external servers. Now, let's get our hands dirty and build one of those tools from scratch.
        </p>
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
          The schema is the most important part. It's a detailed description that the AI uses to understand your tool.
        </p>
        <div className="bg-gray-900 p-3 rounded-md">
          <code className="block whitespace-pre-wrap break-words font-mono text-sm text-gray-200">
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
        </div>
      </section>

      {/* Step 3: Implement the Tool Logic */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Step 3: Implement the Tool Logic</h2>
        <p className="text-gray-300 mb-4">
          This is the actual JavaScript/TypeScript function that executes when the AI calls your tool.
        </p>
        <div className="bg-gray-900 p-3 rounded-md">
          <code className="block whitespace-pre-wrap break-words font-mono text-sm text-gray-200">
{`async function createTicket(args) {
  const { title, description } = args;
  
  console.log(\`Creating ticket: \${title}\`);
  
  // In a real application, you would make an API call here
  // to a service like Jira, Asana, etc.
  
  const ticketId = \`TICKET-\${Math.floor(Math.random() * 1000)}\`;
  
  return { ticket_id: ticketId };
}`}
          </code>
        </div>
      </section>

      {/* Step 4: Connect to the AI & Handle Output */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Step 4: Connect and Handle the Response</h2>
        <p className="text-gray-300 mb-4">
          Finally, you need a router or dispatcher to connect the AI's request to your function and then send the result back to the model.
        </p>
        <div className="bg-gray-900 p-3 rounded-md">
          <code className="block whitespace-pre-wrap break-words font-mono text-sm text-gray-200">
{`// 1. Model generates a function call
const modelResponse = {
  function_call: {
    name: 'create_ticket',
    arguments: JSON.stringify({ title: 'Login button not working', description: 'Users cannot log in on the main page.' })
  }
};

// 2. Your application routes the call
const availableFunctions = { create_ticket: createTicket };
const functionToCall = availableFunctions[modelResponse.function_call.name];

// 3. Execute and get the result
const functionArgs = JSON.parse(modelResponse.function_call.arguments);
const result = await functionToCall(functionArgs); // { ticket_id: 'TICKET-123' }

// 4. Send the result back to the model for the final response
// The model would then generate a response like:
// "I've created a new support ticket for you. The ID is TICKET-123."`}
          </code>
        </div>
      </section>

      {/* Best Practices */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Best Practices for Tool Building</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Error Handling:</strong> Wrap your function logic in try/catch blocks to gracefully handle API failures or invalid data.</li>
            <li><strong>Clear Descriptions:</strong> Write detailed descriptions for both the function and its parameters. The model relies heavily on this text to make correct decisions.</li>
            <li><strong>Atomic Functions:</strong> Each tool should do one thing well. Avoid creating monolithic tools that perform many different actions.</li>
            <li><strong>Return Useful Information:</strong> Your tool should return a result that is useful to the model, such as a confirmation message, an ID, or the data it requested.</li>
        </ul>
      </section>

      {/* Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Your Turn: Use a Custom Tool
        </h2>
        <p className="text-gray-300 mb-4">
          Imagine you have successfully built and registered a \`send_email\` tool with the AI. The tool takes a \`recipient\`, \`subject\`, and \`body\`.
          Use the chat window below to ask the AI to send an email. See if it generates the correct function call based on your request.
        </p>
        <InlineChat 
          moduleId="module-4.3-send-email"
          maxAttempts={10}
          placeholder='Try: "Send an email to my manager about the Q3 report..."' 
          simulatedResponse={`{\n  "name": "send_email",\n  "arguments": {\n    "recipient": "manager@example.com",\n    "subject": "Q3 Report",\n    "body": "Here is the Q3 report you requested.",\n  }\n}`}
        />
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
          onClick={() => completeLesson(4, 3)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Understanding GPT's <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson4_3;