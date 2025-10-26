# 🧪 API Testing Guide

## 🔍 Test URLs (sau khi deploy xong):

### ✅ Basic Tests:
```bash
# Root endpoint (mới thêm)
https://expense-manager-api-xy4b.onrender.com/

# Health check
https://expense-manager-api-xy4b.onrender.com/api/health

# API Documentation  
https://expense-manager-api-xy4b.onrender.com/docs
```

### 📋 Expected Responses:

**Root endpoint (`/`):**
```json
{
  "message": "Expense Manager API",
  "status": "running", 
  "version": "1.0.0",
  "docs": "/docs",
  "health": "/api/health"
}
```

**Health endpoint (`/api/health`):**
```json
{
  "status": "ok",
  "timestamp": "2025-10-26T12:XX:XX.XXXZ",
  "uptime": 123.45
}
```

## 🕒 Deployment Status:
- ⏳ Waiting for new deployment to complete...
- 🔄 Check Render logs in 2-3 minutes
- ✅ Test endpoints after deployment finishes

## 🚀 What was fixed:
1. ➕ **Added root route** (`/`) for basic API info
2. 🔧 **Fixed Swagger servers** to include production URL
3. 📝 **Updated API documentation** paths

The "Not Found" issue should be resolved after the new deployment! 🎯