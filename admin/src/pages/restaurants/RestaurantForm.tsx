import { useEffect } from 'react';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from '@tanstack/react-router';
import { restaurantApi } from '../../api';
import AdminShell from '../../components/AdminShell';
import {
  AlertCircleIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ClockIcon,
  ImageIcon,
  MapPinIcon,
  NoteIcon,
  PlusIcon,
  SearchIcon,
  ShieldIcon,
  StarIcon,
  TrashIcon,
} from '../../components/AdminIcons';
import type {
  RestaurantBadgeDto,
  RestaurantRequestDto,
  RestaurantResponseDto,
  RestaurantReviewDto,
} from '../../types';
import { getRestaurantInitials } from '../../utils/restaurantMetrics';

const formId = 'restaurant-editor';

const emptyBadge = (): RestaurantBadgeDto => ({
  label: '',
  icon: '',
  className: '',
  iconClassName: '',
});

const emptyReview = (): RestaurantReviewDto => ({
  author: '',
  rating: 0,
  text: '',
  date: '',
});

const defaultValues: RestaurantRequestDto = {
  name: '',
  cuisine: '',
  priceTier: '',
  rating: undefined,
  ratingCount: undefined,
  estimatedDeliveryMinutes: undefined,
  deliveryFee: undefined,
  safetyLabel: '',
  cardImage: '',
  cardImageAlt: '',
  heroImage: '',
  heroImageAlt: '',
  heroImageTitle: '',
  about: '',
  hours: '',
  address: '',
  heroBadge: emptyBadge(),
  searchBadge: emptyBadge(),
  gallery: [],
  reviews: [],
};

function toFormValues(
  restaurant?: RestaurantResponseDto,
): RestaurantRequestDto {
  if (!restaurant) {
    return {
      ...defaultValues,
      heroBadge: emptyBadge(),
      searchBadge: emptyBadge(),
      gallery: [],
      reviews: [],
    };
  }

  return {
    ...defaultValues,
    ...restaurant,
    rating:
      restaurant.rating !== undefined && restaurant.rating !== null
        ? Number(restaurant.rating)
        : undefined,
    heroBadge: restaurant.heroBadge
      ? { ...emptyBadge(), ...restaurant.heroBadge }
      : emptyBadge(),
    searchBadge: restaurant.searchBadge
      ? { ...emptyBadge(), ...restaurant.searchBadge }
      : emptyBadge(),
    gallery: [...(restaurant.gallery ?? [])],
    reviews: (restaurant.reviews ?? []).map((review) => ({ ...review })),
  };
}

function getPreviewImage(values: RestaurantRequestDto) {
  return values.heroImage?.trim() || values.cardImage?.trim() || '';
}

function getPreviewAlt(values: RestaurantRequestDto) {
  return (
    values.heroImageAlt?.trim() ||
    values.cardImageAlt?.trim() ||
    `${values.name || 'Restaurant'} preview`
  );
}

function getValidationItems(values: RestaurantRequestDto) {
  return [
    {
      label: 'Core identity',
      complete: Boolean(values.name.trim() && values.cuisine.trim()),
    },
    {
      label: 'Delivery metadata',
      complete:
        values.estimatedDeliveryMinutes !== undefined &&
        values.deliveryFee !== undefined,
    },
    {
      label: 'Hours and address',
      complete: Boolean(values.hours?.trim() && values.address?.trim()),
    },
    {
      label: 'Primary images',
      complete: Boolean(values.cardImage?.trim() || values.heroImage?.trim()),
    },
    {
      label: 'Accessible alt text',
      complete: Boolean(
        (values.cardImage?.trim() && values.cardImageAlt?.trim()) ||
          (values.heroImage?.trim() && values.heroImageAlt?.trim()),
      ),
    },
    {
      label: 'Reviews',
      complete: values.reviews.some(
        (review) => review.author.trim() || review.text.trim() || review.rating > 0,
      ),
    },
  ];
}

function getCompletion(values: RestaurantRequestDto) {
  const validationItems = getValidationItems(values);
  return Math.round(
    (validationItems.filter((item) => item.complete).length / validationItems.length) *
      100,
  );
}

function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="field">
      <span className="field__label">
        {label}
        {required ? ' *' : ''}
      </span>
      {hint ? <span className="field__hint">{hint}</span> : null}
      {children}
      {error ? (
        <span className="field__error" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function SectionCard({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section-card page-section">
      <div className="section-card__head">
        <p className="section-card__eyebrow">{eyebrow}</p>
        <h2 className="section-card__title">{title}</h2>
        <p className="section-card__description">{description}</p>
      </div>
      <div className="section-card__body">{children}</div>
    </section>
  );
}

function ValidationPanel({
  values,
  isEdit,
}: {
  values: RestaurantRequestDto;
  isEdit: boolean;
}) {
  const previewImage = getPreviewImage(values);
  const completion = getCompletion(values);
  const validationItems = getValidationItems(values);
  const imageCount =
    [values.cardImage, values.heroImage].filter((item) => item?.trim()).length +
    values.gallery.filter((item) => item.trim()).length;

  return (
    <>
      <section className="panel page-section">
        <div className="panel__header">
          <p className="section-card__eyebrow">Validation status</p>
          <h2 className="panel__title">Record readiness</h2>
          <p className="panel__description">
            Use this panel to confirm the core publishing fields before saving.
          </p>
        </div>

        <div className="readiness-bar" aria-hidden="true">
          <div
            className="readiness-bar__value"
            style={{ width: `${completion}%` }}
          />
        </div>
        <p className="body-copy">{completion}% of the validation checks are complete.</p>

        <div className="validation-list">
          {validationItems.map((item) => (
            <div className="validation-item" key={item.label}>
              <span
                className={`validation-item__icon ${
                  item.complete ? 'validation-item__icon--success' : 'validation-item__icon--warning'
                }`}
              >
                {item.complete ? (
                  <CheckCircleIcon width={16} height={16} />
                ) : (
                  <AlertCircleIcon width={16} height={16} />
                )}
              </span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel page-section">
        <div className="panel__header">
          <p className="section-card__eyebrow">Front-facing snapshot</p>
          <h2 className="panel__title">{isEdit ? 'Live record preview' : 'Draft preview'}</h2>
          <p className="panel__description">
            A compact check of how the record will read once surfaced to
            customers.
          </p>
        </div>

        <div className="snapshot-card">
          {previewImage ? (
            <img
              className="snapshot-card__media"
              src={previewImage}
              alt={getPreviewAlt(values)}
              loading="lazy"
            />
          ) : (
            <div className="snapshot-card__placeholder">
              {getRestaurantInitials(values.name || 'Service record')}
            </div>
          )}

          <div className="snapshot-card__content">
            <div className="list-row__title-line">
              <p className="list-row__title">{values.name || 'Restaurant name'}</p>
              <span className="pill pill--accent">
                {isEdit ? 'Live' : 'Draft'}
              </span>
            </div>
            <p className="list-row__meta">
              {values.cuisine || 'Cuisine'} {values.priceTier ? `• ${values.priceTier}` : ''}
            </p>
            <p className="body-copy">
              {values.about?.trim() ||
                'Add a concise description to improve the customer-facing record.'}
            </p>
          </div>
        </div>

        <div className="metric-mini-grid">
          <div className="metric-mini">
            <span className="metric-mini__label">Rating</span>
            <strong>{values.rating !== undefined ? values.rating.toFixed(1) : '—'}</strong>
          </div>
          <div className="metric-mini">
            <span className="metric-mini__label">Delivery</span>
            <strong>
              {values.estimatedDeliveryMinutes
                ? `${values.estimatedDeliveryMinutes} min`
                : '—'}
            </strong>
          </div>
          <div className="metric-mini">
            <span className="metric-mini__label">Images</span>
            <strong>{imageCount}</strong>
          </div>
          <div className="metric-mini">
            <span className="metric-mini__label">Reviews</span>
            <strong>{values.reviews.length}</strong>
          </div>
        </div>
      </section>

      <section className="panel page-section">
        <div className="panel__header">
          <p className="section-card__eyebrow">Metadata audit</p>
          <h2 className="panel__title">Quick checks</h2>
          <p className="panel__description">
            Fast operational checks before saving the record.
          </p>
        </div>

        <div className="audit-list">
          <div className="audit-row">
            <span>Hours</span>
            <strong>{values.hours || 'Missing'}</strong>
          </div>
          <div className="audit-row">
            <span>Address</span>
            <strong>{values.address || 'Missing'}</strong>
          </div>
          <div className="audit-row">
            <span>Safety label</span>
            <strong>{values.safetyLabel || 'Missing'}</strong>
          </div>
          <div className="audit-row">
            <span>Hero title</span>
            <strong>{values.heroImageTitle || 'Missing'}</strong>
          </div>
        </div>
      </section>
    </>
  );
}

export default function RestaurantForm() {
  const navigate = useNavigate();
  const params = useParams({ strict: false }) as { restaurantId?: string };
  const restaurantId = params.restaurantId ? Number(params.restaurantId) : undefined;
  const isEdit = restaurantId !== undefined;

  const {
    data: existing,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['restaurant', restaurantId],
    queryFn: () => restaurantApi.getById(restaurantId!).then((response) => response.data),
    enabled: isEdit,
  });

  const saveMutation = useMutation({
    mutationFn: (payload: RestaurantRequestDto) =>
      isEdit
        ? restaurantApi.update(restaurantId!, payload)
        : restaurantApi.create(payload),
    onSuccess: () => {
      void navigate({ to: '/restaurants' });
    },
  });

  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => saveMutation.mutate(value),
  });

  useEffect(() => {
    if (existing) {
      form.reset(toFormValues(existing));
    }
  }, [existing, form]);

  if (isEdit && isLoading) {
    return (
      <AdminShell
        activeModule="restaurants"
        eyebrow="Restaurants module"
        title="Loading record"
        description="Fetching the latest restaurant data before opening the editor."
        actions={
          <button
            type="button"
            className="button button--ghost"
            onClick={() => navigate({ to: '/restaurants' })}
          >
            <ChevronLeftIcon width={18} height={18} />
            Back to restaurants
          </button>
        }
      >
        <div className="loader-wrap" aria-live="polite">
          <div className="loader" />
          Loading restaurant data…
        </div>
      </AdminShell>
    );
  }

  if (isEdit && isError) {
    return (
      <AdminShell
        activeModule="restaurants"
        eyebrow="Restaurants module"
        title="Record unavailable"
        description="The selected restaurant could not be loaded from the API."
        actions={
          <button
            type="button"
            className="button button--ghost"
            onClick={() => navigate({ to: '/restaurants' })}
          >
            <ChevronLeftIcon width={18} height={18} />
            Back to restaurants
          </button>
        }
      >
        <div className="notification notification--error" role="alert">
          Failed to load the restaurant. Return to the module table and try the
          request again.
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell
      activeModule="restaurants"
      eyebrow="Restaurants module"
      title={isEdit ? 'Edit restaurant' : 'Create restaurant'}
      description="Maintain restaurant content and operational metadata from a single structured editor. The side panel highlights validation and front-facing impact."
      actions={
        <>
          <button
            type="button"
            className="button button--ghost"
            onClick={() => navigate({ to: '/restaurants' })}
          >
            <ChevronLeftIcon width={18} height={18} />
            Back to restaurants
          </button>

          <button
            type="submit"
            form={formId}
            disabled={saveMutation.isPending}
            className="button button--primary"
          >
            {saveMutation.isPending ? (
              <>
                <span className="button__spinner" />
                Saving
              </>
            ) : (
              <>
                <CheckCircleIcon width={18} height={18} />
                {isEdit ? 'Save changes' : 'Create restaurant'}
              </>
            )}
          </button>
        </>
      }
      aside={
        <form.Subscribe selector={(state) => state.values}>
          {(values) => <ValidationPanel values={values} isEdit={isEdit} />}
        </form.Subscribe>
      }
      railStats={[
        { label: 'Mode', value: isEdit ? 'Edit' : 'New' },
        { label: 'Section', value: 'Catalog' },
        { label: 'Sync', value: isEdit ? 'Live' : 'Draft' },
      ]}
    >
      {saveMutation.isError ? (
        <div className="notification notification--error" role="alert" aria-live="polite">
          Failed to save. Review the required fields and try again.
        </div>
      ) : null}

      <form
        id={formId}
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
        className="stack"
      >
        <SectionCard
          eyebrow="Core data"
          title="Identity and rating"
          description="These fields define the main record shown in the dashboard and customer-facing restaurant surfaces."
        >
          <div className="form-grid">
            <form.Field
              name="name"
              validators={{
                onBlur: ({ value }) =>
                  value.trim() ? undefined : 'Name is required.',
              }}
            >
              {(field) => (
                <Field
                  label="Name"
                  required
                  hint="Use the public restaurant name."
                  error={field.state.meta.errors[0]?.toString()}
                >
                  <input
                    className="admin-input"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Casa Verde"
                  />
                </Field>
              )}
            </form.Field>

            <form.Field
              name="cuisine"
              validators={{
                onBlur: ({ value }) =>
                  value.trim() ? undefined : 'Cuisine is required.',
              }}
            >
              {(field) => (
                <Field
                  label="Cuisine"
                  required
                  hint="Keep cuisine naming consistent across the catalog."
                  error={field.state.meta.errors[0]?.toString()}
                >
                  <input
                    className="admin-input"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Mediterranean"
                  />
                </Field>
              )}
            </form.Field>

            <form.Field name="priceTier">
              {(field) => (
                <Field
                  label="Price tier"
                  hint="Short label such as $, $$, or $$$."
                >
                  <input
                    className="admin-input"
                    value={field.state.value ?? ''}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="$$"
                  />
                </Field>
              )}
            </form.Field>

            <form.Field name="safetyLabel">
              {(field) => (
                <Field
                  label="Safety label"
                  hint="Optional trust cue visible in the record."
                >
                  <input
                    className="admin-input"
                    value={field.state.value ?? ''}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Hygiene checked"
                  />
                </Field>
              )}
            </form.Field>

            <form.Field name="rating">
              {(field) => (
                <Field label="Rating" hint="Use a decimal score when available.">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    className="admin-input"
                    value={field.state.value ?? ''}
                    onChange={(event) =>
                      field.handleChange(
                        event.target.value ? Number(event.target.value) : undefined,
                      )
                    }
                    placeholder="4.7"
                  />
                </Field>
              )}
            </form.Field>

            <form.Field name="ratingCount">
              {(field) => (
                <Field
                  label="Rating count"
                  hint="Total number of ratings behind the score."
                >
                  <input
                    type="number"
                    className="admin-input"
                    value={field.state.value ?? ''}
                    onChange={(event) =>
                      field.handleChange(
                        event.target.value ? Number(event.target.value) : undefined,
                      )
                    }
                    placeholder="184"
                  />
                </Field>
              )}
            </form.Field>
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Operations"
          title="Delivery and location"
          description="Use these fields to keep the logistics layer accurate for internal review and downstream surfaces."
        >
          <div className="form-grid">
            <form.Field name="estimatedDeliveryMinutes">
              {(field) => (
                <Field
                  label="Delivery time"
                  hint="Average delivery window in minutes."
                >
                  <input
                    type="number"
                    className="admin-input"
                    value={field.state.value ?? ''}
                    onChange={(event) =>
                      field.handleChange(
                        event.target.value ? Number(event.target.value) : undefined,
                      )
                    }
                    placeholder="25"
                  />
                </Field>
              )}
            </form.Field>

            <form.Field name="deliveryFee">
              {(field) => (
                <Field
                  label="Delivery fee"
                  hint="Use a decimal value in dollars."
                >
                  <input
                    type="number"
                    step="0.01"
                    className="admin-input"
                    value={field.state.value ?? ''}
                    onChange={(event) =>
                      field.handleChange(
                        event.target.value ? Number(event.target.value) : undefined,
                      )
                    }
                    placeholder="2.99"
                  />
                </Field>
              )}
            </form.Field>

            <form.Field name="hours">
              {(field) => (
                <Field label="Hours" hint="Example: Daily • 10:00-22:00">
                  <input
                    className="admin-input"
                    value={field.state.value ?? ''}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Daily • 10:00-22:00"
                  />
                </Field>
              )}
            </form.Field>

            <form.Field name="address">
              {(field) => (
                <Field
                  label="Address"
                  hint="Primary address or delivery coverage anchor."
                >
                  <input
                    className="admin-input"
                    value={field.state.value ?? ''}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="15 Market Street, Bucharest"
                  />
                </Field>
              )}
            </form.Field>
          </div>

          <form.Field name="about">
            {(field) => (
              <Field
                label="About"
                hint="A short description used in the customer-facing record."
              >
                <textarea
                  rows={4}
                  className="admin-textarea"
                  value={field.state.value ?? ''}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="A concise summary of what makes this restaurant worth ordering from."
                />
              </Field>
            )}
          </form.Field>
        </SectionCard>

        <SectionCard
          eyebrow="Assets"
          title="Images and accessibility"
          description="Primary media and alt text should be complete before the record is considered operationally ready."
        >
          <div className="form-grid">
            <form.Field name="cardImage">
              {(field) => (
                <Field
                  label="Card image URL"
                  hint="Used in compact search and catalog surfaces."
                >
                  <input
                    className="admin-input"
                    value={field.state.value ?? ''}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="https://..."
                  />
                </Field>
              )}
            </form.Field>

            <form.Field name="cardImageAlt">
              {(field) => (
                <Field
                  label="Card image alt"
                  hint="Describe the key visual for screen readers."
                >
                  <input
                    className="admin-input"
                    value={field.state.value ?? ''}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="A plated mezze spread on a marble table"
                  />
                </Field>
              )}
            </form.Field>

            <form.Field name="heroImage">
              {(field) => (
                <Field
                  label="Hero image URL"
                  hint="Used in the larger customer-facing detail surface."
                >
                  <input
                    className="admin-input"
                    value={field.state.value ?? ''}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="https://..."
                  />
                </Field>
              )}
            </form.Field>

            <form.Field name="heroImageAlt">
              {(field) => (
                <Field
                  label="Hero image alt"
                  hint="Short accessible description for the hero image."
                >
                  <input
                    className="admin-input"
                    value={field.state.value ?? ''}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Warm dining room with hanging lights"
                  />
                </Field>
              )}
            </form.Field>

            <form.Field name="heroImageTitle">
              {(field) => (
                <Field
                  label="Hero image title"
                  hint="Optional short line displayed with the hero image."
                >
                  <input
                    className="admin-input"
                    value={field.state.value ?? ''}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Signature fire-roasted menu"
                  />
                </Field>
              )}
            </form.Field>
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Badges"
          title="Search and hero metadata"
          description="Short labels and supporting metadata that appear alongside the restaurant in compact UI surfaces."
        >
          <div className="badge-grid">
            {(['heroBadge', 'searchBadge'] as const).map((badgeKey) => (
              <div className="nested-card" key={badgeKey}>
                <div className="section-heading">
                  <div>
                    <p className="section-card__eyebrow">
                      {badgeKey === 'heroBadge' ? 'Hero badge' : 'Search badge'}
                    </p>
                    <p className="section-heading__title">
                      {badgeKey === 'heroBadge'
                        ? 'Large-format surface'
                        : 'Search surface'}
                    </p>
                  </div>
                </div>

                <div className="stack">
                  {(['label', 'icon', 'className', 'iconClassName'] as const).map(
                    (fieldName) => (
                      <form.Field key={fieldName} name={`${badgeKey}.${fieldName}`}>
                        {(field) => (
                          <Field
                            label={fieldName}
                            hint={
                              fieldName === 'label'
                                ? 'Customer-visible badge text.'
                                : 'Optional styling or icon metadata.'
                            }
                          >
                            <input
                              className="admin-input"
                              value={field.state.value ?? ''}
                              onChange={(event) => field.handleChange(event.target.value)}
                              placeholder={fieldName === 'label' ? 'Popular tonight' : 'Optional'}
                            />
                          </Field>
                        )}
                      </form.Field>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Gallery"
          title="Additional asset URLs"
          description="Add supporting imagery to deepen the record without changing the primary customer flow."
        >
          <form.Field name="gallery" mode="array">
            {(field) => (
              <div className="array-list">
                {field.state.value.map((_, index) => (
                  <form.Field key={index} name={`gallery[${index}]`}>
                    {(itemField) => (
                      <div className="array-item">
                        <Field
                          label={`Gallery image ${index + 1}`}
                          hint="Paste a direct image URL."
                        >
                          <input
                            className="admin-input"
                            value={(itemField.state.value as string) ?? ''}
                            onChange={(event) => itemField.handleChange(event.target.value)}
                            placeholder="https://..."
                          />
                        </Field>

                        <button
                          type="button"
                          className="button button--ghost button--compact array-item__remove"
                          onClick={() => field.removeValue(index)}
                          aria-label={`Remove gallery image ${index + 1}`}
                        >
                          <TrashIcon width={16} height={16} />
                        </button>
                      </div>
                    )}
                  </form.Field>
                ))}

                <button
                  type="button"
                  className="button button--ghost button--compact"
                  onClick={() => field.pushValue('')}
                >
                  <PlusIcon width={16} height={16} />
                  Add gallery image
                </button>
              </div>
            )}
          </form.Field>
        </SectionCard>

        <SectionCard
          eyebrow="Reviews"
          title="Customer review entries"
          description="Maintain review content in structured entries so the customer-facing record stays consistent."
        >
          <form.Field name="reviews" mode="array">
            {(field) => (
              <div className="review-stack">
                {field.state.value.map((_, index) => (
                  <article className="nested-card" key={index}>
                    <div className="section-heading">
                      <div>
                        <p className="section-card__eyebrow">Review {index + 1}</p>
                        <p className="section-heading__title">Customer quote</p>
                      </div>
                      <button
                        type="button"
                        className="button button--ghost button--compact"
                        onClick={() => field.removeValue(index)}
                        aria-label={`Remove review ${index + 1}`}
                      >
                        <TrashIcon width={16} height={16} />
                        Remove
                      </button>
                    </div>

                    <div className="form-grid">
                      <form.Field name={`reviews[${index}].author`}>
                        {(reviewField) => (
                          <Field label="Author" hint="Public review author name.">
                            <input
                              className="admin-input"
                              value={(reviewField.state.value as string) ?? ''}
                              onChange={(event) => reviewField.handleChange(event.target.value)}
                              placeholder="Alexandra"
                            />
                          </Field>
                        )}
                      </form.Field>

                      <form.Field name={`reviews[${index}].rating`}>
                        {(reviewField) => (
                          <Field label="Rating" hint="Decimal scores are allowed.">
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              max="5"
                              className="admin-input"
                              value={(reviewField.state.value as number) ?? ''}
                              onChange={(event) =>
                                reviewField.handleChange(
                                  event.target.value ? Number(event.target.value) : 0,
                                )
                              }
                              placeholder="4.8"
                            />
                          </Field>
                        )}
                      </form.Field>

                      <form.Field name={`reviews[${index}].date`}>
                        {(reviewField) => (
                          <Field
                            label="Date"
                            hint="Keep the format customer-friendly."
                          >
                            <input
                              className="admin-input"
                              value={(reviewField.state.value as string) ?? ''}
                              onChange={(event) => reviewField.handleChange(event.target.value)}
                              placeholder="March 2026"
                            />
                          </Field>
                        )}
                      </form.Field>

                      <div className="field field--full">
                        <form.Field name={`reviews[${index}].text`}>
                          {(reviewField) => (
                            <Field
                              label="Review text"
                              hint="Store the exact wording you want rendered."
                            >
                              <textarea
                                rows={4}
                                className="admin-textarea"
                                value={(reviewField.state.value as string) ?? ''}
                                onChange={(event) => reviewField.handleChange(event.target.value)}
                                placeholder="Everything arrived hot and beautifully packed."
                              />
                            </Field>
                          )}
                        </form.Field>
                      </div>
                    </div>
                  </article>
                ))}

                <button
                  type="button"
                  className="button button--ghost button--compact"
                  onClick={() => field.pushValue(emptyReview())}
                >
                  <PlusIcon width={16} height={16} />
                  Add review
                </button>
              </div>
            )}
          </form.Field>
        </SectionCard>

        <section className="panel page-section">
          <div className="panel__header">
            <p className="section-card__eyebrow">Final review</p>
            <h2 className="panel__title">Save back to the catalog</h2>
            <p className="panel__description">
              Confirm the record structure, then persist the changes to the
              live restaurant module.
            </p>
          </div>

          <div className="cluster">
            <span className="pill pill--neutral">
              <SearchIcon width={14} height={14} />
              Catalog-ready
            </span>
            <span className="pill pill--neutral">
              <ClockIcon width={14} height={14} />
              Delivery metadata
            </span>
            <span className="pill pill--neutral">
              <ImageIcon width={14} height={14} />
              Assets checked
            </span>
            <span className="pill pill--neutral">
              <MapPinIcon width={14} height={14} />
              Address present
            </span>
            <span className="pill pill--neutral">
              <ShieldIcon width={14} height={14} />
              Trust cues
            </span>
            <span className="pill pill--neutral">
              <NoteIcon width={14} height={14} />
              Review content
            </span>
            <span className="pill pill--neutral">
              <StarIcon width={14} height={14} />
              Rating data
            </span>
          </div>

          <div className="inline-actions" style={{ marginTop: '18px' }}>
            <button
              type="button"
              className="button button--ghost"
              onClick={() => navigate({ to: '/restaurants' })}
            >
              <ChevronLeftIcon width={18} height={18} />
              Cancel
            </button>

            <button
              type="submit"
              form={formId}
              disabled={saveMutation.isPending}
              className="button button--primary"
            >
              {saveMutation.isPending ? (
                <>
                  <span className="button__spinner" />
                  Saving
                </>
              ) : (
                <>
                  <CheckCircleIcon width={18} height={18} />
                  {isEdit ? 'Save changes' : 'Create restaurant'}
                </>
              )}
            </button>
          </div>
        </section>
      </form>
    </AdminShell>
  );
}
