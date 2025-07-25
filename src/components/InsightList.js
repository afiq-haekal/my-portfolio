import React, { useState, useEffect } from 'react';
import GitHubService from '../services/githubService';

const InsightList = ({ username = 'afiq-haekal' }) => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedInsights, setExpandedInsights] = useState(new Set());

  useEffect(() => {
    const generateInsights = async () => {
      setLoading(true);
      try {
        const githubService = new GitHubService(username);
        const repos = await githubService.getAllRepos();
        const blockchainRepos = githubService.getBlockchainRepos(repos);
        
        // Generate insights from real GitHub data
        const generatedInsights = [];
        let insightId = 1;

        // Performance insights based on active repos
        const activeRepos = blockchainRepos.filter(repo => {
          const daysSinceUpdate = Math.floor((new Date() - new Date(repo.updatedAt)) / (1000 * 60 * 60 * 24));
          return daysSinceUpdate < 90;
        });

        if (activeRepos.length > 0) {
          const latestRepo = activeRepos[0];
          const safeDate = latestRepo.updatedAt && !isNaN(new Date(latestRepo.updatedAt)) 
            ? new Date(latestRepo.updatedAt) 
            : new Date();
          
          generatedInsights.push({
            id: insightId++,
            title: `What I've Learned Running ${activeRepos.length} Active Blockchain Projects`,
            category: 'Experience',
            date: safeDate.toISOString(),
            preview: `Hey there! So I've been juggling ${activeRepos.length} different blockchain projects lately, and man, it's been quite a ride. The biggest lesson? Always expect the unexpected...`,
            fullContent: `Hey there! So I've been juggling ${activeRepos.length} different blockchain projects lately, and man, it's been quite a ride. The biggest lesson? Always expect the unexpected.

Running multiple validators simultaneously taught me that hardware isn't everything - network reliability is KING. I learned this the hard way when my main validator went offline during a crucial epoch because my ISP decided to have "maintenance" at 3 AM.

The most recent project I've been working on is ${latestRepo.name}, and honestly, it's been teaching me so much about ${latestRepo.language || 'blockchain development'}. What started as a simple ${latestRepo.description || 'blockchain experiment'} turned into a deep dive into protocol-level optimizations.

Pro tip: If you're running validators, always have a backup internet connection. Trust me on this one - I've lost count of how many times my mobile hotspot saved my uptime stats!`,
            tags: activeRepos.slice(0, 3).map(repo => repo.name),
            readTime: '4 min read',
            icon: '⚡',
            repoCount: activeRepos.length
          });
        }

        // Strategy insights based on repository patterns
        const testnetRepos = blockchainRepos.filter(repo => 
          repo.name.toLowerCase().includes('test') || 
          (repo.description && repo.description.toLowerCase().includes('testnet'))
        );

        if (testnetRepos.length > 0) {
          const testnetRepo = testnetRepos[0];
          const safeDate = testnetRepo.createdAt && !isNaN(new Date(testnetRepo.createdAt)) 
            ? new Date(testnetRepo.createdAt) 
            : new Date();
          
          generatedInsights.push({
            id: insightId++,
            title: `My Testnet Hunting Journey: ${testnetRepos.length} Networks and Counting`,
            category: 'Strategy',
            date: safeDate.toISOString(),
            preview: `Alright, let's talk about testnet hunting. I've participated in ${testnetRepos.length} different testnets so far, and each one taught me something new about this crazy space...`,
            fullContent: `Alright, let's talk about testnet hunting. I've participated in ${testnetRepos.length} different testnets so far, and each one taught me something new about this crazy space.

The golden rule I've discovered? Be early, but more importantly, be helpful. Don't just run a node and ghost the community - actually engage! Report bugs, suggest improvements, help other participants. The teams notice this stuff.

My biggest win was with ${testnetRepo.name} - got in early, provided consistent feedback, and even helped debug some network issues. The relationships you build during testnets often matter more than the immediate rewards.

Here's something most people don't tell you: track everything. I keep spreadsheets of every testnet, requirements, deadlines, and performance metrics. It sounds nerdy, but it's saved me from missing important updates countless times.

The hardest part isn't the technical stuff - it's staying organized when you're participating in multiple testnets simultaneously. But hey, that's what makes it fun, right?`,
            tags: testnetRepos.slice(0, 3).map(repo => repo.name.replace(/[-_]/g, ' ')),
            readTime: '5 min read',
            icon: '🎯',
            repoCount: testnetRepos.length
          });
        }

        // Technical insights based on languages and technologies
        const techStack = [...new Set(blockchainRepos.map(repo => repo.language).filter(Boolean))];
        
        if (techStack.length > 0) {
          const latestTechRepo = blockchainRepos.find(repo => repo.language) || blockchainRepos[0];
          const safeDate = latestTechRepo.updatedAt && !isNaN(new Date(latestTechRepo.updatedAt)) 
            ? new Date(latestTechRepo.updatedAt) 
            : new Date();
          
          generatedInsights.push({
            id: insightId++,
            title: `Why I'm Obsessed with ${techStack[0]} for Blockchain Development`,
            category: 'Technical',
            date: safeDate.toISOString(),
            preview: `Okay, so everyone always asks me about my tech stack. Currently working with ${techStack.join(', ')}, and let me tell you why ${techStack[0]} has become my go-to...`,
            fullContent: `Okay, so everyone always asks me about my tech stack. Currently working with ${techStack.join(', ')}, and let me tell you why ${techStack[0]} has become my go-to language for blockchain development.

The performance benefits are insane. When you're running validators that need to process thousands of transactions per second, every millisecond counts. ${techStack[0]} gives me that edge.

But here's the thing - it's not just about speed. The tooling ecosystem has exploded in the last year. What used to take me days to set up now takes hours. The community is incredibly welcoming too, especially compared to some other blockchain ecosystems I won't name 😅

My latest project, ${latestTechRepo.name}, really pushed me to explore ${latestTechRepo.language || 'advanced'} patterns I hadn't used before. ${latestTechRepo.description || 'The implementation challenged my understanding of distributed systems'}.

If you're starting out in blockchain development, my advice? Pick one language, get really good at it, then expand. Don't try to learn everything at once - I made that mistake early on and it slowed me down significantly.`,
            tags: techStack.slice(0, 4),
            readTime: '6 min read',
            icon: '�',
            repoCount: blockchainRepos.length
          });
        }

        // Security insights
        const securityRepos = blockchainRepos.filter(repo => 
          repo.name.toLowerCase().includes('security') || 
          repo.name.toLowerCase().includes('audit') ||
          (repo.description && repo.description.toLowerCase().includes('security'))
        );

        if (securityRepos.length > 0 || blockchainRepos.length > 5) {
          const securityRepo = securityRepos[0] || blockchainRepos[0];
          const safeDate = securityRepo.createdAt && !isNaN(new Date(securityRepo.createdAt)) 
            ? new Date(securityRepo.createdAt) 
            : new Date();
          
          generatedInsights.push({
            id: insightId++,
            title: `The Security Mistakes I Made (So You Don't Have To)`,
            category: 'Security',
            date: safeDate.toISOString(),
            preview: `Let's be real - everyone makes security mistakes when they're starting out. I've made my fair share, and some of them were pretty embarrassing. But hey, that's how we learn, right?`,
            fullContent: `Let's be real - everyone makes security mistakes when they're starting out. I've made my fair share, and some of them were pretty embarrassing. But hey, that's how we learn, right?

Mistake #1: Using the same private keys across testnet and mainnet. Yeah, I know, rookie mistake. Lost some testnet tokens, learned a valuable lesson. Now I have completely separate setups.

Mistake #2: Not properly monitoring my validators. Woke up one morning to find my validator had been slashed because I missed some network updates. Now I have monitoring scripts that send me alerts on Telegram.

The biggest lesson? Always assume you're being watched. Whether it's other validators, hackers, or just curious community members - operate as if everything you do is public. Because in blockchain, it basically is.

I've been working on ${securityRepo.name} recently, focusing on ${securityRepo.description || 'security best practices'}. It's taught me that security isn't just about the code - it's about the entire operational workflow.

My current security stack includes hardware wallets for anything valuable, separate machines for different networks, and automated monitoring for all my nodes. Overkill? Maybe. But I sleep better at night.`,
            tags: ['Security', 'Best Practices', 'Monitoring', 'Hardware'],
            readTime: '5 min read',
            icon: '🔒',
            repoCount: blockchainRepos.length
          });
        }

        // Future/Analysis insights
        const modernRepos = blockchainRepos.filter(repo => {
          const createdYear = new Date(repo.createdAt).getFullYear();
          return createdYear >= 2024;
        });

        if (modernRepos.length > 0) {
          const modernRepo = modernRepos[0];
          const safeDate = modernRepo.createdAt && !isNaN(new Date(modernRepo.createdAt)) 
            ? new Date(modernRepo.createdAt) 
            : new Date();
          
          generatedInsights.push({
            id: insightId++,
            title: `The Blockchain Trends That Actually Matter in 2025`,
            category: 'Analysis',
            date: safeDate.toISOString(),
            preview: `Everyone's talking about the next big thing in blockchain, but honestly? Most of it's just hype. Let me tell you what I think actually matters based on what I'm seeing in the trenches...`,
            fullContent: `Everyone's talking about the next big thing in blockchain, but honestly? Most of it's just hype. Let me tell you what I think actually matters based on what I'm seeing in the trenches.

First up: modular blockchains. This isn't just a buzzword - it's actually solving real problems. I've been experimenting with ${modernRepo.name} lately, and the difference in development speed is night and day.

Zero-knowledge proofs are finally becoming practical. Not the academic papers kind of practical, but actual "I can implement this in production" practical. The tooling has improved so much that what used to require a PhD now just needs a good tutorial.

But here's what nobody talks about: user experience is still terrible. We're so focused on technical innovation that we've forgotten regular people need to use this stuff. The projects that figure out UX will win, regardless of how fancy their consensus mechanism is.

My prediction? The next bull run won't be driven by DeFi 2.0 or whatever. It'll be driven by applications that normal people actually want to use. And most of them will be built on boring, reliable infrastructure.

The best part about being in this space now? We're still early enough that one person can make a real difference. Every bug report, every validator you run, every line of code you contribute - it all matters.`,
            tags: ['Modular', 'ZK', 'UX', 'Infrastructure'],
            readTime: '7 min read',
            icon: '🌟',
            repoCount: modernRepos.length
          });
        }

        setInsights(generatedInsights);
        setError(null);
      } catch (err) {
        setError('Failed to generate insights from GitHub data');
        console.error(err);
        setInsights([]);
      } finally {
        setLoading(false);
      }
    };

    generateInsights();
  }, [username]);

  const toggleInsight = (insightId) => {
    const newExpanded = new Set(expandedInsights);
    if (newExpanded.has(insightId)) {
      newExpanded.delete(insightId);
    } else {
      newExpanded.add(insightId);
    }
    setExpandedInsights(newExpanded);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Experience': 'bg-cyan-600 bg-opacity-80 text-cyan-200 border border-cyan-400',
      'Technical': 'bg-blue-600 bg-opacity-80 text-blue-200 border border-blue-400',
      'Strategy': 'bg-green-600 bg-opacity-80 text-green-200 border border-green-400',
      'Security': 'bg-red-600 bg-opacity-80 text-red-200 border border-red-400',
      'Analysis': 'bg-purple-600 bg-opacity-80 text-purple-200 border border-purple-400',
      'Technology': 'bg-yellow-600 bg-opacity-80 text-yellow-200 border border-yellow-400'
    };
    return colors[category] || 'bg-gray-600 bg-opacity-80 text-gray-200 border border-gray-400';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Recently'; // Fallback for invalid dates
    }
    
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    } else if (diffDays < 365) {
      return `${Math.floor(diffDays / 30)} months ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long'
      });
    }
  };

  return (
    <div className="space-y-8">
      {loading && (
        <div className="text-center py-16">
          <div className="relative mx-auto w-16 h-16 mb-6">
            <div className="absolute inset-0 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-purple-600 border-t-transparent rounded-full animate-spin animation-delay-150"></div>
            <div className="absolute inset-4 border-4 border-pink-600 border-t-transparent rounded-full animate-spin animation-delay-300"></div>
          </div>
          <p className="text-gray-300 text-lg">Generating insights from GitHub data...</p>
          <p className="text-gray-500 text-sm mt-2">Analyzing repository patterns and experiences</p>
        </div>
      )}

      {error && (
        <div className="bg-red-900 bg-opacity-50 border border-red-500 rounded-xl p-6 text-center backdrop-blur-sm">
          <p className="text-red-300 mb-2">❌ {error}</p>
          <p className="text-sm text-gray-400">Check your GitHub connection and try again</p>
        </div>
      )}

      {!loading && !error && insights.length === 0 && (
        <div className="bg-yellow-900 bg-opacity-50 border border-yellow-500 rounded-xl p-6 text-center backdrop-blur-sm">
          <p className="text-yellow-300 mb-2">🤔 No insights generated yet</p>
          <p className="text-sm text-gray-400">More repository activity will generate better insights</p>
        </div>
      )}

      {!loading && insights.length > 0 && (
        <>
          <div className="bg-gradient-to-r from-purple-900 to-pink-900 bg-opacity-50 border border-purple-500 rounded-xl p-4 mb-8 backdrop-blur-sm">
            <p className="text-purple-300 text-sm">
              ✨ Showing {insights.length} insights auto-generated from @{username}'s blockchain journey
            </p>
          </div>

          <div className="space-y-8">
            {insights.map((insight) => {
              const isExpanded = expandedInsights.has(insight.id);
              return (
                <article 
                  key={insight.id} 
                  className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-cyan-500 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center flex-1">
                      <div className="text-3xl mr-4 filter drop-shadow-lg">{insight.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors leading-tight">
                          {insight.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>{formatDate(insight.date)}</span>
                          <span>•</span>
                          <span>{insight.readTime}</span>
                          {insight.repoCount && (
                            <>
                              <span>•</span>
                              <span className="text-cyan-400">{insight.repoCount} projects</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm ${getCategoryColor(insight.category)} flex-shrink-0 ml-4`}>
                      {insight.category}
                    </span>
                  </div>

                  <div className="text-gray-300 mb-6 leading-relaxed text-base">
                    {isExpanded ? (
                      <div className="whitespace-pre-line">
                        {insight.fullContent}
                      </div>
                    ) : (
                      <div>
                        {insight.preview}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {insight.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-700 bg-opacity-50 text-gray-300 px-3 py-1 rounded-full text-xs border border-gray-600 hover:border-cyan-500 transition-colors">
                          #{tag.toLowerCase().replace(/\s+/g, '')}
                        </span>
                      ))}
                    </div>
                    <button 
                      onClick={() => toggleInsight(insight.id)}
                      className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors hover:bg-cyan-900 hover:bg-opacity-20 px-3 py-1 rounded-lg"
                    >
                      {isExpanded ? '← Show less' : 'Read more →'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default InsightList;
