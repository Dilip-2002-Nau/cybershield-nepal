const express = require('express');
const router = express.Router();
const { scanUrl, checkPasswordStrength, analyzeEmailContent } = require('../controllers/scanController');

router.post('/scan-url', scanUrl);
router.post('/check-password', checkPasswordStrength);
router.post('/analyze-email', analyzeEmailContent);

module.exports = router;
