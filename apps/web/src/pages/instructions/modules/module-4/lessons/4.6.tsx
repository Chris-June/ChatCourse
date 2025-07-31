import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Globe, Server, Lightbulb, ShieldCheck, Briefcase, Search, Zap, CheckSquare } from 'lucide-react';
import Accordion from '../../../components/Accordion';
import MCPArchitectureDiagram from '../../../components/MCPArchitectureDiagram';
import InlineChat from '../../../../../components/InlineChat';
import MCPServerExplorer from '../../../components/MCPServerExplorer';
import AgentPlannerExercise from '../../../components/AgentPlannerExercise';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

const mcpReasoningChecklist = [
  { text: 'My goal is to find an employee\'s email.', completed: false },
  { text: 'I see a `company_db` tool server is available.', completed: false },
  { text: 'I will ask it what tools it has... it has `get_employee_email`.', completed: false },
  { text: 'Perfect. I will call that tool with the employee\'s name.', completed: false },
];

const Lesson4_6: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What is the main purpose of the Model Context Protocol (MCP), using the \'App Store for Agents\' analogy?',
      options: [
        'To give the AI a standard way to discover and use external tools.',
        'To make the AI run faster.',
        'To teach the AI new languages.',
        'To let the AI browse the web freely.'
      ],
      correctAnswer: 'To give the AI a standard way to discover and use external tools.',
      explanation: 'MCP provides a standardized interface, like a universal remote, allowing the AI to interact with many different tools without needing to know their internal workings.'
    },
    {
      questionText: 'What is a key difference between basic function calling and MCP?',
      options: [
        'There is no difference.',
        'With MCP, the AI can discover tools dynamically; basic function calling uses hard-coded tools.',
        'MCP only works for weather tools.',
        'Basic function calling is more secure than MCP.'
      ],
      correctAnswer: 'With MCP, the AI can discover tools dynamically; basic function calling uses hard-coded tools.',
      explanation: 'The ability to discover tools on-the-fly is a major advantage of MCP, making the AI more adaptable and scalable.'
    },
    {
      questionText: 'Which is a critical SECURITY benefit of using an MCP server?',
      options: [
        'It makes the agent\'s responses faster.',
        'It isolates sensitive API keys on the server, never exposing them to the model or client.',
        'It allows the agent to use more tools.',
        'It makes tool descriptions easier to read.'
      ],
      correctAnswer: 'It isolates sensitive API keys on the server, never exposing them to the model or client.',
      explanation: 'Credential isolation is a critical security feature. The agent asks the MCP server to use a tool, and the server uses the stored API key, preventing leaks.'
    },
    {
      questionText: 'The ability to combine tools from different, independent servers (like flights, hotels, weather) to complete a complex task is known as what?',
      options: [
        'Tool Redundancy',
        'Service Orchestration',
        'API Chaining',
        'Function Calling'
      ],
      correctAnswer: 'Service Orchestration',
      explanation: 'MCP\'s real power comes from orchestration—the ability to act as a conductor, leading a symphony of different services to achieve a high-level goal.'
    },
    {
      questionText: 'Why is designing tools to be \'idempotent\' a best practice?',
      options: [
        'So they run faster.',
        'So that calling them multiple times with the same input produces the same result without issues.',
        'So they can only be called one time.',
        'So they are easier for the agent to discover.'
      ],
      correctAnswer: 'So that calling them multiple times with the same input produces the same result without issues.',
      explanation: 'Idempotency makes an agent more reliable. If an operation is interrupted, the agent can safely retry it without causing duplicate actions or errors.'
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

      <Accordion title="Your First MCP Interaction: The AI Detective" icon={<Search />}>
        <p className="text-gray-300 mb-4">
          Let's see MCP in action. Imagine an AI detective whose mission is to find an employee's email. It needs to discover and use the right tool from a secure server. Follow the detective's thought process in the checklist as you interact with the chat below.
        </p>
        <InlineChat 
          moduleId="module-4.6-mcp-email"
          placeholder="Ask for an employee's email, e.g., 'What is Chris June's email?'"
          systemPrompt="You are a helpful assistant that demonstrates Model Context Protocol (MCP) by helping users find employee email addresses. When asked for an email, you should use the 'get_employee_email' tool from the 'company_db' MCP server. Guide users through the process of discovering and using MCP tools."
          initialMessages={[
            {
              role: 'assistant',
              content: 'I can help you find an employee\'s email address. Try asking something like: "What is the email address for Chris June?" or "Can you get me the email for Alex Chen?"'
            }
          ]}
          simulatedResponse={`Okay, I need to find an employee's email address. I will use the 'get_employee_email' tool from the 'company_db' MCP server.\n\n<tool_code>\n<mcp_server_request>\n  <server>company_db</server>\n  <tool_name>get_employee_email</tool_name>\n  <parameters>\n    <employee_name>the person you asked for</employee_name>\n  </parameters>\n</mcp_server_request>\n</tool_code>\n\nfirstName.lastName@email.ca`}
          challengeChecklist={mcpReasoningChecklist}
          maxAttempts={3}
          maxFollowUps={2}
        />
      </Accordion>

      <Accordion title="The MCP Architecture" icon={<Server />}>
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

      <Accordion title="Key Takeaways & Best Practices" icon={<CheckSquare />}>
        <p className="text-gray-300 mb-4">
          MCP transforms agents from static encyclopedias into dynamic problem-solvers. Here are the core concepts and best practices:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-blue-300 mb-2 flex items-center"><Zap size={18} className="mr-2"/>Core Pillars of MCP</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-300 text-sm">
              <li><strong>Standardization:</strong> A universal language for agents to talk to any tool.</li>
              <li><strong>Discoverability:</strong> Agents can ask a server what tools it has, enabling them to adapt dynamically.</li>
              <li><strong>Orchestration:</strong> Enables agents to combine tools from different servers to complete complex tasks.</li>
            </ul>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-blue-300 mb-2 flex items-center"><ShieldCheck size={18} className="mr-2"/>Security & Design Best Practices</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-300 text-sm">
              <li><strong>Isolate Credentials:</strong> Keep API keys on the server, never expose them to the model or client.</li>
              <li><strong>Be Descriptive:</strong> Use clear names and descriptions for tools so the agent can make smart choices.</li>
              <li><strong>Aim for Idempotency:</strong> Ensure calling a tool multiple times with the same input doesn't cause errors.</li>
              <li><strong>Handle Errors Gracefully:</strong> Return specific error messages the agent can use to self-correct.</li>
            </ul>
          </div>
        </div>
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
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: AI Agents
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
