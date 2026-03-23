import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import SymbolIcon from '../../components/SymbolIcon';
import { getSavedAddressesData } from '../../mocks';

function AddressCard({ label, address, icon, iconClassName, onEdit, onDelete }) {
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
            onClick={onEdit}
          >
            <SymbolIcon className="text-sm" name="edit" />
          </button>
          <button
            aria-label={`Delete ${label} address`}
            className="p-2 text-on-surface-variant transition-colors hover:text-error"
            type="button"
            onClick={onDelete}
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

const getStoredAddresses = () => {
  const stored = sessionStorage.getItem('savedAddresses');
  if (stored) {
    return JSON.parse(stored);
  }
  return getSavedAddressesData().addresses;
};

const saveAddressesToStorage = (addresses) => {
  sessionStorage.setItem('savedAddresses', JSON.stringify(addresses));
};

export default function SavedAddresses() {
  const navigate = useNavigate();
  const { hero, addAddressLabel, spotlight } = getSavedAddressesData();
  const [addresses, setAddresses] = useState(getStoredAddresses);

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    navigate({ to: '/profile' });
  };

  const handleDeleteAddress = (label) => {
    setAddresses((prev) => {
      const updated = prev.filter((addr) => addr.label !== label);
      saveAddressesToStorage(updated);
      return updated;
    });
  };

  const handleEditAddress = (address) => {
    console.log('Storing address for edit:', address);
    sessionStorage.setItem('editAddress', JSON.stringify(address));
    console.log('Navigating to delivery-address form');
    navigate({ to: '/delivery-address' });
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

      <div className="saved-addresses-page bg-surface pb-16 text-on-surface antialiased">
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
              alt={hero.imageAlt}
              className="h-full w-full object-cover opacity-40 grayscale transition-transform duration-700 group-hover:scale-105"
              src={hero.image}
            />
            <div className="absolute bottom-6 left-6 z-20">
              <p className="font-headline text-3xl leading-tight font-extrabold tracking-tight text-on-surface">
                {hero.titleLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {addresses.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <SymbolIcon className="mb-4 text-6xl text-on-surface-variant/30" name="location_off" />
                <p className="font-headline text-lg font-bold text-on-surface-variant">
                  No saved addresses yet
                </p>
                <p className="mt-2 text-sm text-on-surface-variant">
                  Add your first address to get started
                </p>
              </div>
            ) : (
              addresses.map((item) => (
                <AddressCard
                  key={item.label}
                  {...item}
                  onEdit={() => handleEditAddress(item)}
                  onDelete={() => handleDeleteAddress(item.label)}
                />
              ))
            )}

            <button
              className="group flex min-h-[180px] flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed border-outline-variant/30 p-6 transition-all duration-300 hover:border-primary-container hover:bg-white"
              type="button"
              onClick={() => navigate({ to: '/delivery-address' })}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container text-white shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
                <SymbolIcon className="text-2xl" name="add" />
              </div>
              <span className="font-headline font-bold text-primary">{addAddressLabel}</span>
            </button>
          </section>

          <section className="glass-panel mt-12 rounded-[2.5rem] border border-white/20 bg-surface-container-low/40 p-8">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl">
                <img
                  alt={spotlight.imageAlt}
                  className="h-full w-full object-cover"
                  src={spotlight.image}
                />
              </div>

              <div className="flex-grow">
                <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  {spotlight.eyebrow}
                </span>
                <h2 className="font-headline text-lg font-bold text-on-surface">
                  {spotlight.title}
                </h2>
                <p className="text-xs font-medium text-on-surface-variant">
                  {spotlight.description}
                </p>
              </div>

              <div className="hidden sm:block">
                <SymbolIcon
                  className="text-4xl text-on-surface-variant/40"
                  name={spotlight.icon}
                />
              </div>
            </div>
          </section>
        </main>

      </div>
    </>
  );
}
