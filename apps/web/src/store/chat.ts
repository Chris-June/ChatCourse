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

// Shared union types for settings
export type Units = 'metric' | 'imperial';
export type Tone = 'professional' | 'friendly' | 'concise';
export type Expertise = 'novice' | 'intermediate' | 'expert';
export type ReasoningEffort = 'minimal' | 'low' | 'medium' | 'high';
export type Verbosity = 'low' | 'medium' | 'high';
export type ToolMode = 'auto' | 'required';

// Minimal tool/function schema type used by the API layer
export type ToolDefinition = {
  type: 'function';
  name: string;
  description?: string;
  parameters: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
    additionalProperties?: boolean;
  };
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
  // Personalization
  profileName: string; // user's name
  roleTitle: string;   // user's role/title
  industry: string;    // primary industry or domain
  region: string;      // locale/region (e.g., en-US, Canada)
  units: Units;
  tone: Tone;
  expertise: Expertise;
  audience: string;    // target audience description
  temperature: number;
  top_p: number;
  reasoningEffort: ReasoningEffort;
  verbosity: Verbosity;
  tools: ToolDefinition[]; // tool definitions passed to API
  toolMode?: ToolMode;
  apiKey: string;
  startNewSession: () => void;
  setActiveSession: (sessionId: string) => void;
  addMessage: (message: Message) => void;
  setInput: (input: string) => void;
  setStreaming: (isStreaming: boolean) => void;
  updateLastMessage: (updater: string | ((prev: string) => string)) => void;
  updateLastMessageMetadata: (metadata: TokenMetadata) => void;
  getActiveSession: () => ChatSession | undefined;
  setSessionTopic: (sessionId: string, topic: string) => void;
  renameSession: (sessionId: string, newTopic: string) => void;
  deleteSession: (sessionId: string) => void;
  toggleSettings: () => void;
  setModel: (model: string) => void;
  setCustomInstructions: (instructions: string) => void;
  setProfileName: (name: string) => void;
  setRoleTitle: (role: string) => void;
  setIndustry: (industry: string) => void;
  setRegion: (region: string) => void;
  setUnits: (units: Units) => void;
  setTone: (tone: Tone) => void;
  setExpertise: (level: Expertise) => void;
  setAudience: (audience: string) => void;
  setTemperature: (temp: number) => void;
  setTopP: (top_p: number) => void;
  setReasoningEffort: (effort: ReasoningEffort) => void;
  setVerbosity: (level: Verbosity) => void;
  setTools: (tools: ToolDefinition[]) => void;
  setToolMode: (mode: ToolMode) => void;
  setApiKey: (apiKey: string) => void;
  removeLastMessage: () => void;
  setMessages: (messages: Message[]) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      sessions: [],
      activeSessionId: null,
      input: '',
      isStreaming: false,
      isSettingsOpen: false,
      model: 'gpt-5-nano',
      customInstructions: '',
      // Personalization defaults
      profileName: '',
      roleTitle: '',
      industry: '',
      region: '',
      units: 'metric',
      tone: 'professional',
      expertise: 'intermediate',
      audience: '',
      temperature: 1,
      top_p: 1,
      reasoningEffort: 'medium',
      verbosity: 'medium',
      tools: [
        {
          type: 'function',
          name: 'math.calculate',
          description: 'Evaluate a basic arithmetic expression (digits and + - * / ( )).',
          parameters: {
            type: 'object',
            properties: {
              expression: { type: 'string', description: 'Arithmetic expression, e.g. (2+3)*4' },
            },
            required: ['expression'],
            additionalProperties: false,
          },
        },
        {
          type: 'function',
          name: 'time.now',
          description: 'Get the current server time as ISO and locale string.',
          parameters: { type: 'object', properties: {}, additionalProperties: false },
        },
        {
          type: 'function',
          name: 'text.extract_urls',
          description: 'Extract all URLs from the provided text.',
          parameters: {
            type: 'object',
            properties: { text: { type: 'string', description: 'Input text to scan for URLs' } },
            required: ['text'],
            additionalProperties: false,
          },
        },
      ],
      toolMode: 'auto',
      apiKey: '',
      theme: 'dark',

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

      addMessage: (message: Message) => {
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

      setInput: (input: string) => set({ input }),

      setStreaming: (isStreaming: boolean) => set({ isStreaming }),

      updateLastMessageMetadata: (metadata: TokenMetadata) => {
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

      updateLastMessage: (updater: string | ((prev: string) => string)) => {
        set((state) => {
          const activeSession = get().getActiveSession();
          if (!activeSession) return state;

          const lastMessage = activeSession.messages[activeSession.messages.length - 1];
          if (lastMessage && lastMessage.role === 'assistant') {
            const newContent =
              typeof updater === 'function'
                ? updater(lastMessage.content)
                : lastMessage.content + updater;

            const updatedMessage = { ...lastMessage, content: newContent };
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

      setSessionTopic: (sessionId: string, topic: string) => {
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === sessionId ? { ...s, topic } : s
          ),
        }));
      },

      renameSession: (sessionId: string, newTopic: string) => {
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === sessionId ? { ...s, topic: newTopic } : s
          ),
        }));
      },

      deleteSession: (sessionId: string) => {
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
      setModel: (model: string) => set({ model }),
      setCustomInstructions: (instructions: string) => set({ customInstructions: instructions }),
      setProfileName: (name: string) => set({ profileName: name }),
      setRoleTitle: (role: string) => set({ roleTitle: role }),
      setIndustry: (industry: string) => set({ industry }),
      setRegion: (region: string) => set({ region }),
      setUnits: (units: Units) => set({ units }),
      setTone: (tone: Tone) => set({ tone }),
      setExpertise: (level: Expertise) => set({ expertise: level }),
      setAudience: (audience: string) => set({ audience }),
      setTemperature: (temp: number) => set({ temperature: temp }),
      setTopP: (top_p: number) => set({ top_p }),
      setReasoningEffort: (effort: ReasoningEffort) => set({ reasoningEffort: effort }),
      setVerbosity: (level: Verbosity) => set({ verbosity: level }),
      setTools: (tools: ToolDefinition[]) => set({ tools }),
      setToolMode: (mode: ToolMode) => set({ toolMode: mode }),
      setApiKey: (apiKey: string) => set({ apiKey }),

      removeLastMessage: () => {
        set((state) => {
          const activeSession = get().getActiveSession();
          if (!activeSession || activeSession.messages.length < 2) return state;

          const updatedSession = {
            ...activeSession,
            messages: activeSession.messages.slice(0, -2),
          };

          return {
            sessions: state.sessions.map((s) =>
              s.id === state.activeSessionId ? updatedSession : s
            ),
          };
        });
      },

      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

      setMessages: (messages: Message[]) => {
        set((state) => {
          const activeSession = get().getActiveSession();
          if (!activeSession) return state;

          const updatedSession = { ...activeSession, messages };

          return {
            sessions: state.sessions.map((s) =>
              s.id === state.activeSessionId ? updatedSession : s
            ),
          };
        });
      },
    }),
    {
      name: 'chat-storage',
      // Custom merge function to handle state hydration issues
      merge: (persistedState, currentState) => {
        const state = persistedState as Partial<ChatState> | undefined;
        // Ensure sessions is always an array
        if (state && typeof state === 'object' && !Array.isArray(state.sessions)) {
          (state as { sessions: ChatState['sessions'] }).sessions = [];
        }

        // Deep merge
        return {
          ...currentState,
          ...(persistedState as Partial<ChatState>),
        };
      },
      partialize: (state) => ({
        sessions: state.sessions,
        activeSessionId: state.activeSessionId,
        model: state.model,
        customInstructions: state.customInstructions,
        profileName: state.profileName,
        roleTitle: state.roleTitle,
        industry: state.industry,
        region: state.region,
        units: state.units,
        tone: state.tone,
        expertise: state.expertise,
        audience: state.audience,
        reasoningEffort: state.reasoningEffort,
        verbosity: state.verbosity,
        tools: state.tools,
        toolMode: state.toolMode,
        theme: state.theme,
        apiKey: state.apiKey,
      }),
    }
  )
);
