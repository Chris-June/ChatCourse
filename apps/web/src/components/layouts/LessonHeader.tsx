import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface LessonHeaderProps {
  title: string;
  subtitle?: string;
  completed?: boolean;
  prevLessonPath?: string;
  nextLessonPath?: string;
  prevLessonTitle?: string;
  nextLessonTitle?: string;
  onNextClick?: () => void;
}

const LessonHeader: React.FC<LessonHeaderProps> = ({ 
  title,
  subtitle,
  completed,
  prevLessonPath,
  nextLessonPath,
  prevLessonTitle = 'Previous',
  nextLessonTitle = 'Next',
  onNextClick 
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
      <div>
        <h1 className="text-3xl font-bold text-primary flex items-center">
          {title}
          {completed && <CheckCircle className="w-7 h-7 ml-3 text-primary" />}
        </h1>
        {subtitle && <p className="text-lg text-muted-foreground mt-2">{subtitle}</p>}
      </div>
      <div className="flex items-center space-x-4">
        {prevLessonPath && (
          <Link 
            to={prevLessonPath} 
            className="flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> {prevLessonTitle}
          </Link>
        )}
        {nextLessonPath && (
          <Link 
            to={nextLessonPath} 
            onClick={onNextClick}
            className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            {nextLessonTitle} <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default LessonHeader;
