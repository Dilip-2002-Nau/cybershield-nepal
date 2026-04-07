/**
 * API Utility
 * Centralized API call functions
 */

import axios from 'axios';


// Create axios instance
const api = axios.create({ baseURL: "https://satisfied-magic-production-6ffe.up.railway.app/api" });

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
