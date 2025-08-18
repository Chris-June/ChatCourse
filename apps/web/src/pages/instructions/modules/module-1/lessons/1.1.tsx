import React from 'react';
import { Lightbulb, BrainCircuit, Puzzle } from 'lucide-react';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import InlineChat from '../../../../../components/InlineChat';
import KeyTakeaways from '../../../components/KeyTakeaways';
import PortfolioPanel from '@/components/portfolio/PortfolioPanel';
import ArtifactViewer from '@/components/portfolio/ArtifactViewer';
import { introAssistantPrompt } from '@/prompts';

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
            <Lightbulb className="w-6 h-6 mr-3 text-amber-400" />
            The Core Idea: A Super-Powered Autocomplete
          </h2>
          <p className="text-muted-foreground mb-4">
            Forget sci-fi dreams of sentient machines—let’s start with the basics. At its most fundamental level, a Large Language Model (LLM) like ChatGPT is simply a system trained to predict the next most likely word—or more precisely, token—in a sequence of text. That’s it. It doesn't think or reason like a human. It doesn’t “know” things in the way you do. It works based on probabilities, patterns, and statistical correlations.
          </p>
          <p className="text-muted-foreground mb-4">
            Imagine you're typing a message on your phone, and your keyboard suggests the next word—"Hi, how are..." becomes "you?" That’s autocomplete. LLMs are like autocomplete on steroids, trained on vast amounts of text data to predict what comes next with astonishing fluency. But instead of just suggesting a word or two, they can generate full essays, answer complex questions, write code, and simulate conversations. All of this power comes from one core idea:
          </p>
          <blockquote className="border-l-4 border-primary pl-4 py-2 bg-primary/10 text-foreground rounded-lg">
            <p className="font-medium">
              Given a sequence of text, an LLM is trained to predict the next most likely word (or token).
            </p>
          </blockquote>
          <div className="p-4 bg-muted/20 border-l-4 border-amber-400 rounded-md mt-4">
            <h3 className="text-sm font-semibold mb-2">Everyday Example: Probability in Action</h3>
            <p className="text-sm text-muted-foreground">
              Imagine typing the phrase <code className="bg-muted px-1 rounded">"Peanut butter and"</code>. 
              The model doesn’t “know” the answer—it assigns probabilities:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground my-2">
              <li><strong>85%</strong>: “jelly”</li>
              <li><strong>10%</strong>: “honey”</li>
              <li><strong>3%</strong>: “chocolate”</li>
              <li><strong>2%</strong>: “bananas”</li>
            </ul>
            <p className="text-sm text-muted-foreground">
              The model picks the highest-probability token (or samples based on settings like 
              <em>temperature</em>), then repeats the process—one token at a time. 
              That’s the engine behind everything from casual chat to generating a business plan.
            </p>
          </div>

        <div className="p-4 bg-muted/30 rounded-md border mt-4">
          <h3 className="text-sm font-semibold mb-2">Myth vs. Reality</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li><strong>Myth:</strong> “The model understands like a human.” <br/>
              <strong>Reality:</strong> It predicts the next token from patterns.</li>
            <li><strong>Myth:</strong> “It remembers everything I type forever.” <br/>
              <strong>Reality:</strong> It only sees the current conversation (context window).</li>
            <li><strong>Myth:</strong> “It always knows facts.” <br/>
              <strong>Reality:</strong> Fluent ≠ factual; it can be confidently wrong.</li>
          </ul>
        </div>

        <div className="p-4 bg-muted/20 rounded-md border mt-4">
          <h3 className="text-sm font-semibold mb-2">Mini-Glossary</h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <div><dt className="font-medium">Token</dt><dd>Smallest chunk the model reads/writes (word, sub-word, punctuation, emoji).</dd></div>
            <div><dt className="font-medium">Probability Distribution</dt><dd>All possible next tokens with likelihoods.</dd></div>
            <div><dt className="font-medium">Decoding</dt><dd>How we pick the next token (e.g., temperature, top-p).</dd></div>
            <div><dt className="font-medium">Context Window</dt><dd>Max tokens model can consider at once (prompt + reply).</dd></div>
          </dl>
        </div>

        <div className="p-4 bg-muted/10 rounded-md border mt-4">
          <h3 className="text-sm font-semibold mb-2">Prompt Shape Matters</h3>
          <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`Loose: "Tell me about budgeting."
Structured: 
Task: Explain budgeting to a cafe owner.
Constraints: 5 bullet points max, plain language.
Output: A checklist with short actions.`}
          </pre>
          <p className="text-xs text-muted-foreground mt-2">Structured prompts funnel the probability distribution toward the pattern you want.</p>
        </div>

        <div className="p-4 bg-muted/20 rounded-md border mt-4">
          <h3 className="text-sm font-semibold mb-2">Token Sense: Short Words, Big Wins</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li><strong>Tokens ≠ words:</strong> English averages ~0.75 words/token.</li>
            <li><strong>Long prompts cost more:</strong> Fewer tokens remain for the reply.</li>
            <li><strong>Trim fluff:</strong> Prefer “use” over “utilize,” remove filler, keep examples tight.</li>
          </ul>
        </div>

        <div className="p-4 bg-card rounded-md border mt-4">
          <h3 className="text-sm font-semibold mb-2">Pop Quiz (30s)</h3>
          <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
            <li>In one sentence, define what an LLM actually does.</li>
            <li>Name two reasons tokens matter.</li>
            <li>Rewrite this prompt to be more structured: “Help with marketing.”</li>
          </ol>
          <p className="text-xs text-muted-foreground mt-2">Tip: Check your answers by asking the inline chat to grade them “pass/fail with 1 suggestion.”</p>
        </div>

        <div className="p-4 bg-muted/10 rounded-md border mt-4">
          <h3 className="text-sm font-semibold mb-2">Style Switch: Same Content, Different Tone</h3>
          <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`Explain budgeting for a small cafe in 3 bullets:
- Version A: Friendly, casual.
- Version B: Formal, concise.
- Version C: For a 10-year-old.`}
          </pre>
          <p className="text-xs text-muted-foreground mt-2">One task, multiple styles—because we’re steering probabilities with instructions.</p>
        </div>

        <div className="p-4 bg-muted/20 rounded-md border mt-4">
          <h3 className="text-sm font-semibold mb-2">When It Fails (and Why)</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li><strong>Vagueness:</strong> Broad prompts = broad guesses.</li>
            <li><strong>Insufficient context:</strong> The model can’t see what you didn’t say.</li>
            <li><strong>Over-long inputs:</strong> Older details may fall out of the context window.</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-2">Fix with clearer task, constraints, and a minimal example.</p>
        </div>
        </div>

        <div className="p-6 bg-card rounded-xl border">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4 flex items-center">
            <BrainCircuit className="w-6 h-6 mr-3 text-sky-400" />
            How Do They 'Think'? Tokens and Probability
          </h2>
          <p className="text-muted-foreground mb-4">
            Think of your favorite messaging app. When you start typing a word, it often suggests what you might say next. LLMs operate on a similar principle, but on a planetary scale. They aren’t “thinking” in the human sense; they are running a sophisticated statistical analysis to predict the next most likely word based on the trillions of sentences they’ve been trained on.
          </p>
          <p className="text-muted-foreground mb-4">
            A <strong>token</strong> is the smallest chunk of text the model processes. It might be a whole word (like <code className="bg-muted text-muted-foreground px-1 py-0.5 rounded-md">dog</code>), a part of a word (like <code className="bg-muted text-muted-foreground px-1 py-0.5 rounded-md">un-</code>), or even a punctuation mark. Tokenization helps standardize how input is processed across languages and writing styles.
          </p>
          <p className="text-muted-foreground mb-4">
            Let’s take the phrase <code className="bg-muted text-muted-foreground px-1 py-0.5 rounded-md">"Prompt engineering is cool"</code>. Depending on the tokenizer, it might be split into tokens like:
            <code className="bg-muted text-muted-foreground px-1 py-0.5 rounded-md">[Prompt]</code>, <code className="bg-muted text-muted-foreground px-1 py-0.5 rounded-md">[ engineering]</code>, <code className="bg-muted text-muted-foreground px-1 py-0.5 rounded-md">[ is]</code>, <code className="bg-muted text-muted-foreground px-1 py-0.5 rounded-md">[ cool]</code>.
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

          <div className="p-4 bg-muted/20 rounded-md border mt-4">
            <h3 className="text-sm font-semibold mb-2">The 4‑Step Loop (Token by Token)</h3>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
              <li><strong>Tokenize</strong> your input into chunks the model can read.</li>
              <li><strong>Score</strong> all possible next tokens (build a probability distribution).</li>
              <li><strong>Select</strong> one token (greedy <em>argmax</em> or sampling with temperature/top‑p).</li>
              <li><strong>Append</strong> the token to the text and repeat.</li>
            </ol>
            <p className="text-xs text-muted-foreground mt-2">Everything from essays to code comes from this simple loop.</p>
          </div>

          <div className="p-4 bg-muted/10 rounded-md border mt-4">
            <h3 className="text-sm font-semibold mb-2">Greedy vs. Sampling (Tiny Demo)</h3>
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
            <h3 className="text-sm font-semibold mb-2">Tokenization Gotchas</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li><strong>Whitespace & punctuation</strong> are tokens too; formatting can change counts.</li>
              <li><strong>Sub‑words</strong> split rare or long terms (e.g., "un‑believ‑able").</li>
              <li><strong>Emoji & symbols</strong> each cost tokens; heavy use can shrink reply space.</li>
            </ul>
          </div>

          <div className="p-4 bg-card rounded-md border mt-4">
            <h3 className="text-sm font-semibold mb-2">Quick Check</h3>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
              <li>In your own words: what is the model doing at each step of the loop?</li>
              <li>When would you prefer greedy decoding over sampling (and vice‑versa)?</li>
            </ol>
            <p className="text-xs text-muted-foreground mt-2">Tip: Paste your answers into the chat below and ask for “one improvement suggestion per answer.”</p>
          </div>
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
            <Puzzle className="w-6 h-6 mr-3 text-violet-400" />
            Talk to the AI: Apply Your Knowledge
          </h2>
          
        <p className="text-muted-foreground mb-4">
            Now that you understand what tokens are, try talking to the AI below. Ask it a question about tokenization, or give it a simple prompt and see how it responds. This is a great way to get a feel for how your words directly influence the AI.
          </p>
          <InlineChat 
            moduleId="lesson-1.1-chat"
            systemPrompt={introAssistantPrompt}
            placeholder="Ask a question about tokens..."
            maxOutputTokens={4096}
          />
        </div>
      </section>

      {/* Portfolio: export artifacts and see saved items for this lesson */}
      <PortfolioPanel
        title="Portfolio"
        description="Export your collected artifacts anytime. Some lessons also provide a Save action."
        className="mb-4"
      />
      <ArtifactViewer module={1} lesson={1} className="mb-6" />

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