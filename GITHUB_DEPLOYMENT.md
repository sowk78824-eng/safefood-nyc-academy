# 🚀 Deploy SafeFood NYC Academy to GitHub Pages

## Step-by-Step Deployment Guide

### Step 1: Create GitHub Repository

1. Go to **https://github.com/new**
2. Create new repository named: **`safefood-nyc-academy`**
3. Choose **Public** (required for GitHub Pages)
4. Click **Create repository**

---

### Step 2: Initialize Git in Your Project

```bash
cd /Users/mamadouly/Documents/SafeFood-NYC-Academy

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: SafeFood NYC Academy MVP"
```

---

### Step 3: Connect to GitHub Remote

Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/safefood-nyc-academy.git
git branch -M main
git push -u origin main
```

---

### Step 4: Install Deployment Dependencies

```bash
npm install gh-pages --save-dev
```

---

### Step 5: Update package.json Homepage

Edit the `homepage` field in package.json (already done!):

```json
"homepage": "https://YOUR_GITHUB_USERNAME.github.io/safefood-nyc-academy"
```

Replace `YOUR_GITHUB_USERNAME` with your GitHub username.

---

### Step 6: Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
1. Build your app (`npm run build`)
2. Deploy to GitHub Pages using gh-pages

---

### Step 7: Enable GitHub Pages

1. Go to your GitHub repository: `https://github.com/YOUR_GITHUB_USERNAME/safefood-nyc-academy`
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** / **(root)**
4. Click **Save**

Wait 1-2 minutes for deployment to complete.

---

### Step 8: Access Your Live App

Your app will be live at:

```
https://YOUR_GITHUB_USERNAME.github.io/safefood-nyc-academy
```

---

## 📝 Complete Commands Cheat Sheet

### First Time Setup (Do Once)
```bash
cd /Users/mamadouly/Documents/SafeFood-NYC-Academy
git init
git add .
git commit -m "Initial commit: SafeFood NYC Academy MVP"
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/safefood-nyc-academy.git
git branch -M main
git push -u origin main
npm install gh-pages --save-dev
```

### Deploy Updates
After making changes:
```bash
git add .
git commit -m "Your commit message"
git push origin main
npm run deploy
```

---

## 🔄 Updating Your App

Every time you make changes:

```bash
# Make your changes
# ... edit files ...

# Commit to git
git add .
git commit -m "Description of changes"
git push origin main

# Deploy to GitHub Pages
npm run deploy
```

---

## 📊 Access Methods

| Method | URL | Setup Time |
|--------|-----|-----------|
| **Local Dev** | http://localhost:3000 | Instant (npm run dev) |
| **GitHub Pages** | https://username.github.io/safefood-nyc-academy | 5 minutes |
| **Vercel** | Custom domain | 2 minutes |
| **Netlify** | Custom domain | 2 minutes |

---

## 🔐 If You Have SSH Key Set Up

If your GitHub SSH is configured, use:

```bash
git remote add origin git@github.com:YOUR_GITHUB_USERNAME/safefood-nyc-academy.git
git push -u origin main
```

---

## ❓ Troubleshooting

### "gh-pages not found"
```bash
npm install gh-pages --save-dev
npm run deploy
```

### "Branch gh-pages not found"
It will be created automatically on first deploy. Wait 1-2 minutes then check Settings → Pages.

### "404 on pages"
- Verify Settings → Pages shows **gh-pages branch** selected
- Check that homepage in package.json matches your username
- Wait 2-3 minutes after enabling

### "Blank page"
- Check Browser Console (F12)
- Verify base URL in vite.config.js: `/safefood-nyc-academy/`

---

## 🎯 Quick Summary

| Step | Command | Time |
|------|---------|------|
| 1. Create GitHub repo | Manual | 1 min |
| 2. Initialize git | `git init && git add .` | 30 sec |
| 3. First commit | `git commit -m "Initial"` | 30 sec |
| 4. Push to GitHub | `git push -u origin main` | 1 min |
| 5. Install gh-pages | `npm install gh-pages --save-dev` | 1 min |
| 6. Deploy | `npm run deploy` | 2 min |
| 7. Enable Pages | Manual (Settings) | 2 min |
| **Total** | | **8 minutes** |

---

## ✅ Verification

After deployment, check:

1. ✅ App loads at `https://YOUR_USERNAME.github.io/safefood-nyc-academy`
2. ✅ All 3 modules work (Academy, Dashboard, Health Map)
3. ✅ Language switching works
4. ✅ Maps display correctly
5. ✅ No console errors (F12)

---

## 🎊 You're Live!

Once deployed, your SafeFood NYC Academy is accessible to anyone with the link!

---

## 📞 Alternative: One-Click Deployment

If you don't want to use GitHub Pages, consider:

### **Vercel** (Recommended)
```bash
npm install -g vercel
vercel
```
- Click to deploy
- Custom domain included
- Free tier generous

### **Netlify**
1. Push to GitHub
2. Connect GitHub to Netlify
3. Auto-deploys on every push

### **Other Options**
- GitHub Pages (this guide)
- Azure Static Web Apps
- AWS Amplify
- Firebase Hosting

---

## 📚 References

- [GitHub Pages Docs](https://pages.github.com/)
- [gh-pages Package](https://github.com/tschaub/gh-pages)
- [Vite Deploy Guide](https://vitejs.dev/guide/static-deploy.html)

---

**You're all set!** 🚀

Questions? Check the troubleshooting section above.
