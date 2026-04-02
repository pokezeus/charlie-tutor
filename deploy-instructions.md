# Charlie Tutor - Railway Deployment Guide

## Prerequisites
- Railway CLI installed: `npm install -g @railway/cli`
- Railway CLI authenticated: `railway login`
- Access to the `pokezeus/metal-zeus` project on Railway

## Deployment Steps

### 1. Initialize Railway Project
```bash
cd /data/workspace/charlie-tutor
railway init --name charlie-tutor
```

### 2. Link to Existing Project (if applicable)
If you have an existing project for `openclaw-zeus`:
```bash
railway link --project <project-id>
```

### 3. Set Environment Variables
```bash
# Core variables
railway variables set AGENT_NETWORK_URL="http://openclaw-zeus:8080"
railway variables set AGENT_API_KEY="<your-secure-key>"
railway variables set NEXT_PUBLIC_APP_NAME="Charlie Tutor"

# Optional: Link to internal network if using Railway's internal DNS
railway variables set RAILWAY_INTERNAL_NETWORK="true"
```

### 4. Deploy
```bash
railway up
```

### 5. Verify Deployment
```bash
railway logs
railway open
```

## Internal Network Access
If `openclaw-zeus` is running on the same Railway project:
- Use internal DNS: `http://openclaw-zeus.railway.internal:8080`
- No public exposure needed for agent communication

## Monitoring
- **Logs:** `railway logs`
- **Metrics:** `railway metrics`
- **Open Dashboard:** `railway open`

## Rollback
If needed:
```bash
railway rollback
```

---
**Created:** 2026-04-02  
**Status:** Ready for deployment
