import { Navigate, useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    const currentPath = `${location.pathname}${location.search}`;

    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(currentPath)}`}
        replace
      />
    );
  }

  return children;
}