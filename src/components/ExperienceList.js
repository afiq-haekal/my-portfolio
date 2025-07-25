import React, { useState, useEffect } from 'react';
import GitHubService from '../services/githubService';

const ExperienceList = ({ username = 'afiq-haekal' }) => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true);
      try {
        const githubService = new GitHubService(username);
        const repos = await githubService.getAllRepos();
        const blockchainRepos = githubService.getBlockchainRepos(repos);
        
        // Convert repos to experiences
        const generatedExperiences = blockchainRepos
          .filter(repo => !repo.isFork && repo.description) // Only original repos with descriptions
          .slice(0, 10) // Limit to top 10
          .map((repo, index) => ({
            id: repo.id,
            project: repo.name.charAt(0).toUpperCase() + repo.name.slice(1).replace(/[-_]/g, ' '),
            role: determineRole(repo),
            period: formatPeriod(repo.createdAt, repo.updatedAt),
            description: repo.description || 'Blockchain project development and testing.',
            technologies: determineTechnologies(repo),
            achievements: generateAchievements(repo),
            status: determineStatus(repo),
            icon: getProjectIcon(repo),
            repo: repo, // Keep original repo data
            url: repo.url,
            homepage: repo.homepage
          }));

        setExperiences(generatedExperiences);
        setError(null);
      } catch (err) {
        setError('Failed to fetch experiences from GitHub');
        console.error(err);
        // Fallback to empty array instead of hardcoded data
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [username]);

  // Helper functions to determine project details
  const determineRole = (repo) => {
    const name = repo.name.toLowerCase();
    const desc = (repo.description || '').toLowerCase();
    
    if (name.includes('validator') || desc.includes('validator')) return 'Validator';
    if (name.includes('node') || desc.includes('node')) return 'Node Operator';
    if (name.includes('bot') || desc.includes('bot')) return 'Bot Developer';
    if (name.includes('mining') || desc.includes('mining')) return 'Miner';
    if (name.includes('test') || desc.includes('testnet')) return 'Testnet Participant';
    if (name.includes('faucet') || desc.includes('faucet')) return 'Faucet Operator';
    return 'Developer';
  };

  const determineTechnologies = (repo) => {
    const techs = [];
    
    // Based on language
    if (repo.language) techs.push(repo.language);
    
    // Based on repo name/description
    const content = `${repo.name} ${repo.description || ''}`.toLowerCase();
    
    if (content.includes('cosmos') || content.includes('tendermint')) techs.push('Cosmos SDK');
    if (content.includes('solana') || content.includes('anchor')) techs.push('Solana');
    if (content.includes('ethereum') || content.includes('solidity')) techs.push('Ethereum');
    if (content.includes('rust')) techs.push('Rust');
    if (content.includes('docker')) techs.push('Docker');
    if (content.includes('node') || content.includes('validator')) techs.push('Blockchain');
    if (content.includes('web3')) techs.push('Web3');
    if (content.includes('defi')) techs.push('DeFi');
    if (content.includes('zkvm') || content.includes('zk')) techs.push('Zero Knowledge');
    
    // Add topics as technologies
    if (repo.topics) {
      repo.topics.forEach(topic => {
        if (!techs.some(tech => tech.toLowerCase() === topic.toLowerCase())) {
          techs.push(topic.charAt(0).toUpperCase() + topic.slice(1));
        }
      });
    }
    
    return techs.slice(0, 5); // Limit to 5 techs
  };

  const generateAchievements = (repo) => {
    const achievements = [];
    
    if (repo.stars > 5) achievements.push(`${repo.stars} GitHub stars earned`);
    if (repo.forks > 2) achievements.push(`${repo.forks} community forks`);
    if (repo.watchers > 3) achievements.push(`${repo.watchers} active watchers`);
    
    // Based on repo activity
    const daysSinceUpdate = Math.floor((new Date() - new Date(repo.updatedAt)) / (1000 * 60 * 60 * 24));
    if (daysSinceUpdate < 7) achievements.push('Recently active development');
    if (daysSinceUpdate < 30) achievements.push('Regular maintenance');
    
    // Based on size (assuming larger repos = more work)
    if (repo.size > 1000) achievements.push('Substantial codebase contribution');
    
    // Default achievements if none generated
    if (achievements.length === 0) {
      achievements.push('Project implementation');
      achievements.push('Code repository maintenance');
    }
    
    return achievements.slice(0, 4); // Limit to 4 achievements
  };

  const determineStatus = (repo) => {
    const daysSinceUpdate = Math.floor((new Date() - new Date(repo.updatedAt)) / (1000 * 60 * 60 * 24));
    return daysSinceUpdate < 90 ? 'active' : 'completed'; // Active if updated in last 3 months
  };

  const getProjectIcon = (repo) => {
    const name = repo.name.toLowerCase();
    const desc = (repo.description || '').toLowerCase();
    
    if (name.includes('newton') || desc.includes('newton')) return '🔬';
    if (name.includes('nexus') || desc.includes('nexus')) return '🌐';
    if (name.includes('miden') || desc.includes('miden')) return '🔐';
    if (name.includes('anoma') || desc.includes('anoma')) return '🎯';
    if (name.includes('kuzco') || desc.includes('kuzco')) return '🦙';
    if (name.includes('destra') || desc.includes('destra')) return '⚡';
    if (name.includes('bot') || desc.includes('bot')) return '🤖';
    if (name.includes('validator') || desc.includes('validator')) return '✅';
    if (name.includes('node') || desc.includes('node')) return '🖥️';
    if (name.includes('mining') || desc.includes('mining')) return '⛏️';
    if (name.includes('faucet') || desc.includes('faucet')) return '💧';
    if (name.includes('web') || desc.includes('website')) return '🌍';
    return '🚀'; // Default icon
  };

  const formatPeriod = (createdAt, updatedAt) => {
    const created = new Date(createdAt);
    const updated = new Date(updatedAt);
    const now = new Date();
    
    const createdYear = created.getFullYear();
    const updatedYear = updated.getFullYear();
    
    // If updated recently (within 6 months), show as "Present"
    const monthsSinceUpdate = Math.floor((now - updated) / (1000 * 60 * 60 * 24 * 30));
    
    if (monthsSinceUpdate < 6) {
      return `${createdYear} - Present`;
    } else if (createdYear === updatedYear) {
      return `${createdYear}`;
    } else {
      return `${createdYear} - ${updatedYear}`;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-600 bg-opacity-80 text-green-100 border border-green-400';
      case 'completed':
        return 'bg-blue-600 bg-opacity-80 text-blue-100 border border-blue-400';
      default:
        return 'bg-gray-600 bg-opacity-80 text-gray-100 border border-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'ACTIVE';
      case 'completed':
        return 'COMPLETED';
      default:
        return 'UNKNOWN';
    }
  };

  // Translation function for auto-translating Indonesian to English
  const translateToEnglish = (text) => {
    if (!text) return text;
    
    const translations = {
      // Common Indonesian words/phrases
      'pengembangan': 'development',
      'proyek': 'project',
      'blockchain': 'blockchain',
      'node': 'node',
      'validator': 'validator',
      'aplikasi': 'application',
      'sistem': 'system',
      'jaringan': 'network',
      'komunitas': 'community',
      'kontribusi': 'contributions',
      'dokumentasi': 'documentation',
      'perbaikan': 'improvements',
      'keamanan': 'security',
      'performa': 'performance',
      'optimisasi': 'optimization',
      'implementasi': 'implementation',
      'maintenance': 'maintenance',
      'pemeliharaan': 'maintenance',
      'repo': 'repository',
      'kode': 'code',
      'fitur': 'feature',
      'bug': 'bug',
      'laporan': 'reports',
      'pengujian': 'testing',
      'benchmarking': 'benchmarking',
      'stress': 'stress',
      'early': 'early',
      'adopter': 'adopter',
      'rewards': 'rewards',
      'building': 'building',
      'membangun': 'building'
    };

    let translatedText = text;
    Object.entries(translations).forEach(([indonesian, english]) => {
      const regex = new RegExp(indonesian, 'gi');
      translatedText = translatedText.replace(regex, english);
    });

    return translatedText;
  };

  return (
    <div className="space-y-8">
      {loading && (
        <div className="text-center py-16">
          <div className="relative mx-auto w-16 h-16 mb-6">
            <div className="absolute inset-0 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-blue-600 border-t-transparent rounded-full animate-spin animation-delay-150"></div>
            <div className="absolute inset-4 border-4 border-purple-600 border-t-transparent rounded-full animate-spin animation-delay-300"></div>
          </div>
          <p className="text-gray-300 text-lg">Scanning GitHub repositories...</p>
          <p className="text-gray-500 text-sm mt-2">Analyzing blockchain projects and contributions</p>
        </div>
      )}

      {error && (
        <div className="bg-red-900 bg-opacity-50 border border-red-500 rounded-xl p-6 text-center backdrop-blur-sm">
          <p className="text-red-300 mb-2">❌ {error}</p>
          <p className="text-sm text-gray-400">Check your GitHub username and internet connection</p>
        </div>
      )}

      {!loading && !error && experiences.length === 0 && (
        <div className="bg-yellow-900 bg-opacity-50 border border-yellow-500 rounded-xl p-6 text-center backdrop-blur-sm">
          <p className="text-yellow-300 mb-2">🔍 No blockchain projects found</p>
          <p className="text-sm text-gray-400">Make sure your GitHub repos have blockchain-related keywords in names or descriptions</p>
        </div>
      )}

      {!loading && experiences.length > 0 && (
        <>
          <div className="bg-gradient-to-r from-green-900 to-emerald-900 bg-opacity-50 border border-green-500 rounded-xl p-4 mb-8 backdrop-blur-sm">
            <p className="text-green-300 text-sm">
              ✅ Displaying {experiences.length} blockchain projects auto-fetched from GitHub (@{username})
            </p>
          </div>

          <div className="grid gap-6">
            {experiences.map((exp) => (
              <div key={exp.id} className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-cyan-500 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="text-3xl mr-4 filter drop-shadow-lg">{exp.icon}</div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-white">{exp.project}</h3>
                        <a 
                          href={exp.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          🔗
                        </a>
                      </div>
                      <p className="text-gray-300">{exp.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm ${getStatusColor(exp.status)}`}>
                      {getStatusText(exp.status)}
                    </span>
                    <p className="text-sm text-gray-400 mt-1">{exp.period}</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">{translateToEnglish(exp.description)}</p>

                <div className="mb-6">
                  <h4 className="text-sm font-bold text-cyan-400 mb-3">TECH STACK:</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, index) => (
                      <span key={index} className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-bold text-green-400 mb-3">KEY ACHIEVEMENTS:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, index) => (
                      <li key={index} className="text-gray-300 text-sm flex items-center">
                        <span className="text-green-400 mr-3">▶</span>
                        {translateToEnglish(achievement)}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* GitHub stats with sci-fi styling */}
                <div className="border-t border-gray-700 pt-4 mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex space-x-6">
                      <span className="text-yellow-400">⭐ {exp.repo.stars}</span>
                      <span className="text-blue-400">🍴 {exp.repo.forks}</span>
                      <span className="text-purple-400">👁️ {exp.repo.watchers}</span>
                    </div>
                    {exp.homepage && (
                      <a 
                        href={exp.homepage} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 font-medium transition-colors"
                      >
                        🌐 Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ExperienceList;
