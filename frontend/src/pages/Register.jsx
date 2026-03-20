import { useEffect, useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../auth/AuthContext';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await auth.register({ firstName, lastName, email, phone, password });
      navigate({ to: '/' });
    } catch {
      setError('Registration failed. Please check your details and try again.');
    }
  };

  useEffect(() => {
    document.title = 'Join Verve Kitchen';
  }, []);

  return (
    <div
      className="min-h-screen bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container"
      style={{ minHeight: 'max(884px, 100dvh)' }}
    >
      <div className="flex min-h-screen flex-col lg:w-1/2">
        <header className="flex w-full justify-center px-6 pb-8 pt-12">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg">
              <span
                className="material-symbols-outlined text-2xl text-on-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                restaurant
              </span>
            </div>
            <span className="font-headline text-2xl font-extrabold tracking-tighter text-primary">
              Verve Kitchen
            </span>
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center px-6 pb-12">
          <div className="w-full max-w-md">
            <div className="mb-10 text-center">
              <h1 className="mb-3 font-headline text-4xl font-extrabold leading-tight tracking-tight text-on-surface">
                Create Your Account
              </h1>
              <p className="text-lg font-medium leading-relaxed text-on-surface-variant">
                Join our culinary community and explore curated tastes.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-surface-container-lowest p-8 shadow-[0_8px_24px_rgba(78,33,33,0.04)]">
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-container/10 blur-3xl"
              />

              <form
                className="relative z-10 space-y-6"
                onSubmit={handleSubmit}
              >
                {error && (
                  <p className="rounded-xl bg-error-container px-4 py-3 text-sm font-medium text-on-error-container">
                    {error}
                  </p>
                )}
                <div className="space-y-2">
                  <label
                    className="ml-1 block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                    htmlFor="first-name"
                  >
                    First Name
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-xl text-on-surface-variant">
                      person
                    </span>
                    <input
                      className="w-full rounded-xl border-none bg-surface-container-low py-4 pl-12 pr-4 font-medium text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
                      id="first-name"
                      placeholder="Auguste"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    className="ml-1 block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                    htmlFor="last-name"
                  >
                    Last Name
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-xl text-on-surface-variant">
                      person
                    </span>
                    <input
                      className="w-full rounded-xl border-none bg-surface-container-low py-4 pl-12 pr-4 font-medium text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
                      id="last-name"
                      placeholder="Escoffier"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    className="ml-1 block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-xl text-on-surface-variant">
                      mail
                    </span>
                    <input
                      className="w-full rounded-xl border-none bg-surface-container-low py-4 pl-12 pr-4 font-medium text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
                      id="email"
                      placeholder="auguste@verve.kitchen"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    className="ml-1 block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-xl text-on-surface-variant">
                      call
                    </span>
                    <input
                      className="w-full rounded-xl border-none bg-surface-container-low py-4 pl-12 pr-4 font-medium text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
                      id="phone"
                      placeholder="+1 (555) 000-0000"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    className="ml-1 block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-4 text-xl text-on-surface-variant">
                      lock
                    </span>
                    <input
                      className="w-full rounded-xl border-none bg-surface-container-low py-4 pl-12 pr-12 font-medium text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
                      id="password"
                      placeholder={'\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'}
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-4 cursor-pointer text-on-surface-variant transition-colors hover:text-primary"
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                    >
                      <span className="material-symbols-outlined text-xl">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-2">
                  <div className="flex h-5 items-center pt-1">
                    <input
                      className="h-5 w-5 cursor-pointer rounded-lg border border-outline-variant bg-surface accent-primary focus:ring-2 focus:ring-primary-container"
                      id="terms"
                      type="checkbox"
                    />
                  </div>
                  <label
                    className="text-sm font-medium leading-snug text-on-surface-variant"
                    htmlFor="terms"
                  >
                    I agree to the{' '}
                    <a
                      className="font-bold text-primary hover:underline"
                      href="#"
                      onClick={(event) => event.preventDefault()}
                    >
                      Terms &amp; Conditions
                    </a>{' '}
                    and{' '}
                    <a
                      className="font-bold text-primary hover:underline"
                      href="#"
                      onClick={(event) => event.preventDefault()}
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  className="w-full rounded-full bg-gradient-to-br from-primary to-primary-container py-5 font-headline text-lg font-bold text-on-primary shadow-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-primary-container/20 active:scale-95"
                  type="submit"
                >
                  Join Verve Kitchen
                </button>
              </form>
            </div>

            <div className="mt-8 text-center">
              <p className="font-medium text-on-surface-variant">
                Already have an account?
                <Link className="ml-1 font-extrabold text-primary hover:underline" to="/login">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>

      <div className="hidden items-center justify-center overflow-hidden bg-surface-container-low p-12 lg:fixed lg:inset-y-0 lg:right-0 lg:flex lg:w-1/2">
        <div className="group relative h-full w-full overflow-hidden rounded-[3rem] shadow-2xl">
          <img
            alt="Gourmet food arrangement"
            className="h-full w-full object-cover scale-110 transition-transform duration-1000 group-hover:scale-100"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1WvMa0cuGHKrUDHysGV2pz2TZkeR6kzWNi62ArcuDsycmi5k4I_zCWIV6rJK5pnS3WRu6ahJUEvy--5cgmvQ0bHjeMzG9fFHYKfTzprENlmQasrv4ZQ5TZtdQor4qHvt-J7GClwFbP-rdIsr81isk85pTH15WH3VG_-V-R7MuzF_R-79F5WLECWo7XLsVQHOIKiM-gYAB0cxllL0EtU36Jnt0-ocd3kAurvg8yOlekPodnaWy2iJMXdtAQeSzwz8sgmpSEVGk0Dc"
          />
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-12">
            <h2 className="mb-4 font-headline text-5xl font-extrabold tracking-tighter text-white">
              Curating the finest flavors, delivered to your doorstep.
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-surface-container-highest">
                  <img
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWQiRs4zKV-0sRp2VO-WL4Wd14QgM3PSG6aB2t52MQoPux2fV10rSANw0wNnCx0I2Z7u2HIYKJey_rO_RUdyT1Sy062t6h_AHVZZr6MhTG4-nQt9TMAe94hpJnuEd6zKdn_59QwxWxIvQJsafeP7I4WDbHaCm6mvM8xgxHj7UkcYyk6VOwrxmfJPf_71n6WOSIqTWvuIPLE5z78Hqhu2-a2BXewiIo8gjaTWlOpikoIVbn2UtpUyW_Lw_60c5K4O0DFHKOTRl5pAI"
                    alt="Member profile"
                  />
                </div>
                <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-surface-container-highest">
                  <img
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCG4wk2EM8O6d_YAmq7TmPdZAaam-a1JcahgxPb-5CVCLz1MpU8yyvF7I0QaarJM3YkSicY3FHqaA9ovaDSUqLXNyFqleH97VS6EDhrIsP9kywiOn0DdFS7dgakUyU7Zjr8QXyZbRQvOq2ei9p7cLJPsHcxtzVspsYCg9mHOEvM1xliI7B8nZS00_uATsHLXzKVXYoVNHni2e3SIc6iCevgQwjQD_IHjildqGbslwr9yyxclSi_6e2vSASFQYpqFveUJDQTYelo8jE"
                    alt="Member profile"
                  />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary text-[10px] font-bold text-white">
                  +2K
                </div>
              </div>
              <span className="text-sm font-medium tracking-wide text-white/80">
                Join 2,000+ members in your area
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
