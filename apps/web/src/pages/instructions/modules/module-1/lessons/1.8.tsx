import React from 'react';
import { Trophy, Sparkles } from 'lucide-react';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import Module1FinalChallenge from '../../../components/Module1FinalChallenge';

const Lesson1_8: React.FC = () => {
  return (
    <LessonTemplate
      moduleNumber={1}
      lessonNumber={8}
      title="1.8: Module 1 Challenge"
      subtitle="Put everything you've learned in Module 1 to the test."
      quizQuestions={[]}
    >
      <div className="space-y-8 text-gray-200">
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-300 flex items-center">
            <Trophy className="w-7 h-7 mr-3 text-yellow-400" />
            Your Final Challenge
          </h2>
          <p className="text-gray-300 mb-4">
            It's time to put everything you've learned in Module 1 to the test. This final challenge will assess your ability to use the I.N.S.Y.N.C. framework to solve a practical problem. Read the scenario carefully and craft the best prompt you can.
          </p>
          <p className="text-gray-300">
            Remember, this isn't just about getting a working answer; it's about demonstrating your skill in prompt engineering to get a high-quality, specific, and well-formatted response from the AI.
          </p>
        </div>

        {/* Interactive Challenge Component */}
        <Module1FinalChallenge />

        {/* Module Wrap-up */}
        <section className="bg-blue-900/30 p-6 rounded-xl shadow-lg border border-blue-700 mt-6">
          <h2 className="text-2xl font-semibold mb-3 text-white flex items-center">
              <Sparkles className="w-6 h-6 mr-3 text-blue-300"/>
              Module 1 Complete!
          </h2>
          <p className="text-blue-200 mb-4">
            Congratulations! You've successfully built a foundational understanding of how AI works, how to communicate with it effectively, and how to use advanced frameworks like I.N.S.Y.N.C. to get powerful results.
          </p>
          <p className="text-blue-200 font-semibold">
            You are now equipped with the core skills for sophisticated AI interaction. Keep practicing!
          </p>
        </section>
      </div>
    </LessonTemplate>
  );
};

export default Lesson1_8;
