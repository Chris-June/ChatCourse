import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import InlineChat from '@/components/InlineChat';

import RagFlowVisualizer from '@/pages/instructions/components/RagFlowVisualizer';
import RagUseCases from '@/pages/instructions/components/RagUseCases';
import RagPlayground from '@/pages/instructions/components/RagPlayground';

import LessonTemplate from '@/components/layouts/LessonTemplate';
import { useProgressStore } from '@/store/progressStore';

export interface ChallengeChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

const Lesson7_2: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What is the primary goal of Retrieval-Augmented Generation (RAG)?',
      options: [
        'To make the LLM generate more creative and fictional stories.',
        'To allow an LLM to consult a specific knowledge base before answering, ensuring fact-based responses.',
        'To make the LLM run faster on any computer.',
        'To translate text from one language to another.'
      ],
      correctAnswer: 'To allow an LLM to consult a specific knowledge base before answering, ensuring fact-based responses.',
      explanation: 'RAG is designed to ground LLM responses in a specific, reliable set of data, preventing it from making things up (hallucinating).'
    },
    {
      questionText: 'What are the three core steps of the RAG process, in the correct order?',
      options: [
        'Generate, Augment, Retrieve',
        'Retrieve, Augment, Generate',
        'Augment, Retrieve, Generate',
        'Generate, Retrieve, Augment'
      ],
      correctAnswer: 'Retrieve, Augment, Generate',
      explanation: 'The process always starts by retrieving relevant documents, augmenting the prompt with them, and then generating the final answer.'
    },
    {
      questionText: 'In the \'Augment\' step of RAG, what exactly is being augmented?',
      options: [
        'The LLM\'s training data.',
        'The user\'s original question is combined with the retrieved context to create a new, more detailed prompt.',
        'The vector database.',
        'The final answer that the user sees.'
      ],
      correctAnswer: 'The user\'s original question is combined with the retrieved context to create a new, more detailed prompt.',
      explanation: 'The augmentation step creates a rich prompt that gives the LLM all the information it needs: the user\'s query and the factual context to answer it.'
    },
    {
      questionText: 'What is the most important instruction to include in a RAG system\'s final generator prompt?',
      options: [
        '\'Be as creative as possible.\'',
        '\'Answer the question based only on the provided context.\'',
        '\'Feel free to use your general knowledge.\'',
        '\'Make the answer as long as possible.\''
      ],
      correctAnswer: '\'Answer the question based only on the provided context.\'',
      explanation: 'This instruction is critical to prevent the LLM from ignoring the retrieved facts and falling back on its internal, potentially outdated or incorrect, knowledge.'
    },
    {
      questionText: 'Which of these is a common and powerful use case for RAG?',
      options: [
        'Generating random numbers.',
        'Creating abstract art.',
        'Building a customer support bot that answers questions based on a company\'s official help documents.',
        'Calculating complex mathematical equations.'
      ],
      correctAnswer: 'Building a customer support bot that answers questions based on a company\'s official help documents.',
      explanation: 'RAG is ideal for this because it ensures the bot gives answers that are consistent with a specific, trusted set of information, like help docs or product manuals.'
    }
  ];

  const { completeLesson } = useProgressStore();
  const ragPromptValidator = `You are an expert AI Prompt Engineer specializing in Retrieval-Augmented Generation (RAG). Your task is to review a user's generator prompt and provide constructive feedback.

When a user submits a prompt, follow these steps:
1.  **Analyze the Prompt**: Check for three key elements:
    *   Does it explicitly instruct the model to answer **based ONLY on the provided context**?
    *   Does it tell the model what to do if the answer **is not found** in the context (e.g., "If the answer is not in the context, say so.")?
    *   Does it use clear placeholders for the context and the user's question?

2.  **Provide Feedback**: Give 2-3 specific, actionable bullet points for improvement.

3.  **Offer an Improved Version**: Provide a clear, production-ready example of a strong RAG generator prompt. Here is a gold-standard example to use:
    "You are a helpful assistant. Use the following context to answer the user's question. Your answer should be based exclusively on the information provided. If the context does not contain the information needed to answer the question, state that you do not have enough information to provide an answer.\n\n**Context:**\n{context}\n\n**User Question:**\n{question}"

4.  **Encourage**: End with a positive and encouraging closing statement.`;

  const ragPromptChecklist: ChallengeChecklistItem[] = [
    { id: 'use-context', text: 'I have included a clear instruction to use only the provided context', completed: false },
    { id: 'not-found', text: 'I have specified what to do when the answer is not in the context', completed: false },
    { id: 'placeholders', text: 'I have included placeholders for context and question', completed: false },
    { id: 'feedback', text: 'I have received feedback on my RAG prompt', completed: false },
    { id: 'implemented', text: 'I have implemented improvements based on the feedback', completed: false }
  ];

  return (
    <LessonTemplate
      moduleNumber={7}
      lessonNumber={2}
      title="The Diligent Research Assistant"
      subtitle="Giving your LLM a library card to access external knowledge."
      quizQuestions={quizQuestions}
    >
      <div className="space-y-8 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white flex items-center">
            <Lightbulb className="w-10 h-10 mr-4 text-yellow-400" />
            Lesson 7.2: The Diligent Research Assistant
          </h1>
        </div>

        <p className="text-lg text-gray-300">
          An LLM is like a brilliant professor who knows a lot, but can't possibly remember everything. RAG gives your professor a diligent research assistant. Before answering a question, the assistant runs to the library (your knowledge base), finds the right facts, and puts them on the professor's desk. This ensures the final answer is accurate and based on specific, trusted information.
        </p>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">The Research Process: Retrieve, Augment, Generate</h2>
          <p className="text-gray-300 mb-4">The research assistant's job has three steps: find the right books (Retrieve), place them on the desk with key passages marked (Augment), so the professor can write the answer (Generate). This visualizer shows that process in action.</p>
          <RagFlowVisualizer />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">Where a Research Assistant Shines</h2>
          <p className="text-gray-300 mb-4">This technique is perfect for any task requiring fact-based answers from a specific set of documents, like a customer support bot that only uses official help docs, or an internal tool for querying company policies.</p>
          <RagUseCases />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">Your First Day as a Research Assistant</h2>
          <p className="text-gray-300 mb-4">Time to get hands-on. We've set up a small library for a fictional company. Your job is to ask the professor questions and watch your assistant retrieve the right documents to help them answer.</p>
          <RagPlayground />
        </section>

        <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
            <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
            Writing the Professor's Briefing Notes
          </h2>
          <p className="text-gray-300 mb-4">
            The final, most critical step is writing the briefing note for the professor. This note (the generator prompt) must instruct them to answer the user's question using *only* the research you've provided. This prevents them from guessing. Your task is to write that perfect briefing note.
          </p>
          <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
            <h3 className="font-semibold text-white mb-2">Your Task:</h3>
            <p className="text-gray-400 mb-3 text-sm">Engineer a generator prompt for a RAG system. Your prompt should instruct the model to answer a user's question based only on provided context. Use the chat window below to submit your prompt and get expert feedback.</p>
          {/* InlineChat for RAG prompt engineering exercise */}
          <InlineChat 
            moduleId="module-7.2-rag-prompt"
            maxAttempts={5}
            maxFollowUps={4}
            placeholder="Enter your RAG generator prompt here..."
            systemPrompt={ragPromptValidator}
            initialMessages={[
              {
                role: 'assistant' as const,
                content: 'Welcome to the RAG Prompt Engineering Challenge! I\'ll help you craft an effective prompt for a Retrieval-Augmented Generation system.\n\nYour prompt should instruct the model to answer questions using ONLY the provided context. Include placeholders like {context} and {question} where the actual content should go.\n\nTry writing your first version, and I\'ll provide feedback on how to improve it.'
              }
            ]}
            challengeChecklist={ragPromptChecklist}
          />
        </div>
      </section>

      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-7/7.1" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: The Master Dispatcher
        </Link>
        <Link 
          to="/instructions/module-7/7.3" 
          onClick={() => completeLesson(7, 2)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Fine-Tuning Models <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  </LessonTemplate>
  );
};

export default Lesson7_2;
