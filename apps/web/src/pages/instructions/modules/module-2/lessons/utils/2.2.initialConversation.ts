export type ChatMessage = { role: 'user' | 'assistant'; content: string };

const initialConversation: ChatMessage[] = [
  {
    role: 'user',
    content:
      "You are a marketing copywriter for a tech startup. Write an engaging 'About Us' page for a new company called 'Innovate Inc.' that builds AI-powered productivity tools. Focus on our mission to eliminate tedious tasks and unlock human creativity. Keep the tone inspiring and forward-looking."
  },
  {
    role: 'assistant',
    content:
      "At Innovate Inc., we believe your potential is limitless. But the reality is, tedious, repetitive tasks can stifle the very creativity that drives progress. That's why we're here.\n\nOur mission is to build intelligent tools that melt away the mundane. We create AI-powered productivity software that automates the boring, streamlines the complex, and liberates you to focus on what truly matters: the big ideas, the game-changing strategies, and the creative breakthroughs that only you can deliver.\n\nWe're not just building apps; we're crafting a future where technology serves as a true partner in your success, clearing the path for you to innovate, create, and achieve the extraordinary. Welcome to the future of productivity. Welcome to Innovate Inc."
  }
];

export default initialConversation;
