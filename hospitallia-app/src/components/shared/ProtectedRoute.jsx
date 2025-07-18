import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// allowedRoles is optional: if provided, checks role in addition to authentication
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, role, loading } = useAuth();

  if (loading) return null; // Or show a spinner

  if (!currentUser) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Not authorized for this route
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
