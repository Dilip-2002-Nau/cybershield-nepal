import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Mail, Heart } from 'lucide-react';

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <div className="footer-brand">
        <Shield size={24} className="footer-logo-icon" />
        <span className="footer-logo-text">CyberShield Nepal</span>
        <p className="footer-tagline">Protecting Nepal's digital future, one scan at a time.</p>
      </div>
      <div className="footer-links">
        <div className="footer-col">
          <h4>Tools</h4>
          <Link to="/url-scanner">URL Scanner</Link>
          <Link to="/password-checker">Password Checker</Link>
          <Link to="/email-analyzer">Email Analyzer</Link>
        </div>
        <div className="footer-col">
          <h4>Community</h4>
          <Link to="/report-threat">Report Threat</Link>
          <Link to="/learning">Learning Hub</Link>
          <Link to="/login">My Account</Link>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2026 CyberShield Nepal. Built with <Heart size={14} className="heart-icon" /> for a safer Nepal with Dilip.</p>
    </div>
  </footer>
);

export default Footer;
