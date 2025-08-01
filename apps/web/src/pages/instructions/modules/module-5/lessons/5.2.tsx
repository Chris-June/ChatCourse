import { Settings, Lightbulb, ShieldCheck, User, Briefcase } from 'lucide-react';
import LessonTemplate from '@/components/layouts/LessonTemplate';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import InlineChat from '@/components/InlineChat';
import ComparisonCard from '@/pages/instructions/components/ComparisonCard';

export interface ChallengeChecklistItem {
  text: string;
  completed: boolean;
}

export default function Lesson5_2() {
  const quizQuestions = [
    {
      questionText: 'What is the most common technical method for personalizing an AI\'s responses?',
      options: [
        'Using a larger AI model.',
        'Dynamically constructing a `system` prompt using user data.',
        'Speaking to the AI in a different language.',
        'Hard-coding responses for every possible user.'
      ],
      correctAnswer: 'Dynamically constructing a `system` prompt using user data.',
      explanation: 'The lesson explains that injecting user profile information into a system prompt template is the primary way to tailor the AI\'s behavior at scale.'
    },
    {
      questionText: 'What is the key difference between `static` and `dynamic` context in personalization?',
      options: [
        'Static context changes with every message, while dynamic context does not.',
        'Static context is general and user-defined (e.g., tone preference), while dynamic context is task-specific and injected by the application (e.g., current item being viewed).',
        'Static context is for the user, and dynamic context is for the assistant.',
        'There is no difference; the terms are interchangeable.'
      ],
      correctAnswer: 'Static context is general and user-defined (e.g., tone preference), while dynamic context is task-specific and injected by the application (e.g., current item being viewed).',
      explanation: 'Static context provides broad, reusable instructions based on user preferences, whereas dynamic context provides immediate, situational information for the current task.'
    },
    {
      questionText: 'Why is data privacy a critical ethical consideration for personalization?',
      options: [
        'Because it makes the AI more expensive to run.',
        'Because personalization requires handling user data, which must be done responsibly.',
        'Because it can make the AI\'s responses less accurate.',
        'Because it limits the number of users who can use the AI.'
      ],
      correctAnswer: 'Because personalization requires handling user data, which must be done responsibly.',
      explanation: 'Using personal data to tailor experiences is powerful but requires transparency and giving users control over their information to protect their privacy.'
    },
    {
      questionText: 'In the AI Tutor example, what piece of information is used to personalize the interaction?',
      options: [
        'The student\'s name, grade, and learning style.',
        'The current time of day.',
        'The AI\'s own name.',
        'The user\'s IP address.'
      ],
      correctAnswer: 'The student\'s name, grade, and learning style.',
      explanation: 'The system prompt for the tutor is dynamically created using the student\'s profile to make the learning experience more personal and effective.'
    },
    {
      questionText: 'What is the main benefit of personalizing an AI assistant?',
      options: [
        'It guarantees the AI will never make a mistake.',
        'It makes the AI\'s responses feel more personal, relevant, and useful to the individual user.',
        'It reduces the cost of running the AI model.',
        'It allows the AI to work offline.'
      ],
      correctAnswer: 'It makes the AI\'s responses feel more personal, relevant, and useful to the individual user.',
      explanation: 'The goal of personalization is to move from a one-size-fits-all assistant to one that understands and adapts to the specific needs and context of each user.'
    }
  ];


  const systemPrompt = `You are an expert Biology tutor. The student's name is Maria, a 10th grader who is a visual learner. Your goal is to help her with her homework on cell division for an upcoming exam. Be encouraging and use visual descriptions or analogies where possible.`;

  const personalizationChecklist: ChallengeChecklistItem[] = [
    { text: 'Did the AI use the student\'s name, Maria?', completed: false },
    { text: 'Did the AI acknowledge the subject (Biology) and topic (cell division)?', completed: false },
    { text: 'Did the AI offer visual explanations, catering to the learning style?', completed: false },
    { text: 'Was the tone encouraging and helpful?', completed: false }
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
                <Lightbulb className="w-5 h-5 mr-2" />
                The Personalization Playbook
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-300 mb-4">
                The secret to personalization isn't magic; it's just a clever use of the `system` prompt. By dynamically building a system prompt that includes user data, we can give the AI a personalized "briefing" before it even starts talking.
              </p>
              <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                <h3 className="font-semibold text-white mb-2">Example: The Dynamic System Prompt</h3>
                <p className="text-gray-300 mb-2">Imagine you have a user profile. You can use a template to inject their data right into the AI's instructions:</p>
                <div className="bg-gray-700 p-3 rounded-md">
                  <code className="block whitespace-pre-wrap break-words font-mono text-sm text-gray-200">
{`// User Data
const user = { name: "Alex", profession: "Software Engineer" };

// Template
const template = "You are a helpful assistant. The user's name is {{name}} and they work as a {{profession}}. Address them by name and tailor your examples to their field.";

// Final System Prompt
const finalPrompt = template.replace("{{name}}", user.name).replace("{{profession}}", user.profession);
// Result: "You are a helpful assistant. The user's name is Alex and they work as a Software Engineer..."`}
                  </code>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <div className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Static vs. Dynamic Context: Two Sides of the Same Coin
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-300 mb-4">
                Personalization relies on two types of context. A good system uses both.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ComparisonCard
                  title="Static Context (The User's Preferences)"
                  icon={<User className="text-blue-400" />}
                  points={[
                    '<strong>What it is:</strong> General, user-defined settings.',
                    '<strong>Example:</strong> `Tone: formal`, `Language: Spanish`, `Role: Marketing Expert`',
                    '<strong>Why it matters:</strong> Sets the baseline personality and behavior of the AI.',
                    '<strong>Changes infrequently.</strong>',
                  ]}
                  bgColorClass="bg-blue-900/50 border-blue-700"
                />
                <ComparisonCard
                  title="Dynamic Context (The User's Situation)"
                  icon={<Briefcase className="text-green-400" />}
                  points={[
                    '<strong>What the user is doing now:</strong> Real-time application state.',
                    '<strong>Example:</strong> `The user is viewing a product named \'X-12 Sneaker\'.`',
                    '<strong>Why it matters:</strong> Provides immediate, situational relevance.',
                    '<strong>Changes constantly.</strong>',
                  ]}
                  bgColorClass="bg-green-900/50 border-green-700"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <div className="flex items-center">
                <ShieldCheck className="w-5 h-5 mr-2" />
                The Concierge's Code of Ethics
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-300 mb-4">
                A great concierge is trustworthy. Personalization is built on user data, and handling that data responsibly is non-negotiable.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li><strong>Transparency is Key:</strong> Be upfront about what data you collect and why.</li>
                <li><strong>Give Users Control:</strong> Provide clear, accessible settings for users to manage their data and personalization preferences.</li>
                <li><strong>Security First:</strong> Protect user data as if it were your own.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-4">
            <AccordionTrigger>
              <div className="flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Your Turn: Interact with a Personalized Tutor
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-300 mb-4">
                Let's see personalization in action. The AI in the chat window below has been given a dynamic system prompt based on the following student profile:
              </p>
              <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700 mb-4">
                <div className="bg-gray-700 p-3 rounded-md">
                  <code className="block whitespace-pre-wrap break-words font-mono text-xs text-gray-200">
{`const studentProfile = {
  name: "Maria",
  grade: 10,
  subjects: ["Biology", "History"],
  learning_style: "visual",
  goal: "Get help with homework for her upcoming Biology exam on cell division."
};`}
                  </code>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Pretend you are Maria. Ask for help with your biology homework and see how the AI responds. Notice if it mentions your learning style or tries to be encouraging.
              </p>
              <InlineChat 
                moduleId="module-5.2-personalized-tutor"
                maxAttempts={5}
                maxFollowUps={3}
                placeholder='Try asking: "Can you help me understand mitosis?"'
                systemPrompt={systemPrompt}
                initialMessages={[
                  {
                    role: 'assistant',
                    content: `Hi Maria! I'm here to help you with your Biology exam on cell division. Since you're a visual learner, I'll include diagrams and analogies to help you understand better. What specific topic would you like to review first?`
                  }
                ]}
                challengeChecklist={personalizationChecklist}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

      </div>
    </LessonTemplate>
  );
}