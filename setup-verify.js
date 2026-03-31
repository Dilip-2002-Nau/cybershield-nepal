#!/usr/bin/env node

/**
 * CyberShield Nepal - System Setup Verification
 * Checks all configuration and dependencies
 * 
 * Run with: node setup-verify.js
 */

const fs = require('fs');
const path = require('path');

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

const checks = [];

function log(color, text) {
  console.log(`${COLORS[color]}${text}${COLORS.reset}`);
}

function check(title, condition, errorMsg = 'Failed') {
  const status = condition ? '✅' : '❌';
  const color = condition ? 'green' : 'red';
  log(color, `${status} ${title}`);
  if (!condition) {
    checks.push({ title, error: errorMsg });
  }
  return condition;
}

async function verifySetup() {
  log('cyan', '\n🔍 CyberShield Nepal - System Verification\n');
  log('cyan', '═══════════════════════════════════════════\n');

  // ─── Check 1: Backend Environment ────────────────────────────
  log('blue', '📋 Backend Environment Check');
  const backendEnvPath = path.join(__dirname, 'backend', '.env');
  check('Backend .env file exists', fs.existsSync(backendEnvPath), 'Create backend/.env');

  if (fs.existsSync(backendEnvPath)) {
    const envContent = fs.readFileSync(backendEnvPath, 'utf8');
    check('  MongoDB URI configured', envContent.includes('MONGODB_URI='), 'Set MONGODB_URI in .env');
    check('  JWT Secret configured', envContent.includes('JWT_SECRET='), 'Set JWT_SECRET in .env');
    check('  PORT configured', envContent.includes('PORT='), 'Set PORT in .env');
  }
  console.log();

  // ─── Check 2: Backend Dependencies ──────────────────────────
  log('blue', '📦 Backend Dependencies Check');
  const backendPkgPath = path.join(__dirname, 'backend', 'package.json');
  check('Backend package.json exists', fs.existsSync(backendPkgPath), 'Create backend/package.json');

  const backendNodeModules = path.join(__dirname, 'backend', 'node_modules');
  check('  Dependencies installed (node_modules)', fs.existsSync(backendNodeModules), 
    'Run: cd backend && npm install');
  console.log();

  // ─── Check 3: Backend Files ────────────────────────────────
  log('blue', '📁 Backend Files Check');
  check('server.js exists', fs.existsSync(path.join(__dirname, 'backend', 'server.js')), 'Missing server.js');
  check('  routes/authRoutes.js exists', fs.existsSync(path.join(__dirname, 'backend', 'routes', 'authRoutes.js')), 'Missing authRoutes');
  check('  models/User.js exists', fs.existsSync(path.join(__dirname, 'backend', 'models', 'User.js')), 'Missing User model');
  check('  controllers/authController.js exists', fs.existsSync(path.join(__dirname, 'backend', 'controllers', 'authController.js')), 'Missing authController');
  check('  utils/errorHandler.js exists', fs.existsSync(path.join(__dirname, 'backend', 'utils', 'errorHandler.js')), 'Missing errorHandler');
  check('  utils/configValidator.js exists', fs.existsSync(path.join(__dirname, 'backend', 'utils', 'configValidator.js')), 'Missing configValidator');
  console.log();

  // ─── Check 4: Frontend Environment ──────────────────────────
  log('blue', '🎨 Frontend Environment Check');
  const frontendEnvPath = path.join(__dirname, 'frontend', '.env.local');
  const frontendEnvExamplePath = path.join(__dirname, 'frontend', '.env.example');
  check('Frontend .env.example exists', fs.existsSync(frontendEnvExamplePath), 'Create frontend/.env.example');
  check('Frontend .env.local configured', fs.existsSync(frontendEnvPath), 
    'Copy frontend/.env.example to frontend/.env.local and customize');
  console.log();

  // ─── Check 5: Frontend Dependencies ──────────────────────────
  log('blue', '📦 Frontend Dependencies Check');
  const frontendPkgPath = path.join(__dirname, 'frontend', 'package.json');
  check('Frontend package.json exists', fs.existsSync(frontendPkgPath), 'Create frontend/package.json');

  const frontendNodeModules = path.join(__dirname, 'frontend', 'node_modules');
  check('  Dependencies installed (node_modules)', fs.existsSync(frontendNodeModules), 
    'Run: cd frontend && npm install');
  console.log();

  // ─── Check 6: Frontend Files ────────────────────────────────
  log('blue', '📁 Frontend Files Check');
  check('src/App.js exists', fs.existsSync(path.join(__dirname, 'frontend', 'src', 'App.js')), 'Missing App.js');
  check('  src/context/AuthContext.js exists', fs.existsSync(path.join(__dirname, 'frontend', 'src', 'context', 'AuthContext.js')), 'Missing AuthContext');
  check('  src/utils/api.js exists', fs.existsSync(path.join(__dirname, 'frontend', 'src', 'utils', 'api.js')), 'Missing api.js');
  console.log();

  // ─── Check 7: Database Connection ───────────────────────────
  log('blue', '💾 Database Configuration');
  if (fs.existsSync(backendEnvPath)) {
    const envContent = fs.readFileSync(backendEnvPath, 'utf8');
    const mongoMatch = envContent.match(/MONGODB_URI=(.+)/);
    if (mongoMatch && mongoMatch[1]) {
      const mongoUri = mongoMatch[1].trim();
      const isValid = mongoUri.includes('mongodb+srv') || mongoUri.includes('mongodb://');
      check('  MongoDB URI format valid', isValid, 'MongoDB URI should start with mongodb:// or mongodb+srv://');
    }
  }
  console.log();

  // ─── Summary ─────────────────────────────────────────────────
  log('cyan', '\n═══════════════════════════════════════════\n');
  
  if (checks.length === 0) {
    log('green', '✅ All checks passed! System is ready.\n');
    log('yellow', '📝 Next Steps:');
    console.log('  1. Backend: npm run dev (from backend directory)');
    console.log('  2. Frontend: npm start (from frontend directory)');
    console.log('  3. OR run: npm run dev (from root directory)\n');
  } else {
    log('red', `❌ ${checks.length} check(s) failed:\n`);
    checks.forEach((c, i) => {
      console.log(`  ${i + 1}. ${c.title}`);
      console.log(`     ➜ ${c.error}\n`);
    });
  }
}

verifySetup().catch(err => {
  log('red', `\n❌ Verification error: ${err.message}\n`);
  process.exit(1);
});
