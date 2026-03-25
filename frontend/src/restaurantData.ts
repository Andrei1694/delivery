import { searchResultsConfig } from './mocks/discovery';
import type { RestaurantBadgeDto, RestaurantResponseDto } from './types';

const FALLBACK_RESTAURANT_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 640 480%22%3E%3Crect width=%22640%22 height=%22480%22 fill=%22%23f3ede8%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 fill=%22%236c6b66%22 font-family=%22Arial%22 font-size=%2232%22%3ERestaurant%3C/text%3E%3C/svg%3E';
const UNSUPPORTED_BROWSER_IMAGE_SUFFIXES = ['.heic', '.heif'];

export const API_RESTAURANT_ROUTE_PREFIX = 'api-';

const CATEGORY_CONFIG: Record<
  string,
  {
    label: string;
    icon: string;
    matcher: RegExp;
  }
> = {
  pizza: {
    label: 'Pizza',
    icon: 'local_pizza',
    matcher:
      /(pizza|pizzeria|italian|trattoria|wood-fired|woodfired|neapolitan|forno|brace)/i,
  },
  sushi: {
    label: 'Sushi',
    icon: 'set_meal',
    matcher: /(sushi|japanese|omakase|maki|nigiri|sashimi|tataki)/i,
  },
  burgers: {
    label: 'Burgers',
    icon: 'lunch_dining',
    matcher: /(burger|burgers|smash|patty|grill)/i,
  },
  asian: {
    label: 'Asian',
    icon: 'ramen_dining',
    matcher:
      /(asian|japanese|korean|indian|thai|vietnamese|chinese|sushi|ramen|curry|bibimbap)/i,
  },
  coffee: {
    label: 'Coffee',
    icon: 'local_cafe',
    matcher: /(coffee|cafe|espresso|latte|roastery|brunch)/i,
  },
  bakery: {
    label: 'Bakery',
    icon: 'bakery_dining',
    matcher: /(bakery|pastry|patisserie|bread|cake|dessert|croissant|donut)/i,
  },
};

export type HomeFeedRestaurantCardModel = {
  id: string;
  name: string;
  rating: string;
  meta: string;
  image: string;
  imageAlt: string;
};

type NormalizedRestaurantBadge = {
  label: string;
  icon: string;
  className?: string;
  iconClassName?: string;
};

export type SearchRestaurantCardModel = {
  id: string;
  name: string;
  cuisine: string;
  price: string;
  rating: string;
  deliveryTime: string;
  image: string;
  imageAlt: string;
  badge: NormalizedRestaurantBadge | null;
};

export type SearchFilterModel = {
  label: string;
  icon?: string;
  active?: boolean;
  filled?: boolean;
};

export type RestaurantMenuRestaurantModel = {
  id: string;
  name: string;
  cuisine: string;
  priceTier: string;
  rating: string;
  ratingCountLabel: string;
  deliveryTime: string;
  deliveryFeeLabel: string;
  safetyLabel: string;
  cardImage: string;
  cardImageAlt: string;
  heroImage: string;
  heroImageAlt: string;
  heroImageTitle: string;
  about: string;
  hours: string;
  address: string;
  heroBadge: NormalizedRestaurantBadge | null;
  searchBadge: NormalizedRestaurantBadge | null;
  gallery: string[];
  reviews: Array<{
    id: string;
    author: string;
    rating: number;
    text: string;
    date: string;
  }>;
};

export type RestaurantRouteTarget =
  | { source: 'api'; id: number }
  | { source: 'mock'; id: string };

type SearchContext = {
  query?: string;
  category?: string;
};

function getRestaurantText(restaurant: RestaurantResponseDto) {
  return [
    restaurant.name,
    restaurant.cuisine,
    restaurant.about ?? '',
    restaurant.address ?? '',
  ]
    .join(' ')
    .toLowerCase();
}

function getRatingNumber(restaurant: RestaurantResponseDto) {
  const rating = Number(restaurant.rating);
  return Number.isFinite(rating) ? rating : 0;
}

function getRatingLabel(restaurant: RestaurantResponseDto) {
  return restaurant.rating?.trim() || 'New';
}

function getRatingCountLabel(restaurant: RestaurantResponseDto) {
  return restaurant.ratingCountLabel?.trim() || 'No ratings yet';
}

function getDeliveryTimeLabel(restaurant: RestaurantResponseDto) {
  return restaurant.deliveryTime?.trim() || 'Delivery soon';
}

function getDeliveryFeeLabel(restaurant: RestaurantResponseDto) {
  return restaurant.deliveryFeeLabel?.trim() || 'Delivery fee at checkout';
}

function getPriceTierLabel(restaurant: RestaurantResponseDto) {
  return restaurant.priceTier?.trim() || '$$';
}

function getSafetyLabel(restaurant: RestaurantResponseDto) {
  return restaurant.safetyLabel?.trim() || 'Verified kitchen';
}

function isBrowserSupportedImageUrl(imageUrl?: string | null) {
  if (!imageUrl?.trim()) {
    return false;
  }

  const normalizedUrl = imageUrl
    .trim()
    .split('#')[0]
    .split('?')[0]
    .toLowerCase();

  return !UNSUPPORTED_BROWSER_IMAGE_SUFFIXES.some((suffix) =>
    normalizedUrl.endsWith(suffix),
  );
}

function getRestaurantImage(restaurant: RestaurantResponseDto) {
  return (
    [
      restaurant.cardImage,
      restaurant.heroImage,
      ...(restaurant.gallery ?? []),
    ].find(isBrowserSupportedImageUrl) ||
    FALLBACK_RESTAURANT_IMAGE
  );
}

function getRestaurantImageAlt(restaurant: RestaurantResponseDto) {
  return (
    restaurant.cardImageAlt ||
    restaurant.heroImageAlt ||
    `${restaurant.name} preview image`
  );
}

function normalizeBadge(badge?: RestaurantBadgeDto) {
  if (!badge || (!badge.label && !badge.icon)) {
    return null;
  }

  return {
    label: badge.label?.trim() || 'Featured',
    icon: badge.icon?.trim() || 'stars',
    className: badge.className,
    iconClassName: badge.iconClassName,
  };
}

function normalizeSearch(search: SearchContext) {
  return {
    query: typeof search.query === 'string' ? search.query.trim() : '',
    category: typeof search.category === 'string' ? search.category : '',
  };
}

function getCategoryConfig(category: string) {
  return CATEGORY_CONFIG[category] ?? null;
}

function buildHomeMetaLabel(restaurant: RestaurantResponseDto) {
  const secondaryLabel =
    getDeliveryFeeLabel(restaurant) === 'Free Delivery'
      ? 'Free'
      : getPriceTierLabel(restaurant);

  return `${getDeliveryTimeLabel(restaurant)} • ${secondaryLabel}`;
}

function clampReviewRating(rating?: number) {
  const roundedRating = Math.round(rating ?? 0);

  if (roundedRating < 1) {
    return 1;
  }

  if (roundedRating > 5) {
    return 5;
  }

  return roundedRating;
}

export function buildRestaurantRouteId(id: number | string) {
  return typeof id === 'number' ? `${API_RESTAURANT_ROUTE_PREFIX}${id}` : id;
}

export function parseRestaurantRouteId(routeId: string): RestaurantRouteTarget {
  if (routeId.startsWith(API_RESTAURANT_ROUTE_PREFIX)) {
    const parsedId = Number(routeId.slice(API_RESTAURANT_ROUTE_PREFIX.length));

    if (Number.isInteger(parsedId) && parsedId > 0) {
      return { source: 'api', id: parsedId };
    }
  }

  return { source: 'mock', id: routeId };
}

export function sortRestaurantsForDiscovery(
  restaurants: RestaurantResponseDto[],
) {
  return [...restaurants].sort((left, right) => {
    const ratingDifference = getRatingNumber(right) - getRatingNumber(left);

    if (ratingDifference !== 0) {
      return ratingDifference;
    }

    const ratingCountDifference =
      (right.ratingCount ?? 0) - (left.ratingCount ?? 0);

    if (ratingCountDifference !== 0) {
      return ratingCountDifference;
    }

    return left.name.localeCompare(right.name);
  });
}

export function matchesRestaurantQuery(
  restaurant: RestaurantResponseDto,
  query: string,
) {
  if (!query) {
    return true;
  }

  return getRestaurantText(restaurant).includes(query.toLowerCase());
}

export function matchesRestaurantCategory(
  restaurant: RestaurantResponseDto,
  category: string,
) {
  const categoryConfig = getCategoryConfig(category);

  if (!categoryConfig) {
    return true;
  }

  return categoryConfig.matcher.test(getRestaurantText(restaurant));
}

export function filterRestaurantsForSearch(
  restaurants: RestaurantResponseDto[],
  search: SearchContext,
) {
  const { query, category } = normalizeSearch(search);

  return sortRestaurantsForDiscovery(restaurants).filter(
    (restaurant) =>
      matchesRestaurantCategory(restaurant, category) &&
      matchesRestaurantQuery(restaurant, query),
  );
}

export function buildSearchFilters(search: SearchContext): SearchFilterModel[] {
  const { query, category } = normalizeSearch(search);
  const categoryConfig = getCategoryConfig(category);
  const contextualFilters: SearchFilterModel[] = [];

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

export function buildSearchResultsCopy(search: SearchContext) {
  const { query, category } = normalizeSearch(search);
  const categoryConfig = getCategoryConfig(category);

  return {
    queryIcon:
      categoryConfig?.icon ?? (query ? 'search' : searchResultsConfig.queryIcon),
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
  };
}

export function mapApiRestaurantToHomeCard(
  restaurant: RestaurantResponseDto,
): HomeFeedRestaurantCardModel {
  return {
    id: buildRestaurantRouteId(restaurant.id),
    name: restaurant.name,
    rating: getRatingLabel(restaurant),
    meta: buildHomeMetaLabel(restaurant),
    image: getRestaurantImage(restaurant),
    imageAlt: getRestaurantImageAlt(restaurant),
  };
}

export function mapApiRestaurantToSearchCard(
  restaurant: RestaurantResponseDto,
): SearchRestaurantCardModel {
  return {
    id: buildRestaurantRouteId(restaurant.id),
    name: restaurant.name,
    cuisine: restaurant.cuisine || 'Chef curated',
    price: getPriceTierLabel(restaurant),
    rating: getRatingLabel(restaurant),
    deliveryTime: getDeliveryTimeLabel(restaurant),
    image: getRestaurantImage(restaurant),
    imageAlt: getRestaurantImageAlt(restaurant),
    badge: normalizeBadge(restaurant.searchBadge),
  };
}

export function mapApiRestaurantToMenuRestaurant(
  restaurant: RestaurantResponseDto,
): RestaurantMenuRestaurantModel {
  const image = getRestaurantImage(restaurant);
  const imageAlt = getRestaurantImageAlt(restaurant);

  return {
    id: buildRestaurantRouteId(restaurant.id),
    name: restaurant.name,
    cuisine: restaurant.cuisine || 'Chef curated',
    priceTier: getPriceTierLabel(restaurant),
    rating: getRatingLabel(restaurant),
    ratingCountLabel: getRatingCountLabel(restaurant),
    deliveryTime: getDeliveryTimeLabel(restaurant),
    deliveryFeeLabel: getDeliveryFeeLabel(restaurant),
    safetyLabel: getSafetyLabel(restaurant),
    cardImage: image,
    cardImageAlt: imageAlt,
    heroImage: restaurant.heroImage || image,
    heroImageAlt: restaurant.heroImageAlt || imageAlt,
    heroImageTitle: restaurant.heroImageTitle || restaurant.name,
    about:
      restaurant.about?.trim() ||
      'This restaurant is now connected to the backend. Menu sections will appear once the menu API is available.',
    hours: restaurant.hours?.trim() || 'Hours coming soon',
    address: restaurant.address?.trim() || 'Address coming soon',
    heroBadge: normalizeBadge(restaurant.heroBadge),
    searchBadge: normalizeBadge(restaurant.searchBadge),
    gallery: (restaurant.gallery ?? []).filter(isBrowserSupportedImageUrl),
    reviews: (restaurant.reviews ?? []).map((review, index) => ({
      id: `${restaurant.id}-${index}`,
      author: review.author,
      rating: clampReviewRating(review.rating),
      text: review.text,
      date: review.date,
    })),
  };
}
