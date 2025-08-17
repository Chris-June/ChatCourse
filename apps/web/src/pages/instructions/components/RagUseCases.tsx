import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Building, User, Bot, Briefcase, GraduationCap, HeartPulse, BookOpen } from 'lucide-react';
import InteractiveHeader from '@/components/InteractiveHeader';

const businessUseCases = [
  {
    icon: Bot,
    title: 'Customer Support Automation',
    description: 'A chatbot answers customer questions by searching a knowledge base of product manuals, FAQs, and policies. This provides instant, accurate support and reduces human agent workload.',
    example: 'Query: "How do I reset my password?" -> RAG finds the `password_reset.md` doc and provides step-by-step instructions.',
  },
  {
    icon: Briefcase,
    title: 'Internal Knowledge Management',
    description: 'An internal search engine for employees to find information within company documents, reports, and HR policies. This streamlines onboarding and day-to-day operations.',
    example: 'Query: "What is the Q3 sales target?" -> RAG retrieves the latest sales report and extracts the relevant figure.',
  },
  {
    icon: GraduationCap,
    title: 'Educational Tutors',
    description: 'An AI tutor that helps students by drawing from a specific set of textbooks, lecture notes, and academic papers, ensuring the information is curriculum-aligned.',
    example: 'Query: "Explain photosynthesis." -> RAG uses the approved biology textbook to generate a detailed explanation.',
  },
];

const personalUseCases = [
  {
    icon: HeartPulse,
    title: 'Personal Health Assistant',
    description: 'An app that answers questions about your health by querying your own fitness tracker data, medical records, and health journals.',
    example: 'Query: "How did my sleep last Tuesday compare to this week?" -> RAG analyzes your health data and provides a summary.',
  },
  {
    icon: User,
    title: 'Personal Memory Assistant',
    description: 'A "second brain" that allows you to ask questions about your own notes, emails, and documents. Helps you recall information you\'ve previously recorded.',
    example: 'Query: "What were the key takeaways from my meeting with Alex?" -> RAG searches your meeting notes and summarizes the main points.',
  },
];

const RagUseCases: React.FC = () => {
  return (
    <div className="space-y-6">
      <InteractiveHeader title="RAG Use Cases" icon={BookOpen} />
      <div className="flex items-center gap-3">
        <Building className="w-8 h-8 text-blue-400" aria-hidden="true" />
        <h3 className="text-2xl font-bold text-foreground">Business Use Cases</h3>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {businessUseCases.map((item, index) => (
          <AccordionItem value={`business-${index}`} key={index} className="bg-card border rounded-lg mb-2 px-4">
            <AccordionTrigger className="text-lg font-semibold text-blue-300 hover:no-underline">
              <div className="flex items-center gap-3">
                <item.icon className="w-6 h-6" aria-hidden="true" />
                {item.title}
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-foreground/90 space-y-2">
              <p>{item.description}</p>
              <p className="text-xs text-muted-foreground font-mono bg-muted p-2 rounded-md">{item.example}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex items-center gap-3 pt-6">
        <User className="w-8 h-8 text-green-400" aria-hidden="true" />
        <h3 className="text-2xl font-bold text-foreground">Personal Use Cases</h3>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {personalUseCases.map((item, index) => (
          <AccordionItem value={`personal-${index}`} key={index} className="bg-card border rounded-lg mb-2 px-4">
            <AccordionTrigger className="text-lg font-semibold text-green-300 hover:no-underline">
              <div className="flex items-center gap-3">
                <item.icon className="w-6 h-6" aria-hidden="true" />
                {item.title}
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-foreground/90 space-y-2">
              <p>{item.description}</p>
              <p className="text-xs text-muted-foreground font-mono bg-muted p-2 rounded-md">{item.example}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default RagUseCases;
