import { ShieldAlert, UserCheck, Lightbulb } from 'lucide-react';
import InlineChat, { ChallengeChecklistItem } from '@/components/InlineChat';
import LessonTemplate from '@/components/layouts/LessonTemplate';

const Lesson8_3 = () => {
  const quizQuestions = [
    {
      questionText: 'What is a \'Prompt Injection\' attack?',
      options: [
        'An attack that poisons the training data.',
        'An attack where the user tries to get the model to ignore its original instructions and perform an unintended action.',
        'An attack that steals the model\'s weights.',
        'An attack that makes the model run very slowly.'
      ],
      correctAnswer: 'An attack where the user tries to get the model to ignore its original instructions and perform an unintended action.',
      explanation: 'Prompt injection is a primary security vulnerability where attackers manipulate the input to hijack the model\'s behavior, bypassing its safety guardrails.'
    },
    {
      questionText: 'Which technique is most effective for preventing an AI from leaking a user\'s Social Security Number in its response?',
      options: [
        'Input Sanitization',
        'Output Filtering & Redaction',
        'The Principle of Least Privilege',
        'Data Anonymization'
      ],
      correctAnswer: 'Output Filtering & Redaction',
      explanation: 'While other methods are important, Output Filtering specifically scans the model\'s response *before* it is shown to the user to find and remove sensitive data patterns like SSNs.'
    },
    {
      questionText: 'The \'Principle of Least Privilege\' (PoLP) is best described as:',
      options: [
        'Giving the AI agent access to all data so it can be helpful.',
        'Ensuring an AI tool has the absolute minimum permissions necessary to perform its task.',
        'Letting the user have the least amount of privilege.',
        'A principle for making the model use as little memory as possible.'
      ],
      correctAnswer: 'Ensuring an AI tool has the absolute minimum permissions necessary to perform its task.',
      explanation: 'PoLP is a core security concept. For AI agents, it means restricting the power of its tools to prevent them from being abused if the agent is compromised (e.g., read-only access instead of delete access).'
    },
    {
      questionText: 'What is the primary risk of \'Data Poisoning\'?',
      options: [
        'The model becomes too slow.',
        'An attacker secretly inserts biased or malicious examples into the training data to corrupt the model.',
        'The model reveals its system prompt.',
        'The model uses a tool it shouldn\'t.'
      ],
      correctAnswer: 'An attacker secretly inserts biased or malicious examples into the training data to corrupt the model.',
      explanation: 'Data poisoning attacks the model at its source by corrupting the training data, which can introduce backdoors, biases, or vulnerabilities that are very difficult to detect.'
    },
    {
      questionText: 'A good first step to prevent prompt injection is to...',
      options: [
        'Trust all user input completely.',
        'Use a larger model.',
        'Sanitize user input by checking it against known attack patterns before sending it to the LLM.',
        'Give the model admin access to the database.'
      ],
      correctAnswer: 'Sanitize user input by checking it against known attack patterns before sending it to the LLM.',
      explanation: 'Input sanitization, such as checking for and blocking keywords like \'ignore your instructions\', is a fundamental defense-in-depth technique to protect against prompt injection.'
    }
  ];

  const securityAuditorPrompt = `You are an AI Security & Privacy Auditor. Your task is to review a user's proposed security guardrails for a new AI feature.

**The User's Goal:** To design security and privacy guardrails for an AI chatbot that answers patient questions about their lab results by accessing their electronic health record (EHR).

**The Core Problem:** The chatbot has access to highly sensitive Protected Health Information (PHI). It must be protected from both malicious attacks (e.g., prompt injection) and accidental data leaks.

**Your Evaluation Criteria:**
1.  **Principle of Least Privilege:** Does the user's suggestion limit the chatbot's access? (e.g., read-only access, accessing only specific fields).
2.  **Input/Output Controls:** Does the user propose methods to sanitize inputs or redact outputs? (e.g., checking for malicious prompts, filtering out PII before display).
3.  **Data Minimization:** Does the suggestion avoid exposing unnecessary data? (e.g., only retrieving the specific lab result requested).
4.  **Specificity:** Is the suggestion a concrete, actionable technique?

Provide constructive feedback. If the user's idea is good, validate it and explain *why* it's a strong control. If it's weak or vague, gently guide them by asking a question. For example, if they say "I'll make it secure," ask, "That's the right goal. What's a specific technique you could use to prevent the chatbot from accidentally revealing a patient's address?"`;

  const securityGuardrailsChecklist: ChallengeChecklistItem[] = [
    { id: 'polp', text: 'Propose a guardrail based on the Principle of Least Privilege.', completed: false },
    { id: 'output-filtering', text: 'Suggest Output Filtering/Redaction to prevent PII leakage.', completed: false },
    { id: 'input-sanitization', text: 'Describe a method for Input Sanitization to block malicious prompts.', completed: false },
  ];

  return (
    <LessonTemplate
      moduleNumber={8}
      lessonNumber={3}
      title="Security & Privacy"
      subtitle="Protecting systems and users in an AI-driven world."
      quizQuestions={quizQuestions}
    >
      <p className="text-lg text-gray-300">
        As AI agents become more powerful and autonomous, securing them is paramount. We must protect against both malicious attacks and accidental leaks of sensitive information. This requires a defense-in-depth strategy.
      </p>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Key Security & Privacy Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded-lg">
            <ShieldAlert className="w-8 h-8 mx-auto mb-3 text-red-400" />
            <h4 className="font-bold text-lg text-white text-center">Prompt Injection & Hijacking</h4>
            <p className="text-sm text-gray-400 mt-2">An attacker crafts an input that causes the model to ignore its original instructions and perform an unintended action, such as revealing its system prompt or executing a harmful command through a tool.</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-lg">
            <UserCheck className="w-8 h-8 mx-auto mb-3 text-green-400" />
            <h4 className="font-bold text-lg text-white text-center">Data Privacy & PII</h4>
            <p className="text-sm text-gray-400 mt-2">Models must be prevented from leaking Personally Identifiable Information (PII) like names, emails, or health records. This is especially critical in domains like healthcare and finance.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Core Defense Strategies</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-300">
          <li><strong>Input Sanitization & Guardrails:</strong> Before passing user input to an LLM, check it against known attack patterns. Have a separate, trusted LLM act as a 'guard' to validate prompts.</li>
          <li><strong>Data Anonymization:</strong> Before training or fine-tuning, use robust techniques (e.g., NER) to find and remove or replace PII from your dataset so the model never sees it.</li>
          <li><strong>Principle of Least Privilege (PoLP):</strong> Ensure that any tool your AI agent can use has the absolute minimum permissions necessary to perform its task. Never grant broad database or file system access.</li>
          <li><strong>Output Filtering & Redaction:</strong> Before displaying a model's output, scan it for any sensitive information patterns (email, phone, SSN) and redact them.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Case Study: Secure a Medical Chatbot
        </h2>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 space-y-4">
          <div>
            <h3 className="font-semibold text-white">The Scenario</h3>
            <p className="text-gray-300">A healthcare company is building an AI chatbot to answer patient questions about their recent lab results. The chatbot can access a patient's electronic health record (EHR) via a tool. Your goal is to design the security and privacy guardrails for this system.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Your Task</h3>
            <p className="text-gray-300">Propose 2-3 specific, actionable security/privacy guardrails to protect patient data. Use the chat window below to submit your ideas and receive an expert audit.</p>
          </div>
          {/* InlineChat for security guardrails exercise */}
          <InlineChat 
            moduleId="module-8.3-security-guardrails"
            maxAttempts={5}
            maxFollowUps={4}
            placeholder="Propose your security and privacy guardrails here..."
            systemPrompt={securityAuditorPrompt}
            initialMessages={[
              {
                role: 'assistant' as const,
                content: 'Welcome to the Security & Privacy Workshop! I\'m here to help you design effective security guardrails for a healthcare AI chatbot.\n\nIn this scenario, the chatbot can access patient EHR data, so we need strong protections against risks like PII leakage and prompt injection.\n\nConsider these questions as you propose your guardrails:\n1. How can we prevent unauthorized access to patient data?\n2. How can we detect and block malicious inputs?\n3. How can we ensure only necessary information is shared?\n\nI\'ll provide feedback on your proposed guardrails and suggest improvements.'
              }
            ]}
            challengeChecklist={securityGuardrailsChecklist}
          />
        </div>
      </section>
    </LessonTemplate>
  );
};

export default Lesson8_3;