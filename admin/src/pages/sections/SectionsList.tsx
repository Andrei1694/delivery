import { useDeferredValue, useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { sectionsApi } from '../../api';
import AdminShell from '../../components/AdminShell';
import {
  AlertCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  NoteIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  TrashIcon,
} from '../../components/AdminIcons';
import type { SectionRequestDto, SectionResponseDto } from '../../types';

const editorFormId = 'section-editor';
const editorPanelId = 'section-editor-panel';

const defaultValues: SectionRequestDto = {
  key: '',
  name: '',
  active: true,
};

const timestampFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

type StatusFilter = 'all' | 'active' | 'inactive';

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

function toFormValues(section?: SectionResponseDto | null): SectionRequestDto {
  return {
    key: section?.key ?? '',
    name: section?.name ?? '',
    active: section?.active ?? true,
  };
}

function normalizeSectionPayload(values: SectionRequestDto): SectionRequestDto {
  return {
    key: values.key.trim(),
    name: values.name.trim(),
    active: Boolean(values.active),
  };
}

function formatTimestamp(value?: string) {
  if (!value) {
    return '—';
  }

  const parsedTimestamp = Date.parse(value);
  if (Number.isNaN(parsedTimestamp)) {
    return '—';
  }

  return timestampFormatter.format(parsedTimestamp);
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

function SectionStatusPanel({
  sections,
  filteredSections,
}: {
  sections: SectionResponseDto[];
  filteredSections: SectionResponseDto[];
}) {
  const activeSections = sections.filter((section) => section.active).length;
  const inactiveSections = sections.length - activeSections;
  const visibleActive = filteredSections.filter((section) => section.active).length;
  const visibleInactive = filteredSections.length - visibleActive;

  return (
    <section className="panel page-section">
      <div className="panel__header">
        <p className="section-card__eyebrow">Status overview</p>
        <h2 className="panel__title">Section coverage</h2>
        <p className="panel__description">
          Track how much of the current taxonomy is active and how much remains
          disabled in the live module.
        </p>
      </div>

      <div className="audit-list">
        <div className="audit-row">
          <span>Total sections</span>
          <strong>{sections.length}</strong>
        </div>
        <div className="audit-row">
          <span>Active records</span>
          <strong>{activeSections}</strong>
        </div>
        <div className="audit-row">
          <span>Inactive records</span>
          <strong>{inactiveSections}</strong>
        </div>
        <div className="audit-row">
          <span>Visible in view</span>
          <strong>{filteredSections.length}</strong>
        </div>
        <div className="audit-row">
          <span>Visible active</span>
          <strong>{visibleActive}</strong>
        </div>
        <div className="audit-row">
          <span>Visible inactive</span>
          <strong>{visibleInactive}</strong>
        </div>
      </div>
    </section>
  );
}

function EditorOverview({
  editingSection,
  values,
  isPending,
}: {
  editingSection: SectionResponseDto | null;
  values: SectionRequestDto;
  isPending: boolean;
}) {
  const normalizedKey = values.key.trim();
  const normalizedName = values.name.trim();
  const completion = [normalizedKey, normalizedName].filter(Boolean).length + 1;

  return (
    <section className="panel page-section">
      <div className="panel__header">
        <p className="section-card__eyebrow">Editor state</p>
        <h2 className="panel__title">
          {editingSection ? 'Editing existing section' : 'Creating new section'}
        </h2>
        <p className="panel__description">
          Review the current draft before saving changes to the sections module.
        </p>
      </div>

      <div className="metric-mini-grid">
        <article className="metric-mini">
          <p className="metric-mini__label">Mode</p>
          <strong>{editingSection ? 'Edit' : 'Create'}</strong>
        </article>
        <article className="metric-mini">
          <p className="metric-mini__label">Status</p>
          <strong>{values.active ? 'Active' : 'Inactive'}</strong>
        </article>
      </div>

      <div className="readiness-bar" aria-hidden="true">
        <div
          className="readiness-bar__value"
          style={{ width: `${Math.round((completion / 3) * 100)}%` }}
        />
      </div>
      <p className="body-copy">
        {isPending
          ? 'Saving changes to the API.'
          : `${Math.round((completion / 3) * 100)}% of the editor checks are ready.`}
      </p>

      <div className="audit-list">
        <div className="audit-row">
          <span>Draft key</span>
          <strong>{normalizedKey || 'Pending'}</strong>
        </div>
        <div className="audit-row">
          <span>Draft name</span>
          <strong>{normalizedName || 'Pending'}</strong>
        </div>
        <div className="audit-row">
          <span>Record status</span>
          <strong>{values.active ? 'Live' : 'Paused'}</strong>
        </div>
        <div className="audit-row">
          <span>Last updated</span>
          <strong>{editingSection ? formatTimestamp(editingSection.updatedAt) : 'Not saved yet'}</strong>
        </div>
      </div>
    </section>
  );
}

export default function SectionsList() {
  const queryClient = useQueryClient();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [editingSection, setEditingSection] = useState<SectionResponseDto | null>(null);
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const { data, isLoading, isError } = useQuery({
    queryKey: ['sections'],
    queryFn: () => sectionsApi.getAll().then((response) => response.data),
  });

  const form = useForm({
    defaultValues,
    onSubmit: ({ value }) => {
      saveMutation.mutate(normalizeSectionPayload(value));
    },
  });

  const saveMutation = useMutation({
    mutationFn: (payload: SectionRequestDto) =>
      editingSection
        ? sectionsApi.update(editingSection.id, payload)
        : sectionsApi.create(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['sections'] });
      resetEditor();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (sectionId: number) => sectionsApi.delete(sectionId),
    onSuccess: async (_, deletedSectionId) => {
      await queryClient.invalidateQueries({ queryKey: ['sections'] });

      if (editingSection?.id === deletedSectionId) {
        resetEditor();
      }
    },
  });

  const sections = [...(data ?? [])].sort((left, right) => {
    const leftUpdatedAt = Number.isNaN(Date.parse(left.updatedAt))
      ? 0
      : Date.parse(left.updatedAt);
    const rightUpdatedAt = Number.isNaN(Date.parse(right.updatedAt))
      ? 0
      : Date.parse(right.updatedAt);

    if (leftUpdatedAt !== rightUpdatedAt) {
      return rightUpdatedAt - leftUpdatedAt;
    }

    return left.name.localeCompare(right.name);
  });

  const filteredSections = sections.filter((section) => {
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && section.active) ||
      (statusFilter === 'inactive' && !section.active);
    const searchableText = `${section.name} ${section.key}`.toLowerCase();

    return (
      matchesStatus &&
      (deferredQuery.length === 0 || searchableText.includes(deferredQuery))
    );
  });

  const totalSections = sections.length;
  const activeSections = sections.filter((section) => section.active).length;
  const inactiveSections = totalSections - activeSections;
  const visibleActive = filteredSections.filter((section) => section.active).length;
  const visibleInactive = filteredSections.length - visibleActive;
  const hasFilters = deferredQuery.length > 0 || statusFilter !== 'all';

  const saveErrorMessage = saveMutation.isError
    ? getMutationErrorMessage(
        saveMutation.error,
        editingSection
          ? 'Failed to save changes. Review the fields and try again.'
          : 'Failed to create the section. Review the fields and try again.',
      )
    : '';

  const deleteErrorMessage = deleteMutation.isError
    ? getMutationErrorMessage(
        deleteMutation.error,
        'The section could not be deleted. Refresh the list and try again.',
      )
    : '';

  function focusEditor() {
    document.getElementById(editorPanelId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  function resetEditor() {
    setEditingSection(null);
    form.reset(defaultValues);
  }

  function handleStartCreate() {
    resetEditor();
    focusEditor();
  }

  function handleEdit(section: SectionResponseDto) {
    setEditingSection(section);
    form.reset(toFormValues(section));
    focusEditor();
  }

  function handleDelete(section: SectionResponseDto) {
    if (window.confirm(`Delete "${section.name}"?`)) {
      deleteMutation.mutate(section.id);
    }
  }

  return (
    <AdminShell
      activeModule="sections"
      eyebrow="Sections module"
      title="Sections"
      description="Manage the section taxonomy, review status coverage, and keep the admin catalog structure aligned from one focused workspace."
      actions={
        <button
          type="button"
          onClick={handleStartCreate}
          className="button button--primary"
        >
          <PlusIcon width={18} height={18} />
          {editingSection ? 'New section' : 'Create section'}
        </button>
      }
      aside={
        <>
          <SectionStatusPanel
            sections={sections}
            filteredSections={filteredSections}
          />
          <form.Subscribe selector={(state) => state.values}>
            {(values) => (
              <EditorOverview
                editingSection={editingSection}
                values={values}
                isPending={saveMutation.isPending}
              />
            )}
          </form.Subscribe>
        </>
      }
      railStats={[
        { label: 'Visible', value: `${filteredSections.length}` },
        { label: 'Active', value: `${visibleActive}` },
        { label: 'Inactive', value: `${visibleInactive}` },
      ]}
    >
      <section className="stats-grid">
        <article className="metric-card page-section">
          <span className="metric-card__icon">
            <NoteIcon width={18} height={18} />
          </span>
          <p className="metric-card__label">Total sections</p>
          <p className="metric-card__value">{totalSections}</p>
          <p className="metric-card__note">
            Complete number of section records available in the admin module.
          </p>
        </article>

        <article className="metric-card page-section">
          <span className="metric-card__icon">
            <CheckCircleIcon width={18} height={18} />
          </span>
          <p className="metric-card__label">Active sections</p>
          <p className="metric-card__value">{activeSections}</p>
          <p className="metric-card__note">
            Records currently marked active in the backend taxonomy.
          </p>
        </article>

        <article className="metric-card page-section">
          <span className="metric-card__icon">
            <AlertCircleIcon width={18} height={18} />
          </span>
          <p className="metric-card__label">Inactive sections</p>
          <p className="metric-card__value">{inactiveSections}</p>
          <p className="metric-card__note">
            Records kept on file but currently excluded from the live set.
          </p>
        </article>

        <article className="metric-card metric-card--accent page-section">
          <span className="metric-card__icon">
            <ClockIcon width={18} height={18} />
          </span>
          <p className="metric-card__label">Last update</p>
          <p className="metric-card__value">
            {sections[0]?.updatedAt ? formatTimestamp(sections[0].updatedAt) : '—'}
          </p>
          <p className="metric-card__note">
            Most recent section change currently visible from the API dataset.
          </p>
        </article>
      </section>

      <section className="section-card page-section" id={editorPanelId}>
        <div className="section-card__head">
          <p className="section-card__eyebrow">
            {editingSection ? 'Update record' : 'Create record'}
          </p>
          <h2 className="section-card__title">
            {editingSection ? 'Edit section' : 'Create a new section'}
          </h2>
          <p className="section-card__description">
            Maintain a clean section key, a clear operator-facing name, and the
            active state from the same inline editor.
          </p>
        </div>

        {saveMutation.isError ? (
          <div className="notification notification--error" role="alert" aria-live="polite">
            <AlertCircleIcon width={18} height={18} />
            {saveErrorMessage}
          </div>
        ) : null}

        <form
          id={editorFormId}
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
          className="stack"
        >
          <div className="form-grid">
            <form.Field
              name="key"
              validators={{
                onBlur: ({ value }) =>
                  value.trim() ? undefined : 'Section key is required.',
              }}
            >
              {(field) => (
                <Field
                  label="Key"
                  required
                  hint="Stable identifier used by the backend and downstream clients."
                  error={field.state.meta.errors[0]?.toString()}
                >
                  <input
                    className="admin-input"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="featured"
                  />
                </Field>
              )}
            </form.Field>

            <form.Field
              name="name"
              validators={{
                onBlur: ({ value }) =>
                  value.trim() ? undefined : 'Section name is required.',
              }}
            >
              {(field) => (
                <Field
                  label="Name"
                  required
                  hint="Operator-facing label shown across the admin workspace."
                  error={field.state.meta.errors[0]?.toString()}
                >
                  <input
                    className="admin-input"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Featured"
                  />
                </Field>
              )}
            </form.Field>
          </div>

          <form.Field name="active">
            {(field) => (
              <div className="field">
                <span className="field__label">Status</span>
                <span className="field__hint">
                  Switch between an active live section and an inactive stored
                  section without deleting the record.
                </span>
                <div className="filter-row" role="group" aria-label="Section status">
                  <button
                    type="button"
                    className={`filter-chip ${field.state.value ? 'filter-chip--active' : ''}`}
                    onClick={() => field.handleChange(true)}
                  >
                    Active
                  </button>
                  <button
                    type="button"
                    className={`filter-chip ${!field.state.value ? 'filter-chip--active' : ''}`}
                    onClick={() => field.handleChange(false)}
                  >
                    Inactive
                  </button>
                </div>
              </div>
            )}
          </form.Field>

          <div className="cluster">
            <button
              type="submit"
              disabled={saveMutation.isPending}
              className="button button--primary"
            >
              {saveMutation.isPending ? (
                <>
                  <span className="button__spinner" />
                  Saving
                </>
              ) : editingSection ? (
                <>
                  <CheckCircleIcon width={18} height={18} />
                  Save changes
                </>
              ) : (
                <>
                  <PlusIcon width={18} height={18} />
                  Create section
                </>
              )}
            </button>

            {editingSection ? (
              <button
                type="button"
                onClick={handleStartCreate}
                className="button button--ghost"
              >
                Cancel edit
              </button>
            ) : null}
          </div>
        </form>
      </section>

      <SectionCard
        eyebrow="Module table"
        title="Search and manage sections"
        description="Filter by status or keyword, then update or remove section records from the same operational surface."
      >
        <div className="toolbar">
          <label className="search-wrap" aria-label="Search sections">
            <SearchIcon width={18} height={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="search-input"
              placeholder="Search by name or key"
            />
          </label>

          <div className="filter-row" aria-label="Section status filters">
            <button
              type="button"
              className={`filter-chip ${statusFilter === 'all' ? 'filter-chip--active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              All sections
            </button>
            <button
              type="button"
              className={`filter-chip ${statusFilter === 'active' ? 'filter-chip--active' : ''}`}
              onClick={() => setStatusFilter('active')}
            >
              Active
            </button>
            <button
              type="button"
              className={`filter-chip ${statusFilter === 'inactive' ? 'filter-chip--active' : ''}`}
              onClick={() => setStatusFilter('inactive')}
            >
              Inactive
            </button>
          </div>
        </div>

        {deleteMutation.isError ? (
          <div className="notification notification--error" role="alert" aria-live="polite">
            <AlertCircleIcon width={18} height={18} />
            {deleteErrorMessage}
          </div>
        ) : null}

        {isLoading ? (
          <div className="loader-wrap" aria-live="polite">
            <div className="loader" />
            Loading section records…
          </div>
        ) : null}

        {isError && !isLoading ? (
          <div className="notification notification--error" role="alert">
            <AlertCircleIcon width={18} height={18} />
            Failed to load sections. Confirm the backend is running on port 8080
            and try again.
          </div>
        ) : null}

        {!isLoading && !isError ? (
          <>
            <p className="table-meta">
              Showing {filteredSections.length} of {totalSections} sections
            </p>

            {filteredSections.length === 0 ? (
              <div className="empty-state">
                <div>
                  <p className="empty-state__title">
                    {hasFilters ? 'No matching sections' : 'No sections yet'}
                  </p>
                  <p className="body-copy">
                    {hasFilters
                      ? 'Clear the current search or switch the status filter to widen the visible set.'
                      : 'Create the first section to start building the admin taxonomy.'}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="table-shell">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Key</th>
                        <th>Status</th>
                        <th>Updated</th>
                        <th aria-label="Actions" />
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSections.map((section) => {
                        const isDeleting =
                          deleteMutation.isPending &&
                          deleteMutation.variables === section.id;

                        return (
                          <tr key={section.id}>
                            <td>
                              <div className="list-row__copy">
                                <div className="list-row__title-line">
                                  <p className="list-row__title">{section.name}</p>
                                  {editingSection?.id === section.id ? (
                                    <span className="pill pill--accent">
                                      <PencilIcon width={14} height={14} />
                                      Editing
                                    </span>
                                  ) : null}
                                </div>
                                <p className="list-row__meta">
                                  Section ID #{section.id}
                                </p>
                              </div>
                            </td>
                            <td>
                              <span className="pill pill--neutral">{section.key}</span>
                            </td>
                            <td>
                              <span
                                className={`pill ${
                                  section.active ? 'pill--success' : 'pill--neutral'
                                }`}
                              >
                                {section.active ? 'Active' : 'Inactive'}
                              </span>
                            </td>
                            <td>{formatTimestamp(section.updatedAt)}</td>
                            <td>
                              <div className="inline-actions">
                                <button
                                  type="button"
                                  onClick={() => handleEdit(section)}
                                  className="inline-button"
                                >
                                  <PencilIcon width={16} height={16} />
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDelete(section)}
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
                  {filteredSections.map((section) => {
                    const isDeleting =
                      deleteMutation.isPending &&
                      deleteMutation.variables === section.id;

                    return (
                      <article className="mobile-card" key={section.id}>
                        <div className="list-row__copy">
                          <div className="list-row__title-line">
                            <p className="list-row__title">{section.name}</p>
                            <span
                              className={`pill ${
                                section.active ? 'pill--success' : 'pill--neutral'
                              }`}
                            >
                              {section.active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <p className="list-row__meta">Key: {section.key}</p>
                        </div>

                        <div className="mobile-grid">
                          <div>
                            <p className="mobile-card__label field__hint">Identifier</p>
                            <p className="mobile-card__value">#{section.id}</p>
                          </div>
                          <div>
                            <p className="mobile-card__label field__hint">Updated</p>
                            <p className="mobile-card__value">
                              {formatTimestamp(section.updatedAt)}
                            </p>
                          </div>
                        </div>

                        <div className="inline-actions">
                          <button
                            type="button"
                            onClick={() => handleEdit(section)}
                            className="inline-button"
                          >
                            <PencilIcon width={16} height={16} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(section)}
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
      </SectionCard>
    </AdminShell>
  );
}
