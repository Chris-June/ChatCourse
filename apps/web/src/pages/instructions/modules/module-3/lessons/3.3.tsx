import React from 'react';
import { Code, FileJson, Lightbulb } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';
import InlineChat from '../../../../../components/InlineChat';
import Accordion from '../../../components/Accordion';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';

const jsonChallengeChecklist = [
  { text: 'Ask the AI to extract name, age, and city from a sentence like "Sarah, 28, lives in Toronto"', completed: false },
  { text: 'Explicitly specify "return as JSON object with keys: name, age, city"', completed: false },
  { text: 'Define exact data types: name (string), age (number), city (string)', completed: false },
  { text: 'Verify the response matches: {"name": "Sarah", "age": 28, "city": "Toronto"}', completed: false },
];

const markdownChallengeChecklist = [
  { text: 'Ask the AI to create a comparison of Python vs JavaScript', completed: false },
  { text: 'Explicitly specify "return as markdown table with columns: Feature, Python, JavaScript"', completed: false },
  { text: 'Request specific rows: Syntax, Typing, Popular Frameworks', completed: false },
  { text: 'Verify the response is a properly formatted markdown table with | separators', completed: false },
];

const structuredListChallengeChecklist = [
  { text: 'Ask for 3 beginner web development project ideas', completed: false },
  { text: 'Specify "return as JSON array with objects containing title and description keys"', completed: false },
  { text: 'Define example structure: {"title": "Todo App", "description": "A simple task manager"}', completed: false },
  { text: 'Verify response is valid JSON array like: [{"title": "...", "description": "..."}, {...}]', completed: false },
];

const Lesson3_3: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'Why is requesting structured output (like JSON) from an AI useful for applications?',
      options: [
        'It makes the AI\'s response longer and more detailed.',
        'It provides predictable, machine-readable data that can be easily used in code.',
        'It\'s the only way to get a correct answer from the AI.',
        'It makes the AI\'s response look nicer.'
      ],
      correctAnswer: 'It provides predictable, machine-readable data that can be easily used in code.',
      explanation: 'Structured data has a consistent format, which allows your application to reliably parse and use the information, for example, to populate a UI component or store in a database.'
    },
    {
      questionText: 'If you want the AI to return a list of items as a JSON array, what should you specify in your prompt?',
      options: [
        'Just ask for a list and hope for the best.',
        'Ask for a \'computer list\'.',
        'Explicitly ask for a JSON array and define the schema for the objects inside (e.g., keys like \'title\', \'description\').',
        'Tell the AI to write JavaScript code.'
      ],
      correctAnswer: 'Explicitly ask for a JSON array and define the schema for the objects inside (e.g., keys like \'title\', \'description\').',
      explanation: 'Being explicit is key. The more specific you are about the format (JSON array) and the structure of each item (the object keys), the more likely you are to get the exact output you need.'
    },
    {
      questionText: 'What is a good use case for asking an AI to generate Markdown?',
      options: [
        'Calculating a complex math problem.',
        'Generating a user\'s authentication token.',
        'Creating a formatted report with tables, headings, and lists that can be rendered directly in a UI.',
        'Storing secret API keys.'
      ],
      correctAnswer: 'Creating a formatted report with tables, headings, and lists that can be rendered directly in a UI.',
      explanation: 'Markdown is a lightweight markup language that is perfect for creating formatted text. It can be easily converted to HTML and rendered in a web browser or other applications.'
    }
  ];

  return (
    <LessonTemplate
      moduleNumber={3}
      lessonNumber={3}
      title="3.3: Requesting Structured Output"
      subtitle="Getting the AI to give you exactly what you need."
      quizQuestions={quizQuestions}
    >
      <div className="space-y-8 text-gray-300">
        <Accordion title="Framing Your Request: You're the Client" isInitiallyOpen icon={<FileJson />}>
          <div className="prose prose-invert max-w-none">
            <p>
              When you need data for an application, think of the AI as a developer you've hired. You wouldn't just say, "Give me some user info." You'd provide a clear data schema. The same principle applies here. By specifying the exact format (like JSON) and structure (keys, data types), you turn the AI's response from a simple text string into a machine-readable, predictable data source.
            </p>
            <p className="text-gray-400 mb-3">
              This is like giving a developer a blueprint. Instead of a vague description, you provide a precise plan that ensures the final product fits perfectly into your application.
            </p>
            <div className="relative">
              <CopyButton textToCopy={'From the sentence "Sarah, 28, lives in Toronto", extract the name, age, and city. Return it as a JSON object with keys "name" (string), "age" (number), and "city" (string).'} />
              <div className="bg-gray-700 p-3 rounded-md pr-10">
                <code className="block whitespace-pre-wrap break-words font-mono text-sm text-gray-200">
                  <span className="text-gray-400">// Prompt - Like giving a developer a data schema</span>
                  {`
From the sentence "Sarah, 28, lives in Toronto", extract the name, age, and city. Return it as a JSON object with keys "name" (string), "age" (number), and "city" (string).`}
                </code>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-400">
              <strong>What you'll get:</strong> A clean, usable JSON object.
            </div>
            <div className="bg-gray-800 p-3 rounded-md mt-2">
              <code className="block whitespace-pre-wrap break-words font-mono text-sm text-green-400">
                {`{
  "name": "Sarah",
  "age": 28,
  "city": "Toronto"
}`}
              </code>
            </div>
          </div>

          <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border-2 border-dashed border-blue-500/50">
            <h3 className="font-semibold text-white mb-2">Your Turn: Define Your Data Structure</h3>
            <p className="text-gray-400 mb-4">Practice being the client. Ask the AI to extract information from a sentence, but be demanding about the format. Specify the keys and data types you need.</p>
            <InlineChat 
              moduleId="module-3.3-json"
              maxAttempts={5}
              maxFollowUps={2}
              placeholder="Give the AI a sentence and a JSON schema..."
              systemPrompt="You are a helpful AI assistant. The user is learning about JSON formatting. When they provide a sentence and a JSON schema, extract the relevant information and return it in the specified JSON format. Pay close attention to the requested keys and data types. If the user doesn't provide a schema, ask for one."
              challengeChecklist={jsonChallengeChecklist}
            />
          </div>
        </Accordion>

        <Accordion title="Formatting for Display: You're the Designer" icon={<Code />}>
          <div className="prose prose-invert max-w-none">
            <p>
              Sometimes you need formatted content, not raw data. In these cases, think of yourself as a graphic designer providing a layout. By asking for Markdown, you can request structured text with headings, lists, tables, and more. This is perfect for generating reports, documentation, or any content that needs to be displayed in a clean, readable format.
            </p>
            <p className="text-gray-400 mb-3">
              Markdown is like having a graphic designer who follows your exact template. Instead of getting a paragraph describing a table, you get a perfectly formatted table ready to display.
            </p>
            <div className="relative">
              <CopyButton textToCopy={"Create a markdown table comparing Python and JavaScript for web development. Include rows for 'Primary Use', 'Typing', and 'Backend Frameworks'."} />
              <div className="bg-gray-700 p-3 rounded-md pr-10">
                <code className="block whitespace-pre-wrap break-words font-mono text-sm text-gray-200">
                  <span className="text-gray-400">// Prompt - Like giving a designer your specs</span>
                  {`
Create a markdown table comparing Python and JavaScript for web development. Include rows for 'Primary Use', 'Typing', and 'Backend Frameworks'.`}
                </code>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-400">
              <strong>What you'll get:</strong> A perfectly formatted table like this:
            </div>
            <div className="bg-gray-800 p-3 rounded-md mt-2">
              <code className="block whitespace-pre-wrap break-words font-mono text-sm text-green-400">
                {`| Feature | Python | JavaScript |
| Primary Use | Data science, backend | Frontend, full-stack |
| Typing | Dynamic (optional static) | Dynamic |
| Backend Frameworks | Django, Flask | Express, Node.js |`}
              </code>
            </div>
          </div>

          <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border-2 border-dashed border-blue-500/50">
            <h3 className="font-semibold text-white mb-2">Your Turn: Design Your Own Template</h3>
            <p className="text-gray-400 mb-4">Think of yourself as a client giving design specs to a designer. Ask for exactly what you want - a bulleted list, numbered steps, or a comparison table.</p>
            <InlineChat 
              moduleId="module-3.3-markdown"
              maxAttempts={5}
              maxFollowUps={2}
              placeholder="Ask for a markdown table or list..."
              systemPrompt="You are a helpful AI assistant. The user is learning about Markdown formatting. When they ask for content, respond with properly formatted Markdown. Include various elements like headers, lists, tables, and code blocks as appropriate. If they don't specify the format, use your best judgment to create a well-structured response."
              challengeChecklist={markdownChallengeChecklist}
            />
          </div>
        </Accordion>

        <Accordion title="Exercise: Build Your Data Blueprint" icon={<Lightbulb />}>
          <p className="text-gray-300 mb-4">Think of this like being an architect designing a building. You need to specify exactly what data structure you want. Ask the AI to generate a list of project ideas for a new web developer, but be specific: you want a JSON array of objects, each with a 'title' and 'description'.</p>
          <InlineChat 
            moduleId="module-3.3-structured-output"
            maxAttempts={5}
            maxFollowUps={2}
            placeholder="Generate a list of 3 project ideas for a beginner..."
            systemPrompt="You are a helpful AI assistant. The user is learning about generating structured data. When they ask for a list, respond with a properly formatted JSON array of objects. Each object should have 'title' and 'description' keys. If they don't specify the structure, use this format by default. Always validate the JSON before returning it."
            challengeChecklist={structuredListChallengeChecklist}
          />
          <p className="text-gray-400 mt-3">This structured data is like pre-fabricated building materials - ready to be used directly in your application's UI components without any additional processing.</p>
        </Accordion>
      </div>
    </LessonTemplate>
  );
};

export default Lesson3_3;
