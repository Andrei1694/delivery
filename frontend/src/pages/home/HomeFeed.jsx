import { Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../auth/AuthContext';

const categories = [
  {
    name: 'Pizza',
    meta: '128 options',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC9WvYbgsn1tjhIzkyRIoR2s7MQHIhkBSuE8on9bpnqq0G9coRVveq_q8jpZ09YFCHyK6ka__M6HVCZF-80vwVkXgmEnIJksjennbmdasnUbM9HzxuvHHGwiCYRu80kV8cgXrKFoa58x7Z09eVI9jAmZsvawFIRRVdiPsUx0kLO5YzkuGEkleAVP5WT8CzmusWbPurnmfGH-ZF-aYFTq-uSBTGEJosen3xuQevwyo_9ubgQnfOVNNH1psh4tY1PhbnRCeHfzAtUfRU',
    containerClassName:
      'col-span-3 row-span-2 bg-primary-container p-5 text-on-primary-container',
    imageWrapperClassName:
      'absolute -bottom-4 -right-4 h-32 w-32 rotate-12 transition-transform duration-500 group-hover:scale-110',
    titleClassName: 'text-xl',
  },
  {
    name: 'Sushi',
    meta: null,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA4TPMs6CJAwb38XldJYGJJVm87pphR91ixtGOu-YcZRufDNacZtdqYJ1Sy-KDTeHdRl0jPqQVGyfQFczCkOfSXNVTyE1OiQfF2ur6DdVX-4Y6W8pKM8IU-_HIHXUbEzSZCDQVx2Vmtn5XTSVIHupfuKosc9WaAGTqLpZitkPBI-i8TSgqR_SF-_YVQAtQ6k2pt86xpe8zRgDqGh8uc5PEAA0-iMf6bn480PbdWbI82KZwr8M5mViX1blYIldHdO5y9xKBZAUffaJE',
    containerClassName:
      'col-span-3 row-span-1 bg-tertiary-container p-5 text-on-tertiary-container',
    imageWrapperClassName:
      'h-16 w-16 transition-transform duration-500 group-hover:rotate-12',
    titleClassName: 'text-lg',
  },
  {
    name: 'Burgers',
    meta: null,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDRagbTdCwn71CjId3G-qc_PI8qB_F3vIkldlvOpIy7KgyXQoOkV9JG4zFdpPIrXDcRhXIOwnobxfq_56EsLHb6fsWhQu_amjBzPrOyYP8qoprimF_DApFndDEkKlDEtycxesGxV8-eNDbU9zAXNSjKpe7zbzggGS3hodHRr4KOZ0qiC2HuMVaP0E-IKfnuDPOOSb06k0oz-P7axX_ulmZ_nk1GSReo8bUUjgRlaOf4SdcWZMUEM3qo7IFpgbZPuuepiLOn7sKu8DI',
    containerClassName:
      'col-span-3 row-span-1 bg-surface-container-high p-5 text-on-surface',
    imageWrapperClassName:
      'h-16 w-16 transition-transform duration-500 group-hover:-rotate-12',
    titleClassName: 'text-lg',
  },
];

const restaurants = [
  {
    name: 'The Heritage Kitchen',
    meta: 'Modern European / 20-30 min / Free Delivery',
    rating: '4.9',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAD25ttG6SC-8VnapaRPDCPvGq9EiPDgWxDX4bj0lameAu2wiky4dQxNJnmb8IVxVQDHK7z6bSqAgl12lSUKiWIQLKsVSRQ8tpwRQVi6s2HLDhfYgKIFS7P2Ppg-seVm_61eWJr5RMnartyaMC6JWalsKs_F-JymEkmJ6gsAVSW7BuX7BdHfW6Tl_DE9AzAVC7iYd8dMFsot3GfymotAWlgIiylVSYS5TNEnCPcVlKERwvzVbR-G0CnA4MaBSbTlmiEOPf_gJ6XODA',
    tag: 'FEATURED',
  },
  {
    name: 'Sakura Bloom',
    meta: 'Authentic Japanese / 15-25 min / $$',
    rating: '4.7',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDxhTKQnbVX-6sB3PwpG-_b4NyZJzLCZt9Jd76X8Pg7JsERy7zMDBnwZqWMm5GhhKpEuCkRzYijLY6ULplPnabQarGTm6O7VTcmFkqCYW8-nZjh_A4yYzn-8FKrwzxS4gRFW26W1MvuTiEZplUX6fBV1T0huU9UY0OkFJ9M9Y7G4jQl7kem2BWOZ2GdrTkyWkdnCCI5VRInW0pL79_AkDDAgCXsvBBBZHeBBYN5RWuKz8ZTs-Ly-vsXTiLnCq93R3W5li_qek6TQwM',
    tag: null,
  },
  {
    name: 'Burger Haven',
    meta: '10-20 min / $',
    rating: '4.5',
    image: null,
    placeholderIcon: 'restaurant',
    tag: null,
  },
  {
    name: 'Vero Italiano',
    meta: '25-40 min / $$$',
    rating: '4.8',
    image: null,
    placeholderIcon: 'local_pizza',
    tag: null,
  },
];

const navItems = [
  { label: 'Explore', icon: 'restaurant', href: '#top', active: true },
  { label: 'Search', icon: 'search', href: '#search' },
  { label: 'Orders', icon: 'receipt_long', href: '#curated' },
  { label: 'Profile', icon: 'person', to: '/profile' },
];

const iconStyle = {
  fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
};

const filledIconStyle = {
  fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24",
};

const SymbolIcon = ({ name, className = '', filled = false }) => (
  <span
    aria-hidden="true"
    className={`material-symbols-outlined ${className}`.trim()}
    style={filled ? filledIconStyle : iconStyle}
  >
    {name}
  </span>
);

export default function HomeFeed() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
	await logout();
	navigate({ to: '/login' });
  };

  const displayName =
    user?.firstName?.trim() ||
    user?.name?.trim() ||
    (typeof user?.email === 'string' ? user.email.split('@')[0] : 'Guest');
  const userInitial = displayName.charAt(0).toUpperCase();
  const userEmail = user?.email || 'Signed in';

  return (
    <div
      id="top"
      className="relative min-h-screen overflow-hidden bg-background text-on-surface"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(255,120,82,0.18),transparent_58%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-5rem] top-[22rem] h-56 w-56 rounded-full bg-secondary-fixed/35 blur-3xl"
      />

      <header className="fixed top-0 z-50 w-full bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-lg items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high text-sm font-bold uppercase text-on-surface shadow-[0_12px_30px_rgba(78,33,33,0.08)]">
              {userInitial}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant">
                Deliver to
              </span>
              <span className="font-headline text-sm font-bold text-on-surface">
                Home / 124 Park Ave
              </span>
            </div>
          </div>

          <button
            type="button"
            className="rounded-full bg-surface-container-lowest/80 p-3 text-primary shadow-[0_12px_30px_rgba(78,33,33,0.06)] transition-transform duration-200 active:scale-95"
            aria-label="Open bag"
          >
            <SymbolIcon name="shopping_bag" className="text-[22px]" />
          </button>
        </div>
      </header>

      <main className="relative mx-auto max-w-lg px-6 pb-40 pt-24">
        <section id="search" className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-on-surface-variant">
            Welcome back, {displayName}
          </p>
          <h1 className="mb-6 font-headline text-4xl font-extrabold leading-tight tracking-tight text-on-surface">
            What are you
            <br />
            <span className="text-primary">craving today?</span>
          </h1>

          <label className="relative block">
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-on-surface-variant">
              <SymbolIcon name="search" className="text-[22px]" />
            </span>
            <input
              type="text"
              placeholder="Search restaurants, dishes..."
              className="w-full rounded-full border border-transparent bg-surface-container-lowest py-4 pl-12 pr-6 font-medium text-on-surface shadow-[0_8px_24px_rgba(78,33,33,0.04)] transition-all placeholder:text-on-surface-variant/50 focus:border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </label>
        </section>

        <section className="mb-12">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="font-headline text-xl font-bold text-on-surface">
              Quick Categories
            </h2>
            <a href="#curated" className="text-sm font-bold text-primary">
              View all
            </a>
          </div>

          <div className="grid h-[220px] grid-cols-6 grid-rows-2 gap-4">
            {categories.map((category) => (
              <article
                key={category.name}
                className={`group relative flex overflow-hidden rounded-[1.75rem] ${category.containerClassName}`}
              >
                <div className="relative z-10 flex h-full w-full flex-col justify-between">
                  <div>
                    <h3
                      className={`font-headline font-extrabold ${category.titleClassName}`}
                    >
                      {category.name}
                    </h3>
                    {category.meta ? (
                      <p className="mt-1 text-xs font-bold opacity-70">
                        {category.meta}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className={category.imageWrapperClassName}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-contain"
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="curated" className="mb-12">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-headline text-xl font-bold text-on-surface">
              Curated For You
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {restaurants.map((restaurant) => (
              <article key={restaurant.name} className="group relative">
                <div className="relative mb-2 aspect-[4/3] w-full overflow-hidden rounded-xl shadow-sm">
                  {restaurant.image ? (
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-surface-container">
                      <SymbolIcon
                        name={restaurant.placeholderIcon}
                        className="text-4xl text-on-surface-variant/40"
                      />
                    </div>
                  )}

                  <div className="absolute right-2 top-2 flex items-center gap-0.5 rounded-md bg-surface-container-lowest/90 px-1.5 py-0.5 backdrop-blur-md">
                    <SymbolIcon
                      name="star"
                      filled
                      className="text-sm text-yellow-500"
                    />
                    <span className="text-xs font-bold text-on-surface">
                      {restaurant.rating}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-headline text-xs font-bold tracking-tight text-on-surface truncate">
                    {restaurant.name}
                  </h3>
                  <p className="mt-0.5 text-[10px] font-medium text-on-surface-variant truncate">
                    {restaurant.meta}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-tertiary p-8 text-on-tertiary shadow-[0_24px_50px_rgba(130,62,155,0.22)]">
            <div className="relative z-10 max-w-[60%]">
              <h2 className="mb-2 font-headline text-3xl font-extrabold leading-tight">
                Weekend Feast
              </h2>
              <p className="mb-6 text-sm font-medium text-on-tertiary/80">
                Get 30% off on all family platters this weekend.
              </p>
              <button
                type="button"
                className="rounded-full bg-surface-container-lowest px-6 py-3 text-sm font-bold text-tertiary shadow-xl transition-transform active:scale-95"
              >
                Claim Offer
              </button>
            </div>

            <div
              aria-hidden="true"
              className="absolute -bottom-10 -right-10 opacity-40"
            >
              <SymbolIcon name="restaurant" className="text-[12rem]" />
            </div>
          </div>
        </section>

        <section id="profile" className="pb-4">
          <div className="rounded-[2rem] border border-outline-variant/60 bg-surface-container-lowest/90 p-5 shadow-[0_16px_30px_rgba(78,33,33,0.06)] backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-on-surface-variant">
              Signed in
            </p>
            <div className="mt-3 flex items-center justify-between gap-4">
              <div>
                <p className="font-headline text-lg font-bold text-on-surface">
                  {displayName}
                </p>
                <p className="text-sm text-on-surface-variant">{userEmail}</p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-outline-variant bg-surface px-4 py-2 text-sm font-bold text-on-surface transition-colors hover:border-primary hover:text-primary"
              >
                Sign out
              </button>
            </div>
          </div>
        </section>
      </main>

      <nav className="fixed bottom-6 left-1/2 z-50 w-[92%] max-w-[400px] -translate-x-1/2 rounded-[2rem] bg-background/80 shadow-[0_8px_24px_rgba(78,33,33,0.06)] backdrop-blur-md">
        <div className="flex items-center justify-around p-2">
          {navItems.map((item) => (
            item.to ? (
              <Link
                key={item.label}
                to={item.to}
                className="flex flex-col items-center justify-center rounded-full px-5 py-2 text-on-surface/60 transition-colors duration-300 ease-out hover:bg-surface-container-low hover:text-on-surface"
              >
                <SymbolIcon name={item.icon} className="text-[22px]" />
                <span className="mt-0.5 font-label text-[11px] font-semibold">
                  {item.label}
                </span>
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                aria-current={item.active ? 'page' : undefined}
                className={
                  item.active
                    ? 'flex flex-col items-center justify-center rounded-full bg-surface-container-high px-5 py-2 text-on-surface transition-opacity duration-300 ease-out hover:opacity-80'
                    : 'flex flex-col items-center justify-center rounded-full px-5 py-2 text-on-surface/60 transition-colors duration-300 ease-out hover:bg-surface-container-low hover:text-on-surface'
                }
              >
                <SymbolIcon
                  name={item.icon}
                  filled={item.active}
                  className="text-[22px]"
                />
                <span className="mt-0.5 font-label text-[11px] font-semibold">
                  {item.label}
                </span>
              </a>
            )
          ))}
        </div>
      </nav>
    </div>
  );
}
