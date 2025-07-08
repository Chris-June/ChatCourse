import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BarChart2, Beaker, RefreshCw } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';

const Lesson6_3: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">6.3: Iterative Improvement</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-6/6.2" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-7/7.1" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Module <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Building an AI product isn't a one-time event; it's a continuous cycle of learning and refinement. Iterative improvement is the process of using data and user feedback to make your product better over time.
      </p>

      {/* Core Concepts */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">The Cycle of AI Improvement</h2>
        <p className="text-gray-300 mb-6">Great AI products evolve. The key is a tight feedback loop: measure what matters, test your assumptions, and learn from the results.</p>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-white flex items-center"><BarChart2 className="w-6 h-6 mr-2 text-green-400" />1. Measure What Matters</h3>
            <p className="text-gray-400 mt-2">Don't just track clicks. For AI products, focus on metrics that signal quality and trust. First, define your product's "golden path"—the ideal journey for a user. Then, measure things like:</p>
            <ul className="list-disc pl-5 mt-2 text-gray-300 space-y-1">
              <li><strong>Correction Rate:</strong> How often do users have to edit the AI's output? A high rate might signal prompt or model issues.</li>
              <li><strong>Tool Adoption:</strong> If your AI uses tools, which ones are users adopting? Which are being ignored?</li>
              <li><strong>User Satisfaction:</strong> A simple thumbs up/down on an AI response is a powerful signal.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white flex items-center"><Beaker className="w-6 h-6 mr-2 text-yellow-400" />2. A/B Test Your Prompts</h3>
            <p className="text-gray-400 mt-2">The easiest thing to change in an AI product is the prompt. Use A/B testing to see which prompts yield better results against your key metrics.</p>
            <p className="text-gray-400 mt-2"><strong>Example Test:</strong> For an email-writing AI, you could test Prompt A: "Write a professional email" vs. Prompt B: "Write a polite but firm follow-up email."</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white flex items-center"><RefreshCw className="w-6 h-6 mr-2 text-cyan-400" />3. Learn and Adapt</h3>
            <p className="text-gray-400 mt-2">Use the data from your measurements and tests to make decisions. If users constantly correct the AI's tone, maybe your prompt needs to be more specific. If a feature isn't being used, maybe it's not as useful as you thought. This data is your guide to what to build or refine next.</p>
          </div>
        </div>
      </section>

      {/* Improvement Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Beaker className="w-7 h-7 mr-3 text-yellow-400" />
          Exercise: Form an Improvement Hypothesis
        </h2>
        <p className="text-gray-300 mb-4">
          A good experiment starts with a clear hypothesis. Let's practice writing one for an AI feature that summarizes articles.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Your Task:</h3>
          <p className="text-gray-400 mb-3 text-sm">Copy the template below and fill it out. The goal is to create a testable hypothesis for improving the article summarizer.</p>
          <div className="relative p-3 bg-gray-700 rounded-md font-mono text-xs text-gray-200 whitespace-pre-wrap">
            <CopyButton textToCopy={`**Hypothesis:**\nIf we change the summary prompt to be more action-oriented, we will increase the 'summary helpfulness' rating because users want actionable takeaways, not just a wall of text.\n\n**Metric to Improve:**\n- User Satisfaction (Thumbs Up/Down %)\n\n**A/B Test:**\n- **Group A (Control):** 'Summarize this article.'\n- **Group B (Variant):** 'Summarize this article and extract three actionable insights for a busy professional.'`} />
            <p className="text-white">
              <strong>Hypothesis:</strong><br/>If we change the summary prompt to be more action-oriented, we will increase the 'summary helpfulness' rating because users want actionable takeaways, not just a wall of text.<br/><br/>
              <strong>Metric to Improve:</strong><br/>- User Satisfaction (Thumbs Up/Down %)<br/><br/>
              <strong>A/B Test:</strong><br/>- <strong>Group A (Control):</strong> 'Summarize this article.'<br/>- <strong>Group B (Variant):</strong> 'Summarize this article and extract three actionable insights for a busy professional.'
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-6/6.2" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Design Thinking with AI
        </Link>
        <Link 
          to="/instructions/module-7/7.1" 
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next Module <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson6_3;
