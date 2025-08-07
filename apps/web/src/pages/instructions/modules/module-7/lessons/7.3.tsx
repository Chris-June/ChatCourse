import {
  BookCopy,
  ChevronLeft,
  ChevronRight,
  Coins,
  GraduationCap,
  PenSquare,
  GitCompareArrows,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import LessonTemplate from '@/components/layouts/LessonTemplate';

import FineTuningDataFormatter from '@/pages/instructions/components/FineTuningDataFormatter';
import FineTuningCostCalculator from '@/pages/instructions/components/FineTuningCostCalculator';
import StrategyQuiz from '@/pages/instructions/components/StrategyQuiz';
import { useProgressStore } from '@/store/progressStore';

const quizQuestions = [
    {
      questionText: 'What is the primary purpose of fine-tuning a Large Language Model?',
      options: [
        'To give it access to real-time information from the internet.',
        'To teach it a new skill, style, or personality by training it on a specialized dataset.',
        'To make the model smaller so it runs on a phone.',
        'To check for bugs in the model\'s code.'
      ],
      correctAnswer: 'To teach it a new skill, style, or personality by training it on a specialized dataset.',
      explanation: 'Fine-tuning fundamentally alters the model\'s behavior based on new examples, unlike RAG which provides knowledge for a single query.'
    },
    {
      questionText: 'What is the standard data format required for preparing a fine-tuning dataset?',
      options: [
        'A plain text file with a long story.',
        'A CSV file with two columns.',
        'A JSONL file where each line is a JSON object containing a prompt/completion pair.',
        'A Word document with questions and answers.'
      ],
      correctAnswer: 'A JSONL file where each line is a JSON object containing a prompt/completion pair.',
      explanation: 'This structured format (JSON Lines) is the standard way to provide high-quality training examples that the model can learn from.'
    },
    {
      questionText: 'You want to build an AI assistant that can answer questions about your company\'s internal documents from the last month. Which approach is most suitable?',
      options: [
        'Fine-tuning',
        'Retrieval-Augmented Generation (RAG)',
        'Prompt engineering alone',
        'Building a new model from scratch'
      ],
      correctAnswer: 'Retrieval-Augmented Generation (RAG)',
      explanation: 'RAG is perfect for providing the model with specific, up-to-date knowledge. Fine-tuning is not ideal for simply injecting new facts.'
    },
    {
      questionText: 'You want to build an AI assistant that always responds in the persona of a sarcastic, witty robot. Which approach is most suitable?',
      options: [
        'Retrieval-Augmented Generation (RAG)',
        'Fine-tuning',
        'Using a larger model',
        'Giving it access to the internet'
      ],
      correctAnswer: 'Fine-tuning',
      explanation: 'Fine-tuning is the best way to teach a model a specific style, personality, or behavior, as it learns the new response pattern from your examples.'
    },
    {
      questionText: 'What is a significant trade-off to consider before deciding to fine-tune a model?',
      options: [
        'It might make the model too friendly.',
        'It is always fast and free.',
        'It requires a high-quality dataset and incurs both time and monetary costs for training.',
        'It can only be done once per model.'
      ],
      correctAnswer: 'It requires a high-quality dataset and incurs both time and monetary costs for training.',
      explanation: 'Fine-tuning is a powerful but resource-intensive process. The quality of your data and the cost of training are critical factors to consider.'
    }
  ];

function Lesson7_3() {
  const { completeLesson } = useProgressStore();
  const navigate = useNavigate();

  const handleFinishCourse = () => {
    completeLesson(7, 3);
    navigate('/instructions');
  };

  return (
    <LessonTemplate
      moduleNumber={7}
      lessonNumber={3}
      title="Training a Method Actor"
      subtitle="Fine-tuning teaches your LLM a new personality, style, or skill, turning it into a specialized performer."
      quizQuestions={quizQuestions}
    >
      <div className="bg-muted/30 border border-muted rounded-xl p-4 mb-6">
        <p className="text-xs text-muted-foreground mb-2">Estimated time: 14–18 minutes</p>
        <h3 className="font-semibold text-foreground mb-2">What you'll learn</h3>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>When to choose fine-tuning vs. RAG</li>
          <li>How fine-tuning data (prompt/completion pairs) is structured</li>
          <li>Best practices for evaluation and iteration</li>
        </ul>
      </div>

      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex items-center">
              <BookCopy className="w-5 h-5 mr-3 text-primary" />
              Introduction: The Method Actor
            </div>
          </AccordionTrigger>
          <AccordionContent className="prose prose-invert max-w-none">
            <p>
              If RAG gives an LLM a script for one performance, fine-tuning trains it to become a method actor. You're not just giving it lines to read; you're teaching it to embody a new personality, style, or skill by having it rehearse hundreds of specific scenes.
            </p>
            <p>
              This is how you create an AI with a truly unique and consistent character, whether it's a perpetually sarcastic chatbot, a marketing copywriter that nails your brand voice, or a coder that writes in a specific programming style.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            <div className="flex items-center">
              <PenSquare className="w-5 h-5 mr-3 text-primary" />
              Writing the Script (Preparing Data)
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-4 text-muted-foreground">
              A method actor needs a script. Your fine-tuning dataset is that script, composed of many 'scenes' (prompt/completion pairs). The quality of this script determines the quality of the final performance. Use the formatter below to see how a conversation is turned into a scene for the actor to rehearse.
            </p>
            <div className="p-4 border rounded-lg bg-card">
              <FineTuningDataFormatter />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            <div className="flex items-center">
              <Coins className="w-5 h-5 mr-3 text-primary" />
              The Cost of Immersive Training
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-4 text-muted-foreground">
              Hiring a method actor for a lead role is expensive. Fine-tuning is too. It costs time and money, and the results depend on the quality of the script and the length of the rehearsal (epochs). This calculator gives you a sense of the investment required.
            </p>
            <div className="p-4 border rounded-lg bg-card">
              <FineTuningCostCalculator />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>
            <div className="flex items-center">
              <GitCompareArrows className="w-5 h-5 mr-3 text-primary" />
              Casting Call: RAG vs. Fine-Tuning
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-4 text-muted-foreground">
              Do you need an actor who can read any script you hand them (RAG for knowledge)? Or one who deeply embodies a specific character (Fine-Tuning for behavior)? Knowing which to choose is a critical skill. Test your casting instincts with the scenarios below.
            </p>
            <div className="p-4 border rounded-lg bg-card">
              <StrategyQuiz />
            </div>
          </AccordionContent>
        </AccordionItem>

        <div className="bg-muted/30 border border-muted rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-2">You can now…</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Describe what fine-tuning is—and isn’t</li>
            <li>Prepare a small, high-quality fine-tuning dataset</li>
            <li>Outline how you’ll evaluate a fine-tuned model</li>
          </ul>
        </div>

        <AccordionItem value="item-5">
          <AccordionTrigger>
            <div className="flex items-center">
              <GraduationCap className="w-5 h-5 mr-3 text-primary" />
              Knowledge Check
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">
              Test your understanding of fine-tuning. The quiz will appear automatically at the end of the lesson.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-between pt-8 mt-8 border-t">
        <Button variant="outline" asChild>
          <Link to="/instructions/module-7/7.2">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous: The RAG-Powered Research Assistant
          </Link>
        </Button>
        <Button onClick={handleFinishCourse}>
          Finish Course & Review Progress
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </LessonTemplate>
  );
}

export default Lesson7_3;
