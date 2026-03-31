# 🛡️ CyberShield Nepal
## Cyber Threat Awareness & Protection Platform

> Nepal's first dedicated open-source cybersecurity awareness platform — built to protect Nepalis from phishing, scams, and digital fraud.

---

## ⚡ Quick Setup

**Verify your system is ready:**
```bash
node setup-verify.js
```

**Install and run:**
```bash
npm run install-all   # Install dependencies
npm run dev           # Start both backend & frontend
```

**For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)**

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + React Router v6 |
| Styling | Custom CSS (Dark Cybersecurity Theme) |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| HTTP Client | Axios |

---

## 📂 Project Structure

```
cybershield-nepal/
├── backend/
│   ├── controllers/
│   │   ├── authController.js     # Register & Login logic
│   │   ├── scanController.js     # URL, password, email analysis
│   │   └── reportController.js   # Threat report handling
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT protect & adminOnly
│   ├── models/
│   │   ├── User.js               # User schema (bcrypt hashing)
│   │   └── Report.js             # Threat report schema
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth/*
│   │   ├── scanRoutes.js         # /api/scan-url, /api/check-password, etc.
│   │   └── reportRoutes.js       # /api/report-threat, /api/reports
│   ├── utils/
│   │   ├── urlAnalyzer.js        # URL phishing detection logic
│   │   ├── passwordChecker.js    # Password strength analysis
│   │   └── emailAnalyzer.js      # Email scam detection logic
│   ├── server.js                 # Express app entry point
│   ├── .env.example              # Environment variable template
│   └── package.json
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js         # Responsive navigation
│   │   │   ├── Footer.js         # Site footer
│   │   │   ├── ResultCard.js     # Reusable scan result display
│   │   │   └── LoadingSpinner.js # Loading state component
│   │   ├── context/
│   │   │   └── AuthContext.js    # Global auth state (React Context)
│   │   ├── pages/
│   │   │   ├── HomePage.js       # Landing page
│   │   │   ├── UrlScannerPage.js # URL phishing detector
│   │   │   ├── PasswordCheckerPage.js  # Password strength checker
│   │   │   ├── EmailAnalyzerPage.js    # Email scam analyzer
│   │   │   ├── ReportThreatPage.js     # Threat reporting form
│   │   │   ├── LearningPage.js         # Learning hub with articles
│   │   │   └── AuthPage.js             # Login & Register
│   │   ├── utils/
│   │   │   └── api.js            # Axios API helper functions
│   │   ├── App.js                # Root component + routing
│   │   ├── index.js              # React entry point
│   │   └── styles.css            # Complete stylesheet
│   └── package.json
│
├── package.json                  # Root (concurrently scripts)
└── README.md
```

---

## ⚡ Quick Setup (Step by Step)

### Prerequisites
- Node.js v18+ ([download](https://nodejs.org))
- MongoDB v6+ ([download](https://www.mongodb.com/try/download/community)) OR MongoDB Atlas (free cloud)
- npm v9+

---

### Step 1: Clone & Extract Project

```bash
# If cloning from git:
git clone https://github.com/yourusername/cybershield-nepal.git
cd cybershield-nepal

# Or if you have the folder already:
cd cybershield-nepal
```

---

### Step 2: Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cybershield_nepal
JWT_SECRET=your_super_secret_key_minimum_32_characters
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

> **MongoDB Atlas (Cloud):** Replace MONGODB_URI with your Atlas connection string:
> `mongodb+srv://username:password@cluster.xxxxx.mongodb.net/cybershield_nepal`

---

### Step 3: Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install
```

Optional: Create `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

### Step 4: Start the Application

**Terminal 1 – Backend:**
```bash
cd backend
npm run dev
# Server starts at http://localhost:5000
```

**Terminal 2 – Frontend:**
```bash
cd frontend
npm start
# App opens at http://localhost:3000
```

Or use concurrently from root (install first: `npm install`):
```bash
npm run dev
```

---

## 🌐 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Create account |
| POST | `/api/auth/login` | Public | Sign in |
| GET | `/api/auth/me` | JWT | Get current user |
| POST | `/api/scan-url` | Public | Scan URL for threats |
| POST | `/api/check-password` | Public | Check password strength |
| POST | `/api/analyze-email` | Public | Analyze email for scams |
| POST | `/api/report-threat` | Public | Submit threat report |
| GET | `/api/recent-reports` | Public | Get recent reviewed reports |
| GET | `/api/reports` | Admin JWT | Get all reports (admin) |
| GET | `/api/health` | Public | Server health check |

---

## 🔧 Creating an Admin Account

After registering, update your role directly in MongoDB:

```bash
# In MongoDB shell:
use cybershield_nepal
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

---

## 🚀 Deployment Guide

### Backend (Render / Railway / Heroku)

1. Push backend folder to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Set environment variables in dashboard:
   - `MONGODB_URI` → Your MongoDB Atlas URI
   - `JWT_SECRET` → Strong random string
   - `CLIENT_URL` → Your frontend URL
4. Build command: `npm install`
5. Start command: `node server.js`

### Frontend (Vercel / Netlify)

1. Push frontend folder to GitHub
2. Import to [Vercel](https://vercel.com)
3. Set environment variable:
   - `REACT_APP_API_URL` → Your backend URL + `/api`
4. Build command: `npm run build`
5. Output directory: `build`

### Database (MongoDB Atlas)
1. Create free cluster at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create database user
3. Whitelist all IPs: `0.0.0.0/0`
4. Copy connection string to backend env

---

## 🛡️ Security Features

- **bcryptjs** password hashing (12 salt rounds)
- **JWT** tokens with expiry
- **Password field** excluded from queries by default
- **CORS** configured for specific origin
- **Input validation** on all endpoints
- **Error handling** without exposing stack traces in production

---

## 📊 Detection Algorithms

### URL Analyzer
Checks: HTTPS, URL length, IP addresses, suspicious keywords (login/verify/bank), free TLDs (.tk/.ml), @ symbols, subdomain abuse, hyphen patterns

### Password Checker
Evaluates: Length (8/12/16+), uppercase, lowercase, numbers, special chars, common passwords, sequential/repeating patterns

### Email Analyzer
Detects: Urgency words, financial bait, info requests, Nepali-specific patterns (eSewa/Khalti), suspicious URLs, sender domain analysis, pressure tactics

---

## 📱 Features

- ✅ URL Phishing Detector with risk scoring
- ✅ Real-time Password Strength Checker
- ✅ Email Scam Analyzer
- ✅ Threat Reporting System
- ✅ 6-article Cybersecurity Learning Hub
- ✅ JWT Authentication (Login/Register)
- ✅ Fully Responsive (Mobile + Desktop)
- ✅ Dark cybersecurity theme
- ✅ Loading states & error handling
- ✅ Form validation (frontend + backend)
- ✅ Admin report management

---

## 🤝 Contributing

This project is open to contributions! Areas for improvement:
- Real-time threat database integration
- Additional Nepali language support
- SMS-based phishing detection
- Browser extension

---

## 📄 License

MIT License – Free for personal and commercial use.

---

Built with ❤️ for a safer Nepal 🇳🇵
