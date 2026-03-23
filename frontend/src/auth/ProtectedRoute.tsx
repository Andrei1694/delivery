import { useNavigate, useLocation } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAuth } from './AuthContext';

const ONBOARDING_START_ROUTE = '/onboarding/location';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, isOnboardingPending } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isOnboardingPath = location.pathname.startsWith('/onboarding');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: '/login', search: { redirect: location.href }, replace: true });
      return;
    }

    if (!isLoading && isAuthenticated && isOnboardingPending && !isOnboardingPath) {
      navigate({ to: ONBOARDING_START_ROUTE, replace: true });
    }
  }, [
    isLoading,
    isAuthenticated,
    isOnboardingPending,
    isOnboardingPath,
    navigate,
    location.href,
  ]);

  if (isLoading) {
    return <div className="p-6 text-center text-sm text-on-surface-variant">Checking session...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
