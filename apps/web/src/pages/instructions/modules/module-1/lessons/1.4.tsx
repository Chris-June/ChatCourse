import React from 'react';
import { Lightbulb, ThumbsUp, ThumbsDown } from 'lucide-react';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import InlineChat from '../../../../../components/InlineChat';
import KeyTakeaways from '../../../components/KeyTakeaways';

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
    },
    {
      questionText: 'What is a key benefit of providing a persona (e.g., "You are a helpful assistant") in a prompt?',
      options: [
        'It makes the AI respond in a different language.',
        'It helps shape the AI\'s tone, style, and expertise for the response.',
        'It is a required part of every prompt.',
        'It makes the AI work faster.'
      ],
      correctAnswer: 'It helps shape the AI\'s tone, style, and expertise for the response.',
      explanation: 'Giving the AI a role or persona is a powerful way to guide its behavior. It tells the model what kind of "hat" to wear, which influences its word choices and how it presents information.'
    },
    {
      questionText: 'If your first prompt doesn\'t give you the desired output, what is the best next step?',
      options: [
        'Assume the AI is broken and try again later.',
        'Ask the exact same question again, but louder (in all caps).',
        'Iterate on your prompt by adding more specific details, context, or examples.',
        'Delete your account.'
      ],
      correctAnswer: 'Iterate on your prompt by adding more specific details, context, or examples.',
      explanation: 'Prompting is an iterative process. The best results often come from refining your initial prompt with more clarity and context based on the AI\'s first attempt.'
    },
    {
      questionText: 'Which of these prompts is most likely to produce a high-quality response?',
      options: [
        'Tell me about dogs.',
        'Write a paragraph about why dogs make good pets.',
        'Write a short, friendly blog post (around 200 words) explaining three key benefits of dog ownership for first-time pet owners.',
        'dogs'
      ],
      correctAnswer: 'Write a short, friendly blog post (around 200 words) explaining three key benefits of dog ownership for first-time pet owners.',
      explanation: 'This prompt is specific about the intent (write a blog post), format (short, ~200 words), tone (friendly), content (three key benefits), and audience (first-time owners). This level of detail makes a good output highly probable.'
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

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">See It In Action: More Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Example 1: Vague vs. Specific Topic */}
            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-red-300 flex items-center mb-3"><ThumbsDown className="mr-2"/>Vague: General Topic</h3>
              <p className="text-gray-300 mb-4">This prompt is too broad, leading to a generic, unfocused answer.</p>
              <InlineChat 
                moduleId="lesson-1.4-bad-prompt-1"
                systemPrompt="You are a helpful AI assistant."
                initialMessages={[{ role: 'user', content: 'Tell me about space.' }]}
              />
            </div>
            <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-green-300 flex items-center mb-3"><ThumbsUp className="mr-2"/>Specific: Focused Topic</h3>
              <p className="text-gray-300 mb-4">Adds audience, format, and topic constraints for a tailored response.</p>
              <InlineChat 
                moduleId="lesson-1.4-good-prompt-1"
                systemPrompt="You are a science communicator."
                initialMessages={[{ role: 'user', content: 'Explain the concept of a black hole to a 12-year-old in three simple paragraphs.' }]}
              />
            </div>

            {/* Example 2: Vague vs. Specific Dinner Planning */}
            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-red-300 flex items-center mb-3"><ThumbsDown className="mr-2"/>Vague: Dinner Idea</h3>
              <p className="text-gray-300 mb-4">The AI has no idea about your preferences, ingredients, or time.</p>
              <InlineChat 
                moduleId="lesson-1.4-bad-prompt-2"
                systemPrompt="You are a helpful meal planner."
                initialMessages={[{ role: 'user', content: 'What should I make for dinner?' }]}
              />
            </div>
            <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-green-300 flex items-center mb-3"><ThumbsUp className="mr-2"/>Specific: Dinner Idea</h3>
              <p className="text-gray-300 mb-4">Includes dietary needs, ingredients, and time available for a more helpful suggestion.</p>
              <InlineChat 
                moduleId="lesson-1.4-good-prompt-2"
                systemPrompt="You are a creative and practical home cook assistant."
                initialMessages={[{ role: 'user', content: 'Give me a quick vegetarian dinner idea I can make in under 30 minutes with chickpeas, spinach, and rice. I like mildly spicy food and have a stovetop and microwave available.' }]}
              />
            </div>

            {/* Example 3: Ambiguous vs. Clear Persona */}
            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-red-300 flex items-center mb-3"><ThumbsDown className="mr-2"/>Vague: Email Request</h3>
              <p className="text-gray-300 mb-4">The AI lacks the sender, recipient, and context to write a useful email.</p>
              <InlineChat 
                moduleId="lesson-1.4-bad-prompt-3"
                systemPrompt="You are a helpful assistant."
                initialMessages={[{ role: 'user', content: 'Write an email about the deadline.' }]}
              />
            </div>
            <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-green-300 flex items-center mb-3"><ThumbsUp className="mr-2"/>Specific: Email Request</h3>
              <p className="text-gray-300 mb-4">Provides a clear persona, audience, and key message points.</p>
              <InlineChat 
                moduleId="lesson-1.4-good-prompt-3"
                systemPrompt="You are a project manager."
                initialMessages={[{ role: 'user', content: 'Write a professional email to my dev team announcing the project deadline has been moved to August 15th. Express confidence and ask them to flag blockers by EOD.' }]}
              />
            </div>

             {/* Example 4: Missing Context vs. Context-Rich */}
            <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-red-300 flex items-center mb-3"><ThumbsDown className="mr-2"/>Vague: Summarization</h3>
              <p className="text-gray-300 mb-4">The AI doesn't know what to summarize or what's important.</p>
              <InlineChat 
                moduleId="lesson-1.4-bad-prompt-4"
                systemPrompt="You are a helpful assistant."
                initialMessages={[{ role: 'user', content: 'Summarize the report for me.' }]}
              />
            </div>
            <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-green-300 flex items-center mb-3"><ThumbsUp className="mr-2"/>Specific: Summarization</h3>
              <p className="text-gray-300 mb-4">Provides the text and specifies the desired focus of the summary.</p>
              <InlineChat 
                moduleId="lesson-1.4-good-prompt-4"
                systemPrompt="You are an expert business analyst."
                initialMessages={[{ role: 'user', content: 'Summarize this sales report, focusing on key growth areas and potential risks: [Paste report text here]' }]}
              />
            </div>

          </div>
        </div>

       

        <KeyTakeaways
            points={[
              "A prompt is the instruction, question, or input you give to an AI.",
              "Clear and specific prompts lead to better quality responses.",
              "Providing a persona helps shape the AI's tone, style, and expertise.",
              "Prompt design is crucial for getting the AI to perform tasks effectively.",
          ]}
        />

        
      </div>
    </LessonTemplate>
  );
};

export default Lesson1_4;
