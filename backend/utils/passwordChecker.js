/**
 * Password Strength Checker Utility
 * Analyzes password strength and provides actionable suggestions
 * 
 * @module passwordChecker
 */

// Common weak passwords to flag
const COMMON_PASSWORDS = [
  'password', '123456', '12345678', 'qwerty', 'abc123', 'password1',
  'admin', 'letmein', 'welcome', 'monkey', 'dragon', 'master',
  'password123', '111111', 'sunshine', 'princess', 'iloveyou',
  'nepal123', 'kathmandu', 'namaste', 'namaskar'
];

/**
 * Checks password strength and returns analysis
 * @param {string} password - The password to analyze
 * @returns {object} Strength analysis with score, label, and suggestions
 */
const checkPassword = (password) => {
  if (!password || password.length === 0) {
    return {
      strength: 'None',
      score: 0,
      percentage: 0,
      suggestions: ['Please enter a password'],
      passed: [],
      failed: []
    };
  }

  const suggestions = [];
  const passed = [];
  const failed = [];
  let score = 0;

  // ─── Check: Common passwords ──────────────────────────────────
  if (COMMON_PASSWORDS.includes(password.toLowerCase())) {
    return {
      strength: 'Weak',
      score: 5,
      percentage: 5,
      suggestions: [
        '🚨 This is a very common password – change it immediately',
        'Avoid dictionary words and predictable patterns',
        'Use a passphrase like "BlueMoon$Kathmandu#2024"'
      ],
      passed: [],
      failed: ['Not a commonly used password', 'Minimum length', 'Has uppercase', 'Has lowercase', 'Has numbers', 'Has special characters']
    };
  }

  // ─── Check 1: Minimum length (8 chars) ────────────────────────
  if (password.length >= 8) {
    score += 15;
    passed.push('Minimum length (8+ characters)');
  } else {
    failed.push('Minimum length (8+ characters)');
    suggestions.push(`Add ${8 - password.length} more characters (minimum 8 required)`);
  }

  // ─── Check 2: Good length (12+ chars) ────────────────────────
  if (password.length >= 12) {
    score += 15;
    passed.push('Good length (12+ characters)');
  } else if (password.length >= 8) {
    suggestions.push('Consider using 12+ characters for stronger security');
  }

  // ─── Check 3: Excellent length (16+ chars) ───────────────────
  if (password.length >= 16) {
    score += 10;
    passed.push('Excellent length (16+ characters)');
  }

  // ─── Check 4: Uppercase letters ──────────────────────────────
  const hasUppercase = /[A-Z]/.test(password);
  if (hasUppercase) {
    score += 15;
    passed.push('Contains uppercase letters');
  } else {
    failed.push('Contains uppercase letters');
    suggestions.push('Add uppercase letters (A-Z)');
  }

  // ─── Check 5: Lowercase letters ──────────────────────────────
  const hasLowercase = /[a-z]/.test(password);
  if (hasLowercase) {
    score += 15;
    passed.push('Contains lowercase letters');
  } else {
    failed.push('Contains lowercase letters');
    suggestions.push('Add lowercase letters (a-z)');
  }

  // ─── Check 6: Numbers ─────────────────────────────────────────
  const hasNumbers = /[0-9]/.test(password);
  if (hasNumbers) {
    score += 15;
    passed.push('Contains numbers');
  } else {
    failed.push('Contains numbers');
    suggestions.push('Add numbers (0-9)');
  }

  // ─── Check 7: Special characters ─────────────────────────────
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  if (hasSpecial) {
    score += 20;
    passed.push('Contains special characters');
  } else {
    failed.push('Contains special characters');
    suggestions.push('Add special characters (!@#$%^&*)');
  }

  // ─── Check 8: No repeating characters ────────────────────────
  const hasRepeating = /(.)\1{2,}/.test(password);
  if (!hasRepeating) {
    score += 5;
    passed.push('No repetitive characters');
  } else {
    suggestions.push('Avoid repeating characters (aaa, 111)');
    score = Math.max(0, score - 5);
  }

  // ─── Check 9: No sequential patterns ─────────────────────────
  const hasSequential = /(012|123|234|345|456|567|678|789|890|abc|bcd|cde|qwe|wer)/i.test(password);
  if (hasSequential) {
    suggestions.push('Avoid sequential patterns (123, abc, qwe)');
    score = Math.max(0, score - 5);
  }

  // ─── Determine Strength Label ─────────────────────────────────
  let strength;
  const percentage = Math.min(score, 100);

  if (percentage >= 80) {
    strength = 'Strong';
    if (suggestions.length === 0) {
      suggestions.push('✅ Excellent password! Keep it safe and never share it.');
    }
  } else if (percentage >= 50) {
    strength = 'Medium';
  } else {
    strength = 'Weak';
  }

  return {
    strength,
    score: Math.min(score, 100),
    percentage: Math.min(score, 100),
    suggestions,
    passed,
    failed,
    details: {
      length: password.length,
      hasUppercase,
      hasLowercase,
      hasNumbers,
      hasSpecial,
      hasRepeating,
      hasSequential
    }
  };
};

module.exports = { checkPassword };
