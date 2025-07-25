# GitHub Pages Auto-Deploy Instructions

## 📋 Prerequisites

1. Make sure your repository is public (GitHub Pages requires this for free accounts)
2. Push your code to GitHub
3. Enable GitHub Pages in repository settings

## 🚀 Setup Steps

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: React portfolio with auto-deploy"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically deploy your site

### 3. Update Your Username
In the following files, replace `afiq-haekal` with your actual GitHub username:
- `package.json` (homepage field)
- `src/App.js` (username props)
- `src/components/Timeline.js`
- `src/components/ExperienceList.js`
- `src/components/InsightList.js`
- `src/components/GitHubPortfolio.js`

### 4. Environment Variables (Optional)
If you want to use a GitHub token for private repos:
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Generate a new token with `repo` scope
3. In your repository Settings > Secrets and variables > Actions
4. Add secret: `GITHUB_TOKEN` with your token value

## 🌐 Your Site Will Be Available At:
`https://YOUR_USERNAME.github.io/my-portfolio`

## 🔄 Auto-Deploy Triggers
- Every push to `main` branch
- Every pull request to `main` branch

## 🛠️ Troubleshooting

### Build Fails?
- Check the Actions tab for error details
- Make sure all dependencies are in package.json
- Verify Node.js version compatibility

### Site Not Loading?
- Check if GitHub Pages is enabled
- Verify the homepage URL in package.json
- Wait a few minutes after deployment

### API Rate Limiting?
- Add GitHub token as environment variable
- Use your own username instead of the default

## 🎨 Customization
- Update colors in `tailwind.config.js`
- Modify components in `src/components/`
- Add new insights patterns in `InsightList.js`
- Customize GitHub detection logic in `githubService.js`
