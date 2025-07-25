@echo off
REM 🚀 GitHub Auto-Deploy Setup Script for Windows
REM Run this script to initialize Git and set up auto-deployment

echo 🚀 Setting up GitHub Auto-Deploy for React Portfolio...
echo.

REM Check if git is initialized
if not exist ".git" (
    echo 📝 Initializing Git repository...
    git init
    git branch -M main
) else (
    echo ✅ Git repository already initialized
)

REM Ask for GitHub username
set /p username="🔸 Enter your GitHub username: "
if "%username%"=="" (
    echo ❌ Username cannot be empty!
    pause
    exit /b 1
)

REM Update package.json homepage
echo 📝 Updating package.json homepage...
powershell -Command "(Get-Content package.json) -replace 'afiq-haekal', '%username%' | Set-Content package.json"

REM Update component files
echo 📝 Updating component files with your username...
for /r src %%f in (*.js) do (
    powershell -Command "(Get-Content '%%f') -replace 'afiq-haekal', '%username%' | Set-Content '%%f'"
)

REM Ask for repository name
set /p repo_name="🔸 Enter your repository name (default: my-portfolio): "
if "%repo_name%"=="" set repo_name=my-portfolio

REM Add remote origin
echo 📝 Setting up remote repository...
git remote remove origin 2>nul
git remote add origin "https://github.com/%username%/%repo_name%.git"

REM Add all files
echo 📦 Adding files to Git...
git add .

REM Commit
echo 💾 Creating initial commit...
git commit -m "🎉 Initial commit: React portfolio with auto-deploy

✨ Features:
- Auto-fetch GitHub repositories
- Real-time blockchain project detection
- Conversational insights generation
- Modern sci-fi design
- Responsive layout
- GitHub Actions auto-deploy

🚀 Ready for deployment!"

echo.
echo 🎉 Setup complete! Next steps:
echo.
echo 1. Create repository on GitHub: https://github.com/new
echo    Repository name: %repo_name%
echo    Make it PUBLIC (required for GitHub Pages)
echo.
echo 2. Push to GitHub:
echo    git push -u origin main
echo.
echo 3. Enable GitHub Pages:
echo    - Go to repository Settings ^> Pages
echo    - Source: GitHub Actions
echo.
echo 4. Your site will be available at:
echo    https://%username%.github.io/%repo_name%
echo.
echo 🔄 Auto-deploy will trigger on every push to main branch!
echo.
pause
