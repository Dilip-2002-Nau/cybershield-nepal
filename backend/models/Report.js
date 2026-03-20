/**
 * Report Model
 * Stores user-submitted threat/scam reports
 */

const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Report type is required'],
    enum: ['scam_website', 'fraud_message', 'phishing_email', 'fake_app', 'other'],
  },
  content: {
    type: String,
    required: [true, 'Report content is required'],
    trim: true,
    maxlength: [1000, 'Content cannot exceed 1000 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null // Allow anonymous reports
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'resolved'],
    default: 'pending'
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
reportSchema.index({ createdAt: -1 });
reportSchema.index({ type: 1, status: 1 });

module.exports = mongoose.model('Report', reportSchema);
