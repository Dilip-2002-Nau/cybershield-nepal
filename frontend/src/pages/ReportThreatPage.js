/**
 * Report Threat Page
 * Allows users to submit cyber threat reports
 */

import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Send, RefreshCw } from 'lucide-react';
import { submitReport } from '../utils/api';

const reportTypes = [
  { value: 'scam_website', label: '🌐 Scam Website', desc: 'Fake or fraudulent website' },
  { value: 'fraud_message', label: '💬 Fraud Message', desc: 'Viber/WhatsApp/SMS scam' },
  { value: 'phishing_email', label: '📧 Phishing Email', desc: 'Deceptive email attempt' },
  { value: 'fake_app', label: '📱 Fake App', desc: 'Fraudulent mobile application' },
  { value: 'other', label: '⚠️ Other', desc: 'Other cyber threat' },
];

const ReportThreatPage = () => {
  const [form, setForm] = useState({ type: '', content: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.type) e.type = 'Please select a threat type';
    if (!form.content.trim()) e.content = 'Please provide the threat content (URL, message, etc.)';
    if (form.content.length > 1000) e.content = 'Content too long (max 1000 characters)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError('');
    try {
      await submitReport(form);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ type: '', content: '', description: '' });
    setSuccess(false);
    setError('');
    setErrors({});
  };

  if (success) {
    return (
      <div className="page-container">
        <div className="success-container">
          <div className="success-icon-wrap">
            <CheckCircle size={64} className="success-icon" />
          </div>
          <h2>Report Submitted Successfully!</h2>
          <p>
            Thank you for helping protect Nepal's digital community. Your report has been
            recorded and will be reviewed by our team.
          </p>
          <p className="success-note">
            Together we can make Nepal's cyberspace safer for everyone. 🇳🇵
          </p>
          <button className="btn-scan" onClick={handleReset}>
            <AlertTriangle size={16} /> Submit Another Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-icon-wrap red">
          <AlertTriangle size={32} />
        </div>
        <h1>Report a Cyber Threat</h1>
        <p>
          Spotted a scam website or fraud message? Report it here to help protect
          other Nepali internet users.
        </p>
      </div>

      <div className="info-banner info-banner-red">
        <AlertTriangle size={16} />
        <span>
          Reports can be submitted anonymously. All submissions are reviewed to help
          build Nepal's cybersecurity database.
        </span>
      </div>

      <div className="tool-card">
        <form onSubmit={handleSubmit} className="report-form">

          {/* Threat Type */}
          <div className="form-field">
            <label className="form-label">Threat Type *</label>
            <div className="report-type-grid">
              {reportTypes.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  className={`report-type-btn ${form.type === t.value ? 'report-type-active' : ''}`}
                  onClick={() => handleChange('type', t.value)}
                >
                  <span className="report-type-label">{t.label}</span>
                  <span className="report-type-desc">{t.desc}</span>
                </button>
              ))}
            </div>
            {errors.type && <div className="field-error">{errors.type}</div>}
          </div>

          {/* Threat Content */}
          <div className="form-field">
            <label className="form-label">
              Threat Content *
              <span className="field-hint">URL, phone number, message text, etc.</span>
            </label>
            <textarea
              className={`form-textarea ${errors.content ? 'input-error' : ''}`}
              rows={4}
              placeholder={
                form.type === 'scam_website' ? 'Paste the suspicious URL here...' :
                form.type === 'fraud_message' ? 'Paste the scam message here...' :
                form.type === 'phishing_email' ? 'Paste the phishing email content...' :
                'Describe or paste the threat content...'
              }
              value={form.content}
              onChange={(e) => handleChange('content', e.target.value)}
              maxLength={1000}
            />
            <div className="char-count">{form.content.length}/1000</div>
            {errors.content && <div className="field-error">{errors.content}</div>}
          </div>

          {/* Description */}
          <div className="form-field">
            <label className="form-label">
              Additional Description
              <span className="field-hint">Optional — provide more context</span>
            </label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Describe how you encountered this threat, who it targeted, what happened..."
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              maxLength={2000}
            />
          </div>

          {error && <div className="error-msg">{error}</div>}

          <div className="form-actions">
            <button type="submit" className="btn-scan btn-red" disabled={loading}>
              {loading
                ? <><RefreshCw size={16} className="spinning" /> Submitting...</>
                : <><Send size={16} /> Submit Report</>}
            </button>
          </div>
        </form>
      </div>

      {/* Why Report */}
      <div className="how-it-works">
        <h3>Why Your Report Matters</h3>
        <div className="how-grid">
          <div className="how-step"><div className="how-step-num">🛡️</div><p>Reports help build a database of known threats targeting Nepali users</p></div>
          <div className="how-step"><div className="how-step-num">🚨</div><p>Verified threats can be flagged to warn future visitors</p></div>
          <div className="how-step"><div className="how-step-num">🤝</div><p>Community-driven protection keeps everyone safer online</p></div>
          <div className="how-step"><div className="how-step-num">📊</div><p>Data is used to improve our AI detection algorithms</p></div>
        </div>
      </div>
    </div>
  );
};

export default ReportThreatPage;
