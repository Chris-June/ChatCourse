import React from 'react';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import InlineChat from '../../../../../components/InlineChat';
import KeyTakeaways from '../../../components/KeyTakeaways';
import PortfolioPanel from '@/components/portfolio/PortfolioPanel';
import ArtifactViewer from '@/components/portfolio/ArtifactViewer';
import { nextTokenAssistantPrompt } from '@/prompts';
import InteractiveTokenizer from './components/InteractiveTokenizer';
import PredictTheNextToken from '@/pages/instructions/components/PredictTheNextToken';



 

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
    ,
    {
      questionText: 'What does greedy decoding (temperature = 0) usually produce?',
      options: [
        'Highly creative, varied text with many surprises',
        'Stable, plain responses that follow the highest-probability next token',
        'Translations into random languages',
        'Longer responses regardless of prompt length'
      ],
      correctAnswer: 'Stable, plain responses that follow the highest-probability next token',
      explanation: 'Greedy picks the single most likely token each step. Great for consistency; weaker for creativity.'
    },
    {
      questionText: 'How does increasing temperature typically affect generation?',
      options: [
        'It decreases randomness and repetition',
        'It increases randomness and variety in the next-token choice',
        'It guarantees factual accuracy',
        'It extends the context window'
      ],
      correctAnswer: 'It increases randomness and variety in the next-token choice',
      explanation: 'Higher temperature flattens the probability distribution so lower-probability tokens are sampled more often.'
    },
    {
      questionText: 'Why do tokens matter for costs and limits?',
      options: [
        'Costs/limits are measured in tokens, so longer prompts leave fewer tokens for the reply',
        'Tokens determine which websites the model can read',
        'Tokens control your internet bandwidth',
        'Tokens only matter for non-English languages'
      ],
      correctAnswer: 'Costs/limits are measured in tokens, so longer prompts leave fewer tokens for the reply',
      explanation: 'Token budgets cap how much you can send and receive. Keeping prompts concise preserves room for the answer.'
    }
  ];

  return (
    <LessonTemplate
      moduleNumber={1}
      lessonNumber={2}
      title="Tokenization and Next-Token Prediction"
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
        <p className="text-muted-foreground mb-4">
          Before an AI can understand your prompt, it needs to break it down into smaller pieces. These pieces are called <strong>tokens</strong>. A token can be a word, a part of a word, a number, or even just a punctuation mark. For example, the sentence "AI is powerful" might be broken down into three tokens: `["AI", "is", "powerful"]`.
        </p>
        <p className="text-muted-foreground mb-4">
          However, a more complex word like "tokenization" might be broken into multiple tokens, such as `["token", "ization"]`. This allows the model to understand and build new words it hasn't seen before.
        </p>
        <div className="bg-muted p-4 rounded-xl border">
          <h4 className="text-lg font-bold text-primary mb-2">Example of Tokenization</h4>
          <p className="text-muted-foreground">The phrase: <code className="bg-muted-foreground/20 px-1 rounded">Prompt engineering is fun!</code></p>
          <p className="text-muted-foreground">Might become these tokens: <code className="bg-muted-foreground/20 px-1 rounded">["Prompt", "_engineering", "_is", "_fun", "!"]</code></p>
          <p className="text-xs text-primary mt-3 bg-primary/10 p-2 rounded">Notice the underscores? They represent spaces and are part of the token itself. Everything you type is converted into this format.</p>
        </div>

        <InteractiveTokenizer />

        <div className="p-4 bg-muted/20 rounded-md border mt-4">
          <h4 className="text-sm font-semibold mb-2">Tokenization Gotchas</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li><strong>Whitespace & punctuation</strong> are tokens too; formatting affects counts.</li>
            <li><strong>Sub-words</strong> split rare/long terms (e.g., "un-believ-able").</li>
            <li><strong>Emoji & symbols</strong> each cost tokens; heavy use shrinks reply space.</li>
          </ul>
        </div>

        <div className="p-4 bg-muted/20 rounded-md border mt-4">
          <h4 className="text-sm font-semibold mb-2">Mini-Glossary</h4>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <div><dt className="font-medium">Token</dt><dd>Smallest chunk the model reads/writes (word, sub-word, punctuation, emoji).</dd></div>
            <div><dt className="font-medium">Vocabulary</dt><dd>The set of all tokens the model can emit.</dd></div>
            <div><dt className="font-medium">Distribution</dt><dd>All possible next tokens with their probabilities.</dd></div>
            <div><dt className="font-medium">Decoding</dt><dd>How a token is chosen (greedy, temperature, top‑p).</dd></div>
          </dl>
        </div>

        <div className="p-4 bg-muted/10 rounded-md border mt-4">
          <h4 className="text-sm font-semibold mb-2">Token Sense: Budget & Brevity</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li><strong>Tokens ≠ words:</strong> English averages ~0.75 words/token.</li>
            <li><strong>Be concise:</strong> Short prompts preserve tokens for the answer.</li>
            <li><strong>Prefer clarity:</strong> "use" over "utilize"; remove filler; keep examples tight.</li>
          </ul>
        </div>

        <div className="p-4 bg-muted/30 rounded-md border mt-4">
          <h4 className="text-sm font-semibold mb-2">Myth vs. Reality</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li><strong>Myth:</strong> “Tokens are just words.” <br/>
              <strong>Reality:</strong> Tokens can be words, sub‑words, punctuation, or even emojis.</li>
            <li><strong>Myth:</strong> “Tokenization is always intuitive.” <br/>
              <strong>Reality:</strong> Sometimes tokenization splits words in unexpected places (e.g., "friendship" → ["friend", "ship"]).</li>
            <li><strong>Myth:</strong> “More tokens always mean more detail.” <br/>
              <strong>Reality:</strong> More tokens can mean redundancy and higher costs.</li>
          </ul>
        </div>

        <div className="p-4 bg-muted/20 rounded-md border mt-4">
          <h4 className="text-sm font-semibold mb-2">Analogies to Understand Tokens</h4>
          <p className="text-sm text-muted-foreground mb-2">Think of tokens like:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li><strong>LEGO bricks:</strong> Small pieces that snap together to build larger structures (sentences, essays).</li>
            <li><strong>Musical notes:</strong> Individual sounds that combine into melodies and songs.</li>
            <li><strong>Currency:</strong> You “spend” tokens for input and output; manage your budget wisely.</li>
          </ul>
        </div>

        <div className="p-4 bg-card rounded-md border mt-4">
          <h4 className="text-sm font-semibold mb-2">Quick Check</h4>
          <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
            <li>List three different things that can be tokens besides whole words.</li>
            <li>Why does breaking “unbelievable” into sub‑words help the model?</li>
            <li>How might emojis affect your token budget?</li>
          </ol>
          <p className="text-xs text-muted-foreground mt-2">Tip: Write your answers and ask the inline chat to “check for accuracy in one sentence each.”</p>
        </div>
      </section>

      {/* Interactive: Understand next-token prediction */}
      <section className="mt-10">
        <PredictTheNextToken />
      </section>

      <section className="mt-8">
        <div className="p-6 bg-card rounded-xl border">
        <h3 className="text-2xl font-semibold text-foreground mb-4">The Engine of Creation: Next-Token Prediction</h3>
        <p className="text-muted-foreground mb-4">
          So, why are tokens so important? Because at its core, a Large Language Model (LLM) is a <strong>next-token prediction engine</strong>. Its fundamental job is to look at a sequence of tokens and predict which token is most likely to come next.
        </p>
        <p className="text-muted-foreground mb-4">
          When you give the AI a prompt, it tokenizes your input and then runs a simple, powerful loop:
        </p>
        <ol className="list-decimal list-inside bg-muted p-4 rounded-xl space-y-2 text-muted-foreground">
          <li>Look at the existing sequence of tokens.</li>
          <li>Calculate the probability for every possible token that could come next.</li>
          <li>Choose the most likely token and add it to the sequence.</li>
          <li>Repeat the process until the response is complete.</li>
        </ol>
        <p className="text-muted-foreground mb-4">
          Every amazing essay, complex piece of code, or creative story an AI generates is built one token at a time through this predictive process. This is why your prompt is so critical—it sets the starting conditions and guides the AI's predictions, making your desired output the most probable outcome.
        </p>

        <div className="p-4 bg-muted/20 rounded-md border mt-4">
          <h4 className="text-sm font-semibold mb-2">Greedy vs. Sampling (Tiny Demo)</h4>
          <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`Prompt: "Write a single upbeat sentence about opening a cafe."
Greedy (temperature=0):
- "We are opening a new cafe in town."
Sampling (temperature=0.8, top_p=0.9):
- "Doors swing open on our cozy new cafe—come in for the first pour!"`}
          </pre>
          <p className="text-xs text-muted-foreground mt-2">Greedy is stable and plain; sampling adds variety at the cost of consistency.</p>
        </div>

        <div className="p-4 bg-muted/20 rounded-md border mt-4">
          <h4 className="text-sm font-semibold mb-2">Probability in Action</h4>
          <p className="text-sm text-muted-foreground mb-2">Imagine typing <code className="bg-muted px-1 rounded">"Peanut butter and"</code>. The model assigns probabilities like:</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground my-2">
            <li><strong>85%</strong>: "jelly"</li>
            <li><strong>10%</strong>: "honey"</li>
            <li><strong>3%</strong>: "chocolate"</li>
            <li><strong>2%</strong>: "bananas"</li>
          </ul>
          <p className="text-xs text-muted-foreground">Decoding picks one token, appends it, and repeats—one step at a time.</p>
        </div>

        <div className="p-4 bg-card rounded-md border mt-4">
          <h4 className="text-sm font-semibold mb-2">Quick Check</h4>
          <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
            <li>When would you prefer greedy decoding over sampling (and vice‑versa)?</li>
            <li>How would you rewrite a verbose prompt to save tokens?</li>
          </ol>
          <p className="text-xs text-muted-foreground mt-2">Tip: Paste your answers into the chat below and ask for “pass/fail + one suggestion.”</p>
        </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="p-6 bg-card rounded-xl border">
        <h3 className="text-2xl font-semibold text-foreground mb-4">Challenge: Guide the Predictor</h3>
        <p className="text-muted-foreground mb-4">
          Now it's time to apply what you've learned. Your challenge is to write a prompt that steers the AI's next-token prediction. Start a sentence or a question and see if you can get the AI to complete it in a specific way. For example, try starting with "The best way to learn prompt engineering is..." and see what it predicts.
        </p>
        <InlineChat 
          moduleId="lesson-1.2-chat"
          systemPrompt={nextTokenAssistantPrompt}
          placeholder="Write the beginning of a prompt to see how the AI completes it..."
        />
        </div>
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

      {/* Portfolio: export artifacts and see saved items for this lesson */}
      <PortfolioPanel
        title="Portfolio"
        description="Export your collected artifacts anytime. Some lessons also provide a Save action."
        className="mt-4 mb-4"
      />
      <ArtifactViewer module={1} lesson={2} className="mb-6" />

      <section className="mt-6 bg-muted/30 border border-muted rounded-xl p-4">
        <h4 className="text-sm font-semibold mb-2 text-foreground">You can now…</h4>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Explain tokens in plain language to a non-technical colleague</li>
          <li>Predict when tokenization will split words and why</li>
          <li>Write prompts that better steer next-token prediction</li>
          <li>Describe the difference between greedy decoding and sampling</li>
          <li>Estimate token budgets and adjust prompts to fit within limits</li>
        </ul>
      </section>
    </LessonTemplate>
  );
};

export default Lesson1_2;
