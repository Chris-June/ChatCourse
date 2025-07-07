import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Module1Page: React.FC = () => {
  const location = useLocation();
  
  const lessons = [
    {
      id: '1.1',
      title: 'Demystifying AI: What Exactly Are We Working With?',
      path: '/instructions/module-1/1.1',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-400">Demystifying AI: What Exactly Are We Working With?</h2>
          
          <section className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">AI vs. Traditional Programming</h3>
            <p className="text-gray-300 mb-4">
              Traditional programming follows explicit instructions to produce outputs from inputs. 
              AI, particularly machine learning, learns patterns from data to make predictions or decisions.
            </p>
            <div className="bg-gray-700 p-4 rounded">
              <h4 className="font-medium text-gray-200 mb-2">Key Differences:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Rule-based vs. Learning-based:</strong> Traditional code follows rules, while AI learns from data</li>
                <li><strong>Deterministic vs. Probabilistic:</strong> Same input always produces same output in traditional programming, but AI provides probabilities</li>
                <li><strong>Maintenance:</strong> Traditional code needs manual updates, AI improves with more data</li>
              </ul>
            </div>
          </section>

          <section className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">Large Language Models 101</h3>
            <p className="text-gray-300 mb-4">
              Large Language Models (LLMs) are AI systems trained on vast amounts of text data to understand 
              and generate human-like text. They work by predicting the next word in a sequence based on context.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-700 p-4 rounded">
                <h4 className="font-medium text-gray-200 mb-2">How LLMs Work:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Process text as numerical representations (tokens)</li>
                  <li>Use attention mechanisms to understand context</li>
                  <li>Generate text one token at a time</li>
                  <li>Are trained on diverse internet text</li>
                </ul>
              </div>
              <div className="bg-gray-700 p-4 rounded">
                <h4 className="font-medium text-gray-200 mb-2">Key Components:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Transformer architecture</li>
                  <li>Billions of parameters</li>
                  <li>Self-attention mechanisms</li>
                  <li>Pre-training and fine-tuning</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">Capabilities and Limitations</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-green-400 mb-2">What AI Can Do Well:</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Generate human-like text based on patterns</li>
                  <li>Answer questions based on training data</li>
                  <li>Assist with coding, writing, and creative tasks</li>
                  <li>Process and summarize large amounts of text</li>
                  <li>Translate between languages</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-red-400 mb-2">Current Limitations:</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>May generate incorrect or made-up information</li>
                  <li>Lacks true understanding or consciousness</li>
                  <li>Can be sensitive to input phrasing</li>
                  <li>Reflects biases in training data</li>
                  <li>Limited by its training data cut-off</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-800">
              <h4 className="font-medium text-blue-300 mb-2">Best Practices</h4>
              <p className="text-gray-300 text-sm">
                Always verify important information from AI outputs, especially for critical decisions. 
                Use AI as an assistant, not as the sole source of truth.
              </p>
            </div>
          </section>
        </div>
      )
    },
    {
      id: '1.2',
      title: 'The Art of the Prompt',
      path: '/instructions/module-1/1.2',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-400">The Art of the Prompt</h2>
          
          <section className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">Prompt Engineering Basics</h3>
            <p className="text-gray-300 mb-4">
              Effective prompts are clear, specific, and provide enough context for the AI to understand 
              what you're asking for. Think of it as giving instructions to a very knowledgeable but literal assistant.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-700 p-4 rounded">
                <h4 className="font-medium text-green-400 mb-2">Good Prompt:</h4>
                <div className="bg-gray-800 p-3 rounded font-mono text-sm text-gray-300">
                  "Write a 3-paragraph blog post introduction about the benefits of meditation for software developers. 
                  Include at least 3 specific benefits and write in a professional but conversational tone."
                </div>
              </div>
              
              <div className="bg-gray-700 p-4 rounded">
                <h4 className="font-medium text-red-400 mb-2">Vague Prompt:</h4>
                <div className="bg-gray-800 p-3 rounded font-mono text-sm text-gray-300">
                  "Write about meditation"
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">Context is Everything</h3>
            <p className="text-gray-300 mb-4">
              Providing the right context helps the AI generate more relevant and accurate responses. 
              Include relevant background information, constraints, and examples when needed.
            </p>
            
            <div className="bg-gray-700 p-4 rounded">
              <h4 className="font-medium text-gray-200 mb-2">Contextual Prompt Example:</h4>
              <div className="bg-gray-800 p-3 rounded font-mono text-sm text-gray-300 space-y-2">
                <p>I'm writing a research paper about renewable energy for a university course. The audience is 
                fellow engineering students. Please generate an outline that covers the following topics:</p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Current state of renewable energy technologies</li>
                  <li>Economic implications</li>
                  <li>Environmental impact</li>
                  <li>Future projections</li>
                </ul>
                <p className="mt-2">The outline should be detailed with at least 3 subsections under each main point.</p>
              </div>
            </div>
          </section>

          <section className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">Iterative Refinement</h3>
            <p className="text-gray-300 mb-4">
              Getting the best results often requires multiple iterations. Start with a basic prompt and 
              refine it based on the AI's responses.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded">
                <h4 className="font-medium text-gray-200 mb-2">Iteration 1:</h4>
                <div className="bg-gray-800 p-3 rounded font-mono text-sm text-gray-300">
                  "Write a product description for a smartwatch"
                </div>
              </div>
              
              <div className="bg-gray-700 p-4 rounded">
                <h4 className="font-medium text-gray-200 mb-2">Refined Prompt:</h4>
                <div className="bg-gray-800 p-3 rounded font-mono text-sm text-gray-300">
                  "Write a compelling product description for the new XYZ Smartwatch. Highlight these features: 
                  7-day battery life, blood oxygen monitoring, sleep tracking, and water resistance up to 50m. 
                  Target audience is health-conscious professionals aged 25-45. Keep it under 150 words."
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-800">
              <h4 className="font-medium text-blue-300 mb-2">Pro Tip</h4>
              <p className="text-gray-300 text-sm">
                Save your most effective prompts as templates for future use. You can adapt them for similar tasks.
              </p>
            </div>
          </section>
        </div>
      )
    },
    {
      id: '1.3',
      title: 'Hands-on Exploration',
      path: '/instructions/module-1/1.3',
      content: (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-400">Hands-on Exploration</h2>
          
          <section className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">Interactive Session</h3>
            <p className="text-gray-300 mb-4">
              Let's practice what we've learned by trying different prompts and observing the AI's responses. 
              This will help you understand how slight changes in your input can lead to different outputs.
            </p>
            
            <div className="bg-gray-700 p-4 rounded">
              <h4 className="font-medium text-gray-200 mb-3">Exercise 1: Basic Prompting</h4>
              <ol className="list-decimal pl-5 space-y-3 text-gray-300">
                <li>Start with a simple question: <span className="font-mono bg-gray-800 px-2 py-1 rounded">What is machine learning?</span></li>
                <li>Now, make it more specific: <span className="font-mono bg-gray-800 px-2 py-1 rounded">Explain machine learning to a 10-year-old in 3 sentences</span></li>
                <li>Try a different angle: <span className="font-mono bg-gray-800 px-2 py-1 rounded">Compare machine learning and traditional programming using a cooking analogy</span></li>
              </ol>
              <p className="mt-4 text-sm text-gray-400">
                Notice how each variation provides a different type of response. The more specific and contextual your prompt, 
                the more tailored the response will be to your needs.
              </p>
            </div>
          </section>

          <section className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">Pattern Recognition</h3>
            <p className="text-gray-300 mb-4">
              As you interact with the AI, you'll start to notice patterns in what works well and what doesn't. 
              Pay attention to these patterns to improve your prompting skills.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-700 p-4 rounded">
                <h4 className="font-medium text-green-400 mb-2">Effective Patterns:</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                  <li>Being specific about the desired format</li>
                  <li>Providing clear instructions</li>
                  <li>Using examples when possible</li>
                  <li>Breaking down complex tasks</li>
                  <li>Setting the appropriate tone</li>
                </ul>
              </div>
              
              <div className="bg-gray-700 p-4 rounded">
                <h4 className="font-medium text-red-400 mb-2">Common Pitfalls:</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
                  <li>Being too vague or open-ended</li>
                  <li>Asking multiple questions at once</li>
                  <li>Not providing enough context</li>
                  <li>Using ambiguous language</li>
                  <li>Expecting the AI to read your mind</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-blue-300">First Project Ideas</h3>
            <p className="text-gray-300 mb-4">
              Now that you've learned the basics of prompting, let's brainstorm some project ideas that you 
              could build using AI assistance. These projects will help you practice your new skills.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-700 p-4 rounded">
                <h4 className="font-medium text-blue-300 mb-2">Beginner Project:</h4>
                <p className="text-gray-300 text-sm mb-3">
                  <strong>AI Study Guide Generator</strong><br />
                  Create a tool that generates study guides based on topics you provide.
                </p>
                <div className="bg-gray-800 p-3 rounded font-mono text-xs text-gray-300">
                  Prompt: "Create a study guide for [topic] with key concepts, definitions, and practice questions."
                </div>
              </div>
              
              <div className="bg-gray-700 p-4 rounded">
                <h4 className="font-medium text-blue-300 mb-2">Intermediate Project:</h4>
                <p className="text-gray-300 text-sm mb-3">
                  <strong>Content Idea Generator</strong><br />
                  Build a tool that generates content ideas based on your niche.
                </p>
                <div className="bg-gray-800 p-3 rounded font-mono text-xs text-gray-300">
                  Prompt: "Generate 10 blog post ideas about [topic] for [audience] that would [goal]."
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-800">
              <h4 className="font-medium text-blue-300 mb-2">Next Steps</h4>
              <p className="text-gray-300 text-sm">
                Choose one of these project ideas or come up with your own. In the next module, we'll learn how to 
                refine these ideas and work with the AI to develop them further.
              </p>
            </div>
          </section>
        </div>
      )
    }
  ];

  // If we're on a specific lesson, show its content
  const currentLesson = lessons.find(lesson => location.pathname.endsWith(lesson.id));
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Module 1: The Heart of the Matter - Understanding AI Models</h1>
        <p className="text-gray-400">
          Learn the fundamentals of AI models and how to interact with them effectively.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-gray-800 rounded-lg p-4 sticky top-4">
            <h2 className="text-lg font-semibold mb-4">Lessons</h2>
            <nav className="space-y-2">
              {lessons.map((lesson) => (
                <Link
                  key={lesson.id}
                  to={lesson.path}
                  className={`flex items-center p-2 rounded ${
                    location.pathname.endsWith(lesson.id)
                      ? 'bg-blue-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <ChevronRight className="w-4 h-4 mr-2" />
                  <span className="text-sm">{lesson.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <div className="md:col-span-3">
          {currentLesson ? (
            <div className="bg-gray-800 rounded-lg p-6">
              {currentLesson.content}
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Welcome to Module 1</h2>
              <p className="text-gray-300 mb-6">
                In this module, we'll explore the fundamentals of AI models, learn how to craft effective prompts, 
                and get hands-on experience with AI interaction. Select a lesson from the sidebar to get started.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                {lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    to={lesson.path}
                    className="bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition-colors"
                  >
                    <h3 className="font-medium text-blue-300 mb-2">{lesson.title}</h3>
                    <p className="text-sm text-gray-400">
                      {lesson.id === '1.1' && 'Learn about AI models and their capabilities'}
                      {lesson.id === '1.2' && 'Master the art of crafting effective prompts'}
                      {lesson.id === '1.3' && 'Practice your skills with hands-on exercises'}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Module1Page;
