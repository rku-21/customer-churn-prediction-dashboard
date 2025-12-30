# 🆓 Free Deployment Guide - Render (Manual Method)

## Step-by-Step Free Deployment

### 1. Push to GitHub (Already Done ✓)
You've already pushed your code to GitHub.

### 2. Create Web Service on Render

1. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com
   - Sign in or create free account

2. **Create New Web Service**
   - Click **"New +"** button (top right)
   - Select **"Web Service"**
   - Click **"Build and deploy from a Git repository"**
   - Click **"Next"**

3. **Connect Repository**
   - Click **"Connect account"** (GitHub)
   - Authorize Render to access your repositories
   - Find and select your `customer-churn-prediction` repository
   - Click **"Connect"**

### 3. Configure Service (FREE TIER)

Fill in these exact values:

**Basic Settings:**
```
Name: customer-churn-prediction
Region: Oregon (US West)
Branch: main
Root Directory: (leave blank)
Runtime: Python 3
```

**Build Settings:**
```
Build Command:
pip install -r requirements.txt && cd churn-frontend && npm install && npm run build && cd ..

Start Command:
uvicorn app:app --host 0.0.0.0 --port $PORT
```

**Important - Select FREE Plan:**
- Scroll down to **"Instance Type"**
- Select **"Free"** (NOT Starter or higher)
- Free tier gives you: 512MB RAM, 0.1 CPU

**Advanced Settings (Optional):**
```
Environment Variables:
PYTHON_VERSION = 3.11.0
```

**Auto-Deploy:**
- ✅ Enable Auto-Deploy (deploys on git push)

### 4. Deploy

- Click **"Create Web Service"** button at the bottom
- Wait 5-10 minutes for build to complete
- Watch the logs - should show:
  ```
  ✓ Installing Python packages
  ✓ Installing npm packages
  ✓ Building React app
  ✓ Starting server
  ```

### 5. Access Your App

Once deployed, you'll get a URL like:
```
https://customer-churn-prediction-XXXX.onrender.com
```

---

## ⚠️ Free Tier Limitations

1. **Spins down after 15 minutes** of inactivity
   - First request after spin-down takes ~30-60 seconds (cold start)
   - Subsequent requests are fast

2. **512MB RAM limit**
   - Your app should fit fine

3. **Monthly limits**
   - 750 hours/month (enough for always-on if only one service)

---

## 🎯 Alternative Free Options

If Render free tier doesn't work, try these:

### 1. Railway.app
- Sign up at https://railway.app
- Better free tier (500 hours/month, $5 free credit)
- Click "New Project" → "Deploy from GitHub"
- Select your repo
- Railway auto-detects settings
- Click "Deploy"

### 2. Fly.io
- Sign up at https://fly.io
- Free tier: 3 shared VMs
- Install flyctl CLI
- Run: `fly launch` in your project directory
- Follow prompts

### 3. Vercel (Frontend) + Render (Backend)
**Frontend on Vercel (Free):**
- Visit https://vercel.com
- Import your GitHub repo
- Root Directory: `churn-frontend`
- Build Command: `npm run build`
- Output Directory: `dist`
- Add environment variable: `VITE_API_URL=https://your-render-backend.onrender.com`

**Backend on Render (Free):**
- Same steps as above but don't build frontend
- Just deploy API

### 4. Heroku (Requires Credit Card but Free)
- Sign up at https://heroku.com
- Create Procfile:
  ```
  web: pip install -r requirements.txt && cd churn-frontend && npm install && npm run build && cd .. && uvicorn app:app --host 0.0.0.0 --port $PORT
  ```
- Deploy via Git or GitHub integration

---

## 💡 Best Free Option: Render Free Tier

**Why Render Free is best:**
- ✅ No credit card required
- ✅ Free SSL certificate
- ✅ Auto-deploy from GitHub
- ✅ Good performance for demos
- ✅ Simple setup

**Downsides:**
- ❌ Cold starts (15 min inactivity)
- ❌ 512MB RAM limit

---

## 🔧 If Build Fails on Render

**Common Issues:**

1. **Out of Memory**
   - Build might fail if >512MB RAM used during build
   - Solution: Use separate frontend deployment (Vercel/Netlify)

2. **Node.js Version**
   - Add to root directory a file named `package.json`:
   ```json
   {
     "engines": {
       "node": "18.x"
     }
   }
   ```

3. **Build Timeout**
   - Free tier has build timeout limits
   - Optimize by removing dev dependencies

---

## ✨ Quick Deploy Checklist

- [ ] Code pushed to GitHub
- [ ] Render account created (free)
- [ ] New Web Service created
- [ ] Repository connected
- [ ] **FREE tier selected** ⚠️
- [ ] Build command entered
- [ ] Start command entered
- [ ] Deploy clicked
- [ ] Wait for build (be patient!)
- [ ] Test your URL

---

## 📞 Need Help?

- **Render Docs**: https://render.com/docs
- **Community**: https://community.render.com
- **Status**: https://status.render.com

---

**Remember**: Select **FREE** tier - don't select Starter ($7/mo) or higher!
