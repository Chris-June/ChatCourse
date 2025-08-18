import React from 'react';
import { BrainCircuit, MessageSquare } from 'lucide-react';
import ContextExample from '../../../components/ContextExample';
import KeyTakeaways from '../../../components/KeyTakeaways';
import RollingWhiteboard from '../../../components/RollingWhiteboard';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import BestPractices from '../../../components/BestPractices';
import quizQuestions from './utils/2.1.quizQuestions';
import CheckpointQuiz from '@/pages/instructions/components/CheckpointQuiz';
import PortfolioPanel from '@/components/portfolio/PortfolioPanel';
import ArtifactViewer from '@/components/portfolio/ArtifactViewer';

const Lesson2_1: React.FC = () => {
  return (
    <LessonTemplate
      moduleNumber={2}
      lessonNumber={1}
      title="The Power of Context in AI"
      subtitle="Mastering the AI's 'working memory' is the key to unlocking complex, multi-step conversations."
      quizQuestions={quizQuestions}
    >
      <section className="mb-6 bg-muted/30 border border-muted rounded-xl p-4">
        <p className="text-xs text-muted-foreground mb-2">Estimated time: 8–12 minutes</p>
        <h4 className="text-sm font-semibold mb-2 text-foreground">What you'll learn</h4>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>What the AI's context window is and how it works</li>
          <li>Why long chats "forget" earlier messages</li>
          <li>How to manage context to keep the AI on track</li>
          <li>Practical do's and don'ts for context management</li>
        </ul>
      </section>

      <div className="space-y-8">
        <p className="text-lg text-muted-foreground max-w-prose">
          Have you ever had a conversation where you had to keep repeating yourself? It's frustrating. The same is true when talking to an AI. The key to a smooth, intelligent conversation is understanding and managing its 'memory'—what we call the <strong>context window</strong>.
        </p>

        {/* Myth vs Reality */}
        <section className="bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">Myth vs. Reality</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-background border border-border rounded-lg p-3">
              <h4 className="font-semibold text-destructive mb-1">Myth</h4>
              <p className="text-sm text-muted-foreground">“The AI remembers everything you say in a conversation.”</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-3">
              <h4 className="font-semibold text-success mb-1">Reality</h4>
              <p className="text-sm text-muted-foreground">The AI only uses what fits in its context window. Older content falls out; you must summarize or restate critical details.</p>
            </div>
          </div>
        </section>

        <section className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-card-foreground flex items-center">
            <BrainCircuit className="w-7 h-7 mr-3 text-primary" />
            What is a Context Window?
          </h2>
          <p className="text-muted-foreground mb-4 max-w-prose">
            Think of the context window as the AI's short-term memory. It's a finite space that holds the recent back-and-forth of your conversation, measured in <strong>tokens</strong>, which are the basic units of text that the AI processes. A token can be a single word, part of a word, or even a single character. Every new message you send, and every response the AI gives, gets added to this window. When the window gets full, the oldest messages are 'forgotten' to make room for new ones.
          </p>
          <RollingWhiteboard />
        </section>

        {/* Mini‑Glossary */}
        <section className="bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">Mini‑Glossary</h3>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li><strong>Context Window:</strong> The limited “working memory” measured in tokens.</li>
            <li><strong>Tokens:</strong> The units of text the model processes (words/sub‑words/characters).</li>
            <li><strong>Re‑centering:</strong> Summarizing goals/constraints to keep the model aligned.</li>
          </ul>
        </section>

        <section className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-card-foreground flex items-center">
            <MessageSquare className="w-7 h-7 mr-3 text-primary" />
            Why It's Your Most Powerful Tool
          </h2>
          <p className="text-muted-foreground mb-4 max-w-prose">
            Mastering the context window is the single most important skill for moving beyond simple, one-off questions. It's how you can have deep, multi-step conversations and guide the AI through complex tasks. For example, if you're building a marketing campaign, you can give the AI your brand guidelines in one message, your target audience in another, and your product details in a third. Without context, the AI would lose track of these details. With good context management, it uses all of this information to create a cohesive campaign.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-xl border border-border">
                  <h4 className="font-semibold text-success mb-2">Effective Context Management Leads To:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Coherent, logical follow-up responses.</li>
                      <li>The ability to build on previous ideas.</li>
                      <li>Not having to repeat instructions.</li>
                      <li>AI adapting its tone and style to the conversation.</li>
                      <li>Successful completion of complex, multi-part tasks.</li>
                  </ul>
              </div>
              <div className="bg-muted p-4 rounded-xl border border-border">
                  <h4 className="font-semibold text-destructive mb-2">Poor Context Management Leads To:</h4>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>The AI forgetting what you just told it.</li>
                      <li>Repetitive or contradictory answers.</li>
                      <li>Irrelevant or off-topic responses.</li>
                      <li>Frustration and wasted time.</li>
                      <li>Failure to complete the task correctly.</li>
                  </ul>
              </div>
          </div>
        </section>

        <ContextExample />
        <BestPractices
          dos={[
            'Periodically summarize key points in long conversations to keep them in context.',
            'Start new conversations for completely new topics to avoid context confusion.',
            'If the AI gets confused, gently remind it of the most important instruction or piece of information.',
            'Use clear, simple language, especially when establishing initial context.',
          ]}
          donts={[
            'Don\'t assume the AI remembers details from many messages ago in a very long chat.',
            'Avoid switching topics abruptly without resetting the context or starting a new chat.',
            'Don\'t feed the AI massive, irrelevant documents and expect it to find the one key detail.',
            'Avoid vague pronouns like \'it\' or \'that\' when referring to something from much earlier in the conversation.',
          ]}
        />
        
        <section className="mt-6 bg-muted/30 border border-muted rounded-xl p-4">
          <h4 className="text-sm font-semibold mb-2 text-foreground">You can now…</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Explain the context window and why forgetting happens</li>
            <li>Structure conversations to preserve important details</li>
            <li>Use summarization and reminders to keep the AI aligned</li>
          </ul>
        </section>

        {/* Quick Check */}
        <section className="bg-card p-4 rounded-xl border border-border">
          <h3 className="font-semibold text-card-foreground mb-3">Quick Check</h3>
          <CheckpointQuiz
            question={quizQuestions[0].questionText}
            options={quizQuestions[0].options}
            correctAnswerIndex={quizQuestions[0].options.indexOf(quizQuestions[0].correctAnswer)}
            explanation={quizQuestions[0].explanation}
          />
        </section>

        <KeyTakeaways points={[
          'The AI has a limited "working memory" (context window) that fills up like a whiteboard',
          'When memory is full, the oldest parts of your conversation are "forgotten"',
          'You can manage this by summarizing important details in long conversations',
          'Short conversations (under ~10 messages) rarely have memory issues',
          'If the AI seems confused, gently remind it of key details from earlier'
        ]} />

        {/* Portfolio: export artifacts and see saved items for this lesson */}
        <PortfolioPanel
          title="Portfolio"
          description="Export your collected artifacts anytime. Some lessons also provide a Save action."
          className="mt-4"
        />
        <ArtifactViewer module={2} lesson={1} className="mb-6" />
      </div>
    </LessonTemplate>
  );
};

export default Lesson2_1;
