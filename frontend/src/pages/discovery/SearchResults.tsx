import { Link, useNavigate } from '@tanstack/react-router';
import SymbolIcon from '../../components/SymbolIcon';
import PageHeader from '../../components/PageHeader';
import FilterChip from '../../components/FilterChip';
import HorizontalScroller from '../../components/HorizontalScroller';
import { getSearchResultsData } from '../../mocks';

function RestaurantCard({ restaurant }) {
  return (
    <Link
      to="/restaurant-menu/$restaurantId"
      params={{ restaurantId: restaurant.id }}
      className="group block cursor-pointer"
    >
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
  const navigate = useNavigate();
  const { filters, queryIcon, queryTitle, querySubtitle, restaurants } =
    getSearchResultsData();

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
        `}
      </style>

      <div className="search-results-page bg-background font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container">
        <PageHeader
          title="The Culinary Curator"
          onBack={() => navigate({ to: '/' })}
        />

        <main className="mx-auto max-w-lg px-6 pb-32 pt-24">
          <section className="mb-8">
            <div className="mb-6 flex items-center gap-4 rounded-xl bg-surface-container-lowest p-4 shadow-sm shadow-on-surface/5">
              <SymbolIcon name={queryIcon} className="text-primary" />
              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-on-surface-variant">
                  {querySubtitle}
                </p>
                <h2 className="font-headline text-xl font-bold text-on-surface">
                  {queryTitle}
                </h2>
              </div>
            </div>

            <HorizontalScroller className="-mx-6 px-6 py-2" gap="gap-3">
              {filters.map((filter) => (
                <FilterChip
                  key={filter.label}
                  label={filter.label}
                  icon={filter.icon}
                  iconFilled={filter.filled}
                  active={filter.active}
                />
              ))}
            </HorizontalScroller>
          </section>

          <div className="space-y-10">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
