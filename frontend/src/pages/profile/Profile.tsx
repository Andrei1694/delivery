import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../auth/AuthContext';
import PaymentMethodForm from '../../components/PaymentMethodForm';
import { getProfileData } from '../../mocks';
import {
  DEFAULT_PAYMENT_METHOD_FORM,
  useStoredPaymentMethods,
} from '../../util/paymentMethods';

export default function Profile() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const profileData = getProfileData();
  const {
    user,
    loyalty,
    credits,
    recentOrders,
    contactInfo,
    savedAddressesPreview,
  } = profileData;

  const [paymentMethods, setPaymentMethods] = useStoredPaymentMethods();
  const [editingPayment, setEditingPayment] = useState(null);
  const [editForm, setEditForm] = useState(DEFAULT_PAYMENT_METHOD_FORM);

  const handleDeletePayment = (paymentId) => {
    setPaymentMethods((prev) => {
      const remainingPayments = prev.filter((payment) => payment.id !== paymentId);
      if (remainingPayments.length > 0 && !remainingPayments.some((payment) => payment.active)) {
        return remainingPayments.map((payment, index) => ({
          ...payment,
          active: index === 0,
        }));
      }

      return remainingPayments;
    });
  };

  const handleEditPayment = (payment) => {
    setEditingPayment(payment.id);
    setEditForm({
      type: payment.type,
      last4: payment.last4,
      expires: payment.expires,
      active: payment.active,
    });
  };

  const handleSavePayment = () => {
    setPaymentMethods((prev) =>
      prev.map((p) =>
        p.id === editingPayment
          ? {
              ...p,
              type: editForm.type,
              last4: editForm.last4,
              expires: editForm.expires,
              active: editForm.active,
            }
          : p
      )
        .map((payment, index, payments) => ({
          ...payment,
          active:
            editForm.active && payment.id !== editingPayment
              ? false
              : payment.active || (!payments.some((candidate) => candidate.active) && index === 0),
        }))
    );
    setEditingPayment(null);
    setEditForm(DEFAULT_PAYMENT_METHOD_FORM);
  };

  const handleCancelEdit = () => {
    setEditingPayment(null);
    setEditForm(DEFAULT_PAYMENT_METHOD_FORM);
  };

  const handleSignOut = async () => {
    await logout();
    navigate({ to: '/login' });
  };

  return (
    <>
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      <div
        className="bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container"
        style={{ minHeight: 'max(884px, 100dvh)' }}
      >
        <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-center bg-surface/70 backdrop-blur-xl border-b border-surface-container px-6 dark:bg-on-surface/70">
          <h1 className="font-headline text-lg font-bold tracking-tight text-primary">
            Profile
          </h1>
        </header>

        <main className="mx-auto max-w-lg space-y-10 px-6 pb-32 pt-24">
          <section className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="h-32 w-32 overflow-hidden rounded-full ring-4 ring-surface-container-high ring-offset-4 ring-offset-surface">
                <img
                  alt={user.imageAlt}
                  className="h-full w-full object-cover"
                  src={user.image}
                />
              </div>
              <button
                className="absolute bottom-0 right-0 rounded-full border-2 border-surface bg-primary p-2 text-white shadow-lg transition-transform active:scale-90"
                type="button"
                onClick={() => navigate({ to: '/account-settings' })}
                aria-label="Edit account settings"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>
            <h2 className="mb-1 text-center font-headline text-3xl font-extrabold tracking-tight text-on-surface">
              {user.name}
            </h2>
            <p className="font-body text-sm font-medium text-on-surface-variant">
              Member since {user.memberSince}
            </p>
          </section>

          <section>
            <div className="space-y-8 rounded-[2rem] border border-outline/10 bg-surface-container-low p-8">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                    Loyalty Level
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-tertiary">{loyalty.icon}</span>
                    <p className="font-headline text-2xl font-bold text-on-surface">
                      {loyalty.tier}
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant opacity-30">
                  chevron_right
                </span>
              </div>

              <div className="h-px w-full bg-outline/10" />

              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                    Verve Credits
                  </p>
                  <div className="flex items-center gap-3 text-primary">
                    <span className="material-symbols-outlined">account_balance_wallet</span>
                    <p className="font-headline text-2xl font-bold">{credits.amount}</p>
                  </div>
                </div>
                <button className="rounded-full bg-primary-container px-4 py-2 text-xs font-bold text-on-primary-container shadow-sm">
                  Add Funds
                </button>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-center justify-between px-1">
              <h3 className="font-headline text-2xl font-bold text-on-surface">My Orders</h3>
              <button
                className="text-sm font-bold text-primary hover:underline"
                type="button"
                onClick={() => navigate({ to: '/order-history' })}
              >
                View History
              </button>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.name}
                  className="flex w-full cursor-pointer items-center gap-5 rounded-[1.5rem] border border-transparent bg-surface-container-low p-5 transition-all hover:border-outline/20"
                >
                  <img
                    alt={order.name}
                    className="h-24 w-24 rounded-2xl object-cover shadow-sm"
                    src={order.image}
                  />
                  <div className="flex-1">
                    <div className="mb-1 flex items-start justify-between">
                      <p className="font-headline text-lg font-bold leading-tight text-on-surface">
                        {order.name}
                      </p>
                      <span className="rounded-full bg-surface-container-highest px-3 py-1 text-[10px] font-bold text-secondary">
                        {order.status}
                      </span>
                    </div>
                    <p className="mb-3 font-body text-sm text-on-surface-variant">
                      {order.summary}
                    </p>
                    <div className="flex gap-2">
                      <button
                        className="rounded-full bg-surface-container-high px-4 py-2 text-xs font-bold transition-colors hover:bg-surface-container-highest"
                        type="button"
                        onClick={() => navigate({ to: '/order-details', search: { orderId: order.orderId } })}
                      >
                        Details
                      </button>
                      <button
                        className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90"
                        type="button"
                        onClick={() =>
                          navigate({
                            to: '/restaurant-menu/$restaurantId',
                            params: { restaurantId: order.restaurantId },
                          })
                        }
                      >
                        Reorder
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="px-1 font-headline text-2xl font-bold text-on-surface">
              Personal Management
            </h3>

            <button
              className="group w-full rounded-[2rem] border border-outline/10 bg-surface-container-lowest p-6 text-left transition-all hover:shadow-md"
              type="button"
              onClick={() => navigate({ to: '/account-settings' })}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container-high text-primary">
                    <span className="material-symbols-outlined text-2xl">person</span>
                  </div>
                  <div>
                    <p className="font-headline font-bold text-on-surface">Account Settings</p>
                    <p className="text-xs text-on-surface-variant">
                      Profile info, email &amp; notifications
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-outline/5 pt-4">
                <div className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60">
                  Phone
                </div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60">
                  Email
                </div>
                <div className="truncate text-xs font-medium">{contactInfo.phone}</div>
                <div className="truncate text-xs font-medium">{contactInfo.email}</div>
              </div>
            </button>

            <button
              className="group w-full rounded-[2rem] border border-outline/10 bg-surface-container-lowest p-6 text-left transition-all hover:shadow-md"
              type="button"
              onClick={() => navigate({ to: '/saved-addresses' })}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container-high text-primary">
                    <span className="material-symbols-outlined text-2xl">location_on</span>
                  </div>
                  <div>
                    <p className="font-headline font-bold text-on-surface">Saved Addresses</p>
                    <p className="text-xs text-on-surface-variant">
                      Manage delivery locations
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </div>

              <div className="hide-scrollbar flex gap-3 overflow-x-auto pt-2">
                {savedAddressesPreview.map((address) => (
                  <div key={address.label} className="min-w-[140px] rounded-xl bg-surface-container px-4 py-3">
                    <p className="mb-1 text-[10px] font-bold uppercase text-on-surface-variant">
                      {address.label}
                    </p>
                    <p className="truncate text-xs font-bold text-on-surface">
                      {address.address}
                    </p>
                  </div>
                ))}
              </div>
            </button>

            <div className="rounded-[2rem] border border-outline/10 bg-surface-container-lowest p-6 transition-all hover:shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container-high text-primary">
                    <span className="material-symbols-outlined text-2xl">payments</span>
                  </div>
                  <div>
                    <p className="font-headline font-bold text-on-surface">Payment Methods</p>
                    <p className="text-xs text-on-surface-variant">
                      Secure checkout options
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                {paymentMethods.length === 0 ? (
                  <p className="text-center text-sm text-on-surface-variant py-4">
                    No payment methods added yet
                  </p>
                ) : (
                  paymentMethods.map((payment) => (
                    <div key={payment.id}>
                      {editingPayment === payment.id ? (
                        <PaymentMethodForm
                          value={editForm}
                          onChange={setEditForm}
                          onSave={handleSavePayment}
                          onCancel={handleCancelEdit}
                        />
                      ) : (
                        <div className="group/card relative flex items-center gap-3 rounded-lg bg-surface-container px-4 py-3 transition-colors hover:bg-surface-container-high">
                          <div className={`flex h-4 w-7 items-center justify-center rounded-sm ${payment.type === 'VISA' ? 'bg-[#1a1a1a]' : 'bg-[#eb001b]'}`}>
                            <span className="text-[6px] font-bold text-white">{payment.type}</span>
                          </div>
                          <div className={`flex-1 ${!payment.active ? 'opacity-50' : ''}`}>
                            <span className="text-sm font-bold">{'\u2022\u2022\u2022\u2022 ' + payment.last4}</span>
                            <p className="text-[11px] text-on-surface-variant">Expires {payment.expires}</p>
                          </div>
                          {payment.active && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                              Active
                            </span>
                          )}
                          <div className="opacity-0 group-hover/card:opacity-100 transition-opacity flex gap-1">
                            <button
                              aria-label="Edit payment method"
                              className="p-1.5 text-on-surface-variant transition-colors hover:text-primary"
                              type="button"
                              onClick={() => handleEditPayment(payment)}
                            >
                              <span className="material-symbols-outlined text-sm">edit</span>
                            </button>
                            <button
                              aria-label="Delete payment method"
                              className="p-1.5 text-on-surface-variant transition-colors hover:text-error"
                              type="button"
                              onClick={() => handleDeletePayment(payment.id)}
                            >
                              <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>

          <div className="pt-4">
            <button
              className="w-full rounded-3xl bg-surface-container-high py-5 font-headline font-bold text-error transition-all hover:bg-error-container hover:text-white active:scale-95"
              type="button"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        </main>

      </div>
    </>
  );
}
