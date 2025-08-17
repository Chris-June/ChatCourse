import {

  Lightbulb,
  GraduationCap,
  Scale,
  BookCopy,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import InlineChat from '@/components/InlineChat';
import LessonTemplate from '@/components/layouts/LessonTemplate';
import ResponsibleAI from '@/pages/instructions/components/ResponsibleAI';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/store/progressStore';
import { ethicsReviewerPrompt, biasMitigationChecklist } from '@/prompts';
import { usePortfolioArtifacts } from '@/store/usePortfolioArtifacts';

const quizQuestions = [
  {
    questionText:
      'An AI model trained on 10 years of hiring data from a company that historically hired men for engineering roles is most likely to suffer from which type of bias?',
    options: [
      'Measurement Bias',
      'Representation Bias',
      'Historical Bias',
      'No bias at all',
    ],
    correctAnswer: 'Historical Bias',
    explanation:
      'Historical bias occurs when the data reflects past prejudices or societal imbalances, even if the world has changed. The model learns and perpetuates these old patterns.',
  },
  {
    questionText: "What is the main problem with 'Representation Bias'?",
    options: [
      'The model represents the data too perfectly.',
      'The training data under-represents certain groups, leading to poor performance for those groups.',
      'The data is measured incorrectly.',
      'The model is too large.',
    ],
    correctAnswer:
      'The training data under-represents certain groups, leading to poor performance for those groups.',
    explanation:
      'If a group is not well-represented in the training data, the model will not learn its features effectively and will fail to perform accurately for that group.',
  },
  {
    questionText:
      'Which of the following is a proactive strategy to mitigate AI bias?',
    options: [
      'Hoping the model figures it out on its own.',
      'Auditing the training data for skews and implementing fairness metrics to monitor performance.',
      'Using a smaller dataset.',
      'Ignoring user complaints about fairness.',
    ],
    correctAnswer:
      'Auditing the training data for skews and implementing fairness metrics to monitor performance.',
    explanation:
      'Responsible AI development requires proactive, intentional steps. Auditing data and monitoring with fairness metrics are key strategies to identify and reduce bias.',
  },
  {
    questionText: "The goal of 'Adversarial Debiasing' is to...",
    options: [
      'Make the model more biased.',
      'Make the model worse at its primary task.',
      'Train the model to be unable to predict a sensitive attribute (like gender or race), forcing it to learn less biased representations.',
      'Make the model an adversary to the user.',
    ],
    correctAnswer:
      'Train the model to be unable to predict a sensitive attribute (like gender or race), forcing it to learn less biased representations.',
    explanation:
      'This technique essentially penalizes the model for learning correlations related to sensitive attributes, pushing it to focus on more relevant, unbiased features.',
  },
  {
    questionText:
      'Why is fairness in AI not just a technical problem, but an ethical imperative?',
    options: [
      'Because biased AI systems can cause real-world harm and reinforce societal inequities.',
      'Because fair models are always cheaper to build.',
      'Because it is an easy problem to solve.',
      'Because fairness is not actually important.',
    ],
    correctAnswer:
      'Because biased AI systems can cause real-world harm and reinforce societal inequities.',
    explanation:
      "AI systems make decisions that can significantly impact people's lives (e.g., hiring, loans). Ensuring they are fair is a fundamental ethical responsibility.",
  },
];

 

function Lesson8_1() {
  const { completeLesson } = useProgressStore();
  const navigate = useNavigate();
  const { addArtifact, exportJSON, exportCSV } = usePortfolioArtifacts();

  const handleNextLesson = () => {
    completeLesson(8, 1);
    navigate('/instructions/module-8/8.2');
  };

  const handleSaveTemplate = () => {
    addArtifact({
      title: 'Bias Mitigation Plan (Template) – Module 8.1',
      type: 'note',
      module: 8,
      lesson: 1,
      data: {
        sections: [
          'Context & Identified Bias (historical/representation/measurement/evaluation)',
          'Fairness Metric Chosen (and rationale)',
          'Mitigation Steps (data, process, modeling)',
          'Evaluation Plan (before/after metrics, monitoring)'
        ],
      },
    });
  };

  return (
    <LessonTemplate
      title="AI Ethics: Understanding and Mitigating Bias"
      subtitle="Learn to identify different types of bias in AI and explore strategies for building fairer systems."
      moduleNumber={8}
      lessonNumber={1}
      quizQuestions={quizQuestions}
    >
      <div className="bg-muted/30 border border-muted rounded-xl p-4 mb-6">
        <p className="text-xs text-muted-foreground mb-2">Estimated time: 14–18 minutes</p>
        <h3 className="font-semibold text-foreground mb-2">What you'll learn</h3>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Common forms of AI bias and where they originate</li>
          <li>Fairness metrics to evaluate model behavior</li>
          <li>Practical strategies to mitigate bias</li>
        </ul>
      </div>

      {/* Myth vs Reality */}
      <section className="bg-muted/30 border border-border rounded-xl p-4 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Myth vs. Reality</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-background border border-border rounded-lg p-3">
            <h4 className="font-semibold text-destructive mb-1">Myth</h4>
            <p className="text-sm text-muted-foreground">“Bias is only a problem if the model is racist or sexist on purpose.”</p>
          </div>
          <div className="bg-background border border-border rounded-lg p-3">
            <h4 className="font-semibold text-success mb-1">Reality</h4>
            <p className="text-sm text-muted-foreground">Most bias is inherited from data and processes, not intent. Proactive design, auditing, and measurement are required to mitigate it.</p>
          </div>
        </div>
      </section>

      <Accordion type="multiple" defaultValue={['item-1']} className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex items-center">
              <BookCopy className="w-5 h-5 mr-3 text-primary" />
              The Tilted Foundation: Understanding AI Bias
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-4 text-muted-foreground">
              Imagine building a house on a tilted foundation. No matter how perfectly you build the walls, the whole structure will be skewed. AI models are the same: their foundation is data. If the data is biased, the model's decisions will be biased, too. This isn't a rare bug; it's a fundamental challenge in AI development.
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Historical Bias:</strong> The data reflects past prejudices, even if the world has changed. (e.g., an AI trained on historical hiring data learns to prefer male candidates for engineering roles).</li>
              <li><strong>Representation Bias:</strong> The training data under-represents a certain group, leading to poor performance for that group. (e.g., a facial recognition system trained mostly on light-skinned faces fails to identify dark-skinned faces).</li>
              <li><strong>Measurement Bias:</strong> The way data is collected or measured is flawed. (e.g., using arrests as a proxy for crime, which can over-represent policed communities).</li>
              <li><strong>Evaluation Bias:</strong> The benchmark used to evaluate the model doesn't represent the real-world population the model will serve.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            <div className="flex items-center">
              <Scale className="w-5 h-5 mr-3 text-primary" />
              Strategies for Mitigation
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-4 text-muted-foreground">
              Fixing a tilted foundation is hard, but not impossible. It requires intentional, proactive effort. Here are some key strategies:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Data Auditing & Augmentation:</strong> Carefully examine your dataset for skews. Use techniques like over-sampling under-represented groups or generating synthetic data to create a more balanced foundation.</li>
              <li><strong>Fairness Metrics:</strong> Implement metrics like 'demographic parity' or 'equal opportunity' to evaluate if your model performs equally well across different user groups.</li>
              <li><strong>Inclusive Design:</strong> Involve diverse teams and stakeholders in the design process to identify potential blind spots and challenge assumptions early on.</li>
              <li><strong>Adversarial Debiasing:</strong> Train a second model to predict the sensitive attribute (e.g., gender, race) from the first model's predictions. The primary model is then penalized for being 'too predictable,' forcing it to learn less biased representations.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            <div className="flex items-center">
              <Lightbulb className="w-5 h-5 mr-3 text-primary" />
              Case Study: Mitigating Bias in a Hiring AI
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4 border rounded-lg bg-card space-y-4">
              <div>
                <h3 className="font-semibold text-foreground">The Scenario</h3>
                <p className="text-muted-foreground">An AI tool was built to screen resumes for a software engineering role, trained on your company's hiring data from the last 10 years. The data reflects a historical pattern of hiring predominantly from specific universities and demographic groups. As a result, the AI is unfairly penalizing qualified candidates from underrepresented backgrounds.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Your Task</h3>
                <p className="text-muted-foreground">Propose a comprehensive strategy to mitigate the bias in this system. Describe the steps you would take to identify, measure, and reduce the unfair impact on candidates. Use the chat window below to submit your strategy and receive expert feedback.</p>
              </div>
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
          </AccordionContent>
        </AccordionItem>

        {/* Responsible AI developer checklist */}
        <ResponsibleAI />

        {/* Portfolio Panel */}
        <div className="bg-muted/30 border border-muted rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-foreground mb-2">Portfolio</h3>
          <p className="text-sm text-muted-foreground mb-3">Save a template for your bias mitigation plan or export your collected artifacts.</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={handleSaveTemplate}>Save Plan Template</Button>
            <Button variant="outline" onClick={exportJSON}>Export JSON</Button>
            <Button variant="outline" onClick={exportCSV}>Export CSV</Button>
          </div>
        </div>

        <div className="bg-muted/30 border border-muted rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-2">You can now…</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Identify bias types in datasets and models</li>
            <li>Select an appropriate fairness metric</li>
            <li>Propose concrete mitigation steps</li>
          </ul>
        </div>

        {/* Mini‑Glossary */}
        <section className="bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">Mini‑Glossary</h3>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li><strong>Historical Bias:</strong> Past patterns embedded in data that perpetuate inequity.</li>
            <li><strong>Representation Bias:</strong> Under/over‑sampling of groups leading to uneven performance.</li>
            <li><strong>Fairness Metric:</strong> A quantitative measure (e.g., demographic parity) to assess equity.</li>
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
              Test your understanding of AI bias and fairness. The quiz will appear automatically when you navigate to the next lesson.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-between pt-8 mt-8 border-t">
        <Button variant="outline" asChild>
          <Link to="/instructions/module-7/7.3">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous: RAG vs. Fine-Tuning
          </Link>
        </Button>
        <Button onClick={handleNextLesson}>
          Next: Secure AI Systems
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </LessonTemplate>
  );
}

export default Lesson8_1;
