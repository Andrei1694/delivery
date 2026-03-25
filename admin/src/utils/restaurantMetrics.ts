import { resolveApiAssetUrl } from '../api';
import type { RestaurantResponseDto } from '../types';

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function getRatingNumber(restaurant: RestaurantResponseDto) {
  const rating = Number(restaurant.rating);
  return Number.isFinite(rating) ? rating : undefined;
}

export function getRestaurantImage(restaurant: RestaurantResponseDto) {
  return resolveApiAssetUrl(restaurant.cardImage || restaurant.heroImage || '');
}

export function getImageAlt(restaurant: RestaurantResponseDto) {
  return (
    restaurant.cardImageAlt ||
    restaurant.heroImageAlt ||
    `${restaurant.name} preview image`
  );
}

export function getRestaurantInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function getTopRestaurants(
  restaurants: RestaurantResponseDto[],
  limit = 3,
) {
  return [...restaurants]
    .sort((left, right) => {
      const leftRating = getRatingNumber(left) ?? 0;
      const rightRating = getRatingNumber(right) ?? 0;

      if (rightRating !== leftRating) {
        return rightRating - leftRating;
      }

      const leftCount = left.ratingCount ?? 0;
      const rightCount = right.ratingCount ?? 0;

      if (rightCount !== leftCount) {
        return rightCount - leftCount;
      }

      return left.name.localeCompare(right.name);
    })
    .slice(0, limit);
}

export function deriveRestaurantMetrics(restaurants: RestaurantResponseDto[]) {
  const cuisines = new Set<string>();
  const ratings: number[] = [];
  const deliveryMinutes: number[] = [];
  const deliveryFees: number[] = [];
  let withImages = 0;
  let withSafetyLabels = 0;
  let withAddresses = 0;
  let withReviews = 0;

  for (const restaurant of restaurants) {
    if (restaurant.cuisine) {
      cuisines.add(restaurant.cuisine);
    }

    const rating = getRatingNumber(restaurant);
    if (rating !== undefined) {
      ratings.push(rating);
    }

    if (typeof restaurant.estimatedDeliveryMinutes === 'number') {
      deliveryMinutes.push(restaurant.estimatedDeliveryMinutes);
    }

    if (typeof restaurant.deliveryFee === 'number') {
      deliveryFees.push(restaurant.deliveryFee);
    }

    if (getRestaurantImage(restaurant)) {
      withImages += 1;
    }

    if (restaurant.safetyLabel?.trim()) {
      withSafetyLabels += 1;
    }

    if (restaurant.address?.trim()) {
      withAddresses += 1;
    }

    if ((restaurant.reviews?.length ?? 0) > 0) {
      withReviews += 1;
    }
  }

  return {
    total: restaurants.length,
    cuisineCount: cuisines.size,
    averageRating: ratings.length
      ? (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1)
      : '—',
    averageDeliveryTime: deliveryMinutes.length
      ? `${Math.round(
          deliveryMinutes.reduce((sum, minutes) => sum + minutes, 0) /
            deliveryMinutes.length,
        )} min`
      : '—',
    averageDeliveryFee: deliveryFees.length
      ? currencyFormatter.format(
          deliveryFees.reduce((sum, fee) => sum + fee, 0) / deliveryFees.length,
        )
      : '—',
    withImages,
    withSafetyLabels,
    withAddresses,
    withReviews,
  };
}
