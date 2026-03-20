import { Navigate, useLocation } from '@tanstack/react-router';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="p-6 text-center text-sm text-cusens-text-secondary">Checking session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" search={{ redirect: location.href }} replace />;
  }

  return children;
};

export default ProtectedRoute;
