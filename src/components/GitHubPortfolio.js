import React, { useState, useEffect } from 'react';
import GitHubService from '../services/githubService';

const GitHubPortfolio = ({ username = 'afiq-haekal' }) => {
  const [repos, setRepos] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, blockchain, featured

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const githubService = new GitHubService(username);
        const allRepos = await githubService.getAllRepos();
        const repoStats = githubService.getStats(allRepos);
        
        setRepos(allRepos);
        setStats(repoStats);
        setError(null);
      } catch (err) {
        setError('Failed to fetch repositories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  const getFilteredRepos = () => {
    if (!repos.length) return [];
    
    const githubService = new GitHubService(username);
    
    switch (filter) {
      case 'blockchain':
        return githubService.getBlockchainRepos(repos);
      case 'featured':
        return githubService.getFeaturedRepos(repos, 12);
      default:
        return repos.filter(repo => !repo.isFork).slice(0, 20); // Show non-forks
    }
  };

  const LanguageBadge = ({ language }) => {
    const languageColors = {
      JavaScript: 'from-yellow-400 to-yellow-600',
      Python: 'from-blue-400 to-blue-600',
      Go: 'from-cyan-400 to-cyan-600',
      TypeScript: 'from-blue-500 to-blue-700',
      HTML: 'from-orange-400 to-orange-600',
      CSS: 'from-pink-400 to-pink-600',
      Java: 'from-red-400 to-red-600',
      'C++': 'from-purple-400 to-purple-600',
      Rust: 'from-orange-500 to-orange-700',
      Shell: 'from-gray-400 to-gray-600'
    };
    
    const gradient = languageColors[language] || 'from-gray-400 to-gray-600';
    
    return (
      <span className={`inline-block px-3 py-1 text-xs text-white rounded-full bg-gradient-to-r ${gradient} font-medium shadow-lg`}>
        {language}
      </span>
    );
  };

  const RepoCard = ({ repo }) => (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-cyan-500 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
          <a href={repo.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            {repo.name}
            <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">🔗</span>
          </a>
        </h3>
        {repo.language && <LanguageBadge language={repo.language} />}
      </div>
      
      <p className="text-gray-300 mb-4 text-sm leading-relaxed">
        {repo.description}
      </p>
      
      {repo.topics.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {repo.topics.slice(0, 3).map(topic => (
              <span key={topic} className="inline-block bg-gray-700 bg-opacity-50 text-gray-300 px-2 py-1 rounded-full text-xs border border-gray-600">
                #{topic}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-between items-center text-sm border-t border-gray-700 pt-4">
        <div className="flex space-x-4">
          <span className="text-yellow-400">⭐ {repo.stars}</span>
          <span className="text-blue-400">🍴 {repo.forks}</span>
          <span className="text-purple-400">👁️ {repo.watchers}</span>
        </div>
        <span className="text-gray-500 text-xs">Updated: {repo.updatedAt}</span>
      </div>
      
      {repo.homepage && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <a 
            href={repo.homepage} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
          >
            🌐 Live Demo
            <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </a>
        </div>
      )}
    </div>
  );

  const StatsCard = () => (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-8 mb-12 backdrop-blur-sm">
      <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
        GitHub Statistics
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center p-4 bg-gray-700 bg-opacity-50 rounded-lg">
          <div className="text-3xl font-bold text-cyan-400">{stats.totalRepos}</div>
          <div className="text-sm text-gray-300 mt-1">Total Repos</div>
        </div>
        <div className="text-center p-4 bg-gray-700 bg-opacity-50 rounded-lg">
          <div className="text-3xl font-bold text-yellow-400">{stats.totalStars}</div>
          <div className="text-sm text-gray-300 mt-1">Total Stars</div>
        </div>
        <div className="text-center p-4 bg-gray-700 bg-opacity-50 rounded-lg">
          <div className="text-3xl font-bold text-green-400">{stats.blockchainRepos}</div>
          <div className="text-sm text-gray-300 mt-1">Blockchain Projects</div>
        </div>
        <div className="text-center p-4 bg-gray-700 bg-opacity-50 rounded-lg">
          <div className="text-3xl font-bold text-purple-400">{stats.publicRepos}</div>
          <div className="text-sm text-gray-300 mt-1">Public Repos</div>
        </div>
      </div>
      
      {stats.languages.length > 0 && (
        <div className="mt-8">
          <div className="text-sm text-gray-400 mb-4">TOP LANGUAGES:</div>
          <div className="flex flex-wrap gap-3">
            {stats.languages.map(([lang, count]) => (
              <span key={lang} className="bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 rounded-full text-sm font-medium text-white">
                {lang} ({count})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="relative mx-auto w-16 h-16 mb-6">
          <div className="absolute inset-0 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-blue-600 border-t-transparent rounded-full animate-spin animation-delay-150"></div>
          <div className="absolute inset-4 border-4 border-purple-600 border-t-transparent rounded-full animate-spin animation-delay-300"></div>
        </div>
        <p className="text-gray-300 text-lg">Scanning GitHub repositories...</p>
        <p className="text-gray-500 text-sm mt-2">Fetching project data from the matrix...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="bg-red-900 bg-opacity-50 border border-red-500 rounded-xl p-8 backdrop-blur-sm">
          <p className="text-red-300 mb-4 text-lg">❌ {error}</p>
          <p className="text-gray-400">Make sure to update the username in GitHubPortfolio component!</p>
        </div>
      </div>
    );
  }

  const filteredRepos = getFilteredRepos();

  return (
    <div className="w-full">
      {stats && <StatsCard />}
      
      {/* Filter Buttons with Sci-Fi Style */}
      <div className="flex justify-center mb-12">
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-xl p-2 flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-lg transition-all duration-300 font-medium ${
              filter === 'all' 
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            All Projects ({repos.filter(r => !r.isFork).length})
          </button>
          <button
            onClick={() => setFilter('blockchain')}
            className={`px-6 py-3 rounded-lg transition-all duration-300 font-medium ${
              filter === 'blockchain' 
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/20' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            Blockchain ({stats?.blockchainRepos || 0})
          </button>
          <button
            onClick={() => setFilter('featured')}
            className={`px-6 py-3 rounded-lg transition-all duration-300 font-medium ${
              filter === 'featured' 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            Featured
          </button>
        </div>
      </div>

      {/* Repository Grid */}
      {filteredRepos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRepos.map(repo => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-yellow-900 bg-opacity-50 border border-yellow-500 rounded-xl p-8 backdrop-blur-sm">
            <p className="text-yellow-300 text-lg mb-2">🔍 No repositories found</p>
            <p className="text-gray-400">Try selecting a different filter or check your GitHub repositories</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GitHubPortfolio;
