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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-3rem] top-[-4rem] h-44 w-44 rounded-full bg-primary-fixed/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-4rem] right-[-3rem] h-52 w-52 rounded-full bg-tertiary-fixed/20 blur-3xl"
      />

      <div className="relative w-full max-w-md rounded-[2rem] border border-outline-variant/60 bg-surface-container-lowest/95 p-8 shadow-[0_24px_60px_rgba(78,33,33,0.08)] backdrop-blur">
        <BrandLogo subtitle="Create your account to start ordering" className="mb-8" />

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
            <p className="rounded-2xl border border-error/20 bg-error-container/10 p-3 text-sm text-error-dim">
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

        <p className="mt-6 text-center text-sm text-on-surface-variant">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-primary hover:text-primary-fixed-dim">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
