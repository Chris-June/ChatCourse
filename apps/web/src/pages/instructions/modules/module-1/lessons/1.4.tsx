import React from 'react';
import { Lightbulb, Check, ThumbsUp, ThumbsDown } from 'lucide-react';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';

const Lesson1_4: React.FC = () => {
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
    <LessonTemplate
      moduleNumber={1}
      lessonNumber={4}
      title="1.4: The Art of the Ask (Intro to Prompting)"
      subtitle="How to talk to an AI to get what you want."
      quizQuestions={quizQuestions}
    >
      <div className="space-y-8 text-gray-200">
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
      </div>
    </LessonTemplate>
  );
};

export default Lesson1_4;
