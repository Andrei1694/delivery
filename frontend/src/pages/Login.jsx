import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { Link, useNavigate, useRouter, useSearch } from '@tanstack/react-router';
import BrandLogo from '../components/BrandLogo';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { useAuth } from '../auth/AuthContext';
import useFormSubmitHandler from '../forms/useFormSubmitHandler';
import { getApiErrorMessage, isSafeInternalRedirect } from '../util';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();
  const search = useSearch({ strict: false });
  const [error, setError] = useState('');

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setError('');

      try {
        await login({
          email: value.email.trim(),
          password: value.password,
        });

        const redirectPath = typeof search?.redirect === 'string' ? search.redirect : '';
        if (isSafeInternalRedirect(redirectPath)) {
          router.history.push(redirectPath);
          return;
        }

        navigate({ to: '/' });
      } catch (submitError) {
        setError(getApiErrorMessage(submitError, 'Invalid credentials.'));
      }
    },
  });

  const handleSubmit = useFormSubmitHandler(form);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cusens-bg p-4">
      <div className="w-full max-w-md rounded-3xl border border-cusens-border bg-cusens-surface p-8 shadow-xl">
        <BrandLogo size="lg" subtitle="Reusable login/register template" className="mb-8" />

        <form className="space-y-4" onSubmit={handleSubmit}>
          <form.Field name="email">
            {(field) => (
              <InputField
                label="Email"
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                required
              />
            )}
          </form.Field>

          <form.Field name="password">
            {(field) => (
              <InputField
                label="Password"
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                required
              />
            )}
          </form.Field>

          {error ? (
            <p className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            )}
          </form.Subscribe>
        </form>

        <p className="mt-6 text-center text-sm text-cusens-text-secondary">
          Need an account?{' '}
          <Link to="/register" className="font-semibold text-cusens-primary hover:text-cusens-primary-hover">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
