import React from "react";
import SplashCursor from "./components/SplashCursor";
import Timeline from "./components/Timeline";
import ExperienceList from "./components/ExperienceList";
import InsightList from "./components/InsightList";
import GitHubPortfolio from "./components/GitHubPortfolio";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex flex-col items-center justify-center p-4">
      <SplashCursor />
      <header className="mb-12 text-center">
        <div className="relative">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Node Validator & Testnet Hunter
          </h1>
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg blur opacity-25"></div>
        </div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Welcome to my interactive blockchain portfolio. Explore my journey as a node validator and testnet hunter 
          in the Web3 ecosystem. All data is automatically fetched from my GitHub repositories and blockchain activities.
        </p>
      </header>
      <nav className="flex gap-4 mb-12">
        <a href="#timeline" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          Timeline
        </a>
        <a href="#github" className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          GitHub Projects
        </a>
        <a href="#pengalaman" className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          Experience
        </a>
        <a href="#insight" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          Insights
        </a>
      </nav>
      <main className="w-full max-w-7xl">
        <section id="timeline" className="mb-16">
          <div className="relative mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">🚀 Journey Timeline</h2>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-20"></div>
          </div>
          <Timeline username="afiq-haekal" />
        </section>
        <section id="github" className="mb-16">
          <div className="relative mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">� GitHub Projects</h2>
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg blur opacity-20"></div>
          </div>
          <GitHubPortfolio username="afiq-haekal" />
        </section>
        <section id="pengalaman" className="mb-16">
          <div className="relative mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">⚡ Experience & Contributions</h2>
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg blur opacity-20"></div>
          </div>
          <ExperienceList username="afiq-haekal" />
        </section>
        <section id="insight">
          <div className="relative mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">💡 Insights & Notes</h2>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20"></div>
          </div>
          <InsightList username="afiq-haekal" />
        </section>
      </main>
      <footer className="mt-16 text-gray-400 text-sm">
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} Blockchain Portfolio - Powered by GitHub API</p>
          <p className="text-xs mt-1 text-gray-500">Auto-generated from repository data</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
