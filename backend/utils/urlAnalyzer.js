/**
 * URL Analyzer Utility
 * Analyzes URLs for phishing and malicious indicators
 * 
 * @module urlAnalyzer
 */

// Suspicious keywords commonly used in phishing URLs
const SUSPICIOUS_KEYWORDS = [
  'login', 'verify', 'bank', 'account', 'update', 'secure',
  'paypal', 'amazon', 'apple', 'microsoft', 'google', 'facebook',
  'password', 'credential', 'confirm', 'reset', 'click', 'free',
  'winner', 'lucky', 'prize', 'urgent', 'alert', 'suspended',
  'signin', 'wallet', 'crypto', 'esewa', 'khalti', 'ime'
];

// Known suspicious TLDs often used in phishing
const SUSPICIOUS_TLDS = ['.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top', '.click'];

// Common legitimate domains (whitelisted)
const TRUSTED_DOMAINS = [
  'google.com', 'facebook.com', 'youtube.com', 'wikipedia.org',
  'github.com', 'stackoverflow.com', 'gov.np', 'police.gov.np'
];

/**
 * Analyzes a URL for security threats
 * @param {string} url - The URL to analyze
 * @returns {object} Analysis result with risk level and reasons
 */
const analyzeUrl = (url) => {
  const reasons = [];
  const warnings = [];
  let riskScore = 0;

  // ─── Normalize URL ────────────────────────────────────────────
  let normalizedUrl = url.trim();
  if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
    normalizedUrl = 'http://' + normalizedUrl;
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(normalizedUrl);
  } catch {
    return {
      result: 'Dangerous',
      riskScore: 100,
      reasons: ['Invalid URL format – cannot be parsed'],
      warnings: [],
      details: { url, isHttps: false, urlLength: url.length }
    };
  }

  const hostname = parsedUrl.hostname.toLowerCase();
  const fullUrl = parsedUrl.href.toLowerCase();
  const protocol = parsedUrl.protocol;

  // ─── Check 1: HTTPS ───────────────────────────────────────────
  const isHttps = protocol === 'https:';
  if (!isHttps) {
    riskScore += 30;
    reasons.push('⚠️ Not using HTTPS – data is transmitted unencrypted');
  }

  // ─── Check 2: URL Length ──────────────────────────────────────
  const urlLength = url.length;
  if (urlLength > 100) {
    riskScore += 20;
    reasons.push(`⚠️ Unusually long URL (${urlLength} characters) – phishing sites often hide real destinations`);
  } else if (urlLength > 75) {
    riskScore += 10;
    warnings.push(`URL is moderately long (${urlLength} characters)`);
  }

  // ─── Check 3: IP Address instead of domain ───────────────────
  const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipPattern.test(hostname)) {
    riskScore += 35;
    reasons.push('🚨 URL uses an IP address instead of a domain name – major red flag');
  }

  // ─── Check 4: Suspicious Keywords ────────────────────────────
  const foundKeywords = SUSPICIOUS_KEYWORDS.filter(keyword =>
    fullUrl.includes(keyword)
  );
  if (foundKeywords.length > 0) {
    riskScore += Math.min(foundKeywords.length * 10, 30);
    reasons.push(`⚠️ Contains suspicious keywords: ${foundKeywords.join(', ')}`);
  }

  // ─── Check 5: Suspicious TLD ─────────────────────────────────
  const hasSuspiciousTld = SUSPICIOUS_TLDS.some(tld => hostname.endsWith(tld));
  if (hasSuspiciousTld) {
    riskScore += 25;
    reasons.push('🚨 Uses a suspicious free top-level domain (.tk, .ml, etc.)');
  }

  // ─── Check 6: Multiple subdomains ────────────────────────────
  const subdomainCount = hostname.split('.').length - 2;
  if (subdomainCount > 2) {
    riskScore += 15;
    warnings.push(`Has ${subdomainCount} subdomains – could be masking real destination`);
  }

  // ─── Check 7: Hyphen abuse ────────────────────────────────────
  const hyphenCount = (hostname.match(/-/g) || []).length;
  if (hyphenCount > 2) {
    riskScore += 10;
    warnings.push('Multiple hyphens in domain – common phishing technique');
  }

  // ─── Check 8: @ symbol in URL ────────────────────────────────
  if (fullUrl.includes('@')) {
    riskScore += 30;
    reasons.push('🚨 URL contains "@" symbol – used to trick users about real destination');
  }

  // ─── Check 9: Double slashes in path ─────────────────────────
  if (parsedUrl.pathname.includes('//')) {
    riskScore += 10;
    warnings.push('Path contains double slashes – unusual URL structure');
  }

  // ─── Check 10: Trusted domain check ──────────────────────────
  const isTrusted = TRUSTED_DOMAINS.some(domain => hostname.endsWith(domain));
  if (isTrusted) {
    riskScore = Math.max(0, riskScore - 20);
    warnings.push('✅ Domain appears to be a known legitimate site');
  }

  // ─── Determine Risk Level ─────────────────────────────────────
  let result;
  if (riskScore >= 50) {
    result = 'Dangerous';
  } else if (riskScore >= 20) {
    result = 'Suspicious';
  } else {
    result = 'Safe';
    if (reasons.length === 0) {
      reasons.push('✅ No major threats detected');
    }
  }

  return {
    result,
    riskScore: Math.min(riskScore, 100),
    reasons: reasons.length > 0 ? reasons : ['✅ No significant threats detected'],
    warnings,
    details: {
      url: normalizedUrl,
      hostname,
      isHttps,
      urlLength,
      foundKeywords,
      subdomainCount
    }
  };
};

module.exports = { analyzeUrl };
