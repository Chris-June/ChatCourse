import React from 'react';
import { Bot, Briefcase, Users, GitCommit, Lightbulb, BookOpen, LayoutDashboard, Award } from 'lucide-react';
import Accordion from '../../../components/Accordion';
import AgentAnatomyDiagram from '../../../components/AgentAnatomyDiagram';
import SecuritySpotlight from '../../../components/SecuritySpotlight';
import BestPractices from '../../../components/BestPractices';
import HierarchicalAgentDiagram from '../../../components/HierarchicalAgentDiagram';
import RealWorldSpotlight from '../../../components/RealWorldSpotlight';
import TroubleshootingClinic from '../../../components/TroubleshootingClinic';
import AgentEvalDashboard from '../../../components/AgentEvalDashboard';
import DiscussionPrompts from '../../../components/DiscussionPrompts';
import GlossarySection from '../../../components/GlossarySection';
import AgentPlannerExercise from '../../../components/AgentPlannerExercise';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import KeyTakeaways from '../../../components/KeyTakeaways';

const Lesson4_5: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What is the key characteristic that defines an AI Agent?',
      options: [
        'Its ability to understand human language.',
        'Its autonomy to use tools to proactively achieve a goal.',
        'The specific programming language it\'s written in.',
        'The size of its core model.'
      ],
      correctAnswer: 'Its autonomy to use tools to proactively achieve a goal.',
      explanation: 'While other aspects are important, an agent\'s defining feature is its ability to operate independently in a loop to solve problems without step-by-step human commands.'
    },
    {
      questionText: 'According to the \'Agent Anatomy\' diagram, which component is responsible for the agent\'s long-term and short-term recall?',
      options: [
        'Core Model',
        'Tools',
        'Memory',
        'Planning'
      ],
      correctAnswer: 'Memory',
      explanation: 'The Memory component, often using vector databases or other storage, allows the agent to remember past interactions and information, giving it context for its decisions.'
    },
    {
      questionText: 'What are the three steps in the agent\'s primary operational cycle?',
      options: [
        'Input-Process-Output',
        'Read-Write-Execute',
        'Observe-Think-Act',
        'Plan-Delegate-Review'
      ],
      correctAnswer: 'Observe-Think-Act',
      explanation: 'This loop is the fundamental engine of an agent. It continuously observes the state, thinks about the next best action, and then acts by using a tool or responding.'
    },
    {
      questionText: 'In our \'Automated Restaurant Chain\' analogy, what is the primary role of the \'Executive Chef\' (Manager Agent)?',
      options: [
        'To execute the final task.',
        'To directly interact with the user.',
        'To break down a complex goal into smaller sub-tasks and delegate them to \'Worker\' agents.',
        'To monitor the system for security threats.'
      ],
      correctAnswer: 'To break down a complex goal into smaller sub-tasks and delegate them to \'Worker\' agents.',
      explanation: 'The Executive Chef (Manager) acts as an orchestrator, decomposing the large problem and coordinating the specialized kitchens (Workers) who handle the individual steps.'
    },
    {
      questionText: 'Why is it a critical security best practice to follow the \'Principle of Least Privilege\' when giving tools to an agent?',
      options: [
        'To make the agent run faster.',
        'To ensure the agent only has the minimum permissions necessary to do its job, reducing potential damage if compromised.',
        'To allow the agent to access all data freely.',
        'To make the agent\'s code easier to write.'
      ],
      correctAnswer: 'To ensure the agent only has the minimum permissions necessary to do its job, reducing potential damage if compromised.',
      explanation: 'This security principle is vital for mitigating risk. By restricting an agent\'s permissions, you limit the blast radius if it behaves unexpectedly or is exploited by a malicious actor.'
    }
  ];

  return (
    <LessonTemplate
      moduleNumber={4}
      lessonNumber={5}
      title="From Tools to Autonomy: Building Your First AI Agent"
      subtitle="Learn how to assemble models, memory, and tools into an autonomous agent that can reason and act to achieve complex goals."
      quizQuestions={quizQuestions}
    >
      <div className="space-y-6 p-4 md:p-6">
        <div className="bg-muted/30 border border-muted rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-2">Estimated time: 12–18 minutes</p>
          <h3 className="font-semibold text-foreground mb-2">What you'll learn</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>The agent loop (Observe, Think, Act) and core components (model, memory, planning, tools)</li>
            <li>Hierarchical manager/worker patterns</li>
            <li>Security: least privilege, error handling, and evaluation basics</li>
          </ul>
        </div>
        {/* Myth vs Reality */}
        <section className="bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">Myth vs. Reality</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-background border border-border rounded-lg p-3">
              <h4 className="font-semibold text-destructive mb-1">Myth</h4>
              <p className="text-sm text-muted-foreground">“Agents are just tools with a fancy name.”</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-3">
              <h4 className="font-semibold text-success mb-1">Reality</h4>
              <p className="text-sm text-muted-foreground">Agents operate in an Observe→Think→Act loop with planning and memory, coordinating tools autonomously.</p>
            </div>
          </div>
        </section>
        <Accordion title="What is an AI Agent?" icon={<Bot />} isInitiallyOpen>
          <p className="text-muted-foreground mb-4">
            An AI Agent is a system that can perceive its environment, make decisions, and take actions to achieve a specific goal. Unlike a simple tool-using model that waits for your command, an agent operates in a continuous <strong>Observe → Think → Act</strong> loop. It's the difference between a smart calculator and a self-driving car.
          </p>
          <AgentAnatomyDiagram />
        </Accordion>

        <Accordion title="The Core Engine: Observe, Think, Act" icon={<GitCommit />}>
          <p className="text-muted-foreground mb-4">
            This three-step cycle is the heartbeat of every agent:
          </p>
          <ol className="list-decimal list-inside space-y-4 text-muted-foreground">
            <li>
              <strong>Observe:</strong> The agent gathers information. This could be the initial user prompt, the output of a previous tool, an error message, or new data from the environment.
            </li>
            <li>
              <strong>Think:</strong> The agent's core model (the 'brain') processes the observations. It reasons about its progress towards the goal, plans its next step, and decides which tool to use (or if it should ask for help).
            </li>
            <li>
              <strong>Act:</strong> The agent executes its decision. This usually involves calling a tool (e.g., `search_web`, `write_to_file`) or responding to the user with a question or a final answer.
            </li>
          </ol>
          <div className="mt-6 bg-muted p-4 rounded-lg border border-border">
            <h4 className="font-semibold text-primary mb-2">Analogy: The Automated Chef</h4>
            <p className="text-muted-foreground">
              Imagine an automated chef. It <strong>Observes</strong> the order ticket (the goal). It <strong>Thinks</strong> about the recipe and its available ingredients (planning). It then <strong>Acts</strong> by using its tools—a knife, a stove, a blender—to prepare the meal.
            </p>
          </div>
        </Accordion>

        <Accordion title="Hierarchical Agents: The Manager & The Workers" icon={<Users />}>
          <p className="text-muted-foreground mb-4">
            For complex problems, a single agent can struggle. The solution is a team of agents, organized hierarchically. This is often called a 'manager/worker' or 'orchestrator/executor' model.
          </p>
          <HierarchicalAgentDiagram />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground flex items-center"><Briefcase className="h-5 w-5 mr-2 text-primary" /> Manager Agent (The 'Executive Chef')</h4>
              <ul className="list-disc pl-5 mt-2 text-muted-foreground">
                <li>Receives the high-level goal from the user.</li>
                <li>Decomposes the goal into smaller, manageable sub-tasks.</li>
                <li>Delegates each sub-task to a specialized worker agent.</li>
                <li>Monitors progress and synthesizes the final result.</li>
              </ul>
            </div>
            <div className="bg-muted p-4 rounded-lg border border-border">
              <h4 className="font-semibold text-foreground flex items-center"><Bot className="h-5 w-5 mr-2 text-green-500" /> Worker Agents (The 'Kitchen Stations')</h4>
              <ul className="list-disc pl-5 mt-2 text-muted-foreground">
                <li>Highly specialized for a single function (e.g., web search, data analysis, code writing).</li>
                <li>Receives a clear, simple task from the manager.</li>
                <li>Executes its task and reports the result back.</li>
                <li>Doesn't need to know the overall goal.</li>
              </ul>
            </div>
          </div>
        </Accordion>

        <SecuritySpotlight 
          scenario="An agent with file system access is compromised, potentially exposing sensitive user data."
          guidelines={[
            'Principle of Least Privilege: Only grant permissions essential for the task.',
            'Sandboxing: Isolate the agent\'s environment to prevent system-wide access.',
            'Human-in-the-Loop: Require confirmation for critical actions like deleting files or spending money.'
          ]}
        />

        <BestPractices
          dos={[
            'Start with a very clear, specific, and achievable goal for your agent.',
            'Give your agent a \'way out\'—a tool to ask for human help when it gets stuck.',
            'Implement robust error handling and retry logic (like exponential backoff) for tool calls.',
            'Log every step of the agent\'s thought process to make debugging easier.',
            'For complex tasks, use a hierarchical agent system.'
          ]}
          donts={[
            'Don\'t give an agent too many tools at once, as this can confuse the planning process.',
            'Never give an agent access to sensitive systems without strict sandboxing and human-in-the-loop confirmation.',
            'Don\'t let your agent run in an infinite loop without a clear stop condition or iteration limit.',
            'Don\'t assume the agent understands ambiguity. Be explicit in your instructions.',
            'Don\'t deploy an agent without thorough testing of its edge cases and failure modes.'
          ]}
        />

        <RealWorldSpotlight 
          icon={<LayoutDashboard className="w-6 h-6" />}
          title="Stripe: Automated Documentation & API Support"
          takeaway="Agents can dramatically reduce support overhead by providing accurate, context-aware answers drawn from technical documentation and API specifications."
        >
          <p>Stripe uses AI agents to power its documentation search. When a developer asks a question, an agent doesn't just find relevant pages; it can read API definitions, generate code examples in multiple languages, and even simulate API calls to provide the most accurate, actionable answer.</p>
        </RealWorldSpotlight>

        <TroubleshootingClinic 
          items={[
            {
              problem: "My agent gets stuck in a loop, calling the same tool over and over.",
              solution: "This often happens when the agent's observations don't change after an action, or its planning logic is too simple. The model keeps making the same decision because it thinks it hasn't made progress. Improve the prompt to encourage the agent to try a different approach if it gets stuck. You can also add a 'memory' of recent actions to prevent repetition, or implement a hard iteration limit."
            },
            {
              problem: "The agent hallucinates a tool that doesn't exist.",
              solution: "The model's internal knowledge is bleeding through. The prompt isn't doing a good enough job of constraining the model to ONLY use the tools you've provided. Make your tool descriptions and the overall prompt more explicit. Include a line like: 'You MUST use one of the following tools and only these tools: [tool_names]'."
            },
            {
              problem: "My agent works for simple tasks but fails on complex, multi-step problems.",
              solution: "This is a classic limitation of single-agent systems. The planning component is getting overwhelmed by the complexity. This is the perfect use case for a hierarchical agent system. Break the problem down and use a manager agent to delegate the smaller pieces to specialized worker agents."
            }
          ]}
        />

        <AgentEvalDashboard />

        <DiscussionPrompts 
          prompts={[
            "What are the ethical implications of deploying fully autonomous agents in customer service?",
            "How might the 'Observe-Think-Act' cycle be adapted for an agent that interacts with the physical world, like a robot?",
            "Debate the pros and cons of giving an agent a persistent, long-term memory. What are the privacy and security risks?"
          ]}
        />

        <div className="bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-2">You can now…</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Explain how an agent operates and plans actions</li>
            <li>Sketch a basic manager/worker design for a multi‑step task</li>
            <li>Apply least‑privilege and add error handling/evaluation hooks</li>
          </ul>
        </div>

        {/* Mini‑Glossary */}
        <section className="bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">Mini‑Glossary</h3>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li><strong>Agent:</strong> A system that observes, plans (thinks), and acts using tools to achieve goals.</li>
            <li><strong>Manager/Worker:</strong> Hierarchical pattern where a manager decomposes tasks for specialized workers.</li>
            <li><strong>Least Privilege:</strong> Security principle of granting only the minimum permissions required.</li>
          </ul>
        </section>

        <KeyTakeaways
          points={[
            'An AI agent is defined by its autonomy—the ability to use tools to achieve goals without step-by-step human direction.',
            'The core operational cycle of an agent is Observe (perceive the environment), Think (plan the next action), and Act (execute a tool or respond).',
            'Key components of an agent include the Core Model (brain), Memory (short/long-term recall), Planning (strategy), and Tools (capabilities).',
            'Hierarchical agent systems (manager/worker) can solve more complex problems by breaking them down and delegating tasks.',
            'Building safe and reliable agents requires a strong focus on security (least privilege), robust error handling, and continuous evaluation.',
          ]}
        />

        <Accordion title="Hands-On Mini-Project: 'Ticket-Bot' (Coming Soon)" icon={<GitCommit />} isDisabled>
          <p className="text-muted-foreground">
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
          <p className="text-muted-foreground">
            The final challenge for this module! You'll be given a complex, real-world problem and tasked with designing a multi-agent system to solve it. This will test all the concepts you've learned in this lesson. Get ready!
          </p>
        </Accordion>

        <Accordion title="Exercise: Think Like an Agent" icon={<Lightbulb className="text-amber-400" />}>
          <p className="text-muted-foreground mb-4">
            Consider the 'Automated Data Analyst' agent. Use the planner below to outline the first few steps of its <strong>Observe, Think, Act</strong> loop. What tools would it need? What decisions would it make? Get feedback on your plan from a simulated AI peer.
          </p>
          <AgentPlannerExercise 
            goal="Generate and email the quarterly sales report."
            initialPlan={`Step 1 (Think): I need to get the sales data for the latest quarter.\n(Act): Call get_sales_data(quarter='Q3').\n\nStep 2 (Think): Now I need to analyze this data to find key insights.\n(Act): Call analyze_data(data).`}
            aiFeedback={{
              suggestion: "This is a good start! To make the plan more robust, consider adding a step for error handling. What should the agent do if the 'get_sales_data' tool fails or returns no data? Also, think about the final step: how will the agent email the report? It will likely need another tool, like 'send_email'.",
              reasoning: "Great agents don't just follow a happy path; they anticipate and handle potential failures. Defining all necessary tools upfront is a key part of effective agent design."
            }}
          />
        </Accordion>

      </div>
    </LessonTemplate>
  );
};

export default Lesson4_5;
