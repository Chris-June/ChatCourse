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

      <Accordion title="Why Use Structured Outputs?" icon={<Lightbulb />} isInitiallyOpen>
        <p className="text-gray-300 mb-4">
          Asking an AI for raw text is like asking a human to write an essay. Asking for structured output is like giving them a form to fill out. It gives you <strong>predictability</strong>, <strong>reliability</strong>, and <strong>data you can actually use</strong> in your applications.
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-blue-400 mb-2">1. Restaurant Reviews</h4>
            <p className="text-gray-300 mb-2"><strong>Scenario:</strong> A food blog needs to summarize customer reviews for a new pizza place.</p>
            <p className="text-gray-400"><strong>Rationale:</strong> A paragraph saying "The pizza was amazing and the service was slow" is hard to compare. A structured summary like <code>{'{"food_rating": 5, "service_rating": 2, "review_summary": "Great pizza, slow service"}'}</code> allows for easy comparison and trend analysis.</p>
          </div>
          <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-blue-400 mb-2">2. Real Estate Listings</h4>
            <p className="text-gray-300 mb-2"><strong>Scenario:</strong> A property website needs details from a house description.</p>
            <p className="text-gray-400"><strong>Rationale:</strong> A long description like "charming 3-bed, 2-bath home with a big yard" is vague. A structured listing like <code>{'{"bedrooms": 3, "bathrooms": 2, "lot_size": "large", "price": 450000}'}</code> allows for precise filtering and search.</p>
          </div>
          <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-blue-400 mb-2">3. Travel Planning</h4>
            <p className="text-gray-300 mb-2"><strong>Scenario:</strong> A travel app needs to extract flight details from a confirmation email.</p>
            <p className="text-gray-400"><strong>Rationale:</strong> A sentence like "Your flight leaves at 3 PM" is ambiguous. A structured record like <code>{'{"airline": "Delta", "flight_number": "DL123", "departure_time": "15:00", "gate": "A12"}'}</code> allows for automatic itinerary updates.</p>
          </div>
          <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-blue-400 mb-2">4. Medical Records</h4>
            <p className="text-gray-300 mb-2"><strong>Scenario:</strong> A clinic needs to summarize a patient's visit notes.</p>
            <p className="text-gray-400"><strong>Rationale:</strong> A doctor's notes like "patient is feeling better" are subjective. A structured summary like <code>{'{"diagnosis": "flu", "prescribed_medication": "Tamiflu", "follow_up": "1 week"}'}</code> ensures consistent and actionable records.</p>
          </div>
          <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-blue-400 mb-2">5. E-commerce Orders</h4>
            <p className="text-gray-300 mb-2"><strong>Scenario:</strong> An online store needs to process order confirmations.</p>
            <p className="text-gray-400"><strong>Rationale:</strong> An email saying "Your order is on its way" is vague. A structured update like <code>{'{"order_id": "ORD-789", "status": "shipped", "tracking_number": "1Z999AA10123456784", "estimated_delivery": "2024-08-10"}'}</code> allows for automatic tracking and customer notifications.</p>
          </div>
          <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-blue-400 mb-2">6. Job Applications</h4>
            <p className="text-gray-300 mb-2"><strong>Scenario:</strong> A recruiter needs to extract key details from a resume.</p>
            <p className="text-gray-400"><strong>Rationale:</strong> A paragraph like "experienced software engineer with a passion for AI" is hard to filter. A structured summary like <code>{'{"name": "John Doe", "experience_years": 8, "skills": ["Python", "AI", "Leadership"], "desired_salary": 120000}'}</code> allows for quick candidate screening.</p>
          </div>
          <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-blue-400 mb-2">7. Financial Reports</h4>
            <p className="text-gray-300 mb-2"><strong>Scenario:</strong> An investor needs to understand a company's quarterly earnings.</p>
            <p className="text-gray-400"><strong>Rationale:</strong> A long earnings report is hard to digest. A structured summary like <code>{'{"company": "Acme Inc", "quarter": "Q2 2024", "revenue": 5000000, "profit": 1000000, "key_highlight": "launched new product line"}'}</code> allows for quick comparison and decision-making.</p>
          </div>
        </div>
      </Accordion>

      <Accordion title="Requesting JSON" icon={<FileJson />}>
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

      <Accordion title="JSON Schemas & Best Practices" icon={<FileJson />}>
        <p className="text-gray-300 mb-4">
          To ensure the AI returns data in a predictable format, you can define a JSON schema. This acts as a blueprint for the model, specifying the exact structure, data types, and required fields.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Example: Defining a Schema</h3>
          <p className="text-gray-400 mb-3">
            Instead of just asking for a JSON object, you can provide the schema itself.
          </p>
          <div className="relative mb-4">
            <CopyButton textToCopy={'Extract the following details from the user\'s bio into a JSON object. The object should have the keys: "name" (string), "age" (number), "skills" (array of strings), and "location" (object with keys "city" and "country").\n\nBio: "Sarah, a 28-year-old software engineer from Toronto, Canada, is skilled in Python, React, and Node.js."'} />
            <div className="bg-gray-700 p-3 rounded-md pr-10">
              <code className="block whitespace-pre-wrap break-words font-mono text-sm text-gray-200">
                <span className="text-gray-400">// Prompt</span>
                {`Extract the following details from the user's bio into a JSON object. The object should have the keys: "name" (string), "age" (number), "skills" (array of strings), and "location" (object with keys "city" and "country").

Bio: "Sarah, a 28-year-old software engineer from Toronto, Canada, is skilled in Python, React, and Node.js."`}
              </code>
            </div>
          </div>
          <div className="bg-gray-800 p-3 rounded-md">
            <code className="block whitespace-pre-wrap break-words font-mono text-sm text-green-400">
              {`{
  "name": "Sarah",
  "age": 28,
  "skills": ["Python", "React", "Node.js"],
  "location": {
    "city": "Toronto",
    "country": "Canada"
  }
}`}
            </code>
          </div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 mt-4">
          <h3 className="font-semibold text-white mb-2">Best Practices</h3>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li><strong>Be Explicit:</strong> Clearly state the desired format and keys.</li>
            <li><strong>Provide Examples:</strong> Include a sample JSON object when possible.</li>
            <li><strong>Validate Output:</strong> Always check the returned JSON for validity and completeness.</li>
            <li><strong>Iterate:</strong> Refine your prompt based on the AI's output.</li>
          </ul>
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
