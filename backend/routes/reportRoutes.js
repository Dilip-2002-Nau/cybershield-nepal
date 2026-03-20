const express = require('express');
const router = express.Router();
const { submitReport, getReports, getRecentReports } = require('../controllers/reportController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/report-threat', submitReport);
router.get('/recent-reports', getRecentReports);
router.get('/reports', protect, adminOnly, getReports);

module.exports = router;
