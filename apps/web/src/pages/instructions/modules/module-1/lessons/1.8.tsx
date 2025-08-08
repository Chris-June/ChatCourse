import React from 'react';
import { Trophy, Sparkles } from 'lucide-react';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import Module1FinalChallenge from '../../../components/Module1FinalChallenge';
import PromptCritiquer from '@/pages/instructions/components/PromptCritiquer';

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

        {/* Practice: Critique a prompt before the final challenge */}
        <section className="mt-6">
          <PromptCritiquer />
        </section>

        {/* Interactive Challenge Component */}
        <Module1FinalChallenge />

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
      </div>
    </LessonTemplate>
  );
};

export default Lesson1_8;
