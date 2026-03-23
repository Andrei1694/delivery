import { useNavigate, useParams } from '@tanstack/react-router';
import PageHeader from '../../components/PageHeader';
import SymbolIcon from '../../components/SymbolIcon';
import { getOrderById } from '../../mocks';

const filledStyle = { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" };

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export default function OrderTracking() {
  const navigate = useNavigate();
  const { orderId } = useParams({ from: '/order/$orderId/track' });
  const order = getOrderById(orderId);
  const subtotal = order.summaryItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        details > summary::-webkit-details-marker { display: none; }
      `}</style>

      <div className="min-h-screen bg-background font-body text-on-surface antialiased" style={{ minHeight: 'max(884px, 100dvh)' }}>
        <PageHeader
          sticky
          title="Order Tracking"
          onBack={() => window.history.back()}
          rightAction={
            <button
              aria-label="View order details"
              className="flex h-10 w-10 items-center justify-center rounded-full text-primary duration-200 hover:bg-surface-container-low active:scale-95"
              type="button"
              onClick={() => navigate({ to: '/order-details', search: { orderId: order.id } })}
            >
              <SymbolIcon name="receipt_long" />
            </button>
          }
        />

        <main className="mx-auto max-w-lg space-y-4 px-4 pb-40 pt-20">
          <section className="rounded-2xl bg-gradient-to-br from-primary-container to-primary p-5 text-white shadow-xl">
            <div className="mb-4 flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl text-white" style={filledStyle}>check_circle</span>
                  <h2 className="font-headline text-lg font-bold leading-tight">
                    {order.trackingHeadline}
                  </h2>
                </div>
                <p className="text-xs font-medium text-white/80">
                  Order #{order.id} • {order.dateTime}
                </p>
              </div>
              <div className="rounded-xl bg-white/20 p-2 px-3 text-center backdrop-blur-md">
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">Arrival</p>
                <p className="font-headline text-lg font-extrabold">{order.arrivalLabel}</p>
              </div>
            </div>
            <p className="text-sm text-white/85">{order.trackingStatusDetail}</p>
          </section>

          <section className="overflow-hidden rounded-2xl border border-surface-container-high bg-surface-container-lowest shadow-sm">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <span className="material-symbols-outlined text-xl text-primary" style={filledStyle}>restaurant_menu</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">{order.restaurant}</p>
                  <p className="text-xs text-on-surface-variant">{order.deliveryAddress}</p>
                </div>
              </div>
              <button
                aria-label="Reorder from this restaurant"
                className="rounded-full bg-surface-container-high p-2 text-primary transition-all hover:bg-surface-container active:scale-95"
                type="button"
                onClick={() =>
                  navigate({
                    to: '/restaurant-menu/$restaurantId',
                    params: { restaurantId: order.restaurantId },
                  })
                }
              >
                <SymbolIcon name="restaurant" className="text-lg" />
              </button>
            </div>
            <div className="relative h-32">
              <img
                alt="Delivery map view"
                className="h-full w-full object-cover grayscale-[0.3]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR9jtZEBAlghwlXavk4phYDGlWfdpmSTFIzDed3h1Ek6kiul3Olnx2WrAZltUoji13hxkf2Z-_1n3rOa48E6dgIUJkhTE9rG_VM3eiMkscaNlCszVMnHg_oMcDIKPr9sdhHJwR9xv8h2A3Ob7VPukZCFdHYYYgjfnjMUIy9DBJUZ10ZWioExffn0s2_fXHIfAQEv3qkPfgd-qCjBpNDMok7lUtRwz2prvFmhHy8ORswWksf_vOiaL8eENjNvLvagrhpC9cbK3UJT8"
              />
              <div className="absolute inset-0 bg-primary/5" />
              <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="rounded-full border-2 border-white bg-primary p-1.5 text-white shadow-md">
                  <span className="material-symbols-outlined text-[10px]" style={filledStyle}>directions_bike</span>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2 flex items-center gap-2 rounded-lg border border-white/50 bg-white/90 p-1.5 backdrop-blur-md">
                <img
                  alt="Driver Marcus J."
                  className="h-6 w-6 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDnUiZKSXTLiKvbgf1dP9VGrlIuhzUyMs9hKAL0CXin678pte7qysOMw7N0jlJz_1_UF9J7TdL2Hzl2xaxcWb-9ldPMZ4o3VYo3UDyBmZ4Bxo-7A-5RAZq8ej711Q21t43_f8DgZ8I8nhomXLSrj7IBmvMhkOYjrLswzfTIGeKpxtKRg0XCvz7OWzZQH7THIRG8CWzTC6Z1suDOSnngFOEfatsZJDnQN_PCa6w6flRKNw89jrCO3QRf5vN55NyDxdpxzPGyXbue3k"
                />
                <p className="text-[10px] font-bold">
                  Marcus J.
                  <span className="ml-1 font-normal text-on-surface-variant opacity-70">
                    is monitoring your drop-off
                  </span>
                </p>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-surface-container-high bg-surface-container-lowest shadow-sm">
            <div className="flex items-center justify-between border-b border-surface-container-high bg-surface-container-low/30 p-4">
              <div>
                <h3 className="font-headline text-base font-bold">Order Details</h3>
                <p className="text-xs font-medium text-on-surface-variant">
                  {order.summaryItems.length} Items Total
                </p>
              </div>
              <div className="text-right">
                <p className="font-headline text-xl font-extrabold text-primary">
                  {formatCurrency(order.total)}
                </p>
                <p className="text-[10px] uppercase tracking-wide text-on-surface-variant">
                  Paid via {order.paymentMethod}
                </p>
              </div>
            </div>
            <div className="hide-scrollbar max-h-64 overflow-y-auto p-1">
              <details className="group" open>
                <summary className="list-none cursor-pointer rounded-xl p-3 transition-colors hover:bg-surface-container-low/50">
                  <span className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-bold">
                      <span className="material-symbols-outlined text-lg text-on-surface-variant transition-transform group-open:rotate-180">expand_more</span>
                      Items Summary
                    </span>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                      {formatCurrency(subtotal)}
                    </span>
                  </span>
                </summary>
                <div className="space-y-4 px-4 pb-4 pt-1">
                  {order.summaryItems.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                        <img
                          alt={item.alt}
                          className="h-full w-full object-cover"
                          src={item.image}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">{item.name}</p>
                        <p className="text-[10px] text-on-surface-variant">
                          {item.note || item.quantityLabel}
                        </p>
                      </div>
                      <p className="text-sm font-bold">{formatCurrency(item.price)}</p>
                    </div>
                  ))}
                </div>
              </details>
              <details className="group">
                <summary className="list-none cursor-pointer rounded-xl border-t border-surface-container-high/50 p-3 transition-colors hover:bg-surface-container-low/50">
                  <span className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm font-bold">
                      <span className="material-symbols-outlined text-lg text-on-surface-variant transition-transform group-open:rotate-180">expand_more</span>
                      Fees &amp; Delivery
                    </span>
                    <span className="text-xs font-bold text-on-surface-variant">
                      {formatCurrency(order.serviceFee + order.deliveryFee)}
                    </span>
                  </span>
                </summary>
                <div className="space-y-2 px-4 pb-4 pt-1">
                  <div className="flex justify-between text-xs text-on-surface-variant">
                    <span>Service Fee</span>
                    <span>{formatCurrency(order.serviceFee)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-on-surface-variant">
                    <span>Delivery Fee</span>
                    <span>{order.deliveryFee > 0 ? formatCurrency(order.deliveryFee) : 'FREE'}</span>
                  </div>
                </div>
              </details>
            </div>
          </section>
        </main>

        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-background via-background to-transparent p-4 pb-6">
          <div className="mx-auto max-w-lg">
            <button
              className="w-full rounded-2xl bg-primary px-6 py-3.5 font-headline text-base font-bold text-white shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
              type="button"
              onClick={() => navigate({ to: '/order-details', search: { orderId: order.id } })}
            >
              View Order Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
