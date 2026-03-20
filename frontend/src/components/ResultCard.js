/**
 * ResultCard Component
 * Displays scan/analysis results with visual indicators
 */

import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

const ResultCard = ({ result, riskScore, reasons = [], warnings = [], children, title }) => {
  const getConfig = () => {
    const r = result?.toLowerCase();
    if (r === 'safe') return {
      icon: <CheckCircle size={28} />,
      colorClass: 'result-safe',
      label: 'SAFE',
      bgClass: 'result-bg-safe'
    };
    if (r === 'suspicious') return {
      icon: <AlertTriangle size={28} />,
      colorClass: 'result-suspicious',
      label: 'SUSPICIOUS',
      bgClass: 'result-bg-suspicious'
    };
    if (r === 'dangerous') return {
      icon: <XCircle size={28} />,
      colorClass: 'result-dangerous',
      label: 'DANGEROUS',
      bgClass: 'result-bg-dangerous'
    };
    // For password strength
    if (r === 'strong') return { icon: <CheckCircle size={28} />, colorClass: 'result-safe', label: 'STRONG', bgClass: 'result-bg-safe' };
    if (r === 'medium') return { icon: <AlertTriangle size={28} />, colorClass: 'result-suspicious', label: 'MEDIUM', bgClass: 'result-bg-suspicious' };
    if (r === 'weak') return { icon: <XCircle size={28} />, colorClass: 'result-dangerous', label: 'WEAK', bgClass: 'result-bg-dangerous' };
    return { icon: <Info size={28} />, colorClass: 'result-info', label: result?.toUpperCase() || 'RESULT', bgClass: 'result-bg-info' };
  };

  const { icon, colorClass, label, bgClass } = getConfig();

  return (
    <div className={`result-card ${bgClass}`}>
      {/* Header */}
      <div className={`result-header ${colorClass}`}>
        <div className="result-icon">{icon}</div>
        <div>
          {title && <div className="result-title">{title}</div>}
          <div className="result-label">{label}</div>
          {riskScore !== undefined && (
            <div className="result-score">Risk Score: {riskScore}/100</div>
          )}
        </div>
      </div>

      {/* Risk Bar */}
      {riskScore !== undefined && (
        <div className="risk-bar-container">
          <div className="risk-bar-track">
            <div
              className={`risk-bar-fill ${colorClass}`}
              style={{ width: `${riskScore}%` }}
            />
          </div>
        </div>
      )}

      {/* Reasons */}
      {reasons.length > 0 && (
        <div className="result-reasons">
          <h4>Analysis Findings:</h4>
          <ul>
            {reasons.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="result-warnings">
          <h4>Notices:</h4>
          <ul>
            {warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Custom children */}
      {children}
    </div>
  );
};

export default ResultCard;
