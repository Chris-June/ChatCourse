/**
 * @file ProtectedRoute.tsx
 * @description A component that guards routes, preventing users from accessing
 * lessons they haven't unlocked yet.
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useProgressStore, LESSONS_IN_MODULE } from '../store/progressStore';

interface ProtectedRouteProps {
  module: number;
  lesson: number;
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ module, lesson, children }) => {
  const { isLessonUnlocked, highestCompletedModule, highestCompletedLesson } = useProgressStore();
  const location = useLocation();

  // Dev auto-bypass: always allow access in development builds
  if (import.meta && import.meta.env && import.meta.env.DEV) {
    return children;
  }

  // Testing bypass: allow disabling gating via query param or localStorage flag
  let disableGating = false;
  try {
    const params = new URLSearchParams(location.search);
    const unlockParam = params.get('unlock') === '1';
    const flag = typeof window !== 'undefined' && window.localStorage?.getItem('disable-gating') === '1';
    disableGating = unlockParam || flag;
  } catch {}

  if (disableGating) {
    return children;
  }

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
