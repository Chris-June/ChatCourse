import React from 'react';
import CotDiagram from '../../../components/CotDiagram';
import AutoDemosDiagram from '../../../components/AutoDemosDiagram';
import InlineChat from '../../../../../components/InlineChat';
import Accordion from '../../../components/Accordion';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';

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

  return (
    <LessonTemplate
      moduleNumber={3}
      lessonNumber={2}
      title="3.2: Chain-of-Thought Prompting"
      subtitle="Teaching AI to 'think' step by step."
      quizQuestions={quizQuestions}
    >
      <div className="space-y-8 text-gray-300">
        <CotDiagram />

        <Accordion 
          title="Chain-of-Thought (CoT) Prompting"
          isInitiallyOpen
        >
          <p className="text-gray-300 mb-4">
            Chain-of-Thought (CoT) prompting is like showing a student how to solve a math problem by writing out every step, instead of just giving them the final answer. By demonstrating the reasoning process, you teach the AI not just *what* to answer, but *how* to think. This is especially powerful for complex problems that require multiple logical steps.
          </p>
          <p className="text-gray-300 mb-4">
            Let's revisit the reasoning problem from the previous lesson that few-shot prompting failed to solve. By simply adding the intermediate reasoning steps to our example, we can guide the model to the correct answer:
          </p>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm">
            <p className="font-mono text-gray-200">Prompt:</p>
            <div className="bg-gray-800 p-2 rounded mt-1">
              <code className="block whitespace-pre-wrap break-words font-mono text-gray-300">{`The odd numbers in this group add up to an even number: 15, 32, 5, 13, 82, 7, 1.\nA: The odd numbers are 15, 5, 13, 7, 1. The sum is 41. 41 is an odd number. The answer is False.`}</code>
            </div>
            <p className="font-mono text-gray-200 mt-3">Output:</p>
            <div className="bg-gray-800 p-2 rounded mt-1">
              <code className="block whitespace-pre-wrap break-words font-mono text-green-400">The odd numbers in this group are 15, 5, 13, 7, 1. Adding them up is 41. 41 is an odd number. The answer is False.</code>
            </div>
          </div>
          <p className="text-gray-300 my-4">
            Success! By explicitly showing the model the *chain of thought* (identifying odd numbers, summing them, checking if the sum is odd/even), it successfully replicated the reasoning process.
          </p>
        </Accordion>

        <Accordion title="Zero-Shot CoT">
          <p className="text-gray-300 mb-4">
            What if you don't have examples to show? Zero-Shot CoT is a remarkable discovery where you can trigger the same step-by-step reasoning by simply adding a specific phrase to your prompt: "Let's think step by step."
          </p>
          <p className="text-gray-300 mb-4">
            This simple instruction acts as a universal key, unlocking the model's ability to break down a problem and explain its reasoning, even for tasks it has never seen before.
          </p>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm">
            <p className="font-mono text-gray-200">Prompt:</p>
            <div className="bg-gray-800 p-2 rounded mt-1">
              <code className="block whitespace-pre-wrap break-words font-mono text-gray-300">{`I went to the market and bought 10 apples. I gave 2 apples to the neighbor and 2 to the repairman. I then went and bought 5 more apples and ate 1. How many apples did I end up with?\n\nLet's think step by step.`}</code>
            </div>
            <p className="font-mono text-gray-200 mt-3">Output:</p>
            <div className="bg-gray-800 p-2 rounded mt-1">
              <code className="block whitespace-pre-wrap break-words font-mono text-green-400">1. You started with 10 apples.\n2. You gave away 2 + 2 = 4 apples.\n3. You have 10 - 4 = 6 apples left.\n4. You bought 5 more, so you have 6 + 5 = 11 apples.\n5. You ate 1, so you have 11 - 1 = 10 apples left.</code>
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
      </div>
    </LessonTemplate>
  );
};

export default Lesson3_2;
