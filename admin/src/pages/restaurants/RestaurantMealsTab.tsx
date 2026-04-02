import { useDeferredValue, useState, type ReactNode } from 'react';
import {
  useForm,
  type FormAsyncValidateOrFn,
  type FormValidateOrFn,
  type ReactFormExtendedApi,
} from '@tanstack/react-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { mealApi, resolveApiAssetUrl } from '../../api';
import {
  AlertCircleIcon,
  CheckCircleIcon,
  CoinIcon,
  NoteIcon,
  PencilIcon,
  PlateIcon,
  PlusIcon,
  SearchIcon,
  ShieldIcon,
  TrashIcon,
} from '../../components/AdminIcons';
import type { ExtrasDto, MealDto, MealSizeDto } from '../../types';
import { currencyFormatter } from '../../utils/restaurantMetrics';

const mealEditorFormId = 'meal-editor';
const mealEditorPanelId = 'restaurant-meal-editor-panel';

type AvailabilityFilter = 'all' | 'available' | 'unavailable';
type MealOptionRow = {
  name: string;
  price: number | undefined;
};

type MealFormValues = {
  id?: number;
  name: string;
  about: string;
  cardImage: string;
  available: boolean;
  stock: number | undefined;
  price: number | undefined;
  sizes: MealOptionRow[];
  extras: MealOptionRow[];
};

type RestaurantMealsTabProps = {
  restaurantId: number;
  restaurantName: string;
};

type MealFormValidator = FormValidateOrFn<MealFormValues> | undefined;
type MealFormAsyncValidator = FormAsyncValidateOrFn<MealFormValues> | undefined;

type MealFormApi = ReactFormExtendedApi<
  MealFormValues,
  MealFormValidator,
  MealFormValidator,
  MealFormAsyncValidator,
  MealFormValidator,
  MealFormAsyncValidator,
  MealFormValidator,
  MealFormAsyncValidator,
  MealFormValidator,
  MealFormAsyncValidator,
  MealFormAsyncValidator,
  unknown
>;

const defaultMealValues: MealFormValues = {
  name: '',
  about: '',
  cardImage: '',
  available: true,
  stock: undefined,
  price: undefined,
  sizes: [],
  extras: [],
};

function restaurantMealsQueryKey(restaurantId: number) {
  return ['restaurant-meals', restaurantId] as const;
}

function useRestaurantMealsQuery(restaurantId: number) {
  return useQuery({
    queryKey: restaurantMealsQueryKey(restaurantId),
    queryFn: () =>
      mealApi.getAllByRestaurant(restaurantId).then((response) => response.data),
  });
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
  children: ReactNode;
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
  id,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section className="section-card page-section" id={id}>
      <div className="section-card__head">
        <p className="section-card__eyebrow">{eyebrow}</p>
        <h2 className="section-card__title">{title}</h2>
        <p className="section-card__description">{description}</p>
      </div>
      <div className="section-card__body">{children}</div>
    </section>
  );
}

function toMealFormValues(meal?: MealDto | null): MealFormValues {
  if (!meal) {
    return { ...defaultMealValues, sizes: [], extras: [] };
  }

  return {
    id: meal.id,
    name: meal.name ?? '',
    about: meal.about ?? '',
    cardImage: meal.cardImage ?? '',
    available: meal.available ?? true,
    stock: meal.stock,
    price: meal.price,
    sizes: (meal.sizes ?? []).map((size) => ({
      name: size.name ?? '',
      price: size.price,
    })),
    extras: (meal.extras ?? []).map((extra) => ({
      name: extra.name ?? '',
      price: extra.price,
    })),
  };
}

function normalizeOptionRows(rows: MealOptionRow[]): MealSizeDto[] | ExtrasDto[] {
  return rows
    .map((row) => ({
      name: row.name.trim() || undefined,
      price: row.price,
    }))
    .filter((row) => row.name || row.price !== undefined);
}

function normalizeMealPayload(values: MealFormValues): MealDto {
  return {
    id: values.id,
    name: values.name.trim(),
    about: values.about.trim() || undefined,
    cardImage: values.cardImage.trim() || undefined,
    available: values.available,
    stock: values.stock,
    price: values.price ?? 0,
    sizes: normalizeOptionRows(values.sizes) as MealSizeDto[],
    extras: normalizeOptionRows(values.extras) as ExtrasDto[],
  };
}

function mealIsAvailable(meal: MealDto) {
  return meal.available !== false;
}

function getMealOptionCount(meal: MealDto) {
  return (meal.sizes?.length ?? 0) + (meal.extras?.length ?? 0);
}

function formatMealPrice(value?: number) {
  return typeof value === 'number' ? currencyFormatter.format(value) : '—';
}

function getMutationErrorMessage(error: unknown, fallback: string) {
  if (isAxiosError(error)) {
    const payload = error.response?.data;

    if (typeof payload === 'string' && payload.trim()) {
      return payload.trim();
    }

    if (payload && typeof payload === 'object') {
      if ('message' in payload && typeof payload.message === 'string' && payload.message.trim()) {
        return payload.message.trim();
      }

      if ('error' in payload && typeof payload.error === 'string' && payload.error.trim()) {
        return payload.error.trim();
      }
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message.trim();
  }

  return fallback;
}

function RestaurantMealsStatus({
  restaurantId,
  restaurantName,
}: RestaurantMealsTabProps) {
  const { data, isLoading, isError } = useRestaurantMealsQuery(restaurantId);
  const meals = data ?? [];
  const totalMeals = meals.length;
  const availableMeals = meals.filter(mealIsAvailable).length;
  const unavailableMeals = totalMeals - availableMeals;
  const configuredOptions = meals.reduce(
    (sum, meal) => sum + getMealOptionCount(meal),
    0,
  );

  return (
    <>
      <section className="panel page-section">
        <div className="panel__header">
          <p className="section-card__eyebrow">Meals overview</p>
          <h2 className="panel__title">Live meal coverage</h2>
          <p className="panel__description">
            Monitor how the menu for {restaurantName} is distributed across
            availability states and configured options.
          </p>
        </div>

        {isLoading ? (
          <div className="loader-wrap" aria-live="polite">
            <div className="loader" />
            Loading meal metrics…
          </div>
        ) : isError ? (
          <div className="notification notification--error" role="alert">
            <AlertCircleIcon width={18} height={18} />
            Failed to load meal metrics from the API.
          </div>
        ) : (
          <div className="metric-mini-grid">
            <div className="metric-mini">
              <span className="metric-mini__label">Total meals</span>
              <strong>{totalMeals}</strong>
            </div>
            <div className="metric-mini">
              <span className="metric-mini__label">Available</span>
              <strong>{availableMeals}</strong>
            </div>
            <div className="metric-mini">
              <span className="metric-mini__label">Unavailable</span>
              <strong>{unavailableMeals}</strong>
            </div>
            <div className="metric-mini">
              <span className="metric-mini__label">Configured options</span>
              <strong>{configuredOptions}</strong>
            </div>
          </div>
        )}
      </section>

      <section className="panel page-section">
        <div className="panel__header">
          <p className="section-card__eyebrow">Sync target</p>
          <h2 className="panel__title">Backend contract</h2>
          <p className="panel__description">
            Meal CRUD in this tab writes directly to the restaurant-specific
            meal endpoints.
          </p>
        </div>

        <div className="audit-list">
          <div className="audit-row">
            <span>Restaurant</span>
            <strong>{restaurantName}</strong>
          </div>
          <div className="audit-row">
            <span>Restaurant ID</span>
            <strong>#{restaurantId}</strong>
          </div>
          <div className="audit-row">
            <span>Data source</span>
            <strong>/api/meals/{restaurantId}</strong>
          </div>
          <div className="audit-row">
            <span>Image handling</span>
            <strong>URL or asset path</strong>
          </div>
        </div>
      </section>
    </>
  );
}

function MealCollectionFields({
  title,
  description,
  name,
  form,
}: {
  title: string;
  description: string;
  name: 'sizes' | 'extras';
  form: MealFormApi;
}) {
  return (
    <form.Field name={name} mode="array">
      {(field) => (
        <div className="review-stack">
          <div className="section-heading">
            <div>
              <p className="section-card__eyebrow">{title}</p>
              <p className="section-heading__title">{description}</p>
            </div>
            <button
              type="button"
              className="button button--ghost button--compact"
              onClick={() => field.pushValue({ name: '', price: undefined })}
            >
              <PlusIcon width={16} height={16} />
              Add {title.slice(0, -1)}
            </button>
          </div>

          {field.state.value.length === 0 ? (
            <div className="asset-empty">
              No {name} configured yet. Add rows only when this meal needs
              option-level pricing.
            </div>
          ) : (
            field.state.value.map((_: MealOptionRow, index: number) => (
              <article className="nested-card" key={`${name}-${index}`}>
                <div className="array-item">
                  <div className="array-item__body">
                    <div className="form-grid">
                      <form.Field name={`${name}[${index}].name`}>
                        {(optionField) => (
                          <Field
                            label="Name"
                            hint="Customer-facing option label."
                          >
                            <input
                              className="admin-input"
                              value={(optionField.state.value as string) ?? ''}
                              onChange={(event) =>
                                optionField.handleChange(event.target.value)
                              }
                              placeholder={name === 'sizes' ? 'Large' : 'Extra cheese'}
                            />
                          </Field>
                        )}
                      </form.Field>

                      <form.Field name={`${name}[${index}].price`}>
                        {(optionField) => (
                          <Field
                            label="Price"
                            hint="Optional override or add-on price."
                          >
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              className="admin-input"
                              value={(optionField.state.value as number | undefined) ?? ''}
                              onChange={(event) =>
                                optionField.handleChange(
                                  event.target.value
                                    ? Number(event.target.value)
                                    : undefined,
                                )
                              }
                              placeholder="2.50"
                            />
                          </Field>
                        )}
                      </form.Field>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="button button--ghost button--compact array-item__remove"
                    onClick={() => field.removeValue(index)}
                    aria-label={`Remove ${title.slice(0, -1).toLowerCase()} ${index + 1}`}
                  >
                    <TrashIcon width={16} height={16} />
                    Remove
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      )}
    </form.Field>
  );
}

export function RestaurantMealsAside(props: RestaurantMealsTabProps) {
  return <RestaurantMealsStatus {...props} />;
}

export default function RestaurantMealsTab({
  restaurantId,
  restaurantName,
}: RestaurantMealsTabProps) {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] =
    useState<AvailabilityFilter>('all');
  const [editingMealId, setEditingMealId] = useState<number | null>(null);
  const [editorNotice, setEditorNotice] = useState<string | null>(null);
  const [cardImageFile, setCardImageFile] = useState<File | null>(null);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const { data, isLoading, isError } = useRestaurantMealsQuery(restaurantId);
  const meals = data ?? [];

  const form = useForm({
    defaultValues: defaultMealValues,
    onSubmit: ({ value }) => {
      setEditorNotice(null);
      const payload = normalizeMealPayload(value);

      if (!payload.name) {
        setEditorNotice('Meal name is required before saving.');
        return;
      }

      if (value.price === undefined || value.price < 0) {
        setEditorNotice('Meal price is required and must be zero or greater.');
        return;
      }

      if (value.stock !== undefined && value.stock < 0) {
        setEditorNotice('Stock must be zero or greater.');
        return;
      }

      saveMutation.mutate({
        mealId: editingMealId,
        payload,
        file: cardImageFile,
      });
    },
  });

  async function invalidateMealRelatedQueries() {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: restaurantMealsQueryKey(restaurantId),
      }),
      queryClient.invalidateQueries({ queryKey: ['restaurant', restaurantId] }),
      queryClient.invalidateQueries({ queryKey: ['restaurants'] }),
    ]);
  }

  function resetEditor() {
    setEditingMealId(null);
    setEditorNotice(null);
    setCardImageFile(null);
    form.reset({ ...defaultMealValues, sizes: [], extras: [] });
  }

  const saveMutation = useMutation({
    mutationFn: async ({
      mealId,
      payload,
      file,
    }: {
      mealId: number | null;
      payload: MealDto;
      file: File | null;
    }) => {
      if (mealId === null) {
        if (file) {
          await mealApi.createMultipart(restaurantId, payload, file);
        } else {
          await mealApi.create(restaurantId, payload);
        }
        return;
      }

      if (file) {
        await mealApi.updateMultipart(restaurantId, mealId, payload, file);
      } else {
        await mealApi.update(restaurantId, mealId, payload);
      }
    },
    onSuccess: async () => {
      await invalidateMealRelatedQueries();
      resetEditor();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (meal: MealDto) => mealApi.delete(restaurantId, meal.id!),
    onSuccess: async (_response, meal) => {
      await invalidateMealRelatedQueries();

      if (editingMealId === meal.id) {
        resetEditor();
      }
    },
  });

  const filteredMeals = meals.filter((meal) => {
    const matchesAvailability =
      availabilityFilter === 'all'
        ? true
        : availabilityFilter === 'available'
          ? mealIsAvailable(meal)
          : !mealIsAvailable(meal);

    const searchableText = [
      meal.name,
      meal.about ?? '',
      ...(meal.sizes ?? []).map((size) => size.name ?? ''),
      ...(meal.extras ?? []).map((extra) => extra.name ?? ''),
    ]
      .join(' ')
      .toLowerCase();

    return (
      matchesAvailability &&
      (deferredQuery.length === 0 || searchableText.includes(deferredQuery))
    );
  });

  const hasFilters = deferredQuery.length > 0 || availabilityFilter !== 'all';
  const saveErrorMessage = saveMutation.isError
    ? getMutationErrorMessage(saveMutation.error, 'Failed to save the meal.')
    : null;
  const deleteErrorMessage = deleteMutation.isError
    ? getMutationErrorMessage(deleteMutation.error, 'Failed to delete the meal.')
    : null;

  function handleEdit(meal: MealDto) {
    setEditingMealId(meal.id ?? null);
    setEditorNotice(null);
    setCardImageFile(null);
    form.reset(toMealFormValues(meal));
    document.getElementById(mealEditorPanelId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  function handleDelete(meal: MealDto) {
    if (!meal.id) {
      return;
    }

    if (window.confirm(`Delete meal "${meal.name}" from ${restaurantName}?`)) {
      deleteMutation.mutate(meal);
    }
  }

  return (
    <div className="stack">
      <SectionCard
        id={mealEditorPanelId}
        eyebrow="Meal editor"
        title={editingMealId ? 'Edit meal' : 'Create meal'}
        description="Maintain pricing, availability, size options, and extras for the selected restaurant from one structured editor."
      >
        {editorNotice ? (
          <div className="notification notification--error" role="alert" aria-live="polite">
            <AlertCircleIcon width={18} height={18} />
            {editorNotice}
          </div>
        ) : null}

        {saveErrorMessage ? (
          <div className="notification notification--error" role="alert" aria-live="polite">
            <AlertCircleIcon width={18} height={18} />
            {saveErrorMessage}
          </div>
        ) : null}

        <form
          id={mealEditorFormId}
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
          className="stack"
        >
          <div className="form-grid">
            <form.Field
              name="name"
              validators={{
                onBlur: ({ value }) =>
                  value.trim() ? undefined : 'Meal name is required.',
              }}
            >
              {(field) => (
                <Field
                  label="Name"
                  required
                  hint="Use the customer-facing menu title."
                  error={field.state.meta.errors[0]?.toString()}
                >
                  <input
                    className="admin-input"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Truffle pasta"
                  />
                </Field>
              )}
            </form.Field>

            <form.Field
              name="price"
              validators={{
                onBlur: ({ value }) =>
                  value === undefined || value < 0
                    ? 'Price is required and must be zero or greater.'
                    : undefined,
              }}
            >
              {(field) => (
                <Field
                  label="Price"
                  required
                  hint="Base meal price used before size or extra adjustments."
                  error={field.state.meta.errors[0]?.toString()}
                >
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="admin-input"
                    value={field.state.value ?? ''}
                    onBlur={field.handleBlur}
                    onChange={(event) =>
                      field.handleChange(
                        event.target.value ? Number(event.target.value) : undefined,
                      )
                    }
                    placeholder="13.90"
                  />
                </Field>
              )}
            </form.Field>

            <form.Field name="stock">
              {(field) => (
                <Field
                  label="Stock"
                  hint="Leave blank when stock is not explicitly tracked."
                >
                  <input
                    type="number"
                    min="0"
                    className="admin-input"
                    value={field.state.value ?? ''}
                    onChange={(event) =>
                      field.handleChange(
                        event.target.value ? Number(event.target.value) : undefined,
                      )
                    }
                    placeholder="24"
                  />
                </Field>
              )}
            </form.Field>

            <form.Field name="cardImage">
              {(field) => {
                const previewSrc = cardImageFile
                  ? URL.createObjectURL(cardImageFile)
                  : resolveApiAssetUrl(field.state.value) || null;

                return (
                  <Field
                    label="Image"
                    hint="Upload a photo or keep the existing image."
                  >
                    <div className="stack" style={{ gap: '0.5rem' }}>
                      {previewSrc ? (
                        <img
                          src={previewSrc}
                          alt="Meal preview"
                          style={{ height: '120px', width: '120px', objectFit: 'cover', borderRadius: '0.5rem', border: '1px solid var(--color-outline-variant, #ccc)' }}
                        />
                      ) : null}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
                        className="admin-input"
                        onChange={(event) => {
                          setCardImageFile(event.target.files?.[0] ?? null);
                        }}
                      />
                      {cardImageFile ? (
                        <button
                          type="button"
                          className="button button--ghost button--compact"
                          onClick={() => setCardImageFile(null)}
                        >
                          Remove selected file
                        </button>
                      ) : null}
                    </div>
                  </Field>
                );
              }}
            </form.Field>
          </div>

          <form.Field name="about">
            {(field) => (
              <Field
                label="Description"
                hint="Short explanatory copy shown in the menu."
              >
                <textarea
                  rows={4}
                  className="admin-textarea"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Handmade pasta with parmesan cream, shaved truffle, and cracked black pepper."
                />
              </Field>
            )}
          </form.Field>

          <form.Field name="available">
            {(field) => (
              <div className="nested-card">
                <div className="section-heading">
                  <div>
                    <p className="section-card__eyebrow">Availability</p>
                    <p className="section-heading__title">Service state</p>
                    <p className="section-heading__copy">
                      Toggle whether this meal is currently orderable in the
                      menu.
                    </p>
                  </div>

                  <button
                    type="button"
                    className={`filter-chip ${field.state.value ? 'filter-chip--active' : ''}`}
                    onClick={() => field.handleChange(!field.state.value)}
                    aria-pressed={field.state.value}
                  >
                    {field.state.value ? 'Available' : 'Unavailable'}
                  </button>
                </div>
              </div>
            )}
          </form.Field>

          <MealCollectionFields
            title="Sizes"
            description="Optional size-based pricing rows"
            name="sizes"
            form={form}
          />

          <MealCollectionFields
            title="Extras"
            description="Optional add-ons sold with this meal"
            name="extras"
            form={form}
          />

          <div className="cluster">
            <button
              type="submit"
              form={mealEditorFormId}
              disabled={saveMutation.isPending}
              className="button button--primary"
            >
              {saveMutation.isPending ? (
                <>
                  <span className="button__spinner" />
                  Saving
                </>
              ) : editingMealId ? (
                <>
                  <CheckCircleIcon width={18} height={18} />
                  Save changes
                </>
              ) : (
                <>
                  <PlusIcon width={18} height={18} />
                  Create meal
                </>
              )}
            </button>

            {editingMealId ? (
              <button
                type="button"
                onClick={resetEditor}
                className="button button--ghost"
              >
                Cancel edit
              </button>
            ) : null}
          </div>
        </form>
      </SectionCard>

      <SectionCard
        eyebrow="Meal catalog"
        title="Search and manage meals"
        description="Filter the live restaurant menu by availability or matching option text, then update or remove meals from the same tab."
      >
        <div className="toolbar">
          <label className="search-wrap" aria-label="Search meals">
            <SearchIcon width={18} height={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="search-input"
              placeholder="Search by meal, description, size, or extra"
            />
          </label>

          <div className="filter-row" role="group" aria-label="Meal availability filters">
            <button
              type="button"
              className={`filter-chip ${availabilityFilter === 'all' ? 'filter-chip--active' : ''}`}
              onClick={() => setAvailabilityFilter('all')}
            >
              All
            </button>
            <button
              type="button"
              className={`filter-chip ${availabilityFilter === 'available' ? 'filter-chip--active' : ''}`}
              onClick={() => setAvailabilityFilter('available')}
            >
              Available
            </button>
            <button
              type="button"
              className={`filter-chip ${availabilityFilter === 'unavailable' ? 'filter-chip--active' : ''}`}
              onClick={() => setAvailabilityFilter('unavailable')}
            >
              Unavailable
            </button>
          </div>
        </div>

        {deleteErrorMessage ? (
          <div className="notification notification--error" role="alert" aria-live="polite">
            <AlertCircleIcon width={18} height={18} />
            {deleteErrorMessage}
          </div>
        ) : null}

        {isLoading ? (
          <div className="loader-wrap" aria-live="polite">
            <div className="loader" />
            Loading meal records…
          </div>
        ) : null}

        {isError && !isLoading ? (
          <div className="notification notification--error" role="alert">
            <AlertCircleIcon width={18} height={18} />
            Failed to load meals. Confirm the backend is running on port 8080 and try again.
          </div>
        ) : null}

        {!isLoading && !isError ? (
          <>
            <p className="table-meta">
              Showing {filteredMeals.length} of {meals.length} meals for {restaurantName}
            </p>

            {filteredMeals.length === 0 ? (
              <div className="empty-state">
                <div>
                  <p className="empty-state__title">
                    {hasFilters ? 'No matching meals' : 'No meals yet'}
                  </p>
                  <p className="body-copy">
                    {hasFilters
                      ? 'Clear the search or switch the availability filter to widen the visible set.'
                      : 'Create the first meal to connect this restaurant to the live meal API.'}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="table-shell">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Meal</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th>Options</th>
                        <th>Stock</th>
                        <th aria-label="Actions" />
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMeals.map((meal) => {
                        const isDeleting =
                          deleteMutation.isPending &&
                          deleteMutation.variables?.id === meal.id;

                        return (
                          <tr key={meal.id ?? meal.name}>
                            <td>
                              <div className="list-row__copy">
                                <div className="list-row__title-line">
                                  <p className="list-row__title">{meal.name}</p>
                                  {editingMealId === meal.id ? (
                                    <span className="pill pill--accent">
                                      <PencilIcon width={14} height={14} />
                                      Editing
                                    </span>
                                  ) : null}
                                  {meal.cardImage?.trim() ? (
                                    <span className="pill pill--neutral">
                                      <ShieldIcon width={14} height={14} />
                                      Image
                                    </span>
                                  ) : null}
                                </div>
                                <p className="list-row__meta">
                                  {meal.about?.trim() || 'No description added yet.'}
                                </p>
                              </div>
                            </td>
                            <td>{formatMealPrice(meal.price)}</td>
                            <td>
                              <span
                                className={`pill ${
                                  mealIsAvailable(meal)
                                    ? 'pill--success'
                                    : 'pill--neutral'
                                }`}
                              >
                                {mealIsAvailable(meal) ? 'Available' : 'Unavailable'}
                              </span>
                            </td>
                            <td>
                              <div className="list-row__copy">
                                <div className="list-row__title-line">
                                  <span className="pill pill--neutral">
                                    {getMealOptionCount(meal)} total
                                  </span>
                                </div>
                                <p className="list-row__meta">
                                  {meal.sizes?.length ?? 0} sizes • {meal.extras?.length ?? 0} extras
                                </p>
                              </div>
                            </td>
                            <td>{meal.stock ?? '—'}</td>
                            <td>
                              <div className="inline-actions">
                                <button
                                  type="button"
                                  onClick={() => handleEdit(meal)}
                                  className="inline-button"
                                >
                                  <PencilIcon width={16} height={16} />
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDelete(meal)}
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
                  {filteredMeals.map((meal) => {
                    const isDeleting =
                      deleteMutation.isPending &&
                      deleteMutation.variables?.id === meal.id;
                    const previewImage = resolveApiAssetUrl(meal.cardImage);

                    return (
                      <article className="mobile-card" key={meal.id ?? meal.name}>
                        <div className="list-row__copy">
                          <div className="list-row__title-line">
                            <p className="list-row__title">{meal.name}</p>
                            <span
                              className={`pill ${
                                mealIsAvailable(meal)
                                  ? 'pill--success'
                                  : 'pill--neutral'
                              }`}
                            >
                              {mealIsAvailable(meal) ? 'Available' : 'Unavailable'}
                            </span>
                          </div>
                          <p className="list-row__meta">
                            {meal.about?.trim() || 'No description added yet.'}
                          </p>
                        </div>

                        {previewImage ? (
                          <div className="asset-preview">
                            <img
                              className="asset-preview__image"
                              src={previewImage}
                              alt={`${meal.name} preview`}
                            />
                            <div className="asset-preview__meta">
                              <strong>Meal image</strong>
                              <span>{meal.cardImage}</span>
                            </div>
                          </div>
                        ) : null}

                        <div className="mobile-grid">
                          <div>
                            <p className="mobile-card__label field__hint">Price</p>
                            <p className="mobile-card__value">
                              {formatMealPrice(meal.price)}
                            </p>
                          </div>
                          <div>
                            <p className="mobile-card__label field__hint">Stock</p>
                            <p className="mobile-card__value">{meal.stock ?? '—'}</p>
                          </div>
                          <div>
                            <p className="mobile-card__label field__hint">Sizes</p>
                            <p className="mobile-card__value">{meal.sizes?.length ?? 0}</p>
                          </div>
                          <div>
                            <p className="mobile-card__label field__hint">Extras</p>
                            <p className="mobile-card__value">{meal.extras?.length ?? 0}</p>
                          </div>
                        </div>

                        <div className="inline-actions">
                          <button
                            type="button"
                            onClick={() => handleEdit(meal)}
                            className="inline-button"
                          >
                            <PencilIcon width={16} height={16} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(meal)}
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

        {!isLoading && !isError && meals.length > 0 ? (
          <section className="panel">
            <div className="panel__header">
              <p className="section-card__eyebrow">Quick notes</p>
              <h3 className="panel__title">Payload shape reminders</h3>
              <p className="panel__description">
                Empty size and extra rows are dropped before submit. New meals
                are posted as single-item arrays to match the backend create
                endpoint.
              </p>
            </div>

            <div className="cluster">
              <span className="pill pill--neutral">
                <PlateIcon width={14} height={14} />
                Restaurant-linked
              </span>
              <span className="pill pill--neutral">
                <CoinIcon width={14} height={14} />
                Decimal pricing
              </span>
              <span className="pill pill--neutral">
                <NoteIcon width={14} height={14} />
                Array options
              </span>
            </div>
          </section>
        ) : null}
      </SectionCard>
    </div>
  );
}
