import React, { useEffect } from 'react';
import { useProgressStore } from '../../store/progressStore';
import { toast } from 'sonner';
import LessonHeader from './LessonHeader';
import ModuleQuizzes from '../../pages/instructions/modules/ModuleQuizzes/ModuleQuizzes';

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
  quizQuestions?: Question[];
  children: React.ReactNode;
  nextLessonPath?: string;
  nextLessonTitle?: string;
}

const LessonTemplate: React.FC<LessonTemplateProps> = ({
  moduleNumber,
  lessonNumber,
  title,
  subtitle,
  quizQuestions,
  children,
  nextLessonPath,
  nextLessonTitle,
}) => {
  const { completeLessonWithScore, isLessonComplete } = useProgressStore();

  const lessonIsComplete = isLessonComplete(moduleNumber, lessonNumber);

  // Auto-complete lessons that have no quizzes so users can progress.
  useEffect(() => {
    if ((!quizQuestions || quizQuestions.length === 0) && !lessonIsComplete) {
      completeLessonWithScore(moduleNumber, lessonNumber, 0, 0);
    }
  }, [quizQuestions, lessonIsComplete, moduleNumber, lessonNumber, completeLessonWithScore]);

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
    <div className="space-y-8 p-6 bg-background text-foreground">
      <LessonHeader
        title={title}
        subtitle={subtitle}
        completed={lessonIsComplete}
        nextLessonPath={nextLessonPath}
        nextLessonTitle={nextLessonTitle}
      />

      <div>
        {children}
      </div>

      {quizQuestions && quizQuestions.length > 0 && (
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
