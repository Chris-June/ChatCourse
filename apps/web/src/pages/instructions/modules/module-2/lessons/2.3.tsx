import React from 'react';
import { Target, Bot } from 'lucide-react';
import CopyButton from '../../../../../components/CopyButton';
import InlineChat, { type ChallengeChecklistItem } from '../../../../../components/InlineChat';
import Accordion from '../../../components/Accordion';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import KeyTakeaways from '../../../components/KeyTakeaways';
import BestPractices from '../../../components/BestPractices';
import { socraticTutorChecklist } from '@/prompts';
import quizQuestions from './utils/2.3.quizQuestions';

// checklist centralized in prompts

const Lesson2_3: React.FC = () => {
  
  return (
    <LessonTemplate
      moduleNumber={2}
      lessonNumber={3}
      title="Practice Context Management with a Persona"
      subtitle="Create and maintain a Socratic Tutor persona to practice re-centering and explicit references."
      quizQuestions={quizQuestions}
    >
      <section className="mb-6 bg-muted/30 border border-muted rounded-xl p-4">
        <p className="text-xs text-muted-foreground mb-2">Estimated time: 10–15 minutes</p>
        <h4 className="text-sm font-semibold mb-2 text-foreground">What you'll learn</h4>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>How to establish a clear, enforceable persona with a system prompt</li>
          <li>Re-centering techniques when the model drifts from the rules</li>
          <li>Hands-on practice managing context over multiple turns</li>
          <li>Evaluating success with a simple, observable checklist</li>
        </ul>
      </section>
      <div className="bg-muted/30 border border-muted rounded-xl p-4 mb-6">
        <p className="text-sm text-muted-foreground">
          Why personas? Maintaining a consistent AI persona forces you to practice priming, re-centering, and explicit referencing. Expect ~10 minutes to set up your persona and complete the guided exercise.
        </p>
      </div>
      <div className="space-y-8">
        <p className="text-lg text-muted-foreground">
          It's time to put your new skills to the test! This project challenges you to use this very chat interface to create and maintain a consistent AI persona over multiple turns. This is about practicing context management: the skill of deliberately guiding the AI by providing, reinforcing, and clarifying information to keep the conversation coherent and on-task.
        </p>

        <p className="text-muted-foreground mb-4">
          Think of your system prompt as the AI's "character sheet"—it defines who the AI is and how it should behave. Unlike regular conversation, this persona persists throughout the entire interaction unless you explicitly change it.
        </p>
        
        <p className="text-muted-foreground mb-4">
          Context management isn't just about memory—it's an active skill of guiding the AI's attention and maintaining your intended persona. You'll practice re-centering the AI when it starts to drift from your established character, like gently reminding someone of their role in a play.
        </p>

        <Accordion
          title="Project Objective"
          icon={<Target className="w-7 h-7 mr-3 text-primary" />}
          isInitiallyOpen
        >
          <p className="text-muted-foreground">
            Your mission is to create a 'Socratic Tutor' persona. This AI's goal is to teach a concept not by giving answers directly, but by asking guiding questions to help you discover the answer yourself. This requires careful context management to remember the topic, your progress, and its own persona.
          </p>
        </Accordion>

        <Accordion
          title="Step 1: Define the Persona (The System Prompt)"
          icon={<Bot className="w-7 h-7 mr-3 text-primary" />}
        >
          <p className="text-muted-foreground mb-4">
            Start a new chat and use your first message to set the stage. This first message is called a system prompt. It's the foundational instruction that the AI will refer back to throughout the entire conversation to remember its role and rules. This is the most critical step.
          </p>
          <div className="bg-card p-4 rounded-lg border border-border">
            <h3 className="font-semibold text-foreground mb-2">Your Task:</h3>
            <p className="text-muted-foreground mb-3">Copy and paste the following prompt into the chat window as your first message.</p>
            <div className="relative">
              <CopyButton aria-label="Copy Socratic Tutor persona prompt" textToCopy="You are Gnosi, a Socratic Tutor. Your goal is to help me understand a topic by only asking guiding questions. Never give direct answers. Start by asking me what I want to learn about." />
              <div className="bg-muted p-3 rounded-md pr-10">
                <code className="block whitespace-pre-wrap break-words font-mono text-sm text-foreground">
                  You are Gnosi, a Socratic Tutor. Your goal is to help me understand a topic by only asking guiding questions. Never give direct answers. Start by asking me what I want to learn about.
                </code>
              </div>
            </div>
          </div>
        </Accordion>

        <div className="bg-card p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-card-foreground mb-3">Quick Re-centering Phrases</h3>
          <p className="text-sm text-muted-foreground mb-3">Click to copy a gentle nudge if the AI drifts from the Socratic persona.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="relative">
              <CopyButton aria-label="Copy re-centering phrase 1" textToCopy="Remember, you are a Socratic tutor. Please respond with guiding questions only—no direct answers." />
              <div className="bg-muted p-3 rounded-md pr-10">
                <code className="block whitespace-pre-wrap break-words font-mono text-sm text-foreground">Remember, you are a Socratic tutor. Please respond with guiding questions only—no direct answers.</code>
              </div>
            </div>
            <div className="relative">
              <CopyButton aria-label="Copy re-centering phrase 2" textToCopy="Re-center: ask me a clarifying question that builds on my last response instead of giving the answer." />
              <div className="bg-muted p-3 rounded-md pr-10">
                <code className="block whitespace-pre-wrap break-words font-mono text-sm text-foreground">Re-center: ask me a clarifying question that builds on my last response instead of giving the answer.</code>
              </div>
            </div>
            <div className="relative">
              <CopyButton aria-label="Copy re-centering phrase 3" textToCopy="Please continue in Socratic style: short, focused questions that help me reason step by step." />
              <div className="bg-muted p-3 rounded-md pr-10">
                <code className="block whitespace-pre-wrap break-words font-mono text-sm text-foreground">Please continue in Socratic style: short, focused questions that help me reason step by step.</code>
              </div>
            </div>
            <div className="relative">
              <CopyButton aria-label="Copy re-centering phrase 4" textToCopy="Switch back to questions. Avoid statements or conclusions; guide me to derive them." />
              <div className="bg-muted p-3 rounded-md pr-10">
                <code className="block whitespace-pre-wrap break-words font-mono text-sm text-foreground">Switch back to questions. Avoid statements or conclusions; guide me to derive them.</code>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-xl font-semibold text-card-foreground mb-3">Exemplar Transcript (3 turns)</h3>
          <div className="bg-muted p-3 rounded-md">
            <code className="block whitespace-pre-wrap break-words font-mono text-sm text-foreground">
User: I want to learn recursion.
AI (Gnosi): Great—what part of recursion feels unclear: the concept, the base case, or how it unwinds?
User: The base case.
AI (Gnosi): If we think of a function calling itself, what must be true to stop the calls from continuing forever?
            </code>
          </div>
        </div>

        <section className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <p className="text-muted-foreground mb-4">
            <strong>Project Objective:</strong> Create a Socratic tutor persona that guides users through learning concepts by asking thoughtful questions rather than providing direct answers. Your system prompt should establish this role clearly and provide specific instructions on how to respond.
          </p>
          
          <p className="text-muted-foreground mb-4">
            <strong>Challenge:</strong> Practice maintaining this persona throughout a conversation. When the AI starts to drift (giving direct answers instead of questions), use re-centering techniques like: "Remember, as a Socratic tutor, your role is to guide through questions..." to bring it back to the established approach.
          </p>
          <p className="text-muted-foreground mb-4">
            Use the chat window below to complete the project. Start by pasting the persona prompt from Step 1. If the AI starts giving direct answers instead of asking questions, gently remind it of its role by saying something like: 'Remember, you are Gnosi, a Socratic tutor who only asks questions.' The evaluation criteria will be tracked as a checklist inside the chat window.
          </p>
          <InlineChat 
            moduleId="module-2.3-project"
            placeholder="Your conversation with the Socratic Tutor..."
            maxFollowUps={15}
            challengeChecklist={socraticTutorChecklist.map((item): ChallengeChecklistItem => ({ ...item }))}
          />
        </section>
      </div>

      <BestPractices
        dos={[
          "Gently re-center the AI if it drifts from its persona. For example: 'Remember, you're acting as a Socratic tutor, so please only ask questions.'",
          "Periodically summarize key facts or decisions in a long conversation to reinforce context. For example: 'Okay, so we've decided on a 3-day trip to Tokyo with a focus on temples and technology.'",
          "Refer to past information explicitly. Instead of 'What about that idea?', say 'What about the idea of using QR codes on the packaging we discussed?'"
        ]}
        donts={[
          "Don't use ambiguous pronouns like 'it' or 'that' when the subject is far back in the conversation.",
          "Avoid mixing completely unrelated tasks in the same chat. Start a new conversation to ensure a clean context.",
          "Don't assume the AI perfectly recalls minor details from very long conversations. Reiterate important information if needed."
        ]}
      />
      
      <section className="mt-6 bg-muted/30 border border-muted rounded-xl p-4">
        <h4 className="text-sm font-semibold mb-2 text-foreground">You can now…</h4>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Create and maintain a Socratic tutor persona</li>
          <li>Re-center the AI when it violates persona constraints</li>
          <li>Use checklists and examples to guide multi-turn behavior</li>
        </ul>
      </section>

      <KeyTakeaways
        points={[
          'Context management is the skill of deliberately guiding the AI by providing, reinforcing, and clarifying information to keep the conversation coherent and on-task.',
          'Maintaining a persona is a great test of your ability to use techniques like priming and re-centering to ensure the AI doesn\'t lose track of its core goal.',
          'Context management isn\'t just about memory—it\'s an active skill of guiding the AI\'s attention and maintaining your intended persona.'
        ]}
      />
    </LessonTemplate>
  );
};

export default Lesson2_3;
