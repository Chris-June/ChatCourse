import { Zap, Lightbulb, Brain, MessageSquare, Star } from 'lucide-react';
import { Button } from '@chat/ui';

const AIFeatureIdeas = () => {
  const features = [
    {
      category: '🧠 Smart Features',
      icon: <Brain className="w-5 h-5 mr-2" />,
      items: [
        {
          title: 'Context-Aware Responses',
          difficulty: 2,
          description: 'The AI remembers previous conversations and can reference past interactions.',
          example: '"Remember when we talked about vacation plans last week? Here\'s that list of places we discussed."',
          considerations: [
            'Storage: How will we store conversation history?',
            'Privacy: What data should be remembered, and for how long?',
            'Context Window: How much conversation history can the AI effectively use?',
            'Accuracy: Ensuring the AI accurately references past conversations',
            'User Control: Allowing users to edit or delete remembered information'
          ],
          relatedConcepts: ['Module 5.1: Multi-Turn Conversations', 'Module 5.2: Personalization at Scale']
        },
        {
          title: 'Meeting Summarizer',
          difficulty: 2,
          description: 'Automatically generate meeting summaries with action items and key decisions.',
          example: 'After a long discussion, the AI provides a concise summary with bullet points.',
          considerations: [
            'Accuracy: Ensuring the summary reflects the discussion',
            'Action Items: Identifying and extracting tasks',
            'Format: Best structure for different types of meetings',
            'Timing: Real-time vs. end-of-meeting summaries',
            'Edits: Allowing user modifications to summaries'
          ],
          relatedConcepts: ['Module 3.2: Logic and Problem Solving']
        },
        {
          title: 'Multi-Language Support',
          difficulty: 3,
          description: 'Automatic real-time translation between languages within the chat.',
          example: 'You type in English, and your international teammates read it in their native language.',
          considerations: [
            'Language Detection: Auto-detect vs. manual selection',
            'Translation Quality: Handling idioms and cultural nuances',
            'Performance: Real-time translation without delays',
            'Supported Languages: Coverage and handling of less common languages',
            'User Experience: Clear indication of translated messages'
          ],
          relatedConcepts: ['Module 7.1: Function Calling & Tool Use']
        }
      ]
    },
    {
      category: '🛠️ Productivity Boosters',
      icon: <Zap className="w-5 h-5 mr-2" />,
      items: [
        {
          title: 'Smart To-Do List Generator',
          difficulty: 1,
          description: 'Extract action items from conversations and organize them into a task list.',
          example: '"Add milk to grocery list" gets automatically added to your tasks.',
          considerations: [
            'Intent Recognition: Identifying action items vs. regular conversation',
            'Task Details: Capturing due dates, priority, assignees',
            'Integration: Syncing with external task managers',
            'Confirmation: Verifying task creation with users',
            'Organization: Categorizing and tagging tasks'
          ],
          relatedConcepts: ['Module 3.2: Logic and Problem Solving']
        },
        {
          title: 'Document Assistant (RAG)',
          difficulty: 3,
          description: 'Upload documents and chat with the AI about their contents.',
          example: '"Find the quarterly sales numbers from the attached report."',
          considerations: [
            'File Types: Supported document formats',
            'Document Size: Handling large files efficiently',
            'Security: Protecting sensitive information',
            'Accuracy: Ensuring responses are document-based',
            'Citations: Referencing source material'
          ],
          relatedConcepts: ['Module 7.2: Building RAG Systems']
        },
        {
          title: 'Email Drafting Assistant',
          difficulty: 1,
          description: 'Help compose professional emails based on brief descriptions.',
          example: '"Draft an email to the team about rescheduling Friday\'s meeting to 3 PM."',
          considerations: [
            'Tone and Style: Matching the user\'s voice',
            'Context: Incorporating relevant details from the conversation',
            'Templates: Providing pre-defined email formats',
            'Review and Edit: Allowing easy modifications',
            'Personalization: Learning user preferences over time'
          ],
          relatedConcepts: ['Module 2.2: Custom Instructions', 'Module 3.1: Dynamic Content Generation']
        }
      ]
    },
    {
      category: '💡 Creative & Content Tools',
      icon: <Lightbulb className="w-5 h-5 mr-2" />,
      items: [
        {
          title: 'Brainstorming Partner',
          difficulty: 1,
          description: 'Generate creative ideas, suggest different angles, and help overcome creative blocks.',
          example: '"Give me five unique marketing slogans for a new eco-friendly coffee brand."',
          considerations: [
            'Creativity vs. Relevance: Balancing novel ideas with practical constraints',
            'Domain Knowledge: Providing context for better suggestions',
            'Idea Organization: Structuring brainstormed ideas effectively',
            'Follow-up Questions: Prompting the user for more details',
            'Diverse Perspectives: Offering a range of viewpoints'
          ],
          relatedConcepts: ['Module 6.1: Idea Generation']
        },
        {
          title: 'Code Generation Assistant',
          difficulty: 2,
          description: 'Generate code snippets, explain complex code, and help with debugging.',
          example: '"Write a Python function to sort a list of dictionaries by a specific key."',
          considerations: [
            'Language Support: Supported programming languages',
            'Code Quality: Ensuring generated code is efficient and secure',
            'Context Awareness: Understanding the existing codebase',
            'Debugging: Providing clear explanations for errors',
            'User Skill Level: Adapting to both novice and expert programmers'
          ],
          relatedConcepts: ['Module 4.3: Building Custom Tools']
        }
      ]
    },
    {
      category: '💬 Enhanced Communication',
      icon: <MessageSquare className="w-5 h-5 mr-2" />,
      items: [
        {
          title: 'Sentiment Analysis',
          difficulty: 2,
          description: 'Analyze the emotional tone of conversations to provide insights.',
          example: 'The AI flags a customer support chat as \'Frustrated\' and suggests escalation.',
          considerations: [
            'Accuracy: Handling sarcasm and complex emotions',
            'Real-time Feedback: Providing instant sentiment analysis',
            'Privacy: Ensuring user data is handled responsibly',
            'Actionable Insights: Offering suggestions based on sentiment',
            'Cultural Nuances: Understanding different emotional expressions'
          ],
          relatedConcepts: ['Module 8.1: Bias and Fairness']
        },
        {
          title: 'Automated Agent (Chatbot)',
          difficulty: 3,
          description: 'Create a fully autonomous agent to handle specific tasks like customer support or sales.',
          example: 'A chatbot guides a user through troubleshooting a technical issue and creates a support ticket.',
          considerations: [
            'Task Definition: Clearly defining the agent\'s goals and capabilities',
            'Tool Integration: Connecting the agent to necessary APIs (e.g., for creating tickets)',
            'Reasoning and Planning: Enabling the agent to make multi-step decisions',
            'Guardrails: Implementing safety measures to prevent unintended actions',
            'Handoff: Seamlessly transferring to a human agent when needed'
          ],
          relatedConcepts: ['Module 4.5: Introduction to AI Agents', 'Module 7.1: Function Calling & Tool Use']
        }
      ]
    }
  ];

  const DifficultyDisplay = ({ level }: { level: number }) => (
    <div className="flex items-center">
      {[...Array(level)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-amber-400" />
      ))}
      {[...Array(3 - level)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-muted-foreground" />
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-12">
        <Lightbulb className="mx-auto h-16 w-16 text-amber-400" />
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">AI Feature Ideas</h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          A curated list of practical AI-powered features to inspire your next project.
        </p>
        <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border inline-block">
          <h3 className="font-semibold text-foreground mb-3">Difficulty Legend:</h3>
          <div className="flex flex-col items-start space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <DifficultyDisplay level={1} />
              <span className="ml-2">Beginner</span>
            </div>
            <div className="flex items-center">
              <DifficultyDisplay level={2} />
              <span className="ml-2">Intermediate</span>
            </div>
            <div className="flex items-center">
              <DifficultyDisplay level={3} />
              <span className="ml-2">Advanced</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-16">
        {features.map((section, sectionIndex) => (
          <section key={sectionIndex} className="scroll-mt-20" id={`section-${sectionIndex}`}>
            <div className="flex items-center mb-6 pb-2 border-b border-border">
              <div className="text-2xl mr-3">
                {section.icon}
              </div>
              <h2 className="text-2xl font-bold">{section.category}</h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
              {section.items.map((item, itemIndex) => (
                <div 
                  key={itemIndex} 
                  className="bg-muted/30 rounded-xl p-6 hover:bg-muted/40 transition-colors border border-border"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-primary">{item.title}</h3>
                    <DifficultyDisplay level={item.difficulty} />
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  
                  <div className="bg-background p-4 rounded-lg mb-4 border-l-4 border-primary">
                    <p className="text-sm text-primary font-medium mb-1">Example:</p>
                    <p className="text-muted-foreground italic">{item.example}</p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <h4 className="text-sm font-semibold text-primary mb-2">Related Concepts:</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.relatedConcepts.map((concept, i) => (
                        <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <details className="group">
                      <summary className="flex items-center cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background rounded-md">
                        <span className="mr-2">Key Considerations</span>
                        <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <ul className="mt-3 pl-5 space-y-2 text-sm text-muted-foreground">
                        {item.considerations.map((consideration, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>{consideration}</span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 p-6 bg-muted/30 rounded-xl border border-border">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Have an Idea?</h2>
        <p className="mb-4">
          We'd love to hear your suggestions for new AI-powered features! Share your ideas with the community 
          and let's build something amazing together.
        </p>
        <a 
          href="https://discord.gg/CrGqs9cxnM" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background rounded-md"
        >
          <Button variant="outline" className="mt-2">
            Share Your Idea
          </Button>
        </a>
      </div>
    </div>
  );
};

export default AIFeatureIdeas;
