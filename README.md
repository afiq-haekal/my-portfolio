# 🚀 Blockchain Portfolio - Interactive GitHub-Powered Portfolio

A modern, interactive React portfolio that automatically fetches and displays your blockchain projects, experiences, and insights from GitHub repositories. Perfect for validators, testnet hunters, and blockchain developers.

## ✨ Features

- **🔄 Auto-Fetch GitHub Data**: Automatically discovers and categorizes your blockchain projects
- **🤖 Smart Project Detection**: AI-powered categorization of blockchain technologies and roles
- **💬 Conversational Insights**: Generates personalized blog-style insights from your GitHub activity
- **🎨 Modern Sci-Fi Design**: Sleek cyberpunk aesthetic with glass morphism and gradient effects
- **📱 Responsive Layout**: Works perfectly on all devices
- **🚀 Auto-Deploy**: GitHub Actions workflow for automatic deployment

## 🎯 Perfect For

- Blockchain Validators
- Testnet Hunters
- DeFi Developers
- Web3 Enthusiasts
- Cryptocurrency Miners
- Node Operators

## 🚀 Quick Deploy

### Option 1: Use Setup Script (Recommended)

**Windows:**
```bash
setup-deploy.bat
```

**Linux/Mac:**
```bash
chmod +x setup-deploy.sh
./setup-deploy.sh
```

### Option 2: Manual Setup

1. **Clone and Install:**
```bash
git clone https://github.com/YOUR_USERNAME/my-portfolio.git
cd my-portfolio
npm install
```

2. **Update Your GitHub Username:**
Replace `afiq-haekal` with your username in:
- `package.json` (homepage field)
- All files in `src/` directory

3. **Deploy:**
```bash
git add .
git commit -m "Initial commit"
git push -u origin main
```

4. **Enable GitHub Pages:**
- Go to repository Settings > Pages
- Source: GitHub Actions
- Your site will be live at `https://YOUR_USERNAME.github.io/my-portfolio`

## 🛠️ Development

```bash
# Start development server
npm start

# Build for production
npm run build

# Test the build
npm run test
```

## 🎨 Customization

### Update GitHub Username
The portfolio automatically detects projects from your GitHub. Update the username in all component files:

```javascript
// src/App.js, and all component files
const username = 'YOUR_GITHUB_USERNAME';
```

### Customize Styling
- Edit `tailwind.config.js` for color themes
- Modify components in `src/components/` for layout changes
- Update `src/services/githubService.js` for different project detection logic

### Add Custom Insights
Edit `src/components/InsightList.js` to customize insight generation patterns.

## 📊 Data Sources

- **GitHub API**: Repository data, languages, statistics
- **Smart Detection**: Blockchain project categorization
- **Auto-Translation**: Indonesian to English content conversion
- **Real-time Updates**: Data refreshes on every page load

## 🔧 Technologies

- React 18.2.0
- Tailwind CSS 3.3.2
- GitHub API
- GitHub Actions
- GitHub Pages

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── components/
│   │   ├── GitHubPortfolio.js    # Main portfolio display
│   │   ├── ExperienceList.js     # Auto-generated experiences
│   │   ├── InsightList.js        # Conversational insights
│   │   ├── Timeline.js           # Project timeline
│   │   └── SplashCursor.js       # Interactive cursor
│   ├── services/
│   │   └── githubService.js      # GitHub API integration
│   └── App.js                    # Main application
├── .github/workflows/
│   └── deploy.yml                # Auto-deployment workflow
├── setup-deploy.bat              # Windows setup script
├── setup-deploy.sh               # Linux/Mac setup script
└── DEPLOY.md                     # Detailed deployment guide
```

## 🚨 Troubleshooting

### Build Issues
- Ensure Node.js 16+ is installed
- Run `npm ci` instead of `npm install`
- Check the GitHub Actions logs for detailed errors

### GitHub API Rate Limiting
- Create a GitHub Personal Access Token
- Add it as `GITHUB_TOKEN` in repository secrets
- The portfolio will automatically use it

### Deployment Not Working
- Ensure repository is PUBLIC
- Check GitHub Pages is enabled with "GitHub Actions" source
- Verify the homepage URL in `package.json`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🌟 Showcase

- **Live Demo**: [https://afiq-haekal.github.io/my-portfolio](https://afiq-haekal.github.io/my-portfolio)
- **Interactive Features**: Auto-fetch, smart categorization, conversational insights
- **Modern Design**: Sci-fi aesthetic with smooth animations

## 🎯 Roadmap

- [ ] Integration with multiple blockchain APIs
- [ ] Real-time validator performance metrics
- [ ] NFT collection display
- [ ] DeFi protocol interaction history
- [ ] Advanced analytics dashboard

---

**Built with ❤️ for the blockchain community**

*Star ⭐ this repo if you found it helpful!*
