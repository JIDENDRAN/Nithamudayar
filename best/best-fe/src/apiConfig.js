// src/apiConfig.js

/**
 * The base URL for the backend API.
 * Uses VITE_API_URL if explicitly provided,
 * otherwise in production falls back to '' (same-origin relative URL for Vercel Serverless Functions),
 * and in local development falls back to 'http://localhost:5000'.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL !== undefined && import.meta.env.VITE_API_URL !== ''
  ? import.meta.env.VITE_API_URL
  : (import.meta.env.DEV ? 'http://localhost:5000' : '');

export default API_BASE_URL;
