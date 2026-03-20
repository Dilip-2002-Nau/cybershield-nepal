/**
 * Home Page
 * CyberShield Nepal landing page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Search, Lock, Mail, AlertTriangle,
  BookOpen, ArrowRight, Users, Globe, Zap, CheckCircle
} from 'lucide-react';

const features = [
  {
    icon: <Search size={28} />,
    title: 'URL Phishing Detector',
    desc: 'Instantly analyze any URL for phishing attempts, suspicious keywords, and HTTPS validation.',
    path: '/url-scanner',
    color: 'feature-blue'
  },
  {
    icon: <Lock size={28} />,
    title: 'Password Strength Checker',
    desc: 'Evaluate your password against modern security standards and get improvement tips.',
    path: '/password-checker',
    color: 'feature-green'
  },
  {
    icon: <Mail size={28} />,
    title: 'Email Scam Analyzer',
    desc: 'Detect urgency traps, suspicious links, and manipulation tactics in email content.',
    path: '/email-analyzer',
    color: 'feature-yellow'
  },
  {
    icon: <AlertTriangle size={28} />,
    title: 'Threat Reporting',
    desc: 'Report scam websites and fraud messages to help protect fellow Nepalis online.',
    path: '/report-threat',
    color: 'feature-red'
  },
  {
    icon: <BookOpen size={28} />,
    title: 'Learning Hub',
    desc: 'Access articles, tutorials, and awareness content about cybersecurity in Nepal.',
    path: '/learning',
    color: 'feature-purple'
  },
];

const stats = [
  { icon: <Shield size={24} />, value: '5+', label: 'Security Tools' },
  { icon: <Users size={24} />, value: '100%', label: 'Free to Use' },
  { icon: <Globe size={24} />, value: '🇳🇵', label: 'Made for Nepal' },
  { icon: <Zap size={24} />, value: 'Instant', label: 'Real-time Analysis' },
];

const threats = [
  'eSewa / Khalti phishing pages',
  'Fake prize / lottery scams',
  'Job offer fraud via Viber/WhatsApp',
  'Banking credential theft',
  'Fake government websites',
  'Crypto investment fraud',
];

const HomePage = () => {
  return (
    <div className="home-page">
      {/* ── Hero Section ── */}
      <section className="hero-section">
        <div className="hero-bg-grid" />
        <div className="hero-content">
          <div className="hero-badge">
            <Shield size={16} />
            <span>Nepal's #1 Cyber Awareness Platform</span>
          </div>
          <h1 className="hero-title">
            Stay Protected in<br />
            <span className="hero-title-gradient">Nepal's Digital Age</span>
          </h1>
          <p className="hero-subtitle">
            CyberShield Nepal provides free, instant tools to detect phishing links,
            analyze suspicious emails, and report cyber threats — built specifically
            for the Nepali internet community.
          </p>
          <div className="hero-cta">
            <Link to="/url-scanner" className="btn-primary-hero">
              <Search size={18} />
              Scan a URL Now
              <ArrowRight size={18} />
            </Link>
            <Link to="/learning" className="btn-secondary-hero">
              <BookOpen size={18} />
              Learn About Threats
            </Link>
          </div>
        </div>

        {/* Floating threat cards */}
        <div className="hero-visual">
          <div className="threat-preview-card">
            <div className="threat-card-header">
              <div className="threat-dot threat-dot-red" />
              <span>Threat Detected</span>
            </div>
            <div className="threat-card-url">http://n3pal-bank-verify.tk/login</div>
            <div className="threat-card-tag">🚨 PHISHING — DANGEROUS</div>
          </div>
          <div className="threat-preview-card threat-card-offset">
            <div className="threat-card-header">
              <div className="threat-dot threat-dot-green" />
              <span>URL Verified</span>
            </div>
            <div className="threat-card-url">https://google.com</div>
            <div className="threat-card-tag safe">✅ SAFE — TRUSTED DOMAIN</div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="stats-section">
        {stats.map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── Features Grid ── */}
      <section className="features-section">
        <div className="section-header">
          <h2>Complete Cyber Protection Suite</h2>
          <p>Five powerful tools to keep you safe online in Nepal</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <Link key={i} to={f.path} className={`feature-card ${f.color}`}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <div className="feature-arrow">
                <ArrowRight size={18} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Common Threats in Nepal ── */}
      <section className="threats-section">
        <div className="threats-content">
          <div className="threats-text">
            <div className="section-badge">⚠️ Know the Threats</div>
            <h2>Common Cyber Threats in Nepal</h2>
            <p>
              Nepal has seen a sharp rise in cybercrime. From eSewa phishing to fake
              job offer scams on Viber, digital fraud is growing rapidly. CyberShield
              Nepal helps you identify and avoid these threats.
            </p>
            <ul className="threats-list">
              {threats.map((t, i) => (
                <li key={i}>
                  <CheckCircle size={18} className="threat-check" />
                  {t}
                </li>
              ))}
            </ul>
            <Link to="/report-threat" className="btn-report-threat">
              <AlertTriangle size={16} />
              Report a Threat You've Seen
            </Link>
          </div>
          <div className="threats-visual">
            <div className="cyber-shield-graphic">
              <Shield size={120} className="big-shield-icon" />
              <div className="shield-rings">
                <div className="ring ring-1" />
                <div className="ring ring-2" />
                <div className="ring ring-3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="cta-section">
        <Shield size={48} className="cta-icon" />
        <h2>Start Protecting Yourself Today</h2>
        <p>Free. No sign-up required for basic tools. Built for Nepal.</p>
        <div className="cta-buttons">
          <Link to="/url-scanner" className="btn-primary-hero">
            <Search size={18} /> Scan a URL
          </Link>
          <Link to="/login" className="btn-secondary-hero">
            <Users size={18} /> Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
