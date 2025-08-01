import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Lightbulb, Check, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useProgressStore } from '../../../../../store/progressStore';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

const Lesson1_4: React.FC = () => {
  const { completeLesson } = useProgressStore();

  const quizQuestions = [
    {
      questionText: 'In the context of AI, what is a "prompt"?',
      options: [
        'A type of AI model.',
        'The instruction, question, or input you give to an AI.',
        'The AI\'s final answer.',
        'A button in the user interface.'
      ],
      correctAnswer: 'The instruction, question, or input you give to an AI.',
      explanation: 'A prompt is simply the text you provide to the AI to get it to perform a task. It\'s the starting point and the most important tool you have for guiding the AI.'
    },
    {
      questionText: 'Why is a clear and specific prompt better than a vague one?',
      options: [
        'It makes the AI respond faster.',
        'Vague prompts can confuse the AI, leading to generic, incorrect, or irrelevant answers.',
        'Specific prompts use fewer tokens and cost less.',
        'It\'s the only way to get the AI to write code.'
      ],
      correctAnswer: 'Vague prompts can confuse the AI, leading to generic, incorrect, or irrelevant answers.',
      explanation: 'The AI relies entirely on your prompt for direction. A vague prompt is like giving a chef a recipe with missing steps; the result will be unpredictable. Specificity leads to quality.'
    }
  ];

  return (
    <div className="space-y-8 p-4 md:p-6 text-gray-200">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">1.4: The Art of the Ask (Intro to Prompting)</h1>
        <div className="flex items-center space-x-4">
          <Link to="/instructions/module-1/1.3" className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link to="/instructions/module-1/1.5" onClick={() => completeLesson(1, 4)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
            Next <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Lightbulb className="w-7 h-7 mr-3 text-blue-400" />
          Your Conversation with AI
        </h2>
        <p className="text-gray-300 mb-4">
          You now know that AI predicts the next word and that it can sometimes make things up (hallucinate). So, how do we control it? The answer is the <strong>prompt</strong>.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-blue-500/50">
          <p className="text-lg text-center font-semibold text-blue-200">
            A prompt is the instruction you give to an AI. It's how you ask questions, give commands, and provide context.
          </p>
        </div>
        <p className="text-gray-300 mt-4">
          Think of the AI as an incredibly knowledgeable and skilled, but very literal, new employee. It can do almost anything you ask, but it won't do anything *until* you ask. It has no common sense and relies 100% on your instructions. The quality of your prompt directly determines the quality of its response.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-red-300 flex items-center mb-3"><ThumbsDown className="mr-2"/>A Bad Prompt</h3>
          <p className="text-gray-400 italic bg-gray-800 p-3 rounded-md">"Tell me about space."</p>
          <p className="text-gray-300 mt-3">This is too vague. 'Space' is a huge topic. The AI doesn't know if you want to know about planets, stars, black holes, the history of space travel, or something else. It will likely give a very generic, high-level summary.</p>
        </div>
        <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-green-300 flex items-center mb-3"><ThumbsUp className="mr-2"/>A Good Prompt</h3>
          <p className="text-gray-400 italic bg-gray-800 p-3 rounded-md">"Explain the concept of a black hole to a 12-year-old in three simple paragraphs."</p>
          <p className="text-gray-300 mt-3">This is specific. It tells the AI the exact topic (black holes), the target audience (a 12-year-old), and the desired format (three simple paragraphs). This clarity will lead to a much better, more useful response.</p>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-green-300">Key Takeaways</h2>
        <ul className="space-y-3 text-gray-300">
          <li className="flex items-start">
            <Check className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
            <span><strong>Garbage In, Garbage Out:</strong> The quality of the AI's output is directly tied to the quality of your input.</span>
          </li>
          <li className="flex items-start">
            <Check className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
            <span><strong>Be Specific:</strong> Always provide as much clear context and detail as you can. Tell the AI what you want, who the audience is, and what format you need.</span>
          </li>
           <li className="flex items-start">
            <Check className="w-6 h-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
            <span><strong>Prompting is a Skill:</strong> Getting good at prompting is the single most important skill for using AI effectively. It's a skill you'll build throughout this course.</span>
          </li>
        </ul>
      </div>

      <ModuleQuizzes questions={quizQuestions} />

      <div className="flex justify-between mt-8">
        <Link to="/instructions/module-1/1.3" className="flex items-center px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span>1.3: Hallucinations</span>
        </Link>
        <Link to="/instructions/module-1/1.5" onClick={() => completeLesson(1, 4)} className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
          <span>Next: 1.5: The I.N.S.Y.N.C. Framework</span>
          <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson1_4;
