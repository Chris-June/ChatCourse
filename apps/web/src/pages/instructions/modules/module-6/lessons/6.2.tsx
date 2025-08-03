import { TestTube2, ShieldCheck, Percent, Scale } from 'lucide-react';
import LessonTemplate from '@/components/layouts/LessonTemplate';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import InlineChat from '@/components/InlineChat';
import AiTrustMeter from '@/pages/instructions/components/AiTrustMeter';
import UncertaintyVisualizer from '@/pages/instructions/components/UncertaintyVisualizer';
import BiasExplorer from '@/pages/instructions/components/BiasExplorer';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface ChallengeChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

const Lesson6_2: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'The principle of \'designing for collaboration, not command\' encourages us to...',
      options: [
        'Make the AI give orders to the user.',
        'Create a partnership where the user feels in control and the AI acts as a helpful assistant.',
        'Hide the AI\'s capabilities from the user.',
        'Ensure the AI always makes the final decision.'
      ],
      correctAnswer: 'Create a partnership where the user feels in control and the AI acts as a helpful assistant.',
      explanation: 'A well-trained guide dog doesn\'t just follow orders; it collaborates with its owner to navigate the world safely. Your AI should do the same. The goal is a partnership where the user feels in control, and the AI provides helpful guidance. It\'s about teamwork, not a one-way command structure.'
    },
    {
      questionText: 'Which of the following best builds user trust through transparency and control?',
      options: [
        'Hiding all of the AI\'s reasoning.',
        'Providing an explanation for *why* the AI made a suggestion and allowing the user to correct it.',
        'Never allowing the user to disagree with the AI.',
        'Making the AI\'s responses as mysterious as possible.'
      ],
      correctAnswer: 'Providing an explanation for *why* the AI made a suggestion and allowing the user to correct it.',
      explanation: 'You trust a service animal because you understand its training and can guide it. The same goes for AI. Build trust by being transparent—show users *why* the AI made a suggestion. Give them control to offer corrections, like giving a \'treat\' for a job well done. This turns a mysterious \'black box\' into a reliable partner.'
    },
    {
      questionText: 'Why is it important to design for uncertainty in AI?',
      options: [
        'To make the AI seem more human by being unsure.',
        'Because AI is probabilistic, and communicating its confidence level helps users decide how much to rely on its output.',
        'To make the user interface more complex.',
        'Because all AIs are always 100% certain about their answers.'
      ],
      correctAnswer: 'Because AI is probabilistic, and communicating its confidence level helps users decide how much to rely on its output.',
      explanation: 'A good trainer knows the difference between a confident bark and a nervous whimper. Your AI needs to communicate its own uncertainty. Is it 95% sure or 55% sure? Clearly showing the AI\'s confidence level (its \'tail wag\') helps users decide how much to trust a specific suggestion.'
    },
    {
      questionText: 'What is the primary danger of using biased data to train an AI system?',
      options: [
        'The AI will run slower.',
        'The AI can perpetuate or even amplify harmful societal biases, leading to unfair outcomes.',
        'The AI will be more expensive to operate.',
        'The AI will refuse to answer questions.'
      ],
      correctAnswer: 'The AI can perpetuate or even amplify harmful societal biases, leading to unfair outcomes.',
      explanation: 'If you only train a service animal with people of a certain appearance, it may become fearful or aggressive towards others. Similarly, an AI trained on biased data (e.g., from only one demographic) can make unfair or inaccurate decisions for other groups. It\'s our ethical responsibility to ensure our AI is trained on diverse data to be fair and equitable for everyone.'
    },
    {
      questionText: 'An AI that says, \'Based on similar users, I think you\'ll like this movie, but I\'m only 70% sure,\' is demonstrating which two design principles?',
      options: [
        'Collaboration and Fairness',
        'Uncertainty and Trust (through Transparency)',
        'Control and Bias',
        'Collaboration and Command'
      ],
      correctAnswer: 'Uncertainty and Trust (through Transparency)',
      explanation: 'It clearly communicates its level of confidence (Uncertainty) and explains the basis for its suggestion (Transparency), which helps the user build trust.'
    }
  ];

  const designCritiquePrompt = `
    You are an expert AI Design Critic. Your goal is to help me, a student, improve the design of an AI feature I propose. Use the principles from the lesson to guide your critique.

    When I describe my feature, ask me clarifying questions based on these four principles:

    1.  **Collaboration vs. Command:** Ask me how the user and AI will work together. Is the AI a tool the user controls, or a boss giving orders? How does the user give feedback?
        -   *Example Question:* "How does the user stay in control in your design? Can they ignore or modify the AI's suggestions?"

    2.  **Trust and Transparency:** Ask me how the design builds user trust. How does it explain its reasoning? Is it clear what the AI can and cannot do?
        -   *Example Question:* "How would your design explain *why* it recommended a particular movie? What happens if it's wrong?"

    3.  **Designing for Uncertainty:** Ask me how the interface communicates the AI's confidence. Is it clear when the AI is making a confident guess versus a wild stab in the dark?
        -   *Example Question:* "How will the user know how confident the AI is in its movie suggestion? Will it show a percentage, or use different language?"

    4.  **Fairness and Bias:** Ask me to consider potential biases. What data would the AI need? Could that data lead to unfair outcomes for certain groups of people?
        -   *Example Question:* "What kind of biases could a movie recommendation AI have? How could you design it to recommend a diverse and inclusive set of films?"

    Keep your tone constructive and inquisitive. Your goal is to help me think more deeply about my own design.`;

  const designCritiqueChecklist: ChallengeChecklistItem[] = [
    { id: 'collaboration', text: 'Did the AI critic ask about the user\'s goal (collaboration)?', completed: false },
    { id: 'trust', text: 'Did the critic explore how to build trust (transparency/control)?', completed: false },
    { id: 'fairness', text: 'Did the critic check for potential fairness issues (bias)?', completed: false },
    { id: 'constructive', text: 'Was the critique constructive and helpful?', completed: false }
  ];

  return (
    <LessonTemplate
      moduleNumber={6}
      lessonNumber={2}
      title="Training Your AI Companion"
      subtitle="Principles for Designing Collaborative and Trustworthy AI"
      quizQuestions={quizQuestions}
    >
      <div className="space-y-8">
        <p className="text-lg text-gray-300">
          Building an AI is like training a powerful, intelligent animal. It's not just about teaching it tricks; it's about building a relationship based on trust, communication, and clear boundaries. This lesson covers the core principles of Human-Computer Interaction (HCI) for AI, ensuring your creation is a helpful partner, not an unpredictable beast.
        </p>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div className="flex items-center">
                <ShieldCheck className="w-6 h-6 mr-2 text-green-400" />
                The 'Good Boy!' Principle: Building Trust
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-gray-300">
                <p>You trust a service animal because you understand its training and can guide it. The same goes for AI. Build trust by being transparent—show users *why* the AI made a suggestion. Give them control to offer corrections, like giving a 'treat' for a job well done. This turns a mysterious 'black box' into a reliable partner.</p>
                <AiTrustMeter />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <div className="flex items-center">
                <Percent className="w-6 h-6 mr-2 text-purple-400" />
                Reading the Cues: Is Its Tail Wagging or Tucked?
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-gray-300">
                <p>A good trainer knows the difference between a confident bark and a nervous whimper. Your AI needs to communicate its own uncertainty. Is it 95% sure or 55% sure? Clearly showing the AI's confidence level (its 'tail wag') helps users decide how much to trust a specific suggestion.</p>
                <UncertaintyVisualizer />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-4">
            <AccordionTrigger>
              <div className="flex items-center">
                <Scale className="w-6 h-6 mr-2 text-yellow-400" />
                Ensuring the Animal is Friendly to Everyone
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 text-gray-300">
                <p>You would never train a service animal to be aggressive towards certain types of people. Similarly, an AI trained on biased data can produce unfair or harmful outcomes. Designing for fairness is the ethical responsibility to ensure your AI 'animal' is helpful and equitable to everyone, regardless of their background.</p>
                <BiasExplorer />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
            <TestTube2 className="w-7 h-7 mr-3 text-yellow-400" />
            Your Turn: Get a Design Critique
          </h2>
          <p className="text-gray-300 mb-4">
            Now it's your turn to be the designer. Think of an AI feature (e.g., an AI that suggests vacation spots). Describe how the user would interact with it in the chat below. Your AI Design Critic will ask you questions to help you improve your design based on the principles we've just covered.
          </p>
          <InlineChat 
            moduleId="module-6.2-design-critique"
            maxAttempts={5}
            maxFollowUps={4}
            placeholder="Start by describing your AI feature, for example: I'm designing an AI that helps you pick a movie to watch..."
            systemPrompt={designCritiquePrompt}
            initialMessages={[
              {
                role: 'assistant',
                content: 'Welcome to your AI Design Critique session! I\'m here to help you evaluate and improve your AI feature design using the principles from this lesson.\n\nTo get started, describe your AI feature in detail. For example: "I\'m designing an AI that helps users pick a movie to watch based on their mood and preferences."\n\nI\'ll ask you questions to help you think through the user experience, trust factors, and potential biases in your design.'
              }
            ]}
            challengeChecklist={designCritiqueChecklist}
          />
        </section>

        <div className="flex justify-between pt-4">
          <Link 
            to="/instructions/module-6/6.1" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Blueprint to Skyscraper
          </Link>
          <Link 
            to="/instructions/module-6/6.3" 
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next: Iterative Development <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </LessonTemplate>
  );
};

export default Lesson6_2;
