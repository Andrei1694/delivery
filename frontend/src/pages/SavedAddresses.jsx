import { useNavigate } from '@tanstack/react-router';
import SymbolIcon from '../components/SymbolIcon';

const SAVED_ADDRESSES = [
  {
    label: 'Home',
    address: '123 Culinary Way, Apartment 4B, Foodie District, NY 10001',
    icon: 'home',
    iconClassName: 'bg-primary-container/20 text-primary',
  },
  {
    label: 'Work',
    address: '456 Gourmet Plaza, Floor 12, Innovation Tower, NY 10012',
    icon: 'work',
    iconClassName: 'bg-tertiary-container/20 text-tertiary',
  },
  {
    label: 'The Gym',
    address: '88 Pulse Street, Wellness Park',
    icon: 'fitness_center',
    iconClassName: 'bg-secondary-container/20 text-secondary',
  },
];

const FOOTER_NAV_ITEMS = [
  { label: 'Explore', icon: 'explore', to: '/' },
  { label: 'Orders', icon: 'receipt_long', to: '/order-history' },
  { label: 'Saved', icon: 'bookmark', active: true },
  { label: 'Profile', icon: 'person', to: '/profile' },
];

function AddressCard({ label, address, icon, iconClassName }) {
  return (
    <article className="ambient-shadow flex flex-col justify-between rounded-[2rem] bg-surface-container-lowest p-6 transition-colors duration-300 hover:bg-surface-container-high">
      <div className="mb-10 flex items-start justify-between">
        <div className={`rounded-2xl p-3 ${iconClassName}`}>
          <SymbolIcon className="text-[28px]" filled name={icon} />
        </div>

        <div className="flex gap-2">
          <button
            aria-label={`Edit ${label} address`}
            className="p-2 text-on-surface-variant transition-colors hover:text-primary"
            type="button"
          >
            <SymbolIcon className="text-sm" name="edit" />
          </button>
          <button
            aria-label={`Delete ${label} address`}
            className="p-2 text-on-surface-variant transition-colors hover:text-error"
            type="button"
          >
            <SymbolIcon className="text-sm" name="delete" />
          </button>
        </div>
      </div>

      <div>
        <h2 className="font-headline text-xl font-bold text-on-surface">{label}</h2>
        <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{address}</p>
      </div>
    </article>
  );
}

function FooterNavButton({ label, icon, active = false, onClick }) {
  if (active) {
    return (
      <button
        aria-current="page"
        className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-[#ac2c00] to-[#ff7852] px-5 py-2 text-white duration-300 ease-out active:scale-90"
        type="button"
      >
        <SymbolIcon className="text-[22px]" filled name={icon} />
        <span className="mt-1 font-body text-[11px] font-bold uppercase tracking-wider">
          {label}
        </span>
      </button>
    );
  }

  return (
    <button
      className="flex flex-col items-center justify-center px-5 py-2 text-[#4e2121]/60 transition-colors duration-300 ease-out hover:bg-[#ffedeb] active:scale-90"
      type="button"
      onClick={onClick}
    >
      <SymbolIcon className="text-[22px]" name={icon} />
      <span className="mt-1 font-body text-[11px] font-bold uppercase tracking-wider">
        {label}
      </span>
    </button>
  );
}

export default function SavedAddresses() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    navigate({ to: '/profile' });
  };

  return (
    <>
      <style>
        {`
          .saved-addresses-page {
            min-height: max(884px, 100dvh);
            font-family: 'Manrope', sans-serif;
            -webkit-tap-highlight-color: transparent;
          }

          .saved-addresses-page .font-headline {
            font-family: 'Plus Jakarta Sans', 'Manrope', sans-serif;
          }

          .saved-addresses-page .ambient-shadow {
            box-shadow: 0 8px 24px rgba(78, 33, 33, 0.04);
          }

          .saved-addresses-page .glass-panel {
            -webkit-backdrop-filter: blur(18px);
            backdrop-filter: blur(18px);
          }
        `}
      </style>

      <div className="saved-addresses-page bg-surface pb-32 text-on-surface antialiased">
        <header className="sticky top-0 z-50 flex h-16 w-full items-center bg-[#fff4f3] px-6 py-4">
          <div className="mx-auto flex w-full max-w-2xl items-center gap-4">
            <button
              aria-label="Go back"
              className="flex items-center justify-center rounded-full p-2 text-[#ac2c00] transition-opacity duration-200 hover:opacity-80 active:scale-95"
              type="button"
              onClick={handleBack}
            >
              <SymbolIcon className="text-2xl" name="arrow_back" />
            </button>

            <h1 className="font-headline text-lg font-bold text-[#4e2121]">
              Saved Addresses
            </h1>
          </div>
        </header>

        <main className="mx-auto max-w-2xl space-y-8 px-6 pt-8">
          <section className="group relative h-64 w-full overflow-hidden rounded-3xl bg-surface-container-low">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-surface/80 to-transparent" />
            <img
              alt="Minimalist abstract map background for food delivery"
              className="h-full w-full object-cover opacity-40 grayscale transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnqj418_dEYRRkybZDUSq6nq5JfpbmG728dJ7SKUJhd2ntE3JUXMUyP2DE4Z2gHzohWBdfAINKGcryjKH15n0_xAIymAxM0G-iJ1cZLKQFmsbR5pEn7M8jQOYGTy9vJ4hok2xIb0YAzVKiBYLRexBa1X3b2fu86e7PN2e21959kGw3GhmbS3Fdig1icJPh3UwEwj7AFRybb4wr-iz0KEuDl6HS8OqnkYcGJtRAxTUOMGOcuSvNGOV25iQTqU-FXM9ZTXAHAgZbJ_w"
            />
            <div className="absolute bottom-6 left-6 z-20">
              <p className="font-headline text-3xl leading-tight font-extrabold tracking-tight text-on-surface">
                Your world,
                <br />
                curated for flavor.
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {SAVED_ADDRESSES.map((item) => (
              <AddressCard key={item.label} {...item} />
            ))}

            <button
              className="group flex min-h-[180px] flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed border-outline-variant/30 p-6 transition-all duration-300 hover:border-primary-container hover:bg-white"
              type="button"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container text-white shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                <SymbolIcon className="text-2xl" name="add" />
              </div>
              <span className="font-headline font-bold text-primary">Add New Address</span>
            </button>
          </section>

          <section className="glass-panel mt-12 rounded-[2.5rem] border border-white/20 bg-surface-container-low/40 p-8">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl">
                <img
                  alt="Delicious fresh artisan pizza"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5xXdy6SJjQMGeC2CqeJVwZoTFWVBsrVFJQhuhooRuoEuHhCjKzLF2EtE6fnfc-bLiRlDPTXiPLwYXWPv3Cfy9Vg0H1_2cX_G-TsE2MmHSc3UU80Ua-HYqiClOCm7kpIivbuYZIuMlwNS8O4oT5P_rxtuhMfHbKTixQksdFqUXlfQyr78xl092XLfEVSXwPwkOy2J6omEd2t1k3YpV90OOpvAHXdUF-WZ0gFaC9hs6tV4QOu1eQO0NsMd6eM3fnlNghNd6xec91LQ"
                />
              </div>

              <div className="flex-grow">
                <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  Most Used
                </span>
                <h2 className="font-headline text-lg font-bold text-on-surface">
                  Home Delivery
                </h2>
                <p className="text-xs font-medium text-on-surface-variant">
                  85% of your orders go here
                </p>
              </div>

              <div className="hidden sm:block">
                <SymbolIcon className="text-4xl text-on-surface-variant/40" name="query_stats" />
              </div>
            </div>
          </section>
        </main>

        <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-4 pb-8">
          <div className="glass-panel mx-auto mb-4 flex w-full max-w-lg items-center justify-around overflow-hidden rounded-3xl bg-white/60 py-3 shadow-[0_8px_24px_rgba(78,33,33,0.06)]">
            {FOOTER_NAV_ITEMS.map((item) => (
              <FooterNavButton
                key={item.label}
                active={item.active}
                icon={item.icon}
                label={item.label}
                onClick={item.to ? () => navigate({ to: item.to }) : undefined}
              />
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
