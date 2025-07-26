import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Globe, Server, Lightbulb, ShieldCheck, ListChecks, Briefcase } from 'lucide-react';
import Accordion from '../../../components/Accordion';
import MCPArchitectureDiagram from '../../../components/MCPArchitectureDiagram';
import MCPServerExplorer from '../../../components/MCPServerExplorer';
import AgentPlannerExercise from '../../../components/AgentPlannerExercise';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

const Lesson4_6: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What is the primary role of an MCP Server, using the \'App Store for Agents\' analogy?',
      options: [
        'To run the core AI model itself.',
        'To provide a standardized and secure gateway for an agent to discover and use external tools.',
        'To store the agent\'s long-term memory.',
        'To create the user interface for the chat application.'
      ],
      correctAnswer: 'To provide a standardized and secure gateway for an agent to discover and use external tools.',
      explanation: 'The MCP server acts as a secure middleman, abstracting away API complexities and providing a clean, discoverable \'store\' of tools for the agent.'
    },
    {
      questionText: 'Which of the following is a key SECURITY benefit of using an MCP server?',
      options: [
        'It makes the agent\'s responses faster.',
        'It allows the agent to use more tools.',
        'It isolates sensitive API keys on the server, so they are never exposed to the model or client.',
        'It makes the tool descriptions easier for the model to read.'
      ],
      correctAnswer: 'It isolates sensitive API keys on the server, so they are never exposed to the model or client.',
      explanation: 'Credential isolation is a critical security feature. The agent asks the MCP server to use a tool, and the server uses the stored API key, preventing leaks.'
    },
    {
      questionText: 'What does the principle of \'discoverability\' allow an agent to do?',
      options: [
        'Guess which tools might be available.',
        'Dynamically query a server to get a list of available tools and their usage instructions.',
        'Discover new AI models on the internet.',
        'Read the server\'s source code to find tools.'
      ],
      correctAnswer: 'Dynamically query a server to get a list of available tools and their usage instructions.',
      explanation: 'Discoverability enables agents to be flexible and powerful, as they can learn about and use new tools without being explicitly reprogrammed.'
    },
    {
      questionText: 'Why is it a best practice to design tools to be \'idempotent\'',
      options: [
        'So they run faster.',
        'So they can only be called one time.',
        'So that calling them multiple times with the same input produces the same result without causing issues.',
        'So they are easier for the agent to discover.'
      ],
      correctAnswer: 'So that calling them multiple times with the same input produces the same result without causing issues.',
      explanation: 'Idempotency makes an agent more reliable. If an operation is interrupted, the agent can safely retry it without causing duplicate actions or errors.'
    },
    {
      questionText: 'In the GitHub example, before creating an issue, a more advanced agent might first check for duplicates. This is an example of what?',
      options: [
        'Making a tool less idempotent.',
        'Ignoring the user\'s request.',
        'Building in pre-condition checks to make the agent more reliable and efficient.',
        'Violating the principle of least privilege.'
      ],
      correctAnswer: 'Building in pre-condition checks to make the agent more reliable and efficient.',
      explanation: 'Production-ready agents don\'t just follow the \'happy path.\' They perform validation steps to handle edge cases and prevent errors, making them more robust.'
    }
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Existing Use Case 1 - Enhanced */}
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h4 className="font-bold text-lg text-white mb-2">🏢 Internal Data Access</h4>
            <p className="text-gray-400 mb-3">An agent uses an MCP server to safely query your company's internal database or CRM to answer questions like, "What was our Q3 revenue?" without exposing sensitive credentials.</p>
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-sm text-blue-300"><strong>Server:</strong> <code>company-db-mcp</code></p>
              <p className="text-sm text-gray-400"><strong>Tools:</strong> <code>query_sales_data</code>, <code>get_customer_info</code></p>
            </div>
          </div>

          {/* Existing Use Case 2 - Enhanced */}
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h4 className="font-bold text-lg text-white mb-2">🔗 Third-Party Integrations</h4>
            <p className="text-gray-400 mb-3">An agent uses an MCP server to interact with external services like Stripe, Google Calendar, or GitHub, performing actions like creating invoices or scheduling meetings.</p>
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-sm text-green-300"><strong>Server:</strong> <code>stripe-mcp</code></p>
              <p className="text-sm text-gray-400"><strong>Tools:</strong> <code>create_invoice</code>, <code>get_payment_status</code></p>
            </div>
          </div>

          {/* New Use Case 3 - Development */}
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h4 className="font-bold text-lg text-white mb-2">🚀 Code Repository Management</h4>
            <p className="text-gray-400 mb-3">An agent uses MCP servers to manage development workflows: creating issues, reviewing PRs, and deploying code across multiple repositories.</p>
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-sm text-purple-300"><strong>Server:</strong> <code>github-mcp</code></p>
              <p className="text-sm text-gray-400"><strong>Tools:</strong> <code>create_issue</code>, <code>review_pr</code>, <code>deploy_branch</code></p>
            </div>
          </div>

          {/* New Use Case 4 - Customer Support */}
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h4 className="font-bold text-lg text-white mb-2">💬 Customer Support Automation</h4>
            <p className="text-gray-400 mb-3">An agent uses MCP servers to handle customer inquiries: checking ticket status, updating CRM records, and sending personalized responses.</p>
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-sm text-yellow-300"><strong>Server:</strong> <code>zendesk-mcp</code></p>
              <p className="text-sm text-gray-400"><strong>Tools:</strong> <code>get_ticket</code>, <code>update_customer</code>, <code>send_response</code></p>
            </div>
          </div>

          {/* New Use Case 5 - Financial Operations */}
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h4 className="font-bold text-lg text-white mb-2">💰 Financial Operations</h4>
            <p className="text-gray-400 mb-3">An agent uses MCP servers to manage financial workflows: processing invoices, monitoring transactions, and generating financial reports.</p>
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-sm text-red-300"><strong>Server:</strong> <code>finance-mcp</code></p>
              <p className="text-sm text-gray-400"><strong>Tools:</strong> <code>process_invoice</code>, <code>get_transactions</code>, <code>generate_report</code></p>
            </div>
          </div>

          {/* New Use Case 6 - Healthcare Management */}
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h4 className="font-bold text-lg text-white mb-2">🏥 Healthcare Management</h4>
            <p className="text-gray-400 mb-3">An agent uses MCP servers to manage healthcare workflows: scheduling appointments, accessing patient records, and coordinating care teams.</p>
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-sm text-teal-300"><strong>Server:</strong> <code>healthcare-mcp</code></p>
              <p className="text-sm text-gray-400"><strong>Tools:</strong> <code>schedule_appointment</code>, <code>access_records</code>, <code>coordinate_care</code></p>
            </div>
          </div>

          {/* New Use Case 7 - E-commerce Operations */}
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h4 className="font-bold text-lg text-white mb-2">🛒 E-commerce Operations</h4>
            <p className="text-gray-400 mb-3">An agent uses MCP servers to manage e-commerce operations: tracking orders, updating inventory, and processing returns.</p>
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-sm text-pink-300"><strong>Server:</strong> <code>shopify-mcp</code></p>
              <p className="text-sm text-gray-400"><strong>Tools:</strong> <code>track_order</code>, <code>update_inventory</code>, <code>process_return</code></p>
            </div>
          </div>

          {/* New Use Case 8 - Educational Administration */}
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h4 className="font-bold text-lg text-white mb-2">📚 Educational Administration</h4>
            <p className="text-gray-400 mb-3">An agent uses MCP servers to manage educational workflows: enrolling students, grading assignments, and scheduling classes.</p>
            <div className="bg-gray-800 p-3 rounded">
              <p className="text-sm text-indigo-300"><strong>Server:</strong> <code>education-mcp</code></p>
              <p className="text-sm text-gray-400"><strong>Tools:</strong> <code>enroll_student</code>, <code>grade_assignment</code>, <code>schedule_class</code></p>
            </div>
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

      {/* Validation Quiz */}
      <section className="mt-8">
        <ModuleQuizzes questions={quizQuestions} />
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
