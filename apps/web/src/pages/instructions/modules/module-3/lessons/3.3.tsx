import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Code, FileJson, Lightbulb } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';
import Accordion from '../../../components/Accordion';

const jsonChallengeChecklist = [
  { text: 'Ask the AI to extract specific pieces of information from a sentence', completed: false },
  { text: 'Specify the output format as a JSON object', completed: false },
  { text: 'Define the exact keys for the JSON object', completed: false },
  { text: 'Verify the AI returns a valid JSON with the correct data', completed: false },
];

const markdownChallengeChecklist = [
  { text: 'Ask the AI to generate content on a topic', completed: false },
  { text: 'Specify the output format as Markdown', completed: false },
  { text: 'Request a specific Markdown element (e.g., table, list)', completed: false },
  { text: 'Verify the AI returns well-formatted Markdown', completed: false },
];

const structuredListChallengeChecklist = [
  { text: 'Ask the AI to generate a list of items (e.g., project ideas)', completed: false },
  { text: 'Specify the output as a JSON array of objects', completed: false },
  { text: 'Define the schema for the objects (e.g., keys like "title", "description")', completed: false },
  { text: 'Verify the AI returns a valid JSON array matching the schema', completed: false },
];

const Lesson3_3: React.FC = () => {
  const { completeLesson } = useProgressStore();
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">3.3 Prompting Exercises</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-3/3.2" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Chain of Thought
          </Link>
          <Link 
            to="/instructions/module-4/4.1" 
            onClick={() => completeLesson(3, 3)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next: Advanced Applications <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        To use an AI's output in an application, you often need the data in a specific, machine-readable format. Simply asking for a format like JSON or Markdown is a powerful way to get structured data you can immediately work with.
      </p>

      <Accordion title="Requesting JSON" icon={<FileJson />} isInitiallyOpen>
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
            <div className="bg-gray-700 p-3 rounded-md pr-10">
              <code className="block whitespace-pre-wrap break-words font-mono text-sm text-gray-200">
                <span className="text-gray-400">// Prompt</span>
                {`\nExtract the name, age, and city from the following sentence. Provide the output as a JSON object with the keys "userName", "userAge", and "location".\n\nSentence: "John, a 42-year-old resident of Berlin, loves to code." `}
              </code>
            </div>
          </div>
          <h4 className="font-semibold text-gray-200 mb-2">Expected AI Output:</h4>
          <div className="bg-gray-800 p-3 rounded-md">
            <code className="block whitespace-pre-wrap break-words font-mono text-sm text-green-400">
              {`{
  "userName": "John",
  "userAge": 42,
  "location": "Berlin"
}`}
            </code>
          </div>
        </div>

        <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border-2 border-dashed border-blue-500/50">
          <h3 className="font-semibold text-white mb-2">Your Turn: Requesting JSON</h3>
          <p className="text-gray-400 mb-4">Try extracting structured data from a sentence. Ask for a JSON object with specific keys.</p>
          <InlineChat 
            moduleId="module-3.3-json-extraction"
            placeholder="Extract user info from a sentence into JSON..." 
            challengeChecklist={jsonChallengeChecklist}
          />
        </div>
      </Accordion>

      <Accordion title="Requesting Markdown" icon={<Code />}>
        <p className="text-gray-300 mb-4">
          Markdown is perfect for generating formatted text, like reports, summaries, or documentation. You can ask for tables, lists, code blocks, and more.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Example: Creating a Comparison Table</h3>
          <div className="relative">
            <CopyButton textToCopy={"Create a markdown table comparing Python and JavaScript for web development. Include rows for 'Primary Use', 'Typing', and 'Backend Frameworks'."} />
            <div className="bg-gray-700 p-3 rounded-md pr-10">
              <code className="block whitespace-pre-wrap break-words font-mono text-sm text-gray-200">
                <span className="text-gray-400">// Prompt</span>
                {`\nCreate a markdown table comparing Python and JavaScript for web development. Include rows for 'Primary Use', 'Typing', and 'Backend Frameworks'.`}
              </code>
            </div>
          </div>

          <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border-2 border-dashed border-blue-500/50">
            <h3 className="font-semibold text-white mb-2">Your Turn: Requesting Markdown</h3>
            <p className="text-gray-400 mb-4">Ask the AI to generate a response formatted in Markdown. Try asking for a bulleted list, a numbered list, or a table.</p>
            <InlineChat 
              moduleId="module-3.3-markdown"
              placeholder="Ask for a markdown table or list..." 
              challengeChecklist={markdownChallengeChecklist}
            />
          </div>
        </div>
      </Accordion>

      <Accordion title="Exercise: Generate a Structured List" icon={<Lightbulb />}>
        <p className="text-gray-300 mb-4">Use the chat window below to ask the AI to generate a list of project ideas for a new web developer. Specify that the output should be a JSON array of objects, each with a 'title' and a 'description'.</p>
        <InlineChat 
          moduleId="module-3.3-structured-output"
          placeholder="Generate a list of 3 project ideas for a beginner..." 
          challengeChecklist={structuredListChallengeChecklist}
        />
        <p className="text-gray-400 mt-3">This kind of structured output can be directly used to populate a UI component in an application.</p>
      </Accordion>

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
          onClick={() => completeLesson(3, 3)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Function Calling <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson3_3;
