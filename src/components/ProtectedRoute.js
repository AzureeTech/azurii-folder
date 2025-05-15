import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check authentication status
  const isAuthenticated = localStorage.getItem('isAdminLoggedIn') === 'true';
  
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin-login" replace />;
  }
  
  // Render the protected component if authenticated
  return children;
};

// Make sure to export as default
export default ProtectedRoute;