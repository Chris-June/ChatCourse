import React from 'react';
import { Trophy, Sparkles } from 'lucide-react';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import Module1FinalChallenge from '../../../components/Module1FinalChallenge';
import PromptCritiquer from '@/pages/instructions/components/PromptCritiquer';
import KeyTakeaways from '../../../components/KeyTakeaways';
import CheckpointQuiz from '@/pages/instructions/components/CheckpointQuiz';

const Lesson1_8: React.FC = () => {
  return (
    <LessonTemplate
      moduleNumber={1}
      lessonNumber={8}
      title="Module 1 Challenge"
      subtitle="Put everything you've learned in Module 1 to the test."
      quizQuestions={[]}
    >
      <div className="space-y-8">
        <section className="mb-2 bg-muted/30 border border-muted rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-2">Estimated time: 12–18 minutes</p>
          <h4 className="text-sm font-semibold mb-2 text-foreground">What you'll learn</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Apply the I.N.S.Y.N.C. framework end‑to‑end on an open challenge</li>
            <li>Critique and iterate to reach target quality</li>
            <li>Produce a well‑structured, specific prompt and output</li>
          </ul>
        </section>
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-card-foreground flex items-center">
            <Trophy className="w-7 h-7 mr-3 text-primary" />
            Your Final Challenge
          </h2>
          <p className="text-muted-foreground mb-4">
            It's time to put everything you've learned in Module 1 to the test. This final challenge will assess your ability to use the I.N.S.Y.N.C. framework to solve a practical problem. Read the scenario carefully and craft the best prompt you can.
          </p>
          <p className="text-muted-foreground">
            Remember, this isn't just about getting a working answer; it's about demonstrating your skill in prompt engineering to get a high-quality, specific, and well-formatted response from the AI.
          </p>
        </div>

        {/* Myth vs. Reality callout to set expectations for the challenge */}
        <section className="bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">Myth vs. Reality</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-background border border-border rounded-lg p-3">
              <h4 className="font-semibold text-destructive mb-1">Myth</h4>
              <p className="text-sm text-muted-foreground">“A single prompt is enough—iteration means you failed.”</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-3">
              <h4 className="font-semibold text-success mb-1">Reality</h4>
              <p className="text-sm text-muted-foreground">Iteration is the method. Great results emerge from structured prompts plus feedback loops.</p>
            </div>
          </div>
        </section>

        {/* Practice: Critique a prompt before the final challenge */}
        <section className="mt-6">
          <PromptCritiquer />
        </section>

        {/* Interactive Challenge Component */}
        <Module1FinalChallenge />

        {/* Mini‑Glossary to reinforce core elements during the challenge */}
        <section className="bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">Mini‑Glossary</h3>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li><strong>Intent:</strong> The single sentence describing your goal.</li>
            <li><strong>Nuance:</strong> Constraints, specifics, and preferences that avoid generic output.</li>
            <li><strong>Style:</strong> Tone and personality of the response.</li>
            <li><strong>You as…:</strong> The role/persona that shapes knowledge and framing.</li>
            <li><strong>Narrative Format:</strong> The required output structure.</li>
            <li><strong>Context:</strong> Background details the AI must consider.</li>
          </ul>
        </section>

        {/* Quick Check to confirm key structural control */}
        <section className="bg-card p-4 rounded-xl border border-border">
          <h3 className="font-semibold text-card-foreground mb-3">Quick Check</h3>
          <CheckpointQuiz
            question="Which I.N.S.Y.N.C. element primarily controls the structure of the output?"
            options={[
              'Style',
              'Narrative Format',
              'Nuance',
              'You as…',
            ]}
            correctAnswerIndex={1}
            explanation="Narrative Format specifies how the response should be structured (e.g., bullets, table, JSON), making it the primary control for output shape."
          />
        </section>

        {/* Module Wrap-up */}
        <section className="bg-card p-6 rounded-xl border border-border shadow-sm mt-6">
          <h2 className="text-2xl font-semibold mb-3 text-card-foreground flex items-center">
              <Sparkles className="w-6 h-6 mr-3 text-primary"/>
              Module 1 Complete!
          </h2>
          <p className="text-muted-foreground mb-4">
            Congratulations! You've successfully built a foundational understanding of how AI works, how to communicate with it effectively, and how to use advanced frameworks like I.N.S.Y.N.C. to get powerful results.
          </p>
          <p className="text-muted-foreground font-semibold">
            You are now equipped with the core skills for sophisticated AI interaction. Keep practicing!
          </p>
        </section>

        <KeyTakeaways
          points={[
            'Define intent, then layer nuance, style, and persona for distinctiveness.',
            'State the narrative format explicitly to control structure and grading.',
            'Iterate with feedback—excellence is an iterative process, not a single shot.',
          ]}
        />
      </div>
    </LessonTemplate>
  );
};

export default Lesson1_8;
