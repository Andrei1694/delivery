export interface RestaurantReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface RestaurantBadge {
  label: string;
  icon: string;
  className?: string;
  iconClassName?: string;
}

export interface Restaurant {
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
  about?: string;
  hours?: string;
  address?: string;
  gallery?: string[];
  reviews?: RestaurantReview[];
  heroBadge?: RestaurantBadge;
  searchBadge?: RestaurantBadge;
}
