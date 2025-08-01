import React from 'react';
import { Wrench } from 'lucide-react';
import LessonHeader from '../../../../../components/layouts/LessonHeader';
import LessonFooter from '../../../../../components/layouts/LessonFooter';
import { useProgressStore } from '../../../../../store/progressStore';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';
import InsyncWorkshop from '../../../components/InsyncWorkshop';

const Lesson1_6: React.FC = () => {
  const { completeLesson } = useProgressStore();

  const quizQuestions = [
    {
      questionText: 'What is the main purpose of the I.N.S.Y.N.C. workshop?',
      options: [
        'To memorize the acronym.',
        'To passively read about advanced theories.',
        'To actively practice building a detailed prompt using the framework.',
        'To get a perfect score on the first try.'
      ],
      correctAnswer: 'To actively practice building a detailed prompt using the framework.',
      explanation: 'Workshops are for hands-on practice. The goal is to apply the I.N.S.Y.N.C. framework to a real-world scenario to build practical skills.'
    },
    {
      questionText: 'If your AI-generated text sounds too generic, which I.N.S.Y.N.C. element should you probably improve?',
      options: [
        'Intent',
        'Nuance and Style',
        'Narrative Format',
        'Context'
      ],
      correctAnswer: 'Nuance and Style',
      explanation: 'Nuance adds the specific details that prevent generic responses, while Style defines the tone and personality. Both are key to getting unique, high-quality output.'
    },
    {
        questionText: 'When you define the AI\'s persona using "You as...", what are you influencing?',
        options: [
          'Only the first sentence of the response.',
          'The AI\'s knowledge base, tone, and how it frames the information.',
          'The length of the response.',
          'Whether the AI uses bullet points or paragraphs.'
        ],
        correctAnswer: 'The AI\'s knowledge base, tone, and how it frames the information.',
        explanation: 'Assigning a role is a powerful technique that primes the AI to adopt a specific viewpoint and communication style, making the response more consistent and appropriate for your needs.'
      }
  ];

  return (
    <div className="space-y-8 p-4 md:p-6 text-gray-200">
      <LessonHeader 
        title="1.6: Workshop: Building with I.N.S.Y.N.C."
        subtitle="Put your knowledge to the test with a hands-on challenge."
      />

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-green-300 flex items-center">
          <Wrench className="w-7 h-7 mr-3 text-green-400" />
          Time to Get Your Hands Dirty
        </h2>
        <p className="text-gray-300 mb-4">
          Theory is great, but practice is where skills are built. In this workshop, you'll use the I.N.S.Y.N.C. framework to tackle a practical challenge. There's no single "right" answer; the goal is to experiment and see how each element of the framework changes the AI's output.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-green-500/50">
          <h3 className="text-lg font-semibold text-green-200">Your Challenge: The Travel Itinerary</h3>
          <p className="text-gray-300 mt-2">
            Your task is to generate a <strong>3-day travel itinerary for a weekend trip to Tokyo</strong>. Get ready to craft a prompt and see the I.N.S.Y.N.C. framework in action.
          </p>
        </div>
      </div>

      <InsyncWorkshop />

      <ModuleQuizzes questions={quizQuestions} />

      <LessonFooter 
        prevLessonPath="/instructions/module-1/1.5"
        prevLessonTitle="1.5: The I.N.S.Y.N.C. Framework"
        nextLessonPath="/instructions/module-1/1.7"
        nextLessonTitle="1.7: Advanced Prompting"
        onNextClick={() => completeLesson(1, 6)}
      />
    </div>
  );
};

export default Lesson1_6;
