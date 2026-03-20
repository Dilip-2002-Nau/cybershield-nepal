/**
 * Login / Register Page
 * JWT-based authentication with form validation
 */

import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Shield, Mail, Lock, User, Eye, EyeOff, RefreshCw, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthPage = () => {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const { login, register, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) return <Navigate to="/" replace />;

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setFieldErrors(prev => ({ ...prev, [field]: '' }));
    setError('');
  };

  const validate = () => {
    const e = {};
    if (mode === 'register' && !form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email format';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (mode === 'register' && form.password !== form.confirmPassword) {
      e.confirmPassword = 'Passwords do not match';
    }
    setFieldErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError('');
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || `${mode === 'login' ? 'Login' : 'Registration'} failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(m => m === 'login' ? 'register' : 'login');
    setForm({ name: '', email: '', password: '', confirmPassword: '' });
    setError('');
    setFieldErrors({});
  };

  return (
    <div className="auth-page">
      <div className="auth-bg" />

      <div className="auth-container">
        {/* Logo */}
        <div className="auth-logo">
          <Shield size={48} className="auth-logo-icon" />
          <h1>CyberShield Nepal</h1>
          <p>{mode === 'login' ? 'Sign in to your account' : 'Create your free account'}</p>
        </div>

        {/* Mode Toggle */}
        <div className="auth-mode-toggle">
          <button
            className={`toggle-btn ${mode === 'login' ? 'toggle-active' : ''}`}
            onClick={() => mode !== 'login' && switchMode()}
          >
            Sign In
          </button>
          <button
            className={`toggle-btn ${mode === 'register' ? 'toggle-active' : ''}`}
            onClick={() => mode !== 'register' && switchMode()}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && (
            <div className="auth-field">
              <label className="auth-label"><User size={15} /> Full Name</label>
              <input
                type="text"
                className={`auth-input ${fieldErrors.name ? 'auth-input-error' : ''}`}
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                autoComplete="name"
              />
              {fieldErrors.name && <div className="field-error">{fieldErrors.name}</div>}
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label"><Mail size={15} /> Email Address</label>
            <input
              type="email"
              className={`auth-input ${fieldErrors.email ? 'auth-input-error' : ''}`}
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              autoComplete="email"
            />
            {fieldErrors.email && <div className="field-error">{fieldErrors.email}</div>}
          </div>

          <div className="auth-field">
            <label className="auth-label"><Lock size={15} /> Password</label>
            <div className="auth-input-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`auth-input auth-input-pw ${fieldErrors.password ? 'auth-input-error' : ''}`}
                placeholder="Enter password"
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                className="pw-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {fieldErrors.password && <div className="field-error">{fieldErrors.password}</div>}
          </div>

          {mode === 'register' && (
            <div className="auth-field">
              <label className="auth-label"><Lock size={15} /> Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`auth-input ${fieldErrors.confirmPassword ? 'auth-input-error' : ''}`}
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                autoComplete="new-password"
              />
              {fieldErrors.confirmPassword && (
                <div className="field-error">{fieldErrors.confirmPassword}</div>
              )}
            </div>
          )}

          {error && (
            <div className="auth-error">
              ⚠️ {error}
            </div>
          )}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading
              ? <><RefreshCw size={16} className="spinning" /> {mode === 'login' ? 'Signing in...' : 'Creating account...'}</>
              : <><CheckCircle size={16} /> {mode === 'login' ? 'Sign In' : 'Create Account'}</>}
          </button>
        </form>

        <p className="auth-switch">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button className="auth-switch-btn" onClick={switchMode}>
            {mode === 'login' ? 'Create one free' : 'Sign in'}
          </button>
        </p>

        <p className="auth-disclaimer">
          🔒 Basic tools work without an account. Registration lets you track your reports.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
