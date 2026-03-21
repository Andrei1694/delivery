import { useState } from 'react';
import { Link, useNavigate, useParams } from '@tanstack/react-router';
import BottomNav from '../components/BottomNav';
import PageHeader from '../components/PageHeader';
import SymbolIcon from '../components/SymbolIcon';
import Toast from '../components/Toast';
import { useToast } from '../components/useToast';
import { getRestaurantById, getRestaurantMenuById } from '../mocks';
import { NAV_ITEMS } from '../navigation/navItems';

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

export default function RestaurantMenu() {
  const navigate = useNavigate();
  const { restaurantId } = useParams({ from: '/restaurant-menu/$restaurantId' });
  const restaurant = getRestaurantById(restaurantId);
  const menu = getRestaurantMenuById(restaurantId);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const { visible, fading, show } = useToast(3000);

  if (!restaurant || !menu) {
    return <RestaurantNotFound onBack={() => navigate({ to: '/' })} />;
  }

  const activeSectionId = menu.sections.some((section) => section.id === selectedSectionId)
    ? selectedSectionId
    : menu.sections[0]?.id;

  function handleAddToCart(item) {
    const price = Number.parseFloat(item.price.replace('$', ''));
    setCartCount((count) => count + 1);
    setCartTotal((total) => total + price);
    show();
  }

  function handleSectionSelect(sectionId) {
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
        `}
      </style>

      <div
        className="restaurant-menu-page bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container"
        style={{ minHeight: 'max(884px, 100dvh)' }}
      >
        <PageHeader
          title="The Culinary Curator"
          onBack={() => window.history.back()}
          rightAction={
            <div className="relative">
              <Link
                aria-label="Shopping bag"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-lowest text-primary transition-opacity duration-200 hover:opacity-80 active:scale-95"
                to="/basket"
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
            <div className="flex items-center justify-between rounded-xxl bg-surface-container-low p-5">
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
              <div className="h-8 w-px bg-outline-variant/30" />
              <button className="flex items-center gap-1 text-sm font-bold text-primary" type="button">
                Details
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
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
                  <FeaturedMenuCard item={section.featuredItem} onAdd={handleAddToCart} />
                ) : null}

                {section.items.map((item) => (
                  <MenuCard key={item.name} item={item} onAdd={handleAddToCart} />
                ))}
              </div>
            ))}
          </section>
        </main>

        <BottomNav navItems={NAV_ITEMS} />

        <Toast visible={visible} fading={fading}>
          <Link
            className="flex w-full items-center justify-between rounded-xxl bg-inverse-surface px-8 py-4 text-on-primary shadow-[0_12px_40px_rgba(0,0,0,0.2)] transition-all active:scale-[0.98]"
            to="/basket"
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
      </div>
    </>
  );
}
