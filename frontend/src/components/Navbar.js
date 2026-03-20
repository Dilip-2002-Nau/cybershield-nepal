/**
 * Navbar Component
 * Responsive navigation with auth state
 */

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Shield, Menu, X, Home, Search, Lock, Mail,
  AlertTriangle, BookOpen, LogIn, LogOut, User
} from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/url-scanner', label: 'URL Scanner', icon: Search },
  { path: '/password-checker', label: 'Password', icon: Lock },
  { path: '/email-analyzer', label: 'Email Analyzer', icon: Mail },
  { path: '/report-threat', label: 'Report', icon: AlertTriangle },
  { path: '/learning', label: 'Learn', icon: BookOpen },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
          <Shield className="logo-icon" size={28} />
          <span className="logo-text">
            <span className="logo-cyber">Cyber</span>Shield
            <span className="logo-np"> Nepal</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="nav-links-desktop">
          {navLinks.map(({ path, label, icon: Icon }) => (
            <li key={path}>
              <Link
                to={path}
                className={`nav-link ${isActive(path) ? 'nav-link-active' : ''}`}
              >
                <Icon size={15} />
                <span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth Buttons (Desktop) */}
        <div className="nav-auth-desktop">
          {user ? (
            <div className="user-menu">
              <span className="user-greeting">
                <User size={16} />
                {user.name}
              </span>
              <button onClick={handleLogout} className="btn-logout">
                <LogOut size={15} />
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-login-nav">
              <LogIn size={15} />
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={`mobile-nav-link ${isActive(path) ? 'mobile-link-active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
          <div className="mobile-auth">
            {user ? (
              <>
                <span className="mobile-user-name"><User size={16} />{user.name}</span>
                <button onClick={handleLogout} className="mobile-logout-btn">
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="mobile-login-btn" onClick={() => setMenuOpen(false)}>
                <LogIn size={16} /> Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
