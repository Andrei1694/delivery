import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../auth/AuthContext';
import InputField from '../components/InputField';
import PageHeader from '../components/PageHeader';
import SymbolIcon from '../components/SymbolIcon';
import Toast from '../components/Toast';
import { useToast } from '../components/useToast';
import api from '../requests';

const PREFERENCE_STORAGE_KEY = 'account-settings-preferences';

const FALLBACK_PROFILE = {
  firstName: 'Elena',
  lastName: 'Verve',
  email: 'elena@kitchen.com',
  phone: '+1 (555) 012-3456',
  address: '124 Park Ave, Apt 6B',
  bio: 'Curating weeknight comfort orders, late-night desserts, and Sunday brunch staples.',
};

const DEFAULT_PREFERENCES = {
  orderUpdates: true,
  promotions: true,
  newsletter: false,
};

const EDITABLE_FIELDS = ['firstName', 'lastName', 'phone', 'address', 'bio'];

function buildProfileForm(user) {
  const userProfile = user?.userProfile ?? {};

  return {
    firstName: userProfile.firstName ?? FALLBACK_PROFILE.firstName,
    lastName: userProfile.lastName ?? FALLBACK_PROFILE.lastName,
    email: user?.email ?? FALLBACK_PROFILE.email,
    phone: userProfile.telefon ?? FALLBACK_PROFILE.phone,
    address: userProfile.address ?? FALLBACK_PROFILE.address,
    bio: userProfile.bio ?? FALLBACK_PROFILE.bio,
  };
}

function readStoredPreferences() {
  if (typeof window === 'undefined') {
    return { ...DEFAULT_PREFERENCES };
  }

  try {
    const savedPreferences = window.localStorage.getItem(PREFERENCE_STORAGE_KEY);
    if (!savedPreferences) {
      return { ...DEFAULT_PREFERENCES };
    }

    return {
      ...DEFAULT_PREFERENCES,
      ...JSON.parse(savedPreferences),
    };
  } catch {
    return { ...DEFAULT_PREFERENCES };
  }
}

function storePreferences(preferences) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(PREFERENCE_STORAGE_KEY, JSON.stringify(preferences));
  } catch {
    // Ignore storage failures and keep preferences in memory for the current session.
  }
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="px-1">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-on-surface-variant">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-headline text-2xl font-bold tracking-tight text-on-surface">
        {title}
      </h2>
      <p className="mt-1 text-sm font-medium text-on-surface-variant">
        {description}
      </p>
    </div>
  );
}

function OverviewMetric({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-surface-container-lowest p-4">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <SymbolIcon name={icon} />
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
        {label}
      </p>
      <p className="mt-1 font-headline text-lg font-bold text-on-surface">
        {value}
      </p>
    </div>
  );
}

function PreferenceRow({ icon, title, description, enabled, onToggle }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-surface-container-lowest p-4">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-container-high text-primary">
          <SymbolIcon name={icon} />
        </div>

        <div>
          <p className="font-headline font-bold text-on-surface">{title}</p>
          <p className="mt-1 text-sm text-on-surface-variant">{description}</p>
        </div>
      </div>

      <button
        aria-checked={enabled}
        aria-label={title}
        className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition-colors ${
          enabled ? 'bg-primary' : 'bg-outline-variant/40'
        }`}
        role="switch"
        type="button"
        onClick={onToggle}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
}

function ActionRow({
  icon,
  title,
  description,
  onClick,
  label,
  destructive = false,
  disabled = false,
}) {
  return (
    <button
      className={`flex w-full items-center justify-between gap-4 rounded-2xl p-4 text-left transition-colors ${
        destructive
          ? 'bg-error/6 text-error hover:bg-error/10'
          : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
      } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
            destructive
              ? 'bg-error/10 text-error'
              : 'bg-surface-container-high text-primary'
          }`}
        >
          <SymbolIcon name={icon} />
        </div>

        <div>
          <p className={`font-headline font-bold ${destructive ? 'text-error' : 'text-on-surface'}`}>
            {title}
          </p>
          <p className={`mt-1 text-sm ${destructive ? 'text-error/80' : 'text-on-surface-variant'}`}>
            {description}
          </p>
        </div>
      </div>

      <span className="text-xs font-bold uppercase tracking-[0.18em] text-current/70">
        {label}
      </span>
    </button>
  );
}

export default function AccountSettings() {
  const navigate = useNavigate();
  const { user, logout, refreshUser } = useAuth();
  const toast = useToast();
  const [toastMessage, setToastMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [savedProfile, setSavedProfile] = useState(() => buildProfileForm(user));
  const [profile, setProfile] = useState(() => buildProfileForm(user));
  const [savedPreferences, setSavedPreferences] = useState(() => readStoredPreferences());
  const [preferences, setPreferences] = useState(() => readStoredPreferences());

  useEffect(() => {
    const nextProfile = buildProfileForm(user);
    setSavedProfile(nextProfile);
    setProfile(nextProfile);
  }, [user]);

  const hasProfileChanges = EDITABLE_FIELDS.some((field) => profile[field] !== savedProfile[field]);
  const hasPreferenceChanges = Object.keys(DEFAULT_PREFERENCES).some(
    (key) => preferences[key] !== savedPreferences[key],
  );
  const hasChanges = hasProfileChanges || hasPreferenceChanges;
  const fullName = `${profile.firstName} ${profile.lastName}`.trim();
  const initials = `${profile.firstName?.[0] ?? ''}${profile.lastName?.[0] ?? ''}`.toUpperCase();
  const loyaltyLabel = user?.currentLevel ? `Level ${user.currentLevel}` : 'Gold Gourmet';
  const referralCode = user?.code ?? 'TASTE-24';

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  };

  const handlePreferenceToggle = (key) => {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const handleSave = async () => {
    setError('');
    setIsSaving(true);

    try {
      if (user?.id) {
        await api.put(`/users/${user.id}/profile`, {
          firstName: profile.firstName.trim(),
          lastName: profile.lastName.trim(),
          telefon: profile.phone.trim(),
          address: profile.address.trim(),
          bio: profile.bio.trim(),
        });

        const refreshedUser = await refreshUser();
        const refreshedProfile = buildProfileForm(refreshedUser ?? user);
        setSavedProfile(refreshedProfile);
        setProfile(refreshedProfile);
      } else {
        setSavedProfile({ ...profile });
      }

      storePreferences(preferences);
      setSavedPreferences({ ...preferences });
      setToastMessage('Settings updated.');
      toast.show();
    } catch {
      setError('We could not save your settings right now. Try again in a moment.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    navigate({ to: '/login' });
  };

  return (
    <>
      <style>
        {`
          .ambient-shadow {
            box-shadow: 0 8px 24px rgba(78, 33, 33, 0.06);
          }
        `}
      </style>

      <div
        className="bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container"
        style={{ minHeight: 'max(884px, 100dvh)' }}
      >
        <PageHeader
          title="Account Settings"
          onBack={() => window.history.back()}
        />

        <main className="mx-auto max-w-lg space-y-8 px-6 pb-40 pt-24">
          <section className="ambient-shadow overflow-hidden rounded-[2rem] border border-outline/10 bg-gradient-to-br from-surface-container-low to-surface-container p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-[1.75rem] bg-primary text-xl font-headline font-extrabold text-white shadow-[0_8px_24px_rgba(172,44,0,0.24)]">
                {initials || 'VK'}
              </div>

              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-on-surface-variant">
                  Profile Summary
                </p>
                <h1 className="mt-2 font-headline text-3xl font-extrabold tracking-tight text-on-surface">
                  {fullName}
                </h1>
                <p className="mt-1 text-sm font-medium text-on-surface-variant">
                  {profile.email}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <OverviewMetric icon="stars" label="Loyalty" value={loyaltyLabel} />
              <OverviewMetric icon="redeem" label="Referral" value={referralCode} />
            </div>
          </section>

          <section className="space-y-4">
            <SectionHeading
              eyebrow="Profile"
              title="Personal Details"
              description="Keep your delivery identity and contact information up to date."
            />

            <div className="ambient-shadow space-y-5 rounded-[2rem] border border-outline/10 bg-surface-container-low p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  placeholder="First name"
                  type="text"
                  value={profile.firstName}
                  onChange={handleFieldChange}
                />
                <InputField
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  placeholder="Last name"
                  type="text"
                  value={profile.lastName}
                  onChange={handleFieldChange}
                />
              </div>

              <div className="grid gap-4">
                <InputField
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  type="tel"
                  value={profile.phone}
                  onChange={handleFieldChange}
                />
                <InputField
                  id="address"
                  label="Default Address"
                  name="address"
                  placeholder="Street, building, apartment"
                  type="text"
                  value={profile.address}
                  onChange={handleFieldChange}
                />
              </div>

              <div>
                <label
                  className="mb-1.5 ml-1 block text-sm font-medium text-on-surface"
                  htmlFor="bio"
                >
                  Bio
                </label>
                <textarea
                  className="block min-h-28 w-full resize-none rounded-2xl border border-outline-variant bg-surface-container-lowest px-4 py-3 leading-6 text-on-surface placeholder:text-on-surface-variant/70 transition duration-200 ease-in-out focus:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-sm"
                  id="bio"
                  name="bio"
                  placeholder="Tell us what your ideal order night looks like."
                  value={profile.bio}
                  onChange={handleFieldChange}
                />
                <p className="ml-1 mt-1 text-sm text-on-surface-variant">
                  This keeps your profile pages and future recommendations feeling personal.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <SectionHeading
              eyebrow="Notifications"
              title="Communication Preferences"
              description="Choose which updates reach you first when an order is in motion."
            />

            <div className="ambient-shadow space-y-3 rounded-[2rem] border border-outline/10 bg-surface-container-low p-3">
              <PreferenceRow
                description="Delivery progress, driver status, and handoff changes."
                enabled={preferences.orderUpdates}
                icon="notifications_active"
                title="Order updates"
                onToggle={() => handlePreferenceToggle('orderUpdates')}
              />
              <PreferenceRow
                description="Limited offers, seasonal drops, and chef-curated bundles."
                enabled={preferences.promotions}
                icon="local_offer"
                title="Promotions"
                onToggle={() => handlePreferenceToggle('promotions')}
              />
              <PreferenceRow
                description="Occasional product notes and editorial food picks."
                enabled={preferences.newsletter}
                icon="newspaper"
                title="Newsletter"
                onToggle={() => handlePreferenceToggle('newsletter')}
              />
            </div>
          </section>

          <section className="space-y-4">
            <SectionHeading
              eyebrow="Security"
              title="Access & Session"
              description="The essentials for sign-in security without a detached mock navigation."
            />

            <div className="ambient-shadow space-y-3 rounded-[2rem] border border-outline/10 bg-surface-container-low p-3">
              <div className="rounded-2xl bg-surface-container-lowest p-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-container-high text-primary">
                    <SymbolIcon name="mail" />
                  </div>

                  <div>
                    <p className="font-headline font-bold text-on-surface">Sign-in Email</p>
                    <p className="mt-1 text-sm text-on-surface-variant">{profile.email}</p>
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-on-surface-variant/70">
                      Managed separately for account security
                    </p>
                  </div>
                </div>
              </div>

              <ActionRow
                description="End the current session and return to the login screen."
                icon="logout"
                label="Now"
                title="Sign out"
                onClick={handleSignOut}
              />
            </div>
          </section>

          <section className="space-y-4">
            <SectionHeading
              eyebrow="Danger"
              title="Sensitive Actions"
              description="Deletion is intentionally blocked until the verification flow is designed."
            />

            <div className="ambient-shadow rounded-[2rem] border border-error/15 bg-error/5 p-3">
              <ActionRow
                description="This stays disabled until we add a dedicated verified deletion flow."
                destructive
                disabled
                icon="delete"
                label="Soon"
                title="Delete account"
              />
            </div>
          </section>
        </main>

        <Toast fading={toast.fading} visible={toast.visible}>
          <div className="rounded-2xl bg-primary px-5 py-4 text-sm font-bold text-white shadow-[0_10px_30px_rgba(172,44,0,0.28)]">
            {toastMessage}
          </div>
        </Toast>

        <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-surface via-surface/95 to-transparent p-6">
          <div className="mx-auto max-w-lg">
            {error ? (
              <p className="mb-3 rounded-2xl bg-error-container px-4 py-3 text-sm font-medium text-on-error-container">
                {error}
              </p>
            ) : null}

            <button
              className={`flex w-full items-center justify-center gap-3 rounded-full py-4 font-headline text-lg font-bold text-white shadow-[0_8px_24px_rgba(172,44,0,0.22)] transition-all ${
                hasChanges && !isSaving
                  ? 'bg-gradient-to-br from-primary to-primary-container active:scale-95'
                  : 'cursor-not-allowed bg-outline/40 shadow-none'
              }`}
              disabled={!hasChanges || isSaving}
              type="button"
              onClick={handleSave}
            >
              <SymbolIcon name="save" />
              <span>{isSaving ? 'Saving Changes...' : hasChanges ? 'Save Changes' : 'Saved'}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
