/**
 * @file Zustand store for chat state management.
 * @description This file defines the Zustand store that manages the state of the chat application,
 * including messages, user input, and the streaming status of the AI response.
 */

import { create } from 'zustand';

// Define the types for the chat messages
export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// Define the state and actions for the store
interface ChatState {
  messages: Message[];
  input: string;
  isStreaming: boolean;
  addMessage: (message: Message) => void;
  setInput: (input: string) => void;
  setStreaming: (isStreaming: boolean) => void;
  updateLastMessage: (chunk: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  input: '',
  isStreaming: false,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setInput: (input) => set({ input }),
  setStreaming: (isStreaming) => set({ isStreaming }),
  updateLastMessage: (chunk) => {
    set((state) => {
      const lastMessage = state.messages[state.messages.length - 1];
      if (lastMessage && lastMessage.role === 'assistant') {
        const updatedMessage = { ...lastMessage, content: lastMessage.content + chunk };
        return { messages: [...state.messages.slice(0, -1), updatedMessage] };
      }
      return state;
    });
  },
}));
