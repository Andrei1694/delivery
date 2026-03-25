import { useDeferredValue, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { restaurantApi } from '../../api';
import AdminShell from '../../components/AdminShell';
import {
  ClockIcon,
  CoinIcon,
  ImageIcon,
  PencilIcon,
  PlateIcon,
  PlusIcon,
  SearchIcon,
  ShieldIcon,
  StarIcon,
  TrashIcon,
} from '../../components/AdminIcons';
import type { RestaurantResponseDto } from '../../types';
import {
  currencyFormatter,
  deriveRestaurantMetrics,
  getImageAlt,
  getRestaurantImage,
  getRestaurantInitials,
  getTopRestaurants,
} from '../../utils/restaurantMetrics';

function CatalogHealth({
  restaurants,
}: {
  restaurants: RestaurantResponseDto[];
}) {
  const metrics = deriveRestaurantMetrics(restaurants);

  return (
    <section className="panel page-section">
      <div className="panel__header">
        <p className="section-card__eyebrow">Catalog health</p>
        <h2 className="panel__title">Data quality checks</h2>
        <p className="panel__description">
          Track the core fields that make the catalog operationally usable.
        </p>
      </div>

      <div className="audit-list">
        <div className="audit-row">
          <span>Images available</span>
          <strong>
            {metrics.withImages}/{metrics.total || 0}
          </strong>
        </div>
        <div className="audit-row">
          <span>Safety labels set</span>
          <strong>
            {metrics.withSafetyLabels}/{metrics.total || 0}
          </strong>
        </div>
        <div className="audit-row">
          <span>Addresses filled</span>
          <strong>
            {metrics.withAddresses}/{metrics.total || 0}
          </strong>
        </div>
        <div className="audit-row">
          <span>Reviews present</span>
          <strong>
            {metrics.withReviews}/{metrics.total || 0}
          </strong>
        </div>
      </div>
    </section>
  );
}

function TopRestaurant({
  restaurant,
}: {
  restaurant?: RestaurantResponseDto;
}) {
  if (!restaurant) {
    return (
      <section className="panel page-section">
        <div className="panel__header">
          <p className="section-card__eyebrow">Current leader</p>
          <h2 className="panel__title">No standout yet</h2>
          <p className="panel__description">
            Add ratings and restaurant data to surface a top performer in the
            current view.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="panel page-section">
      <div className="panel__header">
        <p className="section-card__eyebrow">Current leader</p>
        <h2 className="panel__title">Top rated in view</h2>
        <p className="panel__description">
          Highest-rated restaurant in the active filtered set.
        </p>
      </div>

      <article className="list-row list-row--stacked">
        <div className="list-row__copy">
          <div className="list-row__title-line">
            <p className="list-row__title">{restaurant.name}</p>
            <span className="pill pill--accent">
              <StarIcon width={14} height={14} />
              {restaurant.rating ?? '—'}
            </span>
          </div>
          <p className="list-row__meta">
            {restaurant.cuisine} • {restaurant.deliveryTime || 'No delivery estimate'}
          </p>
          <p className="body-copy">
            {restaurant.address || 'Address has not been filled yet.'}
          </p>
        </div>
      </article>
    </section>
  );
}

export default function RestaurantList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [query, setQuery] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('all');
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const { data, isLoading, isError } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => restaurantApi.getAll().then((response) => response.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => restaurantApi.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['restaurants'] }),
  });

  const restaurants = data?.content ?? [];
  const cuisineOptions = Array.from(
    new Set(restaurants.map((restaurant) => restaurant.cuisine).filter(Boolean)),
  ).sort((left, right) => left.localeCompare(right));

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesCuisine =
      cuisineFilter === 'all' || restaurant.cuisine === cuisineFilter;
    const searchableText = [
      restaurant.name,
      restaurant.cuisine,
      restaurant.address ?? '',
      restaurant.safetyLabel ?? '',
    ]
      .join(' ')
      .toLowerCase();

    return (
      matchesCuisine &&
      (deferredQuery.length === 0 || searchableText.includes(deferredQuery))
    );
  });

  const metrics = deriveRestaurantMetrics(filteredRestaurants);
  const topRestaurant = getTopRestaurants(filteredRestaurants, 1)[0];

  function handleDelete(restaurant: RestaurantResponseDto) {
    if (window.confirm(`Delete "${restaurant.name}"?`)) {
      deleteMutation.mutate(restaurant.id);
    }
  }

  return (
    <AdminShell
      activeModule="restaurants"
      eyebrow="Restaurants module"
      title="Restaurants"
      description="Search, audit, and maintain the live catalog with stronger data visibility and cleaner edit flows."
      actions={
        <button
          type="button"
          onClick={() => navigate({ to: '/restaurants/new' })}
          className="button button--primary"
        >
          <PlusIcon width={18} height={18} />
          New restaurant
        </button>
      }
      aside={
        <>
          <CatalogHealth restaurants={filteredRestaurants} />
          <TopRestaurant restaurant={topRestaurant} />
        </>
      }
      railStats={[
        { label: 'Visible', value: `${filteredRestaurants.length}` },
        { label: 'Cuisines', value: `${metrics.cuisineCount}` },
        { label: 'Avg. rating', value: metrics.averageRating },
      ]}
    >
      <section className="stats-grid">
        <article className="metric-card page-section">
          <span className="metric-card__icon">
            <PlateIcon width={18} height={18} />
          </span>
          <p className="metric-card__label">Visible records</p>
          <p className="metric-card__value">{filteredRestaurants.length}</p>
          <p className="metric-card__note">
            Filtered set currently shown in the module table.
          </p>
        </article>

        <article className="metric-card page-section">
          <span className="metric-card__icon">
            <StarIcon width={18} height={18} />
          </span>
          <p className="metric-card__label">Average rating</p>
          <p className="metric-card__value">{metrics.averageRating}</p>
          <p className="metric-card__note">
            Rating average for the active filtered dataset.
          </p>
        </article>

        <article className="metric-card page-section">
          <span className="metric-card__icon">
            <ClockIcon width={18} height={18} />
          </span>
          <p className="metric-card__label">Delivery time</p>
          <p className="metric-card__value">{metrics.averageDeliveryTime}</p>
          <p className="metric-card__note">
            Delivery estimate average from the current view.
          </p>
        </article>

        <article className="metric-card metric-card--accent page-section">
          <span className="metric-card__icon">
            <CoinIcon width={18} height={18} />
          </span>
          <p className="metric-card__label">Average fee</p>
          <p className="metric-card__value">{metrics.averageDeliveryFee}</p>
          <p className="metric-card__note">
            Delivery fee average for the current filtered records.
          </p>
        </article>
      </section>

      <section className="panel page-section">
        <div className="panel__header">
          <p className="section-card__eyebrow">Catalog table</p>
          <h2 className="panel__title">Search and manage restaurants</h2>
          <p className="panel__description">
            Filter the live dataset by cuisine or keyword, then jump into record
            maintenance from the same screen.
          </p>
        </div>

        <div className="toolbar">
          <label className="search-wrap" aria-label="Search restaurants">
            <SearchIcon width={18} height={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="search-input"
              placeholder="Search by name, cuisine, address, or safety label"
            />
          </label>

          <div className="filter-row" aria-label="Cuisine filters">
            <button
              type="button"
              className={`filter-chip ${cuisineFilter === 'all' ? 'filter-chip--active' : ''}`}
              onClick={() => setCuisineFilter('all')}
            >
              All cuisines
            </button>

            {cuisineOptions.map((cuisine) => (
              <button
                key={cuisine}
                type="button"
                className={`filter-chip ${
                  cuisineFilter === cuisine ? 'filter-chip--active' : ''
                }`}
                onClick={() => setCuisineFilter(cuisine)}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>

        {deleteMutation.isError ? (
          <div className="notification notification--error" role="alert" aria-live="polite">
            The restaurant could not be deleted. Refresh the list and try again.
          </div>
        ) : null}

        {isLoading ? (
          <div className="loader-wrap" aria-live="polite">
            <div className="loader" />
            Loading restaurant records…
          </div>
        ) : null}

        {isError && !isLoading ? (
          <div className="notification notification--error" role="alert">
            Failed to load restaurants. Confirm the backend is running on port
            8080 and try again.
          </div>
        ) : null}

        {!isLoading && !isError ? (
          <>
            <p className="table-meta">
              Showing {filteredRestaurants.length} of {data?.totalElements ?? 0}{' '}
              restaurants
            </p>

            {filteredRestaurants.length === 0 ? (
              <div className="empty-state">
                <div>
                  <p className="empty-state__title">No matching restaurants</p>
                  <p className="body-copy">
                    Clear the search or change the cuisine filter to expand the
                    visible set.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="table-shell">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Restaurant</th>
                        <th>Rating</th>
                        <th>Delivery</th>
                        <th>Fee</th>
                        <th>Address</th>
                        <th aria-label="Actions" />
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRestaurants.map((restaurant) => {
                        const image = getRestaurantImage(restaurant);
                        const isDeleting =
                          deleteMutation.isPending &&
                          deleteMutation.variables === restaurant.id;

                        return (
                          <tr key={restaurant.id}>
                            <td>
                              <div className="restaurant-entry">
                                {image ? (
                                  <img
                                    className="restaurant-entry__thumb"
                                    src={image}
                                    alt={getImageAlt(restaurant)}
                                    loading="lazy"
                                  />
                                ) : (
                                  <div className="restaurant-entry__placeholder">
                                    {getRestaurantInitials(restaurant.name)}
                                  </div>
                                )}

                                <div>
                                  <p className="restaurant-entry__name">{restaurant.name}</p>
                                  <div className="restaurant-entry__meta">
                                    <span className="pill pill--accent">
                                      {restaurant.cuisine}
                                    </span>
                                    {restaurant.safetyLabel ? (
                                      <span className="pill pill--success">
                                        <ShieldIcon width={14} height={14} />
                                        {restaurant.safetyLabel}
                                      </span>
                                    ) : null}
                                    {image ? (
                                      <span className="pill pill--neutral">
                                        <ImageIcon width={14} height={14} />
                                        Image
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>{restaurant.rating ?? '—'}</td>
                            <td>{restaurant.deliveryTime ?? '—'}</td>
                            <td>
                              {restaurant.deliveryFeeLabel ||
                                (typeof restaurant.deliveryFee === 'number'
                                  ? currencyFormatter.format(restaurant.deliveryFee)
                                  : '—')}
                            </td>
                            <td>{restaurant.address || 'Address not set'}</td>
                            <td>
                              <div className="inline-actions">
                                <button
                                  type="button"
                                  onClick={() =>
                                    navigate({
                                      to: '/restaurants/$restaurantId/edit',
                                      params: {
                                        restaurantId: String(restaurant.id),
                                      },
                                    })
                                  }
                                  className="inline-button"
                                >
                                  <PencilIcon width={16} height={16} />
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDelete(restaurant)}
                                  disabled={isDeleting}
                                  className="inline-button inline-button--danger"
                                >
                                  {isDeleting ? (
                                    <>
                                      <span className="button__spinner" />
                                      Deleting
                                    </>
                                  ) : (
                                    <>
                                      <TrashIcon width={16} height={16} />
                                      Delete
                                    </>
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mobile-list">
                  {filteredRestaurants.map((restaurant) => {
                    const image = getRestaurantImage(restaurant);
                    const isDeleting =
                      deleteMutation.isPending &&
                      deleteMutation.variables === restaurant.id;

                    return (
                      <article className="mobile-card" key={restaurant.id}>
                        <div className="restaurant-entry">
                          {image ? (
                            <img
                              className="restaurant-entry__thumb"
                              src={image}
                              alt={getImageAlt(restaurant)}
                              loading="lazy"
                            />
                          ) : (
                            <div className="restaurant-entry__placeholder">
                              {getRestaurantInitials(restaurant.name)}
                            </div>
                          )}

                          <div>
                            <p className="restaurant-entry__name">{restaurant.name}</p>
                            <div className="restaurant-entry__meta">
                              <span className="pill pill--accent">{restaurant.cuisine}</span>
                              {restaurant.safetyLabel ? (
                                <span className="pill pill--success">
                                  <ShieldIcon width={14} height={14} />
                                  {restaurant.safetyLabel}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>

                        <div className="mobile-grid">
                          <div>
                            <p className="mobile-card__label field__hint">Rating</p>
                            <p className="mobile-card__value">{restaurant.rating ?? '—'}</p>
                          </div>
                          <div>
                            <p className="mobile-card__label field__hint">Delivery</p>
                            <p className="mobile-card__value">{restaurant.deliveryTime ?? '—'}</p>
                          </div>
                          <div>
                            <p className="mobile-card__label field__hint">Fee</p>
                            <p className="mobile-card__value">
                              {restaurant.deliveryFeeLabel ||
                                (typeof restaurant.deliveryFee === 'number'
                                  ? currencyFormatter.format(restaurant.deliveryFee)
                                  : '—')}
                            </p>
                          </div>
                          <div>
                            <p className="mobile-card__label field__hint">Address</p>
                            <p className="mobile-card__value">
                              {restaurant.address || 'Address not set'}
                            </p>
                          </div>
                        </div>

                        <div className="inline-actions">
                          <button
                            type="button"
                            onClick={() =>
                              navigate({
                                to: '/restaurants/$restaurantId/edit',
                                params: { restaurantId: String(restaurant.id) },
                              })
                            }
                            className="inline-button"
                          >
                            <PencilIcon width={16} height={16} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(restaurant)}
                            disabled={isDeleting}
                            className="inline-button inline-button--danger"
                          >
                            {isDeleting ? (
                              <>
                                <span className="button__spinner" />
                                Deleting
                              </>
                            ) : (
                              <>
                                <TrashIcon width={16} height={16} />
                                Delete
                              </>
                            )}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </>
            )}
          </>
        ) : null}
      </section>
    </AdminShell>
  );
}
