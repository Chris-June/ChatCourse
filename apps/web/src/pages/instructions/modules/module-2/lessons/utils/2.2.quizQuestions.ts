const quizQuestions = [
  {
    questionText: "What is the main purpose of the 'Summarize and Re-center' technique?",
    options: [
      'To make the conversation longer.',
      "To test the AI's reading comprehension.",
      "To reinforce the most important context and guide the AI's next response.",
      'To get a written record of the chat.'
    ],
    correctAnswer: "To reinforce the most important context and guide the AI's next response.",
    explanation:
      "Summarizing helps you re-focus the AI on the key details, especially in a long conversation where earlier context might be lost."
  },
  {
    questionText:
      "Using an 'explicit reference' like 'Based on the second headline you suggested...' is effective because it:",
    options: [
      'Is more polite than just giving a command.',
      "Directs the AI's attention to a specific piece of information in the context window.",
      'Makes your prompt sound more professional.',
      'Confuses the AI with too much detail.'
    ],
    correctAnswer:
      "Directs the AI's attention to a specific piece of information in the context window.",
    explanation:
      "Explicit references act like anchors, helping the AI pinpoint the exact information you want it to use from the previous conversation."
  },
  {
    questionText: 'When is it a good idea to start a fresh conversation?',
    options: [
      'After every three messages.',
      'When the AI makes a minor spelling mistake.',
      "When the conversation has become confused or 'contaminated' with irrelevant details.",
      'Whenever you change the topic slightly.'
    ],
    correctAnswer:
      "When the conversation has become confused or 'contaminated' with irrelevant details.",
    explanation:
      "If the AI is consistently misunderstanding or bringing in wrong information, the context is likely polluted. Starting fresh is often the fastest way to get back on track."
  },
  {
    questionText: "What is 'Instruction Priming'? ",
    options: [
      'Giving the AI a pep talk before you start.',
      'Telling the AI about your instructions multiple times.',
      "Setting up the AI's role, goal, and constraints at the very beginning of a conversation.",
      "Asking the AI to summarize your instructions."
    ],
    correctAnswer:
      "Setting up the AI's role, goal, and constraints at the very beginning of a conversation.",
    explanation:
      "Priming sets the stage for the entire conversation, ensuring the AI has the foundational context it needs to perform its role effectively from the start."
  },
  {
    questionText:
      "A common pitfall in long conversations is assuming the AI remembers everything. What technique directly helps prevent this?",
    options: ['Using shorter sentences.', 'Typing in all caps.', 'Periodically summarizing key points to keep them in the active context window.', 'Asking the AI if it is tired.'],
    correctAnswer:
      'Periodically summarizing key points to keep them in the active context window.',
    explanation:
      "Because the context window is finite, you can't assume early details are still remembered. Summarizing brings important information back into the AI's short-term memory."
  },
  {
    questionText:
      'Scenario: The AI keeps referencing an outdated requirement after you changed scope two messages ago. What is the best immediate action?',
    options: [
      'Start a brand new chat to clear all context.',
      'Type your next request and hope it fixes itself.',
      'Post a short summary that re-centers the new requirement and explicitly references the change.',
      'Ask the AI if it remembers the change from two messages ago.'
    ],
    correctAnswer:
      'Post a short summary that re-centers the new requirement and explicitly references the change.',
    explanation:
      'A concise re-centering summary with explicit references is usually faster and more controlled than resetting the whole chat, and it directly addresses the contamination.'
  }
];

export default quizQuestions;
