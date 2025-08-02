import { Bot, Scale, Puzzle, Package } from 'lucide-react';
import LessonTemplate from '@/components/layouts/LessonTemplate';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import InlineChat, { ChallengeChecklistItem } from '@/components/InlineChat';

import KeyTakeaways from '../../../components/KeyTakeaways';
import BestPractices from '../../../components/BestPractices';
import CheckpointQuiz from '../../../components/CheckpointQuiz';
import PromptPersonalizationSandbox from '../../../components/PromptPersonalizationSandbox';
import PersonalizationComparison from '../../../components/PersonalizationComparison';
import ContextDecisionGame from '../../../components/ContextDecisionGame';
import TokenBudgetGuide from '../../../components/TokenBudgetGuide';
import ContextUpdateSimulator from '../../../components/ContextUpdateSimulator';
import EthicalDilemma from '../../../components/EthicalDilemma';
import BestPracticesAudit from '../../../components/BestPracticesAudit';
import PersonalizedAgentBuilder from '../../../components/PersonalizedAgentBuilder';

export default function Lesson5_2() {
  const keyTakeawaysData = [
    'Personalization is primarily achieved by dynamically constructing a `system` prompt with user data.',
    'Static context is general and user-defined (e.g., tone preference), while dynamic context is task-specific (e.g., current item being viewed).',
    'Data privacy and user control are critical ethical considerations for personalization.',
    'The goal of personalization is to make AI responses more relevant, useful, and adapted to the individual.',
  ];

  const bestPracticesData = {
    dos: [
      'Be transparent about what data you collect and why.',
      'Provide clear, accessible settings for users to manage their data.',
      'Securely protect all user data.',
    ],
    donts: [
      "Don't collect more data than is necessary for the personalization feature.",
      "Don't use personal data in ways the user hasn't consented to.",
      "Don't make it difficult for users to opt-out of personalization.",
    ],
  };

  const quizQuestions = [
    {
      questionText: "What is the most common technical method for personalizing an AI's responses?",
      options: [
        'Using a larger AI model.',
        'Dynamically constructing a `system` prompt using user data.',
        'Speaking to the AI in a different language.',
        'Hard-coding responses for every possible user.',
      ],
      correctAnswer: 'Dynamically constructing a `system` prompt using user data.',
      explanation: 'The lesson explains that injecting user profile information into a system prompt template is the primary way to tailor the AI\'s behavior at scale.',
    },
    {
      questionText: 'What is the key difference between `static` and `dynamic` context in personalization?',
      options: [
        'Static context changes with every message, while dynamic context does not.',
        'Static context is general and user-defined (e.g., tone preference), while dynamic context is task-specific and injected by the application (e.g., current item being viewed).',
        'Static context is for the user, and dynamic context is for the assistant.',
        'There is no difference; the terms are interchangeable.',
      ],
      correctAnswer: 'Static context is general and user-defined (e.g., tone preference), while dynamic context is task-specific and injected by the application (e.g., current item being viewed).',
      explanation: 'Static context provides broad, reusable instructions based on user preferences, whereas dynamic context provides immediate, situational information for the current task.',
    },
  ];

  const systemPrompt = `You are an expert Biology tutor. The student's name is Maria, a 10th grader who is a visual learner. Your goal is to help her with her homework on cell division for an upcoming exam. Be encouraging and use visual descriptions or analogies where possible.`;

  const checklistItems: ChallengeChecklistItem[] = [
    { id: 'c1', text: 'Did the AI address you by name (Maria)?', completed: false },
    { id: 'c2', text: 'Did the AI mention your learning style (visual)?', completed: false },
    { id: 'c3', text: 'Did the AI offer to help with your specific goal (Biology exam)?', completed: false },
    { id: 'c4', text: 'Was the tone of the AI encouraging and helpful?', completed: false },
  ];

  return (
    <LessonTemplate
      moduleNumber={5}
      lessonNumber={2}
      title="The Personal Concierge: AI That Knows You"
      subtitle="By weaving user-specific details into the conversation, we transform a one-size-fits-all tool into a bespoke assistant that feels uniquely helpful."
      quizQuestions={quizQuestions}
    >
      <div className="space-y-8">
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center">
                <Bot className="w-5 h-5 mr-2" />
                The Personalization Playbook
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-300 mb-4">
                Personalization is what transforms a generic AI into *your* AI. It's the difference between a tool that answers questions and a partner that anticipates your needs. The core technical method to achieve this is by dynamically constructing the `system` prompt using stored user data and real-time context.
              </p>
              <h4 className="font-semibold text-lg text-white mt-6 mb-2">Before vs. After Personalization</h4>
              <p className="text-sm text-gray-400 mb-4">Showing generic vs. personalized responses makes the impact instantly clear.</p>
              <PersonalizationComparison />
              <h4 className="font-semibold text-lg text-white mt-6 mb-2">Practice Your Prompting Skills</h4>
              <p className="text-sm text-gray-400 mb-4">This sandbox reinforces how personalization is implemented and gives you reusable code patterns.</p>
              <PromptPersonalizationSandbox />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div className="flex items-center">
                <Scale className="w-5 h-5 mr-2" />
                Static vs. Dynamic Context
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-300 mb-4">
                To personalize effectively, we need to manage two types of context. A good system uses both, just like a smart home assistant. The static context is your set of core preferences... This is stored and rarely changes. The dynamic context is what's happening *right now*... By combining the two, the assistant can make a truly intelligent decision.
              </p>
              <h4 className="font-semibold text-lg text-white mt-6 mb-2">Game: Which Context Applies?</h4>
              <p className="text-sm text-gray-400 mb-4">This game builds fluency in distinguishing static from dynamic context.</p>
              <ContextDecisionGame />
              <h4 className="font-semibold text-lg text-white mt-6 mb-2">The Cost of Context: Token Budgeting</h4>
              <p className="text-sm text-gray-400 mb-4">This guide teaches the practical tradeoffs of managing context within token limits.</p>
              <TokenBudgetGuide />
              <h4 className="font-semibold text-lg text-white mt-6 mb-2">Simulating Context Updates</h4>
              <p className="text-sm text-gray-400 mb-4">This simulator makes the abstract architecture of state-aware apps more tangible.</p>
              <ContextUpdateSimulator />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              <div className="flex items-center">
                <Puzzle className="w-5 h-5 mr-2" />
                Your Turn: Interact with a Personalized Tutor
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-300 mb-4">
                Let's see personalization in action. The AI in the chat window below has been given a dynamic system prompt based on the student profile we've discussed. Pretend you are Maria. Ask for help with your biology homework and see how the AI responds. See if you can check off all the items in the list below.
              </p>
              <InlineChat
                moduleId="module-5.2-personalized-tutor"
                systemPrompt={systemPrompt}
                challengeChecklist={checklistItems}
                placeholder='Try asking: "Can you help me understand mitosis?"'
                initialMessages={[
                  {
                    role: 'assistant',
                    content: `Hi Maria! I'm here to help you with your Biology exam on cell division. Since you're a visual learner, I'll include diagrams and analogies to help you understand better. What specific topic would you like to review first?`
                  }
                ]}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="my-6">
          <CheckpointQuiz
            question={quizQuestions[0].questionText}
            options={quizQuestions[0].options}
            correctAnswerIndex={quizQuestions[0].options.findIndex(opt => opt === quizQuestions[0].correctAnswer)}
            explanation={quizQuestions[0].explanation}
          />
        </div>

        <KeyTakeaways points={keyTakeawaysData} />

        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 flex items-center"><Package className="mr-2" /> Best Practices & Ethical Considerations</h3>
          <p className="text-gray-400 mb-4">With great power comes great responsibility. Personalization requires a commitment to user privacy and ethical data handling.</p>
          <BestPractices dos={bestPracticesData.dos} donts={bestPracticesData.donts} />
          <h4 className="font-semibold text-lg text-white mt-6 mb-2">Ethical Dilemmas: What Would You Do?</h4>
          <p className="text-sm text-gray-400 mb-4">Apply privacy best practices in gray-area situations to sharpen your ethical instincts.</p>
          <EthicalDilemma />
          <h4 className="font-semibold text-lg text-white mt-6 mb-2">Audit a Use Case</h4>
          <p className="text-sm text-gray-400 mb-4">Evaluate whether a sample AI use case follows the dos and don'ts, turning theory into judgment-based evaluation.</p>
          <BestPracticesAudit />
        </div>

        <div className="my-6">
          <CheckpointQuiz
            question={quizQuestions[1].questionText}
            options={quizQuestions[1].options}
            correctAnswerIndex={quizQuestions[1].options.findIndex(opt => opt === quizQuestions[1].correctAnswer)}
            explanation={quizQuestions[1].explanation}
          />
        </div>

        <PersonalizedAgentBuilder />

      </div>
    </LessonTemplate>
  );
}