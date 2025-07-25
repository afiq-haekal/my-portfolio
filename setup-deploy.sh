#!/bin/bash

# 🚀 GitHub Auto-Deploy Setup Script
# Run this script to initialize Git and set up auto-deployment

echo "🚀 Setting up GitHub Auto-Deploy for React Portfolio..."
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📝 Initializing Git repository..."
    git init
    git branch -M main
else
    echo "✅ Git repository already initialized"
fi

# Ask for GitHub username
read -p "🔸 Enter your GitHub username: " username
if [ -z "$username" ]; then
    echo "❌ Username cannot be empty!"
    exit 1
fi

# Update package.json homepage
echo "📝 Updating package.json homepage..."
sed -i.bak "s/afiq-haekal/$username/g" package.json

# Update component files
echo "📝 Updating component files with your username..."
find src -name "*.js" -type f -exec sed -i.bak "s/afiq-haekal/$username/g" {} \;

# Ask for repository name
read -p "🔸 Enter your repository name (default: my-portfolio): " repo_name
repo_name=${repo_name:-my-portfolio}

# Add remote origin
echo "📝 Setting up remote repository..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$username/$repo_name.git"

# Add all files
echo "📦 Adding files to Git..."
git add .

# Commit
echo "💾 Creating initial commit..."
git commit -m "🎉 Initial commit: React portfolio with auto-deploy

✨ Features:
- Auto-fetch GitHub repositories
- Real-time blockchain project detection
- Conversational insights generation
- Modern sci-fi design
- Responsive layout
- GitHub Actions auto-deploy

🚀 Ready for deployment!"

echo ""
echo "🎉 Setup complete! Next steps:"
echo ""
echo "1. Create repository on GitHub: https://github.com/new"
echo "   Repository name: $repo_name"
echo "   Make it PUBLIC (required for GitHub Pages)"
echo ""
echo "2. Push to GitHub:"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages:"
echo "   - Go to repository Settings > Pages"
echo "   - Source: GitHub Actions"
echo ""
echo "4. Your site will be available at:"
echo "   https://$username.github.io/$repo_name"
echo ""
echo "🔄 Auto-deploy will trigger on every push to main branch!"
echo ""
