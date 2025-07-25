import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, GitMerge, Code, Bot, Puzzle, Wrench } from 'lucide-react';
import { useProgressStore } from '../../../../../store/progressStore';
import FunctionCallFlowVisualizer from '../../../components/FunctionCallFlowVisualizer';
import FunctionSchemaDesigner from '../../../components/FunctionSchemaDesigner';
import FunctionCallGrader from '../../../components/FunctionCallGrader';
import ToolChoiceChallenge from '../../../components/ToolChoiceChallenge';
import FunctionCallDebugger from '../../../components/FunctionCallDebugger';

const Lesson7_1: React.FC = () => {
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
    <div className="space-y-12 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">7.1 Hands-On with Advanced Function Calling</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-6/6.3" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Iterative Development
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
        Welcome to the deep end of function calling. In this lesson, we'll move beyond theory and get our hands dirty with five interactive exercises. You'll visualize the entire lifecycle, design a schema from scratch, craft the perfect prompt, choose the right tool for the job, and debug a broken call. Let's begin.
      </p>

      {/* 1. Function Call Flow Visualizer */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <GitMerge className="w-7 h-7 mr-3 text-cyan-400" />
          1. Visualizing the Full Lifecycle
        </h2>
        <p className="text-gray-300 mb-4">
          Before we write any code, let's watch a successful function call from start to finish. This animation breaks down the multi-step conversation between the user, the LLM, and your code. Click "Run Flow" to see it in action.
        </p>
        <FunctionCallFlowVisualizer />
      </section>

      {/* 2. Function Schema Designer */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Code className="w-7 h-7 mr-3 text-green-400" />
          2. Exercise: Design a Function Schema
        </h2>
        <p className="text-gray-300 mb-4">
          The foundation of any tool is its schema—the JSON object that tells the LLM what the tool does, what parameters it needs, and which are required. A well-designed schema is critical for reliable function calls. Use the designer below to build a schema for a `send_email` function.
        </p>
        <FunctionSchemaDesigner />
      </section>

      {/* 3. Function Call Grader */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Bot className="w-7 h-7 mr-3 text-purple-400" />
          3. Exercise: Triggering the Tool
        </h2>
        <p className="text-gray-300 mb-4">
          Now that you've seen a schema, let's practice writing prompts that trigger it. Your prompt needs to be clear enough for the LLM to understand the intent and extract the necessary arguments. Try to write a prompt that gets a score of 100.
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
          4. Challenge: Choosing the Right Tool
        </h2>
        <p className="text-gray-300 mb-4">
          In a real application, an LLM might have dozens of tools to choose from. The clarity of your function descriptions is what allows the model to pick the right one. Given the user prompt below, which tool should the LLM choose?
        </p>
        <ToolChoiceChallenge />
      </section>

      {/* 5. Function Call Debugger */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Wrench className="w-7 h-7 mr-3 text-red-400" />
          5. Challenge: Debugging a Broken Call
        </h2>
        <p className="text-gray-300 mb-4">
          Things don't always go to plan. Debugging is a critical skill. In this final exercise, a function call has failed. Analyze the user prompt, the faulty schema, and the error message to figure out what went wrong.
        </p>
        <FunctionCallDebugger />
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-6/6.3" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Iterative Improvement
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