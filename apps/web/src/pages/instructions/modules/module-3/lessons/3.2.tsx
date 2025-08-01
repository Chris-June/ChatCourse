import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CotDiagram from '../../../components/CotDiagram';
import AutoDemosDiagram from '../../../components/AutoDemosDiagram';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';
import Accordion from '../../../components/Accordion';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

const zeroShotCoTChallengeChecklist = [
  { text: 'Pose a multi-step reasoning problem to the AI', completed: false },
  { text: 'Append the phrase "Let\'s think step by step" to your prompt', completed: false },
  { text: 'Confirm the AI outputs a step-by-step breakdown', completed: false },
  { text: 'Verify the final answer is logical and correct', completed: false },
];

const Lesson3_2: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What is the core principle of Chain-of-Thought (CoT) prompting?',
      options: [
        'To chain multiple prompts together in a single API call.',
        'To provide examples that include intermediate reasoning steps, showing the model \'how\' to think.',
        'To ask the AI a long chain of questions.',
        'To use the shortest prompt possible.'
      ],
      correctAnswer: 'To provide examples that include intermediate reasoning steps, showing the model \'how\' to think.',
      explanation: 'CoT works by explicitly showing the model the process of reasoning, which helps it tackle complex, multi-step problems more reliably.'
    },
    {
      questionText: 'In the lesson, how did CoT prompting succeed where few-shot prompting failed?',
      options: [
        'It used more examples.',
        'It used a bigger AI model.',
        'It broke down the problem by first adding the odd numbers and then stating the answer.',
        'It told the AI it was wrong.'
      ],
      correctAnswer: 'It broke down the problem by first adding the odd numbers and then stating the answer.',
      explanation: 'By demonstrating the reasoning path (summing the numbers first), the model could replicate the logic and arrive at the correct final answer.'
    },
    {
      questionText: 'What simple phrase is the key to enabling Zero-Shot CoT?',
      options: [
        '\'Please be smart.\'',
        '\'Give me the answer now.\'',
        '\'Let\'s think step by step.\'',
        '\'Show your work.\''
      ],
      correctAnswer: '`Let\'s think step by step.`',
      explanation: 'This specific phrase is remarkably effective at triggering a model to output its reasoning process before giving a final answer, even without prior examples.'
    },
    {
      questionText: 'When is Zero-Shot CoT most useful?',
      options: [
        'For simple tasks that don\'t require reasoning.',
        'When you have many examples to include in your prompt.',
        'When you need to solve a reasoning task but don\'t have examples to use for few-shot prompting.',
        'When you want the shortest possible answer from the AI.'
      ],
      correctAnswer: 'When you need to solve a reasoning task but don\'t have examples to use for few-shot prompting.',
      explanation: 'Its main advantage is enabling reasoning without the need to craft detailed examples, making it a powerful and efficient technique.'
    },
    {
      questionText: 'What problem does Automatic Chain-of-Thought (Auto-CoT) aim to solve?',
      options: [
        'It makes the AI write the initial question for you.',
        'It eliminates the need for prompts entirely.',
        'It automates the manual, time-consuming process of creating diverse and effective examples for CoT prompting.',
        'It automatically corrects your spelling.'
      ],
      correctAnswer: 'It automates the manual, time-consuming process of creating diverse and effective examples for CoT prompting.',
      explanation: 'Auto-CoT helps scale the creation of high-quality CoT demonstrations by using the LLM itself to generate the reasoning chains for a diverse set of questions.'
    }
  ];

  const { completeLesson } = useProgressStore();
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">3.2 Chain of Thought Prompting</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-3/3.1" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Advanced Techniques
          </Link>
          <Link 
            to="/instructions/module-3/3.3" 
            onClick={() => completeLesson(3, 2)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next: Prompting Exercises <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Chain-of-thought prompting is like having a conversation with someone who thinks out loud - instead of just giving you the answer, they walk you through their reasoning process. This technique transforms AI responses from mysterious "black box" answers into transparent, step-by-step solutions you can follow and verify.
      </p>
      <p className="text-lg text-gray-300 mt-4">
        Think of it as the difference between a math teacher who just writes "42" on the board versus one who shows every step of the calculation. The second approach not only gives you the answer but teaches you how to solve similar problems yourself.
      </p>

      <Accordion title="Chain-of-Thought Prompting" isInitiallyOpen>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm">
          <p className="font-mono text-gray-200">Prompt:</p>
          <div className="bg-gray-800 p-2 rounded mt-1">
            <code className="block whitespace-pre-wrap break-words font-mono text-gray-300">{`The odd numbers in this group add up to an even number: 4, 8, 9, 15, 12, 2, 1.\nA: Adding all the odd numbers (9, 15, 1) gives 25. The answer is False.\n\nThe odd numbers in this group add up to an even number: 17,  10, 19, 4, 8, 12, 24.\nA: Adding all the odd numbers (17, 19) gives 36. The answer is True.\n\nThe odd numbers in this group add up to an even number: 16,  11, 14, 4, 8, 13, 24.\nA: Adding all the odd numbers (11, 13) gives 24. The answer is True.\n\nThe odd numbers in this group add up to an even number: 17,  9, 10, 12, 13, 4, 2.\nA: Adding all the odd numbers (17, 9, 13) gives 39. The answer is False.\n\nThe odd numbers in this group add up to an even number: 15, 32, 5, 13, 82, 7, 1.\nA:`}</code>
          </div>
          <p className="font-mono text-gray-200 mt-3">Output:</p>
          <div className="bg-gray-800 p-2 rounded mt-1">
            <code className="block whitespace-pre-wrap break-words font-mono text-green-400">Adding all the odd numbers (15, 5, 13, 7, 1) gives 41. The answer is False.</code>
          </div>
        </div>
        <p className="text-gray-300 my-4">
          Notice how the AI transformed from a calculator that just outputs numbers into a tutor that explains their thinking. This is the power of chain-of-thought prompting - it doesn't just give answers, it reveals the reasoning path.
        </p>
        <p className="text-gray-300 my-4">
          <strong>Key insight:</strong> By showing the AI how to break down problems step-by-step, you're essentially teaching it a problem-solving strategy that it can then apply to new challenges.
        </p>
      </Accordion>

      <Accordion title="Zero-Shot CoT">
        <p className="text-gray-300 mb-4">
          Zero-shot CoT is like having a magic phrase that unlocks the AI's inner monologue. By simply adding "Let's think step by step," you're asking the AI to show its work - similar to how a teacher might say "explain your thinking" to a student.
        </p>
        <p className="text-gray-300 mb-4">
          This technique is particularly powerful because it works without any examples - it's like having a universal key that works on any reasoning lock.
        </p>
        <div className="my-4">
          <CotDiagram />
          <p className="text-center text-sm text-gray-500 mt-2">Image Source: Kojima et al. (2022)</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm">
          <p className="font-mono text-gray-200">Prompt:</p>
          <div className="bg-gray-800 p-2 rounded mt-1">
            <code className="block whitespace-pre-wrap break-words font-mono text-gray-300">{`I went to the market and bought 10 apples. I gave 2 apples to the neighbor and 2 to the repairman. I then bought 5 more apples and ate 1. How many apples did I remain with?\n\nLet's think step by step.`}</code>
          </div>
          <p className="font-mono text-gray-200 mt-3">Output:</p>
          <div className="bg-gray-800 p-2 rounded mt-1">
            <code className="block whitespace-pre-wrap break-words font-mono text-green-400">{`First, you started with 10 apples.\nYou gave away 2 apples to the neighbor and 2 to the repairman, so you had 6 apples left.\nThen you bought 5 more apples, so now you had 11 apples.\nFinally, you ate 1 apple, so you would remain with 10 apples.`}</code>
          </div>
        </div>
        <p className="text-gray-300 mt-4">
          The beauty of this approach lies in its simplicity - one phrase transforms any prompt into a reasoning tutorial. It's like discovering that saying "show your work" works across languages, subjects, and complexity levels.
        </p>
        <p className="text-gray-300 mt-2">
          This technique shines when you're exploring new territory - when you don't have examples to guide the AI, you can still guide its thinking process.
        </p>

        <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border-2 border-dashed border-blue-500/50">
          <h3 className="font-semibold text-white mb-2">Your Turn: Zero-Shot CoT Challenge</h3>
          <p className="text-gray-400 mb-4">Experiment with the magic phrase "Let's think step by step." Try it on different types of problems - from simple arithmetic to complex logic puzzles. Notice how the AI's response changes when you include this trigger.</p>
          <p className="text-gray-400 mb-4">
            <strong>Pro tips for experimentation:</strong>
            <br />• Try the same problem with and without the phrase to see the difference
            <br />• Test it on various problem types (math, logic, decision-making)
            <br />• Observe how the AI structures its step-by-step reasoning
            <br />• Notice when this technique works best vs. when it falls short
          </p>
          <InlineChat 
            moduleId="module-3.2-zeroshot-cot"
            maxAttempts={5}
            maxFollowUps={3}
            placeholder="Enter your query here based on what we have learned in this section..."
            systemPrompt="You are a helpful AI assistant. When the user asks a question followed by 'Let's think step by step', break down your response into clear, logical steps. Show your reasoning process before arriving at the final answer. If the user doesn't include the trigger phrase, you may suggest they try adding it to see your step-by-step reasoning."
            challengeChecklist={zeroShotCoTChallengeChecklist}
          />
        </div>
      </Accordion>

      <Accordion title="Automatic Chain-of-Thought (Auto-CoT)">
        <p className="text-gray-300 mb-4">
          Creating effective CoT examples manually is like being a teacher who has to prepare detailed lesson plans for every possible question - it's time-consuming and you might miss important variations. Auto-CoT is like having an AI teaching assistant that automatically generates diverse, step-by-step solutions for you.
        </p>
        <p className="text-gray-300 mb-4">
          Think of it as the difference between manually writing 50 different math problems with solutions versus having an AI generate 50 varied problems, each with clear step-by-step explanations. The AI approach ensures diversity and saves massive amounts of time.
        </p>
        <p className="text-gray-300 mb-4">
          The key insight: by automatically generating reasoning chains across diverse problem types, Auto-CoT creates a comprehensive "reasoning toolkit" that the AI can draw from when tackling new challenges.
        </p>
        <AutoDemosDiagram />
        <p className="text-center text-sm text-gray-500 mt-2">Image Source: Zhang et al. (2022)</p>
      </Accordion>

      {/* Validation Quiz */}
      <section className="mt-8">
        <ModuleQuizzes questions={quizQuestions} />
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-3/3.1" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Shot Prompting
        </Link>
        <Link 
          to="/instructions/module-3/3.3" 
          onClick={() => completeLesson(3, 2)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Structuring Outputs <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson3_2;
