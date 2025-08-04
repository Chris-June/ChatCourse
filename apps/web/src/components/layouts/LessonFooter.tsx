import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LessonFooterProps {
  prevLessonPath?: string;
  nextLessonPath?: string;
  prevLessonTitle?: string;
  nextLessonTitle?: string;
  onNextClick?: () => void;
}

const LessonFooter: React.FC<LessonFooterProps> = ({ 
  prevLessonPath,
  nextLessonPath,
  prevLessonTitle,
  nextLessonTitle,
  onNextClick
}) => {
  return (
    <div className="flex justify-between pt-4">
      {prevLessonPath && (
        <Link 
          to={prevLessonPath} 
          className="flex items-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          <span>{prevLessonTitle}</span>
        </Link>
      )}
      {nextLessonPath && (
        <Link 
          to={nextLessonPath} 
          onClick={onNextClick}
          className="flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <span>{nextLessonTitle}</span>
          <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      )}
    </div>
  );
};

export default LessonFooter;
