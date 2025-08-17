import {
  ShieldAlert,
  Lightbulb,
  Wrench,
  GraduationCap,
  ChevronLeft,
  CheckCircle,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import InlineChat from '@/components/InlineChat';
import LessonTemplate from '@/components/layouts/LessonTemplate';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/store/progressStore';
import { securityAuditorPrompt } from '@/prompts';
import { securityGuardrailsChecklist } from '@/prompts';
import { usePortfolioArtifacts } from '@/store/usePortfolioArtifacts';

const quizQuestions = [
  {
    questionText: "What is a 'Prompt Injection' attack?",
    options: [
      'An attack that poisons the training data.',
      'An attack where the user tries to get the model to ignore its original instructions and perform an unintended action.',
      "An attack that steals the model's weights.",
      'An attack that makes the model run very slowly.',
    ],
    correctAnswer:
      'An attack where the user tries to get the model to ignore its original instructions and perform an unintended action.',
    explanation:
      "Prompt injection is a primary security vulnerability where attackers manipulate the input to hijack the model's behavior, bypassing its safety guardrails.",
  },
  {
    questionText:
      "Which technique is most effective for preventing an AI from leaking a user's Social Security Number in its response?",
    options: [
      'Input Sanitization',
      'Output Filtering & Redaction',
      'The Principle of Least Privilege',
      'Data Anonymization',
    ],
    correctAnswer: 'Output Filtering & Redaction',
    explanation:
      "While other methods are important, Output Filtering specifically scans the model's response *before* it is shown to the user to find and remove sensitive data patterns like SSNs.",
  },
  {
    questionText: "The 'Principle of Least Privilege' (PoLP) is best described as:",
    options: [
      'Giving the AI agent access to all data so it can be helpful.',
      'Ensuring an AI tool has the absolute minimum permissions necessary to perform its task.',
      'Letting the user have the least amount of privilege.',
      'A principle for making the model use as little memory as possible.',
    ],
    correctAnswer:
      'Ensuring an AI tool has the absolute minimum permissions necessary to perform its task.',
    explanation:
      'PoLP is a core security concept. For AI agents, it means restricting the power of its tools to prevent them from being abused if the agent is compromised (e.g., read-only access instead of delete access).',
  },
  {
    questionText: "What is the primary risk of 'Data Poisoning'?",
    options: [
      'The model becomes too slow.',
      'An attacker secretly inserts biased or malicious examples into the training data to corrupt the model.',
      'The model reveals its system prompt.',
      "The model uses a tool it shouldn't.",
    ],
    correctAnswer:
      'An attacker secretly inserts biased or malicious examples into the training data to corrupt the model.',
    explanation:
      'Data poisoning attacks the model at its source by corrupting the training data, which can introduce backdoors, biases, or vulnerabilities that are very difficult to detect.',
  },
  {
    questionText: 'A good first step to prevent prompt injection is to...',
    options: [
      'Trust all user input completely.',
      'Use a larger model.',
      'Sanitize user input by checking it against known attack patterns before sending it to the LLM.',
      'Give the model admin access to the database.',
    ],
    correctAnswer:
      "Sanitize user input by checking it against known attack patterns before sending it to the LLM.",
    explanation:
      "Input sanitization, such as checking for and blocking keywords like 'ignore your instructions', is a fundamental defense-in-depth technique to protect against prompt injection.",
  },
];



 

function Lesson8_3() {
  const { completeLesson } = useProgressStore();
  const navigate = useNavigate();
  const { addArtifact, exportJSON, exportCSV } = usePortfolioArtifacts();

  const handleFinishModule = () => {
    completeLesson(8, 3);
    navigate('/instructions');
  };

  const handleSaveTemplate = () => {
    addArtifact({
      title: 'Security Guardrails Plan – Module 8.3',
      type: 'security-plan',
      module: 8,
      lesson: 3,
      data: {
        guardrails: [
          'Input Sanitization Patterns',
          'Least Privilege Tool Permissions',
          'Output Filtering & Redaction',
          'Monitoring & Incident Response (canaries, alerts)'
        ],
      },
    });
  };

  return (
    <LessonTemplate
      moduleNumber={8}
      lessonNumber={3}
      title="Security & Privacy"
      subtitle="Protecting systems and users in an AI-driven world."
      quizQuestions={quizQuestions}
    >
      <div className="bg-muted/30 border border-border rounded-xl p-4 mb-6">
        <p className="text-xs text-muted-foreground mb-2">Estimated time: 12–16 minutes</p>
        <h3 className="font-semibold text-foreground mb-2">What you'll learn</h3>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Core AI security threats (prompt injection, data exfiltration)</li>
          <li>Privacy safeguards and safe data handling patterns</li>
          <li>Designing layered guardrails and monitoring</li>
        </ul>
      </div>

      {/* Myth vs Reality */}
      <section className="bg-muted/30 border border-border rounded-xl p-4 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Myth vs. Reality</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-background border border-border rounded-lg p-3">
            <h4 className="font-semibold text-destructive mb-1">Myth</h4>
            <p className="text-sm text-muted-foreground">“If an LLM isn’t connected to tools, it can’t leak sensitive information.”</p>
          </div>
          <div className="bg-background border border-border rounded-lg p-3">
            <h4 className="font-semibold text-success mb-1">Reality</h4>
            <p className="text-sm text-muted-foreground">Models can still echo secrets in prompts or training data. Defense‑in‑depth (sanitization, least privilege, output filtering) is required even without tools.</p>
          </div>
        </div>
      </section>

      <Accordion type="multiple" defaultValue={['item-1']} className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex items-center">
              <ShieldAlert className="w-5 h-5 mr-3 text-primary" />
              Key Security & Privacy Concepts
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-4 text-muted-foreground">
              As AI agents become more powerful and autonomous, securing them is paramount. We must protect against both malicious attacks and accidental leaks of sensitive information. This requires a defense-in-depth strategy.
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Prompt Injection:</strong> An attacker crafts an input that causes the model to ignore its original instructions and perform an unintended action, such as revealing its system prompt or executing a harmful command through a tool.</li>
              <li><strong>Data Privacy & PII:</strong> Models must be prevented from leaking Personally Identifiable Information (PII) like names, emails, or health records. This is especially critical in domains like healthcare and finance.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            <div className="flex items-center">
              <Wrench className="w-5 h-5 mr-3 text-primary" />
              Core Defense Strategies
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li><strong>Input Sanitization & Guardrails:</strong> Before passing user input to an LLM, check it against known attack patterns. Have a separate, trusted LLM act as a 'guard' to validate prompts.</li>
              <li><strong>Data Anonymization:</strong> Before training or fine-tuning, use robust techniques (e.g., NER) to find and remove or replace PII from your dataset so the model never sees it.</li>
              <li><strong>Principle of Least Privilege (PoLP):</strong> Ensure that any tool your AI agent can use has the absolute minimum permissions necessary to perform its task. Never grant broad database or file system access.</li>
              <li><strong>Output Filtering & Redaction:</strong> Before displaying a model's output, scan it for any sensitive information patterns (email, phone, SSN) and redact them.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            <div className="flex items-center">
              <Lightbulb className="w-5 h-5 mr-3 text-amber-400" />
              Case Study: Secure a Medical Chatbot
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4 border border-border rounded-lg bg-card space-y-4">
              <div>
                <h3 className="font-semibold text-foreground">The Scenario</h3>
                <p className="text-muted-foreground">A healthcare company is building an AI chatbot to answer patient questions about their recent lab results. The chatbot can access a patient's electronic health record (EHR) via a tool. Your goal is to design the security and privacy guardrails for this system.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Your Task</h3>
                <p className="text-muted-foreground">Propose 2-3 specific, actionable security/privacy guardrails to protect patient data. Use the chat window below to submit your ideas and receive an expert audit.</p>
              </div>
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
          </AccordionContent>
        </AccordionItem>

        <div className="bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-2">You can now…</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Identify and describe common AI threat vectors</li>
            <li>Recommend concrete privacy protections and redaction</li>
            <li>Propose guardrails and monitoring for production use</li>
          </ul>
        </div>

        {/* Mini‑Glossary */}
        <section className="bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">Mini‑Glossary</h3>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li><strong>Prompt Injection:</strong> Inputs crafted to override system instructions or trigger unsafe actions.</li>
            <li><strong>PoLP (Principle of Least Privilege):</strong> Grant only the minimal permissions necessary to tools/agents.</li>
            <li><strong>PII Redaction:</strong> Detecting and masking personally identifiable information in inputs/outputs.</li>
          </ul>
        </section>

        <AccordionItem value="item-4">
          <AccordionTrigger>
            <div className="flex items-center">
              <GraduationCap className="w-5 h-5 mr-3 text-primary" />
              Knowledge Check
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">
              Test your understanding of AI security and privacy. The quiz will appear automatically when you finish the module.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Portfolio Panel */}
      <div className="bg-muted/30 border border-border rounded-xl p-4 mt-6">
        <h3 className="font-semibold text-foreground mb-2">Portfolio</h3>
        <p className="text-sm text-muted-foreground mb-3">Save a security guardrails plan or export your collected artifacts.</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={handleSaveTemplate}>Save Security Plan</Button>
          <Button variant="outline" onClick={exportJSON}>Export JSON</Button>
          <Button variant="outline" onClick={exportCSV}>Export CSV</Button>
        </div>
      </div>

      <div className="flex justify-between pt-8 mt-8 border-t border-border">
        <Button variant="outline" asChild>
          <Link to="/instructions/module-8/8.2">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous: Transparency & Explainability
          </Link>
        </Button>
        <Button onClick={handleFinishModule}>
          Finish Module & Review Quiz
          <CheckCircle className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </LessonTemplate>
  );
}

export default Lesson8_3;