import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import InlineChat from '../../../../../components/InlineChat';
import KeyTakeaways from '../../../components/KeyTakeaways';

const Lesson1_4: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'In the context of AI, what is a "prompt"?',
      options: [
        'A type of AI model.',
        'The instruction, question, or input you give to an AI.',
        'The AI\'s final answer.',
        'A button in the user interface.'
      ],
      correctAnswer: 'The instruction, question, or input you give to an AI.',
      explanation: 'A prompt is simply the text you provide to the AI to get it to perform a task. It\'s the starting point and the most important tool you have for guiding the AI.'
    },
    {
      questionText: 'Why is a clear and specific prompt better than a vague one?',
      options: [
        'It makes the AI respond faster.',
        'Vague prompts can confuse the AI, leading to generic, incorrect, or irrelevant answers.',
        'Specific prompts use fewer tokens and cost less.',
        'It\'s the only way to get the AI to write code.'
      ],
      correctAnswer: 'Vague prompts can confuse the AI, leading to generic, incorrect, or irrelevant answers.',
      explanation: 'The AI relies entirely on your prompt for direction. A vague prompt is like giving a chef a recipe with missing steps; the result will be unpredictable. Specificity leads to quality.'
    },
    {
      questionText: 'What is a key benefit of providing a persona (e.g., "You are a helpful assistant") in a prompt?',
      options: [
        'It makes the AI respond in a different language.',
        'It helps shape the AI\'s tone, style, and expertise for the response.',
        'It is a required part of every prompt.',
        'It makes the AI work faster.'
      ],
      correctAnswer: 'It helps shape the AI\'s tone, style, and expertise for the response.',
      explanation: 'Giving the AI a role or persona is a powerful way to guide its behavior. It tells the model what kind of "hat" to wear, which influences its word choices and how it presents information.'
    },
    {
      questionText: 'If your first prompt doesn\'t give you the desired output, what is the best next step?',
      options: [
        'Assume the AI is broken and try again later.',
        'Ask the exact same question again, but louder (in all caps).',
        'Iterate on your prompt by adding more specific details, context, or examples.',
        'Delete your account.'
      ],
      correctAnswer: 'Iterate on your prompt by adding more specific details, context, or examples.',
      explanation: 'Prompting is an iterative process. The best results often come from refining your initial prompt with more clarity and context based on the AI\'s first attempt.'
    },
    {
      questionText: 'Which of these prompts is most likely to produce a high-quality response?',
      options: [
        'Tell me about dogs.',
        'Write a paragraph about why dogs make good pets.',
        'Write a short, friendly blog post (around 200 words) explaining three key benefits of dog ownership for first-time pet owners.',
        'dogs'
      ],
      correctAnswer: 'Write a short, friendly blog post (around 200 words) explaining three key benefits of dog ownership for first-time pet owners.',
      explanation: 'This prompt is specific about the intent (write a blog post), format (short, ~200 words), tone (friendly), content (three key benefits), and audience (first-time owners). This level of detail makes a good output highly probable.'
    }
  ];

  return (
    <LessonTemplate
      moduleNumber={1}
      lessonNumber={4}
      title="The Art of the Ask (Intro to Prompting)"
      subtitle="How to talk to an AI to get what you want."
      quizQuestions={quizQuestions}
    >
      <div className="space-y-8 text-foreground">
        <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="text-2xl font-semibold text-card-foreground mb-4">Prompting Showdown: Vague vs. Specific</h2>
          <p className="text-muted-foreground mb-4">
            You now know that AI predicts the next word and that it can sometimes make things up (hallucinate). So, how do we control it? The answer is the <strong>prompt</strong>.
          </p>
          <div className="bg-muted p-4 rounded-xl border border-border">
            <p className="text-lg text-center font-semibold text-foreground">
              A prompt is the instruction you give to an AI. It's how you ask questions, give commands, and provide context.
            </p>
          </div>
          <p className="text-muted-foreground mt-4">
            Think of the AI as an incredibly knowledgeable and skilled, but very literal, new employee. It can do almost anything you ask, but it won't do anything *until* you ask. It has no common sense and relies 100% on your instructions. The quality of your prompt directly determines the quality of its response.
          </p>
        </div>

        <div className="text-lg text-muted-foreground">
          <h2 className="text-2xl font-bold text-foreground mb-3">The Core Idea: Your Words are the Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Example 1: Vague vs. Specific Topic */}
            <div className="bg-destructive/10 border border-destructive/30 p-4 rounded-xl">
              <h3 className="text-lg font-bold text-destructive flex items-center mb-3"><ThumbsDown className="mr-2"/>Vague: General Topic</h3>
              <p className="text-muted-foreground mb-4">This prompt is too broad, leading to a generic, unfocused answer.</p>
              <InlineChat 
                moduleId="lesson-1.4-bad-prompt-1"
                readOnly={true}
                systemPrompt="You are a helpful assistant."
                initialMessages={[{ role: 'user', content: 'Explain this code.' }]}
                simulatedResponse="This code defines a function that takes two arguments, `a` and `b`, and returns their sum."
              />
            </div>
            <div className="bg-success/10 border border-success/30 p-4 rounded-xl">
              <h3 className="text-lg font-bold text-success flex items-center mb-3"><ThumbsUp className="mr-2"/>Specific: Focused Topic</h3>
              <p className="text-muted-foreground mb-4">Adds audience, format, and topic constraints for a tailored response.</p>
              <InlineChat 
                moduleId="lesson-1.4-good-prompt-1"
                readOnly={true}
                systemPrompt="You are a helpful assistant who is an expert Python programmer."
                initialMessages={[{ role: 'user', content: 'Explain this Python code for a beginner. What is a type hint? Why is the return value `-> int`?' }]}
                simulatedResponse="This is a Python function named `add` that takes two integers, `a` and `b`, as input. The `a: int` and `b: int` are called 'type hints,' which tell developers what kind of data the function expects. It calculates their sum and returns the result. The `-> int` part is also a type hint, indicating that the function is expected to return an integer. This helps catch bugs early and makes the code easier to understand!"
              />
            </div>

            {/* Example 2: Vague vs. Specific Dinner Planning */}
            <div className="bg-destructive/10 border border-destructive/30 p-4 rounded-xl">
              <h3 className="text-lg font-bold text-destructive flex items-center mb-3"><ThumbsDown className="mr-2"/>Vague: Dinner Idea</h3>
              <p className="text-muted-foreground mb-4">The AI has no idea about your preferences, ingredients, or time.</p>
              <InlineChat 
                moduleId="lesson-1.4-bad-prompt-2"
                readOnly={true}
                systemPrompt="You are a helpful meal planner."
                initialMessages={[{ role: 'user', content: 'What should I make for dinner?' }]}
                simulatedResponse="There are many options! You could make pasta, a stir-fry, or perhaps a salad. Without knowing your preferences or what ingredients you have, it's hard to give a specific suggestion."
              />
            </div>
            <div className="bg-success/10 border border-success/30 p-4 rounded-xl">
              <h3 className="text-lg font-bold text-success flex items-center mb-3"><ThumbsUp className="mr-2"/>Specific: Dinner Idea</h3>
              <p className="text-muted-foreground mb-4">Includes dietary needs, ingredients, and time available for a more helpful suggestion.</p>
              <InlineChat 
                moduleId="lesson-1.4-good-prompt-2"
                readOnly={true}
                systemPrompt="You are a creative and practical home cook assistant."
                initialMessages={[{ role: 'user', content: 'Give me a quick vegetarian dinner idea I can make in under 30 minutes with chickpeas, spinach, and rice. I like mildly spicy food and have a stovetop and microwave available.' }]}
                simulatedResponse="Here's a delicious and easy-to-make vegetarian dinner idea that fits your requirements: Chickpea and Spinach Curry. You can make it in under 30 minutes using your stovetop and microwave. Simply sauté the onions, ginger, and garlic, then add the chickpeas, spinach, and your favorite curry spices. Serve over rice and enjoy!"
              />
            </div>

            {/* Example 3: Ambiguous vs. Clear Persona */}
            <div className="bg-destructive/10 border border-destructive/30 p-4 rounded-xl">
              <h3 className="text-lg font-bold text-destructive flex items-center mb-3"><ThumbsDown className="mr-2"/>Vague: Email Request</h3>
              <p className="text-muted-foreground mb-4">The AI lacks the sender, recipient, and context to write a useful email.</p>
              <InlineChat 
                moduleId="lesson-1.4-bad-prompt-3"
                readOnly={true}
                systemPrompt="You are a helpful assistant."
                initialMessages={[{ role: 'user', content: 'Write an email about the deadline.' }]}
                simulatedResponse="Subject: Deadline\n\nHi Team,\n\nPlease be aware of the upcoming deadline. Let me know if you have any questions.\n\nThanks"
              />
            </div>
            <div className="bg-success/10 border border-success/30 p-4 rounded-xl">
              <h3 className="text-lg font-bold text-success flex items-center mb-3"><ThumbsUp className="mr-2"/>Specific: Email Request</h3>
              <p className="text-muted-foreground mb-4">Provides a clear persona, audience, and key message points.</p>
              <InlineChat 
                moduleId="lesson-1.4-good-prompt-3"
                readOnly={true}
                systemPrompt="You are a project manager."
                initialMessages={[{ role: 'user', content: 'Write a professional email to my dev team announcing the project deadline has been moved to August 15th. Express confidence and ask them to flag blockers by EOD.' }]}
                simulatedResponse="Subject: Project Phoenix Deadline Update: New Date is August 15th\n\nHi Team,\n\nQuick update: we've officially moved the final deadline for Project Phoenix to **August 15th**. \n\nI have full confidence in our ability to hit this new target, and I'm excited about the progress we're making. To ensure we have a smooth path forward, please take some time today to review your remaining tasks and **flag any potential blockers by the end of the day.**\n\nLet's keep up the great momentum!\n\nBest,\n[Your Name]"
              />
            </div>

             {/* Example 4: Missing Context vs. Context-Rich */}
            <div className="bg-destructive/10 border border-destructive/30 p-4 rounded-xl">
              <h3 className="text-lg font-bold text-destructive flex items-center mb-3"><ThumbsDown className="mr-2"/>Vague: Summarization</h3>
              <p className="text-muted-foreground mb-4">The AI doesn't know what to summarize or what's important.</p>
              <InlineChat 
                moduleId="lesson-1.4-bad-prompt-4"
                readOnly={true}
                systemPrompt="You are a helpful assistant."
                initialMessages={[{ role: 'user', content: 'Summarize the report for me.' }]}
                simulatedResponse="To summarize the report, I need you to provide the text of the report first. Please paste the content you would like me to summarize."
              />
            </div>
            <div className="bg-success/10 border border-success/30 p-4 rounded-xl">
              <h3 className="text-lg font-bold text-success flex items-center mb-3"><ThumbsUp className="mr-2"/>Specific: Summarization</h3>
              <p className="text-muted-foreground mb-4">Provides the text and specifies the desired focus of the summary.</p>
              <InlineChat 
                moduleId="lesson-1.4-good-prompt-4"
                readOnly={true}
                systemPrompt="You are an expert business analyst."
                initialMessages={[{ role: 'user', content: 'Summarize this sales report, focusing on key growth areas and potential risks: [Paste report text here]' }]}
                simulatedResponse="**Summary of Sales Report**\n\nBased on the provided text, here are the key takeaways:\n\n**Key Growth Areas:**\n*   **Enterprise SaaS Subscriptions:** Revenue from this segment is up 45% year-over-year, driven by the new flagship product, 'ConnectSphere.'\n*   **APAC Market:** The Asia-Pacific region has shown a 60% increase in new customer acquisition, significantly outperforming other territories.\n\n**Potential Risks:**\n*   **High Customer Churn:** The SMB (Small and Medium-sized Business) segment has a churn rate of 18%, which is higher than the industry average of 10%.\n*   **Dependency on 'ConnectSphere':** Over 70% of new revenue is tied to a single product, creating a potential vulnerability if market needs shift."
              />
            </div>

          </div>
        </div>

       

        <KeyTakeaways
            points={[
              "A prompt is the instruction, question, or input you give to an AI.",
              "Clear and specific prompts lead to better quality responses.",
              "Providing a persona helps shape the AI's tone, style, and expertise.",
              "Prompt design is crucial for getting the AI to perform tasks effectively.",
          ]}
        />

        
      </div>
    </LessonTemplate>
  );
};

export default Lesson1_4;
