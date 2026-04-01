import { Link } from '@tanstack/react-router';
import DismissiblePromoBanner from '../../components/DismissiblePromoBanner';
import HomeFeedRestaurantCard from '../../components/HomeFeedRestaurantCard';
import MobileCardSlider from '../../components/MobileCardSlider';
import SymbolIcon from '../../components/SymbolIcon';
import SearchInput from '../../components/SearchInput';
import { getHomeFeedData } from '../../mocks';
import { useQuery } from '@tanstack/react-query';
import { restaurantApi, sectionsApi } from '../../requests';
import {
  mapApiRestaurantToHomeCard,
  sortRestaurantsForDiscovery,
} from '../../restaurantData';

export default function HomeFeed() {
  const {
    addressLabel,
    promo,
    categories,
    restaurants: fallbackRestaurants,
  } = getHomeFeedData();

  const { data } = useQuery({
    queryKey: ['restaurants', 'all'],
    queryFn: () =>
      restaurantApi.getAll(0, 100).then((response) => response.data.content),
    staleTime: 60_000,
  });

  const { data: sectionsData } = useQuery({
    queryKey: ['sections'],
    queryFn: () => sectionsApi.getAll().then((response) => response.data),
    staleTime: 60_000,
  });

  const sectionRestaurantIds = [
    ...new Set((sectionsData ?? []).flatMap((s) => s.restaurantIds)),
  ];

  const { data: sectionRestaurants } = useQuery({
    queryKey: ['restaurants', 'byIds', sectionRestaurantIds],
    queryFn: () =>
      restaurantApi.findByIds(sectionRestaurantIds).then((r) => r.data),
    enabled: sectionRestaurantIds.length > 0,
    staleTime: 60_000,
  });

  const sectionRestaurantMap = new Map(
    (sectionRestaurants ?? []).map((r) => [r.id, r]),
  );

  const restaurants =
    data && data.length > 0
      ? sortRestaurantsForDiscovery(data)
          .slice(0, 6)
          .map(mapApiRestaurantToHomeCard)
      : fallbackRestaurants;
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
              <Link
                key={category.id}
                to="/search"
                search={{ category: category.id }}
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
                    <SymbolIcon name={category.icon ?? 'restaurant'} className="text-on-surface-variant" />
                  )}
                </div>
                <span className="text-[10px] font-bold text-on-surface">{category.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {sectionsData?.map((section) => (
          <section key={section.name} className="mt-8 px-4">
            <h2 className="mb-4 font-headline text-sm font-bold text-on-surface">{section.name}</h2>
            <MobileCardSlider
              ariaLabel={section.name}
              slideWidthClassName="w-[calc((100%-1rem)/2)]"
            >
              {section.restaurantIds
                .map((id) => sectionRestaurantMap.get(id))
                .filter((r) => r != null)
                .map(mapApiRestaurantToHomeCard)
                .map((restaurant) => (
                  <HomeFeedRestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
            </MobileCardSlider>
          </section>
        ))}
      </main>
    </div>
  );
}
