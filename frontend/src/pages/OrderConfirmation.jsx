import { useRouter } from '@tanstack/react-router';
import PageHeader from '../components/PageHeader';

export default function OrderConfirmation() {
  const router = useRouter();

  return (
    <>
      <style>{`
        .order-confirmation-page {
          min-height: max(884px, 100dvh);
          font-family: 'Manrope', sans-serif;
        }

        .order-confirmation-page .font-headline {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .order-confirmation-page .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        .order-confirmation-page .material-symbols-outlined.filled {
          font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        .order-confirmation-page .btn-gradient {
          background: linear-gradient(135deg, #ac2c00, #972500);
        }

        .order-confirmation-page .ambient-shadow {
          box-shadow: 0 8px 24px rgba(78, 33, 33, 0.06);
        }

        .order-confirmation-page .ghost-border {
          border: 1px solid rgba(224, 156, 153, 0.15);
        }

        /* ── Success checkmark ── */
        @keyframes check-pop {
          0%   { transform: scale(0.4); opacity: 0; }
          60%  { transform: scale(1.12); opacity: 1; }
          80%  { transform: scale(0.94); }
          100% { transform: scale(1); }
        }

        @keyframes check-draw {
          from { stroke-dashoffset: 48; }
          to   { stroke-dashoffset: 0; }
        }

        @keyframes badge-slide {
          from { transform: translateY(10px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        @keyframes headline-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes card-rise {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse-ring {
          0%   { transform: scale(1);    opacity: 0.35; }
          70%  { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }

        .order-confirmation-page .check-circle {
          animation: check-pop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both;
        }

        .order-confirmation-page .check-path {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: check-draw 0.35s ease-out 0.5s forwards;
        }

        .order-confirmation-page .pulse-ring {
          animation: pulse-ring 1.6s ease-out 0.65s infinite;
        }

        .order-confirmation-page .hero-headline {
          animation: headline-fade 0.5s ease-out 0.55s both;
        }

        .order-confirmation-page .order-badge {
          animation: badge-slide 0.4s ease-out 0.75s both;
        }

        .order-confirmation-page .eta-card {
          animation: card-rise 0.45s ease-out 0.85s both;
        }

        .order-confirmation-page .map-card {
          animation: card-rise 0.45s ease-out 1.0s both;
        }

        .order-confirmation-page .summary-card {
          animation: card-rise 0.45s ease-out 1.1s both;
        }

        /* ── Fake map tile ── */
        .order-confirmation-page .map-tile {
          background:
            linear-gradient(160deg,
              #2d3748 0%,
              #1e2535 30%,
              #252f42 55%,
              #1a2232 100%
            );
          position: relative;
          overflow: hidden;
        }

        .order-confirmation-page .map-tile::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        /* ── Driver pin pulse ── */
        @keyframes driver-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(172, 44, 0, 0.45); }
          50%       { box-shadow: 0 0 0 8px rgba(172, 44, 0, 0); }
        }

        .order-confirmation-page .driver-pin {
          animation: driver-pulse 2s ease-in-out infinite;
        }

        /* ── Divider ── */
        .order-confirmation-page .divider {
          height: 1px;
          background: rgba(224, 156, 153, 0.15);
        }

        /* ── Bottom CTA fade ── */
        .order-confirmation-page .bottom-cta {
          animation: card-rise 0.45s ease-out 1.25s both;
        }
      `}</style>

      <div className="order-confirmation-page bg-surface text-on-surface antialiased flex flex-col overflow-x-hidden">
        <PageHeader
          sticky
          title="Order Confirmed"
          onBack={() => router.navigate({ to: '/' })}
        />

        <main className="flex-1 px-4 pb-40 pt-2">

          {/* ── Hero ── */}
          <section className="mt-8 flex flex-col items-center text-center">
            {/* Checkmark */}
            <div className="relative flex items-center justify-center mb-5">
              {/* Pulse ring */}
              <div
                className="pulse-ring absolute w-24 h-24 rounded-full"
                style={{ background: 'rgba(34, 197, 94, 0.2)' }}
              />
              {/* Circle */}
              <div
                className="check-circle w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <path
                    className="check-path"
                    d="M10 20.5 L17 28 L30 13"
                    stroke="white"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            <h1 className="hero-headline font-headline text-2xl font-bold tracking-tight mb-3">
              Your order is confirmed!
            </h1>

            <div
              className="order-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container"
            >
              <span className="material-symbols-outlined filled text-base text-primary">
                tag
              </span>
              <span className="font-headline text-sm font-semibold text-primary">
                Order #8821
              </span>
            </div>
          </section>

          {/* ── ETA card ── */}
          <section className="eta-card mt-7 p-4 rounded-2xl bg-surface-container-lowest ambient-shadow ghost-border flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'linear-gradient(135deg, rgba(172,44,0,0.12), rgba(255,120,82,0.12))' }}
            >
              <span className="material-symbols-outlined text-primary text-2xl">
                schedule
              </span>
            </div>
            <div className="flex-1">
              <p className="text-xs text-on-surface-variant font-medium uppercase tracking-widest mb-0.5">
                Estimated Delivery
              </p>
              <p className="font-headline text-2xl font-bold text-on-surface leading-tight">
                25–30 <span className="text-base font-semibold">min</span>
              </p>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Arriving by ~8:45 PM
              </p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <p className="text-xs text-green-600 font-semibold">Live</p>
            </div>
          </section>

          {/* ── Map ── */}
          <section className="map-card mt-4">
            <div className="map-tile rounded-2xl overflow-hidden" style={{ height: '160px' }}>
              {/* Road overlays */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 360 160"
                preserveAspectRatio="none"
                style={{ position: 'absolute' }}
              >
                {/* Horizontal roads */}
                <line x1="0" y1="55" x2="360" y2="55" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                <line x1="0" y1="110" x2="360" y2="110" stroke="rgba(255,255,255,0.04)" strokeWidth="6" />
                {/* Vertical roads */}
                <line x1="90" y1="0" x2="90" y2="160" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                <line x1="240" y1="0" x2="240" y2="160" stroke="rgba(255,255,255,0.04)" strokeWidth="5" />
                {/* Delivery route */}
                <polyline
                  points="40,145 100,110 160,85 220,60 290,30 330,18"
                  fill="none"
                  stroke="#ff7852"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                  opacity="0.85"
                />
                {/* Origin dot */}
                <circle cx="40" cy="145" r="5" fill="#ff7852" opacity="0.6" />
                {/* Destination dot */}
                <circle cx="330" cy="18" r="5" fill="#22c55e" opacity="0.9" />
              </svg>

              {/* Driver pin — centered ~60% along route */}
              <div
                className="absolute"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              >
                <div
                  className="driver-pin w-9 h-9 rounded-full flex items-center justify-center text-white shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #ac2c00, #ff7852)' }}
                >
                  <span className="material-symbols-outlined filled text-lg">
                    directions_bike
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-center gap-2 text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-base text-primary">
                person_pin_circle
              </span>
              <span>
                <span className="font-semibold text-on-surface">Marcus J.</span>
                {' '}is heading your way
              </span>
            </div>
          </section>

          {/* ── Order summary ── */}
          <section className="summary-card mt-5 rounded-2xl bg-surface-container-lowest ambient-shadow ghost-border overflow-hidden">
            <div className="px-4 pt-4 pb-3">
              <h3 className="font-headline text-base font-bold text-on-surface">
                What you ordered
              </h3>
            </div>

            <div className="divider" />

            <div className="px-4 py-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-on-surface-variant w-5 text-center bg-surface-container rounded px-1 py-0.5">
                    ×1
                  </span>
                  <span className="text-sm font-medium text-on-surface">Truffle Risotto</span>
                </div>
                <span className="text-sm font-semibold text-on-surface">$42.00</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-on-surface-variant w-5 text-center bg-surface-container rounded px-1 py-0.5">
                    ×1
                  </span>
                  <span className="text-sm font-medium text-on-surface">Coq au Vin</span>
                </div>
                <span className="text-sm font-semibold text-on-surface">$32.50</span>
              </div>
            </div>

            <div className="divider" />

            <div className="px-4 py-3 space-y-2">
              <div className="flex justify-between text-sm text-on-surface-variant">
                <span>Subtotal</span>
                <span>$74.50</span>
              </div>
              <div className="flex justify-between text-sm text-on-surface-variant">
                <span>Fees &amp; Taxes</span>
                <span>$8.20</span>
              </div>
              <div className="flex justify-between text-base font-headline font-bold text-on-surface pt-1">
                <span>Total</span>
                <span>$82.70</span>
              </div>
            </div>

            <div className="divider" />

            <div className="px-4 py-3 flex items-center gap-2 text-on-surface-variant text-sm">
              <span className="material-symbols-outlined text-base">credit_card</span>
              <span>Paid via <span className="font-semibold text-on-surface">Visa •••• 4242</span></span>
            </div>
          </section>
        </main>

        {/* ── Fixed bottom CTA ── */}
        <div className="bottom-cta fixed bottom-0 left-0 right-0 px-4 pb-6 pt-4 z-40"
          style={{ background: 'linear-gradient(to top, var(--md-sys-color-surface, #fff) 70%, transparent)' }}
        >
          <button
            type="button"
            className="w-full btn-gradient text-on-primary py-4 px-6 rounded-full font-headline text-base font-bold flex items-center justify-between ambient-shadow transition-transform active:scale-[0.98] mb-3"
            onClick={() => router.navigate({ to: '/order/$orderId/track', params: { orderId: '8821' } })}
          >
            <span>Track My Order</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>

          <button
            type="button"
            className="w-full text-center text-sm text-on-surface-variant font-medium py-1 hover:text-on-surface transition-colors"
            onClick={() => router.navigate({ to: '/' })}
          >
            Back to Home
          </button>
        </div>
      </div>
    </>
  );
}
