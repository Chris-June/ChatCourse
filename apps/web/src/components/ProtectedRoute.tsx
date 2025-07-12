/**
 * @file ProtectedRoute.tsx
 * @description A component that guards routes, preventing users from accessing
 * lessons they haven't unlocked yet.
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useProgressStore, LESSONS_IN_MODULE } from '../store/progressStore';

interface ProtectedRouteProps {
  module: number;
  lesson: number;
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ module, lesson, children }) => {
  const { isLessonUnlocked, highestCompletedModule, highestCompletedLesson } = useProgressStore();

  if (isLessonUnlocked(module, lesson)) {
    return children; // Render the lesson if it's unlocked
  }

  // If the lesson is locked, redirect the user to their last unlocked lesson.
  let redirectToModule = highestCompletedModule;
  let redirectToLesson = highestCompletedLesson + 1;

  const totalLessonsInModule = LESSONS_IN_MODULE[redirectToModule] || 0;

  if (redirectToLesson > totalLessonsInModule) {
    redirectToModule += 1;
    redirectToLesson = 1;
  }

  const redirectPath = `/instructions/module-${redirectToModule}/${redirectToModule}.${redirectToLesson}`;
  
  return <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
