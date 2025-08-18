import React from 'react';
import { Wrench, Lightbulb } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';
import Accordion from '../../../components/Accordion';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import KeyTakeaways from '../../../components/KeyTakeaways';
import BestPractices from '../../../components/BestPractices';
import { weatherAssistantPrompt, weatherChecklist } from '@/prompts';
import PortfolioPanel from '@/components/portfolio/PortfolioPanel';
import ArtifactViewer from '@/components/portfolio/ArtifactViewer';

// checklist centralized in prompts

const Lesson4_3: React.FC = () => {
  const quizQuestions = [
    {
      questionText: "In the lesson's analogy, what does the 'recipe card' represent when building an AI tool?",
      options: [
        "The tool's schema (its name, description, and parameters).",
        'The AI model itself.',
        'The final output of the tool.',
        'The server where the tool is hosted.'
      ],
      correctAnswer: "The tool's schema (its name, description, and parameters).",
      explanation: "The schema is the detailed instruction set, or 'recipe', that tells the AI exactly what the tool does, what it needs, and when to use it. Think of it as the detailed recipe card for your AI chef."
    },
    {
      questionText: 'What is the most important reason to write very clear and detailed descriptions in your tool schema?',
      options: [
        'To make the code run faster.',
        'The AI relies entirely on these descriptions to understand the tool\'s purpose and how to use it correctly.',
        'To make the schema file larger.',
        'To hide the tool from other users.'
      ],
      correctAnswer: 'The AI relies entirely on these descriptions to understand the tool\'s purpose and how to use it correctly.',
      explanation: "The AI doesn't understand code; it understands language. Your descriptions are the only guide it has to make smart decisions about your tool."
    },
    {
      questionText: 'What is a key principle of good tool design?',
      options: [
        'The tool should perform as many different tasks as possible.',
        'The tool should have a very short name.',
        'The tool should do one thing well (be specific and atomic).',
        'The tool should not have any parameters.'
      ],
      correctAnswer: 'The tool should do one thing well (be specific and atomic).',
      explanation: 'Single-purpose tools are less ambiguous and more reliable, making it easier for the AI to choose the right tool for the job.'
    },
    {
      questionText: "In the `order_pizza` tool example, what are the 'ingredients' (inputs) the AI needs?",
      options: [
        'The oven temperature.',
        'A `confirmation_number`.',
        'The `size` and a list of `toppings`.',
        'The delivery driver\'s name.'
      ],
      correctAnswer: 'The `size` and a list of `toppings`.',
      explanation: 'These are the parameters defined in the schema that the AI must gather to successfully call the tool, just like a chef needs ingredients for a recipe.'
    },
    {
      questionText: "Why don't you need to provide the actual code for your function in the schema?",
      options: [
        'The AI will write the code for you.',
        'The AI only needs to know *what* the tool does and *what arguments* to provide, not *how* it works.',
        'The code is sent in a separate file.',
        'You do need to provide the code.'
      ],
      correctAnswer: 'The AI only needs to know *what* the tool does and *what arguments* to provide, not *how* it works.',
      explanation: 'The AI is the decision-making brain; your application is the hands that perform the actions. The schema is the contract between them, not the implementation itself.'
    }
  ];

  return (
    <LessonTemplate
      moduleNumber={4}
      lessonNumber={3}
      title="Designing Good Tools"
      subtitle="Learn the art of crafting effective, reliable tools that AI models can easily understand and use."
      quizQuestions={quizQuestions}
    >
      <div className="space-y-6 p-4 md:p-6">
        <div className="bg-muted/30 border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-2">Estimated time: 10–14 minutes</p>
          <h3 className="font-semibold text-foreground mb-2">What you'll learn</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>How to write clear, detailed tool descriptions (the “recipe card”)</li>
            <li>Why atomic, single‑purpose tools work best</li>
            <li>How to define parameters and expected outputs</li>
          </ul>
        </div>
        {/* Myth vs Reality */}
        <section className="bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">Myth vs. Reality</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-background border border-border rounded-lg p-3">
              <h4 className="font-semibold text-destructive mb-1">Myth</h4>
              <p className="text-sm text-muted-foreground">“If I name a tool well, the AI will figure out the rest.”</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-3">
              <h4 className="font-semibold text-success mb-1">Reality</h4>
              <p className="text-sm text-muted-foreground">The model relies on rich descriptions and clear parameters. Ambiguity leads to misuse or no use at all.</p>
            </div>
          </div>
        </section>
        <Accordion title="The Anatomy of a Tool: The Recipe Card" icon={<Wrench />} isInitiallyOpen>
          <p className="text-muted-foreground mb-4">
            Think of an AI tool not as a pre-built appliance, but as a recipe you give to a master chef (the AI). The AI is brilliant, but it can only cook what's on the recipe card. Your job is to write a perfect recipe card—this is your tool's <strong>schema</strong>.
          </p>
          <p className="text-muted-foreground mb-4">
            The schema defines the tool's name, its purpose, the 'ingredients' (parameters) it needs, and what kind of 'dish' (output) it produces. The AI reads this schema to understand when and how to use your tool.
          </p>

          <h4 className="font-semibold text-lg mt-6 mb-2 text-foreground">Example Schema: `order_pizza`</h4>
          <p className="text-muted-foreground mb-4">
            Here’s a simple schema for a pizza ordering tool. Notice how the descriptions clearly explain the purpose of the tool and its parameters.
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <code className="block whitespace-pre-wrap break-words font-mono text-sm text-foreground">
{`{
  "name": "order_pizza",
  "description": "Orders a pizza for delivery.",
  "parameters": {
    "size": {
      "type": "string",
      "description": "The size of the pizza, e.g., 'small', 'medium', or 'large'."
    },
    "toppings": {
      "type": "array",
      "description": "A list of toppings for the pizza."
    }
  }
}`}
            </code>
          </div>
        </Accordion>

        <Accordion title="Your Turn: Use a Custom Weather Tool" icon={<Lightbulb className="text-amber-400" />}>
          <p className="text-muted-foreground mb-4">
            Let's test your new tool-building skills. Imagine you've created a weather-checking robot that needs one piece of information: which city to investigate. This robot (our `get_weather` tool) has been trained to understand your exact instructions and deliver precise weather reports.
          </p>
          <p className="text-muted-foreground mb-4">
            Use the chat window below to ask for the weather in any city. Watch how the AI uses the tool you designed. Follow the checklist to track the AI's reasoning.
          </p>
          <InlineChat 
            moduleId="module-4.3-get-weather"
            placeholder='Try: "What is the weather like in London?"'
            systemPrompt={weatherAssistantPrompt}
            initialMessages={[
              {
                role: 'assistant',
                content: 'I can help you check the weather in any city. Try asking me something like: "What\'s the weather like in New York?" or "Is it going to rain in Tokyo tomorrow?"'
              }
            ]}
            simulatedResponse={`Okay, you want the weather. I will use the 'get_weather' tool.\n\n<tool_code>\n{\n  "name": "get_weather",\n  "arguments": {\n    "city": "the city you asked for"\n  }\n}\n</tool_code>\n\nIt is 75°F and sunny.`}
            challengeChecklist={weatherChecklist.map(item => ({ ...item }))}
            maxAttempts={3}
            maxFollowUps={2}
          />
        </Accordion>
        
        <div className="bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-2">You can now…</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Draft a high‑quality tool schema (name, description, parameters)</li>
            <li>Keep tools narrowly scoped and unambiguous</li>
            <li>Guide the model toward the right tool with descriptive text</li>
          </ul>
        </div>

        {/* Mini‑Glossary */}
        <section className="bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">Mini‑Glossary</h3>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li><strong>Schema:</strong> The recipe card describing a tool’s purpose and parameters.</li>
            <li><strong>Atomic Tool:</strong> A single‑purpose tool that does one task well.</li>
            <li><strong>Parameters:</strong> Inputs the model must provide for the tool to run.</li>
          </ul>
        </section>

        <KeyTakeaways
          points={[
            'Your AI tool should excel at one specific task (be atomic), like a specialized kitchen utensil.',
            'The schema descriptions are the AI\'s only instruction manual—make them exceptionally clear and detailed.',
            'Clearly define your tool\'s required inputs (parameters) and expected outputs.',
            'The AI relies entirely on your descriptions to make smart decisions, so invest time in writing them well.',
          ]}
        />

        <BestPractices
          dos={[
            'Use clear, descriptive names for functions and arguments.',
            'Write rich descriptions for what the function does, when to use it, and what it returns.',
            'Handle potential errors within your function code gracefully.',
            'Keep the data structure for your parameters as simple as possible.',
          ]}
          donts={[
            'Don\'t create ambiguous tools that perform multiple, unrelated tasks.',
            'Never assume the model knows context not explicitly provided in the schema.',
            'Avoid exposing sensitive information or destructive operations without proper safeguards.',
            'Don\'t use overly complex parameter structures that might confuse the model.',
          ]}
        />

        {/* Portfolio: export artifacts and see saved items for this lesson */}
        <PortfolioPanel
          title="Portfolio"
          description="Export your collected artifacts anytime. Some lessons also provide a Save action."
          className="mt-4"
        />
        <ArtifactViewer module={4} lesson={3} className="mb-6" />
      </div>
    </LessonTemplate>
  );
};

export default Lesson4_3;