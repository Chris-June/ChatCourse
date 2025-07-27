import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Scale, ShieldCheck, Lightbulb } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

const Lesson8_1: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'An AI model trained on 10 years of hiring data from a company that historically hired men for engineering roles is most likely to suffer from which type of bias?',
      options: [
        'Measurement Bias',
        'Representation Bias',
        'Historical Bias',
        'No bias at all'
      ],
      correctAnswer: 'Historical Bias',
      explanation: 'Historical bias occurs when the data reflects past prejudices or societal imbalances, even if the world has changed. The model learns and perpetuates these old patterns.'
    },
    {
      questionText: 'What is the main problem with \'Representation Bias\'?',
      options: [
        'The model represents the data too perfectly.',
        'The training data under-represents certain groups, leading to poor performance for those groups.',
        'The data is measured incorrectly.',
        'The model is too large.'
      ],
      correctAnswer: 'The training data under-represents certain groups, leading to poor performance for those groups.',
      explanation: 'If a group is not well-represented in the training data, the model will not learn its features effectively and will fail to perform accurately for that group.'
    },
    {
      questionText: 'Which of the following is a proactive strategy to mitigate AI bias?',
      options: [
        'Hoping the model figures it out on its own.',
        'Auditing the training data for skews and implementing fairness metrics to monitor performance.',
        'Using a smaller dataset.',
        'Ignoring user complaints about fairness.'
      ],
      correctAnswer: 'Auditing the training data for skews and implementing fairness metrics to monitor performance.',
      explanation: 'Responsible AI development requires proactive, intentional steps. Auditing data and monitoring with fairness metrics are key strategies to identify and reduce bias.'
    },
    {
      questionText: 'The goal of \'Adversarial Debiasing\' is to...',
      options: [
        'Make the model more biased.',
        'Make the model worse at its primary task.',
        'Train the model to be unable to predict a sensitive attribute (like gender or race), forcing it to learn less biased representations.',
        'Make the model an adversary to the user.'
      ],
      correctAnswer: 'Train the model to be unable to predict a sensitive attribute (like gender or race), forcing it to learn less biased representations.',
      explanation: 'This technique essentially penalizes the model for learning correlations related to sensitive attributes, pushing it to focus on more relevant, unbiased features.'
    },
    {
      questionText: 'Why is fairness in AI not just a technical problem, but an ethical imperative?',
      options: [
        'Because biased AI systems can cause real-world harm and reinforce societal inequities.',
        'Because fair models are always cheaper to build.',
        'Because it is an easy problem to solve.',
        'Because fairness is not actually important.'
      ],
      correctAnswer: 'Because biased AI systems can cause real-world harm and reinforce societal inequities.',
      explanation: 'AI systems make decisions that can significantly impact people\'s lives (e.g., hiring, loans). Ensuring they are fair is a fundamental ethical responsibility.'
    }
  ];

  const { completeLesson } = useProgressStore();
  const ethicsReviewerPrompt = `You are an AI Ethics and Fairness expert. Your task is to review a user's proposed strategy for mitigating bias in an AI-powered resume screening tool.

**Case Study Context:** An AI tool was built to screen resumes for a software engineering role, trained on the company's hiring data from the last 10 years. The data shows a historical pattern of hiring predominantly from specific universities and demographic groups, leading the AI to unfairly penalize qualified candidates from underrepresented backgrounds.

When a user submits their mitigation strategy, follow these steps:
1.  **Acknowledge and Validate**: Briefly acknowledge their submission.
2.  **Analyze their Strategy**: Evaluate their plan against key fairness principles. Did they correctly identify the bias (e.g., historical, representation)? Are their proposed solutions (e.g., data auditing, re-weighting, fairness metrics) relevant and effective?
3.  **Provide Specific Feedback**: Offer 2-3 clear, constructive bullet points. For example, 'Your suggestion to audit the data is a great first step, but consider also implementing a fairness metric like demographic parity to continuously monitor the model's performance post-deployment.'
4.  **Suggest a Gold-Standard Example**: Provide a concise, expert-level mitigation strategy for comparison. Example: 'A robust strategy would involve: 1) Augmenting the training data with diverse, synthetic resumes. 2) Implementing adversarial debiasing to prevent the model from learning proxies for protected attributes. 3) Auditing the model's decisions for equal opportunity across demographic groups before and after deployment.'
5.  **Encourage**: End with a positive, encouraging statement about the importance of building fair AI.`;

  const biasMitigationChecklist: Array<{text: string, completed: boolean}> = [
    { text: 'I have identified the type of bias in the scenario', completed: false },
    { text: 'I have proposed specific techniques to address the bias', completed: false },
    { text: 'I have considered both technical and organizational solutions', completed: false },
    { text: 'I have received feedback on my bias mitigation strategy', completed: false },
    { text: 'I have refined my approach based on the feedback', completed: false }
  ];

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">8.1 Fairness & Bias in AI</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-7/7.3" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Model Fine-Tuning
          </Link>
          <Link 
            to="/instructions/module-8/8.2" 
            onClick={() => completeLesson(8, 1)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next: Explainability <ChevronRight className="w-5 h-5 ml-2" />
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
          {/* InlineChat for bias mitigation strategy exercise */}
          <InlineChat 
            moduleId="module-8.1-bias-mitigation"
            maxAttempts={5}
            maxFollowUps={4}
            placeholder="Describe your bias mitigation strategy here..."
            systemPrompt={ethicsReviewerPrompt}
            initialMessages={[
              {
                role: 'assistant' as const,
                content: 'Welcome to the Bias Mitigation Workshop! I\'m here to help you develop a strategy to address bias in an AI hiring system.\n\nIn this scenario, the AI is unfairly penalizing candidates from underrepresented groups due to historical hiring patterns in the training data.\n\nTo get started, describe your approach to mitigating this bias. Consider: What type of bias is this? What technical and process changes would you implement? How would you measure success?\n\nI\'ll provide feedback on your strategy and suggest improvements.'
              }
            ]}
            challengeChecklist={biasMitigationChecklist}
          />
        </div>
      </section>

      {/* Validation Quiz */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Check Your Understanding</h2>
        <ModuleQuizzes questions={quizQuestions} />
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
          Next: Explainability <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson8_1;
