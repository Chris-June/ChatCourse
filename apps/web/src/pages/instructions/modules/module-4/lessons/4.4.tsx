import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BrainCircuit, Rocket, Lightbulb, BookOpen, Star, Zap, Code, Layers, SlidersHorizontal, ShieldCheck } from 'lucide-react';

import Accordion from '../../../components/Accordion';
import ComparisonCard from '../../../components/ComparisonCard';
import RealWorldSpotlight from '../../../components/RealWorldSpotlight';
import DidYouKnow from '../../../components/DidYouKnow';
import GlossaryTerm from '../../../components/GlossaryTerm';
import GptPipelineDiagram from '../../../components/GptPipelineDiagram';
import CheckpointQuiz from '../../../components/CheckpointQuiz';
import TransformerArchitectureDiagram from '../../../components/TransformerArchitectureDiagram';
import ParameterSliders from '../../../components/ParameterSliders';
import InteractivePromptExercise from '../../../components/InteractivePromptExercise';
import RagChunkingDiagram from '../../../components/RagChunkingDiagram';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

const Lesson4_4: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What is the best definition of a \'GPT\'?',
      options: [
        'A custom version of an AI model packaged with specific instructions, knowledge, and tools for a specialized purpose.',
        'A generic, un-customized chatbot.',
        'A type of computer hardware for running AI.',
        'A programming language for artificial intelligence.'
      ],
      correctAnswer: 'A custom version of an AI model packaged with specific instructions, knowledge, and tools for a specialized purpose.',
      explanation: 'A GPT is a tailored solution that combines a persona (instructions), specialized data (knowledge), and a set of skills (tools) to create a specialized assistant. Think of it as creating a custom superhero with unique origin story, superpowers, and utility belt.'
    },
    {
      questionText: 'What are the three key ingredients that make up a GPT?',
      options: [
        'Speed, Memory, and Power.',
        'Hardware, Software, and Internet.',
        'Custom Instructions, Expanded Knowledge, and Capabilities (Tools).',
        'Text, Images, and Audio.'
      ],
      correctAnswer: 'Custom Instructions, Expanded Knowledge, and Capabilities (Tools).',
      explanation: 'These three components—persona, knowledge, and skills—are the fundamental building blocks for creating a specialized GPT.'
    },
    {
      questionText: 'What is the primary purpose of the \'Expanded Knowledge\' component, often implemented with RAG?',
      options: [
        'To make the AI\'s personality more interesting.',
        'To allow the AI to access and retrieve information from documents or databases it wasn\'t originally trained on.',
        'To let the AI write code.',
        'To change the AI\'s core architecture.'
      ],
      correctAnswer: 'To allow the AI to access and retrieve information from documents or databases it wasn\'t originally trained on.',
      explanation: 'Retrieval-Augmented Generation (RAG) gives the GPT a \'memory\' by connecting it to external data sources, allowing it to provide information beyond its training data.'
    },
    {
      questionText: 'What does \'chaining tools\' as a powerful technique mean?',
      options: [
        'Linking multiple AI models together.',
        'Using the output of one tool as the input for another to solve multi-step problems.',
        'Running the same tool multiple times in a row.',
        'A security method for protecting tools.'
      ],
      correctAnswer: 'Using the output of one tool as the input for another to solve multi-step problems.',
      explanation: 'Chaining allows the AI to perform complex workflows, like finding a flight and then booking it, by passing information from one step to the next.'
    },
    {
      questionText: 'What is the main function of the \'Custom Instructions\' in a GPT?',
      options: [
        'To provide the tool\'s source code.',
        'To define the GPT\'s personality, goals, rules, and constraints.',
        'To list the files the GPT can access.',
        'To set the model\'s temperature and other parameters.'
      ],
      correctAnswer: 'To define the GPT\'s personality, goals, rules, and constraints.',
      explanation: 'The custom instructions act as the GPT\'s constitution or character sheet, guiding its behavior, tone, and how it should respond to users.'
    }
  ];

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">4.4: Understanding GPTs</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-4/4.3" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-4/4.5" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next: AI Agents <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <Accordion title="The Big Idea: Packaging AI Superpowers" icon={<Rocket />} isInitiallyOpen>
        <div className="text-gray-300">
          We've learned how to give an AI new skills with tools. Now, let's learn how to package those skills into a complete, specialized assistant called a <GlossaryTerm term="GPT" definition="A custom version of ChatGPT that combines instructions, extra knowledge, and capabilities for a specific purpose." />. Think of it as creating a custom superhero, complete with a unique personality, special knowledge, and a utility belt of custom tools.
        </div>
      </Accordion>

      <GptPipelineDiagram />

      <Accordion title="Under the Hood: The Transformer Architecture" icon={<Layers />}>
        <div className="text-gray-300 mb-4">
          GPTs are powered by a revolutionary model architecture called the Transformer. While the math is complex, the core ideas are intuitive. This diagram breaks down the key steps that allow a model to understand language contextually.
        </div>
        <TransformerArchitectureDiagram />
      </Accordion>

      <Accordion title="What Makes a GPT? The Three Key Ingredients" icon={<BrainCircuit />}>
        <div className="space-y-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white">1. Custom Instructions (The Persona)</h3>
            <div className="text-gray-400">This is the GPT's 'constitution.' It's a detailed prompt defining its personality, goals, and constraints. Example: `You are a helpful assistant who speaks only in pirate slang.`</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white">2. Expanded Knowledge (The Brains)</h3>
            <div className="text-gray-400">You can upload files (like PDFs) to give the GPT specific expertise. This uses a technique called <GlossaryTerm term="Retrieval-Augmented Generation (RAG)" definition="The process of providing an AI with external knowledge to retrieve information from, reducing hallucinations and keeping it up-to-date." />, where the AI reads your documents to find answers.</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white">3. Custom Actions (The Utility Belt)</h3>
            <div className="text-gray-400 mb-2">This is where our tools come in. You give a GPT its superpowers by providing an <GlossaryTerm term="OpenAPI schema" definition="A standardized specification for describing APIs. It allows both humans and computers to discover and understand the capabilities of a service without access to source code." />, which is the universal language for describing tools to an AI.</div>
          </div>
        </div>
      </Accordion>

      <CheckpointQuiz 
        question="What is the primary advantage of using RAG in a custom GPT?"
        options={[
          "To change the AI's core personality.",
          "To provide the AI with specific, up-to-date knowledge.",
          "To make the AI run faster."
        ]}
        correctAnswerIndex={1}
        explanation="RAG allows a GPT to access external documents for answers, ensuring its knowledge is current and specific to the domain, rather than just relying on its training data."
      />

      <Accordion title="Real-World Spotlight: GPTs in Action" icon={<Star />}>
        <div className="space-y-4">
          <RealWorldSpotlight 
            icon={<Zap size={24}/>}
            title="Support Sentinel GPT"
            takeaway="By acting as an instant-knowledge expert, a custom GPT can dramatically improve support efficiency and consistency."
          >
            <p>A support team slashed response times by 50% with a GPT that can instantly look up customer history, analyze support tickets, and draft replies using company-approved language.</p>
          </RealWorldSpotlight>
          <RealWorldSpotlight 
            icon={<Code size={24}/>}
            title="Codebase Co-Pilot"
            takeaway="A codebase-aware GPT acts as a tireless pair programmer, accelerating development and reducing bugs by understanding the project's unique context."
          >
            <p>Developers can build a GPT that understands their specific codebase, coding standards, and common bugs. It can help write boilerplate code, suggest fixes for errors, explain complex functions, and even help onboard new team members by answering questions about the architecture.</p>
          </RealWorldSpotlight>  
        </div>
      </Accordion>

      <Accordion title="Controlling Creativity: Temperature & Top-P" icon={<SlidersHorizontal />}>
        <p className="text-gray-300 mb-4">
          When you use a GPT, you can often tweak parameters to control its output. These act like creative controls, balancing between predictable, factual answers and novel, diverse ideas. Play with the sliders below to see how they work.
        </p>
        <ParameterSliders />
      </Accordion>

      <Accordion title="Training Deep Dive: GPTs vs. Fine-Tuning" icon={<Zap />}>
        <p className="text-gray-300 mb-4">
          How a model learns can be broken into two main approaches. Creating a <strong>Custom GPT</strong> is about adding knowledge and skills on top of an existing model. <strong>Fine-Tuning</strong> is about fundamentally changing the model's internal wiring. 
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <ComparisonCard 
            icon={<Rocket className="w-8 h-8 text-blue-300" />} 
            title="Custom GPT (using RAG)"
            bgColorClass="bg-blue-900/50"
            points={[
              "<strong>Method:</strong> Adds knowledge externally (like an open-book exam).",
              "<strong>Cost:</strong> Cheap and fast.",
              "<strong>Use Case:</strong> Answering questions about specific documents (e.g., a support bot for your product)."
            ]}
          />
          <ComparisonCard 
            icon={<BrainCircuit className="w-8 h-8 text-green-300" />} 
            title="Fine-Tuned Model"
            bgColorClass="bg-green-900/50"
            points={[
              "<strong>Method:</strong> Retrains the model's internal weights (like studying for a closed-book exam).",
              "<strong>Cost:</strong> Expensive and slow.",
              "<strong>Use Case:</strong> Teaching the model a new, consistent style or format (e.g., always respond in haikus)."
            ]}
          />
        </div>
      </Accordion>

      <DidYouKnow>
        70% of enterprises are now actively exploring or using Retrieval-Augmented Generation (RAG) to power their internal knowledge bases and customer support bots.
      </DidYouKnow>

      <Accordion title="Exercise: Design a 'Meeting Master' GPT" icon={<Lightbulb />}>
        <p className="text-gray-300 mb-4">
          Let's design the 'Meeting Master' GPT. Its goal is to take raw meeting notes and produce a structured summary. Try editing the prompt below to refine its instructions, then get instant feedback from a simulated AI peer.
        </p>
        <InteractivePromptExercise 
          initialPrompt={`You are 'Meeting Master', a helpful assistant. Your task is to take raw meeting notes and generate a structured summary.\n\nYour output MUST include:\n1. A meeting title.\n2. A list of attendees.\n3. A bulleted list of key discussion points.\n4. A table of action items with assigned owners and due dates.\n\nThe final output must be in Markdown format.`}
          aiFeedback={{
            suggestion: "Consider adding instructions for edge cases. For example, what should the GPT do if no action items are mentioned or if a due date is missing?",
            reasoning: "Explicitly handling edge cases makes your GPT more robust and reliable. It prevents unexpected or unhelpful outputs when the input data isn't perfect."
          }}
        />
      </Accordion>

      <Accordion title="Pro Tips for Power Users" icon={<Star />}>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-white mb-2">1. Travel Planning Orchestra</h4>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <h5 className="font-semibold text-blue-400 mb-2">Example: Your AI Travel Concierge</h5>
              <p className="text-gray-400 mb-2"><strong>User Prompt:</strong> "Plan a magical weekend in New York City"</p>
              <p className="text-gray-300 mb-3 text-sm">Think of this like having a personal travel concierge who coordinates an entire orchestra of services:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300"><code className="text-blue-300">search_flights</code> - Like your flight expert finding the perfect route</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300"><code className="text-green-300">get_weather</code> - Your weather advisor ensuring you pack appropriately</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-300"><code className="text-purple-300">search_hotels</code> - Your accommodation specialist finding the ideal location</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-300"><code className="text-orange-300">book_hotel</code> - Your booking agent securing your perfect stay</span>
                </div>
              </div>
              <p className="text-gray-400 mt-3 text-sm italic">Each tool passes information to the next like a relay race, creating a seamless experience from dream to reality.</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-2">2. Executive Assistant Workflow</h4>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <h5 className="font-semibold text-blue-400 mb-2">Example: Your AI Executive Assistant</h5>
              <p className="text-gray-400 mb-2"><strong>User Prompt:</strong> "Process today's meeting and schedule follow-ups"</p>
              <p className="text-gray-300 mb-3 text-sm">Imagine having a hyper-efficient executive assistant who never misses a detail:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300"><code className="text-blue-300">read_meeting_notes</code> - Your note-taker who captures every important decision</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300"><code className="text-green-300">create_calendar_events</code> - Your scheduler who turns decisions into scheduled actions</span>
                </div>
              </div>
              <p className="text-gray-400 mt-3 text-sm italic">Like a skilled assistant who reads your notes and immediately turns them into your calendar, ensuring nothing falls through the cracks.</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-2">3. Building Your AI's Memory Palace</h4>
            <p className="text-gray-300 mb-4">
              For knowledge-heavy GPTs, think of document preparation like creating a memory palace for your AI assistant. Instead of dumping all books in a pile, you're building a sophisticated filing system where each piece of information has a specific address and context.
            </p>
            <p className="text-gray-300 mb-3">
              <strong>Practical analogy:</strong> Imagine you're helping a brilliant but forgetful librarian. Instead of giving them a pile of books, you create:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-300 mb-3 text-sm">
              <li>Clearly labeled sections (like "Travel Tips 2024")</li>
              <li>Executive summaries for quick reference</li>
              <li>Cross-references between related topics</li>
              <li>Context clues that help the AI understand relationships</li>
            </ul>
            <RagChunkingDiagram />
          </div>
        </div>
      </Accordion>

      <Accordion title="A Developer's Guide to Responsible AI" icon={<ShieldCheck />}>
        <div className="text-gray-300 mb-4">
          Like any powerful tool, AI assistants need careful handling and ethical guidelines. Think of responsible AI development like being a master chef who ensures every dish is not only delicious but also safe and nutritious for every diner.
        </div>
        <p className="text-gray-300 mb-4">
          <strong>Your AI Creation Checklist:</strong> Think of building a GPT like creating a custom superhero. Instead of a generic hero with basic powers, you're crafting a specialist with:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-300 mb-4">
          <li><strong>Origin Story (Instructions):</strong> A unique personality and mission that guides every action - like giving your AI a moral compass</li>
          <li><strong>Superpowers (Knowledge):</strong> Access to specialized information and databases beyond basic training - ensuring your AI has accurate, up-to-date knowledge</li>
          <li><strong>Utility Belt (Tools):</strong> Specific gadgets and abilities to accomplish complex tasks - but with safety locks and ethical guidelines</li>
        </ul>
        <p className="text-gray-300 mb-4">
          <strong>Real-World Application:</strong> These three elements combine to create your perfect AI sidekick, ready for any mission, but always operating within ethical boundaries.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 mt-4">
          <h5 className="font-semibold text-blue-400 mb-2">Ethical AI Development Framework</h5>
          <ul className="list-disc pl-5 space-y-1 text-gray-300 text-sm">
            <li><strong>Transparency:</strong> Always disclose when users are interacting with AI</li>
            <li><strong>Privacy:</strong> Handle user data with the care of a trusted confidant</li>
            <li><strong>Fairness:</strong> Ensure your AI serves all users equitably</li>
            <li><strong>Accountability:</strong> Build systems that can explain their decisions</li>
            <li><strong>Safety:</strong> Create fail-safes that prevent harmful outputs</li>
          </ul>
        </div>
      </Accordion>

      <Accordion title="Further Reading & Resources" icon={<BookOpen />}>
        <ul className="list-disc pl-5 space-y-2 text-blue-300">
          <li><a href="#" className="hover:underline">Official OpenAI Documentation on GPTs</a></li>
          <li><a href="#" className="hover:underline">Best Practices for Retrieval-Augmented Generation (RAG)</a></li>
          <li><a href="#" className="hover:underline">Building a GPT from Scratch: A Video Tutorial</a></li>
        </ul>
      </Accordion>

      {/* Validation Quiz */}
      <section className="mt-8">
        <ModuleQuizzes questions={quizQuestions} />
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-4/4.3" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Building Custom Tools
        </Link>
        <Link 
          to="/instructions/module-4/4.5" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: AI Agents <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson4_4;
