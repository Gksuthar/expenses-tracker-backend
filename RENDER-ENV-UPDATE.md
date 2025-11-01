# 🚨 URGENT: Update Render Environment Variables

## New Backend URL
Your backend URL has changed:
- ❌ Old: `https://expenses-tracker-backend-6-64xq.onrender.com`
- ✅ New: `https://expenses-tracker-backend-6-64xq.onrender.com`

---

## Fix CORS Issue - Update Render Environment Variables

### Step 1: Go to Render Dashboard
https://dashboard.render.com

### Step 2: Select Your Backend Service
Click on: **expenses-tracker-backend-5**

### Step 3: Go to Environment Tab
Click **"Environment"** in the left sidebar

### Step 4: Update These Variables

```env
NODE_ENV=production
PORT=8000
MONGO_URI=mongodb+srv://rahul:rahul@cluster0.nv076.mongodb.net/TaskManagerDB?retryWrites=true&w=majority&appName=Cluster0
SESSION_SECRET=ganesh
GOOGLE_CALLBACK_URL=https://expenses-tracker-backend-6-64xq.onrender.com/api/auth/google/callback
FRONTEND_ORIGIN=https://expenses-tracker-frontend-mu7x.vercel.app
FRONTEND_GOOGLE_CALLBACK_URL=https://expenses-tracker-frontend-mu7x.vercel.app/google/callback
SESSION_EXPIRES_IN=24h
```

**IMPORTANT:** Update `GOOGLE_CALLBACK_URL` to new backend URL!

### Step 5: Save and Redeploy
1. Click **"Save Changes"**
2. Service will automatically redeploy

---

## Verify CORS Fix

After redeploy, check browser console - CORS error should be gone!

Expected:
```
✅ API calls work
✅ No CORS errors
✅ User can login
```

---

## Client Already Updated
The client `.env` is already pointing to new backend:
```
VITE_API_BASE_URL="https://expenses-tracker-backend-6-64xq.onrender.com/api"
```

---

## If Still CORS Error

Make sure in Render Environment:
- `FRONTEND_ORIGIN` = exactly `https://expenses-tracker-frontend-mu7x.vercel.app` (no trailing slash!)
- `NODE_ENV` = `production`

Then manually redeploy from Render dashboard.
