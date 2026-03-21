import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../auth/AuthContext';

function OnboardingAddress() {
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  const [formValues, setFormValues] = useState({
    streetAddress: '',
    apartment: '',
    city: '',
  });

  const updateField = (field) => (event) => {
    const { value } = event.target;
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    completeOnboarding();
    navigate({ to: '/' });
  };

  return (
    <>
      <style>
        {`
          .onboarding-address .font-headline {
            font-family: 'Plus Jakarta Sans', 'Manrope', sans-serif;
          }

          .onboarding-address .font-body,
          .onboarding-address .font-label {
            font-family: 'Manrope', sans-serif;
          }
        `}
      </style>

      <div
        className="onboarding-address flex min-h-screen flex-col bg-surface font-body text-on-surface"
        style={{ minHeight: 'max(884px, 100dvh)' }}
      >
        <nav className="sticky top-0 z-50 flex w-full items-center justify-between bg-[#fff4f3] px-6 py-4 dark:bg-stone-950">
          <div className="flex items-center">
            <button
              className="text-[#ac2c00] duration-200 active:scale-95 dark:text-[#ffb4a1]"
              type="button"
              onClick={() => navigate({ to: '/onboarding/cuisine' })}
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          </div>
          <div className="font-headline font-bold tracking-tight text-[#4e2121] dark:text-[#f1dfdf]">
            Step 3 of 3
          </div>
          <div className="w-10" />
        </nav>

        <main className="mx-auto flex w-full max-w-xl flex-grow flex-col px-6 pb-12 pt-8">
          <header className="mb-12">
            <h1 className="mb-4 font-headline text-4xl font-extrabold leading-tight tracking-tight text-on-surface">
              Where should we <br />
              <span className="text-primary italic">deliver</span> your first feast?
            </h1>
            <p className="font-body text-lg text-on-surface-variant">
              The Culinary Curator hand-picks restaurants based on your neighborhood&apos;s hidden
              gems.
            </p>
          </header>

          <form className="flex flex-grow flex-col space-y-8" onSubmit={handleSubmit}>
            <div className="group relative mb-10 h-48 w-full overflow-hidden rounded-xl bg-surface-container-low">
              <img
                alt="Minimalist map view of a city neighborhood"
                className="h-full w-full object-cover opacity-60 grayscale transition-all duration-700 hover:grayscale-0"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4_sJuS087GM3BT-K4U4u5vU0Jg1oLDsGVqcvZ1id6g-w1zw4Mb3amNPfxm02Urz7n-RyCEt_3-D5XFU9lR9Tp3Z67rC6sWVuuP5J7Tqulk7_2aBhBEt_5OIVydQZMpkG8-P1RWT8pRQbuNRswMGTRF-Sp3c9tStuN_BnCqTRQDSiQIWxiHgBkFWIdwufYtRXJ4Y1l33zdMo6qCANDM7ymVnR7iqgDtzRdK1bd91ZCDZesvx-e9HwyzUQgSgcc38z-oH-TGqFLx64"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-surface-container-lowest px-4 py-2 shadow-sm">
                <span
                  className="material-symbols-outlined text-sm text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  location_on
                </span>
                <span className="font-label text-xs font-bold uppercase tracking-wider text-on-surface">
                  Detecting Location...
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  className="px-1 font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                  htmlFor="street-address"
                >
                  Street Address
                </label>
                <div className="group relative">
                  <input
                    className="w-full rounded-xl border-none bg-surface-container-low px-4 py-4 font-headline font-semibold text-on-surface placeholder:text-outline/40 transition-all focus:ring-2 focus:ring-primary-container"
                    id="street-address"
                    placeholder="123 Gastronomy Lane"
                    type="text"
                    value={formValues.streetAddress}
                    onChange={updateField('streetAddress')}
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant">
                    search
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className="px-1 font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                  htmlFor="apartment"
                >
                  Apartment / Suite
                </label>
                <input
                  className="w-full rounded-xl border-none bg-surface-container-low px-4 py-4 font-headline font-semibold text-on-surface placeholder:text-outline/40 transition-all focus:ring-2 focus:ring-primary-container"
                  id="apartment"
                  placeholder="Unit 4B (Optional)"
                  type="text"
                  value={formValues.apartment}
                  onChange={updateField('apartment')}
                />
              </div>

              <div className="space-y-2">
                <label
                  className="px-1 font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant"
                  htmlFor="city"
                >
                  City
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded-xl border-none bg-surface-container-low px-4 py-4 font-headline font-semibold text-on-surface placeholder:text-outline/40 transition-all focus:ring-2 focus:ring-primary-container"
                    id="city"
                    placeholder="San Francisco"
                    type="text"
                    value={formValues.city}
                    onChange={updateField('city')}
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant">
                    location_city
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl bg-surface-container-lowest p-6 shadow-[0_8px_24px_rgba(78,33,33,0.04)] outline outline-outline-variant/15">
              <div className="rounded-lg bg-primary-container/20 p-2">
                <span className="material-symbols-outlined text-primary">info</span>
              </div>
              <div>
                <h4 className="font-headline text-sm font-bold text-on-surface">Almost there!</h4>
                <p className="mt-1 font-body text-sm text-on-surface-variant">
                  We&apos;ll use this address to find exclusive seasonal menus nearby.
                </p>
              </div>
            </div>

            <footer className="-mx-6 sticky bottom-0 mt-12 bg-surface/80 px-6 py-6 backdrop-blur-md">
              <button
                className="flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-br from-primary to-primary-container py-4 font-headline text-lg font-bold text-on-primary shadow-[0_8px_24px_rgba(172,44,0,0.25)] transition-transform duration-200 active:scale-95"
                type="submit"
              >
                Start Exploring
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <p className="mt-4 text-center font-label text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant opacity-60">
                Secured by Curator Cloud
              </p>
            </footer>
          </form>
        </main>
      </div>
    </>
  );
}

export default OnboardingAddress;
