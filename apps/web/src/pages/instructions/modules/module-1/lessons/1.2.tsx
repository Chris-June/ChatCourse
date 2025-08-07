import React, { useState, useEffect } from 'react';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import InlineChat from '../../../../../components/InlineChat';
import KeyTakeaways from '../../../components/KeyTakeaways';



const tokenizeText = (text: string): string[] => {
  // This is a simplified tokenizer for demonstration.
  // It splits by word boundaries or grabs any non-whitespace character.
  return text.match(/\b\w+\b|\S/g) || [];
};

const InteractiveTokenizer = () => {
  const [inputText, setInputText] = useState('Hello world! This is a test.');
  const [tokens, setTokens] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setTokens(tokenizeText(inputText));
  }, [inputText]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const animateTokens = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000); // Animation duration
  };

  return (
    <div className="bg-card p-6 rounded-xl border border-muted mb-6 my-8">
      <h4 className="text-lg font-semibold text-card-foreground mb-4">Interactive Tokenizer Demo</h4>
      <p className="text-muted-foreground mb-4 text-sm">
        Type in the box below to see how your text gets broken down into tokens. This is a fundamental step in how LLMs process language.
      </p>
      <label htmlFor="tokenizer-input" className="block text-xs font-medium text-muted-foreground mb-2">
        Enter text to tokenize
      </label>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        id="tokenizer-input"
        className="w-full h-24 bg-muted border rounded-md p-3 text-foreground focus:ring-2 focus:ring-primary transition"
        placeholder="Enter text to tokenize..."
      />
      <div className="flex justify-end mt-3">
        <button
          onClick={animateTokens}
          className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-primary/90 transition-colors"
        >
          Visualize Tokenization
        </button>
      </div>
      <div className="mt-4 pt-4 border-t border">
        <h5 className="text-base font-medium text-card-foreground mb-3">Tokens:</h5>
        <div className="flex flex-wrap gap-2">
          {tokens.map((token, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-md text-sm ${isAnimating ? 'animate-pulse bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
              style={{ animationDelay: isAnimating ? `${index * 50}ms` : '0ms' }}
            >
              {token}
            </span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3" role="status" aria-live="polite">Token Count: {tokens.length}</p>
      </div>
    </div>
  );
};

const Lesson1_2: React.FC = () => {

 const quizQuestions = [
    {
      questionText: 'In LLMs, what is a token?',
      options: [
        'A special password for accessing the AI.',
        'A small piece of text, like a word or part of a word, that the AI uses for processing.',
        'A measurement of the AI\'s memory.',
        'A type of programming error.'
      ],
      correctAnswer: 'A small piece of text, like a word or part of a word, that the AI uses for processing.',
      explanation: 'Correct! Tokens are the basic building blocks that LLMs use to understand human language and generate responses.'
    },
    {
      questionText: 'What is the fundamental process that an LLM uses to generate text?',
      options: [
        'Searching the internet for answers and copying them.',
        'Translating the text into a different language and back.',
        'Predicting the next most likely token in a sequence.',
        'Checking a large database of pre-written sentences.'
      ],
      correctAnswer: 'Predicting the next most likely token in a sequence.',
      explanation: 'Exactly! At its core, an LLM is a powerful engine that repeatedly predicts the next token based on the sequence of tokens that came before it.'
    },
    {
      questionText: 'Why might the word "unbelievable" be split into multiple tokens like `["un", "believ", "able"]`?',
      options: [
        'To make the text harder to read.',
        'It is a random process with no reason.',
        'To help the model understand word parts and construct new words it hasn\'t seen before.',
        'To save memory by using shorter tokens.'
      ],
      correctAnswer: 'To help the model understand word parts and construct new words it hasn\'t seen before.',
      explanation: 'Correct! By breaking down complex words, the model can handle a vast vocabulary and even understand and create novel words based on their components.'
    },
    {
      questionText: 'How does a well-crafted prompt influence next-token prediction?',
      options: [
        'It changes the AI\'s core programming.',
        'It makes the desired output the most statistically probable outcome.',
        'It gives the AI access to more of the internet.',
        'It doesn\'t; the AI\'s output is always random.'
      ],
      correctAnswer: 'It makes the desired output the most statistically probable outcome.',
      explanation: 'Precisely! A good prompt sets the initial conditions of the predictive loop, guiding the AI to generate the sequence of tokens that aligns with your goal.'
    }
  ];

  return (
    <LessonTemplate
      moduleNumber={1}
      lessonNumber={2}
      title="1.2 Tokenization and Next-Token Prediction"
      subtitle="The foundation of AI interaction."
      quizQuestions={quizQuestions}
    >
      <section className="mb-6 bg-muted/30 border border-muted rounded-xl p-4">
        <p className="text-xs text-muted-foreground mb-2">Estimated time: 8–12 minutes</p>
        <h4 className="text-sm font-semibold mb-2 text-foreground">What you'll learn</h4>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>What tokens are and why they matter</li>
          <li>How next-token prediction works at a high level</li>
          <li>How tokenization impacts costs and limits</li>
        </ul>
      </section>
      <section>
        <h3 className="text-2xl font-semibold text-foreground mb-4">The Building Blocks: Tokens</h3>
        <p className="text-gray-300 mb-4">
          Before an AI can understand your prompt, it needs to break it down into smaller pieces. These pieces are called <strong>tokens</strong>. A token can be a word, a part of a word, a number, or even just a punctuation mark. For example, the sentence "AI is powerful" might be broken down into three tokens: `["AI", "is", "powerful"]`.
        </p>
        <p className="text-gray-300 mb-4">
          However, a more complex word like "tokenization" might be broken into multiple tokens, such as `["token", "ization"]`. This allows the model to understand and build new words it hasn't seen before.
        </p>
        <div className="bg-muted p-4 rounded-xl border">
          <h4 className="text-lg font-bold text-primary mb-2">Example of Tokenization</h4>
          <p className="text-muted-foreground">The phrase: <code className="bg-muted-foreground/20 px-1 rounded">Prompt engineering is fun!</code></p>
          <p className="text-muted-foreground">Might become these tokens: <code className="bg-muted-foreground/20 px-1 rounded">["Prompt", "_engineering", "_is", "_fun", "!"]</code></p>
          <p className="text-xs text-primary mt-3 bg-primary/10 p-2 rounded">Notice the underscores? They represent spaces and are part of the token itself. Everything you type is converted into this format.</p>
        </div>

        <InteractiveTokenizer />

      </section>

      <section className="mt-8">
        <h3 className="text-2xl font-semibold text-foreground mb-4">The Engine of Creation: Next-Token Prediction</h3>
        <p className="text-gray-300 mb-4">
          So, why are tokens so important? Because at its core, a Large Language Model (LLM) is a <strong>next-token prediction engine</strong>. Its fundamental job is to look at a sequence of tokens and predict which token is most likely to come next.
        </p>
        <p className="text-gray-300 mb-4">
          When you give the AI a prompt, it tokenizes your input and then runs a simple, powerful loop:
        </p>
        <ol className="list-decimal list-inside bg-muted p-4 rounded-xl space-y-2 text-muted-foreground">
          <li>Look at the existing sequence of tokens.</li>
          <li>Calculate the probability for every possible token that could come next.</li>
          <li>Choose the most likely token and add it to the sequence.</li>
          <li>Repeat the process until the response is complete.</li>
        </ol>
        <p className="text-gray-300 mb-4">
          Every amazing essay, complex piece of code, or creative story an AI generates is built one token at a time through this predictive process. This is why your prompt is so critical—it sets the starting conditions and guides the AI's predictions, making your desired output the most probable outcome.
        </p>
      </section>

      <KeyTakeaways
        points={[
          'Tokens are the basic building blocks that LLMs use to understand human language and generate responses.',
          'A token can be a word, a part of a word, a number, or even just a punctuation mark.',
          'A tokenization process breaks down complex words into smaller pieces to help the model understand and build new words it hasn\'t seen before.',
          'Next-token prediction is the fundamental process that an LLM uses to generate text.',
          'A well-crafted prompt can influence next-token prediction by making the desired output the most statistically probable outcome.',
          'A good prompt sets the initial conditions of the predictive loop, guiding the AI to generate the sequence of tokens that aligns with your goal.',
        ]}
      />

      <section className="mt-8">
        <h3 className="text-2xl font-semibold text-foreground mb-4">Challenge: Guide the Predictor</h3>
        <p className="text-gray-300 mb-4">
          Now it's time to apply what you've learned. Your challenge is to write a prompt that steers the AI's next-token prediction. Start a sentence or a question and see if you can get the AI to complete it in a specific way. For example, try starting with "The best way to learn prompt engineering is..." and see what it predicts.
        </p>
        <InlineChat 
          moduleId="lesson-1.2-chat"
          systemPrompt="You are a helpful AI assistant demonstrating next-token prediction. Your goal is to complete the user's sentence or answer their question in a natural, helpful way. You are continuing a conversation about the fundamentals of prompt engineering."
          placeholder="Write the beginning of a prompt to see how the AI completes it..."
        />
      </section>

      <section className="mt-6 bg-muted/30 border border-muted rounded-xl p-4">
        <h4 className="text-sm font-semibold mb-2 text-foreground">You can now…</h4>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Explain tokens in plain language to a non-technical colleague</li>
          <li>Predict when tokenization will split words and why</li>
          <li>Write prompts that better steer next-token prediction</li>
        </ul>
      </section>
    </LessonTemplate>
  );
};

export default Lesson1_2;
