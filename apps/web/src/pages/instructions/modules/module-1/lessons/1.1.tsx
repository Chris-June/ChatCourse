import React from 'react';
import { Lightbulb, BrainCircuit, Puzzle } from 'lucide-react';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import InlineChat from '../../../../../components/InlineChat';
import KeyTakeaways from '../../../components/KeyTakeaways';

const Lesson1_1: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What is the most fundamental job of a Large Language Model (LLM)?',
      options: [
        'To understand human emotions',
        'To browse the internet and find facts',
        'To predict the next most likely word in a sentence',
        'To translate languages with perfect accuracy',
      ],
      correctAnswer: 'To predict the next most likely word in a sentence',
      explanation: 'Correct! LLMs are sophisticated pattern-matching systems designed to predict the next token (word or part of a word) based on the input they receive.',
    },
    {
      questionText: 'What does it mean to \'tokenize\' text for an AI?',
      options: [
        'To check for spelling and grammar errors',
        'To break the text down into smaller units (words or sub-words)',
        'To encrypt the text for security',
        'To summarize the text into key points',
      ],
      correctAnswer: 'To break the text down into smaller units (words or sub-words)',
      explanation: 'Exactly! Tokenization is the process of converting a sequence of text into a sequence of tokens, which are the basic building blocks the model works with.',
    },
    {
      questionText: 'Why are tokens important in how LLMs generate responses?',
      options: [
        'They help the model encrypt sensitive data',
        'They determine the length and complexity of the prompt',
        'They act as the basic building blocks the model uses to understand and generate text',
        'They allow the model to speak multiple languages',
      ],
      correctAnswer: 'They act as the basic building blocks the model uses to understand and generate text',
      explanation: 'Correct! Tokens are how the model “sees” your input. Everything is converted into tokens before the model can work with it.',
    },
    {
      questionText: 'What happens after text is tokenized in an LLM?',
      options: [
        'The model uses a probability map to predict the next most likely token',
        'The tokens are translated into human language',
        'The tokens are stored permanently in the model’s memory',
        'The model deletes unrelated tokens',
      ],
      correctAnswer: 'The model uses a probability map to predict the next most likely token',
      explanation: 'Exactly. After tokenization, the model evaluates what token is most probable to follow using its learned knowledge from training.',
    },
    {
      questionText: 'How does prompt design influence the model’s output?',
      options: [
        'It doesn’t matter—the output is always the same',
        'A well-designed prompt makes the desired output more likely',
        'Prompt design only affects the speed of the response',
        'It changes the model’s training data',
      ],
      correctAnswer: 'A well-designed prompt makes the desired output more likely',
      explanation: 'Correct! LLMs are probability machines, so phrasing your prompt well makes it easier for the model to predict the output you want.',
    },
  ];

  return (
    <LessonTemplate
      moduleNumber={1}
      lessonNumber={1}
      title="What is an AI, Really?"
      subtitle="Beyond the hype, let's build a real foundation."
      quizQuestions={quizQuestions}
    >
      <section className="mb-6 bg-muted/30 border border-muted rounded-xl p-4">
        <p className="text-xs text-muted-foreground mb-2">Estimated time: 8–12 minutes</p>
        <h4 className="text-sm font-semibold mb-2 text-foreground">What you'll learn</h4>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>What an LLM is (in plain language)</li>
          <li>What tokens are and why they matter</li>
          <li>Why prompting influences model behavior</li>
        </ul>
      </section>
      
      <section className="space-y-6">
        <div className="p-6 bg-card rounded-xl border">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4 flex items-center">
            <Lightbulb className="w-6 h-6 mr-3 text-primary" />
            The Core Idea: A Super-Powered Autocomplete
          </h2>
          <p className="text-muted-foreground mb-4">
            Forget sci-fi dreams of sentient machines—let’s start with the basics. At its most fundamental level, a Large Language Model (LLM) like ChatGPT is simply a system trained to predict the next most likely word—or more precisely, token—in a sequence of text. That’s it. It doesn't think or reason like a human. It doesn’t “know” things in the way you do. It works based on probabilities, patterns, and statistical correlations.
          </p>
          <p className="text-muted-foreground mb-4">
            Imagine you're typing a message on your phone, and your keyboard suggests the next word—"Hi, how are..." becomes "you?" That’s autocomplete. LLMs are like autocomplete on steroids, trained on vast amounts of text data to predict what comes next with astonishing fluency. But instead of just suggesting a word or two, they can generate full essays, answer complex questions, write code, and simulate conversations. All of this power comes from one core idea:
          </p>
          <blockquote className="border-l-4 border-primary pl-4 py-2 bg-primary/10 text-primary-foreground">
            <p className="font-medium">
              Given a sequence of text, an LLM is trained to predict the next most likely word (or token).
            </p>
          </blockquote>
        </div>

        <div className="p-6 bg-card rounded-xl border">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4 flex items-center">
            <BrainCircuit className="w-6 h-6 mr-3 text-primary" />
            How Do They 'Think'? Tokens and Probability
          </h2>
          <p className="text-muted-foreground mb-4">
            Think of your favorite messaging app. When you start typing a word, it often suggests what you might say next. LLMs operate on a similar principle, but on a planetary scale. They aren’t “thinking” in the human sense; they are running a sophisticated statistical analysis to predict the next most likely word based on the trillions of sentences they’ve been trained on.
          </p>
          <p className="text-muted-foreground mb-4">
            A <strong>token</strong> is the smallest chunk of text the model processes. It might be a whole word (like <code className="bg-muted text-muted-foreground px-1 py-0.5 rounded">dog</code>), a part of a word (like <code className="bg-muted text-muted-foreground px-1 py-0.5 rounded">un-</code>), or even a punctuation mark. Tokenization helps standardize how input is processed across languages and writing styles.
          </p>
          <p className="text-muted-foreground mb-4">
            Let’s take the phrase <code className="bg-muted text-muted-foreground px-1 py-0.5 rounded">"Prompt engineering is cool"</code>. Depending on the tokenizer, it might be split into tokens like:
            <code className="bg-muted text-muted-foreground px-1 py-0.5 rounded">[Prompt]</code>, <code className="bg-muted text-muted-foreground px-1 py-0.5 rounded">[ engineering]</code>, <code className="bg-muted text-muted-foreground px-1 py-0.5 rounded">[ is]</code>, <code className="bg-muted text-muted-foreground px-1 py-0.5 rounded">[ cool]</code>.
          </p>
          <p className="text-muted-foreground mb-4">
            Once text is tokenized, the model’s job is to determine what token is likely to come next. To do this, it references an internal “probability distribution”—a massive statistical model built during training. Given a prompt, the model evaluates all possible next tokens and chooses the one with the highest probability.
          </p>
          <p className="text-muted-foreground mb-4">
            This process repeats one token at a time. After each new token is added to the sequence, the model recalculates the next most likely token. It’s like playing an infinite autocomplete game, but the stakes are much higher.
          </p>
          <p className="text-muted-foreground mb-4">
            Think of the model’s “thought process” as navigating a branching tree of possibilities. Every token you feed it narrows the branches. With each step, the model is trying to guess: “Given everything I’ve seen so far, what’s the most likely thing to come next?”
          </p>
          <p className="text-muted-foreground">
            This is why prompt design is so important. The words you choose influence which path the model travels down. You’re not just asking it to generate text—you’re nudging its probability engine in the direction you want it to go.
          </p>
        </div>

        <KeyTakeaways
          points={[
            "An LLM is a system trained to predict the next most likely word or token in a sequence of text.",
            "Tokens are the basic building blocks the model uses to understand and generate text.",
            "The model uses a probability map to predict the next most likely token.",
            "Prompt design is crucial as it influences the model’s output.",
          ]}
        />

        <div className="p-6 bg-card rounded-xl border">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4 flex items-center">
            <Puzzle className="w-6 h-6 mr-3 text-accent" />
            Talk to the AI: Apply Your Knowledge
          </h2>
          <p className="text-muted-foreground mb-4">
            Now that you understand what tokens are, try talking to the AI below. Ask it a question about tokenization, or give it a simple prompt and see how it responds. This is a great way to get a feel for how your words directly influence the AI.
          </p>
          <InlineChat 
            moduleId="lesson-1.1-chat"
            systemPrompt="You are a helpful AI assistant for a course on prompt engineering. Your goal is to answer questions and have a simple conversation about tokenization and the basic concepts of how Large Language Models work. Keep your answers concise and easy to understand for a beginner."
            placeholder="Ask a question about tokens..."
          />
        </div>
      </section>

      <section className="mt-6 bg-muted/30 border border-muted rounded-xl p-4">
        <h4 className="text-sm font-semibold mb-2 text-foreground">You can now…</h4>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Explain what an LLM does without jargon</li>
          <li>Describe tokens as the model’s basic building blocks</li>
          <li>Articulate why prompt wording steers the result</li>
        </ul>
      </section>
    </LessonTemplate>
  );
};

export default Lesson1_1;