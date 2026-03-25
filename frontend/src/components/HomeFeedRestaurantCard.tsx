import { Link } from '@tanstack/react-router';
import SymbolIcon from './SymbolIcon';
import type { HomeFeedRestaurantCardModel } from '../restaurantData';

export default function HomeFeedRestaurantCard({
  restaurant,
}: {
  restaurant: HomeFeedRestaurantCardModel;
}) {
  return (
    <Link
      to="/restaurant-menu/$restaurantId"
      params={{ restaurantId: restaurant.id }}
      className="group flex flex-col gap-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-surface-container shadow-sm shadow-on-surface/5">
        <img
          src={restaurant.image}
          alt={restaurant.imageAlt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 to-transparent" />
        <div className="absolute right-2 top-2 flex items-center gap-0.5 rounded-md bg-white/95 px-1.5 py-0.5 backdrop-blur-sm">
          <SymbolIcon name="star" filled className="text-[10px] text-yellow-500" />
          <span className="text-[10px] font-bold text-on-surface">{restaurant.rating}</span>
        </div>
      </div>
      <div>
        <h3 className="truncate font-headline text-xs font-bold text-on-surface">{restaurant.name}</h3>
        <p className="truncate text-[10px] text-on-surface-variant">{restaurant.meta}</p>
      </div>
    </Link>
  );
}
