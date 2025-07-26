import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, GitCompareArrows } from 'lucide-react';
import { useProgressStore } from '../../../../../store/progressStore';
import FineTuningDataFormatter from '../../../components/FineTuningDataFormatter';
import FineTuningCostCalculator from '../../../components/FineTuningCostCalculator';
import StrategyQuiz from '../../../components/StrategyQuiz';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

const Lesson7_3: React.FC = () => {
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
    <div className="space-y-12 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">7.3 An Intro to Fine-Tuning</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-7/7.2" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous: RAG Systems
          </Link>
          <Link 
            to="/instructions/module-8"
            onClick={() => completeLesson(7, 3)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next Module: Responsible AI <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <section>
        <p className="text-lg text-gray-300">
          If RAG is like giving a model an "open-book exam," then **Fine-Tuning** is like sending it to a specialized school. You're not just giving it documents to read; you're fundamentally changing its behavior by training it on a new dataset of examples. This is how you teach a model a new skill, style, or personality.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Step 1: Preparing the Data</h2>
        <p className="text-gray-300 mb-4">The most critical step in fine-tuning is preparing a high-quality dataset. This data must be structured in a specific format, usually prompt-completion pairs in JSONL. Use the interactive formatter below to see how a conversation is converted into a single training example.</p>
        <FineTuningDataFormatter />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Step 2: Considering the Trade-Offs</h2>
        <p className="text-gray-300 mb-4">Fine-tuning isn't free. It costs time and money, and the benefits depend heavily on your dataset size and training duration (epochs). The calculator below provides a simplified estimate of these trade-offs.</p>
        <FineTuningCostCalculator />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center"><GitCompareArrows className="w-7 h-7 mr-3" />Step 3: Making the Strategic Choice</h2>
        <p className="text-gray-300 mb-4">Knowing *when* to fine-tune is as important as knowing how. It's a powerful tool, but not always the right one. RAG is better for knowledge retrieval, while fine-tuning is better for teaching behavior. Test your understanding with the scenarios below.</p>
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
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: RAG Systems
        </Link>
        <Link 
          to="/instructions/module-8"
          onClick={() => completeLesson(7, 3)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next Module: Responsible AI <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson7_3;
