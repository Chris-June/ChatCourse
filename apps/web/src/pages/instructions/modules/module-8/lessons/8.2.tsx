import {
  Lightbulb,
  GraduationCap,
  Wrench,
  BookCopy,
  ChevronLeft,
  ChevronRight,
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
import { explainabilityExpertPrompt, explanationChecklist } from '@/prompts';
import { usePortfolioArtifacts } from '@/store/usePortfolioArtifacts';

const quizQuestions = [
  {
    questionText:
      'What is the key difference between Transparency and Explainability in AI?',
    options: [
      'They are the same thing.',
      'Transparency shows WHAT the system did, while Explainability shows WHY it did it.',
      'Transparency is for users, and Explainability is for developers.',
      'Explainability shows the code, while Transparency shows the output.',
    ],
    correctAnswer:
      'Transparency shows WHAT the system did, while Explainability shows WHY it did it.',
    explanation:
      "Transparency is about seeing the process (e.g., which tools were called), while Explainability is about understanding the reasoning behind a decision (e.g., why a loan was denied).",
  },
  {
    questionText:
      'In a RAG application that answers questions based on a set of documents, which feature best demonstrates transparency?',
    options: [
      'Making the user interface dark mode.',
      'Providing links or references to the source documents used for an answer.',
      'Answering the question very quickly.',
      'Using a very large language model.',
    ],
    correctAnswer:
      'Providing links or references to the source documents used for an answer.',
    explanation:
      'Citing sources is a core transparency technique. It allows users to see the evidence the AI used, verify the information, and build trust in the system.',
  },
  {
    questionText:
      'When communicating a sensitive AI decision to a user, which principle is NOT considered a key part of a good explanation?',
    options: [
      'Clarity (being easy to understand)',
      "Empathy (acknowledging the user's feelings)",
      'Technicality (using complex jargon)',
      'Actionability (providing next steps)',
    ],
    correctAnswer: 'Technicality (using complex jargon)',
    explanation:
      'Good explanations should be simple and free of jargon. The goal is to build trust and understanding, not to confuse the user with technical details.',
  },
  {
    questionText:
      'What is the primary goal of XAI (Explainable AI) techniques like LIME and SHAP?',
    options: [
      'To make the model bigger.',
      "To identify which features most influenced a model's specific decision.",
      "To hide the model's decisions from the user.",
      "To speed up the model's response time.",
    ],
    correctAnswer:
      "To identify which features most influenced a model's specific decision.",
    explanation:
      "These techniques help us peek inside the 'black box' to understand what parts of the input (e.g., specific words, pixels) led to the output, which is key to debugging and trusting the model.",
  },
  {
    questionText:
      "Showing a user the model's confidence score alongside its prediction is a practical technique for...",
    options: [
      "Hiding the model's uncertainty.",
      'Making the output more reliable.',
      'Helping the user gauge the reliability of the output.',
      'Making the system more complex.',
    ],
    correctAnswer: 'Helping the user gauge the reliability of the output.',
    explanation:
      'A confidence score gives the user important context. A prediction with 99% confidence is treated differently than one with 60% confidence, allowing the user to make a more informed judgment.',
  },
];

 

function Lesson8_2() {
  const { completeLesson } = useProgressStore();
  const navigate = useNavigate();
  const { addArtifact, exportJSON, exportCSV } = usePortfolioArtifacts();

  const handleNextLesson = () => {
    completeLesson(8, 2);
    navigate('/instructions/module-8/8.3');
  };

  const handleSaveTemplate = () => {
    addArtifact({
      title: 'User Explanation Template – Module 8.2',
      type: 'explanation',
      module: 8,
      lesson: 2,
      data: {
        structure: [
          'Greeting & Empathy',
          'Decision Summary (plain language)',
          'Key Factors (non-jargon)',
          'Next Steps (actionable options)',
          'Contact/Appeal Info'
        ],
      },
    });
  };

  return (
    <LessonTemplate
      moduleNumber={8}
      lessonNumber={2}
      title="Transparency and Explainability"
      subtitle="Building trust by showing the 'what' and the 'why'"
      quizQuestions={quizQuestions}
    >
      <div className="bg-muted/30 border border-border rounded-xl p-4 mb-6">
        <p className="text-xs text-muted-foreground mb-2">Estimated time: 12–16 minutes</p>
        <h3 className="font-semibold text-foreground mb-2">What you'll learn</h3>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Why transparency and explainability matter for trust</li>
          <li>How to communicate decisions without jargon</li>
          <li>Design patterns for user-friendly explanations</li>
        </ul>
      </div>

      {/* Myth vs Reality */}
      <section className="bg-muted/30 border border-border rounded-xl p-4 mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Myth vs. Reality</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-background border border-border rounded-lg p-3">
            <h4 className="font-semibold text-destructive mb-1">Myth</h4>
            <p className="text-sm text-muted-foreground">“Transparency means open‑sourcing the entire model or code.”</p>
          </div>
          <div className="bg-background border border-border rounded-lg p-3">
            <h4 className="font-semibold text-success mb-1">Reality</h4>
            <p className="text-sm text-muted-foreground">Transparency can be achieved through logs, citations, and confidence indicators without exposing proprietary internals.</p>
          </div>
        </div>
      </section>

      <Accordion type="multiple" defaultValue={['item-1']} className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex items-center">
              <BookCopy className="w-5 h-5 mr-3 text-primary" />
              Transparency vs. Explainability
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-4 text-muted-foreground">
              Trust in AI doesn't come from magic; it comes from clarity. Two key concepts help us build that trust:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Transparency</strong> is about showing the 'what.' It's providing visibility into the system's operations. For an AI agent, this could mean logging the sequence of tools it called to arrive at an answer. You can see the process.</li>
              <li><strong>Explainability</strong> is about showing the 'why.' It's understanding the reasoning behind a specific decision. Why was a loan application denied? Why was a certain medical diagnosis suggested? It's about making the model's logic intelligible to humans.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            <div className="flex items-center">
              <Wrench className="w-5 h-5 mr-3 text-primary" />
              Practical Techniques for Trust
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-4 text-muted-foreground">
              Building trust isn't magic; it's good design. Here are practical ways to make your AI systems more transparent and explainable:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Show Confidence Scores:</strong> Display the model's confidence in its own prediction. A user will treat a 99% confident answer very differently from a 60% confident one.</li>
              <li><strong>Cite Sources:</strong> In RAG applications, always provide links or references to the source documents used. This allows users to verify the information for themselves.</li>
              <li><strong>Visualize Decisions:</strong> For image-based models, use heatmaps to show which parts of an image were most influential in a decision.</li>
              <li><strong>Expose the Agent's 'Thoughts':</strong> For complex agents, log the step-by-step reasoning process, including which tools were considered, chosen, and what their outputs were.</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            <div className="flex items-center">
              <Lightbulb className="w-5 h-5 mr-3 text-amber-400" />
              Case Study: Explaining an AI's Decision
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-4 border border-border rounded-lg bg-card space-y-4">
              <div>
                <h3 className="font-semibold text-foreground">The Scenario</h3>
                <p className="text-muted-foreground">An AI-powered system has just denied a loan application. The model's internal reasons are a low credit score and a high debt-to-income ratio. Your goal is to communicate this sensitive decision to the user in a way that is clear, empathetic, and actionable.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Your Task</h3>
                <p className="text-muted-foreground">Write a customer-facing message that explains the AI's decision. Focus on building trust by being transparent without being overly technical. Use the chat window below to submit your explanation and receive expert feedback.</p>
              </div>
              <InlineChat 
                moduleId="module-8.2-ai-explanation"
                maxAttempts={5}
                maxFollowUps={4}
                placeholder="Write your user-facing explanation here..."
                systemPrompt={explainabilityExpertPrompt}
                initialMessages={[
                  {
                    role: 'assistant' as const,
                    content: 'Welcome to the AI Explanation Workshop! I\'m here to help you craft a clear, empathetic explanation for a loan denial decision.\n\nIn this scenario, the AI denied the application due to a low credit score and high debt-to-income ratio. Your task is to explain this to the applicant in a way that is transparent, understandable, and constructive.\n\nConsider these questions as you write your explanation:\n1. How can you explain the decision without using technical terms?\n2. How can you show empathy for the user\'s situation?\n3. What clear next steps can you offer?\n\nI\'ll provide feedback on your explanation and suggest improvements.'
                  }
                ]}
                challengeChecklist={explanationChecklist}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <div className="bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-2">You can now…</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Write clear, empathetic user-facing explanations</li>
            <li>Mention key factors without exposing sensitive details</li>
            <li>Offer actionable next steps alongside decisions</li>
          </ul>
        </div>

        {/* Mini‑Glossary */}
        <section className="bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">Mini‑Glossary</h3>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li><strong>Transparency:</strong> Showing what the system did (e.g., tool calls, sources).</li>
            <li><strong>Explainability:</strong> Clarifying why a decision was made in human terms.</li>
            <li><strong>Confidence/Uncertainty:</strong> Indicators that help users gauge reliability of outputs.</li>
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
              Test your understanding of transparency and explainability. The quiz will appear automatically when you navigate to the next lesson.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Portfolio Panel */}
      <div className="bg-muted/30 border border-border rounded-xl p-4 mt-6 mb-6">
        <h3 className="font-semibold text-foreground mb-2">Portfolio</h3>
        <p className="text-sm text-muted-foreground mb-3">Save an explanation template or export your collected artifacts.</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={handleSaveTemplate}>Save Explanation Template</Button>
          <Button variant="outline" onClick={exportJSON}>Export JSON</Button>
          <Button variant="outline" onClick={exportCSV}>Export CSV</Button>
        </div>
      </div>

      <div className="flex justify-between pt-8 mt-8 border-t">
        <Button variant="outline" asChild>
          <Link to="/instructions/module-8/8.1">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous: AI Ethics & Bias
          </Link>
        </Button>
        <Button onClick={handleNextLesson}>
          Next: Securing AI Systems
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </LessonTemplate>
  );
}

export default Lesson8_2;
