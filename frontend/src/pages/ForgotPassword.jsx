import { useEffect, useState } from 'react';
import { Link, useNavigate, useRouter } from '@tanstack/react-router';

const ForgotPassword = () => {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    document.title = 'Forgot Password - Verve Kitchen';
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.history.back();
      return;
    }

    navigate({ to: '/login' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className="bg-background text-on-surface font-body antialiased min-h-screen flex flex-col items-center justify-center p-4"
      style={{ minHeight: 'max(884px, 100dvh)' }}
    >
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl p-8 flex flex-col shadow-[0_8px_24px_rgba(78,33,33,0.06)] relative overflow-hidden">
        <div className="absolute top-4 left-4">
          <button
            aria-label="Go back"
            className="flex items-center justify-center p-2 rounded-full text-on-surface hover:bg-surface-container-low transition-colors"
            type="button"
            onClick={handleBack}
          >
            <span className="material-symbols-outlined" data-icon="arrow_back">
              arrow_back
            </span>
          </button>
        </div>

        <div className="mt-8 mb-6 flex justify-center">
          <div className="w-20 h-20 bg-surface-container-low rounded-full flex items-center justify-center text-primary">
            <span
              className="material-symbols-outlined text-4xl"
              data-icon="lock_reset"
              data-weight="fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              lock_reset
            </span>
          </div>
        </div>

        <h1 className="font-headline text-3xl font-bold text-center text-on-surface mb-3 tracking-tight">
          Forgot Password?
        </h1>

        <p className="text-on-surface-variant text-center text-sm mb-8 leading-relaxed px-2">
          Don't worry, it happens. Enter your phone number below and we'll send you a link to
          reset your password.
        </p>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="font-label text-sm font-semibold text-on-surface ml-1" htmlFor="phone">
              Phone Number
            </label>
            <div className="relative flex items-center bg-surface-container-low rounded-lg border border-transparent focus-within:border-outline-variant transition-colors">
              <span className="material-symbols-outlined absolute left-4 text-on-surface-variant" data-icon="phone">
                phone
              </span>
              <input
                className="w-full bg-transparent border-none py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant focus:ring-0 text-base"
                id="phone"
                placeholder="+1 (000) 000-0000"
                required
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>
          </div>

          <button
            className="mt-2 w-full py-4 px-6 rounded-full bg-gradient-to-br from-primary to-primary-dim text-on-primary font-headline font-bold text-base hover:opacity-90 transition-opacity shadow-[0_8px_24px_rgba(78,33,33,0.06)]"
            type="submit"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            className="text-sm font-label font-semibold text-primary hover:text-primary-dim transition-colors"
            to="/login"
          >
            Remembered? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
