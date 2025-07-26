import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Zap, ChevronsRight, SlidersHorizontal } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

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
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">5.3: Performance Optimization</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-5/5.2" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Personalization
          </Link>
          <Link 
            to="/instructions/module-6/6.1" 
            onClick={() => completeLesson(5, 3)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next: Idea-Generation <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        In interactive applications, performance is critical. A slow, lagging AI feels frustrating to use. Optimizing performance involves improving both the actual response time (latency) and the user's perception of speed.
      </p>

      {/* Response Streaming */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <ChevronsRight className="w-7 h-7 mr-3 text-cyan-400" />
          Improving Perceived Performance with Streaming
        </h2>
        <p className="text-gray-300 mb-4">
          Instead of waiting for the entire AI response to be generated, you can stream it to the user token by token. This is what you see in action in this chat application. The text appears gradually, as it's being generated.
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
      </section>

      {/* Model Trade-offs */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <SlidersHorizontal className="w-7 h-7 mr-3 text-green-400" />
          Choosing the Right Model: Speed vs. Power
        </h2>
        <p className="text-gray-300 mb-4">
          Not all tasks require the most powerful (and often slowest) AI model. There is a constant trade-off between a model's capability, its speed, and its cost.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 border-blue-400 p-2 text-blue-300">Model Tier</th>
                <th className="border-b-2 border-blue-400 p-2 text-blue-300">Best For</th>
                <th className="border-b-2 border-blue-400 p-2 text-blue-300">Avg. Latency</th>
                <th className="border-b-2 border-blue-400 p-2 text-blue-300">Relative Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-900/50">
                <td className="border-b border-gray-700 p-2"><strong>Tier 1: Fast & Light</strong></td>
                <td className="border-b border-gray-700 p-2">Classification, simple extraction</td>
                <td className="border-b border-gray-700 p-2">&lt; 500ms</td>
                <td className="border-b border-gray-700 p-2">$</td>
              </tr>
              <tr>
                <td className="border-b border-gray-700 p-2"><strong>Tier 2: Balanced</strong></td>
                <td className="border-b border-gray-700 p-2">Summarization, standard Q&A</td>
                <td className="border-b border-gray-700 p-2">1-2s</td>
                <td className="border-b border-gray-700 p-2">$$</td>
              </tr>
              <tr className="bg-gray-900/50">
                <td className="border-b border-gray-700 p-2"><strong>Tier 3: Max Power</strong></td>
                <td className="border-b border-gray-700 p-2">Complex reasoning, agentic tasks</td>
                <td className="border-b border-gray-700 p-2">3-5s+</td>
                <td className="border-b border-gray-700 p-2">$$$$</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Caching Strategies */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Reducing Latency with Caching</h2>
        <p className="text-gray-300 mb-4">
          If multiple users ask the same question, why generate the answer more than once? Caching involves storing the results of expensive operations and returning the cached result when the same input occurs again. For an AI application, you can cache the full response for common or identical prompts.
        </p>
        <p className="text-gray-400">
          This dramatically reduces latency for subsequent requests and can also lead to significant cost savings.
        </p>
      </section>

      {/* Conceptual Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <Zap className="w-7 h-7 mr-3 text-yellow-400" />
          Your Turn: Pick the Right Tool for the Job
        </h2>
        <p className="text-gray-300 mb-4">
          Use the chat window below to test your understanding of performance trade-offs. Describe a task, and ask the AI which model tier—fast, balanced, or powerful—would be the best fit. See if its reasoning matches what you've learned.
        </p>
        <InlineChat 
          moduleId="module-5.3-model-selection"
          maxAttempts={10}
          placeholder='Try asking: "What kind of model should I use for a simple email classifier?"' 
          systemPrompt={classificationAgentPrompt}
        />
      </section>

      {/* Validation Quiz */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Check Your Understanding</h2>
        <ModuleQuizzes questions={quizQuestions} />
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-5/5.2" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Personalization 
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
