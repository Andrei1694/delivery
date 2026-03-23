import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import SymbolIcon from './SymbolIcon';
import { getSavedAddressesData } from '../mocks';

const ADDRESS_LABELS = [
  { id: 'home', label: 'Home', icon: 'home', filled: true },
  { id: 'work', label: 'Work', icon: 'work' },
  { id: 'other', label: 'Other', icon: 'push_pin' },
];

const MAP_PREVIEW = {
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB4UviFAo0_-tYzlJwyRWgfPQWzucnhX2Uh1GgMs0YV0Z4p3lSPANsh3CAI3D1aXmc-reFMzEOqcAFB986-VIRDgNMa6-i64afMtdro3gzQqZTAfXSpf2xNyih3Rh28i579q6YFDcjoUTedGYV-3kZ5TSW4UFFrrcRG1uQvxY4lLc3rJpdyhP9_e2cyOaX9So7UGc0b-NrHdWE8Uf0163NMIqiqfOaBaDwJsAgW92u4-mMreqFN6KPrK_DxWe90pKuRdtZX6lwtzCc',
  alt: 'Detailed city map view with a centered location pin',
  district: 'Marylebone, London NW1 6XE',
};

const INITIAL_VALUES = {
  search: '221B Baker Street, London',
  apartment: '',
  floor: '',
  notes: '',
};

export default function DeliveryAddress() {
  const navigate = useNavigate();

  // Get edit data from sessionStorage
  const stored = sessionStorage.getItem('editAddress');
  const editData = stored ? JSON.parse(stored) : null;
  const isEditMode = !!editData;

  // Clear the edit data from sessionStorage after reading
  if (stored) {
    sessionStorage.removeItem('editAddress');
  }

  // Set initial values based on edit mode
  const initialValues = editData
    ? {
        search: editData.address || '',
        apartment: '',
        floor: '',
        notes: '',
      }
    : INITIAL_VALUES;

  const initialLabel = editData?.label ? editData.label.toLowerCase() : 'home';

  const [values, setValues] = useState(initialValues);
  const [selectedLabel, setSelectedLabel] = useState(initialLabel);
  const [isDefault, setIsDefault] = useState(true);

  // Debug: log what we're loading
  if (editData) {
    console.log('Edit mode - loading address:', editData);
    console.log('Initial values:', initialValues);
    console.log('Initial label:', initialLabel);
  }

  const updateField = (field) => (event) => {
    const { value } = event.target;

    setValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    navigate({ to: '/saved-addresses' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Get current addresses from storage
    const stored = sessionStorage.getItem('savedAddresses');
    let addresses = stored ? JSON.parse(stored) : [];

    // If no addresses in storage, get from mock data
    if (addresses.length === 0) {
      addresses = getSavedAddressesData().addresses;
    }

    // Create the address object
    const labelConfig = ADDRESS_LABELS.find((l) => l.id === selectedLabel);
    const newAddress = {
      label: labelConfig?.label || 'Home',
      address: values.search,
      icon: labelConfig?.icon || 'home',
      iconClassName: getIconClassName(selectedLabel),
    };

    if (isEditMode && editData) {
      // Update existing address
      addresses = addresses.map((addr) =>
        addr.label === editData.label ? newAddress : addr
      );
    } else {
      // Check if address with this label already exists
      const existingIndex = addresses.findIndex((addr) => addr.label === newAddress.label);
      if (existingIndex >= 0) {
        // Replace existing address with same label
        addresses[existingIndex] = newAddress;
      } else {
        // Add new address
        addresses.push(newAddress);
      }
    }

    // Save to storage
    sessionStorage.setItem('savedAddresses', JSON.stringify(addresses));

    navigate({ to: '/saved-addresses' });
  };

  const getIconClassName = (label) => {
    switch (label) {
      case 'home':
        return 'bg-primary-container/20 text-primary';
      case 'work':
        return 'bg-tertiary-container/20 text-tertiary';
      default:
        return 'bg-secondary-container/20 text-secondary';
    }
  };

  return (
    <>
      <style>
        {`
          .delivery-address-page {
            min-height: max(884px, 100dvh);
            -webkit-tap-highlight-color: transparent;
          }

          .delivery-address-page .font-headline {
            font-family: 'Plus Jakarta Sans', 'Manrope', sans-serif;
          }
        `}
      </style>

      <div className="delivery-address-page bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container">
        <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-[#ffedeb] px-6">
          <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                aria-label="Go back"
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 hover:bg-surface active:scale-95"
                type="button"
                onClick={handleBack}
              >
                <SymbolIcon className="text-primary" name="arrow_back" />
              </button>

              <h1 className="font-headline text-lg font-bold tracking-tight text-primary">
                {isEditMode ? 'Edit Address' : 'Add Address'}
              </h1>
            </div>

            <button
              aria-label="More options"
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 hover:bg-surface active:scale-95"
              type="button"
            >
              <SymbolIcon className="text-on-surface" name="more_vert" />
            </button>
          </div>
        </header>

        <form
          className="mx-auto max-w-2xl space-y-8 px-6 pb-32 pt-20"
          onSubmit={handleSubmit}
        >
          <section className="space-y-2">
            <div className="relative flex items-center">
              <SymbolIcon className="absolute left-4 text-outline" name="search" />
              <input
                className="w-full rounded-xl border-none bg-surface-container-lowest py-4 pl-12 pr-4 font-body text-on-surface shadow-sm transition-all focus:ring-2 focus:ring-primary-container"
                placeholder="Search for your building or street"
                type="text"
                value={values.search}
                onChange={updateField('search')}
              />
            </div>
          </section>

          <section className="group relative h-48 w-full overflow-hidden rounded-xl shadow-md">
            <div className="absolute inset-0 bg-surface-container-high">
              <img
                alt={MAP_PREVIEW.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                src={MAP_PREVIEW.image}
              />
            </div>

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-surface-container-lowest bg-primary text-on-primary shadow-2xl">
                <SymbolIcon className="text-xl" filled name="location_on" />
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl bg-surface-container-lowest/90 p-3 backdrop-blur-md">
              <SymbolIcon className="text-primary" name="my_location" />
              <div className="overflow-hidden">
                <p className="truncate text-xs font-bold">Current Selection</p>
                <p className="truncate text-[10px] text-on-surface-variant">
                  {MAP_PREVIEW.district}
                </p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label
                className="px-1 font-headline text-xs font-bold text-on-surface-variant"
                htmlFor="delivery-address-apartment"
              >
                APARTMENT / SUITE
              </label>
              <input
                className="w-full rounded-xl border-none bg-surface-container-low px-4 py-3 text-on-surface transition-all focus:ring-2 focus:ring-primary-container"
                id="delivery-address-apartment"
                placeholder="Unit 4B"
                type="text"
                value={values.apartment}
                onChange={updateField('apartment')}
              />
            </div>

            <div className="space-y-2">
              <label
                className="px-1 font-headline text-xs font-bold text-on-surface-variant"
                htmlFor="delivery-address-floor"
              >
                FLOOR / INTERCOM
              </label>
              <input
                className="w-full rounded-xl border-none bg-surface-container-low px-4 py-3 text-on-surface transition-all focus:ring-2 focus:ring-primary-container"
                id="delivery-address-floor"
                placeholder="Floor 2, Code 1234"
                type="text"
                value={values.floor}
                onChange={updateField('floor')}
              />
            </div>
          </div>

          <section className="space-y-2">
            <label
              className="px-1 font-headline text-xs font-bold text-on-surface-variant"
              htmlFor="delivery-address-notes"
            >
              DELIVERY NOTES FOR RIDER
            </label>
            <textarea
              className="w-full resize-none rounded-xl border-none bg-surface-container-low px-4 py-3 text-on-surface transition-all focus:ring-2 focus:ring-primary-container"
              id="delivery-address-notes"
              placeholder="e.g. Please leave at the gate or call upon arrival"
              rows="3"
              value={values.notes}
              onChange={updateField('notes')}
            />
          </section>

          <section className="space-y-4">
            <label className="px-1 font-headline text-xs font-bold text-on-surface-variant">
              LABEL AS
            </label>
            <div className="flex flex-wrap gap-3">
              {ADDRESS_LABELS.map((option) => {
                const isActive = option.id === selectedLabel;

                return (
                  <button
                    key={option.id}
                    aria-pressed={isActive}
                    className={[
                      'flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-all active:scale-95',
                      isActive
                        ? 'bg-gradient-to-br from-primary to-primary-container font-bold text-white shadow-lg'
                        : 'bg-surface-container-low font-medium text-on-surface-variant hover:bg-surface-container-high',
                    ].join(' ')}
                    type="button"
                    onClick={() => setSelectedLabel(option.id)}
                  >
                    <SymbolIcon
                      className="text-sm"
                      filled={isActive && option.filled}
                      name={option.icon}
                    />
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="flex items-center justify-between rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container/10">
                <SymbolIcon className="text-primary" name="check_circle" />
              </div>
              <div>
                <h2 className="font-headline text-sm font-bold">Set as Default</h2>
                <p className="text-[10px] text-on-surface-variant">
                  Use this for all future orders
                </p>
              </div>
            </div>

            <label className="relative inline-flex cursor-pointer items-center">
              <input
                checked={isDefault}
                className="peer sr-only"
                type="checkbox"
                onChange={(event) => setIsDefault(event.target.checked)}
              />
              <div className="h-6 w-11 rounded-full bg-surface-container-high transition-colors after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white" />
            </label>
          </section>

          <section className="px-1 pb-8 pt-4 text-center">
            <button
              className="font-headline text-sm font-bold text-error transition-all hover:underline"
              type="button"
            >
              Delete Address
            </button>
          </section>

          <div className="pointer-events-none fixed bottom-0 left-0 right-0 bg-gradient-to-t from-surface via-surface to-transparent p-6">
            <div className="pointer-events-auto mx-auto max-w-2xl">
              <button
                className="w-full rounded-full bg-gradient-to-r from-primary to-primary-container py-4 font-headline text-lg font-bold text-white shadow-[0_8px_24px_rgba(172,44,0,0.3)] transition-all hover:brightness-110 active:scale-[0.98]"
                type="submit"
              >
                Save Address
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
