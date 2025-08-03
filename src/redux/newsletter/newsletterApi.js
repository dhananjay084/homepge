// src/redux/newsletter/newsletterAPI.js
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_BASE_URL || 'mycouponstock-production.up.railway.app'}/api/subscribe`;

export const subscribeUserAPI = (emailData) => {
  return axios.post(API_URL, emailData);
};
