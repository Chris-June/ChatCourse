import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, Star, Filter, ArrowRight } from 'lucide-react';
import CopyButton from '../../../CopyButton';

type PatternCategory = 'all' | 'structure' | 'creativity' | 'analysis' | 'productivity' | 'education';
type PatternDifficulty = 'beginner' | 'intermediate' | 'advanced';

interface PromptPattern {
  id: string;
  name: string;
  description: string;
  category: PatternCategory[];
  difficulty: PatternDifficulty;
  example: string;
  useCase: string;
  tags: string[];
  isFavorite?: boolean;
}

/**
 * PromptPatternLibrary
 * 
 * A searchable library of effective prompt patterns that users can explore and adapt.
 * Includes filtering by category, difficulty, and search functionality.
 * 
 * @component
 * @example
 * return (
 *   <PromptPatternLibrary />
 * )
 */
const PromptPatternLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<PatternCategory[]>(['all']);
  const [selectedDifficulty, setSelectedDifficulty] = useState<PatternDifficulty | 'all'>('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allPatterns, setAllPatterns] = useState<PromptPattern[]>([]);
  const [expandedPattern, setExpandedPattern] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const categories: { id: PatternCategory; label: string }[] = [
    { id: 'all', label: 'All Categories' },
    { id: 'structure', label: 'Structure' },
    { id: 'creativity', label: 'Creativity' },
    { id: 'analysis', label: 'Analysis' },
    { id: 'productivity', label: 'Productivity' },
    { id: 'education', label: 'Education' },
  ];

  const difficulties: { id: PatternDifficulty | 'all'; label: string }[] = [
    { id: 'all', label: 'All Levels' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
  ];

  useEffect(() => {
    const fetchPatterns = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL === '/api' 
          ? '' 
          : import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        const endpoint = apiBaseUrl 
          ? `${apiBaseUrl}${apiBaseUrl.endsWith('/') ? '' : '/'}api/chat/get-patterns`
          : '/api/chat/get-patterns';

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Failed to fetch prompt patterns: ${response.status}`);
        }
        const data = await response.json();
        setAllPatterns(data);
      } catch (err) {
        console.error('Error fetching patterns:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        
        // Fallback to mock data if API fails
        const mockPatterns: PromptPattern[] = [
          {
            id: '1',
            name: 'Chain of Thought',
            description: 'Encourage step-by-step reasoning by asking the AI to show its thinking process.',
            category: ['structure', 'analysis'],
            difficulty: 'beginner',
            example: 'Let\'s think step by step: How would you solve this math problem? 2x + 5 = 15',
            useCase: 'Detailed problem solving',
            tags: ['reasoning', 'step-by-step', 'thinking']
          },
          {
            id: '2',
            name: 'Role-Based Prompting',
            description: 'Assign a specific role or expertise to the AI to get more targeted responses.',
            category: ['structure', 'creativity'],
            difficulty: 'intermediate',
            example: 'As a senior software architect, design a scalable microservices architecture for an e-commerce platform.',
            useCase: 'Expert perspective',
            tags: ['role-playing', 'expertise', 'perspective']
          },
          {
            id: '3',
            name: 'Few-Shot Learning',
            description: 'Provide examples to guide the AI\'s response format and style.',
            category: ['structure', 'education'],
            difficulty: 'intermediate',
            example: 'Here are some examples:\n\nExample 1: Input: "Hello" → Output: "Hi there!"\nExample 2: Input: "Goodbye" → Output: "See you later!"\n\nNow: Input: "How are you?" →',
            useCase: 'Consistent formatting',
            tags: ['examples', 'learning', 'format']
          }
        ];
        setAllPatterns(mockPatterns);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatterns();
  }, []);

  const toggleCategory = (category: PatternCategory) => {
    if (category === 'all') {
      setSelectedCategories(['all']);
    } else if (selectedCategories.includes('all')) {
      setSelectedCategories([category]);
    } else if (selectedCategories.includes(category)) {
      if (selectedCategories.length === 1) {
        setSelectedCategories(['all']);
      } else {
        setSelectedCategories(selectedCategories.filter(c => c !== category));
      }
    } else {
      setSelectedCategories([...selectedCategories.filter(c => c !== 'all'), category]);
    }
  };

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (favorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const filteredPatterns = useMemo(() => {
    return allPatterns.filter(pattern => {
      const matchesSearch = 
        pattern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pattern.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pattern.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = 
        selectedCategories.includes('all') || 
        pattern.category.some(cat => selectedCategories.includes(cat));

      const matchesDifficulty = 
        selectedDifficulty === 'all' || 
        pattern.difficulty === selectedDifficulty;

      const matchesFavorites = !favoritesOnly || favorites.has(pattern.id);
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesFavorites;
    });
  }, [searchQuery, selectedCategories, selectedDifficulty, favoritesOnly, favorites, allPatterns]);

  const getDifficultyColor = (difficulty: PatternDifficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-900/30 text-green-400';
      case 'intermediate': return 'bg-yellow-900/30 text-yellow-400';
      case 'advanced': return 'bg-red-900/30 text-red-400';
      default: return 'bg-gray-700/50 text-gray-300';
    }
  };

  const getCategoryColor = (category: PatternCategory) => {
    const colors: Record<PatternCategory, string> = {
      'all': 'bg-gray-100 text-gray-800',
      'structure': 'bg-blue-100 text-blue-800',
      'creativity': 'bg-purple-100 text-purple-800',
      'analysis': 'bg-amber-100 text-amber-800',
      'productivity': 'bg-emerald-100 text-emerald-800',
      'education': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900/30 to-blue-900/30 p-6 rounded-lg border border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Prompt Pattern Library</h2>
            <p className="text-gray-300 max-w-3xl">
              Discover and learn effective prompt patterns to improve your interactions with AI. 
              Each pattern includes examples and use cases to help you apply them effectively.
            </p>
          </div>
          <button 
            onClick={() => setFavoritesOnly(!favoritesOnly)}
            className={`mt-4 md:mt-0 px-4 py-2 rounded-lg flex items-center space-x-2 ${
              favoritesOnly 
                ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/50' 
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70'
            }`}
          >
            <Star className={`w-4 h-4 ${favoritesOnly ? 'fill-yellow-400' : ''}`} />
            <span>{favoritesOnly ? 'Showing Favorites' : 'Show Favorites'}</span>
            {favoritesOnly && favorites.size > 0 && (
              <span className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-0.5 rounded-full">
                {favorites.size}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-1">
              Search Patterns
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
              <input
                type="text"
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search by name, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-white" />
                </button>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Filter by Difficulty
            </label>
            <div className="flex flex-wrap gap-2">
              {difficulties.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setSelectedDifficulty(id as PatternDifficulty | 'all')}
                  className={`px-3 py-1 text-sm rounded-full ${
                    selectedDifficulty === id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center text-sm text-gray-400 mb-2">
            <Filter className="w-4 h-4 mr-2" />
            <span>Categories</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(({ id, label }) => (
              <div
                key={id}
                onClick={() => toggleCategory(id as PatternCategory)}
                className={`px-3 py-1 text-sm rounded-full flex items-center cursor-pointer ${
                  selectedCategories.includes(id as PatternCategory) || 
                  (id === 'all' && selectedCategories.includes('all'))
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {label}
                {selectedCategories.includes(id as PatternCategory) && selectedCategories.length > 1 && id !== 'all' && (
                  <span 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCategory(id as PatternCategory);
                    }}
                    className="ml-1.5 -mr-0.5 p-0.5 rounded-full inline-flex items-center text-blue-200 hover:bg-blue-500 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Patterns Grid */}
      {isLoading ? (
        <div className="text-center py-20 text-gray-500">
          <p>Loading prompt patterns...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-400">
          <p>Error: {error}</p>
        </div>
      ) : filteredPatterns.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatterns.map(pattern => (
            <div key={pattern.id} className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 flex flex-col">
              <div className="p-4 flex-grow">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-white mb-1">{pattern.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(pattern.difficulty)}`}>
                    {pattern.difficulty.charAt(0).toUpperCase() + pattern.difficulty.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-3 h-10 overflow-hidden">{pattern.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {pattern.category.map(cat => (
                      <span 
                        key={cat} 
                        className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(cat)}`}
                      >
                        {categories.find(c => c.id === cat)?.label}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => toggleFavorite(pattern.id)} 
                    className="p-1.5 rounded-full hover:bg-gray-700 transition-colors"
                    aria-label={favorites.has(pattern.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Star 
                      className={`w-5 h-5 ${favorites.has(pattern.id) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'}`} 
                    />
                  </button>
                </div>

                {expandedPattern === pattern.id && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">Example</h4>
                      <div className="relative bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                        <pre className="text-sm text-gray-300 whitespace-pre-wrap">{pattern.example}</pre>
                        <div className="absolute top-2 right-2">
                          <CopyButton textToCopy={pattern.example} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">Best For</h4>
                      <p className="text-sm text-gray-300">{pattern.useCase}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-1">Tags</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {pattern.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-900/30 px-4 py-3 flex justify-between items-center border-t border-gray-700">
                <button
                  onClick={() => setExpandedPattern(expandedPattern === pattern.id ? null : pattern.id)}
                  className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center"
                >
                  {expandedPattern === pattern.id ? 'Show Less' : 'Learn More'}
                  <ArrowRight className={`w-4 h-4 ml-1 transition-transform ${expandedPattern === pattern.id ? 'transform rotate-90' : ''}`} />
                </button>
                
                <CopyButton textToCopy={pattern.example} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-800/30 rounded-lg border border-dashed border-gray-700">
          <Search className="w-10 h-10 mx-auto text-gray-500 mb-3" />
          <h3 className="text-lg font-medium text-gray-300">No patterns found</h3>
          <p className="mt-1 text-gray-500 max-w-md mx-auto">
            Try adjusting your search or filter criteria to find what you're looking for.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategories(['all']);
              setSelectedDifficulty('all');
              setFavoritesOnly(false);
            }}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-400 bg-blue-900/30 hover:bg-blue-800/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptPatternLibrary;
