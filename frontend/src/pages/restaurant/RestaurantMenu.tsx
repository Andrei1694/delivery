import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from '@tanstack/react-router';
import BottomNav from '../../components/BottomNav';
import PageHeader from '../../components/PageHeader';
import SymbolIcon from '../../components/SymbolIcon';
import Toast from '../../components/Toast';
import { useToast } from '../../components/useToast';
import { getRestaurantById, getRestaurantMenuById } from '../../mocks';
import { NAV_ITEMS } from '../../navigation/navItems';
import { restaurantApi } from '../../requests';
import {
  mapApiRestaurantToMenuRestaurant,
  parseRestaurantRouteId,
  type RestaurantMenuRestaurantModel,
} from '../../restaurantData';

type DrawerSelection = {
  item: any;
  sectionLabel: string;
};

function parsePriceLabel(priceLabel) {
  return Number.parseFloat(priceLabel.replace(/[^0-9.]/g, '')) || 0;
}

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function buildItemHighlightTags(item, sectionLabel, restaurant) {
  const lookup = `${restaurant.cuisine} ${sectionLabel} ${item.name} ${item.description}`.toLowerCase();
  const tags = [sectionLabel];

  if (
    /(vegetarian|veggie|eggplant|aubergine|lentil|hummus|mushroom|truffle|salad|spinach|paneer|tofu|edamame|burrata|caprese|ricotta|feta|mozzarella)/.test(
      lookup,
    )
  ) {
    tags.push('Vegetarian');
  } else if (
    /(sea bass|prawn|shrimp|fish|tuna|salmon|seafood|octopus|clam|crab|lobster)/.test(
      lookup,
    )
  ) {
    tags.push('Seafood');
  } else if (
    /(chicken|lamb|beef|pork|wagyu|salami|pepperoni|burger|meatball|guanciale|bacon|short ribs)/.test(
      lookup,
    )
  ) {
    tags.push('Chef Protein');
  } else {
    tags.push('Fresh Today');
  }

  if (
    /(yogurt|feta|halloumi|cheese|mascarpone|cream|bechamel|gelato|burrata|mozzarella|ricotta|parmesan|pecorino|milkshake|ice cream)/.test(
      lookup,
    )
  ) {
    tags.push('Contains Dairy');
  }

  tags.push(item.alertIcon ? 'Limited Batch' : item.badgeLabel ?? restaurant.heroBadge?.label ?? 'House Favorite');

  return [...new Set(tags)].slice(0, 3);
}

function buildSizeOptions(item, sectionLabel, restaurant) {
  const lookup = `${restaurant.cuisine} ${sectionLabel} ${item.name} ${item.description}`.toLowerCase();
  const normalizedSection = sectionLabel.toLowerCase();

  if (/(pizza|wood-fired|margherita|salami|pepperoni|nduja|truffle pizza)/.test(lookup)) {
    return [
      { id: 'classic', label: '12 inch', priceDelta: 0, helper: 'Included' },
      { id: 'grande', label: '16 inch', priceDelta: 6 },
    ];
  }

  if (/(burger|smash|patty)/.test(lookup)) {
    return [
      { id: 'single-stack', label: 'Single Stack', priceDelta: 0, helper: 'Included' },
      { id: 'double-stack', label: 'Double Stack', priceDelta: 4.5 },
    ];
  }

  if (/(sushi|maki|roll|gyoza|tataki|japanese)/.test(lookup)) {
    return [
      { id: 'eight-piece', label: '8 Pieces', priceDelta: 0, helper: 'Included' },
      { id: 'twelve-piece', label: '12 Pieces', priceDelta: 6 },
    ];
  }

  if (/(dessert|sweet|cake|gelato|sundae|mochi|milkshake|tiramisu|baklava|panna cotta)/.test(lookup) || /(sweets|desserts|shakes)/.test(normalizedSection)) {
    return [
      { id: 'classic', label: 'Classic', priceDelta: 0, helper: 'Included' },
      { id: 'sharing', label: 'To Share', priceDelta: 3.5 },
    ];
  }

  if (/(small plates|mezze|starters|sides|appetizers|breads)/.test(normalizedSection)) {
    return [
      { id: 'standard', label: 'Standard', priceDelta: 0, helper: 'Included' },
      { id: 'sharing-plate', label: 'Sharing Plate', priceDelta: 5 },
    ];
  }

  return [
    { id: 'regular', label: 'Regular', priceDelta: 0, helper: 'Included' },
    { id: 'large', label: 'Large', priceDelta: 7 },
  ];
}

function buildExtraOptions(item, sectionLabel, restaurant) {
  const lookup = `${restaurant.cuisine} ${sectionLabel} ${item.name} ${item.description}`.toLowerCase();
  const cuisine = restaurant.cuisine.toLowerCase();

  if (/(pizza|wood-fired|margherita|salami|pepperoni|nduja|truffle pizza)/.test(lookup)) {
    return [
      { id: 'extra-mozzarella', label: 'Extra Mozzarella', priceDelta: 2 },
      { id: 'chili-honey', label: 'Chili Honey Drizzle', priceDelta: 2.5 },
      { id: 'truffle-oil', label: 'Truffle Oil', priceDelta: 3 },
    ];
  }

  if (/(burger|smash|patty)/.test(lookup)) {
    return [
      { id: 'smoked-bacon', label: 'Smoked Bacon', priceDelta: 3 },
      { id: 'extra-cheddar', label: 'Extra Cheddar', priceDelta: 2 },
      { id: 'house-pickles', label: 'House Pickles', priceDelta: 1.5 },
    ];
  }

  if (/(sushi|maki|roll|gyoza|tataki|japanese)/.test(lookup)) {
    return [
      { id: 'avocado', label: 'Avocado', priceDelta: 2 },
      { id: 'crispy-onion', label: 'Crispy Onion', priceDelta: 1.5 },
      { id: 'spicy-mayo', label: 'Spicy Mayo', priceDelta: 1.5 },
    ];
  }

  if (cuisine.includes('indian')) {
    return [
      { id: 'garlic-naan', label: 'Garlic Naan', priceDelta: 3 },
      { id: 'cooling-raita', label: 'Cooling Raita', priceDelta: 2 },
      { id: 'extra-basmati', label: 'Extra Basmati Rice', priceDelta: 3.5 },
    ];
  }

  if (cuisine.includes('korean')) {
    return [
      { id: 'fried-egg', label: 'Fried Egg', priceDelta: 2 },
      { id: 'extra-kimchi', label: 'Extra Kimchi', priceDelta: 2 },
      { id: 'gochujang', label: 'Gochujang Drizzle', priceDelta: 1.5 },
    ];
  }

  if (/(dessert|sweet|cake|gelato|sundae|mochi|milkshake|tiramisu|baklava|panna cotta)/.test(lookup) || /(sweets|desserts|shakes)/.test(sectionLabel.toLowerCase())) {
    return [
      { id: 'vanilla-cream', label: 'Vanilla Cream', priceDelta: 2 },
      { id: 'berry-compote', label: 'Berry Compote', priceDelta: 1.5 },
      { id: 'pistachio-crumble', label: 'Pistachio Crumble', priceDelta: 2.5 },
    ];
  }

  if (cuisine.includes('mediterranean') || cuisine.includes('greek')) {
    return [
      { id: 'warm-pita', label: 'Warm Pita', priceDelta: 2 },
      { id: 'chili-oil', label: 'Chili Oil', priceDelta: 1.5 },
      { id: 'herb-salad', label: 'Herb Salad', priceDelta: 4 },
    ];
  }

  if (cuisine.includes('italian')) {
    return [
      { id: 'extra-parmesan', label: 'Extra Parmesan', priceDelta: 2 },
      { id: 'basil-oil', label: 'Basil Oil', priceDelta: 1.5 },
      { id: 'roasted-mushrooms', label: 'Roasted Mushrooms', priceDelta: 4 },
    ];
  }

  return [
    { id: 'extra-sauce', label: 'Extra Sauce', priceDelta: 2 },
    { id: 'house-slaw', label: 'House Slaw', priceDelta: 3 },
    { id: 'roasted-veg', label: 'Roasted Vegetables', priceDelta: 4 },
  ];
}

function buildDrawerConfig(item, sectionLabel, restaurant) {
  return {
    highlightTags: buildItemHighlightTags(item, sectionLabel, restaurant),
    sizeOptions: buildSizeOptions(item, sectionLabel, restaurant),
    extraOptions: buildExtraOptions(item, sectionLabel, restaurant),
  };
}

function MenuCard({ item, onAdd }) {
  return (
    <div className="group relative flex gap-4 rounded-xxl bg-surface-container-lowest p-4 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(172,44,0,0.08)]">
      <div className="flex-1">
        <div className="mb-1 flex items-center gap-2">
          <h3 className="font-headline text-lg font-bold text-on-surface">{item.name}</h3>
          {item.alertIcon ? (
            <span
              className="material-symbols-outlined text-sm text-tertiary"
              title="Limited quantity"
            >
              priority_high
            </span>
          ) : null}
        </div>
        <p className="mb-3 line-clamp-2 text-xs font-medium leading-relaxed text-on-surface-variant">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-headline text-lg font-extrabold text-on-surface">
            {item.price}
          </span>
          <button
            className="rounded-full bg-gradient-to-br from-primary to-primary-container px-5 py-2 text-sm font-bold text-on-primary shadow-lg shadow-primary/20 transition-transform active:scale-95"
            type="button"
            onClick={() => onAdd(item)}
          >
            Add
          </button>
        </div>
      </div>
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surface-container-low">
        <img
          alt={item.imageAlt ?? item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={item.image}
          title={item.imageAlt}
        />
      </div>
    </div>
  );
}

function FeaturedMenuCard({ item, onAdd }) {
  return (
    <div className="relative overflow-hidden rounded-xxl bg-surface-container-lowest transition-all duration-300 hover:shadow-[0_8px_32px_rgba(172,44,0,0.08)]">
      <div className="h-48 w-full overflow-hidden">
        <img
          alt={item.imageAlt ?? item.name}
          className="h-full w-full object-cover"
          src={item.image}
          title={item.imageAlt}
        />
      </div>
      <div className="p-6">
        <div className="mb-2 flex items-start justify-between">
          <div>
            {item.badgeLabel ? (
              <span className="mb-2 inline-block rounded bg-tertiary-container px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-on-tertiary-container">
                {item.badgeLabel}
              </span>
            ) : null}
            <h3 className="font-headline text-xl font-bold text-on-surface">
              {item.name}
            </h3>
          </div>
          <span className="font-headline text-xl font-extrabold text-on-surface">
            {item.price}
          </span>
        </div>
        <p className="mb-4 text-sm font-medium leading-relaxed text-on-surface-variant">
          {item.description}
        </p>
        <button
          className="w-full rounded-full bg-gradient-to-r from-primary to-primary-container py-3 font-bold text-on-primary shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
          type="button"
          onClick={() => onAdd(item)}
        >
          Add to Order
        </button>
      </div>
    </div>
  );
}

function DrawerOptionRow({ option, type, name, checked, onChange }) {
  return (
    <label
      className={`flex cursor-pointer items-center justify-between rounded-[1.35rem] border p-4 transition-colors ${
        checked
          ? 'border-primary/15 bg-surface-bright'
          : 'border-transparent bg-surface-container-lowest hover:border-primary/10 hover:bg-surface-bright'
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          checked={checked}
          className={`h-5 w-5 border-outline-variant/30 bg-surface text-primary focus:ring-primary focus:ring-offset-surface-container-lowest ${
            type === 'checkbox' ? 'rounded' : ''
          }`}
          name={name}
          type={type}
          onChange={onChange}
        />
        <span className="text-base font-semibold text-on-surface">{option.label}</span>
      </div>
      <span className="text-sm font-medium text-on-surface-variant">
        {option.helper ?? (option.priceDelta > 0 ? `+${formatPrice(option.priceDelta)}` : 'Included')}
      </span>
    </label>
  );
}

function MenuItemDrawer({ restaurant, selection, onClose, onConfirm }) {
  const { item, sectionLabel } = selection;
  const { highlightTags, sizeOptions, extraOptions } = buildDrawerConfig(
    item,
    sectionLabel,
    restaurant,
  );
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(sizeOptions[0]?.id ?? null);
  const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const selectedSize = sizeOptions.find((option) => option.id === selectedSizeId) ?? sizeOptions[0];
  const extraTotal = extraOptions.reduce(
    (total, option) => total + (selectedExtraIds.includes(option.id) ? option.priceDelta : 0),
    0,
  );
  const unitPrice = parsePriceLabel(item.price) + (selectedSize?.priceDelta ?? 0) + extraTotal;
  const orderTotal = unitPrice * quantity;

  function handleToggleExtra(optionId: string) {
    setSelectedExtraIds((current) =>
      current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId],
    );
  }

  function handleConfirm() {
    onConfirm({ quantity, totalPrice: orderTotal });
  }

  return (
    <div className="fixed inset-0 z-[90]">
      <button
        aria-label={`Close ${item.name} details`}
        className="animate-item-drawer-overlay absolute inset-0 bg-inverse-surface/40 backdrop-blur-[2px]"
        type="button"
        onClick={onClose}
      />

      <div
        aria-labelledby="menu-item-drawer-title"
        aria-modal="true"
        className="animate-item-drawer-enter absolute bottom-0 left-0 right-0 z-10 mx-auto flex h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-[32px] bg-surface shadow-[0_-8px_40px_rgba(0,0,0,0.15)]"
        role="dialog"
      >
        <div className="sticky top-0 z-20 flex flex-col items-center bg-surface pb-2 pt-3">
          <div className="h-1.5 w-12 rounded-full bg-outline/20" />
          <div className=" -mt-2 flex w-full justify-end px-4">
            <button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container transition-colors hover:bg-surface-container-high"
              type="button"
              onClick={onClose}
            >
              <span className="material-symbols-outlined text-xl text-on-surface">close</span>
            </button>
          </div>
        </div>

        <div className="drawer-content-scroll flex-1 overflow-y-auto">
          <div className="px-4">
            <div className="h-[280px] w-full overflow-hidden rounded-[1.75rem] shadow-sm">
              <img
                alt={item.imageAlt ?? item.name}
                className="h-full w-full object-cover"
                src={item.image}
                title={item.imageAlt}
              />
            </div>
          </div>

          <div className="px-6 pb-6 pt-6">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.28em] text-primary-dim">
                  {sectionLabel}
                </p>
                <h2
                  id="menu-item-drawer-title"
                  className="font-headline text-3xl font-bold leading-tight tracking-tight text-on-surface"
                >
                  {item.name}
                </h2>
              </div>
              <span className="mt-1 font-headline text-xl font-bold text-on-surface">
                {item.price}
              </span>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              {highlightTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-outline-variant/15 bg-surface-container-low px-3 py-1 text-[13px] font-semibold text-on-surface"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-base font-normal leading-relaxed text-on-surface-variant">
              {item.description}
            </p>
          </div>

          <div className="mx-2 space-y-8 rounded-t-[1.75rem] bg-surface-container-low px-4 py-6 shadow-[0_-4px_16px_rgba(78,33,33,0.04)]">
            <section>
              <div className="mb-4 flex items-center justify-between px-2">
                <h3 className="font-headline text-lg font-bold text-on-surface">Choose Size</h3>
                <span className="rounded bg-primary-container/20 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary">
                  Required
                </span>
              </div>
              <div className="space-y-3">
                {sizeOptions.map((option) => (
                  <DrawerOptionRow
                    key={option.id}
                    checked={selectedSize?.id === option.id}
                    name="menu-item-size"
                    option={option}
                    type="radio"
                    onChange={() => setSelectedSizeId(option.id)}
                  />
                ))}
              </div>
            </section>

            <section className="pb-12">
              <div className="mb-4 flex items-center justify-between px-2">
                <h3 className="font-headline text-lg font-bold text-on-surface">Extras</h3>
                <span className="text-sm font-medium text-on-surface-variant">Optional</span>
              </div>
              <div className="space-y-3">
                {extraOptions.map((option) => (
                  <DrawerOptionRow
                    key={option.id}
                    checked={selectedExtraIds.includes(option.id)}
                    name={`menu-item-extra-${option.id}`}
                    option={option}
                    type="checkbox"
                    onChange={() => handleToggleExtra(option.id)}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="z-30 border-t border-outline-variant/15 bg-surface p-4 pb-8">
          <div className="mx-auto flex max-w-3xl items-center gap-3">
            <div className="flex min-w-[110px] items-center justify-between rounded-full bg-surface-container-low px-3 py-2.5">
              <button
                className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                  quantity === 1
                    ? 'cursor-not-allowed text-on-surface-variant/40'
                    : 'text-on-surface hover:text-primary'
                }`}
                disabled={quantity === 1}
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              >
                <span className="material-symbols-outlined text-lg">remove</span>
              </button>
              <span className="w-6 text-center font-headline text-base font-bold text-on-surface">
                {quantity}
              </span>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface transition-colors hover:text-primary"
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
              >
                <span className="material-symbols-outlined text-lg">add</span>
              </button>
            </div>

            <button
              className="flex flex-1 items-center justify-between rounded-full bg-gradient-to-br from-primary to-primary-dim px-6 py-3.5 font-body text-base font-bold text-on-primary shadow-lg transition-all hover:shadow-xl active:scale-[0.99]"
              type="button"
              onClick={handleConfirm}
            >
              <span>Add to Order</span>
              <span>{formatPrice(orderTotal)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RestaurantNotFound({ onBack }) {
  return (
    <>
      <style>
        {`
          .restaurant-menu-page .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      <div
        className="restaurant-menu-page bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container"
        style={{ minHeight: 'max(884px, 100dvh)' }}
      >
        <PageHeader title="Restaurant Menu" onBack={onBack} />
        <main className="mx-auto flex max-w-lg flex-col items-center px-6 pb-16 pt-28 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-low text-primary">
            <SymbolIcon name="storefront" className="text-3xl" />
          </div>
          <h2 className="font-headline text-2xl font-bold text-on-surface">
            Menu not found
          </h2>
          <p className="mt-3 max-w-sm text-sm font-medium leading-relaxed text-on-surface-variant">
            The restaurant link is invalid or the mock menu has not been created yet.
          </p>
          <Link
            to="/"
            className="mt-8 rounded-full bg-primary px-6 py-3 font-bold text-on-primary shadow-lg shadow-primary/20 transition-transform active:scale-95"
          >
            Return to Explore
          </Link>
        </main>
      </div>
    </>
  );
}

function RestaurantMenuLoading({ onBack }: { onBack: () => void }) {
  return (
    <>
      <style>
        {`
          .restaurant-menu-page .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      <div
        className="restaurant-menu-page bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container"
        style={{ minHeight: 'max(884px, 100dvh)' }}
      >
        <PageHeader title="Restaurant Menu" onBack={onBack} />
        <main className="mx-auto max-w-lg px-6 pb-16 pt-28">
          <div className="mb-6 h-[320px] animate-pulse rounded-[2rem] bg-surface-container-low" />
          <div className="space-y-4 rounded-[2rem] bg-surface-container-lowest p-6 shadow-sm shadow-on-surface/5">
            <div className="h-8 w-2/3 animate-pulse rounded-full bg-surface-container" />
            <div className="h-4 w-1/2 animate-pulse rounded-full bg-surface-container" />
            <div className="h-24 animate-pulse rounded-[1.5rem] bg-surface-container" />
          </div>
        </main>
      </div>
    </>
  );
}

function RestaurantMenuUnavailable({
  restaurant,
  onBack,
}: {
  restaurant: RestaurantMenuRestaurantModel;
  onBack: () => void;
}) {
  return (
    <>
      <style>
        {`
          .restaurant-menu-page .no-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .restaurant-menu-page .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      <div
        className="restaurant-menu-page bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container"
        style={{ minHeight: 'max(884px, 100dvh)' }}
      >
        <PageHeader title={restaurant.name} onBack={onBack} />

        <main className="mx-auto max-w-lg pb-32">
          <header className="relative h-[320px] w-full overflow-hidden">
            <img
              alt={restaurant.heroImageAlt}
              className="h-full w-full scale-105 object-cover"
              src={restaurant.heroImage}
              title={restaurant.heroImageTitle}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-6">
              {restaurant.heroBadge ? (
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-tertiary-container/90 px-3 py-1 backdrop-blur-md">
                  <span
                    className="material-symbols-outlined text-[16px] text-on-tertiary-container"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {restaurant.heroBadge.icon}
                  </span>
                  <span className="text-xs font-bold tracking-wide text-on-tertiary-container">
                    {restaurant.heroBadge.label.toUpperCase()}
                  </span>
                </div>
              ) : null}
              <h1 className="mb-2 font-headline text-4xl font-extrabold leading-tight tracking-tight text-on-surface">
                {restaurant.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  {restaurant.deliveryTime}
                </span>
                <span className="flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-[18px] text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  {restaurant.rating} ({restaurant.ratingCountLabel})
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">payments</span>
                  {restaurant.deliveryFeeLabel}
                </span>
              </div>
            </div>
          </header>

          <section className="px-6 py-6">
            <div className="rounded-xxl bg-surface-container-low p-6 shadow-sm shadow-on-surface/5">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-primary-dim">
                Backend Restaurant
              </p>
              <h2 className="font-headline text-2xl font-bold text-on-surface">
                Menu items are not available yet
              </h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-on-surface-variant">
                The restaurant details are loading from the backend successfully,
                but menu sections are still mock-only until a menu API is added.
              </p>
            </div>
          </section>

          <section className="space-y-4 px-6">
            <div className="rounded-xxl bg-surface-container-lowest p-5 shadow-sm shadow-on-surface/5">
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-on-surface-variant">
                <span>{restaurant.cuisine}</span>
                <span className="h-1 w-1 rounded-full bg-outline-variant" />
                <span>{restaurant.safetyLabel}</span>
              </div>
              <p className="text-sm font-medium leading-relaxed text-on-surface-variant">
                {restaurant.about}
              </p>
            </div>

            <div className="rounded-xxl bg-surface-container-lowest p-5 shadow-sm shadow-on-surface/5">
              <h3 className="mb-3 font-headline text-lg font-bold text-on-surface">
                Details
              </h3>
              <div className="space-y-3 text-sm font-medium text-on-surface-variant">
                <p>{restaurant.address}</p>
                <p>{restaurant.hours}</p>
              </div>
            </div>

            {restaurant.gallery.length > 0 ? (
              <div className="rounded-xxl bg-surface-container-lowest p-5 shadow-sm shadow-on-surface/5">
                <h3 className="mb-3 font-headline text-lg font-bold text-on-surface">
                  Photos
                </h3>
                <div className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1">
                  {restaurant.gallery.map((image, index) => (
                    <div
                      key={image}
                      className="h-32 w-48 shrink-0 snap-center overflow-hidden rounded-xl"
                    >
                      <img
                        src={image}
                        alt={`${restaurant.name} photo ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {restaurant.reviews.length > 0 ? (
              <div className="rounded-xxl bg-surface-container-lowest p-5 shadow-sm shadow-on-surface/5">
                <h3 className="mb-3 font-headline text-lg font-bold text-on-surface">
                  Reviews
                </h3>
                <div className="space-y-3">
                  {restaurant.reviews.slice(0, 3).map((review) => (
                    <div
                      key={review.id}
                      className="rounded-xl border border-outline-variant/20 bg-surface p-4"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-bold text-on-surface">
                          {review.author}
                        </span>
                        <span className="text-xs font-medium text-on-surface-variant">
                          {review.date}
                        </span>
                      </div>
                      <div className="mb-2 flex items-center gap-0.5">
                        {[...Array(5)].map((_, index) => (
                          <span
                            key={index}
                            className={`material-symbols-outlined text-[16px] ${index < review.rating ? 'text-primary' : 'text-outline-variant/50'}`}
                            style={{
                              fontVariationSettings:
                                index < review.rating ? "'FILL' 1" : "'FILL' 0",
                            }}
                          >
                            star
                          </span>
                        ))}
                      </div>
                      <p className="text-sm font-medium text-on-surface-variant">
                        &quot;{review.text}&quot;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <Link
              to="/"
              className="flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 font-bold text-on-primary shadow-lg shadow-primary/20 transition-transform active:scale-95"
            >
              Return to Explore
            </Link>
          </section>
        </main>

        <BottomNav navItems={NAV_ITEMS} />
      </div>
    </>
  );
}

export default function RestaurantMenu() {
  const navigate = useNavigate();
  const { restaurantId } = useParams({ from: '/restaurant-menu/$restaurantId' });
  const restaurantTarget = parseRestaurantRouteId(restaurantId);
  const isApiRestaurant = restaurantTarget.source === 'api';
  const apiRestaurantId =
    restaurantTarget.source === 'api' ? restaurantTarget.id : null;
  const mockRestaurantId =
    restaurantTarget.source === 'mock' ? restaurantTarget.id : null;
  const { data: restaurantData, isPending, isError } = useQuery({
    queryKey: ['restaurants', 'detail', restaurantId],
    queryFn: () => {
      if (apiRestaurantId === null) {
        throw new Error('Missing API restaurant id');
      }

      return restaurantApi
        .getById(apiRestaurantId)
        .then((response) => response.data);
    },
    enabled: apiRestaurantId !== null,
    staleTime: 60_000,
  });
  const restaurant = apiRestaurantId !== null
    ? restaurantData
      ? mapApiRestaurantToMenuRestaurant(restaurantData)
      : null
    : getRestaurantById(mockRestaurantId ?? undefined);
  const menu =
    mockRestaurantId === null ? null : getRestaurantMenuById(mockRestaurantId);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [drawerSelection, setDrawerSelection] = useState<DrawerSelection | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { visible, fading, show } = useToast(3000);

  if (isApiRestaurant && isPending) {
    return <RestaurantMenuLoading onBack={() => navigate({ to: '/' })} />;
  }

  if (isApiRestaurant && isError) {
    return <RestaurantNotFound onBack={() => navigate({ to: '/' })} />;
  }

  if (!restaurant) {
    return <RestaurantNotFound onBack={() => navigate({ to: '/' })} />;
  }

  if (!menu) {
    if (isApiRestaurant) {
      return (
        <RestaurantMenuUnavailable
          restaurant={restaurant}
          onBack={() => navigate({ to: '/' })}
        />
      );
    }

    return <RestaurantNotFound onBack={() => navigate({ to: '/' })} />;
  }

  const activeSectionId = menu.sections.some((section) => section.id === selectedSectionId)
    ? selectedSectionId
    : menu.sections[0]?.id;

  function handleAddToCart(item: any, sectionLabel: string) {
    setDrawerSelection({ item, sectionLabel });
  }

  function handleConfirmAddToCart({ quantity, totalPrice }) {
    setCartCount((count) => count + quantity);
    setCartTotal((total) => total + totalPrice);
    setDrawerSelection(null);
    show();
  }

  function handleSectionSelect(sectionId: string) {
    setSelectedSectionId(sectionId);

    if (typeof document !== 'undefined') {
      document.getElementById(`menu-section-${sectionId}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  return (
    <>
      <style>
        {`
          .restaurant-menu-page .no-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .restaurant-menu-page .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .restaurant-menu-page .line-clamp-2 {
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }

          .restaurant-menu-page .drawer-content-scroll {
            max-height: calc(92dvh - 112px);
          }

          @keyframes item-drawer-enter {
            from {
              transform: translateY(100%);
            }

            to {
              transform: translateY(0);
            }
          }

          @keyframes item-drawer-overlay {
            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }
          }

          .restaurant-menu-page .animate-item-drawer-enter {
            animation: item-drawer-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .restaurant-menu-page .animate-item-drawer-overlay {
            animation: item-drawer-overlay 0.24s ease-out;
          }
        `}
      </style>

      <div
        className="restaurant-menu-page bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container"
        style={{ minHeight: 'max(884px, 100dvh)' }}
      >
        <PageHeader
          title={restaurant.name}
          onBack={() => window.history.back()}
          rightAction={
            <div className="relative">
              <Link
                aria-label="Shopping bag"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-lowest text-primary transition-opacity duration-200 hover:opacity-80 active:scale-95"
                to="/cart"
              >
                <span className="material-symbols-outlined">shopping_bag</span>
              </Link>
              {cartCount > 0 ? (
                <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-surface bg-primary text-[10px] text-on-primary">
                  {cartCount}
                </span>
              ) : null}
            </div>
          }
        />

        <main className="mx-auto max-w-lg pb-32">
          <header className="relative h-[400px] w-full overflow-hidden">
            <img
              alt={restaurant.heroImageAlt}
              className="h-full w-full scale-105 object-cover"
              src={restaurant.heroImage}
              title={restaurant.heroImageTitle}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-6">
              {restaurant.heroBadge ? (
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-tertiary-container/90 px-3 py-1 backdrop-blur-md">
                  <span
                    className="material-symbols-outlined text-[16px] text-on-tertiary-container"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {restaurant.heroBadge.icon}
                  </span>
                  <span className="text-xs font-bold tracking-wide text-on-tertiary-container">
                    {restaurant.heroBadge.label.toUpperCase()}
                  </span>
                </div>
              ) : null}
              <h1 className="mb-2 font-headline text-4xl font-extrabold leading-tight tracking-tight text-on-surface">
                {restaurant.name}
              </h1>
              <div className="flex items-center gap-4 text-sm font-medium text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  {restaurant.deliveryTime}
                </span>
                <span className="flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-[18px] text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  {restaurant.rating} ({restaurant.ratingCountLabel})
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">payments</span>
                  {restaurant.deliveryFeeLabel}
                </span>
              </div>
            </div>
          </header>

          <section className="px-6 py-4">
            <div className="flex flex-col overflow-hidden rounded-xxl bg-surface-container-low transition-colors">
              <div
                className="flex items-center justify-between p-5 cursor-pointer active:bg-surface-container-highest transition-colors"
                onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsDetailsOpen(!isDetailsOpen);
                  }
                }}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary-dim">
                      Cuisine
                    </p>
                    <p className="text-sm font-semibold">{restaurant.cuisine}</p>
                  </div>
                  <div className="h-8 w-px bg-outline-variant/30" />
                  <div>
                    <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary-dim">
                      Safety
                    </p>
                    <p className="text-sm font-semibold">{restaurant.safetyLabel}</p>
                  </div>
                </div>
                <button
                  className="flex h-10 items-center justify-center gap-1 rounded-full px-2 text-sm font-bold text-primary transition-colors hover:bg-primary/10 active:bg-primary/20"
                  type="button"
                  aria-expanded={isDetailsOpen}
                >
                  Details
                  <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${isDetailsOpen ? 'rotate-90' : ''}`}>
                    chevron_right
                  </span>
                </button>
              </div>

              {/* Expandable About Section */}
              <div
                className="grid transition-all duration-300 ease-in-out"
                style={{ gridTemplateRows: isDetailsOpen ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-outline-variant/20 px-5 pb-5 pt-4">
                    {/* About */}
                    <div className="mb-6">
                      <h3 className="mb-2 font-headline text-lg font-bold text-on-surface">About</h3>
                      <p className="text-sm font-medium leading-relaxed text-on-surface-variant">
                        {restaurant.about}
                      </p>
                    </div>

                    {/* Info */}
                    <div className="mb-6 flex flex-col gap-3">
                      <div className="flex items-start gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <span className="material-symbols-outlined text-[18px]">location_on</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-surface">Address</p>
                          <p className="text-sm font-medium text-on-surface-variant">{restaurant.address}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <span className="material-symbols-outlined text-[18px]">schedule</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-surface">Operating Hours</p>
                          <p className="text-sm font-medium text-on-surface-variant">{restaurant.hours}</p>
                        </div>
                      </div>
                    </div>

                    {/* Photos Gallery */}
                    {restaurant.gallery?.length > 0 && (
                      <div className="mb-6">
                        <h3 className="mb-3 font-headline text-lg font-bold text-on-surface">Photos</h3>
                        <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
                          {restaurant.gallery.map((img, i) => (
                            <div key={i} className="h-32 w-48 shrink-0 snap-center overflow-hidden rounded-xl">
                              <img src={img} alt={`${restaurant.name} photo ${i + 1}`} className="h-full w-full object-cover" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Reviews */}
                    {restaurant.reviews?.length > 0 && (
                      <div>
                        <div className="mb-3 flex items-end justify-between">
                          <h3 className="font-headline text-lg font-bold text-on-surface">Reviews</h3>
                          <span className="text-xs font-bold text-primary">{restaurant.ratingCountLabel} Total</span>
                        </div>
                        <div className="flex flex-col gap-3">
                          {restaurant.reviews.map((review) => (
                            <div key={review.id} className="rounded-xl border border-outline-variant/20 bg-surface p-4 text-left">
                              <div className="mb-2 flex items-center justify-between">
                                <span className="font-bold text-on-surface">{review.author}</span>
                                <span className="text-xs font-medium text-on-surface-variant">{review.date}</span>
                              </div>
                              <div className="mb-2 flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className={`material-symbols-outlined text-[16px] ${i < review.rating ? 'text-primary' : 'text-outline-variant/50'}`} style={{ fontVariationSettings: i < review.rating ? "'FILL' 1" : "'FILL' 0" }}>
                                    star
                                  </span>
                                ))}
                              </div>
                              <p className="text-sm font-medium text-on-surface-variant">"{review.text}"</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <nav className="sticky top-[72px] z-40 border-b border-outline-variant/10 bg-surface/80 backdrop-blur-xl">
            <div className="no-scrollbar flex items-center gap-8 overflow-x-auto px-6 py-4">
              {menu.sections.map((section) => (
                <button
                  key={section.id}
                  className={
                    activeSectionId === section.id
                      ? 'relative whitespace-nowrap text-sm font-bold text-primary'
                      : 'whitespace-nowrap text-sm font-semibold text-on-surface-variant/60'
                  }
                  type="button"
                  onClick={() => handleSectionSelect(section.id)}
                >
                  {section.label}
                  {activeSectionId === section.id ? (
                    <span className="absolute -bottom-4 left-0 h-1 w-full rounded-t-full bg-primary" />
                  ) : null}
                </button>
              ))}
            </div>
          </nav>

          <section className="mt-6 space-y-8 px-6">
            {menu.sections.map((section) => (
              <div
                key={section.id}
                id={`menu-section-${section.id}`}
                className="scroll-mt-32 space-y-6"
              >
                <h2 className="font-headline text-2xl font-bold">{section.label}</h2>

                {section.featuredItem ? (
                  <FeaturedMenuCard
                    item={section.featuredItem}
                    onAdd={(item) => handleAddToCart(item, section.label)}
                  />
                ) : null}

                {section.items.map((item) => (
                  <MenuCard
                    key={item.name}
                    item={item}
                    onAdd={(selectedItem) => handleAddToCart(selectedItem, section.label)}
                  />
                ))}
              </div>
            ))}
          </section>
        </main>

        <BottomNav navItems={NAV_ITEMS} />

        <Toast visible={visible} fading={fading}>
          <Link
            className="flex w-full items-center justify-between rounded-xxl bg-inverse-surface px-8 py-4 text-on-primary shadow-[0_12px_40px_rgba(0,0,0,0.2)] transition-all active:scale-[0.98]"
            to="/cart"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold">
                {cartCount}
              </div>
              <span className="font-bold tracking-tight">View Your Order</span>
            </div>
            <span className="text-lg font-extrabold">${cartTotal.toFixed(2)}</span>
          </Link>
        </Toast>

        {drawerSelection ? (
          <MenuItemDrawer
            key={`${drawerSelection.sectionLabel}-${drawerSelection.item.name}`}
            restaurant={restaurant}
            selection={drawerSelection}
            onClose={() => setDrawerSelection(null)}
            onConfirm={handleConfirmAddToCart}
          />
        ) : null}
      </div>
    </>
  );
}
