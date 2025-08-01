import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie'; // For client-side cookie management

// Configure axios to send cookies with requests (crucial for HTTP-only cookies)
axios.defaults.withCredentials = true;

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// Helper to set user data in client-side cookies for quick UI access
// Note: This is for display purposes. The actual authentication status
// relies on the HTTP-only cookies and backend verification.
const setUserDataInCookies = (user) => {
  if (user) {
    // Set cookies with an expiration (e.g., 3 hours)
    // This duration can be adjusted based on how long you want UI info to persist
    const expires = 3 / 24; // Expires in 3 hours (converted to days for js-cookie)

    Cookies.set('userName', user.name || user.email || 'User', { expires });
    Cookies.set('userRole', user.role || 'user', { expires });
    Cookies.set('userId', user._id, { expires });
    // If you store email for UI, set it here too
    if (user.email) {
      Cookies.set('userEmail', user.email, { expires });
    }

  } else {
    // Remove cookies when user logs out or session expires
    Cookies.remove('userName');
    Cookies.remove('userRole');
    Cookies.remove('userId');
    Cookies.remove('userEmail'); // Remove if you set it
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
      // We don't get user data back directly from refresh, so we don't update client-side cookies here
      // unless you modify your backend's refresh endpoint to return user details.
      // For now, client-side cookies will persist based on their own expiry.
      return response.data; // Returns a success message
    } catch (error) {
      // If refresh token fails, it means user needs to re-login
      setUserDataInCookies(null); // Clear client-side cookies
      // HTTP-only cookies are cleared by backend on logout or automatically expire.
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
      setUserDataInCookies(null); // Clear client-side cookies
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
      // Backend's current_user route returns { user: { _id, role } }
      // We need to fetch full name/email from client-side cookies for UI
      const storedName = Cookies.get('userName');
      const storedEmail = Cookies.get('userEmail');
      const user = {
        ...response.data.user,
        name: storedName || 'User', // Use stored name or default
        email: storedEmail // Use stored email
      };
      setUserDataInCookies(user); // Re-set cookies to refresh their expiry
      return user; // Return the user object with basic details
    } catch (error) {
      // If access token expired, try to refresh it
      if (error.response?.status === 401 && error.response?.data?.message === 'Access token expired. Please refresh.') {
        try {
          await dispatch(refreshAccessToken()).unwrap(); // Dispatch refresh thunk
          // After successful refresh, try getting current user again
          const refreshedResponse = await axios.get(`${SERVER_URL}/api/auth/current_user`);
          const storedName = Cookies.get('userName');
          const storedEmail = Cookies.get('userEmail');
          const user = {
            ...refreshedResponse.data.user,
            name: storedName || 'User',
            email: storedEmail
          };
          setUserDataInCookies(user); // Re-set cookies to refresh their expiry
          return user;
        } catch (refreshError) {
          // If refresh also fails, clear session and force re-login
          setUserDataInCookies(null); // Clear client-side cookies
          return rejectWithValue(refreshError.response?.data?.message || 'Session expired. Please log in again.');
        }
      }
      // For any other error (e.g., no token, invalid token), clear session
      setUserDataInCookies(null); // Clear client-side cookies
      return rejectWithValue(error.response?.data?.message || 'Not authenticated.');
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
