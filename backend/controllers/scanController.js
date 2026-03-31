/**
 * Scan Controller
 * Handles URL scanning, password checking, and email analysis
 */

const { analyzeUrl } = require('../utils/urlAnalyzer');
const { checkPassword } = require('../utils/passwordChecker');
const { analyzeEmail } = require('../utils/emailAnalyzer');

/**
 * @desc    Analyze a URL for phishing/threats
 * @route   POST /api/scan-url
 * @access  Public
 */
const scanUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || url.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please provide a URL to scan'
      });
    }

    if (url.length > 2048) {
      return res.status(400).json({
        success: false,
        message: 'URL is too long to analyze'
      });
    }

    const result = analyzeUrl(url.trim());

    res.json({
      success: true,
      data: result,
      scannedAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('URL scan error:', err);
    res.status(500).json({ success: false, message: 'Error analyzing URL' });
  }
};

/**
 * @desc    Check password strength
 * @route   POST /api/check-password
 * @access  Public
 */
const checkPasswordStrength = async (req, res) => {
  try {
    const { password } = req.body;

    if (password === undefined || password === null) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a password to check'
      });
    }

    const result = checkPassword(password);

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error('Password check error:', err);
    res.status(500).json({ success: false, message: 'Error checking password' });
  }
};

/**
 * @desc    Analyze email for scam/phishing
 * @route   POST /api/analyze-email
 * @access  Public
 */
const analyzeEmailContent = (req, res) => {
  try {
    const { subject, body, sender } = req.body;

    if (!body || body.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please provide email body content to analyze'
      });
    }

    const result = analyzeEmail(subject || '', body, sender || '');

    res.json({
      success: true,
      data: result,
      analyzedAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('Email analysis error:', err);
    res.status(500).json({ success: false, message: 'Error analyzing email' });
  }
};

module.exports = { scanUrl, checkPasswordStrength, analyzeEmailContent };
