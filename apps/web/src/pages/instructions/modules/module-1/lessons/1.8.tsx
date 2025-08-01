import React from 'react';
import { Trophy, Sparkles } from 'lucide-react';
import LessonHeader from '../../../../../components/layouts/LessonHeader';
import LessonFooter from '../../../../../components/layouts/LessonFooter';
import { useProgressStore } from '../../../../../store/progressStore';
import Module1FinalChallenge from '../../../components/Module1FinalChallenge';

const Lesson1_8: React.FC = () => {
  const { completeLesson } = useProgressStore();

  return (
    <div className="space-y-8 p-4 md:p-6 text-gray-200">
      <LessonHeader 
        title="1.8: Module 1 Challenge"
        subtitle="Put everything you've learned in Module 1 to the test."
      />

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-300 flex items-center">
          <Trophy className="w-7 h-7 mr-3 text-yellow-400" />
          Module 1 Final Challenge
        </h2>
        <p className="text-gray-300 mb-4">
          You've explored the core concepts, mastered the I.N.S.Y.N.C. framework, and learned advanced techniques. Now, it's time to bring it all together.
        </p>
        <p className="text-gray-300">
          This final capstone challenge will test your ability to synthesize these skills to solve a realistic, multi-part problem with a single, well-crafted prompt. This is your opportunity to demonstrate your new expertise.
        </p>
      </div>

      {/* Interactive Challenge Component */}
      <Module1FinalChallenge />

      {/* Module Wrap-up */}
      <section className="bg-blue-900/30 p-6 rounded-lg shadow-lg border border-blue-700 mt-6">
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

      {/* Navigation */}
      <LessonFooter 
        prevLessonPath="/instructions/module-1/1.7"
        prevLessonTitle="1.7: Advanced Prompting Techniques"
        nextLessonPath="/instructions/module-2"
        nextLessonTitle="On to Module 2!"
        onNextClick={() => completeLesson(1, 8)}
      />
    </div>
  );
};

export default Lesson1_8;
