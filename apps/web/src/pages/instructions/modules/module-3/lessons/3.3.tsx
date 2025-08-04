import React from 'react';
import { Code, FileJson, Lightbulb } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';
import InlineChat from '../../../../../components/InlineChat';
import Accordion from '../../../components/Accordion';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import KeyTakeaways from '../../../components/KeyTakeaways';
import BestPractices from '../../../components/BestPractices';

const jsonChallengeChecklist = [
  { id: 'json-1', text: 'Ask the AI to extract name, age, and city from a sentence like "Sarah, 28, lives in Toronto"', completed: false },
  { id: 'json-2', text: 'Explicitly specify "return as JSON object with keys: name, age, city"', completed: false },
  { id: 'json-3', text: 'Define exact data types: name (string), age (number), city (string)', completed: false },
  { id: 'json-4', text: 'Verify the response matches: {"name": "Sarah", "age": 28, "city": "Toronto"}', completed: false },
];

const markdownChallengeChecklist = [
  { id: 'md-1', text: 'Ask the AI to create a comparison of Python vs JavaScript', completed: false },
  { id: 'md-2', text: 'Explicitly specify "return as markdown table with columns: Feature, Python, JavaScript"', completed: false },
  { id: 'md-3', text: 'Request specific rows: Syntax, Typing, Popular Frameworks', completed: false },
  { id: 'md-4', text: 'Verify the response is a properly formatted markdown table with | separators', completed: false },
];

const structuredListChallengeChecklist = [
  { id: 'list-1', text: 'Ask for 3 beginner web development project ideas', completed: false },
  { id: 'list-2', text: 'Specify "return as JSON array with objects containing title and description keys"', completed: false },
  { id: 'list-3', text: 'Define example structure: {"title": "Todo App", "description": "A simple task manager"}', completed: false },
  { id: 'list-4', text: 'Verify response is valid JSON array like: [{"title": "...", "description": "..."}, {...}]', completed: false },
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
      explanation: 'Markdown is a lightweight markup language for creating formatted text. It\'s ideal for when you need content that is readable as plain text but can also be rendered into rich text.'
    },
    {
      questionText: 'When asking for a specific JSON structure, what is one of the most effective ways to improve the AI\'s accuracy?',
      options: [
        'Using all caps in your prompt.',
        'Including a clear example of the desired JSON output in the prompt.',
        'Asking the AI if it understands the request.',
        'Making the prompt as short as possible.',
      ],
      correctAnswer: 'Including a clear example of the desired JSON output in the prompt.',
      explanation: 'Providing a concrete example (e.g., `{"key": "value"}`) acts as a powerful guide, leaving less room for ambiguity and significantly increasing the chances of getting a perfectly formatted response.',
    },
    {
      questionText: 'Your application requests JSON data from an AI. What is a crucial step to prevent your application from crashing?',
      options: [
        'Assuming the AI will always return perfect JSON.',
        'Immediately using the AI\'s output without checking it.',
        'Implementing a validation step to parse and check the JSON structure before using it.',
        'Asking the AI to promise its output is correct.',
      ],
      correctAnswer: 'Implementing a validation step to parse and check the JSON structure before using it.',
      explanation: 'AI models can sometimes generate malformed or incomplete JSON. Always validating the structure in your code before processing it is a critical best practice for building robust applications.',
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
      <div className="space-y-8">
        <Accordion title="Framing Your Request: You're the Client" isInitiallyOpen icon={<FileJson />}>
          <div className="prose prose-invert max-w-none">
            <p>
              When you need data for an application, think of the AI as a developer you've hired. You wouldn't just say, "Give me some user info." You'd provide a clear data schema. The same principle applies here. By specifying the exact format (like JSON) and structure (keys, data types), you turn the AI's response from a simple text string into a machine-readable, predictable data source.
            </p>
            <p className="text-muted-foreground mb-3">
              This is like giving a developer a blueprint. Instead of a vague description, you provide a precise plan that ensures the final product fits perfectly into your application.
            </p>
            <div className="relative">
              <CopyButton textToCopy={'From the sentence "Sarah, 28, lives in Toronto", extract the name, age, and city. Return it as a JSON object with keys "name" (string), "age" (number), and "city" (string).'} />
              <div className="bg-muted p-3 rounded-md pr-10">
                <code className="block whitespace-pre-wrap break-words font-mono text-muted-foreground">
                  <span className="text-muted-foreground">// Prompt - Like giving a developer a data schema</span>
                  {`
From the sentence "Sarah, 28, lives in Toronto", extract the name, age, and city. Return it as a JSON object with keys "name" (string), "age" (number), and "city" (string).`}
                </code>
              </div>
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
              <strong>What you'll get:</strong> A clean, usable JSON object.
            </div>
            <div className="bg-muted p-3 rounded-md mt-2">
              <code className="block whitespace-pre-wrap break-words font-mono text-sm text-success">
                {`{
  "name": "Sarah",
  "age": 28,
  "city": "Toronto"
}`}
              </code>
            </div>
          </div>

          <div className="mt-6 bg-card p-4 rounded-xl border-2 border-dashed border-primary/50">
            <h3 className="font-semibold text-foreground mb-2">Your Turn: Define Your Data Structure</h3>
            <p className="text-muted-foreground mb-4">Practice being the client. Ask the AI to extract information from a sentence, but be demanding about the format. Specify the keys and data types you need.</p>
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
            <p className="text-muted-foreground mb-3">
              Markdown is like having a graphic designer who follows your exact template. Instead of getting a paragraph describing a table, you get a perfectly formatted table ready to display.
            </p>
            <div className="relative">
              <CopyButton textToCopy={"Create a markdown table comparing Python and JavaScript for web development. Include rows for 'Primary Use', 'Typing', and 'Backend Frameworks'."} />
              <div className="bg-muted p-3 rounded-md pr-10">
                <code className="block whitespace-pre-wrap break-words font-mono text-muted-foreground">
                  <span className="text-muted-foreground">// Prompt - Like giving a designer your specs</span>
                  {`
Create a markdown table comparing Python and JavaScript for web development. Include rows for 'Primary Use', 'Typing', and 'Backend Frameworks'.`}
                </code>
              </div>
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
              <strong>What you'll get:</strong> A perfectly formatted table like this:
            </div>
            <div className="bg-muted p-3 rounded-md mt-2">
              <code className="block whitespace-pre-wrap break-words font-mono text-sm text-success">
                {`| Feature | Python | JavaScript |\n| Primary Use | Data science, backend | Frontend, full-stack |\n| Typing | Dynamic (optional static) | Dynamic |\n| Backend Frameworks | Django, Flask | Express, Node.js |`}
              </code>
            </div>
          </div>

          <div className="mt-6 bg-card p-4 rounded-xl border-2 border-dashed border-primary/50">
            <h3 className="font-semibold text-foreground mb-2">Your Turn: Design Your Own Template</h3>
            <p className="text-muted-foreground mb-4">Think of yourself as a client giving design specs to a designer. Ask for exactly what you want - a bulleted list, numbered steps, or a comparison table.</p>
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
          <p className="text-muted-foreground mb-4">Think of this like being an architect designing a building. You need to specify exactly what data structure you want. Ask the AI to generate a list of project ideas for a new web developer, but be specific: you want a JSON array of objects, each with a 'title' and 'description'.</p>
          <InlineChat 
            moduleId="module-3.3-structured-output"
            maxAttempts={5}
            maxFollowUps={2}
            placeholder="Generate a list of 3 project ideas for a beginner..."
            systemPrompt="You are a helpful AI assistant. The user is learning about generating structured data. When they ask for a list, respond with a properly formatted JSON array of objects. Each object should have 'title' and 'description' keys. If they don't specify the structure, use this format by default. Always validate the JSON before returning it."
            challengeChecklist={structuredListChallengeChecklist}
          />
          <p className="text-muted-foreground mt-3">This structured data is like pre-fabricated building materials - ready to be used directly in your application's UI components without any additional processing.</p>
        </Accordion>

        <BestPractices
          dos={[
            'Be explicit: Clearly state the desired format (e.g., "Return as a JSON object").',
            'Define the schema: Specify keys, data types, and even provide an example of the structure you want.',
            'For formatted text, ask for Markdown. It\'s perfect for tables, lists, and headers.',
          ]}
          donts={[
            'Don\'t vaguely ask for a "list." Specify if you want a numbered list, bullet points, or a JSON array.',
            'Avoid assuming the AI will guess your desired structure. Always provide clear instructions.',
            'Don\'t forget that the AI can generate invalid JSON. Always validate the output in your application code.',
          ]}
        />

        <KeyTakeaways
          points={[
            'Requesting structured output (like JSON or Markdown) makes AI responses predictable and machine-readable.',
            'The more specific your instructions are about format and schema, the more reliable the output will be.',
            'Use JSON for data that needs to be parsed by an application, and Markdown for text that needs to be displayed with formatting.',
            'You can dramatically improve reliability by providing a clear example of the output you want in your prompt.',
          ]}
        />
      </div>
    </LessonTemplate>
  );
};

export default Lesson3_3;
