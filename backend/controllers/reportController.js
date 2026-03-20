/**
 * Report Controller
 * Handles threat report submissions and retrieval
 */

const Report = require('../models/Report');

/**
 * @desc    Submit a threat report
 * @route   POST /api/report-threat
 * @access  Public
 */
const submitReport = async (req, res) => {
  try {
    const { type, content, description } = req.body;

    if (!type || !content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide report type and content'
      });
    }

    const validTypes = ['scam_website', 'fraud_message', 'phishing_email', 'fake_app', 'other'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid report type'
      });
    }

    const report = await Report.create({
      type,
      content,
      description: description || '',
      reportedBy: req.user ? req.user._id : null
    });

    res.status(201).json({
      success: true,
      message: '✅ Report submitted successfully. Thank you for helping protect Nepal!',
      reportId: report._id
    });
  } catch (err) {
    console.error('Report submission error:', err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages[0] });
    }
    res.status(500).json({ success: false, message: 'Error submitting report' });
  }
};

/**
 * @desc    Get all reports (admin)
 * @route   GET /api/reports
 * @access  Private/Admin
 */
const getReports = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    if (req.query.status) filter.status = req.query.status;

    const [reports, total] = await Promise.all([
      Report.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('reportedBy', 'name email'),
      Report.countDocuments(filter)
    ]);

    res.json({
      success: true,
      data: reports,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (err) {
    console.error('Get reports error:', err);
    res.status(500).json({ success: false, message: 'Error fetching reports' });
  }
};

/**
 * @desc    Get recent public reports (limited info)
 * @route   GET /api/recent-reports
 * @access  Public
 */
const getRecentReports = async (req, res) => {
  try {
    const reports = await Report.find({ status: { $ne: 'pending' } })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('type content createdAt status');

    res.json({ success: true, data: reports });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching reports' });
  }
};

module.exports = { submitReport, getReports, getRecentReports };
