import type { Restaurant } from '../types';

const restaurantImageModules = import.meta.glob('../assets/restaurants/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

function getRestaurantImageAsset(filename: string) {
  const asset = restaurantImageModules[`../assets/restaurants/${filename}`];

  if (!asset) {
    throw new Error(`Missing restaurant image asset: ${filename}`);
  }

  return asset;
}

const restaurants: Restaurant[] = [
  {
    id: "heritage-kitchen",
    name: "The Heritage Kitchen",
    cuisine: "Mediterranean Comfort",
    about:
      "Experience the finest Mediterranean culinary traditions crafted with passion and fresh, locally sourced ingredients. Our chefs bring years of expertise to every dish, ensuring an unforgettable dining experience.",
    hours: "Mon-Sun: 11:00 AM - 10:00 PM",
    address: "124 Culinary Ave, Food District, FD 10001",
    gallery: [
      getRestaurantImageAsset('heritage-kitchen-gallery-1.png'),
      getRestaurantImageAsset('heritage-kitchen-gallery-2.png'),
    ],
    reviews: [
      { id: "1", author: "Alex J.", rating: 5, text: "Absolutely fantastic! The flavors were perfectly balanced and the service was amazing.", date: "2 days ago" },
      { id: "2", author: "Sam T.", rating: 4, text: "Great food and quick delivery. The meats were tender and perfectly seasoned.", date: "1 week ago" },
    ],
    priceTier: "$$",
    rating: "4.9",
    ratingCountLabel: "980+",
    deliveryTime: "20-30 min",
    deliveryFeeLabel: "Free Delivery",
    safetyLabel: "Farm Assured",
    cardImage: getRestaurantImageAsset('heritage-kitchen-card.png'),
    cardImageAlt: "Roasted lamb and mezze spread on a rustic wooden table",
    heroImage: getRestaurantImageAsset('heritage-kitchen-hero.png'),
    heroImageAlt: "Warm restaurant hero image with plated Mediterranean dishes",
    heroImageTitle: "Braised dishes and fresh herbs on a chef tasting table",
    heroBadge: {
      label: "Weekend Favorite",
      icon: "stars",
    },
  },
  {
    id: "sakura-bloom",
    name: "Sakura Bloom",
    cuisine: "Contemporary Japanese",
    priceTier: "$$",
    rating: "4.7",
    ratingCountLabel: "640+",
    deliveryTime: "15-25 min",
    deliveryFeeLabel: "$3.99 delivery",
    safetyLabel: "Ocean Traceable",
    cardImage: getRestaurantImageAsset('sakura-bloom-card.png'),
    cardImageAlt: "Sushi platter with salmon, tuna, and garnishes",
    heroImage: getRestaurantImageAsset('sakura-bloom-hero.png'),
    heroImageAlt: "Fine dining Japanese seafood plate with bright citrus accents",
    heroImageTitle: "Minimalist Japanese plating with seared seafood",
    heroBadge: {
      label: "Omakase Spotlight",
      icon: "stars",
    },
  },
  {
    id: "burger-haven",
    name: "Burger Haven",
    cuisine: "Signature Burgers",
    priceTier: "$",
    rating: "4.5",
    ratingCountLabel: "1.4k+",
    deliveryTime: "10-20 min",
    deliveryFeeLabel: "$2.49 delivery",
    safetyLabel: "Fresh Ground Daily",
    cardImage: getRestaurantImageAsset('burger-haven-card.png'),
    cardImageAlt: "Double burger with fries and a toasted brioche bun",
    heroImage: getRestaurantImageAsset('burger-haven-hero.png'),
    heroImageAlt: "Burger and fries with dramatic low-key lighting",
    heroImageTitle: "Burger stack with fries and house sauce",
    heroBadge: {
      label: "Fan Favorite",
      icon: "stars",
    },
  },
  {
    id: "vero-italiano",
    name: "Vero Italiano",
    cuisine: "Traditional Italian",
    priceTier: "$$$",
    rating: "4.8",
    ratingCountLabel: "1.1k+",
    deliveryTime: "25-35 min",
    deliveryFeeLabel: "$4.99 delivery",
    safetyLabel: "Handmade Daily",
    cardImage: getRestaurantImageAsset('vero-italiano-card.png'),
    cardImageAlt: "Neapolitan pizza with blistered crust and basil leaves",
    heroImage: getRestaurantImageAsset('vero-italiano-hero.png'),
    heroImageAlt: "Wood-fired pizza and pasta arranged on a stone counter",
    heroImageTitle: "Italian menu spread beside an oven-fired pizza",
    heroBadge: {
      label: "Pasta Atelier",
      icon: "stars",
    },
    searchBadge: {
      label: "New Arrival",
      icon: "new_releases",
      className: "bg-primary-container/50 text-on-primary-container",
      iconClassName: "text-on-primary-container",
    },
  },
  {
    id: "bella-vita-trattoria",
    name: "Bella Vita Trattoria",
    cuisine: "Traditional Italian",
    priceTier: "$$$",
    rating: "4.9",
    ratingCountLabel: "1.6k+",
    deliveryTime: "15-25 min",
    deliveryFeeLabel: "Free Delivery",
    safetyLabel: "Slow Fermented Dough",
    cardImage: getRestaurantImageAsset('bella-vita-trattoria-card.png'),
    cardImageAlt: "Margherita pizza with fresh mozzarella and basil",
    heroImage: getRestaurantImageAsset('bella-vita-trattoria-hero.png'),
    heroImageAlt: "Classic Italian trattoria pizza on a marble counter",
    heroImageTitle: "Neapolitan pizza with basil and olive oil",
    heroBadge: {
      label: "Chef Curated",
      icon: "stars",
    },
    searchBadge: {
      label: "Curator's Choice",
      icon: "verified",
      className: "bg-white/40 text-on-tertiary-container",
      iconClassName: "text-tertiary",
    },
  },
  {
    id: "forno-brace",
    name: "Forno & Brace",
    cuisine: "Artisanal Wood-fired",
    priceTier: "$$",
    rating: "4.8",
    ratingCountLabel: "890+",
    deliveryTime: "10-20 min",
    deliveryFeeLabel: "$2.99 delivery",
    safetyLabel: "Stone Oven Fresh",
    cardImage: getRestaurantImageAsset('forno-brace-card.png'),
    cardImageAlt: "Wood-fired pepperoni pizza fresh from the oven",
    heroImage: getRestaurantImageAsset('forno-brace-hero.png'),
    heroImageAlt: "Fresh pizza slices arranged near a stone oven",
    heroImageTitle: "Wood-fired pizza cooling on a metal rack",
    heroBadge: {
      label: "Wood-fired Daily",
      icon: "stars",
    },
  },
  {
    id: "spice-route",
    name: "Spice Route",
    cuisine: "Modern Indian",
    priceTier: "$$$",
    rating: "4.8",
    ratingCountLabel: "720+",
    deliveryTime: "25-40 min",
    deliveryFeeLabel: "$4.49 delivery",
    safetyLabel: "Halal Certified",
    cardImage: getRestaurantImageAsset('spice-route-card.png'),
    cardImageAlt: "Aromatic lamb curry in a copper bowl with naan",
    heroImage: getRestaurantImageAsset('spice-route-hero.png'),
    heroImageAlt: "Indian feast spread with curries and breads",
    heroImageTitle: "Spiced lamb and fresh naan on a saffron-draped table",
    heroBadge: {
      label: "Tandoor Fresh",
      icon: "stars",
    },
    searchBadge: {
      label: "New Arrival",
      icon: "new_releases",
      className: "bg-primary-container/50 text-on-primary-container",
      iconClassName: "text-on-primary-container",
    },
  },
  {
    id: "seoul-bowl",
    name: "Seoul Bowl",
    cuisine: "Contemporary Korean",
    priceTier: "$$",
    rating: "4.6",
    ratingCountLabel: "510+",
    deliveryTime: "15-25 min",
    deliveryFeeLabel: "$2.99 delivery",
    safetyLabel: "House-Fermented",
    cardImage: getRestaurantImageAsset('seoul-bowl-card.png'),
    cardImageAlt: "Korean bibimbap bowl with colourful vegetables and beef",
    heroImage: getRestaurantImageAsset('seoul-bowl-hero.png'),
    heroImageAlt: "Korean rice bowls and banchan on a wooden table",
    heroImageTitle: "Wagyu bulgogi and pickled banchan arranged on slate",
    heroBadge: {
      label: "K-Food Rising",
      icon: "stars",
    },
  },
  {
    id: "olive-vine",
    name: "Olive & Vine",
    cuisine: "Greek Mediterranean",
    priceTier: "$$",
    rating: "4.7",
    ratingCountLabel: "430+",
    deliveryTime: "20-30 min",
    deliveryFeeLabel: "Free Delivery",
    safetyLabel: "Import Certified",
    cardImage: getRestaurantImageAsset('olive-vine-card.png'),
    cardImageAlt: "Greek mezedes spread with olives and grilled octopus",
    heroImage: getRestaurantImageAsset('olive-vine-hero.png'),
    heroImageAlt: "Mediterranean table with lamb kleftiko and mezedes",
    heroImageTitle: "Slow-roasted lamb and vine leaves on a stone terrace",
    heroBadge: {
      label: "Aegean Inspired",
      icon: "stars",
    },
    searchBadge: {
      label: "Curator's Choice",
      icon: "verified",
      className: "bg-white/40 text-on-tertiary-container",
      iconClassName: "text-tertiary",
    },
  },
];

const homeCategories = [
  {
    id: "pizza",
    name: "Pizza",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9WvYbgsn1tjhIzkyRIoR2s7MQHIhkBSuE8on9bpnqq0G9coRVveq_q8jpZ09YFCHyK6ka__M6HVCZF-80vwVkXgmEnIJksjennbmdasnUbM9HzxuvHHGwiCYRu80kV8cgXrKFoa58x7Z09eVI9jAmZsvawFIRRVdiPsUx0kLO5YzkuGEkleAVP5WT8CzmusWbPurnmfGH-ZF-aYFTq-uSBTGEJosen3xuQevwyo_9ubgQnfOVNNH1psh4tY1PhbnRCeHfzAtUfRU",
    bgClassName: "bg-primary-container",
  },
  {
    id: "sushi",
    name: "Sushi",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA4TPMs6CJAwb38XldJYGJJVm87pphR91ixtGOu-YcZRufDNacZtdqYJ1Sy-KDTeHdRl0jPqQVGyfQFczCkOfSXNVTyE1OiQfF2ur6DdVX-4Y6W8pKM8IU-_HIHXUbEzSZCDQVx2Vmtn5XTSVIHupfuKosc9WaAGTqLpZitkPBI-i8TSgqR_SF-_YVQAtQ6k2pt86xpe8zRgDqGh8uc5PEAA0-iMf6bn480PbdWbI82KZwr8M5mViX1blYIldHdO5y9xKBZAUffaJE",
    bgClassName: "bg-tertiary-container",
  },
  {
    id: "burgers",
    name: "Burgers",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDRagbTdCwn71CjId3G-qc_PI8qB_F3vIkldlvOpIy7KgyXQoOkV9JG4zFdpPIrXDcRhXIOwnobxfq_56EsLHb6fsWhQu_amjBzPrOyYP8qoprimF_DApFndDEkKlDEtycxesGxV8-eNDbU9zAXNSjKpe7zbzggGS3hodHRr4KOZ0qiC2HuMVaP0E-IKfnuDPOOSb06k0oz-P7axX_ulmZ_nk1GSReo8bUUjgRlaOf4SdcWZMUEM3qo7IFpgbZPuuepiLOn7sKu8DI",
    bgClassName: "bg-surface-container-high",
  },
  { id: "asian", name: "Asian", icon: "restaurant_menu", bgClassName: "bg-surface-container-low" },
  { id: "coffee", name: "Coffee", icon: "local_cafe", bgClassName: "bg-surface-container-low" },
  { id: "bakery", name: "Bakery", icon: "bakery_dining", bgClassName: "bg-surface-container-low" },
];

const homeFeedConfig = {
  addressLabel: "Home \u2022 124 Park Ave",
  promo: {
    title: "Weekend Feast",
    subtitle: "30% off on all family platters",
    icon: "celebration",
  },
  restaurantIds: ["heritage-kitchen", "sakura-bloom", "burger-haven", "vero-italiano", "spice-route", "seoul-bowl", "olive-vine"],
};

const searchResultsConfig = {
  queryIcon: "local_pizza",
  queryTitle: "Artisan Italian Pizza",
  querySubtitle: "Searching for",
  restaurantIds: ["bella-vita-trattoria", "vero-italiano", "forno-brace", "olive-vine"],
  filters: [{ label: "Rating 4.5+", icon: "star", active: true, filled: true }, { label: "Price $$" }, { label: "Fastest Delivery", icon: "speed" }, { label: "Vegetarian" }],
};

export { homeCategories, homeFeedConfig, restaurants, searchResultsConfig };
