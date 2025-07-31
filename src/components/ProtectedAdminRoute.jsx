import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');

  const isAdmin = userId === '6889f3a018621cef1aa6b993' && userName === 'Admin';

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedAdminRoute;
