import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BrainCircuit, Building, GraduationCap, HeartHandshake } from 'lucide-react';


import CopyButton from '../../../../../components/CopyButton';

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
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

            <div className="bg-gray-800 p-4 rounded-lg shadow-inner mb-6">
        <p className="text-gray-300">
          In the last lesson, we built a custom tool from scratch. Now, let's explore <strong>GPTs</strong>—a powerful way to package our tools, knowledge, and instructions into a shareable, specialized AI assistant.
        </p>
      </div>

      <p className="text-lg text-gray-300">
        GPTs are custom versions of ChatGPT that you can create for a specific purpose. They combine a base model's power with your unique instructions, extra knowledge, and—most importantly—the ability to call custom tools and APIs.
      </p>

      {/* Core Concepts */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">What Makes a GPT?</h2>
        <p className="text-gray-300 mb-4">
          A GPT combines a powerful base model (like GPT-4) with three key ingredients:
        </p>
                <div className="space-y-4">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white">1. Custom Instructions</h3>
            <p className="text-gray-400">This is the GPT's 'constitution.' It's a detailed prompt defining its persona, goals, and constraints. For example: `You are a helpful assistant who speaks only in pirate slang.`</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white">2. Expanded Knowledge</h3>
            <p className="text-gray-400">You can upload files (like PDFs or text documents) to give the GPT specific expertise. This uses a technique called Retrieval-Augmented Generation (RAG), where the AI retrieves relevant information from your documents to answer questions.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="font-semibold text-white">3. Custom Actions (Tools)</h3>
            <p className="text-gray-400 mb-2">This is where our previous lessons come together. You can give a GPT the ability to use external tools by providing an OpenAPI schema. This is just a standardized way of writing the tool schemas we learned about in lesson 4.3.</p>
            <pre className="p-3 bg-gray-700 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap">
              <code>
{`// Example OpenAPI schema for our 'create_ticket' tool
{
  "openapi": "3.1.0",
  "info": {
    "title": "Support Ticket API",
    "version": "v1.0.0"
  },
  "paths": {
    "/create_ticket": {
      "post": {
        "description": "Creates a new support ticket.",
        "operationId": "createTicket",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/createTicketPayload"
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "createTicketPayload": {
        "type": "object",
        "properties": {
          "title": { "type": "string" },
          "description": { "type": "string" }
        }
      }
    }
  }
}`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Use Cases Across Different Domains</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Use Case */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <BrainCircuit className="w-8 h-8 mr-3 text-green-400" />
              <h4 className="font-bold text-lg text-white">Personal Productivity</h4>
            </div>
            <p className="text-sm text-gray-400">A 'Meeting Master' GPT that can take your raw meeting notes, identify action items, and draft follow-up emails in your personal style.</p>
          </div>

          {/* Business Use Case */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Building className="w-8 h-8 mr-3 text-yellow-400" />
              <h4 className="font-bold text-lg text-white">Business Operations</h4>
            </div>
            <p className="text-sm text-gray-400">A 'Support Sentinel' GPT trained on company documentation to provide instant, accurate answers to customer support queries, reducing response times.</p>
          </div>

          {/* Education Use Case */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <GraduationCap className="w-8 h-8 mr-3 text-cyan-400" />
              <h4 className="font-bold text-lg text-white">Education</h4>
            </div>
            <p className="text-sm text-gray-400">A 'History Helper' GPT that acts as a specific historical figure, allowing students to ask questions and receive answers in character, making learning more interactive.</p>
          </div>

          {/* Social Improvement Use Case */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <HeartHandshake className="w-8 h-8 mr-3 text-pink-400" />
              <h4 className="font-bold text-lg text-white">Social Improvement</h4>
            </div>
            <p className="text-sm text-gray-400">A 'Grant Writer' GPT trained on successful grant proposals to help non-profits draft compelling applications for funding, leveling the playing field for smaller organizations.</p>
          </div>
        </div>
      </section>

      {/* When to Use GPTs */}
            {/* GPTs vs. Fine-Tuning */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">GPTs vs. Fine-Tuning</h2>
        <p className="text-gray-300 mb-4">
          Creating a GPT is different from fine-tuning a model. GPTs are easier and faster to create, relying on prompting and RAG. Fine-tuning involves retraining the model's weights, which is more complex and expensive.
        </p>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-600 p-2 text-white">Feature</th>
              <th className="border-b-2 border-gray-600 p-2 text-white">Custom GPT</th>
              <th className="border-b-2 border-gray-600 p-2 text-white">Fine-Tuned Model</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-gray-700 p-2">Method</td>
              <td className="border-b border-gray-700 p-2">Prompting, RAG</td>
              <td className="border-b border-gray-700 p-2">Retraining model weights</td>
            </tr>
            <tr>
              <td className="border-b border-gray-700 p-2">Complexity</td>
              <td className="border-b border-gray-700 p-2">Low (No code needed for basic GPTs)</td>
              <td className="border-b border-gray-700 p-2">High (Requires data prep & training)</td>
            </tr>
            <tr>
              <td className="p-2">Best For</td>
              <td className="p-2">Specific tasks, workflows, and knowledge bases</td>
              <td className="p-2">Teaching the model a new style, tone, or format</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Exercise: Design a GPT</h2>
        <p className="text-gray-300 mb-4">
          Let's design the 'Meeting Master' GPT mentioned earlier. Its goal is to take raw meeting notes and produce a structured summary.
        </p>
        <p className="text-gray-300 mb-2">In the chat, write the <strong>Custom Instructions</strong> for this GPT. Think about its persona, what it should do, and what output format it should follow. Here's a prompt to get you started:</p>
        <div className="relative mt-2">
          <CopyButton textToCopy={'Write the custom instructions for a GPT called Meeting Master. It should always identify the meeting topic, list attendees, summarize key discussion points, and extract action items with assigned owners. The final output must be in Markdown format.'} />
          <pre className="p-3 bg-gray-700 rounded-md font-mono text-sm text-gray-200 whitespace-pre-wrap pr-10">
            <code>
Write the custom instructions for a GPT called Meeting Master. It should always identify the meeting topic, list attendees, summarize key discussion points, and extract action items with assigned owners. The final output must be in Markdown format.
            </code>
          </pre>
        </div>
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
