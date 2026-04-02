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

export interface RestaurantBadgeDto {
  label?: string;
  icon?: string;
  className?: string;
  iconClassName?: string;
}

export interface MealSizeDto {
  name?: string;
  price?: number;
}

export interface ExtrasDto {
  name?: string;
  price?: number;
}

export interface MealDto {
  id?: number;
  name: string;
  about?: string;
  cardImage?: string;
  available?: boolean;
  stock?: number;
  price: number;
  sizes: MealSizeDto[];
  extras: ExtrasDto[];
}

export interface RestaurantReviewDto {
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface RestaurantRequestDto {
  name: string;
  cuisine: string;
  priceTier?: string;
  rating?: number;
  ratingCount?: number;
  estimatedDeliveryMinutes?: number;
  deliveryFee?: number;
  safetyLabel?: string;
  cardImage?: string;
  cardImageAlt?: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroImageTitle?: string;
  about?: string;
  hours?: string;
  address?: string;
  heroBadge?: RestaurantBadgeDto;
  searchBadge?: RestaurantBadgeDto;
  gallery: string[];
  reviews: RestaurantReviewDto[];
}

export interface RestaurantResponseDto {
  id: number;
  slug?: string;
  name: string;
  cuisine: string;
  priceTier?: string;
  rating?: string;
  ratingCount?: number;
  ratingCountLabel?: string;
  estimatedDeliveryMinutes?: number;
  deliveryTime?: string;
  deliveryFee?: number;
  deliveryFeeLabel?: string;
  safetyLabel?: string;
  cardImage?: string;
  cardImageAlt?: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroImageTitle?: string;
  about?: string;
  hours?: string;
  address?: string;
  heroBadge?: RestaurantBadgeDto;
  searchBadge?: RestaurantBadgeDto;
  gallery: string[];
  reviews: RestaurantReviewDto[];
  meals?: MealDto[];
}

export interface SectionRequestDto {
  key: string;
  name: string;
  active: boolean;
  restaurantIds: number[];
}

export interface SectionResponseDto {
  id: number;
  key: string;
  name: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  restaurantIds: number[];
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
