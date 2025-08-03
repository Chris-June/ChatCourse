import React, { useState } from 'react';
import { useChatStore } from '@/store/chat';
import { CheckCircle, ChevronRight, Star, XCircle, Zap, AlertCircle } from 'lucide-react';
import CopyButton from '../../../CopyButton';
import { api } from '@/lib/api';

interface EvaluationResult {
  success: boolean;
  feedback: string;
  score: number;
  criteriaEvaluation: Array<{
    criteria: string;
    met: boolean;
    feedback: string;
  }>;
  criteriaMet?: boolean; // Add optional criteriaMet for backward compatibility
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  startingPrompt: string;
  successCriteria: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'writing' | 'coding' | 'analysis' | 'creative';
  tips?: string[];
}

/**
 * PromptChallenges
 * 
 * A collection of interactive prompt engineering challenges that help users
 * practice and improve their prompt crafting skills through structured exercises.
 * 
 * @component
 * @example
 * return (
 *   <PromptChallenges />
 * )
 */
const PromptChallenges: React.FC = () => {
  const { apiKey } = useChatStore();
  const [activeChallenge, setActiveChallenge] = useState<number | null>(1);
  const [userPrompts, setUserPrompts] = useState<{ [key: number]: string }>({});
  const [evaluationResults, setEvaluationResults] = useState<{ [key: number]: EvaluationResult | null }>({});
  const [isEvaluating, setIsEvaluating] = useState<{ [key: number]: boolean }>({});
  const [showTips, setShowTips] = useState<{ [key: number]: boolean }>({});

  const challenges: Challenge[] = [
    {
      id: 1,
      title: "The Vague to Specific Challenge",
      description: "Transform a vague prompt into a highly specific one using I.N.S.Y.N.C. framework.",
      startingPrompt: "Write about AI",
      successCriteria: [
        "Clear Intent: Specific goal and purpose",
        "Detailed Nuance: Specific constraints and requirements",
        "Defined Style: Appropriate tone and voice",
        "You as...: Clear AI role/persona",
        "Structured Narrative Format: Output format specified",
        "Relevant Context: Background information provided"
      ],
      difficulty: 'beginner',
      category: 'writing',
      tips: [
        "Use the I.N.S.Y.N.C. framework: Intent-Nuance-Style-You as-Narrative Format-Context",
        "Be specific about your goal (Intent)",
        "Include relevant constraints and details (Nuance)",
        "Define the AI's role and expertise (You as...)"
      ]
    },
    {
      id: 2,
      title: "The Role-Playing Challenge",
      description: "Create a prompt using I.N.S.Y.N.C. that makes the AI adopt a specific role or expertise.",
      startingPrompt: "Explain quantum computing",
      successCriteria: [
        "Intent: Clear goal for quantum computing explanation",
        "Nuance: Specific details about complexity level",
        "Style: Appropriate tone for target audience",
        "You as...: Specific expert role (e.g., physics professor)",
        "Narrative Format: Structured explanation with examples",
        "Context: Audience's background knowledge specified"
      ],
      difficulty: 'intermediate',
      category: 'analysis',
      tips: [
        "Use 'You as...' to specify the AI's role clearly",
        "Define the audience's background in Context",
        "Specify the complexity level in Nuance"
      ]
    },
    {
      id: 3,
      title: "The Constrained Output Challenge",
      description: "Craft a prompt using I.N.S.Y.N.C. that produces output with specific constraints.",
      startingPrompt: "Write a product description",
      successCriteria: [
        "Intent: Clear goal for product description",
        "Nuance: Specific constraints (word count, keywords)",
        "Style: Defined tone and voice constraints",
        "You as...: Role as product marketer/copywriter",
        "Narrative Format: Structured format requirements",
        "Context: Product type and target market"
      ],
      difficulty: 'advanced',
      category: 'writing',
      tips: [
        "Use Nuance for specific constraints like word count",
        "Define format requirements in Narrative Format",
        "Include target audience in Context"
      ]
    },
    {
      id: 4,
      title: "The Multi-Step Task Challenge",
      description: "Design a prompt using I.N.S.Y.N.C. that guides the AI through a complex, multi-step process.",
      startingPrompt: "Help me plan a project",
      successCriteria: [
        "Intent: Clear goal for project planning",
        "Nuance: Specific steps and decision points",
        "Style: Appropriate guidance tone",
        "You as...: Role as project management expert",
        "Narrative Format: Structured multi-step output",
        "Context: Project type and constraints"
      ],
      difficulty: 'intermediate',
      category: 'analysis',
      tips: [
        "Use Narrative Format to specify step-by-step structure",
        "Include decision points in Nuance",
        "Define the AI's role in You as..."
      ]
    },
    {
      id: 5,
      title: "The Creative Constraint Challenge",
      description: "Create a prompt using I.N.S.Y.N.C. with creative constraints to guide the AI's output.",
      startingPrompt: "Write a story",
      successCriteria: [
        "Intent: Clear creative goal and genre",
        "Nuance: Specific creative constraints and boundaries",
        "Style: Defined genre/tone requirements",
        "You as...: Role as creative writer/storyteller",
        "Narrative Format: Structured creative format",
        "Context: Setting and character constraints"
      ],
      difficulty: 'advanced',
      category: 'creative',
      tips: [
        "Use Nuance to define creative boundaries",
        "Specify genre requirements in Style",
        "Include setting/character constraints in Context"
      ]
    }
  ];

  const toggleChallenge = (id: number) => {
    setActiveChallenge(activeChallenge === id ? null : id);
    if (activeChallenge !== id) {
      setUserPrompts(prev => ({
        ...prev,
        [id]: challenges.find(c => c.id === id)?.startingPrompt || ''
      }));
    }
  };

  const toggleTips = (id: number) => {
    setShowTips(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSubmit = async (e: React.FormEvent, id: number) => {
    e.preventDefault();
    const userPrompt = userPrompts[id] || '';
    const challenge = challenges.find(c => c.id === id);
    if (!userPrompt || !challenge) return;

    setIsEvaluating(prev => ({ ...prev, [id]: true }));

    try {
      const result = await api.post<EvaluationResult>(
        '/api/chat/evaluate-challenge',
        {
          userPrompt: userPrompt,
          challenge: challenge.description,
          successCriteria: challenge.successCriteria,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey || ''}`,
          },
        }
      );

      setEvaluationResults(prev => ({ ...prev, [id]: result }));
    } catch (error: any) {
      console.error('Failed to evaluate challenge:', error);
      // Set error state to show in the UI
setEvaluationResults(prev => ({
        ...prev,
        [id]: {
          success: false,
          feedback: error.message || 'Failed to evaluate challenge',
          score: 0,
          criteriaEvaluation: []
        }
      }));
    } finally {
      setIsEvaluating(prev => ({ ...prev, [id]: false }));
    }
  };





  const getCategoryIcon = (category: string) => {
    const icons = {
      writing: <span className="text-blue-400">✍️</span>,
      coding: <span className="text-purple-400">💻</span>,
      analysis: <span className="text-amber-400">🔍</span>,
      creative: <span className="text-pink-400">🎨</span>
    };
    
    return icons[category as keyof typeof icons] || '📝';
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6 rounded-lg border border-gray-700">
        <div className="flex items-start">
          <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
            <Zap className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Prompt Engineering Challenges</h2>
            <p className="text-gray-300">
              Practice and improve your prompt crafting skills with these structured exercises. 
              Each challenge focuses on a different aspect of effective prompt engineering.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {challenges.map(challenge => (
          <div 
            key={challenge.id} 
            className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden transition-all duration-200"
          >
            <div
              onClick={() => toggleChallenge(challenge.id)}
              className="w-full text-left p-4 hover:bg-gray-700/50 transition-colors flex justify-between items-center cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="text-lg">
                  {getCategoryIcon(challenge.category)}
                </div>
                <div>
                  <h3 className="font-semibold text-white">{challenge.title}</h3>
                  <div className="flex items-center space-x-2">
                    {challenge.tips && challenge.tips.length > 0 && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTips(challenge.id);
                        }}
                        className="text-xs px-2 py-1 rounded-full bg-blue-900/30 text-blue-400 hover:bg-blue-800/40 transition-colors cursor-pointer"
                      >
                        {showTips[challenge.id] ? 'Hide Tips' : 'Show Tips'}
                      </span>
                    )}
                    <ChevronRight 
                      className={`w-4 h-4 text-gray-400 transition-transform ${activeChallenge === challenge.id ? 'transform rotate-90' : ''}`} 
                    />
                  </div>
                </div>
              </div>
              <ChevronRight 
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  activeChallenge === challenge.id ? 'transform rotate-90' : ''
                }`} 
              />
            </div>
            {activeChallenge === challenge.id && (
              <div className="p-4 bg-gray-800/80 border-t border-gray-700">
                <h4 className="text-sm font-medium text-gray-400">Starting Prompt</h4>
                <CopyButton textToCopy={challenge.startingPrompt} />
              </div>
            )}
            {activeChallenge === challenge.id && (
              <div className="bg-gray-900 p-3 rounded text-sm text-gray-300 font-mono">
                {challenge.startingPrompt}
              </div>
            )}
            {showTips[challenge.id] && challenge.tips && challenge.tips.length > 0 && (
              <div className="p-4 bg-gray-800/80 border-t border-gray-700">
                <h4 className="text-sm font-medium text-blue-400 mb-2 flex items-center">
                  <span className="mr-2">💡</span> Tips for this challenge:
                </h4>
                <ul className="text-sm text-gray-300 space-y-1.5 pl-5 list-disc">
                  {challenge.tips.map((tip, tipIndex) => (
                    <li key={tipIndex}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
            {activeChallenge === challenge.id && (
              <div className="p-4 bg-gray-800/50 border-t border-gray-700">
                <form onSubmit={(e) => handleSubmit(e, challenge.id)} className="space-y-4">
                  <div>
                    <label htmlFor={`prompt-${challenge.id}`} className="block text-sm font-medium text-gray-400 mb-1">
                      Your Improved Prompt
                    </label>
                    <div className="relative">
                      <textarea
                        id={`prompt-${challenge.id}`}
                        value={userPrompts[challenge.id] || ''}
                        onChange={(e) => setUserPrompts(prev => ({ ...prev, [challenge.id]: e.target.value }))}
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                        placeholder="Enter your improved prompt here..."
                      />
                      <div className="absolute bottom-2 right-2">
                        <CopyButton textToCopy={userPrompts[challenge.id] || ''} />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center disabled:bg-blue-800 disabled:cursor-not-allowed"
                    disabled={isEvaluating[challenge.id] || !userPrompts[challenge.id]?.trim()}
                  >
                    {isEvaluating[challenge.id] ? (
                      <>
                        <Zap className="w-4 h-4 mr-2 animate-ping" />
                        Evaluating...
                      </>
                    ) : (
                      <>
                        <Star className="w-4 h-4 mr-2" />
                        Submit for Feedback
                      </>
                    )}
                  </button>
                </form>

                {evaluationResults[challenge.id] && (
                  <div className="mt-6 p-4 bg-gray-900/70 rounded-lg border border-gray-700">
                    <h4 className="text-md font-semibold text-blue-300 mb-3">Evaluation Feedback</h4>
                    <div className="flex items-baseline mb-3">
                      <p className="text-lg font-bold text-white mr-2">Score: {evaluationResults[challenge.id]?.score}/100</p>
                      <p className="text-sm text-gray-400">{evaluationResults[challenge.id]?.feedback}</p>
                    </div>
                    {evaluationResults[challenge.id]?.criteriaEvaluation && (
                      <div className="mt-4">
                        <h5 className="text-sm font-medium text-gray-300 mb-2">Criteria Evaluation:</h5>
                        <ul className="space-y-2">
                          {evaluationResults[challenge.id]?.criteriaEvaluation.map((criteria, idx) => (
                            <li key={idx} className="flex items-start">
                              {criteria.met ? (
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                              ) : (
                                <XCircle className="w-4 h-4 text-red-400 mt-0.5 mr-2 flex-shrink-0" />
                              )}
                              <div>
                                <span className="text-sm text-gray-200">{criteria.criteria}</span>
                                {criteria.feedback && (
                                  <p className="text-xs text-gray-400 mt-0.5">{criteria.feedback}</p>
                                )}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-6 rounded-lg border border-gray-700 mt-8">
        <div className="flex items-start">
          <div className="bg-purple-500/20 p-2 rounded-lg mr-4">
            <AlertCircle className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Challenge Yourself</h3>
            <p className="text-gray-300 mb-3">
              Try completing all challenges and compare your solutions with others. 
              The more you practice, the better you'll become at crafting effective prompts.
            </p>
            <div className="flex items-center text-sm text-purple-300">
              <span className="inline-block w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
              Tip: Come back to these challenges after completing the course to see how your skills have improved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptChallenges;
