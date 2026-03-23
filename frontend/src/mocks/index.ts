import {
  homeCategories,
  homeFeedConfig,
  restaurants,
  searchResultsConfig,
} from './discovery';
import { restaurantMenus } from './menus';
import { getOrderById, getOrderHistoryData } from './orders';
import { savedAddressesPageData, profilePageData } from './profile';

const DEFAULT_RESTAURANT_ID = 'heritage-kitchen';

const restaurantsById = restaurants.reduce((lookup, restaurant) => {
  lookup[restaurant.id] = restaurant;
  return lookup;
}, {});

function getRestaurantById(id = DEFAULT_RESTAURANT_ID) {
  return restaurantsById[id] ?? null;
}

function getRestaurantMenuById(id = DEFAULT_RESTAURANT_ID) {
  return restaurantMenus[id] ?? null;
}

function buildHomeMetaLabel(restaurant) {
  const secondaryLabel =
    restaurant.deliveryFeeLabel === 'Free Delivery'
      ? 'Free'
      : restaurant.priceTier;

  return `${restaurant.deliveryTime} \u2022 ${secondaryLabel}`;
}

function mapHomeRestaurantCard(restaurant) {
  return {
    id: restaurant.id,
    name: restaurant.name,
    rating: restaurant.rating,
    meta: buildHomeMetaLabel(restaurant),
    image: restaurant.cardImage,
    imageAlt: restaurant.cardImageAlt,
  };
}

function mapSearchRestaurantCard(restaurant) {
  return {
    id: restaurant.id,
    name: restaurant.name,
    cuisine: restaurant.cuisine,
    price: restaurant.priceTier,
    rating: restaurant.rating,
    deliveryTime: restaurant.deliveryTime,
    image: restaurant.cardImage,
    imageAlt: restaurant.cardImageAlt,
    badge: restaurant.searchBadge ?? null,
  };
}

const CATEGORY_CONFIG = {
  pizza: {
    label: 'Pizza',
    icon: 'local_pizza',
    restaurantIds: ['vero-italiano', 'bella-vita-trattoria', 'forno-brace'],
  },
  sushi: {
    label: 'Sushi',
    icon: 'set_meal',
    restaurantIds: ['sakura-bloom'],
  },
  burgers: {
    label: 'Burgers',
    icon: 'lunch_dining',
    restaurantIds: ['burger-haven'],
  },
  asian: {
    label: 'Asian',
    icon: 'ramen_dining',
    restaurantIds: ['sakura-bloom', 'spice-route', 'seoul-bowl'],
  },
  coffee: {
    label: 'Coffee',
    icon: 'local_cafe',
    restaurantIds: ['heritage-kitchen', 'vero-italiano', 'olive-vine'],
  },
  bakery: {
    label: 'Bakery',
    icon: 'bakery_dining',
    restaurantIds: ['vero-italiano', 'bella-vita-trattoria', 'forno-brace'],
  },
};

function getRestaurantsByIds(ids) {
  return ids
    .map((id) => getRestaurantById(id))
    .filter(Boolean);
}

function getHomeFeedData() {
  return {
    addressLabel: homeFeedConfig.addressLabel,
    promo: homeFeedConfig.promo,
    categories: homeCategories,
    restaurants: getRestaurantsByIds(homeFeedConfig.restaurantIds).map(
      mapHomeRestaurantCard,
    ),
  };
}

function matchesSearchQuery(restaurant, query) {
  if (!query) {
    return true;
  }

  const normalizedQuery = query.toLowerCase();
  const restaurantSearchText = [
    restaurant.name,
    restaurant.cuisine,
    restaurant.about ?? '',
  ]
    .join(' ')
    .toLowerCase();

  if (restaurantSearchText.includes(normalizedQuery)) {
    return true;
  }

  const menu = getRestaurantMenuById(restaurant.id);

  return Boolean(
    menu?.sections?.some((section) => {
      const sectionSearchText = [
        section.label,
        section.featuredItem?.name ?? '',
        section.featuredItem?.description ?? '',
        ...(section.items ?? []).flatMap((item) => [item.name, item.description]),
      ]
        .join(' ')
        .toLowerCase();

      return sectionSearchText.includes(normalizedQuery);
    }),
  );
}

function matchesCategory(restaurant, category) {
  if (!category) {
    return true;
  }

  const categoryConfig = CATEGORY_CONFIG[category];
  if (!categoryConfig) {
    return true;
  }

  return categoryConfig.restaurantIds.includes(restaurant.id);
}

function buildSearchFilters(query, category) {
  const categoryConfig = category ? CATEGORY_CONFIG[category] : null;
  const contextualFilters: Array<{
    label: string;
    icon?: string;
    active?: boolean;
    filled?: boolean;
  }> = [];

  if (categoryConfig) {
    contextualFilters.push({
      label: categoryConfig.label,
      icon: categoryConfig.icon,
      active: true,
    });
  }

  if (query) {
    contextualFilters.push({
      label: `"${query}"`,
      icon: 'search',
      active: !categoryConfig,
    });
  }

  return [
    ...contextualFilters,
    ...searchResultsConfig.filters.map((filter) => ({
      ...filter,
      active: contextualFilters.length > 0 ? false : filter.active,
    })),
  ];
}

function getSearchResultsData(search: { query?: string; category?: string } = {}) {
  const query = typeof search.query === 'string' ? search.query.trim() : '';
  const category = typeof search.category === 'string' ? search.category : '';
  const hasContext = Boolean(query || category);
  const categoryConfig = category ? CATEGORY_CONFIG[category] : null;
  const matchedRestaurants = hasContext
    ? restaurants.filter(
        (restaurant) =>
          matchesCategory(restaurant, category) && matchesSearchQuery(restaurant, query),
      )
    : getRestaurantsByIds(searchResultsConfig.restaurantIds);

  return {
    queryIcon:
      categoryConfig?.icon ??
      (query ? 'search' : searchResultsConfig.queryIcon),
    queryTitle:
      query || categoryConfig?.label || searchResultsConfig.queryTitle,
    querySubtitle:
      query && categoryConfig
        ? `Searching ${categoryConfig.label}`
        : query
          ? 'Searching for'
          : categoryConfig
            ? 'Browsing category'
            : searchResultsConfig.querySubtitle,
    filters: buildSearchFilters(query, category),
    restaurants: matchedRestaurants.map(mapSearchRestaurantCard),
  };
}

function getAllCategories() {
  return homeCategories;
}

function getSavedAddressesData() {
  return savedAddressesPageData;
}

function getProfileData() {
  return profilePageData;
}

export {
  DEFAULT_RESTAURANT_ID,
  getAllCategories,
  getHomeFeedData,
  getOrderById,
  getOrderHistoryData,
  getRestaurantById,
  getRestaurantMenuById,
  getSavedAddressesData,
  getProfileData,
  getSearchResultsData,
};
