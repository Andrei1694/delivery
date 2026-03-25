import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { restaurantApi } from '../api';
import AdminShell from '../components/AdminShell';
import {
  AlertCircleIcon,
  ArrowUpRightIcon,
  ClockIcon,
  CoinIcon,
  DashboardIcon,
  ImageIcon,
  OrdersIcon,
  PlateIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  ShieldIcon,
  StarIcon,
} from '../components/AdminIcons';
import { adminModules } from '../navigation';
import {
  deriveRestaurantMetrics,
  getTopRestaurants,
} from '../utils/restaurantMetrics';

function PlaceholderModuleCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="module-card module-card--placeholder">
      <div className="module-card__header">
        <span className="module-card__icon">{icon}</span>
        <div>
          <p className="module-card__title">{title}</p>
          <p className="module-card__copy">{description}</p>
        </div>
      </div>

      <div className="module-card__footer">
        <span className="pill pill--neutral">Soon</span>
        <span className="module-card__status">Backend support pending</span>
      </div>
    </article>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => restaurantApi.getAll().then((response) => response.data),
  });

  const restaurants = data?.content ?? [];
  const metrics = deriveRestaurantMetrics(restaurants);
  const topRestaurants = getTopRestaurants(restaurants, 3);
  const placeholderModules = adminModules.filter((module) => !module.live);

  return (
    <AdminShell
      activeModule="dashboard"
      eyebrow="Operations overview"
      title="Dashboard"
      description="Track module readiness, review restaurant catalog health, and stage the next admin surfaces without leaving the main control layer."
      actions={
        <button
          type="button"
          onClick={() => navigate({ to: '/restaurants/new' })}
          className="button button--primary"
        >
          <PlusIcon width={18} height={18} />
          Add restaurant
        </button>
      }
      railStats={[
        { label: 'Catalog', value: `${metrics.total}` },
        {
          label: 'Coverage',
          value: metrics.total ? `${metrics.withImages}/${metrics.total}` : '0',
        },
        { label: 'Avg. rating', value: metrics.averageRating },
      ]}
    >
      <section className="stats-grid">
        <article className="metric-card page-section">
          <span className="metric-card__icon">
            <PlateIcon width={18} height={18} />
          </span>
          <p className="metric-card__label">Restaurants</p>
          <p className="metric-card__value">{metrics.total}</p>
          <p className="metric-card__note">
            Live catalog records currently available to operators.
          </p>
        </article>

        <article className="metric-card page-section">
          <span className="metric-card__icon">
            <StarIcon width={18} height={18} />
          </span>
          <p className="metric-card__label">Average rating</p>
          <p className="metric-card__value">{metrics.averageRating}</p>
          <p className="metric-card__note">
            Based on the ratings currently stored in the restaurant dataset.
          </p>
        </article>

        <article className="metric-card page-section">
          <span className="metric-card__icon">
            <ClockIcon width={18} height={18} />
          </span>
          <p className="metric-card__label">Delivery time</p>
          <p className="metric-card__value">{metrics.averageDeliveryTime}</p>
          <p className="metric-card__note">
            Average estimated delivery window across the current catalog.
          </p>
        </article>

        <article className="metric-card metric-card--accent page-section">
          <span className="metric-card__icon">
            <CoinIcon width={18} height={18} />
          </span>
          <p className="metric-card__label">Average fee</p>
          <p className="metric-card__value">{metrics.averageDeliveryFee}</p>
          <p className="metric-card__note">
            Fee posture from the live restaurant dataset only.
          </p>
        </article>
      </section>

      <section className="dashboard-grid">
        <section className="panel page-section">
          <div className="panel__header">
            <p className="section-card__eyebrow">Live data</p>
            <h2 className="panel__title">Restaurant operations snapshot</h2>
            <p className="panel__description">
              Dashboard data currently comes from the restaurant module. Use it
              to validate catalog health before expanding into additional
              surfaces.
            </p>
          </div>

          {isLoading ? (
            <div className="loader-wrap" aria-live="polite">
              <div className="loader" />
              Loading dashboard data…
            </div>
          ) : isError ? (
            <div className="notification notification--error" role="alert">
              Dashboard metrics could not load because the restaurant request
              failed.
            </div>
          ) : (
            <div className="stack">
              <div className="summary-grid">
                <article className="summary-card">
                  <div className="summary-card__header">
                    <span className="summary-card__icon">
                      <SearchIcon width={16} height={16} />
                    </span>
                    <p className="summary-card__title">Cuisine coverage</p>
                  </div>
                  <p className="summary-card__value">{metrics.cuisineCount}</p>
                  <p className="summary-card__copy">
                    Distinct cuisines represented in the active restaurant
                    catalog.
                  </p>
                </article>

                <article className="summary-card">
                  <div className="summary-card__header">
                    <span className="summary-card__icon">
                      <ImageIcon width={16} height={16} />
                    </span>
                    <p className="summary-card__title">Image coverage</p>
                  </div>
                  <p className="summary-card__value">
                    {metrics.withImages}/{metrics.total || 0}
                  </p>
                  <p className="summary-card__copy">
                    Records with a card or hero image available for preview.
                  </p>
                </article>

                <article className="summary-card">
                  <div className="summary-card__header">
                    <span className="summary-card__icon">
                      <ShieldIcon width={16} height={16} />
                    </span>
                    <p className="summary-card__title">Trust signals</p>
                  </div>
                  <p className="summary-card__value">
                    {metrics.withSafetyLabels}/{metrics.total || 0}
                  </p>
                  <p className="summary-card__copy">
                    Restaurants with a safety label currently stored.
                  </p>
                </article>

                <article className="summary-card">
                  <div className="summary-card__header">
                    <span className="summary-card__icon">
                      <ArrowUpRightIcon width={16} height={16} />
                    </span>
                    <p className="summary-card__title">Reviews coverage</p>
                  </div>
                  <p className="summary-card__value">
                    {metrics.withReviews}/{metrics.total || 0}
                  </p>
                  <p className="summary-card__copy">
                    Records that already contain customer review content.
                  </p>
                </article>
              </div>

              <div className="subtle-divider" />

              <div className="stack">
                <div className="section-heading">
                  <div>
                    <p className="section-heading__title">Top rated restaurants</p>
                    <p className="section-heading__copy">
                      Highest rated restaurants in the current dataset.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="button button--ghost button--compact"
                    onClick={() => navigate({ to: '/restaurants' })}
                  >
                    View catalog
                  </button>
                </div>

                {topRestaurants.length === 0 ? (
                  <div className="empty-state">
                    <div>
                      <p className="empty-state__title">No restaurant data yet</p>
                      <p className="body-copy">
                        Add restaurants first to populate the dashboard overview.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="list-stack">
                    {topRestaurants.map((restaurant) => (
                      <article className="list-row" key={restaurant.id}>
                        <div className="list-row__copy">
                          <div className="list-row__title-line">
                            <p className="list-row__title">{restaurant.name}</p>
                            <span className="pill pill--accent">
                              {restaurant.rating ?? '—'}
                            </span>
                          </div>
                          <p className="list-row__meta">
                            {restaurant.cuisine} •{' '}
                            {restaurant.deliveryTime || 'No delivery estimate'}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="inline-button"
                          onClick={() =>
                            navigate({
                              to: '/restaurants/$restaurantId/edit',
                              params: { restaurantId: String(restaurant.id) },
                            })
                          }
                        >
                          Open
                        </button>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        <section className="panel page-section">
          <div className="panel__header">
            <p className="section-card__eyebrow">Planned modules</p>
            <h2 className="panel__title">Dashboard expansion path</h2>
            <p className="panel__description">
              These modules are part of the dashboard structure now, but they
              remain intentionally non-functional until backend support exists.
            </p>
          </div>

          <div className="placeholder-grid">
            {placeholderModules.map((module) => (
              <PlaceholderModuleCard
                key={module.key}
                title={module.label}
                description={module.description}
                icon={<module.icon width={18} height={18} />}
              />
            ))}
          </div>

          <div className="notification notification--info">
            <AlertCircleIcon width={18} height={18} />
            No placeholder module exposes fake data. They are visible only to
            establish the full admin information architecture.
          </div>
        </section>
      </section>

      <section className="summary-grid">
        <article className="module-card module-card--live page-section">
          <div className="module-card__header">
            <span className="module-card__icon">
              <DashboardIcon width={18} height={18} />
            </span>
            <div>
              <p className="module-card__title">Dashboard</p>
              <p className="module-card__copy">
                Overview layer fed by restaurant metrics and module readiness.
              </p>
            </div>
          </div>
          <div className="module-card__footer">
            <span className="pill pill--success">Live</span>
          </div>
        </article>

        <article className="module-card module-card--live page-section">
          <div className="module-card__header">
            <span className="module-card__icon">
              <PlateIcon width={18} height={18} />
            </span>
            <div>
              <p className="module-card__title">Restaurants</p>
              <p className="module-card__copy">
                Catalog management, search, filtering, and editing remain fully
                functional.
              </p>
            </div>
          </div>
          <div className="module-card__footer">
            <span className="pill pill--success">Live</span>
          </div>
        </article>

        <article className="module-card page-section">
          <div className="module-card__header">
            <span className="module-card__icon">
              <OrdersIcon width={18} height={18} />
            </span>
            <div>
              <p className="module-card__title">Orders and customers</p>
              <p className="module-card__copy">
                Visible in navigation, but awaiting operational APIs before
                activation.
              </p>
            </div>
          </div>
          <div className="module-card__footer">
            <span className="pill pill--neutral">Soon</span>
          </div>
        </article>

        <article className="module-card page-section">
          <div className="module-card__header">
            <span className="module-card__icon">
              <SettingsIcon width={18} height={18} />
            </span>
            <div>
              <p className="module-card__title">Analytics and settings</p>
              <p className="module-card__copy">
                Reserved in the shell now so the dashboard scales cleanly when
                those modules arrive.
              </p>
            </div>
          </div>
          <div className="module-card__footer">
            <span className="pill pill--neutral">Soon</span>
          </div>
        </article>
      </section>
    </AdminShell>
  );
}
