/**
 * Email Analyzer Page
 * Detects phishing and scam patterns in email content
 */

import React, { useState } from 'react';
import { Mail, Shield, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import ResultCard from '../components/ResultCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { analyzeEmail } from '../utils/api';

const sampleEmails = [
  {
    label: 'Prize Scam',
    subject: 'CONGRATULATIONS! You Won NPR 500,000 Lottery Prize!!!',
    body: 'Dear Winner, You have been selected in the Nepal National Lottery. You won NPR 500,000! CLICK HERE immediately to claim your prize. Provide your bank account number and PIN to verify your identity. This offer expires TODAY!',
    sender: 'lottery@gmail.com'
  },
  {
    label: 'eSewa Phishing',
    subject: 'Urgent: Your eSewa Account Has Been Suspended',
    body: 'Dear Customer, your eSewa account has been suspended due to unusual activity. Please verify your account immediately by clicking the link below and entering your eSewa password and transaction PIN. Failure to act within 24 hours will result in permanent account closure.',
    sender: 'support@esewa-verify.tk'
  },
  {
    label: 'Normal Email',
    subject: 'Team Meeting Tomorrow at 10 AM',
    body: 'Hi team, just a reminder that we have our weekly sync tomorrow at 10 AM in the conference room. Please bring your project updates. Looking forward to seeing everyone. Best regards, Ramesh.',
    sender: 'ramesh@company.com.np'
  }
];

const EmailAnalyzerPage = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sender, setSender] = useState('');
  const [showSender, setShowSender] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!body.trim()) {
      setError('Please enter the email body content to analyze');
      return;
    }
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const res = await analyzeEmail(subject, body, sender);
      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error analyzing email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadSample = (sample) => {
    setSubject(sample.subject);
    setBody(sample.body);
    setSender(sample.sender);
    setResult(null);
    setError('');
    setShowSender(true);
  };

  const handleReset = () => {
    setSubject('');
    setBody('');
    setSender('');
    setResult(null);
    setError('');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-icon-wrap yellow">
          <Mail size={32} />
        </div>
        <h1>Email Scam Analyzer</h1>
        <p>Paste email content below to detect phishing attempts, urgency traps, and scam patterns.</p>
      </div>

      <div className="info-banner info-banner-yellow">
        <Mail size={16} />
        <span>Works with email text content — paste the subject and body of any suspicious email.</span>
      </div>

      {/* Sample Emails */}
      <div className="tool-card">
        <div className="samples-bar">
          <span className="examples-label">Try a sample:</span>
          {sampleEmails.map((s, i) => (
            <button key={i} className="example-btn" onClick={() => loadSample(s)}>
              {s.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleAnalyze} className="email-form">
          {/* Subject */}
          <div className="form-field">
            <label className="form-label">Email Subject</label>
            <input
              type="text"
              className="form-input"
              placeholder="Paste the email subject line..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          {/* Body */}
          <div className="form-field">
            <label className="form-label">Email Body *</label>
            <textarea
              className="form-textarea"
              placeholder="Paste the full email body here..."
              rows={7}
              value={body}
              onChange={(e) => { setBody(e.target.value); setError(''); }}
            />
          </div>

          {/* Optional sender */}
          <button
            type="button"
            className="toggle-optional"
            onClick={() => setShowSender(!showSender)}
          >
            {showSender ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            Sender email address (optional)
          </button>
          {showSender && (
            <div className="form-field">
              <input
                type="text"
                className="form-input"
                placeholder="e.g. support@nepal-bank.tk or noreply@gmail.com"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
              />
            </div>
          )}

          {error && <div className="error-msg">{error}</div>}

          <div className="form-actions">
            <button type="submit" className="btn-scan btn-yellow" disabled={loading || !body.trim()}>
              {loading
                ? <><RefreshCw size={16} className="spinning" /> Analyzing...</>
                : <><Shield size={16} /> Analyze Email</>}
            </button>
            {(subject || body) && (
              <button type="button" className="btn-reset" onClick={handleReset}>Clear</button>
            )}
          </div>
        </form>
      </div>

      {loading && <LoadingSpinner message="Scanning email for scam patterns..." />}

      {/* Results */}
      {result && !loading && (
        <div className="results-section">
          <ResultCard
            result={result.result}
            riskScore={result.riskScore}
            reasons={result.indicators}
            warnings={result.warnings}
            title="Email Analysis Result"
          >
            <div className="details-table">
              <h4>Detection Summary</h4>
              <div className="detail-row">
                <span>Urgency Words Found</span>
                <span className={result.details?.urgencyWordsFound > 0 ? 'text-red' : 'text-green'}>
                  {result.details?.urgencyWordsFound || 0}
                </span>
              </div>
              <div className="detail-row">
                <span>Financial Bait Words</span>
                <span className={result.details?.financialWordsFound > 0 ? 'text-red' : 'text-green'}>
                  {result.details?.financialWordsFound || 0}
                </span>
              </div>
              <div className="detail-row">
                <span>Info Request Phrases</span>
                <span className={result.details?.infoRequestsFound > 0 ? 'text-red' : 'text-green'}>
                  {result.details?.infoRequestsFound || 0}
                </span>
              </div>
              <div className="detail-row">
                <span>URLs Found</span>
                <span>{result.urlsFound || 0} total, {result.suspiciousUrls || 0} suspicious</span>
              </div>
            </div>
          </ResultCard>
          <button className="btn-scan-another" onClick={handleReset}>
            <Mail size={16} /> Analyze Another Email
          </button>
        </div>
      )}

      <div className="how-it-works">
        <h3>What We Check For</h3>
        <div className="how-grid">
          <div className="how-step"><div className="how-step-num">🚨</div><p>Urgency & pressure language ("Act Now!", "Expires Today")</p></div>
          <div className="how-step"><div className="how-step-num">💰</div><p>Financial bait ("You Won", "Prize", "Lottery", "Inheritance")</p></div>
          <div className="how-step"><div className="how-step-num">🔐</div><p>Requests for passwords, PINs, or personal information</p></div>
          <div className="how-step"><div className="how-step-num">🔗</div><p>Suspicious links, IP-based URLs, and shortened links</p></div>
        </div>
      </div>
    </div>
  );
};

export default EmailAnalyzerPage;
