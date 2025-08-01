import React, { useState, useEffect, useMemo } from 'react';
import { Search, Star, ArrowRight } from 'lucide-react';
import CopyButton from '../../../CopyButton';
import FormattedInsyncExample from './FormattedInsyncExample';

export type PatternCategory = 'all' | 'insync' | 'structure' | 'creativity' | 'analysis' | 'productivity' | 'education';
export type PatternDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface PromptPattern {
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

interface PromptPatternLibraryProps {
  patterns?: PromptPattern[];
}

const PromptPatternLibrary: React.FC<PromptPatternLibraryProps> = ({ patterns }) => {
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
    { id: 'insync', label: 'INSYNC Framework' },
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
      } finally {
        setIsLoading(false);
      }
    };

    if (patterns) {
      setAllPatterns(patterns);
      setIsLoading(false);
    } else {
      fetchPatterns();
    }
  }, [patterns]);

  const toggleCategory = (category: PatternCategory) => {
    if (category === 'all') {
      setSelectedCategories(['all']);
    } else {
      setSelectedCategories(prev => {
        const newCategories = prev.filter(c => c !== 'all');
        if (newCategories.includes(category)) {
          const updated = newCategories.filter(c => c !== category);
          // If no categories are left, default to 'all'
          return updated.length === 0 ? ['all'] : updated;
        } else {
          return [...newCategories, category];
        }
      });
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const filteredPatterns = useMemo(() => {
    return allPatterns
      .map(p => ({ ...p, isFavorite: favorites.has(p.id) }))
      .filter(pattern => {
        if (favoritesOnly && !pattern.isFavorite) {
          return false;
        }
        if (selectedDifficulty !== 'all' && pattern.difficulty !== selectedDifficulty) {
          return false;
        }
        const categoryMatch =
          selectedCategories.includes('all') ||
          selectedCategories.length === 0 ||
          selectedCategories.some(cat => pattern.category.includes(cat));
        if (!categoryMatch) {
          return false;
        }
        if (searchQuery && !pattern.name.toLowerCase().includes(searchQuery.toLowerCase()) && !pattern.description.toLowerCase().includes(searchQuery.toLowerCase()) && !pattern.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))) {
          return false;
        }
        return true;
      });
  }, [allPatterns, searchQuery, selectedCategories, selectedDifficulty, favoritesOnly, favorites]);

  const getDifficultyColor = (difficulty: PatternDifficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-900/50 text-green-300 border-green-700/50';
      case 'intermediate': return 'bg-yellow-900/50 text-yellow-300 border-yellow-700/50';
      case 'advanced': return 'bg-red-900/50 text-red-300 border-red-700/50';
    }
  };

  const getCategoryColor = (category: PatternCategory) => {
    switch (category) {
      case 'insync': return 'bg-blue-900/50 text-blue-300';
      case 'structure': return 'bg-indigo-900/50 text-indigo-300';
      case 'creativity': return 'bg-purple-900/50 text-purple-300';
      case 'analysis': return 'bg-pink-900/50 text-pink-300';
      case 'productivity': return 'bg-teal-900/50 text-teal-300';
      case 'education': return 'bg-gray-700 text-gray-300';
      default: return 'bg-gray-700 text-gray-300';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-700/50 text-red-300 px-4 py-3 rounded-lg relative" role="alert">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline ml-2">{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white p-4 sm:p-6 rounded-xl border border-gray-700/50 font-sans">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Prompt Pattern Library</h2>
        <p className="text-gray-400 mt-1">Explore and adapt powerful prompt engineering patterns.</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        {/* Search Input */}
        <div className="lg:col-span-2">
          <label htmlFor="search-patterns" className="block text-sm font-medium text-gray-400 mb-1.5">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              id="search-patterns"
              type="text"
              placeholder="Search by name, tag, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 border border-gray-600 rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label htmlFor="difficulty-filter" className="block text-sm font-medium text-gray-400 mb-1.5">Difficulty</label>
          <select
            id="difficulty-filter"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as PatternDifficulty | 'all')}
            className="w-full bg-gray-900 border border-gray-600 rounded-md pl-3 pr-8 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none"
          >
            {difficulties.map(d => (
              <option key={d.id} value={d.id}>{d.label}</option>
            ))}
          </select>
        </div>

        {/* Favorites Toggle */}
        <div className="flex items-end">
          <button
            onClick={() => setFavoritesOnly(!favoritesOnly)}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md transition border ${favoritesOnly ? 'bg-yellow-900/50 border-yellow-700 text-yellow-300' : 'bg-gray-700/50 border-gray-600 hover:bg-gray-700'}`}
          >
            <Star className={`w-5 h-5 ${favoritesOnly ? 'fill-current' : ''}`} />
            Favorites
          </button>
        </div>

        {/* Category Filters */}
        <div className="lg:col-span-4">
          <label className="block text-sm font-medium text-gray-400 mb-1.5">Categories</label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200 border ${selectedCategories.includes(category.id) ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-700/50 text-gray-300 border-gray-600 hover:bg-gray-700 hover:border-gray-500'}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pattern Grid */}
      {filteredPatterns.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPatterns.map(pattern => (
            <div key={pattern.id} className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 flex flex-col justify-between hover:border-blue-500/50 transition-colors duration-300">
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-gray-100 flex-1 pr-2">{pattern.name}</h3>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getDifficultyColor(pattern.difficulty)}`}>
                    {pattern.difficulty}
                  </span>
                </div>
                
                <p className="text-sm text-gray-400 mb-4 h-10 overflow-hidden">{pattern.description}</p>
                
                <div className="flex justify-between items-center mb-2">
                  <div className="flex flex-wrap gap-1.5">
                    {pattern.category.map(cat => (
                      <span 
                        key={cat} 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(cat)}`}
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
                        <FormattedInsyncExample example={pattern.example} />    
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
