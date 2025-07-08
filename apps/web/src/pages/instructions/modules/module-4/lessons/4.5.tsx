import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Bot, Briefcase, BookOpen, Users, GitCommit } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';

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
            to="/instructions/module-4/4.6" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Module 5: Multi-Turn Conversations <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

            <div className="bg-gray-800 p-4 rounded-lg shadow-inner mb-6">
        <p className="text-gray-300">
          We've learned about function calling, MCP, custom tools, and GPTs. Now, we put it all together. An <strong>AI Agent</strong> is what you get when you give a model a goal, a set of tools, and the autonomy to decide how to use them to achieve that goal.
        </p>
      </div>

      <p className="text-lg text-gray-300">
        Think of an agent as a proactive problem-solver. Instead of waiting for your every command, it operates in a cycle, continuously working towards a final objective.
      </p>

      {/* Core Concepts */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">The Agentic Mindset</h2>
        <p className="text-gray-300 mb-4">
          The key difference is proactivity. While a standard model waits for your command, an agent operates on a loop:
        </p>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2 flex items-center"><GitCommit className="w-5 h-5 mr-2 text-green-400" /> The Loop in Action</h3>
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
          <p className="mt-4 text-gray-400">This loop continues until the agent achieves its goal.</p>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Agent Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Use Case */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Bot className="w-8 h-8 mr-3 text-green-400" />
              <h4 className="font-bold text-lg text-white">Personal Assistant</h4>
            </div>
            <p className="text-sm text-gray-400">An agent that manages your calendar, automatically scheduling meetings based on your priorities and finding times that work for everyone, without you needing to intervene.</p>
          </div>

          {/* Business Use Case */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Briefcase className="w-8 h-8 mr-3 text-yellow-400" />
              <h4 className="font-bold text-lg text-white">Automated Data Analyst</h4>
            </div>
            <p className="text-sm text-gray-400">An agent that can connect to a company's sales database, autonomously generate a quarterly performance report, identify key trends, and email the summary to stakeholders.</p>
          </div>

          {/* Education Use Case */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <BookOpen className="w-8 h-8 mr-3 text-cyan-400" />
              <h4 className="font-bold text-lg text-white">Personalized Tutor</h4>
            </div>
            <p className="text-sm text-gray-400">An agent that tracks a student's progress, identifies areas of weakness, and generates custom practice problems and explanations to help them master difficult concepts.</p>
          </div>

          {/* Social Improvement Use Case */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Users className="w-8 h-8 mr-3 text-pink-400" />
              <h4 className="font-bold text-lg text-white">Disaster Response Coordinator</h4>
            </div>
            <p className="text-sm text-gray-400">An agent that monitors social media and news feeds for disaster events, automatically identifies areas of greatest need, and helps coordinate the dispatch of resources and volunteers.</p>
          </div>
        </div>
      </section>

      {/* When to Use Agents */}
            {/* Agent Architectures */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Common Agent Architectures: ReAct</h2>
        <p className="text-gray-300 mb-4">
          One of the most popular agent architectures is <strong>ReAct</strong>, which stands for "Reason + Act." The model explicitly verbalizes its reasoning before choosing an action. This makes the agent's behavior more transparent and reliable.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg font-mono text-sm text-gray-200">
          <p><strong className="text-yellow-400">Thought:</strong> The user wants to know the capital of France. I should use my search tool to find this information.</p>
          <p className="mt-2"><strong className="text-green-400">Action:</strong> `search(query='capital of France')`</p>
          <p className="mt-4"><strong className="text-cyan-400">Observation:</strong> The search tool returned "Paris".</p>
          <p className="mt-4"><strong className="text-yellow-400">Thought:</strong> I have the answer. I will now respond to the user.</p>
          <p className="mt-2"><strong className="text-green-400">Action:</strong> `respond('The capital of France is Paris.')`</p>
        </div>
      </section>

      {/* Building Your Own Agents */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Building Your Own Agents</h2>
        <p className="text-gray-300 mb-4">
          While you can build agent loops from scratch, several frameworks can accelerate development. These provide pre-built components for tool management, memory, and agent execution. Popular choices include:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-blue-400">
          <li><a href="https://langchain.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">LangChain</a></li>
          <li><a href="https://www.llamaindex.ai/" target="_blank" rel="noopener noreferrer" className="hover:underline">LlamaIndex</a></li>
          <li><a href="https://github.com/microsoft/autogen" target="_blank" rel="noopener noreferrer" className="hover:underline">Microsoft AutoGen</a></li>
        </ul>
      </section>

      {/* Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Exercise: Think Like an Agent</h2>
        <p className="text-gray-300 mb-4">
          Consider the 'Automated Data Analyst' agent mentioned earlier. Its goal is: `Generate and email the quarterly sales report.`
        </p>
        <p className="text-gray-300 mb-2">In the chat, outline the first three steps of its <strong>Observe, Think, Act</strong> loop. What tools would it need? What decisions would it make?</p>
        <div className="relative mt-2">
          <CopyButton textToCopy={'My agent needs to generate and email a sales report. Step 1 (Think): I need to get the sales data. (Act): Call `get_sales_data(quarter=\'Q3\')`. Step 2 (Think): Now I need to analyze this data. (Act): Call `analyze_data(data)`. Step 3...'} />
          <pre className="p-3 bg-gray-700 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap pr-10">
            <code>
My agent needs to generate and email a sales report. Step 1 (Think): I need to get the sales data. (Act): Call `get_sales_data(quarter='Q3')`. Step 2 (Think): Now I need to analyze this data. (Act): Call `analyze_data(data)`. Step 3...
            </code>
          </pre>
        </div>
      </section>

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
          Module 5: Multi-Turn Conversations <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson4_5;
