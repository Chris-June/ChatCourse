import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Code, FileJson, Lightbulb } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';

const Lesson3_3: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">3.3: Structuring Outputs: JSON, Markdown, and Beyond</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-3/3.2" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-4/4.1" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        To use an AI's output in an application, you often need the data in a specific, machine-readable format. Simply asking for a format like JSON or Markdown is a powerful way to get structured data you can immediately work with.
      </p>

      {/* Requesting JSON */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <FileJson className="w-7 h-7 mr-3 text-blue-300" />
          Requesting JSON
        </h2>
        <p className="text-gray-300 mb-4">
          JSON (JavaScript Object Notation) is the standard for data exchange on the web. You can ask the AI to format its response as a JSON object, which is incredibly useful for APIs, databases, or dynamic frontend components.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Example: Extracting User Data</h3>
          <p className="text-gray-400 mb-3">
            By specifying the exact keys and data types, you guide the AI to produce a clean, predictable output.
          </p>
          <div className="relative mb-4">
            <CopyButton textToCopy={'Extract the name, age, and city from the following sentence. Provide the output as a JSON object with the keys "userName", "userAge", and "location".\n\nSentence: "John, a 42-year-old resident of Berlin, loves to code."'} />
            <pre className="p-3 bg-gray-700 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap pr-10">
              <code>
                <span className="text-gray-400">// Prompt</span>
                Extract the name, age, and city from the following sentence. Provide the output as a JSON object with the keys "userName", "userAge", and "location".
                
                Sentence: "John, a 42-year-old resident of Berlin, loves to code."
              </code>
            </pre>
          </div>
          <h4 className="font-semibold text-gray-200 mb-2">Expected AI Output:</h4>
          <pre className="p-3 bg-gray-900 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap">
            <code>
              {"{\n  \"userName\": \"John\",\n  \"userAge\": 42,\n  \"location\": \"Berlin\"\n}"}
            </code>
          </pre>
        </div>
      </section>

      {/* Requesting Markdown */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Code className="w-7 h-7 mr-3 text-blue-300" />
          Requesting Markdown
        </h2>
        <p className="text-gray-300 mb-4">
          Markdown is perfect for generating formatted text, like reports, summaries, or documentation. You can ask for tables, lists, code blocks, and more.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Example: Creating a Comparison Table</h3>
          <div className="relative">
            <CopyButton textToCopy={"Create a markdown table comparing Python and JavaScript for web development. Include rows for 'Primary Use', 'Typing', and 'Backend Frameworks'."} />
            <pre className="p-3 bg-gray-700 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap pr-10">
              <code>
                <span className="text-gray-400">// Prompt</span>
                Create a markdown table comparing Python and JavaScript for web development. Include rows for 'Primary Use', 'Typing', and 'Backend Frameworks'.
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Your Turn: Generate a Structured List
        </h2>
        <p className="text-gray-300 mb-4">Try this in the chat. Ask the AI to generate a list of project ideas for a new web developer. Specify the output format clearly.</p>
        <div className="relative">
          <CopyButton textToCopy={"Generate a list of 3 project ideas for a beginner web developer. For each project, provide a 'title' and a 'description'. Return the list as a JSON array of objects."} />
          <pre className="p-3 bg-gray-700 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap pr-10">
            <code>
              Generate a list of 3 project ideas for a beginner web developer. For each project, provide a 'title' and a 'description'. Return the list as a JSON array of objects.
            </code>
          </pre>
        </div>
        <p className="text-gray-400 mt-3">This kind of structured output can be directly used to populate a UI component in an application.</p>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-3/3.2" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Chain-of-Thought
        </Link>
        <Link 
          to="/instructions/module-4/4.1" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Function Calling <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson3_3;
