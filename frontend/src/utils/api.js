/**
 * API Utility
 * Centralized API call functions
 */

import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({ baseURL: API_BASE });

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cybershield_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const scanUrl = (url) => api.post('/scan-url', { url });
export const checkPassword = (password) => api.post('/check-password', { password });
export const analyzeEmail = (subject, body, sender) =>
  api.post('/analyze-email', { subject, body, sender });
export const submitReport = (data) => api.post('/report-threat', data);
export const getRecentReports = () => api.get('/recent-reports');

export default api;
