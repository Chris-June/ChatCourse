import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Eye, MessageSquareQuote, Lightbulb } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';

const Lesson8_2: React.FC = () => {
  const { completeLesson } = useProgressStore();
  const explainabilityExpertPrompt = `You are an AI Explainability and User Experience (UX) expert. Your task is to review a user-submitted explanation for a sensitive AI decision.

**Case Study Context:** An AI-powered system has just denied a loan application. The model's internal reasons are: 'low_credit_score' and 'high_debt_to_income_ratio'. The user needs to write a customer-facing message that explains this decision clearly and empathetically.

When a user submits their explanation, follow these steps:
1.  **Acknowledge and Validate**: Briefly acknowledge their explanation.
2.  **Analyze their Explanation**: Evaluate their message based on three key principles: 
    *   **Clarity**: Is the language simple and free of jargon? 
    *   **Empathy**: Does it acknowledge the user's disappointment?
    *   **Actionability**: Does it provide clear next steps?
3.  **Provide Specific Feedback**: Offer 2-3 clear, constructive bullet points. For example, 'Your explanation is clear, but it could be more empathetic by acknowledging the user's perspective. Also, consider adding a link to a resource that explains how credit scores are calculated.'
4.  **Suggest a Gold-Standard Example**: Provide a concise, expert-level explanation for comparison. Example: 'We understand this isn't the news you were hoping for. After reviewing your application, we couldn't approve your loan at this time because the information provided didn't meet our current lending requirements, which include credit history and debt-to-income ratio. We encourage you to review your credit report for any inaccuracies and you are welcome to re-apply in the future.'
5.  **Encourage**: End with a positive, encouraging statement about the importance of building trust through transparency.`;

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">8.2: Transparency and Explainability</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-8/8.1" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-8/8.3" 
            onClick={() => completeLesson(8, 2)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        For users to trust an AI system, they need to understand its decisions. Transparency (what the system did) and Explainability (why it did it) are the cornerstones of building that trust, especially when the stakes are high.
      </p>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Key Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg">
            <Eye className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
            <h4 className="font-bold text-lg text-white text-center">Transparency</h4>
            <p className="text-sm text-gray-400 mt-2">This is about exposing the process. For a RAG system, transparency means showing the user which documents were retrieved to generate an answer. For a tool-using agent, it means showing which tools were called and with what parameters.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <MessageSquareQuote className="w-8 h-8 mx-auto mb-3 text-purple-400" />
            <h4 className="font-bold text-lg text-white text-center">Explainability (XAI)</h4>
            <p className="text-sm text-gray-400 mt-2">This is about explaining the 'why'. Why did a model classify an email as spam? Techniques like LIME (Local Interpretable Model-agnostic Explanations) and SHAP (SHapley Additive exPlanations) help identify which features (e.g., specific words) most influenced a model's decision.</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Practical Techniques for Transparency</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li><strong>Show Confidence Scores:</strong> When a model makes a classification, display its confidence level (e.g., "I'm 95% sure this is a cat"). This helps users gauge the reliability of the output.</li>
          <li><strong>Cite Sources:</strong> In RAG applications, always provide links or references to the source documents used. This allows users to verify the information for themselves.</li>
          <li><strong>Visualize Decisions:</strong> For image-based models, use heatmaps to show which parts of an image were most influential in a decision.</li>
          <li><strong>Expose the Agent's 'Thoughts':</strong> For complex agents, log the step-by-step reasoning process, including which tools were considered, chosen, and what their outputs were.</li>
        </ul>
      </section>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Case Study: Explaining an AI's Decision
        </h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 space-y-4">
          <div>
            <h3 className="font-semibold text-white">The Scenario</h3>
            <p className="text-gray-300">An AI-powered system has just denied a loan application. The model's internal reasons are a low credit score and a high debt-to-income ratio. Your goal is to communicate this sensitive decision to the user in a way that is clear, empathetic, and actionable.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Your Task</h3>
            <p className="text-gray-300">Write a customer-facing message that explains the AI's decision. Focus on building trust by being transparent without being overly technical. Use the chat window below to submit your explanation and receive expert feedback.</p>
          </div>
          <InlineChat 
            moduleId="module-8.2-ai-explanation"
            maxAttempts={10}
            placeholder="Write your user-facing explanation here..."
            systemPrompt={explainabilityExpertPrompt}
          />
        </div>
      </section>

      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-8/8.1" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Bias and Fairness
        </Link>
        <Link 
          to="/instructions/module-8/8.3" 
          onClick={() => completeLesson(8, 2)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Security and Privacy <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson8_2;
