import { BookOpen, Zap, Lightbulb, Code, Brain, MessageSquare, Star } from 'lucide-react';
import { Button } from '@chat/ui';

const AIFeatureIdeas = () => {
  const features = [
    {
      category: '🧠 Smart Features',
      icon: <Brain className="w-5 h-5 mr-2" />,
      items: [
        {
          title: 'Context-Aware Responses',
          difficulty: '⭐⭐',
          description: 'The AI remembers previous conversations and can reference past interactions.',
          example: '"Remember when we talked about vacation plans last week? Here\'s that list of places we discussed."',
          considerations: [
            'Storage: How will we store conversation history?',
            'Privacy: What data should be remembered, and for how long?',
            'Context Window: How much conversation history can the AI effectively use?',
            'Accuracy: Ensuring the AI accurately references past conversations',
            'User Control: Allowing users to edit or delete remembered information'
          ]
        },
        {
          title: 'Multi-Language Support',
          difficulty: '⭐⭐',
          description: 'Automatic real-time translation between languages within the chat.',
          example: 'You type in English, and your international teammates read it in their native language.',
          considerations: [
            'Language Detection: Auto-detect vs. manual selection',
            'Translation Quality: Handling idioms and cultural nuances',
            'Performance: Real-time translation without delays',
            'Supported Languages: Coverage and handling of less common languages',
            'User Experience: Clear indication of translated messages'
          ]
        },
        {
          title: 'Meeting Summarizer',
          difficulty: '⭐⭐',
          description: 'Automatically generate meeting summaries with action items and key decisions.',
          example: 'After a long discussion, the AI provides a concise summary with bullet points.',
          considerations: [
            'Accuracy: Ensuring the summary reflects the discussion',
            'Action Items: Identifying and extracting tasks',
            'Format: Best structure for different types of meetings',
            'Timing: Real-time vs. end-of-meeting summaries',
            'Edits: Allowing user modifications to summaries'
          ]
        }
      ]
    },
    {
      category: '🛠️ Productivity Boosters',
      icon: <Zap className="w-5 h-5 mr-2" />,
      items: [
        {
          title: 'Smart To-Do List Generator',
          difficulty: '⭐',
          description: 'Extract action items from conversations and organize them into a task list.',
          example: '"Add milk to grocery list" gets automatically added to your tasks.',
          considerations: [
            'Intent Recognition: Identifying action items vs. regular conversation',
            'Task Details: Capturing due dates, priority, assignees',
            'Integration: Syncing with external task managers',
            'Confirmation: Verifying task creation with users',
            'Organization: Categorizing and tagging tasks'
          ]
        },
        {
          title: 'Document Assistant',
          difficulty: '⭐⭐',
          description: 'Upload documents and chat with the AI about their contents.',
          example: '"Find the quarterly sales numbers from the attached report."',
          considerations: [
            'File Types: Supported document formats',
            'Document Size: Handling large files efficiently',
            'Security: Protecting sensitive information',
            'Accuracy: Ensuring responses are document-based',
            'Citations: Referencing source material'
          ]
        },
        {
          title: 'Email Drafting Assistant',
          difficulty: '⭐',
          description: 'Help compose professional emails based on brief descriptions.',
          example: '"Draft an email to the team about rescheduling Friday\'s meeting to 3 PM."',
          considerations: [
            'Tone: Adapting to different email styles',
            'Personalization: Handling specific details',
            'Integration: Connecting with email clients',
            'Edits: Making it easy to modify drafts',
            'Templates: Providing common email structures'
          ]
        }
      ]
    },
    {
      category: '🎨 Creative Features',
      icon: <Lightbulb className="w-5 h-5 mr-2" />,
      items: [
        {
          title: 'Storytelling Companion',
          difficulty: '⭐',
          description: 'Collaborate with AI to write stories, with the AI suggesting plot developments.',
          example: '"What if the main character discovers a hidden door?"',
          considerations: [
            'Genre & Style: Adapting to different writing styles',
            'Consistency: Maintaining character and plot coherence',
            'User Control: Balancing AI suggestions with user direction',
            'Content Guidelines: Filtering inappropriate content',
            'Saving Progress: Managing story versions and drafts'
          ]
        },
        {
          title: 'Brainstorming Partner',
          difficulty: '⭐',
          description: 'Generate creative ideas for projects, names, or solutions.',
          example: '"Help me think of names for my new coffee shop."',
          considerations: [
            'Specificity: Handling vague vs. detailed requests',
            'Variety: Ensuring diverse and creative suggestions',
            'Refinement: Improving upon initial ideas',
            'Domain Knowledge: Handling specialized topics',
            'Saving Ideas: Organizing and retrieving past ideas'
          ]
        }
      ]
    },
    {
      category: '🧠 Learning & Development',
      icon: <BookOpen className="w-5 h-5 mr-2" />,
      items: [
        {
          title: 'Study Buddy',
          difficulty: '⭐⭐',
          description: 'Create interactive quizzes or flashcards from study materials.',
          example: '"Quiz me on these biology terms."',
          considerations: [
            'Content Source: User-provided or pre-made materials',
            'Question Types: Multiple choice, true/false, etc.',
            'Difficulty Levels: Adjusting based on performance',
            'Spaced Repetition: Optimizing learning schedules',
            'Progress Tracking: Monitoring improvement over time'
          ]
        },
        {
          title: 'Code Explainer',
          difficulty: '⭐⭐',
          description: 'Explain code snippets in simple terms.',
          example: '"What does this Python function do?"',
          considerations: [
            'Language Support: Coverage of programming languages',
            'Complexity Levels: Adapting to user knowledge',
            'Code Context: Handling partial code snippets',
            'Visual Aids: Including diagrams when helpful',
            'Interactive Learning: Supporting follow-up questions'
          ]
        }
      ]
    },
    {
      category: '🤖 Advanced Integrations',
      icon: <Code className="w-5 h-5 mr-2" />,
      items: [
        {
          title: 'Calendar Assistant',
          difficulty: '⭐⭐⭐',
          description: 'Schedule meetings and set reminders through natural language.',
          example: '"Set up a meeting with Sarah next Tuesday at 2 PM."',
          considerations: [
            'Calendar Integration: Supported services',
            'Natural Language Processing: Interpreting dates and times',
            'Conflict Detection: Handling scheduling overlaps',
            'Recurring Events: Managing repeating schedules',
            'Permissions: Required access levels'
          ]
        },
        {
          title: 'Research Assistant',
          difficulty: '⭐⭐',
          description: 'Search the web for information and summarize findings.',
          example: '"Find the latest research on renewable energy and summarize the key points."',
          considerations: [
            'Source Reliability: Identifying credible information',
            'Bias Detection: Recognizing potential biases',
            'Citation: Properly attributing sources',
            'Depth vs. Breadth: Balancing comprehensive coverage',
            'Real-time Information: Ensuring current data'
          ]
        },
        {
          title: 'Mood Detector',
          difficulty: '⭐⭐⭐',
          description: 'Analyze message tone and suggest appropriate responses.',
          example: '"You seem frustrated. Would you like help drafting a professional response?"',
          considerations: [
            'Accuracy: Detecting emotions from text',
            'Cultural Differences: Accounting for varied expressions',
            'Privacy: Handling emotional data',
            'False Positives: Managing incorrect detections',
            'User Control: Opt-out options'
          ]
        }
      ]
    },
    {
      category: '🎮 Interactive Features',
      icon: <MessageSquare className="w-5 h-5 mr-2" />,
      items: [
        {
          title: 'Choose-Your-Own-Adventure',
          difficulty: '⭐⭐',
          description: 'Create interactive stories where users make choices that affect the narrative.',
          example: '"You reach a fork in the road. Do you go left or right?"',
          considerations: [
            'Branching Complexity: Managing story paths',
            'Narrative Cohesion: Maintaining consistency',
            'Save States: Resuming progress',
            'Content Moderation: Filtering inappropriate content',
            'User-Generated Content: Supporting custom stories'
          ]
        },
        {
          title: 'Role-Playing Scenarios',
          difficulty: '⭐⭐',
          description: 'Practice conversations for interviews, negotiations, or language learning.',
          example: '"Let\'s practice for your job interview. I\'ll be the interviewer."',
          considerations: [
            'Scenario Variety: Available role-play options',
            'Feedback Mechanism: Providing constructive criticism',
            'Customization: Creating custom scenarios',
            'Cultural Context: Handling cultural differences',
            'Progress Tracking: Monitoring improvement over time'
          ]
        }
      ]
    }
  ];

  return (
    <div className="prose prose-invert max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 flex items-center">
        <Lightbulb className="w-10 h-10 mr-4 text-yellow-400" />
        AI-Powered Feature Ideas
      </h1>

      <div className="mb-12 p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-800/50">
        <h2 className="text-2xl font-bold mb-4 text-blue-300">Welcome to AI Feature Ideas!</h2>
        <p className="mb-4">
          This collection showcases potential AI-powered features that could enhance our chat application. 
          Each idea includes implementation considerations and difficulty levels to help you explore 
          the exciting possibilities of AI integration.
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="flex items-center text-sm">
            <span className="font-semibold mr-2">Difficulty:</span>
            <div className="flex items-center mr-4">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>Beginner</span>
            </div>
            <div className="flex items-center mr-4">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>Intermediate</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>Advanced</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-16">
        {features.map((section, sectionIndex) => (
          <section key={sectionIndex} className="scroll-mt-20" id={`section-${sectionIndex}`}>
            <div className="flex items-center mb-6 pb-2 border-b border-zinc-700">
              <div className="text-2xl mr-3">
                {section.icon}
              </div>
              <h2 className="text-2xl font-bold">{section.category}</h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
              {section.items.map((item, itemIndex) => (
                <div 
                  key={itemIndex} 
                  className="bg-zinc-800/50 rounded-xl p-6 hover:bg-zinc-800/70 transition-colors border border-zinc-700/50"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-blue-300">{item.title}</h3>
                    <span className="text-yellow-400 text-sm font-medium bg-yellow-900/30 px-3 py-1 rounded-full">
                      {item.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{item.description}</p>
                  
                  <div className="bg-zinc-900/50 p-4 rounded-lg mb-4 border-l-4 border-blue-500">
                    <p className="text-sm text-blue-300 font-medium mb-1">Example:</p>
                    <p className="text-gray-300 italic">"{item.example}"</p>
                  </div>
                  
                  <div className="mt-4">
                    <details className="group">
                      <summary className="flex items-center cursor-pointer text-sm font-medium text-blue-400 hover:text-blue-300">
                        <span className="mr-2">Key Considerations</span>
                        <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <ul className="mt-2 pl-5 space-y-2 text-sm text-gray-400">
                        {item.considerations.map((consideration, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-blue-400 mr-2">•</span>
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

      <div className="mt-16 p-6 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-xl border border-green-800/50">
        <h2 className="text-2xl font-bold mb-4 text-green-300">Have an Idea?</h2>
        <p className="mb-4">
          We'd love to hear your suggestions for new AI-powered features! Share your ideas with the community 
          and let's build something amazing together.
        </p>
        <a 
          href="https://discord.gg/CrGqs9cxnM" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block"
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
