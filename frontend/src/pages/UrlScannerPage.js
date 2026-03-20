/**
 * URL Scanner Page
 * Analyzes URLs for phishing and security threats
 */

import React, { useState } from 'react';
import { Search, Shield, ExternalLink, RefreshCw, Info } from 'lucide-react';
import ResultCard from '../components/ResultCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { scanUrl } from '../utils/api';

const exampleUrls = [
  { url: 'https://google.com', label: 'Safe - Google' },
  { url: 'http://nepal-bank-login.tk/verify', label: 'Dangerous - Phishing' },
  { url: 'http://paypa1.com/account/update', label: 'Dangerous - Typosquat' },
];

const UrlScannerPage = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please enter a URL to scan');
      return;
    }

    setError('');
    setResult(null);
    setLoading(true);

    try {
      const res = await scanUrl(url.trim());
      setResult(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error scanning URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleExample = (exUrl) => {
    setUrl(exUrl);
    setResult(null);
    setError('');
  };

  const handleReset = () => {
    setUrl('');
    setResult(null);
    setError('');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="page-icon-wrap blue">
          <Search size={32} />
        </div>
        <h1>URL Phishing Detector</h1>
        <p>Paste any URL below to instantly analyze it for phishing, malware, and suspicious activity.</p>
      </div>

      {/* Info Banner */}
      <div className="info-banner">
        <Info size={16} />
        <span>
          Our scanner checks for HTTPS usage, suspicious keywords, IP-based URLs, known
          phishing patterns, and more — including threats targeting Nepali users.
        </span>
      </div>

      {/* Scanner Form */}
      <div className="tool-card">
        <form onSubmit={handleScan} className="scan-form">
          <div className="input-group">
            <div className="input-icon"><Search size={20} /></div>
            <input
              type="text"
              className="scan-input"
              placeholder="Enter URL (e.g. https://example.com or http://suspicious-site.tk)"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setError(''); }}
              disabled={loading}
            />
            {url && (
              <button type="button" className="input-clear" onClick={handleReset}>×</button>
            )}
          </div>
          {error && <div className="error-msg">{error}</div>}
          <div className="form-actions">
            <button type="submit" className="btn-scan" disabled={loading || !url.trim()}>
              {loading ? <><RefreshCw size={16} className="spinning" /> Scanning...</> : <><Shield size={16} /> Scan URL</>}
            </button>
          </div>
        </form>

        {/* Example URLs */}
        <div className="examples-section">
          <span className="examples-label">Try an example:</span>
          {exampleUrls.map((ex, i) => (
            <button
              key={i}
              className="example-btn"
              onClick={() => handleExample(ex.url)}
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && <LoadingSpinner message="Scanning URL for threats..." />}

      {/* Results */}
      {result && !loading && (
        <div className="results-section">
          <ResultCard
            result={result.result}
            riskScore={result.riskScore}
            reasons={result.reasons}
            warnings={result.warnings}
            title="URL Scan Result"
          >
            {/* Details table */}
            <div className="details-table">
              <h4>Technical Details</h4>
              <div className="detail-row">
                <span>Protocol</span>
                <span className={result.details?.isHttps ? 'text-green' : 'text-red'}>
                  {result.details?.isHttps ? '✅ HTTPS (Secure)' : '⚠️ HTTP (Insecure)'}
                </span>
              </div>
              <div className="detail-row">
                <span>URL Length</span>
                <span>{result.details?.urlLength} characters</span>
              </div>
              <div className="detail-row">
                <span>Domain</span>
                <span className="detail-monospace">{result.details?.hostname || 'N/A'}</span>
              </div>
              {result.details?.foundKeywords?.length > 0 && (
                <div className="detail-row">
                  <span>Suspicious Keywords</span>
                  <span className="text-red">{result.details.foundKeywords.join(', ')}</span>
                </div>
              )}
            </div>
          </ResultCard>

          <button className="btn-scan-another" onClick={handleReset}>
            <Search size={16} /> Scan Another URL
          </button>
        </div>
      )}

      {/* How It Works */}
      <div className="how-it-works">
        <h3>How the URL Scanner Works</h3>
        <div className="how-grid">
          <div className="how-step">
            <div className="how-step-num">1</div>
            <p>Checks if URL uses HTTPS (secure connection)</p>
          </div>
          <div className="how-step">
            <div className="how-step-num">2</div>
            <p>Scans for suspicious keywords like "login", "verify", "bank"</p>
          </div>
          <div className="how-step">
            <div className="how-step-num">3</div>
            <p>Detects IP-based URLs, suspicious TLDs (.tk, .ml), and typosquatting</p>
          </div>
          <div className="how-step">
            <div className="how-step-num">4</div>
            <p>Calculates a risk score and returns a Safe / Suspicious / Dangerous verdict</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlScannerPage;
