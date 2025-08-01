import React from 'react';
import { Lightbulb, Check } from 'lucide-react';
import LessonHeader from '../../../../../components/layouts/LessonHeader';
import LessonFooter from '../../../../../components/layouts/LessonFooter';
import { useProgressStore } from '../../../../../store/progressStore';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

const Lesson1_5: React.FC = () => {
  const { completeLesson } = useProgressStore();

  const frameworkComponents = [
    { letter: 'I', name: 'Intent', description: 'The core goal. What do you want the AI to do?', example: 'Write a summary of the provided article.' },
    { letter: 'N', name: 'Nuance', description: 'Specific details and constraints. What to include or avoid.', example: 'The summary must be under 150 words and avoid technical jargon.' },
    { letter: 'S', name: 'Style', description: 'The desired tone and voice.', example: 'Use a professional and authoritative tone.' },
    { letter: 'Y', name: 'You as...', description: 'The persona or role for the AI.', example: 'Act as a senior editor for a scientific journal.' },
    { letter: 'N', name: 'Narrative Format', description: 'The structure of the output.', example: 'Format the output as a single paragraph.' },
    { letter: 'C', name: 'Context', description: 'Background information the AI needs.', example: 'The article is about quantum computing and the target audience is high school students.' },
  ];

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
          A Structure for Success
        </h2>
        <p className="text-gray-300 mb-4">
          While a simple question can get a simple answer, complex tasks require a more structured approach. A well-structured prompt is the difference between a generic response and a masterpiece tailored perfectly to your needs.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-blue-500/50">
          <p className="text-lg text-center font-semibold text-blue-200">
            The I.N.S.Y.N.C. framework is a powerful, memorable system for building high-quality prompts by breaking them down into six clear components.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {frameworkComponents.map((item, index) => (
          <div key={index} className="bg-gray-800 p-5 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold text-blue-300"><span className="text-4xl font-black text-blue-500 mr-2">{item.letter}</span> - {item.name}</h3>
            <p className="text-gray-400 mt-1 ml-12">{item.description}</p>
            <p className="text-sm text-gray-500 mt-2 ml-12 italic"><strong>Example:</strong> "{item.example}"</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-green-300">Putting It All Together</h2>
        <p className="text-gray-300 mb-4">
          When you combine these elements, you create a comprehensive set of instructions that leaves no room for ambiguity. Let's see an example.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg">
          <h4 className="font-bold text-lg text-blue-300 mb-2">Example Prompt:</h4>
          <code className="block whitespace-pre-wrap bg-gray-950 p-4 rounded-md text-gray-300">
            [YOU AS...]: Act as an expert travel blogger.<br/>
            [INTENT]: Write a short, exciting paragraph for a blog post about visiting Tokyo.<br/>
            [STYLE]: Use an enthusiastic and adventurous tone.<br/>
            [NUANCE]: Mention the contrast between modern technology and ancient temples. Do not mention food.<br/>
            [NARRATIVE FORMAT]: A single paragraph, approximately 100 words.<br/>
            [CONTEXT]: The blog post is for young adults aged 18-25 who are interested in budget travel.
          </code>
        </div>
      </div>

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
