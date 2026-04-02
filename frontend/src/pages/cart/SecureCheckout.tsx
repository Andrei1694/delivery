import { useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import Button from '../../components/Button';
import PaymentMethodForm from '../../components/PaymentMethodForm';
import PageHeader from '../../components/PageHeader';
import {
  createPaymentMethodId,
  DEFAULT_PAYMENT_METHOD_FORM,
  getPaymentMethodDisplayLabel,
  useStoredPaymentMethods,
} from '../../util/paymentMethods';
import { useCart, SERVICE_FEE } from '../../cart';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function buildDefaultForm(hasSavedMethods) {
  return {
    ...DEFAULT_PAYMENT_METHOD_FORM,
    active: !hasSavedMethods,
  };
}

export default function SecureCheckout() {
  const router = useRouter();
  const cart = useCart();
  const orderTotal = cart.subtotal + SERVICE_FEE;
  const orderTotalLabel = formatCurrency(orderTotal);
  const [paymentMethods, setPaymentMethods] = useStoredPaymentMethods();
  const [selectedMethod, setSelectedMethod] = useState(
    () => paymentMethods.find((method) => method.active)?.id ?? paymentMethods[0]?.id ?? 'apple_pay',
  );
  const [isAddingNewMethod, setIsAddingNewMethod] = useState(false);
  const [newMethodForm, setNewMethodForm] = useState(() => buildDefaultForm(paymentMethods.length > 0));

  const resolvedSelectedMethod =
    selectedMethod === 'apple_pay' || paymentMethods.some((method) => method.id === selectedMethod)
      ? selectedMethod
      : paymentMethods.find((method) => method.active)?.id ?? paymentMethods[0]?.id ?? 'apple_pay';
  const selectedPaymentMethod = paymentMethods.find((method) => method.id === resolvedSelectedMethod);
  const paymentLabel =
    resolvedSelectedMethod === 'apple_pay'
      ? 'Apple Pay'
      : getPaymentMethodDisplayLabel(selectedPaymentMethod);

  const handleAddNewMethod = () => {
    setIsAddingNewMethod(true);
    setNewMethodForm(buildDefaultForm(paymentMethods.length > 0));
  };

  const handleSaveNewMethod = () => {
    const nextMethod = {
      id: createPaymentMethodId(),
      ...newMethodForm,
      active: newMethodForm.active || paymentMethods.length === 0,
    };

    setPaymentMethods((currentMethods) => {
      const nextMethods = [
        ...currentMethods.map((method) => ({
          ...method,
          active: nextMethod.active ? false : method.active,
        })),
        nextMethod,
      ];

      if (!nextMethods.some((method) => method.active) && nextMethods[0]) {
        nextMethods[0] = { ...nextMethods[0], active: true };
      }

      return nextMethods;
    });
    setSelectedMethod(nextMethod.id);
    setIsAddingNewMethod(false);
  };

  return (
    <>
      <style>
        {`
          .secure-checkout-page {
            min-height: max(884px, 100dvh);
            font-family: 'Manrope', sans-serif;
          }

          .secure-checkout-page .font-headline {
            font-family: 'Plus Jakarta Sans', sans-serif;
          }

          .secure-checkout-page .font-body,
          .secure-checkout-page .font-label {
            font-family: 'Manrope', sans-serif;
          }

          .secure-checkout-page .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }

          .secure-checkout-page .btn-gradient {
            background: linear-gradient(135deg, #ac2c00, #972500);
          }

          .secure-checkout-page .ambient-shadow {
            box-shadow: 0 8px 24px rgba(78, 33, 33, 0.06);
          }

          .secure-checkout-page .ghost-border {
            border: 1px solid rgba(224, 156, 153, 0.15);
          }
        `}
      </style>

      <div className="secure-checkout-page flex min-h-screen flex-col overflow-x-hidden bg-surface font-body text-on-surface antialiased">
        <PageHeader
          sticky
          title="Secure Checkout"
          onBack={() => router.history.back()}
        />

        <main className="flex-1 px-4 pb-32">
          <section className="mt-6 flex items-center justify-between rounded-xl bg-surface-container-low p-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container text-primary">
                <span className="material-symbols-outlined" data-icon="receipt">
                  receipt
                </span>
              </div>
              <div>
                <h2 className="font-headline text-base font-semibold">Order Total</h2>
                <p className="text-sm text-on-surface-variant">Including taxes and fees</p>
              </div>
            </div>
            <p className="font-headline text-lg font-bold">{orderTotalLabel}</p>
          </section>

          <section className="mt-8">
            <h3 className="mb-5 font-headline text-xl font-bold tracking-tight">Saved Cards</h3>
            <div className="space-y-4">
              {paymentMethods.length > 0 ? (
                paymentMethods.map((paymentMethod) => (
                  <label key={paymentMethod.id} className="block cursor-pointer">
                    <div className={`relative flex items-center overflow-hidden rounded-xl p-4 transition-all ${
                      resolvedSelectedMethod === paymentMethod.id
                        ? 'border-2 border-primary bg-surface-container-lowest ambient-shadow'
                        : 'ghost-border bg-surface-container-low hover:bg-surface-container-lowest'
                    }`}>
                      {resolvedSelectedMethod === paymentMethod.id ? <div className="absolute inset-0 bg-primary/5" /> : null}
                      <div className="relative z-10 mr-4 flex h-8 w-12 shrink-0 items-center justify-center rounded bg-surface-container">
                        <span className="text-[11px] font-bold text-on-surface">
                          {paymentMethod.type}
                        </span>
                      </div>
                      <div className="relative z-10 flex-1">
                        <p className="font-headline text-base font-semibold text-on-surface">
                          {getPaymentMethodDisplayLabel(paymentMethod)}
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          Expires {paymentMethod.expires}
                        </p>
                      </div>
                      <div className="relative z-10">
                        <input
                          className="h-5 w-5 border-outline-variant bg-surface-container-lowest text-primary focus:ring-primary focus:ring-offset-surface"
                          checked={resolvedSelectedMethod === paymentMethod.id}
                          name="payment_method"
                          type="radio"
                          onChange={() => setSelectedMethod(paymentMethod.id)}
                        />
                      </div>
                    </div>
                  </label>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-outline-variant/30 bg-surface-container-lowest px-4 py-6 text-center text-sm text-on-surface-variant">
                  Add a saved card to speed through future orders.
                </div>
              )}

              {isAddingNewMethod ? (
                <PaymentMethodForm
                  value={newMethodForm}
                  onChange={setNewMethodForm}
                  onSave={handleSaveNewMethod}
                  onCancel={() => {
                    setIsAddingNewMethod(false);
                    setNewMethodForm(buildDefaultForm(paymentMethods.length > 0));
                  }}
                  saveLabel="Add Method"
                />
              ) : null}
            </div>
          </section>

          <section className="mt-8">
            <h3 className="mb-5 font-headline text-xl font-bold tracking-tight">
              Digital Wallets
            </h3>
            <div className="space-y-4">
              <label className="block cursor-pointer">
                <div className={`relative flex items-center overflow-hidden rounded-xl bg-surface-container-low p-4 transition-all ${
                  resolvedSelectedMethod === 'apple_pay'
                    ? 'border-2 border-primary'
                    : 'ghost-border hover:bg-surface-container-lowest'
                }`}>
                  {resolvedSelectedMethod === 'apple_pay' ? <div className="absolute inset-0 bg-primary/5" /> : null}
                  <div className="relative z-10 mr-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-container-lowest text-on-surface shadow-sm">
                    <span
                      className="material-symbols-outlined text-2xl"
                      data-icon="account_balance_wallet"
                    >
                      account_balance_wallet
                    </span>
                  </div>
                  <div className="relative z-10 flex-1">
                    <p className="font-headline text-base font-semibold">Apple Pay</p>
                  </div>
                  <div className="relative z-10">
                    <input
                      className="h-5 w-5 border-outline-variant bg-surface-container-lowest text-primary focus:ring-primary focus:ring-offset-surface"
                      checked={resolvedSelectedMethod === 'apple_pay'}
                      name="payment_method"
                      type="radio"
                      onChange={() => setSelectedMethod('apple_pay')}
                    />
                  </div>
                </div>
              </label>
            </div>
          </section>

          <button
            className="ghost-border mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-surface-container-low py-4 font-headline font-semibold text-primary transition-colors hover:bg-surface-container"
            type="button"
            onClick={handleAddNewMethod}
          >
            <span className="material-symbols-outlined" data-icon="add">
              add
            </span>
            Add New Method
          </button>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-lg" data-icon="lock">
              lock
            </span>
            <span className="font-medium">Bank-level 256-bit encryption</span>
          </div>
        </main>

        <div className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-surface to-transparent p-4 pb-6">
          <Button
            className="ambient-shadow btn-gradient justify-between px-6 py-4 text-lg active:scale-[0.98]"
            type="button"
            onClick={() =>
              router.navigate({
                to: '/order-confirmation',
                search: { paymentLabel },
              })
            }
            disabled={!resolvedSelectedMethod}
          >
            <span>Place Order</span>
            <span>{orderTotalLabel}</span>
          </Button>
        </div>
      </div>
    </>
  );
}
