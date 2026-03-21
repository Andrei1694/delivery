import { Link } from '@tanstack/react-router';

const FILTERS = [
  { label: 'Rating 4.5+', icon: 'star', active: true, filled: true },
  { label: 'Price $$' },
  { label: 'Fastest Delivery', icon: 'speed' },
  { label: 'Vegetarian' },
];

const RESTAURANTS = [
  {
    id: 1,
    name: 'Bella Vita Trattoria',
    cuisine: 'Traditional Italian',
    price: '$$$',
    rating: '4.9',
    deliveryTime: '15-25 min',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4fzsQng7votEQN84BtOYADwQjnIHnc8PcBjG9G6A7sgzd0lJ-bUBRlCbVX8vZrjONDWOWrqZ3E4Wf26ObUq5-aex5y-Bg3HEyO4rb9UNmXum-7Y7WZL6yB9rc-FlJjLjc2d_ju3mtHdqu2TlnTx_AWRqq3BThh7JKcmCzL4JpuhoQX96qG2iQRSPhWtZHANtqZ_hs8l-nY99gOjhEAJg6XtqkDhKBQv0iQfjok7iRvCwyC2w4FJkQr7aQv0YM5laNGMaru23PbKw',
    imageAlt: 'Signature Margherita Pizza',
    badge: {
      label: "Curator's Choice",
      icon: 'verified',
      className: 'bg-white/40 text-on-tertiary-container',
      iconClassName: 'text-tertiary',
    },
  },
  {
    id: 2,
    name: "L'Antica Pizzeria",
    cuisine: 'Neapolitan Style',
    price: '$$',
    rating: '4.7',
    deliveryTime: '20-30 min',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCF8tMsimKProTSfGeCtER7FZw4Dlgs8SbSQE3MX_kkPhUmjymSsDP8sI-7bFOJu-dERR-Zj6ZMy7lShKH0PHwFDWVdPjC8RRS5C4EWL4KABTw-ksQJJUwFbyRIjN7H4UHn7-ElJS927X9GxwGvxaxCYvhe3YoQFTKHjNTFo9yY7Vk29fsPaz7PVszhikr2SZiOtWI17Z6jiczqUsGoYyLk_QtkLC7gml-11qwBxHXV8_TH1rSunlhAwLQyTWL1iycquGZrUun3Qxs',
    imageAlt: 'Rustic Truffle Pizza',
    badge: {
      label: 'New Arrival',
      icon: 'new_releases',
      className: 'bg-primary-container/50 text-on-primary-container',
      iconClassName: 'text-on-primary-container',
    },
  },
  {
    id: 3,
    name: 'Forno & Brace',
    cuisine: 'Artisanal Wood-fired',
    price: '$$',
    rating: '4.8',
    deliveryTime: '10-20 min',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFEFzzxCf0q9vqj728UczmiLxospQgzSiUpe40bFujO8meHL4JmlzBQMqftSfzj4bk9N37qSHhFK_qOtr0vQSmPgJqI-8ucOi52vK1ioAjyWyMXbYYzBSLJNOt5nvd43tzX6rsTVQ-ntbanxa03PyvPqmtSWunCZztvK4xlUjiSbMQ938iGIv1qZ08AfSOUKAps65LWnATYv22gD28_yCpJtN_NAWvnjWpH57AuMZA6e9TfL5YqI812dBENNz4I9qLoqVAZuS6rPc',
    imageAlt: 'Wood-fired Pepperoni',
  },
];

const outlinedIconStyle = {
  fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
};

const filledIconStyle = {
  fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24",
};

function SymbolIcon({ name, className = '', filled = false }) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined ${className}`.trim()}
      style={filled ? filledIconStyle : outlinedIconStyle}
    >
      {name}
    </span>
  );
}

function RestaurantCard({ restaurant }) {
  return (
    <Link to="/restaurant-menu" className="group block cursor-pointer">
      <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-[2rem] bg-surface-container shadow-xl shadow-on-surface/5">
        <img
          alt={restaurant.imageAlt}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={restaurant.image}
        />

        {restaurant.badge ? (
          <div
            className={[
              'search-results-glass absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 px-4 py-2',
              restaurant.badge.className,
            ].join(' ')}
          >
            <SymbolIcon
              name={restaurant.badge.icon}
              className={`text-[16px] ${restaurant.badge.iconClassName ?? ''}`.trim()}
              filled
            />
            <span className="font-headline text-[11px] font-bold uppercase tracking-[0.18em]">
              {restaurant.badge.label}
            </span>
          </div>
        ) : null}

        <div className="search-results-glass absolute bottom-5 right-5 rounded-2xl border border-white/10 bg-on-surface/10 px-4 py-2">
          <p className="flex items-center gap-1.5 font-label text-sm font-bold text-white">
            <SymbolIcon name="schedule" className="text-[16px]" />
            {restaurant.deliveryTime}
          </p>
        </div>
      </div>

      <div className="flex items-start justify-between px-2">
        <div>
          <h3 className="mb-1 font-headline text-2xl font-extrabold leading-tight tracking-tight text-on-surface">
            {restaurant.name}
          </h3>
          <p className="flex items-center gap-2 font-label text-sm text-on-surface-variant">
            <span>{restaurant.cuisine}</span>
            <span className="h-1 w-1 rounded-full bg-outline-variant" />
            <span>{restaurant.price}</span>
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-xl bg-primary-container/20 px-3 py-1.5">
          <SymbolIcon name="star" className="text-[18px] text-primary" filled />
          <span className="font-bold text-on-primary-container">{restaurant.rating}</span>
        </div>
      </div>
    </Link>
  );
}


export default function SearchResults() {
  return (
    <>
      <style>
        {`
          .search-results-page {
            min-height: max(884px, 100dvh);
          }

          .search-results-page .font-headline {
            font-family: 'Plus Jakarta Sans', 'Manrope', sans-serif;
          }

          .search-results-page .search-results-glass {
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }

          .search-results-page .search-results-tonal-bg {
            background: linear-gradient(180deg, rgba(255, 244, 243, 0.8) 0%, rgba(255, 244, 243, 0) 100%);
          }

          .search-results-page .no-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .search-results-page .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      <div className="search-results-page bg-background font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container">
        <header className="fixed top-0 z-50 w-full bg-surface/70 backdrop-blur-xl border-b border-surface-container">
          <div className="mx-auto flex w-full max-w-lg items-center gap-3 px-6 py-4">
            <Link
              to="/"
              aria-label="Go back"
              className="rounded-full p-2 text-primary transition-colors duration-200 hover:bg-surface-container-low active:scale-95"
            >
              <SymbolIcon name="arrow_back" />
            </Link>

            <h1 className="font-headline text-xl font-extrabold tracking-tight text-on-surface">
              The Culinary Curator
            </h1>
          </div>
        </header>

        <main className="mx-auto max-w-lg px-6 pb-32 pt-24">
          <section className="mb-8">
            <div className="mb-6 flex items-center gap-4 rounded-xl bg-surface-container-lowest p-4 shadow-sm shadow-on-surface/5">
              <SymbolIcon name="local_pizza" className="text-primary" />
              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-on-surface-variant">
                  Searching for
                </p>
                <h2 className="font-headline text-xl font-bold text-on-surface">
                  Artisan Italian Pizza
                </h2>
              </div>
            </div>

            <div className="no-scrollbar -mx-6 flex gap-3 overflow-x-auto px-6 py-2">
              {FILTERS.map((filter) => (
                <button
                  key={filter.label}
                  type="button"
                  className={
                    filter.active
                      ? 'flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-label text-sm font-semibold text-white shadow-md shadow-primary/20 transition-transform active:scale-95'
                      : 'flex shrink-0 items-center gap-2 rounded-full bg-surface-container-high px-5 py-2.5 font-label text-sm font-semibold text-on-surface transition-colors hover:bg-surface-variant'
                  }
                >
                  {filter.icon ? (
                    <SymbolIcon
                      name={filter.icon}
                      className="text-[18px]"
                      filled={filter.filled}
                    />
                  ) : null}
                  {filter.label}
                </button>
              ))}
            </div>
          </section>

          <div className="space-y-10">
            {RESTAURANTS.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </main>

      </div>
    </>
  );
}
