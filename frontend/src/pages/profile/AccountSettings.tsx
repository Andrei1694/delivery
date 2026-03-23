import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../auth/AuthContext';
import InputField from '../../components/InputField';
import PageHeader from '../../components/PageHeader';
import SymbolIcon from '../../components/SymbolIcon';
import Toast from '../../components/Toast';
import { useToast } from '../../components/useToast';
import api from '../../requests';

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
      <p className="mt-1 max-w-md text-sm font-medium leading-relaxed text-on-surface-variant">
        {description}
      </p>
    </div>
  );
}

function OverviewMetric({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-surface-container-lowest p-4 min-[360px]:block">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary min-[360px]:mb-3">
        <SymbolIcon name={icon} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-variant">
          {label}
        </p>
        <p className="mt-1 font-headline text-base font-bold leading-tight text-on-surface min-[360px]:text-lg">
          {value}
        </p>
      </div>
    </div>
  );
}

function PreferenceRow({ icon, title, description, enabled, onToggle }) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-surface-container-lowest p-4 min-[360px]:flex-row min-[360px]:items-center min-[360px]:justify-between">
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-container-high text-primary">
          <SymbolIcon name={icon} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="font-headline font-bold text-on-surface">{title}</p>
          <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">{description}</p>
        </div>
      </div>

      <button
        aria-checked={enabled}
        aria-label={title}
        className={`relative inline-flex h-7 w-12 flex-shrink-0 self-end items-center rounded-full transition-colors min-[360px]:self-center ${
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
      className={`flex w-full flex-col items-start gap-4 rounded-2xl p-4 text-left transition-colors min-[360px]:flex-row min-[360px]:items-center min-[360px]:justify-between ${
        destructive
          ? 'bg-error/6 text-error hover:bg-error/10 active:bg-error/14'
          : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container active:bg-surface-container-high'
      } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
            destructive
              ? 'bg-error/10 text-error'
              : 'bg-surface-container-high text-primary'
          }`}
        >
          <SymbolIcon name={icon} />
        </div>

        <div className="min-w-0 flex-1">
          <p className={`font-headline font-bold ${destructive ? 'text-error' : 'text-on-surface'}`}>
            {title}
          </p>
          <p className={`mt-1 text-sm leading-relaxed ${destructive ? 'text-error/80' : 'text-on-surface-variant'}`}>
            {description}
          </p>
        </div>
      </div>

      <span className="inline-flex flex-shrink-0 self-end rounded-full bg-current/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-current/70 min-[360px]:self-center">
        {label}
      </span>
    </button>
  );
}

const DEFAULT_PASSWORD_FORM = { currentPassword: '', newPassword: '', confirmPassword: '' };
const DEFAULT_PASSWORD_VISIBILITY = { currentPassword: false, newPassword: false, confirmPassword: false };

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

  const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState(DEFAULT_PASSWORD_FORM);
  const [passwordVisible, setPasswordVisible] = useState(DEFAULT_PASSWORD_VISIBILITY);
  const [passwordError, setPasswordError] = useState('');
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [deleteError, setDeleteError] = useState('');

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

  const handlePasswordFieldChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm((current) => ({ ...current, [name]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisible((current) => ({ ...current, [field]: !current[field] }));
  };

  const handleChangePassword = async () => {
    setPasswordError('');
    setIsSavingPassword(true);
    try {
      await api.post('/auth/change-password', passwordForm);
      setIsPasswordSectionOpen(false);
      setPasswordForm(DEFAULT_PASSWORD_FORM);
      setToastMessage('Password updated.');
      toast.show();
    } catch (err) {
      const message = err?.response?.data?.message ?? err?.response?.data ?? 'Could not update password. Please try again.';
      setPasswordError(typeof message === 'string' ? message : 'Could not update password. Please try again.');
    } finally {
      setIsSavingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user?.id) return;
    setDeleteError('');
    setIsDeletingAccount(true);
    try {
      await api.delete(`/users/${user.id}`);
      await logout();
      navigate({ to: '/login' });
    } catch {
      setDeleteError('Could not delete account. Please try again.');
      setIsDeletingAccount(false);
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
          .account-settings-page {
            min-height: max(884px, 100dvh);
            font-family: 'Manrope', sans-serif;
            background-image:
              radial-gradient(circle at top center, rgba(255, 220, 210, 0.45), transparent 34rem),
              linear-gradient(180deg, rgba(255, 248, 247, 0.96) 0%, rgba(255, 244, 243, 0.74) 24%, rgba(255, 249, 248, 0) 52%);
          }

          .account-settings-page .font-headline {
            font-family: 'Plus Jakarta Sans', 'Manrope', sans-serif;
          }

          .account-settings-page .ambient-shadow {
            box-shadow: 0 12px 32px rgba(78, 33, 33, 0.06);
          }

          .account-settings-page .frosted-footer {
            -webkit-backdrop-filter: blur(20px);
            backdrop-filter: blur(20px);
          }
        `}
      </style>

      <div
        className="account-settings-page bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container"
      >
        <PageHeader
          title="Account Settings"
          onBack={() => window.history.back()}
        />

        <main className="mx-auto max-w-lg space-y-8 px-5 pb-56 pt-24 min-[390px]:px-6">
          <section className="ambient-shadow overflow-hidden rounded-[2rem] border border-outline/10 bg-gradient-to-br from-surface-container-low via-surface-container to-surface-container-high/80 p-5 min-[390px]:p-6">
            <div className="flex flex-col gap-4 text-center min-[360px]:flex-row min-[360px]:items-start min-[360px]:text-left">
              <div className="flex h-16 w-16 items-center justify-center rounded-[1.75rem] bg-primary text-xl font-headline font-extrabold text-white shadow-[0_8px_24px_rgba(172,44,0,0.24)]">
                {initials || 'VK'}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-on-surface-variant">
                  Profile Summary
                </p>
                <h1 className="mt-2 font-headline text-[1.75rem] font-extrabold leading-none tracking-tight text-on-surface min-[360px]:text-3xl">
                  {fullName}
                </h1>
                <p className="mt-1 text-sm font-medium text-on-surface-variant">
                  {profile.email}
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 min-[360px]:grid-cols-2">
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

            <div className="ambient-shadow space-y-5 rounded-[2rem] border border-outline/10 bg-surface-container-low p-5 min-[390px]:p-6">
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
              description="Manage your password and active session for this account."
            />

            <div className="ambient-shadow space-y-3 rounded-[2rem] border border-outline/10 bg-surface-container-low p-3">
              <div className="rounded-2xl bg-surface-container-lowest p-4">
                <div className="flex min-w-0 items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-container-high text-primary">
                    <SymbolIcon name="mail" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-headline font-bold text-on-surface">Sign-in Email</p>
                    <p className="mt-1 text-sm text-on-surface-variant">{profile.email}</p>
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-on-surface-variant/70">
                      Managed separately for account security
                    </p>
                  </div>
                </div>
              </div>

              <ActionRow
                description="Update your login credentials with a new password."
                icon="lock"
                label={isPasswordSectionOpen ? 'Close' : 'Update'}
                title="Change password"
                onClick={() => {
                  setIsPasswordSectionOpen((open) => !open);
                  setPasswordError('');
                  setPasswordForm(DEFAULT_PASSWORD_FORM);
                  setPasswordVisible(DEFAULT_PASSWORD_VISIBILITY);
                }}
              />

              <div
                aria-hidden={!isPasswordSectionOpen}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isPasswordSectionOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="space-y-4 rounded-2xl bg-surface-container-lowest p-5">
                  {(['currentPassword', 'newPassword', 'confirmPassword']).map((field, i) => {
                    const labels = ['Current Password', 'New Password', 'Confirm New Password'];
                    const placeholders = ['Enter current password', 'Enter new password', 'Repeat new password'];
                    return (
                      <div key={field}>
                        <label
                          className="mb-1.5 ml-1 block text-sm font-medium text-on-surface"
                          htmlFor={field}
                        >
                          {labels[i]}
                        </label>
                        <div className="relative">
                          <input
                            autoComplete={field === 'currentPassword' ? 'current-password' : 'new-password'}
                            className="block w-full rounded-2xl border border-outline-variant bg-surface-container-low px-4 py-3 pr-12 leading-5 text-on-surface placeholder:text-on-surface-variant/70 transition duration-200 ease-in-out focus:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/20 sm:text-sm"
                            id={field}
                            name={field}
                            placeholder={placeholders[i]}
                            type={passwordVisible[field] ? 'text' : 'password'}
                            value={passwordForm[field]}
                            onChange={handlePasswordFieldChange}
                          />
                          <button
                            aria-label={passwordVisible[field] ? 'Hide password' : 'Show password'}
                            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
                            tabIndex={-1}
                            type="button"
                            onClick={() => togglePasswordVisibility(field)}
                          >
                            <SymbolIcon name={passwordVisible[field] ? 'visibility_off' : 'visibility'} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {passwordError && (
                    <p className="rounded-xl bg-error-container px-3 py-2 text-sm font-medium text-on-error-container">
                      {passwordError}
                    </p>
                  )}
                  <button
                    className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border py-3 font-headline font-bold transition-all ${
                      isSavingPassword
                        ? 'cursor-not-allowed border-outline/30 bg-surface-container text-on-surface-variant'
                        : 'border-primary/30 bg-primary/8 text-primary hover:bg-primary/12 active:bg-primary/16'
                    }`}
                    disabled={isSavingPassword}
                    type="button"
                    onClick={handleChangePassword}
                  >
                    <SymbolIcon name="lock_reset" />
                    <span>{isSavingPassword ? 'Updating...' : 'Update Password'}</span>
                  </button>
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
              description="Permanently remove your account and all associated data. This cannot be undone."
            />

            <div className="ambient-shadow space-y-3 rounded-[2rem] border border-error/15 bg-error/5 p-3">
              <ActionRow
                description="Permanently remove your account and all associated data."
                destructive
                icon="delete"
                label={isDeleteConfirmOpen ? 'Cancel' : 'Delete'}
                title="Delete account"
                onClick={() => {
                  setIsDeleteConfirmOpen((open) => !open);
                  setDeleteConfirmText('');
                  setDeleteError('');
                }}
              />

              {isDeleteConfirmOpen && (
                <div className="space-y-4 rounded-2xl border border-error/20 bg-error/10 p-4">
                  <p className="text-sm font-medium text-error/90">
                    This will permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <div>
                    <label
                      className="mb-1.5 ml-1 block text-sm font-medium text-error"
                      htmlFor="deleteConfirm"
                    >
                      Type <span className="font-bold tracking-widest">DELETE</span> to confirm
                    </label>
                    <input
                      className="block w-full rounded-2xl border border-error/30 bg-surface-container-lowest px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:border-error/50 focus:outline-none focus:ring-2 focus:ring-error/20 sm:text-sm"
                      id="deleteConfirm"
                      placeholder="DELETE"
                      type="text"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                    />
                  </div>
                  {deleteError && (
                    <p className="rounded-xl bg-error-container px-3 py-2 text-sm font-medium text-on-error-container">
                      {deleteError}
                    </p>
                  )}
                  <button
                    className={`flex w-full items-center justify-center gap-2 rounded-full py-3 font-headline font-bold text-white transition-all ${
                      deleteConfirmText === 'DELETE' && !isDeletingAccount
                        ? 'bg-error active:scale-95'
                        : 'cursor-not-allowed bg-error/30'
                    }`}
                    disabled={deleteConfirmText !== 'DELETE' || isDeletingAccount}
                    type="button"
                    onClick={handleDeleteAccount}
                  >
                    <SymbolIcon name="delete_forever" />
                    <span>{isDeletingAccount ? 'Deleting...' : 'Delete Account'}</span>
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>

        <Toast fading={toast.fading} visible={toast.visible}>
          <div className="rounded-2xl bg-primary px-5 py-4 text-sm font-bold text-white shadow-[0_10px_30px_rgba(172,44,0,0.28)]">
            {toastMessage}
          </div>
        </Toast>

        <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-surface via-surface/95 to-transparent px-5 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-4 min-[390px]:px-6">
          <div className="mx-auto max-w-lg">
            {error ? (
              <p className="mb-3 rounded-2xl bg-error-container px-4 py-3 text-sm font-medium text-on-error-container shadow-[0_10px_24px_rgba(78,33,33,0.08)]">
                {error}
              </p>
            ) : null}

            <button
              className={`pointer-events-auto frosted-footer flex w-full items-center justify-center gap-3 rounded-full py-4 font-headline text-lg font-bold text-white shadow-[0_12px_28px_rgba(172,44,0,0.22)] transition-all ${
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
