import { Zap, ChevronsRight, SlidersHorizontal } from 'lucide-react';
import LessonTemplate from '@/components/layouts/LessonTemplate';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import InlineChat from '@/components/InlineChat';

export interface ChallengeChecklistItem {
  text: string;
  completed: boolean;
}

export default function Lesson5_3() {
  const quizQuestions = [
    {
      questionText: 'What is the main benefit of streaming an AI\'s response token by token?',
      options: [
        'It makes the model generate the full response faster.',
        'It improves the user\'s *perception* of speed by showing activity immediately.',
        'It reduces the overall cost of the API call.',
        'It allows the model to use a larger context window.'
      ],
      correctAnswer: 'It improves the user\'s *perception* of speed by showing activity immediately.',
      explanation: 'Streaming doesn\'t change the total generation time, but it dramatically improves user experience by providing immediate feedback instead of a long wait for the full response.'
    },
    {
      questionText: 'According to the lesson, when is it most appropriate to use a \'Tier 1: Fast & Light\' model?',
      options: [
        'For writing a complex legal document.',
        'For simple classification or basic data extraction tasks.',
        'For multi-step agentic workflows.',
        'When you need the most creative and nuanced response possible.'
      ],
      correctAnswer: 'For simple classification or basic data extraction tasks.',
      explanation: 'The smallest, fastest models are ideal for tasks that don\'t require deep reasoning, where speed and low cost are the highest priorities.'
    },
    {
      questionText: 'Which of the following is a primary benefit of caching AI responses?',
      options: [
        'It ensures the AI provides a different answer every time.',
        'It dramatically reduces latency and cost for common or repeated questions.',
        'It helps the AI learn from user interactions.',
        'It increases the security of the application.'
      ],
      correctAnswer: 'It dramatically reduces latency and cost for common or repeated questions.',
      explanation: 'By storing the answer to a question that has been asked before, caching avoids the need to perform the expensive generation process again, saving both time and money.'
    },
    {
      questionText: 'For which of these tasks would a \'Tier 3: Max Power\' model be the best choice?',
      options: [
        'Checking if an email is spam.',
        'Extracting a date from a sentence.',
        'Powering a complex agent that needs to plan and execute multi-step tasks.',
        'Answering a simple FAQ.'
      ],
      correctAnswer: 'Powering a complex agent that needs to plan and execute multi-step tasks.',
      explanation: 'The most powerful (and expensive) models are reserved for tasks that require deep reasoning, planning, and a nuanced understanding of complex goals.'
    },
    {
      questionText: 'Which of these is NOT a performance optimization strategy discussed in this lesson?',
      options: [
        'Response Streaming',
        'Choosing the right model for the task',
        'Fine-tuning the model with new data',
        'Caching common responses'
      ],
      correctAnswer: 'Fine-tuning the model with new data',
      explanation: 'While fine-tuning is a powerful technique for improving a model\'s *quality* on specific tasks, this lesson focused on performance strategies like streaming, model selection, and caching.'
    }
  ];

  const classificationAgentPrompt = `You are an expert AI Classification Agent. Your task is to analyze a user's request and recommend the most appropriate model tier based on the following criteria:

- **Tier 1: Fast & Light (e.g., GPT-4o-mini)**: For simple, low-stakes tasks like classification, extraction, or basic Q&A. Prioritize speed and low cost.
- **Tier 2: Balanced (e.g., GPT-4o)**: For most standard tasks requiring nuanced understanding, like summarization, translation, or general chat. Good balance of power and cost.
- **Tier 3: Max Power (e.g., GPT-4.1-Turbo)**: For highly complex, creative, or multi-step reasoning tasks, like agentic workflows, detailed analysis, or advanced content creation. Prioritize capability over cost.

Respond with your recommendation and a brief justification.`;

  const modelSelectionChecklist: ChallengeChecklistItem[] = [
    { text: 'Did the AI correctly identify the task\'s complexity?', completed: false },
    { text: 'Did the AI recommend a suitable model tier (Tier 1, 2, or 3)?', completed: false },
    { text: 'Was the justification for the recommendation clear and logical?', completed: false },
    { text: 'Did the AI avoid recommending a more expensive model than necessary?', completed: false }
  ];

  return (
    <LessonTemplate
      moduleNumber={5}
      lessonNumber={3}
      title="The Need for Speed: Performance"
      subtitle="Optimizing for a fast and responsive user experience."
      quizQuestions={quizQuestions}
    >
      <div className="space-y-6">
        <p className="text-lg text-gray-300">
          In the world of AI, just like in racing, speed is everything. A brilliant answer that arrives too late is useless. This lesson covers three key strategies for building high-performance AI applications that feel instant and responsive to the user.
        </p>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center">
                <ChevronsRight className="w-5 h-5 mr-2" />
                The Green Flag: Streaming Responses
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-300 mb-4">
                Imagine waiting for a whole paragraph to be written before you can read the first word. That's what a non-streaming response feels like. Streaming, on the other hand, is like watching the words appear as they're typed.
              </p>
              <p className="text-gray-300 font-semibold">
                By sending back the response token-by-token, we create the perception of speed, keeping the user engaged instead of staring at a loading spinner.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div className="flex items-center">
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Choosing Your Engine: Model Tiers
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-300 mb-4">
                You wouldn't use a Formula 1 engine for a go-kart. The same principle applies to AI models. Using a powerful model for a simple task is wasteful and slow. The key is to match the model to the job.
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-300">
                  <thead className="bg-gray-800 text-xs uppercase">
                    <tr>
                      <th className="p-2">Model Tier</th>
                      <th className="p-2">Best For</th>
                      <th className="p-2">Typical Latency</th>
                      <th className="p-2">Relative Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-700">
                      <td className="border-b border-gray-700 p-2 font-semibold">🏎️ Go-Kart (Fast & Light)</td>
                      <td className="border-b border-gray-700 p-2">Simple classification, extraction</td>
                      <td className="border-b border-gray-700 p-2">&lt;1 second</td>
                      <td className="border-b border-gray-700 p-2">$</td>
                    </tr>
                    <tr className="hover:bg-gray-700">
                      <td className="border-b border-gray-700 p-2 font-semibold">🏁 Sports Car (Balanced)</td>
                      <td className="border-b border-gray-700 p-2">Most chat, summarization</td>
                      <td className="border-b border-gray-700 p-2">1-3 seconds</td>
                      <td className="border-b border-gray-700 p-2">$$</td>
                    </tr>
                    <tr>
                      <td className="border-b border-gray-700 p-2 font-semibold">🚀 F1 Engine (Max Power)</td>
                      <td className="border-b border-gray-700 p-2">Complex reasoning, agentic workflows</td>
                      <td className="border-b border-gray-700 p-2">3-5+ seconds</td>
                      <td className="border-b border-gray-700 p-2">$$$$</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <div className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                The Pit Stop Shortcut: Caching
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-300 mb-4">
                Why complete a full lap if you already know the fastest route? Caching is the ultimate pit stop shortcut. If a user asks a common question (e.g., "What are your hours?"), you can serve a pre-generated, stored response instantly.
              </p>
              <p className="text-gray-300 font-semibold">
                This technique dramatically reduces latency and cost for high-frequency requests, saving both time and money.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-4">
            <AccordionTrigger>
              <div className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Qualifying Lap: Pick the Right Engine
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-300 mb-4">
                You're the race engineer now. Use the chat window below to consult your AI assistant on engine selection. Describe a task, and ask it to recommend the best model tier. See if its reasoning matches the trade-offs between speed, power, and cost that you've just learned.
              </p>
              <InlineChat 
                moduleId="module-5.3-model-selection"
                maxAttempts={5}
                maxFollowUps={3}
                placeholder='Try asking: "What kind of model should I use for a simple email classifier?"'
                systemPrompt={classificationAgentPrompt}
                initialMessages={[
                  {
                    role: 'assistant',
                    content: 'I can help you choose the best AI model for your task! Try describing what you want to build, and I\'ll recommend the most suitable model tier based on complexity, speed, and cost considerations.'
                  },
                  {
                    role: 'user',
                    content: 'What kind of model should I use for a simple email classifier?'
                  },
                  {
                    role: 'assistant',
                    content: 'For a simple email classifier, I recommend **Tier 1: Fast & Light**. This task is a straightforward classification problem where speed and low cost are typically more important than advanced reasoning capabilities. The model only needs to categorize emails into predefined labels, which doesn\'t require deep understanding or complex reasoning.'
                  }
                ]}
                challengeChecklist={modelSelectionChecklist}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </LessonTemplate>
  );
}
