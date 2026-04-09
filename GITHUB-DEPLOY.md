# Charlie Tutor - GitHub to Railway Auto-Deploy Setup

## Current Status
- ✅ Code ready in GitHub: `pokezeus/charlie-tutor` (commit: latest)
- ✅ Railway service exists: `d271034f-7c79-4d13-925d-65303a1ffc79`
- ✅ Build works locally
- ❌ Railway CLI link not working (token permissions)
- ❌ GitHub webhook not configured

## Solution: Enable GitHub Auto-Deploy

### Step 1: Install Railway GitHub App
1. Go to: **https://github.com/apps/railway**
2. Click **"Install"**
3. Select account: **pokezeus** (or your org)
4. Choose repository: **charlie-tutor**
5. Click **"Install"**

### Step 2: Connect in Railway Dashboard
1. Go to: **https://railway.com/project/d4bb809f-5cd1-4e64-b173-e4b14fe7f78d**
2. Click on service: **d271034f-7c79-4d13-925d-65303a1ffc79**
3. Go to **"Settings"** tab
4. Find **"Source"** section
5. Click **"Connect to GitHub"** or **"Change Source"**
6. Select repo: **pokezeus/charlie-tutor**
7. Branch: **master**
8. Click **"Deploy"**

### Step 3: Verify Auto-Deploy
Once connected:
- Any push to `master` branch will auto-deploy
- Check deployment status in Railway dashboard
- Webhook will be visible in GitHub repo settings

## Manual Deploy (Alternative)

If GitHub integration doesn't work, use manual deploy:

```bash
cd /data/workspace/charlie-tutor
export RAILWAY_TOKEN="1ce98d12-2f3b-4eb5-adb1-8298d6b223e2"
railway up --service d271034f-7c79-4d13-925d-65303a1ffc79
```

## Current Deployment Issue

The build is failing because:
1. Service not properly linked via CLI
2. Token permissions limited

**Fix:** Use Railway dashboard to connect GitHub repo, then Railway will:
- Auto-detect `railway.json` and `Dockerfile`
- Build on every push to `master`
- Show build logs in dashboard

## What Should Deploy

Latest commit includes:
- ✅ Full Phase 1 dashboard
- ✅ Multiplication Bingo game
- ✅ Coin system & level badges
- ✅ Streak tracking
- ✅ shadcn/ui components
- ✅ TypeScript + Next.js 14

## URLs
- **GitHub:** https://github.com/pokezeus/charlie-tutor
- **Railway Project:** https://railway.com/project/d4bb809f-5cd1-4e64-b173-e4b14fe7f78d
- **Live Site:** https://charlie-tutor.up.railway.app/

---
**Last Updated:** 2026-04-09
**Status:** Awaiting GitHub integration setup
