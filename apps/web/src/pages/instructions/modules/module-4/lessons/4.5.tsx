import React from 'react';
import { Bot, Briefcase, Users, GitCommit, BrainCircuit, Lightbulb, BookOpen, Wrench, LayoutDashboard, Award } from 'lucide-react';
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
import GlossaryTerm from '../../../components/GlossaryTerm';

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
      explanation: 'This security principle is vital for agents. By restricting tools to only what\'s necessary, you limit the \'blast radius\' of potential exploits or unintended actions.'
    }
  ];

  return (
    <LessonTemplate
      moduleNumber={4}
      lessonNumber={5}
      title="AI Agents: The Autonomous Workforce"
      subtitle="From single tools to goal-driven systems that can plan and execute."
      quizQuestions={quizQuestions}
    >
      <div className="space-y-8">
        <Accordion title="The Big Idea: What is an AI Agent?" icon={<Bot />} isInitiallyOpen>
          <p className="text-gray-300">
            An AI Agent is a system that can perceive its environment, make decisions, and take actions to achieve specific goals. Unlike a simple chatbot that just responds to input, an agent is <GlossaryTerm term="autonomous" definition="Able to operate independently without direct human control, making decisions and taking actions to achieve goals." />. It has a goal, a set of tools, and the ability to create and execute a plan over multiple steps. Think of it as hiring a digital employee for a specific job.
          </p>
        </Accordion>

        <AgentAnatomyDiagram />

        <Accordion title="The Core Loop: Observe, Think, Act" icon={<BrainCircuit />}>
          <p className="text-gray-300 mb-4">
            This three-step cycle is the heartbeat of every agent. It's what gives them their autonomy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="font-bold text-lg text-blue-300">1. Observe</h4>
              <p className="text-gray-400 text-sm">The agent gathers data from its environment (e.g., user query, API response, file content).</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="font-bold text-lg text-green-300">2. Think</h4>
              <p className="text-gray-400 text-sm">The agent's core model (like GPT-4) processes the observations, updates its plan, and decides the next best action.</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <h4 className="font-bold text-lg text-purple-300">3. Act</h4>
              <p className="text-gray-400 text-sm">The agent executes the plan by using one of its tools (e.g., calls an API, runs code, sends a message).</p>
            </div>
          </div>
        </Accordion>

        <Accordion title="Multi-Agent Systems: The Power of Teamwork" icon={<Users />}>
          <p className="text-gray-300 mb-4">
            Why have one agent when you can have a team? Multi-agent systems use several specialized agents that collaborate to solve complex problems. A common pattern is the Manager-Worker hierarchy.
          </p>
          <HierarchicalAgentDiagram />
          <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
            <h4 className="font-semibold text-yellow-300">Analogy: The Automated Restaurant Chain</h4>
            <p className="text-gray-400 text-sm mt-2">Imagine a user's order is "Plan and cater a 50-person vegan dinner party for next Friday."</p>
            <ul className="list-disc list-inside mt-2 text-gray-400 text-sm space-y-1">
              <li><strong>Manager Agent (Executive Chef):</strong> Decomposes the goal: design menu, order ingredients, schedule cooking, arrange delivery.</li>
              <li><strong>Worker Agents (Specialist Kitchens):</strong>
                <ul className="list-disc list-inside ml-4">
                  <li>A `MenuBot` generates vegan options.</li>
                  <li>A `ProcurementBot` finds and orders ingredients from suppliers via API.</li>
                  <li>A `SchedulingBot` coordinates the cooking timeline.</li>
                </ul>
              </li>
              <li><strong>Final Output:</strong> The manager confirms all parts are done and coordinates the delivery-bot to assemble and deliver the final meal.</li>
            </ul>
          </div>
        </Accordion>

        <SecuritySpotlight 
          scenario="An agent designed to manage user profiles is given full database admin privileges instead of just access to the 'users' table."
          guidelines={[
            'Always grant the absolute minimum level of access required (Principle of Least Privilege).',
            "Don't give an agent 'delete database' permissions if it only needs to 'read from a table'.",
            'This minimizes the potential \'blast radius\' if the agent is compromised or behaves unexpectedly.'
          ]}
        />

        <BestPractices
          dos={[
            'Be explicit and unambiguous when defining the agent\'s goal.',
            'Design tools to be idempotent (calling them multiple times has the same effect as calling them once).',
            'Log the agent\'s thoughts, observations, and actions to make debugging easier.',
            'For critical tasks, require human approval before the agent takes an irreversible action.'
          ]}
          donts={[
            'Give an agent more permissions than it absolutely needs.',
            'Assume the agent will understand ambiguous instructions.',
            'Let an agent operate without monitoring or logging.',
            'Deploy agents that can spend money or modify critical data without a human-in-the-loop.'
          ]}
        />
        
        <RealWorldSpotlight 
          icon={<Briefcase />}
          title="Agents in the Wild: GitHub Copilot & Devin"
          takeaway="Modern developer tools are increasingly becoming autonomous agents, capable of handling complex, multi-step tasks that go far beyond simple code completion."
        >
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>GitHub Copilot:</strong> Acts as a coding assistant agent, suggesting code, completing functions, and even writing tests based on the context of your project.</li>
            <li><strong>Devin from Cognition AI:</strong> A more advanced software engineering agent that can take a high-level task, create a step-by-step plan, and execute it using a full suite of developer tools like a terminal and web browser.</li>
          </ul>
        </RealWorldSpotlight>

        <Accordion title="Troubleshooting & Debugging Clinic" icon={<Wrench />}>
          <TroubleshootingClinic 
            items={[
              { 
                problem: "Agent gets stuck in a loop, repeating the same action.",
                solution: "This often happens when the agent isn't getting new information that changes its 'Think' step. Improve the observation mechanism or add a 'memory' of past actions to break the cycle. You can also add a max retry limit."
              },
              { 
                problem: "Agent hallucinates that it has access to a tool it doesn't.",
                solution: "The agent's prompt must be very clear about the exact tools available and their function signatures. Providing examples in the prompt can help ground the model."
              },
              { 
                problem: "Agent fails on a complex task without a clear reason.",
                solution: "The task may be too complex for one agent. Decompose the problem and consider a multi-agent approach where specialized agents handle smaller parts of the task."
              }
            ]}
          />
        </Accordion>

        <Accordion title="How Good is Your Agent? The Metric Dashboard" icon={<LayoutDashboard />}>
          <p className="text-gray-300 mb-4">
            Evaluating agents is harder than evaluating models. It's not just about accuracy, but about task completion and resourcefulness. Key metrics include:
          </p>
          <AgentEvalDashboard />
          <div className="mt-4">
            <h4 className="font-semibold text-lg text-indigo-300">Popular Agent Frameworks</h4>
            <p className="text-gray-400 text-sm mb-2">These libraries provide the scaffolding (core loop, tool integration, memory) to build agents faster:</p>
            <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
              <li><a href="https://langchain.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">LangChain (LangGraph)</a></li>
              <li><a href="https://www.llamaindex.ai/" target="_blank" rel="noopener noreferrer" className="hover:underline">LlamaIndex</a></li>
              <li><a href="https://github.com/microsoft/autogen" target="_blank" rel="noopener noreferrer" className="hover:underline">Microsoft AutoGen</a></li>
            </ul>
          </div>
        </Accordion>

        <Accordion title="Discussion Prompts" icon={<Lightbulb />}>
          <DiscussionPrompts 
            prompts={[
              "What is the most exciting potential application of AI agents in your industry?",
              "What is the most significant ethical risk associated with autonomous agents that can take real-world actions?"
            ]}
          />
        </Accordion>

        <Accordion title="Tooling Tiers: From No-Code to Pro-Code" icon={<Briefcase />}>
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <p className="text-gray-300 mb-4">Building agents is becoming accessible to everyone. The ecosystem has tools for every skill level:</p>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left w-full max-w-4xl">
                <div className="border-l-2 border-green-500 pl-3">
                  <p className="text-sm font-semibold text-green-300">No-Code: Zapier</p>
                  <p className="text-xs text-gray-400">Connect apps with triggers and actions</p>
                </div>
                <div className="border-l-2 border-yellow-500 pl-3">
                  <p className="text-sm font-semibold text-yellow-300">Low-Code: Flowise</p>
                  <p className="text-xs text-gray-400">Start with visual workflows, then add AI nodes</p>
                </div>
                <div className="border-l-2 border-purple-500 pl-3">
                  <p className="text-sm font-semibold text-purple-300">Developer: Argon</p>
                  <p className="text-xs text-gray-400">Build custom agents with full code control</p>
                </div>
                <div className="border-l-2 border-blue-500 pl-3">
                  <p className="text-sm font-semibold text-blue-300">Enterprise: IntelliSync</p>
                  <p className="text-xs text-gray-400">Production-ready with enterprise features</p>
                </div>
              </div>
            </div>
          </div>
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

      </div>
    </LessonTemplate>
  );
};

export default Lesson4_5;
