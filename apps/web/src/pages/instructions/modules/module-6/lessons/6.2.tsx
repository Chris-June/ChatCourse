import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Users, TestTube2, ShieldCheck, Percent, Scale } from 'lucide-react';
import InlineChat from '../../../../../components/InlineChat';
import { useProgressStore } from '../../../../../store/progressStore';
import Accordion from '../../../components/Accordion';
import AiTrustMeter from '../../../components/AiTrustMeter';
import UncertaintyVisualizer from '../../../components/UncertaintyVisualizer';
import BiasExplorer from '../../../components/BiasExplorer';

const Lesson6_2: React.FC = () => {
  const { completeLesson } = useProgressStore();
  const designCritiquePrompt = `
    You are an expert AI UX Design Critic. I am going to propose a design for an AI feature. Your goal is to help me improve it by asking critical questions based on the design principles from this lesson.

    When I describe my design, critique it by asking questions related to:

    1.  **Human-AI Collaboration:** How does the design set clear expectations? Does it feel like a partnership?
    2.  **Feedback & Correction:** How can the user correct the AI if it's wrong? How does the AI learn from those corrections?
    3.  **Explainability & Trust:** Does the design explain *why* the AI did something? What could build more trust?
    4.  **Uncertainty:** How does the UI communicate when the AI is not confident in its response?
    5.  **Fairness & Bias:** How might this feature be affected by biases in the data? What steps does the design take to mitigate potential harm or unfairness?

    Keep your tone constructive and inquisitive. Your goal is to make me think more deeply about the user experience, not to give me the answers directly.
  `;

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-400">6.2 Designing for People</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/instructions/module-6/6.1" 
            className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> From Idea to Impact
          </Link>
          <Link 
            to="/instructions/module-6/6.3" 
            onClick={() => completeLesson(6, 2)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            Next: Iterative Development <ChevronRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>

      <p className="text-lg text-gray-300">
        Great AI products aren't just technologically powerful—they're intuitive, trustworthy, and genuinely helpful. This requires a human-centered approach to design, where we focus on the interaction between the user and the AI.
      </p>

      <Accordion title="Principle 1: Design for Collaboration, Not Command" icon={<Users className="w-6 h-6 mr-2 text-green-400" />} isInitiallyOpen>
        <div className="space-y-4 text-gray-300">
          <p>Shift the mental model from a user commanding a tool to a user collaborating with a partner. This means setting clear expectations about the AI's capabilities and limitations right from the start. The user should always feel in control.</p>
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
            <h4 className="font-semibold text-white mb-2">Example</h4>
            <p className="text-sm text-gray-400">An AI writing assistant shouldn't just silently rewrite a sentence. It could offer suggestions with brief explanations, like: <span className='italic'>"Consider this alternative for a more concise tone."</span> This invites the user to make the final call.</p>
          </div>
        </div>
      </Accordion>

      <Accordion title="Principle 2: Build Trust Through Transparency & Control" icon={<ShieldCheck className="w-6 h-6 mr-2 text-blue-400" />} isInitiallyOpen>
        <div className="space-y-4 text-gray-300">
          <p>Trust is the foundation of any good human-AI relationship. Users are more likely to trust a system they understand and can influence. This involves providing transparency into the AI's reasoning and giving users control to correct its mistakes.</p>
          <AiTrustMeter />
        </div>
      </Accordion>

      <Accordion title="Principle 3: Design for Uncertainty" icon={<Percent className="w-6 h-6 mr-2 text-purple-400" />} isInitiallyOpen>
        <div className="space-y-4 text-gray-300">
          <p>AI is probabilistic, not deterministic. It's crucial to communicate the AI's level of confidence in its outputs. A good UI makes it clear when the AI is making a high-confidence suggestion versus a low-confidence guess. This helps users decide how much to rely on the information.</p>
          <UncertaintyVisualizer />
        </div>
      </Accordion>

      <Accordion title="Principle 4: Design for Fairness & Mitigating Bias" icon={<Scale className="w-6 h-6 mr-2 text-yellow-400" />} isInitiallyOpen>
        <div className="space-y-4 text-gray-300">
          <p>AI systems learn from data, and if that data reflects existing societal biases, the AI can perpetuate or even amplify them. Designing for fairness means actively identifying, measuring, and mitigating these biases to ensure your AI treats all users equitably.</p>
          <BiasExplorer />
        </div>
      </Accordion>

      <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-blue-300 flex items-center">
          <TestTube2 className="w-7 h-7 mr-3 text-yellow-400" />
          Your Turn: Get a Design Critique
        </h2>
        <p className="text-gray-300 mb-4">
          Now it's your turn to be the designer. Think of an AI feature (e.g., an AI that suggests vacation spots). Describe how the user would interact with it in the chat below. Your AI Design Critic will ask you questions to help you improve your design based on the principles we've just covered.
        </p>
        <InlineChat 
          moduleId="module-6.2-design-critique"
          maxAttempts={10}
          placeholder='Start by describing your AI feature, for example: "I’m designing an AI that helps you pick a movie to watch..."' 
          systemPrompt={designCritiquePrompt}
        />
      </section>

      <div className="flex justify-between pt-4">
        <Link 
          to="/instructions/module-6/6.1" 
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" /> Previous: From Idea to Impact
        </Link>
        <Link 
          to="/instructions/module-6/6.3" 
          onClick={() => completeLesson(6, 2)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors"
        >
          Next: Iterative Development <ChevronRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Lesson6_2;
