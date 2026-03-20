import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { Link, useNavigate } from '@tanstack/react-router';
import BrandLogo from '../components/BrandLogo';
import Button from '../components/Button';
import InputField from '../components/InputField';
import { useAuth } from '../auth/AuthContext';
import useFormSubmitHandler from '../forms/useFormSubmitHandler';
import { getApiErrorMessage, getFieldError } from '../util';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      setError('');

      try {
        await register({
          email: value.email.trim(),
          password: value.password,
        });
        navigate({ to: '/' });
      } catch (submitError) {
        setError(getApiErrorMessage(submitError, 'Registration failed.'));
      }
    },
  });

  const handleSubmit = useFormSubmitHandler(form);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cusens-bg p-4">
      <div className="w-full max-w-md rounded-3xl border border-cusens-border bg-cusens-surface p-8 shadow-xl">
        <BrandLogo size="lg" subtitle="Create a new account" className="mb-8" />

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
                placeholder="Create password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                required
              />
            )}
          </form.Field>

          <form.Field
            name="confirmPassword"
            validators={{
              onChangeListenTo: ['password'],
              onChange: ({ value, fieldApi }) => {
                const passwordValue = fieldApi.form.getFieldValue('password');
                if (value && passwordValue && value !== passwordValue) {
                  return 'Passwords do not match.';
                }
                return undefined;
              },
              onSubmit: ({ value, fieldApi }) => {
                const passwordValue = fieldApi.form.getFieldValue('password');
                if (passwordValue !== value) {
                  return 'Passwords do not match.';
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <InputField
                label="Confirm password"
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="Repeat password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
                error={getFieldError(field.state.meta.errors)}
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
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </Button>
            )}
          </form.Subscribe>
        </form>

        <p className="mt-6 text-center text-sm text-cusens-text-secondary">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-cusens-primary hover:text-cusens-primary-hover">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
