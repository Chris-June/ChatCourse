import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LessonHeaderProps {
  title: string;
  subtitle?: string;
  prevLessonPath?: string;
  nextLessonPath?: string;
  prevLessonTitle?: string;
  nextLessonTitle?: string;
  onNextClick?: () => void;
}

const LessonHeader: React.FC<LessonHeaderProps> = ({ 
  title,
  subtitle,
  prevLessonPath,
  nextLessonPath,
  prevLessonTitle = 'Previous',
  nextLessonTitle = 'Next',
  onNextClick 
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
      <div>
        <h1 className="text-3xl font-bold text-blue-400">{title}</h1>
        {subtitle && <p className="text-lg text-gray-300 mt-2">{subtitle}</p>}
      </div>
      <div className="flex items-center space-x-4">
        {prevLessonPath && (
          <Link 
            to={prevLessonPath} 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> {prevLessonTitle}
          </Link>
        )}
        {nextLessonPath && (
          <Link 
            to={nextLessonPath} 
            onClick={onNextClick}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            {nextLessonTitle} <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default LessonHeader;
