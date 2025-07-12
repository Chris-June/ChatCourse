/**
 * @file Zustand store for user progress management.
 * @description This file defines the Zustand store that tracks a user's progress
 * through the learning modules, persisting the data to localStorage.
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Defines the state and actions for tracking user progress.
 */
interface ProgressState {
  highestCompletedModule: number;
  highestCompletedLesson: number;
  completeLesson: (module: number, lesson: number) => void;
  isLessonUnlocked: (module: number, lesson: number) => boolean;
}

/**
 * The total number of lessons in each module.
 * This is used to determine when a module is complete and the next one should be unlocked.
 */
export const LESSONS_IN_MODULE: Record<number, number> = {
  1: 3, // Module 1 has 3 lessons
  2: 3, // Module 2 has 3 lessons
  3: 3,
  4: 3,
  5: 3,
  6: 3,
  7: 3,
  8: 3,
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      // By default, the user has access to Module 1, Lesson 1.
      // This means they have completed module 1, lesson 0.
      highestCompletedModule: 1,
      highestCompletedLesson: 0,

      /**
       * Marks a lesson as complete and updates the user's progress.
       * @param module - The module number of the completed lesson.
       * @param lesson - The lesson number of the completed lesson.
       */
      completeLesson: (module, lesson) => {
        const { highestCompletedModule, highestCompletedLesson } = get();

        // Only update if this is a new, higher lesson
        if (module > highestCompletedModule || (module === highestCompletedModule && lesson > highestCompletedLesson)) {
          const totalLessonsInModule = LESSONS_IN_MODULE[module] || 0;

          if (lesson >= totalLessonsInModule) {
            // If the last lesson of the module is completed, unlock the next module
            set({ highestCompletedModule: module + 1, highestCompletedLesson: 0 });
          } else {
            // Otherwise, just update the lesson progress within the current module
            set({ highestCompletedModule: module, highestCompletedLesson: lesson });
          }
        }
      },

      /**
       * Checks if a specific lesson is accessible to the user.
       * @param module - The module number to check.
       * @param lesson - The lesson number to check.
       * @returns True if the lesson is unlocked, false otherwise.
       */
      isLessonUnlocked: (module, lesson) => {
        const { highestCompletedModule, highestCompletedLesson } = get();
        if (module < highestCompletedModule) {
          return true; // All lessons in previous modules are unlocked
        }
        if (module === highestCompletedModule) {
          return lesson <= highestCompletedLesson + 1; // Check progress in the current module
        }
        return false; // Future modules are locked
      },
    }),
    {
      name: 'user-progress-storage', // Name for the localStorage item
    }
  )
);
