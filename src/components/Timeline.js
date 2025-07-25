import React, { useState, useEffect } from 'react';
import GitHubService from '../services/githubService';

const Timeline = ({ username = 'afiq-haekal' }) => {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateTimeline = async () => {
      setLoading(true);
      try {
        const githubService = new GitHubService(username);
        const repos = await githubService.getAllRepos();
        const blockchainRepos = githubService.getBlockchainRepos(repos);
        
        // Generate timeline from repos
        const events = [];
        
        // Add repo creation events
        blockchainRepos.forEach(repo => {
          const year = new Date(repo.createdAt).getFullYear();
          events.push({
            date: year,
            title: `Started ${repo.name.replace(/[-_]/g, ' ')}`,
            description: repo.description || 'Blockchain project development',
            icon: getProjectIcon(repo.name.toLowerCase()),
            color: getYearColor(year),
            type: 'project'
          });
        });

        // Add milestone events based on activity
        const currentYear = new Date().getFullYear();
        const years = [...new Set(events.map(e => e.date))].sort((a, b) => b - a);
        
        // Add general milestones
        if (years.length > 0) {
          const firstYear = Math.min(...years);
          const latestYear = Math.max(...years);
          
          if (latestYear >= 2024) {
            events.push({
              date: `${latestYear} - Present`,
              title: 'Active Testnet Hunter',
              description: `Participating in ${blockchainRepos.length} blockchain projects and testnets`,
              icon: '🚀',
              color: 'bg-blue-500',
              type: 'milestone'
            });
          }
          
          if (blockchainRepos.some(r => r.name.toLowerCase().includes('validator') || r.description?.toLowerCase().includes('validator'))) {
            events.push({
              date: `${Math.max(firstYear, 2023)} - Present`,
              title: 'Node Validator',
              description: 'Running validator nodes for multiple blockchain networks',
              icon: '⚡',
              color: 'bg-green-500',
              type: 'milestone'
            });
          }
          
          events.push({
            date: firstYear,
            title: 'Web3 Journey Begins',
            description: 'Started contributing to blockchain ecosystem',
            icon: '🌟',
            color: 'bg-purple-500',
            type: 'milestone'
          });
        }

        // Sort by date (newest first) and remove duplicates
        const sortedEvents = events
          .filter((event, index, self) => 
            index === self.findIndex(e => e.title === event.title)
          )
          .sort((a, b) => {
            const getYear = (date) => {
              if (typeof date === 'string' && date.includes('Present')) {
                return currentYear;
              }
              return typeof date === 'number' ? date : parseInt(date);
            };
            return getYear(b.date) - getYear(a.date);
          })
          .slice(0, 8); // Limit to 8 events

        setTimelineData(sortedEvents);
      } catch (error) {
        console.error('Error generating timeline:', error);
        // Fallback timeline
        setTimelineData([
          {
            date: '2024 - Present',
            title: 'Active in Blockchain',
            description: 'Contributing to various blockchain projects',
            icon: '🚀',
            color: 'bg-blue-500'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    generateTimeline();
  }, [username]);

  const getProjectIcon = (name) => {
    if (name.includes('newton')) return '🔬';
    if (name.includes('nexus')) return '🌐';
    if (name.includes('miden')) return '🔐';
    if (name.includes('anoma')) return '🎯';
    if (name.includes('kuzco')) return '🦙';
    if (name.includes('destra')) return '⚡';
    if (name.includes('bot')) return '🤖';
    if (name.includes('validator')) return '✅';
    if (name.includes('node')) return '🖥️';
    if (name.includes('mining')) return '⛏️';
    if (name.includes('faucet')) return '💧';
    return '📦';
  };

  const getYearColor = (year) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
      'bg-yellow-500', 'bg-red-500', 'bg-indigo-500'
    ];
    return colors[year % colors.length];
  };

  return (
    <div className="relative">
      {loading && (
        <div className="text-center py-12">
          <div className="relative mx-auto w-12 h-12 mb-4">
            <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin animation-delay-150"></div>
          </div>
          <p className="text-gray-300">Generating timeline from GitHub activity...</p>
        </div>
      )}

      {!loading && (
        <>
          {/* Timeline line with gradient */}
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 opacity-60"></div>
          
          <div className="space-y-10">
            {timelineData.map((item, index) => (
              <div key={index} className="relative flex items-start">
                {/* Timeline dot with glow effect */}
                <div className={`relative z-10 flex items-center justify-center w-10 h-10 ${item.color} rounded-full text-white text-lg shadow-lg`}>
                  <div className="absolute inset-0 bg-current rounded-full animate-pulse opacity-20"></div>
                  {item.icon}
                </div>
                
                {/* Content with sci-fi styling */}
                <div className="ml-8 bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 flex-1 hover:border-cyan-500 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <span className="text-sm text-cyan-400 font-mono bg-gray-700 px-3 py-1 rounded-full">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                  {item.type && (
                    <div className="mt-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        item.type === 'project' 
                          ? 'bg-blue-600 bg-opacity-50 text-blue-200' 
                          : 'bg-purple-600 bg-opacity-50 text-purple-200'
                      }`}>
                        {item.type === 'project' ? '📁 PROJECT' : '🎯 MILESTONE'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
              <p className="text-sm text-cyan-400">
                ✨ Timeline auto-generated from GitHub activity (@{username})
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Timeline;
