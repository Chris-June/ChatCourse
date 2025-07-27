import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';
import RagFlowVisualizer from '../../../components/RagFlowVisualizer';
import RagUseCases from '../../../components/RagUseCases';
import RagPlayground from '../../../components/RagPlayground';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

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

  const ragPromptChecklist: Array<{text: string, completed: boolean}> = [
    { text: 'I have included a clear instruction to use only the provided context', completed: false },
    { text: 'I have specified what to do when the answer is not in the context', completed: false },
    { text: 'I have included placeholders for context and question', completed: false },
    { text: 'I have received feedback on my RAG prompt', completed: false },
    { text: 'I have implemented improvements based on the feedback', completed: false }
  ];

  return (
    <div className="space-y-12 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">7.2 Understanding RAG</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-7/7.1" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Advanced Function Calling
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

      <section>
        <p className="text-lg text-gray-300">
          Imagine giving an AI an "open-book exam" instead of a closed-book one. That's the core idea behind **Retrieval-Augmented Generation (RAG)**. It's a powerful technique that allows a Large Language Model (LLM) to consult a specific, up-to-date knowledge base *before* answering a question. This prevents the model from making things up ("hallucinating") and ensures its answers are grounded in facts, not just its training data.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">How RAG Works: An Animated Guide</h2>
        <p className="text-gray-300 mb-4">The RAG process has three core steps: Retrieve, Augment, and Generate. Use the visualizer below to see how a user's query is transformed into a fact-based answer.</p>
        <RagFlowVisualizer />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Common Use Cases for RAG</h2>
        <p className="text-gray-300 mb-4">RAG is incredibly versatile. It's used to build everything from customer support bots to personal assistants. Explore some of the common applications below.</p>
        <RagUseCases />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Hands-On: The RAG Playground</h2>
        <p className="text-gray-300 mb-4">Now it's your turn. We've set up a mini-RAG system with a small knowledge base about a fictional company. Ask it questions to see the retrieval and generation process for yourself.</p>
        <RagPlayground />
      </section>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-yellow-400" />
          Final Challenge: Engineer the Generator Prompt
        </h2>
        <p className="text-gray-300 mb-4">
          The final prompt sent to the LLM is the most important part of a RAG system. It must clearly instruct the model to use the provided context and nothing else. Your task is to design this prompt.
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

      {/* Validation Quiz */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Check Your Understanding</h2>
        <ModuleQuizzes questions={quizQuestions} />
      </section>

      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-7/7.1" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Advanced Function Calling
        </Link>
        <Link 
          to="/instructions/module-7/7.3" 
          onClick={() => completeLesson(7, 2)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Model Fine-Tuning <ChevronRight className="w-5 h-5 ml-2" />
          Next: Fine-Tuning Models <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson7_2;
