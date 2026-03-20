import { useRouter } from '@tanstack/react-router';

export default function SecureCheckout() {
  const router = useRouter();
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

          .secure-checkout-page .text-gradient {
            background: linear-gradient(135deg, #ac2c00, #ff7852);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .secure-checkout-page .btn-gradient {
            background: linear-gradient(135deg, #ac2c00, #972500);
          }

          .secure-checkout-page .ambient-shadow {
            box-shadow: 0 8px 24px rgba(78, 33, 33, 0.06);
          }

          .secure-checkout-page .glass-nav {
            background-color: rgba(255, 210, 208, 0.7);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
          }

          .secure-checkout-page .ghost-border {
            border: 1px solid rgba(224, 156, 153, 0.15);
          }
        `}
      </style>

      <div className="secure-checkout-page bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col overflow-x-hidden">
        <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-4 bg-surface/70 backdrop-blur-xl border-b border-surface-container">
          <button
            aria-label="Go back"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container transition-colors"
            type="button"
            onClick={() => router.history.back()}
          >
            <span className="material-symbols-outlined text-2xl" data-icon="arrow_back">
              arrow_back
            </span>
          </button>
          <h1 className="font-headline text-lg font-bold tracking-tight flex-1 text-center pr-12">
            Secure Checkout
          </h1>
        </header>

        <main className="flex-1 px-4 pb-32">
          <section className="mt-6 p-4 rounded-xl bg-surface-container-low flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <span className="material-symbols-outlined" data-icon="receipt">
                  receipt
                </span>
              </div>
              <div>
                <h2 className="font-headline text-base font-semibold">Order Total</h2>
                <p className="text-sm text-on-surface-variant">Including taxes and fees</p>
              </div>
            </div>
            <p className="font-headline text-lg font-bold">$82.70</p>
          </section>

          <section className="mt-8">
            <h3 className="font-headline text-xl font-bold mb-5 tracking-tight">Saved Cards</h3>
            <div className="space-y-4">
              <label className="block cursor-pointer">
                <div className="flex items-center p-4 rounded-xl bg-surface-container-lowest ambient-shadow ghost-border relative overflow-hidden transition-all border-2 border-primary">
                  <div className="absolute inset-0 bg-primary/5" />
                  <div
                    className="w-12 h-8 bg-surface-container rounded flex items-center justify-center shrink-0 mr-4"
                    data-alt="Visa Card Logo abstract"
                  >
                    <span className="material-symbols-outlined text-tertiary-fixed-dim" data-icon="credit_card">
                      credit_card
                    </span>
                  </div>
                  <div className="flex-1 relative z-10">
                    <p className="font-headline text-base font-semibold text-on-surface">
                      •••• 4242
                    </p>
                    <p className="text-xs text-on-surface-variant">Expires 12/25</p>
                  </div>
                  <div className="relative z-10">
                    <input
                      className="w-5 h-5 text-primary border-outline-variant focus:ring-primary focus:ring-offset-surface bg-surface-container-lowest"
                      defaultChecked
                      name="payment_method"
                      type="radio"
                    />
                  </div>
                </div>
              </label>

              <label className="block cursor-pointer">
                <div className="flex items-center p-4 rounded-xl bg-surface-container-low ghost-border transition-all hover:bg-surface-container-lowest">
                  <div
                    className="w-12 h-8 bg-surface-container rounded flex items-center justify-center shrink-0 mr-4"
                    data-alt="Mastercard Logo abstract"
                  >
                    <span className="material-symbols-outlined text-secondary" data-icon="credit_card">
                      credit_card
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-headline text-base font-semibold text-on-surface">
                      •••• 5555
                    </p>
                    <p className="text-xs text-on-surface-variant">Expires 08/26</p>
                  </div>
                  <div>
                    <input
                      className="w-5 h-5 text-primary border-outline-variant focus:ring-primary focus:ring-offset-surface bg-surface-container-lowest"
                      name="payment_method"
                      type="radio"
                    />
                  </div>
                </div>
              </label>
            </div>
          </section>

          <section className="mt-8">
            <h3 className="font-headline text-xl font-bold mb-5 tracking-tight">
              Digital Wallets
            </h3>
            <div className="space-y-4">
              <label className="block cursor-pointer">
                <div className="flex items-center p-4 rounded-xl bg-surface-container-low ghost-border transition-all hover:bg-surface-container-lowest">
                  <div className="w-12 h-12 bg-surface-container-lowest rounded-full flex items-center justify-center shrink-0 mr-4 text-on-surface shadow-sm">
                    <span
                      className="material-symbols-outlined text-2xl"
                      data-icon="account_balance_wallet"
                    >
                      account_balance_wallet
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-headline text-base font-semibold">Apple Pay</p>
                  </div>
                  <div>
                    <input
                      className="w-5 h-5 text-primary border-outline-variant focus:ring-primary focus:ring-offset-surface bg-surface-container-lowest"
                      name="payment_method"
                      type="radio"
                    />
                  </div>
                </div>
              </label>
            </div>
          </section>

          <button
            className="mt-6 w-full py-4 flex items-center justify-center gap-2 rounded-xl bg-surface-container-low text-primary font-headline font-semibold hover:bg-surface-container transition-colors ghost-border"
            type="button"
          >
            <span className="material-symbols-outlined" data-icon="add">
              add
            </span>
            Add New Method
          </button>

          <div className="mt-8 flex items-center justify-center gap-2 text-on-surface-variant text-sm">
            <span className="material-symbols-outlined text-lg" data-icon="lock">
              lock
            </span>
            <span className="font-medium">Bank-level 256-bit encryption</span>
          </div>
        </main>

        <div className="fixed bottom-0 left-0 right-0 p-4 pb-6 z-40 bg-gradient-to-t from-surface to-transparent">
          <button
            className="w-full btn-gradient text-on-primary py-4 px-6 rounded-full font-headline text-lg font-bold flex items-center justify-between ambient-shadow transition-transform active:scale-[0.98]"
            type="button"
          >
            <span>Place Order</span>
            <span>$82.70</span>
          </button>
        </div>
      </div>
    </>
  );
}
