import { useNavigate, useSearch } from '@tanstack/react-router';
import OrderSummary from '../../components/OrderSummary';
import PageHeader from '../../components/PageHeader';
import SymbolIcon from '../../components/SymbolIcon';
import { getOrderById } from '../../mocks';

const filledIconStyle = {
  fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
};

const statusIconStyle = {
  fontVariationSettings: "'FILL' 0, 'wght' 700, 'GRAD' 0, 'opsz' 24",
};

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export default function OrderDetails() {
  const navigate = useNavigate();
  const { orderId } = useSearch({ from: '/order-details' });
  const order = getOrderById(orderId);
  const subtotal = order.summaryItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <style>
        {`
          .order-details-page {
            min-height: max(884px, 100dvh);
          }

          .order-details-page .font-headline {
            font-family: 'Plus Jakarta Sans', 'Manrope', sans-serif;
          }

          .order-details-page .editorial-shadow {
            box-shadow: 0 8px 24px rgba(78, 33, 33, 0.06);
          }
        `}
      </style>

      <div className="order-details-page min-h-screen bg-background font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container">
        <PageHeader
          title="Order Details"
          onBack={() => window.history.back()}
          rightAction={
            <button
              aria-label="Track this order"
              className="flex h-10 w-10 items-center justify-center rounded-full text-primary duration-200 hover:bg-surface-container-low active:scale-95"
              type="button"
              onClick={() =>
                navigate({
                  to: '/order/$orderId/track',
                  params: { orderId: order.id },
                })
              }
            >
              <SymbolIcon name="local_shipping" />
            </button>
          }
        />

        <main className="mx-auto max-w-lg space-y-4 px-6 pb-40 pt-20">
          <section className="rounded-3xl border border-outline-variant/10 bg-surface-container-low p-5">
            <div className="mb-2 flex items-center justify-between gap-4">
              <h2 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">
                {order.restaurant}
              </h2>

              <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 ${order.statusClassName}`}>
                <span
                  className="material-symbols-outlined text-sm"
                  style={statusIconStyle}
                >
                  {order.status === 'Cancelled' ? 'cancel' : order.status === 'Processing' ? 'schedule' : 'check_circle'}
                </span>
                <span className="font-label text-[10px] font-bold uppercase tracking-wider">
                  {order.status}
                </span>
              </div>
            </div>

            <p className="text-sm font-medium text-on-surface-variant">
              Order #{order.id} • {order.dateTime}
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-4 rounded-3xl bg-surface-container-low p-5">
              <div className="rounded-2xl bg-primary/10 p-2.5">
                <span
                  className="material-symbols-outlined text-primary"
                  style={filledIconStyle}
                >
                  location_on
                </span>
              </div>

              <div>
                <p className="mb-0.5 font-label text-[10px] uppercase tracking-[0.15em] text-on-surface-variant">
                  Delivery Address
                </p>
                <p className="font-headline font-bold text-on-surface">
                  {order.deliveryAddress}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-3xl bg-surface-container-low p-5">
              <div className="rounded-2xl bg-primary/10 p-2.5">
                <span
                  className="material-symbols-outlined text-primary"
                  style={filledIconStyle}
                >
                  credit_card
                </span>
              </div>

              <div>
                <p className="mb-0.5 font-label text-[10px] uppercase tracking-[0.15em] text-on-surface-variant">
                  Payment Method
                </p>
                <p className="font-headline font-bold text-on-surface">
                  {order.paymentMethod}
                </p>
              </div>
            </div>

            {order.cancellationReason ? (
              <div className="rounded-3xl bg-surface-container-low p-5">
                <p className="mb-1 font-label text-[10px] uppercase tracking-[0.15em] text-on-surface-variant">
                  Cancellation Reason
                </p>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  {order.cancellationReason}
                </p>
              </div>
            ) : null}
          </section>

          <section className="space-y-4 pt-2">
            <h3 className="px-2 font-headline text-lg font-bold">Your Items</h3>

            <div className="space-y-1">
              {order.summaryItems.map((item) => (
                <div key={item.name} className="flex items-center gap-4 p-2">
                  <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-surface-container-high">
                    <img
                      alt={item.alt}
                      className="h-full w-full object-cover"
                      src={item.image}
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-headline font-bold text-on-surface">
                          {item.name}
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          {item.quantityLabel}
                        </p>
                        {item.note ? (
                          <p className="text-[11px] text-on-surface-variant/80">
                            {item.note}
                          </p>
                        ) : null}
                      </div>

                      <p className="font-body font-semibold text-on-surface">
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <OrderSummary
              subtotal={subtotal}
              serviceFee={order.serviceFee}
              deliveryFee={order.deliveryFee}
              className="rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest"
            />
          </section>
        </main>

        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-background via-background to-transparent p-6">
          <div className="mx-auto max-w-lg">
            <button
              className="flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-br from-primary to-primary-container py-4 font-headline text-lg font-bold text-on-primary shadow-lg transition-all active:scale-95"
              type="button"
              onClick={() =>
                navigate({
                  to: '/restaurant-menu/$restaurantId',
                  params: { restaurantId: order.restaurantId },
                })
              }
            >
              <span className="material-symbols-outlined">restart_alt</span>
              Reorder Items
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
