import { useNavigate } from '@tanstack/react-router';
import Button from '../components/Button';
import { useAuth } from '../auth/AuthContext';

const AuthHome = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate({ to: '/login' });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cusens-bg p-4">
      <div className="w-full max-w-lg rounded-3xl border border-cusens-border bg-cusens-surface p-8 shadow-xl">
        <h1 className="font-display text-3xl font-bold text-cusens-text-primary">Authenticated</h1>
        <p className="mt-3 text-cusens-text-secondary">
          This is the protected template landing page. Replace it with your app dashboard.
        </p>
        <p className="mt-2 text-sm text-cusens-text-primary">
          Signed in as: <span className="font-semibold">{user?.email ?? 'Unknown user'}</span>
        </p>

        <div className="mt-8">
          <Button type="button" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthHome;
