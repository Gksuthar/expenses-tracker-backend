# 🚨 RENDER DEPLOYMENT FIX - URGENT

## Current Issue
Render is running `npm run dev` which is the **development command**.
This command requires `ts-node-dev` which is only in devDependencies and won't work in production.

## ✅ Solution: Change Start Command in Render Dashboard

### Steps:
1. Go to: https://dashboard.render.com
2. Select your service: **expenses-tracker-backend**
3. Click **"Settings"** in left sidebar
4. Scroll to **"Build & Deploy"** section
5. Find **"Start Command"** field
6. **Current (WRONG):** `npm run dev`
7. **Change to:** `npm start`
8. Click **"Save Changes"** at bottom
9. Go to **Dashboard** and click **"Manual Deploy" → "Deploy latest commit"**

## Why This Fix Works
- `npm run dev` → Uses `ts-node-dev` (development tool, not in production)
- `npm start` → Uses `node dist/index.js` (compiled production code)

## Expected Result After Fix
```
==> Build successful 🎉
==> Deploying...
==> Running 'npm start'
> backend@1.0.0 start
> node dist/index.js

Server listening on port 8000 in production
Connected to Mongo database
```

## Environment Variables Required in Render
Make sure these are set in Render dashboard → Environment:
- `NODE_ENV=production`
- `MONGO_URI=<your-mongodb-uri>`
- `SESSION_SECRET=<your-secret>`
- `FRONTEND_ORIGIN=https://expenses-tracker-frontend-mu7x.vercel.app`
- `PORT=8000` (or leave empty, Render sets it automatically)

## Scripts Reference
- `npm run dev` - Development (uses ts-node-dev, watches files)
- `npm run build` - Compiles TypeScript to dist/ folder
- `npm start` - Production (runs compiled dist/index.js)
