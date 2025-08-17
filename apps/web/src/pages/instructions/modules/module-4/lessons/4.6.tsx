import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import BestPractices from '@/pages/instructions/components/BestPractices';
import KeyTakeaways from '@/pages/instructions/components/KeyTakeaways';
import LessonTemplate from '@/components/layouts/LessonTemplate';
import {
  Briefcase,
  Globe,
  Lightbulb,
  Server,
  BookOpen,
} from 'lucide-react';
import AgentPlannerExercise from '@/pages/instructions/components/AgentPlannerExercise';
import MCPArchitectureDiagram from '@/pages/instructions/components/MCPArchitectureDiagram';
import MCPServerExplorer from '@/pages/instructions/components/MCPServerExplorer';
import ModuleQuizzes from '@/pages/instructions/modules/ModuleQuizzes/ModuleQuizzes';

const Lesson4_6 = () => {
  const quizQuestions = [
    {
      questionText:
        "What is the main purpose of the Model Context Protocol (MCP), using the 'App Store for Agents' analogy?",
      options: [
        'To give the AI a standard way to discover and use external tools.',
        'To make the AI run faster.',
        'To teach the AI new languages.',
        'To let the AI browse the web freely.',
      ],
      correctAnswer:
        'To give the AI a standard way to discover and use external tools.',
      explanation:
        'MCP provides a standardized interface, like a universal remote, allowing the AI to interact with many different tools without needing to know their internal workings.',
    },
    {
      questionText: 'What is a key difference between basic function calling and MCP?',
      options: [
        'There is no difference.',
        'With MCP, the AI can discover tools dynamically; basic function calling uses hard-coded tools.',
        'MCP only works for weather tools.',
        'Basic function calling is more secure than MCP.',
      ],
      correctAnswer:
        'With MCP, the AI can discover tools dynamically; basic function calling uses hard-coded tools.',
      explanation:
        'The ability to discover tools on-the-fly is a major advantage of MCP, making the AI more adaptable and scalable.',
    },
    {
      questionText: 'Which is a critical SECURITY benefit of using an MCP server?',
      options: [
        "It makes the agent's responses faster.",
        'It isolates sensitive API keys on the server, never exposing them to the model or client.',
        'It allows the agent to use more tools.',
        'It makes tool descriptions easier to read.',
      ],
      correctAnswer:
        'It isolates sensitive API keys on the server, never exposing them to the model or client.',
      explanation:
        'Credential isolation is a critical security feature. The agent asks the MCP server to use a tool, and the server uses the stored API key, preventing leaks.',
    },
    {
      questionText:
        'The ability to combine tools from different, independent servers (like flights, hotels, weather) to complete a complex task is known as what?',
      options: [
        'Tool Redundancy',
        'Service Orchestration',
        'API Chaining',
        'Function Calling',
      ],
      correctAnswer: 'Service Orchestration',
      explanation:
        "MCP's real power comes from orchestration—the ability to act as a conductor, leading a symphony of different services to achieve a high-level goal.",
    },
    {
      questionText:
        'When designing a tool for an MCP server, why is a clear and detailed description so important?',
      options: [
        'It makes the code run faster.',
        "It allows the AI agent to understand the tool's purpose and parameters, enabling it to make smart decisions about when and how to use it.",
        'It automatically translates the tool into different programming languages.',
        'It is only for human developers to read and has no impact on the agent.',
      ],
      correctAnswer:
        "It allows the AI agent to understand the tool's purpose and parameters, enabling it to make smart decisions about when and how to use it.",
      explanation:
        'The agent relies entirely on the tool\'s description (its "docstring") to decide if it\'s the right tool for the job. A poor description leads to poor agent performance.',
    },
  ];

  return (
    <LessonTemplate
      moduleNumber={4}
      lessonNumber={6}
      title="Module 4.6: The Model Context Protocol (MCP)"
      subtitle="Creating an App Store for Agents"
    >
      <div className="space-y-6">
        <div className="bg-muted/30 border border-muted rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-2">Estimated time: 12–18 minutes</p>
          <h3 className="font-semibold text-foreground mb-2">What you'll learn</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>MCP as an “App Store for agents” enabling dynamic tool discovery</li>
            <li>Security benefits like isolating credentials on the server</li>
            <li>Orchestrating tools across multiple servers; clearer tool design</li>
          </ul>
        </div>
        {/* Myth vs Reality */}
        <section className="bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">Myth vs. Reality</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-background border border-border rounded-lg p-3">
              <h4 className="font-semibold text-destructive mb-1">Myth</h4>
              <p className="text-sm text-muted-foreground">“MCP is just the same as basic function calling.”</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-3">
              <h4 className="font-semibold text-success mb-1">Reality</h4>
              <p className="text-sm text-muted-foreground">MCP adds dynamic tool discovery and server‑side isolation of credentials, enabling secure service orchestration beyond hard‑coded tools.</p>
            </div>
          </div>
        </section>
        <p className="text-muted-foreground">
          Welcome to the future of agentic AI. Basic function calling is powerful,
          but it has limitations. It's like having a phone that can only call
          numbers you've already saved. The Model Context Protocol (MCP) is the
          next evolution: it gives your agent an entire "App Store" of tools it
          can discover, understand, and use on the fly.
        </p>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <Server className="w-5 h-5 mr-2 text-primary" />
                From Function Calling to Service Orchestration
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                MCP introduces a standardized way for an AI to communicate with
                external services. Instead of hard-coding a specific tool, the
                agent can query an "MCP Server" to see what tools are available,
                read their descriptions, and decide how to use them.
              </p>
              <div className="p-4 border rounded-lg bg-muted">
                <MCPArchitectureDiagram />
              </div>
              <p className="text-muted-foreground">
                This architecture decouples the agent from the tools. The agent
                only needs to know how to speak "MCP," and it can instantly gain
                access to any tool that also speaks the protocol.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <Globe className="w-5 h-5 mr-2 text-primary" />
                Exploring an MCP Server
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                Imagine your agent needs to interact with GitHub. Instead of you
                writing custom code for every single GitHub API endpoint, you
                connect your agent to a pre-built GitHub MCP Server. The agent can
                then ask the server, "What can you do?" and get a list of
                available tools.
              </p>
              <div className="p-4 border rounded-lg bg-muted">
                <MCPServerExplorer />
              </div>
              <p className="text-muted-foreground">
                This dynamic discovery is the core of MCP's power. It allows
                developers to add, remove, or update tools on the server without
                ever touching the agent's code.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-primary" />
                Real-World Examples of MCP
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-muted">
                  <h4 className="font-bold text-foreground mb-2">
                    ✈️ Travel Agent
                  </h4>
                  <p className="text-muted-foreground mb-3">
                    An agent plans a full trip by orchestrating multiple MCP
                    servers.
                  </p>
                  <div className="p-3 rounded bg-background/50">
                    <p className="text-sm font-mono text-muted-foreground">
                      <strong className="text-foreground">Server:</strong>{' '}
                      <code>airline-mcp</code>,{' '}
                      <strong className="text-foreground">Tools:</strong>{' '}
                      <code>find_flights</code>, <code>book_seat</code>
                    </p>
                    <p className="text-sm font-mono text-muted-foreground">
                      <strong className="text-foreground">Server:</strong>{' '}
                      <code>hotel-mcp</code>,{' '}
                      <strong className="text-foreground">Tools:</strong>{' '}
                      <code>find_rooms</code>, <code>make_reservation</code>
                    </p>
                  </div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-lg text-white mb-2">🔗 Third-Party Integrations</h4>
                  <p className="text-gray-400 mb-3">An agent uses an MCP server to interact with external services like Stripe, Google Calendar, or GitHub, performing actions like creating invoices or scheduling meetings.</p>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="text-sm text-green-300"><strong>Server:</strong> <code>stripe-mcp</code></p>
                    <p className="text-sm text-gray-400"><strong>Tools:</strong> <code>create_invoice</code>, <code>get_payment_status</code></p>
                  </div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-lg text-white mb-2">🚀 Code Repository Management</h4>
                  <p className="text-gray-400 mb-3">An agent uses MCP servers to manage development workflows: creating issues, reviewing PRs, and deploying code across multiple repositories.</p>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="text-sm text-purple-300"><strong>Server:</strong> <code>github-mcp</code></p>
                    <p className="text-sm text-gray-400"><strong>Tools:</strong> <code>create_issue</code>, <code>review_pr</code>, <code>deploy_branch</code></p>
                  </div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-lg text-white mb-2">💬 Customer Support Automation</h4>
                  <p className="text-gray-400 mb-3">An agent uses MCP servers to handle customer inquiries: checking ticket status, updating CRM records, and sending personalized responses.</p>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="text-sm text-yellow-300"><strong>Server:</strong> <code>zendesk-mcp</code></p>
                    <p className="text-sm text-gray-400"><strong>Tools:</strong> <code>get_ticket</code>, <code>update_customer</code>, <code>send_response</code></p>
                  </div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-lg text-white mb-2">💰 Financial Operations</h4>
                  <p className="text-gray-400 mb-3">An agent uses MCP servers to manage financial workflows: processing invoices, monitoring transactions, and generating financial reports.</p>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="text-sm text-red-300"><strong>Server:</strong> <code>finance-mcp</code></p>
                    <p className="text-sm text-gray-400"><strong>Tools:</strong> <code>process_invoice</code>, <code>get_transactions</code>, <code>generate_report</code></p>
                  </div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-lg text-white mb-2">🏥 Healthcare Management</h4>
                  <p className="text-gray-400 mb-3">An agent uses MCP servers to manage healthcare workflows: scheduling appointments, accessing patient records, and coordinating care teams.</p>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="text-sm text-teal-300"><strong>Server:</strong> <code>healthcare-mcp</code></p>
                    <p className="text-sm text-gray-400"><strong>Tools:</strong> <code>schedule_appointment</code>, <code>access_records</code>, <code>coordinate_care</code></p>
                  </div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-lg text-white mb-2">🛍️ E-commerce Operations</h4>
                  <h4 className="font-bold text-lg text-white mb-2">🛒 E-commerce Operations</h4>
                  <p className="text-gray-400 mb-3">An agent uses MCP servers to manage e-commerce operations: tracking orders, updating inventory, and processing returns.</p>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="text-sm text-pink-300"><strong>Server:</strong> <code>shopify-mcp</code></p>
                    <p className="text-sm text-gray-400"><strong>Tools:</strong> <code>track_order</code>, <code>update_inventory</code>, <code>process_return</code></p>
                  </div>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-lg text-white mb-2">📚 Educational Administration</h4>
                  <p className="text-gray-400 mb-3">An agent uses MCP servers to manage educational workflows: enrolling students, grading assignments, and scheduling classes.</p>
                  <div className="bg-gray-800 p-3 rounded">
                    <p className="text-sm text-indigo-300"><strong>Server:</strong> <code>education-mcp</code></p>
                    <p className="text-sm text-gray-400"><strong>Tools:</strong> <code>enroll_student</code>, <code>grade_assignment</code>, <code>schedule_class</code></p>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-2">You can now…</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Explain differences between basic function calling and MCP</li>
            <li>Identify where MCP improves security and scale</li>
            <li>Write clearer tool descriptions for MCP servers</li>
          </ul>
        </div>

        {/* Mini‑Glossary */}
        <section className="bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">Mini‑Glossary</h3>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li><strong>MCP:</strong> A protocol that lets agents discover and use tools dynamically via servers.</li>
            <li><strong>Service Orchestration:</strong> Combining tools from different servers to complete a task.</li>
            <li><strong>Credential Isolation:</strong> Keeping API keys/server secrets on the MCP server, not in the client/model.</li>
          </ul>
        </section>

        <KeyTakeaways
          points={[
            'MCP provides a standard way for an AI to discover and use external tools, like an App Store for agents.',
            'MCP allows for dynamic tool discovery, unlike hard-coded function calling.',
            'A key security benefit is isolating sensitive API keys on the server, away from the model and client.',
            'Service orchestration is the ability to combine tools from different servers to solve complex problems.',
          ]}
        />

        <BestPractices
          dos={[
            'Use clear, descriptive names and descriptions for your tools.',
            'Isolate credentials and sensitive logic on the MCP server.',
            'Design tools to be idempotent where possible.',
            'Return specific, actionable error messages to help the agent self-correct.',
          ]}
          donts={[
            'Don\'t expose raw API keys or sensitive data to the client or the AI model.',
            'Avoid creating overly broad tools; favor specific, single-purpose functions.',
            'Don\'t rely on the agent to guess what a tool does; be explicit in your descriptions.',
          ]}
        />

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-6">
            <AccordionTrigger>
              <div className="flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-amber-400" />
                Exercise: Plan an Agent's MCP Interaction
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <AgentPlannerExercise 
                goal="Create a GitHub issue titled 'Fix login bug' in the 'acme-corp/website' repo."
                initialPlan={`1. (Observe) The goal is to create a GitHub issue. The available server is 'github'.\n2. (Think) The 'github' server likely has a 'create_issue' tool. I will need the owner, repo, and title parameters. The goal provides all of these. \n3. (Act) Call github.create_issue(owner='acme-corp', repo='website', title='Fix login bug').`}
                aiFeedback={{
                  suggestion: "Excellent! You've correctly identified the right tool and provided the necessary parameters. A more advanced agent might first use the 'list_repos' tool to confirm the repo exists, or 'get_issue' to check for duplicates before creating a new one. This prevents errors and duplicate work.",
                  reasoning: "Thinking about pre-condition checks and potential edge cases is what separates a basic agent from a production-ready one. Building in these validation steps makes your agent more reliable and efficient."
                }}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div
          id="knowledge-check"
          className="p-6 bg-muted border border-border rounded-lg mt-6"
        >
          <div className="flex items-center mb-4">
            <BookOpen className="w-6 h-6 mr-3 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">
              Knowledge Check
            </h3>
          </div>
          <p className="text-muted-foreground mb-6">
            Test your understanding of the Model Context Protocol.
          </p>
          <ModuleQuizzes questions={quizQuestions} />
        </div>
      </div>
    </LessonTemplate>
  );
};

export default Lesson4_6;
