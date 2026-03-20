import { Navigate } from '@tanstack/react-router';
import { useAuth } from './AuthContext';

const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="p-6 text-center text-sm text-on-surface-variant">Checking session...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicOnlyRoute;
