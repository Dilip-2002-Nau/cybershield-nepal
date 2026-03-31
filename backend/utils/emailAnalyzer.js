/**
 * Email Scam Analyzer Utility
 * Detects phishing and scam indicators in email content
 * 
 * @module emailAnalyzer
 */

// Urgency and manipulation trigger words
const URGENCY_WORDS = [
  'urgent', 'immediately', 'now', 'asap', 'act now', 'limited time',
  'expires today', 'last chance', 'final notice', 'respond now',
  'click here', 'verify now', 'confirm now', 'update required',
  'account suspended', 'account blocked', 'verify your account',
  'validate your', 'unusual activity', 'security alert', 'action required'
];

// Financial/greed trigger words
const FINANCIAL_WORDS = [
  'you won', 'winner', 'congratulations', 'prize', 'lottery', 'jackpot',
  'million dollars', 'free money', 'cash prize', 'inheritance',
  'investment opportunity', 'double your money', 'guaranteed income',
  'no risk', '100% profit', 'make money fast', 'work from home',
  'earn money online', 'bitcoin', 'cryptocurrency investment'
];

// Personal information requests
const INFO_REQUEST_WORDS = [
  'enter your password', 'provide your', 'send your', 'confirm your password',
  'social security', 'credit card number', 'bank account', 'pin number',
  'mother maiden name', 'date of birth', 'personal details', 'login credentials'
];

// Nepali-specific scam patterns
const NEPALI_SCAM_PATTERNS = [
  'esewa password', 'khalti verify', 'ime verify', 'nbl bank',
  'nepal bank', 'rastriya banijya', 'prize nepal', 'np winner'
];

// URL detection regex
const URL_REGEX = /https?:\/\/[^\s<>"{}|\\^`[\]]+|www\.[^\s<>"{}|\\^`[\]]+/gi;

// Suspicious link patterns
const SUSPICIOUS_URL_PATTERNS = [
  /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, // IP addresses
  /bit\.ly|tinyurl|t\.co|goo\.gl|ow\.ly/, // URL shorteners
  /\.tk|\.ml|\.ga|\.cf|\.gq/, // Suspicious TLDs
];

/**
 * Analyzes email content for scam/phishing indicators
 * @param {string} subject - Email subject line
 * @param {string} body - Email body content
 * @param {string} sender - Sender email address (optional)
 * @returns {object} Analysis result with risk assessment
 */
const analyzeEmail = (subject = '', body = '', sender = '') => {
  const allText = `${subject} ${body} ${sender}`.toLowerCase();
  const foundIndicators = [];
  const warnings = [];
  let riskScore = 0;

  // ─── Check 1: Urgency words ────────────────────────────────────
  const foundUrgency = URGENCY_WORDS.filter(word => allText.includes(word));
  if (foundUrgency.length > 0) {
    riskScore += Math.min(foundUrgency.length * 8, 30);
    foundIndicators.push(`🚨 Urgency manipulation: "${foundUrgency.slice(0, 3).join('", "')}"`);
  }

  // ─── Check 2: Financial scam words ────────────────────────────
  const foundFinancial = FINANCIAL_WORDS.filter(word => allText.includes(word));
  if (foundFinancial.length > 0) {
    riskScore += Math.min(foundFinancial.length * 10, 35);
    foundIndicators.push(`💰 Financial bait detected: "${foundFinancial.slice(0, 2).join('", "')}"`);
  }

  // ─── Check 3: Personal info requests ──────────────────────────
  const foundInfoRequest = INFO_REQUEST_WORDS.filter(word => allText.includes(word));
  if (foundInfoRequest.length > 0) {
    riskScore += 30;
    foundIndicators.push(`🔐 Requesting sensitive information: "${foundInfoRequest[0]}"`);
  }

  // ─── Check 4: Nepali scam patterns ────────────────────────────
  const foundNepaliPatterns = NEPALI_SCAM_PATTERNS.filter(p => allText.includes(p));
  if (foundNepaliPatterns.length > 0) {
    riskScore += 25;
    foundIndicators.push(`🇳🇵 Nepali financial service impersonation detected`);
  }

  // ─── Check 5: Suspicious URLs ─────────────────────────────────
  const allContent = `${subject} ${body}`;
  const foundUrls = allContent.match(URL_REGEX) || [];
  const suspiciousUrls = foundUrls.filter(url =>
    SUSPICIOUS_URL_PATTERNS.some(pattern => pattern.test(url))
  );

  if (suspiciousUrls.length > 0) {
    riskScore += 25;
    foundIndicators.push(`🔗 Suspicious links detected: ${suspiciousUrls.length} malicious URL(s)`);
  } else if (foundUrls.length > 3) {
    warnings.push(`Contains ${foundUrls.length} URLs – verify each one carefully`);
    riskScore += 10;
  }

  // ─── Check 6: Sender domain check ────────────────────────────
  if (sender) {
    const senderLower = sender.toLowerCase();
    // Check for free email services impersonating companies
    if (
      (senderLower.includes('gmail') || senderLower.includes('yahoo') || senderLower.includes('hotmail')) &&
      (senderLower.includes('bank') || senderLower.includes('paypal') || senderLower.includes('amazon') || /nepal\s*bank|nbl|rastriya\s*banijya/i.test(senderLower))
    ) {
      riskScore += 20;
      foundIndicators.push('📧 Sender uses free email claiming to be a company/bank');
    }

    // Check for misspelled popular domains
    const typosquatPatterns = /paypa1|arnazon|g00gle|micros0ft|faceb00k/i;
    if (typosquatPatterns.test(sender)) {
      riskScore += 35;
      foundIndicators.push('🚨 Sender domain appears to be a typosquatted impersonation');
    }
  }

  // ─── Check 7: Excessive caps / exclamation ────────────────────
  const capsRatio = (body.match(/[A-Z]/g) || []).length / Math.max(body.length, 1);
  const exclamationCount = (body.match(/!/g) || []).length;
  if (capsRatio > 0.3 && body.length > 20) {
    riskScore += 10;
    warnings.push('Excessive capitalization – common manipulation tactic');
  }
  if (exclamationCount > 3) {
    riskScore += 5;
    warnings.push('Multiple exclamation marks – pressure tactic indicator');
  }

  // ─── Check 8: Grammar errors (basic detection) ───────────────
  const doubleSpaces = (body.match(/\s{2,}/g) || []).length;
  if (doubleSpaces > 5) {
    warnings.push('Multiple spacing errors – may indicate automated scam message');
  }

  // ─── Determine Result ─────────────────────────────────────────
  let result;
  const percentage = Math.min(riskScore, 100);

  if (percentage >= 50) {
    result = 'Dangerous';
  } else if (percentage >= 25) {
    result = 'Suspicious';
  } else {
    result = 'Safe';
    if (foundIndicators.length === 0) {
      foundIndicators.push('✅ No significant scam patterns detected');
    }
  }

  return {
    result,
    riskScore: percentage,
    indicators: foundIndicators.length > 0 ? foundIndicators : ['✅ No major red flags found'],
    warnings,
    urlsFound: foundUrls.length,
    suspiciousUrls: suspiciousUrls.length,
    details: {
      urgencyWordsFound: foundUrgency.length,
      financialWordsFound: foundFinancial.length,
      infoRequestsFound: foundInfoRequest.length,
      totalUrls: foundUrls.length,
      suspiciousUrlCount: suspiciousUrls.length
    }
  };
};

module.exports = { analyzeEmail };
