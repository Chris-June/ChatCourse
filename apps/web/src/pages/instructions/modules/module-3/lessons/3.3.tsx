import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Code, FileJson, Lightbulb } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';
import Accordion from '../../../components/Accordion';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

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
      explanation: 'Markdown is a lightweight markup language perfect for creating rich text content like documentation, blog posts, or formatted messages.'
    },
    {
      questionText: 'What is a key best practice when prompting for JSON output?',
      options: [
        'Using vague and ambiguous key names.',
        'Hoping the AI guesses the format you want.',
        'Being explicit about the desired format, defining the keys, and providing an example if possible.',
        'Writing the prompt in all capital letters.'
      ],
      correctAnswer: 'Being explicit about the desired format, defining the keys, and providing an example if possible.',
      explanation: 'Clarity and specificity are crucial. Telling the AI exactly what you want (including an example) dramatically increases the reliability of the structured output.'
    },
    {
      questionText: 'Asking for structured output is like giving the AI a form to fill out, while asking for raw text is like...',
      options: [
        '...asking it to solve a math equation.',
        '...asking it to write an essay.',
        '...asking it to shut down.',
        '...asking it to draw a picture.'
      ],
      correctAnswer: '...asking it to write an essay.',
      explanation: 'This analogy highlights the difference between unstructured, free-form responses (an essay) and predictable, structured responses (a filled-out form), which are much easier for an application to process.'
    }
  ];

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
        Imagine you're a chef trying to get ingredients from different suppliers. Raw text is like getting a story about tomatoes - "These beautiful red tomatoes were grown in sunny California..." Structured output is like getting a grocery list: "Tomatoes: 3 lbs, Roma variety, $2.99/lb." One is nice to read, the other you can actually cook with.
      </p>

      <Accordion title="Why Use Structured Outputs?" icon={<Lightbulb />} isInitiallyOpen>
        <p className="text-gray-300 mb-4">
          Think of it like the difference between a handwritten note and a spreadsheet. A note saying "Customer called, seemed happy about the product" is nice, but a structured record with <code>{'{"customer_satisfaction": 8, "product_feedback": "positive", "follow_up_needed": false}'}</code> lets you track trends, generate reports, and take action. It's the difference between <strong>information you read</strong> and <strong>data you can use</strong>.
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-blue-400 mb-2">1. Restaurant Reviews</h4>
            <p className="text-gray-300 mb-2"><strong>Scenario:</strong> A food blog needs to summarize customer reviews for a new pizza place.</p>
            <p className="text-gray-400"><strong>Analogy:</strong> Like having a food critic who always rates dishes on the same 5-point scale instead of just saying "it was good." <strong>Structured output:</strong> <code>{'{"food_rating": 5, "service_rating": 2, "review_summary": "Great pizza, slow service"}'}</code> lets you instantly compare hundreds of reviews.</p>
          </div>
          <div className="bg-gray-800/60 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-blue-400 mb-2">2. Real Estate Listings</h4>
            <p className="text-gray-300 mb-2"><strong>Scenario:</strong> A property website needs details from a house description.</p>
            <p className="text-gray-400"><strong>Analogy:</strong> Like having a real estate agent who always provides the same key details instead of just saying "it's a lovely home." <strong>Structured output:</strong> <code>{'{"bedrooms": 3, "bathrooms": 2, "lot_size": "large", "price": 450000}'}</code> enables precise filtering and search.</p>
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
          <h3 className="font-semibold text-white mb-2">Example: Data Extraction Like a Form</h3>
          <p className="text-gray-400 mb-3">
            Instead of hoping the AI extracts the right details, you give it a specific form to fill out. This is like giving someone a tax form instead of asking them to "tell me about your finances."
          </p>
          <div className="relative mb-4">
            <CopyButton textToCopy={'Extract the name, age, and city from the following sentence. Provide the output as a JSON object with the keys "userName", "userAge", and "location".\n\nSentence: "John, a 42-year-old resident of Berlin, loves to code."'} />
            <div className="bg-gray-700 p-3 rounded-md pr-10">
              <code className="block whitespace-pre-wrap break-words font-mono text-sm text-gray-200">
                <span className="text-gray-400">// Prompt - Like a form template</span>
                {`\nExtract the name, age, and city from the following sentence. Provide the output as a JSON object with the keys "userName", "userAge", and "location".\n\nSentence: "John, a 42-year-old resident of Berlin, loves to code." `}
              </code>
            </div>
          </div>
          <h4 className="font-semibold text-gray-200 mb-2">AI Response - Perfectly structured:</h4>
          <div className="bg-gray-800 p-3 rounded-md">
            <code className="block whitespace-pre-wrap break-words font-mono text-sm text-green-400">
              {`{
  "userName": "John",
  "userAge": 42,
  "location": "Berlin"
}`}
            </code>
          </div>
          <div className="text-xs text-gray-400 mt-2">
            <strong>Key insight:</strong> Notice how we didn't just ask for "user info" - we specified the exact keys and format. This eliminates guesswork and ensures consistency.
          </div>
        </div>

        <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border-2 border-dashed border-blue-500/50">
          <h3 className="font-semibold text-white mb-2">Your Turn: Requesting JSON</h3>
          <p className="text-gray-400 mb-4">Try extracting structured data from a sentence. Ask for a JSON object with specific keys.</p>
          <InlineChat 
            moduleId="module-3.3-json-extraction"
            maxAttempts={5}
            maxFollowUps={2}
            placeholder="Request user info from a sentence into JSON format..."
            systemPrompt="You are a helpful AI assistant. The user is learning about structured data extraction. When they provide a sentence, extract the relevant information into a well-formatted JSON object. If they don't specify the keys, suggest a structure. Always validate the JSON before returning it. If the input is ambiguous, ask for clarification."
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
          <h3 className="font-semibold text-white mb-2">Best Practices - Like Building with LEGO</h3>
          <ul className="list-disc list-inside text-gray-400 space-y-2">
            <li><strong>Be Explicit (Provide the blueprint):</strong> Don't ask for "a house" - provide the exact LEGO instructions with piece counts and placement.</li>
            <li><strong>Provide Examples (Show the finished model):</strong> Include a photo of the completed structure so they know exactly what success looks like.</li>
            <li><strong>Validate Output (Check all pieces are there):</strong> Count the bricks, verify colors match, ensure nothing is missing.</li>
            <li><strong>Iterate (Adjust based on results):</strong> If the roof is wrong, don't rebuild everything - just adjust the specific pieces that need fixing.</li>
          </ul>
          <div className="text-xs text-green-400 mt-3">
            <strong>Pro tip:</strong> Start simple with 2-3 keys, then gradually add complexity as you see what works. It's easier to add pieces than to redesign the whole structure.
          </div>
        </div>
      </Accordion>

      <Accordion title="Requesting Markdown" icon={<Code />}>
        <p className="text-gray-300 mb-4">
          Markdown is perfect for generating formatted text, like reports, summaries, or documentation. You can ask for tables, lists, code blocks, and more.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Example: Markdown as a Design Template</h3>
          <p className="text-gray-400 mb-3">
            Markdown is like having a graphic designer who follows your exact template. Instead of getting a paragraph describing a table, you get a perfectly formatted table ready to display.
          </p>
          <div className="relative">
            <CopyButton textToCopy={"Create a markdown table comparing Python and JavaScript for web development. Include rows for 'Primary Use', 'Typing', and 'Backend Frameworks'."} />
            <div className="bg-gray-700 p-3 rounded-md pr-10">
              <code className="block whitespace-pre-wrap break-words font-mono text-sm text-gray-200">
                <span className="text-gray-400">// Prompt - Like giving a designer your specs</span>
                {`\nCreate a markdown table comparing Python and JavaScript for web development. Include rows for 'Primary Use', 'Typing', and 'Backend Frameworks'.`}
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
        </div>
      </Accordion>

      <Accordion title="Exercise: Build Your Data Blueprint" icon={<Lightbulb />}>
        <p className="text-gray-300 mb-4">Think of this like being an architect designing a building. You need to specify exactly what data structure you want. Ask the AI to generate a list of project ideas for a new web developer, but be specific: you want a JSON array of objects, each with a 'title' and 'description'.</p>
        <InlineChat 
          moduleId="module-3.3-structured-output"
          maxAttempts={5}
          maxFollowUps={2}
          placeholder="Generate 3 beginner project ideas as JSON objects..."
          systemPrompt="You are a helpful AI assistant. The user is learning about generating structured data. When they ask for a list, respond with a properly formatted JSON array of objects. Each object should have 'title' and 'description' keys. If they don't specify the structure, use this format by default. Always validate the JSON before returning it."
          challengeChecklist={structuredListChallengeChecklist}
        />
        <p className="text-gray-400 mt-3">This structured data is like pre-fabricated building materials - ready to be used directly in your application's UI components without any additional processing.</p>
      </Accordion>

      {/* Validation Quiz */}
      <section className="mt-8">
        <ModuleQuizzes questions={quizQuestions} />
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
