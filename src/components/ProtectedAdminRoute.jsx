import React, { useEffect, useState } from 'react'; // Import useState
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkCurrentUser } from '../redux/auth/authApi';

const ProtectedAdminRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, user, error } = useSelector((state) => state.auth);
  // New state to track if the initial authentication check has completed (fulfilled or rejected)
  const [isInitialCheckComplete, setIsInitialCheckComplete] = useState(false);

// Log new state for debugging

  useEffect(() => {
    // Dispatch checkCurrentUser if not authenticated and not currently loading
    // This effect runs on mount and whenever isAuthenticated or loading changes.
    if (!isAuthenticated && !loading) {
      dispatch(checkCurrentUser()).finally(() => {
        // Mark the initial check as complete regardless of success or failure
        setIsInitialCheckComplete(true);
      });
    } else if (isAuthenticated || error) {
      // If already authenticated or an error occurred (meaning checkCurrentUser resolved),
      // ensure initial check is marked complete to allow rendering or redirection.
      setIsInitialCheckComplete(true);
    }
  }, [isAuthenticated, loading, error, dispatch]); // Dependencies to react to auth state changes

  // Show a loading state if:
  // 1. The Redux `loading` flag is true (meaning the thunk is actively fetching data).
  // OR
  // 2. The initial check has not yet completed.
  // This ensures we always wait for the asynchronous check to finish.
  if (loading || !isInitialCheckComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-[#592EA9]">Loading...</h2>
          <p className="mt-4 text-gray-600">Verifying admin access.</p>
        </div>
      </div>
    );
  }

  // After the initial check is complete and loading is false,
  // we can safely check if the user is authenticated AND has the 'admin' role.
  const isAdmin = isAuthenticated && user?.role === 'admin';

  // If not an admin after the check is complete, redirect to the home page.
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If the user is authenticated and is an admin, render the children components.
  return children;
};

export default ProtectedAdminRoute;
