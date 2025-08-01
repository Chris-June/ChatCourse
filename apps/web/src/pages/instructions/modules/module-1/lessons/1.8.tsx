import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Trophy, Sparkles } from 'lucide-react';
import { useProgressStore } from '../../../../../store/progressStore';
import { PromptChallenges } from '../../../../../components/prompting/advanced';

const Lesson1_8: React.FC = () => {
  const { completeLesson } = useProgressStore();

  return (
    <div className="space-y-8 p-4 md:p-6 text-gray-200">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-yellow-400">1.8: Module 1 Challenge</h1>
        <div className="flex items-center space-x-4">
          <Link to="/instructions/module-1/1.7" className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link to="/instructions/module-2" onClick={() => completeLesson(1, 8)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors">
            Go to Module 2 <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
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
      <PromptChallenges />

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
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-1/1.7" 
          className="flex items-center px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span>1.7: Advanced Prompting</span>
        </Link>
        <Link 
          to="/instructions/module-2" 
          onClick={() => completeLesson(1, 8)}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          <span>On to Module 2!</span>
          <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson1_8;
