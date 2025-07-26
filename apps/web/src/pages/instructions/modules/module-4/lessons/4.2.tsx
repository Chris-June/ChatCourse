import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Database, Share2, CheckSquare, BrainCircuit, Zap } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';
import Accordion from '../../../components/Accordion';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

const mcpReasoningChecklist = [
  { text: 'My goal is to find an employee\'s email.', completed: false },
  { text: 'I see a `company_db` tool server is available.', completed: false },
  { text: 'I will ask it what tools it has... it has `get_employee_email`.', completed: false },
  { text: 'Perfect. I will call that tool with the employee\'s name.', completed: false },
];

const Lesson4_2: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What is the main purpose of the Model Context Protocol (MCP)?',
      options: [
        'To make the AI run faster.',
        'To give the AI a standard way to discover and use external tools and APIs.',
        'To teach the AI new languages.',
        'To let the AI browse the web freely.'
      ],
      correctAnswer: 'To give the AI a standard way to discover and use external tools and APIs.',
      explanation: 'MCP provides a standardized interface, like a universal remote, allowing the AI to interact with many different tools without needing to know their internal workings.'
    },
    {
      questionText: 'What is the key difference between basic function calling and MCP?',
      options: [
        'There is no difference.',
        'With MCP, the AI can discover tools dynamically, whereas basic function calling uses hard-coded tools.',
        'MCP only works for weather tools.',
        'Basic function calling is more secure than MCP.'
      ],
      correctAnswer: 'With MCP, the AI can discover tools dynamically, whereas basic function calling uses hard-coded tools.',
      explanation: 'The ability to discover tools on-the-fly is a major advantage of MCP, making the AI more adaptable and scalable.'
    },
    {
      questionText: 'How does an MCP-enabled AI figure out what tools are available on a server?',
      options: [
        'It guesses randomly.',
        'It reads the server\'s source code.',
        'It asks the server, \'What skills do you have?\' (i.e., it makes a discovery request).',
        'The user has to tell it manually every time.'
      ],
      correctAnswer: 'It asks the server, \'What skills do you have?\' (i.e., it makes a discovery request).',
      explanation: 'This process of discovery is fundamental to MCP. The AI can query an MCP server to get a list of available tools and their descriptions.'
    },
    {
      questionText: 'The \'Travel Agent AI\' example shows that MCP\'s real power comes from its ability to...',
      options: [
        '...book a flight.',
        '...combine tools from different, independent servers to complete a complex task.',
        '...tell you the weather.',
        '...speak like a travel agent.'
      ],
      correctAnswer: '...combine tools from different, independent servers to complete a complex task.',
      explanation: 'The example highlights that the AI can orchestrate multiple tools (flights, hotels, weather) from separate sources to achieve a high-level goal.'
    },
    {
      questionText: 'In the AI\'s reasoning process for finding an employee\'s email, what is the first step?',
      options: [
        'Executing the tool.',
        'Identifying the goal.',
        'Inspecting the tool\'s parameters.',
        'Checking for other servers.'
      ],
      correctAnswer: 'Identifying the goal.',
      explanation: 'Before it can do anything else, the AI must first understand the user\'s intent. Identifying the goal (e.g., \'I need to find an email address\') is the crucial first step in its problem-solving process.'
    }
  ];

  const { completeLesson } = useProgressStore();
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">4.2 Real-world Applications</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-4/4.1" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Function Calling
          </Link>
          <Link 
            to="/instructions/module-4/4.3" 
            onClick={() => completeLesson(4, 2)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next: Building Custom Tools <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <Accordion title="The Big Idea: An AI with Superpowers" icon={<Zap />} isInitiallyOpen>
        <p className="text-gray-300 mb-4">
          Imagine an AI like a smart assistant (e.g., Siri or Alexa). By itself, it knows a lot, but it can't interact with the outside world. MCP gives it superpowers by letting it use external "skills" or "apps."
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li>An <strong>MCP Server</strong> is like a skill store (e.g., the Spotify app).</li>
          <li>A <strong>Tool (or Resource)</strong> is a specific action within that skill (e.g., the "Play Song" button).</li>
        </ul>
        <p className="text-gray-300 mt-4">
          The AI doesn't need to know *how* the Spotify code works. It just needs to know the skill exists and how to ask it to play a song. MCP is the standard language it uses to make that request.
        </p>
      </Accordion>

      <Accordion title="MCP vs. Function Calling: The Analogy" icon={<Share2 />}>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-3 text-left font-semibold text-white">Question</th>
                <th className="p-3 text-left font-semibold text-white">Function Calling (Basic)</th>
                <th className="p-3 text-left font-semibold text-white">MCP (Superpowered)</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr>
                <td className="p-3 border-t border-gray-700 font-semibold">Who makes the tools?</td>
                <td className="p-3 border-t border-gray-700">A developer builds a few tools directly into the AI assistant.</td>
                <td className="p-3 border-t border-gray-700">Anyone can build a "skill" (MCP server) and the AI can use it.</td>
              </tr>
              <tr>
                <td className="p-3 border-t border-gray-700 font-semibold">How does it find tools?</td>
                <td className="p-3 border-t border-gray-700">The tools are hard-coded; it already knows them.</td>
                <td className="p-3 border-t border-gray-700">It asks a server, "What skills do you have?"</td>
              </tr>
              <tr>
                <td className="p-3 border-t border-gray-700 font-semibold">How many tools can it use?</td>
                <td className="p-3 border-t border-gray-700">Only the few it was built with.</td>
                <td className="p-3 border-t border-gray-700">A whole library of skills from many different servers.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Accordion>

      <Accordion title="Why This is a Game-Changer" icon={<BrainCircuit />}>
        <p className="text-gray-300 mb-4">
          Because MCP allows an AI to combine tools from different servers, it can handle complex, multi-step tasks. 
        </p>
        <p className="text-gray-300">
          Imagine a <strong>Travel Agent AI</strong>. You say, "Plan my trip to Hawaii." The AI can:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-gray-300 mt-4">
          <li>Use the `Airline` MCP server to find flights.</li>
          <li>Use the `Hotel` MCP server to book a room.</li>
          <li>Use the `Weather` MCP server to check the forecast and suggest what to pack.</li>
        </ol>
        <p className="text-gray-300 mt-4">This seamless combination of independent tools is the power of MCP.
        </p>
      </Accordion>

      <Accordion title="Your Turn: The AI's Thought Process" icon={<Database />}>
        <p className="text-gray-300 mb-4">
          Let's peek inside the AI's brain. You want to find an employee's email. The AI has access to a `company_db` server with a `get_employee_email` tool. Here’s how it thinks:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-gray-300 mb-6 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <li><strong>Goal:</strong> "I need to find an email address."</li>
          <li><strong>Discovery:</strong> "I see a `company_db` server. I'll check what tools it has."</li>
          <li><strong>Inspection:</strong> "It has a tool called `get_employee_email`. The description says it finds an email for an employee. Perfect!"</li>
          <li><strong>Execution:</strong> "Now I'll call that tool with the name I was given."</li>
        </ol>
        <p className="text-gray-300 mb-4">Now, you try it. Ask for an employee's email and see the final tool call the AI makes. Follow the checklist to track the AI's reasoning.</p>
        <InlineChat 
          moduleId="module-4.2-mcp-email"
          placeholder="Ask for an employee's email, e.g., 'What is Chris June's email?'" 
          simulatedResponse={`Okay, I need to find an employee's email address. I will use the 'get_employee_email' tool from the 'company_db' MCP server.\n\n<tool_code>\n<mcp_server_request>\n  <server>company_db</server>\n  <tool_name>get_employee_email</tool_name>\n  <parameters>\n    <employee_name>the person you asked for</employee_name>\n  </parameters>\n</mcp_server_request>\n</tool_code>\n\nfirstName.lastName@email.ca`}
          challengeChecklist={mcpReasoningChecklist}
        />
      </Accordion>

      <Accordion title="Key Takeaways" icon={<CheckSquare />}>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
              <li>MCP lets an AI use external tools, like a smart assistant using skills or apps.</li>
              <li>The AI can automatically discover what tools are available on a server.</li>
              <li>This makes the AI far more powerful and adaptable, allowing it to combine tools to solve complex problems.</li>
          </ul>
      </Accordion>

      {/* Validation Quiz */}
      <section className="mt-8">
        <ModuleQuizzes questions={quizQuestions} />
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-4/4.1" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous
        </Link>
        <Link 
          to="/instructions/module-4/4.3" 
          onClick={() => completeLesson(4, 2)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Building Custom Tools <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson4_2;
