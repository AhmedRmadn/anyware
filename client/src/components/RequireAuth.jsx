import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * requireAuth is a Higher-Order Component that returns a protected component.
 * Usage:
 *   const Protected = requireAuth(Dashboard);
 *   <Route path="/dashboard" element={<Protected />} />
 */
export default function requireAuth(Component) {
  return function ProtectedWrapper(props) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return <Component {...props} />;
  };
}
