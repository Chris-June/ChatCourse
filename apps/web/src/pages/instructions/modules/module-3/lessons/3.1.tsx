import React from 'react';
import ZeroCotDiagram from '../../../components/ZeroCotDiagram';
import InlineChat from '../../../../../components/InlineChat';
import Accordion from '../../../components/Accordion';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';

const reasoningChallengeChecklist = [
  { text: 'Get the AI to correctly identify the odd numbers', completed: false },
  { text: 'Get the AI to sum the odd numbers correctly', completed: false },
  { text: 'Get the AI to determine if the sum is even or odd', completed: false },
  { text: 'Achieve the correct final answer: False', completed: false },
];

const Lesson3_1: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What is the defining characteristic of \'zero-shot\' prompting?',
      options: [
        'The prompt must contain at least one example.',
        'The prompt provides no examples and relies on the model\'s pre-existing knowledge.',
        'The prompt is guaranteed to get a perfect answer on the first try.',
        'The prompt must be a question.'
      ],
      correctAnswer: 'The prompt provides no examples and relies on the model\'s pre-existing knowledge.',
      explanation: 'Zero-shot prompting leverages the model\'s vast training to follow instructions for a task it hasn\'t been specifically shown examples of in the prompt.'
    },
    {
      questionText: 'What is \'few-shot\' prompting?',
      options: [
        'A technique where you shoot down the AI\'s bad ideas.',
        'Providing the AI with a few examples of the task within the prompt to guide its response.',
        'Only asking the AI a few questions at a time.',
        'A prompt that is very short.'
      ],
      correctAnswer: 'Providing the AI with a few examples of the task within the prompt to guide its response.',
      explanation: 'Few-shot prompting gives the model a small number of demonstrations of the task, which helps it understand the desired output format and logic.'
    },
    {
      questionText: 'When would you typically move from a zero-shot to a few-shot prompt?',
      options: [
        'When the AI is performing perfectly.',
        'When the zero-shot prompt fails or produces unreliable results for your specific task.',
        'When you want to make the prompt shorter.',
        'When the AI asks you to.'
      ],
      correctAnswer: 'When the zero-shot prompt fails or produces unreliable results for your specific task.',
      explanation: 'If the model struggles with a zero-shot instruction, providing a few examples is the logical next step to give it more guidance.'
    },
    {
      questionText: 'As demonstrated in this lesson, what kind of task can be difficult for both zero-shot and few-shot prompting?',
      options: [
        'Simple text classification.',
        'Translating a word from English to French.',
        'Multi-step reasoning problems.',
        'Writing a single sentence.'
      ],
      correctAnswer: 'Multi-step reasoning problems.',
      explanation: 'The lesson shows that tasks requiring a logical sequence of steps (like the odd number problem) can fail even with examples, indicating the need for more advanced techniques.'
    },
    {
      questionText: 'What is the main advantage of a model having strong zero-shot capabilities?',
      options: [
        'It can perform a wide variety of tasks without needing specific examples in the prompt.',
        'It will never make a mistake.',
        'It can read your mind.',
        'It responds much faster than other models.'
      ],
      correctAnswer: 'It can perform a wide variety of tasks without needing specific examples in the prompt.',
      explanation: 'Strong zero-shot performance means the model is highly generalized and can follow instructions for new tasks effectively, making it more versatile and easier to use.'
    }
  ];

  return (
    <LessonTemplate
      moduleNumber={3}
      lessonNumber={1}
      title="3.1: Zero-Shot vs. Few-Shot Prompting"
      subtitle="Understand the foundational techniques for guiding AI models."
      quizQuestions={quizQuestions}
    >
      <div className="space-y-8">
        <ZeroCotDiagram />

        <Accordion 
          title="Zero-Shot Prompting"
          isInitiallyOpen
        >  
          <p className="text-gray-300 mb-4">
            Think of zero-shot prompting like asking a skilled chef to make a dish they’ve never cooked before, but you describe exactly what you want. The chef (AI) uses their extensive training and experience to figure it out without you providing a recipe. Similarly, large language models like GPT-4 have been “trained” on vast amounts of text, giving them the ability to understand and execute new tasks based solely on your clear instructions.
          </p>
          <p className="text-gray-300 mb-4">
            Zero-shot prompting is when you give the AI a task without showing it any examples of how to complete that task. It’s like giving someone driving directions to a new restaurant without showing them a map - they use their existing knowledge to navigate successfully.
          </p>
          <p className="text-gray-300 mb-4">
            We tried a few zero-shot examples in the previous section. Here is one of the examples (i.e., text classification) we used:
          </p>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm">
            <p className="font-mono text-gray-200">Prompt:</p>
            <div className="bg-gray-800 p-2 rounded mt-1">
              <code className="block whitespace-pre-wrap break-words font-mono text-gray-300">{`Classify the text into neutral, negative or positive.\nText: I think the vacation is okay.\nSentiment:`}</code>
            </div>
            <p className="font-mono text-gray-200 mt-3">Output:</p>
            <div className="bg-gray-800 p-2 rounded mt-1">
              <code className="block whitespace-pre-wrap break-words font-mono text-green-400">Neutral</code>
            </div>
          </div>
          <p className="text-gray-300 my-4">
            Note that in the prompt above we didn’t provide the model with any examples of text alongside their classifications, the LLM already understands “sentiment” -- that’s the zero-shot capabilities at work.
          </p>
          <p className="text-gray-300">
            Instruction tuning has been shown to improve zero-shot learning. Instruction tuning is essentially the concept of finetuning models on datasets described via instructions. Furthermore, RLHF (reinforcement learning from human feedback) has been adopted to scale instruction tuning wherein the model is aligned to better fit human preferences. This recent development powers models like ChatGPT. We will discuss all these approaches and methods in upcoming sections.
          </p>
          <p className="text-gray-300 mt-4">
            When zero-shot doesn’t work, it’s recommended to provide demonstrations or examples in the prompt which leads to few-shot prompting. In the next section, we demonstrate few-shot prompting.
          </p>

          <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border-2 border-dashed border-blue-500/50">
            <h3 className="font-semibold text-white mb-2">Your Turn: Zero-Shot Challenge</h3>
            <p className="text-gray-400 mb-4">Practice zero-shot prompting by asking the AI to perform tasks without examples. Think of it as giving clear instructions to a new employee - be specific about what you want without showing them how others have done it.</p>
            <p className="text-gray-400 mb-4">
              <strong>Pro tip:</strong> Start with simple tasks like “Summarize this paragraph in 2 sentences” or “Translate this sentence to Spanish.” The key is being specific about your desired outcome without providing examples.
            </p>
            <InlineChat 
              moduleId="module-3.1-zeroshot"
              maxAttempts={10}
              maxFollowUps={3}
              placeholder="Try a zero-shot prompt here..."
              systemPrompt="You are a helpful AI assistant. The user is learning about zero-shot prompting. Respond to their requests directly without examples, demonstrating zero-shot capabilities."
              challengeChecklist={[
                { text: 'Used a clear instruction without examples', completed: false },
                { text: 'Received a relevant response', completed: false },
                { text: 'Verified the response was generated without examples', completed: false }
              ]}
            />
          </div>
        </Accordion>

        <Accordion title="Few-shot Prompting">
          <p className="text-gray-300 mb-4">
            While zero-shot prompting works well for straightforward tasks, complex problems can be like asking someone to solve a puzzle without showing them the pieces. Few-shot prompting is like giving someone a few completed puzzle pieces as examples - it helps them understand the pattern and complete the rest more accurately.
          </p>
          <p className="text-gray-300 mb-4">
            Few-shot prompting provides the AI with concrete examples of what you want, similar to how a teacher might show students a few solved math problems before asking them to solve new ones. These examples act as “training wheels” that guide the AI toward the desired response format and reasoning approach.
          </p>
          <p className="text-gray-300 mb-4">
            According to Touvron et al. 2023 few shot properties first appeared when models were scaled to a sufficient size (Kaplan et al., 2020).
          </p>
          <p className="text-gray-300 mb-4">
            Let’s demonstrate few-shot prompting via an example that was presented in Brown et al. 2020. In the example, the task is to correctly use a new word in a sentence.
          </p>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 font-mono text-sm text-gray-200">
            <p>Prompt:</p>
            <pre className="whitespace-pre-wrap">{`A "whatpu" is a small, furry animal native to Tanzania. An example of a sentence that uses the word whatpu is:\nWe were traveling in Africa and we saw these very cute whatpus.\n\nTo do a "farduddle" means to jump up and down really fast. An example of a sentence that uses the word farduddle is:`}</pre>
            <br />
            <p>Output:</p>
            <pre className="whitespace-pre-wrap">When we won the game, we all started to farduddle in celebration.</pre>
          </div>
          <p className="text-gray-300 my-4">
            We can observe that the model has somehow learned how to perform the task by providing it with just one example (i.e., 1-shot). For more difficult tasks, we can experiment with increasing the demonstrations (e.g., 3-shot, 5-shot, 10-shot, etc.).
          </p>
          <p className="text-gray-300 mb-4">
            Following the findings from Min et al. (2022), here are a few more tips about demonstrations/exemplars when doing few-shot:
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 mb-4">
            <li>“the label space and the distribution of the input text specified by the demonstrations are both important (regardless of whether the labels are correct for individual inputs)”</li>
            <li>the format you use also plays a key role in performance, even if you just use random labels, this is much better than no labels at all.</li>
            <li>additional results show that selecting random labels from a true distribution of labels (instead of a uniform distribution) also helps.</li>
          </ul>
          <p className="text-gray-300 mb-4">
            Let’s try out a few examples. Let’s first try an example with random labels (meaning the labels Negative and Positive are randomly assigned to the inputs):
          </p>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm">
            <p className="font-mono text-gray-200">Prompt:</p>
            <div className="bg-gray-800 p-2 rounded mt-1">
              <code className="block whitespace-pre-wrap break-words font-mono text-gray-300">{`This is awesome! // Positive\nThis is bad! // Negative\nWow, this is amazing! // Positive\nWhat a horrible show! //`}</code>
            </div>
            <p className="font-mono text-gray-200 mt-3">Output:</p>
            <div className="bg-gray-800 p-2 rounded mt-1">
              <code className="block whitespace-pre-wrap break-words font-mono text-green-400">Negative</code>
            </div>
          </div>

          <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border-2 border-dashed border-blue-500/50">
            <h3 className="font-semibold text-white mb-2">Your Turn: Few-Shot</h3>
            <p className="text-gray-400 mb-4">Construct your own few-shot prompt. Provide the model with a few examples to guide its response for a simple classification or transformation task.</p>
            <InlineChat 
              moduleId="module-3.1-fewshot"
              maxAttempts={10}
              maxFollowUps={3}
              placeholder="Construct a few-shot prompt with examples..."
              systemPrompt="You are a helpful AI assistant. The user is learning about few-shot prompting. When they provide examples, analyze the pattern and respond in kind. If they don’t provide examples, gently remind them that few-shot learning requires examples."
              challengeChecklist={[
                { text: 'Included at least 2-3 clear examples', completed: false },
                { text: 'Maintained consistent format between examples', completed: false },
                { text: 'Received a response following the example pattern', completed: false }
              ]}
            />
          </div>
        </Accordion>

        <Accordion title="Limitations of Few-shot Prompting">
          <p className="text-gray-300 mb-4">
            Standard few-shot prompting works well for many tasks but is still not a perfect technique, especially when dealing with more complex reasoning tasks. Let’s demonstrate why this is the case. Do you recall the previous example where we provided the following task:
          </p>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm">
            <code className="block whitespace-pre-wrap break-words font-mono text-gray-300">{`The odd numbers in this group add up to an even number: 15, 32, 5, 13, 82, 7, 1.\nA:`}</code>
          </div>
          <p className="text-gray-300 my-4">If we try this again, the model outputs the following:</p>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm">
            <code className="block whitespace-pre-wrap break-words font-mono text-red-400">Yes, the odd numbers in this group add up to 107, which is an even number.</code>
          </div>
          <p className="text-gray-300 my-4">
            This is not the correct response, which not only highlights the limitations of these systems but that there is a need for more advanced prompt engineering.
          </p>
          <p className="text-gray-300 mb-4">
            Let’s try to add some examples to see if few-shot prompting improves the results.
          </p>
          <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 text-sm">
            <p className="font-mono text-gray-200">Prompt:</p>
            <div className="bg-gray-800 p-2 rounded mt-1">
              <code className="block whitespace-pre-wrap break-words font-mono text-gray-300">{`The odd numbers in this group add up to an even number: 4, 8, 9, 15, 12, 2, 1.\nA: The answer is False.\n\nThe odd numbers in this group add up to an even number: 17,  10, 19, 4, 8, 12, 24.\nA: The answer is True.\n\nThe odd numbers in this group add up to an even number: 16,  11, 14, 4, 8, 13, 24.\nA: The answer is True.\n\nThe odd numbers in this group add up to an even number: 17,  9, 10, 12, 13, 4, 2.\nA: The answer is False.\n\nThe odd numbers in this group add up to an even number: 15, 32, 5, 13, 82, 7, 1.\nA:`}</code>
            </div>
            <p className="font-mono text-gray-200 mt-3">Output:</p>
            <div className="bg-gray-800 p-2 rounded mt-1">
              <code className="block whitespace-pre-wrap break-words font-mono text-red-400">The answer is True.</code>
            </div>
          </div>
          <p className="text-gray-300 my-4">
            That didn’t work. It seems like few-shot prompting is not enough to get reliable responses for this type of reasoning problem.
          </p>
          <p className="text-gray-300">
            Overall, it seems that providing examples is useful for solving some tasks. When zero-shot prompting and few-shot prompting are not sufficient, it might mean that whatever was learned by the model isn’t enough to do well at the task. From here it is recommended to start thinking about fine-tuning your models or experimenting with more advanced prompting techniques.
          </p>

          <div className="mt-6 bg-gray-900/50 p-4 rounded-lg border-2 border-dashed border-blue-500/50">
            <h3 className="font-semibold text-white mb-2">Your Turn: The Reasoning Challenge</h3>
            <p className="text-gray-400 mb-4">The model failed the reasoning task above. This is like trying to teach someone to solve a complex puzzle - sometimes showing them a few examples isn’t enough. Your challenge is to experiment with different few-shot approaches.</p>
            <p className="text-gray-400 mb-4">
              <strong>Strategy tips:</strong>
              <br />• Try varying the number of examples (1-5 shots)
              <br />• Experiment with different example types
              <br />• Consider rephrasing the problem statement
              <br />• Test if breaking the problem into smaller steps helps
            </p>
            <InlineChat 
              moduleId="module-3.1-reasoning"
              maxAttempts={5}
              maxFollowUps={2}
              placeholder="Try to solve the reasoning problem..."
              systemPrompt="You are a helpful AI assistant. The user is working on a reasoning challenge. Guide them through solving the problem step by step. If they ask for the answer directly, encourage them to think through it themselves first. When they provide a solution, verify their reasoning rather than just confirming if they’re right or wrong."
              challengeChecklist={reasoningChallengeChecklist}
            />
          </div>
        </Accordion>
      </div>
    </LessonTemplate>
  );
};

export default Lesson3_1;
