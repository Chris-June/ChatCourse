import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Presentation, MessageSquare, Rocket } from 'lucide-react';

const Lesson8_3: React.FC = () => {
  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">8.3: Presentation & Review</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-8/8.2" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </Link>
          <Link 
            to="/instructions/conclusion" 
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
          >
            Finish Course <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Completing your project is a huge achievement. The final step is to share your work, gather feedback, and think about what comes next on your AI journey.
      </p>

      {/* Key Steps */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Sharing Your Success</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <Presentation className="w-8 h-8 mr-4 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-lg text-white">Showcasing Your Work</h4>
              <p className="text-gray-400">Prepare a brief presentation or demo. Explain the problem you solved, how you used AI in your solution, and what the final result is. Be proud of what you've built!</p>
            </div>
          </div>
          <div className="flex items-start">
            <MessageSquare className="w-8 h-8 mr-4 text-yellow-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-lg text-white">Peer Feedback</h4>
              <p className="text-gray-400">Share your project with others and be open to their feedback. Constructive criticism is a gift that helps you grow. Likewise, provide thoughtful feedback to your peers, focusing on what they did well and where they could improve.</p>
            </div>
          </div>
          <div className="flex items-start">
            <Rocket className="w-8 h-8 mr-4 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-lg text-white">Next Steps</h4>
              <p className="text-gray-400">This is just the beginning. Think about how you could expand your project. What other problems could you solve with your new skills? Continue exploring, learning, and building.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exercise */}
      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300">Exercise: Prepare Your Presentation</h2>
        <p className="text-gray-300 mb-4">
          Create a short outline for a 3-minute presentation of your capstone project.
        </p>
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-white mb-2">Your Task:</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-300">
            <li><strong>Hook (15s):</strong> A compelling opening to grab the audience's attention.</li>
            <li><strong>Problem (30s):</strong> Clearly state the problem your project addresses.</li>
            <li><strong>Solution/Demo (90s):</strong> Show your project and explain how it works. Highlight the role of AI.</li>
            <li><strong>Conclusion (45s):</strong> Summarize your work and mention potential next steps.</li>
          </ul>
        </div>
      </section>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-8/8.2" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: Implementation
        </Link>
        <Link 
          to="/instructions/conclusion" 
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors"
        >
          Finish Course & View Conclusion <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson8_3;