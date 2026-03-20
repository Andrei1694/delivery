const ORDER_ITEMS = [
  {
    name: 'Truffle Risotto',
    quantity: '1x Unit',
    price: '$24.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDqgN-t4arMSnVQ27_d0Resezuqwvv8HjOJ701ZIWMCIOigKHkFDqoocOFTMeShumsM-2wJ9_3uk19Mwt8EeB0Rw5Fe-NSbzt0j-D3gLLnpHlBx17Oavy3tfgS3emzYHQJ-Kkttz2pCNO2FB5t_ND0rLNmUqj-RkiPml6GHuPRf4qnhRzgKlAaBXOFz4Qrs3n95L731RMks9BAbQUL7QHkxRNWgqIB_8CMxQCR9gvw27ySJ7T7Jp34JSZCrfdooUeqxWexvz2xz-ns',
    alt: 'Gourmet Truffle Risotto',
  },
  {
    name: 'Coq au Vin',
    quantity: '1x Unit',
    price: '$28.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBbjh_zWAEtqzRl1d0FF-LHX0gBx4rMunbPdZUC9-dHdBC3VPlGWQuIwpWZADFGZ0LNWDLJHBFr2A7fEt5ZOIUdi4Dte-QpaO6LVZ3WbNKN2xM0-2JnBQG_oMT2YJI7RtI5thzKYjxHVlOjKY0Mss67AFNnnZVxR2in0qXGNnw5noWWaxoul-jV5j3g-HZzVCGRV8cBNS5APCg5CDlTqqB-5UVE8TjqanMOuzgDBngK7BXATbL9Y9N7EzM_P2njMWK2DrxR2F8ngXo',
    alt: 'Traditional Coq au Vin',
  },
  {
    name: 'Crème Brûlée',
    quantity: '1x Unit',
    price: '$12.00',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC8HDhxs3RhQ_vGaVRo3X2vXKJp7_NM8ZAatyIuk1DivRidc2RD8XGr_llBc8aBIGFENs2ZgqkvHC_YMBKx2OT8Gqx_yU4yCSX3-FPXWkqEqxnxcr0jd3kjNyj1nBuBnImTuDleUKl7Aye3uRhnt6cq03_9HIdwLQRiBdbXTMuxpsF4LMgvblJUZTg3lnADzx_BSbFHMOsdK2cT9l19drsMfO72Dpp5M8u4FauL9qBaoeAXqc9ykRqfo1zCApIUGKVtpL5UccQIKd0',
    alt: 'Classic Crème Brûlée',
  },
];

const filledIconStyle = {
  fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
};

const deliveredIconStyle = {
  fontVariationSettings: "'FILL' 0, 'wght' 700, 'GRAD' 0, 'opsz' 24",
};

export default function OrderDetails() {
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
        <header className="fixed top-0 z-50 w-full border-b border-outline-variant/10 bg-background/80 backdrop-blur-xl">
          <div className="mx-auto flex h-16 w-full max-w-lg items-center justify-between px-6">
            <button
              aria-label="Go back"
              className="-ml-2 rounded-full p-2 text-primary duration-200 hover:bg-surface-container-low active:scale-95"
              type="button"
              onClick={() => window.history.back()}
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>

            <h1 className="font-headline text-lg font-bold tracking-tight text-on-surface">
              Order Details
            </h1>

            <button
              aria-label="More options"
              className="-mr-2 rounded-full p-2 text-primary duration-200 hover:bg-surface-container-low active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-lg space-y-4 px-6 pb-40 pt-20">
          <section className="rounded-3xl border border-outline-variant/10 bg-surface-container-low p-5">
            <div className="mb-2 flex items-center justify-between gap-4">
              <h2 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">
                L&apos;Artiste Bistro
              </h2>

              <div className="flex items-center gap-1.5 rounded-full border border-primary/10 bg-primary-container/20 px-3 py-1 text-primary">
                <span
                  className="material-symbols-outlined text-sm"
                  style={deliveredIconStyle}
                >
                  check_circle
                </span>
                <span className="font-label text-[10px] font-bold uppercase tracking-wider">
                  Delivered
                </span>
              </div>
            </div>

            <p className="text-sm font-medium text-on-surface-variant">
              Order #8821 • Oct 24, 2023
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
                  Home • 124 Park Ave
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
                  Visa •••• 4242
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4 pt-2">
            <h3 className="px-2 font-headline text-lg font-bold">Your Items</h3>

            <div className="space-y-1">
              {ORDER_ITEMS.map((item) => (
                <div key={item.name} className="flex items-center gap-4 p-2">
                  <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-surface-container-high">
                    <img
                      alt={item.alt}
                      className="h-full w-full object-cover"
                      src={item.image}
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-headline font-bold text-on-surface">
                          {item.name}
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          {item.quantity}
                        </p>
                      </div>

                      <p className="font-body font-semibold text-on-surface">
                        {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="editorial-shadow rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest p-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-on-surface-variant">
                <span className="font-medium">Subtotal</span>
                <span className="font-semibold text-on-surface">$64.00</span>
              </div>

              <div className="flex justify-between text-sm text-on-surface-variant">
                <span className="font-medium">Service Fee</span>
                <span className="font-semibold text-on-surface">$4.20</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-on-surface-variant">
                  Delivery
                </span>
                <span className="text-[10px] font-bold uppercase tracking-tighter text-primary">
                  FREE
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-outline-variant/20 pt-3">
                <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                  Total Amount
                </p>
                <p className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">
                  $68.20
                </p>
              </div>
            </div>
          </section>
        </main>

        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-background via-background to-transparent p-6">
          <div className="mx-auto max-w-lg">
            <button
              className="flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-br from-primary to-primary-container py-4 font-headline text-lg font-bold text-on-primary shadow-lg transition-all active:scale-95"
              type="button"
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
