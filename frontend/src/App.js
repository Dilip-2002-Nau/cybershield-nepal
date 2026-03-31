/**
 * CyberShield Nepal - Main App
 * React Router setup with all pages
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import UrlScannerPage from './pages/UrlScannerPage';
import PasswordCheckerPage from './pages/PasswordCheckerPage';
import EmailAnalyzerPage from './pages/EmailAnalyzerPage';
import ReportThreatPage from './pages/ReportThreatPage';
import LearningPage from './pages/LearningPage';
import AuthPage from './pages/AuthPage';

import './styles.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/url-scanner" element={<UrlScannerPage />} />
              <Route path="/password-checker" element={<PasswordCheckerPage />} />
              <Route path="/email-analyzer" element={<EmailAnalyzerPage />} />
              <Route path="/report-threat" element={<ReportThreatPage />} />
              <Route path="/learning" element={<LearningPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />
              <Route path="*" element={<div style={{textAlign:'center',padding:'4rem'}}><h2>404 – Page not found</h2></div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
