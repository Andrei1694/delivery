import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../auth/AuthContext';

const VerveKitchenLogin = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await auth.login({ phone, password });
      navigate({ to: '/' });
    } catch {
      setError('Invalid phone number or password.');
    }
  };

  return (
    <>
      <style>
        {`
          .verve-kitchen-login .hero-clip {
            clip-path: polygon(0 0, 100% 0, 100% 85%, 0% 100%);
          }

          @media (min-width: 768px) {
            .verve-kitchen-login .hero-clip {
              clip-path: none;
            }
          }
        `}
      </style>

      <div
        className="verve-kitchen-login bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container"
        style={{ minHeight: 'max(884px, 100dvh)' }}
      >
        <main className="flex min-h-screen flex-col md:flex-row">
          <section className="relative h-[353px] w-full overflow-hidden md:h-screen md:w-1/2">
            <div className="absolute inset-0 z-10 bg-primary-dim/20" />
            <img
              alt="Gourmet dish presentation"
              className="hero-clip absolute inset-0 h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVsvM32f6aG3hVQl_yXAb8gfXTeYpz9vQDcvLAN-qbYTrcTDSggFH1i5tHXwKR5nVoDTnEkUzBMndBAB9r8oejxKSgaM7FN_kvxj4Ef9RHCusgfYYWO733OTDf-6USv5RcdiefTOCTaVJTpVVeA4y_p7RDLucNP-OjgOJ6zMwHmJIgBOqg0DvO8BJ5u0MAUNMdiVPT9YbradGU7FxrzR5vPUm16voi92LxnQScJ7CNTu-bySU_eC9pONWaplpZ5IAPw0M_bCcrveI"
            />
            <div className="absolute left-8 top-8 z-20 hidden md:block">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined rounded-xl bg-primary-container p-2 text-on-primary-container">
                  restaurant
                </span>
                <span className="font-headline text-2xl font-extrabold tracking-tighter text-white drop-shadow-md">
                  Verve Kitchen
                </span>
              </div>
            </div>
            <div className="absolute bottom-12 left-12 z-20 hidden max-w-md md:block">
              <h1 className="mb-4 font-headline text-5xl font-extrabold leading-tight tracking-tight text-white drop-shadow-sm">
                The Art of <br />
                Culinary Curation.
              </h1>
              <p className="text-lg font-medium text-white/90">
                Experience food delivery redefined through editorial precision and Michelin-star
                standards.
              </p>
            </div>
          </section>

          <section className="flex flex-1 flex-col items-center justify-center bg-surface px-6 py-12 md:px-20">
            <div className="w-full max-w-md">
              <div className="mb-8 flex justify-center md:hidden">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-3xl text-primary">
                    restaurant
                  </span>
                  <span className="font-headline text-xl font-bold tracking-tighter text-on-surface">
                    Verve Kitchen
                  </span>
                </div>
              </div>

              <header className="mb-10 text-center md:text-left">
                <h2 className="mb-2 font-headline text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
                  Welcome Back
                </h2>
                <p className="font-medium text-on-surface-variant">
                  Sign in to continue your culinary journey.
                </p>
              </header>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <p className="rounded-xl bg-error-container px-4 py-3 text-sm font-medium text-on-error-container">
                    {error}
                  </p>
                )}
                <div className="space-y-1.5">
                  <label
                    className="ml-1 block font-label text-sm font-bold uppercase tracking-widest text-on-surface-variant"
                    htmlFor="phone"
                  >
                    PHONE NUMBER
                  </label>
                  <div className="group relative">
                    <input
                      className="w-full rounded-xl border-none bg-surface-container-lowest px-5 py-4 text-on-surface outline-none ring-1 ring-outline-variant/20 transition-all duration-300 placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary"
                      id="phone"
                      placeholder="+1 (555) 000-0000"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/30 transition-colors group-focus-within:text-primary">
                      call
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between px-1">
                    <label
                      className="block font-label text-sm font-bold uppercase tracking-widest text-on-surface-variant"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <Link
                      className="text-xs font-bold text-primary transition-colors hover:text-primary-dim"
                      to="/forgot-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="group relative">
                    <input
                      className="w-full rounded-xl border-none bg-surface-container-lowest px-5 py-4 text-on-surface outline-none ring-1 ring-outline-variant/20 transition-all duration-300 placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary"
                      id="password"
                      placeholder={'\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'}
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/30 transition-colors group-focus-within:text-primary">
                      lock
                    </span>
                  </div>
                </div>

                <button
                  className="mt-4 w-full rounded-full bg-gradient-to-br from-primary to-primary-container py-4 font-headline text-lg font-bold text-white shadow-[0_8px_24px_rgba(172,44,0,0.2)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(172,44,0,0.3)] active:scale-95"
                  type="submit"
                >
                  Sign In
                </button>
              </form>

              <div className="relative mt-10">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-outline-variant/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-surface px-4 font-medium text-on-surface-variant">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <button className="group flex items-center justify-center gap-3 rounded-xl bg-surface-container-lowest py-3.5 ring-1 ring-outline-variant/20 transition-all duration-200 hover:ring-outline-variant/60">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M12 11.5v3.5h5.3c-.2 1.3-1.1 2.4-2.3 3.1l3.6 2.8C21.1 19 22.5 15.8 22.5 12c0-.7-.1-1.4-.2-2h-10.3z"
                      fill="#EA4335"
                    />
                    <path
                      d="M5.5 14.5c-.3-.9-.5-1.9-.5-3s.2-2.1.5-3L1.9 5.6C.7 8 0 10.4 0 13c0 2.6.7 5.1 1.9 7.4l3.6-2.9z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 1.2 15 0 12 0 7.3 0 3.3 2.7 1.3 6.6L4.9 9.5c.8-2.7 3.3-4.7 7.1-4.7z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.6-2.8c-1.1.7-2.5 1.2-4.3 1.2-3.8 0-6.3-2-7.1-4.7l-3.6 2.9C3.3 21.3 7.3 24 12 24z"
                      fill="#34A853"
                    />
                  </svg>
                  <span className="font-label text-sm font-bold text-on-surface">Google</span>
                </button>

                <button className="group flex items-center justify-center gap-3 rounded-xl bg-surface-container-lowest py-3.5 ring-1 ring-outline-variant/20 transition-all duration-200 hover:ring-outline-variant/60">
                  <svg className="h-5 w-5 fill-on-surface" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05 1.79-3.32 1.79-1.25 0-1.66-.78-3.15-.78-1.5 0-1.94.75-3.15.78-1.24.03-2.32-.82-3.34-1.83-2.05-2.03-3.14-5.75-3.14-8.87 0-3.12 1.55-5.32 3.34-5.32 1.15 0 2.15.75 3.03.75.88 0 2.1-.81 3.34-.81 1.05 0 2.4.45 3.32 1.45-2.61 1.48-2.15 5.5.54 6.75-.85 1.55-1.9 3.22-3.47 5.09zm-2.12-14.71c.72-.88 1.21-2.1 1.21-3.32 0-.11 0-.21-.01-.32-1.07.05-2.17.72-2.9 1.57-.65.75-1.13 1.95-1.13 3.14 0 .12.01.24.03.32 1.18.09 2.19-.61 2.8-1.39z" />
                  </svg>
                  <span className="font-label text-sm font-bold text-on-surface">Apple</span>
                </button>
              </div>

              <footer className="mt-12 text-center">
                <p className="text-sm font-medium text-on-surface-variant">
                  New to the collection?
                  <Link
                    className="ml-1 font-bold text-primary underline decoration-2 underline-offset-4 hover:underline"
                    to="/register"
                  >
                    Create an Account
                  </Link>
                </p>
              </footer>
            </div>
          </section>
        </main>

        <div className="fixed left-0 top-0 z-[60] h-1 w-full bg-gradient-to-r from-primary via-tertiary to-primary-container" />
      </div>
    </>
  );
};

export default VerveKitchenLogin;
