import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle, useRef } from 'react';
import { useChatStore } from '@/store/chat';
import { Send, Loader, X, AlertCircle, CheckCircle, Circle as CircleIcon } from 'lucide-react';

/**
 * Represents a single item in a dynamic checklist for a challenge.
 * This is a key instructional design element, providing clear, actionable goals for the learner.
 */
export interface ChallengeChecklistItem {
  /** A unique identifier for the checklist item. */
  id: string;
  /** The instructional text for the checklist item. */
  text: string;
  /** A boolean indicating whether the learner has completed this item. */
  completed: boolean;
}

/**
 * Defines the structure of a single chat message.
 */
interface Message {
  /** The role of the message sender. */
  role: 'user' | 'assistant' | 'system';
  /** The text content of the message. */
  content: string;
}

/**
 * Defines the imperative handle for the InlineChat component, allowing parent components to interact with it.
 */
export interface InlineChatHandle {
  /**
   * Programmatically sets the text in the chat input field.
   * @param text The text to set.
   */
  setPromptText: (text: string) => void;
}

/**
 * Props for the InlineChat component.
 */
interface InlineChatProps {
  /**
   * A unique identifier for the module or lesson where the chat is used.
   * This is crucial for isolating chat history and rate-limiting in localStorage.
   */
  moduleId: string;
  /**
   * An optional array of messages to pre-populate the chat interface.
   * Useful for setting up scenarios or providing examples (e.g., vague vs. specific prompts).
   */
  initialMessages?: Message[];
  /**
   * The maximum number of chat attempts allowed for this instance.
   * @default DEFAULT_MAX_ATTEMPTS (10)
   */
  maxAttempts?: number;
  /**
   * Placeholder text for the chat input field.
   */
  placeholder?: string;
  /**
   * An optional simulated response from the assistant.
   * If provided, the component will not make a real API call and will use this string instead.
   */
  simulatedResponse?: string;
  /**
   * The system prompt that defines the AI's persona, instructions, and goals.
   * This is the primary mechanism for customizing the AI's behavior for a specific lesson.
   * Per Discovery.md, this can be used to create "coaching tools" that provide meta-feedback.
   */
  systemPrompt?: string;
  /**
   * An optional array of checklist items for a challenge.
   * When provided, the component will check the assistant's response against these items
   * to dynamically update their completion status.
   */
  challengeChecklist?: ChallengeChecklistItem[];
  /**
   * The maximum number of follow-up messages a user can send.
   * If undefined, no limit is applied beyond the global maxAttempts.
   */
  maxFollowUps?: number;
  /**
   * If true, the chat input form will be hidden, making the component read-only.
   * This is useful for displaying pre-canned examples.
   */
  readOnly?: boolean;
  /**
   * Optional maximum output tokens to request from the model.
   * If omitted, the server will use its defaults or environment value.
   */
  maxOutputTokens?: number;
}

const RATE_LIMIT_RESET_HOURS = 24;
const DEFAULT_MAX_ATTEMPTS = 10;

/**
 * A self-contained, reusable chat component for instructional modules.
 * It supports rate-limiting, dynamic challenges, and customizable AI behavior via system prompts.
 * 
 * As recommended in Discovery.md, this component can be configured to act as a "coaching tool"
 * by providing meta-feedback on a user's prompts, rather than just being a simple chat sandbox.
 */
const InlineChat = forwardRef<InlineChatHandle, InlineChatProps>(
  (
    {
      moduleId,
      initialMessages = [],
      maxAttempts = DEFAULT_MAX_ATTEMPTS,
      placeholder,
      systemPrompt,
      challengeChecklist,
      maxFollowUps,
      readOnly = false,
      simulatedResponse,
      maxOutputTokens,
    },
    ref
  ) => {
    // --- State Management ---

    /** Retrieves the user's API key from the global Zustand store. */
    const { apiKey } = useChatStore();

    /**
     * The current text in the chat input field.
     * This state variable stores the user's input and is updated whenever the input field changes.
     */
    const [prompt, setPrompt] = useState('');

    /**
     * The array of messages in the chat interface, initialized with any initial messages and the system prompt.
     * This state variable stores the conversation history and is updated whenever a new message is sent or received.
     */
    const [messages, setMessages] = useState<Message[]>(() => {
      const baseMessages: Message[] = [...initialMessages];
      if (systemPrompt) {
        baseMessages.unshift({ role: 'system', content: systemPrompt });
      }
      return baseMessages;
    });

    /**
     * A boolean indicating whether the component is currently loading a response from the AI.
     * This state variable is used to display a loading indicator and prevent multiple concurrent requests.
     */
    const [isLoading, setIsLoading] = useState(false);

    /**
     * A boolean indicating whether the user has exceeded the rate limit for this instance.
     * This state variable is used to display an error message and prevent further requests.
     */
    const [rateLimited, setRateLimited] = useState<boolean>(false);

    /**
     * The current state of the challenge checklist, if provided.
     * This state variable stores the completion status of each checklist item and is updated whenever the AI's response is received.
     */
    const [checklist, setChecklist] = useState<ChallengeChecklistItem[]>([]);

    /** A state to track if the simulated response has been shown in read-only mode. */
    const [simulationHasRun, setSimulationHasRun] = useState(false);

    /**
     * A derived value calculating the number of follow-up messages the user has sent.
     * This value is used to display the number of follow-up messages sent and to enforce the maxFollowUps limit.
     */
    const userFollowUps = messages.filter((m) => m.role === 'user').length - initialMessages.filter((m) => m.role === 'user').length;

    // --- Imperative Handle ---

    /**
     * Exposes a `setPromptText` function to parent components via a ref.
     * This function allows parent components to programmatically set the text in the chat input field.
     */
    useImperativeHandle(ref, () => ({
      setPromptText: (text: string) => {
        setPrompt(text);
      },
    }));

    // --- Effects and Lifecycle ---

    /**
     * Loads the rate-limit state from localStorage on component mount.
     * This ensures that usage limits persist across sessions for each module instance.
     */
    const loadRateLimitState = useCallback(() => {
      try {
        const rateLimitKey = `rateLimit_${moduleId}`;
        const savedState = localStorage.getItem(rateLimitKey);

        if (savedState) {
          const { count, lastReset } = JSON.parse(savedState);
          const hoursSinceReset = (Date.now() - lastReset) / (1000 * 60 * 60);

          if (hoursSinceReset > RATE_LIMIT_RESET_HOURS) {
            localStorage.removeItem(rateLimitKey);
            setRateLimited(false);
          } else if (count >= maxAttempts) {
            setRateLimited(true);
          }
        }
      } catch (error) {
        console.error('Failed to load rate limit state:', error);
        setRateLimited(false);
      }
    }, [moduleId, maxAttempts]);

    /**
     * Initializes the checklist and loads the rate limit state when the component mounts or props change.
     */
    useEffect(() => {
      if (challengeChecklist) {
        setChecklist(challengeChecklist.map((item) => ({ ...item, completed: false })));
      }
      loadRateLimitState();
    }, [challengeChecklist, loadRateLimitState]);

    // --- Event Handlers and Logic ---

    /**
     * Clears the chat history and resets the checklist to its initial state.
     */
    const handleClear = () => {
      setMessages(initialMessages);
      if (challengeChecklist) {
        setChecklist(challengeChecklist.map((item) => ({ ...item, completed: false })));
      }
    };

    /**
     * Checks the assistant's response text to see if it satisfies any of the challenge checklist items.
     * This function is key to the component's role as a "coaching tool" per Discovery.md.
     * @param text The assistant's response content to check.
     */
    const checkChecklistCompletion = (text: string) => {
      if (!challengeChecklist || checklist.every((item) => item.completed)) return;

      const updatedChecklist = [...checklist];
      let changed = false;

      for (const item of updatedChecklist) {
        if (!item.completed) {
          // A simple keyword-matching heuristic to check for completion.
          // This could be replaced with a more sophisticated LLM-based check in the future.
          const keywords = item.text.match(/\b(\w+)\b/g)?.slice(0, 5) || [];
          const regex = new RegExp(keywords.join('|'), 'i');
          if (regex.test(text)) {
            item.completed = true;
            changed = true;
          }
        }
      }

      if (changed) {
        setChecklist(updatedChecklist);
      }
    };

    // --- Type Guards ---
    const isRecord = (value: unknown): value is Record<string, unknown> =>
      typeof value === 'object' && value !== null;

    // --- Refs ---
    const formRef = useRef<HTMLFormElement>(null);

    // --- Helpers ---
    const runSimulatedResponse = () => {
      if (!simulatedResponse) return;
      setIsLoading(true);
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: 'assistant', content: simulatedResponse }]);
        setIsLoading(false);
        setSimulationHasRun(true);
        checkChecklistCompletion(simulatedResponse);
      }, 1000);
    };

    /**
     * Handles the form submission for sending a new chat message.
     * This function orchestrates rate-limiting, API calls, and streaming response handling.
     * @param e The form event.
     */
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      // Different validation for read-only mode vs. interactive mode
      if (readOnly) {
        if (isLoading || simulationHasRun) return;
      } else {
        if (!prompt.trim() || isLoading || rateLimited) return;
      }

      // If in read-only mode, immediately show the simulated response after a delay
      if (readOnly && simulatedResponse) {
        runSimulatedResponse();
        return;
      }

      setIsLoading(true);
      const newMessages: Message[] = [...messages, { role: 'user', content: prompt }];
      setMessages(newMessages);
      setPrompt('');

      try {
        // 1. Rate Limiting Check
        const rateLimitKey = `rateLimit_${moduleId}`;
        const savedState = localStorage.getItem(rateLimitKey);
        let currentCount = 0;

        if (savedState) {
          const { count } = JSON.parse(savedState);
          currentCount = count;
        }

        if (currentCount >= maxAttempts) {
          setRateLimited(true);
          setIsLoading(false);
          return;
        }

        localStorage.setItem(
          rateLimitKey,
          JSON.stringify({ count: currentCount + 1, lastReset: Date.now() })
        );

        // 2. API Call to the backend
        // Prefer NEXT_PUBLIC_API_URL; else, in dev when app runs on 3001, call API at 3000.
        let url = '/api/chat';
        if (process.env.NEXT_PUBLIC_API_URL) {
          url = `${process.env.NEXT_PUBLIC_API_URL}/api/chat`;
        } else if (typeof window !== 'undefined' && window.location.port === '3001') {
          url = 'http://localhost:3000/api/chat';
        }

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ messages: newMessages, systemPrompt, max_output_tokens: maxOutputTokens }),
        });

        if (!response.ok) {
          // Try to parse JSON error, fallback to text
          let serverError = '';
          try {
            const data: unknown = await response.json();
            if (isRecord(data) && typeof data.error === 'string') {
              serverError = data.error;
            } else {
              serverError = JSON.stringify(data);
            }
          } catch {
            try {
              serverError = await response.text();
            } catch {
              // Provide a minimal fallback to satisfy no-empty lint rule
              serverError = serverError || 'Unknown error';
            }
          }
          throw new Error(serverError || `Request failed with status ${response.status}`);
        }

        if (!response.body) {
          throw new Error('No response body');
        }

        // 3. Streaming Response Handling
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let assistantMessage = '';
        setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const jsonStr = line.substring(6);
              if (jsonStr === '[DONE]') {
                checkChecklistCompletion(assistantMessage);
                return; // End the stream processing
              }
              try {
                const data = JSON.parse(jsonStr);
                if (data.delta) {
                  assistantMessage += data.delta;
                  // Update the last message in the array with the new content chunk
                  setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = assistantMessage;
                    return newMessages;
                  });
                }
              } catch {
                console.error('Failed to parse stream data:', jsonStr);
              }
            }
          }
        }

        // Final check after the stream is complete
        checkChecklistCompletion(assistantMessage);

      } catch (error: unknown) {
        let errorMessage = 'An unexpected error occurred.';
        if (error instanceof Error) {
          if (error.name === 'TypeError') { // Likely a network error
            errorMessage = 'Network error: Unable to connect to the server. Please check your internet connection.';
          } else {
            errorMessage = error.message || errorMessage;
          }
        }

        setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${errorMessage}` }]);
      } finally {
        setIsLoading(false);
      }
    };

    const isInteractionDisabled = isLoading || rateLimited || (maxFollowUps ? userFollowUps >= maxFollowUps : false);

    return (
      <div className={`bg-card border border-border rounded-xl p-4 shadow-sm`}>
        {checklist && checklist.length > 0 && (
          <div className="mb-4 p-3 bg-background/50 rounded-xl border border-border">
            <h4 className="font-semibold text-white mb-2">Challenge Checklist</h4>
            <ul className="space-y-2">
              {checklist.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-center text-sm transition-colors ${
                    item.completed ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                  {item.completed ? (
                    <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  ) : (
                    <CircleIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                  )}
                  <span className={item.completed ? 'line-through' : ''}>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-4 mb-4">
          {messages.map(
            (msg, index) =>
              msg.role !== 'system' && (
                <div key={index} className={`p-3 rounded-xl ${msg.role === 'user' ? 'bg-primary/10' : 'bg-muted/50'}`}>
                  <p className="text-foreground whitespace-pre-wrap">{msg.content}</p>
                </div>
              )
          )}
        </div>

        {readOnly ? (
          <div className="p-4 text-center">
            <button
              type="button"
              onClick={runSimulatedResponse}
              disabled={isLoading || simulationHasRun || !simulatedResponse}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <><Loader className="animate-spin mr-2" size={20} /> Generating...</>
              ) : (
                'Generate Response'
              )}
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit}>
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={placeholder || 'Type your message...'}
              className="w-full bg-background text-foreground border border-input rounded-xl p-3 pr-20 resize-none focus:ring-2 focus:ring-ring focus:outline-none transition-shadow duration-200 text-sm"
              rows={3}
              disabled={isInteractionDisabled}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  formRef.current?.requestSubmit();
                }
              }}
            />
            <button
              type="submit"
              className="absolute top-1/2 right-3 -translate-y-1/2 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
              disabled={!prompt.trim() || isInteractionDisabled}
              aria-label="Send message">
              {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <button type="button" onClick={handleClear} className="text-xs text-muted-foreground hover:text-foreground flex items-center">
              <X className="w-4 h-4 mr-1" /> Clear
            </button>
            {maxFollowUps !== undefined && (
              <div className="text-xs text-muted-foreground">
                Follow-ups: {userFollowUps} / {maxFollowUps}
              </div>
            )}
          </div>
          {rateLimited && (
            <div className="mt-2 text-xs text-destructive flex items-center">
              <AlertCircle className="w-4 h-4 mr-1.5" />
              <span>You have reached the maximum number of attempts. Please try again later.</span>
            </div>
          )}
        </form>
        )}
      </div>
    );
  }
);

export default InlineChat;
