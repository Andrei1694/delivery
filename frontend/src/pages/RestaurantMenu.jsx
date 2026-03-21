import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import BottomNav from '../components/BottomNav';
import { NAV_ITEMS } from '../navigation/navItems';
import PageHeader from '../components/PageHeader';
import Toast from '../components/Toast';
import { useToast } from '../components/useToast';

const categoryTabs = [
  { label: 'Appetizers', active: true },
  { label: 'Main Course' },
  { label: 'Signature Sides' },
  { label: 'Desserts' },
  { label: 'Drinks' },
];

const appetizerItems = [
  {
    name: 'Truffle Carpaccio',
    description:
      'Thinly sliced wagyu beef, black truffle oil, capers, and aged parmesan shavings.',
    price: '$24.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAxtIwUDrWA_eUeqKocz0fSX16tTAIytIN-Mq7r0_k2OGR7s-cq0NCW33p7zjNo6loYemmpjx7NEPQqTCtiDgaGTT-6hW3q6YHSf5fcnNotFXjdHqnFnrSgpeEBVd5t30clg_TkpiTbpr8mFJXt59scbqzb4RgHnKARd2k6_paTpRNCiG3suzl8EIlewKBMUt9O4thyU-M_T0nzjZYLRJZX0cot_kPaXvbNGc9zySpzZgJkBGtERdDOji3DBzGjYBAhDF7aIVOI6O4',
    imageAlt: 'Beautifully plated beef carpaccio with microgreens',
  },
  {
    name: 'Scallops au Poivre',
    description:
      'Pan-seared Hokkaido scallops with a peppercorn crust and lime foam.',
    price: '$28.50',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAKC12K85qCJiDwqTWfBpfpcCqGHuXd_NWqgVzCXKfprOiG4_QXsFfPgu_s4vU3hwiLGMas9QGNT2dsT7FErrk-KVXG122p7bYbNHCsV-B5DuMWwzQKBnuwD8O8959Fo3sCL9ZPK-tcrc1EKCFxW0cFFcL4uh4dFqnPDNn_OdQcwY60-SMSut51rrwoaw-f-jka8p4gCZ010C3ppzQ33bciF_KUomdb5GTXuDac5MbZeuyjVxZ-aJDoPlKw1HtZ6MKBU62jgfGxfOY',
    imageAlt: 'Gourmet seared scallops with vibrant sauce smears',
  },
];

const secondaryMainCourse = {
  name: 'Lobster Thermidor',
  description:
    'Fresh Atlantic lobster, creamy mustard brandy sauce, gratinated with Gruyere.',
  price: '$56.00',
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBq6SFGeiEAbbKJeOMJaxZTjZAi0TaP9dWvz_TBzU_r0u_P38PRWVu0ynpqQJiFmuritWpXXwbbMD6xSA4is2-cS4xyd6XZKa4aooB1bqAu3VJlhikqHVYqsRV8XxHI_x59RSwqYZNhhNwv8uSMppnO-nqlsut38nzWNUi0yQJFLp9pc9-MHIyhNNKNfGYclg6S9BkjUeW9Ani76ufhPBVKmpglHVx7X5q-LFPiaSNBcyFOTo9YsmxWO77vBijQElwvZ3Iu9d4b48I',
  imageAlt: 'Exquisitely prepared lobster thermidor on a silver platter',
};


function MenuCard({ item, alertIcon = false, onAdd }) {
  return (
    <div className="group relative flex gap-4 rounded-xxl bg-surface-container-lowest p-4 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(172,44,0,0.08)]">
      <div className="flex-1">
        <div className="mb-1 flex items-center gap-2">
          <h3 className="font-headline text-lg font-bold text-on-surface">{item.name}</h3>
          {alertIcon ? (
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
            onClick={() => onAdd?.(item)}
          >
            Add
          </button>
        </div>
      </div>
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-surface-container-low">
        <img
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={item.image}
          title={item.imageAlt}
        />
      </div>
    </div>
  );
}


export default function RestaurantMenu() {
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const { visible, fading, show } = useToast(3000);

  function handleAddToCart(item) {
    const price = parseFloat(item.price.replace('$', ''));
    setCartCount((c) => c + 1);
    setCartTotal((t) => t + price);
    show();
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
              <button
                aria-label="Shopping bag"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-lowest text-primary transition-opacity duration-200 hover:opacity-80 active:scale-95"
                type="button"
              >
                <span className="material-symbols-outlined">shopping_bag</span>
                <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full border-2 border-surface bg-primary text-[10px] text-on-primary">
                  2
                </span>
              </button>
            </div>
          }
        />

        <main className="mx-auto max-w-lg pb-32">
          <header className="relative h-[400px] w-full overflow-hidden">
            <img
              alt="High-end culinary photography"
              className="h-full w-full scale-105 object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSKAcwn7mMURkFt8Qr6wbP7rSvtRDpX3fstIkkL6a7ASGxtpqEDXnevAcm2x9syJKJkIES2TkBoC6AZfPaTbC5xwO-IuvsCbF4SmOFmTzHC9SQdR-lUleahnu0z6x4bi1YEE9xXFNYCfFS93RzfJ17APwFMEbs7HbQCbOOAm_78JHFf3Reujct8GnLC61iUuiA2tgTmMJ6PVOe_rgYQkZ0whv4WlZTHA5VxNDLxdomWIWmkGTMkRhWwb_GmTnp9W_8GXsZUCkTh5Y"
              title="Exquisite gourmet pasta dish with fresh herbs"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-6">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-tertiary-container/90 px-3 py-1 backdrop-blur-md">
                <span
                  className="material-symbols-outlined text-[16px] text-on-tertiary-container"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  stars
                </span>
                <span className="text-xs font-bold tracking-wide text-on-tertiary-container">
                  MICHELIN SELECTION
                </span>
              </div>
              <h1 className="mb-2 font-headline text-4xl font-extrabold leading-tight tracking-tight text-on-surface">
                L&apos;Artiste Bistro
              </h1>
              <div className="flex items-center gap-4 text-sm font-medium text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  25-35 min
                </span>
                <span className="flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-[18px] text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  4.9 (1.2k+)
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">payments</span>
                  Free Delivery
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
                <p className="text-sm font-semibold">Contemporary French</p>
              </div>
              <div className="h-8 w-px bg-outline-variant/30" />
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest text-primary-dim">
                  Safety
                </p>
                <p className="text-sm font-semibold">Bio-Certified</p>
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
              {categoryTabs.map((tab) => (
                <button
                  key={tab.label}
                  className={
                    tab.active
                      ? 'relative whitespace-nowrap text-sm font-bold text-primary'
                      : 'whitespace-nowrap text-sm font-semibold text-on-surface-variant/60'
                  }
                  type="button"
                >
                  {tab.label}
                  {tab.active ? (
                    <span className="absolute -bottom-4 left-0 h-1 w-full rounded-t-full bg-primary" />
                  ) : null}
                </button>
              ))}
            </div>
          </nav>

          <section className="mt-6 space-y-8 px-6">
            <h2 className="font-headline text-2xl font-bold">Appetizers</h2>

            {appetizerItems.map((item) => (
              <MenuCard key={item.name} item={item} onAdd={handleAddToCart} />
            ))}

            <h2 className="pt-4 font-headline text-2xl font-bold">Main Course</h2>

            <div className="relative overflow-hidden rounded-xxl bg-surface-container-lowest transition-all duration-300 hover:shadow-[0_8px_32px_rgba(172,44,0,0.08)]">
              <div className="h-48 w-full overflow-hidden">
                <img
                  alt="Slow Roasted Lamb"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLpujvp0IA7gE9ve_P9C-tg26Za3nQX8seJ81H99cQGZVZ_ovZdGq_CaQOVH5meMjMG2OGW7qdiLH_kUbqQVsWVxJojRHc74ZDBqPmUTO0V70NXlCWb1yhvijvZafuFmuUDVcW2Hk170BUCTSVXd9qLsyCj-kgoWIfnoZHAuMCNxzAalzKzKaAaGP5G5dauUnwbBrYIfkftClAZPzKYHUDLt1QToC4J8So5gdwsevlrf4BnsTUxVsDqj-uWYyx60lSZo3YcHzR0is"
                  title="Slow roasted lamb rack with roasted vegetables"
                />
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <span className="mb-2 inline-block rounded bg-tertiary-container px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-on-tertiary-container">
                      Chef&apos;s Signature
                    </span>
                    <h3 className="font-headline text-xl font-bold text-on-surface">
                      Provencal Lamb Rack
                    </h3>
                  </div>
                  <span className="font-headline text-xl font-extrabold text-on-surface">
                    $42.00
                  </span>
                </div>
                <p className="mb-4 text-sm font-medium leading-relaxed text-on-surface-variant">
                  Herbed crust lamb rack served with fondant potatoes and a rich red wine
                  reduction. Perfect for a decadent evening.
                </p>
                <button
                  className="w-full rounded-full bg-gradient-to-r from-primary to-primary-container py-3 font-bold text-on-primary shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                  type="button"
                  onClick={() => handleAddToCart({ name: 'Provencal Lamb Rack', price: '$42.00' })}
                >
                  Add to Order
                </button>
              </div>
            </div>

            <MenuCard item={secondaryMainCourse} alertIcon onAdd={handleAddToCart} />
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
