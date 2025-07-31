import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users, TestTube2, ShieldCheck, Percent, Scale } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';
import Accordion from '../../../components/Accordion';
import AiTrustMeter from '../../../components/AiTrustMeter';
import UncertaintyVisualizer from '../../../components/UncertaintyVisualizer';
import BiasExplorer from '../../../components/BiasExplorer';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';

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
      explanation: 'You would never train a service animal to be aggressive towards certain types of people. Similarly, an AI trained on biased data can produce unfair or harmful outcomes. Designing for fairness is the ethical responsibility to ensure your AI \'animal\' is helpful and equitable to everyone, regardless of their background.'
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

  const { completeLesson } = useProgressStore();
  const designCritiquePrompt = `
    You are an expert AI UX Design Critic. I am going to propose a design for an AI feature. Your goal is to help me improve it by asking critical questions based on the design principles from this lesson.

    When I describe my design, critique it by asking questions related to:

    1.  **Human-AI Collaboration:** How does the design set clear expectations? Does it feel like a partnership?
    2.  **Feedback & Correction:** How can the user correct the AI if it's wrong? How does the AI learn from those corrections?
    3.  **Explainability & Trust:** Does the design explain *why* the AI did something? What could build more trust?
    4.  **Uncertainty:** How does the UI communicate when the AI is not confident in its response?
    5.  **Fairness & Bias:** How might this feature be affected by biases in the data? What steps does the design take to mitigate potential harm or unfairness?

    Keep your tone constructive and inquisitive. Your goal is to make me think more deeply about the user experience, not to give me the answers directly.
  `;

  const designCritiqueChecklist: Array<{text: string, completed: boolean}> = [
    { text: 'I have described my AI feature design in detail', completed: false },
    { text: 'I have considered how my design handles user corrections and feedback', completed: false },
    { text: 'I have thought about how to communicate the AI\'s confidence levels', completed: false },
    { text: 'I have considered potential biases in my design and how to mitigate them', completed: false },
    { text: 'I have received feedback on how to improve my design', completed: false }
  ];

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white flex items-center">
          <Users className="w-10 h-10 mr-4 text-teal-300" />
          Lesson 6.2: Training a Super-Powered Service Animal
        </h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-6/6.1" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> From Idea to Impact
          </Link>
          <Link 
            to="/instructions/module-6/6.3" 
            onClick={() => completeLesson(6, 2)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next: Iterative Development <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Designing an AI is like training a highly intelligent service animal. You don't just want it to obey commands; you want it to be a reliable partner. This lesson covers the core principles of training this 'animal': fostering teamwork, building a strong bond of trust, understanding its signals, and ensuring it's fair and friendly to everyone it interacts with.
      </p>

      <Accordion title="Working as a Team, Not Master-Pet" icon={<Users className="w-6 h-6 mr-2 text-teal-400" />} isInitiallyOpen>
        <div className="space-y-4 text-gray-300">
          <p>Shift the mental model from a user commanding a tool to a user collaborating with a partner. This means setting clear expectations about the AI's capabilities and limitations right from the start. The user should always feel in control.</p>
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-white mb-2">Example</h4>
            <p className="text-sm text-gray-400">An AI writing assistant shouldn't just silently rewrite a sentence. It could offer suggestions with brief explanations, like: <span className='italic'>"Consider this alternative for a more concise tone."</span> This invites the user to make the final call.</p>
          </div>
        </div>
      </Accordion>

      <Accordion title="Building the Bond: Transparency and a 'Treat' for Good Behavior" icon={<ShieldCheck className="w-6 h-6 mr-2 text-green-400" />} isInitiallyOpen>
        <div className="space-y-4 text-gray-300">
          <p>You trust a service animal because you understand its training and can guide it. The same goes for AI. Build trust by being transparent—show users *why* the AI made a suggestion. Give them control to offer corrections, like giving a 'treat' for a job well done. This turns a mysterious 'black box' into a reliable partner.</p>
          <AiTrustMeter />
        </div>
      </Accordion>

      <Accordion title="Reading the Cues: Is Its Tail Wagging or Tucked?" icon={<Percent className="w-6 h-6 mr-2 text-purple-400" />} isInitiallyOpen>
        <div className="space-y-4 text-gray-300">
          <p>A good trainer knows the difference between a confident bark and a nervous whimper. Your AI needs to communicate its own uncertainty. Is it 95% sure or 55% sure? Clearly showing the AI's confidence level (its 'tail wag') helps users decide how much to trust a specific suggestion.</p>
          <UncertaintyVisualizer />
        </div>
      </Accordion>

      <Accordion title="Ensuring the Animal is Friendly to Everyone" icon={<Scale className="w-6 h-6 mr-2 text-yellow-400" />} isInitiallyOpen>
        <div className="space-y-4 text-gray-300">
          <p>You would never train a service animal to be aggressive towards certain types of people. Similarly, an AI trained on biased data can produce unfair or harmful outcomes. Designing for fairness is the ethical responsibility to ensure your AI 'animal' is helpful and equitable to everyone, regardless of their background.</p>
          <BiasExplorer />
        </div>
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
              role: 'assistant' as const,
              content: 'Welcome to your AI Design Critique session! I\'m here to help you evaluate and improve your AI feature design using the principles from this lesson.\n\nTo get started, describe your AI feature in detail. For example: "I\'m designing an AI that helps users pick a movie to watch based on their mood and preferences."\n\nI\'ll ask you questions to help you think through the user experience, trust factors, and potential biases in your design.'
            }
          ]}
          challengeChecklist={designCritiqueChecklist}
        />
      </section>

      {/* Validation Quiz */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Check Your Understanding</h2>
        <ModuleQuizzes questions={quizQuestions} />
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
          onClick={() => completeLesson(6, 2)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Iterative Development <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson6_2;
