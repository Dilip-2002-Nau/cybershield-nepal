const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { submitReport, getReports, getRecentReports } = require('../controllers/reportController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const reportLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { success: false, message: 'Too many reports submitted. Please try again later.' }
});

router.post('/report-threat', reportLimiter, submitReport);
router.get('/recent-reports', getRecentReports);
router.get('/reports', protect, adminOnly, getReports);

module.exports = router;
