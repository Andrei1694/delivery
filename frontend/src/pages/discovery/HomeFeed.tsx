import { Link } from '@tanstack/react-router';
import DismissiblePromoBanner from '../../components/DismissiblePromoBanner';
import HomeFeedFoodCard from '../../components/HomeFeedFoodCard';
import HomeFeedRestaurantCard from '../../components/HomeFeedRestaurantCard';
import MobileCardSlider from '../../components/MobileCardSlider';
import SymbolIcon from '../../components/SymbolIcon';
import SearchInput from '../../components/SearchInput';
import {
  getHomeFeedData,
  getRestaurantById,
  getRestaurantMenuById,
} from '../../mocks';

function isPresent<T>(value: T | null | undefined): value is T {
  return value != null;
}

const SIGNATURE_PLATE_IDS = [
  'heritage-kitchen',
  'sakura-bloom',
  'burger-haven',
  'vero-italiano',
  'spice-route',
  'olive-vine',
];

const SMALL_BITES_IDS = [
  'heritage-kitchen',
  'sakura-bloom',
  'vero-italiano',
  'forno-brace',
  'spice-route',
  'seoul-bowl',
];

function buildFoodSectionItem(restaurantId, item) {
  const restaurant = getRestaurantById(restaurantId);

  if (!restaurant || !item) {
    return null;
  }

  return {
    id: `${restaurantId}-${item.name}`,
    restaurantId,
    name: item.name,
    meta: `${restaurant.name} • ${item.price}`,
    price: item.price,
    image: item.image,
    imageAlt: item.imageAlt,
  };
}

function buildFeaturedFoodItem(restaurantId) {
  const menu = getRestaurantMenuById(restaurantId);
  const section = menu?.sections.find((candidate) => candidate.featuredItem);

  if (!section?.featuredItem) {
    return null;
  }

  return buildFoodSectionItem(
    restaurantId,
    section.featuredItem,
  );
}

function buildSmallBiteItem(restaurantId) {
  const menu = getRestaurantMenuById(restaurantId);
  const section = menu?.sections[0];
  const item = section?.items?.[0];

  if (!item) {
    return null;
  }

  return buildFoodSectionItem(restaurantId, item);
}

const foodSections = [
  {
    title: 'Signature Plates',
    items: SIGNATURE_PLATE_IDS.map(buildFeaturedFoodItem).filter(isPresent),
  },
  {
    title: 'Small Bites',
    items: SMALL_BITES_IDS.map(buildSmallBiteItem).filter(isPresent),
  },
];

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

        <section className="px-4">
          <h2 className="font-headline text-sm font-bold text-on-surface mb-4">Curated For You</h2>
          <MobileCardSlider
            ariaLabel="Curated restaurants"
            slideWidthClassName="w-[calc((100%-1rem)/2)]"
          >
            {restaurants.map((restaurant) => (
              <HomeFeedRestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </MobileCardSlider>
        </section>

        {foodSections.map((section) => (
          <section key={section.title} className="mt-8 px-4">
            <h2 className="mb-4 font-headline text-sm font-bold text-on-surface">{section.title}</h2>
            <MobileCardSlider
              ariaLabel={section.title}
              slideWidthClassName="w-[calc((100%-1rem)/2)]"
            >
              {section.items.map((item) => (
                <HomeFeedFoodCard key={item.id} item={item} />
              ))}
            </MobileCardSlider>
          </section>
        ))}
      </main>
    </div>
  );
}
