import { useRouter } from '@tanstack/react-router';
import PageHeader from '../components/PageHeader';
import SymbolIcon from '../components/SymbolIcon';

const filledStyle = { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" };

export default function OrderTracking() {
  const router = useRouter();

  return (
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        details > summary::-webkit-details-marker { display: none; }
      `}</style>

      <div className="bg-background font-body text-on-surface antialiased min-h-screen" style={{ minHeight: 'max(884px, 100dvh)' }}>
        <PageHeader
          sticky
          title="Order Tracking"
          onBack={() => router.history.back()}
          rightAction={
            <button
              aria-label="More options"
              className="flex h-10 w-10 items-center justify-center rounded-full text-primary duration-200 hover:bg-surface-container-low active:scale-95"
              type="button"
            >
              <SymbolIcon name="more_vert" />
            </button>
          }
        />

        <main className="pt-20 pb-40 px-4 max-w-lg mx-auto space-y-4">
          {/* Status banner */}
          <section className="bg-gradient-to-br from-primary-container to-primary rounded-2xl p-5 text-white shadow-xl">
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-white text-xl" style={filledStyle}>check_circle</span>
                  <h2 className="font-headline font-bold text-lg leading-tight">Your Feast is on its Way!</h2>
                </div>
                <p className="text-white/80 text-xs font-medium">Order #8821 • Oct 24, 2023</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-2 px-3 text-center">
                <p className="text-[10px] uppercase font-bold tracking-wider opacity-80">Arrival</p>
                <p className="font-headline font-extrabold text-lg">25-30m</p>
              </div>
            </div>
            <div className="flex gap-1.5 h-1">
              <div className="flex-1 bg-white rounded-full"></div>
              <div className="flex-1 bg-white rounded-full"></div>
              <div className="flex-1 bg-white/30 rounded-full"></div>
              <div className="flex-1 bg-white/30 rounded-full"></div>
            </div>
          </section>

          {/* Map & driver */}
          <section className="bg-surface-container-lowest rounded-2xl border border-surface-container-high overflow-hidden shadow-sm">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <span className="material-symbols-outlined text-primary text-xl" style={filledStyle}>restaurant_menu</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface">Preparing Order</p>
                  <p className="text-xs text-on-surface-variant">Chef is finishing your Truffle Risotto...</p>
                </div>
              </div>
              <button
                aria-label="Call restaurant"
                className="bg-surface-container-high p-2 rounded-full text-primary hover:bg-surface-container active:scale-95 transition-all"
                type="button"
              >
                <SymbolIcon name="call" className="text-lg" />
              </button>
            </div>
            <div className="h-32 relative">
              <img
                alt="Delivery map view"
                className="w-full h-full object-cover grayscale-[0.3]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR9jtZEBAlghwlXavk4phYDGlWfdpmSTFIzDed3h1Ek6kiul3Olnx2WrAZltUoji13hxkf2Z-_1n3rOa48E6dgIUJkhTE9rG_VM3eiMkscaNlCszVMnHg_oMcDIKPr9sdhHJwR9xv8h2A3Ob7VPukZCFdHYYYgjfnjMUIy9DBJUZ10ZWioExffn0s2_fXHIfAQEv3qkPfgd-qCjBpNDMok7lUtRwz2prvFmhHy8ORswWksf_vOiaL8eENjNvLvagrhpC9cbK3UJT8"
              />
              <div className="absolute inset-0 bg-primary/5"></div>
              <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2">
                <div className="bg-primary text-white p-1.5 rounded-full shadow-md border-2 border-white">
                  <span className="material-symbols-outlined text-[10px]" style={filledStyle}>directions_bike</span>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-md p-1.5 rounded-lg flex items-center gap-2 border border-white/50">
                <img
                  alt="Driver Marcus J."
                  className="w-6 h-6 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDnUiZKSXTLiKvbgf1dP9VGrlIuhzUyMs9hKAL0CXin678pte7qysOMw7N0jlJz_1_UF9J7TdL2Hzl2xaxcWb-9ldPMZ4o3VYo3UDyBmZ4Bxo-7A-5RAZq8ej711Q21t43_f8DgZ8I8nhomXLSrj7IBmvMhkOYjrLswzfTIGeKpxtKRg0XCvz7OWzZQH7THIRG8CWzTC6Z1suDOSnngFOEfatsZJDnQN_PCa6w6flRKNw89jrCO3QRf5vN55NyDxdpxzPGyXbue3k"
                />
                <p className="text-[10px] font-bold">Marcus J. <span className="text-on-surface-variant font-normal opacity-70 ml-1">is on his way</span></p>
              </div>
            </div>
          </section>

          {/* Order details */}
          <section className="bg-surface-container-lowest rounded-2xl border border-surface-container-high overflow-hidden shadow-sm">
            <div className="p-4 border-b border-surface-container-high flex items-center justify-between bg-surface-container-low/30">
              <div>
                <h3 className="font-headline font-bold text-base">Order Details</h3>
                <p className="text-xs text-on-surface-variant font-medium">2 Items Total</p>
              </div>
              <div className="text-right">
                <p className="font-headline font-extrabold text-xl text-primary">$82.70</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wide">Paid via Mastercard</p>
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto hide-scrollbar p-1">
              <details className="group" open>
                <summary className="flex items-center justify-between p-3 cursor-pointer hover:bg-surface-container-low/50 rounded-xl transition-colors list-none">
                  <span className="font-bold text-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-on-surface-variant text-lg group-open:rotate-180 transition-transform">expand_more</span>
                    Items Summary
                  </span>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">$74.50</span>
                </summary>
                <div className="px-4 pb-4 pt-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <img
                        alt="Truffle Risotto"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3wqemUV86GdfALenqF0CGVPq9izOOI5SgviSfS1yy_Mr2OlL9TLfm0xiQY5i4nopAvvwUpoHTSfLNL437SbZlWyht34kzle3nHMyn5jItWDeb6AUJ7ecISI32OSuKSK4EqSbfqlCfZqzMTl-HLXEBLwGyxsFMma7PyvS5NvmAdjPEoHS6uEBOJCkli6xU_4P7W_A0-Xfobb3YqzUYEjueSKOtdw5yk0iVk-Cy37NJd1DmyR7_frl2WAyVzJ38hvY0o-ai3tMCwbE"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">Truffle Risotto</p>
                      <p className="text-[10px] text-on-surface-variant">Extra Parmesan, Truffle Oil</p>
                    </div>
                    <p className="font-bold text-sm">$42.00</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <img
                        alt="Coq au Vin"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBy8ZL0LGsnT0Lhzu7TKPKxiLoYcpkcTF9DQKJNnscEV4K9yLZd0bS9fgqyMcxB0rRPxoyxSZsGyQdg66LHMgRvcq-vaxjgFbXx4F5Dr1KFwvll6CWpof4r6gYZ6kHUWSPrCDoAGV7vwrwYUUziuFkekCSDRF19CshMpI9_4rF_-mRmH9ESKUMuLX_zSzSJGN80KhOSE0sxKuBCpTX-eSlHvAOYTrENmRGfMoTf9lWz4gfOuELvQYRwyq9UT82yL0l5IT-M48T7Vi8"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">Coq au Vin</p>
                      <p className="text-[10px] text-on-surface-variant">Slow braised, Red wine sauce</p>
                    </div>
                    <p className="font-bold text-sm">$32.50</p>
                  </div>
                </div>
              </details>
              <details className="group">
                <summary className="flex items-center justify-between p-3 cursor-pointer hover:bg-surface-container-low/50 rounded-xl transition-colors list-none border-t border-surface-container-high/50">
                  <span className="font-bold text-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-on-surface-variant text-lg group-open:rotate-180 transition-transform">expand_more</span>
                    Fees &amp; Taxes
                  </span>
                  <span className="text-xs font-bold text-on-surface-variant">$8.20</span>
                </summary>
                <div className="px-4 pb-4 pt-1 space-y-2">
                  <div className="flex justify-between text-xs text-on-surface-variant">
                    <span>Service Fee</span>
                    <span>$4.20</span>
                  </div>
                  <div className="flex justify-between text-xs text-on-surface-variant">
                    <span>Delivery Fee</span>
                    <span>$4.00</span>
                  </div>
                </div>
              </details>
            </div>
          </section>
        </main>

        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 bg-gradient-to-t from-background via-background to-transparent">
          <div className="max-w-lg mx-auto">
            <button
              className="w-full py-3.5 px-6 rounded-2xl bg-primary text-white font-headline font-bold text-base shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
              type="button"
            >
              Track Real-time Status
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
