import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  SearchCode,
  Lightbulb,
  Wrench,
  MousePointer,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import RagPlayground from '@/pages/instructions/components/RagPlayground';
import InlineChat from '@/components/InlineChat';
import LessonTemplate from '@/components/layouts/LessonTemplate';
import RagFlowVisualizer from '@/pages/instructions/components/RagFlowVisualizer';

import RagUseCases from '@/pages/instructions/components/RagUseCases';
import { useProgressStore } from '@/store/progressStore';

const ragPromptValidator = `
You are an expert prompt engineering critic. Your goal is to help a user craft the perfect generator prompt for a Retrieval-Augmented Generation (RAG) system.

The user will provide a prompt. You must evaluate it against the following criteria:
1.  **Clarity and Specificity**: Is the instruction to use *only* the provided context unambiguous? (e.g., "Based *only* on the provided context...", "Using *only* the information below..."). This is the most important rule.
2.  **Placeholder Usage**: Does the prompt correctly use placeholders for the context and the question? (e.g., {context} and {question}).
3.  **Role-setting (Optional but good)**: Does the prompt assign a role to the model? (e.g., "You are a helpful AI assistant...").
4.  **Tone and Formatting**: Is the prompt well-structured and easy for the model to parse?

**Feedback Process:**
- If the prompt is excellent and meets all criteria, praise the user and explain *why* it's a strong prompt.
- If the prompt is weak, provide specific, actionable feedback. Quote parts of their prompt and suggest concrete improvements. For example, if they say "Use the context to answer," you might suggest changing it to "Based *only* on the following context, answer the user's question."
- Guide the user iteratively. Don't give them the perfect answer upfront. Help them discover it.
- Maintain a friendly, encouraging, and educational tone.
`;

const ragPromptChecklist = [
  {
    id: 'rag-c1',
    text: 'Instruct the model to answer *only* based on the provided context.',
    completed: false,
  },
  {
    id: 'rag-c2',
    text: 'Include a placeholder for the retrieved {context}.',
    completed: false,
  },
  {
    id: 'rag-c3',
    text: 'Include a placeholder for the user\'s {question}.',
    completed: false,
  },
  {
    id: 'rag-c4',
    text: 'Set a clear role for the AI (e.g., "You are a helpful assistant").',
    completed: false,
  },
];

const quizQuestions = [
    {
      questionText: 'What is the primary goal of Retrieval-Augmented Generation (RAG)?',
      options: [
        'To make the LLM faster.',
        'To reduce the cost of API calls.',
        'To ground the LLM in specific, factual data to prevent hallucinations and provide up-to-date answers.',
        'To teach the LLM a new personality.'
      ],
      correctAnswer: 'To ground the LLM in specific, factual data to prevent hallucinations and provide up-to-date answers.',
      explanation: 'RAG\'s main purpose is to provide relevant, timely, and factual context to the LLM at the time of the query, ensuring its responses are accurate and reliable.'
    },
    {
      questionText: 'In the RAG process, what does the "Retrieve" step involve?',
      options: [
        'Generating a creative story.',
        'Searching a vector database or knowledge base to find information relevant to the user\'s query.',
        'Asking the user for more details.',
        'Fine-tuning the model on new data.'
      ],
      correctAnswer: 'Searching a vector database or knowledge base to find information relevant to the user\'s query.',
      explanation: 'The retrieval step is all about finding the most relevant "documents" or chunks of information from your knowledge source that can help answer the user\'s question.'
    },
    {
      questionText: 'What is a "hallucination" in the context of LLMs?',
      options: [
        'A type of computer virus.',
        'When the model sees images that aren\'t there.',
        'When the model confidently states incorrect or fabricated information as if it were fact.',
        'A feature that allows the model to dream.'
      ],
      correctAnswer: 'When the model confidently states incorrect or fabricated information as if it were fact.',
      explanation: 'Hallucinations are a key problem that RAG helps solve. By providing factual context, we reduce the likelihood that the model will need to invent answers.'
    },
    {
      questionText: 'Why is it important to instruct the model to answer *only* based on the provided context in a RAG prompt?',
      options: [
        'It\'s a legal requirement.',
        'It makes the prompt longer and more impressive.',
        'It forces the model to rely on the factual, retrieved information rather than its own (potentially outdated or incorrect) internal knowledge.',
        'It helps the model understand English better.'
      ],
      correctAnswer: 'It forces the model to rely on the factual, retrieved information rather than its own (potentially outdated or incorrect) internal knowledge.',
      explanation: 'This is a critical instruction for building a reliable RAG system. It constrains the model to your trusted data source, which is the entire point of using RAG.'
    },
    {
      questionText: 'Which of these use cases is the best fit for RAG?',
      options: [
        'Writing a fantasy novel about dragons.',
        'Creating a chatbot that can answer questions about your company\'s latest product documentation.',
        'Generating a new programming language.',
        'Composing a sad poem.'
      ],
      correctAnswer: 'Creating a chatbot that can answer questions about your company\'s latest product documentation.',
      explanation: 'RAG is ideal for this because it ensures the bot gives answers that are consistent with a specific, trusted set of information, like help docs or product manuals.'
    }
  ];

function Lesson7_2() {
  const { completeLesson } = useProgressStore();
  const navigate = useNavigate();

  const handleNext = () => {
    completeLesson(7, 2);
    navigate('/instructions/module-7/7.3');
  };

  return (
    <LessonTemplate
      moduleNumber={7}
      lessonNumber={2}
      title="The RAG-Powered Research Assistant"
      subtitle="Learn how to give your LLM a library card. Retrieval-Augmented Generation (RAG) grounds your model in facts, preventing it from making things up."
      quizQuestions={quizQuestions}
    >
      <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex items-center">
              <BookOpen className="w-5 h-5 mr-3 text-primary" />
              Introduction: The Forgetful Professor
            </div>
          </AccordionTrigger>
          <AccordionContent className="prose prose-invert max-w-none">
            <p>
              Imagine a brilliant professor who knows a lot about everything, but their memory is a bit fuzzy on specifics. To write a paper, they can't just rely on what's in their head; they need a research assistant to find the exact facts from a library.
            </p>
            <p>
              An LLM is like that professor. RAG is the research assistant. It fetches specific, factual information from a trusted knowledge base (your company's documentation, legal contracts, product manuals) and gives it to the LLM *just in time* to answer a question. This prevents the LLM from "hallucinating" or making up answers.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            <div className="flex items-center">
              <SearchCode className="w-5 h-5 mr-3 text-primary" />
              The Research Process: Retrieve, Augment, Generate
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-4 text-muted-foreground">
              The RAG process is a three-step flow that turns a simple question into a fact-based, reliable answer. Explore the visualizer to see how a user's query travels through the system.
            </p>
            <div className="p-4 border rounded-lg bg-card">
              <RagFlowVisualizer />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            <div className="flex items-center">
              <Lightbulb className="w-5 h-5 mr-3 text-primary" />
              When to Use RAG
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-4 text-muted-foreground">
              RAG is a powerful technique, but it's not the solution for every problem. It shines when you need to ground your AI in specific, factual, and up-to-date information. Explore some common use cases where RAG is the perfect fit.
            </p>
            <div className="p-4 border rounded-lg bg-card">
              <RagUseCases />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>
            <div className="flex items-center">
              <MousePointer className="w-5 h-5 mr-3 text-primary" />
              Hands-On: The RAG Playground
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-4 text-muted-foreground">
              Time to get hands-on. We've set up a small library for a fictional company. Your job is to ask questions and watch the assistant retrieve the right documents to help answer.
            </p>
            <div className="p-4 border rounded-lg bg-card">
              <RagPlayground />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>
            <div className="flex items-center">
              <Wrench className="w-5 h-5 mr-3 text-primary" />
              Challenge: Craft the Perfect RAG Prompt
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-4 text-muted-foreground">
              The final step in the RAG flow is the prompt. A well-crafted prompt is crucial for ensuring the model uses the retrieved context correctly. Use the chat below to refine a prompt with the help of an expert AI critic. Your goal is to satisfy all the requirements on the checklist.
            </p>
            <div className="p-4 border rounded-lg bg-card">
              <InlineChat
                moduleId="rag-prompt-critic"
                systemPrompt={ragPromptValidator}
                challengeChecklist={ragPromptChecklist}
                placeholder="Write a RAG prompt and I'll give you feedback..."
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>
            <div className="flex items-center">
              <GraduationCap className="w-5 h-5 mr-3 text-primary" />
              Knowledge Check
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">
              Test your understanding of RAG. The quiz will appear automatically at the end of the lesson.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-between pt-8 mt-8 border-t">
        <Button variant="outline" asChild>
          <Link to="/instructions/module-7/7.1">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous: Function Calling
          </Link>
        </Button>
        <Button onClick={handleNext}>
          Next: Training a Method Actor
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </LessonTemplate>
  );
}

export default Lesson7_2;