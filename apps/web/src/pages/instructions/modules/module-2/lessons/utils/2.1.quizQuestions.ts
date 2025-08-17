const quizQuestions = [
  {
    questionText: "What does the AI's 'context window' primarily represent?",
    options: [
      'The total knowledge the AI has about the world.',
      "The AI's short-term memory for the current conversation.",
      'The physical size of the chat window on your screen.',
      'A list of pre-approved questions you can ask.'
    ],
    correctAnswer: "The AI's short-term memory for the current conversation.",
    explanation:
      "The context window is like the AI's working memory. It holds the recent back-and-forth to understand what you're talking about right now."
  },
  {
    questionText: 'How is the size of a context window measured?',
    options: ['In minutes and seconds.', 'By the number of messages.', 'In tokens (pieces of words).', 'In megabytes (MB).'],
    correctAnswer: 'In tokens (pieces of words).',
    explanation:
      "AI models break text down into tokens. The context window has a fixed limit on how many tokens of the recent conversation it can hold."
  },
  {
    questionText: 'What typically happens when a conversation gets too long and exceeds the context window?',
    options: [
      'The AI crashes and you have to restart.',
      'The AI asks you to pay for more memory.',
      "The oldest messages are 'forgotten' to make room for new ones.",
      'The AI automatically summarizes the entire conversation.'
    ],
    correctAnswer: "The oldest messages are 'forgotten' to make room for new ones.",
    explanation:
      'This is a crucial concept. The window has a fixed size, so to add new information, the oldest information must be dropped. This is why an AI might forget things from the beginning of a long chat.'
  },
  {
    questionText: 'Which of these is a direct result of POOR context management?',
    options: [
      'The AI builds on your previous ideas.',
      'The AI forgets what you told it just a few messages ago.',
      'The AI maintains a consistent personality.',
      'The AI successfully completes a complex, multi-step task.'
    ],
    correctAnswer: 'The AI forgets what you told it just a few messages ago.',
    explanation:
      'When important context is lost, the AI loses the thread of the conversation, leading to frustrating situations where it seems to have amnesia.'
  },
  {
    questionText: 'Why is mastering the context window considered a powerful skill?',
    options: [
      "It allows you to have deep, multi-step conversations and guide the AI through complex tasks.",
      'It makes the AI respond faster.',
      'It unlocks a secret, more intelligent version of the AI.',
      'It is not a useful skill.'
    ],
    correctAnswer:
      'It allows you to have deep, multi-step conversations and guide the AI through complex tasks.',
    explanation:
      "By understanding the context window, you can ensure the AI has the right information at the right time to perform complex tasks and have coherent, meaningful conversations."
  }
];

export default quizQuestions;
