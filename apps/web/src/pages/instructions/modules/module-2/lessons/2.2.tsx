import React from 'react';
import { Repeat, Anchor, AlertTriangle } from 'lucide-react';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import CopyButton from '../../../../../components/CopyButton';
import Accordion from '../../../components/Accordion';
import SummarizationChallenge from '../../../components/SummarizationChallenge';
import ExplicitReferencesTabs from '../../../components/ExplicitReferencesTabs';
import ContextContaminationDemo from '../../../components/ContextContaminationDemo';
import InstructionPriming from '../../../components/InstructionPriming';
import CommonPitfalls from '../../../components/CommonPitfalls';
import InlineChat from '../../../../../components/InlineChat';
import KeyTakeaways from '../../../components/KeyTakeaways';
import BestPractices from '../../../components/BestPractices';
import { contextManagementChecklist } from '@/prompts';
import quizQuestions from './utils/2.2.quizQuestions';
import initialConversation from './utils/2.2.initialConversation';

 

const Lesson2_2: React.FC = () => {
  return (
    <LessonTemplate
      moduleNumber={2}
      lessonNumber={2}
      title="Keeping Conversations Coherent"
      subtitle="Learn to actively manage the AI's context to prevent confusion and keep your conversations on track."
      quizQuestions={quizQuestions}
    >
      <section className="mb-6 bg-muted/30 border border-muted rounded-xl p-4">
        <p className="text-xs text-muted-foreground mb-2">Estimated time: 10–14 minutes</p>
        <h4 className="text-sm font-semibold mb-2 text-foreground">What you'll learn</h4>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>How to summarize and re-center to keep the AI aligned</li>
          <li>How to use explicit references as anchors</li>
          <li>When to start a fresh chat to avoid contamination</li>
        </ul>
      </section>
   <div className="space-y-8 bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <p className="text-lg text-gray-300">
          Now that you understand the AI's "memory" is a finite context window, let's learn how to actively manage it. Context contamination happens when irrelevant or conflicting details from earlier in the conversation start to confuse the AI, leading to off-topic or incorrect responses. These techniques will help you keep your conversations on track, even when tackling complex, multi-step problems.
        </p>

        <InstructionPriming />

    <div className="rounded-xl border-gray-700">
      <Accordion 
        title="Technique 1: Summarize and Re-center"
        icon={<Repeat className="w-7 h-7 mr-3 text-primary" />}
        isInitiallyOpen
      >
        <SummarizationChallenge />
      </Accordion>
    </div>

       <div className="rounded-xl border border-gray-700">
         <Accordion 
           title="Technique 2: Use Explicit References"
           icon={<Anchor className="w-7 h-7 mr-3 text-primary" />}
         >
           <ExplicitReferencesTabs />
         </Accordion>
       </div>

        <div className="rounded-xl border border-gray-700">
          <Accordion 
            title="Technique 3: Know When to Start Fresh"
            icon={<AlertTriangle className="w-7 h-7 mr-3 text-warning" />}
          >
            <ContextContaminationDemo />
            <div className="mt-4 bg-muted p-4 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">When to Start Fresh — Quick Checklist</h4>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
                <li>Persistent drift or repeated misunderstanding after re-centering attempts</li>
                <li>Conflicting instructions piled up over time</li>
                <li>Completely new task or audience</li>
                <li>Sensitive decision where prior context could bias the outcome</li>
              </ul>
            </div>

        <section className="mt-6 bg-muted/30 border border-muted rounded-xl p-4">
          <h4 className="text-sm font-semibold mb-2 text-foreground">You can now…</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Write concise summaries that re-center goals and constraints</li>
            <li>Direct the AI using explicit references to prior content</li>
            <li>Decide when to reset the chat to avoid drift</li>
          </ul>
        </section>
          </Accordion>
        </div>

        <CommonPitfalls />

        <div className="bg-card p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-card-foreground mb-3">Quick Templates</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Summarize & Re-center</p>
              <div className="relative">
                <CopyButton aria-label="Copy summarize template" textToCopy="Summary: We changed scope to focus on feature X for audience Y. Please ignore earlier references to feature Z. Based on the new scope, propose 3 options and explain trade-offs." />
                <div className="bg-muted p-3 rounded-md pr-10">
                  <code className="block whitespace-pre-wrap break-words font-mono text-sm text-foreground">Summary: We changed scope to focus on feature X for audience Y. Please ignore earlier references to feature Z. Based on the new scope, propose 3 options and explain trade-offs.</code>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Explicit Reference</p>
              <div className="relative">
                <CopyButton aria-label="Copy explicit reference template" textToCopy="Based on the second headline you suggested, rewrite it to emphasize our mission to unlock human creativity, and keep it under 10 words." />
                <div className="bg-muted p-3 rounded-md pr-10">
                  <code className="block whitespace-pre-wrap break-words font-mono text-sm text-foreground">Based on the second headline you suggested, rewrite it to emphasize our mission to unlock human creativity, and keep it under 10 words.</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-card-foreground">Putting It All Together: Final Challenge</h2>
          <p className="text-muted-foreground mb-4">
            Now, apply all the techniques you've learned. Start by summarizing the goal regularly to keep the AI focused on your objective. Use explicit references to direct the AI to specific details, like saying 'Make the second headline you suggested more inspiring by focusing on the mission to unlock human creativity' instead of 'Make it better.' Build on previous ideas by referencing them explicitly, and start fresh when the conversation becomes confused or off-track.
          </p>
          <InlineChat 
            moduleId="module-2.2-final-challenge"
            initialMessages={initialConversation} 
            placeholder="Practice all context management techniques..." 
            challengeChecklist={contextManagementChecklist}
            maxFollowUps={5}
            simulatedResponse="Excellent work! You've successfully guided the conversation using all the key techniques. You summarized the goal, used explicit references to ask for alternatives, and built upon the context to refine the final output."
          />
        </div>
      </div>

      <BestPractices dos={['Periodically summarize key points in long conversations to keep them in context.', 
        'Start new conversations for completely new topics to avoid context confusion.', 
        'If the AI gets confused, gently remind it of the most important instruction or piece of information.', 
        'Use clear, simple language, especially when establishing initial context.',]} 
        donts={['Don\'t assume the AI remembers details from many messages ago in a very long chat.', 
        'Avoid switching topics abruptly without resetting the context or starting a new chat.', 
        'Don\'t feed the AI massive, irrelevant documents and expect it to find the one key detail.', 
        'Avoid vague pronouns like \'it\' or \'that\' when referring to something from much earlier in the conversation.',]} />

      <KeyTakeaways 
              points={['Use the \'Summarize and Re-center\' technique to keep the AI focused on your objective.', 
              'Use explicit references to direct the AI to specific details.', 
              'Build on previous ideas by referencing them explicitly.', 
              'Start fresh when the conversation becomes confused or off-track.', 
              'Periodically summarize key points to keep them in context.', 
              'Start new conversations for completely new topics to avoid context confusion.', 
              'If the AI gets confused, gently remind it of the most important instruction or piece of information.', 
              'Use clear, simple language, especially when establishing initial context.', 
              'Don\'t assume the AI remembers details from many messages ago in a very long chat.', 
              'Avoid switching topics abruptly without resetting the context or starting a new chat.', 
              'Don\'t feed the AI massive, irrelevant documents and expect it to find the one key detail.', 
              'Avoid vague pronouns like \'it\' or \'that\' when referring to something from much earlier in the conversation.',]}
              />




    </LessonTemplate>
  );
};

export default Lesson2_2;
