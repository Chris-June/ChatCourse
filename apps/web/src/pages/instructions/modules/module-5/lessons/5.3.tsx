import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LessonTemplate from '@/components/layouts/LessonTemplate';
import { useRef } from 'react';
import InlineChat, { InlineChatHandle, ChallengeChecklistItem } from '@/components/InlineChat';
import KeyTakeaways from '../../../components/KeyTakeaways';
import BestPractices from '../../../components/BestPractices';
import LatencyFlowInfographic from '../../../components/LatencyFlowInfographic';
import StreamingVisualizer from '../../../components/StreamingVisualizer';
import ModelTierGuesser from '../../../components/ModelTierGuesser';
import ApiCostEstimator from '../../../components/ApiCostEstimator';

export default function Lesson5_3() {
  const inlineChatRef = useRef<InlineChatHandle>(null);

  const handleExampleClick = (text: string) => {
    inlineChatRef.current?.setPromptText(text);
  };

  const classificationAgentPrompt = `
  You are an expert AI software consultant. Your job is to recommend the best language model tier for a user's task.

  Model Tiers:
  - Tier 1 (Fast & Light): GPT-4o-mini. Cost: $0.15/M tokens. Best for simple, high-volume tasks like classification, extraction, or chatbots where speed is critical and reasoning is minimal.
  - Tier 2 (Balanced): GPT-4.1-mini. Cost: $1/M tokens. A good default for most tasks requiring solid reasoning, summarization, and multi-step instructions without needing maximum power.
  - Tier 3 (Powerful): GPT-4.1. Cost: $5/M tokens. The most powerful model for complex reasoning, deep analysis, and tasks requiring near-human-level understanding, like legal analysis or advanced code generation.

  When a user describes their task, first, clarify any ambiguities. Then, recommend a tier and JUSTIFY your choice based on the task's complexity, required speed, and cost implications. Be concise and clear.
`;

  const modelSelectionChecklist: ChallengeChecklistItem[] = [
    { id: '1', text: 'Ask about a task requiring high accuracy (e.g., legal analysis).', completed: false },
    { id: '2', text: 'Ask about a task requiring high speed (e.g., real-time transcription).', completed: false },
    { id: '3', text: 'Ask about a task that is very cost-sensitive (e.g., a free hobby project).', completed: false },
  ];

  const keyTakeawaysData = [
    'Streaming responses token-by-token dramatically improves the user\'s perception of speed.',
    'Choosing the right model tier for the task is crucial; don\'t use a powerful, slow model for a simple job.',
    'Caching responses for common questions is a highly effective way to reduce both latency and cost.',
    'Performance is a key part of the user experience in AI applications.',
  ];

  const bestPractices = {
    dos: [
      { text: 'Stream responses whenever possible to provide immediate feedback.', why: 'It reduces perceived latency and makes the app feel more responsive.' },
      { text: 'Match the model to the task\'s complexity (e.g., use light models for classification).', why: 'This saves money and reduces latency for simple tasks.' },
      { text: 'Implement a caching layer for frequent, identical requests.', why: 'This provides the fastest possible response and reduces API costs to zero for cached queries.' },
    ],
    don_ts: [
      { text: 'Don\'t make users wait for a full response when you could be streaming.', why: 'Long wait times lead to user frustration and abandonment.' },
      { text: 'Don\'t use an expensive, high-power model for a simple task.', why: 'It\'s a waste of money and resources, and it\'s often slower.' },
      { text: 'Don\'t regenerate answers to the same question repeatedly.', why: 'This is inefficient and costly. Caching is the solution.' },
    ],
  };

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
      explanation: 'Streaming doesn\'t change the total generation time, but it drastically reduces the *time to first token*, making the application feel much more responsive.'
    },
    {
      questionText: 'For which of the following tasks would a Tier 1 (e.g., GPT-4o-mini) model be most appropriate?',
      options: [
        'Writing a detailed legal brief analyzing a complex case.',
        'Summarizing the sentiment of 10,000 customer reviews per hour.',
        'Generating a full-stack web application from a single prompt.',
        'Acting as a long-term, conversational AI companion with deep memory.'
      ],
      correctAnswer: 'Summarizing the sentiment of 10,000 customer reviews per hour.',
      explanation: 'This is a high-volume, relatively simple classification task, which is exactly what fast and light models are designed for. The other tasks require much deeper reasoning.'
    },
    {
      questionText: 'What is a potential downside of *not* implementing a caching strategy?',
      options: [
        'Users might get answers that are too creative.',
        'You will pay for and wait for the same answer to be generated repeatedly for common questions.',
        'The model might refuse to answer frequent questions.',
        'It makes streaming impossible.'
      ],
      correctAnswer: 'You will pay for and wait for the same answer to be generated repeatedly for common questions.',
      explanation: 'Caching stores the results of expensive operations. For common queries, serving a cached response is nearly instant and costs nothing, saving both time and money.'
    }
  ];

  return (
    <LessonTemplate
      moduleNumber={5}
      lessonNumber={3}
      title="The Need for Speed"
      subtitle="Optimizing for a fast and responsive user experience."
      quizQuestions={quizQuestions}
    >
      <>
        <div className="space-y-12">
          <div id="intro">
            <h2 className="text-3xl font-bold text-white mb-4">Introduction: The Physics of Speed</h2>
            <p className="text-gray-400 leading-relaxed">
              In AI, speed isn't just a feature; it's the bedrock of user experience. A brilliant AI that takes too long to answer feels broken. This lesson dives into the mechanics of AI response time, showing you how to tune your digital engine—from the model you choose to the way you stream data—to deliver results that feel instantaneous. We'll explore how factors like model size, server load, and network latency contribute to the total time-to-first-token and how you can optimize each step.
            </p>
            <LatencyFlowInfographic />
            <div className="mt-6 p-4 bg-red-900/30 border border-red-700 rounded-lg flex items-start">
              <AlertTriangle className="w-6 h-6 text-red-400 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-red-300">A Real-World Failure Scenario</h4>
                <p className="text-red-400/90 text-sm">A promising AI-powered code completion tool was abandoned by developers because it frequently took 3-4 seconds to suggest code. While the suggestions were high-quality, the delay was long enough to break a developer's flow state, making it less efficient than just typing the code manually. Speed, in this case, was more critical than perfection.</p>
              </div>
            </div>
          </div>

          <div id="streaming">
            <h2 className="text-3xl font-bold text-white mb-4">Streaming: The Illusion of Instant Speed</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              The single most effective technique for improving perceived performance is streaming. Instead of waiting for the full response to be generated, you send back tokens as soon as the model produces them. This creates a powerful illusion of speed, as the user sees activity immediately.
            </p>
            <StreamingVisualizer />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="md:col-span-2 bg-gray-900/50 p-6 rounded-lg border border-gray-700">
                <h4 className="text-xl font-bold text-white mb-3">Streaming Toolkits Comparison</h4>
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="p-2 text-white">Toolkit</th>
                      <th className="p-2 text-white">Best For</th>
                      <th className="p-2 text-white">Implementation Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="p-2 align-top"><code className="text-cyan-400">stream: true</code> (OpenAI API)</td>
                      <td className="p-2 align-top">Direct, simple use cases where you handle the Server-Sent Events (SSE) stream yourself.</td>
                      <td className="p-2 align-top">Requires manual parsing of the SSE stream on the client. Gives you full control but more boilerplate.</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="p-2 align-top">Vercel AI SDK / LangChain</td>
                      <td className="p-2 align-top">Rapid development in React/Next.js environments.</td>
                      <td className="p-2 align-top">Abstracts away the stream handling. Provides helpful hooks like <code className="text-cyan-400">useChat</code> for easy UI integration.</td>
                    </tr>
                    <tr>
                      <td className="p-2 align-top">Manual WebSockets</td>
                      <td className="p-2 align-top">Complex, stateful applications requiring bidirectional communication.</td>
                      <td className="p-2 align-top">Highest implementation overhead but offers the most flexibility for real-time, interactive experiences beyond simple chat.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-700">
                <h4 className="font-semibold text-yellow-300 mb-2">The Temperature Tradeoff</h4>
                <p className="text-yellow-400/90 text-xs leading-relaxed">A common myth is that streaming and high `temperature` (creativity) are at odds. While it's true that higher temperature can sometimes increase the *total* generation time, it doesn't necessarily increase the *time-to-first-token*. You can often have a creative, streaming model that still feels fast to the user.</p>
              </div>
            </div>
          </div>

          <div id="model-tiers">
            <h2 className="text-3xl font-bold text-white mb-4">Choosing Your Engine: Model Tiers</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Not all tasks require a sledgehammer. Using a massive, powerful model for a simple classification task is like using a race car for a trip to the grocery store—it's expensive, inefficient, and slow. Choosing the right model tier is a critical performance optimization.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-max text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="p-3 text-white">Tier</th>
                    <th className="p-3 text-white">Example Model</th>
                    <th className="p-3 text-white">Best For</th>
                    <th className="p-3 text-white">Misuse Scenarios</th>
                    <th className="p-3 text-white text-right">Typical Latency (TTFT)</th>
                    <th className="p-3 text-white text-right">Cost / 1M Tokens</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="p-3 font-semibold text-green-400">Tier 1: Fast & Light</td>
                    <td className="p-3"><code className="text-cyan-400">GPT-4o-mini</code></td>
                    <td className="p-3">Simple classification, chatbots, text extraction.</td>
                    <td className="p-3 text-red-400/80">Asking for nuanced, multi-page summaries or complex code generation.</td>
                    <td className="p-3 text-right">~150 ms</td>
                    <td className="p-3 text-right">$0.15</td>
                  </tr>
                  <tr className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="p-3 font-semibold text-yellow-400">Tier 2: Balanced</td>
                    <td className="p-3"><code className="text-cyan-400">GPT-4.1-mini</code></td>
                    <td className="p-3">Summarization, multi-step instructions, general purpose tasks.</td>
                    <td className="p-3 text-red-400/80">Expecting it to perform flawless, complex legal analysis or write an entire application from scratch.</td>
                    <td className="p-3 text-right">~400 ms</td>
                    <td className="p-3 text-right">$1.00</td>
                  </tr>
                  <tr className="hover:bg-gray-800/50">
                    <td className="p-3 font-semibold text-red-400">Tier 3: Powerful</td>
                    <td className="p-3"><code className="text-cyan-400">GPT-4.1</code></td>
                    <td className="p-3">Complex reasoning, deep analysis, advanced code generation.</td>
                    <td className="p-3 text-red-400/80">Using it for simple tasks like identifying keywords in a sentence—a massive waste of resources.</td>
                    <td className="p-3 text-right">~800 ms</td>
                    <td className="p-3 text-right">$5.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ModelTierGuesser />
            <ApiCostEstimator />
          </div>

          <div id="exercise">
            <h2 className="text-3xl font-bold text-white mb-4">Qualifying Lap: Pick the Right Engine</h2>
            <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-700 mt-6">
              <div className="prose prose-invert prose-sm max-w-none">
                <p>Now it's your turn. You're the consultant. Describe a task for an AI, and our specialized agent will recommend the best model tier. Pay attention to its reasoning. Does it correctly balance speed, cost, and capability?</p>
                <p>Try to complete the challenges below.</p>
              </div>
              <div className="flex flex-wrap gap-2 my-4">
                <Button variant="outline" size="sm" onClick={() => handleExampleClick('I need to summarize a 5-page legal document. Which model is best?')}>Summarize Legal Doc</Button>
                <Button variant="outline" size="sm" onClick={() => handleExampleClick('Draft a friendly, short marketing email for a new product launch.')}>Draft Marketing Email</Button>
                <Button variant="outline" size="sm" onClick={() => handleExampleClick('I\'m building a customer service chatbot that needs to handle 10,000 queries per day. What\'s my best option?')}>High-Volume Chatbot</Button>
              </div>
              <InlineChat 
                ref={inlineChatRef} 
                moduleId="module-5.3-model-selection"
                maxAttempts={5}
                maxFollowUps={3}
                placeholder='Ask for a model recommendation for your task...'
                systemPrompt={classificationAgentPrompt}
                challengeChecklist={modelSelectionChecklist}
                initialMessages={[
                  {
                    role: 'assistant',
                    content: "Welcome to the Model Selection challenge! Describe a task, and I'll recommend the best model tier, considering speed, cost, and capability. What are you trying to build?"
                  }
                ]}
              />
            </div>
          </div>

          <BestPractices dos={bestPractices.dos.map(item => item.text)} donts={bestPractices.don_ts.map(item => item.text)} />

          <KeyTakeaways points={keyTakeawaysData} />
        </div>
      </>
    </LessonTemplate>
  );
}
