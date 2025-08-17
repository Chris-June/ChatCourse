const quizQuestions = [
  {
    questionText:
      "What is the primary goal of the 'Socratic Tutor' persona you are asked to create?",
    options: [
      'To provide the most accurate and direct answers possible.',
      'To teach a concept by asking guiding questions instead of giving answers.',
      'To act as a friendly chatbot for casual conversation.',
      'To summarize long texts into bullet points.'
    ],
    correctAnswer:
      'To teach a concept by asking guiding questions instead of giving answers.',
    explanation:
      'The core of the Socratic method is guiding someone to their own conclusion. The AI must avoid giving direct answers to succeed.'
  },
  {
    questionText:
      "What is the most critical step for establishing the AI's persona in this exercise?",
    options: [
      'Using a friendly tone in all your messages.',
      "The first prompt you send, which defines the AI's role and rules (the system prompt).",
      'Asking the AI very difficult questions.',
      "Correcting the AI's spelling mistakes."
    ],
    correctAnswer:
      "The first prompt you send, which defines the AI's role and rules (the system prompt).",
    explanation:
      'This initial instruction, or system prompt, is the foundation of the entire interaction. It sets the context that the AI will refer back to.'
  },
  {
    questionText:
      "If the 'Socratic Tutor' AI starts giving you direct answers, what is the correct action to take?",
    options: [
      'Start a completely new chat immediately.',
      'Accept the answer and move on.',
      "Gently remind it of its role, for example: 'Remember, you are a Socratic tutor who only asks questions.'",
      'Ask the same question again, but louder.'
    ],
    correctAnswer:
      "Gently remind it of its role, for example: 'Remember, you are a Socratic tutor who only asks questions.'",
    explanation:
      'This is an act of re-centering the context. You are reinforcing the initial instructions to guide the AI back to its intended persona.'
  },
  {
    questionText: "Fundamentally, what is 'context management' when interacting with an AI?",
    options: [
      "The skill of deliberately guiding the AI by providing, reinforcing, and clarifying information to keep the conversation coherent and on-task.",
      'The act of clearing the chat history after every message.',
      "A feature that automatically corrects your grammar and spelling.",
      'The process of typing as fast as the AI can respond.'
    ],
    correctAnswer:
      "The skill of deliberately guiding the AI by providing, reinforcing, and clarifying information to keep the conversation coherent and on-task.",
    explanation:
      "Context management is the active process of controlling what's in the AI's short-term memory to achieve a specific goal, rather than just passively having a conversation."
  },
  {
    questionText:
      'Why is creating a consistent AI persona a good way to practice context management?',
    options: [
      'It forces you to be mindful of keeping specific rules and instructions in the AI\'s active context.',
      'Personas make the AI more creative.',
      "It's the only way to make an AI useful.",
      "It isn't a good way to practice."
    ],
    correctAnswer:
      "It forces you to be mindful of keeping specific rules and instructions in the AI's active context.",
    explanation:
      "Maintaining a persona is a great test of your ability to use techniques like priming and re-centering to ensure the AI doesn't lose track of its core goal."
  }
];

export default quizQuestions;
