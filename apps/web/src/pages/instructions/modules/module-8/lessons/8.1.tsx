import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Scale, ShieldCheck, Lightbulb } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';

const Lesson8_1: React.FC = () => {
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
          Exercise: Identify Potential Bias
        </h2>
        <p className="text-gray-300 mb-4">
          Imagine you are building an AI to screen resumes for a software engineering job. The AI is trained on your company's hiring data from the last 10 years.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Your Task:</h3>
          <p className="text-gray-400 mb-3 text-sm">Identify at least two potential sources of bias in this system and suggest a mitigation strategy for each. Use the template below to structure your answer.</p>
          <div className="relative p-3 bg-gray-700 rounded-md font-mono text-xs text-gray-200 whitespace-pre-wrap">
            <CopyButton textToCopy={`**1. Potential Bias:**\n- Source: [e.g., Historical Bias]\n- Description: ...\n- Mitigation: ...\n\n**2. Potential Bias:**\n- Source: [e.g., Representation Bias]\n- Description: ...\n- Mitigation: ...`} />
            <p className="text-white">
              <strong>1. Potential Bias:</strong><br/>
              - Source: [e.g., Historical Bias]<br/>
              - Description: ...<br/>
              - Mitigation: ...<br/><br/>
              <strong>2. Potential Bias:</strong><br/>
              - Source: [e.g., Representation Bias]<br/>
              - Description: ...<br/>
              - Mitigation: ...
            </p>
          </div>
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
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Transparency and Explainability <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson8_1;
