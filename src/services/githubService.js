/**
 * GitHub Service untuk fetch repositories
 * Ganti YOUR_GITHUB_USERNAME dengan username GitHub lu
 */

class GitHubService {
  constructor(username) {
    this.username = username;
    this.apiUrl = 'https://api.github.com';
  }

  // Fetch semua repositories
  async getAllRepos() {
    try {
      const response = await fetch(
        `${this.apiUrl}/users/${this.username}/repos?sort=updated&per_page=100`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const repos = await response.json();
      return this.formatRepos(repos);
    } catch (error) {
      console.error('Error fetching repos:', error);
      return [];
    }
  }

  // Format repo data
  formatRepos(repos) {
    return repos.map(repo => ({
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description || 'No description',
      url: repo.html_url,
      homepage: repo.homepage,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      topics: repo.topics || [],
      createdAt: new Date(repo.created_at).toLocaleDateString('id-ID'),
      updatedAt: new Date(repo.updated_at).toLocaleDateString('id-ID'),
      isPrivate: repo.private,
      isFork: repo.fork,
      size: repo.size
    }));
  }

  // Filter blockchain/crypto projects
  getBlockchainRepos(repos) {
    const blockchainKeywords = [
      'blockchain', 'crypto', 'web3', 'defi', 'nft', 'ethereum', 
      'bitcoin', 'solana', 'polygon', 'avalanche', 'cosmos', 
      'validator', 'node', 'testnet', 'mainnet', 'staking',
      'newton', 'nexus', 'miden', 'anoma', 'kuzco', 'destra',
      'bot', 'mining', 'faucet', 'airdrop'
    ];

    return repos.filter(repo => {
      const searchText = `${repo.name} ${repo.description} ${repo.topics.join(' ')}`.toLowerCase();
      return blockchainKeywords.some(keyword => searchText.includes(keyword));
    });
  }

  // Get featured repos (most stars, recent activity)
  getFeaturedRepos(repos, limit = 6) {
    return repos
      .filter(repo => !repo.isFork) // Exclude forks
      .sort((a, b) => {
        // Sort by stars first, then by recent updates
        if (a.stars !== b.stars) return b.stars - a.stars;
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      })
      .slice(0, limit);
  }

  // Get stats
  getStats(repos) {
    const languages = {};
    let totalStars = 0;
    let totalForks = 0;

    repos.forEach(repo => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
      totalStars += repo.stars;
      totalForks += repo.forks;
    });

    return {
      totalRepos: repos.length,
      totalStars,
      totalForks,
      languages: Object.entries(languages)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5), // Top 5 languages
      publicRepos: repos.filter(r => !r.isPrivate).length,
      blockchainRepos: this.getBlockchainRepos(repos).length
    };
  }
}

export default GitHubService;
