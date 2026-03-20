/**
 * Password Checker Page
 * Real-time password strength analysis
 */

import React, { useState, useCallback } from 'react';
import { Lock, Eye, EyeOff, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { checkPassword } from '../utils/api';

const PasswordCheckerPage = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debounceTimer, setDebounceTimer] = useState(null);

  const strengthColors = {
    Weak: '#ef4444',
    Medium: '#f59e0b',
    Strong: '#22c55e',
    None: '#374151'
  };

  const strengthWidths = {
    Weak: '33%',
    Medium: '66%',
    Strong: '100%',
    None: '0%'
  };

  // Debounced live checking as user types
  const handlePasswordChange = (e) => {
    const val = e.target.value;
    setPassword(val);
    setError('');

    if (debounceTimer) clearTimeout(debounceTimer);

    if (!val) {
      setResult(null);
      return;
    }

    const timer = setTimeout(() => {
      analyzePassword(val);
    }, 400);
    setDebounceTimer(timer);
  };

  const analyzePassword = async (pwd) => {
    setLoading(true);
    try {
      const res = await checkPassword(pwd);
      setResult(res.data.data);
    } catch (err) {
      setError('Error analyzing password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter a password to check');
      return;
    }
    analyzePassword(password);
  };

  const handleReset = () => {
    setPassword('');
    setResult(null);
    setError('');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-icon-wrap green">
          <Lock size={32} />
        </div>
        <h1>Password Strength Checker</h1>
        <p>Test your password strength in real-time. We never store or transmit your passwords.</p>
      </div>

      {/* Privacy Notice */}
      <div className="info-banner info-banner-green">
        <CheckCircle size={16} />
        <span>🔒 Privacy first: your password is analyzed locally and is never stored or logged.</span>
      </div>

      {/* Main Tool */}
      <div className="tool-card">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="input-icon"><Lock size={20} /></div>
            <input
              type={showPassword ? 'text' : 'password'}
              className="scan-input"
              placeholder="Enter a password to analyze..."
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className="input-clear"
              onClick={() => setShowPassword(!showPassword)}
              style={{ color: 'var(--text-secondary)' }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && <div className="error-msg">{error}</div>}

          {/* Live Strength Bar */}
          {password && (
            <div className="strength-bar-container">
              <div className="strength-bar-track">
                <div
                  className="strength-bar-fill"
                  style={{
                    width: result ? strengthWidths[result.strength] : '0%',
                    backgroundColor: result ? strengthColors[result.strength] : '#374151',
                    transition: 'width 0.4s ease, background-color 0.3s'
                  }}
                />
              </div>
              {result && (
                <span className="strength-label" style={{ color: strengthColors[result.strength] }}>
                  {result.strength} — {result.percentage}%
                </span>
              )}
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="btn-scan btn-green" disabled={loading || !password}>
              {loading
                ? <><RefreshCw size={16} className="spinning" /> Analyzing...</>
                : <><Lock size={16} /> Check Strength</>}
            </button>
            {password && (
              <button type="button" className="btn-reset" onClick={handleReset}>
                Clear
              </button>
            )}
          </div>
        </form>
      </div>

      {loading && <LoadingSpinner message="Analyzing password strength..." />}

      {/* Results */}
      {result && !loading && (
        <div className="results-section">
          {/* Score Card */}
          <div className={`password-result-card strength-${result.strength.toLowerCase()}`}>
            <div className="pw-result-header">
              <div className="pw-score-circle">
                <svg viewBox="0 0 100 100" className="pw-score-svg">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#1f2937" strokeWidth="10" />
                  <circle
                    cx="50" cy="50" r="42" fill="none"
                    stroke={strengthColors[result.strength]}
                    strokeWidth="10"
                    strokeDasharray={`${result.percentage * 2.64} 264`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                    style={{ transition: 'stroke-dasharray 0.6s ease' }}
                  />
                </svg>
                <div className="pw-score-text">{result.percentage}%</div>
              </div>
              <div className="pw-verdict">
                <div
                  className="pw-strength-badge"
                  style={{ color: strengthColors[result.strength], borderColor: strengthColors[result.strength] }}
                >
                  {result.strength.toUpperCase()} PASSWORD
                </div>
                <div className="pw-details-summary">
                  Length: {result.details?.length} chars •
                  Score: {result.score}/100
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="pw-checklist">
              <h4>Security Checklist</h4>
              <div className="checklist-grid">
                {result.passed?.map((item, i) => (
                  <div key={i} className="checklist-item passed">
                    <CheckCircle size={16} className="check-icon-pass" />
                    <span>{item}</span>
                  </div>
                ))}
                {result.failed?.map((item, i) => (
                  <div key={i} className="checklist-item failed">
                    <XCircle size={16} className="check-icon-fail" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            {result.suggestions?.length > 0 && (
              <div className="pw-suggestions">
                <h4>💡 Suggestions to Improve</h4>
                <ul>
                  {result.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="how-it-works">
        <h3>Password Security Tips for Nepal</h3>
        <div className="how-grid">
          <div className="how-step">
            <div className="how-step-num">✓</div>
            <p>Use a passphrase: combine 4+ random words like "BlueMoon$Kathmandu#2024"</p>
          </div>
          <div className="how-step">
            <div className="how-step-num">✓</div>
            <p>Never reuse passwords across eSewa, banking, and social media accounts</p>
          </div>
          <div className="how-step">
            <div className="how-step-num">✓</div>
            <p>Enable two-factor authentication (2FA) on all financial apps</p>
          </div>
          <div className="how-step">
            <div className="how-step-num">✓</div>
            <p>Use a password manager — never store passwords in plain text on your phone</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordCheckerPage;
