/**
 * @file Zustand store for user progress management.
 * @description This file defines the Zustand store that tracks a user's progress
 * through the learning modules, including quiz scores and completion status,
 * persisting the data to localStorage.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// --- TYPE DEFINITIONS ---

interface LessonProgress {
  completed: boolean;
  score?: number;
  totalQuestions?: number;
  completedAt?: string; 
}

interface ModuleProgress {
  [lessonId: number]: LessonProgress;
}

interface ProgressState {
  modules: {
    [moduleId: number]: ModuleProgress;
  };
  highestCompletedModule: number;
  highestCompletedLesson: number;
  completeLesson: (module: number, lesson: number) => void;
  completeLessonWithScore: (module: number, lesson: number, score: number, total: number) => void;
  isLessonUnlocked: (module: number, lesson: number) => boolean;
  isLessonComplete: (module: number, lesson: number) => boolean;
  getLessonProgress: (module: number, lesson: number) => LessonProgress | undefined;
}

// --- CONSTANTS ---

export const LESSONS_IN_MODULE: Record<number, number> = {
  1: 8, 2: 3, 3: 3, 4: 6, 5: 3, 6: 3, 7: 3, 8: 3,
};

// --- ZUSTAND STORE ---

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      // Default state
      modules: {},
      highestCompletedModule: 1,
      highestCompletedLesson: 0,

      // --- ACTIONS ---

      /**
       * Legacy method to mark a lesson as complete without a score.
       */
      completeLesson: (module: number, lesson: number) => {
        get().completeLessonWithScore(module, lesson, 0, 0); // Defer to the new method
      },

      /**
       * Marks a lesson as complete with a quiz score.
       */
      completeLessonWithScore: (module: number, lesson: number, score: number, total: number) => {
        const { highestCompletedModule, highestCompletedLesson } = get();

        set(state => {
          const newModules = { ...state.modules };
          if (!newModules[module]) newModules[module] = {};

          const existingProgress = newModules[module][lesson];
          // Only update if the lesson is not already completed.
          if (!existingProgress?.completed) {
            newModules[module][lesson] = {
              completed: true,
              score,
              totalQuestions: total,
              completedAt: new Date().toISOString(),
            };

            // Check if progress has advanced
            if (module > highestCompletedModule || (module === highestCompletedModule && lesson > highestCompletedLesson)) {
              return {
                modules: newModules,
                highestCompletedModule: module,
                highestCompletedLesson: lesson,
              };
            }
          }

          return { modules: newModules };
        });
      },

      // --- SELECTORS ---

      /**
       * Checks if a lesson is accessible to the user.
       */
      isLessonUnlocked: (module: number, lesson: number) => {
        const { highestCompletedModule, highestCompletedLesson } = get();
        if (module === 1 && lesson === 1) return true;
        if (module < highestCompletedModule) return true;
        if (module === highestCompletedModule) {
          return lesson <= highestCompletedLesson + 1;
        }
        return false;
      },

      /**
       * Checks if a lesson has been marked as complete.
       */
      isLessonComplete: (module: number, lesson: number) => {
        return Boolean(get().modules[module]?.[lesson]?.completed);
      },

      /**
       * Retrieves the progress data for a specific lesson.
       */
      getLessonProgress: (module: number, lesson: number) => {
        return get().modules[module]?.[lesson];
      },
    }),
    {
      name: 'user-progress-storage', // Name for the localStorage item
    },
  ),
);
