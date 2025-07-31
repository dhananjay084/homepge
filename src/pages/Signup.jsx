import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { registerUser, googleLogin } from '../redux/auth/authApi'; // Import async thunks
import { clearAuthMessage, setAuthMessage } from '../redux/auth/authSlice'; // Import slice actions
import AuthLayout from '../components/AuthLayout';
import GoogleIcon from '@mui/icons-material/Google';

const Signup = () => {
  const dispatch = useDispatch();
  // Select relevant state from Redux store
  const { loading, error, message } = useSelector((state) => state.auth);

  // Effect to clear messages on component mount
  useEffect(() => {
    dispatch(clearAuthMessage());
  }, [dispatch]);

  // Handler for email/password signup form submission
  const handleEmailSignup = async (values, { setSubmitting, resetForm }) => {
    // Clear any previous messages before new submission attempt
    dispatch(clearAuthMessage());

    // Client-side password mismatch check
    if (values.password !== values.confirmPassword) {
      dispatch(setAuthMessage({ message: 'Passwords do not match.', type: 'error' }));
      setSubmitting(false);
      return;
    }

    // Dispatch the registerUser async thunk with form values
    const resultAction = await dispatch(registerUser(values));
    setSubmitting(false); // Reset form submission state

    // If registration was successful (fulfilled), clear the form
    if (registerUser.fulfilled.match(resultAction)) {
      resetForm();
      // The user is automatically logged in after signup, so they will be
      // redirected to the dashboard by the ProtectedRoute in App.js.
    }
  };

  // Handler for Google signup button click
  const handleGoogleSignup = () => {
    // Dispatch the googleLogin async thunk.
    // This thunk will handle the redirect to the backend's Google OAuth initiation endpoint.
    dispatch(googleLogin());
  };

  return (
    <AuthLayout>
      <h2 className='text-2xl text-center font-bold text-[#592EA9] mb-6'>Create Your Account</h2>

      {/* Display messages from Redux state */}
      {message && (
        <div className={`p-3 mb-4 rounded text-sm ${error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      {error && (
        <div className={`p-3 mb-4 rounded text-sm bg-red-100 text-red-700`}>
          {error}
        </div>
      )}

      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        onSubmit={handleEmailSignup}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-700">Your name</label>
              <Field
                name="name"
                placeholder="Enter your name"
                className="w-full border border-gray-300 p-2 mt-1 rounded-md focus:ring-2 focus:ring-[#592EA9] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email address</label>
              <Field
                name="email"
                type="email"
                placeholder="Enter your email address"
                className="w-full border border-gray-300 p-2 mt-1 rounded-md focus:ring-2 focus:ring-[#592EA9] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              <Field
                name="password"
                type="password"
                placeholder="Create a password"
                className="w-full border border-gray-300 p-2 mt-1 rounded-md focus:ring-2 focus:ring-[#592EA9] focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
              <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className="w-full border border-gray-300 p-2 mt-1 rounded-md focus:ring-2 focus:ring-[#592EA9] focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#592EA9] text-white p-3 rounded-md mt-4 hover:bg-opacity-90 transition-colors duration-200"
              disabled={isSubmitting || loading} 
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </Form>
        )}
      </Formik>

      <div className="relative flex items-center justify-center my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300"></span>
        </div>
        <div className="relative bg-white px-4 text-sm text-gray-500">
          Or sign up with
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleGoogleSignup}
          className="w-full shadow-md p-3 rounded-md flex items-center justify-center gap-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
          disabled={loading} 
        >
          <GoogleIcon className="text-[#4285F4]" /> Continue with Google
        </button>
      </div>

      <div className="text-center text-sm mt-6">
        Already have an account? <a className="text-[#592EA9] hover:underline" href="/login">Sign in</a>
      </div>
    </AuthLayout>
  );
};

export default Signup;