import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Scale, ShieldCheck, Lightbulb } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';

const Lesson8_1: React.FC = () => {
  const { completeLesson } = useProgressStore();
  const ethicsReviewerPrompt = `You are an AI Ethics and Fairness expert. Your task is to review a user's proposed strategy for mitigating bias in an AI-powered resume screening tool.

**Case Study Context:** An AI tool was built to screen resumes for a software engineering role, trained on the company's hiring data from the last 10 years. The data shows a historical pattern of hiring predominantly from specific universities and demographic groups, leading the AI to unfairly penalize qualified candidates from underrepresented backgrounds.

When a user submits their mitigation strategy, follow these steps:
1.  **Acknowledge and Validate**: Briefly acknowledge their submission.
2.  **Analyze their Strategy**: Evaluate their plan against key fairness principles. Did they correctly identify the bias (e.g., historical, representation)? Are their proposed solutions (e.g., data auditing, re-weighting, fairness metrics) relevant and effective?
3.  **Provide Specific Feedback**: Offer 2-3 clear, constructive bullet points. For example, 'Your suggestion to audit the data is a great first step, but consider also implementing a fairness metric like demographic parity to continuously monitor the model's performance post-deployment.'
4.  **Suggest a Gold-Standard Example**: Provide a concise, expert-level mitigation strategy for comparison. Example: 'A robust strategy would involve: 1) Augmenting the training data with diverse, synthetic resumes. 2) Implementing adversarial debiasing to prevent the model from learning proxies for protected attributes. 3) Auditing the model's decisions for equal opportunity across demographic groups before and after deployment.'
5.  **Encourage**: End with a positive, encouraging statement about the importance of building fair AI.`;

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">8.1: Bias and Fairness</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-7/7.3" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/module-8/8.2" 
            onClick={() => completeLesson(8, 1)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Lesson <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        AI models learn from data. If that data reflects existing societal biases, the model will learn and even amplify them. Ensuring fairness is not just a technical challenge but an ethical imperative for building responsible AI.
      </p>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center"><Scale className="w-7 h-7 mr-3" />Sources of Bias in AI</h2>
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-lg text-white">Historical Bias</h4>
            <p className="text-gray-400">Occurs when the data used for training reflects past prejudices, even if the world has changed. For example, an AI trained on historical hiring data might learn to favor male candidates for engineering roles.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white">Representation Bias</h4>
            <p className="text-gray-400">Happens when the training data under-represents certain groups. A facial recognition system trained primarily on light-skinned faces will perform poorly on dark-skinned faces.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white">Measurement Bias</h4>
            <p className="text-gray-400">Arises from faulty data collection or measurement. If a camera sensor overexposes images of people with darker skin, an AI might misinterpret their features due to poor data quality.</p>
          </div>
        </div>
      </section>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center"><ShieldCheck className="w-7 h-7 mr-3" />Strategies for Mitigation</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li><strong>Data Auditing:</strong> Carefully analyze your training data for skews and imbalances. Use tools to measure representation across different demographic groups.</li>
          <li><strong>Fairness Metrics:</strong> Implement metrics like 'demographic parity' or 'equal opportunity' to evaluate if your model performs equally well across different user groups.</li>
          <li><strong>Inclusive Design:</strong> Involve diverse teams and stakeholders in the design process to identify potential blind spots and challenge assumptions early on.</li>
          <li><strong>Adversarial Debiasing:</strong> Train a second model to predict the sensitive attribute (e.g., gender, race) from the first model's predictions. The primary model is then penalized for being 'too predictable,' forcing it to learn less biased representations.</li>
        </ul>
      </section>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Case Study: Mitigating Bias in a Hiring AI
        </h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 space-y-4">
          <div>
            <h3 className="font-semibold text-white">The Scenario</h3>
            <p className="text-gray-300">An AI tool was built to screen resumes for a software engineering role, trained on your company's hiring data from the last 10 years. The data reflects a historical pattern of hiring predominantly from specific universities and demographic groups. As a result, the AI is unfairly penalizing qualified candidates from underrepresented backgrounds.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Your Task</h3>
            <p className="text-gray-300">Propose a comprehensive strategy to mitigate the bias in this system. Describe the steps you would take to identify, measure, and reduce the unfair impact on candidates. Use the chat window below to submit your strategy and receive expert feedback.</p>
          </div>
          <InlineChat 
            placeholder="Describe your bias mitigation strategy here..."
            systemPrompt={ethicsReviewerPrompt}
          />
        </div>
      </section>

      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-7/7.3" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Fine-Tuning Models
        </Link>
        <Link 
          to="/instructions/module-8/8.2" 
          onClick={() => completeLesson(8, 1)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Transparency and Explainability <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson8_1;
