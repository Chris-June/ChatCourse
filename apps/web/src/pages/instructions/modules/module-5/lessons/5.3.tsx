import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Zap, ChevronsRight, SlidersHorizontal } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';
import Accordion from '../../../components/Accordion';

const Lesson5_3: React.FC = () => {
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

  const { completeLesson } = useProgressStore();
  const classificationAgentPrompt = `You are an expert AI Classification Agent. Your task is to analyze a user's request and recommend the most appropriate model tier based on the following criteria:
- **Tier 1: Fast & Light**: Best for simple classification, basic extraction, or tasks where speed is the absolute priority.
- **Tier 2: Balanced**: Best for general purpose tasks like summarization, standard Q&A, or when a balance of performance and capability is needed.
- **Tier 3: Max Power**: Best for complex reasoning, multi-step agentic workflows, or tasks requiring deep understanding and generation.
Based on the user's query, state which tier is the best fit and briefly explain why.`;

  const modelSelectionChecklist = [
    { text: 'The AI identified the complexity of the task', completed: false },
    { text: 'The recommendation includes a specific model tier (1, 2, or 3)', completed: false },
    { text: 'The explanation justifies the chosen tier', completed: false },
    { text: 'The response considers both speed and capability trade-offs', completed: false }
  ];
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white flex items-center">
          <Zap className="w-10 h-10 mr-4 text-yellow-400" />
          Lesson 5.3: Race Car Engineering for AI
        </h1>
      </div>

      <p className="text-lg text-gray-300">
        Building a high-performance AI is like engineering a race car. It's not just about raw power; it's about efficiency, responsiveness, and choosing the right engine for the track. In this lesson, we'll become race engineers, learning three critical techniques to make our AI faster, smarter, and more cost-effective: **streaming**, **engine selection**, and **pit stop shortcuts (caching)**.
      </p>

      {/* Response Streaming */}
      <Accordion title="Live Telemetry: The Power of Streaming" icon={<ChevronsRight />} isInitiallyOpen>
        <p className="text-gray-300 mb-4">
          Imagine a race car driver who only gets feedback at the end of a lap. It's slow and inefficient. Streaming is like giving your user **live telemetry**. Instead of waiting for the full response, they see the AI "thinking" in real-time as tokens appear one by one.
        </p>
        <p className="text-gray-300 font-semibold">
          This doesn't change the total generation time, but it's the single most powerful way to improve the *perception* of speed and make your app feel alive.
        </p>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">How Streaming Works (Conceptual)</h3>
          <p className="text-gray-400 mb-2 text-sm">The server sends a stream of small data chunks. The client listens for these chunks and appends them to the display in real-time.</p>
          <div className="bg-gray-700 p-3 rounded-md">
            <code className="block whitespace-pre-wrap break-words font-mono text-xs text-gray-200">
{`// Frontend pseudo-code
const response = await api.get('/api/chat', { params: { stream: true } });

response.body.on('data', (chunk) => {
  // chunk might be 'Hello'
  appendToDisplay(chunk);
});

response.body.on('end', () => {
  // Stream finished
});`}
            </code>
          </div>
        </div>
      </Accordion>

      {/* Model Trade-offs */}
      <Accordion title="Choosing Your Engine: Model Tiers" icon={<SlidersHorizontal />}>
        <p className="text-gray-300 mb-4">
          You wouldn't use an F1 engine for a go-kart race. It's overkill, expensive, and inefficient. Choosing the right model (your "engine") is critical for balancing performance and cost.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-gray-300">
            <thead className="bg-gray-900 text-gray-100 uppercase tracking-wider">
              <tr>
                <th className="p-2">Engine Tier</th>
                <th className="p-2">Best For</th>
                <th className="p-2">Performance</th>
                <th className="p-2">Cost</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800">
              <tr>
                <td className="border-b border-gray-700 p-2 font-semibold">🏎️ Go-Kart (Fast & Light)</td>
                <td className="border-b border-gray-700 p-2">Simple classification, extraction</td>
                <td className="border-b border-gray-700 p-2">Sub-second</td>
                <td className="border-b border-gray-700 p-2">$</td>
              </tr>
              <tr>
                <td className="border-b border-gray-700 p-2 font-semibold">🚗 Sports Car (Balanced)</td>
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
      </Accordion>

      {/* Caching Strategies */}
      <Accordion title="The Pit Stop Shortcut: Caching" icon={<Zap />}>
        <p className="text-gray-300 mb-4">
          Why complete a full lap if you already know the fastest route? Caching is the ultimate pit stop shortcut. If a user asks a common question (e.g., "What are your hours?"), you can serve a pre-generated, stored response instantly.
        </p>
        <p className="text-gray-300 font-semibold">
          This technique dramatically reduces latency and cost for high-frequency requests, saving both time and money.
        </p>
      </Accordion>

      {/* Conceptual Exercise */}
      <Accordion title="Qualifying Lap: Pick the Right Engine" icon={<Zap />}>
        <p className="text-gray-300 mb-4">
          You're the race engineer now. Use the chat window below to consult your AI assistant on engine selection. Describe a task, and ask it to recommend the best model tier. See if its reasoning matches the trade-offs between speed, power, and cost that you've just learned.
        </p>
        {/* InlineChat for demonstrating model selection based on task requirements */}
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
      </Accordion>

      {/* Validation Quiz */}
      <div className="mt-8">
        <ModuleQuizzes questions={quizQuestions} />
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-5/5.2" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: The Personal Concierge
        </Link>
        <Link 
          to="/instructions/module-6/6.1" 
          onClick={() => completeLesson(5, 3)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next Module <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson5_3;
