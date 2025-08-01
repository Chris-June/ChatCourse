import React from 'react';
import { Lightbulb, Check } from 'lucide-react';
import LessonHeader from '../../../../../components/layouts/LessonHeader';
import LessonFooter from '../../../../../components/layouts/LessonFooter';
import { useProgressStore } from '../../../../../store/progressStore';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';
import PromptCritiquer from '../../../components/PromptCritiquer';

const Lesson1_5: React.FC = () => {
  const { completeLesson } = useProgressStore();

  

  const quizQuestions = [
    {
      questionText: 'Which I.N.S.Y.N.C. element defines the persona or role for the AI?',
      options: ['Style', 'Intent', 'You as...', 'Context'],
      correctAnswer: 'You as...',
      explanation: 'The \'You as...\' element is where you tell the AI who to be, like \'Act as an expert historian\' or \'You are a friendly tour guide\'.'
    },
    {
      questionText: 'Telling the AI to format its response as a JSON object falls under which category?',
      options: ['Nuance', 'Narrative Format', 'Style', 'Intent'],
      correctAnswer: 'Narrative Format',
      explanation: 'Narrative Format dictates the structure of the output, whether it\'s a list, table, JSON, or a simple paragraph.'
    },
    {
      questionText: 'Why is providing Context important in a prompt?',
      options: [
        'It makes the prompt longer.',
        'It gives the AI the necessary background information to complete the task accurately.',
        'It tells the AI what tone to use.',
        'It\'s only for creative writing prompts.'
      ],
      correctAnswer: 'It gives the AI the necessary background information to complete the task accurately.',
      explanation: 'Without proper context, the AI is guessing. Providing background ensures the response is relevant and tailored to your specific situation.'
    }
  ];

  return (
    <div className="space-y-8 p-4 md:p-6 text-gray-200">
      <LessonHeader 
        title="1.5: The I.N.S.Y.N.C. Framework"
        subtitle="A powerful, memorable system for building high-quality prompts."
      />

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-blue-400" />
          From Theory to Practice
        </h2>
        <p className="text-gray-300 mb-4">
          You've seen the components of the I.N.S.Y.N.C. framework. Now, let's put your knowledge to the test. A great way to master this framework is not just by building good prompts, but by recognizing what's missing from bad ones.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-blue-500/50">
          <p className="text-lg text-center font-semibold text-blue-200">
            Below is an interactive challenge where you'll act as a prompt engineer. Your job is to critique a vague prompt and identify the missing I.N.S.Y.N.C. elements.
          </p>
        </div>
      </div>

      <PromptCritiquer />

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-green-300">Key Takeaways</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start">
            <Check className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
            <span><strong>Structure is Key:</strong> Using a framework like I.N.S.Y.N.C. helps you remember to include all the necessary details for a great response.</span>
          </li>
          <li className="flex items-start">
            <Check className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
            <span><strong>Each Element Matters:</strong> Leaving out even one element, like Context or Style, can dramatically change the outcome.</span>
          </li>
           <li className="flex items-start">
            <Check className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
            <span><strong>Flexible Framework:</strong> You don't always have to write your prompt in this exact order, but using it as a checklist ensures you cover all your bases.</span>
          </li>
        </ul>
      </div>

      <ModuleQuizzes questions={quizQuestions} />

      <LessonFooter 
        prevLessonPath="/instructions/module-1/1.4"
        prevLessonTitle="1.4: The Art of the Ask (Intro to Prompting)"
        nextLessonPath="/instructions/module-1/1.6"
        nextLessonTitle="1.6: Workshop: Building with I.N.S.Y.N.C."
        onNextClick={() => completeLesson(1, 5)}
      />
    </div>
  );
};

export default Lesson1_5;
