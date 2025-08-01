import { ShieldCheck, Lightbulb } from 'lucide-react';
import InlineChat, { ChallengeChecklistItem } from '@/components/InlineChat';
import LessonTemplate from '@/components/layouts/LessonTemplate';

const Lesson8_1 = () => {
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

  const ethicsReviewerPrompt = `You are an AI Ethics and Fairness expert. Your task is to review a user's proposed strategy for mitigating bias in an AI-powered resume screening tool.

**The User's Goal:** To create a fair hiring process by identifying and reducing bias in an AI that screens software engineering resumes.

**The Core Problem:** The AI was trained on 10 years of company data that reflects a historical pattern of hiring from specific universities and demographic groups. As a result, it unfairly penalizes qualified candidates from underrepresented backgrounds.

**Your Evaluation Criteria:**
1.  **Identify the Bias:** Does the user correctly identify the primary type of bias (e.g., historical, representation, measurement)?
2.  **Propose Concrete Steps:** Does the user suggest specific, actionable steps? (e.g., data auditing, re-sampling, using fairness-aware algorithms).
3.  **Define Measurement:** Does the user explain how they would measure fairness? (e.g., using metrics like demographic parity or equal opportunity).
4.  **Acknowledge Nuance:** Does the user recognize that fairness is complex and that there are trade-offs?

Provide constructive feedback. If their plan is good, validate it and perhaps suggest one additional best practice. If their plan is weak, gently guide them by asking probing questions related to the criteria above. For example, if they forget to mention measurement, ask, "That's a solid start. How would you know if your changes were successful? What metrics could you use to measure fairness?" Keep your feedback concise and focused on a single follow-up question if needed.`;

  const biasMitigationChecklist: ChallengeChecklistItem[] = [
    { id: 'identify-bias', text: 'Correctly identify the primary type of bias (Historical Bias).', completed: false },
    { id: 'audit-data', text: 'Suggest auditing and augmenting the dataset to improve representation.', completed: false },
    { id: 'fairness-metrics', text: 'Propose using fairness metrics (e.g., demographic parity) to measure success.', completed: false },
    { id: 'technical-solution', text: 'Mention a technical debiasing technique (e.g., re-weighting, adversarial debiasing).', completed: false },
  ];

  return (
    <LessonTemplate
      moduleNumber={8}
      lessonNumber={1}
      title="Identifying and Mitigating Bias"
      subtitle="Building fair and responsible AI systems."
      quizQuestions={quizQuestions}
    >
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">The Unseen Architect: Historical Bias</h2>
        <p className="text-gray-300 mb-4">
          Imagine building a skyscraper on a tilted foundation. No matter how perfectly you build, the entire structure will be skewed. Historical bias is that tilted foundation. When we train models on data from a world with existing inequalities (e.g., hiring, loan applications), the AI learns to replicate and even amplify those past prejudices. It doesn't know it's being unfair; it only knows how to find patterns in the data it's given.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Common Types of Bias</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li><strong>Representation Bias:</strong> The data fails to represent the diversity of the real world. If a facial recognition model is trained mostly on light-skinned faces, its performance on dark-skinned faces will be poor.</li>
          <li><strong>Measurement Bias:</strong> The way you measure something is flawed or inconsistent. For example, using arrests as a proxy for crime can be biased if policing is heavier in certain neighborhoods.</li>
          <li><strong>Evaluation Bias:</strong> The benchmark used to evaluate the model doesn't represent the real-world population the model will serve.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <ShieldCheck className="w-7 h-7 mr-3 text-green-400" />
          Strategies for Mitigation
        </h2>
        <p className="text-gray-300 mb-4">
          Fixing a tilted foundation is hard, but not impossible. It requires intentional, proactive effort. Here are some key strategies:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          <li><strong>Data Auditing & Augmentation:</strong> Carefully examine your dataset for skews. Use techniques like over-sampling under-represented groups or generating synthetic data to create a more balanced foundation.</li>
          <li><strong>Fairness Metrics:</strong> Implement metrics like 'demographic parity' or 'equal opportunity' to evaluate if your model performs equally well across different user groups.</li>
          <li><strong>Inclusive Design:</strong> Involve diverse teams and stakeholders in the design process to identify potential blind spots and challenge assumptions early on.</li>
          <li><strong>Adversarial Debiasing:</strong> Train a second model to predict the sensitive attribute (e.g., gender, race) from the first model's predictions. The primary model is then penalized for being 'too predictable,' forcing it to learn less biased representations.</li>
        </ul>
      </section>

      <section>
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
    </LessonTemplate>
  );
};

export default Lesson8_1;
