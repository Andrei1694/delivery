import {
  homeCategories,
  homeFeedConfig,
  restaurants,
  searchResultsConfig,
} from './discovery';
import { restaurantMenus } from './menus';
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

function getSearchResultsData() {
  return {
    queryIcon: searchResultsConfig.queryIcon,
    queryTitle: searchResultsConfig.queryTitle,
    querySubtitle: searchResultsConfig.querySubtitle,
    filters: searchResultsConfig.filters,
    restaurants: getRestaurantsByIds(searchResultsConfig.restaurantIds).map(
      mapSearchRestaurantCard,
    ),
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
  getRestaurantById,
  getRestaurantMenuById,
  getSavedAddressesData,
  getProfileData,
  getSearchResultsData,
};
