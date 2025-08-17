import React, { useState, useEffect } from 'react';
import { addAnimationStyles } from './utils/addAnimationStyles';
import { Beaker, BookOpen, FileText, Sparkles, Target } from 'lucide-react';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import AdvancedTools from '../../../components/AdvancedTools';
import Deconstruction from '../../../components/Deconstruction';
import PatternRecognition from '../../../components/PatternRecognition';
import IterativeRefinement from '../../../components/IterativeRefinement';
import KeyTakeaways from '../../../components/KeyTakeaways';
import TabButton from './components/TabButton';
import CheckpointQuiz from '@/pages/instructions/components/CheckpointQuiz';

// Tab component moved to './components/TabButton'

const Lesson1_7: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What is the primary benefit of iteratively refining a prompt?',
      options: [
        'It makes the prompt longer, which is always better.',
        'It allows you to make small, controlled changes to systematically improve the AI\'s output.',
        'It guarantees the AI will respond faster.',
        'It helps you find more spelling errors in your prompt.',
      ],
      correctAnswer: 'It allows you to make small, controlled changes to systematically improve the AI\'s output.',
      explanation: 'Iterative refinement is the process of making small, deliberate adjustments to a prompt and observing the effect, which is key to achieving a precise and high-quality result.',
    },
    {
      questionText: 'In advanced prompting, what is the main advantage of using a \'pattern\' (e.g., the Persona Pattern)?',
      options: [
        'It provides a single, perfect prompt that works for every situation.',
        'It offers a proven, reusable structure for solving a common type of problem reliably.',
        'It forces the AI to use a specific vocabulary.',
        'It is the only way to get the AI to generate creative content.',
      ],
      correctAnswer: 'It offers a proven, reusable structure for solving a common type of problem reliably.',
      explanation: 'Prompt patterns are like strategic blueprints. They provide a reliable framework that can be adapted to many different tasks to produce consistent, high-quality outcomes.',
    },
    {
      questionText: 'When using an AI as a collaborative partner (e.g., for pair programming), what is a crucial skill humans require?',
      options: [
        'Accepting the AI\'s first answer without question.',
        'Using very short, one-word commands.',
        'Clearly articulating your goal and providing specific feedback to guide the AI.',
        'Letting the AI do all the work independently.',
      ],
      correctAnswer: 'Clearly articulating your goal and providing specific feedback to guide the AI.',
      explanation: 'Effective collaboration with an AI requires clear communication. You must define the goal and then guide the AI with feedback, just as you would with a human partner.',
    },
    {
      questionText: 'Why is it helpful to deconstruct a complex prompt into its core components (e.g., role, task, context)?',
      options: [
        'It makes the prompt harder for the AI to understand.',
        'It is a required step by all AI models.',
        'It helps you identify which part of the prompt needs adjustment to improve the output.',
        'Deconstruction is only useful for simple prompts.',
      ],
      correctAnswer: 'It helps you identify which part of the prompt needs adjustment to improve the output.',
      explanation: 'Deconstructing a prompt helps you isolate variables. By breaking it down, you can see how each component (like the task, context, or persona) influences the result and refine them individually.',
    },
    {
      questionText: 'What is a core principle of moving from basic to advanced prompt engineering?',
      options: [
        'Using more complex and obscure words.',
        'Writing the longest prompt possible.',
        'Applying structured techniques and iterative testing to gain more precise control over the AI.',
        'Memorizing a list of magic keywords.',
      ],
      correctAnswer: 'Applying structured techniques and iterative testing to gain more precise control over the AI.',
      explanation: 'Advanced prompting is about being deliberate and systematic. It involves using proven structures (patterns) and continuously refining your instructions to achieve a specific goal.',
    },
  ];

  const [activeTab, setActiveTab] = useState('intro');

  useEffect(() => {
    addAnimationStyles();
  }, []);

  const renderContent = () => {
    const contentKey = activeTab;
    switch (activeTab) {
      case 'intro':
        return (
          <div key={contentKey} className="animate-fade-in">
            <section>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">1. Deconstruction: The Art of Taking Prompts Apart</h3>
              <p className="text-muted-foreground mb-4">
                Complex tasks require complex prompts. But a monolithic prompt is hard to debug. Deconstruction is the technique of breaking a large prompt into its fundamental building blocks, such as:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4 pl-4">
                <li><strong>Role & Goal:</strong> Who the AI should be and what it should achieve.</li>
                <li><strong>Context & Constraints:</strong> The background information and rules the AI must follow.</li>
                <li><strong>Task & Steps:</strong> The specific action items and the sequence to perform them.</li>
                <li><strong>Output Format:</strong> The desired structure of the response (e.g., JSON, Markdown table).</li>
              </ul>
            </section>
            <section className="mt-8">
              <h3 className="text-2xl font-bold text-card-foreground mb-4">2. Pattern Recognition: Using Blueprints for Success</h3>
              <p className="text-muted-foreground mb-4">
                Many prompting challenges are variations of common problems. Prompt patterns are reusable, strategic templates for solving these problems.
              </p>
            </section>
          </div>
        );
      case 'deconstruction':
        return <div key={contentKey} className="animate-fade-in"><Deconstruction /></div>;
      case 'pattern-recognition':
        return <div key={contentKey} className="animate-fade-in"><PatternRecognition /></div>;
      case 'iterative-refinement':
        return <div key={contentKey} className="animate-fade-in"><IterativeRefinement /></div>;
      case 'priming':
        return (
          <div key={contentKey} className="animate-fade-in">
            <section>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">Instructional Priming: Setting the Stage</h3>
              <p className="text-muted-foreground mb-4">
                Instructional priming involves giving the AI context or examples *before* you give it the main task. This 'warms up' the model and guides it toward the desired style, format, or domain of knowledge.
              </p>
              <p className="text-muted-foreground mb-4">
                This is one of the most powerful techniques for achieving high-quality results, especially for complex tasks. It's the core idea behind "few-shot" prompting.
              </p>
              <div className="bg-muted p-4 rounded-lg border border-border my-6">
                <p className="text-muted-foreground font-mono text-sm">// Example of priming for a code generation task</p>
                <p className="text-foreground font-mono text-sm mt-4">
                  <span className="text-purple-400">// Here is a high-quality, well-documented Python function:</span><br/>
                  <span className="text-cyan-400">def calculate_average(numbers):</span><br/>
                  <span className="text-muted-foreground">    """Calculates the mean of a list of numbers."""</span><br/>
                  <span className="text-cyan-400">    return sum(numbers) / len(numbers) if numbers else 0</span>
                </p>
                <p className="text-foreground font-mono text-sm mt-6">
                  <span className="text-purple-400">// Now, using the same style, write a function that finds the median...</span>
                </p>
              </div>
              <p className="text-muted-foreground mt-4">
                By providing a high-quality example first, you're not just telling the AI what to do—you're *showing* it. The model will infer the rules of the pattern (e.g., type hinting, docstrings, clean code) and apply them to the new task.
              </p>
            </section>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <LessonTemplate
      moduleNumber={1}
      lessonNumber={7}
      title="Advanced Prompting Techniques"
      subtitle="Unlock the full potential of AI with sophisticated strategies."
      quizQuestions={quizQuestions}
    >
      <section className="mb-6 bg-muted/30 border border-muted rounded-xl p-4">
        <p className="text-xs text-muted-foreground mb-2">Estimated time: 12–16 minutes</p>
        <h4 className="text-sm font-semibold mb-2 text-foreground">What you'll learn</h4>
        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
          <li>Deconstruction and pattern-based prompting</li>
          <li>Iterative refinement with targeted feedback</li>
          <li>Instructional priming and using examples to guide outputs</li>
          <li>When and how to apply advanced tools/patterns</li>
        </ul>
      </section>
      <div className="max-w-7xl mx-auto px-4">
        {/* Intro Section */}
        <section className="text-center my-8 md:my-12">
          <h2 className="text-3xl md:text-4xl font-bold text-card-foreground">Beyond the Basics</h2>
          <p className="text-lg text-muted-foreground mt-3 max-w-3xl mx-auto">
            You've mastered the I.N.S.Y.N.C. framework. Now, let's explore techniques that separate casual users from professional prompt engineers.
          </p>
        </section>

        {/* Myth vs Reality */}
        <section className="bg-muted/30 border border-border rounded-xl p-4 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-2">Myth vs. Reality</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-background border border-border rounded-lg p-3">
              <h4 className="font-semibold text-destructive mb-1">Myth</h4>
              <p className="text-sm text-muted-foreground">“Advanced prompting means just adding more words and jargon.”</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-3">
              <h4 className="font-semibold text-success mb-1">Reality</h4>
              <p className="text-sm text-muted-foreground">Advanced prompting is structured thinking: decompose, apply patterns, and iterate with targeted feedback.</p>
            </div>
          </div>
        </section>

        {/* Interactive Tabs for Core Concepts */}
        <div className="bg-card rounded-xl border border-border shadow-sm mb-12">
          <div className="flex flex-wrap border-b border-border">
            <TabButton active={activeTab === 'intro'} onClick={() => setActiveTab('intro')} icon={<BookOpen size={18} />} label="Introduction" />
            <TabButton active={activeTab === 'deconstruction'} onClick={() => setActiveTab('deconstruction')} icon={<FileText size={18} />} label="Deconstruction" />
            <TabButton active={activeTab === 'pattern-recognition'} onClick={() => setActiveTab('pattern-recognition')} icon={<Sparkles size={18} />} label="Pattern Recognition" />
            <TabButton active={activeTab === 'iterative-refinement'} onClick={() => setActiveTab('iterative-refinement')} icon={<Beaker size={18} />} label="Iterative Refinement" />
            <TabButton active={activeTab === 'priming'} onClick={() => setActiveTab('priming')} icon={<Target size={18} />} label="Instructional Priming" />
          </div>
          <div className="p-6 md:p-8 min-h-[300px]">
            {renderContent()}
          </div>
        </div>

        {/* Standalone Advanced Tools Section */}
        <section className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-card-foreground">Advanced Tools Practice</h2>
            <p className="text-lg text-muted-foreground mt-3 max-w-3xl mx-auto">
              Apply your knowledge with interactive exercises.
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border shadow-sm">
            <div className="p-6 md:p-8">
              <AdvancedTools />
            </div>
          </div>
        </section>
        
        {/* Mini‑Glossary */}
        <section className="mt-8 bg-muted/30 border border-border rounded-xl p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">Mini‑Glossary</h3>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li><strong>Deconstruction:</strong> Breaking a complex prompt into role, task, context, steps, and format.</li>
            <li><strong>Pattern:</strong> A reusable blueprint (e.g., Persona, Critique‑Revise) for reliable outcomes.</li>
            <li><strong>Iterative Refinement:</strong> Small, focused edits with evaluation between iterations.</li>
            <li><strong>Priming:</strong> Supplying examples or instructions before the task to shape behavior.</li>
          </ul>
        </section>
        
        <section className="mt-6 bg-muted/30 border border-muted rounded-xl p-4">
          <h4 className="text-sm font-semibold mb-2 text-foreground">You can now…</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Apply deconstruction, pattern recognition, and priming</li>
            <li>Iteratively refine prompts to reach target quality</li>
            <li>Select the right advanced technique for the task</li>
          </ul>
        </section>
        
        {/* Quick Check */}
        <section className="bg-card p-4 rounded-xl border border-border">
          <h3 className="font-semibold text-card-foreground mb-3">Quick Check</h3>
          <CheckpointQuiz
            question={quizQuestions[0].questionText}
            options={quizQuestions[0].options}
            correctAnswerIndex={quizQuestions[0].options.indexOf(quizQuestions[0].correctAnswer)}
            explanation={quizQuestions[0].explanation}
          />
        </section>
        
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

export default Lesson1_7;
