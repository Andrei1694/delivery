import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import api from '../api';
import { CheckCircleIcon, ShieldIcon } from '../components/AdminIcons';
import {
  adminModules,
  liveModuleCount,
  plannedModuleCount,
} from '../navigation';

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('admin_token')) {
      void navigate({ to: '/' });
    }
  }, [navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post<{ token: string }>('/auth/login', {
        phone,
        password,
      });

      localStorage.setItem('admin_token', response.data.token);
      void navigate({ to: '/' });
    } catch {
      setError('Invalid credentials. Use an admin account to access the dashboard.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app-frame">
      <div className="login-shell">
        <section className="login-overview page-section">
          <div className="admin-brand">
            <div className="admin-brand__mark">
              <ShieldIcon width={22} height={22} />
            </div>
            <div className="admin-brand__wordmark">
              <p className="admin-brand__caption">Delivery Admin</p>
              <p className="admin-brand__title">Operations Console</p>
            </div>
          </div>

          <div className="login-overview__hero">
            <p className="eyebrow">Protected access</p>
            <h1 className="login-overview__title">
              Sign in to the delivery operations dashboard.
            </h1>
            <p className="page-header__description">
              Dashboard, Restaurants, and Sections are live today. Orders,
              Customers, Analytics, and Settings are already staged in the
              shell for the next rollout.
            </p>
          </div>

          <div className="login-kpi-grid">
            <article className="metric-card">
              <p className="metric-card__label">Live modules</p>
              <p className="metric-card__value">{liveModuleCount}</p>
              <p className="metric-card__note">
                Dashboard, Restaurants, and Sections are ready for daily
                operations.
              </p>
            </article>

            <article className="metric-card">
              <p className="metric-card__label">Planned modules</p>
              <p className="metric-card__value">{plannedModuleCount}</p>
              <p className="metric-card__note">
                Additional modules stay visible so the information architecture
                scales cleanly as APIs arrive.
              </p>
            </article>
          </div>

          <div className="placeholder-grid">
            {adminModules.map((module) => (
              <article
                key={module.key}
                className={`module-card ${module.live ? 'module-card--live' : ''}`}
              >
                <div className="module-card__header">
                  <span className="module-card__icon">
                    <module.icon width={18} height={18} />
                  </span>
                  <div>
                    <p className="module-card__title">{module.label}</p>
                    <p className="module-card__copy">{module.description}</p>
                  </div>
                </div>

                <div className="module-card__footer">
                  <span className={`pill ${module.live ? 'pill--success' : 'pill--neutral'}`}>
                    {module.live ? 'Live' : 'Soon'}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="login-card page-section">
          <div className="panel__header">
            <p className="section-card__eyebrow">Admin sign in</p>
            <h2 className="panel__title">Access your workspace</h2>
            <p className="panel__description">
              Use your admin credentials to enter the protected dashboard and
              manage live restaurant and section data.
            </p>
          </div>

          {error ? (
            <div className="notification notification--error" role="alert" aria-live="polite">
              {error}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="stack">
            <label className="field">
              <span className="field__label">Phone</span>
              <span className="field__hint">Use the phone number linked to your admin account.</span>
              <input
                type="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="admin-input"
                placeholder="+1 555 000 0000"
              />
            </label>

            <label className="field">
              <span className="field__label">Password</span>
              <span className="field__hint">Credentials are validated against the API.</span>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="admin-input"
                placeholder="Enter your password"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="button button--primary"
              style={{ width: '100%' }}
            >
              {loading ? (
                <>
                  <span className="button__spinner" />
                  Signing in
                </>
              ) : (
                <>
                  <CheckCircleIcon width={18} height={18} />
                  Open dashboard
                </>
              )}
            </button>

            <div className="notification notification--info">
              <ShieldIcon width={18} height={18} />
              Unauthorized sessions are redirected to login automatically when
              the API returns `401` or `403`.
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
