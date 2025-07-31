import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, GitMerge, Code, Bot, Puzzle, Wrench } from 'lucide-react';
import { useProgressStore } from '../../../../../store/progressStore';
import FunctionCallFlowVisualizer from '../../../components/FunctionCallFlowVisualizer';
import FunctionSchemaDesigner from '../../../components/FunctionSchemaDesigner';
import FunctionCallGrader from '../../../components/FunctionCallGrader';
import ToolChoiceChallenge from '../../../components/ToolChoiceChallenge';
import FunctionCallDebugger from '../../../components/FunctionCallDebugger';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

const Lesson7_1: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'In a successful function call, what is the correct sequence of events?',
      options: [
        'User -> LLM -> Tool Execution -> Final Response to User',
        'User -> Tool Execution -> LLM -> Final Response to User',
        'User -> LLM (decides to use tool) -> LLM (generates tool arguments) -> Tool Execution -> LLM (processes tool output) -> Final Response to User',
        'LLM -> User -> Tool Execution -> Final Response to User'
      ],
      correctAnswer: 'User -> LLM (decides to use tool) -> LLM (generates tool arguments) -> Tool Execution -> LLM (processes tool output) -> Final Response to User',
      explanation: 'Function calling is a multi-step process where the LLM first interprets the user\'s request, calls the tool with the right arguments, gets the result back, and then formulates a final answer.'
    },
    {
      questionText: 'What is the purpose of the `required` array in a function\'s JSON schema?',
      options: [
        'To list all possible parameters the function can accept.',
        'To tell the LLM which parameters are optional.',
        'To specify which parameters the LLM *must* provide for the function to be called correctly.',
        'To describe what the function does in plain English.'
      ],
      correctAnswer: 'To specify which parameters the LLM *must* provide for the function to be called correctly.',
      explanation: 'The `required` array is critical for ensuring the LLM extracts and provides all the necessary information, preventing errors from missing arguments.'
    },
    {
      questionText: 'When an LLM has multiple tools, how does it primarily decide which one to use for a given prompt?',
      options: [
        'It chooses the tool with the fewest parameters.',
        'It chooses the tool with the most interesting name.',
        'It relies on the clarity and accuracy of the `description` field in each tool\'s schema.',
        'It always picks the first tool in the list.'
      ],
      correctAnswer: 'It relies on the clarity and accuracy of the `description` field in each tool\'s schema.',
      explanation: 'The function description is the most important piece of information the LLM uses to understand a tool\'s purpose and match it to the user\'s intent.'
    },
    {
      questionText: 'A user writes: \'Book a flight for me.\' The `book_flight` tool requires `destination` and `date`. Why might the function call fail?',
      options: [
        'The user was not polite enough.',
        'The user did not provide the required `destination` and `date` parameters in their prompt.',
        'The tool is probably broken.',
        'The LLM does not know how to book flights.'
      ],
      correctAnswer: 'The user did not provide the required `destination` and `date` parameters in their prompt.',
      explanation: 'For a successful function call, the user\'s prompt must contain enough information for the LLM to extract all the parameters listed as `required` in the schema.'
    },
    {
      questionText: 'What is a common reason for a function call to fail during debugging?',
      options: [
        'The user\'s internet is too slow.',
        'A mismatch between the parameters defined in the schema and the parameters the actual code expects.',
        'The LLM is tired.',
        'The function name is too long.'
      ],
      correctAnswer: 'A mismatch between the parameters defined in the schema and the parameters the actual code expects.',
      explanation: 'The schema and the function code must be perfectly in sync. If the schema says a parameter is named `dest` but the code expects `destination`, the call will fail.'
    }
  ];

  const { completeLesson } = useProgressStore();

  // Mock data for the FunctionCallGrader component
  const weatherFunctionSchema = {
    name: 'get_current_weather',
    description: 'Get the current weather in a given location',
    parameters: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 'The city and state, e.g. San Francisco, CA',
        },
        unit: { type: 'string', enum: ['celsius', 'fahrenheit'] },
      },
      required: ['location'],
    },
  };

  const graderCriteria = {
    triggerWords: ['weather', 'forecast', 'temperature'],
    requiredParams: ['location'],
  };

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white flex items-center">
          <GitMerge className="w-10 h-10 mr-4 text-indigo-400" />
          Lesson 7.1: The Master Dispatcher
        </h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-6/6.3" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Iterative Development
          </Link>
          <Link 
            to="/instructions/module-7/7.2" 
            onClick={() => completeLesson(7, 1)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next: R.A.G. Systems <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Function calling transforms an LLM from a simple chatbot into an agent that acts. Think of it as a master dispatcher in a logistics company. The dispatcher (LLM) takes a request, consults its directory of services (tools), calls the right department with the right information, and relays the result. This lesson teaches you how to be that dispatcher.
      </p>

      {/* 1. Function Call Flow Visualizer */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <GitMerge className="w-7 h-7 mr-3 text-indigo-400" />
          1. The Dispatch Flow
        </h2>
        <p className="text-gray-300 mb-4">
          A successful dispatch is a multi-step dance: the driver makes a request, the dispatcher identifies the right department, calls them with the correct info, gets a result, and relays it back. This visualizer breaks down that flow.
        </p>
        <FunctionCallFlowVisualizer />
      </section>

      {/* 2. Function Schema Designer */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Code className="w-7 h-7 mr-3 text-green-400" />
          2. The Dispatcher's Directory (The Schema)
        </h2>
        <p className="text-gray-300 mb-4">
          The dispatcher's most critical tool is their directory (the JSON schema). It lists every department, what they do (`description`), and what info they need (`parameters`). A clear, accurate directory is essential for reliable dispatching. Use the designer below to create a directory entry for a `send_email` department.
        </p>
        <FunctionSchemaDesigner />
      </section>

      {/* 3. Function Call Grader */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Bot className="w-7 h-7 mr-3 text-purple-400" />
          3. Making the Call (Triggering the Tool)
        </h2>
        <p className="text-gray-300 mb-4">
          The dispatcher can only act on a clear request. Your prompt must contain enough information for the dispatcher to understand the intent and find all the required info for the directory entry. Try to write a driver request that gets a perfect dispatch score.
        </p>
        <FunctionCallGrader 
          functionSchema={weatherFunctionSchema}
          initialPrompt="What's the weather like?"
          evaluationCriteria={graderCriteria}
        />
      </section>

      {/* 4. Tool Choice Challenge */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Puzzle className="w-7 h-7 mr-3 text-yellow-400" />
          4. Routing the Call (Choosing the Right Department)
        </h2>
        <p className="text-gray-300 mb-4">
          If a driver just says "I have a problem," the dispatcher needs to figure out who to call. The quality of the `description` in your directory is what enables this. Given the driver's request below, which department is the right call?
        </p>
        <ToolChoiceChallenge />
      </section>

      {/* 5. Function Call Debugger */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Wrench className="w-7 h-7 mr-3 text-red-400" />
          5. Dropped Calls (Debugging)
        </h2>
        <p className="text-gray-300 mb-4">
          Sometimes the dispatcher dials a wrong number or the department line is busy. Dropped calls happen. In this final exercise, a dispatch has failed. Analyze the request, the faulty directory entry, and the error message to diagnose the problem.
        </p>
        <FunctionCallDebugger />
      </section>

      {/* Validation Quiz */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Check Your Understanding</h2>
        <ModuleQuizzes questions={quizQuestions} />
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-6/6.3" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: The Chef Refining the Recipe
        </Link>
        <Link 
          to="/instructions/module-7/7.2" 
          onClick={() => completeLesson(7, 1)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Building RAG Systems <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson7_1;