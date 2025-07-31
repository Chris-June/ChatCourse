import { Request, Response } from 'express';

// Define types for our patterns
interface PromptPattern {
  id: string;
  name: string;
  description: string;
  category: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  example: string;
  useCase: string;
  tags: string[];
}

// Store our INSYNC patterns
const insyncPatterns: PromptPattern[] = [
  {
    id: '1',
    name: 'INSYNC Framework',
    description: 'Complete prompt structure using Intent, Nuance, Style, You as..., Narrative Format, and Context.',
    category: ['insync'],
    difficulty: 'beginner',
    example: `**Intent**: Explain machine learning concepts to beginners\n**Nuance**: Use analogies and avoid technical jargon\n**Style**: Conversational and encouraging\n**You as...**: Patient teacher with 10 years of ML experience\n**Narrative Format**: Step-by-step explanation with examples\n**Context**: For business professionals with no technical background`,
    useCase: 'Complete prompt engineering framework',
    tags: ['insync', 'framework', 'structure', 'complete']
  },
  {
    id: '2',
    name: 'INSYNC Intent Definition',
    description: 'Focus on clearly defining the specific goal and purpose of your prompt.',
    category: ['insync'],
    difficulty: 'beginner',
    example: `**Intent**: Create a compelling product description for eco-friendly water bottles\n**Nuance**: Highlight sustainability features and target environmentally conscious consumers\n**Style**: Persuasive and informative\n**You as...**: Experienced copywriter specializing in sustainable products\n**Narrative Format**: Product description with bullet points for key features\n**Context**: E-commerce product page for millennials interested in sustainability`,
    useCase: 'Product descriptions and marketing copy',
    tags: ['insync', 'intent', 'marketing', 'product']
  },
  {
    id: '3',
    name: 'INSYNC Role Specification',
    description: 'Use "You as..." to clearly define the AI\'s role, expertise, and perspective.',
    category: ['insync', 'creativity'],
    difficulty: 'intermediate',
    example: `**Intent**: Analyze market trends in renewable energy\n**Nuance**: Focus on investment opportunities and growth projections for 2024-2025\n**Style**: Analytical and data-driven\n**You as...**: Senior renewable energy analyst with 15 years of experience at top investment firms\n**Narrative Format**: Executive summary with key findings and recommendations\n**Context**: Investment committee presentation for a $500M green energy fund`,
    useCase: 'Expert analysis and professional insights',
    tags: ['insync', 'role', 'expertise', 'analysis']
  },
  {
    id: '4',
    name: 'INSYNC Context Builder',
    description: 'Provide comprehensive background information and situational context.',
    category: ['insync', 'education'],
    difficulty: 'intermediate',
    example: `**Intent**: Create onboarding documentation for new software developers\n**Nuance**: Include setup instructions, coding standards, and team collaboration guidelines\n**Style**: Clear, concise, and encouraging\n**You as...**: Senior developer and technical writer with experience in developer onboarding\n**Narrative Format**: Step-by-step guide with code examples and troubleshooting\n**Context**: Fast-growing startup with remote team, developers from diverse backgrounds, using modern JavaScript stack`,
    useCase: 'Technical documentation and onboarding',
    tags: ['insync', 'context', 'documentation', 'onboarding']
  },
  {
    id: '5',
    name: 'INSYNC Nuance Precision',
    description: 'Add specific constraints, requirements, and details to guide the output.',
    category: ['insync', 'analysis'],
    difficulty: 'advanced',
    example: `**Intent**: Generate social media content strategy for a sustainable fashion brand\n**Nuance**: Focus on Instagram and TikTok, target Gen Z, include hashtag strategy, maintain brand voice consistency, avoid greenwashing, include call-to-actions for engagement\n**Style**: Authentic, trendy, and socially conscious\n**You as...**: Social media strategist specializing in sustainable brands with proven viral content experience\n**Narrative Format**: Monthly content calendar with post examples and engagement metrics\n**Context**: Small sustainable fashion startup with limited budget, competing against fast fashion brands`,
    useCase: 'Social media strategy and content planning',
    tags: ['insync', 'nuance', 'constraints', 'social-media']
  },
  {
    id: '6',
    name: 'INSYNC Style Definition',
    description: 'Clearly define the tone, voice, and communication style for consistent output.',
    category: ['insync', 'creativity'],
    difficulty: 'intermediate',
    example: `**Intent**: Write a company blog post about implementing AI in small businesses\n**Nuance**: Address common fears, provide practical examples, include cost-benefit analysis\n**Style**: Professional yet approachable, optimistic but realistic, use storytelling with data\n**You as...**: Small business consultant who successfully implemented AI for 100+ small businesses\n**Narrative Format**: Blog post with subheadings, real case studies, and actionable takeaways\n**Context**: Blog for small business owners who are AI-curious but overwhelmed by technical complexity`,
    useCase: 'Business blogging and thought leadership',
    tags: ['insync', 'style', 'voice', 'blogging']
  },
  {
    id: '7',
    name: 'INSYNC Analogy Builder',
    description: 'Create vivid and relatable analogies to explain abstract or complex concepts.',
    category: ['insync', 'education'],
    difficulty: 'beginner',
    example: `**Intent**: Explain blockchain to someone with no tech background\n**Nuance**: Avoid technical jargon and focus on tangible metaphors\n**Style**: Friendly and engaging\n**You as...**: High school teacher introducing tech topics\n**Narrative Format**: Storytelling with real-world metaphors\n**Context**: Intro session for community tech workshop for adults`,
    useCase: 'Educational material and workshops',
    tags: ['insync', 'analogy', 'education', 'beginner']
  },
  {
    id: '8',
    name: 'INSYNC List Expansion',
    description: 'Generate comprehensive lists of ideas, steps, or components.',
    category: ['insync', 'productivity'],
    difficulty: 'beginner',
    example: `**Intent**: Brainstorm content ideas for a personal finance blog\n**Nuance**: Target young professionals, include trending topics like FIRE and crypto budgeting\n**Style**: Informative and easy-to-read\n**You as...**: Experienced financial blogger\n**Narrative Format**: Bullet list with summaries\n**Context**: Monthly blog editorial calendar planning`,
    useCase: 'Content ideation and planning',
    tags: ['insync', 'list', 'brainstorming', 'content']
  },
  {
    id: '9',
    name: 'INSYNC Summary Synthesis',
    description: 'Distill key points from a complex source into a succinct summary.',
    category: ['insync', 'summarization'],
    difficulty: 'beginner',
    example: `**Intent**: Summarize a 20-page research paper on AI ethics for a general audience\n**Nuance**: Maintain core ideas, strip away technical language\n**Style**: Neutral and informative\n**You as...**: Ethics professor writing a public newsletter\n**Narrative Format**: Executive summary with bullet highlights\n**Context**: Summary for university public ethics digest`,
    useCase: 'Research synthesis and education',
    tags: ['insync', 'summary', 'research', 'education']
  },
  {
    id: '10',
    name: 'INSYNC Tone Calibration',
    description: 'Adjust messaging for different audience types or emotional tones.',
    category: ['insync', 'communication'],
    difficulty: 'intermediate',
    example: `**Intent**: Apologize for a missed delivery to a frustrated customer\n**Nuance**: Empathetic without sounding robotic, provide compensation\n**Style**: Warm, accountable, professional\n**You as...**: Customer service rep with emotional intelligence training\n**Narrative Format**: Personalized email with clear resolution steps\n**Context**: E-commerce site with frequent order issues during peak seasons`,
    useCase: 'Customer support and communication',
    tags: ['insync', 'tone', 'empathy', 'support']
  },
  {
    id: '11',
    name: 'INSYNC Objection Handling',
    description: 'Craft persuasive responses to common objections or doubts.',
    category: ['insync', 'sales'],
    difficulty: 'intermediate',
    example: `**Intent**: Address objections about cost of switching to solar energy\n**Nuance**: Address long-term savings, available rebates, and installation concerns\n**Style**: Reassuring and informative\n**You as...**: Solar sales consultant with experience in residential projects\n**Narrative Format**: FAQ with objections and responses\n**Context**: Sales deck for homeowners considering solar upgrades`,
    useCase: 'Sales enablement and persuasion',
    tags: ['insync', 'sales', 'objections', 'persuasion']
  },
  {
    id: '12',
    name: 'INSYNC Comparative Analysis',
    description: 'Compare multiple options or strategies to inform decision-making.',
    category: ['insync', 'decision-making'],
    difficulty: 'intermediate',
    example: `**Intent**: Compare remote vs in-office vs hybrid work models for productivity\n**Nuance**: Focus on performance, engagement, and culture\n**Style**: Objective and data-informed\n**You as...**: HR strategist at a mid-size tech company\n**Narrative Format**: Comparison table with pros/cons and recommendations\n**Context**: Internal HR policy proposal presentation`,
    useCase: 'Strategic planning and internal policy',
    tags: ['insync', 'comparison', 'analysis', 'HR']
  },
  {
    id: '13',
    name: 'INSYNC Constraint Reframing',
    description: 'Guide the model to navigate complex limitations or trade-offs.',
    category: ['insync', 'creativity'],
    difficulty: 'advanced',
    example: `**Intent**: Design a product launch campaign with zero marketing budget\n**Nuance**: Must rely on organic, grassroots, and community-based growth\n**Style**: Resourceful and guerrilla-style\n**You as...**: Growth hacker for lean startups\n**Narrative Format**: Campaign blueprint with viral loops and referral strategies\n**Context**: Early-stage startup with no funding, targeting niche online community`,
    useCase: 'Lean marketing and growth strategies',
    tags: ['insync', 'advanced', 'constraints', 'marketing']
  },
  {
    id: '14',
    name: 'INSYNC Cross-Disciplinary Prompting',
    description: 'Blend knowledge and techniques from multiple domains.',
    category: ['insync', 'innovation'],
    difficulty: 'advanced',
    example: `**Intent**: Generate novel product ideas combining fitness tech and mental wellness\n**Nuance**: Prioritize practicality and emerging tech trends\n**Style**: Creative and forward-looking\n**You as...**: Product manager with dual background in psychology and wearable tech\n**Narrative Format**: Idea pitch deck outline with target audience and MVP plan\n**Context**: Innovation sprint for next-gen wellness product line`,
    useCase: 'Product ideation and innovation',
    tags: ['insync', 'cross-domain', 'advanced', 'ideation']
  },
  {
    id: '15',
    name: 'INSYNC Technical Deconstruction',
    description: 'Break down highly technical concepts into layered explanations.',
    category: ['insync', 'education'],
    difficulty: 'advanced',
    example: `**Intent**: Explain transformer architecture in AI to senior developers\n**Nuance**: Include visual metaphors, real-world use cases, and code-level examples\n**Style**: Technical yet engaging\n**You as...**: AI researcher presenting to dev team at SaaS company\n**Narrative Format**: Multi-level explanation with increasing depth per section\n**Context**: Internal tech training for developers transitioning to AI systems`,
    useCase: 'Deep technical education and knowledge transfer',
    tags: ['insync', 'advanced', 'ai', 'technical']
  },
  {
    id: '16',
    name: 'INSYNC Medical Consultation',
    description: 'Structure patient consultations with empathetic communication and clear medical guidance.',
    category: ['insync', 'healthcare'],
    difficulty: 'intermediate',
    example: `**Intent**: Explain hypertension diagnosis and treatment plan to a newly diagnosed patient
**Nuance**: Address anxiety about medication, emphasize lifestyle changes alongside treatment
**Style**: Warm, reassuring, using analogies for medical concepts
**You as...**: Experienced family physician with excellent bedside manner
**Narrative Format**: Step-by-step explanation with visual metaphors and clear action items
**Context**: Initial consultation after routine physical revealed high blood pressure`,
    useCase: 'Healthcare communication and patient education',
    tags: ['insync', 'medical', 'healthcare', 'communication']
  },
  {
    id: '17',
    name: 'INSYNC Legal Document Analysis',
    description: 'Break down complex legal documents into understandable components for clients.',
    category: ['insync', 'legal'],
    difficulty: 'advanced',
    example: `**Intent**: Explain employment contract non-compete clause to a software engineer
**Nuance**: Highlight potential career impacts, suggest negotiation points, clarify enforceability
**Style**: Professional yet accessible, avoiding legal jargon
**You as...**: Employment attorney specializing in tech industry contracts
**Narrative Format**: Section-by-section breakdown with practical implications
**Context**: Pre-signing contract review for senior developer role`,
    useCase: 'Legal consultation and document review',
    tags: ['insync', 'legal', 'contracts', 'employment']
  },
  {
    id: '18',
    name: 'INSYNC Creative World-Building',
    description: 'Develop rich fictional worlds with consistent rules and immersive details.',
    category: ['insync', 'creativity'],
    difficulty: 'advanced',
    example: `**Intent**: Create a magic system for a fantasy novel where emotions fuel spells
**Nuance**: Balance power limits with character development, ensure consistent internal logic
**Style**: Evocative and immersive, with sensory details
**You as...**: Fantasy author known for unique magic systems
**Narrative Format**: Encyclopedia-style entries with cultural context and examples
**Context**: Building foundation for epic fantasy trilogy with complex political intrigue`,
    useCase: 'Creative writing and fantasy world development',
    tags: ['insync', 'fantasy', 'world-building', 'creative-writing']
  },
  {
    id: '19',
    name: 'INSYNC Data Storytelling',
    description: 'Transform complex datasets into compelling narratives for business stakeholders.',
    category: ['insync', 'analysis'],
    difficulty: 'intermediate',
    example: `**Intent**: Present quarterly sales decline analysis to executive team
**Nuance**: Balance bad news with actionable insights, avoid blame while highlighting issues
**Style**: Data-driven yet human, using visual metaphors for trends
**You as...**: Senior data analyst presenting to C-suite executives
**Narrative Format**: Executive summary with supporting charts and recommendations
**Context**: Board meeting presentation requiring both honesty and strategic direction`,
    useCase: 'Business intelligence and executive communication',
    tags: ['insync', 'data-analysis', 'business', 'executive']
  },
  {
    id: '20',
    name: 'INSYNC Crisis Communication',
    description: 'Navigate sensitive communication during organizational crises or PR incidents.',
    category: ['insync', 'communication'],
    difficulty: 'advanced',
    example: `**Intent**: Draft public response to data breach affecting customer information
**Nuance**: Acknowledge responsibility without admitting legal liability, provide concrete next steps
**Style**: Transparent, accountable, and action-oriented
**You as...**: Crisis communications director with cybersecurity incident experience
**Narrative Format**: Multi-channel response plan with timeline and accountability measures
**Context**: SaaS company experiencing first major security incident`,
    useCase: 'Crisis management and public relations',
    tags: ['insync', 'crisis', 'PR', 'communication']
  },
  {
    id: '21',
    name: 'INSYNC Educational Differentiation',
    description: 'Adapt teaching materials for diverse learning styles and abilities.',
    category: ['insync', 'education'],
    difficulty: 'intermediate',
    example: `**Intent**: Explain photosynthesis to mixed-ability middle school science class
**Nuance**: Accommodate visual, kinesthetic, and auditory learners while maintaining rigor
**Style**: Interactive and multi-modal with hands-on elements
**You as...**: Award-winning science teacher with special education certification
**Narrative Format**: Tiered lesson plan with extensions and modifications
**Context**: Inclusive classroom with IEP students and advanced learners`,
    useCase: 'Inclusive education and differentiated instruction',
    tags: ['insync', 'education', 'differentiation', 'inclusive']
  },
  {
    id: '22',
    name: 'INSYNC Financial Planning',
    description: 'Create personalized financial strategies with emotional intelligence and practical guidance.',
    category: ['insync', 'finance'],
    difficulty: 'intermediate',
    example: `**Intent**: Guide recent college graduate through first investment decisions with student loan debt
**Nuance**: Address money anxiety, balance debt payoff with wealth building, acknowledge emotional aspects
**Style**: Empathetic and educational, avoiding shame or judgment
**You as...**: Certified financial planner specializing in young professional clients
**Narrative Format**: Step-by-step roadmap with emotional checkpoints and celebration milestones
**Context**: First financial planning session for high-earning but debt-burdened client`,
    useCase: 'Personal finance and wealth building guidance',
    tags: ['insync', 'finance', 'planning', 'wealth-building']
  },
  {
    id: '23',
    name: 'INSYNC Technical Documentation',
    description: 'Create developer-friendly documentation for complex software systems.',
    category: ['insync', 'technical'],
    difficulty: 'intermediate',
    example: `**Intent**: Document new microservices architecture for internal development team
**Nuance**: Balance technical depth with onboarding needs, include troubleshooting guides
**Style**: Clear, concise, with progressive disclosure of complexity
**You as...**: Senior architect documenting system for team of varying experience levels
**Narrative Format**: Modular documentation with quick-start, deep-dive, and troubleshooting sections
**Context**: Legacy system migration requiring extensive team retraining`,
    useCase: 'Software documentation and knowledge transfer',
    tags: ['insync', 'technical', 'documentation', 'software']
  },
  {
    id: '24',
    name: 'INSYNC Therapeutic Journaling',
    description: 'Guide therapeutic writing exercises for mental health and self-reflection.',
    category: ['insync', 'wellness'],
    difficulty: 'intermediate',
    example: `**Intent**: Create journaling prompts for anxiety management in therapy clients
**Nuance**: Balance therapeutic benefit with emotional safety, provide grounding techniques
**Style**: Gentle, non-triggering, with clear boundaries and self-care guidance
**You as...**: Licensed therapist specializing in anxiety disorders
**Narrative Format**: Structured prompts with safety guidelines and processing suggestions
**Context**: Therapeutic homework for individual therapy clients`,
    useCase: 'Mental health support and therapeutic interventions',
    tags: ['insync', 'therapy', 'mental-health', 'wellness']
  },
  {
    id: '25',
    name: 'INSYNC Cross-Cultural Communication',
    description: 'Navigate sensitive cross-cultural business interactions with respect and effectiveness.',
    category: ['insync', 'communication'],
    difficulty: 'advanced',
    example: `**Intent**: Facilitate partnership discussion between US tech startup and Japanese manufacturing firm
**Nuance**: Respect hierarchy, understand decision-making processes, avoid cultural missteps
**Style**: Humble, respectful, with deep cultural awareness
**You as...**: International business consultant with 10+ years Japan experience
**Narrative Format**: Meeting agenda with cultural context and communication protocols
**Context**: First-time partnership negotiation requiring cultural bridge-building`,
    useCase: 'International business and cross-cultural communication',
    tags: ['insync', 'cross-cultural', 'international', 'business']
  }
  
];

// Handler function to return the patterns
export const handleGetPromptPatterns = (_req: Request, res: Response) => {
  try {
    res.status(200).json(insyncPatterns);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching prompt patterns', error });
  }
};
