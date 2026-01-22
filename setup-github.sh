#!/bin/bash

# SafeFood NYC Academy - GitHub Setup Automation Script
# This script automates the entire GitHub deployment process

set -e  # Exit on error

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  SafeFood NYC Academy - GitHub Setup Automation               ║"
echo "║  This script will set up your GitHub Pages deployment         ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first:"
    echo "   Visit: https://git-scm.com/download/mac"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first:"
    echo "   Visit: https://nodejs.org"
    exit 1
fi

# Get GitHub username
echo "📝 Please enter your GitHub username:"
read -p "GitHub Username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "❌ GitHub username cannot be empty"
    exit 1
fi

echo ""
echo "✅ Using GitHub username: $GITHUB_USERNAME"
echo ""

# Confirm
echo "⚠️  This will:"
echo "   1. Initialize git repository"
echo "   2. Commit all files"
echo "   3. Update configuration for your GitHub account"
echo "   4. Set up GitHub Pages deployment"
echo ""
read -p "Continue? (yes/no): " CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo "❌ Setup cancelled"
    exit 1
fi

echo ""
echo "🔧 Starting setup..."
echo ""

# Step 1: Check if already a git repo
if [ -d ".git" ]; then
    echo "ℹ️  Git repository already initialized, skipping git init"
else
    echo "📦 Step 1/6: Initializing git repository..."
    git init
    echo "✅ Git repository initialized"
fi

# Step 2: Update package.json with correct homepage
echo "📦 Step 2/6: Updating configuration for $GITHUB_USERNAME..."
sed -i.bak "s|YOUR_GITHUB_USERNAME|$GITHUB_USERNAME|g" package.json
rm -f package.json.bak
echo "✅ package.json updated"

# Step 3: Install dependencies
echo "📦 Step 3/6: Installing dependencies..."
npm install
echo "✅ Dependencies installed"

# Step 4: Install gh-pages
echo "📦 Step 4/6: Installing gh-pages..."
npm install --save-dev gh-pages
echo "✅ gh-pages installed"

# Step 5: Git setup
echo "📦 Step 5/6: Setting up git..."

# Check if remote already exists
if git remote | grep -q origin; then
    echo "ℹ️  Remote 'origin' already exists"
    git remote remove origin
fi

REPO_URL="https://github.com/$GITHUB_USERNAME/safefood-nyc-academy.git"
git remote add origin "$REPO_URL"
echo "✅ Remote repository configured: $REPO_URL"

# Add all files
git add .

# Check if there are changes to commit
if git diff-index --quiet HEAD --; then
    echo "ℹ️  No changes to commit"
else
    git commit -m "Initial commit: SafeFood NYC Academy MVP"
    echo "✅ Files committed"
fi

# Step 6: Create main branch if needed
echo "📦 Step 6/6: Setting up main branch..."
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
    git branch -M main
    echo "✅ Branch renamed to main"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  ✅ Local setup complete!                                      ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Step 7: Push to GitHub
echo "📤 NEXT STEPS:"
echo ""
echo "1️⃣  Push your code to GitHub:"
echo "    git push -u origin main"
echo ""
echo "2️⃣  Wait for the push to complete, then:"
echo "    npm run deploy"
echo ""
echo "3️⃣  Enable GitHub Pages in your repository settings:"
echo "    - Go to: https://github.com/$GITHUB_USERNAME/safefood-nyc-academy/settings/pages"
echo "    - Select 'gh-pages' branch"
echo "    - Click Save"
echo ""
echo "4️⃣  Wait 1-2 minutes for deployment"
echo ""
echo "5️⃣  Your app will be live at:"
echo "    🌐 https://$GITHUB_USERNAME.github.io/safefood-nyc-academy"
echo ""

read -p "Push to GitHub now? (yes/no): " PUSH_NOW

if [ "$PUSH_NOW" = "yes" ]; then
    echo ""
    echo "📤 Pushing to GitHub..."
    git push -u origin main
    echo "✅ Code pushed to GitHub"
    echo ""
    
    # Ask about deploying
    read -p "Deploy to GitHub Pages now? (yes/no): " DEPLOY_NOW
    
    if [ "$DEPLOY_NOW" = "yes" ]; then
        echo ""
        echo "🚀 Deploying to GitHub Pages..."
        npm run deploy
        echo "✅ Deployed to GitHub Pages"
        echo ""
        echo "🎉 Your app should be live in 1-2 minutes at:"
        echo "   https://$GITHUB_USERNAME.github.io/safefood-nyc-academy"
    fi
else
    echo ""
    echo "ℹ️  You can push later with:"
    echo "   git push -u origin main"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  🎉 Setup Complete!                                            ║"
echo "║  Questions? Check GITHUB_DEPLOYMENT.md                         ║"
echo "╚════════════════════════════════════════════════════════════════╝"
