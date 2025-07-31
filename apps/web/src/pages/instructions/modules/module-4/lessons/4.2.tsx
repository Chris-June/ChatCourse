import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Info } from 'lucide-react';

const Lesson4_2_Deprecated: React.FC = () => {
  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center text-center">
      <Info size={48} className="text-blue-400 mb-4" />
      <h1 className="text-3xl font-bold mb-4 text-blue-300">Lesson Content Merged</h1>
      <p className="text-lg text-gray-300 mb-6 max-w-2xl">
        This lesson has been consolidated with Lesson 4.6 to provide a more comprehensive and streamlined learning experience on MCP Servers. Please proceed to the next lesson.
      </p>
      <Link 
        to="/instructions/module-4/4.3" 
        className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors text-lg font-semibold"
      >
        Next Lesson: Building Custom Tools <ChevronRight className="w-6 h-6 ml-2" />
      </Link>
    </div>
  );
};

export default Lesson4_2_Deprecated;
