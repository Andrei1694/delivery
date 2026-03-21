import { useNavigate } from '@tanstack/react-router';

const featureHighlights = [
  {
    title: 'Precision Sourcing',
    description: 'We only show restaurants that can deliver to your door in peak freshness.',
    icon: 'restaurant',
    accentClass: 'bg-primary/10 text-primary',
  },
  {
    title: 'Curated Collections',
    description: 'Unlock exclusive seasonal menus tailored to your specific micro-region.',
    icon: 'auto_awesome',
    accentClass: 'bg-tertiary/10 text-tertiary',
  },
];

function OnboardingLocation() {
  const navigate = useNavigate();

  return (
    <>
      <style>
        {`
          .onboarding-location .font-headline {
            font-family: 'Plus Jakarta Sans', 'Manrope', sans-serif;
          }

          .onboarding-location .font-body,
          .onboarding-location .font-label {
            font-family: 'Manrope', sans-serif;
          }

          .onboarding-location .asymmetric-shape {
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          }
        `}
      </style>

      <div
        className="onboarding-location overflow-hidden bg-surface font-body text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container"
        style={{ minHeight: 'max(884px, 100dvh)' }}
      >
        <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-[#fff4f3] px-6 py-4 dark:bg-stone-950">
          <div className="flex items-center gap-4">
            <button
              className="text-[#ac2c00] duration-200 active:scale-95 dark:text-[#ffb4a1]"
              type="button"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          </div>
          <h1 className="font-headline font-bold tracking-tight text-[#4e2121] dark:text-[#f1dfdf]">
            The Culinary Curator
          </h1>
          <div className="w-10" />
        </header>

        <main className="relative mx-auto flex min-h-screen max-w-md flex-col items-center justify-center overflow-hidden px-8 pb-12 pt-20">
          <div className="absolute -left-20 top-40 h-64 w-64 rounded-full bg-primary-container/20 blur-3xl" />
          <div className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-tertiary-container/10 blur-3xl" />

          <div className="relative mb-12 aspect-square w-full">
            <div className="asymmetric-shape absolute inset-0 scale-110 bg-surface-container-low opacity-50" />
            <div className="relative z-10 h-full w-full p-8">
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-surface-container-lowest shadow-lg">
                <img
                  alt="Gourmet food delivery abstract"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPcvvAZUkUd9-9Vg3r5yUufgem95FxslN17nYOvTdRNNfBC0w_mC4ywqXu_4vF3WBDFbpWq17Me3FSCQE4wQVy1Zo4BLtAxK9ElPwAubAD6IH8pT-M3Cpb970eT4B9deDM71y-WEn_6xXkDXgKV81X5hnKFkTnjJAwRcmS2HH4wfUljZYipz05KjAIsV6dIYGAFpa9aNNI_nTigOY_OQyEoRikAgWw5S3zUZB8rLgs3r3nllmysqnhDMP_bdij2y_1YAwIP7TSyq4"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 rounded-full bg-primary p-6 text-on-primary shadow-[0_8px_24px_rgba(172,44,0,0.2)] transition-transform duration-300 active:scale-90">
                <span
                  className="material-symbols-outlined text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  location_on
                </span>
              </div>
            </div>
          </div>

          <div className="relative z-10 mb-12 space-y-4 text-center">
            <h2 className="font-headline text-4xl font-extrabold leading-tight tracking-tight text-on-surface">
              Discover local <span className="text-primary">Masterpieces</span>
            </h2>
            <p className="font-body text-lg leading-relaxed text-on-surface-variant">
              Allow location access to curate a gallery of the finest culinary experiences
              currently serving in your neighborhood.
            </p>
          </div>

          <div className="relative z-10 mb-12 grid w-full grid-cols-1 gap-4">
            {featureHighlights.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-4 rounded-xl bg-surface-container-low p-4 transition-colors duration-300 hover:bg-surface-container"
              >
                <div className={`rounded-lg p-2 ${feature.accentClass}`}>
                  <span className="material-symbols-outlined">{feature.icon}</span>
                </div>
                <div>
                  <h3 className="font-headline font-bold text-on-surface">{feature.title}</h3>
                  <p className="text-sm leading-snug text-on-surface-variant">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative z-10 w-full space-y-4">
            <button
              className="flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-br from-[#ac2c00] to-[#ff7852] px-8 py-5 font-headline text-lg font-bold text-white shadow-[0_8px_24px_rgba(172,44,0,0.15)] transition-all duration-200 active:scale-95"
              type="button"
              onClick={() => navigate({ to: '/onboarding/cuisine' })}
            >
              Enable Location
              <span className="material-symbols-outlined text-xl">near_me</span>
            </button>
            <button
              className="w-full py-4 font-headline text-sm font-semibold text-on-surface-variant transition-colors duration-200 hover:text-on-surface active:scale-95"
              type="button"
              onClick={() => navigate({ to: '/onboarding/address' })}
            >
              Enter address manually
            </button>
          </div>
        </main>

        <div className="fixed bottom-0 z-50 flex w-full items-center justify-around px-4 pb-8 md:hidden">
          <div className="ghost-border mx-auto flex w-full max-w-sm items-center justify-around rounded-[2rem] border border-[#e09c99]/15 bg-[#fff4f3]/70 px-4 py-3 shadow-[0_8px_24px_rgba(78,33,33,0.06)] backdrop-blur-xl dark:bg-stone-950/70">
            {['Discover', 'Orders', 'Profile'].map((label, index) => (
              <div
                key={label}
                className="flex cursor-not-allowed flex-col items-center justify-center px-4 py-2 text-[#4e2121]/50 opacity-50 dark:text-[#f1dfdf]/50"
              >
                <span className="material-symbols-outlined">
                  {index === 0 ? 'explore' : index === 1 ? 'receipt_long' : 'person'}
                </span>
                <span className="mt-1 font-label text-[11px] font-bold uppercase tracking-widest">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default OnboardingLocation;
