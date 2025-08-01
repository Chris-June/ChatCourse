import React, { useEffect } from 'react';
import LessonHeader from '../../../../../components/layouts/LessonHeader';
import LessonFooter from '../../../../../components/layouts/LessonFooter';
import { useProgressStore } from '../../../../../store/progressStore';
import ModuleQuizzes from '../../../../../components/ModuleQuizzes/ModuleQuizzes';
import Accordion from '../../../components/Accordion';
import InteractiveInsync from '../../../components/InteractiveInsync';

const Lesson1_2: React.FC = () => {
  const { completeLesson } = useProgressStore();

  useEffect(() => {
    completeLesson(1, 2);
  }, [completeLesson]);

  const quizQuestions = [
    {
      questionText: 'What does \'Intent\' in the I.N.S.Y.N.C. framework refer to?',
      options: [
        'The AI\'s hidden agenda',
        'The core goal or task you want the AI to accomplish',
        'The emotional tone of the prompt',
        'The background information for the prompt'
      ],
      correctAnswer: 'The core goal or task you want the AI to accomplish',
      explanation: 'Correct! Intent is the primary verb—the action you want the AI to take.'
    },
    {
      questionText: 'Which part of I.N.S.Y.N.C. would you use to tell the AI to act as a specific character?',
      options: ['Style', 'Nuance', 'You-as-Narrative', 'Context'],
      correctAnswer: 'You-as-Narrative',
      explanation: 'Exactly! You-as-Narrative sets the persona for the AI, like \'You are a helpful assistant\' or \'You are a skeptical pirate.\''
    }
  ];

  return (
    <div className="space-y-8 p-6 bg-gray-900 text-white">
      <LessonHeader 
        title="1.2 The I.N.S.Y.N.C. Framework"
        subtitle="A structured approach to predictable results."
      />

      <section>
        <p className="text-gray-300 mb-4">
          Vague prompts lead to vague answers. To get high-quality, predictable results from an AI, you need to provide high-quality, structured input. The I.N.S.Y.N.C. framework is a mental model for building better prompts.
        </p>
        <div className="space-y-2">
          <Accordion title="I - Intent">The core goal or task. What, specifically, do you want the AI to do? (e.g., 'Write', 'Summarize', 'Translate', 'Generate code').</Accordion>
          <Accordion title="N - Nuance">The specific constraints, details, or rules. This is where you add negative constraints ('do not mention X') or specific details ('the deadline is Friday at 5 PM').</Accordion>
          <Accordion title="S - Style">The tone, format, or voice of the output. (e.g., 'Use a formal and encouraging tone', 'Format the output as a JSON object', 'Write in the style of a pirate').</Accordion>
          <Accordion title="Y - You-as-Narrative (Persona)">Define the AI's role or character. This is one of the most powerful ways to shape the output. (e.g., 'You are a senior software engineer', 'You are a helpful tutor').</Accordion>
          <Accordion title="C - Context">Provide relevant background information, examples, or data that the AI needs to complete the task successfully. (e.g., 'Here is the article to summarize: ...', 'My company's brand guidelines are...').</Accordion>
        </div>
      </section>

      <InteractiveInsync />

      <section>
        <ModuleQuizzes questions={quizQuestions} />
      </section>

      <LessonFooter 
        prevLessonPath="/instructions/module-1/1.1"
        prevLessonTitle="1.1: What is an AI, Really?"
        nextLessonPath="/instructions/module-1/1.3"
        nextLessonTitle="1.3: When AI Gets It Wrong (Hallucinations)"
        onNextClick={() => completeLesson(1, 2)}
      />
    </div>
  );
};

export default Lesson1_2;
