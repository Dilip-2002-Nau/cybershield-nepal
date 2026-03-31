# CyberShield Nepal - Setup & Troubleshooting Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm
- MongoDB Atlas account or local MongoDB
- Git

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm run install-all
   ```

2. **Configure Environment**
   
   **Backend (.env):**
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=your-app
   JWT_SECRET=your-secret-key-min-8-chars
   JWT_EXPIRE=7d
   NODE_ENV=development
   CLIENT_URL=http://localhost:3000
   ```

   **Frontend (.env.local):**
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_ENV=development
   REACT_APP_DEBUG=true
   ```

3. **Verify Setup**
   ```bash
   node setup-verify.js
   ```

4. **Start Development Servers**
   ```bash
   npm run dev
   ```

---

## ✅ System Verification

Run the automatic verification script:

```bash
node setup-verify.js
```

This checks:
- ✅ Environment configuration files
- ✅ Required dependencies
- ✅ File structure
- ✅ Database connection settings
- ✅ Frontend/Backend setup

---

## 🐛 Common Issues & Solutions

### Backend Issues

#### 1. MongoDB Connection Error
```
❌ MongoDB connection error: ... authentication failed
```

**Solutions:**
- Check `MONGODB_URI` in `.env`
- Verify MongoDB Atlas credentials
- Ensure IP is whitelisted in MongoDB Atlas (Settings → Network Access → IP Whitelist)
- Test connection string in MongoDB Compass

#### 2. Port Already in Use
```
❌ Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**
```bash
# Windows: Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :5000
kill -9 <PID>
```

Or change PORT in `.env` to `5001`, `5002`, etc.

#### 3. JWT Secret Not Set
```
❌ JWT_SECRET is required but not set
```

**Solution:**
- Set `JWT_SECRET` in `.env` (minimum 8 characters)
- Example: `JWT_SECRET=cybershield_secret_key_2024`

#### 4. Missing Dependencies
```
❌ Cannot find module 'express'
```

**Solution:**
```bash
cd backend
npm install
```

#### 5. Modules Not Found (errorHandler, configValidator)
```
❌ Cannot find module './utils/errorHandler'
```

**Solution:**
- Files are auto-created. Run:
  ```bash
  node setup-verify.js
  ```
- Or manually ensure files exist in `backend/utils/`

---

### Frontend Issues

#### 1. API Connection Failed
```
❌ Cannot connect to http://localhost:5000/api
```

**Solutions:**
- Ensure backend is running
- Check `REACT_APP_API_URL` in `.env.local`
- Backend server must be on port 5000 (or update .env.local)
- Check for CORS errors in browser console

#### 2. .env.local Not Being Read
```
Frontend shows incorrect API URL
```

**Solution:**
- Copy `.env.example` to `.env.local`
- Restart development server
- Clear browser cache (Ctrl+Shift+Delete)

#### 3. React Router Not Working
```
❌ Page routes not working
```

**Solution:**
- Ensure `react-router-dom` is installed
- Check routes in `src/App.js`
- Restart frontend server

#### 4. Token Not Persisting
```
User logged out after page refresh
```

**Solution:**
- Token is stored in localStorage
- Check if private browsing mode is enabled
- Verify `REACT_APP_TOKEN_KEY` is set correctly

---

### General Troubleshooting

#### 1. Clear Cache & Reinstall
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

#### 2. Check Node Version
```bash
node --version  # Should be 14+
npm --version   # Should be 6+
```

#### 3. View Server Logs
```bash
# Backend logs will show:
✅ MongoDB connected successfully
🚀 CyberShield Nepal server running on port 5000
🌍 Environment: development

# Frontend will show compilation status
Compiled successfully!
```

#### 4. Test API Endpoints

```bash
# Test backend health check
curl http://localhost:5000/api/health

# Should return:
{
  "status": "ok",
  "message": "CyberShield Nepal API is running",
  "timestamp": "2024-03-22T..."
}
```

---

## 📋 Error Handling System

### New Error Handler Features

The system now includes comprehensive error handling:

1. **Validation Errors** (400)
   - Returns clear validation failure messages
   - Field-specific error information

2. **Authentication Errors** (401)
   - Invalid credentials
   - Expired tokens
   - Missing authorization

3. **Authorization Errors** (403)
   - Admin-only routes
   - Permission denied

4. **Not Found Errors** (404)
   - Resource doesn't exist

5. **Conflict Errors** (409)
   - Duplicate email registration
   - Resource already exists

6. **Server Errors** (500)
   - Detailed error logging with context
   - Development mode shows stack traces

### Error Response Format

```json
{
  "success": false,
  "message": "Clear error description",
  "statusCode": 400,
  "timestamp": "2024-03-22T10:30:00.000Z"
}
```

---

## 📊 Configuration Details

### Environment Variables Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| PORT | No | 5000 | Backend port |
| MONGODB_URI | Yes | - | MongoDB connection string |
| JWT_SECRET | Yes | - | JWT signing secret (min 8 chars) |
| JWT_EXPIRE | No | 7d | Token expiration time |
| NODE_ENV | No | development | Environment mode |
| CLIENT_URL | No | http://localhost:3000 | Frontend URL for CORS |
| REACT_APP_API_URL | No | http://localhost:5000/api | Backend API URL |

### Folder Structure

```
cybershield-nepal/
├── backend/
│   ├── controllers/     (Route handlers)
│   ├── models/          (Database schemas)
│   ├── routes/          (API endpoints)
│   ├── middleware/      (Auth, validation)
│   ├── utils/           (Helpers, analyzers, error handlers)
│   ├── server.js        (Main entry point)
│   ├── package.json
│   └── .env            (Configuration)
├── frontend/
│   ├── src/
│   │   ├── components/  (React components)
│   │   ├── pages/       (Page components)
│   │   ├── context/     (Global state)
│   │   ├── utils/       (API client)
│   │   ├── App.js       (Main component)
│   │   └── index.js     (React entry point)
│   ├── package.json
│   ├── .env.local       (Configuration)
│   └── .env.example     (Template)
├── package.json        (Root scripts)
├── setup-verify.js     (Verification script)
└── README.md
```

---

## 🔒 Security Notes

1. **Never commit `.env` files** to version control
2. **Use strong JWT_SECRET** (minimum 8 characters, mix of alphanumeric + symbols)
3. **MongoDB Atlas** - Whitelist IPs for only your server
4. **HTTPS in production** - Update CLIENT_URL and API_URL to use https://
5. **Token expiration** - Default 7 days, adjust as needed

---

## 📞 Support

If issues persist:

1. Run `node setup-verify.js` to identify problems
2. Check both backend and frontend terminal output
3. Review error logs in console (F12 in browser, terminal)
4. Ensure all files are created correctly
5. Clear cache and restart servers

---

**Last Updated:** March 2024
**Version:** 1.0.0
