import React from 'react';
import { Wrench } from 'lucide-react';
import LessonTemplate from '../../../../../components/layouts/LessonTemplate';
import InlineChat from '../../../../../components/InlineChat';

const Lesson1_6: React.FC = () => {
  const quizQuestions = [
    {
      questionText: 'What is the main purpose of the I.N.S.Y.N.C. workshop?',
      options: [
        'To memorize the acronym.',
        'To passively read about advanced theories.',
        'To actively practice building a detailed prompt using the framework.',
        'To get a perfect score on the first try.'
      ],
      correctAnswer: 'To actively practice building a detailed prompt using the framework.',
      explanation: 'Workshops are for hands-on practice. The goal is to apply the I.N.S.Y.N.C. framework to a real-world scenario to build practical skills.'
    },
    {
      questionText: 'If your AI-generated text sounds too generic, which I.N.S.Y.N.C. element should you probably improve?',
      options: [
        'Intent',
        'Nuance and Style',
        'Narrative Format',
        'Context'
      ],
      correctAnswer: 'Nuance and Style',
      explanation: 'Nuance adds the specific details that prevent generic responses, while Style defines the tone and personality. Both are key to getting unique, high-quality output.'
    },
    {
        questionText: 'When you define the AI\'s persona using "You as...", what are you influencing?',
        options: [
          'Only the first sentence of the response.',
          'The AI\'s knowledge base, tone, and how it frames the information.',
          'The length of the response.',
          'Whether the AI uses bullet points or paragraphs.'
        ],
        correctAnswer: 'The AI\'s knowledge base, tone, and how it frames the information.',
        explanation: 'Assigning a role is a powerful technique that primes the AI to adopt a specific viewpoint and communication style, making the response more consistent and appropriate for your needs.'
      },
      {
        questionText: 'When brainstorming a creative social media campaign, which combination of I.N.S.Y.N.C. elements is most likely to produce unique and viral ideas?',
        options: ['Intent and Context', 'Style and You as...', 'Nuance and Narrative Format', 'Intent and Nuance'],
        correctAnswer: 'Style and You as...',
        explanation: 'Assigning a creative persona (You as...) like \'a viral marketing genius\' and a specific Style (\'witty and bold\') pushes the AI beyond generic suggestions into more innovative territory.'
      },
      {
        questionText: 'In the cover letter example, why is it crucial to provide the `Context` that \'the job description emphasizes data-driven decisions\'?',
        options: [
          'It makes the letter longer.',
          'It tells the AI to use a formal tone.',
          'It allows the AI to tailor the letter to the employer’s specific priorities, making the applicant seem like a better fit.',
          'It is not important.'
        ],
        correctAnswer: 'It allows the AI to tailor the letter to the employer’s specific priorities, making the applicant seem like a better fit.',
        explanation: 'Context is key for relevance. By providing this detail, the AI can weave the company\'s values and needs directly into the cover letter, making it far more impactful than a generic one.'
      }
  ];

  return (
    <LessonTemplate
      moduleNumber={1}
      lessonNumber={6}
      title="1.6: Workshop: Building with I.N.S.Y.N.C."
      subtitle="Put your knowledge to the test with a hands-on challenge."
      quizQuestions={quizQuestions}
    >
      <div className="space-y-8 text-foreground">
        <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="text-2xl font-semibold mb-4 text-card-foreground flex items-center">
            <Wrench className="w-6 h-6 mr-3 text-primary" />
            Time to Get Your Hands Dirty
          </h2>
          <p className="text-muted-foreground mb-4">
            Theory is great, but practice is where skills are built. In this workshop, you'll use the I.N.S.Y.N.C. framework to tackle a practical challenge. There's no single "right" answer; the goal is to experiment and see how each element of the framework changes the AI's output.
          </p>
          <div className="bg-muted p-4 rounded-lg border border-border">
            <h3 className="text-lg font-semibold text-card-foreground">Your Challenge: The Travel Itinerary</h3>
            <p className="text-muted-foreground mt-2">
              Your task is to generate a <strong>3-day travel itinerary for a weekend trip to Tokyo</strong>. Use the chat interface below to craft a prompt. Your goal is to get a useful, creative, and personalized itinerary.
            </p>
          </div>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="text-2xl font-semibold mb-4 text-card-foreground">Applying I.N.S.Y.N.C.</h2>
          <p className="text-muted-foreground mb-4">Before you start typing, think through the framework:</p>
          <ul className="space-y-3 text-muted-foreground list-disc list-inside">
            <li><strong>Intent:</strong> What's the main goal? (e.g., "Create a 3-day itinerary for Tokyo")</li>
            <li><strong>Nuance:</strong> What are your specific interests? (e.g., "...focusing on anime, technology, and traditional temples.") What are your constraints? (e.g., "...with a budget of $150 per day.")</li>
            <li><strong>Style:</strong> What tone should the AI use? (e.g., "Write in an enthusiastic and friendly tone.")</li>
            <li><strong>You as...:</strong> What persona should the AI adopt? (e.g., "Act as an expert local guide who has lived in Tokyo for 20 years.")</li>
            <li><strong>Narrative Format:</strong> How should the output be structured? (e.g., "Format the output as a day-by-day schedule with morning, afternoon, and evening activities, including travel times.")</li>
            <li><strong>Context:</strong> Any other key info? (e.g., "I am a solo traveler in my late 20s and enjoy photography.")</li>
          </ul>
          <p className="text-muted-foreground mt-4">Combine these elements to build a powerful prompt. The more specific you are, the better the result will be.</p>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="text-2xl font-semibold mb-4 text-card-foreground">Applying I.N.S.Y.N.C. - Example 2: The Cover Letter</h2>
          <p className="text-muted-foreground mb-4">Here's how you might break down a request to write a cover letter:</p>
          <ul className="space-y-3 text-muted-foreground list-disc list-inside">
            <li><strong>Intent:</strong> "Write a cover letter for a job application."</li>
            <li><strong>Nuance:</strong> "...for the Senior Product Manager role at Acme Inc. Emphasize my 5 years of experience in B2B SaaS and my skills in roadmap planning."</li>
            <li><strong>Style:</strong> "Use a professional, confident, and slightly formal tone."</li>
            <li><strong>You as...:</strong> "Act as a professional career coach reviewing and improving my draft."</li>
            <li><strong>Narrative Format:</strong> "Structure it as a standard 3-paragraph cover letter."</li>
            <li><strong>Context:</strong> "The job description emphasizes a need for data-driven decision making. My resume highlights my work on a project that increased user retention by 15% through data analysis."</li>
          </ul>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border">
          <h2 className="text-2xl font-semibold mb-4 text-card-foreground">Applying I.N.S.Y.N.C. - Example 3: The Social Media Campaign</h2>
          <p className="text-muted-foreground mb-4">Let's try a more creative task, like brainstorming marketing ideas:</p>
          <ul className="space-y-3 text-muted-foreground list-disc list-inside">
            <li><strong>Intent:</strong> "Brainstorm ideas for a social media campaign."</li>
            <li><strong>Nuance:</strong> "...for a new brand of eco-friendly, compostable coffee pods. The campaign should run on Instagram and TikTok, targeting millennials aged 25-35."</li>
            <li><strong>Style:</strong> "The ideas should be creative, witty, and engaging."</li>
            <li><strong>You as...:</strong> "Act as a senior marketing strategist from a top advertising agency known for viral campaigns."</li>
            <li><strong>Narrative Format:</strong> "Provide 5 distinct campaign ideas. For each idea, give me a catchy headline, a brief description, and a key visual concept."</li>
            <li><strong>Context:</strong> "Our main competitors focus on price, but our key differentiator is sustainability and our 'earthy' brand aesthetic."</li>
          </ul>
        </div>

        <InlineChat 
            moduleId="module-1.6"
            maxAttempts={15}
            placeholder="Craft your prompt for the Tokyo itinerary here..."
            systemPrompt={`You are an expert prompt engineer and AI educator. Your job is to help users master the I.N.S.Y.N.C. prompt framework by evaluating their prompt for a 3-day Tokyo itinerary. Your evaluation must be constructive and educational. Return your evaluation in this exact format:\n\n**I.N.S.Y.N.C. Prompt Evaluation**\n- Intent: [Score]/5 – [Brief explanation]\n- Nuance: [Score]/5 – [Brief explanation]\n- Style: [Score]/5 – [Brief explanation]\n- You as...: [Score]/5 – [Brief explanation]\n- Narrative Format: [Score]/5 – [Brief explanation]\n- Context: [Score]/5 – [Brief explanation]\n\n**Total Score: [XX/30]**\n\n**Strengths:**\n• [List strengths]\n\n**Suggestions for Improvement:**\n• [List improvements]\n\n**Revised Prompt Example:**\n"""\n[Provide an improved version of the user’s prompt using the full I.N.S.Y.N.C. structure]\n"""\n\n**Generated Output Example:**\n[Generate a sample itinerary using the revised prompt]`}
          />
      </div>
    </LessonTemplate>
  );
};

export default Lesson1_6;
