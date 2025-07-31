import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { loginUser, googleLogin } from '../redux/auth/authApi'; // Import async thunks
import { clearAuthMessage, setAuthMessage } from '../redux/auth/authSlice'; // Import slice actions
import AuthLayout from '../components/AuthLayout';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const dispatch = useDispatch();
  // Select relevant state from Redux store
  const { loading, error, message, isAuthenticated } = useSelector((state) => state.auth);

  // Effect to handle initial setup and Google OAuth redirect messages
  useEffect(() => {
    // Clear any previous Redux messages on component mount
    dispatch(clearAuthMessage());

    // If user is already authenticated (e.g., from a previous session check), redirect to dashboard
    if (isAuthenticated) {
      window.location.href = '/dashboard';
    }

    // Handle messages from Google OAuth redirect (e.g., /auth-success?name=...)
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const authError = params.get('error'); // Using a different name to avoid conflict with Redux error state

    if (name) {
      // Dispatch a success message to Redux
      dispatch(setAuthMessage({ message: `Welcome, ${name}! You are logged in.`, type: 'success' }));
      // Clean the URL
      window.history.replaceState({}, document.title, window.location.pathname);
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1500);
    } else if (authError === 'google_auth_failed') {
      // Dispatch an error message to Redux
      dispatch(setAuthMessage({ message: 'Google authentication failed. Please try again.', type: 'error' }));
      // Clean the URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [dispatch, isAuthenticated]); // Depend on dispatch and isAuthenticated

  // Handler for email/password login form submission
  const handleEmailLogin = async (values, { setSubmitting }) => {
    // Dispatch the loginUser async thunk with form values
    await dispatch(loginUser(values));
    setSubmitting(false); // Reset form submission state
  };

  // Handler for Google login button click
  const handleGoogleLogin = () => {
    // Dispatch the googleLogin async thunk.
    // This thunk will handle the redirect to the backend's Google OAuth initiation endpoint.
    dispatch(googleLogin());
  };

  return (
    <AuthLayout>
      {/* If you want to keep the Banner, ensure it's imported and its props are handled */}
      {/* <Banner Text="Every day we  the most interesting things" ColorText="discuss" BgImage={Image} /> */}

      <h2 className='text-2xl text-center font-bold text-[#592EA9] mb-6'>Login to Your Account</h2>

      {/* Display messages from Redux state */}
      {message && (
        <div className={`p-3 mb-4 rounded text-sm ${error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      {/* Display errors from Redux state */}
      {error && (
        <div className={`p-3 mb-4 rounded text-sm bg-red-100 text-red-700`}>
          {error}
        </div>
      )}

      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleEmailLogin}
      >
        {({ isSubmitting }) => (
          <Form className="mt-4 space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</label>
              <Field
                name="email"
                type="email"
                placeholder="Input email address"
                className="w-full border border-gray-300 p-2 mt-1 rounded-md focus:ring-2 focus:ring-[#592EA9] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <Field
                name="password"
                type="password"
                placeholder="Input your password"
                className="w-full border border-gray-300 p-2 mt-1 rounded-md focus:ring-2 focus:ring-[#592EA9] focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#592EA9] text-white p-3 rounded-md mt-4 hover:bg-opacity-90 transition-colors duration-200"
              disabled={isSubmitting || loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <div className="text-center mt-2 text-sm text-[#592EA9] my-4">
              <a href="/forgot-password" className="hover:underline">Forgot Password?</a>
            </div>
          </Form>
        )}
      </Formik>

      <div className="relative flex items-center justify-center my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300"></span>
        </div>
        <div className="relative bg-white px-4 text-sm text-gray-500">
          Or login with
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleGoogleLogin}
          className="w-full shadow-md p-3 rounded-md flex items-center justify-center gap-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
          disabled={loading} 
        >
          <GoogleIcon className="text-[#4285F4]" /> Continue with Google
        </button>
        {/* You can add Facebook and Apple login buttons here if needed,
            but they would require similar OAuth setup for their respective platforms. */}
        {/* <button className="w-full shadow-md p-2 rounded flex items-center justify-center gap-2 text-white bg-[#1877F2]">
          <FacebookIcon/> Continue with Facebook
        </button>
        <button className="w-full shadow-md p-2 rounded flex items-center justify-center gap-2 text-white bg-black">
          <AppleIcon/> Continue with Apple
        </button> */}
      </div>

      <div className="text-center text-sm mt-6">
        You don’t have an account? <a className="text-[#592EA9] hover:underline" href="/signup">Sign up</a>
      </div>
    </AuthLayout>
  );
};

export default Login;