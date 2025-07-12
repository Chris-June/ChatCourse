import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Lightbulb, Zap, GitMerge } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';

const Lesson7_1: React.FC = () => {
  const { completeLesson } = useProgressStore();
  const toolReviewerPrompt = `You are an expert AI Tool Design Reviewer. Your task is to analyze a user's proposed tool suite design for a calendar assistant and provide feedback based on the principles of composability and clarity.

When a user submits their tool designs, follow these steps:
1.  **Acknowledge and Analyze**: Briefly acknowledge their submission.
2.  **Provide a Corrected Version**: Offer a refined version of their tool suite that follows best practices. Ensure each tool has a single, clear responsibility. Use the following as a gold standard example:
    - **Tool: Create Event**: 'create_calendar_event'. Description: Creates a new event. Params: title, date, time, duration, attendees.
    - **Tool: Find Availability**: 'find_available_time_slots'. Description: Finds open time slots. Params: date, duration.
    - **Tool: List Events**: 'list_upcoming_events'. Description: Lists events for a period. Params: start_date, end_date.
3.  **Give Specific Feedback**: Provide 2-3 bullet points of constructive feedback. Focus on whether their tools are composable (small and focused) vs. monolithic (large and complex).
4.  **Encourage**: End with an encouraging closing statement.`;

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">7.1: Function Calling & Tool Use</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-6/6.3" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-7/7.2" 
            onClick={() => completeLesson(7, 1)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        While we've introduced function calling, this lesson dives into advanced patterns that unlock more complex and efficient applications. Mastering these techniques is key to building sophisticated, reliable AI systems that can execute multi-step tasks.
      </p>

      {/* How it Works */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Advanced Tool Use Patterns</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-white flex items-center"><Zap className="w-6 h-6 mr-2 text-yellow-400" />Parallel Function Calling</h3>
            <p className="text-gray-400 mt-2">Modern LLMs can call multiple functions in a single turn. If a user asks, "What's the weather in SF and what's the forecast for NYC?", the model can request both tools at once, allowing your application to execute them in parallel. This significantly reduces latency.</p>
            <p className="text-gray-400 mt-2">The model's response would contain a list of tool calls, which your code would then iterate through and execute.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white flex items-center"><GitMerge className="w-6 h-6 mr-2 text-cyan-400" />Tool Design: Composable vs. Monolithic</h3>
            <p className="text-gray-400 mt-2">You often face a design choice: create one large, complex tool or several small, focused ones. For a calendar agent, instead of one 'manage_calendar' tool with many options, it's often better to create smaller, composable tools like 'create_event', 'find_availability', and 'list_upcoming_events'. This makes the model's reasoning simpler and more reliable.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white flex items-center"><Lightbulb className="w-6 h-6 mr-2 text-purple-400" />Forced Tool Use</h3>
            <p className="text-gray-400 mt-2">In some cases, you want to guarantee that a specific tool is used. Most APIs allow you to force a tool call. For example, in an app that lets users add items to a shopping cart, you can force the 'add_to_cart' function call. This ensures the user's request is always translated into the correct action, making your app more predictable.</p>
          </div>
        </div>
      </section>

      {/* Conceptual Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Exercise: Design a Tool Suite
        </h2>
        <p className="text-gray-300 mb-4">
          Let's apply the concept of composable tools. Your task is to design a suite of tools for an AI calendar assistant. Think about the different, specific actions a user might want to take.
        </p>

        {/* E-commerce Example */}
        <div className="mb-6 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Example: E-commerce Tools</h3>
          <p className="text-gray-400 mb-3 text-sm">Here is an example of a well-designed, composable tool suite for an e-commerce assistant:</p>
          <div className="relative p-3 bg-gray-700 rounded-md font-mono text-xs text-gray-200 whitespace-pre-wrap">
            <CopyButton textToCopy={`**Tool 1: Search Products**\n- name: search_products\n- description: Searches for products by keyword. Parameters: query, category.\n\n**Tool 2: Get Product Details**\n- name: get_product_details\n- description: Retrieves details for a specific product ID. Parameters: product_id.\n\n**Tool 3: Add to Cart**\n- name: add_item_to_cart\n- description: Adds a specified quantity of a product to the user's cart. Parameters: product_id, quantity.`} />
            <p className="text-white">
              <strong>Tool 1: Search Products</strong><br/>
              - name: `search_products`<br/>
              - description: Searches for products by keyword. Parameters: query, category.<br/><br/>
              <strong>Tool 2: Get Product Details</strong><br/>
              - name: `get_product_details`<br/>
              - description: Retrieves details for a specific product ID. Parameters: product_id.<br/><br/>
              <strong>Tool 3: Add to Cart</strong><br/>
              - name: `add_item_to_cart`<br/>
              - description: Adds a specified quantity of a product to the user's cart. Parameters: product_id, quantity.
            </p>
          </div>
        </div>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Your Task:</h3>
          <p className="text-gray-400 mb-3 text-sm">Define the function name and a brief description for at least three separate, composable tools for a calendar agent. Use the chat window below to submit your design and get feedback.</p>
          <InlineChat 
            placeholder="Paste your tool designs here. For example: 'Tool 1: name: ..., description: ...'"
            systemPrompt={toolReviewerPrompt}
          />
        </div>
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