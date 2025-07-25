import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Bot, Briefcase, Users, GitCommit, BrainCircuit, Lightbulb, BookOpen, ShieldAlert, Wrench, Share2, LayoutDashboard, MessageSquareQuote, AlertTriangle, Award } from 'lucide-react';
import Accordion from '../../../components/Accordion';
import AgentAnatomyDiagram from '../../../components/AgentAnatomyDiagram';
import SecuritySpotlight from '../../../components/SecuritySpotlight';
import BestPractices from '../../../components/BestPractices';
import HierarchicalAgentDiagram from '../../../components/HierarchicalAgentDiagram';
import RealWorldSpotlight from '../../../components/RealWorldSpotlight';
import TroubleshootingClinic from '../../../components/TroubleshootingClinic';
import AgentEvalDashboard from '../../../components/AgentEvalDashboard';
import DiscussionPrompts from '../../../components/DiscussionPrompts';
import EdgeCaseExplorer from '../../../components/EdgeCaseExplorer';
import GlossarySection from '../../../components/GlossarySection';
import AgentPlannerExercise from '../../../components/AgentPlannerExercise';

const Lesson4_5: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">4.5: Introduction to AI Agents</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-4/4.4" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-5/5.1" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
           Next: Capstone <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <Accordion title="The Big Idea: The Autonomous Problem-Solver" icon={<Bot />} isInitiallyOpen>
        <p className="text-gray-300">
          We've learned about function calling, MCP, custom tools, and GPTs. Now, we put it all together. An <strong>AI Agent</strong> is what you get when you give a model a goal, a set of tools, and the autonomy to decide how to use them to achieve that goal.
        </p>
      </Accordion>

      <Accordion title="Agent Anatomy: A Deep-Dive" icon={<Bot />}>
        <p className="text-gray-300 mb-4">
          Under the hood, most agents are built from four key components working in concert. Understanding this 'anatomy' is the first step to designing your own effective agents.
        </p>
        <AgentAnatomyDiagram />
      </Accordion>

      <Accordion title="The Agentic Mindset: The Observe-Think-Act Loop" icon={<GitCommit />}>
        <p className="text-gray-300 mb-4">
          The key difference is proactivity. While a standard model waits for your command, an agent operates on a continuous loop:
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">The Loop in Action</h3>
          <p className="text-gray-400 mb-4">Let's imagine an agent whose goal is: `Resolve support ticket #123`.</p>
          <ol className="list-decimal pl-5 space-y-3 text-gray-300">
            <li>
              <strong>Observe:</strong> The agent starts with the initial state. `Current State: Unresolved ticket #123.`
            </li>
            <li>
              <strong>Think:</strong> The agent reasons, `To resolve the ticket, I first need to understand the problem. I should use the 'get_ticket_details' tool.`
            </li>
            <li>
              <strong>Act:</strong> The agent executes `get_ticket_details(ticket_id='123')` and gets a result: `{'{"details": "User cannot log in."}'}`.
            </li>
            <li>
              <strong>Observe (Loop 2):</strong> The agent updates its state. `Current State: Ticket #123 is a login issue.`
            </li>
            <li>
              <strong>Think (Loop 2):</strong> The agent reasons, `Login issues are often caused by server errors. I should check the server logs.`
            </li>
            <li>
              <strong>Act (Loop 2):</strong> The agent executes `search_server_logs(query='login error')`...
            </li>
          </ol>
          <p className="mt-4 text-gray-400">This loop continues until the agent achieves its goal or asks for help.</p>
        </div>
      </Accordion>

      <Accordion title="The ReAct Framework: Reason + Act" icon={<BrainCircuit />}>
        <p className="text-gray-300 mb-4">
          Many modern agents use a framework called <strong>ReAct</strong>. It's a simple but powerful idea: at each step, the agent first 'thinks' (reasons) about what to do next and then 'acts' by choosing a tool. This makes the agent's behavior transparent and easier to debug.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm text-gray-200">
          <p><strong className="text-yellow-400">Thought:</strong> The user wants to know the capital of France. I should use my search tool to find this information.</p>
          <p className="mt-2"><strong className="text-green-400">Action:</strong> `search(query='capital of France')`</p>
          <p className="mt-4"><strong className="text-cyan-400">Observation:</strong> The search tool returned "Paris".</p>
          <p className="mt-4"><strong className="text-yellow-400">Thought:</strong> I have the answer. I will now respond to the user.</p>
          <p className="mt-2"><strong className="text-green-400">Action:</strong> `respond('The capital of France is Paris.')`</p>
        </div>
      </Accordion>

      <Accordion title="Agent Use Cases" icon={<Briefcase />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-2 flex items-center"><Users className="w-5 h-5 mr-2 text-purple-400" /> Personal Assistant</h3>
            <p className="text-gray-400">
              An agent can manage your calendar, book appointments, and even draft emails based on your personal preferences and schedule.
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-2 flex items-center"><Briefcase className="w-5 h-5 mr-2 text-indigo-400" /> Automated Data Analyst</h3>
            <p className="text-gray-400">
              An agent can be tasked to pull data from a database, perform analysis, generate charts, and email a summary report every Monday morning.
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-2 flex items-center"><BookOpen className="w-5 h-5 mr-2 text-cyan-400" /> Personalized Tutor</h3>
            <p className="text-gray-400">
              An agent can track a student's progress, identify areas of weakness, and generate custom practice problems and explanations to help them master difficult concepts.
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-2 flex items-center"><Users className="w-5 h-5 mr-2 text-pink-400" /> Disaster Response Coordinator</h3>
            <p className="text-gray-400">
              An agent can monitor social media and news feeds for disaster events, automatically identify areas of greatest need, and help coordinate the dispatch of resources and volunteers.
            </p>
          </div>
        </div>
      </Accordion>

      <Accordion title="Tool-Design Best Practices" icon={<Wrench />}>
        <p className="text-gray-300 mb-4">Well-designed tools are the difference between a stable agent and one that spirals. Good tools are predictable, reliable, and clear.</p>
        <BestPractices 
          dos={[
            "Give tools clear, descriptive names (e.g., `getUserDetails` not `getData`).",
            "Define expected inputs and outputs explicitly (use TypeScript!).",
            "Make tools idempotent: running them multiple times with the same input should yield the same result.",
            "Handle errors gracefully and return informative error messages."
          ]}
          donts={[
            "Don't let a tool have hidden side-effects.",
            "Avoid making tools depend on each other's internal state.",
            "Don't require complex, multi-step authentication within the tool itself.",
            "Avoid returning huge, unstructured data blobs. Keep responses concise."
          ]}
        />
      </Accordion>

      <Accordion title="Advanced Pattern: Hierarchical Agents" icon={<Share2 />}>
        <p className="text-gray-300 mb-4">
          For complex tasks, a single agent can become overwhelmed. A powerful pattern is to use a 'master' agent that delegates sub-tasks to specialized 'child' agents. This improves modularity, scalability, and performance.
        </p>
        <HierarchicalAgentDiagram />
        <h4 className="text-lg font-semibold text-white mt-6 mb-2">Pseudo-code Example</h4>
        <p className="text-gray-300 mb-4">
          Here’s how a master agent might orchestrate the report generation task:
        </p>
        <div className="bg-gray-900 rounded-md p-4">
          <pre><code className="language-javascript">
{`// Pseudo-code for a Master Agent
function master_agent(goal):
  if goal is "Generate quarterly report":
    // Delegate to specialized agents
    raw_data = data_prep_agent.run("fetch sales data")
    analysis = analysis_agent.run(raw_data)
    report = reporting_agent.run(analysis)
    return report`}
          </code></pre>
        </div>
      </Accordion>

      <Accordion title="Real-World Case Study: AcmeCorp" icon={<Briefcase />}>
        <RealWorldSpotlight 
          icon={<Briefcase />}
          title="AcmeCorp's Audit Automation"
          description="AcmeCorp automated its financial audits using a master agent that delegated tasks to specialists: a 'Data Extractor' (from SQL, PDFs), an 'Anomaly Detector', and a 'Report Generator'. This reduced audit times by 60% and improved accuracy by 40%, proving that hierarchical agents excel in complex, multi-step workflows."
        />
      </Accordion>

      <Accordion title="Troubleshooting & Debugging Clinic" icon={<Wrench />}>
        <TroubleshootingClinic 
          items={[
            { 
              problem: "Agent gets stuck in a loop, repeating the same action.",
              solution: "Increase the 'Frequency Penalty' to discourage repetition. Also, improve the prompt to encourage more diverse actions or add a 'max retries' limit to the agent's logic."
            },
            { 
              problem: "Agent hallucinates a tool that doesn't exist.",
              solution: "Ensure the list of available tools and their descriptions is perfectly clear and accurate in the system prompt. The agent can only use what it knows about."
            },
            { 
              problem: "Agent fails to parse a tool's output correctly.",
              solution: "Standardize your tool outputs. Always return a clean, predictable format (like JSON). Add error handling to your tools to return a clear error message instead of malformed data."
            }
          ]}
        />
      </Accordion>

      <Accordion title="How Good is Your Agent? The Metric Dashboard" icon={<LayoutDashboard />}>
        <p className="text-gray-300 mb-4">
          Building an agent is just the first step. To improve it, you need to measure it. Dashboards are a common way to track key performance indicators (KPIs) over time.
        </p>
        <AgentEvalDashboard />
      </Accordion>

      <Accordion title="Building Your Own Agents: Frameworks" icon={<Users />}>
        <p className="text-gray-300 mb-4">
          While you can build agent loops from scratch, several frameworks can accelerate development. These provide pre-built components for tool management, memory, and agent execution. Popular choices include:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-blue-400">
          <li><a href="https://langchain.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">LangChain</a></li>
          <li><a href="https://www.llamaindex.ai/" target="_blank" rel="noopener noreferrer" className="hover:underline">LlamaIndex</a></li>
          <li><a href="https://github.com/microsoft/autogen" target="_blank" rel="noopener noreferrer" className="hover:underline">Microsoft AutoGen</a></li>
        </ul>
      </Accordion>

      <Accordion title="Security & Ethics Spotlight" icon={<ShieldAlert />}>
        <SecuritySpotlight 
          scenario="An agent designed to summarize customer feedback is given broad database access. It inadvertently includes a user's PII (Personally Identifiable Information) in a summary report that gets shared widely."
          guidelines={[
            "Principle of Least Privilege: Only grant agents the absolute minimum permissions they need.",
            "Input Sanitization & Output Filtering: Never trust external data. Clean inputs and filter outputs to redact sensitive information.",
            "Human-in-the-Loop: For sensitive actions, require human approval before the agent proceeds.",
            "Logging & Auditing: Keep detailed logs of agent actions to trace and rectify any mistakes."
          ]}
        />
      </Accordion>

      <Accordion title="'What If?' Edge-Case Explorer" icon={<AlertTriangle />}>
        <p className="text-gray-300 mb-4">Great agents are robust. They don't just work in the ideal case; they handle the unexpected gracefully. Explore these common edge cases to see how your agent might react.</p>
        <EdgeCaseExplorer 
          cases={[
            { 
              scenario: "An API returns a 503 error...",
              outcome: "A robust agent should have a retry mechanism with exponential backoff. If it still fails, it should log the error, mark the task as failed, and move on, rather than getting stuck."
            },
            { 
              scenario: "The user's request is ambiguous...",
              outcome: "Instead of guessing, a good agent should ask for clarification. It could present the user with a few possible interpretations and ask them to choose."
            },
            { 
              scenario: "A tool returns unexpected (but valid) data...",
              outcome: "The agent's core logic should be flexible. It should be able to recognize the data doesn't fit the plan and either re-plan its next steps or report the anomaly to the user."
            }
          ]}
        />
      </Accordion>

      <Accordion title="Peer Review & Discussion Prompts" icon={<MessageSquareQuote />}>
        <DiscussionPrompts 
          prompts={[
            "What is the single point of failure in your agent's design?",
            "How could a malicious user exploit your agent's tools or prompt?",
            "If you had to remove one tool from your agent's toolset, which would it be and why?",
            "How would your agent handle an unexpected API outage from one of its tools?"
          ]}
        />
      </Accordion>

      <Accordion title="Hands-On Mini-Project: 'Ticket-Bot' (Coming Soon)" icon={<GitCommit />} isDisabled>
        <p className="text-gray-400">
          This upcoming lab will guide you through building a simple support ticket agent from scratch. You'll fork a GitHub repo, implement the Observe-Think-Act loop, and deploy it to the cloud. Stay tuned!
        </p>
      </Accordion>

      <Accordion title="Glossary & Further Reading" icon={<BookOpen />}>
        <GlossarySection 
          items={[
            {
              term: "Idempotent",
              definition: "An operation that produces the same result if executed multiple times. Crucial for predictable agent tools.",
              link: "https://en.wikipedia.org/wiki/Idempotence"
            },
            {
              term: "Principle of Least Privilege",
              definition: "A security concept where a component is only given the minimum permissions necessary to perform its function.",
              link: "https://en.wikipedia.org/wiki/Principle_of_least_privilege"
            },
            {
              term: "Exponential Backoff",
              definition: "An error handling strategy where you progressively wait longer between retries after a failure.",
              link: "https://en.wikipedia.org/wiki/Exponential_backoff"
            }
          ]}
        />
      </Accordion>

      <Accordion title="Capstone Challenge: Design Your Own Agent (Coming Soon)" icon={<Award />} isDisabled>
        <p className="text-gray-400">
          The final challenge for this module! You'll be given a complex, real-world problem and tasked with designing a multi-agent system to solve it. This will test all the concepts you've learned in this lesson. Get ready!
        </p>
      </Accordion>

      <Accordion title="Exercise: Think Like an Agent" icon={<Lightbulb />}>
        <p className="text-gray-300 mb-4">
          Consider the 'Automated Data Analyst' agent. Its goal is: `Generate and email the quarterly sales report.` Use the planner below to outline the first few steps of its <strong>Observe, Think, Act</strong> loop. What tools would it need? What decisions would it make? Get feedback on your plan from a simulated AI peer.
        </p>
        <AgentPlannerExercise 
          initialPlan={`Step 1 (Think): I need to get the sales data for the latest quarter.\n(Act): Call get_sales_data(quarter='Q3').\n\nStep 2 (Think): Now I need to analyze this data to find key insights.\n(Act): Call analyze_data(data).`}
          aiFeedback={{
            suggestion: "This is a good start! To make the plan more robust, consider adding a step for error handling. What should the agent do if the 'get_sales_data' tool fails or returns no data? Also, think about the final step: how will the agent email the report? It will likely need another tool, like 'send_email'.",
            reasoning: "Great agents don't just follow a happy path; they anticipate and handle potential failures. Defining all necessary tools upfront is a key part of effective agent design."
          }}
        />
      </Accordion>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-4/4.4" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Understanding GPTs
        </Link>
        <Link 
          to="/instructions/module-5/5.1" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Module 5: Capstone Project <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson4_5;
