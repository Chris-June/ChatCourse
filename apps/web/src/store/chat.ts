/**
 * @file Zustand store for chat state management.
 * @description This file defines the Zustand store that manages the state of the chat application,
 * including multiple chat sessions, user input, and the streaming status of the AI response.
 */

import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { persist } from 'zustand/middleware';

// Define the types for the chat messages and sessions
export type TokenMetadata = {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  promptCost: number;
  completionCost: number;
  totalCost: number;
};

export type Message = {
  role: 'user' | 'assistant';
  content: string;
  metadata?: TokenMetadata;
};

export type ChatSession = {
  id: string;
  topic?: string;
  messages: Message[];
};

// Define the state and actions for the store
interface ChatState {
  sessions: ChatSession[];
  activeSessionId: string | null;
  input: string;
  isStreaming: boolean;
  isSettingsOpen: boolean;
  model: string;
  customInstructions: string;
  temperature: number;
  top_p: number;
  startNewSession: () => void;
  setActiveSession: (sessionId: string) => void;
  addMessage: (message: Message) => void;
  setInput: (input: string) => void;
  setStreaming: (isStreaming: boolean) => void;
  updateLastMessage: (chunk: string) => void;
  updateLastMessageMetadata: (metadata: TokenMetadata) => void;
  getActiveSession: () => ChatSession | undefined;
  setSessionTopic: (sessionId: string, topic: string) => void;
  renameSession: (sessionId: string, newTopic: string) => void;
  deleteSession: (sessionId: string) => void;
  toggleSettings: () => void;
  setModel: (model: string) => void;
  setCustomInstructions: (instructions: string) => void;
  setTemperature: (temp: number) => void;
  setTopP: (top_p: number) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      sessions: [],
      activeSessionId: null,
      input: '',
      isStreaming: false,
      isSettingsOpen: false,
      model: 'gpt-4.1-nano',
      customInstructions: '',
      temperature: 1,
      top_p: 1,

      startNewSession: () => {
        const newSession: ChatSession = {
          id: uuidv4(),
          messages: [],
        };
        set((state) => ({
          sessions: [...state.sessions, newSession],
          activeSessionId: newSession.id,
        }));
      },

      setActiveSession: (sessionId: string) => {
        set({ activeSessionId: sessionId });
      },

      addMessage: (message) => {
        set((state) => {
          const activeSession = get().getActiveSession();
          if (!activeSession) return state;

          const updatedSession = {
            ...activeSession,
            messages: [...activeSession.messages, message],
          };

          return {
            sessions: state.sessions.map((s) =>
              s.id === state.activeSessionId ? updatedSession : s
            ),
          };
        });
      },

      setInput: (input) => set({ input }),

      setStreaming: (isStreaming) => set({ isStreaming }),

      updateLastMessageMetadata: (metadata) => {
        set((state) => {
          const activeSession = get().getActiveSession();
          if (!activeSession) return state;

          const lastMessage = activeSession.messages[activeSession.messages.length - 1];
          if (lastMessage && lastMessage.role === 'assistant') {
            const updatedMessage = { ...lastMessage, metadata };
            const updatedSession = {
              ...activeSession,
              messages: [...activeSession.messages.slice(0, -1), updatedMessage],
            };

            return {
              sessions: state.sessions.map((s) =>
                s.id === state.activeSessionId ? updatedSession : s
              ),
            };
          }
          return state;
        });
      },

      updateLastMessage: (chunk) => {
        set((state) => {
          const activeSession = get().getActiveSession();
          if (!activeSession) return state;

          const lastMessage = activeSession.messages[activeSession.messages.length - 1];
          if (lastMessage && lastMessage.role === 'assistant') {
            const updatedMessage = { ...lastMessage, content: lastMessage.content + chunk };
            const updatedSession = {
              ...activeSession,
              messages: [...activeSession.messages.slice(0, -1), updatedMessage],
            };

            return {
              sessions: state.sessions.map((s) =>
                s.id === state.activeSessionId ? updatedSession : s
              ),
            };
          }
          return state;
        });
      },

      getActiveSession: () => {
        const { sessions, activeSessionId } = get();
        return sessions.find((s) => s.id === activeSessionId);
      },

      setSessionTopic: (sessionId, topic) => {
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === sessionId ? { ...s, topic } : s
          ),
        }));
      },

      renameSession: (sessionId, newTopic) => {
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === sessionId ? { ...s, topic: newTopic } : s
          ),
        }));
      },

      deleteSession: (sessionId) => {
        set((state) => {
          const remainingSessions = state.sessions.filter((s) => s.id !== sessionId);
          let newActiveSessionId = state.activeSessionId;

          if (state.activeSessionId === sessionId) {
            if (remainingSessions.length > 0) {
              // Switch to the last session in the list
              newActiveSessionId = remainingSessions[remainingSessions.length - 1].id;
            } else {
              // No sessions left, so this will trigger a new one to be created
              newActiveSessionId = null;
            }
          }

          return {
            sessions: remainingSessions,
            activeSessionId: newActiveSessionId,
          };
        });
      },

      toggleSettings: () => set((state) => ({ isSettingsOpen: !state.isSettingsOpen })),
      setModel: (model) => set({ model }),
      setCustomInstructions: (instructions) => set({ customInstructions: instructions }),
      setTemperature: (temp) => set({ temperature: temp }),
      setTopP: (top_p) => set({ top_p }),
    }),
    {
      name: 'chat-storage',
      partialize: (state) => ({
        sessions: state.sessions,
        activeSessionId: state.activeSessionId,
        model: state.model,
        customInstructions: state.customInstructions,
      }),
    }
  )
);
