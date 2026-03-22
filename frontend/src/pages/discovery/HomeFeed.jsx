import { Link } from '@tanstack/react-router';
import DismissiblePromoBanner from '../../components/DismissiblePromoBanner';
import SymbolIcon from '../../components/SymbolIcon';
import SearchInput from '../../components/SearchInput';
import { getHomeFeedData } from '../../mocks';

export default function HomeFeed() {
  const { addressLabel, promo, categories, restaurants } = getHomeFeedData();

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl border-b border-surface-container">
        <div className="px-4 py-3 w-full max-w-lg mx-auto flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <SymbolIcon name="location_on" className="text-primary text-lg" />
              <span className="text-on-surface font-bold text-xs">{addressLabel}</span>
              <SymbolIcon name="expand_more" className="text-on-surface-variant text-sm" />
            </div>
            <Link
              to="/cart"
              className="text-primary active:scale-95 duration-200"
              aria-label="Open bag"
            >
              <SymbolIcon name="shopping_bag" />
            </Link>
          </div>

            <SearchInput />
          </div>
        </header>

      <main className="pt-32 pb-32 max-w-lg mx-auto">
        <section className="px-4">
          <DismissiblePromoBanner
            key={promo.title}
            icon={promo.icon}
            title={promo.title}
            subtitle={promo.subtitle}
            className="mb-4"
          />
        </section>

        <section className="mb-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <h2 className="font-headline text-sm font-bold text-on-surface">Quick Categories</h2>
            <Link
              to="/categories"
              className="flex items-center gap-0.5 text-primary text-xs font-bold p-2 -mr-2 min-h-[44px] active:scale-95 active:opacity-70 transition-all cursor-pointer select-none"
              aria-label="View all categories"
            >
              View all
              <SymbolIcon name="chevron_right" className="text-[14px]" />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar px-4">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className="flex-shrink-0 flex flex-col items-center gap-2"
              >
                <div
                  className={`w-14 h-14 ${category.bgClassName} rounded-xl flex items-center justify-center overflow-hidden`}
                >
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-10 h-10 object-contain"
                    />
                  ) : (
                    <SymbolIcon name={category.icon} className="text-on-surface-variant" />
                  )}
                </div>
                <span className="text-[10px] font-bold text-on-surface">{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="px-4">
          <h2 className="font-headline text-sm font-bold text-on-surface mb-4">Curated For You</h2>
          <div className="grid grid-cols-2 gap-4">
            {restaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                to="/restaurant-menu/$restaurantId"
                params={{ restaurantId: restaurant.id }}
                className="flex flex-col gap-2"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-surface-container">
                  <img
                    src={restaurant.image}
                    alt={restaurant.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                    <SymbolIcon name="star" filled className="text-yellow-500 text-[10px]" />
                    <span className="text-[10px] font-bold text-on-surface">{restaurant.rating}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-headline text-xs font-bold text-on-surface truncate">
                    {restaurant.name}
                  </h3>
                  <p className="text-[10px] text-on-surface-variant truncate">{restaurant.meta}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
