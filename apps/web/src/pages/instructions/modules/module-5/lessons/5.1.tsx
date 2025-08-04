import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import BestPractices from '@/pages/instructions/components/BestPractices';
import ContextCaseStudies from '@/pages/instructions/components/ContextCaseStudies';
import ContextExplorer from '@/pages/instructions/components/ContextExplorer';
import ContextWindowVisualizer from '@/pages/instructions/components/ContextWindowVisualizer';
import DebuggingChallenge from '@/pages/instructions/components/DebuggingChallenge';
import FailedPrompts from '@/pages/instructions/components/FailedPrompts';
import KeyTakeaways from '@/pages/instructions/components/KeyTakeaways';
import LessonTemplate from '@/components/layouts/LessonTemplate';
import ModuleQuizzes from '@/pages/instructions/modules/ModuleQuizzes/ModuleQuizzes';
import RoleScriptingSandbox from '@/pages/instructions/components/RoleScriptingSandbox';
import SystemPromptLab from '@/pages/instructions/components/SystemPromptLab';
import {
  AlertTriangle,
  BookOpen,
  Lightbulb,
  MessageSquare,
  TestTube2,
} from 'lucide-react';

const Lesson5_1 = () => {
  const quizQuestions = [
    {
      questionText:
        'What is the primary purpose of sending the conversation history with each new user message?',
      options: [
        "To make the AI's response slower.",
        "To provide the AI with 'context' or short-term memory.",
        "To log the user's data for advertising.",
        'To check for spelling errors.',
      ],
      correctAnswer: "To provide the AI with 'context' or short-term memory.",
      explanation:
        'The history allows the AI to understand follow-up questions and maintain a coherent dialogue, acting as its memory for the current conversation.',
    },
    {
      questionText:
        'In the standard conversation structure, what are the three main `role` types?',
      options: [
        '`human`, `robot`, `observer`',
        '`input`, `output`, `error`',
        '`user`, `assistant`, `system`',
        '`client`, `server`, `database`',
      ],
      correctAnswer: '`user`, `assistant`, `system`',
      explanation:
        "These three roles define who is speaking: the end-user, the AI itself, and a high-level instruction that guides the AI's behavior.",
    },
    {
      questionText: 'What is the function of the `system` role in a conversation?',
      options: [
        'It represents the last message sent by the user.',
        "It provides a high-level instruction to set the AI's persona and rules for the entire conversation.",
        'It indicates an error message from the server.',
        "It is the AI's final response.",
      ],
      correctAnswer:
        "It provides a high-level instruction to set the AI's persona and rules for the entire conversation.",
      explanation:
        'The system prompt acts like a director giving instructions to an actor before a scene. It sets the stage for all subsequent interactions.',
    },
    {
      questionText:
        "What happens if a conversation's history exceeds the model's 'context window'?",
      options: [
        'The AI responds with an error.',
        'The AI automatically summarizes the history.',
        'The model "forgets" the earliest parts of the conversation.',
        'The context window expands automatically.',
      ],
      correctAnswer:
        'The model "forgets" the earliest parts of the conversation.',
      explanation:
        'The context window is a fixed size. If the history exceeds this limit, the oldest messages are truncated, leading to a loss of memory about the early parts of the dialogue.',
    },
  ];

  return (
    <LessonTemplate
      moduleNumber={5}
      lessonNumber={1}
      title="The Art of Context"
      subtitle="How an AI Remembers and Reasons"
    >
      <div className="space-y-6 text-card-foreground">
        <p className="text-muted-foreground">
          Welcome to the director's room. An AI, like an actor, knows only what's
          in the script. In AI conversations, that script is called{' '}
          <strong className="text-foreground">context</strong>. It's the
          collection of past messages—the conversation history—that gives the AI
          its memory.
        </p>

        <div className="p-4 border rounded-lg bg-muted">
          <ContextWindowVisualizer />
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                The Script: Anatomy of a Conversation
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                Every conversation with an AI is a structured script, typically
                an array of message objects. Each object has two key
                properties: <code className="font-mono bg-muted p-1 rounded">role</code> and{' '}
                <code className="font-mono bg-muted p-1 rounded">content</code>. Understanding these
                roles is fundamental.
              </p>
              <ContextCaseStudies />
              <div className="p-4 border rounded-lg bg-background">
                <h4 className="font-bold text-foreground mb-2">
                  The Three Core Roles:
                </h4>
                <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                  <li>
                    <strong className="text-foreground">
                      <code className="font-mono bg-muted p-1 rounded">system</code>:
                    </strong>{' '}
                    The Director's Note. A high-level instruction that sets the
                    AI's persona, rules, and goals for the entire conversation.
                    It's usually the first message.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      <code className="font-mono bg-muted p-1 rounded">user</code>:
                    </strong>{' '}
                    The User's Line. This is the input from the human user.
                  </li>
                  <li>
                    <strong className="text-foreground">
                      <code className="font-mono bg-muted p-1 rounded">assistant</code>:
                    </strong>{' '}
                    The AI's Line. This is the AI's own response. The history
                    includes these to remind the AI what it has already said.
                  </li>
                </ul>
                <RoleScriptingSandbox />
                <FailedPrompts />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-primary" />
                The Cutting Room Floor: A Debugging Challenge
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                Even the best directors make mistakes. Sometimes, the script
                gets corrupted—roles are mislabeled, or lines are out of order.
                This is the "bad take." In this challenge, you're the editor.
                Find the continuity errors in these broken scripts and fix them.
                This structure is not just a suggestion; it's the blueprint for
                how the AI perceives the world.
              </p>
              <DebuggingChallenge />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-primary" />
                Live Rehearsal: The Context Explorer
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                Watch the script get written in real-time! As you chat on the
                left, you'll see the raw message array—our script—being built on
                the right. This reveals exactly what the AI "sees" at every
                moment of the conversation. Notice how the script grows, and how
                every new line depends on the ones before it.
              </p>
              <ContextExplorer />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex items-center">
                <TestTube2 className="w-5 h-5 mr-2 text-primary" />
                Director's Chair: The System Prompt Lab
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              <p className="text-muted-foreground">
                You are the director. The{' '}
                <code className="font-mono bg-muted p-1 rounded">system</code>{' '}
                prompt is your chance to give powerful, scene-setting
                instructions to your AI actor. Use this lab to experiment.
                Direct the AI to be a pirate, a scientist, or a poet. See how a
                single, well-crafted sentence can completely change the tone and
                direction of the entire performance.
              </p>
              <SystemPromptLab />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <KeyTakeaways
          points={[
            'Context is King: Conversation history provides the AI with short-term memory, which is essential for coherent dialogue.',
            'Defined Roles: Every message has a `role` (`system`, `user`, or `assistant`) to structure the conversation.',
            "The Director's Note: The `system` prompt sets the AI's persona and overarching instructions.",
            "Quality In, Quality Out: The AI's performance is directly tied to the clarity and accuracy of the context you provide.",
            "Finite Memory: Be mindful of the model's 'context window'—the maximum amount of information it can process at once.",
          ]}
        />

        <BestPractices
          dos={[
            'Keep the conversation history clean and well-structured.',
            'Use the `system`, `user`, and `assistant` roles correctly and consistently.',
            'For long conversations, develop a strategy to summarize or trim the history to stay within the context window.',
          ]}
          donts={[
            "Don't send corrupted or inaccurate data in the history; this will degrade performance.",
            "Don't mislabel roles, as this will confuse the model.",
            "Don't exceed the context window without a plan, as the model will 'forget' early parts of the conversation.",
          ]}
        />

        <div
          id="knowledge-check"
          className="p-6 bg-muted border border-border rounded-lg mt-6"
        >
          <div className="flex items-center mb-4">
            <BookOpen className="w-6 h-6 mr-3 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">
              Knowledge Check
            </h3>
          </div>
          <p className="text-muted-foreground mb-6">
            Test your understanding of context and conversation structure.
          </p>
          <ModuleQuizzes questions={quizQuestions} />
        </div>
      </div>
    </LessonTemplate>
  );
};

export default Lesson5_1;