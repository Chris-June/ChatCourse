import React from 'react';
import { useProgressStore } from '../../store/progressStore';
import { toast } from 'sonner';
import LessonHeader from './LessonHeader';
import ModuleQuizzes from '../ModuleQuizzes/ModuleQuizzes';

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface LessonTemplateProps {
  moduleNumber: number;
  lessonNumber: number;
  title: string;
  subtitle: string;
  quizQuestions: Question[];
  children: React.ReactNode;
}

const LessonTemplate: React.FC<LessonTemplateProps> = ({
  moduleNumber,
  lessonNumber,
  title,
  subtitle,
  quizQuestions,
  children,
}) => {
  const { completeLessonWithScore, isLessonComplete } = useProgressStore();

  const lessonIsComplete = isLessonComplete(moduleNumber, lessonNumber);

  const handleQuizComplete = (score: number, total: number) => {
    if (!lessonIsComplete) {
      completeLessonWithScore(moduleNumber, lessonNumber, score, total);
      toast.success('Lesson Complete!', {
        description: "You've successfully passed the validation quiz.",
        duration: 5000,
      });
    }
  };

  return (
    <div className="space-y-8 p-6 bg-gray-900 text-white">
      <LessonHeader
        title={title}
        subtitle={subtitle}
        completed={lessonIsComplete}
      />

      <div>
        {children}
      </div>

      {quizQuestions.length > 0 && (
        <section className="mt-8">
          <ModuleQuizzes
            questions={quizQuestions}
            onComplete={handleQuizComplete}
          />
        </section>
      )}
    </div>
  );
};

export default LessonTemplate;
