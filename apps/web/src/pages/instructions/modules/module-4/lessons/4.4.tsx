import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BrainCircuit, Rocket, Lightbulb, BookOpen, Star, Zap, GraduationCap, Layers, SlidersHorizontal, ShieldCheck } from 'lucide-react';

import Accordion from '../../../components/Accordion';
import ComparisonCard from '../../../components/ComparisonCard';
import RealWorldSpotlight from '../../../components/RealWorldSpotlight';
import DidYouKnow from '../../../components/DidYouKnow';
import GlossaryTerm from '../../../components/GlossaryTerm';
import GptPipelineDiagram from '../../../components/GptPipelineDiagram';
import CheckpointQuiz from '../../../components/CheckpointQuiz';
import TransformerArchitectureDiagram from '../../../components/TransformerArchitectureDiagram';
import ParameterSliders from '../../../components/ParameterSliders';
import ResponsibleAI from '../../../components/ResponsibleAI';
import InteractivePromptExercise from '../../../components/InteractivePromptExercise';
import RagChunkingDiagram from '../../../components/RagChunkingDiagram';

const Lesson4_4: React.FC = () => {
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
            icon={<Zap className="w-6 h-6" />} 
            title="Support Sentinel GPT"
            description="A support team slashed response times by 50% with a GPT that can instantly look up customer history, analyze support tickets, and draft replies using company-approved language."
          />
          <RealWorldSpotlight 
            icon={<GraduationCap className="w-6 h-6" />} 
            title="History Helper GPT"
            description="A teacher created a GPT for their class, uploading the course textbook and primary source documents. Students can now ask the GPT complex questions and get answers grounded in their specific curriculum."
          />
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
            <h4 className="font-semibold text-white mb-2">1. Tool Chaining</h4>
            <p className="text-gray-300 mb-3">A single user prompt can trigger a sequence of multiple tool calls. The AI decides the order based on dependencies.</p>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <h5 className="font-semibold text-blue-400 mb-2">Example: Trip Planning</h5>
              <p className="text-gray-400 mb-2"><strong>User Prompt:</strong> "Book a flight to New York and find a hotel near Central Park for next weekend."</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">Tool 1: <code className="text-blue-300">search_flights</code> - Finds flights NYC for specified dates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">Tool 2: <code className="text-green-300">book_flight</code> - Books the selected flight</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-300">Tool 3: <code className="text-purple-300">search_hotels</code> - Finds hotels near Central Park</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-300">Tool 4: <code className="text-orange-300">book_hotel</code> - Books the selected hotel</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-2">2. Real-World Chains</h4>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <h5 className="font-semibold text-blue-400 mb-2">Example: Meeting Summary + Calendar</h5>
              <p className="text-gray-400 mb-2"><strong>User Prompt:</strong> "Summarize today's meeting and add the action items to my calendar."</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">Tool 1: <code className="text-blue-300">read_meeting_notes</code> - Extracts key points</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">Tool 2: <code className="text-green-300">create_calendar_events</code> - Adds action items</span>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-2">3. Optimizing RAG</h4>
            <p className="text-gray-300 mb-4">For knowledge-heavy GPTs, pre-process your documents. Break large PDFs into smaller, clearly-labeled chunks to improve the AI's retrieval accuracy.</p>
            <RagChunkingDiagram />
          </div>
        </div>
      </Accordion>

      <Accordion title="A Developer's Guide to Responsible AI" icon={<ShieldCheck />}>
        <div className="text-gray-300 mb-4">
          With great power comes great responsibility. Building with LLMs requires an awareness of their limitations and potential for harm. Keeping these points in mind is crucial for creating safe, fair, and reliable applications.
        </div>
        <ResponsibleAI />
      </Accordion>

      <Accordion title="Further Reading & Resources" icon={<BookOpen />}>
        <ul className="list-disc pl-5 space-y-2 text-blue-300">
          <li><a href="#" className="hover:underline">Official OpenAI Documentation on GPTs</a></li>
          <li><a href="#" className="hover:underline">Best Practices for Retrieval-Augmented Generation (RAG)</a></li>
          <li><a href="#" className="hover:underline">Building a GPT from Scratch: A Video Tutorial</a></li>
        </ul>
      </Accordion>

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
