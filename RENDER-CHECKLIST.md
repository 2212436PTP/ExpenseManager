# ✅ Render Deploy Checklist

## 🎯 **Ready to Deploy Backend to Render!**

### ✅ **Files Prepared:**
- [x] `apps/api/render.yaml` - Render service configuration
- [x] `apps/api/.env.render` - Environment template  
- [x] `apps/api/package.json` - Updated with engines & render scripts
- [x] `generate-secrets.js` - JWT secret generator (completed)
- [x] Build test passed - TypeScript compilation successful

### 🔐 **Generated Secrets (SECURE - Copy to Render):**
```
JWT_ACCESS_SECRET=9f84f665fb4d89bced6702b570a5399efaae5deed83d965c2b90c9c29da1279e
JWT_REFRESH_SECRET=3ba36a233009f85559bf9972c71319c5be4f10352170036e2c2c728e3fbc39fe
```

## 🚀 **Deploy Steps:**

### Step 1: Create Render Account
- [ ] Go to https://render.com
- [ ] Sign up with GitHub account
- [ ] Verify email

### Step 2: Create Database (Optional - Use Render PostgreSQL)
- [ ] Dashboard → New → PostgreSQL
- [ ] Name: `expense-manager-db`
- [ ] Plan: Free ($0/month, 1GB)
- [ ] Copy connection string: `postgresql://...`

### Step 3: Create Web Service  
- [ ] Dashboard → New → Web Service
- [ ] Connect GitHub repository
- [ ] **Configuration:**
  - **Name:** `expense-manager-api`
  - **Root Directory:** `apps/api`
  - **Environment:** Node
  - **Build Command:** `npm install && npm run build`
  - **Start Command:** `npm start`

### Step 4: Set Environment Variables
Copy these to Render Dashboard → Environment Variables:

```bash
# Required
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://username:password@host:port/database
JWT_ACCESS_SECRET=9f84f665fb4d89bced6702b570a5399efaae5deed83d965c2b90c9c29da1279e
JWT_REFRESH_SECRET=3ba36a233009f85559bf9972c71319c5be4f10352170036e2c2c728e3fbc39fe

# Update these with actual values
CORS_ORIGIN=https://your-frontend.netlify.app
UPLOAD_DIR=uploads
LOG_LEVEL=info
```

### Step 5: Deploy & Verify
- [ ] Click "Create Web Service"
- [ ] Monitor build logs
- [ ] Wait for "Live" status
- [ ] Test endpoints:
  - [ ] Health: `https://your-api.onrender.com/api/health`
  - [ ] Swagger: `https://your-api.onrender.com/docs`

### Step 6: Database Migration
After successful deploy:
- [ ] Render Dashboard → Service → Shell
- [ ] Run: `npx prisma migrate deploy`
- [ ] Run: `npx prisma db seed` (optional)

## 🌍 **Expected URLs:**
```
🔧 API Base:     https://expense-manager-api.onrender.com/api
📚 Swagger:      https://expense-manager-api.onrender.com/docs  
🩺 Health:       https://expense-manager-api.onrender.com/api/health
```

## 🔧 **Troubleshooting:**

### Build Fails
- Check build logs in Render dashboard
- Verify package.json scripts
- Ensure all dependencies listed

### Database Connection  
- Verify DATABASE_URL format
- Check database service status
- Test connection string locally

### Environment Variables
- All variables set in Render dashboard
- No typos in variable names
- Secrets properly generated

## 💰 **Cost Breakdown:**
```
🔧 Backend (Render):     FREE (512MB RAM, sleeps after 15min)
🗄️ Database (Render):    FREE (1GB PostgreSQL)  
🌐 Frontend (Netlify):   FREE (will deploy separately)
Total:                   $0/month (development)
```

## ⚡ **After Backend Deploy:**

### Update Frontend Config
```bash
# apps/web/.env.production
VITE_API_URL=https://expense-manager-api.onrender.com/api
```

### Deploy Frontend to Netlify  
```bash
cd apps/web
npm run build
# Upload dist/ to netlify.com
```

### Update Backend CORS
```bash
# In Render dashboard, update:
CORS_ORIGIN=https://your-frontend.netlify.app
```

## 📊 **Complete Stack After Deploy:**
```
User → Netlify (Frontend) → Render (Backend) → Render (Database)
```

## 🎉 **Success Indicators:**
- ✅ Render service shows "Live" status  
- ✅ Health endpoint returns {"status": "ok"}
- ✅ Swagger UI loads without errors
- ✅ Database migrations applied successfully
- ✅ No errors in service logs

---

**🚀 Ready to deploy! Follow the checklist and your backend will be live in ~10 minutes.**