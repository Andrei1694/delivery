import type { ReactNode } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { GridIcon, LogoutIcon, PlateIcon, SparkIcon } from './AdminIcons';
import {
  adminModules,
  liveModuleCount,
  plannedModuleCount,
  type AdminModuleKey,
} from '../navigation';

interface RailStat {
  label: string;
  value: string;
}

interface AdminShellProps {
  activeModule: AdminModuleKey;
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
  aside?: ReactNode;
  railStats?: RailStat[];
}

export default function AdminShell({
  activeModule,
  eyebrow,
  title,
  description,
  actions,
  children,
  aside,
  railStats = [],
}: AdminShellProps) {
  const navigate = useNavigate();
  const todayLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  function handleLogout() {
    localStorage.removeItem('admin_token');
    void navigate({ to: '/login' });
  }

  return (
    <div className="app-frame">
      <a className="skip-link" href="#admin-main">
        Skip to content
      </a>

      <div className="admin-shell">
        <aside className="admin-rail page-section" aria-label="Admin navigation">
          <div className="admin-rail__top">
            <Link to="/" className="admin-brand">
              <div className="admin-brand__mark">
                <PlateIcon width={22} height={22} />
              </div>
              <div className="admin-brand__wordmark">
                <p className="admin-brand__caption">Delivery Admin</p>
                <p className="admin-brand__title">Operations Console</p>
              </div>
            </Link>

            <p className="body-copy">
              Monitor module readiness, manage the restaurant catalog and
              taxonomy, and stage the next operational surfaces from one
              dashboard.
            </p>

            <div className="nav-group">
              <p className="nav-group__title">Modules</p>
              <nav className="nav-list">
                {adminModules.map((module) => {
                  const icon = <module.icon width={18} height={18} />;
                  const classes = [
                    'nav-item',
                    module.key === activeModule ? 'nav-item--active' : '',
                    module.live ? '' : 'nav-item--disabled',
                  ]
                    .filter(Boolean)
                    .join(' ');

                  if (module.live && module.to) {
                    return (
                      <Link key={module.key} to={module.to} className={classes}>
                        <span className="nav-item__icon">{icon}</span>
                        <span className="nav-item__copy">
                          <span className="nav-item__label">{module.label}</span>
                          <span className="nav-item__description">
                            {module.description}
                          </span>
                        </span>
                      </Link>
                    );
                  }

                  return (
                    <button
                      key={module.key}
                      type="button"
                      disabled
                      className={classes}
                      aria-label={`${module.label} module coming soon`}
                    >
                      <span className="nav-item__icon">{icon}</span>
                      <span className="nav-item__copy">
                        <span className="nav-item__label">{module.label}</span>
                        <span className="nav-item__description">
                          {module.description}
                        </span>
                      </span>
                      <span className="nav-item__badge">Soon</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          <div className="admin-rail__bottom">
            <section className="rail-note">
              <span className="pill pill--accent">
                <SparkIcon width={14} height={14} />
                Secure workspace
              </span>

              <div className="rail-note__rows">
                <div className="rail-stat">
                  <span className="rail-stat__label">Live modules</span>
                  <span className="rail-stat__value">{liveModuleCount}</span>
                </div>
                <div className="rail-stat">
                  <span className="rail-stat__label">Planned modules</span>
                  <span className="rail-stat__value">{plannedModuleCount}</span>
                </div>
              </div>

              <p className="body-copy">
                Dashboard, Restaurants, and Sections are live today. Orders,
                Customers, Analytics, and Settings remain visible to establish
                the full dashboard structure.
              </p>
            </section>

            {railStats.length > 0 ? (
              <section className="rail-note rail-note--compact">
                <div className="module-card__header">
                  <span className="module-card__icon">
                    <GridIcon width={16} height={16} />
                  </span>
                  <div>
                    <p className="module-card__title">Current view</p>
                    <p className="module-card__copy">
                      Quick numbers for the active module.
                    </p>
                  </div>
                </div>

                <div className="rail-note__rows">
                  {railStats.map((stat) => (
                    <div className="rail-stat" key={stat.label}>
                      <span className="rail-stat__label">{stat.label}</span>
                      <span className="rail-stat__value">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            <button
              type="button"
              className="button button--ghost"
              onClick={handleLogout}
            >
              <LogoutIcon width={18} height={18} />
              Sign out
            </button>
          </div>
        </aside>

        <div className="admin-workspace">
          <header className="admin-topbar page-section">
            <div className="admin-topbar__crumbs">
              <span>Operations Console</span>
              <span className="admin-topbar__divider">/</span>
              <span>{title}</span>
            </div>

            <div className="admin-topbar__meta">
              <span className="topbar-chip">Protected session</span>
              <span className="topbar-chip">{todayLabel}</span>
            </div>
          </header>

          <section className="page-header page-section">
            <div className="page-header__content">
              <p className="eyebrow">{eyebrow}</p>
              <h1 className="page-header__title">{title}</h1>
              <p className="page-header__description">{description}</p>
            </div>

            {actions ? <div className="page-header__actions">{actions}</div> : null}
          </section>

          {aside ? (
            <div className="content-columns">
              <main id="admin-main" className="content-stack">
                {children}
              </main>
              <aside className="sidebar-stack">{aside}</aside>
            </div>
          ) : (
            <main id="admin-main" className="content-stack">
              {children}
            </main>
          )}
        </div>
      </div>
    </div>
  );
}
