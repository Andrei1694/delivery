import { Link } from '@tanstack/react-router';
import BottomNav from '../../components/BottomNav';

const homeNavItems = [
  { label: 'Explore', icon: 'restaurant', to: '/' },
  { label: 'Search', icon: 'search' },
  { label: 'Orders', icon: 'receipt_long', to: '/order-history' },
];

const categories = [
  {
    id: 1,
    name: 'Pizza',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9WvYbgsn1tjhIzkyRIoR2s7MQHIhkBSuE8on9bpnqq0G9coRVveq_q8jpZ09YFCHyK6ka__M6HVCZF-80vwVkXgmEnIJksjennbmdasnUbM9HzxuvHHGwiCYRu80kV8cgXrKFoa58x7Z09eVI9jAmZsvawFIRRVdiPsUx0kLO5YzkuGEkleAVP5WT8CzmusWbPurnmfGH-ZF-aYFTq-uSBTGEJosen3xuQevwyo_9ubgQnfOVNNH1psh4tY1PhbnRCeHfzAtUfRU',
    bgClassName: 'bg-primary-container',
  },
  {
    id: 2,
    name: 'Sushi',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4TPMs6CJAwb38XldJYGJJVm87pphR91ixtGOu-YcZRufDNacZtdqYJ1Sy-KDTeHdRl0jPqQVGyfQFczCkOfSXNVTyE1OiQfF2ur6DdVX-4Y6W8pKM8IU-_HIHXUbEzSZCDQVx2Vmtn5XTSVIHupfuKosc9WaAGTqLpZitkPBI-i8TSgqR_SF-_YVQAtQ6k2pt86xpe8zRgDqGh8uc5PEAA0-iMf6bn480PbdWbI82KZwr8M5mViX1blYIldHdO5y9xKBZAUffaJE',
    bgClassName: 'bg-tertiary-container',
  },
  {
    id: 3,
    name: 'Burgers',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRagbTdCwn71CjId3G-qc_PI8qB_F3vIkldlvOpIy7KgyXQoOkV9JG4zFdpPIrXDcRhXIOwnobxfq_56EsLHb6fsWhQu_amjBzPrOyYP8qoprimF_DApFndDEkKlDEtycxesGxV8-eNDbU9zAXNSjKpe7zbzggGS3hodHRr4KOZ0qiC2HuMVaP0E-IKfnuDPOOSb06k0oz-P7axX_ulmZ_nk1GSReo8bUUjgRlaOf4SdcWZMUEM3qo7IFpgbZPuuepiLOn7sKu8DI',
    bgClassName: 'bg-surface-container-high',
  },
  { id: 4, name: 'Asian', icon: 'restaurant_menu', bgClassName: 'bg-surface-container-low' },
  { id: 5, name: 'Coffee', icon: 'local_cafe', bgClassName: 'bg-surface-container-low' },
  { id: 6, name: 'Bakery', icon: 'bakery_dining', bgClassName: 'bg-surface-container-low' },
];

const restaurants = [
  {
    id: 1,
    name: 'The Heritage Kitchen',
    meta: '20-30 min • Free',
    rating: '4.9',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD25ttG6SC-8VnapaRPDCPvGq9EiPDgWxDX4bj0lameAu2wiky4dQxNJnmb8IVxVQDHK7z6bSqAgl12lSUKiWIQLKsVSRQ8tpwRQVi6s2HLDhfYgKIFS7P2Ppg-seVm_61eWJr5RMnartyaMC6JWalsKs_F-JymEkmJ6gsAVSW7BuX7BdHfW6Tl_DE9AzAVC7iYd8dMFsot3GfymotAWlgIiylVSYS5TNEnCPcVlKERwvzVbR-G0CnA4MaBSbTlmiEOPf_gJ6XODA',
  },
  {
    id: 2,
    name: 'Sakura Bloom',
    meta: '15-25 min • $$',
    rating: '4.7',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxhTKQnbVX-6sB3PwpG-_b4NyZJzLCZt9Jd76X8Pg7JsERy7zMDBnwZqWMm5GhhKpEuCkRzYijLY6ULplPnabQarGTm6O7VTcmFkqCYW8-nZjh_A4yYzn-8FKrwzxS4gRFW26W1MvuTiEZplUX6fBV1T0huU9UY0OkFJ9M9Y7G4jQl7kem2BWOZ2GdrTkyWkdnCCI5VRInW0pL79_AkDDAgCXsvBBBZHeBBYN5RWuKz8ZTs-Ly-vsXTiLnCq93R3W5li_qek6TQwM',
  },
  {
    id: 3,
    name: 'Burger Haven',
    meta: '10-20 min • $',
    rating: '4.5',
    placeholderIcon: 'restaurant',
  },
  {
    id: 4,
    name: 'Vero Italiano',
    meta: '25-40 min • $$$',
    rating: '4.8',
    placeholderIcon: 'local_pizza',
  },
];

const iconStyle = {
  fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
};

const filledIconStyle = {
  fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24",
};

const SymbolIcon = ({ name, className = '', filled = false }) => (
  <span
    aria-hidden="true"
    className={`material-symbols-outlined ${className}`.trim()}
    style={filled ? filledIconStyle : iconStyle}
  >
    {name}
  </span>
);

export default function HomeFeed() {
  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-surface-container">
        <div className="px-4 py-3 w-full max-w-lg mx-auto flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <SymbolIcon name="location_on" className="text-primary text-lg" />
              <span className="text-on-surface font-bold text-xs">Home • 124 Park Ave</span>
              <SymbolIcon name="expand_more" className="text-on-surface-variant text-sm" />
            </div>
            <button
              type="button"
              className="text-primary active:scale-95 duration-200"
              aria-label="Open bag"
            >
              <SymbolIcon name="shopping_bag" />
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-on-surface-variant">
              <SymbolIcon name="search" className="text-[20px]" />
            </div>
            <input
              type="text"
              placeholder="Search restaurants, dishes..."
              className="w-full bg-surface-container-lowest border-none rounded-xl py-2.5 pl-11 pr-4 shadow-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-on-surface-variant/50 text-sm font-medium focus:outline-none"
            />
          </div>
        </div>
      </header>

      <main className="pt-32 pb-32 max-w-lg mx-auto">
        <section className="px-4 mb-4">
          <div className="bg-tertiary rounded-xl p-3 text-on-tertiary flex items-center justify-between relative overflow-hidden">
            <div className="flex items-center gap-3 relative z-10">
              <SymbolIcon name="celebration" className="text-xl" />
              <div>
                <h2 className="font-headline text-sm font-bold leading-none">Weekend Feast</h2>
                <p className="text-[10px] text-on-tertiary/90 mt-0.5">30% off on all family platters</p>
              </div>
            </div>
            <button type="button" className="relative z-10 p-1" aria-label="Close">
              <SymbolIcon name="close" className="text-sm" />
            </button>
          </div>
        </section>

        <section className="mb-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <h2 className="font-headline text-sm font-bold text-on-surface">Quick Categories</h2>
            <button type="button" className="text-primary text-xs font-bold">View all</button>
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
              <Link key={restaurant.id} to="/restaurant-menu" className="flex flex-col gap-2">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-surface-container">
                  {restaurant.image ? (
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-on-surface-variant/20">
                      <SymbolIcon name={restaurant.placeholderIcon} className="text-4xl" />
                    </div>
                  )}
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

      <BottomNav navItems={homeNavItems} />
    </div>
  );
}
