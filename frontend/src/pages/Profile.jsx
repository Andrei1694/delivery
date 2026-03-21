import { useNavigate } from '@tanstack/react-router';

const orders = [
  {
    name: 'Artisan Pizzeria',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAUcN_PLhQHknRpbxZt9QR3fJOy4-59_rufK4kWq-gbKxVZHrOK2fUJSB4OaBxj5hF1_LufzCWSyIHeAlpogOXqogbdeho_XFCztlchLx_HZv_F8zoYSPME5l-NIUOfZCc3FpUGJ3ZbB_KGWv8HNWspv2XymXP1QydiGcF5sS1_5hlWqUqcWq9vH2di1W1HWTaEDlbxF_tydlBMknrTybSD4r1AKyI3G5wnOyOPJBNIve4osWHwtIjgW-yPfUlXvfpieLXtuTVdgn4',
    summary: '2 items \u2022 $34.00',
  },
  {
    name: 'The Green Bowl',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA5zsPXrJ3-yR4grc-Y76sKgywdO0O0IOx_JbvHJiRqD9KmsY4zp3l0jQqGWqkIf0bGQn-VozLY9ZIuKl-bJoUh7ZrRFF1gBtNIMYchbGEKQDdFl_9uVk7ZymG1E_30d9x18i4k4Mttt2GsNcBQZl9HpR8Fi000KrOkfPKuuMrHYPwp5HgZOJtjFp7kYGgbouJjHwi7Dilwp7tiHm2AkIU6wLoHTMmUu2gC-5xsVesn-ft8nnvdqLZlTuZ3hNYoHSyFpNhHlMNyf5c',
    summary: '1 item \u2022 $18.50',
  },
];

export default function Profile() {
  const navigate = useNavigate();
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
                  alt="User profile"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXCGPZ-p_ywY-CEvY7i-zFx20O4Oht79heJpqGpN6zVAWGp7A_Cvx3JEFHJtccTxBUZyB0F1IZ8tnb9X-ORFmEQ0JJo7Svj5koILhB1_rYBdTq1kdAzJcMSSKOPviI5lBywO6Po2_FgUguPWO-iWSGf9LDMJrqjdZrd9f-fEVxzQxI8d4XZTRgx5SGyFdISRx0fO5-shAYhNLINEbSbtKeKEuMG_luhm_f4Z8F__gWSuVZLSIwKbliiqQxIu2k8d2TNUllI3Wuy-w"
                />
              </div>
              <button className="absolute bottom-0 right-0 rounded-full border-2 border-surface bg-primary p-2 text-white shadow-lg transition-transform active:scale-90">
                <span className="material-symbols-outlined text-sm">edit</span>
              </button>
            </div>
            <h2 className="mb-1 text-center font-headline text-3xl font-extrabold tracking-tight text-on-surface">
              Elena Verve
            </h2>
            <p className="font-body text-sm font-medium text-on-surface-variant">
              Member since Oct 2023
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
                    <span className="material-symbols-outlined text-tertiary">stars</span>
                    <p className="font-headline text-2xl font-bold text-on-surface">
                      Gold Gourmet
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
                    <p className="font-headline text-2xl font-bold">$42.50</p>
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
              <button className="text-sm font-bold text-primary hover:underline">
                View History
              </button>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
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
                        Delivered
                      </span>
                    </div>
                    <p className="mb-3 font-body text-sm text-on-surface-variant">
                      {order.summary}
                    </p>
                    <div className="flex gap-2">
                      <button
                        className="rounded-full bg-surface-container-high px-4 py-2 text-xs font-bold transition-colors hover:bg-surface-container-highest"
                        onClick={() => navigate({ to: '/order-details' })}
                      >
                        Details
                      </button>
                      <button className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90">
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

            <div className="group cursor-pointer rounded-[2rem] border border-outline/10 bg-surface-container-lowest p-6 transition-all hover:shadow-md">
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
                <div className="truncate text-xs font-medium">+1 (555) 012-3456</div>
                <div className="truncate text-xs font-medium">elena@kitchen.com</div>
              </div>
            </div>

            <div className="group cursor-pointer rounded-[2rem] border border-outline/10 bg-surface-container-lowest p-6 transition-all hover:shadow-md">
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
                <div className="min-w-[140px] rounded-xl bg-surface-container px-4 py-3">
                  <p className="mb-1 text-[10px] font-bold uppercase text-on-surface-variant">
                    Home
                  </p>
                  <p className="truncate text-xs font-bold text-on-surface">
                    123 Culinary Way
                  </p>
                </div>
                <div className="min-w-[140px] rounded-xl bg-surface-container px-4 py-3">
                  <p className="mb-1 text-[10px] font-bold uppercase text-on-surface-variant">
                    Work
                  </p>
                  <p className="truncate text-xs font-bold text-on-surface">
                    456 Gourmet Plaza
                  </p>
                </div>
              </div>
            </div>

            <div className="group cursor-pointer rounded-[2rem] border border-outline/10 bg-surface-container-lowest p-6 transition-all hover:shadow-md">
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
                <span className="material-symbols-outlined text-on-surface-variant transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2 rounded-lg bg-surface-container px-3 py-2">
                  <div className="flex h-4 w-7 items-center justify-center rounded-sm bg-[#1a1a1a]">
                    <span className="text-[6px] font-bold text-white">VISA</span>
                  </div>
                  <span className="text-xs font-bold">{'\u2022\u2022\u2022\u2022 4242'}</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-surface-container px-3 py-2 opacity-50">
                  <div className="flex h-4 w-7 items-center justify-center rounded-sm bg-[#eb001b]">
                    <span className="text-[6px] font-bold text-white">MC</span>
                  </div>
                  <span className="text-xs font-bold">{'\u2022\u2022\u2022\u2022 8812'}</span>
                </div>
              </div>
            </div>
          </section>

          <div className="pt-4">
            <button className="w-full rounded-3xl bg-surface-container-high py-5 font-headline font-bold text-error transition-all hover:bg-error-container hover:text-white active:scale-95">
              Sign Out
            </button>
          </div>
        </main>

      </div>
    </>
  );
}
