# 🚀 Automated GitHub Setup

Your project is ready to deploy! I've created an automated setup script that handles everything.

## ⚡ One Command Setup

Just run this command from your project folder:

```bash
cd /Users/mamadouly/Documents/SafeFood-NYC-Academy
bash setup-github.sh
```

## What the Script Does

✅ Initializes git repository  
✅ Installs all dependencies  
✅ Installs gh-pages  
✅ Configures for your GitHub account  
✅ Creates initial commit  
✅ Sets up main branch  
✅ Optionally pushes to GitHub  
✅ Optionally deploys to GitHub Pages  

## Requirements

You need:
- **Node.js** installed (check: `node --version`)
- **Git** installed (check: `git --version`)
- **GitHub account** (free at github.com)

## Step-by-Step

### 1️⃣ Run the Script
```bash
cd /Users/mamadouly/Documents/SafeFood-NYC-Academy
bash setup-github.sh
```

### 2️⃣ Enter Your GitHub Username
When prompted, type your GitHub username (the one from github.com)

### 3️⃣ Confirm Setup
Review the setup steps and type "yes" to continue

### 4️⃣ Let It Run
The script will:
- Install dependencies (~2 min)
- Set up git (~10 sec)
- Ask if you want to push to GitHub (~1 min)
- Ask if you want to deploy (~1 min)

### 5️⃣ Enable GitHub Pages (Manual Step)
After the script finishes:
1. Go to: https://github.com/YOUR_USERNAME/safefood-nyc-academy/settings/pages
2. Under "Build and deployment":
   - Select **gh-pages** branch
   - Click **Save**
3. Wait 1-2 minutes

### 6️⃣ Your App is Live!
Visit: https://YOUR_USERNAME.github.io/safefood-nyc-academy

---

## 📝 Example Run

```
$ bash setup-github.sh
╔════════════════════════════════════════════════════════════════╗
║  SafeFood NYC Academy - GitHub Setup Automation               ║
║  This script will set up your GitHub Pages deployment         ║
╚════════════════════════════════════════════════════════════════╝

📝 Please enter your GitHub username:
GitHub Username: mamadouly
✅ Using GitHub username: mamadouly

⚠️  This will:
   1. Initialize git repository
   2. Commit all files
   3. Update configuration for your GitHub account
   4. Set up GitHub Pages deployment

Continue? (yes/no): yes
...
🎉 Setup Complete!
```

---

## ❓ What if Something Goes Wrong?

### "Command not found"
- Make sure you're in the right folder
- Use full path: `bash /Users/mamadouly/Documents/SafeFood-NYC-Academy/setup-github.sh`

### "Node.js not installed"
- Download from: https://nodejs.org
- Install and try again

### "Git not installed"
- Download from: https://git-scm.com/download/mac
- Install and try again

### "Cannot find safefood-nyc-academy repo"
- The repo must already exist on GitHub
- Create it at: https://github.com/new
- Name it: `safefood-nyc-academy`

### "Push failed"
- Check your GitHub credentials
- Try: `git config --global user.email "your-email@example.com"`
- Try: `git config --global user.name "Your Name"`

---

## 🎯 What Happens Step by Step

```
1. Script runs
   ↓
2. You enter GitHub username
   ↓
3. Git initialized
   ↓
4. Dependencies installed
   ↓
5. gh-pages installed
   ↓
6. Remote configured
   ↓
7. Files committed
   ↓
8. Push to GitHub (optional)
   ↓
9. Deploy to Pages (optional)
   ↓
10. App is LIVE! 🎉
```

---

## 📊 Deployment Options

| Step | Time | Required |
|------|------|----------|
| Run script | 2 min | ✅ Yes |
| Create GitHub repo | 1 min | ✅ Yes |
| Push to GitHub | 1 min | ✅ Yes |
| Enable Pages | Manual | ✅ Yes |
| Deploy | 1 min | ✅ Yes |

**Total Time**: ~7 minutes

---

## ✅ Checklist Before Running

- [ ] GitHub account created
- [ ] Node.js installed
- [ ] Git installed
- [ ] In project folder
- [ ] GitHub username ready

---

## 🚀 Ready?

Run this:
```bash
cd /Users/mamadouly/Documents/SafeFood-NYC-Academy
bash setup-github.sh
```

Then follow the prompts!

---

## 📚 More Info

- **GITHUB_DEPLOYMENT.md** - Detailed manual setup
- **ACCESS_GUIDE.md** - Different access methods
- **README.md** - Project info

---

**Let's deploy! 🎉**
