import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie'; // For client-side cookie management

// Configure axios to send cookies with requests (crucial for HTTP-only cookies)
axios.defaults.withCredentials = true;

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// Helper to set user data in client-side cookies for quick UI access
// Note: This is for display purposes. The actual authentication status
// relies on the HTTP-only cookies and backend verification.
export const setUserDataInCookies = (user) => {
    if (user && typeof user === 'object') {
      const expires = 15 / (24 * 60); // 15 minutes in days
  
      if (user.name) Cookies.set('userName', user.name, { expires });
      if (user.role) Cookies.set('userRole', user.role, { expires });
      if (user._id) Cookies.set('userId', user._id, { expires });
      if (user.email) Cookies.set('userEmail', user.email, { expires });
    } else {
      // clear all display cookies
      Cookies.remove('userName');
      Cookies.remove('userRole');
      Cookies.remove('userId');
      Cookies.remove('userEmail');
    }
  };

// Async Thunk for User Registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/auth/register`, userData);
      // Backend sets HTTP-only cookies.
      setUserDataInCookies(response.data); // Store basic user info in client-side cookies
      return response.data; // Return user data from backend
    } catch (error) {
      // Return the error message from the backend if available, otherwise generic message
      return rejectWithValue(error.response?.data?.message || error.message || 'Registration failed.');
    }
  }
);

// Async Thunk for User Login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/auth/login`, credentials);
      // Backend sets HTTP-only cookies.
      setUserDataInCookies(response.data); // Store basic user info in client-side cookies
      return response.data; // Return user data from backend
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Login failed. Please check credentials.');
    }
  }
);

// Async Thunk for Google OAuth Login (Frontend initiation)
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (_, { rejectWithValue }) => {
    try {
      // This will redirect the browser to the backend's Google OAuth endpoint.
      // The backend then handles the Google authentication and redirects back to client.
      window.location.href = `${SERVER_URL}/api/auth/google`;
      return { message: 'Redirecting to Google for login...' };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to initiate Google login.');
    }
  }
);

// Async Thunk for Refreshing Access Token
export const refreshAccessToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/auth/refresh-token`);
      // Backend sets new HTTP-only cookies.
      // If your backend's refresh endpoint returns user data, you can update client-side cookies here.
      // For now, client-side cookies will persist based on their own expiry or be updated by checkCurrentUser.
      return response.data; // Returns a success message
    } catch (error) {
      // If refresh token fails, it means user needs to re-login
      setUserDataInCookies(null); // Clear client-side cookies
      return rejectWithValue(error.response?.data?.message || 'Session expired. Please log in again.');
    }
  }
);

// Async Thunk for User Logout
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/auth/logout`);
      setUserDataInCookies(null); // Clear client-side cookies immediately on logout request
      // Backend clears HTTP-only cookies.
      return response.data; // Returns a success message
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Logout failed.');
    }
  }
);

// Async Thunk to check current user status (e.g., on app load or route change)
export const checkCurrentUser = createAsyncThunk(
  'auth/checkCurrentUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/auth/current_user`);
      // Backend's current_user route returns { user: { _id, role } } or { user: null }
      if (response.data.user && response.data.user._id) {
        // If backend confirms an active user, get display data from client-side cookies
        // or fetch from backend if needed (for full user profile)
        const storedName = Cookies.get('userName');
        const storedEmail = Cookies.get('userEmail');
        const user = {
          ...response.data.user,
          name: storedName || 'User', // Use stored name or default
          email: storedEmail // Use stored email
        };
        setUserDataInCookies(user); // Re-set cookies to refresh their expiry and ensure consistency
        return user; // Return the user object with basic details
      } else {
        // If backend explicitly says no user, clear client-side cookies
        setUserDataInCookies(null);
        return rejectWithValue('Not authenticated.');
      }
    } catch (error) {
      // If access token expired, try to refresh it
      if (error.response?.status === 401 && error.response?.data?.message === 'Invalid or expired access token.') {
        try {
          await dispatch(refreshAccessToken()).unwrap(); // Dispatch refresh thunk
          // After successful refresh, try getting current user again
          const refreshedResponse = await axios.get(`${SERVER_URL}/api/auth/current_user`);
          if (refreshedResponse.data.user && refreshedResponse.data.user._id) {
            const storedName = Cookies.get('userName');
            const storedEmail = Cookies.get('userEmail');
            const user = {
              ...refreshedResponse.data.user,
              name: storedName || 'User',
              email: storedEmail
            };
            setUserDataInCookies(user); // Re-set cookies to refresh their expiry
            return user;
          } else {
            setUserDataInCookies(null); // Refresh succeeded but no user data, clear client-side cookies
            return rejectWithValue('Authentication failed after token refresh.');
          }
        } catch (refreshError) {
          // If refresh also fails, clear session and force re-login
          setUserDataInCookies(null); // Clear client-side cookies
          return rejectWithValue(refreshError.response?.data?.message || 'Session expired. Please log in again.');
        }
      }
      // For any other error (e.g., network error, backend error, no token), clear session
      setUserDataInCookies(null); // Clear client-side cookies
      return rejectWithValue(error.response?.data?.message || 'Failed to check authentication status.');
    }
  }
);

// Async Thunk for Admin Specific Login (for the requested hardcoded admin check)
// WARNING: This is less secure for production. Use role-based login for admins generally.
export const adminSpecificLogin = createAsyncThunk(
  'auth/adminSpecificLogin',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${SERVER_URL}/api/admin/login-specific`, credentials);
      // This specific route might not set cookies, it's just for verification.
      // If you want it to log in the admin fully, you'd need it to set cookies.
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Admin login failed.');
    }
  }
);
