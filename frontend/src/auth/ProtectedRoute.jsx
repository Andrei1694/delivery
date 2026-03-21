import { useNavigate, useLocation } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: '/login', search: { redirect: location.href }, replace: true });
    }
  }, [isLoading, isAuthenticated, navigate, location.href]);

  if (isLoading) {
    return <div className="p-6 text-center text-sm text-on-surface-variant">Checking session...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
