import BottomNav from '../components/BottomNav';
import { NAV_ITEMS } from '../navigation/navItems';

const FILTERS = ['All Orders', 'Delivered', 'Processing', 'Cancelled'];

const ORDERS = [
  {
    id: 1,
    restaurant: "L'Artiste Bistro",
    status: 'Delivered',
    statusClassName:
      'bg-primary-container/20 text-on-primary-container',
    dateTime: 'Oct 24, 2023 • 19:45',
    items: 'Truffle Risotto, Coq au Vin, Glass of Bordeaux',
    totalLabel: 'Total Amount',
    total: '$78.50',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCPmkmW_Ke--iCUZaFgOYg_89L5mE6HTZ5uZ8yaD1CfcUw5MhVf2QzrMxMoGHVHHOXmdhhJXnBTzdod1VHg3zdGfBXEzsqhuV4wgJ6tEUo1KTTkBhNr-4slSqiO76nTtkMYanyQr65QCzKexCiDk4xhyHD-051c5hqInlDANnhuC7iCD2EUJ2UdtmAmjhhDchu7ajBU334GhgbB01j7j-t9QT3uF5NZX_pliWMqhshOSqYLBpcfojdp5_bAThTUm5LEF6dSmO_N3Ik',
    imageAlt: 'Overhead view of a gourmet truffle risotto dish',
    secondaryAction: 'View Details',
    primaryAction: 'Reorder',
  },
  {
    id: 2,
    restaurant: 'Artisan Pizzeria',
    status: 'Delivered',
    statusClassName:
      'bg-primary-container/20 text-on-primary-container',
    dateTime: 'Oct 21, 2023 • 21:10',
    items: 'Spicy Diavola, Garlic Knots, Lemon Soda',
    totalLabel: 'Total Amount',
    total: '$34.20',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8PTsYilYxUBor5enVSk6Tz5k1Wrfpc0dZ0hl52xqahTO5xx0rH-Dm24shjruoLg5LH_m-THa0FFPLGrdmYXFCIWrD5zQ3819u7NjRApoCzFnuhKaehY9MqRwNZzLJawF4uU5L5R7Ggl5QRzz5SQ0g3WsNkwN9hDAza1dm4t32VfZB2-FhxeRckK5ejPmOQMUntmYWVvq8CEVWFRAh4KgdRsLIQvdGIZY-C4AYSxHtZ2uiJB_OT0bVubln4SaNg5-mQTZ9vB2emE4',
    imageAlt: 'Close up of a bubbling artisan sourdough pizza',
    secondaryAction: 'View Details',
    primaryAction: 'Reorder',
  },
  {
    id: 3,
    restaurant: 'Green Garden',
    status: 'Cancelled',
    statusClassName:
      'bg-surface-container-high text-on-surface-variant',
    dateTime: 'Oct 18, 2023 • 12:30',
    items: 'Avocado Toast, Matcha Latte',
    totalLabel: 'Refunded',
    total: '$22.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBx_vCTFY_4o__zYQGif_03aXHhpJLhn2kNItyiYF7ChYL-5p0YICZUgczJhzKz-AdP7UDix9A73zYmyq7Qdk7Dgf4jtySMOOcWNj7V97_W9iaDom8431BqD4iYDuA1zHakGVFx1_DnEXnHZ-hIV0EMJz-DtCy4gp0izdK9k86XjUhl7liJN7Wz9gwmikV8cc_15CBavbffAZ25zsgJKLTi55VlJvGyaKDpWf5LaqmQaIY3DFV9I_47lde2_QdxeAoMwYYmYgQFHVk',
    imageAlt: 'Colorful healthy mediterranean poke bowl',
    secondaryAction: 'View Reason',
    dimmed: true,
    imageClassName: 'grayscale',
  },
  {
    id: 4,
    restaurant: "The Butcher's Son",
    status: 'Delivered',
    statusClassName:
      'bg-primary-container/20 text-on-primary-container',
    dateTime: 'Oct 15, 2023 • 20:05',
    items: 'Double Wagyu Burger, Truffle Fries, Cola',
    totalLabel: 'Total Amount',
    total: '$45.90',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDvwu7ipiHPyiuirAi03k3L9IR45mXQnYqD3u_VCa5YJB7wH4TUF5-RGy-FZkljnfJdTVvR6v9InbYi2Jun6-5bXhFg85nwpjAA_ofAP2jBY4iBOJ1XKnV8N-TkpuBuu51T8yWBpi5fMjZANPfMPHeVo-99bEgwSwgpQ9wj_n4_aKnLWKbdCqWvErmucT3o5AmjtD88G8fKfoBqX7q_j_EFyjH1ciTax-RuXunqKUCuBTUIFuYrnglATbFko6flBF9n9D0LERt0pec',
    imageAlt: 'Juicy double cheeseburger with thick fries',
    secondaryAction: 'View Details',
    primaryAction: 'Reorder',
  },
];


const iconStyle = {
  fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
};


function SymbolIcon({ name, className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined ${className}`.trim()}
      style={iconStyle}
    >
      {name}
    </span>
  );
}

function OrderCard({ order }) {
  return (
    <article
      className={[
        'group relative bg-surface-container-lowest rounded-3xl overflow-hidden p-5 shadow-[0_8px_32px_rgba(78,33,33,0.04)] transition-all',
        order.dimmed
          ? 'opacity-80'
          : 'hover:shadow-[0_12px_40px_rgba(78,33,33,0.08)]',
      ].join(' ')}
    >
      <div className="flex gap-5">
        <div
          className={[
            'w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-surface-container',
            order.imageClassName ?? '',
          ].join(' ')}
        >
          <img
            className="w-full h-full object-cover"
            src={order.image}
            alt={order.imageAlt}
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start gap-4">
              <h3 className="font-headline font-bold tracking-tight text-lg text-on-surface leading-tight">
                {order.restaurant}
              </h3>
              <span
                className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${order.statusClassName}`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-1 font-medium">
              {order.dateTime}
            </p>
          </div>

          <div className="mt-2">
            <p className="text-sm text-on-surface-variant line-clamp-1">
              {order.items}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-5 border-t border-outline-variant/10 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs text-on-surface-variant block mb-1">
            {order.totalLabel}
          </span>
          <span className="text-lg font-headline font-extrabold text-on-surface">
            {order.total}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className={[
              'text-sm font-bold px-4 py-2 rounded-full transition-colors',
              order.dimmed
                ? 'text-on-surface-variant hover:bg-surface-container-low'
                : 'text-primary hover:bg-primary-container/10',
            ].join(' ')}
          >
            {order.secondaryAction}
          </button>

          {order.primaryAction ? (
            <button
              type="button"
              className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-primary/20 active:scale-95 transition-transform"
            >
              {order.primaryAction}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default function OrderHistory() {
  return (
    <>
      <style>{`
        .order-history-page {
          min-height: max(884px, 100dvh);
        }

        .order-history-page .font-headline {
          font-family: 'Plus Jakarta Sans', 'Manrope', sans-serif;
        }

.order-history-page .no-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .order-history-page .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="order-history-page bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container">
        <header className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-xl border-b border-surface-container">
          <div className="flex items-center justify-between px-6 h-16 w-full max-w-lg mx-auto">
            <h1 className="font-headline font-bold tracking-tight text-on-surface text-xl">
              Order History
            </h1>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 text-primary active:scale-95 duration-200 transition-colors hover:bg-surface-container-low"
                aria-label="Search orders"
              >
                <SymbolIcon name="search" />
              </button>
            </div>
          </div>
        </header>

        <main className="pt-20 pb-32 px-6 max-w-lg mx-auto space-y-8">
          <section className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <SymbolIcon
                  name="search"
                  className="text-on-surface-variant/50 text-xl"
                />
              </div>
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full bg-surface-container-lowest border-none rounded-2xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/20 shadow-[0_4px_12px_rgba(78,33,33,0.03)]"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {FILTERS.map((filter, index) => (
                <button
                  key={filter}
                  type="button"
                  className={
                    index === 0
                      ? 'px-6 py-2 bg-primary text-on-primary rounded-full text-sm font-bold whitespace-nowrap'
                      : 'px-6 py-2 bg-surface-container-low text-on-surface-variant rounded-full text-sm font-semibold whitespace-nowrap hover:bg-surface-container-high transition-colors'
                  }
                >
                  {filter}
                </button>
              ))}
            </div>
          </section>

          <div className="space-y-10">
            {ORDERS.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>

          <button
            type="button"
            className="w-full py-4 rounded-3xl border-2 border-dashed border-outline-variant/30 text-on-surface-variant/60 font-bold text-sm hover:border-primary/30 hover:text-primary transition-all"
          >
            Load More Orders
          </button>
        </main>

        <BottomNav navItems={NAV_ITEMS} />
      </div>
    </>
  );
}
