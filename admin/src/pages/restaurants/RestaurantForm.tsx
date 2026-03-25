import { useEffect, useState } from 'react';
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
const acceptedRestaurantImageTypes =
  'image/jpeg,image/png,image/webp,image/gif,image/avif';

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

type RestaurantFormValues = RestaurantRequestDto & {
  cardImageFile: File | null;
  heroImageFile: File | null;
  galleryFiles: File[];
};

const defaultValues: RestaurantFormValues = {
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
  cardImageFile: null,
  heroImageFile: null,
  galleryFiles: [],
};

function toFormValues(
  restaurant?: RestaurantResponseDto,
): RestaurantFormValues {
  if (!restaurant) {
    return {
      ...defaultValues,
      heroBadge: emptyBadge(),
      searchBadge: emptyBadge(),
      gallery: [],
      reviews: [],
      cardImageFile: null,
      heroImageFile: null,
      galleryFiles: [],
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
    cardImageFile: null,
    heroImageFile: null,
    galleryFiles: [],
  };
}

async function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
        return;
      }

      reject(new Error(`Unable to read preview for ${file.name}.`));
    };

    reader.onerror = () => {
      reject(reader.error ?? new Error(`Unable to read preview for ${file.name}.`));
    };

    reader.readAsDataURL(file);
  });
}

function toRestaurantPayload(values: RestaurantFormValues): RestaurantRequestDto {
  return {
    name: values.name.trim(),
    cuisine: values.cuisine.trim(),
    priceTier: values.priceTier?.trim() || undefined,
    rating: values.rating,
    ratingCount: values.ratingCount,
    estimatedDeliveryMinutes: values.estimatedDeliveryMinutes,
    deliveryFee: values.deliveryFee,
    safetyLabel: values.safetyLabel?.trim() || undefined,
    cardImage: values.cardImage?.trim() || undefined,
    cardImageAlt: values.cardImageAlt?.trim() || undefined,
    heroImage: values.heroImage?.trim() || undefined,
    heroImageAlt: values.heroImageAlt?.trim() || undefined,
    heroImageTitle: values.heroImageTitle?.trim() || undefined,
    about: values.about?.trim() || undefined,
    hours: values.hours?.trim() || undefined,
    address: values.address?.trim() || undefined,
    heroBadge: values.heroBadge,
    searchBadge: values.searchBadge,
    gallery: values.gallery
      .map((imageUrl) => imageUrl.trim())
      .filter(Boolean),
    reviews: values.reviews,
  };
}

function buildRestaurantFormData(values: RestaurantFormValues) {
  const formData = new FormData();
  formData.append(
    'restaurant',
    new Blob([JSON.stringify(toRestaurantPayload(values))], {
      type: 'application/json',
    }),
  );

  if (values.cardImageFile) {
    formData.append('cardImageFile', values.cardImageFile);
  }

  if (values.heroImageFile) {
    formData.append('heroImageFile', values.heroImageFile);
  }

  values.galleryFiles.forEach((file) => {
    formData.append('galleryFiles', file);
  });

  return formData;
}

function getPreviewImage(
  values: RestaurantFormValues,
  cardImagePreviewUrl?: string,
  heroImagePreviewUrl?: string,
) {
  return (
    heroImagePreviewUrl ||
    values.heroImage?.trim() ||
    cardImagePreviewUrl ||
    values.cardImage?.trim() ||
    ''
  );
}

function getPreviewAlt(values: RestaurantFormValues) {
  return (
    values.heroImageAlt?.trim() ||
    values.cardImageAlt?.trim() ||
    `${values.name || 'Restaurant'} preview`
  );
}

function getValidationItems(
  values: RestaurantFormValues,
  hasPrimaryImage: boolean,
) {
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
      complete: hasPrimaryImage,
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

function getCompletion(values: RestaurantFormValues, hasPrimaryImage: boolean) {
  const validationItems = getValidationItems(values, hasPrimaryImage);
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
  cardImagePreviewUrl,
  heroImagePreviewUrl,
}: {
  values: RestaurantFormValues;
  isEdit: boolean;
  cardImagePreviewUrl: string;
  heroImagePreviewUrl: string;
}) {
  const hasPrimaryImage = Boolean(
    cardImagePreviewUrl ||
      heroImagePreviewUrl ||
      values.cardImage?.trim() ||
      values.heroImage?.trim(),
  );
  const previewImage = getPreviewImage(values, cardImagePreviewUrl, heroImagePreviewUrl);
  const completion = getCompletion(values, hasPrimaryImage);
  const validationItems = getValidationItems(values, hasPrimaryImage);
  const imageCount =
    [
      cardImagePreviewUrl || values.cardImage?.trim(),
      heroImagePreviewUrl || values.heroImage?.trim(),
    ].filter(Boolean).length +
    values.gallery.filter((item) => item.trim()).length +
    values.galleryFiles.length;

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
  const [cardImagePreviewUrl, setCardImagePreviewUrl] = useState('');
  const [heroImagePreviewUrl, setHeroImagePreviewUrl] = useState('');
  const [galleryPreviewUrls, setGalleryPreviewUrls] = useState<string[]>([]);

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
    mutationFn: (payload: FormData) =>
      isEdit
        ? restaurantApi.updateMultipart(restaurantId!, payload)
        : restaurantApi.createMultipart(payload),
    onSuccess: () => {
      void navigate({ to: '/restaurants' });
    },
  });

  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => saveMutation.mutate(buildRestaurantFormData(value)),
  });

  useEffect(() => {
    if (existing) {
      form.reset(toFormValues(existing));
    }
  }, [existing, form]);

  async function handlePrimaryImageSelection(
    fieldName: 'cardImageFile' | 'heroImageFile',
    setPreview: (preview: string) => void,
    files: FileList | null,
  ) {
    const nextFile = files?.[0];
    if (!nextFile) {
      return;
    }

    const previewUrl = await readFileAsDataUrl(nextFile);
    form.setFieldValue(fieldName, nextFile);
    setPreview(previewUrl);
  }

  async function handleGalleryFileSelection(files: FileList | null) {
    const nextFiles = Array.from(files ?? []);
    if (!nextFiles.length) {
      return;
    }

    const nextPreviewUrls = await Promise.all(nextFiles.map(readFileAsDataUrl));
    form.setFieldValue('galleryFiles', [
      ...form.state.values.galleryFiles,
      ...nextFiles,
    ]);
    setGalleryPreviewUrls((current) => [...current, ...nextPreviewUrls]);
  }

  function removePendingGalleryFile(index: number) {
    form.setFieldValue(
      'galleryFiles',
      form.state.values.galleryFiles.filter((_, fileIndex) => fileIndex !== index),
    );
    setGalleryPreviewUrls((current) =>
      current.filter((_, previewIndex) => previewIndex !== index),
    );
  }

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
          {(values) => (
            <ValidationPanel
              values={values}
              isEdit={isEdit}
              cardImagePreviewUrl={cardImagePreviewUrl}
              heroImagePreviewUrl={heroImagePreviewUrl}
            />
          )}
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
                  label="Card image upload"
                  hint="Upload the image used in compact search and catalog surfaces. Supported formats: JPEG, PNG, WebP, GIF, AVIF."
                >
                  <div className="asset-field">
                    {cardImagePreviewUrl || field.state.value?.trim() ? (
                      <div className="asset-preview">
                        <img
                          className="asset-preview__image"
                          src={cardImagePreviewUrl || field.state.value}
                          alt={field.state.value ? 'Card preview' : 'Selected card preview'}
                        />
                        <div className="asset-preview__meta">
                          <strong>
                            {cardImagePreviewUrl
                              ? 'Selected replacement'
                              : 'Current saved image'}
                          </strong>
                          <span>
                            {cardImagePreviewUrl
                              ? 'This file will replace the current card image when you save.'
                              : 'This image will be preserved unless you upload a replacement or remove it.'}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="asset-empty">No card image selected yet.</div>
                    )}

                    <input
                      className="admin-input admin-input--file"
                      type="file"
                      accept={acceptedRestaurantImageTypes}
                      onChange={(event) => {
                        void handlePrimaryImageSelection(
                          'cardImageFile',
                          setCardImagePreviewUrl,
                          event.target.files,
                        );
                        event.target.value = '';
                      }}
                    />

                    <div className="asset-actions">
                      {cardImagePreviewUrl ? (
                        <button
                          type="button"
                          className="button button--ghost button--compact"
                          onClick={() => {
                            form.setFieldValue('cardImageFile', null);
                            setCardImagePreviewUrl('');
                          }}
                        >
                          Undo replacement
                        </button>
                      ) : null}

                      {field.state.value?.trim() ? (
                        <button
                          type="button"
                          className="button button--ghost button--compact"
                          onClick={() => {
                            field.handleChange('');
                            form.setFieldValue('cardImageFile', null);
                            setCardImagePreviewUrl('');
                          }}
                        >
                          Remove image
                        </button>
                      ) : null}
                    </div>
                  </div>
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
                  label="Hero image upload"
                  hint="Upload the large-format image used on the restaurant detail page. Supported formats: JPEG, PNG, WebP, GIF, AVIF."
                >
                  <div className="asset-field">
                    {heroImagePreviewUrl || field.state.value?.trim() ? (
                      <div className="asset-preview">
                        <img
                          className="asset-preview__image"
                          src={heroImagePreviewUrl || field.state.value}
                          alt={field.state.value ? 'Hero preview' : 'Selected hero preview'}
                        />
                        <div className="asset-preview__meta">
                          <strong>
                            {heroImagePreviewUrl
                              ? 'Selected replacement'
                              : 'Current saved image'}
                          </strong>
                          <span>
                            {heroImagePreviewUrl
                              ? 'This file will replace the current hero image when you save.'
                              : 'This image will be preserved unless you upload a replacement or remove it.'}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="asset-empty">No hero image selected yet.</div>
                    )}

                    <input
                      className="admin-input admin-input--file"
                      type="file"
                      accept={acceptedRestaurantImageTypes}
                      onChange={(event) => {
                        void handlePrimaryImageSelection(
                          'heroImageFile',
                          setHeroImagePreviewUrl,
                          event.target.files,
                        );
                        event.target.value = '';
                      }}
                    />

                    <div className="asset-actions">
                      {heroImagePreviewUrl ? (
                        <button
                          type="button"
                          className="button button--ghost button--compact"
                          onClick={() => {
                            form.setFieldValue('heroImageFile', null);
                            setHeroImagePreviewUrl('');
                          }}
                        >
                          Undo replacement
                        </button>
                      ) : null}

                      {field.state.value?.trim() ? (
                        <button
                          type="button"
                          className="button button--ghost button--compact"
                          onClick={() => {
                            field.handleChange('');
                            form.setFieldValue('heroImageFile', null);
                            setHeroImagePreviewUrl('');
                          }}
                        >
                          Remove image
                        </button>
                      ) : null}
                    </div>
                  </div>
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
          title="Additional gallery images"
          description="Manage saved gallery images and add new uploads that will be appended on save."
        >
          <form.Field name="gallery" mode="array">
            {(field) => (
              <div className="asset-stack">
                <Field
                  label="Upload gallery images"
                  hint="Select one or more image files in JPEG, PNG, WebP, GIF, or AVIF format. They will be appended to the kept gallery items when you save."
                >
                  <input
                    className="admin-input admin-input--file"
                    type="file"
                    accept={acceptedRestaurantImageTypes}
                    multiple
                    onChange={(event) => {
                      void handleGalleryFileSelection(event.target.files);
                      event.target.value = '';
                    }}
                  />
                </Field>

                {field.state.value.length > 0 ? (
                  <div className="gallery-grid">
                    {field.state.value.map((imageUrl, index) => (
                      <article className="gallery-card" key={`${imageUrl}-${index}`}>
                        <img
                          className="gallery-card__image"
                          src={imageUrl}
                          alt={`Saved gallery image ${index + 1}`}
                        />
                        <div className="gallery-card__content">
                          <strong>Saved image {index + 1}</strong>
                          <button
                            type="button"
                            className="button button--ghost button--compact"
                            onClick={() => field.removeValue(index)}
                            aria-label={`Remove gallery image ${index + 1}`}
                          >
                            <TrashIcon width={16} height={16} />
                            Remove
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="asset-empty">No saved gallery images.</div>
                )}

                {form.state.values.galleryFiles.length > 0 ? (
                  <div className="gallery-grid">
                    {form.state.values.galleryFiles.map((file, index) => (
                      <article className="gallery-card gallery-card--pending" key={`${file.name}-${index}`}>
                        <img
                          className="gallery-card__image"
                          src={galleryPreviewUrls[index]}
                          alt={`Pending gallery upload ${index + 1}`}
                        />
                        <div className="gallery-card__content">
                          <strong>{file.name}</strong>
                          <span>Pending upload</span>
                          <button
                            type="button"
                            className="button button--ghost button--compact"
                            onClick={() => removePendingGalleryFile(index)}
                            aria-label={`Remove pending gallery upload ${index + 1}`}
                          >
                            <TrashIcon width={16} height={16} />
                            Remove
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : null}
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
