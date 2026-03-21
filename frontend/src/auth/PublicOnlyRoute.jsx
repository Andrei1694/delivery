import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAuth } from './AuthContext';

const PublicOnlyRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate({ to: '/', replace: true });
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return <div className="p-6 text-center text-sm text-on-surface-variant">Checking session...</div>;
  }

  if (isAuthenticated) {
    return null;
  }

  return children;
};

export default PublicOnlyRoute;
