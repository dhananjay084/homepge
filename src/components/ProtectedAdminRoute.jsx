import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie

const ProtectedAdminRoute = ({ children }) => {
  // Get data from cookies instead of localStorage
  const userId = Cookies.get('userId');
  const userName = Cookies.get('userName');

  // Check if the user is an admin based on the hardcoded values
  const isAdmin = userId === '6889f3a018621cef1aa6b993' && userName === 'Admin';

  if (!isAdmin) {
    // If not an admin, redirect to the home page
    return <Navigate to="/" />;
  }

  // If the user is an admin, render the children components
  return children;
};

export default ProtectedAdminRoute;
