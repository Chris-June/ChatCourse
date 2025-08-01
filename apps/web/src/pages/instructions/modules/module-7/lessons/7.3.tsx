import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, GitCompareArrows } from 'lucide-react';
import { useProgressStore } from '@/store/progressStore';
import FineTuningDataFormatter from '@/pages/instructions/components/FineTuningDataFormatter';
import FineTuningCostCalculator from '@/pages/instructions/components/FineTuningCostCalculator';
import StrategyQuiz from '@/pages/instructions/components/StrategyQuiz';
import ModuleQuizzes from '@/components/ModuleQuizzes/ModuleQuizzes';
import LessonTemplate from '@/components/layouts/LessonTemplate';

export default function Lesson7_3() {
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

  const { completeLesson } = useProgressStore();

  return (
    <LessonTemplate
      moduleNumber={7}
      lessonNumber={3}
      title="Training a Method Actor"
      subtitle="Teaching your LLM a new personality, style, or skill."
      quizQuestions={quizQuestions}
    >
      <div className="space-y-12 p-4 md:p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white flex items-center">
            <GitCompareArrows className="w-10 h-10 mr-4 text-rose-400" />
            Lesson 7.3: Training a Method Actor
          </h1>
        </div>

        <section>
          <p className="text-lg text-gray-300">
            RAG gives an LLM a script. Fine-tuning trains it to become a method actor. You're not just giving it lines to read; you're teaching it to embody a new personality, style, or skill by having it rehearse hundreds of specific scenes. This is how you create an AI with a truly unique and consistent character.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">1. Writing the Script (Preparing Data)</h2>
          <p className="text-gray-300 mb-4">A method actor needs a script. Your fine-tuning dataset is that script, composed of many 'scenes' (prompt/completion pairs). The quality of this script determines the quality of the final performance. Use the formatter below to see how a conversation is turned into a scene for the actor to rehearse.</p>
          <FineTuningDataFormatter />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">2. The Cost of Immersive Training</h2>
          <p className="text-gray-300 mb-4">Hiring a method actor for a lead role is expensive. Fine-tuning is too. It costs time and money, and the results depend on the quality of the script and the length of the rehearsal (epochs). This calculator gives you a sense of the investment required.</p>
          <FineTuningCostCalculator />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center"><GitCompareArrows className="w-7 h-7 mr-3" />3. Casting Call: RAG vs. Fine-Tuning</h2>
          <p className="text-gray-300 mb-4">Do you need an actor who can read any script you hand them (RAG for knowledge)? Or one who deeply embodies a specific character (Fine-Tuning for behavior)? Knowing which to choose is a critical skill. Test your casting instincts with the scenarios below.</p>
          <StrategyQuiz />
        </section>

        {/* Validation Quiz */}
        <section className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">Check Your Understanding</h2>
          <ModuleQuizzes questions={quizQuestions} />
        </section>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Link 
            to="/instructions/module-7/7.2" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous: The Diligent Research Assistant
          </Link>
          <Link 
            to="/instructions"
            onClick={() => completeLesson(7, 3)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
          >
            Finish Course & Review Progress <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </LessonTemplate>
  );
}
